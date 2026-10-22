// pnpm seed <tienda> [--dry-run] [--descriptions]
// Carga stores/<tienda>/data/content.json en la tienda: definiciones (el contrato con el tema), metaobjetos por
// handle, metacampos de cada producto y menús. Es idempotente: crea lo que falta y actualiza lo que existe.
// --dry-run valida el contenido y cuenta lo que se cargaría, sin tocar la tienda.
// --descriptions sustituye además la descripción de cada producto: solo al publicar el tema nuevo, porque el
// tema anterior pinta la descripción entera (preguntas y modo de uso incluidos).
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createAdmin } from './lib/admin.mjs'
import { htmlToRichText, METAOBJECTS, NAMESPACE, PRODUCT_METAFIELDS } from './lib/content-model.mjs'
import { resolveStore, storeDomain } from './lib/stores.mjs'

const BATCH_SIZE = 20

const chunk = (list, size) => Array.from({ length: Math.ceil(list.length / size) }, (_, index) => list.slice(index * size, (index + 1) * size))
const unique = (list, keyOf) => [...new Map(list.map(item => [keyOf(item), item])).values()]

// Una consulta con un alias por elemento: `<alias><i>: <campo>(…)`, con sus variables tipadas
const aliased = (items, { alias, variables, field }) => {
	const declarations = items.flatMap((_, index) => variables.map(([name, type]) => `$${name}${index}: ${type}`))
	const selections = items.map((_, index) => `${alias}${index}: ${field(index)}`)
	return `(${declarations.join(', ')}) { ${selections.join('\n')} }`
}

// 1. Definiciones de metaobjetos: se crean las que faltan; las que existen tienen que cumplir el contrato
const ensureMetaobjectDefinitions = async (admin) => {
	const { metaobjectDefinitions } = await admin.graphql('{ metaobjectDefinitions(first: 50) { nodes { id type fieldDefinitions { key type { name } } } } }')
	const existing = new Map(metaobjectDefinitions.nodes.map(definition => [definition.type, definition]))
	const ids = {}
	for (const definition of METAOBJECTS) {
		const current = existing.get(definition.type)
		if (current) {
			const types = new Map(current.fieldDefinitions.map(field => [field.key, field.type.name]))
			const broken = definition.fields.filter(field => types.get(field.key) !== field.type)
			if (broken.length) throw new Error(`El metaobjeto «${definition.type}» no cumple el contrato: ${broken.map(field => `${field.key} (${field.type})`).join(', ')}`)
			ids[definition.type] = current.id
			continue
		}
		const { metaobjectDefinitionCreate } = await admin.mutate('mutation ($definition: MetaobjectDefinitionCreateInput!) { metaobjectDefinitionCreate(definition: $definition) { metaobjectDefinition { id } userErrors { field message } } }', {
			definition: {
				type: definition.type,
				name: definition.name,
				displayNameKey: definition.displayNameKey,
				access: { storefront: 'PUBLIC_READ' },
				capabilities: { publishable: { enabled: true } },
				fieldDefinitions: definition.fields.map(({ key, name, type, required = false, validations = [] }) => ({ key, name, type, required, validations }))
			}
		})
		ids[definition.type] = metaobjectDefinitionCreate.metaobjectDefinition.id
		console.log(`  + metaobjeto ${definition.type}`)
	}
	return ids
}

// Las definiciones comunes (el contrato de content-model) más las propias de la tienda en content.json
const productDefinitions = content => [...PRODUCT_METAFIELDS, ...(content.product_metafields ?? [])]

// 2. Definiciones de metacampos de producto, con acceso de la tienda online
const ensureProductMetafields = async (admin, metaobjectIds, definitions) => {
	const { metafieldDefinitions } = await admin.graphql(`{ metafieldDefinitions(first: 100, ownerType: PRODUCT, namespace: "${NAMESPACE}") { nodes { key type { name } } } }`)
	const existing = new Map(metafieldDefinitions.nodes.map(definition => [definition.key, definition.type.name]))
	for (const definition of definitions) {
		const currentType = existing.get(definition.key)
		if (currentType && currentType !== definition.type) throw new Error(`El metacampo ${NAMESPACE}.${definition.key} es ${currentType} y el tema espera ${definition.type}`)
		if (currentType) continue
		const validations = [
			...(definition.metaobject ? [{ name: 'metaobject_definition_id', value: metaobjectIds[definition.metaobject] }] : []),
			...(definition.choices ? [{ name: 'choices', value: JSON.stringify(definition.choices) }] : [])
		]
		await admin.mutate('mutation ($definition: MetafieldDefinitionInput!) { metafieldDefinitionCreate(definition: $definition) { createdDefinition { id } userErrors { field message } } }', {
			definition: { name: definition.name, namespace: NAMESPACE, key: definition.key, type: definition.type, ownerType: 'PRODUCT', pin: true, access: { storefront: 'PUBLIC_READ' }, validations }
		})
		console.log(`  + metacampo ${NAMESPACE}.${definition.key}`)
	}
}

// 3. Ids de los archivos (fotos ya subidas a Contenido → Archivos) y de los productos, por nombre y handle
const resolveFiles = async (admin, filenames) => {
	const ids = new Map()
	for (const batch of chunk(filenames, BATCH_SIZE)) {
		const query = 'query ' + aliased(batch, { alias: 'f', variables: [['q', 'String!']], field: index => `files(first: 1, query: $q${index}) { nodes { id } }` })
		const data = await admin.graphql(query, Object.fromEntries(batch.map((name, index) => [`q${index}`, `filename:'${name}'`])))
		batch.forEach((name, index) => {
			const id = data[`f${index}`].nodes[0]?.id
			if (!id) throw new Error(`No está en Contenido → Archivos: ${name}`)
			ids.set(name, id)
		})
	}
	return ids
}

const resolveProducts = async (admin, handles) => {
	const ids = new Map()
	for (const batch of chunk(handles, BATCH_SIZE)) {
		const query = 'query ' + aliased(batch, { alias: 'p', variables: [['h', 'String!']], field: index => `productByIdentifier(identifier: { handle: $h${index} }) { id }` })
		const data = await admin.graphql(query, Object.fromEntries(batch.map((handle, index) => [`h${index}`, handle])))
		batch.forEach((handle, index) => {
			const id = data[`p${index}`]?.id
			if (!id) throw new Error(`No existe el producto ${handle}`)
			ids.set(handle, id)
		})
	}
	return ids
}

// 4. Metaobjetos por handle (activos); devuelve "tipo/handle" → id
const upsertMetaobjects = async (admin, entries) => {
	const ids = new Map()
	for (const batch of chunk(entries, BATCH_SIZE)) {
		const query = 'mutation ' + aliased(batch, {
			alias: 'm',
			variables: [['h', 'MetaobjectHandleInput!'], ['v', 'MetaobjectUpsertInput!']],
			field: index => `metaobjectUpsert(handle: $h${index}, metaobject: $v${index}) { metaobject { id } userErrors { field message } }`
		})
		const variables = Object.fromEntries(batch.flatMap((entry, index) => [
			[`h${index}`, { type: entry.type, handle: entry.handle }],
			[`v${index}`, { fields: Object.entries(entry.fields).filter(([, value]) => value).map(([key, value]) => ({ key, value })), capabilities: { publishable: { status: 'ACTIVE' } } }]
		]))
		const data = await admin.mutate(query, variables)
		batch.forEach((entry, index) => ids.set(`${entry.type}/${entry.handle}`, data[`m${index}`].metaobject.id))
	}
	return ids
}

// Una ficha puede traer solo algunos campos: las listas faltan → vacías
const withDefaults = product => ({ ingredients: [], faqs: [], testimonials: [], ...product })

// Reparte el contenido en entradas de metaobjetos (las compartidas se cargan una sola vez)
const collectEntries = (content, files, products) => {
	const testimonial = item => ({
		type: 'testimonial',
		handle: item.handle,
		fields: { name: item.name, city: item.city, quote: item.quote, body: item.body, photo: files.get(item.photo), product: item.product && products.get(item.product) }
	})
	const faq = item => ({ type: 'faq', handle: item.handle, fields: { question: item.question, answer: item.answer } })
	const ingredient = item => ({ type: 'ingredient', handle: item.handle, fields: { name: item.name, description: item.description, image: item.image && files.get(item.image) } })
	return unique([
		...content.shared_faqs.map(faq),
		...content.home_testimonials.map(testimonial),
		...content.products.map(withDefaults).flatMap(product => [
			...product.ingredients.map(ingredient),
			...product.faqs.map(faq),
			...product.testimonials.map(item => testimonial({ ...item, product: product.handle }))
		])
	], entry => `${entry.type}/${entry.handle}`)
}

// 5. Metacampos de cada producto. Las listas aceptan además *_refs: handles de entradas que ya carga otra ficha.
const productMetafields = (content, entry, productId, metaobjects) => {
	const product = withDefaults(entry)
	const refs = (type, handles) => JSON.stringify(handles.map((handle) => {
		const id = metaobjects.get(`${type}/${handle}`)
		if (!id) throw new Error(`${product.handle}: no existe la entrada ${type}/${handle}`)
		return id
	}))
	const values = {
		subtitle: product.subtitle,
		short_description: product.short_description,
		how_to_use: product.how_to_use && htmlToRichText(product.how_to_use),
		ingredients: (product.ingredients.length || product.ingredient_refs?.length) && refs('ingredient', [...product.ingredients.map(item => item.handle), ...(product.ingredient_refs ?? [])]),
		ingredients_note: product.ingredients_note,
		faqs: (product.faqs.length || product.faq_refs?.length) && refs('faq', [...product.faqs.map(item => item.handle), ...(product.faq_refs ?? [])]),
		testimonials: (product.testimonials.length || product.testimonial_refs?.length) && refs('testimonial', [...product.testimonials.map(item => item.handle), ...(product.testimonial_refs ?? [])])
	}
	// Los metacampos propios de la tienda se toman tal cual de la ficha (por su clave)
	const definitions = productDefinitions(content)
	content.product_metafields?.forEach((definition) => {
		values[definition.key] = product[definition.key]
	})
	const types = new Map(definitions.map(definition => [definition.key, definition.type]))
	return Object.entries(values)
		.filter(([, value]) => value)
		.map(([key, value]) => ({ ownerId: productId, namespace: NAMESPACE, key, type: types.get(key), value }))
}

const setProductMetafields = (admin, metafields) => admin.mutate('mutation ($metafields: [MetafieldsSetInput!]!) { metafieldsSet(metafields: $metafields) { metafields { id } userErrors { field message } } }', { metafields })

// 6. Menús por handle: se crean o se sustituyen sus enlaces
const upsertMenus = async (admin, menus) => {
	for (const menu of menus) {
		const { menus: found } = await admin.graphql('query ($query: String!) { menus(first: 5, query: $query) { nodes { id handle } } }', { query: `handle:${menu.handle}` })
		const items = menu.items.map(item => ({ title: item.title, type: 'HTTP', url: item.url }))
		const current = found.nodes.find(node => node.handle === menu.handle)
		if (current) {
			await admin.mutate('mutation ($id: ID!, $title: String!, $items: [MenuItemUpdateInput!]!) { menuUpdate(id: $id, title: $title, items: $items) { menu { id } userErrors { field message } } }', { id: current.id, title: menu.title, items })
		} else {
			await admin.mutate('mutation ($title: String!, $handle: String!, $items: [MenuItemCreateInput!]!) { menuCreate(title: $title, handle: $handle, items: $items) { menu { id } userErrors { field message } } }', { title: menu.title, handle: menu.handle, items })
		}
		console.log(`  · ${menu.handle} (${items.length} enlaces)`)
	}
}

// 7. Buscador: fuera de la colección de la tienda, seo.hidden = 1 (no sale en el buscador ni en Google; la URL
// sigue funcionando para anuncios y landings). Dentro, se quita la marca.
const SEARCH_HIDDEN = { namespace: 'seo', key: 'hidden' }

const scopeSearch = async (admin, collectionHandle) => {
	const { collectionByIdentifier: collection } = await admin.graphql('query ($handle: String!) { collectionByIdentifier(identifier: { handle: $handle }) { id } }', { handle: collectionHandle })
	if (!collection) throw new Error(`No existe la colección ${collectionHandle}`)
	const products = []
	let after = null
	do {
		const { products: page } = await admin.graphql('query ($collection: ID!, $after: String) { products(first: 250, after: $after) { nodes { id handle inCollection(id: $collection) metafield(namespace: "seo", key: "hidden") { value } } pageInfo { hasNextPage endCursor } } }', { collection: collection.id, after })
		products.push(...page.nodes)
		after = page.pageInfo.hasNextPage ? page.pageInfo.endCursor : null
	} while (after)

	const hide = products.filter(product => !product.inCollection && product.metafield?.value !== '1')
	const show = products.filter(product => product.inCollection && product.metafield)
	for (const batch of chunk(hide, 25)) {
		await admin.mutate('mutation ($metafields: [MetafieldsSetInput!]!) { metafieldsSet(metafields: $metafields) { metafields { id } userErrors { field message } } }', {
			metafields: batch.map(product => ({ ownerId: product.id, ...SEARCH_HIDDEN, type: 'number_integer', value: '1' }))
		})
	}
	if (show.length) {
		await admin.mutate('mutation ($metafields: [MetafieldIdentifierInput!]!) { metafieldsDelete(metafields: $metafields) { deletedMetafields { key } userErrors { field message } } }', {
			metafields: show.map(product => ({ ownerId: product.id, ...SEARCH_HIDDEN }))
		})
	}
	const hidden = products.filter(product => !product.inCollection).length
	console.log(`  ${products.length - hidden} visibles (colección ${collectionHandle}), ${hidden} ocultos del buscador (${hide.length} nuevos)`)
}

// 8. Plantilla alternativa por producto (templateSuffix), p. ej. las fichas de campaña con contraentrega
const assignTemplates = async (admin, templates) => {
	const entries = Object.entries(templates).flatMap(([suffix, handles]) => handles.map(handle => ({ suffix, handle })))
	if (!entries.length) return
	const ids = await resolveProducts(admin, entries.map(entry => entry.handle))
	const query = 'mutation ' + aliased(entries, { alias: 't', variables: [['p', 'ProductUpdateInput!']], field: index => `productUpdate(product: $p${index}) { product { id } userErrors { field message } }` })
	await admin.mutate(query, Object.fromEntries(entries.map((entry, index) => [`p${index}`, { id: ids.get(entry.handle), templateSuffix: entry.suffix }])))
	entries.forEach(entry => console.log(`  · ${entry.handle} → product.${entry.suffix}`))
}

// Sin tienda: ids de mentira para validar que todo el contenido se reparte y referencia bien
const dryRun = (content) => {
	const fake = name => `gid://dry-run/${name}`
	const photos = new Map(collectPhotos(content).map(name => [name, fake(name)]))
	const products = new Map(content.products.map(product => [product.handle, fake(product.handle)]))
	const entries = collectEntries(content, photos, products)
	const metaobjects = new Map(entries.map(entry => [`${entry.type}/${entry.handle}`, fake(entry.handle)]))
	const metafields = content.products.flatMap(product => productMetafields(content, product, products.get(product.handle), metaobjects))
	const count = type => entries.filter(entry => entry.type === type).length
	console.log(`Contenido válido: ${count('ingredient')} ingredientes, ${count('faq')} preguntas, ${count('testimonial')} opiniones, ${metafields.length} metacampos en ${products.size} productos, ${content.menus?.length ?? 0} menús, ${photos.size} fotos.`)
}

const collectPhotos = content => [...new Set([...content.home_testimonials, ...content.products.map(withDefaults).flatMap(product => [...product.testimonials, ...product.ingredients])]
	.map(item => item.photo ?? item.image)
	.filter(Boolean))]

const updateDescriptions = async (admin, content, products) => {
	const items = content.products.filter(product => product.description)
	const query = 'mutation ' + aliased(items, { alias: 'd', variables: [['p', 'ProductUpdateInput!']], field: index => `productUpdate(product: $p${index}) { product { id } userErrors { field message } }` })
	await admin.mutate(query, Object.fromEntries(items.map((product, index) => [`p${index}`, { id: products.get(product.handle), descriptionHtml: product.description }])))
}

const [storeName, ...flags] = process.argv.slice(2)

try {
	const store = resolveStore(storeName)
	const content = JSON.parse(readFileSync(join(store.contentDir, 'content.json'), 'utf8'))
	if (flags.includes('--dry-run')) {
		dryRun(content)
		process.exit(0)
	}
	const admin = createAdmin(storeDomain(store))

	console.log('1/8 Definiciones de metaobjetos')
	const metaobjectIds = await ensureMetaobjectDefinitions(admin)

	console.log('2/8 Definiciones de metacampos de producto')
	await ensureProductMetafields(admin, metaobjectIds, productDefinitions(content))

	console.log('3/8 Archivos y productos')
	const files = await resolveFiles(admin, collectPhotos(content))
	const products = await resolveProducts(admin, content.products.map(product => product.handle))

	console.log('4/8 Metaobjetos')
	const entries = collectEntries(content, files, products)
	const metaobjects = await upsertMetaobjects(admin, entries)
	console.log(`  ${entries.length} entradas`)

	console.log('5/8 Metacampos de producto')
	for (const product of content.products) {
		await setProductMetafields(admin, productMetafields(content, product, products.get(product.handle), metaobjects))
		console.log(`  · ${product.handle}`)
	}

	console.log('6/8 Menús')
	await upsertMenus(admin, content.menus ?? [])

	if (content.search_collection) {
		console.log('7/8 Buscador')
		await scopeSearch(admin, content.search_collection)
	}

	console.log('8/8 Plantillas de producto')
	await assignTemplates(admin, content.product_templates ?? {})

	if (flags.includes('--descriptions')) {
		await updateDescriptions(admin, content, products)
		console.log('Descripciones actualizadas')
	}
} catch (error) {
	console.error(error instanceof Error ? error.message : error)
	process.exit(1)
}

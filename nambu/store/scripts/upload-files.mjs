// pnpm upload <tienda> <archivo>… [--alt "texto"]
// Sube imágenes a Contenido → Archivos de la tienda (subida preparada de Shopify) y espera a que estén listas.
// Idempotente: un archivo con el mismo nombre ya subido se salta. El tema los usa como shopify://shop_images/<nombre>.
import { readFileSync, statSync } from 'node:fs'
import { basename, extname } from 'node:path'
import { createAdmin } from './lib/admin.mjs'
import { resolveStore, storeDomain } from './lib/stores.mjs'

const MIME_TYPES = { '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif' }
const READY_POLLS = 40
const POLL_MS = 1500

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const findFile = async (admin, filename) => {
	const { files } = await admin.graphql('query ($q: String!) { files(first: 1, query: $q) { nodes { id fileStatus ... on MediaImage { image { url } } } } }', { q: `filename:'${filename}'` })
	return files.nodes[0] ?? null
}

// 1. Destino de subida  2. POST del archivo  →  url del recurso, para fileCreate o para la media de un producto
export const stageUpload = async (admin, path) => {
	const filename = basename(path)
	const mimeType = MIME_TYPES[extname(path).toLowerCase()]
	if (!mimeType) throw new Error(`Tipo de imagen no admitido: ${filename}`)
	const { stagedUploadsCreate } = await admin.mutate('mutation ($input: [StagedUploadInput!]!) { stagedUploadsCreate(input: $input) { stagedTargets { url resourceUrl parameters { name value } } userErrors { field message } } }', {
		input: [{ filename, mimeType, httpMethod: 'POST', resource: 'IMAGE', fileSize: String(statSync(path).size) }]
	})
	const [target] = stagedUploadsCreate.stagedTargets
	const form = new FormData()
	target.parameters.forEach(({ name, value }) => form.append(name, value))
	form.append('file', new Blob([readFileSync(path)], { type: mimeType }), filename)
	const response = await fetch(target.url, { method: 'POST', body: form })
	if (!response.ok) throw new Error(`La subida de ${filename} falló (${response.status})`)
	return target.resourceUrl
}

const uploadFile = async (admin, path, alt) => {
	const filename = basename(path)
	const existing = await findFile(admin, filename)
	if (existing) {
		console.log(`  = ${filename} (ya estaba)`)
		return existing
	}
	const resourceUrl = await stageUpload(admin, path)
	await admin.mutate('mutation ($files: [FileCreateInput!]!) { fileCreate(files: $files) { files { id } userErrors { field message } } }', {
		files: [{ originalSource: resourceUrl, contentType: 'IMAGE', filename, alt: alt ?? '' }]
	})
	for (let poll = 0; poll < READY_POLLS; poll++) {
		const file = await findFile(admin, filename)
		if (file?.fileStatus === 'READY') {
			console.log(`  + ${filename}`)
			return file
		}
		if (file?.fileStatus === 'FAILED') throw new Error(`Shopify no procesó ${filename}`)
		await sleep(POLL_MS)
	}
	throw new Error(`${filename} no quedó listo a tiempo: revísalo en Contenido → Archivos`)
}

const run = async () => {
	const args = process.argv.slice(2)
	const altIndex = args.indexOf('--alt')
	const alt = altIndex >= 0 ? args[altIndex + 1] : undefined
	const [storeName, ...paths] = args.filter((_, index) => altIndex < 0 || (index !== altIndex && index !== altIndex + 1))
	const store = resolveStore(storeName)
	if (!paths.length) throw new Error('Indica los archivos que quieres subir')
	const admin = createAdmin(storeDomain(store))
	for (const path of paths) await uploadFile(admin, path, alt)
}

if (import.meta.url === `file://${process.argv[1]}`) {
	run().catch((error) => {
		console.error(error instanceof Error ? error.message : error)
		process.exit(1)
	})
}

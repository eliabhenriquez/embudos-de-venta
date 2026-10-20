// Contrato entre el tema y los datos de cada tienda: metaobjetos y metacampos de producto que lee el Liquid.
// Las claves no se pueden cambiar después de crearlas en Shopify (ver AGENTS.md §5).

export const NAMESPACE = 'custom'

export const METAOBJECTS = [
	{
		type: 'testimonial',
		name: 'Testimonio',
		displayNameKey: 'name',
		fields: [
			{ key: 'name', name: 'Nombre', type: 'single_line_text_field', required: true },
			{ key: 'city', name: 'Ciudad', type: 'single_line_text_field' },
			{ key: 'quote', name: 'Frase', type: 'single_line_text_field', required: true },
			{ key: 'body', name: 'Texto', type: 'multi_line_text_field' },
			{ key: 'photo', name: 'Foto', type: 'file_reference', validations: [{ name: 'file_type_options', value: '["Image"]' }] },
			{ key: 'product', name: 'Producto', type: 'product_reference' }
		]
	},
	{
		type: 'ingredient',
		name: 'Ingrediente',
		displayNameKey: 'name',
		fields: [
			{ key: 'name', name: 'Nombre', type: 'single_line_text_field', required: true },
			{ key: 'image', name: 'Imagen', type: 'file_reference', validations: [{ name: 'file_type_options', value: '["Image"]' }] },
			{ key: 'description', name: 'Descripción', type: 'multi_line_text_field' }
		]
	},
	{
		type: 'faq',
		name: 'Pregunta frecuente',
		displayNameKey: 'question',
		fields: [
			{ key: 'question', name: 'Pregunta', type: 'single_line_text_field', required: true },
			{ key: 'answer', name: 'Respuesta', type: 'multi_line_text_field', required: true }
		]
	}
]

export const PRODUCT_METAFIELDS = [
	{ key: 'coming_soon', name: 'Próximamente', type: 'boolean' },
	{ key: 'subtitle', name: 'Subtítulo', type: 'single_line_text_field' },
	{ key: 'short_description', name: 'Descripción corta', type: 'multi_line_text_field' },
	{ key: 'how_to_use', name: 'Cómo se usa', type: 'rich_text_field' },
	{ key: 'ingredients', name: 'Ingredientes', type: 'list.metaobject_reference', metaobject: 'ingredient' },
	{ key: 'ingredients_note', name: 'Nota de la etiqueta', type: 'multi_line_text_field' },
	{ key: 'faqs', name: 'Preguntas frecuentes', type: 'list.metaobject_reference', metaobject: 'faq' },
	{ key: 'testimonials', name: 'Opiniones', type: 'list.metaobject_reference', metaobject: 'testimonial' }
]

// HTML sencillo (p, ul, ol, li) → JSON de texto enriquecido de Shopify
const textNode = html => ({ type: 'text', value: html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() })

export const htmlToRichText = (html) => {
	const blocks = [...html.matchAll(/<(p|ul|ol)>([\s\S]*?)<\/\1>/g)].map(([, tag, inner]) => {
		if (tag === 'p') return { type: 'paragraph', children: [textNode(inner)] }
		const items = [...inner.matchAll(/<li>([\s\S]*?)<\/li>/g)].map(([, item]) => ({ type: 'list-item', children: [textNode(item)] }))
		return { type: 'list', listType: tag === 'ol' ? 'ordered' : 'unordered', children: items }
	})
	return JSON.stringify({ type: 'root', children: blocks })
}

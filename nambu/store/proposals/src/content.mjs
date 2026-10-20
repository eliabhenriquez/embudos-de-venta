// Contenido de la tienda de Nambu México, compartido por las dos propuestas.
// El copy del spray sale del aprobado (nambu/landings/spray/general/), adaptado a México:
// sin Colombia, sin INVIMA, sin contactos de Nambu Colombia. Lo que aún no existe va en
// MOCK y se pinta marcado (.mock). Producto real a la venta: solo el Spray Nasal.

export const ASSETS = '../../landings/spray/assets/'
export const SHARED_ASSETS = '../../shared/assets/'
// Fotos del catálogo de Nambu Colombia en su CDN: solo para enseñar cómo escala la tienda
const CO_CDN = 'https://cdn.shopify.com/s/files/1/0661/2670/8896/files/'
const CO_STORE = 'https://nambuoficial.com/cdn/shop/files/'

export const MOCK = {
	announcement: 'Envío a todo México',
	shipping: 'Envío a todo México',
	shippingCost: 'Costo de envío por definir',
	delivery: 'Entrega en X a Y días hábiles',
	whatsapp: '+52 55 0000 0000',
	email: 'hola@nambumx.com',
	instagram: '@nambu.mx',
	legalName: 'Nambu México',
	taxes: 'Impuestos incluidos.',
	guarantee: 'Si tu pedido no llega en el plazo indicado, te lo reenviamos sin costo.',
	returns: 'Política de cambios y devoluciones por definir.',
	otherPayments: 'Otros medios de pago'
}

export const PRICE = { amount: 460, label: '$460', currency: 'MXN' }

// Colecciones de la tienda: las líneas del catálogo de Colombia
export const COLLECTIONS = [
	{ id: 'respiracion', name: 'Respiración', img: { file: 'landings-spray-ugc-catalina-aplica.webp', w: 688, h: 1124 } },
	{ id: 'piel', name: 'Piel', img: { src: CO_STORE + '65a8d012-b573-46c9-b6fa-6750a5166373.png', w: 1200, h: 1200 } },
	{ id: 'unas', name: 'Uñas', img: { src: CO_STORE + '1.jpg', w: 1200, h: 1200 } },
	{ id: 'cabello', name: 'Cabello', img: { src: CO_STORE + 'Recurso_150-8.png', w: 1200, h: 1200 } },
	{ id: 'bronceado', name: 'Bronceado', img: { src: CO_STORE + '32c443f4-5aba-4f65-97b6-06137c35acaf.webp', w: 1200, h: 1200 } }
]

// Catálogo: el spray es el único producto real; el resto, ejemplo de cómo crece la tienda
export const CATALOG = [
	{ id: 'spray', name: 'Spray Nasal', type: 'Spray nasal · 60 ml', collection: 'respiracion', available: true, img: { src: CO_CDN + '2eb9e8bd-2bf1-42b1-a04e-f5c08ff9b6d4.png', w: 1254, h: 1254 } },
	{ id: 'serum-porcelana', name: 'Sérum Piel de Porcelana', type: 'Sérum facial', collection: 'piel', img: { src: CO_STORE + '65a8d012-b573-46c9-b6fa-6750a5166373.png', w: 1200, h: 1200 } },
	{ id: 'niacinamida', name: 'Sérum Niacinamida 10%', type: 'Sérum facial', collection: 'piel', img: { src: CO_STORE + '3b640304-c2be-4756-a128-d1f77d55802b_1.png', w: 1200, h: 1200 } },
	{ id: 'one-week', name: '1 Week', type: 'Fortalecedor de uñas', collection: 'unas', img: { src: CO_STORE + '1.jpg', w: 1200, h: 1200 } },
	{ id: 'golden-glow', name: 'Golden Glow', type: 'Aclarante de cabello', collection: 'cabello', img: { src: CO_CDN + 'Recurso110-8.png', w: 1200, h: 1200 } },
	{ id: 'isoul', name: 'ISOUL', type: 'Autobronceador', collection: 'bronceado', img: { src: CO_STORE + '32c443f4-5aba-4f65-97b6-06137c35acaf.webp', w: 1200, h: 1200 } },
	{ id: 'chest-relief', name: 'Chest Relief', type: 'Ungüento', collection: 'respiracion', img: { src: CO_CDN + 'WhatsAppImage2025-07-28at5.43.45PM.jpg', w: 1024, h: 1024 } },
	{ id: 'jabon-porcelana', name: 'Jabón Cuerpo de Porcelana', type: 'Jabón corporal', collection: 'piel', img: { src: CO_CDN + 'Recurso88-8.png', w: 590, h: 590 } }
]

export const countIn = id => CATALOG.filter(p => p.collection === id).length

// El spray: lo que se destaca en el banner y en su sección
export const SPRAY = {
	title: 'Spray Nasal de Nambu',
	short: 'Spray Nasal',
	size: '60 ml',
	plants: 'Eucalipto, menta y regaliz',
	headline: 'Que la congestión deje de arruinar tu día.',
	lead: 'Extractos botánicos de <strong>eucalipto, menta y regaliz</strong> para ayudar a despejar la sensación de congestión y facilitar el paso del aire.',
	facts: [
		{ icon: 'drop', title: '60 ml de contenido', text: 'El doble frente a presentaciones comunes de 30 ml.' },
		{ icon: 'leaf', title: 'Eucalipto, menta y regaliz', text: 'Extractos botánicos en un formato nasal listo para usar.' },
		{ icon: 'sun', title: 'Mañana y noche', text: '2 aplicaciones en cada fosa nasal.' }
	],
	banner: { src: CO_CDN + '2eb9e8bd-2bf1-42b1-a04e-f5c08ff9b6d4.png', w: 1254, h: 1254, alt: 'Spray Nasal de Nambu sobre una repisa de mármol' },
	people: { file: 'landings-spray-hero.webp', w: 1200, h: 1200, alt: 'Un hombre y una mujer sostienen el Spray Nasal de Nambu' }
}

export const CTA = { add: 'Agregar al carrito', buyNow: 'Comprar ahora', checkout: 'Finalizar compra', view: 'Ver producto', soon: 'Próximamente' }

// Galería de la ficha: ninguna lleva texto sobre Colombia
export const GALLERY = [
	{ file: 'landings-spray-hero.webp', w: 1200, h: 1200, alt: 'Un hombre y una mujer sostienen el Spray Nasal de Nambu junto al frasco de 60 ml', fit: 'cover' },
	{ file: 'landings-spray-packshot.webp', w: 601, h: 1100, alt: 'Frasco de Spray Nasal de Nambu de 60 ml', fit: 'contain' },
	{ file: 'landings-spray-modo-uso.webp', w: 1000, h: 1000, alt: 'Modo de uso del Spray Nasal de Nambu: 2 aplicaciones nasales, 2 veces al día', fit: 'cover' },
	{ file: 'landings-spray-ugc-catalina-aplica.webp', w: 688, h: 1124, alt: 'Catalina se aplica el Spray Nasal de Nambu', fit: 'cover' }
]

export const DETAILS = {
	description: [
		'Spray Nasal de Nambu combina extractos botánicos de eucalipto, menta y regaliz para ayudar a despejar la sensación de congestión y facilitar el paso del aire.',
		'Trae 60 ml: el doble frente a presentaciones comunes de 30 ml.'
	],
	use: ['2 aplicaciones en cada fosa nasal.', 'Mañana y noche.', 'Directo en la nariz. Sin preparar mezclas.'],
	plants: ['Extractos botánicos de eucalipto, menta y regaliz.'],
	pains: ['Congestión', 'Moco', 'Presión nasal', 'Respiración por la boca']
}

export const PLANTS = {
	title: 'Lo que lleva',
	items: [
		{ name: 'Eucalipto', file: 'landings-spray-ingrediente-eucalipto.webp', w: 900, h: 600, text: 'Conocido por su uso tradicional durante episodios de congestión y acumulación de moco.' },
		{ name: 'Menta', file: 'landings-spray-ingrediente-menta.webp', w: 900, h: 600, text: 'Su mentol genera una sensación refrescante asociada con una percepción más libre del paso del aire.' },
		{ name: 'Regaliz', file: 'landings-spray-ingrediente-regaliz.webp', w: 900, h: 473, text: 'Raíz utilizada tradicionalmente en preparaciones relacionadas con garganta, tos y secreciones.' }
	],
	note: 'Nota sobre la etiqueta: comunicamos los nombres de las plantas de origen para explicar la fórmula de manera sencilla. En el empaque físico aparecen las nomenclaturas técnicas utilizadas para declarar sus extractos y componentes.'
}

// Personas reales del pool de UGC (nambu/landings/spray/src/lib/pool.mjs), con su nombre real
export const PEOPLE = {
	catalina: { name: 'Catalina', file: 'landings-spray-ugc-catalina.webp', w: 680, h: 1192 },
	'carlos-mauricio': { name: 'Carlos Mauricio', file: 'landings-spray-ugc-carlos-mauricio.webp', w: 670, h: 1042 },
	genesis: { name: 'Genésis', file: 'landings-spray-ugc-genesis.webp', w: 692, h: 1190 }
}

export const VOICES = {
	title: 'Lo que dice la gente',
	items: [
		{ slug: 'catalina', city: 'Ciudad de México', quote: 'Por fin pude dormir sin pasar toda la noche con la boca abierta.', text: 'Lo pedí porque por las noches se me tapaba muchísimo la nariz. Lo que más noté fue poder acostarme y sentir el paso del aire mucho más libre. También me sorprendió el tamaño del frasco. Pensé que sería uno de esos sprays pequeños y trae bastante.' },
		{ slug: 'carlos-mauricio', city: 'Guadalajara', quote: 'Vivía aclarando la garganta por ese moco que bajaba.', text: 'Mi molestia era sentir moco pegado atrás de la nariz y estar carraspeando todo el tiempo. Empecé a usar el Spray Nasal de Nambu mañana y noche y me gustó mucho la sensación que deja. Ya lo tengo al lado de la cama.' },
		{ slug: 'genesis', city: 'Monterrey', quote: 'El polvo y el cambio de clima me cerraban la nariz enseguida.', text: 'Cuando limpiaba la casa o cambiaba el clima empezaba con estornudos y nariz tapada. Quería algo fácil de usar y este me gustó porque va directo en la nariz. Además, 60 ml rinden muchísimo más de lo que esperaba.' }
	]
}

export const TRUST = [
	{ icon: 'truck', title: 'Envío', text: () => `<span class="mock">${MOCK.shipping}. ${MOCK.delivery}.</span>` },
	{ icon: 'lock', title: 'Pago seguro', text: () => 'Paga con tarjeta en el checkout de Shopify.' },
	{ icon: 'chat', title: 'Te acompañamos', text: () => `WhatsApp <span class="mock">${MOCK.whatsapp}</span>` },
	{ icon: 'shield', title: 'Garantía de entrega', text: () => `<span class="mock">${MOCK.guarantee}</span>` }
]

export const HELP_LINKS = [['Preguntas frecuentes', '#faq'], ['Rastrear mi pedido', '#'], ['WhatsApp', '#'], ['Cambios y devoluciones', '#']]

// Preguntas sin INVIMA ni Colombia. La de seguridad conserva el texto aprobado.
export const FAQ = [
	{ q: '¿Cuánto producto trae?', a: ['<strong>60 ml.</strong> El doble frente a una presentación común de 30 ml.'] },
	{ q: '¿Cómo se usa?', a: ['2 aplicaciones en cada fosa nasal, 2 veces al día.'] },
	{ q: '¿Por qué aparecen otros nombres en la etiqueta?', a: ['El empaque utiliza nomenclaturas técnicas para declarar extractos y componentes de la fórmula. Por eso algunos nombres impresos son diferentes a los nombres cotidianos de las plantas.'] },
	{ q: '¿Tiene alguna precaución de uso?', a: ['Si te preocupa que alguno de sus componentes pueda caerte mal, revisa la composición antes de usarlo. Si tienes antecedentes de alergias, utilizas otros productos nasales o tienes una condición médica, consulta primero con un profesional de salud.'] },
	{ q: '¿Hacen envíos a todo México?', a: ['<span class="mock">' + MOCK.shipping + '. ' + MOCK.shippingCost + '.</span>'] },
	{ q: '¿Cuánto tarda?', a: ['<span class="mock">' + MOCK.delivery + '.</span>'] }
]

export const FOOTER = {
	shop: [['Todos los productos', '#tienda'], ...COLLECTIONS.map(c => [c.name, '#tienda'])],
	help: [['Preguntas frecuentes', '#faq'], ['Rastrear mi pedido', '#'], ['Envíos', '#'], ['Cambios y devoluciones', '#'], ['Contacto', '#']],
	legal: [['Aviso de privacidad', '#'], ['Términos y condiciones', '#']]
}

export const NAV = [['Tienda', '#tienda'], ['Spray Nasal', '#producto'], ['Ayuda', '#ayuda'], ['Contacto', '#contacto']]

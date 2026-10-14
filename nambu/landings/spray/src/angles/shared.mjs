// Contenido que repiten los copys de todos los ángulos. Un ángulo lo usa tal cual
// o lo sobrescribe con su propia versión.

export const PRODUCT = { handle: 'lung-cleansing', title: 'SPRAY NASAL.', variant: '52477454581920' }

export const REGULAR_PRICES = { regular: '$79.900', prepaid: '$69.900', cod: '$79.900' }
export const REGULAR_STICKY_SUBS = { regular: 'o $69.900 anticipado', prepaid: 'anticipado · ahorras $10.000', cod: 'pagas al recibir' }
export const STICKY = { price: '$79.900', sub: 'o $69.900 anticipado', cta: 'Lo quiero' }

// Hero: la primera imagen es del ángulo; las otras tres, de todos
const SHARED_SLIDES = [
	{ file: 'landings-spray-beneficios.webp', w: 1000, h: 1000, caption: 'Beneficios', alt: 'Frasco de Spray Nasal de Nambu entre hojas verdes, rodeado de sus beneficios' },
	{ file: 'landings-spray-ingredientes.webp', w: 1000, h: 1000, caption: 'Eucalipto, menta y regaliz', alt: 'Frasco de Spray Nasal de Nambu junto a menta, regaliz y eucalipto' },
	{ file: 'landings-spray-modo-uso.webp', w: 1000, h: 1000, caption: 'Modo de uso', alt: 'Modo de uso del Spray Nasal de Nambu: 2 aplicaciones nasales, 2 veces al día' }
]
export const heroSlides = ({ file, alt }) => [{ file, w: 1200, h: 1200, caption: 'Spray Nasal de Nambu', alt }, ...SHARED_SLIDES]

export const HERO = {
	price: { figure: '$79.900', alt: 'Paga anticipado por <strong>$69.900</strong>', save: 'Ahorras $10.000' },
	cta: 'Quiero mi Spray Nasal de Nambu',
	trust: 'Envío <strong>GRATIS</strong> en Colombia <span aria-hidden="true">·</span> También puedes pagar al recibir',
	specs: [['Contenido', '60 ml'], ['Frente a 30 ml', 'El doble'], ['Precio regular', '$79.900 COP']]
}

export const PEOPLE_TITLE = 'Gente real con su frasco'

export const VOLUME = {
	lead: 'Muchos sprays vienen en presentaciones de <strong>30 ml</strong>. Nambu trae <strong>60 ml</strong>.',
	claim: 'El doble de contenido frente a ese formato.'
}

export const BOX = {
	eyebrow: 'Lo que te llega a casa',
	ticks: ['60 ml de contenido.', 'Extractos botánicos de origen colombiano.', 'Envío GRATIS.', 'Seguimiento de tu pedido.'],
	prices: [{ label: 'Pagando al recibir', value: '$79.900', main: true }, { label: 'Con pago anticipado', value: '$69.900' }]
}

export const VERSUS = { title: '30 ml y 60 ml no rinden igual.', price: '<strong>$79.900 COP</strong> · $69.900 con pago anticipado' }

export const CLOSE = {
	claim: '60 ml de fórmula botánica de origen colombiano.',
	price: { label: 'Precio regular', figure: '$79.900', alt: 'Pago anticipado: <strong>$69.900 COP</strong>', save: 'Ahorras $10.000 + envío GRATIS.' },
	cta: 'Quiero mi Spray Nasal de Nambu'
}

export const BOTANY_NOTE_CLAIM = 'Extractos de plantas colombianas en un formato nasal listo para usar.'
export const REGALIZ_TEXT = 'Raíz utilizada tradicionalmente en preparaciones relacionadas con garganta, tos y secreciones.'

// Preguntas que se repiten entre ángulos
export const FAQ = {
	use: { q: '¿Cómo se usa?', a: ['2 aplicaciones en cada fosa nasal, 2 veces al día.'] },
	content: { q: '¿Cuánto trae?', a: ['<strong>60 ml.</strong> El doble frente a una presentación común de 30 ml.'] },
	plants: { q: '¿Qué plantas utiliza Nambu?', a: ['La fórmula comunica extractos botánicos provenientes de <strong>eucalipto, menta y regaliz de origen colombiano</strong>.'] },
	label: { q: '¿Por qué aparecen otros nombres en la etiqueta?', a: ['El empaque utiliza nomenclaturas técnicas para declarar extractos y componentes de la fórmula. Por eso algunos nombres impresos son diferentes a los nombres cotidianos de las plantas.'] },
	invima: { q: '¿Tiene registro INVIMA?', a: ['Actualmente, el <strong>registro sanitario como producto homeopático se encuentra en proceso ante INVIMA</strong>.', 'Si te preocupa que alguno de sus componentes pueda caerte mal, revisa la composición antes de usarlo. Si tienes antecedentes de alergias, utilizas otros productos nasales o tienes una condición médica, consulta primero con un profesional de salud.'] },
	price: { q: '¿Cuánto cuesta?', a: ['<strong>$79.900 COP</strong> pagando al recibir.', '<strong>$69.900 COP</strong> con pago anticipado.'] },
	shipping: { q: '¿El envío es gratis?', a: ['Sí. <strong>Envío GRATIS en Colombia.</strong>'] },
	delivery: { q: '¿Cuánto tarda?', a: ['Entre <strong>3 y 5 días hábiles</strong>.'] }
}

// Recorrido estándar de un ángulo; cada uno lo reordena o inserta sus secciones
export const RITUAL_EASY = ['Directo en la nariz.']

export const BOTANY_LEAD = 'Spray Nasal de Nambu utiliza extractos botánicos obtenidos de <strong>eucalipto, menta y regaliz</strong>, plantas relacionadas históricamente con nariz, garganta y vías respiratorias.'
export const SOURCES_EYEBROW = 'Referencias públicas'
export const OFFER_ALT = 'Y pagando anticipado: <strong>$69.900 COP</strong>'

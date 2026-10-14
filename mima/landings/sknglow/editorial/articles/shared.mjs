// Lo que repiten los artículos de SKNGLOW: el producto, los precios, la oferta y el pie.

// Precios vigentes del producto (../../AGENTS.md §1). El copy de los artículos trae las
// cifras anteriores: en precio manda la ficha del producto, no el .txt.
export const PRICES = { cod: '$79.900', prepaid: '$69.900', saving: '$10.000' }

export const PRODUCT_NAME = 'Sknglow'
// «Son 4 dulces duros al día, sabor kiwi […]. El empaque trae 120, para un mes completo.»
export const PRODUCT_SPECS = '120 dulces duros · sabor kiwi'

export const CTA_LABEL = 'QUIERO MI SKNGLOW CON DESCUENTO POR PAGO ANTICIPADO'
// Para la barra de compra, donde la etiqueta del copy no cabe: la del resto de landings
export const CTA_LABEL_SHORT = 'QUIERO MI SKNGLOW'

// La etiqueta de arriba: un artículo que vende se declara como publicidad
export const MASTHEAD = { label: 'Contenido publicitario' }

// La firma es la del copy. No está en el pool de clientas reales (humanized-images/sknglow).
export const BYLINE = { name: 'Yolimar Cantillo', place: 'Barranquilla, Colombia', badge: 'Verificado' }

export const REFERENCE_NOTE = 'Imagen de referencia.'

export const PRODUCT_FACTS = ['Con Resveratrol y Biotina', 'Dulces duros sabor kiwi, no masticables', '4 al día · 120 por empaque, para un mes']

// La foto que acompaña a la llamada a la acción: UGC del pool real, con su nombre y con la
// misma mención que lleva la galería de las landings. No es la autora del artículo.
export const OFFER_PHOTO = { image: 'ugc-shelyka', name: 'Shelyka', credit: 'Contenido en colaboración con MIMA' }

// Las dos frases de precio del copy, con la cifra marcada para que el CSS la saque en grande
export const OFFER = {
	photo: OFFER_PHOTO,
	name: PRODUCT_NAME,
	specs: PRODUCT_SPECS,
	price: `<span>El precio de Sknglow es de</span> <strong>${PRICES.cod}</strong> <span>contra entrega.</span>`,
	prepaid: `Si pagas de forma anticipada, ahorras <strong>${PRICES.saving}</strong> y te queda en <strong>${PRICES.prepaid}</strong>.`,
	label: CTA_LABEL
}

// Lo que sigue a la tarjeta de la oferta, igual en los dos artículos
export const OFFER_TERMS = [
	'Fabricado por Vitaliah S.A.S., Calle 24B N.º 26-06, Bogotá, Colombia. Industria colombiana, hecho por manos colombianas para mujeres colombianas.',
	'Tu pedido llega entre 3 y 5 días hábiles. Si por algún motivo no llega en ese tiempo, te lo reenviamos sin costo adicional, o te devolvemos el dinero si pagaste de forma anticipada.',
	'Cualquier duda antes o después de tu compra, escríbenos al <a href="tel:+573006964582">300 696 4582</a>, ahí te atendemos directamente.',
	'Haz clic en el botón de abajo y separa tu Sknglow antes de que se agoten las unidades de este mes.'
]

export const BUYBAR = {
	name: PRODUCT_NAME,
	specs: PRODUCT_SPECS,
	price: PRICES.cod,
	sub: `contra entrega · ${PRICES.prepaid} con pago anticipado`,
	label: CTA_LABEL_SHORT
}

// Los datos del pie de las landings de SKNGLOW
export const LEGAL = {
	registry: 'RSA-0156-2025',
	phone: '300 696 4582',
	phoneHref: '+573006964582',
	maker: 'Fabricado por Vitaliah S.A.S. · Calle 24 B N° 26-06, Bogotá, Colombia · Industria colombiana',
	label: 'Contiene edulcorantes. Consulta la información nutricional de cada producto.'
}

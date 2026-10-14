// Lo que repiten los copys de todos los advertoriales. Lo que cambia de uno a otro
// (el nombre, la presentación, el texto del pago, «Hecho en Colombia…») lo pone cada artículo.

export const CTA_LABEL = 'Quiero pedir mi Spray Nasal de Nambu'

// Rótulo de toda imagen que ilustra y no es del producto ni de una persona real
export const REFERENCE_NOTE = 'Imagen de referencia.'

export const OFFER = {
	formula: 'Eucalipto + Menta + Regaliz',
	price: '$79.900',
	currency: 'COP',
	shipping: 'Envío GRATIS',
	cta: CTA_LABEL
}

// Línea de confianza bajo los CTA intermedios: el envío y el pago, con las palabras del artículo
export const trustLine = payment => `Envío <strong>GRATIS</strong> <span aria-hidden="true">·</span> ${payment}`

// Barra de compra: fija abajo en móvil, tarjeta en el margen en escritorio
export const BUYBAR = {
	name: 'Spray Nasal de Nambu',
	specs: '60 ml · Eucalipto + Menta + Regaliz',
	price: '$79.900',
	sub: 'Envío GRATIS · pagas al recibir',
	cta: 'Lo quiero'
}

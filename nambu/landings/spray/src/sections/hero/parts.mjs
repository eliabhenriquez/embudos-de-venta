// Piezas que comparten las tres composiciones del hero: las mismas imágenes,
// el mismo precio junto al CTA y los mismos datos. Cambia cómo se colocan.
import { CDN, img } from '../../lib/markup.mjs'
import { cta } from '../../lib/cta.mjs'
import { payMethods } from '../../lib/pay.mjs'
import { priceBlock } from '../price.mjs'

export const SEPARATOR = ' <span aria-hidden="true">·</span> '
export const GALLERY_LABEL = 'Imágenes del Spray Nasal de Nambu'

// Imagen de una diapositiva: solo la primera es candidata a LCP
export const slideImage = ({ file, w, h, alt }, i, sizes) => img({ file, w, h, widths: [500, 800, w], sizes, alt, eager: i === 0 })

export const thumbImage = ({ file }, size = 160) => `<img src="${CDN}${file}?width=${size}" width="${size}" height="${size}" loading="lazy" decoding="async" alt="">`

export const pretitle = hero => `<p class="ns-hero__for${hero.badge ? ' ns-hero__for--badge' : ''}">${hero.pretitle.join(SEPARATOR)}</p>`

export const title = (hero, className = 'ns-h1') => `<h1 class="${className}">${hero.title}</h1>`

// Precio, CTA, confianza y medios de pago: siempre juntos y en la primera pantalla
export const buy = (hero, indent) => [
	priceBlock(hero.price, indent),
	`${indent}${cta(hero.cta)}`,
	`${indent}<p class="ns-hero__trust">${hero.trust}</p>`,
	payMethods(indent, { lazy: false })
].join('\n')

export const lead = (hero, indent) => `${indent}<p class="ns-lead ns-hero__lead">${hero.lead}</p>`

// Datos del producto. Cada composición los viste con su bloque (filas, cifras, fichas).
export const specs = (hero, indent, block) => [
	`${indent}<dl class="${block}" aria-label="Datos del producto">`,
	...hero.specs.map(([term, value]) => `${indent}\t<div class="${block}__item"><dt>${term}</dt><dd>${value}</dd></div>`),
	`${indent}</dl>`
].join('\n')

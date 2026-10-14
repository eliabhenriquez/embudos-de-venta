// Piezas de marcado compartidas por todas las secciones.
export const CDN = 'https://nambuoficial.com/cdn/shop/files/'
export const RELEASIT_CLASSES = '_rsi-cod-form-gempages-button-overwrite _rsi-cod-form-is-gempage'

const LAZY = 'loading="lazy" decoding="async"'
const EAGER = 'fetchpriority="high" decoding="async"'

// Imagen del CDN de Shopify con srcset. El src usa el segundo ancho (o el único).
export const img = ({ file, w, h, widths, sizes, alt, eager = false, className = '' }) => {
	const srcset = widths.map(width => `${CDN}${file}?width=${width} ${width}w`).join(', ')
	const src = widths[Math.min(1, widths.length - 1)]
	const cls = className ? `class="${className}" ` : ''
	return `<img ${cls}src="${CDN}${file}?width=${src}" srcset="${srcset}" sizes="${sizes}" width="${w}" height="${h}" ${eager ? EAGER : LAZY} alt="${alt}">`
}

// Imagen pequeña sin srcset (miniaturas, logotipos)
export const thumb = ({ file, width, w = width, h = width, alt = '', className = '', lazy = true }) => {
	const cls = className ? `class="${className}" ` : ''
	return `<img ${cls}src="${CDN}${file}?width=${width}" width="${w}" height="${h}" ${lazy ? LAZY : 'decoding="async"'} alt="${alt}">`
}

export const icon = (d, strokeWidth = 1.5) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`
export const check = icon('<path d="m5 12.5 4.5 4.5L19 7.5"/>', 1.8)
export const arrowLeft = icon('<path d="m15 6-6 6 6 6"/>')
export const arrowRight = icon('<path d="m9 6 6 6-6 6"/>')

export const ticks = (items, indent) => items.map(item => `${indent}<li>${check}${item}</li>`).join('\n')

// Flechas de un carrusel (prev deshabilitada al arrancar)
export const arrows = (prevLabel, nextLabel, indent) => `${indent}<div class="ns-arrows">
${indent}	<button type="button" class="ns-round" data-ns-prev disabled aria-label="${prevLabel}">${arrowLeft}</button>
${indent}	<button type="button" class="ns-round" data-ns-next aria-label="${nextLabel}">${arrowRight}</button>
${indent}</div>`

// Cabecera estándar de sección
export const head = ({ eyebrow, title, titleId, lead }, { className = 'ns-shell ns-head' } = {}) => [
	`\t\t<div class="${className}">`,
	`\t\t\t<p class="ns-eyebrow">${eyebrow}</p>`,
	`\t\t\t<h2 class="ns-h2" id="${titleId}">${title}</h2>`,
	...(lead ? [`\t\t\t<p class="ns-lead">${lead}</p>`] : []),
	'\t\t</div>'
].join('\n')

// Comentario de cabecera de una sección
export const banner = (title, lines = []) => {
	const top = `\t<!-- ============================ ${title} ============================`
	if (!lines.length) return `${top} -->`
	return [top, ...lines.map((line, i) => `\t     ${line}${i === lines.length - 1 ? ' -->' : ''}`)].join('\n')
}

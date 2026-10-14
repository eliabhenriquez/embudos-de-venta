// El CTA "el disparo": pictograma universal de spray con la silueta del producto.
// Cada 4,2 s se presiona la boquilla y sale una nube que cruza el botón entero.
import { RELEASIT_CLASSES } from './markup.mjs'

const PLUME = [[5, 3.4], [6, 4], [7, 4.6], [5.5, 3.6]]
const DROPS = [1.4, 1.8, 1.2, 2.2, 1.5, 1.9, 2.4, 1.3, 1.8, 2.1]

const spray = `<svg class="ns-cta__spray" viewBox="0 0 40 44" aria-hidden="true"><g class="ns-cta__bottle"><g class="ns-cta__pump"><path class="ns-cta__nozzle" d="M10.4 13.4 11.4 2.6h1.2l1 10.8z"/><rect class="ns-cta__flange" x="5.5" y="13.2" width="13" height="2.8" rx="1.4"/><rect class="ns-cta__collar" x="8.5" y="16" width="7" height="3.6" rx="0.8"/></g><rect class="ns-cta__body" x="5" y="19.4" width="14" height="22.4" rx="3.8"/><path class="ns-cta__band" d="M5 27h14v8H5z"/></g><g class="ns-cta__rest"><circle cx="17.5" cy="3.2" r="1.2"/><circle cx="21" cy="5.6" r="1.3"/><circle cx="17.8" cy="8.2" r="1.1"/></g><g class="ns-cta__plume">${PLUME.map(([rx, ry]) => `<ellipse cx="15" cy="4" rx="${rx}" ry="${ry}"/>`).join('')}</g><g class="ns-cta__mist">${DROPS.map(r => `<circle cx="15" cy="4" r="${r}"/>`).join('')}</g></svg>`

// pay: 'prepaid' | 'cod' escribe la elección en <html data-ns-pay> al pulsar
export const cta = (label, { size = 'block', pay, attrs = '' } = {}) => {
	const extra = [pay ? `data-ns-pay-choice="${pay}"` : '', attrs].filter(Boolean).join(' ')
	return `<button type="button" class="ns-cta ns-cta--${size} ${RELEASIT_CLASSES}" data-ns-cta${extra ? ' ' + extra : ''}>${spray}<span class="ns-cta__label">${label}</span></button>`
}

// Botón secundario (contraentrega): mismo formulario, sin animación
export const ghost = (label, { pay = 'cod' } = {}) => `<button type="button" class="ns-ghost ${RELEASIT_CLASSES}" data-ns-pay-choice="${pay}"><span class="ns-ghost__label">${label}</span></button>`

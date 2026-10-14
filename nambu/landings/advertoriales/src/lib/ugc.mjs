// Foto de una persona real del pool de UGC, con su nombre encima: es lo que la
// distingue de una imagen de referencia. El nombre ya va en el alt.
import { img } from '../../../spray/src/lib/markup.mjs'
import { person } from '../../../spray/src/lib/pool.mjs'

// shape: 'portrait' | 'step' | 'review' — el recorte lo pone el CSS (.ns-ugc--<shape>)
export const ugc = (slug, { shape, widths, sizes }) => {
	const who = person(slug)
	return `<span class="ns-ugc ns-ugc--${shape}">${img({ file: who.file, w: who.w, h: who.h, widths, sizes, alt: who.alt })}<span class="ns-ugc__name" aria-hidden="true">${who.name}</span></span>`
}

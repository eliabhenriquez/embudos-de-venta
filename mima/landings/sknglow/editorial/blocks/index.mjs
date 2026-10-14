// Registro de bloques: el `type` de cada entrada de un artículo → su render.
import { p, key, pull, heading } from './prose.mjs'
import { plate, flow, flatline, ladder, product } from './figures.mjs'
import { reason, signs, cards, advice } from './lists.mjs'
import { reviews } from './voices.mjs'
import { cta, offer } from './offer.mjs'

const BLOCKS = { p, key, pull, heading, plate, flow, flatline, ladder, product, reason, signs, cards, advice, reviews, cta, offer }

// context.id: id único del bloque dentro del artículo (los titulares lo llevan)
export const renderBlock = (block, context) => {
	const render = BLOCKS[block.type]
	if (!render) throw new Error(`Bloque desconocido: ${block.type}`)
	return render(block, context)
}

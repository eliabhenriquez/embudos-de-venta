// Registro de bloques: el `type` de cada entrada de un artículo → su render.
import { p, key, shout, pull, beats, run, rows, heading } from './prose.mjs'
import { photo, route, term, stat } from './figures.mjs'
import { spotlight, plants, portrait, cta, sequence, offer } from './product.mjs'
import { reviews, caution } from './voices.mjs'

const BLOCKS = { p, key, shout, pull, beats, run, rows, heading, photo, route, term, stat, spotlight, plants, portrait, cta, sequence, offer, reviews, caution }

// Un bloque con `hold` (el motivo) está escrito pero no se publica: el build lo salta y avisa
export const isHeld = block => Boolean(block.hold)

// context.id: id único del bloque dentro del artículo (titulares y regiones con nombre)
export const renderBlock = (block, context) => {
	const render = BLOCKS[block.type]
	if (!render) throw new Error(`Bloque desconocido: ${block.type}`)
	return render(block, context)
}

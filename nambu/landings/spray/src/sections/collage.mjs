import { img, banner } from '../lib/markup.mjs'
import { person } from '../lib/pool.mjs'

const TILES = ['a', 'b', 'c', 'd', 'e', 'f']
const SIZES = { a: '(min-width: 980px) 420px, 62vw', rest: '(min-width: 980px) 210px, 31vw' }

const tile = (slug, i) => {
	const p = person(slug)
	const mod = TILES[i]
	return `				<figure class="ns-collage__tile ns-collage__tile--${mod}" data-ns-defog>${img({ file: p.file, w: p.w, h: p.h, widths: [360, 700], sizes: SIZES[mod] || SIZES.rest, alt: p.alt })}</figure>`
}

export const collage = ({ collage }) => {
	if (collage.length !== TILES.length) throw new Error(`El collage lleva ${TILES.length} fotos`)
	return `${banner('COLLAGE: CLIENTES REALES', ['Seis personas reales con su frasco. Cada foto se despeja al entrar, una tras otra.'])}
	<section class="ns-section ns-collage" aria-labelledby="ns-collage-title">
		<div class="ns-shell ns-head">
			<p class="ns-eyebrow" id="ns-collage-title">Clientes reales</p>
		</div>
		<div class="ns-shell">
			<div class="ns-collage__grid">
${collage.map(tile).join('\n')}
			</div>
		</div>
	</section>`
}

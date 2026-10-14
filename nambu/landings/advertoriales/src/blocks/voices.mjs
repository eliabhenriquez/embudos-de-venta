// Testimonios y la nota de cuándo consultar.
import { arrows } from '../../../spray/src/lib/markup.mjs'
import { ugc } from '../lib/ugc.mjs'

// Personas reales del pool de UGC, solo con su nombre (/nambu/AGENTS.md §5): la foto abre la tarjeta
const review = ({ slug, quote, text }) => `					<figure class="ns-review">
						<figcaption class="ns-review__who">${ugc(slug, { shape: 'review', widths: [420, 680], sizes: '(min-width: 700px) 380px, 84vw' })}</figcaption>
						<blockquote class="ns-review__quote">${quote}</blockquote>
						<p class="ns-review__text">${text}</p>
					</figure>`

// Siempre carrusel, en móvil y en escritorio (/AGENTS.md §7): carril con asomo y flechas
export const reviews = ({ eyebrow, items }, { id }) => `			<section class="ns-reviews" aria-labelledby="${id}" data-ns-carousel-host>
				<div class="ns-reviews__head">
					<p class="ns-eyebrow" id="${id}">${eyebrow}</p>
${arrows('Testimonio anterior', 'Siguiente testimonio', '\t\t\t\t\t')}
				</div>
				<div class="ns-reviews__track" data-ns-carousel tabindex="0" role="region" aria-label="${eyebrow}">
${items.map(review).join('\n')}
				</div>
			</section>`

// Lo que el artículo deja claro: cuándo consultar y lo que el producto no hace
export const caution = ({ text, lines = [text] }) => `			<aside class="ns-caution" data-ns-reveal>
${lines.map(line => `				<p class="ns-caution__text">${line}</p>`).join('\n')}
			</aside>`

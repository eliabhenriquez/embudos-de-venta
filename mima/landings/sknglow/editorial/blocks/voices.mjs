// Las reseñas, en carril deslizable (/AGENTS.md §7: los testimonios van siempre en carrusel).
// El copy las pide como tarjeta de reseña, sin foto de rostro: nombre, ciudad, estrellas y texto.
import { railNav } from './rail.mjs'

const STARS = 5

export const reviews = ({ label, items }) => `			<div class="sg-reviews sg-rail" data-sg-rail data-sg-enter>
				<ul class="sg-rail__track" data-sg-rail-track tabindex="0" role="region" aria-label="${label}">
${items.map(({ name, place, text }) => `					<li class="sg-rail__item sg-reviews__item">
						<article class="sg-review">
							<p class="sg-review__stars" role="img" aria-label="${STARS} de ${STARS} estrellas">${'★'.repeat(STARS)}</p>
							<p class="sg-review__text">${text}</p>
							<p class="sg-review__who">${name} <span>· ${place}</span></p>
						</article>
					</li>`).join('\n')}
				</ul>
${railNav({ prev: 'Reseña anterior', next: 'Reseña siguiente', group: 'Elegir reseña', dots: items.map(({ name }) => `Ver la reseña de ${name}`) }, '\t\t\t\t')}
			</div>`

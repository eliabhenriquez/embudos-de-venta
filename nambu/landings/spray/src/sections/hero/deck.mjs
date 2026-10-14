// Hero C · La baraja: una cinta con los dolores del ángulo, el titular centrado y
// las cuatro imágenes apiladas en abanico. La de delante está despejada; las de
// detrás, empañadas. Pasar una la lanza fuera y la manda al fondo.
import { arrowLeft, arrowRight, banner } from '../../lib/markup.mjs'
import { SEPARATOR, GALLERY_LABEL, slideImage, title, buy, lead, specs } from './parts.mjs'

const SIZES = '(min-width: 980px) 440px, 84vw'
// Cada mitad de la cinta tiene que ser más ancha que la pantalla más ancha
const TICKER_REPEAT = 4
// Las cartas a partir de esta posición esperan ocultas al fondo del mazo
const HIDDEN_POSITION = 3

const DROP = '<svg class="ns-ticker__drop" viewBox="0 0 10 12" aria-hidden="true"><path d="M5 .8C3.4 3.4 1.6 5.4 1.6 7.6a3.4 3.4 0 0 0 6.8 0C8.4 5.4 6.6 3.4 5 .8z"/></svg>'

const tickerGroup = items => `<span class="ns-ticker__group">${Array.from({ length: TICKER_REPEAT }, () => items.map(item => `<span class="ns-ticker__item">${item}</span>${DROP}`).join('')).join('')}</span>`

const card = (item, i) => `					<figure class="ns-deck__card" data-ns-caption="${item.caption}" data-ns-pos="${Math.min(i, HIDDEN_POSITION)}"${i === 0 ? '' : ' aria-hidden="true"'}>
						${slideImage(item, i, SIZES)}
					</figure>`

export const deckHero = ({ hero }) => {
	const ticker = tickerGroup(hero.ticker || hero.pretitle)
	return `${banner('HERO: LA BARAJA', [
		'Cinta con los dolores del ángulo, titular centrado y las cuatro imágenes en',
		'abanico: la de delante despejada, las de detrás empañadas. Gesto, toque,',
		'flechas o teclado lanzan la de delante al fondo. El precio va en su tarjeta.'
	])}
	<section class="ns-hero ns-hero--deck" data-ns-live>
		<div class="ns-ticker" aria-hidden="true">
			<p class="ns-ticker__track">${ticker}${ticker}</p>
		</div>

		<div class="ns-shell ns-deck">
			<div class="ns-deck__intro">
				<p class="ns-sr">${hero.pretitle.join(SEPARATOR)}</p>
				${title(hero)}
			</div>

			<div class="ns-deck__gallery" data-ns-deck>
				<div class="ns-deck__stack" data-ns-deck-stack tabindex="0" role="region" aria-roledescription="carrusel" aria-label="${GALLERY_LABEL}">
${hero.slides.map(card).join('\n')}
				</div>
				<div class="ns-deck__bar">
					<button type="button" class="ns-deck__arrow" data-ns-deck-prev aria-label="Imagen anterior">${arrowLeft}</button>
					<p class="ns-deck__caption" aria-live="polite"><span data-ns-deck-label>${hero.slides[0].caption}</span> <span class="ns-deck__count"><span data-ns-deck-index>1</span> / ${hero.slides.length}</span></p>
					<button type="button" class="ns-deck__arrow" data-ns-deck-next aria-label="Imagen siguiente">${arrowRight}</button>
				</div>
			</div>

			<div class="ns-deck__buy">
${buy(hero, '\t\t\t\t')}
			</div>

			<div class="ns-deck__details">
${lead(hero, '\t\t\t\t')}
${specs(hero, '\t\t\t\t', 'ns-tiles')}
			</div>
		</div>
	</section>`
}

// Hero A · La galería que se despeja: titular arriba, la foto en un escenario con
// halo y bruma, y la leyenda con flechas en su propia fila.
import { arrowLeft, arrowRight, banner } from '../../lib/markup.mjs'
import { mist } from '../../lib/art.mjs'
import { GALLERY_LABEL, slideImage, thumbImage, pretitle, title, buy, lead, specs } from './parts.mjs'

const SIZES = '(min-width: 980px) 560px, 100vw'

const slide = (item, i) => `						<figure class="ns-slide${i === 0 ? ' is-current' : ''}" data-ns-caption="${item.caption}">
							${slideImage(item, i, SIZES)}
						</figure>`

const thumbButton = (item, i) => `						<button type="button" class="ns-thumb" data-ns-gallery-thumb="${i}" aria-label="Ver: ${item.caption}"${i === 0 ? ' aria-current="true"' : ''}>${thumbImage(item)}</button>`

export const galleryHero = ({ hero }) => `${banner('HERO: LA GALERÍA QUE SE DESPEJA', [
	'Cuatro imágenes a gesto y flechas, sin puntos. Al cambiar de imagen, un velo',
	'blanco se retira como vaho de un cristal. Nada encima de la foto: la leyenda',
	'va en su propia fila, debajo.'
])}
	<section class="ns-hero ns-hero--gallery" data-ns-live>
		<div class="ns-shell ns-hero__grid">
			<div class="ns-hero__intro">
				${pretitle(hero)}
				${title(hero)}
			</div>

			<div class="ns-hero__gallery" data-ns-gallery>
				${mist('ns-mist-hero')}
				<div class="ns-stage">
					<div class="ns-stage__track" data-ns-gallery-track tabindex="0" role="region" aria-label="${GALLERY_LABEL}">
${hero.slides.map(slide).join('\n')}
					</div>
				</div>
				<div class="ns-stage__bar">
					<button type="button" class="ns-round" data-ns-gallery-prev disabled aria-label="Imagen anterior">${arrowLeft}</button>
					<p class="ns-stage__caption" data-ns-gallery-caption aria-live="polite"><span data-ns-gallery-label>${hero.slides[0].caption}</span> <span class="ns-stage__count"><span data-ns-gallery-index>1</span> / ${hero.slides.length}</span></p>
					<button type="button" class="ns-round" data-ns-gallery-next aria-label="Imagen siguiente">${arrowRight}</button>
				</div>
				<div class="ns-thumbs" aria-label="Elegir imagen">
${hero.slides.map(thumbButton).join('\n')}
				</div>
			</div>

			<div class="ns-hero__buy">
${buy(hero, '\t\t\t\t')}

${lead(hero, '\t\t\t\t')}
${specs(hero, '\t\t\t\t', 'ns-specs')}
			</div>
		</div>
	</section>`

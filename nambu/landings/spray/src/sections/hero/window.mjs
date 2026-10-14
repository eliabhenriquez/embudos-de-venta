// Hero B · La ventana: la foto primero, a sangre desde el borde izquierdo, y sus
// cuatro vistas en un carril vertical al lado. Al cambiar de vista, el aire la barre.
import { banner } from '../../lib/markup.mjs'
import { GALLERY_LABEL, slideImage, thumbImage, title, buy, lead, specs } from './parts.mjs'

const SIZES = '(min-width: 980px) 480px, 78vw'
const THUMB_SIZE = 240

const slide = (item, i) => `						<figure class="ns-window__slide${i === 0 ? ' is-current' : ''}" data-ns-caption="${item.caption}">
							${slideImage(item, i, SIZES)}
						</figure>`

const thumbButton = (item, i) => `					<button type="button" class="ns-window__thumb" data-ns-gallery-thumb="${i}" aria-label="Ver: ${item.caption}"${i === 0 ? ' aria-current="true"' : ''}>${thumbImage(item, THUMB_SIZE)}</button>`

// El antetítulo en etiquetas: un dolor por pastilla. Con insignia, la primera va llena.
const tags = hero => `<ul class="ns-window__tags" aria-label="Para quién es">${hero.pretitle.map((item, i) => `<li class="ns-window__tag${hero.badge && i === 0 ? ' ns-window__tag--solid' : ''}">${item}</li>`).join('')}</ul>`

export const windowHero = ({ hero }) => `${banner('HERO: LA VENTANA', [
	'La foto primero, a sangre desde el borde izquierdo, con sus cuatro vistas en un',
	'carril vertical: se ve todo lo que hay sin flechas ni puntos. Al cambiar de vista,',
	'una franja de aire la cruza. Nada se queda encima de la foto.'
])}
	<section class="ns-hero ns-hero--window">
		<div class="ns-window">
			<div class="ns-window__gallery" data-ns-gallery>
				<div class="ns-window__frame">
					<div class="ns-window__track" data-ns-gallery-track tabindex="0" role="region" aria-label="${GALLERY_LABEL}">
${hero.slides.map(slide).join('\n')}
					</div>
				</div>
				<div class="ns-window__rail" role="group" aria-label="Elegir imagen">
${hero.slides.map(thumbButton).join('\n')}
				</div>
				<p class="ns-sr" aria-live="polite"><span data-ns-gallery-label>${hero.slides[0].caption}</span>, imagen <span data-ns-gallery-index>1</span> de ${hero.slides.length}</p>
			</div>

			<div class="ns-window__copy">
				<div class="ns-window__intro">
					${tags(hero)}
					${title(hero)}
				</div>
				<div class="ns-window__buy">
${buy(hero, '\t\t\t\t\t')}
				</div>
				<div class="ns-window__details">
${lead(hero, '\t\t\t\t\t')}
${specs(hero, '\t\t\t\t\t', 'ns-stats')}
				</div>
			</div>
		</div>
	</section>`

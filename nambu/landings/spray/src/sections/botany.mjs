import { img, icon, banner, head } from '../lib/markup.mjs'
import { formulaArt } from '../lib/art.mjs'

export const PACKSHOT = { file: 'landings-spray-packshot.webp', w: 601, h: 1100, widths: [360, 601], alt: 'Frasco de Spray Nasal de Nambu de 60 ml' }

const PLANTS = [
	{ name: 'Eucalipto', photo: { file: 'landings-spray-ingrediente-eucalipto.webp', w: 900, h: 600, alt: 'Ramas de eucalipto de hoja redonda' }, icon: '<path d="M12 21V8"/><path d="M12 12c-3.4 0-5-1.8-5-4.4C9.4 7.6 12 9 12 12Z"/><path d="M12 9c0-3 2-4.8 5.4-5C17.4 7 15.4 9 12 9Z"/><path d="M12 16c-2.8 0-4.2-1.5-4.2-3.7C10 12.3 12 13.5 12 16Z"/>' },
	{ name: 'Menta', photo: { file: 'landings-spray-ingrediente-menta.webp', w: 900, h: 600, alt: 'Planta de menta fresca' }, icon: '<path d="M12 20c-4.4 0-7-2.6-7-7 4.4 0 7 2.6 7 7Z"/><path d="M12 20c4.4 0 7-2.6 7-7-4.4 0-7 2.6-7 7Z"/><path d="M12 20V9"/><path d="M12 9c-2.4-1.2-3.4-3-3-5.4 2.4.4 3.8 2.2 3 5.4Z"/>' },
	{ name: 'Regaliz', photo: { file: 'landings-spray-ingrediente-regaliz.webp', w: 900, h: 473, alt: 'Raíces de regaliz cortadas' }, icon: '<path d="M12 3v7"/><path d="M12 10c-1.6 1.4-2.4 3.2-2.4 5.4A2.4 2.4 0 0 0 12 18a2.4 2.4 0 0 0 2.4-2.6c0-2.2-.8-4-2.4-5.4Z"/><path d="M9 6.5C7.6 6 6.6 5 6 3.5c1.8-.2 3 .8 3 3Z"/><path d="M15 6.5c1.4-.5 2.4-1.5 3-3-1.8-.2-3 .8-3 3Z"/><path d="M10 21h4"/>' }
]

const plant = (text, i) => {
	const { name, photo, icon: d } = PLANTS[i]
	const isOn = i === 0
	return `					<li class="ns-plant${isOn ? ' is-on' : ''}">
						<figure class="ns-plant__photo">${img({ ...photo, widths: [450, 900], sizes: '(min-width: 980px) 200px, 92vw' })}</figure>
						<div class="ns-plant__body">
							<div class="ns-plant__head">
								<h3 class="ns-plant__name">${name}</h3>
								<button type="button" class="ns-plant__button" data-ns-plant="${i + 1}" aria-pressed="${isOn}" aria-label="Destacar ${name.toLowerCase()}">${icon(d)}</button>
							</div>
							<p>${text}</p>
						</div>
					</li>`
}

export const botany = ({ botany }) => `${banner('MECANISMO: TRES PLANTAS, UN FRASCO', [
	'Eucalipto y menta a los lados, el frasco de pie sobre las raíces de regaliz y los',
	'extractos que viajan de cada planta al frasco. La tarjeta elegida destaca su planta.'
])}
	<section class="ns-section ns-section--tint ns-botany" aria-labelledby="ns-botany-title">
${head({ eyebrow: 'La fórmula', title: 'Tres plantas. Una fórmula hecha en Colombia.', titleId: 'ns-botany-title', lead: botany.lead })}

		<div class="ns-shell ns-botany__grid">
			<figure class="ns-formula" data-ns-defog data-ns-live>
				${formulaArt}
				${img({ ...PACKSHOT, sizes: '(min-width: 980px) 120px, 34vw' })}
			</figure>
			<ol class="ns-plants" data-ns-plants aria-label="Las tres plantas de la fórmula">
${botany.plants.map(plant).join('\n')}
			</ol>
		</div>

		<div class="ns-shell">
			<p class="ns-botany__claim">${botany.claim}</p>
			<p class="ns-note"><strong>Nota sobre la etiqueta:</strong> comunicamos los nombres de las plantas de origen para explicar la fórmula de manera sencilla. En el empaque físico aparecen las nomenclaturas técnicas utilizadas para declarar sus extractos y componentes.</p>
		</div>
	</section>`

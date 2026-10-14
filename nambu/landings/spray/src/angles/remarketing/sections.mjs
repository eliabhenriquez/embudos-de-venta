// Sello del remarketing: el precio que baja, escalón a escalón, y las dudas que frenaron la compra.
import { ticks, arrows, banner } from '../../lib/markup.mjs'
import { cta } from '../../lib/cta.mjs'
import { payMethods } from '../../lib/pay.mjs'

// Tachado dibujado: la línea cruza el precio viejo al entrar en pantalla
const struck = value => `<s class="ns-ladder__was"><span>${value}</span></s>`

export const ladder = ({ ladder }) => `${banner('EL PRECIO QUE BAJA', [
	'Tres escalones: el precio habitual tachado, la oferta contraentrega (la protagonista)',
	'y el anticipado como descuento extra. Las líneas del tachado se dibujan al verlas.'
])}
	<section class="ns-section ns-section--tint ns-ladder" aria-labelledby="ns-ladder-title">
		<div class="ns-shell ns-head">
			<p class="ns-eyebrow">${ladder.eyebrow}</p>
			<h2 class="ns-h2" id="ns-ladder-title">${ladder.title}</h2>
		</div>
		<div class="ns-shell">
			<ol class="ns-ladder__steps" data-ns-live>
				<li class="ns-ladder__step ns-ladder__step--before">
					<p class="ns-ladder__label">${ladder.before.label}</p>
					<p class="ns-ladder__figure">${struck(ladder.before.figure)} <span class="ns-ladder__cur">COP</span></p>
				</li>
				<li class="ns-ladder__step ns-ladder__step--cod">
					<p class="ns-ladder__label">${ladder.cod.label}</p>
					<p class="ns-ladder__figure">${ladder.cod.figure} <span class="ns-ladder__cur">COP</span></p>
					<p class="ns-ladder__note">${ladder.cod.note}</p>
					${cta(ladder.cod.cta, { pay: 'cod' })}
				</li>
				<li class="ns-ladder__step ns-ladder__step--prepaid">
					<h3 class="ns-ladder__title">${ladder.prepaid.title}</h3>
					<p class="ns-ladder__text">${ladder.prepaid.text}</p>
					<p class="ns-ladder__figure">${struck(ladder.prepaid.was)} <span class="ns-ladder__now">${ladder.prepaid.figure} <span class="ns-ladder__cur">COP</span></span></p>
					<ul class="ns-ticks">
${ticks(ladder.prepaid.ticks, '\t\t\t\t\t\t')}
					</ul>
					<p class="ns-ladder__total">${ladder.prepaid.total}</p>
					${cta(ladder.prepaid.cta, { pay: 'prepaid' })}
${payMethods('\t\t\t\t\t')}
				</li>
			</ol>
		</div>
	</section>`

const doubt = ({ quote, answer }) => `			<article class="ns-doubt">
				<p class="ns-doubt__quote">“${quote}”</p>
				<div class="ns-doubt__answer">${answer.map(p => `<p>${p}</p>`).join('')}</div>
			</article>`

export const doubts = ({ doubts }) => `${banner('LAS DUDAS QUE FRENARON LA COMPRA', ['Cuatro dudas en un carril con asomo; cada una en su bocadillo y la respuesta debajo.'])}
	<section class="ns-section ns-doubts" aria-labelledby="ns-doubts-title" data-ns-carousel-host>
		<div class="ns-shell ns-voices__head">
			<div>
				<p class="ns-eyebrow">${doubts.eyebrow}</p>
				<h2 class="ns-h2" id="ns-doubts-title">${doubts.title}</h2>
			</div>
${arrows('Duda anterior', 'Siguiente duda', '\t\t\t')}
		</div>
		<div class="ns-doubts__track" data-ns-carousel tabindex="0" role="region" aria-label="Dudas antes de comprar">
${doubts.items.map(doubt).join('\n')}
		</div>
	</section>`

import { img, ticks, banner } from '../lib/markup.mjs'
import { PACKSHOT } from './botany.mjs'

export const box = ({ box }) => `${banner('LO QUE TE LLEGA A CASA')}
	<section class="ns-section ns-box" aria-labelledby="ns-box-title">
		<div class="ns-shell ns-box__grid">
			<figure class="ns-box__product" data-ns-defog>
				${img({ ...PACKSHOT, sizes: '(min-width: 980px) 260px, 46vw' })}
			</figure>
			<div class="ns-box__copy">
				<p class="ns-eyebrow">${box.eyebrow}</p>
				<h2 class="ns-h2" id="ns-box-title">1 Spray Nasal de Nambu</h2>
				<ul class="ns-ticks">
${ticks(box.ticks, '\t\t\t\t\t')}
				</ul>
				<dl class="ns-box__prices">
${box.prices.map(({ label, value, main }) => `					<div class="ns-box__price${main ? ' ns-box__price--main' : ''}"><dt>${label}</dt><dd>${value}</dd></div>`).join('\n')}
				</dl>
			</div>
		</div>
		<figure class="ns-shell ns-box__proof">
			<span class="ns-box__proof-photo">${img({ file: 'landings-spray-empaque.webp', w: 678, h: 1190, widths: [320, 520], sizes: '(min-width: 700px) 150px, 30vw', alt: 'Un pedido de Spray Nasal de Nambu preparándose para el envío' })}</span>
			<figcaption>Pedido de Spray Nasal de Nambu en preparación.</figcaption>
		</figure>
	</section>`

import { ticks, banner } from '../lib/markup.mjs'
import { cta } from '../lib/cta.mjs'

export const offer = ({ offer }) => `${banner('OFERTA')}
	<section class="ns-section ns-offer" aria-labelledby="ns-offer-title">
		<div class="ns-shell">
			<div class="ns-offer__card">
				<div class="ns-offer__copy">
					<p class="ns-eyebrow">La oferta</p>
					<h2 class="ns-h2" id="ns-offer-title">El doble de contenido. Por $79.900.</h2>
				</div>
				<div class="ns-offer__deal">
					<p class="ns-offer__figure">$79.900 <span>COP</span></p>
					<p class="ns-price__alt"><span>${offer.alt}</span><span class="ns-price__save">Ahorras $10.000.</span></p>
					<ul class="ns-ticks">
${ticks(['60 ml.', 'Envío GRATIS.', 'Directo hasta tu casa.'], '\t\t\t\t\t\t')}
					</ul>
					${cta('Quiero ahorrar $10.000', { pay: 'prepaid' })}
				</div>
			</div>
		</div>
	</section>`

import { ticks, banner, head } from '../lib/markup.mjs'
import { cta, ghost } from '../lib/cta.mjs'
import { payMethods } from '../lib/pay.mjs'

export const pay = () => `${banner('ELECCIÓN DE PAGO', [
	'El anticipado va con jerarquía clara; el contraentrega queda visible y sin',
	'trabas. La elección se escribe en <html data-ns-pay> para que el skin del',
	'formulario la respete (/nambu/AGENTS.md §4).'
])}
	<section class="ns-section ns-section--tint ns-pay" aria-labelledby="ns-pay-title">
${head({ eyebrow: 'Cómo quieres pagar', title: 'Pagar anticipado te ahorra $10.000.', titleId: 'ns-pay-title' })}
		<div class="ns-shell ns-pay__grid">
			<article class="ns-plan ns-plan--best">
				<p class="ns-plan__top"><span class="ns-plan__label">Pago anticipado</span><span class="ns-plan__save">Ahorras $10.000</span></p>
				<p class="ns-plan__figure">$69.900 <span>COP</span></p>
				<p class="ns-plan__before">Precio regular <strong>$79.900 COP</strong></p>
				<ul class="ns-ticks">
${ticks(['Mismo frasco.', 'Mismos 60 ml.', '<strong>$10.000 menos.</strong>'], '\t\t\t\t\t')}
				</ul>
				${cta('Quiero pagar anticipado y ahorrar', { pay: 'prepaid' })}
${payMethods('\t\t\t\t')}
			</article>
			<article class="ns-plan">
				<p class="ns-plan__top"><span class="ns-plan__label">Pago contra entrega</span></p>
				<p class="ns-plan__figure ns-plan__figure--alt">$79.900 <span>COP</span></p>
				<p class="ns-plan__before">También puedes pagar cuando llegue.</p>
				${ghost('Prefiero pagar al recibir')}
			</article>
		</div>
	</section>`

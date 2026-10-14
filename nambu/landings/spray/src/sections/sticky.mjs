import { banner } from '../lib/markup.mjs'
import { cta } from '../lib/cta.mjs'

export const sticky = ({ sticky }) => `${banner('CTA FIJO EN MÓVIL')}
	<div class="ns-sticky" data-ns-sticky hidden>
		<div class="ns-sticky__inner">
			<p class="ns-sticky__price"><strong data-ns-sticky-price>${sticky.price}</strong><span data-ns-sticky-sub>${sticky.sub}</span></p>
			${cta(sticky.cta, { size: 'sm', attrs: 'data-ns-sticky-cta' })}
		</div>
	</div>`

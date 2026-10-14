import { icon, ticks, banner, head } from '../lib/markup.mjs'

export const versus = ({ versus }) => `${banner('COMPARATIVA')}
	<section class="ns-section ns-versus" aria-labelledby="ns-versus-title">
${head({ eyebrow: 'La diferencia', title: versus.title, titleId: 'ns-versus-title' })}
		<div class="ns-shell ns-versus__grid">
			<article class="ns-compare">
				<p class="ns-compare__tag">Presentación común</p>
				<p class="ns-compare__figure">30 ml</p>
				<ul class="ns-compare__list">
					<li>${icon('<path d="M7 12h10"/>')}Menor cantidad por frasco</li>
					<li>${icon('<circle cx="12" cy="12" r="8"/><path d="M12 8v4.5l3 1.8"/>')}Se termina antes con el uso frecuente</li>
				</ul>
			</article>
			<article class="ns-compare ns-compare--ours">
				<p class="ns-compare__tag">Spray Nasal de Nambu</p>
				<p class="ns-compare__figure">60 ml</p>
				<ul class="ns-compare__list">
${ticks(['El doble frente al formato de 30 ml', 'Extractos botánicos de origen colombiano', 'Aplicación nasal directa'], '\t\t\t\t\t')}
				</ul>
				<p class="ns-compare__price">${versus.price}</p>
			</article>
		</div>
	</section>`

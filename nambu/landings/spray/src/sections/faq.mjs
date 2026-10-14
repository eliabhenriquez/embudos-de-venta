import { banner } from '../lib/markup.mjs'

const item = ({ q, a }) => `			<details class="ns-faq__item" name="ns-faq">
				<summary><span>${q}</span></summary>
				<div class="ns-faq__answer">${a.map(p => `<p>${p}</p>`).join('')}</div>
			</details>`

export const faq = ({ faq }) => `${banner('FAQ')}
	<section class="ns-section ns-section--tint ns-faq" aria-labelledby="ns-faq-title">
		<div class="ns-shell ns-narrow">
			<p class="ns-eyebrow">Preguntas frecuentes</p>
			<h2 class="ns-h2" id="ns-faq-title">Lo que la gente pregunta antes de pedirlo</h2>
${faq.map(item).join('\n')}
		</div>
	</section>`

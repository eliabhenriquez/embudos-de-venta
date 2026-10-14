import { banner, head } from '../lib/markup.mjs'
import { sourceBrand } from '../lib/logos.mjs'

const source = ({ brand, title, text }) => `			<article class="ns-source">
				${sourceBrand(brand)}
				<h3 class="ns-source__title">${title}</h3>
				<p>${text}</p>
			</article>`

export const sources = ({ sources }) => `${banner('AUTORIDAD')}
	<section class="ns-section ns-sources" aria-labelledby="ns-sources-title">
${head({ eyebrow: sources.eyebrow, title: sources.title, titleId: 'ns-sources-title' })}
		<div class="ns-shell ns-sources__grid">
${sources.items.map(source).join('\n')}
		</div>
		<div class="ns-shell">
			<p class="ns-note">${sources.note}</p>
		</div>
	</section>`

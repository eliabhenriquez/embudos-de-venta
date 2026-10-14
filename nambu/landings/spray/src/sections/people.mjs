import { img, arrows, banner } from '../lib/markup.mjs'
import { person } from '../lib/pool.mjs'

const capsule = slug => {
	const p = person(slug)
	return `			<figure class="ns-capsule">
				<span class="ns-capsule__frame">${img({ file: p.file, w: p.w, h: p.h, widths: [320, 520], sizes: '150px', alt: p.alt })}</span>
				<figcaption>${p.name}</figcaption>
			</figure>`
}

export const people = ({ people }) => `${banner('PERSONAS REALES: GOTAS SUSPENDIDAS')}
	<section class="ns-people" aria-labelledby="ns-people-title" data-ns-carousel-host>
		<div class="ns-shell ns-people__head">
			<h2 class="ns-eyebrow" id="ns-people-title">${people.title}</h2>
${arrows('Ver personas anteriores', 'Ver más personas', '\t\t\t')}
		</div>
		<div class="ns-people__track" data-ns-carousel data-ns-live tabindex="0" role="region" aria-label="Personas reales con el Spray Nasal de Nambu">
${people.order.map(capsule).join('\n')}
		</div>
	</section>`

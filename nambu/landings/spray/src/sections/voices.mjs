import { img, arrows, banner } from '../lib/markup.mjs'
import { cta } from '../lib/cta.mjs'
import { person } from '../lib/pool.mjs'

// Los testimonios del copy se asignan a personas reales del pool, solo con su
// nombre (decisión del cliente: sin edades ni ciudades inventadas).
const voice = ({ slug, quote, text }) => {
	const p = person(slug)
	return `			<figure class="ns-voice">
				<span class="ns-voice__photo">${img({ file: p.file, w: p.w, h: p.h, widths: [420, p.w], sizes: '(min-width: 980px) 460px, 80vw', alt: p.alt })}</span>
				<figcaption class="ns-voice__body">
					<blockquote class="ns-voice__quote">${quote}</blockquote>
					<p class="ns-voice__text">${text}</p>
					<p class="ns-voice__who">${p.name}</p>
				</figcaption>
			</figure>`
}

export const voices = ({ voices }) => `${banner('TESTIMONIOS', ['Personas reales del pool de UGC, con su nombre real. Carril con asomo.'])}
	<section class="ns-section ns-section--tint ns-voices" aria-labelledby="ns-voices-title" data-ns-carousel-host>
		<div class="ns-shell ns-voices__head">
			<div>
				<p class="ns-eyebrow">Testimonios reales</p>
				<h2 class="ns-h2" id="ns-voices-title">${voices.title}</h2>
			</div>
${arrows('Testimonio anterior', 'Siguiente testimonio', '\t\t\t')}
		</div>
		<div class="ns-voices__track" data-ns-carousel tabindex="0" role="region" aria-label="Testimonios de personas reales">
${voices.items.map(voice).join('\n')}
		</div>
		<div class="ns-shell ns-cta-row">
			${cta('Quiero mi Spray Nasal de Nambu')}
		</div>
	</section>`

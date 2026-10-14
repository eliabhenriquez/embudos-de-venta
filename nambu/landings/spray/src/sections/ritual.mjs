import { ticks, banner, head } from '../lib/markup.mjs'
import { momentScene } from '../lib/art.mjs'

const moment = (sky, name) => `				<li class="ns-moment">
${momentScene(sky)}
					<h3>${name}</h3>
					<p>2 aplicaciones en cada fosa nasal.</p>
				</li>`

export const ritual = ({ ritual }) => `${banner('MODO DE USO: DOS DISPAROS', ['Cada momento dibuja el gesto: el frasco y sus dos disparos, uno tras otro.'])}
	<section class="ns-section ns-section--tint ns-ritual" aria-labelledby="ns-ritual-title">
${head({ eyebrow: 'Modo de uso', title: ritual.title, titleId: 'ns-ritual-title' })}
		<div class="ns-shell">
			<ol class="ns-moments" data-ns-live>
${moment('morning', 'Mañana')}
${moment('night', 'Noche')}
			</ol>
			<ul class="ns-ritual__easy">
${ticks(ritual.easy, '\t\t\t\t')}
			</ul>${ritual.note ? `
			<p class="ns-ritual__note">${ritual.note}</p>` : ''}
		</div>
	</section>`

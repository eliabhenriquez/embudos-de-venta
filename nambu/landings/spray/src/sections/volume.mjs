import { icon, banner } from '../lib/markup.mjs'
import { bottle } from '../lib/art.mjs'

export const volume = ({ volume }) => `${banner('60 ML: EL FRASCO QUE SE LLENA', [
	'Dos frascos dibujados; el líquido sube al entrar en pantalla y su superficie',
	'se mece. El de 30 ml es más pequeño entero. La cifra grande es el argumento: el doble.'
])}
	<section class="ns-section ns-section--tint ns-volume" aria-labelledby="ns-volume-title">
		<div class="ns-shell ns-volume__grid">
			<div class="ns-volume__copy">
				<p class="ns-eyebrow">El doble de contenido</p>
				<h2 class="ns-volume__title" id="ns-volume-title"><span class="ns-volume__big">60 ml.</span> <span class="ns-volume__yes${volume.long ? ' ns-volume__yes--long' : ''}">${volume.yes}</span></h2>
				<p class="ns-lead">${volume.lead}</p>
				<p class="ns-volume__claim">${volume.claim}</p>
				<ul class="ns-volume__gains">
					<li>${icon('<path d="M12 5v14M5 12h14"/>')}Más aplicaciones disponibles.</li>
					<li>${icon('<circle cx="12" cy="12" r="8"/><path d="M12 8v4.5l3 1.8"/>')}Más tiempo antes de volver a comprar.</li>
				</ul>${volume.from ? `
				<p class="ns-volume__from">${volume.from}</p>` : ''}
			</div>
			<div class="ns-bottles" data-ns-bottles data-ns-live>
${bottle({ mod: 'common', fill: 'half', label: 'Frasco de 30 mililitros, lleno hasta la mitad', size: '30 ml', caption: 'Presentación común' })}
${bottle({ mod: 'ours', fill: 'full', label: 'Frasco de 60 mililitros de Nambu, lleno del todo', size: '60 ml', caption: 'Spray Nasal de Nambu' })}
			</div>
		</div>
	</section>`

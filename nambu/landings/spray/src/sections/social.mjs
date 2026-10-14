import { img, banner } from '../lib/markup.mjs'

// Captura de la bio de Instagram: común a todas las landings (nambu/shared/assets)
export const social = () => `${banner('INSTAGRAM')}
	<section class="ns-social" aria-labelledby="ns-social-title">
		<div class="ns-shell ns-narrow">
			<p class="ns-eyebrow" id="ns-social-title">Nuestra comunidad</p>
			<figure class="ns-social__card">
				${img({ file: 'landings-spray-instagram.webp', w: 1200, h: 330, widths: [520, 760, 1200], sizes: '(min-width: 760px) 640px, 92vw', alt: 'Perfil de Instagram de @nambuoficial con 104 publicaciones y 21,8 mil seguidores' })}
				<figcaption>@nambuoficial · El Pacífico susurra. Tu cuerpo escucha.</figcaption>
			</figure>
		</div>
	</section>`

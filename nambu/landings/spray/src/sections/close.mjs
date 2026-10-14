import { CDN, img, banner } from '../lib/markup.mjs'
import { cta } from '../lib/cta.mjs'
import { mist } from '../lib/art.mjs'
import { payMethods } from '../lib/pay.mjs'
import { PACKSHOT } from './botany.mjs'

// El cierre repite la idea del hero: dolores tachados (o un subtítulo), precio y CTA
export const close = ({ close }) => `${banner('CIERRE: EL FRASCO ENTRE LA BRUMA')}
	<section class="ns-section ns-close" aria-labelledby="ns-close-title" data-ns-live>
		<div class="ns-shell ns-close__grid">
			<figure class="ns-close__product" data-ns-defog>
				${mist('ns-mist-close')}
				${img({ ...PACKSHOT, sizes: '(min-width: 980px) 280px, 50vw' })}
			</figure>
			<div class="ns-close__copy">
				<img class="ns-close__logo" src="${CDN}landings-nambu-wordmark-green.webp?width=240" width="568" height="138" loading="lazy" decoding="async" alt="Nambu">
				<h2 class="ns-h2" id="ns-close-title">${close.title}</h2>${close.pains ? `
				<ul class="ns-close__pains" aria-label="Lo que dejas atrás">
${close.pains.map(pain => `					<li>${pain}</li>`).join('\n')}
				</ul>` : ''}${close.sub ? `
				<p class="ns-close__sub">${close.sub}</p>` : ''}
				<p class="ns-close__product-name">Spray Nasal de Nambu</p>
				<p class="ns-close__claim">${close.claim}</p>
				<p class="ns-close__regular">${close.price.label}</p>
				<p class="ns-close__figure">${close.price.was ? `<s class="ns-close__was">${close.price.was}</s> ` : ''}${close.price.figure} <span>COP</span></p>
				<p class="ns-price__alt ns-close__alt"><span>${close.price.alt}</span><span class="ns-price__save">${close.price.save}</span></p>
				${cta(close.cta)}
${payMethods('\t\t\t\t')}
				<p class="ns-close__legal">Producto de bienestar de origen botánico. Registro sanitario como producto homeopático en trámite ante INVIMA. No sustituye la indicación de un profesional de salud.</p>
			</div>
		</div>
	</section>`

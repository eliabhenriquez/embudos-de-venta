// El marco del artículo: progreso, encabezado, pie y barra de compra.
import { img, thumb } from '../../../spray/src/lib/markup.mjs'
import { cta } from '../../../spray/src/lib/cta.mjs'
import { sourceBrand } from '../../../spray/src/lib/logos.mjs'
import { payMethods } from '../../../spray/src/lib/pay.mjs'
import { photo as findPhoto } from '../lib/photos.mjs'

const WORDMARK = { file: 'landings-nambu-wordmark-green.webp', width: 240, w: 568, h: 138 }

export const progress = () => `	<div class="ns-progress" aria-hidden="true"><span class="ns-progress__bar" data-ns-progress></span></div>`

// Las fuentes del artículo, en la fila de datos: con su logotipo si se entregó, con su nombre si no
const sourceItem = ({ label, brand, names }) => `<li class="ns-meta__item"><span>${label}</span>${brand ? sourceBrand(brand) : `<span class="ns-meta__names">${names}</span>`}</li>`

// El antetítulo declara de quién es el contenido: el logotipo hace de la palabra «Nambu»
export const head = ({ kicker, title, dek, source }, { minutes, titleId }) => `			<header class="ns-article__head">
				<p class="ns-kicker"><span class="ns-kicker__text">${kicker.text}</span> ${thumb({ ...WORDMARK, alt: kicker.brand, className: 'ns-kicker__logo', lazy: false })}</p>
				<h1 class="ns-article__title" id="${titleId}">${title}</h1>
				<p class="ns-article__dek">${dek}</p>
				<ul class="ns-meta">
					<li class="ns-meta__item">Lectura de ${minutes} min</li>${source ? `\n\t\t\t\t\t${sourceItem(source)}` : ''}
				</ul>
			</header>`

// Fuentes y aviso del copy, línea a línea; debajo, la captura de Instagram de la marca (/AGENTS.md §7)
export const foot = ({ footnote }) => `			<footer class="ns-foot">
				<div class="ns-foot__sources">${footnote.brand ? `\n\t\t\t\t\t${sourceBrand(footnote.brand)}` : ''}
${footnote.lines.map(line => `					<p>${line}</p>`).join('\n')}
				</div>
				<figure class="ns-follow">
					${img({ file: 'landings-spray-instagram.webp', w: 1200, h: 330, widths: [520, 760, 1200], sizes: '(min-width: 740px) 680px, calc(100vw - 40px)', alt: 'Perfil de Instagram de @nambuoficial con 104 publicaciones y 21,8 mil seguidores' })}
					<figcaption>@nambuoficial · El Pacífico susurra. Tu cuerpo escucha.</figcaption>
				</figure>
			</footer>`

// Un solo componente: barra fija abajo en móvil, que sale cuando el artículo ya presentó
// el producto (data-ns-buybar-from), y tarjeta del margen en escritorio, siempre visible.
export const buybar = ({ buybar }) => `		<aside class="ns-buybar" data-ns-buybar aria-label="${buybar.name}">
			<span class="ns-buybar__shot">${thumb({ ...findPhoto('packshot'), width: 300 })}</span>
			<p class="ns-buybar__name">${buybar.name}</p>
			<p class="ns-buybar__specs">${buybar.specs}</p>
			<div class="ns-buybar__row">
				<p class="ns-buybar__price"><strong>${buybar.price}</strong><span>${buybar.sub}</span></p>
				${cta(buybar.cta, { size: 'sm' })}
			</div>
${payMethods('\t\t\t')}
		</aside>`

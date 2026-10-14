// El marco del artículo: progreso de lectura, cabecera, pie, barra de compra y visor.
import { img } from '../lib/images.mjs'
import { cta } from '../lib/cta.mjs'
import { payMethods } from './offer.mjs'

const CHECK_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
const CLOSE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'

export const progress = () => `	<div class="sg-progress" aria-hidden="true"><span class="sg-progress__bar" data-sg-progress></span></div>`

// La franja de arriba dice de quién es la página: el logotipo y la etiqueta de publicidad
export const masthead = ({ label }) => `			<div class="sg-mast">
				${img('logo', { widths: [160, 300], sizes: '74px', priority: 'eager', className: 'sg-mast__logo' })}
				<p class="sg-mast__label">${label}</p>
			</div>`

// El número con el que abre el titular de un listicle («5 razones…») se saca en grande
const LEADING_COUNT = /^(\d+)\s+/
const countTitle = title => title.replace(LEADING_COUNT, '<span class="sg-title__count">$1</span> ')

// Firma del copy tal cual: nombre, lugar y la marca de verificado
const signature = ({ name, place, badge }) => `
					<span class="sg-byline__name">Por ${name}</span>
					<span class="sg-byline__place">${place}</span>
					<span class="sg-byline__badge">${CHECK_ICON}${badge}</span>`

// La bajada y la firma solo van si el copy las trae. Los minutos de lectura se miden
// sobre el copy.
export const head = ({ title, dek, byline }, { minutes, titleId }) => `			<header class="sg-head">
				<h1 class="sg-title" id="${titleId}">${countTitle(title)}</h1>${dek ? `
				<p class="sg-dek">${dek}</p>` : ''}
				<p class="sg-byline">${byline ? signature(byline) : ''}
					<span class="sg-byline__time">Lectura de ${minutes} min</span>
				</p>
			</header>`

// Captura de Instagram de la marca (/AGENTS.md §7) y los datos legales del producto
export const foot = ({ legal }) => `			<footer class="sg-foot">
				<figure class="sg-foot__social">
					${img('instagram', { widths: [520, 760, 1040, 1600], sizes: '(min-width: 720px) 680px, calc(100vw - 40px)' })}
				</figure>
				<dl class="sg-foot__data">
					<div><dt>Registro INVIMA</dt><dd>${legal.registry}</dd></div>
					<div><dt>Atención al cliente MIMA</dt><dd><a href="tel:${legal.phoneHref}">${legal.phone}</a></dd></div>
				</dl>
				<p class="sg-foot__line">${legal.maker}</p>
				<p class="sg-foot__line">${legal.label}</p>
			</footer>`

// Un solo componente: barra fija abajo en móvil, que sale cuando el relato ya presentó el
// producto, y tarjeta del margen derecho en escritorio.
export const buybar = ({ name, specs, price, sub, label }) => `		<aside class="sg-buybar" data-sg-buybar aria-label="${name}">
			<span class="sg-buybar__shot">${img('product', { widths: [240, 420], sizes: '110px' })}</span>
			<p class="sg-buybar__name">${name}</p>
			<p class="sg-buybar__specs">${specs}</p>
			<div class="sg-buybar__row">
				<p class="sg-buybar__price"><strong>${price}</strong> <span>${sub}</span></p>
				${cta(label, { small: true })}
			</div>
${payMethods('\t\t\t')}
		</aside>`

// El visor de láminas. Sin <dialog> en el navegador no se usa: el enlace abre el archivo.
export const viewer = () => `	<dialog class="sg-viewer" data-sg-viewer aria-label="Imagen ampliada">
		<div class="sg-viewer__scroll" data-sg-viewer-scroll>
			<img class="sg-viewer__img" data-sg-viewer-image alt="">
		</div>
		<button type="button" class="sg-viewer__close" data-sg-viewer-close aria-label="Cerrar la imagen">${CLOSE_ICON}</button>
	</dialog>`

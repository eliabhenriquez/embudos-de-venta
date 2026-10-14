// Las imágenes del artículo: láminas y fotos con pie, el recorrido por pasos, la línea
// plana de lo que ya se probó, el orden de prioridades y la ficha del producto.
import { image, img, url } from '../lib/images.mjs'
import { railNav } from './rail.mjs'

// Columna de lectura de 680px; en móvil, el ancho de pantalla menos el margen
const COLUMN_SIZES = '(min-width: 720px) 680px, calc(100vw - 40px)'
const LEAD_SIZES = '(min-width: 720px) 680px, 100vw'
const PLATE_WIDTHS = [520, 760, 1040, 1254]

const ZOOM_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2M11 8.5v5M8.5 11h5"/></svg>'

// El enlace abre el archivo entero: es el respaldo sin JS. Con JS se queda en la página
// y lo enseña el visor, a un tamaño al que los rótulos de la lámina se pueden leer.
const zoomAttrs = key => `href="${url(key)}" target="_blank" rel="noopener" data-sg-zoom data-sg-zoom-alt="${image(key).alt}"`

const caption = ({ caption, note }, extra = '') => (caption || note || extra)
	? `\n				<figcaption class="sg-plate__caption">${caption || ''}${note ? ` <span class="sg-plate__note">${note}</span>` : ''}${extra}</figcaption>`
	: ''

// Una lámina con su pie. lead: la que abre el artículo (a sangre en móvil, es el LCP).
// zoom: false para una foto, que no trae rótulos que leer de cerca: va sin visor.
// La clase con su clave permite fijarle el encuadre en el CSS.
export const plate = block => {
	const { image: key, lead = false, zoom = true } = block
	const picture = img(key, { widths: PLATE_WIDTHS, sizes: lead ? LEAD_SIZES : COLUMN_SIZES, priority: lead ? 'lead' : 'lazy', className: 'sg-plate__img' })
	const frame = zoom
		? `<a class="sg-plate__frame" ${zoomAttrs(key)} aria-label="Ampliar la imagen">
					${picture}
					<span class="sg-plate__zoom">${ZOOM_ICON}</span>
				</a>`
		: `<span class="sg-plate__frame sg-plate__frame--still">${picture}</span>`
	return `			<figure class="sg-plate sg-plate--${key}${lead ? ' sg-plate--lead' : ''}${zoom ? '' : ' sg-plate--photo'}"${lead ? '' : ' data-sg-enter'}>
				${frame}${caption(block)}
			</figure>`
}

// Una lámina con mucho texto, partida en sus pasos: se recorre deslizando y cada paso se
// lee sin ampliar. `full` es la lámina entera, que sigue a un toque.
export const flow = ({ steps, full, label, caption: text }) => `			<figure class="sg-flow sg-rail" data-sg-rail data-sg-enter>
				<ol class="sg-rail__track" data-sg-rail-track tabindex="0" role="region" aria-label="${label}">
${steps.map(key => `					<li class="sg-rail__item sg-flow__step">${img(key, { className: 'sg-flow__img' })}</li>`).join('\n')}
				</ol>
${railNav({ prev: 'Paso anterior', next: 'Paso siguiente', group: 'Elegir paso', dots: steps.map((key, index) => `Ver el paso ${index + 1}`) }, '\t\t\t\t')}${caption({ caption: text }, ` <a class="sg-plate__more" ${zoomAttrs(full)}>Ver la lámina completa</a>`)}
			</figure>`

// Lo que ya se probó, sobre una línea que no se mueve: el último punto es el resultado
export const flatline = ({ steps, result, caption: text }) => `			<figure class="sg-flat" data-sg-enter>
				<ol class="sg-flat__line">
${steps.map(step => `					<li class="sg-flat__step">${step}</li>`).join('\n')}
					<li class="sg-flat__step sg-flat__step--result">${result}</li>
				</ol>${text ? `\n				<figcaption class="sg-plate__caption">${text}</figcaption>` : ''}
			</figure>`

// Lo que el cuerpo atiende primero y lo que deja para el final, con las palabras del
// copy: las primeras filas se llenan; la última se queda casi vacía.
export const ladder = ({ first, last, label }) => `			<ol class="sg-ladder" data-sg-enter aria-label="${label}">
${first.map(text => `				<li class="sg-ladder__row">${text}</li>`).join('\n')}
				<li class="sg-ladder__row sg-ladder__row--last">${last}</li>
			</ol>`

// Un dato de uso con su cifra en grande. El texto se escribe en el orden en que se lee
// («Sabor kiwi»); que la cifra vaya delante lo decide el CSS.
const stat = ({ value, label, labelFirst = false }) => labelFirst
	? `<li class="sg-stat sg-stat--label-first"><span>${label}</span> <strong>${value}</strong></li>`
	: `<li class="sg-stat"><strong>${value}</strong> <span>${label}</span></li>`

const list = (className, items, render = item => `<li>${item}</li>`) => items.length ? `
					<ul class="${className}">
${items.map(item => `						${render(item)}`).join('\n')}
					</ul>` : ''

// La ficha del producto: el frasco y lo que el copy dice de él. facts: datos sueltos;
// stats: los de uso, con su cifra; notes: las frases que van debajo, a todo el ancho.
export const product = ({ name, facts = [], stats = [], notes = [] }) => `			<div class="sg-product" data-sg-enter>
				<span class="sg-product__shot">${img('product', { widths: [240, 420], sizes: '120px' })}</span>
				<div class="sg-product__body">
					<p class="sg-product__name">${name}</p>${list('sg-product__facts', facts)}${list('sg-product__stats', stats, stat)}
				</div>${notes.length ? `
				<ul class="sg-product__notes">
${notes.map(note => `					<li>${note}</li>`).join('\n')}
				</ul>` : ''}
			</div>`

// Figuras editoriales: fotos con pie, la placa con la ruta, el término y la cifra.
import { img } from '../../../spray/src/lib/markup.mjs'
import { sourceBrand } from '../../../spray/src/lib/logos.mjs'
import { photo as findPhoto } from '../lib/photos.mjs'
import { routeArt } from '../lib/art.mjs'

const COLUMN_SIZES = '(min-width: 740px) 680px, calc(100vw - 40px)'
// La foto que abre va a sangre en móvil
const LEAD_SIZES = '(min-width: 740px) 680px, 100vw'
const COLUMN_WIDTHS = [520, 760, 1200]

// Anchos del srcset: nunca por encima del original
const columnWidths = ({ w }) => COLUMN_WIDTHS.map(width => Math.min(width, w)).filter((width, i, all) => all.indexOf(width) === i)

// Pie de figura: la frase del copy y, si la imagen no es del producto ni de una persona real, la nota
export const figcaption = ({ caption, note }, indent = '\t\t\t\t') => {
	if (!caption && !note) return ''
	const parts = [caption, note ? `<span class="ns-fig__note">${note}</span>` : ''].filter(Boolean)
	return `\n${indent}<figcaption class="ns-fig__cap">${parts.join(' ')}</figcaption>`
}

// El marco de una foto. Lleva su clave para que el CSS pueda fijarle encuadre
// (.ns-photo__frame--<clave>); las placas y los bodegones tienen además tratamiento propio.
export const frame = (picture, { sizes, eager = false }, indent = '\t\t\t\t') => {
	const treatment = picture.plate ? ' ns-photo__frame--plate' : picture.still ? ' ns-photo__frame--still' : ''
	return `${indent}<div class="ns-photo__frame ns-photo__frame--${picture.key}${treatment}">
${indent}	${img({ file: picture.file, w: picture.w, h: picture.h, alt: picture.alt, widths: columnWidths(picture), sizes, eager })}
${indent}</div>`
}

// lead: la foto que abre el artículo. Es el LCP: carga con prioridad y no espera a la entrada.
export const photo = ({ photo: key, caption, note, lead = false }) => `			<figure class="ns-fig ns-photo${lead ? ' ns-photo--lead' : ''}"${lead ? '' : ' data-ns-reveal'}>
${frame(findPhoto(key), { sizes: lead ? LEAD_SIZES : COLUMN_SIZES, eager: lead })}${figcaption({ caption, note })}
			</figure>`

// La ruta nariz–garganta sobre la placa de vías aéreas. Tres paradas, en el orden del recorrido.
export const route = ({ label, stops, caption, note }) => {
	const plate = findPhoto('airway')
	return `			<figure class="ns-fig ns-route" data-ns-live data-ns-reveal>
				<div class="ns-route__frame" role="img" aria-label="${label}">
					${img({ file: plate.file, w: plate.w, h: plate.h, alt: '', widths: columnWidths(plate), sizes: COLUMN_SIZES })}
					${routeArt}
					<ol class="ns-route__stops" aria-hidden="true">
${stops.map((stop, i) => `						<li class="ns-route__stop ns-route__stop--${i + 1}">${stop}</li>`).join('\n')}
					</ol>
				</div>${figcaption({ caption, note })}
			</figure>`
}

// El término que nombra el problema. text: lo que explica la fuente; brand: su logotipo, si lo hay
export const term = ({ lead, term: word, brand, text }) => {
	const source = text ? `
				<div class="ns-term__source">${brand ? `\n\t\t\t\t\t${sourceBrand(brand)}` : ''}
					<p class="ns-term__text">${text}</p>
				</div>` : ''
	return `			<aside class="ns-term" data-ns-reveal>
				<p class="ns-term__lead">${lead}</p>
				<p class="ns-term__word"><dfn>${word}</dfn></p>${source}
			</aside>`
}

// La cifra del copy, en grande, delante del párrafo que la explica
export const stat = ({ value, label }) => `			<p class="ns-stat" data-ns-reveal><span class="ns-stat__value">${value}</span> <span class="ns-stat__label">${label}</span></p>`

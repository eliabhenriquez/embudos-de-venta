// El producto dentro del artículo: presentación, fórmula, modo de uso, sensación y oferta.
import { img } from '../../../spray/src/lib/markup.mjs'
import { cta as ctaButton } from '../../../spray/src/lib/cta.mjs'
import { payMethods } from '../../../spray/src/lib/pay.mjs'
import { photo as findPhoto } from '../lib/photos.mjs'
import { ugc } from '../lib/ugc.mjs'
import { frame, figcaption } from './figures.mjs'

const PLANT_PHOTOS = {
	menta: { file: 'landings-spray-ingrediente-menta.webp', w: 900, h: 600, alt: 'Hojas de menta' },
	eucalipto: { file: 'landings-spray-ingrediente-eucalipto.webp', w: 900, h: 600, alt: 'Ramas de eucalipto' },
	regaliz: { file: 'landings-spray-ingrediente-regaliz.webp', w: 900, h: 473, alt: 'Raíces de regaliz' }
}

// En escritorio la foto va junto al texto y ocupa menos de media columna
const SIDE_SIZES = '(min-width: 700px) 300px, calc(100vw - 40px)'
const OFFER_SIZES = '(min-width: 700px) 280px, calc(100vw - 60px)'
const UGC_WIDTHS = [320, 680]

// El producto solo, junto al texto que lo presenta. formula: la línea de la fórmula, si el copy la aparta
export const spotlight = ({ photo: key, caption, text, formula }) => `			<div class="ns-spot" data-ns-reveal>
				<figure class="ns-spot__figure">
${frame(findPhoto(key), { sizes: SIDE_SIZES }, '\t\t\t\t\t')}${figcaption({ caption }, '\t\t\t\t\t')}
				</figure>
				<div class="ns-spot__body">
					<p class="ns-p">${text}</p>${formula ? `\n\t\t\t\t\t<p class="ns-spot__formula">${formula}</p>` : ''}
				</div>
			</div>`

const plantCard = ({ plant, name, text }) => {
	const picture = PLANT_PHOTOS[plant]
	if (!picture) throw new Error(`Planta sin foto: ${plant}`)
	return `				<li class="ns-plantcard">
					<span class="ns-plantcard__photo">${img({ ...picture, widths: [240, 480], sizes: '(min-width: 700px) 210px, 96px' })}</span>
					<span class="ns-plantcard__body"><span class="ns-plantcard__name">${name}</span><span class="ns-plantcard__text">${text}</span></span>
				</li>`
}

export const plants = ({ items }) => `			<ul class="ns-plants" data-ns-reveal>
${items.map(plantCard).join('\n')}
			</ul>`

// Una persona real con el producto y, al lado, las frases del copy en su orden.
// body: cada entrada es una frase; { big } la pone en grande. flip: la foto, a la derecha
const portraitLine = entry => (typeof entry === 'string' ? `<p class="ns-portrait__line">${entry}</p>` : `<p class="ns-portrait__beat">${entry.big}</p>`)

export const portrait = ({ person, flip = false, body }) => `			<div class="ns-portrait${flip ? ' ns-portrait--flip' : ''}" data-ns-reveal>
				${ugc(person, { shape: 'portrait', widths: UGC_WIDTHS, sizes: '(min-width: 700px) 290px, 46vw' })}
				<div class="ns-portrait__body">
${body.map(entry => `					${portraitLine(entry)}`).join('\n')}
				</div>
			</div>`

export const cta = ({ label, note }) => `			<div class="ns-buy">
				${ctaButton(label)}
				<p class="ns-buy__note">${note}</p>
			</div>`

// La secuencia de sensaciones del copy, cada paso con una persona real
export const sequence = ({ steps }) => `			<ol class="ns-seq" data-ns-reveal>
${steps.map(([person, text]) => `				<li class="ns-seq__step">${ugc(person, { shape: 'step', widths: UGC_WIDTHS, sizes: '(min-width: 700px) 218px, 30vw' })}<span class="ns-seq__text">${text}</span></li>`).join('\n')}
			</ol>`

// La oferta, con lo que trae cada copy: los campos que el artículo no da, no salen.
// photo: la pareja de la landing del ángulo; sin ella, el frasco solo.
export const offer = ({ photo: key = 'packshot', name, intro, formula, specs = [], usage, available, price, currency, shipping, payment, made, cta: label }) => {
	const lines = [
		name && `<p class="ns-offer__name">${name}</p>`,
		intro && `<p class="ns-offer__intro">${intro}</p>`,
		`<p class="ns-offer__formula">${formula}</p>`,
		specs.length && `<ul class="ns-offer__specs">${specs.map(spec => `<li>${spec}</li>`).join('')}</ul>`,
		usage && `<p class="ns-offer__usage">${usage}</p>`,
		`<div class="ns-offer__deal">${available ? `<p class="ns-offer__available">${available}</p>` : ''}<p class="ns-offer__price"><span class="ns-offer__figure">${price}</span> <span class="ns-offer__currency">${currency}</span></p></div>`,
		`<ul class="ns-offer__terms"><li>${shipping}</li><li>${payment}</li></ul>`
	].filter(Boolean)
	return `			<div class="ns-offer" data-ns-reveal>
${frame(findPhoto(key), { sizes: OFFER_SIZES }, '\t\t\t\t')}
				<div class="ns-offer__body">
${lines.map(line => `					${line}`).join('\n')}
				</div>
				<div class="ns-offer__foot">
					${ctaButton(label)}
${payMethods('\t\t\t\t\t')}
					<p class="ns-offer__made">${made}</p>
				</div>
			</div>`
}

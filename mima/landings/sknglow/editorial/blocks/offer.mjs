// La oferta y los botones de compra.
import { img } from '../lib/images.mjs'
import { cta as button } from '../lib/cta.mjs'

// La foto abre la tarjeta en móvil (su ancho, sin el borde) y es su columna desde 600px
const PHOTO_WIDTHS = [360, 510]
const PHOTO_SIZES = '(min-width: 720px) 272px, (min-width: 600px) 40vw, calc(100vw - 43px)'

export const payMethods = indent => `${indent}<ul class="sg-pay" aria-label="Medios de pago">
${indent}	<li>${img('visa', { className: 'sg-pay__logo sg-pay__logo--visa' })}</li>
${indent}	<li>${img('mastercard', { className: 'sg-pay__logo' })}</li>
${indent}	<li>${img('pse', { className: 'sg-pay__logo' })}</li>
${indent}</ul>`

// Un botón dentro del relato, después de un tramo que ya dio motivos
export const cta = ({ label }) => `			<p class="sg-cta-row" data-sg-enter>
				${button(label)}
			</p>`

const packshot = `
						<span class="sg-offer__shot">${img('product', { widths: [240, 420], sizes: '92px' })}</span>`

// Una persona real con el frasco en la mano, firmada: quién es y de dónde sale la foto
const photo = ({ image, name, credit }) => `
				<figure class="sg-offer__photo">
					<span class="sg-offer__frame">${img(image, { widths: PHOTO_WIDTHS, sizes: PHOTO_SIZES, className: 'sg-offer__photo-img' })}</span>
					<figcaption class="sg-offer__credit"><strong>${name}</strong> · ${credit}</figcaption>
				</figure>`

// La tarjeta de la oferta. Las dos líneas de precio son frases del copy: la cifra va en
// <strong> y el CSS la saca en grande. Manda el contraentrega, que es el precio que el
// copy da como «el precio de Sknglow»; el anticipado va debajo, sin tachar nada.
// photo (opcional): la foto de UGC que acompaña a la llamada a la acción. Con ella sobra el
// frasco suelto: el producto ya está en la foto, en la mano de quien lo usa.
export const offer = ({ name, specs, price, prepaid, label, photo: ugc }) => `			<div class="sg-offer${ugc ? ' sg-offer--photo' : ''}" data-sg-offer data-sg-enter>${ugc ? photo(ugc) : ''}
				<div class="sg-offer__body">
					<div class="sg-offer__head">${ugc ? '' : packshot}
						<p class="sg-offer__name">${name} <span>${specs}</span></p>
					</div>
					<p class="sg-offer__price">${price}</p>
					<p class="sg-offer__prepaid">${prepaid}</p>
					${button(label)}
${payMethods('\t\t\t\t\t')}
				</div>
			</div>`

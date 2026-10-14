// Medios de pago del anticipado (Visa, Mastercard, PSE). Comunes a la marca: shared/assets.
import { thumb } from './markup.mjs'

const METHODS = [
	{ key: 'visa', file: 'landings-shared-pay-visa.webp', w: 222, h: 72, alt: 'Visa' },
	{ key: 'mastercard', file: 'landings-shared-pay-mastercard.webp', w: 92, h: 72, alt: 'Mastercard' },
	{ key: 'pse', file: 'landings-shared-pay-pse.webp', w: 72, h: 72, alt: 'PSE' }
]

export const payMethods = (indent, { lazy = true } = {}) => `${indent}<ul class="ns-paymethods" aria-label="Medios de pago">${METHODS.map(({ key, file, w, h, alt }) => `<li class="ns-paymethods__item ns-paymethods__item--${key}">${thumb({ file, width: w, w, h, alt, lazy })}</li>`).join('')}</ul>`

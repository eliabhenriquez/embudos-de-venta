// Sello de alergias: lo que hay en el ambiente entra por la nariz y la reacción avanza.
import { SIGN_FX } from '../../lib/art.mjs'

const head = '<use href="#ns-head" x="0" y="0" width="140" height="112"/>'
const spikes = Array.from({ length: 8 }, (_, i) => `<path d="M0 -8.6 V-11.6" transform="rotate(${i * 45})"/>`).join('')
const legs = [-1, 1].map(side => [-3, 0, 3].map(y => `<path d="M${side * 4.6} ${y} l${side * 4} ${y - 1.5}"/>`).join('')).join('')

// Cada partícula en dos grupos: el de fuera la coloca, el de dentro flota
const particle = (x, y, kind, shape) => `<g transform="translate(${x} ${y})"><g class="ns-allergen ns-allergen--${kind}">${shape}</g></g>`
const PARTICLES = [
	particle(28, 30, 'pollen', `<circle r="6.6"/>${spikes}<circle class="ns-allergen__dot" r="2"/>`),
	particle(76, 22, 'mite', `${legs}<ellipse rx="4.6" ry="6.2"/><circle cx="0" cy="-7.8" r="2.2"/>`),
	particle(98, 56, 'dust', '<circle class="ns-allergen__dot" cx="-4" cy="-3" r="2.2"/><circle class="ns-allergen__dot" cx="3" cy="-5" r="1.6"/><circle class="ns-allergen__dot" cx="1" cy="2" r="2.6"/><circle class="ns-allergen__dot" cx="-5" cy="5" r="1.5"/><circle class="ns-allergen__dot" cx="6" cy="4" r="1.8"/>'),
	particle(34, 66, 'mold', '<path d="M0 8 V-2 M0 2 L-6 -5 M0 2 L6 -5"/><circle cx="0" cy="-4" r="3"/><circle cx="-6.5" cy="-7" r="2.6"/><circle cx="6.5" cy="-7" r="2.6"/>'),
	particle(66, 64, 'paw', '<ellipse cx="0" cy="3" rx="6" ry="5"/><circle cx="-6.6" cy="-4" r="2.3"/><circle cx="-2.4" cy="-7.4" r="2.3"/><circle cx="2.4" cy="-7.4" r="2.3"/><circle cx="6.6" cy="-4" r="2.3"/>')
].join('')

export const allergenArt = `<svg viewBox="0 0 120 90" aria-hidden="true">${PARTICLES}</svg>`

// La mucosa se inflama: el conducto de la nariz, hinchado y empañado
export const inflamedArt = `<svg viewBox="24 14 104 78" aria-hidden="true">${head}<path class="ns-sign__lane ns-allergen__swell" d="M93 62 C86 58 74 54 66 55.5"/><g class="ns-sign__fog"><ellipse cx="84" cy="59" rx="8" ry="4.6"/><ellipse cx="74" cy="56.5" rx="7" ry="4"/></g></svg>`

// Estornudos, moco claro y nariz tapada
export const symptomsArt = `<svg viewBox="24 14 104 78" aria-hidden="true">${head}<g class="ns-sign__fog"><ellipse cx="84" cy="59" rx="7" ry="4"/></g>${SIGN_FX.sneeze}<path class="ns-sign__drop ns-sign__drop--nose" transform="translate(96 70)" d="M0 -4.6 C2 -1.4 3.3 .4 3.3 2.2 A3.3 3.3 0 0 1 -3.3 2.2 C-3.3 .4 -2 -1.4 0 -4.6Z"/></svg>`

// Sello de flema: el moco baja por detrás de la nariz y el bucle de la carraspera no para.
import { SIGN_FX } from '../../lib/art.mjs'

const head = '<use href="#ns-head" x="0" y="0" width="140" height="112"/>'
const frame = inner => `<svg viewBox="18 8 108 81" aria-hidden="true">${head}${inner}</svg>`

export const nasalArt = frame('<path class="ns-sign__lane" d="M93 62 C86 58 74 54 66 55.5"/><g class="ns-sign__fog"><ellipse cx="84" cy="59" rx="8" ry="4.6"/><ellipse cx="74" cy="56.5" rx="7" ry="4"/></g>')
export const dripArt = frame(SIGN_FX.drip)
// La flema se queda pegada en la garganta y late
export const stuckArt = frame(SIGN_FX.stuck)
export const coughArt = frame(`${SIGN_FX.throat}${SIGN_FX.mouth}`)

// El bucle: cuatro gestos alrededor de un anillo y un punto que no deja de girar.
// El texto del centro es opcional (el advertorial de flema no lo lleva).
export const loop = ({ steps, center }) => `			<div class="ns-loop" data-ns-live>
				<svg class="ns-loop__ring" viewBox="0 0 300 300" aria-hidden="true"><circle class="ns-loop__track" cx="150" cy="150" r="112"/><g class="ns-loop__orbit"><circle class="ns-loop__dot" cx="150" cy="38" r="8"/><circle class="ns-loop__trail" cx="120" cy="42" r="4.5"/><circle class="ns-loop__trail" cx="94" cy="53" r="3"/></g></svg>
				<ol class="ns-loop__steps">
${steps.map((step, i) => `					<li class="ns-loop__step ns-loop__step--${i + 1}">${step}</li>`).join('\n')}
				</ol>
${center ? `				<p class="ns-loop__center">${center}</p>\n` : ''}			</div>`

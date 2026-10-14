// Iconos de las cadenas de tabaquismo: humo, moco, cilios lentos y la escena de la tos
// de la mañana. Los paneles de cilios con y sin humo se retiraron el 2026-09-22 (el
// cliente no los entendía); la sección del problema abre ahora con las radiografías.
import { SIGN_FX } from '../../lib/art.mjs'

// Piezas de las cadenas
const head = '<use href="#ns-head" x="0" y="0" width="140" height="112"/>'
const headFrame = inner => `<svg viewBox="18 8 108 81" aria-hidden="true">${head}${inner}</svg>`
export const smokeArt = '<svg viewBox="0 0 120 90" aria-hidden="true"><g class="ns-cilia__smoke ns-cilia__smoke--drift"><circle cx="38" cy="54" r="14"/><circle cx="58" cy="42" r="17"/><circle cx="82" cy="52" r="13"/><circle cx="66" cy="62" r="11"/></g><path class="ns-tabaco__stick" d="M24 72 H86"/><path class="ns-tabaco__ember" d="M86 72 H96"/></svg>'
export const mucusArt = '<svg viewBox="0 0 120 90" aria-hidden="true"><path class="ns-cilia__mucus ns-cilia__mucus--thick ns-tabaco__grow" d="M14 56 Q34 40 60 48 T106 50 V70 H14 Z"/><g class="ns-cilia__load"><circle cx="36" cy="60" r="4"/><circle cx="62" cy="58" r="3.4"/><circle cx="86" cy="61" r="4"/></g></svg>'
export const slowCiliaArt = `<svg viewBox="0 0 120 90" aria-hidden="true"><path class="ns-cilia__mucus ns-cilia__mucus--thick" d="M6 40 Q40 32 70 38 T116 38 V52 H6 Z"/><g class="ns-cilia__row ns-cilia__row--slow">${[14, 34, 54, 74, 94].map(x => `<path class="ns-cilia__hair" d="M${x} 70 q2 -10 6 -18"/>`).join('')}</g><path class="ns-cilia__base" d="M0 71 H120"/></svg>`
export const coughArt = headFrame(`${SIGN_FX.stuck}${SIGN_FX.mouth}`)
export const irritationArt = headFrame(`${SIGN_FX.blocked}`)
export const loadedArt = headFrame('<path class="ns-sign__lane ns-tabaco__loaded" d="M93 62 C86 58 74 54 66 55.5"/><g class="ns-sign__fog"><ellipse cx="84" cy="59" rx="9" ry="5.4"/><ellipse cx="73" cy="56.5" rx="8" ry="4.8"/></g>')
export const allergyArt = headFrame(SIGN_FX.sneeze)

// La escena de la mañana
export const wakeArt = '<svg viewBox="0 0 120 90" aria-hidden="true"><g class="ns-tabaco__sun"><path d="M36 62 a24 24 0 0 1 48 0Z"/><path class="ns-tabaco__rays" d="M60 26 V32 M34 36 l4 4 M86 36 l-4 4 M24 58 h6 M90 58 h6"/></g><path class="ns-cilia__base" d="M14 62 H106"/></svg>'
export const clearThroatArt = headFrame(SIGN_FX.throat)
export const expelArt = headFrame(`<path class="ns-sign__lane ns-sign__lane--soft" d="M66 55.5 C60 57 58.6 64 59.2 74 C59.8 86 60 100 60 106"/><path class="ns-sign__drop ns-tabaco__up" transform="translate(60 84)" d="M0 -4.6 C2 -1.4 3.3 .4 3.3 2.2 A3.3 3.3 0 0 1 -3.3 2.2 C-3.3 .4 -2 -1.4 0 -4.6Z"/>`)

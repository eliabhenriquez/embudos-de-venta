// Sello de sinusitis: el mapa de la presión. La cara de frente con los senos frontales
// y maxilares, en los cuatro estados de la cadena del copy.
const LINE = '#9fbf95'

// La cara, una sola vez en las definiciones; colores en atributos (árbol de <use>)
export const faceSymbol = `<symbol id="ns-face" viewBox="0 0 120 90"><ellipse cx="60" cy="47" rx="27" ry="36" fill="#ffffff" stroke="${LINE}" stroke-width="1.5"/><path d="M41 35 q7 -4 14 0 M65 35 q7 -4 14 0 M43 41 q5 3 10 0 M67 41 q5 3 10 0 M60 41 v14 q-2.6 3 -6 2 M60 55 q2.6 3 6 2 M52 70 q8 4 16 0" fill="none" stroke="${LINE}" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></symbol>`

const face = '<use href="#ns-face" x="0" y="0" width="120" height="90"/>'
const FRONTAL = '<ellipse class="ns-sinus__cavity" cx="54" cy="26" rx="5" ry="3.6"/><ellipse class="ns-sinus__cavity" cx="66" cy="26" rx="5" ry="3.6"/>'
const MAXILLARY = '<ellipse class="ns-sinus__cavity" cx="47" cy="57" rx="5.6" ry="5"/><ellipse class="ns-sinus__cavity" cx="73" cy="57" rx="5.6" ry="5"/>'
const cavities = `<g class="ns-sinus__cavities">${FRONTAL}${MAXILLARY}</g>`
const art = (state, inner = '') => `<svg class="ns-sinus ns-sinus--${state}" viewBox="12 4 96 72" aria-hidden="true">${face}${cavities}${inner}</svg>`

export const inflamedArt = art('inflamed')
// Los canales de drenaje hacia la nariz, cerrados
export const blockedArt = art('blocked', '<path class="ns-sinus__drain" d="M52 55 L57.5 52 M68 55 L62.5 52 M57 29 L59 35 M63 29 L61 35"/><g class="ns-sinus__stop"><path d="M53.4 51.4 l2.6 3.8 M66.6 51.4 l-2.6 3.8"/></g>')
export const retainedArt = art('retained')
// Nariz tapada, presión facial y menos olfato: la presión sale en anillos
export const pressureArt = art('pressure', '<g class="ns-sinus__rings"><circle cx="47" cy="57" r="9"/><circle cx="73" cy="57" r="9"/><circle cx="60" cy="26" r="10"/></g><ellipse class="ns-sinus__fog" cx="60" cy="55" rx="4" ry="3"/>')

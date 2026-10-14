// El botón de compra. Lleva los dos ganchos de formulario a la vez —Releasit y EasySell—
// y abre el de la app que esté activa (/mima/AGENTS.md §5). El id se repite en todos los
// CTA de la página: es lo que pide EasySell y está comprobado que no rompe nada.

const EASYSELL_ID = 'es-popup-button'
const FORM_HOOKS = 'es-popup-button es-popup-button-cart _rsi-cod-form-gempages-button-overwrite _rsi-cod-form-is-gempage'

export const cta = (label, { small = false } = {}) => `<button type="button" id="${EASYSELL_ID}" class="sg-cta${small ? ' sg-cta--sm' : ''} ${FORM_HOOKS}">${label}</button>`

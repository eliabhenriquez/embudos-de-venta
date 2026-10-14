// El mando de un carril deslizable: flecha, un punto por tarjeta y flecha. Nace oculto y
// el JS lo enciende solo si hay algo que deslizar; sin JS queda el carril con el dedo.

const ARROW_PREV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 6 8.5 12l6 6"/></svg>'
const ARROW_NEXT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.5 6l6 6-6 6"/></svg>'

// dots: la etiqueta accesible de cada punto, en el orden de las tarjetas
export const railNav = ({ prev, next, group, dots }, indent) => {
	const tab = indent
	return `${tab}<div class="sg-rail-nav" data-sg-rail-nav hidden>
${tab}	<button type="button" class="sg-rail-nav__arrow" data-sg-rail-prev aria-label="${prev}">${ARROW_PREV}</button>
${tab}	<div class="sg-rail-nav__dots" role="group" aria-label="${group}">
${dots.map((label, index) => `${tab}		<button type="button" class="sg-rail-nav__dot" data-sg-rail-dot aria-label="${label}"${index === 0 ? ' aria-current="true"' : ''}></button>`).join('\n')}
${tab}	</div>
${tab}	<button type="button" class="sg-rail-nav__arrow" data-sg-rail-next aria-label="${next}">${ARROW_NEXT}</button>
${tab}</div>`
}

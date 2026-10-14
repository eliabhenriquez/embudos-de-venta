// Lo que un listicle añade al artículo: las razones numeradas y sus listas. Ninguna lista
// va apilada tal cual: cada una tiene su manera de contarse.
import { railNav } from './rail.mjs'

// El titular de una razón, con su número en grande y cuántas son.
// reveal: a partir de esta razón el producto ya está presentado y sale la barra de compra.
export const reason = ({ n, of, text, reveal }, { id }) => `			<h2 class="sg-reason" id="${id}"${reveal ? ' data-sg-product-revealed' : ''}>
				<span class="sg-reason__count"><span class="sg-reason__n">${n}</span> de ${of}</span>
				<span class="sg-reason__title">${text}</span>
			</h2>`

// Señales: fichas grandes en rejilla, cada una con una luz que se enciende al entrar
export const signs = ({ items }) => `			<ul class="sg-signs" data-sg-enter>
${items.map(text => `				<li class="sg-signs__item">${text}</li>`).join('\n')}
			</ul>`

// Frases para recorrer de una en una, en carril deslizable. kind: la piel de la tarjeta
// (note: una idea; question: una pregunta).
export const cards = ({ label, items, kind = 'note' }) => `			<div class="sg-cards sg-cards--${kind} sg-rail" data-sg-rail data-sg-enter>
				<ul class="sg-rail__track" data-sg-rail-track tabindex="0" role="region" aria-label="${label}">
${items.map(text => `					<li class="sg-rail__item sg-cards__item"><p class="sg-card">${text}</p></li>`).join('\n')}
				</ul>
${railNav({ prev: 'Anterior', next: 'Siguiente', group: label, dots: items.map((text, index) => `Ver ${index + 1} de ${items.length}`) }, '\t\t\t\t')}
			</div>`

// Qué hacer en cada caso: la condición y, destacado, lo que toca. La frase del copy se
// lee entera y en su orden; when es opcional.
export const advice = ({ items }) => `			<ul class="sg-advice" data-sg-enter>
${items.map(({ when, then }) => `				<li class="sg-advice__item">${when ? `<span class="sg-advice__when">${when}</span> ` : ''}<strong class="sg-advice__then">${then}</strong></li>`).join('\n')}
			</ul>`

// El problema: cabecera y una lista de bloques. Cada ángulo compone los suyos;
// los bloques propios de un ángulo llegan como { type: 'custom', render }.
import { img, banner, head } from '../lib/markup.mjs'
import { signArt } from '../lib/art.mjs'

const XRAYS = {
	airway: { file: 'landings-spray-vias.webp', w: 712, h: 690, widths: [360, 712], caption: 'Vías aéreas respiratorias', alt: 'Radiografía lateral de cabeza y cuello con las vías aéreas respiratorias' },
	lungs: { file: 'landings-spray-pulmones.webp', w: 1000, h: 835, widths: [400, 800, 1000], caption: 'Pulmones y bronquios', alt: 'Radiografía de tórax con los pulmones y los bronquios' },
	sinus: { file: 'landings-spray-senos.webp', w: 1000, h: 651, widths: [400, 800, 1000], caption: 'Senos paranasales', alt: 'Tomografías de la cara con los senos paranasales' }
}

const TRIGGER_ICONS = {
	Alergias: '<path d="M12 4v16M4 12h16M6.3 6.3l11.4 11.4M17.7 6.3 6.3 17.7"/>',
	Resfriados: '<path d="M12 5a4 4 0 0 1 4 4v1.5a4.5 4.5 0 1 1-8 0V9a4 4 0 0 1 4-4Z"/><path d="M9.5 20h5"/>',
	Sinusitis: '<path d="M6 9c0-2.8 2.7-5 6-5s6 2.2 6 5c0 3.4-2.2 5.2-3.2 8.4A2.9 2.9 0 0 1 12 19.5a2.9 2.9 0 0 1-2.8-2.1C8.2 14.2 6 12.4 6 9Z"/>',
	Polvo: '<circle cx="7" cy="8" r="1.6"/><circle cx="15" cy="6" r="1.2"/><circle cx="12" cy="13" r="1.8"/><circle cx="18" cy="15" r="1.4"/><circle cx="8" cy="17" r="1.3"/>',
	Humo: '<path d="M5 17c4 0 4-3 8-3s6 1.6 6 3"/><path d="M5 12c3.4 0 3.4-3 7-3s5.4 1.4 5.4 3"/><path d="M7 21c3 0 3-2 6-2s4.6 1 4.6 2"/>',
	'Cambios de clima': '<path d="M7 16a4 4 0 0 1 .6-7.95A5 5 0 0 1 17 9a3.5 3.5 0 0 1 .5 6.96"/><path d="M9 20h1M13 20h1M17 20h1"/>'
}
const triggerIcon = d => `<svg class="ns-trigger__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`

const xrays = ({ items, featured }) => {
	const figure = key => {
		const x = XRAYS[key]
		return `				<figure class="ns-xray ns-xray--${key}">
					<div class="ns-xray__frame">${img({ file: x.file, w: x.w, h: x.h, widths: x.widths, sizes: '(min-width: 980px) 420px, 46vw', alt: x.alt })}</div>
					<figcaption>${x.caption}</figcaption>
				</figure>`
	}
	const layout = [items.length === 3 ? 'ns-xrays--trio' : '', featured ? 'ns-xrays--featured' : ''].filter(Boolean).join(' ')
	return `			<div class="ns-xrays${layout ? ' ' + layout : ''}" data-ns-live>
${items.map(figure).join('\n')}
			</div>
			<p class="ns-xrays__note">Imágenes de referencia.</p>`
}

const signs = ({ intro, items, night }) => `${intro ? `			<h3 class="ns-problem__intro">${intro}</h3>\n` : ''}			<ul class="ns-signs" data-ns-live>
${items.map(([kind, label]) => `				<li class="ns-sign"><div class="ns-sign__art">${signArt(kind)}</div><p class="ns-sign__label">${label}</p></li>`).join('\n')}${night ? `
				<li class="ns-sign ns-sign--night"><div class="ns-sign__art">${signArt('night')}</div><p class="ns-sign__label">${night}</p></li>` : ''}
			</ul>`

const triggers = ({ lead, items }) => `			<div class="ns-triggers">
				<p class="ns-triggers__lead">${lead}</p>
				<ul class="ns-triggers__grid" aria-label="Detonantes habituales">${items.map(label => `<li class="ns-trigger">${triggerIcon(TRIGGER_ICONS[label])}<span>${label}</span></li>`).join('')}</ul>
			</div>`

const text = ({ paragraphs, className = 'ns-problem__text' }) => paragraphs.map(p => `			<p class="${className}">${p}</p>`).join('\n')

// Cadena: el problema del copy contado paso a paso («Alérgeno → inflamación → …»).
// op es el conector que va ANTES del paso: next (flecha) o plus (+). label repite la
// cadena literal del copy para lectores de pantalla.
const chain = ({ label, steps }) => `			<ol class="ns-chain ns-chain--${steps.length}" data-ns-live aria-label="${label}">
${steps.map(({ text, art, op = 'next' }, i) => `				<li class="ns-chain__step"${i ? ` data-ns-op="${op}"` : ''}><div class="ns-chain__art">${art}</div><p class="ns-chain__label">${text}</p></li>`).join('\n')}
			</ol>`

const BLOCKS = { xrays, signs, triggers, text, chain, custom: ({ render }) => render() }

export const renderBlocks = blocks => blocks.map(block => {
	const renderer = BLOCKS[block.type]
	if (!renderer) throw new Error(`Bloque desconocido: ${block.type}`)
	return renderer(block)
}).join('\n')

// Una sección de problema; un ángulo puede tener varias (flema, tabaquismo)
export const problem = ({ problem }, section = problem) => `${banner(section.banner || 'EL PROBLEMA', section.bannerLines)}
	<section class="ns-section${section.tint ? ' ns-section--tint' : ''} ns-problem${section.mod ? ' ns-problem--' + section.mod : ''}" aria-labelledby="${section.titleId || 'ns-problem-title'}">
${head({ eyebrow: section.eyebrow, title: section.title, titleId: section.titleId || 'ns-problem-title', lead: section.lead })}

		<div class="ns-shell">
${renderBlocks(section.blocks)}
		</div>
	</section>`

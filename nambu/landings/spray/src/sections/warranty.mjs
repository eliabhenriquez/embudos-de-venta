import { icon, banner, head } from '../lib/markup.mjs'

const ITEMS = [
	['Recíbelo en <strong>3 a 5 días hábiles</strong>.', '<path d="M3 7h11v9H3z"/><path d="M14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/>'],
	['Si no llega dentro de ese periodo, <strong>te lo reenviamos sin costo adicional</strong>.', '<path d="M4 12a8 8 0 0 1 13.7-5.7L20 8"/><path d="M20 4v4h-4"/><path d="M20 12a8 8 0 0 1-13.7 5.7L4 16"/><path d="M4 20v-4h4"/>'],
	['Si pagaste anticipadamente y corresponde devolución, <strong>te devolvemos tu inversión</strong>.', '<path d="M12 3 19 6v5.5c0 4-2.9 7.4-7 8.5-4.1-1.1-7-4.5-7-8.5V6l7-3Z"/><path d="m9 12 2 2 4-4"/>']
]

export const warranty = () => `${banner('GARANTÍA')}
	<section class="ns-section ns-warranty" aria-labelledby="ns-warranty-title">
${head({ eyebrow: 'Garantía de entrega', title: 'Tu pedido tiene garantía de entrega.', titleId: 'ns-warranty-title' })}
		<div class="ns-shell">
			<ol class="ns-warranty__list">
${ITEMS.map(([text, d]) => `				<li><span class="ns-warranty__text">${text}</span>${icon(d)}</li>`).join('\n')}
			</ol>
			<p class="ns-warranty__contact">Atención y garantías: <a href="mailto:soporte@NambuShop.com">soporte@NambuShop.com</a></p>
		</div>
	</section>`

// Iconos de la propuesta: los trazos de snippets/icon.liquid del tema de Colombia, más los que la propuesta añade
// (cash, percent, clock), con el mismo trazo de 1,6.
const PATHS = {
	left: '<path d="M15 5l-7 7 7 7"/>',
	right: '<path d="M9 5l7 7-7 7"/>',
	arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
	plus: '<path d="M12 5v14M5 12h14"/>',
	truck: '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/>',
	chat: '<path d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.6Z"/><path d="M9 10.5c.4 2 2 3.6 4 4"/>',
	shield: '<path d="M12 3.5 19 6v5.5c0 4.3-3 7.7-7 9-4-1.3-7-4.7-7-9V6Z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
	leaf: '<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14Z"/><path d="M5 19 13 11"/>',
	sparkle: '<path d="M12 4v4M12 16v4M4 12h4M16 12h4M7 7l2 2M15 15l2 2M7 17l2-2M15 9l2-2"/>',
	instagram: '<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><path d="M16.8 7.2v.1"/>',
	clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
	cash: '<rect x="3" y="6.5" width="18" height="11" rx="2.2"/><circle cx="12" cy="12" r="2.6"/><path d="M6.5 9.5v.01M17.5 14.5v.01"/>',
	percent: '<path d="M18 6 6 18"/><circle cx="7.5" cy="7.5" r="2.2"/><circle cx="16.5" cy="16.5" r="2.2"/>'
}

export const icon = (name, className = 'nb-icon') => {
	const paths = PATHS[name]
	if (!paths) throw new Error(`Icono desconocido: ${name}`)
	return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`
}

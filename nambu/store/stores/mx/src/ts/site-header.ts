// <site-header>: si el menú no cabe en una línea, la cabecera pasa al menú desplegable (data-compact).
// Vale para cualquier número de enlaces y cualquier tienda; sin JS se queda el desplegable de siempre.
export class SiteHeader extends HTMLElement {
	private observer: ResizeObserver | null = null

	connectedCallback(): void {
		this.observer = new ResizeObserver(() => this.fit())
		this.observer.observe(this)
		// Las medidas cambian cuando carga la fuente de la marca
		document.fonts?.ready.then(() => this.fit())
	}

	disconnectedCallback(): void {
		this.observer?.disconnect()
	}

	private fit(): void {
		const nav = this.querySelector<HTMLElement>('[data-nav]')
		if (!nav) return
		// Se mide con el menú visible: desborda si su contenido es más ancho que su hueco
		this.removeAttribute('data-compact')
		if (getComputedStyle(nav).display === 'none') return
		this.toggleAttribute('data-compact', nav.scrollWidth > nav.clientWidth + 1)
	}
}

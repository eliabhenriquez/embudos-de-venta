// <sticky-buy>: barra fija de compra en móvil; sale cuando el botón principal deja la pantalla
const ANCHOR = '[data-sticky-anchor]'
const VISIBLE_CLASS = 'is-on'

export class StickyBuy extends HTMLElement {
	private observer: IntersectionObserver | null = null

	connectedCallback(): void {
		const anchor = document.querySelector(ANCHOR)
		if (!anchor || !('IntersectionObserver' in window)) return
		this.hidden = false
		this.observer = new IntersectionObserver(([entry]) => {
			const passed = !entry.isIntersecting && entry.boundingClientRect.top < 0
			this.classList.toggle(VISIBLE_CLASS, passed)
		})
		this.observer.observe(anchor)
	}

	disconnectedCallback(): void {
		this.observer?.disconnect()
	}
}

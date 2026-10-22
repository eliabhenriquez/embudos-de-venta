// <sticky-buy>: barra fija de compra. Sale cuando su ancla deja la pantalla por arriba y, si tiene final
// (data-end), se aparta cuando ese final entra en pantalla o ya pasó. Ficha: el botón principal; portada: el kit.
const DEFAULT_ANCHOR = '[data-sticky-anchor]'
const VISIBLE_CLASS = 'is-on'

export class StickyBuy extends HTMLElement {
	private observers: IntersectionObserver[] = []
	private passedAnchor = false
	private reachedEnd = false

	connectedCallback(): void {
		const anchor = document.querySelector(this.dataset.anchor ?? DEFAULT_ANCHOR)
		if (!anchor || !('IntersectionObserver' in window)) return
		this.hidden = false
		this.sync()
		this.watch(anchor, (entry) => {
			this.passedAnchor = !entry.isIntersecting && entry.boundingClientRect.top < 0
		})
		const end = this.dataset.end ? document.querySelector(this.dataset.end) : null
		if (end) {
			this.watch(end, (entry) => {
				this.reachedEnd = entry.isIntersecting || entry.boundingClientRect.top < 0
			})
		}
	}

	disconnectedCallback(): void {
		this.observers.forEach(observer => observer.disconnect())
		this.observers = []
	}

	private watch(target: Element, update: (entry: IntersectionObserverEntry) => void): void {
		const observer = new IntersectionObserver(([entry]) => {
			update(entry)
			this.sync()
		})
		observer.observe(target)
		this.observers.push(observer)
	}

	// Fuera de pantalla tampoco se alcanza con el tabulador
	private sync(): void {
		const visible = this.passedAnchor && !this.reachedEnd
		this.classList.toggle(VISIBLE_CLASS, visible)
		this.inert = !visible
	}
}

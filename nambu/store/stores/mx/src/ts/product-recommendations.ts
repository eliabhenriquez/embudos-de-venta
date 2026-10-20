// <product-recommendations>: pide las recomendaciones nativas al entrar en pantalla y solo
// sustituye la rejilla de respaldo si Shopify devuelve productos.
const CARD = '.nb-card'

export class ProductRecommendations extends HTMLElement {
	private observer: IntersectionObserver | null = null

	connectedCallback(): void {
		if (!this.dataset.url) return
		this.observer = new IntersectionObserver(([entry]) => {
			if (!entry.isIntersecting) return
			this.observer?.disconnect()
			void this.load()
		}, { rootMargin: '0px 0px 400px 0px' })
		this.observer.observe(this)
	}

	disconnectedCallback(): void {
		this.observer?.disconnect()
	}

	private async load(): Promise<void> {
		const res = await fetch(this.dataset.url ?? '')
		if (!res.ok) return
		const fresh = new DOMParser().parseFromString(await res.text(), 'text/html').querySelector('product-recommendations')
		if (fresh?.querySelector(CARD)) this.replaceChildren(...Array.from(fresh.childNodes))
	}
}

// <carousel-rail>: carril con scroll-snap, flechas y puntos (o miniaturas) que mueven en todos los
// anchos. El índice sale del elemento más cercano al punto de encaje, nunca de una proporción.
import { reducedMotion } from './config'

export class CarouselRail extends HTMLElement {
	private track: HTMLElement | null = null
	private frame = 0

	connectedCallback(): void {
		this.track = this.querySelector<HTMLElement>('[data-track]')
		if (!this.track) return
		this.querySelector('[data-prev]')?.addEventListener('click', () => this.go(this.current() - 1))
		this.querySelector('[data-next]')?.addEventListener('click', () => this.go(this.current() + 1))
		this.dots.forEach((dot, index) => dot.addEventListener('click', () => this.go(index)))
		this.track.addEventListener('scroll', this.onScroll, { passive: true })
		window.addEventListener('resize', this.onScroll)
		this.sync()
	}

	disconnectedCallback(): void {
		window.removeEventListener('resize', this.onScroll)
	}

	private get items(): HTMLElement[] {
		return Array.from(this.track?.children ?? []) as HTMLElement[]
	}

	private get dots(): HTMLElement[] {
		return Array.from(this.querySelectorAll<HTMLElement>('[data-dot]'))
	}

	private padding(): number {
		return this.track ? parseFloat(getComputedStyle(this.track).scrollPaddingLeft) || 0 : 0
	}

	private current(): number {
		if (!this.track) return 0
		const start = this.track.getBoundingClientRect().left + this.padding()
		let best = 0
		let distance = Infinity
		this.items.forEach((item, index) => {
			const delta = Math.abs(item.getBoundingClientRect().left - start)
			if (delta < distance) {
				distance = delta
				best = index
			}
		})
		return best
	}

	private go(index: number): void {
		const item = this.items[Math.max(0, Math.min(this.items.length - 1, index))]
		if (!item || !this.track) return
		const left = item.getBoundingClientRect().left - this.track.getBoundingClientRect().left + this.track.scrollLeft - this.padding()
		this.track.scrollTo({ left, behavior: reducedMotion() ? 'auto' : 'smooth' })
	}

	private sync(): void {
		if (!this.track) return
		const index = this.current()
		const max = this.track.scrollWidth - this.track.clientWidth
		const prev = this.querySelector<HTMLButtonElement>('[data-prev]')
		const next = this.querySelector<HTMLButtonElement>('[data-next]')
		if (prev) prev.disabled = this.track.scrollLeft <= 2
		if (next) next.disabled = this.track.scrollLeft >= max - 2
		this.dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)))
	}

	private onScroll = (): void => {
		cancelAnimationFrame(this.frame)
		this.frame = requestAnimationFrame(() => this.sync())
	}
}

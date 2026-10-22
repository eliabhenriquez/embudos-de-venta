// <kit-stage>: fotos de la portada que rotan solas y se cambian a mano (flechas, barras, deslizar la foto o las
// flechas del teclado). El paso lo marca la barra activa al terminar de llenarse (CSS), así la barra y la foto nunca
// se desincronizan, y un cambio a mano vuelve a empezar la cuenta desde la foto elegida. Se pausa con el puntero
// encima y fuera de pantalla; con movimiento reducido no rota. Sin JS se queda la primera.
const FILL_ANIMATION = 'nb-fill'
const ACTIVE = 'is-active'
const DONE = 'is-done'
// Desplazamiento horizontal mínimo para contar un gesto como cambio de foto
const SWIPE_MIN_PX = 40
const KEY_STEPS: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1 }

export class KitStage extends HTMLElement {
	private index = 0
	private hovered = false
	private visible = true
	private swipeStart: { x: number, y: number } | null = null
	private observer: IntersectionObserver | null = null

	connectedCallback(): void {
		if (this.slides.length < 2) return
		this.bindControls()
		this.bindSwipe()
		this.addEventListener('animationend', this.onAnimationEnd)
		this.addEventListener('keydown', this.onKeyDown)
		if ('IntersectionObserver' in window) {
			this.observer = new IntersectionObserver(([entry]) => {
				this.visible = entry.isIntersecting
				this.syncPause()
			})
			this.observer.observe(this)
		}
	}

	disconnectedCallback(): void {
		this.observer?.disconnect()
		this.removeEventListener('animationend', this.onAnimationEnd)
		this.removeEventListener('keydown', this.onKeyDown)
	}

	private get slides(): HTMLElement[] {
		return Array.from(this.querySelectorAll<HTMLElement>('[data-slide]'))
	}

	private get bars(): HTMLElement[] {
		return Array.from(this.querySelectorAll<HTMLElement>('[data-go]'))
	}

	private get stage(): HTMLElement | null {
		return this.querySelector<HTMLElement>('[data-stage]')
	}

	private bindControls(): void {
		this.bars.forEach((bar, position) => bar.addEventListener('click', () => this.show(position)))
		this.querySelector('[data-prev]')?.addEventListener('click', () => this.show(this.index - 1))
		this.querySelector('[data-next]')?.addEventListener('click', () => this.show(this.index + 1))
	}

	// Deslizar en horizontal cambia de foto; el desplazamiento vertical sigue siendo de la página (touch-action: pan-y)
	private bindSwipe(): void {
		const stage = this.stage
		if (!stage) return
		stage.addEventListener('pointerenter', () => this.setHovered(true))
		stage.addEventListener('pointerleave', () => this.setHovered(false))
		stage.addEventListener('pointerdown', (event) => {
			this.swipeStart = { x: event.clientX, y: event.clientY }
		})
		stage.addEventListener('pointerup', this.onPointerUp)
		stage.addEventListener('pointercancel', () => {
			this.swipeStart = null
		})
		stage.addEventListener('dragstart', event => event.preventDefault())
	}

	private show(next: number): void {
		const slides = this.slides
		this.index = (next + slides.length) % slides.length
		slides.forEach((slide, position) => {
			slide.classList.toggle(ACTIVE, position === this.index)
			slide.setAttribute('aria-hidden', String(position !== this.index))
		})
		this.bars.forEach((bar, position) => {
			bar.classList.toggle(ACTIVE, position === this.index)
			bar.classList.toggle(DONE, position < this.index)
			bar.toggleAttribute('aria-current', position === this.index)
		})
		const who = this.querySelector('[data-who]')
		if (who) who.textContent = slides[this.index].dataset.name ?? ''
	}

	private onAnimationEnd = (event: AnimationEvent): void => {
		if (event.animationName === FILL_ANIMATION) this.show(this.index + 1)
	}

	private onPointerUp = (event: PointerEvent): void => {
		if (!this.swipeStart) return
		const deltaX = event.clientX - this.swipeStart.x
		const deltaY = event.clientY - this.swipeStart.y
		this.swipeStart = null
		if (Math.abs(deltaX) < SWIPE_MIN_PX || Math.abs(deltaX) < Math.abs(deltaY)) return
		this.show(this.index + (deltaX < 0 ? 1 : -1))
	}

	private onKeyDown = (event: KeyboardEvent): void => {
		const step = KEY_STEPS[event.key]
		if (!step) return
		event.preventDefault()
		this.show(this.index + step)
	}

	private setHovered(hovered: boolean): void {
		this.hovered = hovered
		this.syncPause()
	}

	private syncPause(): void {
		this.toggleAttribute('data-paused', this.hovered || !this.visible)
	}
}

// <cart-drawer>: hoja inferior en móvil, panel flotante en escritorio (sections/cart-drawer.liquid)
import { DRAWER_SECTION, changeLine, lineFromLink, updateCount } from './cart-api'
import { reducedMotion } from './config'

const OPEN_CLASS = 'is-open'
const LOCK_CLASS = 'nb-locked'
const CLOSE_MS = 360
const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

export class CartDrawer extends HTMLElement {
	private lastFocus: HTMLElement | null = null

	connectedCallback(): void {
		this.addEventListener('click', this.onClick)
		document.addEventListener('click', this.onDocumentClick)
		document.addEventListener('keydown', this.onKeydown)
	}

	disconnectedCallback(): void {
		document.removeEventListener('click', this.onDocumentClick)
		document.removeEventListener('keydown', this.onKeydown)
	}

	get panel(): HTMLElement | null {
		return this.querySelector<HTMLElement>('[data-cart-panel]')
	}

	// returnFocus: quien abrió el carrito, si ya no tiene el foco (p. ej. un botón deshabilitado durante la petición)
	open(returnFocus?: HTMLElement | null): void {
		if (this.classList.contains(OPEN_CLASS)) return
		this.lastFocus = returnFocus ?? document.activeElement as HTMLElement | null
		this.hidden = false
		requestAnimationFrame(() => this.classList.add(OPEN_CLASS))
		document.documentElement.classList.add(LOCK_CLASS)
		this.panel?.focus({ preventScroll: true })
	}

	close(): void {
		if (!this.classList.contains(OPEN_CLASS)) return
		this.classList.remove(OPEN_CLASS)
		document.documentElement.classList.remove(LOCK_CLASS)
		setTimeout(() => {
			this.hidden = true
		}, reducedMotion() ? 0 : CLOSE_MS)
		this.lastFocus?.focus({ preventScroll: true })
	}

	// Sustituye el contenido del panel por el recién renderizado, sin tocar el estado abierto
	render(html: string | null | undefined): void {
		if (!html) return
		const fresh = new DOMParser().parseFromString(html, 'text/html').querySelector('[data-cart-panel]')
		if (!fresh || !this.panel) return
		this.panel.replaceChildren(...Array.from(fresh.childNodes))
		updateCount(html)
	}

	private showError(message: string): void {
		const node = this.querySelector<HTMLElement>('[data-cart-error]')
		if (!node) return
		node.textContent = message
		node.hidden = false
	}

	private async change(line: number, quantity: number): Promise<void> {
		this.setAttribute('aria-busy', 'true')
		try {
			const json = await changeLine(line, quantity, [DRAWER_SECTION])
			this.render(json.sections?.[DRAWER_SECTION])
		} catch (error) {
			this.showError((error as Error).message)
		} finally {
			this.removeAttribute('aria-busy')
		}
	}

	private onClick = (event: MouseEvent): void => {
		const target = event.target as HTMLElement
		if (target.closest('[data-cart-close]')) {
			this.close()
			return
		}
		const link = target.closest<HTMLElement>('[data-cart-line]')
		if (!link) return
		event.preventDefault()
		const { line, quantity } = lineFromLink(link)
		void this.change(line, quantity)
	}

	// El icono de la cabecera abre el carrito en vez de navegar a /cart
	private onDocumentClick = (event: MouseEvent): void => {
		const trigger = (event.target as HTMLElement).closest('[data-cart-open]')
		if (!trigger) return
		event.preventDefault()
		this.open()
	}

	private onKeydown = (event: KeyboardEvent): void => {
		if (this.hidden) return
		if (event.key === 'Escape') {
			this.close()
			return
		}
		if (event.key !== 'Tab' || !this.panel) return
		const items = Array.from(this.panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(node => node.offsetParent !== null)
		if (items.length === 0) return
		const first = items[0]
		const last = items[items.length - 1]
		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault()
			last.focus()
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault()
			first.focus()
		}
	}
}

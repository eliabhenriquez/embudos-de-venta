// <cart-page>: la página /cart actualiza sus líneas por AJAX (y deja al día el carrito lateral)
import { DRAWER_SECTION, changeLine, lineFromLink, updateCount } from './cart-api'
import type { CartDrawer } from './cart-drawer'

export class CartPage extends HTMLElement {
	connectedCallback(): void {
		this.addEventListener('click', this.onClick)
	}

	private onClick = (event: MouseEvent): void => {
		const link = (event.target as HTMLElement).closest<HTMLElement>('[data-cart-line]')
		if (!link) return
		event.preventDefault()
		const { line, quantity } = lineFromLink(link)
		void this.change(line, quantity)
	}

	private async change(line: number, quantity: number): Promise<void> {
		const section = this.dataset.section
		if (!section) return
		this.setAttribute('aria-busy', 'true')
		try {
			const json = await changeLine(line, quantity, [section, DRAWER_SECTION])
			const html = json.sections?.[section]
			const fresh = html ? new DOMParser().parseFromString(html, 'text/html').querySelector('cart-page') : null
			if (fresh) this.replaceChildren(...Array.from(fresh.childNodes))
			const drawerHtml = json.sections?.[DRAWER_SECTION]
			const drawer = document.querySelector<CartDrawer>('cart-drawer')
			if (drawer) drawer.render(drawerHtml)
			else if (drawerHtml) updateCount(drawerHtml)
		} catch (error) {
			const node = this.querySelector<HTMLElement>('[data-cart-error]')
			if (node) {
				node.textContent = (error as Error).message
				node.hidden = false
			}
		} finally {
			this.removeAttribute('aria-busy')
		}
	}
}

// <product-form>: agrega al carrito por AJAX y abre el carrito lateral.
// Sin JS, o con el carrito en modo página, el formulario hace su POST nativo a /cart/add.
import { DRAWER_SECTION, addToCart } from './cart-api'
import { config } from './config'
import type { CartDrawer } from './cart-drawer'

export class ProductForm extends HTMLElement {
	private form: HTMLFormElement | null = null

	connectedCallback(): void {
		this.form = this.querySelector('form') ?? this.closest('form')
		this.form?.addEventListener('submit', this.onSubmit)
	}

	disconnectedCallback(): void {
		this.form?.removeEventListener('submit', this.onSubmit)
	}

	private get error(): HTMLElement | null {
		return this.querySelector<HTMLElement>('.nb-product-form__error')
	}

	private onSubmit = (event: SubmitEvent): void => {
		const drawer = document.querySelector<CartDrawer>('cart-drawer')
		if (config().cartType !== 'drawer' || !drawer || !this.form) return
		event.preventDefault()
		void this.add(this.form, drawer, event.submitter as HTMLButtonElement | null)
	}

	private async add(form: HTMLFormElement, drawer: CartDrawer, button: HTMLButtonElement | null): Promise<void> {
		if (this.error) this.error.hidden = true
		button?.setAttribute('aria-busy', 'true')
		if (button) button.disabled = true
		try {
			const json = await addToCart(form, [DRAWER_SECTION])
			drawer.render(json.sections?.[DRAWER_SECTION])
			drawer.open(button)
		} catch (error) {
			if (this.error) {
				this.error.textContent = (error as Error).message
				this.error.hidden = false
			}
		} finally {
			button?.removeAttribute('aria-busy')
			if (button) button.disabled = false
		}
	}
}

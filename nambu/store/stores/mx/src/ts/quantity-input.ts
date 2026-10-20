// <quantity-input>: botones − / + sobre un input number nativo
const MIN_QUANTITY = 1

export class QuantityInput extends HTMLElement {
	connectedCallback(): void {
		this.addEventListener('click', this.onClick)
	}

	private onClick = (event: MouseEvent): void => {
		const button = (event.target as HTMLElement).closest('button')
		const input = this.querySelector('input')
		if (!button || !input) return
		const step = button.name === 'plus' ? 1 : -1
		input.value = String(Math.max(MIN_QUANTITY, Number(input.value || MIN_QUANTITY) + step))
		input.dispatchEvent(new Event('change', { bubbles: true }))
	}
}

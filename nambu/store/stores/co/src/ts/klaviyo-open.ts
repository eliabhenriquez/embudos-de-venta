// <klaviyo-open data-form="ID">: abre un formulario de Klaviyo (ventana emergente) al pulsar su botón.
// Usa la cola pública de Klaviyo (window._klOnsite): si su script aún no ha cargado, lo abre al cargar.
type KlaviyoQueue = unknown[][]

declare global {
	interface Window {
		_klOnsite?: KlaviyoQueue
	}
}

export class KlaviyoOpen extends HTMLElement {
	connectedCallback(): void {
		this.querySelector('button')?.addEventListener('click', this.open)
	}

	disconnectedCallback(): void {
		this.querySelector('button')?.removeEventListener('click', this.open)
	}

	private open = (): void => {
		const formId = this.dataset.form
		if (!formId) return
		window._klOnsite = window._klOnsite ?? []
		window._klOnsite.push(['openForm', formId])
	}
}

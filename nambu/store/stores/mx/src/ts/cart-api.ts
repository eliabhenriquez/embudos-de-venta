// Cart AJAX API + Section Rendering API: cada cambio devuelve ya el HTML de las secciones pedidas
import { config } from './config'

export const DRAWER_SECTION = 'cart-drawer'

export interface CartResponse {
	sections?: Record<string, string | null>
	status?: number
	description?: string
	message?: string
}

const HEADERS = { 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest' }

const parse = async (res: Response, fallback: string): Promise<CartResponse> => {
	const json = (await res.json()) as CartResponse
	if (!res.ok || json.status) throw new Error(json.description ?? json.message ?? fallback)
	return json
}

export const addToCart = async (form: HTMLFormElement, sections: string[]): Promise<CartResponse> => {
	const body = new FormData(form)
	body.append('sections', sections.join(','))
	body.append('sections_url', location.pathname)
	const res = await fetch(config().routes.cartAdd, { method: 'POST', headers: HEADERS, body })
	return parse(res, config().strings.addError)
}

export const changeLine = async (line: number, quantity: number, sections: string[]): Promise<CartResponse> => {
	const res = await fetch(config().routes.cartChange, {
		method: 'POST',
		headers: { ...HEADERS, 'Content-Type': 'application/json' },
		body: JSON.stringify({ line, quantity, sections, sections_url: location.pathname })
	})
	return parse(res, config().strings.cartError)
}

// Contador de la cabecera, leído del HTML recién renderizado
export const updateCount = (html: string): void => {
	const doc = new DOMParser().parseFromString(html, 'text/html')
	const source = doc.querySelector('[data-cart-count-source]')
	if (!source) return
	const count = Number(source.textContent ?? 0)
	document.querySelectorAll<HTMLElement>('[data-cart-count]').forEach((node) => {
		node.textContent = String(count)
		node.hidden = count === 0
	})
}

export const lineFromLink = (link: HTMLElement): { line: number, quantity: number } => ({
	line: Number(link.dataset.cartLine),
	quantity: Number(link.dataset.quantity)
})

// <need-finder>: pestañas «lo que quieres mejorar» → su producto. Flechas, Inicio y Fin mueven entre pestañas.
// Sin JS se ven todos los productos seguidos (los paneles no llevan hidden en el HTML).
import { reducedMotion } from './config'

const KEY_STEPS: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }

export class NeedFinder extends HTMLElement {
	connectedCallback(): void {
		const tabs = this.tabs
		if (!tabs.length) return
		tabs.forEach((tab, position) => {
			tab.addEventListener('click', () => this.select(position))
			tab.addEventListener('keydown', event => this.onKey(event, position))
		})
		this.select(0)
	}

	private get tabs(): HTMLElement[] {
		return Array.from(this.querySelectorAll<HTMLElement>('[role="tab"]'))
	}

	private get panels(): HTMLElement[] {
		return Array.from(this.querySelectorAll<HTMLElement>('[role="tabpanel"]'))
	}

	private select(index: number, focus = false): void {
		const tabs = this.tabs
		tabs.forEach((tab, position) => {
			const selected = position === index
			tab.setAttribute('aria-selected', String(selected))
			tab.tabIndex = selected ? 0 : -1
		})
		this.panels.forEach((panel, position) => {
			panel.hidden = position !== index
		})
		if (!focus) return
		tabs[index].focus()
		tabs[index].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reducedMotion() ? 'auto' : 'smooth' })
	}

	private onKey(event: KeyboardEvent, position: number): void {
		const count = this.tabs.length
		let target: number | null = null
		if (event.key in KEY_STEPS) target = (position + KEY_STEPS[event.key] + count) % count
		if (event.key === 'Home') target = 0
		if (event.key === 'End') target = count - 1
		if (target === null) return
		event.preventDefault()
		this.select(target, true)
	}
}

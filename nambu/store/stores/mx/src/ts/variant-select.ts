// <variant-select>: al cambiar de variante, el servidor vuelve a pintar la caja de compra
// (Section Rendering API) para que precio y disponibilidad salgan siempre de Shopify.
const BUYBOX = '.nb-buybox'

export class VariantSelect extends HTMLElement {
	connectedCallback(): void {
		this.querySelector('select')?.addEventListener('change', (event) => {
			void this.refresh((event.target as HTMLSelectElement).value)
		})
	}

	private async refresh(variantId: string): Promise<void> {
		const section = this.closest('.shopify-section')
		const sectionId = section?.id.replace('shopify-section-', '')
		if (!sectionId) return
		const url = new URL(location.href)
		url.searchParams.set('variant', variantId)
		history.replaceState(null, '', url)
		url.searchParams.set('section_id', sectionId)
		const res = await fetch(url)
		if (!res.ok) return
		const fresh = new DOMParser().parseFromString(await res.text(), 'text/html').querySelector(BUYBOX)
		const current = section?.querySelector(BUYBOX)
		if (fresh && current) current.replaceWith(fresh)
	}
}

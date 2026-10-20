// <collection-sort>: el orden se aplica al elegirlo; sin JS queda el botón de <noscript>
export class CollectionSort extends HTMLElement {
	connectedCallback(): void {
		this.querySelector('select')?.addEventListener('change', (event) => {
			(event.target as HTMLSelectElement).form?.requestSubmit()
		})
	}
}

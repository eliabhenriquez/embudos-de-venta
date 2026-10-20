// Configuración que el tema imprime en <script id="nb-config"> (snippets/theme-config.liquid)
export interface ThemeConfig {
	routes: {
		cart: string
		cartAdd: string
		cartChange: string
		recommendations: string
	}
	cartType: 'drawer' | 'page'
	strings: {
		addError: string
		cartError: string
	}
}

const CONFIG_ID = 'nb-config'
let cached: ThemeConfig | null = null

export const config = (): ThemeConfig => {
	if (cached) return cached
	const node = document.getElementById(CONFIG_ID)
	cached = JSON.parse(node?.textContent ?? '{}') as ThemeConfig
	return cached
}

export const reducedMotion = (): boolean => matchMedia('(prefers-reduced-motion: reduce)').matches

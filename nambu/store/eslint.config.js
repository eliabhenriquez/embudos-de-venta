// ESLint como linter y formateador: tabs, comillas simples, sin punto y coma
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
	{ ignores: ['stores/*/theme/**', 'proposals/**', 'node_modules/**'] },
	...tseslint.configs.recommended,
	stylistic.configs.customize({ indent: 'tab', quotes: 'single', semi: false, commaDangle: 'never', braceStyle: '1tbs' }),
	{
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
		rules: {
			'@typescript-eslint/no-explicit-any': 'error'
		}
	}
)

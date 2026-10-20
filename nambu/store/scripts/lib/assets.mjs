// Empaqueta los assets de una tienda: stores/<tienda>/src/ts/main.ts → theme/assets/theme.js y
// stores/<tienda>/src/styles/theme.css → theme/assets/theme.css
import { build, context } from 'esbuild'
import { join } from 'node:path'

const buildsOf = (store) => {
	const outDir = join(store.themeDir, 'assets')
	return [
		{ entryPoints: [join(store.srcDir, 'ts/main.ts')], outfile: join(outDir, 'theme.js'), bundle: true, format: 'iife', target: 'es2020', minify: true, legalComments: 'none' },
		{ entryPoints: [join(store.srcDir, 'styles/theme.css')], outfile: join(outDir, 'theme.css'), bundle: true, minify: true, target: ['chrome100', 'safari15'], legalComments: 'none' }
	]
}

export const buildAssets = store => Promise.all(buildsOf(store).map(options => build({ ...options, logLevel: 'info' })))

// Recompila al guardar; devuelve la función que para la vigilancia
export const watchAssets = async (store) => {
	const contexts = await Promise.all(buildsOf(store).map(options => context({ ...options, logLevel: 'info' })))
	await Promise.all(contexts.map(ctx => ctx.watch()))
	return () => Promise.all(contexts.map(ctx => ctx.dispose()))
}

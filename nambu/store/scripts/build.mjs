// pnpm build [tienda] | pnpm watch <tienda>
// Compila los assets (theme.js y theme.css) de una tienda; build sin tienda compila todas
import { buildAssets, watchAssets } from './lib/assets.mjs'
import { listStores, resolveStore } from './lib/stores.mjs'

const watching = process.argv.includes('--watch')
const [storeName] = process.argv.slice(2).filter(arg => !arg.startsWith('--'))

try {
	if (watching) {
		const store = resolveStore(storeName)
		await watchAssets(store)
		console.log(`esbuild: vigilando ${store.srcDir}/ …`)
	} else {
		const stores = (storeName ? [storeName] : listStores()).map(resolveStore)
		for (const store of stores) await buildAssets(store)
	}
} catch (error) {
	console.error(error instanceof Error ? error.message : error)
	process.exit(1)
}

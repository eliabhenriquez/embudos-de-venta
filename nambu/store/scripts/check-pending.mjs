// pnpm check:pending [tienda]
// Falla si queda algún "[POR DEFINIR]" en los datos de una tienda (ajustes, plantillas y grupos); sin tienda, revisa todas.
// Pásalo también tras `pnpm pull <tienda>`: así revisa lo que se editó en el personalizador.
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { isDataFile, listFiles, listStores, resolveStore } from './lib/stores.mjs'

const MARK = '[POR DEFINIR]'

// Recorre el JSON y devuelve la ruta de cada valor que contiene la marca
const findMarks = (value, path = []) => {
	if (typeof value === 'string') return value.includes(MARK) ? [path.join('.')] : []
	if (value && typeof value === 'object') return Object.entries(value).flatMap(([key, child]) => findMarks(child, [...path, key]))
	return []
}

const pendingIn = store => listFiles(store.themeDir)
	.filter(isDataFile)
	.flatMap((file) => {
		const path = join(store.themeDir, file)
		// Shopify añade un comentario /* … */ al principio de los JSON que escribe el editor
		const raw = readFileSync(path, 'utf8').replace(/^\s*\/\*[\s\S]*?\*\//, '')
		return findMarks(JSON.parse(raw)).map(mark => `${path} → ${mark}`)
	})

const [storeName] = process.argv.slice(2)
const stores = (storeName ? [storeName] : listStores()).map(resolveStore)
const pending = stores.flatMap(pendingIn)

if (pending.length) {
	console.error(`Quedan ${pending.length} datos ${MARK}:\n` + pending.map(line => `  · ${line}`).join('\n'))
	process.exit(1)
}
console.log(`Sin datos ${MARK} en ${stores.map(store => store.name).join(', ')}.`)

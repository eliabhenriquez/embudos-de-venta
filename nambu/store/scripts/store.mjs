// pnpm dev|push|pull <tienda> [flags de la CLI de Shopify] · pnpm check:theme [tienda]
// Compila los assets de la tienda y llama a la CLI con su entorno de shopify.theme.toml (que apunta a stores/<tienda>/theme).
import { spawn } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { buildAssets, watchAssets } from './lib/assets.mjs'
import { appFilesOf, copyInto, isDataFile, listFiles, listStores, resolveStore, storeDomain } from './lib/stores.mjs'

// Con alguno de estos flags la CLI ya sabe a qué tema ir; sin ninguno, push crea uno sin publicar y pull lee el publicado
const TARGET_FLAGS = ['--theme', '-t', '--live', '-l', '--development', '-d', '--unpublished', '-u']
const DATA_GLOBS = ['config/settings_data.json', 'templates/*.json', 'templates/customers/*.json', 'sections/*.json']

const hasTarget = args => args.some(arg => TARGET_FLAGS.includes(arg.split('=')[0]))
const repeatFlag = (flag, values) => values.flatMap(value => [flag, value])

const shopify = args => new Promise((resolve) => {
	const child = spawn('shopify', args, { stdio: 'inherit', shell: process.platform === 'win32' })
	child.on('close', code => resolve(code ?? 1))
})

const commands = {
	dev: async (store, args) => {
		const stopAssets = await watchAssets(store)
		const code = await shopify(['theme', 'dev', '-e', store.name, ...args])
		await stopAssets()
		return code
	},

	push: async (store, args) => {
		await buildAssets(store)
		const target = hasTarget(args) ? [] : ['--unpublished']
		return shopify(['theme', 'push', '-e', store.name, ...target, ...args])
	},

	// Trae a stores/<tienda>/theme/ lo que se editó en el personalizador (solo datos: el código vive en el repo)
	pull: async (store, args) => {
		const tempDir = mkdtempSync(join(tmpdir(), `nambu-${store.name}-`))
		try {
			const target = hasTarget(args) ? [] : ['--live']
			// Con --path en otra carpeta la CLI no ve shopify.theme.toml: la tienda va explícita
			const code = await shopify(['theme', 'pull', '--store', storeDomain(store), '--path', tempDir, ...repeatFlag('--only', DATA_GLOBS), ...repeatFlag('--ignore', appFilesOf(store)), ...target, ...args])
			if (code !== 0) return code

			const pulled = listFiles(tempDir).filter(isDataFile)
			pulled.forEach(file => copyInto(tempDir, store.themeDir, file))
			console.log(`${pulled.length} archivos de datos actualizados en ${store.themeDir}`)

			const localOnly = listFiles(store.themeDir).filter(file => isDataFile(file) && !pulled.includes(file))
			if (localOnly.length) console.warn('Solo en local (¿borrados en la tienda?):\n' + localOnly.map(file => `  · ${file}`).join('\n'))
			return 0
		} finally {
			rmSync(tempDir, { recursive: true, force: true })
		}
	},

	check: async (store, args) => {
		await buildAssets(store)
		return shopify(['theme', 'check', '--path', store.themeDir, ...args])
	}
}

const [command, storeName, ...args] = process.argv.slice(2)

try {
	const run = commands[command]
	if (!run) throw new Error(`Comando desconocido: «${command ?? ''}». Opciones: ${Object.keys(commands).join(', ')}`)

	// check sin tienda revisa todas; el resto exige una
	const stores = (command === 'check' && !storeName ? listStores() : [storeName]).map(resolveStore)

	let exitCode = 0
	for (const store of stores) {
		const code = await run(store, args)
		if (code !== 0) exitCode = code
	}
	process.exit(exitCode)
} catch (error) {
	console.error(error instanceof Error ? error.message : error)
	process.exit(1)
}

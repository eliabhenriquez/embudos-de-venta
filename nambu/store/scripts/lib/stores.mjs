// Cada tienda es un tema completo y propio: stores/<tienda>/theme (código y datos, lo que sube la CLI) y
// stores/<tienda>/src (TS y CSS que se compilan a su theme/assets). Ningún archivo del tema se comparte entre tiendas.
// El nombre de la tienda es también su entorno en shopify.theme.toml (dominio y ruta del tema).
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, join, relative, sep } from 'node:path'

const STORES_DIR = 'stores'
const THEME_DIR = 'theme'
const IGNORE_FILE = '.shopifyignore'

// Lo que escribe el personalizador
const DATA_FILES = [/^config\/settings_data\.json$/, /^templates\/(customers\/)?[^/]+\.json$/, /^sections\/[^/]+\.json$/]

const IGNORED_NAMES = new Set(['.DS_Store'])

const toPosix = path => path.split(sep).join('/')

export const isDataFile = path => DATA_FILES.some(pattern => pattern.test(toPosix(path)))

const themeDirOf = name => join(STORES_DIR, name, THEME_DIR)

export const listStores = () => readdirSync(STORES_DIR, { withFileTypes: true })
	.filter(entry => entry.isDirectory() && existsSync(themeDirOf(entry.name)))
	.map(entry => entry.name)

export const resolveStore = (name) => {
	const stores = listStores()
	if (!stores.includes(name)) throw new Error(`Tienda sin tema: «${name ?? ''}» (falta ${themeDirOf(name ?? '<tienda>')}/). Opciones: ${stores.join(', ')}`)
	const root = join(STORES_DIR, name)
	return { name, themeDir: themeDirOf(name), srcDir: join(root, 'src'), contentDir: join(root, 'data') }
}

// Dominio myshopify de la tienda, del entorno con su nombre en shopify.theme.toml
export const storeDomain = (store) => {
	const toml = readFileSync('shopify.theme.toml', 'utf8')
	const section = toml.split(/^\[environments\./m).find(part => part.startsWith(`${store.name}]`))
	const domain = section?.match(/^store\s*=\s*"([^"]+)"/m)?.[1]
	if (!domain) throw new Error(`Falta [environments.${store.name}] con store = "…" en shopify.theme.toml`)
	return domain
}

// Lo que las apps escriben dentro del tema publicado (GemPages): la CLI ni lo sube, ni lo borra, ni lo trae
export const appFilesOf = store => readFileSync(join(store.themeDir, IGNORE_FILE), 'utf8')
	.split('\n')
	.map(line => line.trim())
	.filter(line => line && !line.startsWith('#'))

// Rutas relativas de todos los archivos de un directorio
export const listFiles = (root, dir = root) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
	if (IGNORED_NAMES.has(entry.name)) return []
	const path = join(dir, entry.name)
	return entry.isDirectory() ? listFiles(root, path) : [relative(root, path)]
})

export const copyInto = (fromRoot, toRoot, file) => {
	const target = join(toRoot, file)
	mkdirSync(dirname(target), { recursive: true })
	copyFileSync(join(fromRoot, file), target)
}

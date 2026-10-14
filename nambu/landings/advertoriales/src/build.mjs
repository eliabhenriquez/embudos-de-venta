// Genera los advertoriales del Spray Nasal: un october.html autocontenido por artículo.
//
//   node nambu/landings/advertoriales/src/build.mjs              → todos los artículos
//   node nambu/landings/advertoriales/src/build.mjs flema
//   node nambu/landings/advertoriales/src/build.mjs --no-derived → sin vista previa ni pestañas
//
// El october.html de cada artículo es DERIVADO: se edita aquí (contenido en articles/,
// bloques en blocks/, estilos en styles/) y se regenera. Lo que es del producto —CTA,
// tokens, personas reales, logotipos, medios de pago— se importa del generador del
// spray (/nambu/landings/spray/src/): una sola fuente para landings y advertoriales.
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { defs } from '../../spray/src/lib/art.mjs'
import { ARTICLES } from './articles/index.mjs'
import { renderBlock, isHeld } from './blocks/index.mjs'
import { progress, head, foot, buybar } from './blocks/frame.mjs'

const SRC = path.dirname(fileURLToPath(import.meta.url))
const FORMAT_DIR = path.dirname(SRC)
const SPRAY_SRC = path.resolve(FORMAT_DIR, '../spray/src')
const REPO = path.resolve(FORMAT_DIR, '../../..')
const CAMPAIGN = 'october'
const WORDS_PER_MINUTE = 200
// Base, CTA, medios de pago y andamiaje de Releasit: los mismos parciales que las landings
const SHARED_STYLES = ['styles/shared/base.css', 'styles/shared/cta.css', 'styles/shared/paymethods.css', 'styles/shared/scaffold.css']
const CONFIG_BLOCK = /(\t\t\/\/ build:config[^\n]*\n)[\s\S]*?(\t\t\/\/ \/build:config)/

const readSpray = file => fs.readFileSync(path.join(SPRAY_SRC, file), 'utf8')
const ARTICLE_CSS = fs.readFileSync(path.join(SRC, 'styles/article.css'), 'utf8')
const ARTICLE_JS = fs.readFileSync(path.join(SRC, 'scripts/article.js'), 'utf8')
// Skin del formulario de Releasit: es de la marca y va al final del CSS, en la misma
// pestaña de GemPages (/docs/releasit-form-styling.md §7.1)
const RELEASIT_SKIN = fs.readFileSync(path.resolve(FORMAT_DIR, '../../shared/releasit-form.css'), 'utf8')

const header = article => `<!--
	NAMBU · SPRAY NASAL — Advertorial, artículo ${article.id} (campaña ${CAMPAIGN})
	===========================================================================
	GENERADO por src/build.mjs: no se edita a mano. Contenido en src/articles/${article.id}.mjs,
	bloques en src/blocks/, estilos en src/styles/. Lo del producto (CTA, tokens, personas,
	logotipos) sale del generador del spray: /nambu/landings/spray/src/.
	Bloque autocontenido para el Custom Code de GemPages (pestañas HTML/CSS/JS).
	Copy: ${article.id}/${article.copy} (fuente comercial).
	Contexto: /AGENTS.md → /nambu/AGENTS.md → ../AGENTS.md (formato, bloques, despliegue).
	${productLine(article)}
	Despliegue: ficha de producto de GemPages, Custom Code en una fila de ancho completo y
	un Product Element al final como proveedor de contexto para Releasit (../AGENTS.md §4).
	Paleta: SOLO el verde manzana del frasco y blanco. Tipografía: Questrial, un solo peso.
	Todas las medidas en px — la raíz del tema va a 10,5px (/nambu/AGENTS.md §3).
-->`

// Un artículo sin página de referencia todavía no tiene ficha donde publicarse
const productLine = ({ product }) => product
	? `Producto: /products/${product.handle} — ${product.title} (variante ${product.variant}).`
	: 'Producto: ficha por definir (el artículo no tiene página publicada).'

// Minutos de lectura, medidos sobre el copy (sin las marcas de formato)
const readingMinutes = article => {
	const copy = fs.readFileSync(path.join(FORMAT_DIR, article.id, article.copy), 'utf8')
	const words = copy.replace(/[#*_\[\]—-]+/g, ' ').split(/\s+/).filter(Boolean).length
	return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

const markup = article => {
	const base = `ns-adv-${article.id}`
	// El id sale de la posición en el artículo: no cambia al retener o soltar un bloque
	const blocks = article.blocks
		.map((block, index) => (isHeld(block) ? '' : renderBlock(block, { id: `${base}-${index + 1}` })))
		.filter(Boolean)
		.join('\n')
	return [
		header(article),
		'',
		`<section class="ns-lp ns-adv" id="${base}">`,
		'',
		`\t${defs()}`,
		'',
		progress(),
		'',
		'\t<div class="ns-layout">',
		`\t\t<article class="ns-article" aria-labelledby="${base}-title">`,
		head(article, { minutes: readingMinutes(article), titleId: `${base}-title` }),
		'',
		blocks,
		'',
		foot(article),
		'\t\t</article>',
		'',
		buybar(article),
		'\t</div>',
		'',
		'</section>'
	].join('\n')
}

const indent = css => css.split('\n').map(line => (line ? `\t${line}` : line)).join('\n')
const styles = article => [...SHARED_STYLES.map(readSpray), ...(article.styles || []).map(readSpray), ARTICLE_CSS, indent(RELEASIT_SKIN)].join('\n')

const script = article => {
	const flag = `nsAdv${article.id[0].toUpperCase()}${article.id.slice(1)}Ready`
	if (!CONFIG_BLOCK.test(ARTICLE_JS)) throw new Error('scripts/article.js no tiene el bloque build:config')
	return ARTICLE_JS.replace(CONFIG_BLOCK, (match, open, close) => `${open}\t\tvar READY_FLAG = '${flag}'\n${close}`)
}

const build = (article, { derived }) => {
	const file = path.join(FORMAT_DIR, article.id, `${CAMPAIGN}.html`)
	fs.writeFileSync(file, `${markup(article)}\n\n<style>\n${styles(article)}</style>\n\n<script>\n${script(article)}</script>\n`)
	const relative = path.relative(REPO, file)
	console.log(`escrito ${relative}`)
	for (const block of article.blocks.filter(isHeld)) console.log(`  retenido: ${block.type} — ${block.hold}`)
	if (!derived) return
	execFileSync('./preview.sh', [relative], { cwd: REPO, stdio: 'ignore' })
	execFileSync('./split-tabs.sh', [relative], { cwd: REPO, stdio: 'ignore' })
}

const args = process.argv.slice(2)
const derived = !args.includes('--no-derived')
const wanted = args.filter(arg => !arg.startsWith('--'))
const unknown = wanted.filter(id => !ARTICLES[id])
if (unknown.length) throw new Error(`Artículos desconocidos: ${unknown.join(', ')}`)
for (const id of wanted.length ? wanted : Object.keys(ARTICLES)) build(ARTICLES[id], { derived })

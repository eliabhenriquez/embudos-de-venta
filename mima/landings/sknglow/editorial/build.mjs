// Genera los formatos editoriales de SKNGLOW (advertorial, listicle): un october.html
// autocontenido por artículo, en la carpeta de su ángulo.
//
//   node mima/landings/sknglow/editorial/build.mjs                      → todos
//   node mima/landings/sknglow/editorial/build.mjs advertorial-cabello
//   node mima/landings/sknglow/editorial/build.mjs --no-derived         → sin vista previa ni pestañas
//
// El october.html de cada artículo es DERIVADO: se edita aquí (contenido en articles/,
// bloques en blocks/, estilos en styles/, comportamiento en scripts/) y se regenera.
// Las imágenes se registran en lib/images.mjs.
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { ARTICLES } from './articles/index.mjs'
import { renderBlock } from './blocks/index.mjs'
import { progress, masthead, head, foot, buybar, viewer } from './blocks/frame.mjs'

const SRC = path.dirname(fileURLToPath(import.meta.url))
const PRODUCT_DIR = path.dirname(SRC)
const REPO = path.resolve(PRODUCT_DIR, '../../..')
const CAMPAIGN = 'october'
const WORDS_PER_MINUTE = 200
// Las notas de dirección de arte del copy («[IMAGEN: …]») no son texto que se lea
const ART_NOTE = /\[IMAGEN:[^\]]*\]/g
const CONFIG_BLOCK = /(\t\t\/\/ build:config[^\n]*\n)[\s\S]*?(\t\t\/\/ \/build:config)/

// Cada formato lleva la hoja del artículo y, detrás, la suya si tiene
const FORMATS = {
	advertorial: { label: 'Advertorial', sheets: ['article'] },
	listicle: { label: 'Listicle', sheets: ['article', 'listicle'] }
}

const ARTICLE_JS = fs.readFileSync(path.join(SRC, 'scripts/article.js'), 'utf8')

const formatOf = article => {
	const format = FORMATS[article.format]
	if (!format) throw new Error(`Formato desconocido en ${article.id}: ${article.format}`)
	return format
}

const styles = article => formatOf(article).sheets
	.map(name => fs.readFileSync(path.join(SRC, `styles/${name}.css`), 'utf8'))
	.join('')

const header = article => `<!--
	MIMA · SKNGLOW — ${formatOf(article).label}, ángulo ${article.angle} (campaña ${CAMPAIGN})
	===========================================================================
	GENERADO por ../editorial/build.mjs: no se edita a mano. Contenido en
	../editorial/articles/${article.id}.mjs, bloques en ../editorial/blocks/, estilos en
	../editorial/styles/.
	Bloque autocontenido para el Custom Code de GemPages (pestañas HTML/CSS/JS).
	Copy: ${article.copy} (los textos van tal cual; los precios, los vigentes del producto).
	Contexto: /AGENTS.md → /mima/AGENTS.md → ../AGENTS.md §7 (formato, bloques, despliegue).
	CTA → abre el formulario de la app que esté activa: clases de Releasit y, para EasySell,
	id="es-popup-button" con las clases es-popup-button es-popup-button-cart.
	Despliegue: Custom Code en una fila de ancho completo y un Product Element al final,
	enlazado al producto: sin él los CTA no abren el formulario.
	Todas las medidas en px.
-->`

// Minutos de lectura, medidos sobre el copy
const readingMinutes = article => {
	const copy = fs.readFileSync(path.join(PRODUCT_DIR, article.id, article.copy), 'utf8')
	const words = copy.replace(ART_NOTE, ' ').split(/\s+/).filter(Boolean).length
	return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

const markup = article => {
	const base = `sg-${article.id}`
	// El id sale de la posición en el artículo: los titulares lo llevan
	const blocks = article.blocks.map((block, index) => renderBlock(block, { id: `${base}-${index + 1}` })).join('\n')
	return [
		header(article),
		'',
		`<section class="sg-lp" id="${base}" data-rsi-banner="${article.banner}">`,
		'',
		progress(),
		'',
		'\t<div class="sg-layout">',
		`\t\t<article class="sg-article" data-sg-article aria-labelledby="${base}-title">`,
		masthead(article.masthead),
		head(article, { minutes: readingMinutes(article), titleId: `${base}-title` }),
		'',
		blocks,
		'',
		foot(article),
		'\t\t</article>',
		'',
		buybar(article.buybar),
		'\t</div>',
		'',
		viewer(),
		'',
		'</section>'
	].join('\n')
}

const camel = id => id.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())

const script = article => {
	const flag = `sg${camel(`-${article.id}`)}Ready`
	if (!CONFIG_BLOCK.test(ARTICLE_JS)) throw new Error('scripts/article.js no tiene el bloque build:config')
	return ARTICLE_JS.replace(CONFIG_BLOCK, (match, open, close) => `${open}\t\tvar READY_FLAG = '${flag}'\n${close}`)
}

const build = (article, { derived }) => {
	const file = path.join(PRODUCT_DIR, article.id, `${CAMPAIGN}.html`)
	fs.writeFileSync(file, `${markup(article)}\n\n<style>\n${styles(article)}</style>\n\n<script>\n${script(article)}</script>\n`)
	const relative = path.relative(REPO, file)
	console.log(`escrito ${relative}`)
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

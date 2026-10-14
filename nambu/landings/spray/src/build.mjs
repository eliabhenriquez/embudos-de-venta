// Genera las landings del Spray Nasal: un september.html autocontenido por ángulo.
//
//   node nambu/landings/spray/src/build.mjs              → todos los ángulos
//   node nambu/landings/spray/src/build.mjs flema sinusitis
//   node nambu/landings/spray/src/build.mjs --no-derived → sin vista previa ni pestañas
//
// El september.html de cada ángulo es DERIVADO: se edita aquí (secciones, estilos,
// contenido del ángulo) y se regenera. Después de escribirlo, este script regenera
// la vista previa (preview.sh) y las pestañas de GemPages (split-tabs.sh).
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { SECTIONS } from './sections/index.mjs'
import { heroLayout } from './sections/hero/index.mjs'
import { defs } from './lib/art.mjs'
import { ANGLES } from './angles/index.mjs'

const SRC = path.dirname(fileURLToPath(import.meta.url))
const PRODUCT_DIR = path.dirname(SRC)
const REPO = path.resolve(PRODUCT_DIR, '../../..')
const CAMPAIGN = 'september'
// Lo compartido con los advertoriales (/nambu/landings/advertoriales/src/) va delante:
// base, CTA, medios de pago y andamiaje de Releasit. Después, las secciones de la landing.
const BASE_STYLES = ['styles/shared/base.css', 'styles/shared/cta.css', 'styles/shared/paymethods.css', 'styles/shared/scaffold.css', 'styles/landing.css']
const BASE_CSS = BASE_STYLES.map(file => fs.readFileSync(path.join(SRC, file), 'utf8')).join('\n')
const BASE_JS = fs.readFileSync(path.join(SRC, 'scripts/landing.js'), 'utf8')
// Skin del formulario de Releasit: es de la marca (nambu/shared/) y va al final del CSS
// de cada landing, en la misma pestaña de GemPages (/docs/releasit-form-styling.md §7.1)
const RELEASIT_SKIN = fs.readFileSync(path.resolve(PRODUCT_DIR, '../../shared/releasit-form.css'), 'utf8')
const CONFIG_BLOCK = /(\t\t\/\/ build:config[^\n]*\n)[\s\S]*?(\t\t\/\/ \/build:config)/

const header = angle => `<!--
	NAMBU · SPRAY NASAL — Landing de venta, ángulo ${angle.id} (campaña ${CAMPAIGN})
	===========================================================================
	GENERADO por src/build.mjs: no se edita a mano. Secciones comunes en src/sections/,
	estilos en src/styles/, contenido y sello del ángulo en src/angles/${angle.id}/.
	Bloque autocontenido para el Custom Code de GemPages (pestañas HTML/CSS/JS).
	Copy: ${angle.id}/${angle.copy} (fuente comercial).
	Contexto: /AGENTS.md → /nambu/AGENTS.md → ../AGENTS.md (motivo, CTA, imágenes).
	Producto: /products/${angle.product.handle} — ${angle.product.title} (variante ${angle.product.variant}).
	Despliegue: PÁGINA /pages/…, con un Product Element de GemPages al final como
	proveedor de contexto para Releasit (../AGENTS.md §4).
	Releasit sirve aquí el formulario NUEVO (#rsi_form_wrapper, clases rsi-*) desde el
	2026-09-28: /docs/releasit-form-styling.md §6.7. Su skin
	(/nambu/shared/releasit-form.css) va al final del CSS de la landing.
	Paleta: SOLO el verde manzana del frasco y blanco (decisión del cliente, 2026-09-21).
	Motivo: despejar. CTA: el disparo del spray. Hero: ${heroLayout(angle).name}.
	Sello del ángulo: ${angle.signature}.
	Todas las medidas en px — la raíz del tema va a 10,5px (/nambu/AGENTS.md §3).
-->`

// Una entrada de `sections` es el nombre de una sección común, o
// { section, dataKey } para otra instancia con los datos de angle[dataKey], o una función.
const renderSection = (angle, entry) => {
	if (typeof entry === 'function') return entry(angle)
	if (typeof entry === 'string') return SECTIONS[entry](angle)
	return SECTIONS[entry.section](angle, angle[entry.dataKey])
}

const markup = angle => [
	header(angle),
	'',
	`<section class="ns-lp" id="ns-spray-${angle.id}">`,
	'',
	`\t${defs(angle.symbols)}`,
	'',
	angle.sections.map(entry => renderSection(angle, entry)).join('\n\n'),
	'',
	'</section>'
].join('\n')

// Base común, la composición del hero del ángulo, su sello y, al final, el skin del
// formulario (sangrado con un tab, como el resto del CSS)
const readStyle = file => fs.readFileSync(path.join(SRC, file), 'utf8')
const indent = css => css.split('\n').map(line => (line ? `\t${line}` : line)).join('\n')
const styles = angle => [BASE_CSS, readStyle(heroLayout(angle).styles), ...(angle.styles || []).map(readStyle), indent(RELEASIT_SKIN)].join('\n')

const quote = value => `'${value}'`
const object = map => `{ ${Object.entries(map).map(([key, value]) => `${key}: ${quote(value)}`).join(', ')} }`
const script = angle => {
	const flag = `nsSpray${angle.id[0].toUpperCase()}${angle.id.slice(1)}Ready`
	const config = [
		`\t\tvar READY_FLAG = ${quote(flag)}`,
		`\t\tvar DEFAULT_PRICE_MODE = 'regular'`,
		`\t\tvar PRICES = ${object(angle.prices)}`,
		`\t\tvar STICKY_SUBS = ${object(angle.stickySubs)}`
	].join('\n')
	if (!CONFIG_BLOCK.test(BASE_JS)) throw new Error('scripts/landing.js no tiene el bloque build:config')
	// Función de reemplazo: los precios llevan $ y no deben leerse como $1, $2…
	return BASE_JS.replace(CONFIG_BLOCK, (match, open, close) => `${open}${config}\n${close}`)
}

const build = (angle, { derived }) => {
	const file = path.join(PRODUCT_DIR, angle.id, `${CAMPAIGN}.html`)
	fs.writeFileSync(file, `${markup(angle)}\n\n<style>\n${styles(angle)}</style>\n\n<script>\n${script(angle)}</script>\n`)
	const relative = path.relative(REPO, file)
	console.log(`escrito ${relative}`)
	if (!derived) return
	execFileSync('./preview.sh', [relative], { cwd: REPO, stdio: 'ignore' })
	execFileSync('./split-tabs.sh', [relative], { cwd: REPO, stdio: 'ignore' })
}

const args = process.argv.slice(2)
const derived = !args.includes('--no-derived')
const wanted = args.filter(arg => !arg.startsWith('--'))
const unknown = wanted.filter(id => !ANGLES[id])
if (unknown.length) throw new Error(`Ángulos desconocidos: ${unknown.join(', ')}`)
for (const id of wanted.length ? wanted : Object.keys(ANGLES)) build(ANGLES[id], { derived })

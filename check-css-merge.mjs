#!/usr/bin/env node
// Simula lo que hace GemPages con el CSS de un bloque al publicarlo y avisa si
// algún estilo computado cambia.
//
// GemPages pasa el <style> del Custom Code por un minificador que FUSIONA las
// reglas con el mismo cuerpo aunque no sean adyacentes y deja la fusión en la
// posición de la PRIMERA. Si entre las dos había una regla con la misma
// especificidad y propiedades solapadas, esa regla pasa a ganar. Visto el
// 2026-09-07: `.vl-plan--best` compartía cuerpo con `.vl-dim--3` y la tarjeta
// de pago anticipado de Valeriana perdía el fondo; en la Clorofull publicada,
// `.cf-close__overline` había subido por encima de `.cf-overline` y el rótulo
// del cierre salía gris. La defensa es que toda regla que sobreescriba a otra
// gane por especificidad, no por orden.
//
// El script regenera la preview, fusiona el CSS del fragmento en el peor caso
// (todas las reglas de cuerpo idéntico dentro del mismo @media, sin
// heurísticas de seguridad), abre la preview con shot.mjs, toma una foto de los
// estilos computados de todos los elementos (y sus ::before/::after), cambia
// la hoja por la fusionada y vuelve a medir. Cualquier diferencia es una regla
// que depende del orden y hay que corregir.
//
//   node check-css-merge.mjs eterma/landings/valeriana/general/september.html
//   node check-css-merge.mjs <fragmento.html> --widths=390,1280 --groups   (lista las fusiones)
//   node check-css-merge.mjs <fragmento.html> --no-merge   (control: reinyecta sin fusionar; debe dar 0 cambios)
//   node check-css-merge.mjs <fragmento.html> --dump-css=/tmp/fusionado.css   (guarda el CSS fusionado)
//
// Sale con código 1 si hay diferencias.

import { spawnSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO_DIR = dirname(fileURLToPath(import.meta.url))
const DEFAULT_WIDTHS = [390, 1280]
const SETTLE_MS = 1800
const MAX_DIFFS_SHOWN = 40
const BODY_PREVIEW_CHARS = 90

// Propiedades que cambian el aspecto y no varían solas con el tiempo
// (transform y opacity quedan fuera: las animaciones las mueven).
const WATCHED_PROPERTIES = [
	'color', 'background-color', 'background-image', 'box-shadow', 'outline-color',
	'border-top-color', 'border-right-color', 'border-bottom-color', 'border-left-color',
	'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width',
	'border-top-style', 'border-bottom-style', 'border-top-left-radius', 'border-bottom-right-radius',
	'font-family', 'font-size', 'font-weight', 'font-style', 'letter-spacing', 'line-height',
	'text-transform', 'text-align', 'text-decoration-line', 'white-space',
	'display', 'position', 'visibility', 'overflow-x', 'z-index', 'order', 'mix-blend-mode', 'filter', 'clip-path',
	'width', 'height', 'top', 'right', 'bottom', 'left', 'aspect-ratio', 'object-fit',
	'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
	'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
	'row-gap', 'column-gap', 'grid-template-columns', 'flex-direction', 'align-items', 'justify-content',
]

const args = Object.fromEntries(process.argv.slice(2).filter(a => a.startsWith('--')).map(a => { const [k, ...v] = a.slice(2).split('='); return [k, v.join('=') || true] }))
const fragment = process.argv.slice(2).find(a => !a.startsWith('--'))
if (!fragment) {
	console.error('uso: node check-css-merge.mjs <fragmento.html> [--widths=390,1280] [--groups] [--no-merge] [--dump-css=<fichero>]')
	process.exit(2)
}

const fragmentPath = resolve(fragment)
const previewPath = fragmentPath.replace(/\.html$/, '.preview.html')
const widths = String(args.widths || DEFAULT_WIDTHS.join(',')).split(',').map(Number)
const source = readFileSync(fragmentPath, 'utf8')
const prefix = source.match(/class="([a-z0-9]+)-lp\b/)?.[1]
if (!prefix) {
	console.error('no encuentro la raíz `.<prefijo>-lp` en el fragmento')
	process.exit(2)
}

const preview = spawnSync('sh', [join(REPO_DIR, 'preview.sh'), fragmentPath], { stdio: 'inherit' })
if (preview.status !== 0) process.exit(preview.status ?? 1)

// Sin los comentarios HTML: un «<style>» escrito en una cabecera se tomaría por la etiqueta
const styleBlocks = [...source.replace(/<!--[\s\S]*?-->/g, '').matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1]).filter(css => css.includes(`.${prefix}-lp`))
const merge = mergeIdenticalRules(styleBlocks.join('\n'), { disabled: Boolean(args['no-merge']) })

if (args['dump-css']) writeFileSync(resolve(String(args['dump-css'])), merge.css)

const workDir = mkdtempSync(join(tmpdir(), 'check-css-merge-'))
const probePath = join(workDir, 'probe.js')
writeFileSync(probePath, buildProbe(prefix, merge.css))

let failures = 0
for (const width of widths) {
	const shot = spawnSync('node', [join(REPO_DIR, 'shot.mjs'), `--url=file://${previewPath}`, `--width=${width}`, `--wait=${SETTLE_MS}`, `--probe=${probePath}`], { encoding: 'utf8' })
	const lastLine = shot.stdout.trim().split('\n').pop() || ''
	let diffs
	try { diffs = JSON.parse(JSON.parse(lastLine)) } catch { console.error(`[${width}px] shot.mjs no devolvió un informe válido:\n${shot.stderr || shot.stdout}`); process.exit(1) }
	printReport(width, diffs)
	if (diffs.length) failures++
}
rmSync(workDir, { recursive: true, force: true })
process.exit(failures ? 1 : 0)

function printReport(width, diffs) {
	const summary = `[${width}px] ${merge.rules} reglas, ${merge.groups.length} fusiones simuladas (${merge.moved} reglas movidas)`
	if (!diffs.length) {
		console.log(`${summary} → sin cambios de estilo`)
		return
	}
	console.log(`${summary} → ${diffs.length} cambios de estilo:`)
	for (const diff of diffs.slice(0, MAX_DIFFS_SHOWN)) console.log(`  ${diff.element}${diff.pseudo}  ${diff.property}: ${diff.before} → ${diff.after}`)
	if (diffs.length > MAX_DIFFS_SHOWN) console.log(`  … y ${diffs.length - MAX_DIFFS_SHOWN} más`)
	if (!args.groups) return
	console.log('  fusiones simuladas (la regla movida sube a la posición de la primera):')
	for (const group of merge.groups) console.log(`    ${group.media ? `@media ${group.media} ` : ''}${group.moved.join(', ')}  →  ${group.first}  { ${group.body.slice(0, BODY_PREVIEW_CHARS)} }`)
}

// Fusión en el peor caso sobre el texto crudo: reglas con el mismo cuerpo (normalizado como lo
// haría un minificador) y el mismo contexto @media se juntan en la posición de la primera.
function mergeIdenticalRules(css, { disabled }) {
	const stats = { rules: 0, moved: 0, groups: [] }
	const clean = css.replace(/\/\*[\s\S]*?\*\//g, '')
	const output = serializeBlock(parseBlock(clean, 0).items, '', new Map())
	return { css: output, ...stats }

	function serializeBlock(items, media, groupsByBody) {
		const entries = []
		for (const item of items) {
			if (item.kind === 'media') {
				entries.push({ text: `${item.head}{${serializeBlock(item.items, item.head.replace(/^@media\s*/, ''), new Map())}}` })
				continue
			}
			if (item.kind === 'at') { entries.push({ text: item.text }); continue }
			stats.rules++
			if (disabled) { entries.push({ text: `${item.selector}{${item.body}}` }); continue }
			const key = normalizeBody(item.body)
			const group = groupsByBody.get(key)
			if (group) {
				group.selectors.push(item.selector)
				stats.moved++
				if (group.selectors.length === 2) stats.groups.push({ media, first: group.selectors[0], moved: group.selectors, body: key })
				continue
			}
			const created = { selectors: [item.selector], body: item.body }
			groupsByBody.set(key, created)
			entries.push(created)
		}
		for (const group of stats.groups) if (group.moved[0] === group.first) group.moved = group.moved.slice(1)
		return entries.map(entry => entry.text !== undefined ? entry.text : `${entry.selectors.join(',')}{${entry.body}}`).join('\n')
	}
}

// Parser mínimo: reglas de estilo, @media anidados y otros bloques @ (keyframes, font-face) tal cual.
function parseBlock(css, start) {
	const items = []
	let i = start
	while (i < css.length) {
		const open = css.indexOf('{', i)
		const close = css.indexOf('}', i)
		if (open === -1 || (close !== -1 && close < open)) return { items, end: close === -1 ? css.length : close + 1 }
		const head = css.slice(i, open).trim()
		if (head.startsWith('@media')) {
			const inner = parseBlock(css, open + 1)
			items.push({ kind: 'media', head, items: inner.items })
			i = inner.end
			continue
		}
		if (head.startsWith('@')) {
			const end = matchingBrace(css, open)
			items.push({ kind: 'at', text: css.slice(i, end + 1).trim() })
			i = end + 1
			continue
		}
		const bodyEnd = css.indexOf('}', open)
		items.push({ kind: 'rule', selector: head.replace(/\s+/g, ' '), body: css.slice(open + 1, bodyEnd).trim() })
		i = bodyEnd + 1
	}
	return { items, end: i }
}

function matchingBrace(css, open) {
	let depth = 0
	for (let i = open; i < css.length; i++) {
		if (css[i] === '{') depth++
		if (css[i] === '}' && --depth === 0) return i
	}
	return css.length - 1
}

function normalizeBody(body) {
	return body
		.split(';')
		.map(declaration => declaration.trim())
		.filter(Boolean)
		.map(declaration => declaration.replace(/\s*:\s*/, ':').replace(/\s+/g, ' ').replace(/(^|[\s(,:])0(?:px|em|rem|%)(?=[\s,)]|$)/g, '$10').toLowerCase())
		.join(';')
}

// Se ejecuta dentro de la página. Devuelve JSON como string (shot.mjs lo vuelve a serializar).
function buildProbe(rootPrefix, mergedCss) {
	return `(function () {
	var ROOT_MARK = '.${rootPrefix}-lp'
	var PROPS = ${JSON.stringify(WATCHED_PROPERTIES)}
	var PSEUDOS = ['', '::before', '::after']
	var MERGED_CSS = ${JSON.stringify(mergedCss)}

	var sheets = [].filter.call(document.styleSheets, function (sheet) {
		return sheet.ownerNode && sheet.ownerNode.tagName === 'STYLE' && sheet.ownerNode.textContent.indexOf(ROOT_MARK) >= 0
	})
	var root = document.querySelector(ROOT_MARK)
	if (!sheets.length || !root) return JSON.stringify([{ element: 'sin hoja o sin raíz', pseudo: '', property: ROOT_MARK, before: '', after: '' }])

	var elements = [root].concat([].slice.call(root.querySelectorAll('*')))

	function describe(element) {
		var classes = element.className && typeof element.className === 'string' ? '.' + element.className.trim().split(/\\s+/).join('.') : ''
		return element.tagName.toLowerCase() + classes + ' [#' + elements.indexOf(element) + ']'
	}

	function snapshot() {
		return elements.map(function (element) {
			return PSEUDOS.map(function (pseudo) {
				var style = getComputedStyle(element, pseudo || null)
				if (pseudo && style.content === 'none') return null
				return PROPS.map(function (property) { return style.getPropertyValue(property) })
			})
		})
	}

	var before = snapshot()
	sheets.forEach(function (sheet) { sheet.disabled = true })
	var mergedStyle = document.createElement('style')
	mergedStyle.textContent = MERGED_CSS
	document.head.appendChild(mergedStyle)
	void root.offsetHeight
	var after = snapshot()
	mergedStyle.remove()
	sheets.forEach(function (sheet) { sheet.disabled = false })

	var diffs = []
	elements.forEach(function (element, e) {
		PSEUDOS.forEach(function (pseudo, p) {
			var a = before[e][p], b = after[e][p]
			if (!a && !b) return
			if (!a || !b) { diffs.push({ element: describe(element), pseudo: pseudo, property: 'content', before: a ? 'presente' : 'ausente', after: b ? 'presente' : 'ausente' }); return }
			PROPS.forEach(function (property, i) { if (a[i] !== b[i]) diffs.push({ element: describe(element), pseudo: pseudo, property: property, before: a[i], after: b[i] }) })
		})
	})
	return JSON.stringify(diffs)
})()`
}

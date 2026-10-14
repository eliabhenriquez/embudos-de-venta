#!/usr/bin/env node
// Minifica el CSS y compacta el JS de las pestañas del Custom Code de GemPages.
// Sin dependencias, como el resto de herramientas del repo.
//
//   node minify.mjs --css entrada.css salida.css
//   node minify.mjs --js  entrada.js  salida.js
//
// Lo usa `split-tabs.sh`; a mano casi nunca hace falta.
//
// ── Por qué el CSS se minifica de verdad y el JS solo se compacta ─────────────
//
// El CSS se puede minificar entero sin riesgo si se respetan cadenas, url() y
// comentarios, y si no se tocan los espacios alrededor de los operadores: en
// `calc(100% - 36px)` ese espacio es obligatorio, y en `nth-child(2n + 1)`
// también. Por eso aquí solo se recortan los espacios pegados a `{ } ; : ,`.
//
// El JS NO se minifica de verdad: se le quitan comentarios, sangrías y líneas en
// blanco, pero **se conservan los saltos de línea**. Un minificador JS de verdad
// renombra variables y quita puntos y coma apoyándose en la inserción automática
// de punto y coma, y eso es justo donde aparecen los fallos difíciles. Este
// código corre en una página que cobra: no compensa. Si algún día hace falta
// apretarlo más, se mete un minificador probado (esbuild, terser) y se verifica
// con las mismas pruebas de interacción, no se improvisa aquí.

import { readFileSync, writeFileSync } from 'node:fs'

// Junto a estos signos el espacio sobra siempre. Los operadores (`+ - * / > ~`)
// se quedan fuera a propósito: ahí el espacio puede ser significativo.
const CSS_TRIM_AROUND = new Set(['{', '}', ';', ':', ','])
const CSS_COMBINATORS = new Set(['>', '+', '~'])
const WHITESPACE = /\s/

// Delante de `:` el espacio solo sobra en una declaración (`color : red`). En un
// selector ES el combinador descendiente: `a :is(b)` no es `a:is(b)`. Aquí no se
// distingue un contexto del otro, así que ese espacio se conserva salvo que lo
// preceda algo que ya separa (otro signo o un combinador: `a > :has(b)`).
function isSpaceDroppable(previous, next) {
	if (CSS_TRIM_AROUND.has(previous)) return true
	if (next === ':') return CSS_COMBINATORS.has(previous)
	return CSS_TRIM_AROUND.has(next)
}

export function minifyCss(source) {
	let out = ''
	let pendingSpace = false
	let index = 0

	function emit(chunk) {
		if (pendingSpace) {
			const previous = out[out.length - 1]
			if (previous !== undefined && !isSpaceDroppable(previous, chunk[0])) out += ' '
			pendingSpace = false
		}
		// El punto y coma que precede al cierre de un bloque sobra
		if (chunk === '}' && out.endsWith(';')) out = out.slice(0, -1)
		out += chunk
	}

	while (index < source.length) {
		const char = source[index]

		if (char === '/' && source[index + 1] === '*') {
			const end = source.indexOf('*/', index + 2)
			index = end < 0 ? source.length : end + 2
			pendingSpace = true // un comentario separa igual que un espacio
			continue
		}

		if (char === '"' || char === "'") {
			const end = readQuoted(source, index)
			emit(source.slice(index, end))
			index = end
			continue
		}

		// url(...) va tal cual: dentro puede haber `;`, `:` y comillas
		if (/^url\(/i.test(source.slice(index, index + 4))) {
			const end = readUrl(source, index)
			emit(source.slice(index, end))
			index = end
			continue
		}

		if (WHITESPACE.test(char)) {
			pendingSpace = true
			index += 1
			continue
		}

		emit(char)
		index += 1
	}

	return out.trim()
}

export function compactJs(source) {
	assertCompactable(source)

	let out = ''
	let index = 0

	while (index < source.length) {
		const char = source[index]

		if (char === '/' && source[index + 1] === '/') {
			while (index < source.length && source[index] !== '\n') index += 1
			continue
		}

		if (char === '/' && source[index + 1] === '*') {
			const end = source.indexOf('*/', index + 2)
			index = end < 0 ? source.length : end + 2
			continue
		}

		if (char === '"' || char === "'") {
			const end = readQuoted(source, index)
			out += source.slice(index, end)
			index = end
			continue
		}

		out += char
		index += 1
	}

	return out
		.split('\n')
		.map(line => line.trim())
		.filter(Boolean)
		.join('\n')
}

// Falla en alto antes que devolver JS roto: este compactador solo entiende
// cadenas normales. Una plantilla `...` puede ocupar varias líneas y perdería su
// contenido al recortar la sangría; un literal de expresión regular puede
// contener `//` o `/*` y lo confundiría con un comentario.
function assertCompactable(source) {
	const withoutStrings = stripQuoted(source)
	if (withoutStrings.includes('`')) {
		throw new Error('el JS usa plantillas `...`: este compactador no las entiende. Pásalo a comillas o usa un minificador probado.')
	}
	const regexLiteral = /(^|[(,=:[!&|?{};]|\breturn\b)\s*\//
	if (regexLiteral.test(withoutStrings.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, ''))) {
		throw new Error('el JS parece tener un literal de expresión regular: este compactador no los distingue de un comentario. Sácalo a una constante o usa un minificador probado.')
	}
}

// Deja el esqueleto del código sin el contenido de las cadenas, para poder
// buscar en él sin que un texto entre comillas dé un falso positivo.
function stripQuoted(source) {
	let out = ''
	let index = 0
	while (index < source.length) {
		const char = source[index]
		if (char === '"' || char === "'") {
			const end = readQuoted(source, index)
			out += char + char
			index = end
			continue
		}
		out += char
		index += 1
	}
	return out
}

// Devuelve el índice SIGUIENTE a la comilla de cierre
function readQuoted(source, start) {
	const quote = source[start]
	let index = start + 1
	while (index < source.length) {
		if (source[index] === '\\') { index += 2; continue }
		if (source[index] === quote) return index + 1
		index += 1
	}
	return source.length
}

// Devuelve el índice SIGUIENTE al paréntesis que cierra un url(...)
function readUrl(source, start) {
	let index = start + 4
	while (index < source.length) {
		const char = source[index]
		if (char === '"' || char === "'") { index = readQuoted(source, index); continue }
		if (char === ')') return index + 1
		index += 1
	}
	return source.length
}

const [mode, input, output] = process.argv.slice(2)
if (mode === '--css' || mode === '--js') {
	if (!input || !output) {
		console.error('uso: node minify.mjs --css|--js <entrada> <salida>')
		process.exit(2)
	}
	const source = readFileSync(input, 'utf8')
	const result = mode === '--css' ? minifyCss(source) : compactJs(source)
	writeFileSync(output, result + '\n')
	const saved = Math.round((1 - (result.length + 1) / source.length) * 100)
	console.log(`${output}  ${source.length} → ${result.length + 1} bytes (−${saved}%)`)
}

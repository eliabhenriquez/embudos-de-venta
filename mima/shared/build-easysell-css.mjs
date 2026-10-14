#!/usr/bin/env node
// Compila la skin de EasySell para que quepa en el campo de CSS personalizado
// de la app, que admite 5.000 caracteres. Sin dependencias.
//
//   node mima/shared/build-easysell-css.mjs
//
// Lee  mima/shared/easysell-form.css      (fuente, con tokens y comentarios)
// Deja mima/shared/easysell-form.min.css  (lo que se pega en la app)
//
// Sale con error, sin escribir nada, si el resultado pasa del límite.
//
// ── Qué hace además de minificar ──────────────────────────────────────────────
//
// 1. Sustituye los tokens por su valor. `var(--mima-border)` ocupa 18 caracteres
//    y `#ded0dc`, 7. La fuente conserva los tokens para que la paleta tenga un
//    solo sitio; el compilado no puede permitírselo.
// 2. Acorta a una letra las variables que sí cambian en tiempo de ejecución (las
//    del botón, la del banner), que no se pueden sustituir.
// 3. Quita los espacios de los combinadores (`a > b` → `a>b`) solo en los
//    selectores. En los valores no se toca: `calc(100% - 36px)` los necesita.

import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { minifyCss } from '../../minify.mjs'

const MAX_CHARS = 5000
const TOKEN_PREFIX = '--mima-'
// Variables que lee el CSS de EasySell: su nombre no es nuestro, no se acorta
const APP_VARIABLE_PREFIX = '--es-'

const here = dirname(fileURLToPath(import.meta.url))
const SOURCE = join(here, 'easysell-form.css')
const OUTPUT = join(here, 'easysell-form.min.css')

function fail(message) {
	console.error(`build-easysell-css: ${message}`)
	process.exit(1)
}

// El bloque de tokens es la primera regla cuyas declaraciones son todas tokens
function extractTokens(css) {
	const block = /[^{}]*\{((?:\s*--mima-[\w-]+\s*:[^;{}]+;)+)\s*\}/.exec(css)
	if (!block) fail('no encuentro el bloque de tokens (--mima-*) en la fuente')

	const tokens = new Map()
	for (const [, name, value] of block[1].matchAll(/(--mima-[\w-]+)\s*:\s*([^;]+);/g)) tokens.set(name, value.trim())

	return { tokens, rest: css.replace(block[0], '') }
}

function inlineTokens(css, tokens) {
	const inlined = css.replace(/var\((--mima-[\w-]+)\)/g, (match, name) => {
		if (!tokens.has(name)) fail(`se usa ${name} y no está en el bloque de tokens`)
		return tokens.get(name)
	})

	if (inlined.includes(TOKEN_PREFIX)) fail('queda algún token sin sustituir')
	return inlined
}

// Las variables que sobreviven se renombran a, b, c… por orden de aparición
function shortenVariables(css) {
	const names = [...new Set(css.match(/--[a-z][\w-]*/g) || [])].filter(name => !name.startsWith(APP_VARIABLE_PREFIX))
	if (names.length > 26) fail('más de 26 variables: amplía el esquema de nombres')

	return names.reduce((out, name, index) => {
		const short = `--${String.fromCharCode(97 + index)}`
		return out.replace(new RegExp(`${name}(?![\\w-])`, 'g'), short)
	}, css)
}

function tightenSelectors(css) {
	return css.replace(/(^|\})([^{}]+)\{/g, (match, open, selector) => `${open}${selector.replace(/\s*([>+~])\s*/g, '$1')}{`)
}

const source = readFileSync(SOURCE, 'utf8')
const withoutComments = source.replace(/\/\*[\s\S]*?\*\//g, '')
if (/@(media|supports|import|font-face|keyframes)/.test(withoutComments)) fail('la fuente usa una regla @: este compilador solo entiende reglas planas')

const { tokens, rest } = extractTokens(withoutComments)
const compiled = tightenSelectors(minifyCss(shortenVariables(inlineTokens(rest, tokens)))).replace(/ !important/g, '!important')

const used = compiled.length
const left = MAX_CHARS - used
if (left < 0) fail(`${used} caracteres: sobran ${-left}. No se ha escrito nada.`)

writeFileSync(OUTPUT, `${compiled}\n`)
console.log(`easysell-form.min.css → ${used} de ${MAX_CHARS} caracteres (quedan ${left})`)

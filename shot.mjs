#!/usr/bin/env node
// Captura una landing con un móvil EMULADO de verdad y devuelve medidas.
//
// Chrome headless no baja de ~500px de ventana: una captura "a 390" hecha
// con --window-size sale recortada de un layout más ancho y miente. Este
// script habla con Chrome por el protocolo de DevTools (Node 22 trae
// WebSocket y fetch) y fija el viewport con Emulation.setDeviceMetricsOverride.
// Sin dependencias.
//
//   ./preview.sh eterma/landings/clorofull/olor/september.html
//   node shot.mjs --url=file://$PWD/eterma/landings/clorofull/olor/september.preview.html \
//       --width=390 --out=/tmp/m390.png --full
//
// Opciones:
//   --width=390 --height=844 --dpr=1   viewport emulado (mobile: true)
//   --full                             página completa (alto = scrollHeight)
//   --scroll=700                       hace scroll antes de capturar (viewport)
//   --wait=2500                        espera extra tras cargar (animaciones)
//   --hover='.cf-hero .cf-cta'         pone el ratón sobre ese elemento (:hover)
//   --probe=expr.js                    evalúa un fichero JS en la página y
//                                      escribe el resultado como JSON en stdout
//   --out=captura.png                  destino; sin --out solo se evalúa --probe
//
// Las imágenes del CDN que aún no estén subidas salen rotas: para revisar en
// local, reescribe la base del CDN al assets/ del producto con sed antes de
// capturar (ver eterma/landings/clorofull/AGENTS.md §8).

import { spawn } from 'node:child_process'
import { writeFileSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
const args = Object.fromEntries(process.argv.slice(2).map(a => { const [k, ...v] = a.replace(/^--/, '').split('='); return [k, v.join('=') || true] }))
const port = 9333 + Math.floor(Math.random() * 500)
const profile = `${tmpdir()}/shot-mjs-${port}`
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', ['--headless=new', '--disable-gpu', '--no-first-run', '--hide-scrollbars', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' })
const sleep = ms => new Promise(r => setTimeout(r, ms))
let targets
for (let i = 0; i < 40; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.length) break } catch {} await sleep(250) }
const page = targets.find(t => t.type === 'page')
const ws = new WebSocket(page.webSocketDebuggerUrl)
await new Promise(r => { ws.onopen = r })
let id = 0; const pending = new Map(); let loaded = () => {}
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id) } else if (m.method === 'Page.loadEventFired') loaded() }
const send = (method, params = {}) => new Promise(res => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })) })
const evaluate = async expr => (await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })).result.result.value
const width = +args.width, height = +(args.height || 844), dpr = +(args.dpr || 1)
await send('Page.enable')
await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: dpr, mobile: true })
const loadP = new Promise(r => { loaded = r })
await send('Page.navigate', { url: args.url })
await loadP
await sleep(600)
let scrollY = 0
if (args.scroll) {
	// Nunca más allá del final: el clip de la captura se sale del documento
	scrollY = await evaluate(`Math.min(${+args.scroll}, document.documentElement.scrollHeight - innerHeight)`)
	await evaluate(`window.scrollTo(0, ${scrollY}); true`)
	await sleep(800)
}
if (args.wait) await sleep(+args.wait)
if (args.hover) {
	// Mueve el ratón al centro del elemento para capturar su estado :hover
	const box = await evaluate(`(() => { const r = document.querySelector(${JSON.stringify(args.hover)}).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 } })()`)
	await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: box.x, y: box.y })
	await sleep(500)
}
if (args.probe) console.log(JSON.stringify(await evaluate(readFileSync(args.probe, 'utf8'))))
if (args.out) {
	let clipH = height
	if (args.full) { clipH = await evaluate('document.documentElement.scrollHeight'); await send('Emulation.setDeviceMetricsOverride', { width, height: clipH, deviceScaleFactor: dpr, mobile: true }); await sleep(400) }
	const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: 0, y: args.full ? 0 : scrollY, width, height: clipH, scale: 1 } })
	writeFileSync(args.out, Buffer.from(shot.result.data, 'base64'))
	console.log('shot', args.out, width + 'x' + clipH)
}
ws.close(); chrome.kill()
await sleep(300)
rmSync(profile, { recursive: true, force: true })

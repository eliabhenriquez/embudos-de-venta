;(function () {
'use strict'
var ROOT_SELECTOR = '.gc-lp'
var READY_FLAG = 'gcLandingReady'
var PRODUCT_HANDLE = 'kit-glucosa-en-calma'
var RELEASIT_PRODUCT_CACHE_ID = 'rsi-cod-form-product-cache'
var STICKY_REVEAL_MARGIN = '-40% 0px 0px 0px'
var TURN_MS = 4200
var HOLD_LABEL = 'Pausar las fotos'
var PLAY_LABEL = 'Pasar las fotos'
function forEach(list, callback) {
Array.prototype.forEach.call(list, callback)
}
function prefersReducedMotion() {
return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
function hasObserver() {
return typeof window.IntersectionObserver === 'function'
}
function initPlayback(root) {
var targets = root.querySelectorAll('[data-gc-marquee], .gc-swing, .gc-cta')
if (!targets.length) return
if (!hasObserver()) {
forEach(targets, function (target) { target.classList.add('is-playing') })
return
}
var observer = new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
entry.target.classList.toggle('is-playing', entry.isIntersecting)
})
}, { rootMargin: '40px 0px' })
forEach(targets, function (target) { observer.observe(target) })
}
function initPeopleHold(root) {
var track = root.querySelector('.gc-people__track')
if (!track) return
function hold() { track.classList.add('is-held') }
function release() { track.classList.remove('is-held') }
track.addEventListener('pointerdown', hold)
track.addEventListener('pointerup', release)
track.addEventListener('pointercancel', release)
track.addEventListener('pointerleave', release)
}
function initTurn(root) {
var turn = root.querySelector('[data-gc-turn]')
if (!turn) return
var frames = turn.querySelectorAll('[data-gc-frame]')
var total = frames.length
if (total < 2) return
var bar = turn.querySelector('[data-gc-turn-bar]')
var hold = turn.querySelector('[data-gc-turn-hold]')
var ticks = turn.querySelectorAll('.gc-turn__ticks i')
var live = turn.querySelector('[data-gc-turn-live]')
var active = 0
var held = prefersReducedMotion()
var offscreen = false
var timer = null
function paint() {
forEach(frames, function (frame, index) {
var isActive = index === active
frame.classList.toggle('is-active', isActive)
frame.setAttribute('aria-hidden', isActive ? 'false' : 'true')
})
forEach(ticks, function (tick, index) {
tick.classList.toggle('is-on', index === active)
})
if (live) {
var title = frames[active].querySelector('.gc-frame__title')
live.textContent = title ? title.textContent : ''
}
}
function stop() {
if (!timer) return
window.clearInterval(timer)
timer = null
}
function start() {
stop()
if (held || offscreen) return
timer = window.setInterval(function () {
active = (active + 1) % total
paint()
}, TURN_MS)
}
function setHeld(next) {
held = next
if (hold) {
hold.classList.toggle('is-held', held)
hold.setAttribute('aria-label', held ? PLAY_LABEL : HOLD_LABEL)
}
start()
}
if (hold) hold.addEventListener('click', function () { setHeld(!held) })
turn.addEventListener('click', function (event) {
if (hold && hold.contains(event.target)) return
setHeld(!held)
})
if (hasObserver()) {
new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) { offscreen = !entry.isIntersecting })
start()
}).observe(turn)
}
turn.classList.add('is-stacked')
if (bar) bar.hidden = false
if (hold && held) hold.classList.add('is-held')
paint()
start()
}
function initReveal(root) {
var blocks = root.querySelectorAll('[data-gc-reveal]')
if (!blocks.length || !hasObserver()) return
var observer = new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (!entry.isIntersecting) return
entry.target.classList.add('is-inview')
observer.unobserve(entry.target)
})
}, { threshold: 0.2 })
forEach(blocks, function (block) {
block.classList.add('is-armed')
observer.observe(block)
})
}
function initSticky(root) {
var sticky = root.querySelector('[data-gc-sticky]')
var heroCta = root.querySelector('.gc-hero .gc-cta')
if (!sticky || !heroCta) return
sticky.hidden = false
if (!hasObserver()) {
sticky.classList.add('is-visible')
return
}
var heroVisible = false
var tailVisible = false
var tail = root.querySelectorAll('.gc-close__buy, .gc-social, .gc-footer')
function update() {
sticky.classList.toggle('is-visible', !heroVisible && !tailVisible)
}
new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) { heroVisible = entry.isIntersecting })
update()
}, { rootMargin: STICKY_REVEAL_MARGIN }).observe(heroCta)
var tailObserver = new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
entry.target.setAttribute('data-gc-tail-visible', entry.isIntersecting ? 'true' : 'false')
})
tailVisible = Array.prototype.some.call(tail, function (element) {
return element.getAttribute('data-gc-tail-visible') === 'true'
})
update()
})
forEach(tail, function (element) { tailObserver.observe(element) })
}
function readProductCache(cache) {
try {
return JSON.parse(cache.textContent)
} catch (error) {
return null
}
}
function initReleasitProductCache() {
var cache = document.getElementById(RELEASIT_PRODUCT_CACHE_ID)
if (cache && readProductCache(cache)) return
if (typeof window.fetch !== 'function') return
if (!cache) {
cache = document.createElement('script')
cache.type = 'application/json'
cache.id = RELEASIT_PRODUCT_CACHE_ID
document.body.appendChild(cache)
}
var routes = window.Shopify && window.Shopify.routes
var rootPath = (routes && routes.root) || '/'
window.fetch(rootPath + 'products/' + PRODUCT_HANDLE + '.js', { credentials: 'same-origin' })
.then(function (response) {
if (!response.ok) throw new Error('product ' + response.status)
return response.json()
})
.then(function (product) {
cache.textContent = JSON.stringify(product)
})
.catch(function () {})
}
function init() {
var root = document.querySelector(ROOT_SELECTOR)
if (!root || root.dataset[READY_FLAG] === 'true') return
root.dataset[READY_FLAG] = 'true'
initReleasitProductCache()
initPlayback(root)
initPeopleHold(root)
initTurn(root)
initReveal(root)
initSticky(root)
}
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', init)
} else {
init()
}
})()

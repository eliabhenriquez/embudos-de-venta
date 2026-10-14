;(function () {
'use strict'
var ROOT_SELECTOR = '.df-lp'
var READY_FLAG = 'dfLandingReady'
var PRODUCT_HANDLE = 'kit-duerme-y-florece'
var RELEASIT_PRODUCT_CACHE_ID = 'rsi-cod-form-product-cache'
var STICKY_REVEAL_MARGIN = '-40% 0px 0px 0px'
var SWITCH_OFF_LABEL = 'Apagar el día'
var SWITCH_ON_LABEL = 'Volver a encender'
function forEach(list, callback) {
Array.prototype.forEach.call(list, callback)
}
function hasObserver() {
return typeof window.IntersectionObserver === 'function'
}
function initPlayback(root) {
var targets = root.querySelectorAll('[data-df-marquee], .df-glow, .df-cta')
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
var track = root.querySelector('.df-people__track')
if (!track) return
function hold() { track.classList.add('is-held') }
function release() { track.classList.remove('is-held') }
track.addEventListener('pointerdown', hold)
track.addEventListener('pointerup', release)
track.addEventListener('pointercancel', release)
track.addEventListener('pointerleave', release)
}
function initSwitch(root) {
var button = root.querySelector('[data-df-switch]')
var hero = root.querySelector('[data-df-hero]')
var label = root.querySelector('[data-df-switch-label]')
if (!button || !hero) return
function apply(isNight) {
var text = isNight ? SWITCH_ON_LABEL : SWITCH_OFF_LABEL
button.setAttribute('aria-pressed', isNight ? 'true' : 'false')
hero.classList.toggle('is-night', isNight)
button.setAttribute('aria-label', text)
if (label) label.textContent = text
}
button.addEventListener('click', function () {
apply(button.getAttribute('aria-pressed') !== 'true')
})
apply(false)
button.hidden = false
}
function initReveal(root) {
var blocks = root.querySelectorAll('[data-df-reveal]')
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
var sticky = root.querySelector('[data-df-sticky]')
var heroCta = root.querySelector('.df-hero .df-cta')
if (!sticky || !heroCta) return
sticky.hidden = false
if (!hasObserver()) {
sticky.classList.add('is-visible')
return
}
var heroVisible = false
var tailVisible = false
var tail = root.querySelectorAll('.df-close__buy, .df-social, .df-footer')
function update() {
sticky.classList.toggle('is-visible', !heroVisible && !tailVisible)
}
new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) { heroVisible = entry.isIntersecting })
update()
}, { rootMargin: STICKY_REVEAL_MARGIN }).observe(heroCta)
var tailObserver = new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
entry.target.setAttribute('data-df-tail-visible', entry.isIntersecting ? 'true' : 'false')
})
tailVisible = Array.prototype.some.call(tail, function (element) {
return element.getAttribute('data-df-tail-visible') === 'true'
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
initSwitch(root)
initReveal(root)
initSticky(root)
}
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', init)
} else {
init()
}
})()

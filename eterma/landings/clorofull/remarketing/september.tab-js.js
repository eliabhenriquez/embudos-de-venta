;(function () {
'use strict'
var ROOT_SELECTOR = '.cr-lp'
var READY_FLAG = 'crLandingReady'
var PRODUCT_HANDLE = 'clorofull-remarketing'
var RELEASIT_PRODUCT_CACHE_ID = 'rsi-cod-form-product-cache'
var SKIN_PAY_ATTRIBUTE = 'data-cf-pay'
var PAY_CHOICES = ['prepaid', 'cod']
var STICKY_REVEAL_MARGIN = '-40% 0px 0px 0px'
var DROP_THRESHOLD = 0.6
var STORY_SCROLL_SETTLE_MS = 140
function forEach(list, callback) {
Array.prototype.forEach.call(list, callback)
}
function hasObserver() {
return typeof window.IntersectionObserver === 'function'
}
function prefersReducedMotion() {
return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
function initPlayback(root) {
var targets = root.querySelectorAll('[data-cr-rotator], .cr-cta')
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
function initDrops(root) {
var tickets = root.querySelectorAll('[data-cr-drop]')
if (!tickets.length || !hasObserver() || prefersReducedMotion()) return
var observer = new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (!entry.isIntersecting) return
entry.target.classList.add('is-dropped')
observer.unobserve(entry.target)
})
}, { threshold: DROP_THRESHOLD })
forEach(tickets, function (ticket) {
ticket.classList.add('is-armed')
observer.observe(ticket)
})
}
function initStories(root) {
var host = root.querySelector('[data-cr-stories]')
if (!host) return
var rail = host.querySelector('[data-cr-stories-rail]')
var slides = host.querySelectorAll('[data-cr-story]')
var bars = host.querySelectorAll('[data-cr-story-bar]')
var barsWrap = host.querySelector('[data-cr-stories-bars]')
var nav = host.querySelector('[data-cr-stories-nav]')
var prev = host.querySelector('[data-cr-stories-prev]')
var next = host.querySelector('[data-cr-stories-next]')
var total = slides.length
if (!rail || total < 2 || bars.length !== total) return
var current = 0
var inView = false
var held = false
var settleTimer = null
function paint() {
forEach(bars, function (bar, index) {
bar.classList.remove('is-active')
bar.classList.toggle('is-done', index < current)
})
void barsWrap.offsetWidth
bars[current].classList.add('is-active')
}
function syncPause() {
host.classList.toggle('is-paused', !inView || held)
}
function goTo(index) {
current = (index + total) % total
rail.scrollTo({ left: slides[current].offsetLeft, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
paint()
}
barsWrap.addEventListener('animationend', function (event) {
if (event.target.parentNode !== bars[current]) return
goTo(current + 1)
})
if (prev) prev.addEventListener('click', function () { goTo(current - 1) })
if (next) next.addEventListener('click', function () { goTo(current + 1) })
rail.addEventListener('scroll', function () {
window.clearTimeout(settleTimer)
settleTimer = window.setTimeout(function () {
var index = Math.round(rail.scrollLeft / rail.clientWidth)
if (index === current || index < 0 || index >= total) return
current = index
paint()
}, STORY_SCROLL_SETTLE_MS)
})
function hold() { held = true; syncPause() }
function release() { held = false; syncPause() }
rail.addEventListener('pointerdown', hold)
rail.addEventListener('pointerup', release)
rail.addEventListener('pointercancel', release)
rail.addEventListener('pointerleave', release)
if (hasObserver()) {
new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) { inView = entry.isIntersecting })
syncPause()
}, { threshold: 0.35 }).observe(host)
} else {
inView = true
}
barsWrap.hidden = false
if (nav) nav.hidden = false
syncPause()
paint()
}
function initReveal(root) {
var blocks = root.querySelectorAll('[data-cr-reveal]')
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
function initPaymentChoice(root) {
forEach(root.querySelectorAll('.cr-cta'), function (button) {
button.addEventListener('click', function () {
var choice = button.getAttribute('data-cr-pay-choice')
if (PAY_CHOICES.indexOf(choice) === -1) {
document.documentElement.removeAttribute(SKIN_PAY_ATTRIBUTE)
return
}
document.documentElement.setAttribute(SKIN_PAY_ATTRIBUTE, choice)
})
})
}
function initSticky(root) {
var sticky = root.querySelector('[data-cr-sticky]')
var heroCta = root.querySelector('.cr-hero .cr-cta')
if (!sticky || !heroCta) return
sticky.hidden = false
if (!hasObserver()) {
sticky.classList.add('is-visible')
return
}
var heroVisible = false
var tailVisible = false
var tail = root.querySelectorAll('.cr-close__buy, .cr-social, .cr-footer')
function update() {
sticky.classList.toggle('is-visible', !heroVisible && !tailVisible)
}
new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) { heroVisible = entry.isIntersecting })
update()
}, { rootMargin: STICKY_REVEAL_MARGIN }).observe(heroCta)
var tailObserver = new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
entry.target.setAttribute('data-cr-tail-visible', entry.isIntersecting ? 'true' : 'false')
})
tailVisible = Array.prototype.some.call(tail, function (element) {
return element.getAttribute('data-cr-tail-visible') === 'true'
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
initDrops(root)
initStories(root)
initReveal(root)
initPaymentChoice(root)
initSticky(root)
}
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', init)
} else {
init()
}
})()

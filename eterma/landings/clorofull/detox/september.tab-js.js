;(function () {
'use strict'
var ROOT_SELECTOR = '.cd-lp'
var READY_FLAG = 'cdLandingReady'
var PRODUCT_HANDLE = 'clorofull-1'
var RELEASIT_PRODUCT_CACHE_ID = 'rsi-cod-form-product-cache'
var SKIN_PAY_ATTRIBUTE = 'data-cf-pay'
var PAY_CHOICES = ['prepaid', 'cod']
var STICKY_REVEAL_MARGIN = '-40% 0px 0px 0px'
var STICKY_TAIL_SELECTOR = '.cd-close__buy, .cd-social, .cd-footer'
var REVEAL_THRESHOLD = 0.2
var DOT_CLASS = 'cd-mando__dot'
var DOT_LABEL_ATTRIBUTE = 'data-cd-carousel-label'
var DEFAULT_DOT_LABEL = 'Ir a la tarjeta '
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
var targets = root.querySelectorAll('.cd-cta')
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
function initReveal(root) {
var blocks = root.querySelectorAll('[data-cd-reveal], [data-cd-play]')
if (!blocks.length || !hasObserver()) return
var observer = new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (!entry.isIntersecting) return
entry.target.classList.add('is-inview')
observer.unobserve(entry.target)
})
}, { threshold: REVEAL_THRESHOLD })
forEach(blocks, function (block) {
block.classList.add('is-armed')
observer.observe(block)
})
}
function initCarousel(host) {
var rail = host.querySelector('[data-cd-carousel-rail]')
var slides = host.querySelectorAll('[data-cd-slide]')
var nav = host.querySelector('[data-cd-carousel-nav]')
var dotsWrap = host.querySelector('[data-cd-carousel-dots]')
var prev = host.querySelector('[data-cd-carousel-prev]')
var next = host.querySelector('[data-cd-carousel-next]')
var dotLabel = host.getAttribute(DOT_LABEL_ATTRIBUTE) || DEFAULT_DOT_LABEL
var total = slides.length
if (!rail || total < 2 || !nav || !dotsWrap) return
var current = 0
var dots = []
var frame = null
function targetOf(index) {
return slides[index].offsetLeft - slides[0].offsetLeft
}
function nearestIndex() {
var best = 0
var bestDistance = Infinity
forEach(slides, function (slide, index) {
var distance = Math.abs(targetOf(index) - rail.scrollLeft)
if (distance >= bestDistance) return
best = index
bestDistance = distance
})
return best
}
function paint() {
dots.forEach(function (dot, index) {
if (index === current) {
dot.setAttribute('aria-current', 'true')
return
}
dot.removeAttribute('aria-current')
})
if (prev) prev.disabled = current === 0
if (next) next.disabled = current === total - 1
}
function goTo(index) {
var clamped = Math.max(0, Math.min(total - 1, index))
rail.scrollTo({ left: targetOf(clamped), behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
forEach(slides, function (slide, index) {
var item = document.createElement('li')
var dot = document.createElement('button')
dot.type = 'button'
dot.className = DOT_CLASS
dot.setAttribute('aria-label', dotLabel + (index + 1))
dot.addEventListener('click', function () { goTo(index) })
item.appendChild(dot)
dotsWrap.appendChild(item)
dots.push(dot)
})
if (prev) prev.addEventListener('click', function () { goTo(current - 1) })
if (next) next.addEventListener('click', function () { goTo(current + 1) })
rail.addEventListener('scroll', function () {
if (frame) return
frame = window.requestAnimationFrame(function () {
frame = null
var index = nearestIndex()
if (index === current) return
current = index
paint()
})
}, { passive: true })
nav.hidden = false
paint()
}
function initCarousels(root) {
forEach(root.querySelectorAll('[data-cd-carousel]'), initCarousel)
}
function initPaymentChoice(root) {
forEach(root.querySelectorAll('.cd-cta'), function (button) {
button.addEventListener('click', function () {
var choice = button.getAttribute('data-cd-pay-choice')
if (PAY_CHOICES.indexOf(choice) === -1) {
document.documentElement.removeAttribute(SKIN_PAY_ATTRIBUTE)
return
}
document.documentElement.setAttribute(SKIN_PAY_ATTRIBUTE, choice)
})
})
}
function initSticky(root) {
var sticky = root.querySelector('[data-cd-sticky]')
var heroCta = root.querySelector('.cd-hero .cd-cta')
if (!sticky || !heroCta) return
sticky.hidden = false
if (!hasObserver()) {
sticky.classList.add('is-visible')
return
}
var heroVisible = false
var tailVisible = false
var tail = root.querySelectorAll(STICKY_TAIL_SELECTOR)
function update() {
sticky.classList.toggle('is-visible', !heroVisible && !tailVisible)
}
new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) { heroVisible = entry.isIntersecting })
update()
}, { rootMargin: STICKY_REVEAL_MARGIN }).observe(heroCta)
var tailObserver = new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
entry.target.setAttribute('data-cd-tail-visible', entry.isIntersecting ? 'true' : 'false')
})
tailVisible = Array.prototype.some.call(tail, function (element) {
return element.getAttribute('data-cd-tail-visible') === 'true'
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
initReveal(root)
initCarousels(root)
initPaymentChoice(root)
initSticky(root)
}
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', init)
} else {
init()
}
})()

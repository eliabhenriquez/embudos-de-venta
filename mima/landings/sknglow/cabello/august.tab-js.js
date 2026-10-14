;(function () {
'use strict'
var ROOT_SELECTOR = '.sg-lp'
var READY_FLAG = 'sgLandingReady'
var PREPAID_ENABLED = false
var PRICES = {
prepaid: '$69.900',
cod: '$79.900'
}
var CTA_LABELS = {
prepaid: 'QUIERO MI SKNGLOW POR $69.900',
cod: 'QUIERO MI SKNGLOW CONTRAENTREGA'
}
var CTA_LABEL_FALLBACK = 'ELEGIR MI FORMA DE PAGO'
var CAROUSEL_CLASS = 'is-carousel'
function initPaymentSelector(root) {
var inputs = root.querySelectorAll('input[name="sg-payment"]')
if (!inputs.length) return
var stickyPrice = root.querySelector('[data-sg-sticky-price]')
var priceCta = root.querySelector('[data-sg-cta-price]')
function sync() {
var selected = root.querySelector('input[name="sg-payment"]:checked')
var choice = selected ? selected.value : 'prepaid'
document.documentElement.setAttribute('data-sg-pay', choice)
var mode = choice
if (!PREPAID_ENABLED) mode = 'cod'
if (stickyPrice) stickyPrice.textContent = PRICES[mode] || PRICES.cod
if (priceCta) {
priceCta.textContent = PREPAID_ENABLED
? (CTA_LABELS[mode] || CTA_LABELS.prepaid)
: CTA_LABEL_FALLBACK
}
}
Array.prototype.forEach.call(inputs, function (input) {
input.addEventListener('change', sync)
})
sync()
}
function initHeroSlider(root) {
var slider = root.querySelector('[data-sg-slider]')
if (!slider) return
var track = slider.querySelector('[data-sg-slider-track]')
var dots = slider.querySelectorAll('[data-sg-dot]')
if (!track || !dots.length) return
var slides = track.querySelectorAll('.sg-slider__slide')
if (slides.length !== dots.length) return
var current = -1
function paint(index) {
if (index === current) return
current = index
Array.prototype.forEach.call(dots, function (dot, i) {
var active = i === index
dot.classList.toggle('is-active', active)
if (active) dot.setAttribute('aria-current', 'true')
else dot.removeAttribute('aria-current')
})
}
function readIndex() {
var width = track.clientWidth
if (!width) return
paint(Math.round(track.scrollLeft / width))
}
var ticking = false
track.addEventListener('scroll', function () {
if (ticking) return
ticking = true
window.requestAnimationFrame(function () {
ticking = false
readIndex()
})
}, { passive: true })
Array.prototype.forEach.call(dots, function (dot) {
dot.addEventListener('click', function () {
var i = parseInt(dot.getAttribute('data-sg-dot'), 10)
if (isNaN(i)) return
track.scrollTo({ left: track.clientWidth * i, behavior: 'smooth' })
})
})
if (typeof window.ResizeObserver === 'function') {
var last = track.clientWidth
new window.ResizeObserver(function () {
if (track.clientWidth === last) return
var i = current < 0 ? 0 : current
last = track.clientWidth
track.scrollLeft = last * i
}).observe(track)
}
readIndex()
paint(current < 0 ? 0 : current)
}
function initStickyCta(root) {
var sticky = root.querySelector('[data-sg-sticky]')
var hero = root.querySelector('.sg-hero')
if (!sticky || !hero) return
sticky.hidden = false
if (typeof window.IntersectionObserver !== 'function') {
sticky.classList.add('is-visible')
return
}
var heroVisible = true
var tailVisible = false
function update() {
sticky.classList.toggle('is-visible', !heroVisible && !tailVisible)
}
var heroObserver = new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
heroVisible = entry.isIntersecting
})
update()
}, { rootMargin: '-120px 0px 0px 0px' })
heroObserver.observe(hero)
var tail = root.querySelectorAll('.sg-close .sg-cta-row, .sg-footer')
if (!tail.length) return
var tailObserver = new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
entry.target.dataset.sgTailVisible = entry.isIntersecting ? 'true' : 'false'
})
tailVisible = Array.prototype.some.call(tail, function (el) {
return el.dataset.sgTailVisible === 'true'
})
update()
})
Array.prototype.forEach.call(tail, function (el) {
tailObserver.observe(el)
})
}
function initStories(root) {
var stories = root.querySelector('[data-sg-stories]')
if (!stories) return
var track = stories.querySelector('[data-sg-stories-track]')
var nav = stories.querySelector('[data-sg-stories-nav]')
var prev = stories.querySelector('[data-sg-stories-prev]')
var next = stories.querySelector('[data-sg-stories-next]')
var dots = stories.querySelectorAll('[data-sg-stories-dot]')
if (!track || !nav || track.children.length < 2) return
var items = track.children
var current = 0
function maxScroll() {
return track.scrollWidth - track.clientWidth
}
function targetOf(index) {
return Math.min(maxScroll(), items[index].offsetLeft - items[0].offsetLeft)
}
function paint() {
if (prev) prev.disabled = current === 0
if (next) next.disabled = current === items.length - 1
Array.prototype.forEach.call(dots, function (dot, index) {
if (index === current) dot.setAttribute('aria-current', 'true')
else dot.removeAttribute('aria-current')
})
}
function readIndex() {
var best = 0
Array.prototype.forEach.call(items, function (item, index) {
if (Math.abs(targetOf(index) - track.scrollLeft) < Math.abs(targetOf(best) - track.scrollLeft)) best = index
})
current = best
paint()
}
function go(index) {
var target = Math.max(0, Math.min(items.length - 1, index))
track.scrollTo({ left: targetOf(target), behavior: (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) ? 'auto' : 'smooth' })
}
function sync() {
nav.hidden = maxScroll() < 2
readIndex()
}
var ticking = false
track.addEventListener('scroll', function () {
if (ticking) return
ticking = true
window.requestAnimationFrame(function () {
ticking = false
readIndex()
})
}, { passive: true })
if (prev) prev.addEventListener('click', function () { go(current - 1) })
if (next) next.addEventListener('click', function () { go(current + 1) })
Array.prototype.forEach.call(dots, function (dot, index) {
dot.addEventListener('click', function () { go(index) })
})
window.addEventListener('resize', sync, { passive: true })
stories.classList.add(CAROUSEL_CLASS)
sync()
}
function init() {
var root = document.querySelector(ROOT_SELECTOR)
if (!root || root.dataset[READY_FLAG] === 'true') return
root.dataset[READY_FLAG] = 'true'
initPaymentSelector(root)
initHeroSlider(root)
initStories(root)
initStickyCta(root)
}
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', init)
} else {
init()
}
})()

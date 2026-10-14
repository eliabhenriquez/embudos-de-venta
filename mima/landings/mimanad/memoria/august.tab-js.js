;(function () {
'use strict'
var ROOT_SELECTOR = '.mn-lp'
var READY_FLAG = 'mnLandingReady'
var PREPAID_ENABLED = false
var PRICES = {
prepaid: '$69.900',
cod: '$79.900'
}
var CTA_LABELS = {
prepaid: 'QUIERO MI MIMANAD POR $69.900',
cod: 'QUIERO MI MIMANAD CONTRAENTREGA'
}
var CTA_LABEL_FALLBACK = 'ELEGIR MI FORMA DE PAGO'
var PAY_ATTRIBUTE = 'data-sg-pay'
var LIVE_CLASS = 'is-live'
var CAROUSEL_CLASS = 'is-carousel'
var HELD_CLASS = 'is-held'
var ACTIVE_CLASS = 'is-active'
var ARMED_CLASS = 'is-armed'
var REVEALED_CLASS = 'is-in'
var WALL_RESUME_DELAY = 1200
function forEach(list, fn) {
Array.prototype.forEach.call(list, fn)
}
function prefersReducedMotion() {
return typeof window.matchMedia === 'function'
&& window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
function hasObserver() {
return typeof window.IntersectionObserver === 'function'
}
function initPaymentSelector(root) {
var inputs = root.querySelectorAll('input[name="mn-payment"]')
if (!inputs.length) return
var stickyPrice = root.querySelector('[data-mn-sticky-price]')
var priceCta = root.querySelector('[data-mn-cta-price]')
function sync() {
var selected = root.querySelector('input[name="mn-payment"]:checked')
var choice = selected ? selected.value : 'prepaid'
document.documentElement.setAttribute(PAY_ATTRIBUTE, choice)
var mode = PREPAID_ENABLED ? choice : 'cod'
if (stickyPrice) stickyPrice.textContent = PRICES[mode] || PRICES.cod
if (priceCta) {
priceCta.textContent = PREPAID_ENABLED
? (CTA_LABELS[mode] || CTA_LABELS.prepaid)
: CTA_LABEL_FALLBACK
}
}
forEach(inputs, function (input) {
input.addEventListener('change', sync)
})
sync()
}
function initHeroSlider(root) {
var slider = root.querySelector('[data-mn-slider]')
if (!slider) return
var track = slider.querySelector('[data-mn-slider-track]')
var prev = slider.querySelector('[data-mn-slider-prev]')
var next = slider.querySelector('[data-mn-slider-next]')
var count = slider.querySelector('[data-mn-slider-count]')
if (!track) return
var total = track.children.length
var current = 0
function paint() {
if (count) count.textContent = 'Imagen ' + (current + 1) + ' de ' + total
if (prev) prev.disabled = current === 0
if (next) next.disabled = current === total - 1
}
function readIndex() {
var width = track.clientWidth
if (!width) return
var index = Math.round(track.scrollLeft / width)
if (index === current) return
current = index
paint()
}
function go(index) {
var target = Math.max(0, Math.min(total - 1, index))
track.scrollTo({ left: track.clientWidth * target, behavior: 'smooth' })
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
paint()
}
function initWall(root) {
var wall = root.querySelector('[data-mn-wall]')
if (!wall || !hasObserver()) return
var resumeTimer = null
function hold() {
window.clearTimeout(resumeTimer)
wall.classList.add(HELD_CLASS)
}
function release() {
window.clearTimeout(resumeTimer)
resumeTimer = window.setTimeout(function () {
wall.classList.remove(HELD_CLASS)
}, WALL_RESUME_DELAY)
}
wall.addEventListener('pointerdown', hold)
wall.addEventListener('pointerenter', hold)
wall.addEventListener('pointerup', release)
wall.addEventListener('pointerleave', release)
wall.addEventListener('pointercancel', release)
new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
wall.classList.toggle(LIVE_CLASS, entry.isIntersecting)
})
}).observe(wall)
}
function initTriad(root) {
var triad = root.querySelector('[data-mn-triad]')
if (!triad) return
var nodes = triad.querySelectorAll('[data-mn-triad-go]')
var items = triad.querySelectorAll('[data-mn-triad-item]')
if (!nodes.length || nodes.length !== items.length) return
function paint(index) {
forEach(nodes, function (node, i) {
node.setAttribute('aria-pressed', i === index ? 'true' : 'false')
})
forEach(items, function (item, i) {
item.classList.toggle(ACTIVE_CLASS, i === index)
})
}
forEach(nodes, function (node) {
node.addEventListener('click', function () {
var index = parseInt(node.getAttribute('data-mn-triad-go'), 10)
if (!isNaN(index) && items[index]) paint(index)
})
})
}
function initCompare(root) {
var compare = root.querySelector('[data-mn-compare]')
if (!compare) return
var items = compare.querySelectorAll('[data-mn-compare-item]')
forEach(items, function (item) {
var toggle = item.querySelector('[data-mn-compare-toggle]')
if (!toggle) return
toggle.addEventListener('click', function () {
forEach(items, function (other) {
var active = other === item
other.classList.toggle(ACTIVE_CLASS, active)
var otherToggle = other.querySelector('[data-mn-compare-toggle]')
if (otherToggle) otherToggle.setAttribute('aria-pressed', active ? 'true' : 'false')
})
})
})
}
function initViewportEffects(root) {
if (!hasObserver()) return
var ctas = root.querySelectorAll('.mn-cta')
var reveals = root.querySelectorAll('[data-mn-reveal]')
var liveObserver = new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
entry.target.classList.toggle(LIVE_CLASS, entry.isIntersecting)
})
})
forEach(ctas, function (cta) { liveObserver.observe(cta) })
var revealObserver = new window.IntersectionObserver(function (entries, observer) {
entries.forEach(function (entry) {
if (!entry.isIntersecting) return
entry.target.classList.add(REVEALED_CLASS)
observer.unobserve(entry.target)
})
}, { threshold: 0.45 })
forEach(reveals, function (el) {
el.classList.add(ARMED_CLASS)
revealObserver.observe(el)
})
}
function initStickyCta(root) {
var sticky = root.querySelector('[data-mn-sticky]')
var hero = root.querySelector('.mn-hero')
if (!sticky || !hero) return
sticky.hidden = false
if (!hasObserver()) {
sticky.classList.add('is-visible')
return
}
var heroVisible = true
var tailVisible = false
function update() {
sticky.classList.toggle('is-visible', !heroVisible && !tailVisible)
}
new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) { heroVisible = entry.isIntersecting })
update()
}, { rootMargin: '-120px 0px 0px 0px' }).observe(hero)
var tail = root.querySelectorAll('.mn-close .mn-cta-row, .mn-footer')
if (!tail.length) return
var visibleTail = []
var tailObserver = new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
var at = visibleTail.indexOf(entry.target)
if (entry.isIntersecting && at < 0) visibleTail.push(entry.target)
if (!entry.isIntersecting && at > -1) visibleTail.splice(at, 1)
})
tailVisible = visibleTail.length > 0
update()
})
forEach(tail, function (el) { tailObserver.observe(el) })
}
function initStories(root) {
var stories = root.querySelector('[data-mn-stories]')
if (!stories) return
var track = stories.querySelector('[data-mn-stories-track]')
var nav = stories.querySelector('[data-mn-stories-nav]')
var prev = stories.querySelector('[data-mn-stories-prev]')
var next = stories.querySelector('[data-mn-stories-next]')
var dots = stories.querySelectorAll('[data-mn-stories-dot]')
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
forEach(dots, function (dot, index) {
if (index === current) dot.setAttribute('aria-current', 'true')
else dot.removeAttribute('aria-current')
})
}
function readIndex() {
var best = 0
forEach(items, function (item, index) {
if (Math.abs(targetOf(index) - track.scrollLeft) < Math.abs(targetOf(best) - track.scrollLeft)) best = index
})
current = best
paint()
}
function go(index) {
var target = Math.max(0, Math.min(items.length - 1, index))
track.scrollTo({ left: targetOf(target), behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
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
forEach(dots, function (dot, index) {
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
initWall(root)
initTriad(root)
initCompare(root)
initViewportEffects(root)
initStickyCta(root)
}
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', init)
} else {
init()
}
})()

;(function () {
'use strict'
var ROOT_SELECTOR = '.mc-lp'
var READY_FLAG = 'mcLandingReady'
var PREPAID_ENABLED = false
var PRICES = {
prepaid: '$69.900',
cod: '$79.900'
}
var CTA_LABELS = {
prepaid: 'QUIERO MI MIMACALM POR $69.900',
cod: 'QUIERO MI MIMACALM CONTRAENTREGA'
}
var CTA_LABEL_FALLBACK = 'ELEGIR MI FORMA DE PAGO'
var PAY_ATTRIBUTE = 'data-sg-pay'
var LIVE_CLASS = 'is-live'
var CAROUSEL_CLASS = 'is-carousel'
var ACTIVE_CLASS = 'is-active'
var ARMED_CLASS = 'is-armed'
var REVEALED_CLASS = 'is-in'
var LINE_START_INDEX = 1
var BODY_TOUR_STEP = 900
function forEach(list, fn) {
Array.prototype.forEach.call(list, fn)
}
function prefersReducedMotion() {
return typeof window.matchMedia === 'function' &&
window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
function hasObserver() {
return typeof window.IntersectionObserver === 'function'
}
function initPaymentSelector(root) {
var inputs = root.querySelectorAll('input[name="mc-payment"]')
if (!inputs.length) return
var stickyPrice = root.querySelector('[data-mc-sticky-price]')
var priceCta = root.querySelector('[data-mc-cta-price]')
function sync() {
var selected = root.querySelector('input[name="mc-payment"]:checked')
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
var slider = root.querySelector('[data-mc-slider]')
if (!slider) return
var track = slider.querySelector('[data-mc-slider-track]')
var prev = slider.querySelector('[data-mc-slider-prev]')
var next = slider.querySelector('[data-mc-slider-next]')
var count = slider.querySelector('[data-mc-slider-count]')
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
function initLine(root) {
var line = root.querySelector('[data-mc-line]')
if (!line) return
var track = line.querySelector('[data-mc-line-track]')
var items = line.querySelectorAll('[data-mc-line-item]')
var prev = line.querySelector('[data-mc-line-prev]')
var next = line.querySelector('[data-mc-line-next]')
if (!track || items.length < 2) return
var current = LINE_START_INDEX
function unit() {
return items[1].offsetLeft - items[0].offsetLeft || 1
}
function measure() {
var box = track.getBoundingClientRect()
var center = box.left + box.width / 2
var step = unit()
var best = 0
var bestFocus = -1
forEach(items, function (item, index) {
var rect = item.getBoundingClientRect()
var distance = Math.abs(rect.left + rect.width / 2 - center) / step
var focus = Math.max(0, 1 - distance)
item.style.setProperty('--mc-focus', focus.toFixed(3))
if (focus > bestFocus) {
bestFocus = focus
best = index
}
})
current = best
}
function go(index, smooth) {
var item = items[index]
if (!item) return
var left = item.offsetLeft - (track.clientWidth - item.offsetWidth) / 2
track.scrollTo({ left: left, behavior: smooth ? 'smooth' : 'auto' })
}
var ticking = false
track.addEventListener('scroll', function () {
if (ticking) return
ticking = true
window.requestAnimationFrame(function () {
ticking = false
measure()
})
}, { passive: true })
if (prev) {
prev.hidden = false
prev.addEventListener('click', function () { go(Math.max(0, current - 1), true) })
}
if (next) {
next.hidden = false
next.addEventListener('click', function () { go(Math.min(items.length - 1, current + 1), true) })
}
window.addEventListener('resize', function () {
go(current, false)
measure()
}, { passive: true })
go(LINE_START_INDEX, false)
measure()
}
function initBodyMap(root) {
var body = root.querySelector('[data-mc-body]')
if (!body) return
var spots = body.querySelectorAll('[data-mc-spot]')
var signals = body.querySelectorAll('[data-mc-signal]')
var buttons = body.querySelectorAll('[data-mc-signal-go]')
if (!spots.length || !signals.length) return
var timer = null
function activate(index) {
var key = String(index)
forEach(spots, function (spot) {
var active = spot.getAttribute('data-mc-spot') === key
spot.classList.toggle(ACTIVE_CLASS, active)
spot.setAttribute('aria-pressed', active ? 'true' : 'false')
})
forEach(signals, function (signal) {
signal.classList.toggle(ACTIVE_CLASS, signal.getAttribute('data-mc-signal') === key)
})
}
function stopTour() {
if (timer) window.clearTimeout(timer)
timer = null
}
function tour(index) {
activate(index)
if (index >= signals.length - 1) return
timer = window.setTimeout(function () { tour(index + 1) }, BODY_TOUR_STEP)
}
function pick(index) {
stopTour()
activate(index)
}
forEach(spots, function (spot) {
spot.addEventListener('click', function () {
pick(parseInt(spot.getAttribute('data-mc-spot'), 10))
})
})
forEach(buttons, function (button) {
button.addEventListener('click', function () {
pick(parseInt(button.getAttribute('data-mc-signal-go'), 10))
})
})
if (!hasObserver() || prefersReducedMotion()) {
activate(0)
return
}
activate(0)
new window.IntersectionObserver(function (entries, observer) {
entries.forEach(function (entry) {
if (!entry.isIntersecting) return
observer.unobserve(entry.target)
if (!timer) tour(0)
})
}, { threshold: 0.4 }).observe(body)
}
function initReveals(root) {
var sections = root.querySelectorAll('[data-mc-reveal]')
if (!sections.length) return
forEach(root.querySelectorAll('[data-mc-stagger]'), function (el) {
var index = 0
var sibling = el
while ((sibling = sibling.previousElementSibling)) {
if (sibling.hasAttribute('data-mc-stagger')) index += 1
}
el.style.setProperty('--mc-i', index)
})
if (!hasObserver()) return
forEach(sections, function (section) {
section.classList.add(ARMED_CLASS)
var threshold = parseFloat(section.getAttribute('data-mc-reveal')) || 0.25
new window.IntersectionObserver(function (entries, observer) {
entries.forEach(function (entry) {
if (!entry.isIntersecting) return
entry.target.classList.add(REVEALED_CLASS)
observer.unobserve(entry.target)
})
}, { threshold: threshold }).observe(section)
})
}
function initCompare(root) {
var compare = root.querySelector('[data-mc-compare]')
if (!compare) return
var items = compare.querySelectorAll('[data-mc-compare-item]')
forEach(items, function (item) {
var toggle = item.querySelector('[data-mc-compare-toggle]')
if (!toggle) return
toggle.addEventListener('click', function () {
forEach(items, function (other) {
var active = other === item
other.classList.toggle(ACTIVE_CLASS, active)
var otherToggle = other.querySelector('[data-mc-compare-toggle]')
if (otherToggle) otherToggle.setAttribute('aria-pressed', active ? 'true' : 'false')
})
})
})
}
function initViewportEffects(root) {
var ctas = root.querySelectorAll('.mc-cta')
if (!ctas.length || !hasObserver()) return
var liveObserver = new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
entry.target.classList.toggle(LIVE_CLASS, entry.isIntersecting)
})
})
forEach(ctas, function (cta) { liveObserver.observe(cta) })
}
function initStickyCta(root) {
var sticky = root.querySelector('[data-mc-sticky]')
var hero = root.querySelector('.mc-hero')
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
var tail = root.querySelectorAll('.mc-close .mc-cta-row, .mc-footer')
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
var stories = root.querySelector('[data-mc-stories]')
if (!stories) return
var track = stories.querySelector('[data-mc-stories-track]')
var nav = stories.querySelector('[data-mc-stories-nav]')
var prev = stories.querySelector('[data-mc-stories-prev]')
var next = stories.querySelector('[data-mc-stories-next]')
var dots = stories.querySelectorAll('[data-mc-stories-dot]')
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
initLine(root)
initBodyMap(root)
initReveals(root)
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

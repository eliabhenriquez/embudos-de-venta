;(function () {
'use strict'
var READY_FLAG = 'nsSprayRemarketingReady'
var DEFAULT_PRICE_MODE = 'regular'
var PRICES = { regular: '$69.900', prepaid: '$59.900', cod: '$69.900' }
var STICKY_SUBS = { regular: 'o $59.900 anticipado', prepaid: 'anticipado · ahorras otros $10.000', cod: 'pagas al recibir' }
var ROOT_SELECTOR = '.ns-lp'
var LOCAL_ASSET_BASES = ['../assets/', '../../../shared/assets/']
var SKIN_PAY_ATTRIBUTE = 'data-ns-pay'
var STICKY_AT = 0.5
var DEFOG_MS = 800
var DECK_MS = 560
var DECK_THROWN = 'is-thrown'
var DECK_BACK = 'is-back'
var SWIPE_MIN = 32
var REVEAL_SELECTORS = '.ns-plant, .ns-source, .ns-compare, .ns-plan, .ns-moment, .ns-warranty__list li, .ns-offer__card, .ns-box__price'
function each(list, fn) { Array.prototype.forEach.call(list, fn) }
function isLocalPreview() {
var host = window.location.hostname
return window.location.protocol === 'file:' || host === '127.0.0.1' || host === 'localhost'
}
function initLocalFallback(root) {
if (!isLocalPreview()) return
each(root.querySelectorAll('img'), function (image) {
var name = (image.getAttribute('src') || '').split('?')[0].split('/').pop()
var attempt = 0
function useLocal() {
if (!name || attempt >= LOCAL_ASSET_BASES.length) return
image.removeAttribute('srcset')
image.removeAttribute('sizes')
image.src = LOCAL_ASSET_BASES[attempt] + name
attempt += 1
}
image.addEventListener('error', useLocal)
if (image.complete && !image.naturalWidth) useLocal()
})
}
function prefersReducedMotion() {
return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
function observe(elements, onChange, options) {
if (!elements.length) return
if (typeof window.IntersectionObserver !== 'function') {
each(elements, function (element) { onChange(element, true) })
return
}
var observer = new IntersectionObserver(function (entries) {
entries.forEach(function (entry) { onChange(entry.target, entry.isIntersecting) })
}, options || { rootMargin: '0px 0px -10% 0px', threshold: 0.15 })
each(elements, function (element) { observer.observe(element) })
}
function initLiveAnimations(root) {
observe(root.querySelectorAll('[data-ns-live], [data-ns-cta]'), function (element, isIn) {
element.classList.toggle('is-live', isIn)
}, { threshold: 0.12 })
}
function initReveal(root) {
var blocks = root.querySelectorAll(REVEAL_SELECTORS)
each(blocks, function (block) { block.setAttribute('data-ns-reveal', '') })
observe(blocks, function (element, isIn) {
if (isIn) element.classList.add('is-in')
})
observe(root.querySelectorAll('[data-ns-defog]'), function (element, isIn) {
if (isIn) element.classList.add('is-in')
}, { threshold: 0.3 })
}
function initBottles(root) {
observe(root.querySelectorAll('[data-ns-bottles]'), function (element, isIn) {
if (isIn) element.classList.add('is-filled')
}, { threshold: 0.4 })
}
function initGallery(root) {
var gallery = root.querySelector('[data-ns-gallery]')
if (!gallery) return
var track = gallery.querySelector('[data-ns-gallery-track]')
if (!track || !track.children.length) return
var slides = track.children
var prev = gallery.querySelector('[data-ns-gallery-prev]')
var next = gallery.querySelector('[data-ns-gallery-next]')
var label = gallery.querySelector('[data-ns-gallery-label]')
var number = gallery.querySelector('[data-ns-gallery-index]')
var thumbs = gallery.querySelectorAll('[data-ns-gallery-thumb]')
var reduceMotion = prefersReducedMotion()
var current = 0
var ticking = false
function go(index) {
var slide = slides[index]
if (!slide) return
track.scrollTo({ left: slide.offsetLeft, behavior: reduceMotion ? 'auto' : 'smooth' })
}
function paint(index) {
if (index === current || !slides[index]) return
var slide = slides[index]
slides[current].classList.remove('is-current')
slide.classList.add('is-current')
current = index
if (label) label.textContent = slide.getAttribute('data-ns-caption') || ''
if (number) number.textContent = String(index + 1)
if (prev) prev.disabled = index === 0
if (next) next.disabled = index === slides.length - 1
each(thumbs, function (thumb, i) { thumb.setAttribute('aria-current', i === index ? 'true' : 'false') })
if (reduceMotion) return
slide.classList.remove('is-entering')
void slide.offsetWidth
slide.classList.add('is-entering')
window.setTimeout(function () { slide.classList.remove('is-entering') }, DEFOG_MS)
}
track.addEventListener('scroll', function () {
if (ticking) return
ticking = true
window.requestAnimationFrame(function () {
ticking = false
paint(Math.round(track.scrollLeft / Math.max(track.clientWidth, 1)))
})
}, { passive: true })
if (prev) prev.addEventListener('click', function () { go(current - 1) })
if (next) next.addEventListener('click', function () { go(current + 1) })
each(thumbs, function (thumb) {
thumb.addEventListener('click', function () { go(Number(thumb.getAttribute('data-ns-gallery-thumb'))) })
})
}
function initDeck(root) {
var deck = root.querySelector('[data-ns-deck]')
if (!deck) return
var stack = deck.querySelector('[data-ns-deck-stack]')
if (!stack || stack.children.length < 2) return
var cards = stack.children
var total = cards.length
var prev = deck.querySelector('[data-ns-deck-prev]')
var next = deck.querySelector('[data-ns-deck-next]')
var label = deck.querySelector('[data-ns-deck-label]')
var number = deck.querySelector('[data-ns-deck-index]')
var reduceMotion = prefersReducedMotion()
var current = 0
var start = null
function paint() {
each(cards, function (card, i) {
var position = (i - current + total) % total
card.setAttribute('data-ns-pos', String(position))
card.setAttribute('aria-hidden', position === 0 ? 'false' : 'true')
})
if (label) label.textContent = cards[current].getAttribute('data-ns-caption') || ''
if (number) number.textContent = String(current + 1)
}
function animate(card, className) {
if (reduceMotion) return
card.classList.remove(DECK_THROWN, DECK_BACK)
void card.offsetWidth
card.classList.add(className)
window.setTimeout(function () { card.classList.remove(className) }, DECK_MS)
}
function go(step) {
var front = cards[current]
current = (current + step + total) % total
if (step > 0) animate(front, DECK_THROWN)
else animate(cards[current], DECK_BACK)
paint()
}
stack.addEventListener('pointerdown', function (event) { start = { x: event.clientX, y: event.clientY } })
stack.addEventListener('pointercancel', function () { start = null })
stack.addEventListener('pointerup', function (event) {
if (!start) return
var dx = event.clientX - start.x
var dy = event.clientY - start.y
start = null
var isTap = Math.abs(dx) < SWIPE_MIN && Math.abs(dy) < SWIPE_MIN
if (isTap) go(1)
else if (Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1)
})
stack.addEventListener('dragstart', function (event) { event.preventDefault() })
stack.addEventListener('keydown', function (event) {
if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return
event.preventDefault()
go(event.key === 'ArrowRight' ? 1 : -1)
})
if (prev) prev.addEventListener('click', function () { go(-1) })
if (next) next.addEventListener('click', function () { go(1) })
paint()
}
function initCarousels(root) {
each(root.querySelectorAll('[data-ns-carousel]'), function (track) {
var host = track.closest ? track.closest('[data-ns-carousel-host]') : null
if (!host) return
var prev = host.querySelector('[data-ns-prev]')
var next = host.querySelector('[data-ns-next]')
var reduceMotion = prefersReducedMotion()
function step() {
var first = track.children[0]
if (!first) return 0
var gap = parseFloat(window.getComputedStyle(track).columnGap) || 0
return first.getBoundingClientRect().width + gap
}
function paintArrows() {
var maxScroll = track.scrollWidth - track.clientWidth - 2
if (prev) prev.disabled = track.scrollLeft <= 2
if (next) next.disabled = track.scrollLeft >= maxScroll
}
if (prev) prev.addEventListener('click', function () { track.scrollBy({ left: -step(), behavior: reduceMotion ? 'auto' : 'smooth' }) })
if (next) next.addEventListener('click', function () { track.scrollBy({ left: step(), behavior: reduceMotion ? 'auto' : 'smooth' }) })
track.addEventListener('scroll', function () { window.requestAnimationFrame(paintArrows) }, { passive: true })
paintArrows()
})
}
function initPlants(root) {
var list = root.querySelector('[data-ns-plants]')
if (!list) return
var buttons = list.querySelectorAll('[data-ns-plant]')
var arts = root.querySelectorAll('[data-ns-plant-art]')
each(buttons, function (button) {
button.addEventListener('click', function () {
var id = button.getAttribute('data-ns-plant')
each(arts, function (art) { art.classList.toggle('is-on', art.getAttribute('data-ns-plant-art') === id) })
each(buttons, function (other) {
var isOn = other === button
other.setAttribute('aria-pressed', isOn ? 'true' : 'false')
var card = other.closest ? other.closest('.ns-plant') : null
if (card) card.classList.toggle('is-on', isOn)
})
})
})
}
function paintSticky(root, mode) {
var price = root.querySelector('[data-ns-sticky-price]')
var sub = root.querySelector('[data-ns-sticky-sub]')
if (!price || !sub) return
price.textContent = PRICES[mode] || PRICES[DEFAULT_PRICE_MODE]
sub.textContent = STICKY_SUBS[mode] || STICKY_SUBS[DEFAULT_PRICE_MODE]
}
function initPaymentChoice(root) {
each(root.querySelectorAll('[data-ns-pay-choice]'), function (button) {
button.addEventListener('click', function () {
var choice = button.getAttribute('data-ns-pay-choice')
if (choice !== 'prepaid' && choice !== 'cod') return
document.documentElement.setAttribute(SKIN_PAY_ATTRIBUTE, choice)
paintSticky(root, choice)
})
})
}
function initSticky(root) {
var sticky = root.querySelector('[data-ns-sticky]')
if (!sticky) return
sticky.hidden = false
paintSticky(root, DEFAULT_PRICE_MODE)
var ticking = false
function paint() {
ticking = false
sticky.classList.toggle('is-on', window.pageYOffset > window.innerHeight * STICKY_AT)
}
window.addEventListener('scroll', function () {
if (ticking) return
ticking = true
window.requestAnimationFrame(paint)
}, { passive: true })
paint()
}
function init() {
var root = document.querySelector(ROOT_SELECTOR)
if (!root || root.dataset[READY_FLAG]) return
root.dataset[READY_FLAG] = '1'
root.classList.add('is-js')
initLocalFallback(root)
initLiveAnimations(root)
initReveal(root)
initBottles(root)
initGallery(root)
initDeck(root)
initCarousels(root)
initPlants(root)
initPaymentChoice(root)
initSticky(root)
}
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', init)
} else {
init()
}
window.setTimeout(init, 1200)
})()

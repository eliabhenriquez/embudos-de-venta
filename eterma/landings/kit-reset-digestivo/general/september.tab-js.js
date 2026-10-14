;(function () {
'use strict'
var ROOT_SELECTOR = '.rd-lp'
var READY_FLAG = 'rdLandingReady'
var PRODUCT_HANDLE = 'kit-reset-digestivo'
var RELEASIT_PRODUCT_CACHE_ID = 'rsi-cod-form-product-cache'
var STICKY_REVEAL_MARGIN = '-40% 0px 0px 0px'
var DECK_POSITION_ATTRIBUTE = 'data-rd-pos'
var DECK_THROW_MS = 450
var SWIPE_MIN_PX = 40
var TAP_MAX_PX = 8
var CHECK_PROMPT = 'Toca las que te pasan.'
var TABLIST_LABEL = 'Ingredientes'
function forEach(list, callback) {
Array.prototype.forEach.call(list, callback)
}
function prefersReducedMotion() {
return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
function hasObserver() {
return typeof window.IntersectionObserver === 'function'
}
function checkMessage(count, total) {
if (!count) return CHECK_PROMPT
return 'Marcaste ' + count + ' de ' + total + '.'
}
function initPlayback(root) {
var targets = root.querySelectorAll('[data-rd-marquee], .rd-flow, .rd-cta')
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
var track = root.querySelector('.rd-people__track')
if (!track) return
function hold() { track.classList.add('is-held') }
function release() { track.classList.remove('is-held') }
track.addEventListener('pointerdown', hold)
track.addEventListener('pointerup', release)
track.addEventListener('pointercancel', release)
track.addEventListener('pointerleave', release)
}
function initDeck(root) {
var deck = root.querySelector('[data-rd-deck]')
if (!deck) return
var cards = deck.querySelectorAll('[data-rd-card]')
var total = cards.length
if (total < 2) return
var controls = root.querySelector('[data-rd-deck-controls]')
var prev = root.querySelector('[data-rd-deck-prev]')
var next = root.querySelector('[data-rd-deck-next]')
var live = root.querySelector('[data-rd-deck-live]')
var reduceMotion = prefersReducedMotion()
var active = 0
var busy = false
function positionOf(index) {
return (index - active + total) % total
}
function paint() {
forEach(cards, function (card, index) {
var position = positionOf(index)
card.setAttribute(DECK_POSITION_ATTRIBUTE, String(position))
card.setAttribute('aria-hidden', position === 0 ? 'false' : 'true')
})
if (live) live.textContent = cards[active].getAttribute('data-rd-card-name')
}
function release() {
window.setTimeout(function () { busy = false }, DECK_THROW_MS)
}
function goNext() {
if (busy) return
var leaving = cards[active]
active = (active + 1) % total
if (reduceMotion) return paint()
busy = true
paint()
leaving.setAttribute(DECK_POSITION_ATTRIBUTE, 'out')
window.setTimeout(function () {
leaving.setAttribute(DECK_POSITION_ATTRIBUTE, String(total - 1))
}, DECK_THROW_MS)
release()
}
function goPrev() {
if (busy) return
active = (active - 1 + total) % total
var incoming = cards[active]
if (reduceMotion) return paint()
busy = true
incoming.classList.add('is-instant')
incoming.setAttribute(DECK_POSITION_ATTRIBUTE, 'out')
void incoming.offsetWidth
incoming.classList.remove('is-instant')
paint()
release()
}
var startX = null
var startY = 0
deck.addEventListener('pointerdown', function (event) {
if (event.pointerType === 'mouse' && event.button !== 0) return
startX = event.clientX
startY = event.clientY
})
deck.addEventListener('pointerup', function (event) {
if (startX === null) return
var deltaX = event.clientX - startX
var deltaY = event.clientY - startY
startX = null
if (Math.abs(deltaX) < TAP_MAX_PX && Math.abs(deltaY) < TAP_MAX_PX) return goNext()
if (Math.abs(deltaX) < SWIPE_MIN_PX || Math.abs(deltaX) < Math.abs(deltaY)) return
if (deltaX < 0) return goNext()
goPrev()
})
deck.addEventListener('pointercancel', function () { startX = null })
if (prev) prev.addEventListener('click', goPrev)
if (next) next.addEventListener('click', goNext)
deck.classList.add('is-stacked')
if (controls) controls.hidden = false
paint()
}
function initRoute(root) {
var route = root.querySelector('[data-rd-route]')
if (!route || !hasObserver()) return
var stops = route.querySelectorAll('[data-rd-stop]')
if (!stops.length) return
var observer = new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (!entry.isIntersecting) return
entry.target.classList.add('is-reached')
observer.unobserve(entry.target)
})
}, { rootMargin: '0px 0px -30% 0px' })
route.classList.add('is-armed')
forEach(stops, function (stop) { observer.observe(stop) })
}
function initCheck(root) {
var list = root.querySelector('[data-rd-check]')
var status = root.querySelector('[data-rd-check-status]')
if (!list || !status) return
var notes = list.querySelectorAll('[data-rd-note]')
var total = notes.length
if (!total) return
function update() {
var count = list.querySelectorAll('[data-rd-note][aria-pressed="true"]').length
status.textContent = checkMessage(count, total)
}
function toggle(note) {
var pressed = note.getAttribute('aria-pressed') === 'true'
note.setAttribute('aria-pressed', pressed ? 'false' : 'true')
update()
}
forEach(notes, function (note) {
note.setAttribute('role', 'button')
note.setAttribute('tabindex', '0')
note.setAttribute('aria-pressed', 'false')
note.addEventListener('click', function () { toggle(note) })
note.addEventListener('keydown', function (event) {
if (event.key !== 'Enter' && event.key !== ' ') return
event.preventDefault()
toggle(note)
})
})
status.hidden = false
update()
}
function initTabs(root) {
var tabs = root.querySelector('[data-rd-tabs]')
if (!tabs) return
var list = tabs.querySelector('[data-rd-tablist]')
var buttons = tabs.querySelectorAll('[data-rd-tab]')
if (!list || !buttons.length) return
function panelOf(button) {
return document.getElementById(button.getAttribute('data-rd-tab'))
}
function select(selectedIndex, moveFocus) {
forEach(buttons, function (button, index) {
var isSelected = index === selectedIndex
var panel = panelOf(button)
button.setAttribute('aria-selected', isSelected ? 'true' : 'false')
button.setAttribute('tabindex', isSelected ? '0' : '-1')
if (panel) panel.hidden = !isSelected
})
if (moveFocus) buttons[selectedIndex].focus()
}
forEach(buttons, function (button, index) {
var panel = panelOf(button)
button.setAttribute('role', 'tab')
button.setAttribute('aria-controls', button.getAttribute('data-rd-tab'))
if (panel) {
panel.setAttribute('role', 'tabpanel')
panel.setAttribute('aria-labelledby', button.id)
}
button.addEventListener('click', function () { select(index, false) })
})
list.addEventListener('keydown', function (event) {
var current = Array.prototype.indexOf.call(buttons, document.activeElement)
if (current < 0) return
var last = buttons.length - 1
var target = null
if (event.key === 'ArrowRight') target = current === last ? 0 : current + 1
if (event.key === 'ArrowLeft') target = current === 0 ? last : current - 1
if (event.key === 'Home') target = 0
if (event.key === 'End') target = last
if (target === null) return
event.preventDefault()
select(target, true)
})
list.setAttribute('role', 'tablist')
list.setAttribute('aria-label', TABLIST_LABEL)
list.hidden = false
tabs.classList.add('is-tabbed')
select(0, false)
}
function initReveal(root) {
var blocks = root.querySelectorAll('[data-rd-reveal]')
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
var sticky = root.querySelector('[data-rd-sticky]')
var heroCta = root.querySelector('.rd-hero .rd-cta')
if (!sticky || !heroCta) return
sticky.hidden = false
if (!hasObserver()) {
sticky.classList.add('is-visible')
return
}
var heroVisible = false
var tailVisible = false
var tail = root.querySelectorAll('.rd-close__buy, .rd-social, .rd-footer')
function update() {
sticky.classList.toggle('is-visible', !heroVisible && !tailVisible)
}
new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) { heroVisible = entry.isIntersecting })
update()
}, { rootMargin: STICKY_REVEAL_MARGIN }).observe(heroCta)
var tailObserver = new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
entry.target.setAttribute('data-rd-tail-visible', entry.isIntersecting ? 'true' : 'false')
})
tailVisible = Array.prototype.some.call(tail, function (element) {
return element.getAttribute('data-rd-tail-visible') === 'true'
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
initDeck(root)
initRoute(root)
initCheck(root)
initTabs(root)
initReveal(root)
initSticky(root)
}
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', init)
} else {
init()
}
})()

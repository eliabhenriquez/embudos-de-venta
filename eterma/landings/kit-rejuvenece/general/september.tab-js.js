;(function () {
'use strict'
var ROOT_SELECTOR = '.rj-lp'
var READY_FLAG = 'rjLandingReady'
var PRODUCT_HANDLE = 'kit-rejuvenece'
var RELEASIT_PRODUCT_CACHE_ID = 'rsi-cod-form-product-cache'
var STICKY_REVEAL_MARGIN = '-40% 0px 0px 0px'
function forEach(list, callback) {
Array.prototype.forEach.call(list, callback)
}
function hasObserver() {
return typeof window.IntersectionObserver === 'function'
}
function initPlayback(root) {
var targets = root.querySelectorAll('[data-rj-marquee], [data-rj-verbs], .rj-cta')
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
var track = root.querySelector('.rj-people__track')
if (!track) return
function hold() { track.classList.add('is-held') }
function release() { track.classList.remove('is-held') }
track.addEventListener('pointerdown', hold)
track.addEventListener('pointerup', release)
track.addEventListener('pointercancel', release)
track.addEventListener('pointerleave', release)
}
function initCases(root) {
var rail = root.querySelector('[data-rj-cases-rail]')
var nav = root.querySelector('[data-rj-cases-nav]')
if (!rail || !nav) return
var cases = rail.querySelectorAll('[data-rj-case]')
var total = cases.length
if (total < 2) return
var prev = root.querySelector('[data-rj-cases-prev]')
var next = root.querySelector('[data-rj-cases-next]')
var count = root.querySelector('[data-rj-cases-count]')
var current = 0
function nearest() {
var middle = rail.scrollLeft + rail.clientWidth / 2
var best = 0
var bestGap = Infinity
forEach(cases, function (item, index) {
var center = item.offsetLeft + item.offsetWidth / 2
var gap = Math.abs(center - middle)
if (gap < bestGap) {
bestGap = gap
best = index
}
})
return best
}
function paint() {
if (count) count.textContent = current + 1 + '/' + total
if (prev) prev.disabled = current === 0
if (next) next.disabled = current === total - 1
}
function goTo(index) {
current = Math.max(0, Math.min(total - 1, index))
var item = cases[current]
rail.scrollTo({ left: item.offsetLeft - (rail.clientWidth - item.offsetWidth) / 2, behavior: 'smooth' })
paint()
}
if (prev) prev.addEventListener('click', function () { goTo(current - 1) })
if (next) next.addEventListener('click', function () { goTo(current + 1) })
rail.addEventListener('scroll', function () {
var index = nearest()
if (index === current) return
current = index
paint()
})
nav.hidden = false
paint()
}
function initReveal(root) {
var blocks = root.querySelectorAll('[data-rj-reveal]')
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
var sticky = root.querySelector('[data-rj-sticky]')
var heroCta = root.querySelector('.rj-hero .rj-cta')
if (!sticky || !heroCta) return
sticky.hidden = false
if (!hasObserver()) {
sticky.classList.add('is-visible')
return
}
var heroVisible = false
var tailVisible = false
var tail = root.querySelectorAll('.rj-close__buy, .rj-social, .rj-footer')
function update() {
sticky.classList.toggle('is-visible', !heroVisible && !tailVisible)
}
new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) { heroVisible = entry.isIntersecting })
update()
}, { rootMargin: STICKY_REVEAL_MARGIN }).observe(heroCta)
var tailObserver = new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
entry.target.setAttribute('data-rj-tail-visible', entry.isIntersecting ? 'true' : 'false')
})
tailVisible = Array.prototype.some.call(tail, function (element) {
return element.getAttribute('data-rj-tail-visible') === 'true'
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
initCases(root)
initReveal(root)
initSticky(root)
}
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', init)
} else {
init()
}
})()

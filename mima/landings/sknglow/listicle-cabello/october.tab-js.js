;(function () {
'use strict'
var ROOT_SELECTOR = '.sg-lp'
var READY_FLAG = 'sgListicleCabelloReady'
var CTA_SELECTOR = '.sg-cta'
var JS_CLASS = 'is-js'
var RAIL_CLASS = 'is-rail'
var ENTERED_CLASS = 'is-in'
var LIVE_CLASS = 'is-live'
var BUYBAR_ON_CLASS = 'is-on'
var BUYBAR_TRIGGER = 0.5
var ENTER_THRESHOLD = 0.12
var LOCAL_ASSET_BASE = '../assets/'
var LOCAL_FLAG = 'sgLocal'
function forEach(list, fn) {
Array.prototype.forEach.call(list, fn)
}
function hasObserver() {
return typeof window.IntersectionObserver === 'function'
}
function prefersReducedMotion() {
return typeof window.matchMedia === 'function' &&
window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
function isLocalPreview() {
var host = window.location.hostname
return window.location.protocol === 'file:' || host === '127.0.0.1' || host === 'localhost'
}
function initLocalFallback(root) {
if (!isLocalPreview()) return
forEach(root.querySelectorAll('img'), function (image) {
function useLocal() {
var name = (image.getAttribute('src') || '').split('?')[0].split('/').pop()
if (!name || image.dataset[LOCAL_FLAG] === name) return
image.dataset[LOCAL_FLAG] = name
image.removeAttribute('srcset')
image.removeAttribute('sizes')
image.src = LOCAL_ASSET_BASE + name
}
image.addEventListener('error', useLocal)
if (image.complete && !image.naturalWidth) useLocal()
})
}
function onScrollFrame(fn) {
var ticking = false
function request() {
if (ticking) return
ticking = true
window.requestAnimationFrame(function () {
ticking = false
fn()
})
}
window.addEventListener('scroll', request, { passive: true })
window.addEventListener('resize', request, { passive: true })
fn()
}
function initProgress(root) {
var bar = root.querySelector('[data-sg-progress]')
var article = root.querySelector('[data-sg-article]')
if (!bar || !article) return
onScrollFrame(function () {
var rect = article.getBoundingClientRect()
var span = rect.height - window.innerHeight
var done = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0
bar.style.transform = 'scaleX(' + done + ')'
})
}
function initEntrances(root) {
var blocks = root.querySelectorAll('[data-sg-enter]')
if (!blocks.length) return
var observer = new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (!entry.isIntersecting) return
entry.target.classList.add(ENTERED_CLASS)
observer.unobserve(entry.target)
})
}, { threshold: ENTER_THRESHOLD })
forEach(blocks, function (block) {
observer.observe(block)
})
}
function initCtaLife(root) {
var buttons = root.querySelectorAll(CTA_SELECTOR)
if (!buttons.length) return
var observer = new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
entry.target.classList.toggle(LIVE_CLASS, entry.isIntersecting)
})
})
forEach(buttons, function (button) {
observer.observe(button)
})
}
function initRail(rail) {
var track = rail.querySelector('[data-sg-rail-track]')
var nav = rail.querySelector('[data-sg-rail-nav]')
var prev = rail.querySelector('[data-sg-rail-prev]')
var next = rail.querySelector('[data-sg-rail-next]')
var dots = rail.querySelectorAll('[data-sg-rail-dot]')
if (!track || !nav || track.children.length < 2) return
var items = track.children
var current = 0
function maxScroll() {
return track.scrollWidth - track.clientWidth
}
function targetOf(index) {
var item = items[index]
var centered = window.getComputedStyle(item).scrollSnapAlign.indexOf('center') !== -1
var position = centered
? item.offsetLeft - (track.clientWidth - item.offsetWidth) / 2
: item.offsetLeft - items[0].offsetLeft
return Math.max(0, Math.min(maxScroll(), position))
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
forEach(track.querySelectorAll('img'), function (image) {
if (!image.complete) image.addEventListener('load', sync)
})
rail.classList.add(RAIL_CLASS)
sync()
}
function initBuybar(root) {
var bar = root.querySelector('[data-sg-buybar]')
var from = root.querySelector('[data-sg-product-revealed]')
if (!bar) return
if (!from) {
bar.classList.add(BUYBAR_ON_CLASS)
return
}
var offer = root.querySelector('[data-sg-offer]')
var handoff = offer ? (offer.querySelector(CTA_SELECTOR) || offer) : null
onScrollFrame(function () {
var presented = from.getBoundingClientRect().top < window.innerHeight * BUYBAR_TRIGGER
var atOffer = handoff ? handoff.getBoundingClientRect().top < window.innerHeight : false
bar.classList.toggle(BUYBAR_ON_CLASS, presented && !atOffer)
})
}
function initViewer(root) {
var viewer = root.querySelector('[data-sg-viewer]')
if (!viewer || typeof viewer.showModal !== 'function') return
var scroller = viewer.querySelector('[data-sg-viewer-scroll]')
var image = viewer.querySelector('[data-sg-viewer-image]')
var close = viewer.querySelector('[data-sg-viewer-close]')
if (!scroller || !image) return
function center() {
scroller.scrollLeft = (scroller.scrollWidth - scroller.clientWidth) / 2
scroller.scrollTop = 0
}
image.addEventListener('load', center)
forEach(root.querySelectorAll('[data-sg-zoom]'), function (link) {
link.addEventListener('click', function (event) {
event.preventDefault()
image.alt = link.getAttribute('data-sg-zoom-alt') || ''
image.src = link.getAttribute('href')
viewer.showModal()
center()
})
})
if (close) close.addEventListener('click', function () { viewer.close() })
scroller.addEventListener('click', function (event) {
if (event.target === scroller) viewer.close()
})
}
function init() {
var root = document.querySelector(ROOT_SELECTOR)
if (!root || root.dataset[READY_FLAG] === 'true') return
root.dataset[READY_FLAG] = 'true'
initLocalFallback(root)
initProgress(root)
forEach(root.querySelectorAll('[data-sg-rail]'), initRail)
initViewer(root)
if (!hasObserver()) return
root.classList.add(JS_CLASS)
initEntrances(root)
initCtaLife(root)
initBuybar(root)
}
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', init)
} else {
init()
}
})()

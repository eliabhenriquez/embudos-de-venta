;(function () {
'use strict'
var READY_FLAG = 'nsAdvFlemaReady'
var ROOT_SELECTOR = '.ns-lp'
var LOCAL_ASSET_BASES = ['../../spray/assets/', '../../../shared/assets/']
var BUYBAR_AT = 0.7
var EDGE = 2
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
function onScroll(paint) {
var ticking = false
function run() {
ticking = false
paint()
}
window.addEventListener('scroll', function () {
if (ticking) return
ticking = true
window.requestAnimationFrame(run)
}, { passive: true })
window.addEventListener('resize', run)
paint()
}
function initLiveAnimations(root) {
observe(root.querySelectorAll('[data-ns-live], [data-ns-cta]'), function (element, isIn) {
element.classList.toggle('is-live', isIn)
}, { threshold: 0.12 })
}
function initReveal(root) {
observe(root.querySelectorAll('[data-ns-reveal]'), function (element, isIn) {
if (isIn) element.classList.add('is-in')
})
}
function initProgress(root) {
var bar = root.querySelector('[data-ns-progress]')
var article = root.querySelector('.ns-article')
if (!bar || !article) return
onScroll(function () {
var box = article.getBoundingClientRect()
var distance = box.height - window.innerHeight
var done = distance > 0 ? Math.min(Math.max(-box.top / distance, 0), 1) : 1
bar.style.transform = 'scaleX(' + done + ')'
})
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
function move(direction) {
track.scrollBy({ left: direction * step(), behavior: reduceMotion ? 'auto' : 'smooth' })
}
function paintArrows() {
var maxScroll = track.scrollWidth - track.clientWidth - EDGE
if (prev) prev.disabled = track.scrollLeft <= EDGE
if (next) next.disabled = track.scrollLeft >= maxScroll
}
if (prev) prev.addEventListener('click', function () { move(-1) })
if (next) next.addEventListener('click', function () { move(1) })
track.addEventListener('scroll', function () { window.requestAnimationFrame(paintArrows) }, { passive: true })
paintArrows()
})
}
function initBuybar(root) {
var bar = root.querySelector('[data-ns-buybar]')
var from = root.querySelector('[data-ns-buybar-from]')
if (!bar || !from) return
onScroll(function () {
bar.classList.toggle('is-on', from.getBoundingClientRect().top < window.innerHeight * BUYBAR_AT)
})
}
function init() {
var root = document.querySelector(ROOT_SELECTOR)
if (!root || root.dataset[READY_FLAG]) return
root.dataset[READY_FLAG] = '1'
root.classList.add('is-js')
initLocalFallback(root)
initLiveAnimations(root)
initReveal(root)
initProgress(root)
initCarousels(root)
initBuybar(root)
}
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', init)
} else {
init()
}
window.setTimeout(init, 1200)
})()

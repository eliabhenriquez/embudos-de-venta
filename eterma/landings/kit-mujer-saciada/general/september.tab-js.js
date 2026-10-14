;(function () {
'use strict'
var ROOT_SELECTOR = '.ms-lp'
var READY_FLAG = 'msLandingReady'
var PRODUCT_HANDLE = 'kit-mujer-saciada'
var RELEASIT_PRODUCT_CACHE_ID = 'rsi-cod-form-product-cache'
var STICKY_REVEAL_MARGIN = '-40% 0px 0px 0px'
var TRAY_LABEL = 'Fotos del kit'
var CASES_HINT = 'Toca cada situación para leer la respuesta.'
function forEach(list, callback) {
Array.prototype.forEach.call(list, callback)
}
function hasObserver() {
return typeof window.IntersectionObserver === 'function'
}
function initPlayback(root) {
var targets = root.querySelectorAll('[data-ms-marquee], .ms-mark, .ms-cta')
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
var track = root.querySelector('.ms-people__track')
if (!track) return
function hold() { track.classList.add('is-held') }
function release() { track.classList.remove('is-held') }
track.addEventListener('pointerdown', hold)
track.addEventListener('pointerup', release)
track.addEventListener('pointercancel', release)
track.addEventListener('pointerleave', release)
}
function initTray(root) {
var tray = root.querySelector('[data-ms-tray]')
if (!tray) return
var picks = tray.querySelector('[data-ms-tray-picks]')
var buttons = tray.querySelectorAll('[data-ms-pick]')
if (!picks || !buttons.length) return
function shotOf(button) {
return document.getElementById(button.getAttribute('data-ms-pick'))
}
function select(selectedIndex, moveFocus) {
forEach(buttons, function (button, index) {
var isSelected = index === selectedIndex
var shot = shotOf(button)
button.setAttribute('aria-selected', isSelected ? 'true' : 'false')
button.setAttribute('tabindex', isSelected ? '0' : '-1')
if (shot) shot.classList.toggle('is-active', isSelected)
})
if (moveFocus) buttons[selectedIndex].focus()
}
forEach(buttons, function (button, index) {
var shot = shotOf(button)
button.setAttribute('role', 'tab')
button.setAttribute('aria-controls', button.getAttribute('data-ms-pick'))
if (shot) {
shot.setAttribute('role', 'tabpanel')
shot.setAttribute('aria-labelledby', button.id)
}
button.addEventListener('click', function () { select(index, false) })
})
picks.addEventListener('keydown', function (event) {
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
picks.setAttribute('role', 'tablist')
picks.setAttribute('aria-label', TRAY_LABEL)
picks.hidden = false
tray.classList.add('is-stacked')
select(0, false)
}
function initCases(root) {
var list = root.querySelector('[data-ms-cases]')
var hint = root.querySelector('[data-ms-cases-hint]')
if (!list) return
var heads = list.querySelectorAll('[data-ms-case-head]')
if (!heads.length) return
function bodyOf(head) {
return document.getElementById(head.id.replace('-head-', '-body-'))
}
function apply(head, isOpen) {
var body = bodyOf(head)
head.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
if (body) body.hidden = !isOpen
}
forEach(heads, function (head) {
var body = bodyOf(head)
head.setAttribute('role', 'button')
head.setAttribute('tabindex', '0')
if (body) {
head.setAttribute('aria-controls', body.id)
body.setAttribute('role', 'region')
body.setAttribute('aria-labelledby', head.id)
}
apply(head, false)
head.addEventListener('click', function () {
apply(head, head.getAttribute('aria-expanded') !== 'true')
})
head.addEventListener('keydown', function (event) {
if (event.key !== 'Enter' && event.key !== ' ') return
event.preventDefault()
apply(head, head.getAttribute('aria-expanded') !== 'true')
})
})
if (hint) {
hint.textContent = CASES_HINT
hint.hidden = false
}
}
function initBars(root) {
var bars = root.querySelector('[data-ms-bars]')
if (!bars || !hasObserver()) return
bars.classList.add('is-armed')
var observer = new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (!entry.isIntersecting) return
entry.target.classList.add('is-filled')
observer.unobserve(entry.target)
})
}, { threshold: 0.3 })
observer.observe(bars)
}
function initReveal(root) {
var blocks = root.querySelectorAll('[data-ms-reveal]')
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
var sticky = root.querySelector('[data-ms-sticky]')
var heroCta = root.querySelector('.ms-hero .ms-cta')
if (!sticky || !heroCta) return
sticky.hidden = false
if (!hasObserver()) {
sticky.classList.add('is-visible')
return
}
var heroVisible = false
var tailVisible = false
var tail = root.querySelectorAll('.ms-close__buy, .ms-social, .ms-footer')
function update() {
sticky.classList.toggle('is-visible', !heroVisible && !tailVisible)
}
new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) { heroVisible = entry.isIntersecting })
update()
}, { rootMargin: STICKY_REVEAL_MARGIN }).observe(heroCta)
var tailObserver = new window.IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
entry.target.setAttribute('data-ms-tail-visible', entry.isIntersecting ? 'true' : 'false')
})
tailVisible = Array.prototype.some.call(tail, function (element) {
return element.getAttribute('data-ms-tail-visible') === 'true'
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
initTray(root)
initCases(root)
initBars(root)
initReveal(root)
initSticky(root)
}
if (document.readyState === 'loading') {
document.addEventListener('DOMContentLoaded', init)
} else {
init()
}
})()

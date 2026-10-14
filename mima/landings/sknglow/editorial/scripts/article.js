	;(function () {
		'use strict'

		var ROOT_SELECTOR = '.sg-lp'
		// build:config — lo escribe build.mjs, uno por artículo
		var READY_FLAG = 'sgArticleReady'
		// /build:config

		var CTA_SELECTOR = '.sg-cta'

		var JS_CLASS = 'is-js'
		var RAIL_CLASS = 'is-rail'
		var ENTERED_CLASS = 'is-in'
		var LIVE_CLASS = 'is-live'
		var BUYBAR_ON_CLASS = 'is-on'

		// La barra de compra sale cuando el titular que presenta el producto ha
		// subido hasta la mitad de la pantalla
		var BUYBAR_TRIGGER = 0.5
		// Una entrada se da por hecha cuando asoma este tanto del bloque
		var ENTER_THRESHOLD = 0.12

		// Vista previa local: dónde están en el repo las imágenes del producto
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

		// Solo en la vista previa local: una imagen que aún no está en el CDN se lee
		// de los assets del repo. En producción no hace nada.
		function initLocalFallback(root) {
			if (!isLocalPreview()) return

			forEach(root.querySelectorAll('img'), function (image) {
				function useLocal() {
					var name = (image.getAttribute('src') || '').split('?')[0].split('/').pop()
					// La marca evita el bucle si tampoco está en el repo
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

		// Un solo escuchador de scroll para todo, a ritmo de fotograma
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

		// El barrido del CTA solo corre mientras el botón está a la vista
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

		// Carril deslizable con flechas y puntos. El índice sale de la tarjeta cuyo
		// punto de encaje queda más cerca del scroll, nunca de una proporción.
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

			// Dónde tiene que quedar el scroll para que una tarjeta encaje: al inicio
			// de la pista en móvil, centrada desde 600px (lo decide el CSS)
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
			// Las imágenes del carril cargan en diferido y cambian su ancho
			forEach(track.querySelectorAll('img'), function (image) {
				if (!image.complete) image.addEventListener('load', sync)
			})

			rail.classList.add(RAIL_CLASS)
			sync()
		}

		// Sale cuando el relato ya presentó el producto y se retira donde la
		// página trae su propio botón de compra a la vista (la oferta, el final).
		// Solo en móvil: en escritorio es la tarjeta del margen y el CSS la deja
		// siempre a la vista.
		function initBuybar(root) {
			var bar = root.querySelector('[data-sg-buybar]')
			var from = root.querySelector('[data-sg-product-revealed]')
			if (!bar) return

			if (!from) {
				bar.classList.add(BUYBAR_ON_CLASS)
				return
			}

			var offer = root.querySelector('[data-sg-offer]')
			// El relevo es el botón de la oferta, no la tarjeta: si abre con una foto,
			// su botón llega una pantalla después y la barra no debe irse antes
			var handoff = offer ? (offer.querySelector(CTA_SELECTOR) || offer) : null

			onScrollFrame(function () {
				var presented = from.getBoundingClientRect().top < window.innerHeight * BUYBAR_TRIGGER
				// Desde ese botón hasta el final de la página, él y el del cierre
				// hacen su trabajo
				var atOffer = handoff ? handoff.getBoundingClientRect().top < window.innerHeight : false
				bar.classList.toggle(BUYBAR_ON_CLASS, presented && !atOffer)
			})
		}

		// Visor de láminas. Sin <dialog> no se engancha nada y el enlace abre el archivo.
		function initViewer(root) {
			var viewer = root.querySelector('[data-sg-viewer]')
			if (!viewer || typeof viewer.showModal !== 'function') return

			var scroller = viewer.querySelector('[data-sg-viewer-scroll]')
			var image = viewer.querySelector('[data-sg-viewer-image]')
			var close = viewer.querySelector('[data-sg-viewer-close]')
			if (!scroller || !image) return

			// La lámina abre centrada: lo que se viene a leer suele estar en medio
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

			// Tocar fuera de la lámina la cierra
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

			// Lo que esconde contenido hasta que entra depende del observador: sin
			// él no se arma nada y la página queda entera a la vista
			if (!hasObserver()) return

			root.classList.add(JS_CLASS)
			initEntrances(root)
			initCtaLife(root)
			initBuybar(root)
		}

		// GemPages puede montar el bloque después de DOMContentLoaded
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', init)
		} else {
			init()
		}
	})()

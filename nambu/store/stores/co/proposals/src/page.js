// Comportamiento de la maqueta: carriles, barra fija del kit, cabecera que se pliega y herramientas de revisión.
// Mismo criterio que el tema: sin JS todo se ve y los carriles se deslizan con el dedo.
(() => {
	const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

	// Carriles: el índice sale de la tarjeta más cercana al punto de encaje, nunca de una proporción
	const initRail = (rail) => {
		const track = rail.querySelector('[data-track]')
		const prev = rail.querySelector('[data-prev]')
		const next = rail.querySelector('[data-next]')
		if (!track) return
		const items = () => Array.from(track.children)
		const padding = () => parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0
		const current = () => {
			const start = track.getBoundingClientRect().left + padding()
			let best = 0
			let distance = Infinity
			items().forEach((item, index) => {
				const delta = Math.abs(item.getBoundingClientRect().left - start)
				if (delta < distance) {
					distance = delta
					best = index
				}
			})
			return best
		}
		const go = (index) => {
			const list = items()
			const item = list[Math.max(0, Math.min(list.length - 1, index))]
			if (!item) return
			const left = item.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft - padding()
			track.scrollTo({ left, behavior: reducedMotion() ? 'auto' : 'smooth' })
		}
		const sync = () => {
			const max = track.scrollWidth - track.clientWidth
			if (prev) prev.disabled = track.scrollLeft <= 1
			if (next) next.disabled = track.scrollLeft >= max - 1
		}
		prev?.addEventListener('click', () => go(current() - 1))
		next?.addEventListener('click', () => go(current() + 1))
		track.addEventListener('scroll', sync, { passive: true })
		window.addEventListener('resize', sync)
		sync()
	}
	document.querySelectorAll('[data-rail]').forEach(initRail)

	// Portada: las fotos rotan cuando la barra activa termina de llenarse (CSS). Sin animaciones no rota sola.
	const kitHeroSection = document.querySelector('.nb-kithero')
	const initStage = (hero) => {
		const slides = Array.from(hero.querySelectorAll('[data-slide]'))
		const bars = Array.from(hero.querySelectorAll('[data-go]'))
		const who = hero.querySelector('[data-who]')
		const stage = hero.querySelector('[data-stage]')
		if (slides.length < 2 || !stage) return
		let index = 0
		const show = (next) => {
			index = (next + slides.length) % slides.length
			slides.forEach((slide, position) => {
				slide.classList.toggle('is-active', position === index)
				slide.setAttribute('aria-hidden', String(position !== index))
			})
			bars.forEach((bar, position) => {
				bar.classList.toggle('is-active', position === index)
				bar.classList.toggle('is-done', position < index)
				bar.toggleAttribute('aria-current', position === index)
			})
			if (who) who.textContent = slides[index].dataset.name ?? ''
		}
		bars.forEach((bar, position) => bar.addEventListener('click', () => show(position)))
		hero.addEventListener('animationend', (event) => {
			if (event.animationName === 'nb-fill') show(index + 1)
		})
		// Se pausa con el ratón encima y cuando la portada sale de pantalla
		let hovered = false
		let visible = true
		const syncPause = () => hero.toggleAttribute('data-paused', hovered || !visible)
		stage.addEventListener('pointerenter', () => {
			hovered = true
			syncPause()
		})
		stage.addEventListener('pointerleave', () => {
			hovered = false
			syncPause()
		})
		new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting
			syncPause()
		}).observe(hero)
	}
	if (kitHeroSection) initStage(kitHeroSection)

	// Elige por necesidad: pestañas (flechas, Inicio y Fin). Sin JS se ven todos los productos seguidos.
	const finder = document.querySelector('[data-finder]')
	if (finder) {
		const tabs = Array.from(finder.querySelectorAll('[role="tab"]'))
		const panels = Array.from(finder.querySelectorAll('[data-panel]'))
		const select = (index, focus = false) => {
			tabs.forEach((tab, position) => {
				const on = position === index
				tab.setAttribute('aria-selected', String(on))
				tab.tabIndex = on ? 0 : -1
			})
			panels.forEach((panel, position) => {
				panel.hidden = position !== index
			})
			if (!focus) return
			tabs[index].focus()
			tabs[index].scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reducedMotion() ? 'auto' : 'smooth' })
		}
		const KEYS = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
		tabs.forEach((tab, position) => {
			tab.addEventListener('click', () => select(position))
			tab.addEventListener('keydown', (event) => {
				const last = tabs.length - 1
				let target = null
				if (event.key in KEYS) target = (position + KEYS[event.key] + tabs.length) % tabs.length
				if (event.key === 'Home') target = 0
				if (event.key === 'End') target = last
				if (target === null) return
				event.preventDefault()
				select(target, true)
			})
		})
		select(0)
	}

	// Cabecera: si el menú no cabe en una línea pasa al desplegable (igual que <site-header> del tema)
	const header = document.querySelector('site-header')
	const nav = header?.querySelector('[data-nav]')
	const fitHeader = () => {
		if (!header || !nav) return
		header.removeAttribute('data-compact')
		if (getComputedStyle(nav).display === 'none') return
		header.toggleAttribute('data-compact', nav.scrollWidth > nav.clientWidth + 1)
	}
	if (header && nav) {
		new ResizeObserver(fitHeader).observe(header)
		document.fonts?.ready.then(fitHeader)
	}

	// Barra fija del kit: aparece al pasar la portada y se aparta al llegar al correo y al pie
	const sticky = document.querySelector('[data-sticky-kit]')
	const kitHero = document.getElementById('kit-hero')
	const news = document.getElementById('newsletter')
	if (sticky && kitHero && news) {
		let pastHero = false
		let atEnd = false
		const update = () => {
			const on = pastHero && !atEnd
			sticky.classList.toggle('is-on', on)
			sticky.inert = !on
		}
		new IntersectionObserver(([entry]) => {
			pastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0
			update()
		}).observe(kitHero)
		new IntersectionObserver(([entry]) => {
			atEnd = entry.isIntersecting || entry.boundingClientRect.top < 0
			update()
		}).observe(news)
	}

	// Botones de compra y correo: en la maqueta solo avisan de lo que harían en la tienda
	const toast = document.querySelector('[data-pv-toast]')
	let toastTimer = 0
	const say = (message) => {
		if (!toast) return
		toast.textContent = message
		toast.hidden = false
		clearTimeout(toastTimer)
		toastTimer = setTimeout(() => {
			toast.hidden = true
		}, 3200)
	}
	document.addEventListener('click', (event) => {
		const button = event.target.closest('[data-add]')
		if (!button) return
		const item = button.dataset.add === 'kit' ? 'el kit' : 'este producto'
		say(`En la tienda, este botón agrega ${item} al carrito.`)
	})
	document.querySelector('[data-news]')?.addEventListener('submit', (event) => {
		event.preventDefault()
		say('En la tienda, Klaviyo envía el cupón del 10% a ese correo.')
	})
})()

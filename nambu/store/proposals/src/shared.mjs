// Piezas comunes a las dos propuestas: iconos, imágenes, botones, medios de pago,
// el marco de la maqueta y el JS de la tienda (vistas, carrito, filtros, carriles).
import { ASSETS, SHARED_ASSETS, MOCK, PRICE } from './content.mjs'

const stroke = paths => `<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`

export const ICON = {
	menu: stroke('<path d="M4 8h16M4 16h16"/>'),
	search: stroke('<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>'),
	user: stroke('<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5"/>'),
	bag: stroke('<path d="M5 8.5h14l-1.1 11.1a1.6 1.6 0 0 1-1.6 1.4H7.7a1.6 1.6 0 0 1-1.6-1.4Z"/><path d="M8.8 8.5V7a3.2 3.2 0 0 1 6.4 0v1.5"/>'),
	close: stroke('<path d="M6 6l12 12M18 6 6 18"/>'),
	plus: stroke('<path d="M12 5v14M5 12h14"/>'),
	minus: stroke('<path d="M5 12h14"/>'),
	left: stroke('<path d="M15 5l-7 7 7 7"/>'),
	right: stroke('<path d="M9 5l7 7-7 7"/>'),
	arrow: stroke('<path d="M5 12h14M13 6l6 6-6 6"/>'),
	chevron: stroke('<path d="m6 9 6 6 6-6"/>'),
	truck: stroke('<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/>'),
	lock: stroke('<rect x="5" y="10.5" width="14" height="9.5" rx="2.4"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>'),
	chat: stroke('<path d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.6Z"/><path d="M9 10.5c.4 2 2 3.6 4 4"/>'),
	shield: stroke('<path d="M12 3.5 19 6v5.5c0 4.3-3 7.7-7 9-4-1.3-7-4.7-7-9V6Z"/><path d="m9 12 2.2 2.2L15.5 10"/>'),
	box: stroke('<path d="M4 7.5 12 4l8 3.5v9L12 20l-8-3.5Z"/><path d="M4 7.5 12 11l8-3.5M12 11v9"/>'),
	check: stroke('<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
	info: stroke('<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8v.2"/>'),
	leaf: stroke('<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14Z"/><path d="M5 19 13 11"/>'),
	drop: stroke('<path d="M12 3.5c3.2 4 5 7 5 9.5a5 5 0 0 1-10 0c0-2.5 1.8-5.5 5-9.5Z"/><path d="M9.8 13.5a2.3 2.3 0 0 0 2.2 2"/>'),
	sun: stroke('<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>'),
	trash: stroke('<path d="M5 7h14M10 7V5h4v2M7 7l.8 12a1.5 1.5 0 0 0 1.5 1.4h5.4a1.5 1.5 0 0 0 1.5-1.4L17 7"/>'),
	repeat: stroke('<path d="M4 11V9.5A3.5 3.5 0 0 1 7.5 6H19m0 0-3-3m3 3-3 3M20 13v1.5a3.5 3.5 0 0 1-3.5 3.5H5m0 0 3 3m-3-3 3-3"/>'),
	mail: stroke('<rect x="3.5" y="5.5" width="17" height="13" rx="2.4"/><path d="m4.5 7 7.5 6 7.5-6"/>'),
	pin: stroke('<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z"/><circle cx="12" cy="10" r="2.3"/>')
}

export const price = (cls = 'price') => `<span class="${cls}">${PRICE.label} <small>${PRICE.currency}</small></span>`

// Imagen local del repo (assets del spray) o remota (CDN de Shopify con ?width=)
export const img = ({ file, src, w, h, alt = '', cls = '', eager = false, sizes = '100vw', width = 900, base = ASSETS }) => {
	const url = src ? `${src}?width=${width}` : `${base}${file}`
	return `<img class="${cls}" src="${url}" width="${w}" height="${h}" alt="${alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'} sizes="${sizes}">`
}

// Botones de la tienda: sin animación, solo estados (hover, foco, deshabilitado)
export const btn = (label, { cls = '', attrs = '', icon = '' } = {}) => `<button type="button" class="btn ${cls}" ${attrs}>${icon}<span>${label}</span></button>`

export const payLogos = () => `<ul class="pay" aria-label="Medios de pago">
	<li><img src="${SHARED_ASSETS}landings-shared-pay-visa.webp" width="60" height="38" alt="Visa" loading="lazy"></li>
	<li><img src="${SHARED_ASSETS}landings-shared-pay-mastercard.webp" width="60" height="38" alt="Mastercard" loading="lazy"></li>
	<li class="mock">${MOCK.otherPayments}</li>
</ul>`

export const mock = text => `<span class="mock">${text}</span>`

// Marco de la maqueta: no es parte del diseño. Cambia de vista y enlaza la otra propuesta.
export const frame = ({ name, other, otherHref }) => `<div class="pv" role="region" aria-label="Controles de la maqueta">
	<p class="pv__name"><span>Nambu MX</span> ${name}</p>
	<nav class="pv__views" aria-label="Vista">
		<a href="#inicio" data-pv-view="inicio">Inicio</a>
		<a href="#tienda" data-pv-view="tienda">Tienda</a>
		<a href="#producto" data-pv-view="producto">Producto</a>
		<button type="button" data-pv-cart>Carrito</button>
	</nav>
	<p class="pv__legend"><span class="mock">punteado</span> = dato por definir · "Próximamente" = catálogo de ejemplo</p>
	<a class="pv__other" href="${otherHref}">${other} →</a>
</div>`

export const FRAME_CSS = `
	.pv { position: relative; z-index: 60; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 18px; padding: 9px 16px; background: #111512; color: #e9efe7; font: 13px/1.3 'Questrial', system-ui, sans-serif; }
	.pv p { margin: 0; }
	.pv__name span { color: #8bd46c; margin-right: 6px; }
	.pv__views { display: flex; gap: 4px; }
	.pv__views a, .pv__views button { padding: 5px 11px; border: 0; border-radius: 999px; background: transparent; color: inherit; font: inherit; text-decoration: none; cursor: pointer; }
	.pv__views a:hover, .pv__views button:hover { background: rgba(255, 255, 255, .08); }
	.pv__views a[aria-current="page"] { background: #6fc350; color: #0f2e0b; }
	.pv__legend { color: #a9b4a6; }
	.pv__legend .mock { color: #ffd68a; text-decoration-color: #ffd68a; }
	.pv__other { margin-left: auto; color: #8bd46c; text-decoration: none; }
	@media (max-width: 760px) { .pv__legend { display: none; } .pv { gap: 6px 10px; padding: 8px 10px; } .pv__views a, .pv__views button { padding: 5px 8px; } }

	/* Dato que aún no existe: subrayado punteado ámbar, ajeno a la paleta a propósito */
	.mock { text-decoration: underline dotted #c98a00 2px; text-underline-offset: 4px; }
	li.mock, .pay .mock { text-decoration: none; outline: 1.5px dashed #c98a00; outline-offset: 2px; border-radius: 6px; }
`

// Lo que hace la tienda en las dos propuestas: vistas, carrito, filtros, buscador y carriles
export const STORE_JS = `
	const root = document.querySelector('[data-store]')
	if (!root) return
	const UNIT_PRICE = ${PRICE.amount}
	const money = n => '$' + n.toLocaleString('es-MX') + ' MXN'
	const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
	const VIEWS = ['inicio', 'tienda', 'producto']
	root.classList.add('is-js')

	// Vistas: cada una es una plantilla del mismo tema
	const views = root.querySelectorAll('[data-view]')
	const showView = () => {
		const hash = location.hash.slice(1)
		const anchor = hash && !VIEWS.includes(hash) ? root.querySelector('#' + CSS.escape(hash)) : null
		const id = VIEWS.includes(hash) ? hash : anchor?.closest('[data-view]')?.dataset.view || 'inicio'
		views.forEach(v => { v.hidden = v.dataset.view !== id })
		document.querySelectorAll('[data-pv-view]').forEach(a => {
			if (a.dataset.pvView === id) a.setAttribute('aria-current', 'page')
			else a.removeAttribute('aria-current')
		})
		if (anchor) anchor.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
		else window.scrollTo(0, 0)
	}
	addEventListener('hashchange', showView)

	// Carrito
	const cart = { qty: 0 }
	const drawer = root.querySelector('[data-cart]')
	const counts = root.querySelectorAll('[data-cart-count]')
	let lastFocus = null
	const renderCart = () => {
		counts.forEach(c => { c.textContent = cart.qty; c.hidden = cart.qty === 0 })
		if (!drawer) return
		drawer.classList.toggle('is-empty', cart.qty === 0)
		drawer.querySelectorAll('[data-line-qty]').forEach(n => { n.textContent = cart.qty })
		drawer.querySelectorAll('[data-line-total], [data-subtotal]').forEach(n => { n.textContent = money(UNIT_PRICE * cart.qty) })
		drawer.querySelectorAll('[data-cart-title]').forEach(n => { n.textContent = cart.qty ? 'Tu carrito (' + cart.qty + ')' : 'Tu carrito' })
	}
	const openCart = () => {
		if (!drawer) return
		lastFocus = document.activeElement
		drawer.hidden = false
		requestAnimationFrame(() => drawer.classList.add('is-open'))
		document.documentElement.classList.add('is-locked')
		drawer.querySelector('[data-cart-close]:not([tabindex])')?.focus({ preventScroll: true })
	}
	const closeCart = () => {
		if (!drawer || drawer.hidden) return
		drawer.classList.remove('is-open')
		document.documentElement.classList.remove('is-locked')
		setTimeout(() => { drawer.hidden = true }, reduced ? 0 : 360)
		lastFocus?.focus?.({ preventScroll: true })
	}
	const pickedQty = t => Number(t.closest('[data-buybox]')?.querySelector('[data-qty-value]')?.textContent || 1)
	root.addEventListener('click', e => {
		const t = e.target.closest('button, a')
		if (!t) return
		if (t.matches('[data-add]')) { cart.qty += pickedQty(t); renderCart(); openCart() }
		else if (t.matches('[data-open-cart]')) { e.preventDefault(); openCart() }
		else if (t.matches('[data-cart-close]')) closeCart()
		else if (t.matches('[data-line-inc]')) { cart.qty++; renderCart() }
		else if (t.matches('[data-line-dec]')) { cart.qty = Math.max(0, cart.qty - 1); renderCart() }
		else if (t.matches('[data-line-remove]')) { cart.qty = 0; renderCart() }
		else if (t.matches('[data-qty-inc], [data-qty-dec]')) {
			const out = t.closest('[data-qty]').querySelector('[data-qty-value]')
			out.textContent = Math.max(1, Number(out.textContent) + (t.matches('[data-qty-inc]') ? 1 : -1))
		}
		else if (t.matches('[data-menu-toggle]')) {
			const menu = root.querySelector('[data-menu]')
			const open = t.getAttribute('aria-expanded') !== 'true'
			t.setAttribute('aria-expanded', String(open))
			menu.hidden = !open
		}
		else if (t.closest('[data-menu]') && t.matches('a')) {
			root.querySelector('[data-menu]').hidden = true
			root.querySelector('[data-menu-toggle]')?.setAttribute('aria-expanded', 'false')
		}
		else if (t.matches('[data-checkout]')) { e.preventDefault(); t.querySelector('span').textContent = 'Aquí empieza el checkout de Shopify' }
		else if (t.matches('[data-filter-btn]')) filterBy(t)
	})
	document.querySelector('[data-pv-cart]')?.addEventListener('click', () => { if (!cart.qty) { cart.qty = 1; renderCart() } openCart() })
	addEventListener('keydown', e => {
		if (e.key === 'Escape') closeCart()
		if (e.key !== 'Tab' || !drawer || drawer.hidden) return
		const f = [...drawer.querySelectorAll('button:not([tabindex]), a[href]')].filter(n => n.offsetParent)
		if (!f.length) return
		if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus() }
		else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus() }
	})
	renderCart()

	// Filtros por colección y buscador: actúan sobre la rejilla de su mismo bloque
	function applyFilter (box) {
		const col = box.dataset.active || 'all'
		const q = (box.querySelector('[data-search]')?.value || '').trim().toLowerCase()
		let shown = 0
		box.querySelectorAll('[data-collection]').forEach(card => {
			const ok = (col === 'all' || card.dataset.collection === col) && (!q || card.dataset.name.includes(q))
			card.hidden = !ok
			if (ok) shown++
		})
		box.querySelectorAll('[data-filter-count]').forEach(n => { n.textContent = shown === 1 ? '1 producto' : shown + ' productos' })
		box.querySelectorAll('[data-empty]').forEach(n => { n.hidden = shown > 0 })
	}
	function filterBy (btn) {
		const box = btn.closest('[data-filter]')
		box.dataset.active = btn.dataset.filterBtn
		box.querySelectorAll('[data-filter-btn]').forEach(b => b.setAttribute('aria-pressed', String(b === btn)))
		applyFilter(box)
	}
	root.querySelectorAll('[data-search]').forEach(input => input.addEventListener('input', () => applyFilter(input.closest('[data-filter]'))))
	root.querySelectorAll('[data-filter]').forEach(applyFilter)

	// Carriles con scroll-snap: el índice sale de la tarjeta más cercana al punto de encaje
	root.querySelectorAll('[data-rail]').forEach(wrap => {
		const track = wrap.querySelector('[data-track]')
		const items = [...track.children]
		const prev = wrap.querySelector('[data-prev]')
		const next = wrap.querySelector('[data-next]')
		const dots = [...wrap.querySelectorAll('[data-dot]')]
		const pad = () => parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0
		const current = () => {
			const start = track.getBoundingClientRect().left + pad()
			let best = 0, dist = Infinity
			items.forEach((it, i) => { const d = Math.abs(it.getBoundingClientRect().left - start); if (d < dist) { dist = d; best = i } })
			return best
		}
		const go = i => { const it = items[Math.max(0, Math.min(items.length - 1, i))]; track.scrollTo({ left: it.offsetLeft - track.offsetLeft - pad(), behavior: reduced ? 'auto' : 'smooth' }) }
		const sync = () => {
			const i = current()
			const max = track.scrollWidth - track.clientWidth
			if (prev) prev.disabled = track.scrollLeft <= 2
			if (next) next.disabled = track.scrollLeft >= max - 2
			dots.forEach((d, k) => d.setAttribute('aria-current', k === i ? 'true' : 'false'))
		}
		prev?.addEventListener('click', () => go(current() - 1))
		next?.addEventListener('click', () => go(current() + 1))
		dots.forEach((d, k) => d.addEventListener('click', () => go(k)))
		track.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true })
		addEventListener('resize', sync)
		addEventListener('hashchange', () => requestAnimationFrame(sync))
		sync()
	})

	// Barra fija de compra en la ficha: sale cuando el botón principal deja la pantalla
	const sticky = root.querySelector('[data-sticky]')
	if (sticky && 'IntersectionObserver' in window) {
		const watch = new IntersectionObserver(([en]) => sticky.classList.toggle('is-on', !en.isIntersecting && en.boundingClientRect.top < 0 && !root.querySelector('[data-view="producto"]').hidden), { rootMargin: '0px 0px -40% 0px' })
		root.querySelectorAll('[data-sticky-anchor]').forEach(n => watch.observe(n))
		addEventListener('hashchange', () => sticky.classList.remove('is-on'))
	}

	showView()
`

export const ROOT_CSS = `
	@font-face { font-family: 'Questrial'; src: url('https://nambuoficial.com/cdn/fonts/questrial/questrial_n4.66abac5d8209a647b4bf8089b0451928ef144c07.woff2') format('woff2'); font-weight: 400; font-display: swap; }
	:root {
		--apple: #6fc350; --apple-hover: #5fb343; --apple-press: #53a238; --apple-deep: #2f7d22; --apple-ink: #0f2e0b;
		--apple-50: #f5fbf1; --apple-100: #e8f6e0; --apple-200: #cfeebf;
		--white: #fff; --ink: #0f1a10; --text: #4d5a4f; --muted: #5c685e; --line: #e5eee1; --line-strong: #d3e1cd;
		--font: 'Questrial', 'Helvetica Neue', Helvetica, Arial, sans-serif;
		--ease: cubic-bezier(.2, .7, .2, 1);
		--ease-out: cubic-bezier(.16, 1, .3, 1);
	}
	*, *::before, *::after { box-sizing: border-box; }
	html { -webkit-text-size-adjust: 100%; scroll-padding-top: 90px; }
	html.is-locked { overflow: hidden; }
	body { margin: 0; background: var(--white); color: var(--text); font: 16px/1.6 var(--font); -webkit-font-smoothing: antialiased; }
	::selection { background: var(--apple-200); color: var(--apple-ink); }
	img { display: block; max-width: 100%; height: auto; }
	svg { display: block; }
	h1, h2, h3, p, ul, ol, figure, blockquote, dl, dd { margin: 0; }
	h1, h2, h3 { color: var(--ink); font-weight: 400; text-wrap: balance; }
	ul, ol { padding: 0; list-style: none; }
	button, input { margin: 0; font: inherit; color: inherit; }
	button { padding: 0; border: 0; background: none; cursor: pointer; }
	a { color: var(--apple-deep); text-underline-offset: 3px; }
	strong { font-weight: 400; color: var(--ink); }
	:focus-visible { outline: 2px solid var(--apple-deep); outline-offset: 3px; border-radius: 8px; }
	[hidden] { display: none !important; }
	.ic { width: 22px; height: 22px; flex: none; }
	.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
	.pay { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
	.pay img { width: 46px; height: auto; border-radius: 6px; box-shadow: inset 0 0 0 1px var(--line); }
	.pay li.mock { padding: 3px 8px; font-size: 12px; color: var(--muted); }
	.price { color: var(--ink); white-space: nowrap; font-variant-numeric: tabular-nums; }
	.price small { font-size: .62em; color: var(--muted); letter-spacing: .3px; }

	/* Botones de la tienda: quietos. Solo cambian de tono al pasar, al pulsar y al enfocar */
	.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 52px; padding: 12px 24px; border-radius: 999px; background: var(--apple); color: var(--apple-ink); font-size: 16px; line-height: 1.2; text-align: center; text-decoration: none; white-space: nowrap; transition: background-color 160ms ease, box-shadow 160ms ease, color 160ms ease; }
	.btn:hover { background: var(--apple-hover); box-shadow: 0 8px 18px -12px rgba(47, 125, 34, .7); }
	.btn:active { background: var(--apple-press); box-shadow: none; }
	.btn .ic { width: 18px; height: 18px; }
	.btn[disabled] { background: var(--apple-50); color: var(--muted); box-shadow: inset 0 0 0 1px var(--line); cursor: not-allowed; }
	.btn--block { display: flex; width: 100%; }
	.btn--ghost { background: var(--white); color: var(--ink); box-shadow: inset 0 0 0 1.5px var(--ink); }
	.btn--ghost:hover { background: var(--apple-50); box-shadow: inset 0 0 0 1.5px var(--ink); }
	.btn--ghost:active { background: var(--apple-100); }
	.btn--sm { min-height: 42px; padding: 9px 16px; font-size: 14px; }

	.qty { display: inline-flex; align-items: center; height: 52px; border-radius: 999px; background: var(--white); box-shadow: inset 0 0 0 1px var(--line-strong); }
	.qty button { display: grid; place-items: center; width: 44px; height: 100%; border-radius: 999px; color: var(--ink); transition: background-color 160ms ease; }
	.qty button:hover { background: var(--apple-50); }
	.qty .ic { width: 18px; height: 18px; }
	.qty output { min-width: 20px; text-align: center; color: var(--ink); font-size: 17px; font-variant-numeric: tabular-nums; }
	.qty--sm { height: 40px; }
	.qty--sm button { width: 36px; }

	.round { display: grid; place-items: center; width: 44px; height: 44px; flex: none; border-radius: 999px; background: var(--white); box-shadow: inset 0 0 0 1px var(--line-strong); color: var(--ink); transition: background-color 160ms ease, opacity 160ms ease; }
	.round:hover { background: var(--apple-50); }
	.round[disabled] { opacity: .35; cursor: default; }
	.round .ic { width: 18px; height: 18px; }
	.arrows { display: flex; gap: 8px; }
	.dots { display: flex; justify-content: center; gap: 2px; }
	.dot { width: 26px; height: 26px; display: grid; place-items: center; }
	.dot::before { content: ''; width: 8px; height: 8px; border-radius: 99px; background: var(--apple-200); transition: transform 220ms var(--ease), background-color 220ms ease; }
	.dot[aria-current="true"]::before { background: var(--apple-deep); transform: scaleX(2.4); }

	@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition-duration: 1ms !important; animation-duration: 1ms !important; } }
`

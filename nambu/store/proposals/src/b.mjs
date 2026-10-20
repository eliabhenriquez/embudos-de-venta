// Propuesta B · Compra rápida
// La tienda como herramienta de compra: buscador y categorías arriba, el spray en un banner
// compacto, tarjetas con botón + para agregar sin abrir la ficha y una fila para volver a
// pedir. Cabecera en cápsula, ficha con hoja y pestañas, carrito en hoja inferior.
import * as C from './content.mjs'
import { ICON, btn, img, price, payLogos, mock, frame, ROOT_CSS, FRAME_CSS, STORE_JS } from './shared.mjs'

const PRICE_TEXT = `${C.PRICE.label} ${C.PRICE.currency}`

const header = () => `
<header class="hd">
	<div class="hd__in">
		<a class="hd__logo" href="#inicio" aria-label="Nambu, inicio"><img src="${C.ASSETS}landings-nambu-wordmark-green.webp" width="568" height="138" alt="Nambu"></a>
		<nav class="hd__nav" aria-label="Principal">${C.NAV.map(([t, h]) => `<a href="${h}">${t}</a>`).join('')}</nav>
		<div class="hd__tools">
			<a class="hd__icon hd__wide" href="#" aria-label="Mi cuenta">${ICON.user}</a>
			<a class="hd__bag" href="#carrito" data-open-cart>${ICON.bag}<span>Carrito</span><span class="hd__count" data-cart-count hidden>0</span></a>
			<button class="hd__icon hd__menu" type="button" aria-label="Menú" aria-expanded="false" data-menu-toggle>${ICON.menu}</button>
		</div>
	</div>
	<nav class="hd__drop" aria-label="Menú móvil" data-menu hidden>${C.NAV.map(([t, h]) => `<a href="${h}">${t}</a>`).join('')}</nav>
</header>`

// Tarjeta con agregar directo: el + vive en la fila del precio, nunca encima de la foto
const card = p => {
	const media = img({ ...p.img, alt: p.name, cls: 'card__img', sizes: '(min-width: 1000px) 260px, 46vw', width: 700 })
	return `<li class="card" data-collection="${p.collection}" data-name="${p.name.toLowerCase()}">
		${p.available ? `<a class="card__media" href="#producto">${media}</a>` : `<div class="card__media">${media}</div>`}
		<h3 class="card__name">${p.available ? `<a href="#producto">${p.name}</a>` : p.name}</h3>
		<p class="card__type">${p.type}</p>
		<div class="card__row">
			${p.available ? price('price card__price') : `<span class="card__soon">${C.CTA.soon}</span>`}
			${p.available ? `<button type="button" class="add" aria-label="Agregar ${p.name} al carrito" data-add>${ICON.plus}</button>` : `<button type="button" class="add" aria-label="${p.name}: próximamente" disabled>${ICON.plus}</button>`}
		</div>
	</li>`
}

const finder = ({ title, id, products, showMore }) => `
<div class="finder" data-filter data-active="all">
	<div class="finder__bar">
		<label class="search"><span class="sr">Buscar productos</span>${ICON.search}<input type="search" placeholder="Busca un producto" data-search></label>
		<div class="chips" role="group" aria-label="Filtrar por categoría">
			<button type="button" class="chip" aria-pressed="true" data-filter-btn="all">Todo</button>
			${C.COLLECTIONS.map(c => `<button type="button" class="chip" aria-pressed="false" data-filter-btn="${c.id}">${c.name}</button>`).join('')}
		</div>
	</div>
	<section class="shelf" aria-labelledby="${id}">
		<div class="head"><h2 id="${id}" class="h2">${title}</h2><p class="head__count" data-filter-count aria-live="polite"></p></div>
		<ul class="grid">${products.map(card).join('')}</ul>
		<p class="empty" data-empty hidden>No encontramos productos con esa búsqueda.</p>
		${showMore ? `<a class="btn btn--ghost more" href="#tienda"><span>Ver toda la tienda</span></a>` : ''}
	</section>
</div>`

const banner = () => `
<section class="promo" aria-labelledby="promo-title">
	<a class="promo__media" href="#producto">${img({ ...C.SPRAY.banner, cls: 'promo__img', eager: true, sizes: '(min-width: 900px) 520px, 40vw', width: 1000 })}</a>
	<div class="promo__copy">
		<h1 id="promo-title" class="promo__title">${C.SPRAY.title}</h1>
		<p class="promo__sub">${C.SPRAY.size} · ${C.SPRAY.plants}</p>
		<p class="promo__lead">${C.SPRAY.lead}</p>
		<div class="promo__buy">${price('price promo__price')}${btn(C.CTA.add, { attrs: 'data-add', icon: ICON.plus })}</div>
		<a class="link promo__link" href="#producto">Ver producto${ICON.arrow}</a>
	</div>
</section>`

const reorder = () => `
<section class="reorder" aria-labelledby="reorder-title">
	<div class="reorder__copy">
		<span class="reorder__icon">${ICON.repeat}</span>
		<h2 id="reorder-title" class="h3">Vuelve a pedir en un toque</h2>
		<p>Inicia sesión y aquí verás lo que ya compraste, listo para pedirlo otra vez.</p>
		<a class="btn btn--ghost btn--sm" href="#"><span>Iniciar sesión</span></a>
	</div>
	<div class="reorder__example">
		<p class="reorder__label">${mock('Así lo ve un cliente que regresa')}</p>
		<article class="mini">
			<div class="mini__img">${img({ file: 'landings-spray-packshot.webp', w: 601, h: 1100, alt: '', sizes: '64px' })}</div>
			<div class="mini__info"><h3>${C.SPRAY.title}</h3><p>${C.SPRAY.size} · ${PRICE_TEXT}</p></div>
			${btn('Pedir de nuevo', { cls: 'btn--sm', attrs: 'data-add' })}
		</article>
	</div>
</section>`

const categories = () => `
<section class="cats" aria-labelledby="cats-title">
	<div class="head"><h2 id="cats-title" class="h2">Categorías</h2></div>
	<ul class="cats__list">${C.COLLECTIONS.map(c => {
		const live = C.CATALOG.some(p => p.collection === c.id && p.available)
		return `<li><a class="cat" href="#tienda">${img({ ...c.img, alt: '', cls: 'cat__img', sizes: '120px', width: 300 })}<span class="cat__name">${c.name}<small>${live ? 'Disponible' : C.CTA.soon}</small></span>${ICON.right}</a></li>`
	}).join('')}</ul>
</section>`

const spotlight = () => `
<section class="panel spot" aria-labelledby="spot-title">
	<div class="spot__copy">
		<h2 id="spot-title" class="h2">Por qué el ${C.SPRAY.short}</h2>
		<ul class="facts">${C.SPRAY.facts.map(f => `<li><span class="facts__icon">${ICON[f.icon]}</span><h3>${f.title}</h3><p>${f.text}</p></li>`).join('')}</ul>
		<div class="spot__act">${btn(C.CTA.add, { attrs: 'data-add', icon: ICON.plus })}<a class="link" href="#producto">Ver producto${ICON.arrow}</a></div>
	</div>
	<figure class="spot__media">${img({ ...C.SPRAY.people, cls: 'spot__img', sizes: '(min-width: 900px) 460px, 100vw' })}</figure>
</section>`

const voices = (id = 'h') => `
<section class="voices" aria-labelledby="voices-${id}" data-rail>
	<div class="head"><h2 id="voices-${id}" class="h2">${C.VOICES.title}</h2><div class="arrows"><button class="round" type="button" aria-label="Opinión anterior" data-prev>${ICON.left}</button><button class="round" type="button" aria-label="Opinión siguiente" data-next>${ICON.right}</button></div></div>
	<ul class="voices__track" data-track>${C.VOICES.items.map(v => {
		const p = C.PEOPLE[v.slug]
		return `<li class="voice">
			<div class="voice__who">${img({ ...p, alt: '', cls: 'voice__avatar', sizes: '48px' })}<p><strong>${p.name}</strong><span>${v.city} · ${C.SPRAY.short}</span></p></div>
			<p class="voice__quote">“${v.quote}”</p>
			<p class="voice__text">${v.text}</p>
		</li>`
	}).join('')}</ul>
</section>`

const trust = () => `
<section class="trust" id="ayuda" aria-labelledby="trust-title">
	<div class="head"><h2 id="trust-title" class="h2">Compra segura</h2></div>
	<ul class="trust__list">${C.TRUST.map(t => `<li><span class="trust__icon">${ICON[t.icon]}</span><div><h3>${t.title}</h3><p>${t.text()}</p></div></li>`).join('')}</ul>
	<ul class="trust__links">${C.HELP_LINKS.map(([t, h]) => `<li><a href="${h}">${t}</a></li>`).join('')}</ul>
</section>`

const footer = () => `
<footer class="ft" id="contacto">
	<img class="ft__logo" src="${C.ASSETS}landings-nambu-wordmark-green.webp" width="568" height="138" alt="Nambu" loading="lazy">
	<nav class="ft__links" aria-label="Pie">${[...C.FOOTER.shop.slice(0, 1), ...C.FOOTER.help].map(([t, h]) => `<a href="${h}">${t}</a>`).join('')}</nav>
	<p class="ft__contact">WhatsApp ${mock(C.MOCK.whatsapp)} · ${mock(C.MOCK.email)} · ${mock(C.MOCK.instagram)}</p>
	${payLogos()}
	<p class="ft__legal">© 2026 ${mock(C.MOCK.legalName)} · ${C.FOOTER.legal.map(([t, h]) => `<a href="${h}">${t}</a>`).join(' · ')}</p>
</footer>`

const pdp = () => `
<div class="pdp">
	<div class="gallery" data-rail>
		<ul class="gallery__track" data-track>
			${C.GALLERY.map((g, i) => `<li class="gallery__slide gallery__slide--${g.fit}">${img({ ...g, cls: 'gallery__img', eager: i === 0, sizes: '(min-width: 900px) 360px, 100vw' })}</li>`).join('')}
		</ul>
		<div class="gallery__bars" role="group" aria-label="Fotos del producto">${C.GALLERY.map((g, i) => `<button type="button" class="gallery__bar" aria-label="Foto ${i + 1}" data-dot></button>`).join('')}</div>
	</div>
	<div class="sheet" data-buybox>
		<nav class="crumbs" aria-label="Ruta"><a href="#inicio">Inicio</a><span aria-hidden="true">/</span><a href="#tienda">Respiración</a><span aria-hidden="true">/</span><span>${C.SPRAY.short}</span></nav>
		<div class="sheet__head">
			<h1 class="sheet__title">${C.SPRAY.title}</h1>
			<p class="sheet__price">${price()}</p>
		</div>
		<p class="sheet__sub">${C.SPRAY.size} · ${C.SPRAY.plants} · ${mock(C.MOCK.taxes)}</p>
		<ul class="sheet__pains">${C.DETAILS.pains.map(p => `<li>${p}</li>`).join('')}</ul>
		<div class="sheet__buy">
			<div class="qty" data-qty><button type="button" aria-label="Quitar uno" data-qty-dec>${ICON.minus}</button><output data-qty-value aria-live="polite">1</output><button type="button" aria-label="Agregar uno" data-qty-inc>${ICON.plus}</button></div>
			<div data-sticky-anchor>${btn(C.CTA.add, { cls: 'btn--block', attrs: 'data-add' })}</div>
		</div>
		${btn(C.CTA.buyNow, { cls: 'btn--ghost btn--block sheet__now', attrs: 'data-add' })}
		<ul class="sheet__trust">
			<li>${ICON.truck}<span>${mock(C.MOCK.shipping)}</span></li>
			<li>${ICON.lock}<span>Pago seguro</span></li>
			<li>${ICON.shield}<span>${mock('Garantía de entrega')}</span></li>
		</ul>
		<div class="info" data-seg data-value="details">
			<div class="seg" role="tablist" aria-label="Información del producto">${[['details', 'Detalles'], ['use', 'Uso'], ['plants', 'Ingredientes'], ['ship', 'Envío']].map(([v, t], i) => `<button type="button" role="tab" class="seg__btn" aria-selected="${i === 0}" data-seg-btn="${v}">${t}</button>`).join('')}</div>
			<div class="info__panel" data-seg-panel="details">${C.DETAILS.description.map(p => `<p>${p}</p>`).join('')}</div>
			<div class="info__panel" data-seg-panel="use" hidden><ul class="info__steps">${C.DETAILS.use.map(p => `<li>${ICON.check}${p}</li>`).join('')}</ul></div>
			<div class="info__panel" data-seg-panel="plants" hidden>${C.DETAILS.plants.map(p => `<p>${p}</p>`).join('')}<p class="small">${C.PLANTS.note}</p></div>
			<div class="info__panel" data-seg-panel="ship" hidden><p>${mock(C.MOCK.shipping + '. ' + C.MOCK.delivery + '.')}</p><p>${mock(C.MOCK.returns)}</p></div>
		</div>
	</div>
</div>
<section class="plants" aria-labelledby="plants-title" data-rail>
	<div class="head"><h2 id="plants-title" class="h2">${C.PLANTS.title}</h2></div>
	<ul class="plants__track" data-track>${C.PLANTS.items.map(p => `<li class="plant">${img({ ...p, alt: p.name, cls: 'plant__img', sizes: '(min-width: 900px) 380px, 78vw' })}<div><h3>${p.name}</h3><p>${p.text}</p></div></li>`).join('')}</ul>
</section>
${voices('p')}
<section class="faq" id="faq" aria-labelledby="faq-title">
	<div class="head"><h2 id="faq-title" class="h2">Preguntas frecuentes</h2></div>
	<div class="faq__list">${C.FAQ.map(f => `<details class="qa"><summary>${f.q}<span class="qa__sign">${ICON.chevron}</span></summary><div class="qa__a">${f.a.map(a => `<p>${a}</p>`).join('')}</div></details>`).join('')}</div>
</section>
<section class="shelf" aria-labelledby="more-title">
	<div class="head"><h2 id="more-title" class="h2">También en Nambu</h2><a class="link" href="#tienda">Ver todo${ICON.arrow}</a></div>
	<ul class="grid">${C.CATALOG.slice(1, 5).map(card).join('')}</ul>
</section>`

const sticky = () => `
<div class="sticky" data-sticky>
	<p><strong>${C.SPRAY.short} · ${C.SPRAY.size}</strong><span>${PRICE_TEXT}</span></p>
	${btn('Agregar', { attrs: 'data-add', icon: ICON.plus })}
</div>`

const drawer = () => `
<div class="drawer is-empty" data-cart hidden>
	<button class="drawer__scrim" type="button" tabindex="-1" aria-label="Cerrar carrito" data-cart-close></button>
	<aside class="drawer__panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">
		<span class="drawer__handle" aria-hidden="true"></span>
		<header class="drawer__hd">
			<h2 id="cart-title" data-cart-title>Tu carrito</h2>
			<button class="round" type="button" aria-label="Cerrar carrito" data-cart-close>${ICON.close}</button>
		</header>
		<div class="drawer__empty">
			<p>Tu carrito está vacío.</p>
			<a class="btn btn--ghost" href="#tienda" data-cart-close><span>Ver la tienda</span></a>
		</div>
		<div class="drawer__body">
			<article class="line">
				<div class="line__img">${img({ file: 'landings-spray-packshot.webp', w: 601, h: 1100, alt: '', sizes: '64px' })}</div>
				<div class="line__info"><h3>${C.SPRAY.title}</h3><p>${C.SPRAY.size}</p></div>
				<div class="qty qty--sm"><button type="button" aria-label="Quitar uno" data-line-dec>${ICON.minus}</button><output data-line-qty>1</output><button type="button" aria-label="Agregar uno" data-line-inc>${ICON.plus}</button></div>
			</article>
			<button type="button" class="line__remove" data-line-remove>${ICON.trash}Eliminar del carrito</button>
			<div class="sum">
				<p><span>Subtotal</span><span data-line-total>${PRICE_TEXT}</span></p>
				<p><span>Envío</span><span>Se calcula en el checkout</span></p>
				<p class="sum__total"><span>Total estimado</span><strong data-subtotal>${PRICE_TEXT}</strong></p>
				<p class="sum__note">${mock(C.MOCK.taxes)}</p>
			</div>
		</div>
		<footer class="drawer__ft">
			${btn(C.CTA.checkout, { cls: 'btn--block', attrs: 'data-checkout', icon: ICON.lock })}
			${payLogos()}
		</footer>
	</aside>
</div>`

const CSS = `
	.store { --shell: 1200px; --gut: 16px; --pad: 40px; --radius: 22px; --inset: 10px; }
	@media (min-width: 900px) { .store { --gut: 40px; --pad: 64px; --inset: 20px; } }
	main > [data-view] > * { width: 100%; max-width: calc(var(--shell) + var(--gut) * 2); margin: var(--pad) auto 0; padding-inline: var(--gut); }
	main > [data-view] > .pdp { padding-inline: 0; }
	main > [data-view] > .panel, main > [data-view] > .reorder { width: calc(100% - var(--inset) * 2); max-width: var(--shell); padding: 28px calc(var(--gut) - var(--inset) + 6px); }
	.h2 { font-size: 24px; line-height: 1.15; letter-spacing: -0.5px; }
	.h3 { font-size: 20px; line-height: 1.2; letter-spacing: -0.3px; }
	@media (min-width: 900px) { .h2 { font-size: 32px; letter-spacing: -1px; } .h3 { font-size: 24px; } }
	.head { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 16px; }
	.head__count { color: var(--muted); font-size: 14px; white-space: nowrap; }
	.panel { border-radius: 28px; background: var(--apple-50); }
	@media (min-width: 900px) { main > [data-view] > .panel { padding: 48px 56px; } }
	.link { display: inline-flex; align-items: center; gap: 6px; color: var(--ink); font-size: 15px; text-decoration: none; white-space: nowrap; transition: color 160ms ease; }
	.link:hover { color: var(--apple-deep); }
	.link .ic { width: 16px; height: 16px; color: var(--apple-deep); }
	.crumbs { display: flex; flex-wrap: wrap; gap: 8px; color: var(--muted); font-size: 13px; }
	.crumbs a { color: var(--muted); text-decoration: none; }
	main > [data-view] > .coll-head { margin-top: 14px; }
	.coll-title { margin-top: 8px; }
	main > [data-view] > .coll-head + .finder { margin-top: 14px; }

	/* Cabecera en cápsula */
	.hd { position: sticky; top: 0; z-index: 30; padding: 8px var(--inset); background: linear-gradient(var(--white) 70%, rgba(255, 255, 255, 0)); }
	.hd__in { display: flex; align-items: center; gap: 12px; max-width: calc(var(--shell) + 40px); margin: 0 auto; padding: 6px 6px 6px 16px; border-radius: 999px; background: var(--white); box-shadow: 0 0 0 1px var(--line), 0 12px 30px -24px rgba(15, 46, 11, .5); }
	.hd__logo img { width: 92px; height: auto; }
	.hd__nav { display: none; }
	.hd__tools { display: flex; align-items: center; gap: 4px; margin-left: auto; }
	.hd__icon { display: grid; place-items: center; width: 42px; height: 42px; border-radius: 999px; color: var(--ink); transition: background-color 160ms ease; }
	.hd__icon:hover { background: var(--apple-50); }
	.hd__wide { display: none; }
	.hd__bag { display: inline-flex; align-items: center; gap: 8px; height: 42px; padding: 0 14px; border-radius: 999px; background: var(--ink); color: var(--white); font-size: 14px; text-decoration: none; transition: background-color 160ms ease; }
	.hd__bag:hover { background: #24311f; }
	.hd__bag .ic { width: 18px; height: 18px; }
	.hd__count { min-width: 20px; height: 20px; padding: 0 6px; border-radius: 99px; background: var(--apple); color: var(--apple-ink); font-size: 12px; line-height: 20px; text-align: center; }
	.hd__drop { display: grid; gap: 2px; max-width: 520px; margin: 8px auto 0; padding: 8px; border-radius: 24px; background: var(--white); box-shadow: 0 0 0 1px var(--line), 0 20px 40px -24px rgba(15, 46, 11, .4); }
	.hd__drop a { padding: 14px 16px; border-radius: 16px; color: var(--ink); font-size: 18px; text-decoration: none; }
	.hd__drop a:hover { background: var(--apple-50); }
	@media (min-width: 900px) {
		.hd { padding-top: 14px; }
		.hd__in { padding-left: 24px; }
		.hd__logo img { width: 110px; }
		.hd__nav { display: flex; gap: 4px; margin-left: 28px; }
		.hd__nav a { padding: 9px 14px; border-radius: 999px; color: var(--ink); font-size: 15px; text-decoration: none; transition: background-color 160ms ease; }
		.hd__nav a:hover { background: var(--apple-50); }
		.hd__wide { display: grid; }
		.hd__menu, .hd__drop { display: none !important; }
	}

	/* Banner compacto del spray */
	main > [data-view] > .promo { margin-top: 10px; }
	.promo { display: grid; grid-template-columns: 38% 1fr; gap: 14px; align-items: center; }
	.promo__media { overflow: hidden; aspect-ratio: 4 / 5; border-radius: var(--radius); background: var(--apple-50); }
	.promo__img { width: 100%; height: 100%; object-fit: cover; }
	.promo__title { font-size: 22px; line-height: 1.12; letter-spacing: -0.5px; }
	.promo__sub { margin-top: 4px; color: var(--apple-deep); font-size: 13px; line-height: 1.35; }
	.promo__lead { display: none; }
	.promo__buy { display: grid; gap: 10px; margin-top: 12px; }
	.promo__price { font-size: 22px; }
	.promo__buy .btn { min-height: 44px; padding: 8px 14px; font-size: 14px; }
	.promo__link { display: none; }
	@media (min-width: 900px) {
		main > [data-view] > .promo { width: calc(100% - var(--inset) * 2); max-width: var(--shell); }
		.promo { grid-template-columns: 380px 1fr; gap: 56px; padding: 20px !important; border-radius: 32px; background: var(--apple-50); }
		.promo__media { aspect-ratio: 1; border-radius: 24px; }
		.promo__title { font-size: 46px; letter-spacing: -1.6px; }
		.promo__sub { margin-top: 10px; font-size: 16px; }
		.promo__lead { display: block; margin-top: 16px; font-size: 18px; line-height: 1.55; max-width: 44ch; }
		.promo__buy { display: flex; align-items: center; gap: 22px; margin-top: 28px; }
		.promo__price { font-size: 34px; letter-spacing: -0.6px; }
		.promo__buy .btn { min-height: 54px; padding: 12px 26px; font-size: 16px; }
		.promo__link { display: inline-flex; margin-top: 18px; }
	}

	/* Buscador y chips: la puerta de entrada de la compra */
	.finder__bar { position: sticky; top: 70px; z-index: 20; display: grid; gap: 10px; margin: 0 calc(var(--gut) * -1) 20px; padding: 8px var(--gut) 12px; background: var(--white); }
	.search { display: flex; align-items: center; gap: 10px; height: 52px; padding: 0 18px; border-radius: 999px; background: var(--apple-50); box-shadow: inset 0 0 0 1px var(--line); color: var(--muted); transition: box-shadow 160ms ease; }
	.search:focus-within { box-shadow: inset 0 0 0 2px var(--apple-deep); }
	.search input { flex: 1; min-width: 0; height: 100%; border: 0; background: none; color: var(--ink); font-size: 16px; outline: none; }
	.search input::placeholder { color: var(--muted); }
	.chips { display: flex; gap: 8px; margin: 0 calc(var(--gut) * -1); padding: 0 var(--gut); overflow-x: auto; scrollbar-width: none; }
	.chips::-webkit-scrollbar { display: none; }
	.chip { min-height: 40px; padding: 8px 16px; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--line-strong); color: var(--ink); font-size: 15px; white-space: nowrap; transition: background-color 160ms ease; }
	.chip:hover { background: var(--apple-50); }
	.chip[aria-pressed="true"] { background: var(--apple); box-shadow: none; color: var(--apple-ink); }
	@media (min-width: 900px) { .finder__bar { top: 92px; grid-template-columns: 380px 1fr; align-items: center; gap: 16px; margin-inline: 0; padding-inline: 0; } .chips { margin: 0; padding: 0; } }

	/* Rejilla con agregar directo */
	.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px 12px; }
	@media (min-width: 900px) { .grid { grid-template-columns: repeat(4, 1fr); gap: 32px 22px; } }
	.card { display: grid; grid-template-rows: auto auto 1fr auto; }
	.card__media { display: block; overflow: hidden; aspect-ratio: 1; border-radius: var(--radius); background: var(--apple-50); }
	.card__img { width: 100%; height: 100%; object-fit: cover; transition: transform 500ms var(--ease-out); }
	a.card__media:hover .card__img { transform: scale(1.04); }
	.card__name { margin-top: 12px; font-size: 16px; line-height: 1.3; }
	.card__name a { color: inherit; text-decoration: none; }
	.card__name a:hover { text-decoration: underline; text-decoration-color: var(--apple); }
	.card__type { font-size: 13px; color: var(--muted); }
	.card__row { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 10px; }
	.card__price { font-size: 17px; }
	.card__soon { color: var(--muted); font-size: 13px; }
	.add { display: grid; place-items: center; width: 44px; height: 44px; flex: none; border-radius: 50%; background: var(--apple); color: var(--apple-ink); transition: background-color 160ms ease, box-shadow 160ms ease; }
	.add:hover { background: var(--apple-hover); box-shadow: 0 8px 16px -10px rgba(47, 125, 34, .8); }
	.add:active { background: var(--apple-press); }
	.add[disabled] { background: var(--apple-50); color: var(--line-strong); box-shadow: inset 0 0 0 1px var(--line); cursor: not-allowed; }
	.add .ic { width: 20px; height: 20px; }
	.empty { padding: 32px 0; text-align: center; color: var(--muted); }
	.more { display: flex; width: fit-content; margin: 26px auto 0; }

	/* Volver a pedir */
	.reorder { display: grid; gap: 18px; padding: 22px 18px !important; border-radius: 28px; box-shadow: inset 0 0 0 1px var(--line); }
	.reorder__icon { display: grid; place-items: center; width: 44px; height: 44px; margin-bottom: 10px; border-radius: 50%; background: var(--apple-100); color: var(--apple-deep); }
	.reorder__copy p { margin: 6px 0 14px; font-size: 15px; }
	.reorder__label { margin-bottom: 8px; font-size: 13px; color: var(--muted); }
	.mini { display: grid; grid-template-columns: 56px 1fr auto; align-items: center; gap: 12px; padding: 10px; border-radius: 18px; background: var(--apple-50); }
	.mini__img { display: grid; place-items: center; height: 64px; border-radius: 12px; background: var(--white); }
	.mini__img img { height: 54px; width: auto; mix-blend-mode: multiply; }
	.mini h3 { font-size: 15px; line-height: 1.25; }
	.mini p { font-size: 13px; color: var(--muted); }
	@media (min-width: 900px) { .reorder { grid-template-columns: 1fr 1fr; align-items: center; gap: 48px; padding: 32px 36px !important; } }

	/* Categorías: filas compactas con foto */
	.cats__list { display: grid; gap: 8px; }
	.cat { display: flex; align-items: center; gap: 14px; padding: 8px 14px 8px 8px; border-radius: 18px; box-shadow: inset 0 0 0 1px var(--line); color: var(--ink); text-decoration: none; transition: background-color 160ms ease; }
	.cat:hover { background: var(--apple-50); }
	.cat__img { width: 56px; height: 56px; border-radius: 12px; object-fit: cover; object-position: 50% 30%; }
	.cat__name { display: grid; flex: 1; font-size: 17px; line-height: 1.25; }
	.cat__name small { color: var(--muted); font-size: 13px; }
	.cat .ic { width: 18px; color: var(--apple-deep); }
	@media (min-width: 900px) { .cats__list { grid-template-columns: repeat(5, 1fr); gap: 14px; } .cat { flex-direction: column; align-items: start; padding: 10px 10px 16px; } .cat__img { width: 100%; height: auto; aspect-ratio: 1; } .cat__name { padding: 0 6px; } .cat .ic { display: none; } }

	/* Spray destacado: tres datos y la foto con personas */
	.spot { display: grid; gap: 22px; }
	.facts { display: grid; gap: 10px; margin-top: 18px; }
	.facts li { display: grid; grid-template-columns: 40px 1fr; column-gap: 12px; padding: 14px; border-radius: 18px; background: var(--white); }
	.facts__icon { grid-row: span 2; display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: var(--apple-100); color: var(--apple-deep); }
	.facts h3 { font-size: 16px; }
	.facts p { font-size: 14px; line-height: 1.45; }
	.spot__act { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 20px; margin-top: 20px; }
	.spot__media { overflow: hidden; aspect-ratio: 1; border-radius: 22px; }
	.spot__img { width: 100%; height: 100%; object-fit: cover; }
	@media (min-width: 900px) { .spot { grid-template-columns: 1.1fr 1fr; gap: 56px; align-items: center; } .spot__media { border-radius: 26px; } }

	/* Opiniones */
	.voices__track { display: flex; gap: 12px; margin: 0 calc(var(--gut) * -1); padding: 0 var(--gut) 6px; overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding-left: var(--gut); scrollbar-width: none; }
	.voices__track::-webkit-scrollbar { display: none; }
	.voice { flex: 0 0 84%; display: grid; align-content: start; gap: 12px; padding: 20px; scroll-snap-align: start; border-radius: var(--radius); background: var(--apple-50); }
	.voice__who { display: flex; align-items: center; gap: 12px; }
	.voice__avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; object-position: 50% 25%; }
	.voice__who p { display: grid; font-size: 14px; line-height: 1.3; }
	.voice__who span { color: var(--muted); }
	.voice__quote { color: var(--ink); font-size: 19px; line-height: 1.3; letter-spacing: -0.3px; }
	.voice__text { font-size: 14px; line-height: 1.55; }
	@media (min-width: 900px) { .voices__track { margin: 0; padding: 0 0 6px; scroll-padding-left: 0; gap: 20px; } .voice { flex-basis: calc((100% - 40px) / 2.4); padding: 26px; } .voice__quote { font-size: 22px; } }

	/* Compra segura + enlaces de ayuda */
	.trust__list { display: grid; gap: 10px; }
	.trust__list li { display: flex; gap: 14px; padding: 16px; border-radius: 18px; box-shadow: inset 0 0 0 1px var(--line); }
	.trust__icon { display: grid; place-items: center; width: 40px; height: 40px; flex: none; border-radius: 50%; background: var(--apple-100); color: var(--apple-deep); }
	.trust__list h3 { font-size: 16px; }
	.trust__list p { margin-top: 2px; font-size: 14px; line-height: 1.45; }
	.trust__links { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
	.trust__links a { display: inline-flex; padding: 9px 16px; border-radius: 999px; background: var(--apple-50); color: var(--ink); font-size: 14px; text-decoration: none; transition: background-color 160ms ease; }
	.trust__links a:hover { background: var(--apple-100); }
	@media (min-width: 900px) { .trust__list { grid-template-columns: repeat(4, 1fr); gap: 16px; } .trust__list li { flex-direction: column; padding: 22px; } }

	/* Pie centrado */
	.ft { display: grid; justify-items: center; gap: 16px; margin-top: var(--pad); padding: 36px var(--gut) calc(30px + env(safe-area-inset-bottom)); border-top: 1px solid var(--line); text-align: center; font-size: 14px; }
	.ft__logo { width: 104px; }
	.ft__links { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px 18px; }
	.ft__links a { color: var(--ink); text-decoration: none; }
	.ft__links a:hover { color: var(--apple-deep); }
	.ft__contact, .ft__legal { color: var(--muted); font-size: 13px; }
	.ft__legal a { color: var(--muted); }
	.ft .pay { justify-content: center; }

	/* Ficha: galería a sangre y hoja que sube encima (móvil) */
	.gallery { position: relative; }
	.gallery__track { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; }
	.gallery__track::-webkit-scrollbar { display: none; }
	.gallery__slide { flex: 0 0 100%; aspect-ratio: 1; scroll-snap-align: start; background: var(--apple-50); }
	.gallery__img { width: 100%; height: 100%; object-fit: cover; }
	.gallery__slide--contain { display: grid; place-items: center; background: radial-gradient(closest-side, var(--apple-100), var(--apple-50)); }
	.gallery__slide--contain .gallery__img { width: auto; height: 86%; mix-blend-mode: multiply; }
	.gallery__bars { position: relative; z-index: 2; display: flex; gap: 4px; padding: 10px var(--gut) 34px; background: var(--white); }
	.gallery__bar { flex: 1; height: 24px; display: grid; align-items: center; }
	.gallery__bar::before { content: ''; height: 3px; border-radius: 3px; background: var(--apple-100); transition: background-color 200ms ease; }
	.gallery__bar[aria-current="true"]::before { background: var(--apple-deep); }
	.sheet { position: relative; z-index: 3; margin-top: -26px; padding: 22px var(--gut) 8px; border-radius: 28px 28px 0 0; background: var(--white); box-shadow: 0 -16px 30px -24px rgba(15, 46, 11, .4); }
	.sheet__head { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; margin-top: 10px; }
	.sheet__title { font-size: 30px; line-height: 1.05; letter-spacing: -1px; }
	.sheet__price { flex: none; font-size: 22px; }
	.sheet__sub { margin-top: 8px; color: var(--muted); font-size: 14px; }
	.sheet__pains { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px; }
	.sheet__pains li { padding: 5px 12px; border-radius: 999px; background: var(--apple-100); color: var(--apple-deep); font-size: 13px; }
	.sheet__buy { display: grid; grid-template-columns: auto 1fr; gap: 10px; margin-top: 20px; }
	.sheet__now { margin-top: 10px; }
	.sheet__trust { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 18px; text-align: center; font-size: 12px; line-height: 1.3; }
	.sheet__trust li { display: grid; justify-items: center; gap: 6px; padding: 12px 6px; border-radius: 16px; background: var(--apple-50); }
	.sheet__trust .ic { color: var(--apple-deep); }
	.info { margin-top: 22px; }
	.seg { display: flex; gap: 4px; padding: 4px; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--line); }
	.seg__btn { flex: 1; min-height: 40px; padding: 8px 6px; border-radius: 999px; color: var(--text); font-size: 14px; transition: background-color 160ms ease, color 160ms ease; }
	.seg__btn:hover { color: var(--ink); }
	.seg__btn[aria-selected="true"] { background: var(--apple); color: var(--apple-ink); }
	.info__panel { display: grid; gap: 8px; padding: 16px 4px 4px; font-size: 15px; }
	.info__panel .small { font-size: 13px; color: var(--muted); }
	.info__steps { display: grid; gap: 8px; }
	.info__steps li { display: flex; gap: 10px; align-items: center; color: var(--ink); }
	.info__steps .ic { width: 18px; color: var(--apple-deep); }
	@media (min-width: 900px) {
		main > [data-view] > .pdp { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: 40px; align-items: start; margin-top: 18px; padding-inline: var(--gut); }
		.gallery__track { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; overflow: visible; }
		.gallery__slide { border-radius: 24px; overflow: hidden; }
		.gallery__slide:first-child { grid-column: 1 / -1; }
		.gallery__bars { display: none; }
		.sheet { position: sticky; top: 100px; margin: 0; padding: 30px 32px 24px; border-radius: 28px; box-shadow: 0 0 0 1px var(--line), 0 30px 60px -40px rgba(15, 46, 11, .45); }
		.sheet__title { font-size: 40px; letter-spacing: -1.4px; }
		.sheet__price { font-size: 28px; }
	}
	.plants__track { display: flex; gap: 12px; margin: 0 calc(var(--gut) * -1); padding: 0 var(--gut) 4px; overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding-left: var(--gut); scrollbar-width: none; }
	.plants__track::-webkit-scrollbar { display: none; }
	.plant { flex: 0 0 78%; display: grid; gap: 12px; scroll-snap-align: start; }
	.plant__img { width: 100%; aspect-ratio: 3 / 2; object-fit: cover; border-radius: var(--radius); }
	.plant h3 { font-size: 19px; }
	.plant p { margin-top: 2px; font-size: 14px; }
	@media (min-width: 900px) { .plants__track { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin: 0; padding: 0; overflow: visible; } }
	.faq__list { display: grid; gap: 8px; max-width: 860px; }
	.qa { border-radius: 18px; background: var(--apple-50); transition: background-color 160ms ease; }
	.qa[open] { background: var(--apple-100); }
	.qa summary { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 16px 18px; color: var(--ink); font-size: 16px; line-height: 1.35; cursor: pointer; list-style: none; }
	.qa summary::-webkit-details-marker { display: none; }
	.qa__sign { display: grid; place-items: center; width: 32px; height: 32px; flex: none; border-radius: 50%; background: var(--white); color: var(--apple-deep); transition: transform 220ms var(--ease); }
	.qa__sign .ic { width: 16px; height: 16px; }
	.qa[open] .qa__sign { transform: rotate(180deg); }
	.qa__a { display: grid; gap: 8px; padding: 0 18px 18px; font-size: 15px; }

	/* Barra fija de compra (ficha) */
	.sticky { position: fixed; left: 10px; right: 10px; bottom: calc(10px + env(safe-area-inset-bottom)); z-index: 25; display: flex; align-items: center; gap: 12px; padding: 8px 8px 8px 20px; border-radius: 999px; background: var(--ink); color: var(--white); box-shadow: 0 18px 40px -16px rgba(15, 26, 16, .6); opacity: 0; transform: translateY(130%); transition: transform 360ms var(--ease-out), opacity 240ms ease; pointer-events: none; }
	.sticky.is-on { opacity: 1; transform: none; pointer-events: auto; }
	.sticky p { display: grid; flex: 1; font-size: 12px; line-height: 1.3; color: #c7d3c4; }
	.sticky strong { color: #c7d3c4; }
	.sticky p span { color: var(--white); font-size: 17px; }
	.sticky .btn { min-height: 46px; padding: 8px 18px; }
	@media (min-width: 900px) { .sticky { left: 50%; right: auto; width: 440px; margin-left: -220px; bottom: 22px; } }

	/* Carrito: hoja inferior en móvil, panel flotante en escritorio */
	.drawer { position: fixed; inset: 0; z-index: 80; }
	.drawer__scrim { position: absolute; inset: 0; width: 100%; background: rgba(15, 26, 16, .4); opacity: 0; transition: opacity 340ms ease; cursor: default; }
	.drawer__panel { position: absolute; left: 0; right: 0; bottom: 0; display: flex; flex-direction: column; max-height: 88vh; border-radius: 28px 28px 0 0; background: var(--white); transform: translateY(100%); transition: transform 400ms var(--ease-out); }
	.drawer.is-open .drawer__scrim { opacity: 1; }
	.drawer.is-open .drawer__panel { transform: none; }
	.drawer__handle { align-self: center; flex: none; width: 42px; height: 5px; margin-top: 10px; border-radius: 5px; background: var(--line); }
	.drawer__hd { display: flex; justify-content: space-between; align-items: center; padding: 10px 18px 6px 22px; }
	.drawer__hd h2 { font-size: 22px; letter-spacing: -0.4px; }
	.drawer__body, .drawer__empty { flex: 1 1 auto; padding: 10px 18px; overflow-y: auto; }
	.drawer.is-empty .drawer__body, .drawer.is-empty .drawer__ft { display: none; }
	.drawer:not(.is-empty) .drawer__empty { display: none; }
	.drawer__empty { display: grid; justify-items: center; gap: 14px; padding-bottom: 30px; color: var(--ink); font-size: 18px; }
	.line { display: grid; grid-template-columns: 64px 1fr auto; align-items: center; gap: 14px; padding: 12px; border-radius: 22px; background: var(--apple-50); }
	.line__img { display: grid; place-items: center; height: 76px; border-radius: 16px; background: var(--white); }
	.line__img img { height: 64px; width: auto; mix-blend-mode: multiply; }
	.line__info h3 { font-size: 16px; line-height: 1.25; }
	.line__info p { font-size: 13px; color: var(--muted); }
	.line__remove { display: inline-flex; align-items: center; gap: 6px; margin: 10px 0 0 4px; color: var(--muted); font-size: 13px; }
	.line__remove:hover { color: var(--ink); }
	.line__remove .ic { width: 16px; height: 16px; }
	.sum { display: grid; gap: 8px; margin-top: 16px; padding-top: 14px; border-top: 1px dashed var(--apple-200); font-size: 15px; }
	.sum p { display: flex; justify-content: space-between; gap: 12px; }
	.sum__total { padding-top: 8px; color: var(--ink); font-size: 18px; }
	.sum__total strong { font-size: 24px; letter-spacing: -0.5px; }
	.sum__note { font-size: 13px; color: var(--muted); }
	.drawer__ft { display: grid; gap: 12px; padding: 14px 18px calc(16px + env(safe-area-inset-bottom)); }
	.drawer__ft .pay { justify-content: center; }
	@media (min-width: 900px) {
		.drawer__panel { left: auto; top: 16px; right: 16px; bottom: 16px; width: 420px; max-height: none; border-radius: 28px; transform: translateX(calc(100% + 24px)); }
		.drawer__handle { display: none; }
		.drawer__hd { padding-top: 22px; }
	}
`

const SCRIPT = `
	// Pestañas de la ficha
	root.addEventListener('click', e => {
		const tab = e.target.closest('[data-seg-btn]')
		if (!tab) return
		const box = tab.closest('[data-seg]')
		box.querySelectorAll('[data-seg-btn]').forEach(b => b.setAttribute('aria-selected', String(b === tab)))
		box.querySelectorAll('[data-seg-panel]').forEach(p => { p.hidden = p.dataset.segPanel !== tab.dataset.segBtn })
	})
`

export default () => `<!doctype html>
<html lang="es-MX">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Nambu México · Propuesta B · Compra rápida</title>
<style>${ROOT_CSS}${FRAME_CSS}${CSS}</style>
</head>
<body>
${frame({ name: 'Propuesta B · Compra rápida', other: 'Propuesta A', otherHref: 'a-tienda.html' })}
<div class="store" data-store>
	${header()}
	<main>
		<div data-view="inicio">
			${banner()}
			${finder({ title: 'Más pedidos', id: 'shelf-home', products: C.CATALOG.slice(0, 4), showMore: true })}
			${reorder()}
			${categories()}
			${spotlight()}
			${voices()}
			${trust()}
		</div>
		<div data-view="tienda" hidden>
			<div class="coll-head"><nav class="crumbs" aria-label="Ruta"><a href="#inicio">Inicio</a><span aria-hidden="true">/</span><span>Tienda</span></nav><h1 class="h2 coll-title">Todos los productos</h1></div>
			${finder({ title: 'Catálogo', id: 'shelf-all', products: C.CATALOG, showMore: false })}
		</div>
		<div data-view="producto" hidden>${pdp()}</div>
	</main>
	${footer()}
	${sticky()}
	${drawer()}
</div>
<script>
(() => {
${STORE_JS}
${SCRIPT}
})()
</script>
</body>
</html>
`

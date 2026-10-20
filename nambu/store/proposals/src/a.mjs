// Propuesta A · Tienda de marca
// La estructura de nambuoficial.com, bien resuelta: banner del spray, categorías, productos,
// spray destacado, opiniones, confianza, ayuda y suscripción. Cabecera con logo centrado,
// ficha con galería y miniaturas, carrito lateral.
import * as C from './content.mjs'
import { ICON, btn, img, price, payLogos, mock, frame, ROOT_CSS, FRAME_CSS, STORE_JS } from './shared.mjs'

const addBtn = (cls = '') => btn(C.CTA.add, { cls, attrs: 'data-add' })

const announcement = () => `<p class="note-bar">${mock(C.MOCK.announcement)}<span aria-hidden="true">·</span>Paga seguro con tarjeta</p>`

const header = () => `
<header class="hd">
	<div class="hd__in">
		<button class="hd__icon hd__menu" type="button" aria-label="Menú" aria-expanded="false" data-menu-toggle>${ICON.menu}</button>
		<nav class="hd__nav" aria-label="Principal">${C.NAV.map(([t, h]) => `<a href="${h}">${t}</a>`).join('')}</nav>
		<a class="hd__logo" href="#inicio" aria-label="Nambu, inicio"><img src="${C.ASSETS}landings-nambu-wordmark-green.webp" width="568" height="138" alt="Nambu"></a>
		<div class="hd__tools">
			<a class="hd__icon" href="#tienda" aria-label="Buscar">${ICON.search}</a>
			<a class="hd__icon hd__account" href="#" aria-label="Mi cuenta">${ICON.user}</a>
			<a class="hd__icon" href="#carrito" aria-label="Carrito" data-open-cart>${ICON.bag}<span class="hd__count" data-cart-count hidden>0</span></a>
		</div>
	</div>
	<nav class="hd__drop" aria-label="Menú móvil" data-menu hidden>${C.NAV.map(([t, h]) => `<a href="${h}">${t}${ICON.right}</a>`).join('')}</nav>
</header>`

// Tarjeta de producto: la misma en home, tienda y recomendaciones
const card = p => {
	const media = img({ ...p.img, alt: p.name, cls: 'card__img', sizes: '(min-width: 1000px) 280px, 46vw', width: 700 })
	return `<li class="card" data-collection="${p.collection}" data-name="${p.name.toLowerCase()}">
		${p.available ? `<a class="card__media" href="#producto">${media}</a>` : `<div class="card__media">${media}</div>`}
		<div class="card__body">
			<p class="card__type">${p.type}</p>
			<h3 class="card__name">${p.available ? `<a href="#producto">${p.name}</a>` : p.name}</h3>
			<p class="card__price">${p.available ? price() : `<span class="card__soon">${C.CTA.soon}</span>`}</p>
		</div>
		${p.available ? addBtn('btn--sm btn--block card__btn') : btn(C.CTA.soon, { cls: 'btn--sm btn--block card__btn', attrs: 'disabled' })}
	</li>`
}

const banner = () => `
<section class="banner" aria-labelledby="banner-title">
	<div class="banner__in">
		<figure class="banner__media">${img({ ...C.SPRAY.banner, cls: 'banner__img', eager: true, sizes: '(min-width: 900px) 50vw, 100vw', width: 1200 })}</figure>
		<div class="banner__copy">
			<h1 id="banner-title" class="banner__title">${C.SPRAY.headline}</h1>
			<p class="banner__lead">${C.SPRAY.lead}</p>
			<div class="banner__product">
				<p><strong>${C.SPRAY.title}</strong><span>${C.SPRAY.size}</span></p>
				${price('price banner__price')}
			</div>
			<div class="banner__act">${addBtn()}<a class="btn btn--ghost" href="#producto"><span>${C.CTA.view}</span></a></div>
		</div>
	</div>
</section>`

const categories = () => `
<section class="cats shell" aria-labelledby="cats-title">
	<div class="head"><h2 id="cats-title" class="h2">Compra por categoría</h2><a class="link" href="#tienda">Ver todo${ICON.arrow}</a></div>
	<ul class="cats__list">${C.COLLECTIONS.map(c => {
		const live = C.CATALOG.some(p => p.collection === c.id && p.available)
		return `<li><a class="cat" href="#tienda">
			<span class="cat__media">${img({ ...c.img, alt: '', cls: 'cat__img', sizes: '200px', width: 400 })}</span>
			<span class="cat__name">${c.name}</span>
			<span class="cat__count">${live ? 'Disponible' : C.CTA.soon}</span>
		</a></li>`
	}).join('')}</ul>
</section>`

const featured = () => `
<section class="feat shell" aria-labelledby="feat-title">
	<div class="head"><h2 id="feat-title" class="h2">Nuestros productos</h2><a class="link" href="#tienda">Ver toda la tienda${ICON.arrow}</a></div>
	<ul class="grid">${C.CATALOG.slice(0, 4).map(card).join('')}</ul>
</section>`

const spotlight = () => `
<section class="spot" aria-labelledby="spot-title">
	<div class="shell spot__in">
		<figure class="spot__media">${img({ ...C.SPRAY.people, cls: 'spot__img', sizes: '(min-width: 900px) 560px, 100vw' })}</figure>
		<div class="spot__copy">
			<h2 id="spot-title" class="h2">Conoce el ${C.SPRAY.short}</h2>
			<p class="spot__lead">${C.DETAILS.description[0]}</p>
			<ul class="facts">${C.SPRAY.facts.map(f => `<li><span class="facts__icon">${ICON[f.icon]}</span><div><h3>${f.title}</h3><p>${f.text}</p></div></li>`).join('')}</ul>
			<div class="spot__buy">${price('price spot__price')}${addBtn()}</div>
			<a class="link" href="#producto">Ver todos los detalles${ICON.arrow}</a>
		</div>
	</div>
</section>`

const voices = (id = 'h') => `
<section class="voices" aria-labelledby="voices-${id}" data-rail>
	<div class="shell head"><h2 id="voices-${id}" class="h2">${C.VOICES.title}</h2><div class="arrows"><button class="round" type="button" aria-label="Opinión anterior" data-prev>${ICON.left}</button><button class="round" type="button" aria-label="Opinión siguiente" data-next>${ICON.right}</button></div></div>
	<ul class="voices__track" data-track>${C.VOICES.items.map(v => {
		const p = C.PEOPLE[v.slug]
		return `<li class="voice">
			<p class="voice__quote">“${v.quote}”</p>
			<p class="voice__text">${v.text}</p>
			<div class="voice__who">${img({ ...p, alt: '', cls: 'voice__avatar', sizes: '48px' })}<p><strong>${p.name}</strong><span>${v.city}</span></p><a class="voice__tag" href="#producto">${C.SPRAY.short}</a></div>
		</li>`
	}).join('')}</ul>
</section>`

const trust = () => `
<section class="trust shell" aria-labelledby="trust-title">
	<h2 id="trust-title" class="h2">Compra con confianza</h2>
	<ul class="trust__list">${C.TRUST.map(t => `<li><span class="trust__icon">${ICON[t.icon]}</span><h3>${t.title}</h3><p>${t.text()}</p></li>`).join('')}</ul>
</section>`

const help = () => `
<section class="help shell" id="ayuda" aria-labelledby="help-title">
	<h2 id="help-title" class="h2">¿Necesitas ayuda?</h2>
	<ul class="help__list">${C.HELP_LINKS.map(([t, h]) => `<li><a href="${h}">${t}${ICON.arrow}</a></li>`).join('')}</ul>
</section>`

const newsletter = () => `
<section class="news" aria-labelledby="news-title">
	<div class="shell news__in">
		<div><h2 id="news-title" class="h2">Entérate de los lanzamientos</h2><p>Te avisamos cuando lleguen nuevos productos a la tienda de México.</p></div>
		<form class="news__form" onsubmit="return false">
			<label class="sr" for="news-email">Correo electrónico</label>
			<input id="news-email" type="email" placeholder="Tu correo electrónico" autocomplete="email">
			${btn('Suscribirme', { attrs: 'type="submit"' }).replace('type="button" ', '')}
		</form>
	</div>
</section>`

const footer = () => `
<footer class="ft">
	<div class="shell ft__in">
		<div class="ft__brand">
			<img src="${C.ASSETS}landings-nambu-wordmark-green.webp" width="568" height="138" alt="Nambu" loading="lazy">
			<p>${mock(C.MOCK.instagram)}</p>
		</div>
		<nav class="ft__col" aria-label="Tienda"><h3>Tienda</h3>${C.FOOTER.shop.map(([t, h]) => `<a href="${h}">${t}</a>`).join('')}</nav>
		<nav class="ft__col" aria-label="Ayuda"><h3>Ayuda</h3>${C.FOOTER.help.map(([t, h]) => `<a href="${h}">${t}</a>`).join('')}</nav>
		<div class="ft__col" id="contacto"><h3>Contacto</h3><a href="#">WhatsApp ${mock(C.MOCK.whatsapp)}</a><a href="#">${mock(C.MOCK.email)}</a></div>
	</div>
	<div class="shell ft__base">
		${payLogos()}
		<p>© 2026 ${mock(C.MOCK.legalName)} · ${C.FOOTER.legal.map(([t, h]) => `<a href="${h}">${t}</a>`).join(' · ')}</p>
	</div>
</footer>`

const collection = () => `
<div class="coll shell" data-filter data-active="all">
	<nav class="crumbs" aria-label="Ruta"><a href="#inicio">Inicio</a><span aria-hidden="true">/</span><span>Tienda</span></nav>
	<div class="coll__head">
		<h1 class="coll__title">Todos los productos</h1>
		<p class="coll__count" data-filter-count aria-live="polite"></p>
	</div>
	<div class="coll__bar">
		<div class="chips" role="group" aria-label="Filtrar por categoría">
			<button type="button" class="chip" aria-pressed="true" data-filter-btn="all">Todo</button>
			${C.COLLECTIONS.map(c => `<button type="button" class="chip" aria-pressed="false" data-filter-btn="${c.id}">${c.name}<span>${C.countIn(c.id)}</span></button>`).join('')}
		</div>
		<label class="sort"><span>Ordenar</span><select><option>Destacados</option><option>Precio: menor a mayor</option><option>Precio: mayor a menor</option><option>Novedades</option></select></label>
	</div>
	<h2 class="sr">Productos</h2>
	<ul class="grid grid--coll">${C.CATALOG.map(card).join('')}</ul>
	<p class="coll__empty" data-empty hidden>No hay productos en esta categoría todavía.</p>
</div>`

const pdp = () => `
<div class="pdp shell">
	<nav class="crumbs" aria-label="Ruta"><a href="#inicio">Inicio</a><span aria-hidden="true">/</span><a href="#tienda">Respiración</a><span aria-hidden="true">/</span><span>${C.SPRAY.short}</span></nav>
	<div class="pdp__grid">
		<div class="gallery" data-rail>
			<ul class="gallery__track" data-track>
				${C.GALLERY.map((g, i) => `<li class="gallery__slide gallery__slide--${g.fit}">${img({ ...g, cls: 'gallery__img', eager: i === 0, sizes: '(min-width: 900px) 600px, 100vw' })}</li>`).join('')}
			</ul>
			<div class="gallery__thumbs" role="group" aria-label="Fotos del producto">
				${C.GALLERY.map((g, i) => `<button type="button" class="thumb thumb--${g.fit}" aria-label="Foto ${i + 1}" data-dot>${img({ ...g, alt: '', sizes: '88px' })}</button>`).join('')}
			</div>
		</div>
		<div class="buybox" data-buybox>
			<p class="buybox__brand">Nambu · Respiración</p>
			<h1 class="buybox__title">${C.SPRAY.title}</h1>
			<p class="buybox__sub">${C.SPRAY.size} · ${C.SPRAY.plants}</p>
			<p class="buybox__price">${price()} <span>${mock(C.MOCK.taxes)}</span></p>
			<p class="buybox__lead">${C.DETAILS.description[0]}</p>
			<div class="buybox__row">
				<div class="qty" data-qty>
					<button type="button" aria-label="Quitar uno" data-qty-dec>${ICON.minus}</button>
					<output data-qty-value aria-live="polite">1</output>
					<button type="button" aria-label="Agregar uno" data-qty-inc>${ICON.plus}</button>
				</div>
				<div data-sticky-anchor>${addBtn('btn--block')}</div>
			</div>
			${btn(C.CTA.buyNow, { cls: 'btn--ghost btn--block buybox__now', attrs: 'data-add' })}
			<ul class="buybox__trust">
				<li>${ICON.truck}<span>${mock(C.MOCK.shipping)}</span></li>
				<li>${ICON.lock}<span>Pago seguro con tarjeta</span></li>
				<li>${ICON.chat}<span>Atención por WhatsApp</span></li>
			</ul>
			<div class="buybox__acc">
				<details class="qa" open><summary>Descripción${ICON.plus}</summary><div class="qa__a">${C.DETAILS.description.map(p => `<p>${p}</p>`).join('')}</div></details>
				<details class="qa"><summary>Cómo se usa${ICON.plus}</summary><div class="qa__a">${C.DETAILS.use.map(p => `<p>${p}</p>`).join('')}</div></details>
				<details class="qa"><summary>Ingredientes${ICON.plus}</summary><div class="qa__a">${C.DETAILS.plants.map(p => `<p>${p}</p>`).join('')}<p class="small">${C.PLANTS.note}</p></div></details>
				<details class="qa"><summary>Envíos y devoluciones${ICON.plus}</summary><div class="qa__a"><p>${mock(C.MOCK.shipping + '. ' + C.MOCK.delivery + '.')}</p><p>${mock(C.MOCK.returns)}</p></div></details>
			</div>
		</div>
	</div>
</div>
<section class="plants shell" aria-labelledby="plants-title">
	<h2 id="plants-title" class="h2">${C.PLANTS.title}</h2>
	<ul class="plants__list">${C.PLANTS.items.map(p => `<li class="plant">${img({ ...p, alt: p.name, cls: 'plant__img', sizes: '(min-width: 900px) 380px, 90vw' })}<h3>${p.name}</h3><p>${p.text}</p></li>`).join('')}</ul>
</section>
${voices('p')}
<section class="faq shell" id="faq" aria-labelledby="faq-title">
	<h2 id="faq-title" class="h2">Preguntas frecuentes</h2>
	<div class="faq__list">${C.FAQ.map(f => `<details class="qa"><summary>${f.q}${ICON.plus}</summary><div class="qa__a">${f.a.map(a => `<p>${a}</p>`).join('')}</div></details>`).join('')}</div>
</section>
<section class="feat shell" aria-labelledby="more-title">
	<div class="head"><h2 id="more-title" class="h2">También en Nambu</h2><a class="link" href="#tienda">Ver toda la tienda${ICON.arrow}</a></div>
	<ul class="grid">${C.CATALOG.slice(1, 5).map(card).join('')}</ul>
</section>`

const sticky = () => `
<div class="sticky" data-sticky>
	<img src="${C.ASSETS}landings-spray-packshot.webp" width="601" height="1100" alt="" loading="lazy">
	<p><strong>${C.SPRAY.short}</strong>${price()}</p>
	${btn('Agregar', { attrs: 'data-add' })}
</div>`

const drawer = () => `
<div class="drawer is-empty" data-cart hidden>
	<button class="drawer__scrim" type="button" tabindex="-1" aria-label="Cerrar carrito" data-cart-close></button>
	<aside class="drawer__panel" role="dialog" aria-modal="true" aria-labelledby="cart-title">
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
				<div class="line__img">${img({ file: 'landings-spray-packshot.webp', w: 601, h: 1100, alt: '', sizes: '80px' })}</div>
				<div class="line__info">
					<h3>${C.SPRAY.title}</h3>
					<p>${C.SPRAY.size}</p>
					<div class="line__row">
						<div class="qty qty--sm"><button type="button" aria-label="Quitar uno" data-line-dec>${ICON.minus}</button><output data-line-qty>1</output><button type="button" aria-label="Agregar uno" data-line-inc>${ICON.plus}</button></div>
						<button type="button" class="line__remove" data-line-remove>Eliminar</button>
					</div>
				</div>
				<p class="line__total" data-line-total>$460 MXN</p>
			</article>
		</div>
		<footer class="drawer__ft">
			<p class="drawer__sub"><span>Subtotal</span><strong data-subtotal>$460 MXN</strong></p>
			<p class="drawer__note">${mock(C.MOCK.taxes)} El envío se calcula en el checkout.</p>
			${btn(C.CTA.checkout, { cls: 'btn--block', attrs: 'data-checkout', icon: ICON.lock })}
			${payLogos()}
		</footer>
	</aside>
</div>`

const CSS = `
	.store { --shell: 1240px; --gut: 18px; --pad: 40px; --radius: 18px; }
	@media (min-width: 900px) { .store { --gut: 40px; --pad: 72px; } }
	.shell { width: 100%; max-width: calc(var(--shell) + var(--gut) * 2); margin: 0 auto; padding: 0 var(--gut); }
	.h2 { font-size: 26px; line-height: 1.12; letter-spacing: -0.6px; }
	@media (min-width: 900px) { .h2 { font-size: 36px; letter-spacing: -1.1px; } }
	.head { display: flex; justify-content: space-between; align-items: end; gap: 16px; margin-bottom: 20px; }
	.link { display: inline-flex; align-items: center; gap: 6px; color: var(--ink); font-size: 15px; text-decoration: underline; text-decoration-color: var(--apple); text-decoration-thickness: 1.5px; text-underline-offset: 5px; white-space: nowrap; transition: color 160ms ease; }
	.link:hover { color: var(--apple-deep); }
	.link .ic { width: 16px; height: 16px; }
	main > [data-view] > section, main > [data-view] > div { margin-top: var(--pad); }
	main > [data-view] > .banner, main > [data-view] > .pdp, main > [data-view] > .coll { margin-top: 0; }
	.crumbs { display: flex; flex-wrap: wrap; gap: 8px; color: var(--muted); font-size: 13px; }
	.crumbs a { color: var(--muted); text-decoration: none; }
	.crumbs a:hover { color: var(--ink); }

	/* Aviso y cabecera: logotipo al centro */
	.note-bar { display: flex; justify-content: center; gap: 10px; padding: 9px var(--gut); background: var(--apple-50); color: var(--ink); font-size: 13px; text-align: center; }
	.hd { position: sticky; top: 0; z-index: 30; background: var(--white); box-shadow: 0 1px 0 var(--line); }
	.hd__in { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; height: 62px; max-width: calc(var(--shell) + var(--gut) * 2); margin: 0 auto; padding: 0 calc(var(--gut) - 10px); }
	.hd__logo img { width: 104px; height: auto; }
	.hd__nav { display: none; }
	.hd__tools { display: flex; justify-content: flex-end; }
	.hd__icon { position: relative; display: grid; place-items: center; width: 44px; height: 44px; border-radius: 999px; color: var(--ink); transition: background-color 160ms ease; }
	.hd__icon:hover { background: var(--apple-50); }
	.hd__account { display: none; }
	.hd__count { position: absolute; top: 5px; right: 3px; min-width: 18px; height: 18px; padding: 0 5px; border-radius: 99px; background: var(--apple); color: var(--apple-ink); font-size: 11px; line-height: 18px; text-align: center; }
	.hd__drop { display: grid; padding: 4px var(--gut) 14px; border-top: 1px solid var(--line); }
	.hd__drop a { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-bottom: 1px solid var(--line); color: var(--ink); font-size: 18px; text-decoration: none; }
	.hd__drop .ic { width: 18px; color: var(--apple-deep); }
	@media (min-width: 900px) {
		.hd__in { height: 74px; }
		.hd__menu, .hd__drop { display: none !important; }
		.hd__nav { display: flex; gap: 26px; padding-left: 10px; }
		.hd__nav a { padding: 4px 0; color: var(--ink); font-size: 15px; text-decoration: none; background: linear-gradient(var(--apple), var(--apple)) 0 100% / 0 1.5px no-repeat; transition: background-size 220ms var(--ease); }
		.hd__nav a:hover { background-size: 100% 1.5px; }
		.hd__logo img { width: 124px; }
		.hd__account { display: grid; }
	}

	/* Banner del spray: foto entera a un lado, compra al otro */
	.banner__in { display: grid; max-width: calc(var(--shell) + var(--gut) * 2); margin: 0 auto; }
	.banner__media { overflow: hidden; aspect-ratio: 5 / 4; background: var(--apple-50); }
	.banner__img { width: 100%; height: 100%; object-fit: cover; }
	.banner__copy { padding: 24px var(--gut) 8px; }
	.banner__title { font-size: 34px; line-height: 1.04; letter-spacing: -1.2px; }
	.banner__lead { margin-top: 12px; font-size: 16px; line-height: 1.55; max-width: 46ch; }
	.banner__product { display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-top: 20px; padding: 14px 0; border-block: 1px solid var(--line); }
	.banner__product p { display: grid; font-size: 13px; color: var(--muted); line-height: 1.35; }
	.banner__product strong { font-size: 16px; }
	.banner__price { font-size: 26px; letter-spacing: -0.5px; }
	.banner__act { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 16px; }
	@media (min-width: 900px) {
		.banner__in { grid-template-columns: 1fr 1fr; align-items: center; padding: 0 var(--gut); gap: 64px; margin-top: 28px; }
		.banner__media { order: 2; aspect-ratio: 1; border-radius: 28px; }
		.banner__copy { padding: 0; }
		.banner__title { font-size: 58px; letter-spacing: -2.2px; }
		.banner__lead { margin-top: 18px; font-size: 18px; }
		.banner__product { margin-top: 28px; padding: 18px 0; }
		.banner__price { font-size: 32px; }
		.banner__act { display: flex; gap: 12px; margin-top: 22px; }
		.banner__act .btn { min-width: 200px; }
	}

	/* Categorías: retrato redondo + nombre */
	.cats__list { display: flex; gap: 12px; margin: 0 calc(var(--gut) * -1); padding: 0 var(--gut) 4px; overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding-left: var(--gut); scrollbar-width: none; }
	.cats__list::-webkit-scrollbar { display: none; }
	.cats__list li { flex: 0 0 38%; scroll-snap-align: start; }
	.cat { display: grid; gap: 4px; color: var(--ink); text-decoration: none; }
	.cat__media { overflow: hidden; aspect-ratio: 1; border-radius: var(--radius); background: var(--apple-50); }
	.cat__img { width: 100%; height: 100%; object-fit: cover; object-position: 50% 30%; transition: transform 500ms var(--ease-out); }
	.cat:hover .cat__img { transform: scale(1.04); }
	.cat__name { margin-top: 8px; font-size: 17px; }
	.cat__count { font-size: 13px; color: var(--muted); }
	@media (min-width: 900px) { .cats__list { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; margin: 0; padding: 0; overflow: visible; } .cat__name { font-size: 19px; } }

	/* Rejilla de producto */
	.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px 12px; }
	@media (min-width: 900px) { .grid { grid-template-columns: repeat(4, 1fr); gap: 36px 24px; } }
	.card { display: grid; grid-template-rows: auto 1fr auto; gap: 12px; }
	.card__media { display: block; overflow: hidden; aspect-ratio: 1; border-radius: var(--radius); background: var(--apple-50); }
	.card__img { width: 100%; height: 100%; object-fit: cover; transition: transform 500ms var(--ease-out); }
	a.card__media:hover .card__img { transform: scale(1.04); }
	.card__body { display: grid; align-content: start; gap: 2px; }
	.card__type { font-size: 13px; color: var(--muted); }
	.card__name { font-size: 17px; line-height: 1.3; }
	.card__name a { color: inherit; text-decoration: none; }
	.card__name a:hover { text-decoration: underline; text-decoration-color: var(--apple); }
	.card__price { margin-top: 4px; font-size: 17px; }
	.card__soon { color: var(--muted); font-size: 14px; }
	.card__btn { white-space: normal; }

	/* Spray destacado: personas + datos del producto */
	.spot { padding-block: var(--pad); background: var(--apple-50); }
	.spot__in { display: grid; gap: 24px; }
	.spot__media { overflow: hidden; aspect-ratio: 1; border-radius: 22px; }
	.spot__img { width: 100%; height: 100%; object-fit: cover; }
	.spot__lead { margin-top: 12px; font-size: 16px; line-height: 1.55; max-width: 52ch; }
	.facts { display: grid; gap: 14px; margin-top: 20px; }
	.facts li { display: flex; gap: 14px; align-items: start; }
	.facts__icon { display: grid; place-items: center; width: 44px; height: 44px; flex: none; border-radius: 50%; background: var(--white); color: var(--apple-deep); }
	.facts h3 { font-size: 17px; }
	.facts p { font-size: 14px; line-height: 1.45; }
	.spot__buy { display: flex; flex-wrap: wrap; align-items: center; gap: 14px 22px; margin: 24px 0 16px; }
	.spot__price { font-size: 28px; letter-spacing: -0.5px; }
	@media (min-width: 900px) { .spot__in { grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; } .spot__media { border-radius: 28px; } .facts { grid-template-columns: 1fr; } }

	/* Opiniones: carril con la siguiente asomando */
	.voices__track { display: flex; gap: 12px; overflow-x: auto; scroll-snap-type: x mandatory; scroll-padding-left: var(--gut); padding: 0 var(--gut) 6px; scrollbar-width: none; }
	.voices__track::-webkit-scrollbar { display: none; }
	.voice { flex: 0 0 86%; display: grid; align-content: start; gap: 12px; padding: 22px; scroll-snap-align: start; border-radius: var(--radius); box-shadow: inset 0 0 0 1px var(--line); }
	.voice__quote { color: var(--ink); font-size: 20px; line-height: 1.3; letter-spacing: -0.3px; }
	.voice__text { font-size: 15px; line-height: 1.55; }
	.voice__who { display: flex; align-items: center; gap: 12px; margin-top: 4px; }
	.voice__avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; object-position: 50% 25%; }
	.voice__who p { display: grid; font-size: 14px; line-height: 1.3; }
	.voice__who span { color: var(--muted); }
	.voice__tag { margin-left: auto; padding: 4px 10px; border-radius: 999px; background: var(--apple-100); color: var(--apple-deep); font-size: 12px; text-decoration: none; }
	@media (min-width: 900px) {
		.voices__track { padding-inline: max(var(--gut), calc((100vw - var(--shell)) / 2)); scroll-padding-left: max(var(--gut), calc((100vw - var(--shell)) / 2)); gap: 24px; }
		.voice { flex-basis: 520px; padding: 30px; }
		.voice__quote { font-size: 24px; }
	}

	/* Confianza y ayuda */
	.trust__list { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px; }
	.trust__list li { display: grid; align-content: start; gap: 6px; padding: 18px 16px; border-radius: var(--radius); background: var(--apple-50); }
	.trust__icon { display: grid; place-items: center; width: 40px; height: 40px; margin-bottom: 4px; border-radius: 50%; background: var(--white); color: var(--apple-deep); }
	.trust__list h3 { font-size: 16px; }
	.trust__list p { font-size: 13px; line-height: 1.45; }
	@media (min-width: 900px) { .trust__list { grid-template-columns: repeat(4, 1fr); gap: 20px; } .trust__list li { padding: 24px; } .trust__list h3 { font-size: 18px; } .trust__list p { font-size: 14px; } }
	.help__list { display: grid; margin-top: 12px; }
	.help__list a { display: flex; justify-content: space-between; align-items: center; padding: 18px 2px; border-bottom: 1px solid var(--line); color: var(--ink); font-size: 17px; text-decoration: none; transition: color 160ms ease; }
	.help__list a:hover { color: var(--apple-deep); }
	.help__list .ic { width: 18px; color: var(--apple-deep); }
	@media (min-width: 900px) { .help { display: grid; grid-template-columns: 1fr 2fr; gap: 64px; } .help__list { grid-template-columns: 1fr 1fr; column-gap: 40px; margin: 0; } }

	/* Suscripción */
	.news { margin-top: var(--pad); padding-block: 36px; background: var(--apple-50); }
	.news__in { display: grid; grid-template-columns: minmax(0, 1fr); gap: 18px; }
	.news p { margin-top: 6px; font-size: 15px; }
	.news__form { display: flex; gap: 8px; }
	.news input { flex: 1; width: 100%; min-width: 0; height: 52px; padding: 0 20px; border: 0; border-radius: 999px; background: var(--white); box-shadow: inset 0 0 0 1px var(--line-strong); color: var(--ink); }
	.news input::placeholder { color: var(--muted); }
	.news input:focus { outline: 2px solid var(--apple-deep); outline-offset: 2px; }
	@media (min-width: 900px) { .news { padding-block: 48px; } .news__in { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: center; gap: 64px; } }

	/* Pie */
	.ft { margin-top: var(--pad); padding: 40px 0 28px; border-top: 1px solid var(--line); font-size: 14px; }
	.news + .ft, [data-view] + .ft { margin-top: 0; }
	.ft__in { display: grid; grid-template-columns: 1fr 1fr; gap: 28px 20px; }
	.ft__brand { grid-column: 1 / -1; }
	.ft__brand img { width: 112px; }
	.ft__brand p { margin-top: 10px; }
	.ft__col { display: grid; align-content: start; gap: 8px; }
	.ft__col h3 { margin-bottom: 4px; font-size: 13px; letter-spacing: .6px; color: var(--muted); }
	.ft__col a { color: var(--ink); text-decoration: none; }
	.ft__col a:hover { color: var(--apple-deep); }
	.ft__base { display: grid; gap: 16px; margin-top: 34px; padding-top: 22px; border-top: 1px solid var(--line); color: var(--muted); font-size: 13px; }
	.ft__base a { color: var(--muted); }
	@media (min-width: 900px) { .ft__in { grid-template-columns: 2fr 1fr 1fr 1fr; } .ft__brand { grid-column: auto; } .ft__base { grid-template-columns: auto 1fr; justify-items: end; align-items: center; } }

	/* Tienda (colección) */
	.coll { padding-top: 18px; }
	.coll__head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin-top: 12px; }
	.coll__title { font-size: 32px; letter-spacing: -1px; line-height: 1.1; }
	.coll__count { color: var(--muted); font-size: 14px; white-space: nowrap; }
	.coll__bar { display: grid; gap: 12px; margin: 20px 0 24px; padding-bottom: 16px; border-bottom: 1px solid var(--line); }
	.chips { display: flex; gap: 8px; margin: 0 calc(var(--gut) * -1); padding: 0 var(--gut); overflow-x: auto; scrollbar-width: none; }
	.chips::-webkit-scrollbar { display: none; }
	.chip { display: inline-flex; align-items: center; gap: 8px; min-height: 42px; padding: 8px 16px; border-radius: 999px; box-shadow: inset 0 0 0 1px var(--line-strong); color: var(--ink); font-size: 15px; white-space: nowrap; transition: background-color 160ms ease, box-shadow 160ms ease; }
	.chip span { color: var(--muted); font-size: 13px; }
	.chip:hover { background: var(--apple-50); }
	.chip[aria-pressed="true"] { background: var(--ink); color: var(--white); box-shadow: none; }
	.chip[aria-pressed="true"] span { color: #c7d3c4; }
	.sort { display: inline-flex; align-items: center; gap: 10px; font-size: 14px; color: var(--muted); }
	.sort select { height: 42px; padding: 0 36px 0 14px; border: 0; border-radius: 12px; background: var(--white) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230f1a10' stroke-width='1.6'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") right 10px center / 16px no-repeat; box-shadow: inset 0 0 0 1px var(--line-strong); color: var(--ink); font: inherit; appearance: none; }
	.coll__empty { padding: 40px 0; text-align: center; color: var(--muted); }
	@media (min-width: 900px) { .coll__title { font-size: 44px; letter-spacing: -1.5px; } .coll__bar { grid-template-columns: 1fr auto; align-items: center; } .chips { margin: 0; padding: 0; flex-wrap: wrap; } }

	/* Ficha de producto */
	.pdp { padding-top: 16px; }
	.pdp__grid { display: grid; gap: 22px; margin-top: 14px; }
	.gallery { min-width: 0; }
	.gallery__track { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; border-radius: 22px; scrollbar-width: none; }
	.gallery__track::-webkit-scrollbar { display: none; }
	.gallery__slide { flex: 0 0 100%; scroll-snap-align: start; aspect-ratio: 1; background: var(--apple-50); }
	.gallery__img { width: 100%; height: 100%; object-fit: cover; }
	.gallery__slide--contain { display: grid; place-items: center; background: radial-gradient(closest-side, var(--apple-100), var(--apple-50)); }
	.gallery__slide--contain .gallery__img { width: auto; height: 88%; object-fit: contain; mix-blend-mode: multiply; }
	.gallery__thumbs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 10px; }
	.thumb { overflow: hidden; aspect-ratio: 1; border-radius: 14px; background: var(--apple-50); box-shadow: inset 0 0 0 1px var(--line); opacity: .6; transition: opacity 160ms ease, box-shadow 160ms ease; }
	.thumb:hover { opacity: .85; }
	.thumb img { width: 100%; height: 100%; object-fit: cover; }
	.thumb--contain img { object-fit: contain; padding: 6px; mix-blend-mode: multiply; }
	.thumb[aria-current="true"] { opacity: 1; box-shadow: inset 0 0 0 2px var(--apple); }
	.buybox__brand { font-size: 13px; color: var(--muted); }
	.buybox__title { margin-top: 4px; font-size: 32px; line-height: 1.06; letter-spacing: -1.1px; }
	.buybox__sub { margin-top: 6px; color: var(--apple-deep); font-size: 15px; }
	.buybox__price { display: flex; align-items: baseline; gap: 12px; margin-top: 16px; font-size: 13px; color: var(--muted); }
	.buybox__price .price { font-size: 30px; letter-spacing: -0.6px; }
	.buybox__lead { margin-top: 14px; font-size: 16px; line-height: 1.55; }
	.buybox__row { display: grid; grid-template-columns: auto 1fr; gap: 10px; margin-top: 20px; }
	.buybox__now { margin-top: 10px; }
	.buybox__trust { display: grid; gap: 10px; margin-top: 20px; padding: 16px 18px; border-radius: 16px; background: var(--apple-50); font-size: 14px; }
	.buybox__trust li { display: flex; align-items: center; gap: 10px; }
	.buybox__trust .ic { width: 20px; height: 20px; color: var(--apple-deep); }
	.buybox__acc { margin-top: 12px; }
	.qa { border-bottom: 1px solid var(--line); }
	.qa summary { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 18px 0; color: var(--ink); font-size: 16px; line-height: 1.35; cursor: pointer; list-style: none; }
	.qa summary::-webkit-details-marker { display: none; }
	.qa summary .ic { width: 20px; color: var(--apple-deep); transition: transform 220ms var(--ease); }
	.qa[open] summary .ic { transform: rotate(45deg); }
	.qa__a { display: grid; gap: 8px; padding: 0 30px 18px 0; font-size: 15px; line-height: 1.6; }
	.qa__a .small { font-size: 13px; color: var(--muted); }
	@media (min-width: 900px) {
		.pdp { padding-top: 22px; }
		.pdp__grid { grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: 56px; align-items: start; margin-top: 20px; }
		.gallery { position: sticky; top: 100px; }
		.gallery__thumbs { grid-template-columns: repeat(4, 88px); }
		.buybox { padding-top: 8px; }
		.buybox__title { font-size: 46px; letter-spacing: -1.7px; }
		.buybox__price .price { font-size: 36px; }
	}
	.plants__list { display: grid; gap: 22px; margin-top: 20px; }
	.plant__img { width: 100%; aspect-ratio: 3 / 2; object-fit: cover; border-radius: var(--radius); }
	.plant h3 { margin-top: 12px; font-size: 20px; }
	.plant p { margin-top: 4px; font-size: 15px; }
	@media (min-width: 900px) { .plants__list { grid-template-columns: repeat(3, 1fr); gap: 28px; } }
	.faq__list { margin-top: 8px; max-width: 860px; }
	@media (min-width: 900px) { .faq { display: grid; grid-template-columns: 1fr 2fr; gap: 64px; } .faq__list { margin: 0; } .qa summary { font-size: 18px; } }

	/* Barra fija de compra (ficha, móvil) */
	.sticky { position: fixed; left: 10px; right: 10px; bottom: calc(10px + env(safe-area-inset-bottom)); z-index: 25; display: flex; align-items: center; gap: 10px; padding: 8px 8px 8px 10px; border-radius: 999px; background: var(--white); box-shadow: 0 0 0 1px var(--line), 0 18px 40px -18px rgba(15, 46, 11, .45); opacity: 0; transform: translateY(120%); transition: transform 360ms var(--ease-out), opacity 240ms ease; pointer-events: none; }
	.sticky.is-on { opacity: 1; transform: none; pointer-events: auto; }
	.sticky img { width: 34px; height: 44px; object-fit: contain; mix-blend-mode: multiply; }
	.sticky p { display: grid; flex: 1; font-size: 13px; line-height: 1.25; }
	.sticky .price { font-size: 16px; }
	.sticky .btn { min-height: 46px; padding: 8px 22px; }
	@media (min-width: 900px) { .sticky { left: auto; right: 24px; bottom: 24px; width: 360px; } }

	/* Carrito lateral */
	.drawer { position: fixed; inset: 0; z-index: 80; }
	.drawer__scrim { position: absolute; inset: 0; width: 100%; background: rgba(15, 26, 16, .38); opacity: 0; transition: opacity 340ms ease; cursor: default; }
	.drawer__panel { position: absolute; top: 0; right: 0; bottom: 0; display: flex; flex-direction: column; width: min(440px, 100%); background: var(--white); box-shadow: -30px 0 60px -30px rgba(15, 46, 11, .35); transform: translateX(100%); transition: transform 380ms var(--ease-out); }
	.drawer.is-open .drawer__scrim { opacity: 1; }
	.drawer.is-open .drawer__panel { transform: none; }
	.drawer__hd { display: flex; justify-content: space-between; align-items: center; padding: 18px 20px; border-bottom: 1px solid var(--line); }
	.drawer__hd h2 { font-size: 22px; letter-spacing: -0.4px; }
	.drawer__body, .drawer__empty { flex: 1; padding: 20px; overflow-y: auto; }
	.drawer.is-empty .drawer__body, .drawer.is-empty .drawer__ft { display: none; }
	.drawer:not(.is-empty) .drawer__empty { display: none; }
	.drawer__empty { display: grid; align-content: center; justify-items: center; gap: 16px; color: var(--ink); font-size: 18px; text-align: center; }
	.line { display: grid; grid-template-columns: 84px 1fr auto; gap: 14px; align-items: start; }
	.line__img { display: grid; place-items: center; height: 104px; border-radius: 16px; background: radial-gradient(closest-side, var(--apple-100), var(--apple-50)); }
	.line__img img { height: 88px; width: auto; mix-blend-mode: multiply; }
	.line__info h3 { font-size: 17px; line-height: 1.25; }
	.line__info > p { font-size: 14px; color: var(--muted); }
	.line__row { display: flex; align-items: center; gap: 14px; margin-top: 10px; }
	.line__remove { color: var(--muted); font-size: 13px; text-decoration: underline; text-underline-offset: 3px; }
	.line__remove:hover { color: var(--ink); }
	.line__total { color: var(--ink); font-size: 15px; white-space: nowrap; }
	.drawer__ft { display: grid; gap: 12px; padding: 18px 20px calc(18px + env(safe-area-inset-bottom)); border-top: 1px solid var(--line); }
	.drawer__sub { display: flex; justify-content: space-between; align-items: baseline; color: var(--ink); font-size: 17px; }
	.drawer__sub strong { font-size: 22px; letter-spacing: -0.4px; }
	.drawer__note { font-size: 13px; color: var(--muted); }
	.drawer__ft .pay { justify-content: center; }
`

export default () => `<!doctype html>
<html lang="es-MX">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Nambu México · Propuesta A · Tienda de marca</title>
<style>${ROOT_CSS}${FRAME_CSS}${CSS}</style>
</head>
<body>
${frame({ name: 'Propuesta A · Tienda de marca', other: 'Propuesta B', otherHref: 'b-compra-rapida.html' })}
<div class="store" data-store>
	${announcement()}
	${header()}
	<main>
		<div data-view="inicio">
			${banner()}
			${categories()}
			${featured()}
			${spotlight()}
			${voices()}
			${trust()}
			${help()}
		</div>
		<div data-view="tienda" hidden>${collection()}</div>
		<div data-view="producto" hidden>${pdp()}</div>
	</main>
	${newsletter()}
	${footer()}
	${sticky()}
	${drawer()}
</div>
<script>
(() => {
${STORE_JS}
})()
</script>
</body>
</html>
`

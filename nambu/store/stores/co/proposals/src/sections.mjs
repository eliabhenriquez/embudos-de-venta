// Bloques de la portada propuesta. Lo que ya existe usa las clases del tema de Colombia (nb-); lo nuevo tiene su
// CSS en proposal.css. La cabecera y el pie son los publicados, con Instagram añadido.
import { readFileSync } from 'node:fs'
import { BEST_SELLERS, CDN, FAQS, HERO, INSTAGRAM_URL, KIT, KIT_PROMO, NEEDS, NEWSLETTER, NUMBERS, PRODUCTS, RIBBON, STORE_URL, STORY, SUPPORT_EMAIL, VOICES, WHATSAPP_URL } from './content.mjs'
import { icon } from './icons.mjs'

const ASSETS = new URL('./assets/', import.meta.url)
const WORDMARK = { file: 'landings-nambu-wordmark-green.webp', v: 1790023349, w: 400, h: 97 }

const money = amount => `$${amount.toLocaleString('es-CO')}`
const productUrl = handle => `${STORE_URL}/products/${handle}`
const pending = (html, isPending) => isPending ? `<span class="nb-pending">${html}</span>` : html

// Imagen del CDN de la tienda con srcset; `v` es la versión de Shopify cuando el archivo la tiene
const cdnImage = ({ file, v, w, h, alt = '', widths, sizes, className, eager = false }) => {
	const url = width => `${CDN}/${file}?${v ? `v=${v}&` : ''}width=${width}`
	const max = widths[widths.length - 1]
	const loading = eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy" decoding="async"'
	return `<img src="${url(max)}" srcset="${widths.map(width => `${url(width)} ${width}w`).join(', ')}" sizes="${sizes}" width="${w}" height="${h}" alt="${alt}" class="${className}" ${loading}>`
}

// Imagen propia de la propuesta (assets/), incrustada para que el HTML se vea completo enviado solo
const inlineImage = ({ asset, w, h, alt }, className) => {
	const data = readFileSync(new URL(asset, ASSETS)).toString('base64')
	return `<img src="data:image/webp;base64,${data}" width="${w}" height="${h}" alt="${alt}" class="${className}" loading="lazy" decoding="async">`
}

const productImage = (handle, { sizes, className, widths = [180, 360, 540, 720] }) => {
	const product = PRODUCTS[handle]
	return cdnImage({ file: product.image, v: product.v, w: 1440, h: 1440, widths, sizes, className })
}

const addButton = (label, item, className, withIcon = false) =>
	`<button type="button" class="${className}" data-add="${item}">${withIcon ? icon('plus') : ''}<span>${label}</span></button>`

const kitPair = (thumbClass, sizes) => `<span class="nb-kit__pair">${KIT.items.map(handle => productImage(handle, { sizes, className: thumbClass, widths: [120, 240] })).join(`<span class="nb-kit__plus">${icon('plus')}</span>`)}</span>`

const kitName = () => pending(KIT.name.text, KIT.name.pending)
const kitPrice = () => pending(money(KIT.price.amount), KIT.price.pending)
const kitSaving = () => pending(money(KIT.saving.amount), KIT.saving.pending)

// Cabecera publicada + Instagram junto a las herramientas y al final del menú móvil
export const header = snapshot => snapshot
	.replace('<div class="nb-header__tools">', `<div class="nb-header__tools">
			<a class="nb-header__icon nb-header__ig" href="${INSTAGRAM_URL}" target="_blank" rel="noopener" aria-label="Instagram de Nambu">${icon('instagram')}</a>`)
	.replace('</nav>\n\t\t</details>', `<a href="${INSTAGRAM_URL}" target="_blank" rel="noopener">Instagram @nambuoficial${icon('instagram')}</a></nav>\n\t\t</details>`)

// Pie publicado + el enlace de Instagram que el tema ya pinta cuando el ajuste «Instagram» tiene URL
export const footer = snapshot => snapshot.replace(/(<div class="nb-footer__brand">[\s\S]*?<\/a>)(<\/div>)/, `$1<p class="nb-footer__tagline">${NUMBERS.tagline}</p><a class="nb-footer__social" href="${INSTAGRAM_URL}" target="_blank" rel="noopener">${icon('instagram')}<span>Instagram</span></a>$2`)

export const hero = () => `<div class="shopify-section nb-section-kithero"><section class="nb-kithero" id="kit-hero" aria-labelledby="KitHeroTitle">
	<div class="nb-shell nb-kithero__in">
		<div class="nb-kithero__visual">
			<div class="nb-kithero__stage" data-stage aria-roledescription="carrusel" aria-label="Clientes reales del Spray Nasal">
				<ul class="nb-kithero__slides">${HERO.slides.map((slide, index) => `<li class="nb-kithero__slide${index === 0 ? ' is-active' : ''}" data-slide data-name="${slide.name}" aria-roledescription="foto" aria-label="${index + 1} de ${HERO.slides.length}"${index === 0 ? '' : ' aria-hidden="true"'}>
					${cdnImage({ ...slide, widths: [480, 720, 960], sizes: '(min-width: 900px) 560px, 100vw', className: 'nb-kithero__img', eager: index === 0 })}
				</li>`).join('')}</ul>
			</div>
			<div class="nb-kithero__meta">
				<p class="nb-kithero__who">Clientes reales del Spray · <strong data-who>${HERO.slides[0].name}</strong></p>
				<div class="nb-kithero__bars">${HERO.slides.map((slide, index) => `<button type="button" class="nb-kithero__bar${index === 0 ? ' is-active' : ''}" data-go="${index}" aria-label="Ver la foto de ${slide.name}"${index === 0 ? ' aria-current="true"' : ''}><span></span></button>`).join('')}</div>
			</div>
		</div>
		<div class="nb-kithero__copy">
			<h2 id="KitHeroTitle" class="nb-kithero__title">${HERO.title}</h2>
			<p class="nb-kithero__lead">${HERO.lead}</p>
			<div class="nb-kit">
				${kitPair('nb-kit__thumb', '64px')}
				<p class="nb-kit__info">
					<span class="nb-kit__name"><span class="nb-kit__new">Nuevo</span> ${kitName()}</span>
					<span class="nb-kit__items">${KIT.itemsLabel}</span>
				</p>
				<p class="nb-kit__price">
					<span class="nb-price">${kitPrice()}</span>
					<span class="nb-kit__apart">Por separado ${money(KIT.apart)}</span>
					<span class="nb-kit__save">Ahorras ${kitSaving()}</span>
				</p>
			</div>
			<div class="nb-kithero__act">
				${addButton('Agregar el kit al carrito', 'kit', 'nb-btn nb-btn--block')}
				<a class="nb-link" href="#kit">Qué trae el kit ${icon('arrow')}</a>
			</div>
		</div>
	</div>
</section></div>`

const ribbonList = hidden => `<ul class="nb-ribbon__list"${hidden ? ' aria-hidden="true"' : ''}>${RIBBON.map(({ icon: name, text }) => `<li class="nb-ribbon__item">${icon(name)}<span>${text}</span></li><li class="nb-ribbon__sep" aria-hidden="true">${icon('sparkle')}</li>`).join('')}</ul>`

export const ribbon = () => `<div class="shopify-section nb-section-ribbon"><section class="nb-ribbon" aria-label="Por qué comprar en Nambu">
	<div class="nb-ribbon__band"><div class="nb-ribbon__track">${ribbonList(false)}${ribbonList(true)}</div></div>
</section></div>`

const railHead = (id, title, link) => `<div class="nb-shell nb-head">
	<h2 id="${id}" class="nb-h2">${title}</h2>
	<div class="nb-rail-tools">
		${link ?? ''}
		<div class="nb-arrows">
			<button type="button" class="nb-round" data-prev aria-label="Anterior">${icon('left')}</button>
			<button type="button" class="nb-round" data-next aria-label="Siguiente">${icon('right')}</button>
		</div>
	</div>
</div>`

const productCard = (handle, index) => {
	const product = PRODUCTS[handle]
	return `<li class="nb-pcard nb-tint--${product.tint}">
	<a class="nb-pcard__media" href="${productUrl(handle)}" tabindex="-1" aria-hidden="true">
		${productImage(handle, { sizes: '(min-width: 900px) 290px, 62vw', className: 'nb-pcard__img' })}
		${index === 0 ? '<span class="nb-pcard__badge">El más vendido</span>' : ''}
	</a>
	<div class="nb-pcard__body">
		<p class="nb-pcard__type">${product.type}</p>
		<h3 class="nb-pcard__name"><a href="${productUrl(handle)}">${product.title}</a></h3>
		${product.sub ? `<p class="nb-pcard__sub">${product.sub}</p>` : ''}
	</div>
	<div class="nb-pcard__buy">
		<span class="nb-price">${money(product.price)}</span>
		${addButton('Agregar', handle, 'nb-pcard__add', true)}
	</div>
</li>`
}

export const bestSellers = () => `<div class="shopify-section nb-section-best"><section class="nb-best" id="best" aria-labelledby="BestTitle">
	<div data-rail>
		${railHead('BestTitle', 'Lo más vendido', `<a class="nb-link" href="${STORE_URL}/collections/productos">Ver todos ${icon('arrow')}</a>`)}
		<ul class="nb-best__track" data-track>${BEST_SELLERS.map(productCard).join('')}</ul>
	</div>
	<p class="nb-best__more"><a class="nb-link" href="${STORE_URL}/collections/productos">Ver todos los productos ${icon('arrow')}</a></p>
</section></div>`

export const kitPromo = () => `<div class="shopify-section nb-section-kitpromo" id="kit"><section class="nb-kitpromo" aria-labelledby="KitPromoTitle">
	<div class="nb-shell nb-kitpromo__in">
		<figure class="nb-kitpromo__visual">
			${cdnImage({ ...KIT.visual.spray, widths: [300, 450, 600], sizes: '(min-width: 900px) 220px, 34vw', className: 'nb-kitpromo__spray' })}
			${inlineImage(KIT.visual.chest, 'nb-kitpromo__chest')}
			<figcaption class="nb-kitpromo__tag">Nuevo · ${kitName()}</figcaption>
		</figure>
		<div class="nb-kitpromo__copy">
			<h2 id="KitPromoTitle" class="nb-kitpromo__title">Ahorra ${kitSaving()} con el ${kitName()}</h2>
			<p class="nb-kitpromo__lead">${KIT_PROMO.lead}</p>
			<ul class="nb-kitpromo__perks">${KIT_PROMO.benefits.map(({ icon: name, text, amount }) => `<li class="nb-kitpromo__perk">
				<span class="nb-kitpromo__icon">${icon(name)}</span>
				<span>${amount ? `${text.replace('Ahorras', `Ahorras ${kitSaving()}`)}` : text}</span>
			</li>`).join('')}</ul>
			<div class="nb-kitpromo__buy">
				<p class="nb-kitpromo__price"><span class="nb-price">${kitPrice()}</span><span>${KIT.itemsLabel}</span></p>
				${addButton(KIT_PROMO.button, 'kit', 'nb-btn')}
			</div>
		</div>
	</div>
</section></div>`

export const needsFinder = () => `<div class="shopify-section nb-section-finder"><section class="nb-finder" aria-labelledby="FinderTitle">
	<div class="nb-shell">
		<div class="nb-finder__head">
			<h2 id="FinderTitle" class="nb-h2">Elige lo que quieres mejorar hoy</h2>
			<p class="nb-finder__lead">Encuentra la fórmula que mejor acompaña tu rutina de cuidado.</p>
		</div>
		<div class="nb-finder__in" data-finder>
			<div class="nb-finder__needs" role="tablist" aria-label="Lo que quieres mejorar">${NEEDS.map(({ label }, index) => `<button type="button" role="tab" class="nb-finder__need" id="NeedTab-${index}" aria-controls="NeedPanel-${index}" aria-selected="${index === 0}"${index === 0 ? '' : ' tabindex="-1"'}><span>${label}</span>${icon('arrow')}</button>`).join('')}</div>
			<div class="nb-finder__panels">${NEEDS.map(({ product: handle }, index) => {
				const product = PRODUCTS[handle]
				return `<article role="tabpanel" class="nb-finder__panel nb-tint--${product.tint}" id="NeedPanel-${index}" aria-labelledby="NeedTab-${index}" data-panel>
					<a class="nb-finder__media" href="${productUrl(handle)}" tabindex="-1" aria-hidden="true">${productImage(handle, { sizes: '(min-width: 900px) 360px, 44vw', className: 'nb-finder__img', widths: [240, 360, 540, 720] })}</a>
					<div class="nb-finder__body">
						<p class="nb-pcard__type">${product.type}</p>
						<h3 class="nb-finder__name"><a href="${productUrl(handle)}">${product.title}</a></h3>
						<p class="nb-pcard__sub">${product.sub}</p>
						<p class="nb-finder__text">${product.short}</p>
						<div class="nb-finder__buy">
							<span class="nb-price">${money(product.price)}</span>
							${addButton('Agregar al carrito', handle, 'nb-btn')}
						</div>
					</div>
				</article>`
			}).join('')}</div>
		</div>
	</div>
</section></div>`

export const voices = () => `<div class="shopify-section nb-section-proof"><section class="nb-proof" aria-labelledby="ProofTitle">
	<div data-rail>
		${railHead('ProofTitle', 'Lo que cuentan quienes ya lo usan')}
		<ul class="nb-proof__track" data-track>${VOICES.map(voice => `<li class="nb-proof__card">
			<figure class="nb-proof__media">${cdnImage({ file: voice.photo, w: voice.w, h: voice.h, alt: `${voice.name} con su Spray Nasal de Nambu`, widths: [360, 540, 700], sizes: '(min-width: 900px) 300px, 76vw', className: 'nb-proof__img' })}</figure>
			<div class="nb-proof__body">
				<p class="nb-proof__quote">“${voice.quote}”</p>
				<p class="nb-proof__text">${voice.text}</p>
				<p class="nb-proof__who"><strong>${voice.name}</strong><a class="nb-proof__tag" href="${productUrl('spray-nasal-nambu')}">Spray Nasal</a></p>
			</div>
		</li>`).join('')}</ul>
	</div>
</section></div>`

export const numbers = () => `<div class="shopify-section nb-section-numbers"><section class="nb-numbers" aria-label="Por qué elegir Nambu">
	<div class="nb-shell nb-numbers__in">
		<ul class="nb-numbers__list">${NUMBERS.items.map(({ icon: name, figure, text }) => `<li class="nb-numbers__item">
			${figure ? `<span class="nb-numbers__figure">${pending(figure.text, figure.pending)}</span>` : `<span class="nb-numbers__icon">${icon(name)}</span>`}
			<p class="nb-numbers__text">${text}</p>
		</li>`).join('')}</ul>
		<div class="nb-numbers__brand">
			${cdnImage({ ...WORDMARK, alt: 'Nambu', widths: [200, 400], sizes: '180px', className: 'nb-numbers__logo' })}
			<p class="nb-numbers__tagline">${NUMBERS.tagline}</p>
			<a class="nb-btn" href="${STORE_URL}/collections/productos"><span>${NUMBERS.button}</span>${icon('arrow')}</a>
		</div>
	</div>
</section></div>`

export const story = () => `<div class="shopify-section nb-section-story"><section class="nb-story" aria-labelledby="StoryTitle">
	<div class="nb-shell nb-story__in">
		<figure class="nb-story__media">${inlineImage(STORY.image, 'nb-story__img')}</figure>
		<div class="nb-story__copy">
			<h2 id="StoryTitle" class="nb-h2">${STORY.title}</h2>
			<div class="nb-story__text nb-rte">${STORY.paragraphs.map(text => `<p>${text}</p>`).join('')}</div>
			<a class="nb-btn nb-btn--ghost nb-story__btn" href="${STORE_URL}${STORY.button.href}">${STORY.button.label}</a>
		</div>
	</div>
</section></div>`

export const faq = () => `<div class="shopify-section nb-section-faq"><section class="nb-shell nb-faq" aria-labelledby="FaqTitle">
	<div class="nb-faq__intro">
		<h2 id="FaqTitle" class="nb-h2">Preguntas frecuentes</h2>
		<p class="nb-faq__lead">¿Te queda otra duda? Te respondemos por WhatsApp.</p>
		<div class="nb-faq__cta">
			<a class="nb-btn" href="${WHATSAPP_URL}" target="_blank" rel="noopener">${icon('chat')}<span>Escríbenos por WhatsApp</span></a>
			<a class="nb-link" href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>
		</div>
	</div>
	<div class="nb-faq__list">${FAQS.map(({ q, a }, index) => `<details class="nb-qa"${index === 0 ? ' open' : ''}>
		<summary>${q}${icon('plus')}</summary>
		<p class="nb-qa__a">${a}</p>
	</details>`).join('')}</div>
</section></div>`

export const newsletter = () => `<div class="shopify-section nb-section-news" id="newsletter"><section class="nb-news" aria-labelledby="NewsTitle">
	<div class="nb-shell nb-news__in">
		<div class="nb-news__copy">
			<span class="nb-news__badge">${icon('percent')}</span>
			<div>
				<h2 id="NewsTitle" class="nb-h2">${NEWSLETTER.title}</h2>
				<p class="nb-news__text">${NEWSLETTER.text}</p>
			</div>
		</div>
		<form class="nb-news__form" data-news>
			<label class="nb-sr" for="NewsEmail">Correo electrónico</label>
			<input id="NewsEmail" type="email" name="email" placeholder="Tu correo electrónico" autocomplete="email" required>
			<button type="submit" class="nb-btn">${NEWSLETTER.button}</button>
			<p class="nb-news__fine">Puedes darte de baja cuando quieras.</p>
		</form>
	</div>
</section></div>`

export const stickyKit = () => `<div class="nb-sticky nb-sticky--kit" data-sticky-kit inert>
	${kitPair('nb-sticky__img', '40px')}
	<p><strong>${kitName()}</strong><span class="nb-price">${kitPrice()}</span></p>
	${addButton('Agregar', 'kit', 'nb-btn')}
</div>`

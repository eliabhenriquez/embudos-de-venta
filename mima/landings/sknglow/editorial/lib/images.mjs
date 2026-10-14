// Catálogo de imágenes de los formatos editoriales de SKNGLOW (advertorial, listicle).
// Todas viven en ../../assets/ y se suben a Contenido → Archivos con el mismo nombre.
// El `alt` describe lo que se ve; lo que la imagen argumenta va en el pie, con frases del copy.

const CDN = 'https://www.mimacolombia.com/cdn/shop/files/'

export const IMAGES = {
	// ── Advertorial de cabello ─────────────────────────────────────────────
	'cab-raya': { file: 'landings-sknglow-adv-cab-raya.webp', w: 1254, h: 553, alt: 'Vista cenital de una cabeza de cabello castaño con la raya ancha y el cuero cabelludo a la vista' },
	'cab-ciclo': { file: 'landings-sknglow-adv-cab-ciclo.webp', w: 1254, h: 1254, alt: 'Corte de la piel con tres folículos: en crecimiento, en transición y en caída' },
	'cab-estres': { file: 'landings-sknglow-adv-cab-estres.webp', w: 1254, h: 1254, alt: 'Lámina «Del estrés al cabello en caída»: estrés sostenido, cortisol elevado, alteración hormonal y folículo debilitado' },
	'cab-estres-1': { file: 'landings-sknglow-adv-cab-estres-1.webp', w: 322, h: 770, alt: 'Estrés sostenido: la activación prolongada del sistema de respuesta al estrés mantiene elevados los niveles de cortisol' },
	'cab-estres-2': { file: 'landings-sknglow-adv-cab-estres-2.webp', w: 302, h: 770, alt: 'Cortisol elevado: el estrés sostenido aumenta la liberación de cortisol' },
	'cab-estres-3': { file: 'landings-sknglow-adv-cab-estres-3.webp', w: 304, h: 770, alt: 'Alteración hormonal: el exceso de cortisol puede desequilibrar otras señales hormonales que regulan el ciclo capilar' },
	'cab-estres-4': { file: 'landings-sknglow-adv-cab-estres-4.webp', w: 310, h: 770, alt: 'Folículo debilitado: un cabello más fino y una mayor caída' },
	'cab-foliculos': { file: 'landings-sknglow-adv-cab-foliculos.webp', w: 1254, h: 1254, alt: 'Comparación entre un folículo piloso sano, con fibra gruesa, y un folículo miniaturizado, con fibra fina' },
	'cab-fibras': { file: 'landings-sknglow-adv-cab-fibras.webp', w: 1254, h: 698, alt: 'Tres folículos seguidos: fibra gruesa, fibra intermedia y fibra fina, resultado de varios ciclos debilitados' },
	'cab-antioxidante': { file: 'landings-sknglow-adv-cab-antioxidante.webp', w: 1254, h: 1254, alt: 'Corte del bulbo capilar con moléculas antioxidantes neutralizando radicales libres a su alrededor' },
	'cab-queratina': { file: 'landings-sknglow-adv-cab-queratina.webp', w: 1254, h: 1254, alt: 'Corte del folículo con el detalle de las células de la matriz y la síntesis de queratina' },

	// ── Advertorial de piel ────────────────────────────────────────────────
	'piel-mancha': { file: 'landings-sknglow-adv-piel-mancha.webp', w: 1254, h: 1254, alt: 'Bloque de piel en corte con una zona más oscura en la superficie y los melanocitos de la capa basal liberando pigmento' },
	'piel-melanocito': { file: 'landings-sknglow-adv-piel-melanocito.webp', w: 1254, h: 1254, alt: 'Un melanocito con sus dendritas repartiendo melanina entre los queratinocitos' },
	'piel-hormonas': { file: 'landings-sknglow-adv-piel-hormonas.webp', w: 1254, h: 1254, alt: 'Estrógeno, progesterona e inflamación cutánea llegando al mismo melanocito, que produce más pigmento' },
	'piel-pigmento': { file: 'landings-sknglow-adv-piel-pigmento.webp', w: 1254, h: 1254, alt: 'Corte de la epidermis con depósitos de pigmento que suben desde la capa basal hasta la superficie' },
	'piel-antioxidante': { file: 'landings-sknglow-adv-piel-antioxidante.webp', w: 1254, h: 1254, alt: 'Corte de la piel con radicales libres y antioxidantes alrededor de un melanocito activo' },
	'piel-renovacion': { file: 'landings-sknglow-adv-piel-renovacion.webp', w: 1254, h: 1254, alt: 'Renovación epidérmica: células nuevas que suben hacia la superficie, con el detalle del metabolismo celular de proteínas' },

	// ── Listicle de cabello ────────────────────────────────────────────────
	'lst-cab-caida': { file: 'landings-sknglow-lst-cab-caida.webp', w: 1254, h: 1254, alt: 'Mujer recién salida de la ducha mira con preocupación los cabellos que se le quedaron entre los dedos; en la otra mano, un cepillo lleno de pelo' },
	'lst-cab-foliculo': { file: 'landings-sknglow-lst-cab-foliculo.webp', w: 1254, h: 1254, alt: 'Corte de la piel con un folículo piloso al que llegan por la sangre proteína, hierro, zinc y vitaminas' },
	'lst-cab-rutina': { file: 'landings-sknglow-lst-cab-rutina.webp', w: 1254, h: 1254, alt: 'Mujer sonriente se cepilla el cabello largo en su escritorio; a su lado, una taza y un frasco de Sknglow' },

	// ── Listicle de piel ───────────────────────────────────────────────────
	'lst-piel-apagada': { file: 'landings-sknglow-lst-piel-apagada.webp', w: 1254, h: 1254, alt: 'Mujer con gesto de cansancio apoya la mejilla en la mano y mira por la ventana' },
	'lst-piel-barrera': { file: 'landings-sknglow-lst-piel-barrera.webp', w: 1254, h: 1254, alt: 'Comparación de la barrera de la piel: organizada, con las células alineadas y el agua retenida, y debilitada, con las células separadas y pérdida de agua' },
	'lst-piel-tocador': { file: 'landings-sknglow-lst-piel-tocador.webp', w: 1254, h: 1254, alt: 'Tocador visto desde arriba, lleno de cremas, sérums, mascarillas y maquillaje, con un frasco de Sknglow en el centro' },

	// ── Del producto y de la marca: ya estaban en assets/ y se reutilizan tal cual ──
	product: { file: 'landings-sknglow-product.webp', w: 581, h: 1000, alt: 'Frasco de Sknglow de MIMA, con Resveratrol y Biotina, junto a cuatro dulces duros' },
	// UGC del pool real (humanized-images/sknglow): la misma que usa la galería de la landing de piel
	'ugc-shelyka': { file: 'landings-sknglow-ugc-shelyka.webp', w: 510, h: 924, alt: 'Shelyka mira a cámara y sostiene su frasco de Sknglow junto al rostro' },
	logo: { file: 'landings-sknglow-mima-mark.webp', w: 300, h: 151, alt: 'MIMA' },
	instagram: { file: 'landings-sknglow-instagram-u.webp', w: 1600, h: 626, alt: 'Perfil de Instagram de MIMA, @mima_tiendaoficial, con 106 mil seguidores' },
	visa: { file: 'landings-sknglow-pay-visa.webp', w: 222, h: 72, alt: 'Visa' },
	mastercard: { file: 'landings-sknglow-pay-mastercard.webp', w: 92, h: 72, alt: 'Mastercard' },
	pse: { file: 'landings-sknglow-pay-pse.webp', w: 72, h: 72, alt: 'PSE' }
}

export const image = key => {
	const found = IMAGES[key]
	if (!found) throw new Error(`Imagen desconocida: ${key}`)
	return found
}

// Sin ancho devuelve el archivo tal cual (lo que abre el visor de láminas)
export const url = (key, width) => `${CDN}${image(key).file}${width ? `?width=${width}` : ''}`

// Cómo carga cada imagen: la que abre el artículo es el LCP; el logotipo de arriba se ve
// desde el primer momento pero no compite con ella; el resto espera a acercarse.
const LOADING = {
	lead: 'fetchpriority="high" decoding="async"',
	eager: 'decoding="async"',
	lazy: 'loading="lazy" decoding="async"'
}

// widths: variantes que sirve el CDN, de menor a mayor (la última es el `src`)
export const img = (key, { widths, sizes, priority = 'lazy', className } = {}) => {
	const { w, h, alt } = image(key)
	const fitting = (widths || [w]).filter(width => width <= w)
	const srcset = fitting.length > 1 ? ` srcset="${fitting.map(width => `${url(key, width)} ${width}w`).join(', ')}" sizes="${sizes}"` : ''
	const loading = LOADING[priority]
	return `<img${className ? ` class="${className}"` : ''} src="${url(key, fitting[fitting.length - 1])}"${srcset} width="${w}" height="${h}" ${loading} alt="${alt}">`
}

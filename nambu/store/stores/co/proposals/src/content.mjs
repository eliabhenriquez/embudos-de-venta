// Datos de la propuesta de portada de nambuoficial.com. De dónde sale cada uno, en su comentario.
// Lo marcado con `pending: true` no existe todavía: sale con el punteado ámbar de «dato por definir».

export const STORE_URL = 'https://nambuoficial.com'
export const CDN = `${STORE_URL}/cdn/shop/files`
export const WHATSAPP_URL = 'https://wa.me/573207948642'
export const INSTAGRAM_URL = 'https://www.instagram.com/nambuoficial/'
export const SUPPORT_EMAIL = 'nambushop.col@gmail.com'

// Cinta bajo la portada. Envío, plazo, guía y reposición: políticas de envío y de devolución publicadas (2026-10-21).
// El 10%: formulario «Email Popup Principal» de Klaviyo (cupón confirmado por el usuario el 2026-10-21).
export const RIBBON = [
	{ icon: 'cash', text: 'Pago contra entrega' },
	{ icon: 'truck', text: 'Envío gratis a toda Colombia' },
	{ icon: 'clock', text: 'Llega en 3 a 5 días hábiles' },
	{ icon: 'chat', text: 'Guía de seguimiento por WhatsApp' },
	{ icon: 'shield', text: 'Si llega dañado, te enviamos otro' },
	{ icon: 'percent', text: '10% en tu primera compra' }
]

// Catálogo de la colección «productos» (products.json de la tienda, 2026-10-21). Títulos propuestos: el usuario
// los está corrigiendo en Shopify (hoy van en mayúsculas y con punto final). Subtítulo y descripción corta:
// metacampos custom.subtitle y custom.short_description (stores/co/data/content.json).
// `tint`: el color de la etiqueta de cada producto, en tinte claro, detrás de su foto.
export const PRODUCTS = {
	'spray-nasal-nambu': { title: 'Spray Nasal', type: 'Bienestar', tint: 'green', sub: 'Eucalipto · Menta · Regaliz', short: 'Combina eucalipto, menta y regaliz para acompañar la sensación de despeje nasal y comodidad respiratoria.', price: 79900, image: 'SpraynasalNAMBUorganico.webp', v: 1792534623 },
	'serum-piel-de-porcelana-1': { title: 'Sérum Piel de Porcelana', type: 'Belleza', tint: 'blue', sub: 'Ácido Kójico · Vitamina C · Niacinamida', short: 'Transforma tu piel con un tono uniforme y radiante.', price: 79900, image: 'serum-piel-porcelana-img-tienda.webp', v: 1792534587 },
	'jabon-piel-de-porcelana': { title: 'Pack de 3 jabones Cuerpo de Porcelana', type: 'Belleza', tint: 'blue', price: 69900, image: 'jabon-porcelana-img-tienda_d8419bf3-cbe1-45a9-8414-f79a7b6ddde1.webp', v: 1792534472 },
	'kit-de-porcelana-1': { title: 'Kit de Porcelana', type: 'Belleza', tint: 'blue', price: 99900, image: 'kit-cuerpo-porcelana-img-tienda.webp', v: 1792534433 },
	'serum-niacinamida-10': { title: 'Sérum Niacinamida 10%', type: 'Bienestar', tint: 'violet', sub: 'Niacinamida al 10% · Ácido Hialurónico', short: 'Equilibra, hidrata y transforma tu piel en un solo paso.', price: 69700, image: 'serum-niacinamide-10-img-tienda.webp', v: 1792534325 },
	'unguento-chest-relief-1': { title: 'Ungüento Chest Relief', type: 'Bienestar', tint: 'green', sub: 'Eucalipto · Menta · Tomillo', price: 45000, image: 'Chest-relie-img-tienda.webp', v: 1792534292 },
	'jabon-de-porcelana': { title: 'Jabón de Porcelana', type: 'Belleza', tint: 'blue', price: 18000, image: 'jabon-porcelana-img-tienda.webp', v: 1792534387 },
	'golden-glow-plantilla': { title: 'Golden Glow, aclarante de cabello', type: 'Belleza', tint: 'yellow', sub: 'Manzanilla · Miel · Limón', short: 'Ilumina tu cabello naturalmente con reflejos dorados.', price: 59900, image: 'golden-glow-img-tienda.webp', v: 1792534359 },
	'1-week-fortalecedor-de-unas-copia': { title: '1 Week, fortalecedor de uñas', type: 'Bienestar', tint: 'green', sub: 'Biotina · Colágeno · Aceite de Argán', short: 'Fortalece y transforma tus uñas en solo 7 días.', price: 69900, image: '1-week-img-tienda.webp', v: 1792533994 },
	'isoul-1': { title: 'ISOUL, autobronceador', type: 'Belleza', tint: 'orange', sub: 'DHA · Eritrulosa · Sistema Antimanchas', short: 'Brilla naturalmente sin miedo al bronceado artificial.', price: 89900, image: 'isoul-img-tienda.webp', v: 1792534040 }
}

// Orden real de «Más vendidos» de Shopify (/collections/productos?sort_by=best-selling, 2026-10-21)
export const BEST_SELLERS = ['spray-nasal-nambu', 'serum-piel-de-porcelana-1', 'jabon-piel-de-porcelana', 'kit-de-porcelana-1', 'serum-niacinamida-10', 'unguento-chest-relief-1', 'jabon-de-porcelana', 'golden-glow-plantilla']

// Kit: producto nuevo. Une los dos más vendidos de respiración (el Spray es el n.º 1; Chest Relief ya sale como
// complemento del Spray en el formulario de las landings). Nombre y precio de ejemplo: los decide el cliente.
const KIT_APART = 79900 + 45000
const KIT_PRICE = 99900
export const KIT = {
	name: { text: 'Kit Respira', pending: true },
	items: ['spray-nasal-nambu', 'unguento-chest-relief-1'],
	itemsLabel: 'Spray Nasal 60 ml + Ungüento Chest Relief 30 ml',
	price: { amount: KIT_PRICE, pending: true },
	// Suma de los precios publicados de los dos productos
	apart: KIT_APART,
	saving: { amount: KIT_APART - KIT_PRICE, pending: true },
	// Composición del kit sin foto propia: el frasco nivelado de las landings (CDN) y el tarro nivelado a blanco
	// (assets/kit-chest-relief-level.webp, de la foto de la tienda); los dos se funden con el panel por multiplicación
	visual: {
		spray: { file: 'landings-spray-packshot.webp', w: 601, h: 1100, alt: 'Spray Nasal de Nambu, 60 ml' },
		chest: { asset: 'kit-chest-relief-level.webp', w: 601, h: 640, alt: 'Ungüento Chest Relief de Nambu, 30 ml' }
	}
}

// Portada. Título: el aprobado para la portada de Colombia. Texto: copy aprobado del Spray («ayudar a despejar la
// sensación de congestión») y de Chest Relief (frescor en el pecho; «muchas personas prefieren usarlo antes de dormir»).
// Fotos: clientes reales del pool de UGC del Spray (nambu/landings/spray/src/lib/pool.mjs).
export const HERO = {
	title: 'Que la congestión deje de arruinar tu día.',
	lead: 'El Spray Nasal ayuda a despejar la sensación de congestión y el Ungüento Chest Relief deja frescor en el pecho antes de dormir.',
	slides: [
		{ file: 'landings-spray-ugc-catalina-aplica.webp', w: 688, h: 1124, name: 'Catalina', alt: 'Catalina se aplica el Spray Nasal de Nambu' },
		{ file: 'landings-spray-ugc-carlos-mauricio-aplica.webp', w: 680, h: 1100, name: 'Carlos Mauricio', alt: 'Carlos Mauricio se aplica el Spray Nasal de Nambu' },
		{ file: 'landings-spray-ugc-marcos.webp', w: 676, h: 1088, name: 'Marcos', alt: 'Marcos respira después de aplicarse el Spray Nasal de Nambu' }
	]
}

// Bloque del kit, con la estructura del de suscripción de femprobiotics.co (referencia del cliente)
export const KIT_PROMO = {
	lead: 'La nariz y el pecho en una sola compra: eucalipto y menta en los dos.',
	benefits: [
		{ icon: 'percent', text: 'Ahorras frente a comprarlos por separado', amount: true },
		{ icon: 'leaf', text: 'Eucalipto y menta en el spray y en el ungüento' },
		{ icon: 'truck', text: 'Envío gratis a toda Colombia' },
		{ icon: 'cash', text: 'Pagas cuando lo recibes' }
	],
	button: 'Quiero el kit'
}

// «Elige lo que quieres mejorar hoy»: las necesidades de la portada actual (templates/index.json)
export const NEEDS = [
	{ label: 'Nariz cargada y dificultad para respirar', product: 'spray-nasal-nambu' },
	{ label: 'Piel con manchas o tono desigual', product: 'serum-piel-de-porcelana-1' },
	{ label: 'Poros abiertos y brillo excesivo', product: 'serum-niacinamida-10' },
	{ label: 'Uñas que se rompen a cada rato', product: '1-week-fortalecedor-de-unas-copia' },
	{ label: 'Cabello que quieres aclarar sin dañarlo', product: 'golden-glow-plantilla' },
	{ label: 'Bronceado que no quede naranja', product: 'isoul-1' }
]

// Opiniones: personas reales del pool de UGC del Spray, con el texto aprobado de sus landings
// (nambu/landings/spray/src/angles: general, sinusitis, flema y alergias)
export const VOICES = [
	{ name: 'Catalina', photo: 'landings-spray-ugc-catalina.webp', w: 680, h: 1192, quote: 'Por fin pude dormir sin pasar toda la noche con la boca abierta.', text: 'Lo pedí porque por las noches se me tapaba muchísimo la nariz. Lo que más noté fue poder acostarme y sentir el paso del aire mucho más libre.' },
	{ name: 'Carlos Mauricio', photo: 'landings-spray-ugc-carlos-mauricio.webp', w: 670, h: 1042, quote: 'Vivía aclarando la garganta por ese moco que bajaba.', text: 'Empecé a usar el Spray Nasal de Nambu mañana y noche y me gustó mucho la sensación que deja. Ya lo tengo al lado de la cama.' },
	{ name: 'Genésis', photo: 'landings-spray-ugc-genesis.webp', w: 692, h: 1190, quote: 'El polvo y el cambio de clima me cerraban la nariz enseguida.', text: 'Quería algo fácil de usar y este me gustó porque va directo en la nariz. Además, 60 ml rinden muchísimo más de lo que esperaba.' },
	{ name: 'José Fernando', photo: 'landings-spray-ugc-jose-fernando.webp', w: 700, h: 879, quote: 'En la noche sentía la nariz completamente cerrada.', text: 'Empecé a usar el spray mañana y noche. Me gusta mucho la sensación que deja y ya lo tengo siempre junto a la cama.' },
	{ name: 'Andrés', photo: 'landings-spray-ugc-andres.webp', w: 682, h: 1044, quote: 'Lo mío era esa flema pegada atrás.', text: 'Pasaba aclarando la garganta porque sentía moco pegado atrás de la nariz. Me gustó poder usar el spray directo y dejarlo al lado de la cama.' },
	{ name: 'Andrea', photo: 'landings-spray-ugc-andrea.webp', w: 674, h: 1164, quote: 'Sacudir el cuarto era suficiente para empezar a estornudar.', text: 'Quería algo que pudiera tener cerca y usar rápido. Lo que más me sorprendió de Nambu fue el tamaño del frasco, porque trae bastante.' }
]

// Cifras de confianza, con la estructura del bloque de femprobiotics.co sin el registro sanitario (el del Spray está
// en trámite). El número de compradores sale de Shopify cuando el cliente lo autorice. La frase de marca: la portada actual.
export const NUMBERS = {
	items: [
		{ icon: 'leaf', text: 'Marca colombiana con raíces en el Pacífico' },
		{ figure: { text: '+X.XXX', pending: true }, text: 'personas ya nos compraron' },
		{ icon: 'chat', text: 'Te atendemos por WhatsApp' }
	],
	tagline: 'Del Pacífico colombiano para tu vida de todos los días.',
	button: 'Ver todos los productos'
}

// Historia de marca: el texto de la portada actual, recortado; el botón lleva a «Sobre Nambu». Foto de la línea:
// la pasó el usuario el 2026-10-21 (assets/story-linea-nambu.webp, 1400 px)
export const STORY = {
	image: { asset: 'story-linea-nambu.webp', w: 1400, h: 1045, alt: 'La línea Nambu: Sérum Niacinamida, Sérum Piel de Porcelana, 1 Week, Spray Nasal, Golden Glow e ISOUL' },
	title: 'La naturaleza no se explica en catálogos. Se vive.',
	paragraphs: [
		'En el Pacífico colombiano, la naturaleza no se explica en catálogos. Se vive, se hereda y se usa.',
		'Nambu toma esa lógica y la lleva a cada fórmula, creada para acompañar rutinas reales de bienestar.'
	],
	button: { label: 'Conoce Nambu', href: '/pages/sobre-nambu' }
}

// Preguntas frecuentes: respuestas de las políticas publicadas (envío, devolución) y del checkout de Colombia
// (Mercado Pago + «Pago contra entrega», medido el 2026-10-16)
export const FAQS = [
	{ q: '¿Cómo pago mi pedido?', a: 'Puedes pagar cuando el pedido llega a tu casa (pago contra entrega) o en línea con Mercado Pago al finalizar la compra.' },
	{ q: '¿Cuánto cuesta y cuánto tarda el envío?', a: 'El envío estándar es gratis a toda Colombia, en todos los pedidos, y llega en 3 a 5 días hábiles. El plazo puede variar según la cobertura de la transportadora, los festivos o novedades logísticas.' },
	{ q: '¿Puedo recibirlo más rápido?', a: 'En las ciudades principales hay envío prioritario: sale el mismo día si pides antes de las 3:00 p. m., o en menos de 24 horas. Tiene un costo adicional que ves antes de confirmar la compra.' },
	{ q: '¿Cómo sé dónde va mi pedido?', a: 'Te confirmamos el pedido y te compartimos la guía de seguimiento por WhatsApp.' },
	{ q: '¿Y si llega dañado o se pierde?', a: `Te enviamos uno nuevo sin costo. Escríbenos a ${SUPPORT_EMAIL} con fotos dentro de las 48 horas siguientes a recibirlo. Si el paquete se pierde en el camino, hacemos la gestión con la transportadora y te enviamos otro.` }
]

// Correo: el 10% del formulario de Klaviyo (popup «10% de descuento»; el cupón llega por correo)
export const NEWSLETTER = {
	title: '10% de descuento en tu primera compra',
	text: 'Déjanos tu correo y te enviamos el cupón a tu bandeja de entrada.',
	button: 'Quiero mi 10%'
}

// Ángulo general: congestión, moco, presión, respiración por la boca.
// Copy: general/copy landing general - spray nasal.txt
import { PRODUCT, REGULAR_PRICES, REGULAR_STICKY_SUBS, STICKY, heroSlides, HERO, PEOPLE_TITLE, VOLUME, BOX, CLOSE, FAQ } from '../shared.mjs'

export default {
	id: 'general',
	copy: 'copy landing general - spray nasal.txt',
	signature: 'mapa de síntomas con la cabeza de perfil',
	product: PRODUCT,
	prices: REGULAR_PRICES,
	stickySubs: REGULAR_STICKY_SUBS,
	sticky: STICKY,
	hero: {
		...HERO,
		layout: 'gallery',
		pretitle: ['Congestión', 'Moco', 'Presión nasal', 'Respiración por la boca'],
		title: 'Que la nariz tapada deje de <em>arruinar tu día.</em>',
		lead: 'Spray Nasal de Nambu combina extractos botánicos de <strong>eucalipto, menta y regaliz de origen colombiano</strong> para ayudar a despejar la sensación de nariz tapada y facilitar el paso del aire.',
		slides: heroSlides({ file: 'landings-spray-hero.webp', alt: 'Un hombre y una mujer sostienen el Spray Nasal de Nambu junto al frasco de 60 ml' })
	},
	people: {
		title: PEOPLE_TITLE,
		order: ['camilo', 'catalina-aplica', 'carlos-mauricio-aplica', 'daniel', 'andres', 'marcos', 'jose-fernando', 'wilson', 'andrea', 'carlos-aristizabal']
	},
	problem: {
		banner: 'EL PROBLEMA: RADIOGRAFÍAS Y MAPA DE SÍNTOMAS',
		bannerLines: ['Las radiografías muestran el recorrido del aire; debajo, cada síntoma señala', 'su zona en la misma cabeza de perfil.'],
		eyebrow: 'El problema',
		title: 'Cuando la nariz se tapa, el resto del día lo siente.',
		lead: 'Inflamación y moco reducen el espacio por donde pasa el aire.',
		blocks: [
			{ type: 'xrays', items: ['airway', 'lungs'] },
			{
				type: 'signs',
				intro: 'Y aparecen cosas que ya conoces:',
				items: [['blocked', 'Nariz bloqueada'], ['mouth', 'Respiración por la boca'], ['throat', 'Garganta seca'], ['pressure', 'Presión'], ['drip', 'Moco bajando hacia la garganta']],
				night: 'De noche suele sentirse todavía más.'
			},
			{ type: 'triggers', lead: 'Alergias, resfriados, sinusitis, polvo, humo o cambios de clima pueden detonarlo.', items: ['Alergias', 'Resfriados', 'Sinusitis', 'Polvo', 'Humo', 'Cambios de clima'] }
		]
	},
	botany: {
		lead: 'Spray Nasal de Nambu nace de extractos botánicos obtenidos de <strong>eucalipto, menta y regaliz</strong>, plantas vinculadas históricamente al cuidado de las vías respiratorias.',
		plants: [
			'Conocido por su uso tradicional durante episodios de congestión y acumulación de moco.',
			'Su mentol genera una sensación refrescante asociada con una percepción más libre del paso del aire.',
			'Raíz utilizada tradicionalmente en preparaciones relacionadas con garganta, tos y secreciones.'
		],
		claim: 'Plantas colombianas llevadas a un formato nasal listo para usar.'
	},
	sources: {
		eyebrow: 'Referencias públicas sobre las plantas',
		title: 'No lo decimos solo nosotros.',
		items: [
			{ brand: 'healthline', title: 'Eucalipto y congestión', text: 'Healthline recoge el uso del eucalipto durante resfriados y señala al eucaliptol o cineol como uno de sus principales compuestos, estudiado en relación con la congestión y el moco.' },
			{ brand: 'mnt', title: 'Menta, eucalipto y sensación de respirar mejor', text: 'Medical News Today explica que el mentol de la menta actúa sobre receptores nasales relacionados con la percepción del flujo de aire y recoge investigaciones sobre eucalipto en síntomas de congestión.' },
			{ brand: 'webmd', title: 'Regaliz y secreciones', text: 'WebMD incluye el regaliz entre los expectorantes naturales y señala que contiene compuestos relacionados con la fluidificación de secreciones y el alivio de la garganta.' }
		],
		note: 'Las referencias anteriores corresponden a información publicada sobre estas plantas y sus componentes. No representan estudios clínicos realizados sobre Spray Nasal de Nambu como producto terminado.'
	},
	volume: { ...VOLUME, yes: 'Sí. Sesenta.' },
	offer: { alt: 'Y si pagas anticipado: <strong>$69.900 COP</strong>' },
	ritual: { title: 'Dos momentos del día.', easy: ['Directo en la nariz.', 'Sin preparar mezclas.', 'Sin cargar varios productos.'] },
	box: BOX,
	voices: {
		title: 'Lo que más se repite después de probarlo',
		items: [
			{ slug: 'catalina', quote: 'Por fin pude dormir sin pasar toda la noche con la boca abierta.', text: 'Lo pedí porque por las noches se me tapaba muchísimo la nariz. Lo que más noté fue poder acostarme y sentir el paso del aire mucho más libre. También me sorprendió el tamaño del frasco. Pensé que sería uno de esos sprays pequeños y trae bastante.' },
			{ slug: 'carlos-mauricio', quote: 'Vivía aclarando la garganta por ese moco que bajaba.', text: 'Mi molestia era sentir moco pegado atrás de la nariz y estar carraspeando todo el tiempo. Empecé a usar el Spray Nasal de Nambu mañana y noche y me gustó mucho la sensación que deja. Ya lo tengo al lado de la cama.' },
			{ slug: 'genesis', quote: 'El polvo y el cambio de clima me cerraban la nariz enseguida.', text: 'Cuando limpiaba la casa o cambiaba el clima empezaba con estornudos y nariz tapada. Quería algo fácil de usar y este me gustó porque va directo en la nariz. Además, 60 ml rinden muchísimo más de lo que esperaba.' }
		]
	},
	versus: { title: '30 ml y 60 ml no duran lo mismo.', price: '<strong>$79.900 COP</strong> · $69.900 con pago anticipado' },
	faq: [
		{ q: '¿Cuánto producto trae?', a: FAQ.content.a },
		FAQ.use,
		FAQ.plants,
		FAQ.label,
		{ q: '¿Solo es para personas con sinusitis?', a: ['No. La congestión puede aparecer por alergias, resfriados, sinusitis, polvo, humo, cambios de clima y otros factores.', 'Si presentas dificultad respiratoria importante, fiebre alta, dolor fuerte o síntomas persistentes, consulta con un profesional de salud.'] },
		FAQ.price,
		FAQ.shipping,
		FAQ.delivery,
		{ q: FAQ.invima.q, a: ['Actualmente, el registro sanitario como producto homeopático se encuentra en proceso ante INVIMA.', FAQ.invima.a[1]] }
	],
	collage: ['catalina-aplica', 'carlos-mauricio-aplica', 'marcos', 'andrea', 'andres', 'genesis'],
	close: {
		...CLOSE,
		title: 'Deja de pasar la noche buscando aire por la boca.',
		pains: ['Nariz tapada.', 'Moco.', 'Presión.', 'Garganta seca al despertar.']
	},
	sections: ['top', 'hero', 'people', 'problem', 'botany', 'sources', 'volume', 'offer', 'ritual', 'box', 'voices', 'versus', 'pay', 'warranty', 'faq', 'collage', 'close', 'social', 'sticky']
}

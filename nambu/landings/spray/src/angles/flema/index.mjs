// Ángulo flema: flema pegada, carraspera, moco en la garganta, tos al acostarte.
// Copy: flema/copy landing flema - spray nasal.txt
import { PRODUCT, REGULAR_PRICES, REGULAR_STICKY_SUBS, STICKY, heroSlides, HERO, PEOPLE_TITLE, VOLUME, BOX, VERSUS, CLOSE, FAQ, BOTANY_NOTE_CLAIM, SOURCES_EYEBROW, OFFER_ALT } from '../shared.mjs'
import { nasalArt, dripArt, stuckArt, coughArt, loop } from './art.mjs'

export default {
	id: 'flema',
	copy: 'copy landing flema - spray nasal.txt',
	signature: 'el goteo hacia atrás y el bucle de la carraspera',
	product: PRODUCT,
	prices: REGULAR_PRICES,
	stickySubs: REGULAR_STICKY_SUBS,
	sticky: STICKY,
	styles: ['styles/chain.css', 'angles/flema/signature.css'],
	hero: {
		...HERO,
		layout: 'deck',
		pretitle: ['Flema pegada', 'Carraspera', 'Moco en la garganta', 'Tos al acostarte'],
		title: 'Que esa flema pegada deje de <em>arruinarte el día.</em>',
		lead: 'Spray Nasal de Nambu combina extractos botánicos de <strong>eucalipto, menta y regaliz de origen colombiano</strong> para ayudar a despejar el moco acumulado en las vías respiratorias superiores y reducir esa sensación de flema pegada en la garganta.',
		slides: heroSlides({ file: 'landings-spray-hero-flema.webp', alt: 'Un hombre y una mujer sostienen el Spray Nasal de Nambu junto al frasco de 60 ml, con un esquema de las vías respiratorias' })
	},
	people: {
		title: PEOPLE_TITLE,
		order: ['carlos-mauricio-aplica', 'genesis', 'jose-fernando', 'catalina-aplica', 'wilson', 'andrea', 'marcos', 'camilo', 'carlos-aristizabal', 'daniel']
	},
	problem: {
		banner: 'EL PROBLEMA: EL GOTEO HACIA ATRÁS',
		bannerLines: ['El moco de la nariz baja por detrás hasta la garganta; cada paso de la cadena', 'se enciende por turno. Debajo, las placas de referencia.'],
		eyebrow: 'El problema',
		title: 'La flema no siempre empieza en el pecho.',
		lead: 'Alergias, sinusitis, resfriados o irritantes pueden aumentar el moco en la nariz. Ese moco puede bajar hacia la garganta.',
		blocks: [
			{
				type: 'chain',
				label: 'Moco nasal, goteo hacia atrás, flema pegada, carraspera y tos',
				steps: [
					{ text: 'Moco nasal', art: nasalArt },
					{ text: 'Goteo hacia atrás', art: dripArt },
					{ text: 'Flema pegada', art: stuckArt },
					{ text: 'Carraspera y tos', art: coughArt }
				]
			},
			{ type: 'text', paragraphs: ['Por eso suele sentirse peor cuando te acuestas.'], className: 'ns-problem__text ns-problem__text--key' },
			{ type: 'xrays', items: ['airway', 'lungs'] }
		]
	},
	loopSection: {
		banner: 'LA SENSACIÓN: EL BUCLE DE LA CARRASPERA',
		bannerLines: ['Cuatro gestos alrededor de un anillo y un punto que no deja de girar: vuelve siempre.'],
		tint: true,
		mod: 'loop',
		titleId: 'ns-loop-title',
		eyebrow: 'Lo que ya conoces',
		title: 'Esa sensación de “tengo algo pegado ahí”.',
		blocks: [
			{ type: 'custom', render: () => loop({ steps: ['Te aclaras la garganta.', 'Tragas.', 'Toses.', 'Tomas agua.'], center: 'Y al rato vuelve.' }) },
			{ type: 'text', paragraphs: ['Cuando hay goteo posnasal, la secreción sigue llegando desde arriba.'] },
			{ type: 'text', paragraphs: ['Ahí tiene sentido empezar por la nariz.'], className: 'ns-problem__text ns-problem__text--key' }
		]
	},
	botany: {
		lead: 'Spray Nasal de Nambu utiliza extractos botánicos obtenidos de <strong>eucalipto, menta y regaliz</strong>, plantas con una larga historia de uso alrededor de moco, garganta y vías respiratorias.',
		plants: [
			'Presente durante años en vaporizadores, inhalantes y preparaciones utilizadas cuando hay moco y congestión.',
			'Su mentol genera una sensación refrescante en nariz y garganta y ha sido estudiado alrededor de moco y percepción del flujo de aire.',
			'Raíz tradicionalmente utilizada en preparaciones para garganta, tos y secreciones.'
		],
		claim: BOTANY_NOTE_CLAIM
	},
	sources: {
		eyebrow: SOURCES_EYEBROW,
		title: 'Tres plantas muy conocidas cuando se habla de moco y garganta.',
		items: [
			{ brand: 'healthline', title: 'Eucalipto y moco', text: 'Healthline explica que el eucalipto aparece entre las alternativas utilizadas para ayudar a aflojar la mucosidad y facilitar su expulsión. También recoge investigaciones sobre eucalipto y goteo posnasal.' },
			{ brand: 'mnt', title: 'Menta y flema', text: 'Medical News Today señala que la menta contiene mentol y recoge su uso alrededor de flema y moco, incluyendo la posibilidad de facilitar su expulsión.' },
			{ brand: 'webmd', title: 'Regaliz, eucalipto y secreciones', text: 'WebMD explica que ciertos compuestos del regaliz pueden ayudar a hacer menos espesas las secreciones y recoge el uso del eucalipto en inhalantes y vaporizadores para moco y congestión.' }
		],
		note: 'Estas referencias corresponden a información publicada sobre las plantas y sus componentes. No representan estudios clínicos realizados sobre Spray Nasal de Nambu como producto terminado.'
	},
	volume: { ...VOLUME, yes: 'Porque si lo usas todos los días, 30 ml se van rápido.', long: true },
	offer: { alt: OFFER_ALT },
	ritual: { title: 'Mañana y noche.', easy: ['Directo en la nariz.'], note: 'Especialmente práctico antes de acostarte, cuando el moco acumulado suele sentirse más en la garganta.' },
	box: BOX,
	voices: {
		title: 'Cuando dejas de estar aclarándote la garganta todo el día, se nota.',
		items: [
			{ slug: 'andres', quote: 'Lo mío era esa flema pegada atrás.', text: 'Pasaba aclarando la garganta porque sentía moco pegado atrás de la nariz. En la noche era peor. Me gustó poder usar el spray directo y dejarlo al lado de la cama. Y el frasco sí es grande, trae bastante.' },
			{ slug: 'genesis', quote: 'Al acostarme empezaba la tos.', text: 'Durante el día estaba relativamente bien, pero me acostaba y empezaba a sentir el moco bajando. Ahí venían la carraspera y la tos. Empecé a usar Nambu mañana y noche y me gustó mucho la sensación que deja en la nariz.' },
			{ slug: 'carlos-mauricio', quote: 'Compraba sprays pequeños y se acababan volando.', text: 'Lo pedí por la sensación de moco constante en la garganta, pero una cosa que me sorprendió fue el tamaño. Había comprado otros sprays mucho más pequeños. Este trae 60 ml y para alguien que lo usa seguido eso sí hace diferencia.' }
		]
	},
	versus: VERSUS,
	faq: [
		{ q: '¿Toda flema viene de los pulmones?', a: ['No necesariamente.', 'El moco de la nariz y los senos paranasales puede bajar hacia la garganta. A esto se le conoce como <strong>goteo posnasal</strong> y puede provocar carraspera, tos y sensación de flema.'] },
		{ q: '¿Toda flema significa infección?', a: ['No.', 'También puede aparecer con alergias, sinusitis, irritantes, resfriados, reflujo y otras condiciones.'] },
		FAQ.use,
		FAQ.content,
		FAQ.plants,
		FAQ.label,
		FAQ.invima,
		{ q: '¿Qué pasa si la flema viene acompañada de síntomas fuertes?', a: ['Si aparece sangre, dificultad importante para respirar, dolor de pecho, fiebre alta o el problema persiste, busca valoración médica.'] },
		FAQ.price,
		FAQ.shipping,
		FAQ.delivery
	],
	collage: ['carlos-mauricio-aplica', 'andrea', 'wilson', 'catalina-aplica', 'camilo', 'marcos'],
	close: {
		...CLOSE,
		title: 'Deja de pasar el día con algo pegado en la garganta.',
		pains: ['Flema.', 'Carraspera.', 'Moco bajando.', 'Tos al acostarte.']
	},
	sections: ['top', 'hero', 'people', 'problem', { section: 'problem', dataKey: 'loopSection' }, 'botany', 'sources', 'volume', 'offer', 'ritual', 'box', 'pay', 'voices', 'versus', 'warranty', 'faq', 'collage', 'close', 'social', 'sticky']
}

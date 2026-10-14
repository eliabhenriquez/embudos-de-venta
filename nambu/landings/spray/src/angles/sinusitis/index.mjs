// Ángulo sinusitis: presión facial, nariz tapada, moco espeso.
// Copy: sinusitis/copy landing sinusitis - Spray nasal.txt
import { PRODUCT, REGULAR_PRICES, REGULAR_STICKY_SUBS, STICKY, heroSlides, HERO, PEOPLE_TITLE, VOLUME, BOX, VERSUS, CLOSE, FAQ, BOTANY_NOTE_CLAIM, BOTANY_LEAD, REGALIZ_TEXT, SOURCES_EYEBROW, OFFER_ALT } from '../shared.mjs'
import { faceSymbol, inflamedArt, blockedArt, retainedArt, pressureArt } from './art.mjs'

export default {
	id: 'sinusitis',
	copy: 'copy landing sinusitis - Spray nasal.txt',
	signature: 'el mapa de la presión en los senos paranasales',
	product: PRODUCT,
	prices: REGULAR_PRICES,
	stickySubs: REGULAR_STICKY_SUBS,
	sticky: STICKY,
	symbols: faceSymbol,
	styles: ['styles/chain.css', 'angles/sinusitis/signature.css'],
	hero: {
		...HERO,
		layout: 'gallery',
		pretitle: ['Sinusitis', 'Presión facial', 'Nariz tapada', 'Moco espeso'],
		title: 'Que la presión en la cara y la nariz tapada dejen de <em>arruinarte el día.</em>',
		lead: 'Spray Nasal de Nambu combina extractos botánicos de <strong>eucalipto, menta y regaliz de origen colombiano</strong> para ayudar a despejar la congestión nasal y facilitar el paso del aire cuando sientes la nariz cargada.',
		slides: heroSlides({ file: 'landings-spray-hero-sinusitis.webp', alt: 'Un hombre y una mujer sostienen el Spray Nasal de Nambu junto al frasco de 60 ml, con un esquema de los senos paranasales' })
	},
	people: {
		title: PEOPLE_TITLE,
		order: ['jose-fernando', 'catalina', 'andres', 'carlos-mauricio-aplica', 'genesis', 'daniel', 'camilo', 'wilson', 'marcos', 'andrea']
	},
	problem: {
		banner: 'EL PROBLEMA: EL MAPA DE LA PRESIÓN',
		bannerLines: ['La misma cara de frente en los cuatro pasos del copy: la mucosa se hincha, el', 'drenaje se cierra, el moco se queda y la presión empuja. Debajo, las placas.'],
		eyebrow: 'El problema',
		title: 'Cuando el drenaje se bloquea, la presión aparece.',
		lead: 'La mucosa se inflama, el moco deja de drenar bien y empieza a quedarse retenido dentro de los senos paranasales.',
		blocks: [
			{
				type: 'chain',
				label: 'Inflamación, drenaje bloqueado, moco retenido, nariz tapada, presión facial y menos olfato',
				steps: [
					{ text: 'Inflamación', art: inflamedArt },
					{ text: 'Drenaje bloqueado', art: blockedArt },
					{ text: 'Moco retenido', art: retainedArt },
					{ text: 'Nariz tapada, presión facial y menos olfato', art: pressureArt }
				]
			},
			{ type: 'text', paragraphs: ['Puede ocurrir después de resfriados, alergias, exposición a irritantes, alteraciones nasales y, con mucha frecuencia por <strong>hongos</strong>.'] },
			{ type: 'xrays', items: ['sinus'], featured: true }
		]
	},
	botany: {
		lead: BOTANY_LEAD,
		plants: [
			'Su cineol aparece estudiado alrededor de congestión nasal, moco y síntomas asociados a los senos paranasales.',
			'Su mentol genera una sensación refrescante y actúa sobre receptores relacionados con la percepción del paso del aire por la nariz.',
			REGALIZ_TEXT
		],
		claim: BOTANY_NOTE_CLAIM
	},
	sources: {
		eyebrow: SOURCES_EYEBROW,
		title: 'Eucalipto y menta llevan años apareciendo cuando se habla de congestión sinusal.',
		items: [
			{ brand: 'healthline', title: 'Eucalipto y congestión', text: 'Healthline recoge al eucalipto entre los ingredientes estudiados alrededor de congestión sinusal, nariz tapada y presión en los senos paranasales.' },
			{ brand: 'mnt', title: 'Menta, eucalipto y paso del aire', text: 'Medical News Today recoge información sobre mentol y eucalipto en relación con congestión, percepción del flujo de aire y síntomas de las vías respiratorias superiores.' },
			{ brand: 'webmd', title: 'Inflamación, moco y presión', text: 'WebMD explica que la inflamación de los conductos nasales puede favorecer acumulación de moco y generar presión alrededor de nariz, ojos y frente.' }
		],
		note: 'Estas referencias corresponden a información publicada sobre congestión, sinusitis e ingredientes individuales. No representan estudios clínicos realizados sobre Spray Nasal de Nambu como producto terminado.'
	},
	volume: { ...VOLUME, yes: 'Porque cuando la nariz molesta seguido, 30 ml duran poco.', long: true },
	offer: { alt: OFFER_ALT },
	ritual: { title: 'Mañana y noche.', easy: ['Directo en la nariz.'], note: 'Especialmente práctico cuando la congestión vuelve a sentirse al acostarte.' },
	box: BOX,
	voices: {
		title: 'Cuando la cara deja de sentirse tan cargada, se nota.',
		items: [
			{ slug: 'andrea', quote: 'La presión en la frente era lo que más me molestaba.', text: 'Lo mío empezaba con la nariz tapada y después sentía mucha presión en la frente y alrededor de los ojos. Buscaba algo fácil de tener cerca. Me gustó el formato de Nambu y además el frasco trae muchísimo más de lo que esperaba.' },
			{ slug: 'jose-fernando', quote: 'En la noche sentía la nariz completamente cerrada.', text: 'Durante el día aguantaba, pero cuando me acostaba sentía que la congestión aumentaba. Empecé a usar el spray mañana y noche. Me gusta mucho la sensación que deja y ya lo tengo siempre junto a la cama.' },
			{ slug: 'catalina', quote: 'Yo compraba sprays de 30 ml.', text: 'Lo primero que me llamó la atención fueron los 60 ml. Había comprado otros frascos que parecían acabarse enseguida. Para mí, que suelo tener temporadas de nariz muy congestionada, la diferencia de tamaño sí se siente.' }
		]
	},
	versus: VERSUS,
	faq: [
		{ q: '¿La sinusitis siempre es una infección bacteriana?', a: ['No.', 'Muchos episodios agudos comienzan después de un resfriado o infección viral.', 'Las alergias, la inflamación nasal, ciertas alteraciones anatómicas y, con menor frecuencia, los hongos también pueden estar relacionados.'] },
		{ q: '¿La sinusitis puede ser causada por hongos?', a: ['Sí.', 'Existen distintos tipos de sinusitis fúngica.', 'Son menos frecuentes que las sinusitis virales y algunos cuadros pueden ser más relevantes en personas con defensas bajas u otras condiciones de salud.', 'Si sospechas hongos, tienes síntomas persistentes o presentas empeoramiento importante, busca valoración médica. El Spray Nasal de Nambu no sustituye el diagnóstico ni el tratamiento indicado para una infección fúngica.'] },
		{ q: '¿Por qué siento presión en la frente y las mejillas?', a: ['Cuando la mucosa nasal se inflama, los canales de drenaje de los senos paranasales pueden bloquearse.', 'La acumulación de moco y líquido puede generar <strong>presión alrededor de la nariz, frente, ojos y mejillas</strong>.'] },
		FAQ.use,
		FAQ.content,
		FAQ.plants,
		FAQ.label,
		FAQ.invima,
		{ q: '¿Cuándo debería consultar a un médico?', a: ['Si presentas dolor facial intenso, fiebre alta, hinchazón alrededor de los ojos, dificultad importante para respirar o síntomas que persisten o empeoran, busca valoración médica.'] },
		FAQ.price,
		FAQ.shipping,
		FAQ.delivery
	],
	collage: ['catalina', 'jose-fernando', 'genesis', 'carlos-aristizabal', 'marcos', 'camilo'],
	close: {
		...CLOSE,
		title: 'Que la presión en la cara no decida cómo va a ser tu día.',
		pains: ['Nariz tapada.', 'Presión en la frente.', 'Moco acumulado.', 'Pesadez facial.']
	},
	sections: ['top', 'hero', 'people', 'problem', 'botany', 'sources', 'volume', 'offer', 'ritual', 'box', 'pay', 'voices', 'versus', 'warranty', 'faq', 'collage', 'close', 'social', 'sticky']
}

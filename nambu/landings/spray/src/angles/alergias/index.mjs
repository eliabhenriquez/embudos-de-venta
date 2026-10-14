// Ángulo alergias: estornudos, moco claro y nariz tapada por lo que hay en el ambiente.
// Copy: alergias/copy landing alergias - Spray Nasal.txt
import { PRODUCT, REGULAR_PRICES, REGULAR_STICKY_SUBS, STICKY, heroSlides, HERO, PEOPLE_TITLE, VOLUME, BOX, VERSUS, CLOSE, FAQ, BOTANY_NOTE_CLAIM, REGALIZ_TEXT, RITUAL_EASY } from '../shared.mjs'
import { allergenArt, inflamedArt, symptomsArt } from './art.mjs'

export default {
	id: 'alergias',
	copy: 'copy landing alergias - Spray Nasal.txt',
	signature: 'la reacción en cadena del alérgeno',
	product: PRODUCT,
	prices: REGULAR_PRICES,
	stickySubs: REGULAR_STICKY_SUBS,
	sticky: STICKY,
	styles: ['styles/chain.css', 'angles/alergias/signature.css'],
	hero: {
		...HERO,
		layout: 'window',
		pretitle: ['Alergias', 'Estornudos', 'Moco claro', 'Nariz tapada'],
		title: 'Que las alergias dejen de <em>taparte la nariz.</em>',
		lead: 'Spray Nasal de Nambu combina extractos botánicos de <strong>eucalipto, menta y regaliz de origen colombiano</strong> para ayudar a despejar la congestión nasal y facilitar el paso del aire.',
		slides: heroSlides({ file: 'landings-spray-hero-alergias.webp', alt: 'Un hombre y una mujer sostienen el Spray Nasal de Nambu junto al frasco de 60 ml, con un esquema de las vías nasales' })
	},
	people: {
		title: PEOPLE_TITLE,
		order: ['andrea', 'marcos', 'wilson', 'genesis', 'carlos-mauricio-aplica', 'camilo', 'daniel', 'catalina', 'jose-fernando', 'andres']
	},
	problem: {
		banner: 'EL PROBLEMA: LA REACCIÓN EN CADENA',
		bannerLines: ['Lo que hay en el ambiente entra por la nariz y la reacción avanza paso a paso;', 'cada paso se enciende por turno. Debajo, las placas de referencia.'],
		eyebrow: 'El problema',
		title: 'Todo empieza cuando tu nariz reacciona a lo que hay en el ambiente.',
		lead: 'Polvo, ácaros, polen, moho o mascotas pueden activar una respuesta alérgica e inflamar la mucosa nasal.',
		blocks: [
			{
				type: 'chain',
				label: 'Alérgeno, inflamación nasal, estornudos, moco claro y nariz tapada',
				steps: [
					{ text: 'Alérgeno', art: allergenArt },
					{ text: 'Inflamación nasal', art: inflamedArt },
					{ text: 'Estornudos, moco claro y nariz tapada', art: symptomsArt }
				]
			},
			{ type: 'text', paragraphs: ['Y cuando la congestión aumenta, también pueden aparecer goteo hacia la garganta, respiración por la boca y noches de peor descanso.'] },
			{ type: 'xrays', items: ['airway', 'sinus'] }
		]
	},
	botany: {
		lead: 'Spray Nasal de Nambu utiliza extractos botánicos obtenidos de <strong>eucalipto, menta y regaliz</strong>, plantas relacionadas históricamente con nariz, garganta y vías respiratorias.',
		plants: [
			'Su cineol ha sido estudiado alrededor de moco, inflamación y congestión de las vías respiratorias.',
			'Su mentol genera una sensación refrescante relacionada con una percepción más libre del paso del aire por la nariz.',
			REGALIZ_TEXT
		],
		claim: BOTANY_NOTE_CLAIM
	},
	sources: {
		eyebrow: 'Referencias públicas',
		title: 'Cuando se habla de alergias nasales, estas plantas también aparecen en la conversación.',
		items: [
			{ brand: 'healthline', title: 'Menta y rinitis alérgica', text: 'Healthline recoge investigaciones sobre la menta y señala que su mentol se relaciona con apertura percibida de las vías nasales. También cita investigación experimental sobre inflamación asociada a rinitis alérgica.' },
			{ brand: 'healthline', title: 'Eucalipto, moco y congestión', text: 'Healthline explica que el eucalipto contiene 1,8-cineol, un compuesto estudiado por su relación con la producción de moco y la inflamación, mientras que la menta puede mejorar la sensación de congestión.' },
			{ brand: 'webmd', title: 'Polvo, ácaros, moho, mascotas y polen', text: 'WebMD explica que estos alérgenos pueden activar liberación de histamina y provocar congestión, estornudos, picazón y moco nasal.' }
		],
		note: 'Estas referencias corresponden a información publicada sobre alergias e ingredientes individuales. No representan estudios clínicos realizados sobre Spray Nasal de Nambu como producto terminado.'
	},
	volume: { ...VOLUME, yes: 'Porque las alergias no avisan qué día van a aparecer.', long: true },
	offer: { alt: 'Y pagando anticipado: <strong>$69.900 COP</strong>' },
	ritual: { title: 'Mañana y noche.', easy: RITUAL_EASY, note: 'Fácil de tener cerca durante temporadas de polvo, humedad, polen o cambios de clima.' },
	box: BOX,
	voices: {
		title: 'Cuando barrer la casa deja de ser sinónimo de nariz tapada, se nota.',
		items: [
			{ slug: 'andrea', quote: 'Sacudir el cuarto era suficiente para empezar a estornudar.', text: 'Con el polvo empezaba de una con estornudos, moco y la nariz cerrada. Quería algo que pudiera tener cerca y usar rápido. Lo que más me sorprendió de Nambu fue el tamaño del frasco, porque trae bastante.' },
			{ slug: 'carlos-aristizabal', quote: 'Los cambios de clima me pegaban directo en la nariz.', text: 'Pasaba del calor al aire acondicionado y empezaba con la nariz tapada y el moqueo. Me gustó tener el spray en casa para esos días. Los 60 ml también hacen bastante diferencia frente a los frascos pequeños que había comprado.' },
			{ slug: 'catalina', quote: 'La humedad era terrible para mí.', text: 'Cuando había mucha humedad o polvo sentía que la nariz reaccionaba enseguida. Empecé a tener Nambu cerca y me gustó mucho la sensación que deja después de usarlo. Además, el frasco rinde muchísimo.' }
		]
	},
	versus: VERSUS,
	faq: [
		{ q: '¿Qué puede disparar una alergia nasal?', a: ['Los detonantes frecuentes incluyen <strong>ácaros del polvo, polen, moho, mascotas y cucarachas</strong>.', 'El humo, los perfumes fuertes, el cloro y otros irritantes también pueden empeorar los síntomas nasales.'] },
		{ q: '¿Por qué estornudo y después se me tapa la nariz?', a: ['En la rinitis alérgica, el contacto con un alérgeno puede activar una respuesta del sistema inmunitario.', 'La mucosa nasal se inflama y pueden aparecer <strong>estornudos, picazón, moco claro y congestión</strong>.'] },
		{ q: '¿Sirve para eliminar mi alergia?', a: ['El Spray Nasal de Nambu está pensado para el uso nasal cuando aparecen congestión y sensación de nariz cargada.', 'No elimina el alérgeno ni sustituye el diagnóstico o tratamiento indicado para una alergia persistente.'] },
		FAQ.use,
		FAQ.content,
		FAQ.plants,
		FAQ.label,
		FAQ.invima,
		{ q: '¿Cuándo debería consultar a un médico?', a: ['Si aparecen silbidos al respirar, opresión en el pecho, dificultad importante para respirar, hinchazón, síntomas intensos o alergias que se repiten constantemente, busca valoración médica.'] },
		FAQ.price,
		FAQ.shipping,
		FAQ.delivery
	],
	collage: ['marcos', 'genesis', 'catalina-aplica', 'wilson', 'carlos-mauricio-aplica', 'andres'],
	close: {
		...CLOSE,
		title: 'Que el polvo, el polen o la humedad no decidan cómo va a respirar tu nariz hoy.',
		pains: ['Estornudos.', 'Moco claro.', 'Nariz tapada.', 'Goteo hacia la garganta.']
	},
	sections: ['top', 'hero', 'people', 'problem', 'botany', 'sources', 'volume', 'offer', 'ritual', 'box', 'pay', 'voices', 'versus', 'warranty', 'faq', 'collage', 'close', 'social', 'sticky']
}

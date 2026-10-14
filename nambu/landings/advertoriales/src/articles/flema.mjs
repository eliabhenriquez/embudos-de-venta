// Advertorial de flema: la ruta nariz–garganta (goteo posnasal).
// Copy: flema/copy_adv_flema_spray.txt — los textos van tal cual; aquí solo se decide
// con qué bloque se cuenta cada parte.
import { CTA_LABEL, OFFER, BUYBAR, REFERENCE_NOTE, trustLine } from './shared.mjs'

const PAYMENT = 'Pagas cuando recibes tu pedido en casa'

export default {
	id: 'flema',
	copy: 'copy_adv_flema_spray.txt',
	product: { handle: 'lung-cleansig-bg-3', title: 'LUNG CLEANSIG BG 3', variant: '53100819218592' },
	// «Contenido editorial de Nambu»: la marca se compone con su logotipo
	kicker: { text: 'Contenido editorial de', brand: 'Nambu' },
	title: 'Si llevas días carraspeando por una flema que “no sale”, revisa esta <em>ruta nariz–garganta</em> antes de seguir atacándola como si siempre viniera del pecho',
	dek: 'La sensación de moco pegado puede aparecer cuando las secreciones bajan por detrás de la nariz. Entender de dónde viene esa molestia puede ayudarte a elegir mejor qué hacer cuando vuelve.',
	source: { label: 'Fuentes educativas consultadas', brand: 'cleveland' },
	buybar: BUYBAR,
	blocks: [
		{ type: 'photo', photo: 'scene-phlegm', lead: true, note: REFERENCE_NOTE },
		{ type: 'p', text: 'Estás hablando en una reunión y aparece.' },
		{ type: 'shout', text: '“Ejem… ejem”.' },
		{ type: 'p', text: 'Sigues con la conversación.' },
		{ type: 'p', text: 'A los treinta segundos, otra vez.' },
		{ type: 'p', text: 'Tomas agua. Te aclaras la garganta. Tragas saliva. Hasta haces fuerza tratando de despegar eso que sientes ahí.' },
		{ type: 'p', text: 'Y nada.' },
		{ type: 'p', text: 'Peor cuando pasa hablando con un cliente, manejando, en el almuerzo del domingo o después del segundo tinto de la mañana.' },
		{ type: 'pull', text: 'Porque llega un momento en que ya ni la flema fastidia tanto como estar carraspeando delante de todo el mundo.' },

		{ type: 'heading', text: 'La sensación puede empezar más arriba de lo que parece' },
		{ type: 'p', text: 'Cuando alguien siente moco en la garganta, es muy fácil pensar que necesariamente está subiendo desde los pulmones.' },
		{ type: 'p', text: 'Pero nariz y garganta están conectadas y producen secreciones durante todo el día.' },
		{ type: 'p', text: 'Normalmente ni las notas.' },
		{ type: 'p', text: 'Cuando aumenta el moco o cambia su consistencia, una parte puede bajar por detrás de la nariz hacia la garganta.' },
		{
			type: 'route',
			label: 'Radiografía lateral de la cabeza y el cuello con el recorrido marcado: de la nariz, por detrás, hasta la garganta',
			stops: ['Nariz', 'Detrás de la nariz', 'Garganta'],
			caption: 'Vías aéreas respiratorias.',
			note: REFERENCE_NOTE
		},
		{
			type: 'term',
			lead: 'Es lo que se conoce como',
			term: 'goteo posnasal',
			brand: 'cleveland',
			text: 'Cleveland Clinic explica que puede generar sensación de moco bajando, ganas frecuentes de tragar, carraspera, tos e incluso ronquera.'
		},
		{ type: 'p', text: 'Imagínalo como uno de esos trancones que empiezan unas cuadras más arriba.' },
		{ type: 'pull', text: 'Tú sientes el atasco justo donde estás parado, pero la congestión comenzó antes.' },
		{ type: 'p', text: 'Con la garganta puede pasar algo parecido.' },
		{ type: 'p', text: 'La molestia se siente ahí, aunque parte de la secreción esté llegando desde la zona nasal.' },
		{ type: 'p', text: 'Y aquí viene la parte importante.' },
		{ type: 'p', text: 'Alergias, resfriados, sinusitis, cambios de temperatura, ambientes secos e incluso el reflujo pueden estar relacionados con esa sensación.' },
		{ type: 'p', text: 'Por eso comprar cualquier cosa “para la flema” puede terminar siendo ensayo y error.' },

		{ type: 'heading', text: '“Pero yo ya he usado cosas para eso”' },
		{ type: 'p', text: 'Tiene todo el sentido pensarlo.' },
		{ type: 'beats', lines: ['Te tomas algo.', 'Te sientes mejor.', 'Pasan unos días.', 'Y vuelve la misma carraspera.'] },
		{ type: 'p', text: 'Entonces piensas: “¿para qué compro otra cosa si después termino igual?”.' },
		{ type: 'p', text: 'El punto está en observar el contexto.' },
		{ type: 'photo', photo: 'scene-night', note: REFERENCE_NOTE },
		{
			type: 'rows',
			items: [
				'¿También amaneces con la nariz cargada?',
				'¿Sientes secreción bajando cuando te acuestas?',
				'¿Empeora después de varias horas con aire acondicionado?',
				'¿Te pasa cuando hay mucho polvo, cambios de clima o pasas tiempo en ambientes cerrados?'
			]
		},
		{ type: 'p', text: 'Esas pistas ayudan a entender mejor qué está acompañando la molestia.' },
		{ type: 'key', text: 'Y cuando la nariz entra en la historia, tiene sentido mirar opciones pensadas precisamente para esa zona.' },

		{ type: 'heading', text: 'Ahí aparece el Spray Nasal de Nambu', reveal: true },
		{
			type: 'spotlight',
			photo: 'packshot',
			caption: 'Spray Nasal de Nambu: eucalipto, menta y regaliz.',
			text: 'El <strong>Spray Nasal de Nambu</strong> fue formulado con <strong>eucalipto, menta y regaliz</strong>, tres ingredientes que la marca utiliza para producir una sensación fresca, despejada y cómoda al respirar cuando la nariz se siente cargada.'
		},
		{
			type: 'plants',
			items: [
				{ plant: 'menta', name: 'Menta', text: 'La menta deja un frescor intenso después de aplicarlo.' },
				{ plant: 'eucalipto', name: 'Eucalipto', text: 'El eucalipto aporta esa sensación característica de despeje.' },
				{ plant: 'regaliz', name: 'Regaliz', text: 'Y el regaliz complementa la fórmula con una sensación más suave.' }
			]
		},
		{ type: 'portrait', person: 'carlos-mauricio-aplica', body: ['Se aplica directamente por vía nasal.', { big: 'Dos disparos.' }, { big: 'Dos veces al día.' }] },
		{
			type: 'portrait',
			person: 'genesis',
			flip: true,
			body: ['El frasco contiene <strong>60 ml</strong>, el doble del contenido de muchos sprays pequeños de farmacia de 30 ml.']
		},
		{ type: 'p', text: 'Y ese formato importa cuando la idea es tenerlo en casa y usarlo de manera consistente, en lugar de comprar un frasquito que desaparece a los pocos días.' },
		{ type: 'cta', label: CTA_LABEL, note: trustLine(PAYMENT) },

		{ type: 'heading', text: 'Cómo se siente usarlo' },
		{ type: 'p', text: 'La experiencia comienza por la nariz.' },
		{ type: 'sequence', steps: [['catalina-aplica', 'Aplicación.'], ['catalina', 'Frescor.'], ['marcos', 'Sensación de mayor despeje.']] },
		{ type: 'p', text: 'Y ese momento tan sencillo de inhalar y sentir que el aire entra más cómodo.' },
		{ type: 'p', text: 'Especialmente cuando llevas horas con esa sensación pesada de nariz cargada y garganta pidiendo “ejem” cada rato.' },
		{ type: 'p', text: 'Ese es precisamente el terreno del Spray Nasal de Nambu.' },
		{ type: 'pull', text: 'No intenta convertir todas las flemas en el mismo problema.' },
		{ type: 'p', text: 'Está pensado para acompañar esos momentos donde la congestión nasal y las secreciones forman parte de lo que estás sintiendo.' },

		// El copy trae los tres como «REVIEW PARA ADAPTAR A TESTIMONIO REAL — [NOMBRE], [EDAD]».
		// Van con personas reales del pool y solo su nombre (/nambu/AGENTS.md §5); ../AGENTS.md §5.
		{
			type: 'reviews',
			eyebrow: 'Testimonios',
			items: [
				{ slug: 'andrea', quote: '“Yo ya cargaba una botella de agua para todas partes porque me daba pena estar aclarándome la garganta mientras hablaba”', text: 'En mi caso era peor en la mañana y después de estar varias horas con aire acondicionado. Sentía que tenía algo pegado y pasaba tomando agua. Empecé a usar el spray mañana y noche y lo primero que me gustó fue la sensación fresca en la nariz. Siento el despeje muy rápido y ya lo tengo al lado de la cama.' },
				{ slug: 'daniel', quote: '“Lo compré porque estaba cansado del ‘ejem, ejem’ cada cinco minutos”', text: 'Yo pensaba que todo venía del pecho porque la molestia la sentía en la garganta. Después empecé a fijarme y muchas veces también tenía la nariz completamente cargada. El spray me gustó porque es fácil de usar, deja bastante frescor y el frasco rinde. Lo uso dos veces al día.' },
				{ slug: 'jose-fernando', quote: '“Hasta mi esposa me decía: otra vez con esa carraspera”', text: 'Lo mío se notaba muchísimo al acostarme. Me la pasaba tragando y aclarándome la garganta. Probé Nambu principalmente por la aplicación nasal. La menta se siente bastante y me gusta esa sensación de nariz despejada que queda después.' }
			]
		},

		{ type: 'heading', text: 'Y si la sensación sigue apareciendo durante semanas…' },
		{ type: 'p', text: 'Vale la pena prestarle atención.' },
		{ type: 'p', text: 'La flema o carraspera persistente puede tener diferentes explicaciones y un spray nasal no reemplaza una valoración médica cuando existe una molestia frecuente o intensa.' },
		{ type: 'caution', text: 'Si aparecen dificultad importante para respirar, fiebre, sangre, dolor en el pecho o síntomas que continúan empeorando, consulta a un profesional de salud.' },
		{ type: 'p', text: 'Porque una cosa es querer sentir la nariz más despejada.' },
		{ type: 'p', text: 'Otra muy distinta es ignorar una señal que necesita revisión.' },

		{ type: 'heading', text: 'Para esos días en que la nariz cargada termina fastidiándote hasta la garganta' },
		{
			type: 'offer',
			...OFFER,
			photo: 'couple-flema',
			intro: 'El <strong>Spray Nasal de Nambu</strong> viene en presentación de <strong>60 ml</strong> con:',
			usage: 'Se usa con <strong>2 aplicaciones nasales, 2 veces al día</strong>.',
			available: 'Actualmente está disponible por:',
			payment: PAYMENT,
			made: 'Hecho en Colombia por Nambu.'
		},
		{ type: 'key', text: 'Para cuando ya te cansaste de pasar el día entre el pañuelo, el vaso de agua y ese “ejem” que se mete hasta en la mitad de una conversación.' }
	],
	footnote: {
		brand: 'cleveland',
		lines: [
			'<strong>Fuentes educativas consultadas:</strong> Cleveland Clinic — Postnasal Drip y Chronic Cough.',
			'La información educativa de este artículo no sustituye valoración, diagnóstico ni tratamiento médico.'
		]
	}
}

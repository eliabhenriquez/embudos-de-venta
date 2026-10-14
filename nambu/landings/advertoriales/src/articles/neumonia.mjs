// Advertorial de neumonía: lo que el pulmón todavía recupera.
// Copy: neumonia/copy_adv_neumonia_spray.txt — los textos van tal cual; aquí solo se decide
// con qué bloque se cuenta cada parte.
//
// El artículo insiste en que el spray es para la nariz y no trata la neumonía: por eso el
// producto no va junto a ningún esquema de pulmones (la oferta lleva el frasco solo).
import { CTA_LABEL, OFFER, BUYBAR, REFERENCE_NOTE, trustLine } from './shared.mjs'

const PAYMENT = 'Pagas cuando recibes tu pedido en casa'

export default {
	id: 'neumonia',
	copy: 'copy_adv_neumonia_spray.txt',
	// Sin página de referencia: la ficha donde se publica está por definir
	kicker: { text: 'Contenido publicitario de', brand: 'Nambu' },
	title: 'Terminaste el tratamiento y sigues agotado: <em>lo que el pulmón todavía recupera</em> después de una neumonía',
	dek: 'Volver al trabajo en una semana no significa necesariamente volver a sentirte como antes. Entender qué ocurrió dentro de los pulmones ayuda a saber por qué la tos, el cansancio o la falta de aire pueden tardar más en ceder.',
	source: { label: 'Fuentes editoriales', names: 'National Heart, Lung, and Blood Institute' },
	buybar: BUYBAR,
	blocks: [
		{ type: 'photo', photo: 'lungs', lead: true, caption: 'Pulmones y bronquios.', note: REFERENCE_NOTE },
		{ type: 'p', text: 'Terminas los medicamentos.' },
		{ type: 'p', text: 'Ya no tienes la fiebre de los primeros días.' },
		{ type: 'p', text: 'Te levantas pensando:' },
		{ type: 'shout', text: '“Bueno, ya salí de esta.”' },
		{ type: 'beats', closing: false, lines: ['Te bañas.', 'Preparas algo de comer.', 'Caminas unas cuadras.'] },
		{ type: 'p', text: 'Y de repente sientes como si hubieras hecho mucho más de lo que realmente hiciste.' },
		{ type: 'beats', closing: false, lines: ['Te toca sentarte.', 'Respirar.', 'Bajarle el ritmo.'] },
		{ type: 'p', text: 'En Colombia diríamos que quedaste “sin batería”.' },
		{ type: 'p', text: 'Y ahí aparece una duda bastante lógica:' },
		{ type: 'pull', text: '“Si ya terminé el tratamiento, ¿por qué sigo tan cansado?”' },
		{ type: 'p', text: 'La respuesta comienza en una parte del pulmón que normalmente ni recordamos que existe.' },

		{ type: 'heading', text: 'Dentro de tus pulmones hay millones de pequeños sacos de aire' },
		{ type: 'term', lead: 'Se llaman', term: 'alvéolos', text: 'Son estructuras diminutas donde ocurre una tarea fundamental: el oxígeno que respiras pasa hacia la sangre.' },
		{ type: 'p', text: 'Durante una neumonía, esos alvéolos pueden inflamarse y llenarse de líquido o pus.' },
		{ type: 'p', text: 'Por eso la neumonía puede producir tos, dificultad para respirar, fiebre y dolor al respirar.' },
		{ type: 'p', text: 'Imagínate una cancha de fútbol después de un aguacero bogotano.' },
		{ type: 'beats', lines: ['El partido puede haberse acabado.', 'La lluvia puede haber parado.', 'Pero la cancha todavía necesita tiempo para volver a estar en condiciones normales.'] },
		{ type: 'p', text: 'Con la recuperación pulmonar ocurre algo parecido.' },
		{ type: 'p', text: 'Controlar la infección es una parte del proceso.' },
		{ type: 'p', text: 'Después viene la recuperación.' },

		{ type: 'heading', text: 'El calendario del medicamento y el calendario del cuerpo pueden ser distintos' },
		{ type: 'p', text: 'El NIH explica que algunas personas pueden volver a su rutina habitual después de una o dos semanas.' },
		{ type: 'p', text: 'Otras necesitan <strong>un mes o más</strong>.' },
		{ type: 'p', text: 'Y muchas continúan sintiéndose cansadas aproximadamente durante un mes.' },
		{ type: 'p', text: 'Eso ayuda a entender algo que puede desesperar bastante.' },
		{ type: 'p', text: 'Terminar los antibióticos, cuando fueron indicados para una neumonía bacteriana, tampoco significa que esa misma tarde vas a recuperar toda la energía.' },
		{ type: 'beats', lines: ['Puedes sentirte mejor…', 'y todavía estar recuperándote.'] },

		{ type: 'heading', text: '“Yo pensé que me había vuelto a enfermar”' },
		{ type: 'p', text: 'Esa preocupación aparece mucho durante la recuperación.' },
		{
			type: 'rows',
			items: ['Subes unas escaleras y te falta energía.', 'Caminas más rápido de la cuenta y tienes que bajar el paso.', 'Toses.', 'Sientes alguna molestia al respirar profundo.']
		},
		{ type: 'p', text: 'Y la cabeza inmediatamente se va al peor escenario.' },
		{ type: 'p', text: 'El cansancio puede formar parte de la recuperación, pero hay una diferencia importante entre <strong>recuperarse lentamente y empeorar</strong>.' },
		{ type: 'caution', text: 'Si la falta de aire aumenta, aparecen síntomas nuevos o el cuadro empieza a ir hacia atrás, corresponde contactar al profesional que está siguiendo el caso.' },
		{ type: 'p', text: 'El NIH recomienda buscar atención si los síntomas empeoran y mantener seguimiento médico durante la recuperación.' },

		{ type: 'heading', text: 'Hay otro error fácil: pensar que la neumonía es simplemente “flema atrapada”' },
		{ type: 'p', text: 'La imagen parece lógica.' },
		{ type: 'run', items: ['Toses.', 'A veces sale moco.', 'Sientes el pecho pesado.'] },
		{ type: 'p', text: 'Entonces parece que todo consistiera en sacar algo de ahí.' },
		{ type: 'p', text: 'Pero la neumonía ocurre en el tejido pulmonar.' },
		{ type: 'p', text: 'Los alvéolos se inflaman y pueden llenarse de líquido o pus como consecuencia de una infección causada por bacterias, virus u hongos.' },
		{ type: 'p', text: 'La tos puede aparecer <strong>con o sin moco</strong>.' },
		{ type: 'pull', text: 'Por eso cualquier producto que prometa “limpiar los pulmones” como sustituto del tratamiento de una neumonía está simplificando demasiado un problema médico serio.' },

		{ type: 'heading', text: 'Entonces, ¿qué sí ayuda durante la recuperación?' },
		{ type: 'p', text: 'Aquí conviene quedarse con cosas bastante sencillas.' },
		{ type: 'p', text: 'El NIH recomienda descansar bien, mantenerse hidratado, evitar fumar y el humo de segunda mano y retomar la actividad física de forma gradual según la orientación del profesional que lleva el caso.' },
		{ type: 'p', text: 'O sea:' },
		{ type: 'key', text: 'el cuerpo no necesita que le demuestres nada.' },
		{ type: 'p', text: 'Si hace una semana estabas enfermo, tampoco toca salir el lunes a vivir como si nada hubiera pasado.' },
		{
			type: 'rows',
			items: [
				'La oficina puede esperar diez minutos.',
				'Las escaleras pueden hacerse más despacio.',
				'Y el domingo tampoco es obligatorio jugar el partido completo porque los amigos dijeron “eso ya se te pasó”.'
			]
		},

		{ type: 'heading', text: '¿Dónde entra entonces un spray nasal?', reveal: true },
		{ type: 'p', text: 'En una necesidad completamente diferente.' },
		{ type: 'p', text: 'Durante esos días también puedes tener:' },
		{
			type: 'rows',
			items: [
				'nariz congestionada,',
				'sensación de nariz cargada,',
				'aire acondicionado que te reseca,',
				'cambios de temperatura,',
				'o simplemente esa molestia nasal que hace todavía más incómodo respirar.'
			]
		},
		{ type: 'p', text: 'Ahí puede tener sentido un producto pensado para <strong>la zona nasal</strong>.' },
		{ type: 'key', text: 'Y ese es el lugar del Spray Nasal de Nambu.' },

		{ type: 'heading', text: 'Una fórmula para la nariz, mientras tus pulmones siguen su propio proceso' },
		{ type: 'spotlight', photo: 'ingredients', text: 'El Spray Nasal de Nambu combina:', formula: 'Eucalipto + Menta + Regaliz' },
		{ type: 'portrait', person: 'catalina-aplica', body: ['Su aplicación ocurre directamente en la nariz.'] },
		{
			type: 'rows',
			items: ['La menta aporta una sensación fría e intensa.', 'El eucalipto deja una percepción de frescor y despeje.', 'Y el regaliz complementa la fórmula.']
		},
		{ type: 'portrait', person: 'marcos', flip: true, body: ['Nambu lo plantea para momentos en que la nariz se siente cargada y buscas una sensación de respiración más fresca y cómoda.'] },
		{ type: 'p', text: 'El frasco contiene <strong>60 ml</strong> y su indicación actual es de <strong>2 aplicaciones nasales, 2 veces al día</strong>.' },
		{ type: 'p', text: 'Ese punto merece quedar muy claro:' },
		{ type: 'key', text: 'Spray Nasal de Nambu no trata la neumonía.' },
		{
			type: 'caution',
			lines: [
				'No reemplaza antibióticos, antivirales, oxígeno, seguimiento médico ni cualquier otro manejo que haya indicado el profesional.',
				'Tampoco “vacía” los alvéolos.'
			]
		},
		{ type: 'p', text: 'Su uso está enfocado en la <strong>sensación de congestión y despeje nasal</strong> cuando esa molestia también aparece durante el día.' },
		{ type: 'cta', label: CTA_LABEL, note: trustLine(PAYMENT) },

		// El copy los trae como «REVIEW MODELO» con nombre y edad de ejemplo y la nota «Publicar
		// únicamente asociado a una experiencia real equivalente». Los tres cuentan que quien firma
		// tuvo una neumonía: con la foto y el nombre de una persona real del pool, eso es atribuirle
		// una enfermedad. Están asignados, pero retenidos hasta tener el testimonio confirmado.
		{
			type: 'reviews',
			hold: 'los tres textos atribuyen una neumonía a quien firma; se sueltan con el testimonio confirmado',
			eyebrow: 'Testimonios',
			items: [
				{ slug: 'jose-fernando', quote: '“Lo más difícil fue aceptar que todavía no tenía mi energía de antes”', text: 'Después de la neumonía quería volver rápido a trabajar y me cansaba haciendo cualquier cosa. El médico me pidió que fuera con calma. Además amanecía bastante congestionado y empecé a usar Nambu para la nariz. Me gusta mucho el frescor porque en esos días respirar cómodo se agradece muchísimo.' },
				{ slug: 'catalina', quote: '“Subía las escaleras de la casa y tenía que sentarme”', text: 'Pensaba que al terminar los medicamentos ya iba a estar igual que antes, pero recuperar la energía me tomó más tiempo. También tenía la nariz muy cargada algunas mañanas. Nambu me gustó por esa sensación fría del eucalipto y la menta. Lo dejé en la mesa de noche para usarlo mañana y noche.' },
				{ slug: 'carlos-aristizabal', quote: '“Yo quería volver a trabajar como si nada hubiera pasado”', text: 'Me tocó aprender a hacer las cosas más despacio unas semanas. Cuando tenía congestión nasal usaba el Spray Nasal de Nambu y sentía ese despeje fresco que me ayudaba a estar más cómodo. El frasco de 60 ml además dura bastante.' }
			]
		},

		{ type: 'heading', text: 'Hay síntomas con los que toca dejar el celular y consultar' },
		{ type: 'p', text: 'Durante una recuperación de neumonía, prestar atención a la evolución importa.' },
		{ type: 'caution', text: 'El NIH recomienda contactar al proveedor de salud cuando los síntomas empeoran y señala que una dificultad importante para respirar o hablar requiere valoración médica.' },
		{ type: 'p', text: 'También es importante cumplir completamente el tratamiento indicado.' },
		{ type: 'p', text: 'Si te formularon antibióticos, el NIH recomienda terminarlos según la prescripción, aunque empieces a sentirte mejor antes. Suspenderlos antes de tiempo puede permitir que una neumonía bacteriana reaparezca y favorecer resistencia al antibiótico.' },
		{ type: 'p', text: 'Así que en este punto vale más una revisión médica a tiempo que hacerse el fuerte.' },

		{ type: 'heading', text: 'Recuperarte también significa darle tiempo al cuerpo' },
		{ type: 'p', text: 'Después de una neumonía, volver a respirar con tranquilidad puede sentirse como recuperar una parte de la vida cotidiana que uno daba por hecha.' },
		{ type: 'run', items: ['Dormir bien.', 'Caminar sin pensar cada paso.', 'Hablar largo sin agotarse.', 'Salir a comprar algo.', 'Volver a trabajar.', 'Tomarse un tinto tranquilo.'] },
		{ type: 'p', text: 'La recuperación puede ir llegando poco a poco.' },
		{ type: 'p', text: 'Y si durante ese proceso también aparece la nariz cargada, Nambu está pensado para esa parte concreta de la experiencia.' },
		{
			type: 'offer',
			...OFFER,
			name: 'Spray Nasal de Nambu',
			specs: ['60 ml', '2 aplicaciones nasales, 2 veces al día'],
			payment: PAYMENT,
			made: 'Hecho en Colombia por Nambu.'
		},
		{ type: 'key', text: 'Para esos momentos en que quieres sentir la nariz fresca y despejada mientras respetas el tiempo que tus pulmones necesitan para recuperarse.' }
	],
	footnote: {
		lines: [
			'<strong>Fuentes editoriales</strong>',
			'National Heart, Lung, and Blood Institute — Pneumonia: What Is Pneumonia? y Pneumonia Recovery.',
			'Nambu Oficial — información vigente del Spray Nasal de Nambu.',
			'Este contenido es educativo y no sustituye atención médica. La neumonía puede ser una enfermedad grave y su tratamiento depende de la causa, la edad, el estado general y la severidad del cuadro.'
		]
	}
}

// Advertorial de sinusitis: qué está frenando el drenaje.
// Copy: sinusitis/copy_adv_sinusitis_spray.txt — los textos van tal cual; aquí solo se decide
// con qué bloque se cuenta cada parte.
import { CTA_LABEL, OFFER, BUYBAR, REFERENCE_NOTE, trustLine } from './shared.mjs'

const PAYMENT = 'Pagas cuando recibes tu pedido en casa'

export default {
	id: 'sinusitis',
	copy: 'copy_adv_sinusitis_spray.txt',
	product: { handle: 'advertorial-sinusitis-lung-cleansing', title: 'Advertorial - Sinusitis - Lung Cleansing', variant: '53249595703456' },
	kicker: { text: 'Contenido editorial de', brand: 'Nambu' },
	title: 'La sinusitis volvió. Revisa <em>qué está frenando el drenaje</em>.',
	dek: 'Si otra vez amaneciste con presión en la cara, nariz tapada y moco acumulado, entender por qué las secreciones no están saliendo bien puede evitar que repitas la misma rutina a ciegas.',
	// El copy cita a Mayo Clinic en el texto, pero no trae apartado de fuentes
	buybar: BUYBAR,
	blocks: [
		{ type: 'photo', photo: 'sinus-xray', lead: true, note: REFERENCE_NOTE },
		{ type: 'p', text: 'Hay mañanas en las que uno abre los ojos y ya sabe cómo va a estar el día.' },
		{ type: 'beats', closing: false, lines: ['Nariz completamente tapada.', 'Pesadez entre las cejas.', 'Los pómulos se sienten cargados.'] },
		{ type: 'p', text: 'Te inclinas para amarrarte los zapatos y parece que toda la presión se fuera hacia la cara.' },
		{ type: 'beats', closing: false, lines: ['Preparas el tinto.', 'Te suenas.', 'Entras a trabajar.'] },
		{ type: 'p', text: 'Media hora después estás otra vez buscando un pañuelo.' },
		{ type: 'p', text: 'Y cuando eso ya te ha pasado varias veces durante el año, aparece una frase bastante colombiana:' },
		{ type: 'shout', text: '“Otra vez esta vaina…”' },
		{ type: 'p', text: 'Porque el problema deja de ser solamente respirar incómodo.' },
		{ type: 'p', text: 'También está el cansancio de cancelar planes, dormir mal, hablar gangoso en una reunión y pasar el día esperando que “se destape solo”.' },

		{ type: 'heading', text: 'Dentro de la cara hay pequeños espacios que necesitan drenar' },
		{ type: 'term', lead: 'Alrededor de la nariz, las mejillas, los ojos y la frente tenemos cavidades llamadas', term: 'senos paranasales' },
		{ type: 'photo', photo: 'sinuses', caption: 'Senos paranasales.', note: REFERENCE_NOTE },
		{ type: 'p', text: 'Estas cavidades producen moco y normalmente cuentan con pequeñas vías por donde ese contenido puede drenar.' },
		{ type: 'p', text: 'Cuando el revestimiento se inflama y se hincha, esas salidas pueden estrecharse.' },
		{ type: 'p', text: 'Mayo Clinic explica que esa inflamación puede dificultar el drenaje de la mucosidad, generar congestión nasal y producir sensibilidad o presión alrededor de los ojos, las mejillas, la nariz y la frente.' },
		{ type: 'photo', photo: 'sinus-art', note: REFERENCE_NOTE },
		{ type: 'p', text: 'Piensa en una alcantarilla después de un aguacero fuerte.' },
		{ type: 'beats', lines: ['El agua sigue llegando.', 'Pero si la salida está reducida, empieza a acumularse.'] },
		{ type: 'p', text: 'Dentro de los senos paranasales puede ocurrir una situación parecida con las secreciones.' },
		{ type: 'p', text: 'Y esa imagen ayuda a entender por qué son tan comunes la sensación de cara cargada, la nariz bloqueada y ese moco que parece quedarse dando vueltas durante días.' },

		{ type: 'heading', text: 'Cada recaída tampoco significa exactamente lo mismo' },
		{ type: 'p', text: 'Cuando uno ha pasado varias veces por lo mismo, empieza a hacer asociaciones rápidas.' },
		{ type: 'beats', lines: ['Congestión + presión + moco.', '“Seguro otra infección.”'] },
		{ type: 'p', text: 'Pero la sinusitis puede tener distintos contextos.' },
		{ type: 'p', text: 'Mayo Clinic señala que infecciones, pólipos nasales, inflamación del revestimiento y algunos problemas dentro de la nariz pueden intervenir. En casos crónicos, incluso la causa exacta puede no estar clara.' },
		{ type: 'p', text: 'Por eso algunas personas pasan por la experiencia frustrante de sentirse bien unas semanas y después volver a arrancar.' },
		{
			type: 'beats',
			closing: false,
			lines: ['Otra mañana congestionadas.', 'Otra noche respirando por la boca.', 'Otro paquete de pañuelos en el escritorio.', 'Otra vez preguntándose qué hacer.']
		},

		{ type: 'heading', text: '“A mí el spray me sirve unos días y después vuelvo a lo mismo”' },
		{ type: 'p', text: 'Esa objeción tiene sentido.' },
		{ type: 'p', text: 'Un producto aplicado en la nariz puede ayudar con una sensación puntual de congestión sin necesariamente resolver la razón por la que una persona presenta episodios repetidos.' },
		{ type: 'p', text: 'Ese matiz importa muchísimo.' },
		{ type: 'p', text: 'Si existen alergias, pólipos, una alteración anatómica, una infección u otra situación médica, vale la pena identificarla con un profesional.' },
		{ type: 'p', text: 'Sobre todo cuando llevas semanas con síntomas o cuando las recaídas se han vuelto frecuentes.' },
		{ type: 'p', text: 'Ahora bien, también hay momentos cotidianos donde lo que buscas es bastante más sencillo:' },
		{ type: 'key', text: 'sentir la nariz menos cargada y respirar con mayor comodidad.' },
		{ type: 'p', text: 'Y para ese uso fue desarrollado el Spray Nasal de Nambu.' },

		{ type: 'heading', text: 'Spray Nasal de Nambu para esos días en que la nariz se siente bloqueada', reveal: true },
		{ type: 'spotlight', photo: 'packshot', caption: 'El producto contiene 60 ml.', text: 'La fórmula combina <strong>eucalipto, menta y regaliz</strong>.' },
		{ type: 'portrait', person: 'carlos-mauricio-aplica', body: ['Se aplica directamente por vía nasal y produce una sensación fría y refrescante.'] },
		{
			type: 'plants',
			items: [
				{ plant: 'menta', name: 'Menta', text: 'La menta aporta un frescor intenso.' },
				{ plant: 'eucalipto', name: 'Eucalipto', text: 'El eucalipto deja esa sensación característica de despeje.' },
				{ plant: 'regaliz', name: 'Regaliz', text: 'El regaliz complementa la fórmula con una sensación más suave.' }
			]
		},
		{ type: 'p', text: 'El producto contiene <strong>60 ml</strong> y su modo de uso indicado es de <strong>2 disparos nasales, 2 veces al día</strong>. La ficha actual de Nambu lo presenta como un producto natural de bienestar pensado para momentos de nariz cargada y congestión.' },
		{ type: 'p', text: 'Aquí hay un detalle práctico que se agradece.' },
		{ type: 'portrait', person: 'andrea', flip: true, body: [{ big: 'Son <strong>60&nbsp;ml</strong>.' }, 'Muchos frascos nasales pequeños vienen en presentaciones de alrededor de 30 ml.'] },
		{ type: 'p', text: 'Entonces tienes un producto de mayor contenido para mantener en casa y usar siguiendo sus indicaciones.' },
		{ type: 'cta', label: CTA_LABEL, note: trustLine(PAYMENT) },

		{ type: 'heading', text: '¿Qué se siente después de aplicarlo?' },
		{
			type: 'sequence',
			steps: [
				['catalina-aplica', 'Primero aparece el frescor.'],
				['catalina', 'Ese golpe frío de la menta dentro de la nariz.'],
				['marcos', 'Después llega una sensación de mayor despeje.']
			]
		},
		{ type: 'p', text: 'La propia marca indica que muchas personas perciben esa experiencia aproximadamente en los primeros minutos después de aplicarlo.' },
		{ type: 'p', text: 'Y hay momentos donde algo tan cotidiano se agradece bastante.' },
		{
			type: 'rows',
			items: [
				'Antes de acostarte.',
				'Al levantarte con la nariz bloqueada.',
				'Después de pasar toda la tarde en aire acondicionado.',
				'O cuando llegas de la calle, te quitas los zapatos, te sientas en el sofá y sientes que llevas respirando por la boca medio día.'
			]
		},

		// El copy trae los tres como «REVIEW PARA ADAPTAR A TESTIMONIO REAL — [NOMBRE], [EDAD]».
		// Van con personas reales del pool y solo su nombre (../AGENTS.md §4); Andrea, José Fernando
		// y Catalina ya firman otro texto en la landing de sinusitis.
		{
			type: 'reviews',
			eyebrow: 'Testimonios',
			items: [
				{ slug: 'carlos-aristizabal', quote: '“Yo ya sabía que venía otra semana pesada apenas sentía presión en la frente”', text: 'Me daba por temporadas. Amanecía con la nariz tapada, presión por aquí en la frente y pasaba el día sonándome. Compré el Spray Nasal de Nambu para tener algo práctico en casa. La sensación de menta es fuerte al principio, pero a mí precisamente eso me gusta porque siento la nariz mucho más fresca después de usarlo.' },
				{ slug: 'genesis', quote: '“En la oficina ya todos sabían cuándo estaba congestionada por la voz”', text: 'Trabajo varias horas con aire acondicionado y cuando se me carga la nariz termino hablando súper gangosa. Empecé a usar dos aplicaciones en la mañana y dos más en la noche. Se siente bastante fresco y me gusta tenerlo al lado de la cama porque el frasco además trae bastante.' },
				{ slug: 'camilo', quote: '“Lo que más me desesperaba era acostarme cansado y sentir una fosa completamente cerrada”', text: 'Yo podía pasar el día medio bien, pero en la noche se me congestionaba muchísimo la nariz. Nambu se volvió de esas cosas que dejo en la mesa de noche. Lo aplico y siento ese frescor del eucalipto y la menta que para mí es muy agradable cuando estoy cargado.' }
			]
		},

		{ type: 'heading', text: 'Si esto te ocurre repetidamente, hay una línea que conviene respetar' },
		{ type: 'p', text: 'Una congestión ocasional es una cosa.' },
		{ type: 'p', text: 'Pasar semanas con síntomas o tener episodios frecuentes merece otra conversación.' },
		{ type: 'photo', photo: 'scene-consult', note: REFERENCE_NOTE },
		{ type: 'caution', text: 'Mayo Clinic recomienda valoración médica cuando los síntomas de sinusitis duran más de 10 días, se repiten o no mejoran con el tratamiento. También señala como signos de atención inmediata fiebre, hinchazón o enrojecimiento alrededor de los ojos, dolor de cabeza intenso, cambios en la visión, confusión o rigidez de cuello.' },
		{ type: 'p', text: 'El Spray Nasal de Nambu puede acompañar esos momentos de <strong>nariz cargada y congestión</strong>.' },
		{ type: 'p', text: 'No sustituye la evaluación de una sinusitis recurrente ni los medicamentos que un profesional haya indicado.' },
		{ type: 'p', text: 'Y precisamente por eso preferimos decirte para qué está pensado realmente.' },

		{ type: 'heading', text: 'Para cuando vuelves a sentir la nariz completamente bloqueada' },
		{
			type: 'offer',
			...OFFER,
			photo: 'couple-sinusitis',
			name: 'Spray Nasal de Nambu',
			specs: ['60 ml', '2 disparos nasales, 2 veces al día'],
			available: 'Actualmente disponible por:',
			payment: PAYMENT,
			made: 'Hecho en Colombia.'
		},
		{ type: 'key', text: 'Porque cuando tienes un domingo, una reunión o simplemente una buena noche de sueño por delante, pasar horas respirando por la boca definitivamente no estaba en los planes.' }
	],
	footnote: {
		lines: ['<strong>Información importante:</strong> El Spray Nasal de Nambu es un producto natural de bienestar elaborado en Colombia. La marca indica que no se comercializa como medicamento farmacéutico y que no cuenta con registro INVIMA como medicamento.']
	}
}

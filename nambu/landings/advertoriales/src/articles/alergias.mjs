// Advertorial de alergias: la rinitis deja pistas en la casa.
// Copy: alergias/copy_adv_alergias_spray.txt — los textos van tal cual; aquí solo se decide
// con qué bloque se cuenta cada parte.
import { CTA_LABEL, OFFER, BUYBAR, REFERENCE_NOTE, trustLine } from './shared.mjs'

const PAYMENT = 'Pagas cuando recibes tu pedido'

export default {
	id: 'alergias',
	copy: 'copy_adv_alergias_spray.txt',
	// Sin página de referencia: la ficha donde se publica está por definir
	kicker: { text: 'Contenido editorial de', brand: 'Nambu' },
	title: 'Tu rinitis deja pistas en la casa: <em>4 señales</em> para detectar qué la reactiva',
	dek: 'Si amaneces congestionado, estornudas al tender la cama o notas que tu nariz cambia dependiendo del lugar donde estás, seguir ese patrón puede ayudarte a entender qué estás respirando antes de seguir probando cosas al azar.',
	source: { label: 'Fuentes editoriales', names: 'AAAAI · SEICAP' },
	buybar: BUYBAR,
	blocks: [
		{ type: 'photo', photo: 'scene-pressure', lead: true, note: REFERENCE_NOTE },
		{ type: 'p', text: 'Hay gente que prácticamente tiene dos narices.' },
		{ type: 'p', text: 'La de afuera de la casa funciona bastante bien.' },
		{ type: 'p', text: 'La de adentro empieza con otra historia.' },
		{ type: 'beats', closing: false, lines: ['Llegas al cuarto.', 'Te acuestas.', 'Empiezan los estornudos.'] },
		{ type: 'p', text: 'Te despiertas con una fosa tapada, ojos llorosos y esa sensación de haber pasado la noche respirando por una rendija.' },
		{ type: 'beats', lines: ['Sales.', 'Pasan unas horas.', 'Y curiosamente estás mejor.'] },
		{ type: 'p', text: 'Ahí hay información.' },
		{ type: 'p', text: 'Porque cuando la congestión aparece repetidamente en determinados lugares o momentos, vale la pena mirar <strong>qué había alrededor justo antes de que empezara</strong>.' },

		{ type: 'heading', text: 'Tu nariz también puede llevar un registro del ambiente' },
		{ type: 'p', text: 'La rinitis alérgica ocurre cuando el sistema inmunitario reacciona frente a determinadas sustancias del ambiente.' },
		{ type: 'p', text: 'La American Academy of Allergy, Asthma & Immunology menciona entre los desencadenantes frecuentes el polen, los ácaros del polvo, el moho y partículas relacionadas con animales.' },
		{ type: 'p', text: 'La reacción puede terminar en síntomas muy conocidos:' },
		{ type: 'run', items: ['Estornudos.', 'Picazón.', 'Nariz tapada.', 'Goteo.', 'Ojos llorosos.'] },
		{ type: 'photo', photo: 'airway', caption: 'Vías aéreas respiratorias.', note: REFERENCE_NOTE },
		{ type: 'p', text: 'Y aquí aparece una idea bastante útil.' },
		{ type: 'pull', text: 'En vez de mirar solamente el síntoma, mira dónde se repite.' },
		{ type: 'p', text: 'Piénsalo como cuando llegas a la casa y encuentras el piso mojado.' },
		{ type: 'p', text: 'Puedes secarlo.' },
		{ type: 'p', text: 'Pero si cada tarde aparece mojado exactamente en la misma esquina, terminas mirando hacia arriba buscando la gotera.' },
		{ type: 'p', text: 'Con la rinitis, observar <strong>dónde, cuándo y después de qué</strong> aparecen los síntomas puede aportar pistas parecidas.' },

		{ type: 'heading', chapter: true, text: '<em>Pista #1</em> — Amaneces peor de lo que te acostaste' },
		{ type: 'p', text: 'La cama concentra muchas horas seguidas de exposición.' },
		{ type: 'run', items: ['Colchón.', 'Almohadas.', 'Cobijas.', 'Tapetes.', 'Cortinas.'] },
		{ type: 'p', text: 'Los ácaros del polvo son uno de los desencadenantes conocidos de rinitis alérgica.' },
		{ type: 'p', text: 'Por eso, cuando alguien dice:' },
		{ type: 'pull', text: '“Durante el día estoy medio bien, pero apenas me levanto empiezo con diez estornudos seguidos”,' },
		{ type: 'p', text: 'vale la pena observar el dormitorio.' },
		{ type: 'p', text: 'No significa automáticamente que sean ácaros.' },
		{ type: 'p', text: 'Pero sí existe un patrón que merece atención.' },

		{ type: 'heading', chapter: true, text: '<em>Pista #2</em> — Hay cuartos donde tu nariz cambia' },
		{ type: 'p', text: 'Todos conocemos esa habitación que huele un poquito a guardado.' },
		{
			type: 'rows',
			items: [
				'El clóset pegado a una pared fría.',
				'La esquina que después de varios días de lluvia se siente húmeda.',
				'El baño que tarda una eternidad en secarse.'
			]
		},
		{ type: 'p', text: 'Los hongos ambientales liberan partículas microscópicas llamadas esporas que pueden quedar suspendidas en el aire.' },
		{ type: 'p', text: 'SEICAP explica que, en personas alérgicas a esos hongos, la exposición puede relacionarse con congestión, goteo nasal, estornudos y otros síntomas respiratorios.' },
		{ type: 'p', text: 'Y aquí toca ponerle freno a una conclusión demasiado rápida.' },
		{ type: 'p', text: 'Ver humedad no demuestra que ella sea responsable de tus síntomas.' },
		{ type: 'p', text: 'Y no ver manchas negras tampoco descarta todos los posibles alérgenos de una casa.' },
		{ type: 'key', text: 'La pista útil está en <strong>la repetición</strong>.' },

		{ type: 'heading', chapter: true, text: '<em>Pista #3</em> — Sacudes algo y empieza el festival de estornudos' },
		{ type: 'beats', closing: false, lines: ['Cambias las sábanas.', 'Mueves unas cajas.', 'Limpias debajo de la cama.', 'Sacudes una cobija que llevaba meses guardada.'] },
		{ type: 'p', text: 'Y cinco minutos después estás buscando papel higiénico porque ya acabaste con los pañuelos.' },
		{ type: 'p', text: 'Ese momento también merece entrar en el mapa.' },
		{ type: 'p', text: 'Porque polvo, ácaros y otras partículas del ambiente pueden levantarse mientras limpias o manipulas textiles.' },
		{ type: 'p', text: 'La pregunta útil después es sencilla:' },
		{ type: 'key', text: '¿Esto ocurre siempre después de hacer algo parecido?' },

		{ type: 'heading', chapter: true, text: '<em>Pista #4</em> — Tu nariz cambia con el clima y los espacios cerrados' },
		{ type: 'p', text: 'En Colombia podemos salir con sol, comernos un aguacero una hora después y terminar la tarde encerrados con aire acondicionado.' },
		{ type: 'p', text: 'La nariz también recibe esos cambios.' },
		{ type: 'p', text: 'La AAAAI señala que variaciones en temperatura y humedad, además del humo y los olores fuertes, pueden desencadenar síntomas en algunas personas con rinitis.' },
		{ type: 'p', text: 'Por eso puede pasar que estés perfectamente bien en la mañana y termines congestionado después de horas en una oficina cerrada.' },
		{ type: 'p', text: 'Otra vez aparece el mismo principio:' },
		{ type: 'key', text: 'busca patrones antes de sacar conclusiones.' },

		{ type: 'heading', chapter: true, text: '¿Y si ya limpiaste todo y sigues igual?' },
		{ type: 'p', text: 'Aquí aparece una frustración muy común.' },
		{
			type: 'beats',
			lines: ['Lavaste las cobijas.', 'Limpiaste el cuarto.', 'Moviste la cama.', 'Compraste antihistamínicos.', 'Revisaste la humedad.', 'Y la nariz sigue teniendo días buenos y días pésimos.']
		},
		{ type: 'p', text: 'Eso puede ocurrir porque identificar el desencadenante concreto no siempre es evidente.' },
		{ type: 'p', text: 'Síntomas parecidos pueden relacionarse con ácaros, pólenes, hongos, animales, irritantes ambientales o incluso una rinitis que no sea alérgica.' },
		{ type: 'p', text: 'Cuando ocurre de forma persistente, un alergólogo puede ayudar a investigar cuáles exposiciones realmente están involucradas.' },
		{ type: 'p', text: 'Mientras tanto, hay otra necesidad mucho más cotidiana.' },
		{ type: 'key', text: 'Qué hacer cuando la nariz ya está cargada y lo que quieres en ese momento es respirar con mayor comodidad.' },

		{ type: 'heading', text: 'Ahí entra el Spray Nasal de Nambu', reveal: true },
		{ type: 'spotlight', photo: 'ingredients', text: 'El <strong>Spray Nasal de Nambu</strong> combina:', formula: 'Eucalipto + Menta + Regaliz' },
		{ type: 'p', text: 'Su aplicación es directamente por vía nasal.' },
		{
			type: 'rows',
			items: ['La menta genera una sensación fría e intensa.', 'El eucalipto aporta esa sensación característica de despeje.', 'Y el regaliz complementa la fórmula.']
		},
		{ type: 'p', text: 'El resultado es una experiencia fresca justo en la zona donde estás sintiendo la congestión.' },
		{ type: 'portrait', person: 'catalina-aplica', body: [{ big: 'Dos disparos nasales.' }, { big: 'Dos veces al día.' }] },
		{ type: 'p', text: 'Y hay un detalle que se nota cuando lo comparas con esos frascos pequeños que parecen acabarse apenas los empezaste:' },
		{ type: 'portrait', person: 'camilo', flip: true, body: [{ big: 'Nambu trae 60&nbsp;ml.' }, 'Es el doble del contenido de un spray común de farmacia de 30 ml.'] },
		{ type: 'p', text: 'Eso permite tenerlo en casa para esos días en los que despiertas cargado, después de pasar horas entre polvo o aire acondicionado, o antes de acostarte cuando la nariz empieza otra vez con su pelea.' },
		{ type: 'cta', label: CTA_LABEL, note: trustLine(PAYMENT) },

		// El copy los trae como «REVIEW MODELO» con nombre y edad de ejemplo y la nota «Publicar
		// únicamente asociado a una experiencia real equivalente». Van con personas reales del pool
		// y solo su nombre (../AGENTS.md §4); Catalina ya firma otro texto en la landing de alergias.
		{
			type: 'reviews',
			eyebrow: 'Testimonios',
			items: [
				{ slug: 'wilson', quote: '“Empecé a darme cuenta de que siempre amanecía peor”', text: 'Al principio pensaba que era simplemente el clima. Después noté que los estornudos empezaban casi siempre apenas me levantaba. Estoy revisando también el tema del colchón y las cobijas, pero compré Nambu para esos momentos en que siento la nariz demasiado cargada. La menta se siente bastante y me gusta la sensación de despeje que deja.' },
				{ slug: 'andres', quote: '“Mi nariz sabía cuándo estaba limpiando antes que yo”', text: 'Cada vez que movíamos cosas del depósito empezaba a estornudar horrible. Ahora trato de cuidarme más con el polvo y tengo el spray en la casa. Lo que más me gusta es que lo aplico directamente en la nariz y siento el frescor muy rápido. El frasco además es grande.' },
				{ slug: 'genesis', quote: '“En la oficina con aire acondicionado era donde más lo notaba”', text: 'Podía salir de mi casa respirando bien y después del almuerzo ya estaba completamente congestionada. Empecé a fijarme mucho más en los ambientes donde me pasa. Nambu lo llevo conmigo porque es práctico y la combinación de menta y eucalipto me deja una sensación fresca que me gusta bastante.' }
			]
		},

		{ type: 'heading', text: 'Un spray tampoco puede borrar lo que sigues respirando todos los días' },
		{ type: 'p', text: 'Ese punto vale la pena dejarlo claro.' },
		{ type: 'p', text: 'Si eres alérgico a un desencadenante específico y sigues expuesto a él, observar y reducir esa exposición cuando sea posible forma parte del manejo.' },
		{
			type: 'caution',
			lines: [
				'Un producto nasal no convierte una habitación con humedad en una habitación seca.',
				'No elimina ácaros del colchón.',
				'No identifica qué sustancia te produce alergia.',
				'Y no reemplaza la valoración de una rinitis recurrente.'
			]
		},
		{ type: 'p', text: 'El <strong>Spray Nasal de Nambu</strong> está pensado para acompañarte cuando aparece esa sensación de nariz cargada y buscas frescor y mayor comodidad al respirar.' },
		{ type: 'p', text: 'Para el resto, las pistas importan.' },
		{ type: 'p', text: 'Porque tal vez el próximo paso útil sea empezar a registrar algo muy sencillo:' },
		{ type: 'beats', lines: ['Dónde estabas.', 'Qué estabas haciendo.', 'Y qué pasó con tu nariz después.'] },

		{ type: 'heading', text: 'Para esos momentos en que tu nariz ya reaccionó' },
		{
			type: 'offer',
			...OFFER,
			photo: 'couple-alergias',
			name: 'Spray Nasal de Nambu',
			specs: ['60 ml', '2 disparos nasales, 2 veces al día'],
			payment: PAYMENT,
			made: 'Hecho en Colombia por Nambu.'
		},
		{ type: 'p', text: 'Porque vivir entre “¿será el polvo?”, “¿será el clima?”, “¿será este cuarto?” ya es suficientemente cansón.' },
		{ type: 'key', text: 'Cuando la nariz se carga, por lo menos tienes algo práctico a la mano.' }
	],
	footnote: {
		lines: [
			'<strong>Fuentes editoriales</strong>',
			'American Academy of Allergy, Asthma & Immunology — Hay Fever / Rhinitis.',
			'Sociedad Española de Inmunología Clínica, Alergología y Asma Pediátrica — Alergia a hongos ambientales.',
			'La información de este artículo es educativa. Si los síntomas son persistentes, intensos, afectan el sueño o se acompañan de dificultad respiratoria, se recomienda valoración profesional.'
		]
	}
}

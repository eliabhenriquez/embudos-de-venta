// Advertorial de capitales: el aire de cuatro ciudades.
// Copy: capitales/copy_adv_capitales_spray.txt — los textos van tal cual; aquí solo se decide
// con qué bloque se cuenta cada parte.
import { CTA_LABEL, OFFER, BUYBAR, REFERENCE_NOTE, trustLine } from './shared.mjs'

const PAYMENT = 'Pagas cuando recibes en casa'
// La cifra que el copy destaca en Bogotá y en Barranquilla lleva la misma coletilla
const EMISSIONS_LABEL = 'de las emisiones de PM2.5'

export default {
	id: 'capitales',
	copy: 'copy_adv_capitales_spray.txt',
	product: { handle: 'advertorial-general-capitales-lung-cleansing', title: 'Advertorial - General [Capitales] - Lung Cleansing', variant: '53256640135328' },
	kicker: { text: 'Contenido editorial de', brand: 'Nambu' },
	title: 'El aire de tu capital tiene firma propia: <em>4 mapas</em> para entender qué respiras cada día',
	dek: 'Bogotá, Medellín, Cali y Barranquilla conviven con partículas finas provenientes de fuentes distintas. Saber dónde se concentra tu exposición ayuda a entender por qué algunos días terminas con la nariz mucho más cargada que otros.',
	source: { label: 'Fuentes editoriales', names: 'OMS · Secretaría Distrital de Ambiente de Bogotá · Área Metropolitana del Valle de Aburrá · DAGMA · EPA Barranquilla Verde' },
	buybar: BUYBAR,
	blocks: [
		{ type: 'photo', photo: 'scene-balcony', lead: true, note: REFERENCE_NOTE },
		{ type: 'p', text: 'Uno aprende a reconocer su ciudad por cosas muy particulares.' },
		{
			type: 'rows',
			items: [
				'Bogotá por ese frío que aparece apenas se esconde el sol.',
				'Medellín por las montañas que parecen abrazar toda la ciudad.',
				'Cali por el calor de la tarde.',
				'Barranquilla por ese viento que a veces llega con toda.'
			]
		},
		{ type: 'p', text: 'Pero hay otra característica de cada capital que difícilmente vemos:' },
		{ type: 'key', text: 'la mezcla de partículas que respiramos mientras hacemos la vida normal.' },
		{
			type: 'beats',
			closing: false,
			lines: ['Sales a trabajar.', 'Caminas hasta el transporte.', 'Esperas en una avenida.', 'Pasas junto a una obra.', 'Almuerzas afuera.', 'Regresas a casa.']
		},
		{ type: 'p', text: 'Y durante todo ese recorrido el aire cambia varias veces sin que necesariamente puedas verlo.' },

		{ type: 'heading', text: 'Una partícula 30 veces más pequeña que un cabello' },
		{
			type: 'term',
			lead: 'Entre los contaminantes que más preocupan están las',
			term: 'PM2.5',
			text: 'La Organización Mundial de la Salud explica que estas partículas tienen un diámetro de hasta 2,5 micrómetros y son aproximadamente 30 veces más pequeñas que el ancho promedio de un cabello humano.'
		},
		{ type: 'p', text: 'Son tan pequeñas que pueden penetrar profundamente en los pulmones y algunas incluso alcanzar el torrente sanguíneo.' },
		{ type: 'p', text: 'Ahí está la parte intelectualmente interesante del problema:' },
		{ type: 'pull', text: 'el aire puede verse completamente normal y seguir transportando partículas que no alcanzas a ver.' },
		{ type: 'p', text: 'Por eso mirar solamente si “la ciudad está gris” dice muy poco sobre lo que respiraste durante el día.' },
		{ type: 'p', text: 'Y Colombia ofrece cuatro ejemplos muy distintos.' },

		{ type: 'heading', chapter: true, text: '<em>Bogotá:</em> aquí buena parte del problema empieza desde el suelo' },
		{ type: 'p', text: 'Uno puede pensar inmediatamente en los exostos.' },
		{ type: 'p', text: 'Pero en Bogotá hay un dato que sorprende más.' },
		{ type: 'stat', value: '40 %', label: EMISSIONS_LABEL },
		{ type: 'p', text: 'Según el Inventario de Emisiones de la ciudad, cerca del <strong>40 % de las emisiones de PM2.5</strong> provienen del polvo que vuelve a levantarse por el tránsito sobre las vías, especialmente en sectores con vías sin pavimentar.' },
		{ type: 'p', text: 'Después aparecen las fuentes móviles en carretera, con alrededor del 17 %, donde tiene especial peso el transporte de carga, y la maquinaria amarilla diésel con otro 10,4 %.' },
		{ type: 'p', text: 'Traducido a vida normal:' },
		{ type: 'run', items: ['carro.', 'Bus.', 'Camión.', 'Vía seca.', 'Obra.', 'Polvo.', 'Otra avenida.', 'Y otra hora afuera.'] },
		{ type: 'p', text: 'En sectores del suroccidente como Bosa, Kennedy, Ciudad Bolívar y Fontibón, las autoridades han identificado una mayor concentración de estas emisiones.' },
		{ type: 'p', text: 'Entonces ese polvo que uno ve levantarse cuando pasa un camión tampoco es simplemente “tierra de la calle”.' },
		{ type: 'p', text: 'Forma parte del problema de calidad del aire que la ciudad monitorea.' },

		{ type: 'heading', chapter: true, text: '<em>Medellín:</em> el problema también puede quedarse atrapado entre montañas' },
		{ type: 'p', text: 'Medellín tiene otra historia.' },
		{ type: 'p', text: 'Aquí entra en juego el Valle de Aburrá.' },
		{ type: 'photo', photo: 'scene-valley', note: REFERENCE_NOTE },
		{ type: 'p', text: 'Las emisiones ocurren dentro de un territorio rodeado por montañas y ciertas condiciones meteorológicas pueden dificultar la dispersión de los contaminantes.' },
		{ type: 'p', text: 'Por eso hay temporadas donde las concentraciones suben.' },
		{ type: 'p', text: 'El informe oficial de calidad del aire de 2025 registró los valores más elevados de PM2.5 principalmente durante febrero y marzo.' },
		{ type: 'p', text: 'El Área Metropolitana explica que estos episodios coinciden con la transición entre temporadas climáticas y pueden recibir además aportes de incendios de cobertura vegetal ocurridos incluso fuera de la región.' },
		{ type: 'p', text: 'La imagen es sencilla.' },
		{ type: 'p', text: 'En Bogotá puedes pensar en polvo levantándose.' },
		{ type: 'p', text: 'En Medellín conviene imaginar también una especie de recipiente natural.' },
		{ type: 'beats', lines: ['Se generan partículas abajo.', 'Y determinadas condiciones hacen más difícil que se dispersen rápidamente.'] },
		{ type: 'p', text: 'En 2025 hubo días en los que algunas estaciones llegaron a la categoría de calidad del aire <strong>dañina para grupos sensibles</strong>, aunque el mismo informe señala una mejora frente a años anteriores.' },
		{ type: 'p', text: 'La calidad puede mejorar y aun así existir exposición.' },
		{ type: 'p', text: 'Las dos cosas pueden ocurrir al mismo tiempo.' },

		{ type: 'heading', chapter: true, text: '<em>Cali:</em> una misma ciudad, varias exposiciones' },
		{ type: 'p', text: 'Cali sirve para entender otro punto importante.' },
		{ type: 'key', text: 'Dentro de una misma capital tampoco todos respiramos exactamente el mismo aire.' },
		{ type: 'p', text: 'El sistema de vigilancia del DAGMA distribuye estaciones en distintos puntos de la ciudad para medir contaminantes como PM10, PM2.5, dióxido de nitrógeno y ozono.' },
		{ type: 'p', text: 'Hay monitoreo de PM2.5 en sectores como Base Aérea, Univalle, Compartir y zonas del oriente.' },
		{ type: 'p', text: 'Eso importa porque la exposición depende de dónde vives, dónde trabajas y por dónde te mueves.' },
		{ type: 'beats', closing: false, lines: ['Puedes pasar la mañana en el sur.', 'Cruzar media ciudad.', 'Trabajar junto a una avenida.', 'Regresar por otra zona.'] },
		{ type: 'p', text: 'El recorrido importa tanto como el nombre de la ciudad.' },
		{ type: 'p', text: 'Y ahí empieza a aparecer una forma diferente de pensar la contaminación.' },
		{ type: 'pull', text: 'Tu dirección dice dónde vives. Tu ruta diaria dice qué aire atraviesas.' },

		{ type: 'heading', chapter: true, text: '<em>Barranquilla:</em> carros, viento y contaminantes que incluso pueden llegar desde afuera' },
		{ type: 'p', text: 'Barranquilla tiene otro mapa.' },
		{ type: 'stat', value: '89 %', label: EMISSIONS_LABEL },
		{ type: 'p', text: 'Según el inventario de emisiones citado por EPA Barranquilla Verde, las fuentes móviles representan alrededor del <strong>89 % de las emisiones de PM2.5</strong> de la ciudad.' },
		{ type: 'p', text: 'Ahí el parque automotor tiene un peso enorme.' },
		{ type: 'p', text: 'Pero la ubicación de Barranquilla añade otra variable interesante.' },
		{ type: 'p', text: 'El viento también transporta.' },
		{ type: 'p', text: 'Y eso significa que parte de la contaminación puede tener origen fuera de la ciudad.' },
		{ type: 'p', text: 'En distintos momentos Barranquilla ha registrado afectaciones asociadas a incendios en el Parque Isla Salamanca y otros eventos regionales.' },
		{ type: 'p', text: 'De hecho, durante un incendio reciente, la autoridad ambiental registró concentraciones elevadas de material particulado y recomendó reducir la exposición al humo, especialmente entre personas vulnerables.' },
		{ type: 'p', text: 'Entonces puedes levantarte en Barranquilla sin haber cambiado absolutamente nada en tu rutina…' },
		{ type: 'p', text: 'y aun así encontrar un aire diferente al del día anterior.' },

		{ type: 'heading', chapter: true, text: 'Cuatro ciudades. Cuatro mezclas. La misma vía de entrada.' },
		{ type: 'p', text: 'Aquí se conectan los puntos.' },
		{
			type: 'rows',
			items: [
				'Bogotá puede exponerte más al polvo resuspendido y al transporte pesado.',
				'Medellín tiene temporadas donde la geografía y las condiciones atmosféricas dificultan la dispersión.',
				'Cali demuestra cómo la exposición cambia según la zona y la ruta.',
				'Barranquilla combina un fuerte componente vehicular con episodios de contaminantes transportados por el viento.'
			]
		},
		{ type: 'p', text: 'Pero todos entran por un lugar bastante familiar:' },
		{ type: 'key', text: 'las vías respiratorias.' },
		{ type: 'photo', photo: 'airway', caption: 'Vías aéreas respiratorias.', note: REFERENCE_NOTE },
		{ type: 'p', text: 'La OMS explica que el material particulado incluye polvo, suciedad, hollín, humo y pequeñas gotas suspendidas en el aire.' },
		{ type: 'p', text: 'Las PM2.5 son especialmente relevantes porque pueden penetrar profundamente en los pulmones.' },
		{
			type: 'caution',
			lines: [
				'Por eso sería incorrecto vender la idea de que un spray nasal puede “sacar la contaminación” del organismo.',
				'No puede.',
				'Tampoco puede extraer PM2.5 que haya llegado profundamente al pulmón.'
			]
		},
		{ type: 'p', text: 'Pero hay otra experiencia mucho más cotidiana que sí reconoce cualquiera que pase horas moviéndose por una gran ciudad colombiana.' },

		{ type: 'heading', text: 'Llegar a casa y sentir la nariz cargada' },
		{ type: 'beats', lines: ['Te quitas los zapatos.', 'Dejas las llaves.', 'Te miras al espejo.', 'Y sientes ganas de sonarte.'] },
		{ type: 'run', items: ['La nariz está pesada.', 'A veces seca.', 'A veces congestionada.'] },
		{ type: 'p', text: 'Quizás vienes de ocho horas entre calles, tráfico, polvo, aire acondicionado y cambios de temperatura.' },
		{ type: 'p', text: 'Y ahí lo que quieres es bastante sencillo:' },
		{ type: 'key', text: 'sentir frescor y respirar más cómodo.' },
		{ type: 'p', text: 'Ese es el terreno donde entra el Spray Nasal de Nambu.' },

		{ type: 'heading', text: 'Spray Nasal de Nambu después de esos días donde respiraste ciudad durante horas', reveal: true },
		{ type: 'spotlight', photo: 'packshot', text: 'Su fórmula combina:', formula: 'Eucalipto + Menta + Regaliz' },
		{ type: 'p', text: 'La aplicación ocurre directamente por vía nasal.' },
		{
			type: 'plants',
			items: [
				{ plant: 'menta', name: 'Menta', text: 'La menta deja una sensación fría e intensa.' },
				{ plant: 'eucalipto', name: 'Eucalipto', text: 'El eucalipto aporta esa percepción característica de despeje.' },
				{ plant: 'regaliz', name: 'Regaliz', text: 'El regaliz completa la fórmula.' }
			]
		},
		{ type: 'portrait', person: 'catalina-aplica', body: ['Se utiliza con:', { big: '2 disparos nasales' }, { big: '2 veces al día' }] },
		{ type: 'portrait', person: 'camilo', flip: true, body: ['Y viene en una presentación de:', { big: '60 ML' }, 'El doble del contenido de un spray pequeño de farmacia de 30 ml.'] },
		{ type: 'p', text: 'Un tamaño pensado para tenerlo en casa y recurrir a él cuando después de todo un día afuera sientes la nariz cargada.' },
		{ type: 'cta', label: CTA_LABEL, note: trustLine(PAYMENT) },

		// El copy los trae como «REVIEW MODELO» con nombre y edad de ejemplo y la nota «Publicar
		// únicamente asociado a una experiencia real equivalente». Van con personas reales del pool
		// y solo su nombre (../AGENTS.md §4). Cada texto dice en qué ciudad vive quien lo firma:
		// tiene que ser verdad de esa persona o se cambia el texto.
		{
			type: 'reviews',
			eyebrow: 'Testimonios',
			items: [
				{ slug: 'daniel', quote: '“En Bogotá llegaba a la casa y lo primero que hacía era sonarme”', text: 'Trabajo casi todo el día moviéndome entre Kennedy, Puente Aranda y el centro. Hay días con demasiado polvo y tráfico. Empecé a usar Nambu cuando llego a la casa y me gusta mucho el frescor que deja. La menta se siente bastante y quedo con una sensación de nariz más despejada.' },
				{ slug: 'andrea', quote: '“En Medellín hay días donde uno siente el aire distinto”', text: 'Vivo en Medellín y cuando hay días pesados termino muy congestionada, especialmente después de estar varias horas afuera. Tengo Nambu en la casa y lo uso mañana y noche. Me gusta mucho esa sensación fría del eucalipto y la menta después de aplicarlo.' },
				{ slug: 'wilson', quote: '“En Cali paso media ciudad todos los días”', text: 'Vivo en el sur pero trabajo hacia otra zona y prácticamente atravieso Cali todos los días. Entre tráfico, calor y polvo a veces llego con la nariz muy cargada. Con Nambu siento frescor rápido y el frasco de 60 ml me parece mucho más rendidor.' },
				{ slug: 'jose-fernando', quote: '“Cuando llegan días de humo en Barranquilla se siente”', text: 'He vivido días en que se siente olor a humo afuera y prefiero cerrar todo en la casa. Compré Nambu para esos momentos donde siento la nariz cargada. La sensación de menta es fuerte al principio y precisamente eso es lo que me gusta.' }
			]
		},

		{ type: 'heading', text: 'Hay una regla importante con la contaminación' },
		{ type: 'p', text: 'Si el aire está deteriorado, <strong>reducir la exposición sigue siendo la prioridad</strong>.' },
		{
			type: 'rows',
			items: [
				'Consultar los reportes oficiales.',
				'Evitar actividad física intensa al aire libre cuando exista una alerta.',
				'Cerrar ventanas cuando hay humo cercano.',
				'Seguir las recomendaciones de las autoridades ambientales.',
				'Y prestar especial atención si tienes asma u otra condición respiratoria.'
			]
		},
		{ type: 'p', text: 'El Spray Nasal de Nambu tampoco sustituye ninguna de esas medidas.' },
		{ type: 'p', text: 'Su lugar es más concreto:' },
		{ type: 'pull', text: 'esos momentos cotidianos en los que la nariz ya se siente cargada y buscas frescor y comodidad al respirar.' },
		{ type: 'p', text: 'Porque vivir en una capital significa disfrutar restaurantes, trabajo, amigos, conciertos, universidades, parques y todo lo que hace interesante una ciudad.' },
		{ type: 'p', text: 'También significa respirar el aire de esa ciudad todos los días.' },

		{ type: 'heading', text: 'Si vives en Bogotá, Medellín, Cali o Barranquilla, tu recorrido también forma parte de lo que respiras' },
		{
			type: 'offer',
			...OFFER,
			photo: 'couple-general',
			name: 'Spray Nasal de Nambu',
			specs: ['60 ml', '2 disparos nasales, 2 veces al día'],
			payment: PAYMENT,
			made: 'Hecho en Colombia por Nambu.'
		},
		{ type: 'key', text: 'Después de pasar todo el día respirando tu ciudad, llegar a casa y sentir la nariz cargada tampoco tiene por qué convertirse en parte obligatoria de vivir en una capital.' }
	],
	footnote: {
		lines: [
			'<strong>Fuentes editoriales</strong>',
			'Organización Mundial de la Salud — Material particulado y efectos de la contaminación atmosférica.',
			'Secretaría Distrital de Ambiente de Bogotá — Inventario de emisiones y monitoreo de PM2.5.',
			'Área Metropolitana del Valle de Aburrá — Informe anual de calidad del aire 2025.',
			'DAGMA — Sistema de Vigilancia de Calidad del Aire de Cali.',
			'EPA Barranquilla Verde — Inventario de emisiones y vigilancia de calidad del aire.',
			'La información de este artículo es educativa. La contaminación atmosférica puede afectar la salud y los síntomas respiratorios pueden tener múltiples causas. Ante dificultad respiratoria importante, dolor en el pecho o síntomas persistentes, consulta con un profesional de salud.'
		]
	}
}

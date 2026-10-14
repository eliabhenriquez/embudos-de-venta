// Listicle de piel: cinco razones por las que la piel sigue apagada aunque uses sérums caros.
// Copy: ../../listicle-piel/copy listicle - piel - sknglow.txt — los textos van tal cual;
// aquí solo se decide con qué bloque se cuenta cada parte y dónde cae cada imagen.
import { MASTHEAD, REFERENCE_NOTE, PRODUCT_NAME, CTA_LABEL_SHORT, OFFER, BUYBAR, LEGAL } from './shared.mjs'

const REASONS = 5
const reason = (n, text, extra = {}) => ({ type: 'reason', n, of: REASONS, text, ...extra })

export default {
	id: 'listicle-piel',
	format: 'listicle',
	angle: 'piel',
	copy: 'copy listicle - piel - sknglow.txt',
	// Banner del formulario: el del ángulo de piel (/mima/shared/*-form.css)
	banner: 'piel',
	masthead: MASTHEAD,
	title: '5 razones por las que tu piel sigue apagada, tirante y con labios partidos aunque uses sérums caros',
	dek: '¡LEE hasta el final antes de perder más dinero!',
	buybar: BUYBAR,
	legal: LEGAL,
	blocks: [
		// Abre la imagen del problema: la cara apagada y con gesto de cansancio
		{ type: 'plate', image: 'lst-piel-apagada', lead: true, zoom: false, caption: 'Cara opaca, con aspecto de cansancio.', note: REFERENCE_NOTE },

		{ type: 'p', lede: true, text: 'Tu crema puede hidratar la superficie.' },
		{ type: 'p', text: 'Pero tu piel también necesita proteína, agua, grasas saludables, vitaminas y nutrientes para conservar su barrera, recuperarse de una irritación y mantener ese aspecto parejo que tanto buscas frente al espejo.' },
		{ type: 'p', text: 'Cuando el cuerpo viene con estrés, comidas limitadas, digestión pesada o baja hidratación, la piel suele ser de las primeras en mostrarlo.' },

		reason(1, 'Tu piel está tratando de protegerse con menos recursos'),
		{ type: 'p', text: 'Piensa en la piel como una pared.' },
		{ type: 'plate', image: 'lst-piel-barrera', caption: 'Para mantenerse firme necesita nutrientes y energía.' },
		{ type: 'p', text: 'Esa pared retiene agua, protege frente al sol, el maquillaje, el sudor y los productos que usas todos los días.' },
		{ type: 'p', text: 'Para mantenerse firme necesita nutrientes y energía. Cuando faltan, la pared empieza a resentirse.' },
		{ type: 'p', text: 'Por eso aparecen señales como:' },
		{ type: 'signs', items: ['Piel tirante aunque te pongas crema', 'Textura áspera o descamada', 'Labios resecos que se parten con facilidad', 'Cara opaca, con aspecto de cansancio', 'Maquillaje que se marca en parches'] },
		{ type: 'p', text: 'Tu sérum puede acompañar la superficie. Pero esa piel también necesita tener con qué renovarse.' },

		reason(2, 'El cuerpo prioriza sobrevivir antes que darte glow'),
		{ type: 'p', text: 'Cuando estás comiendo poco, restringiendo muchos alimentos porque te caen mal, pasando por días de diarrea, cansancio o inflamación, el cuerpo empieza a administrar recursos.' },
		// «Primero va lo indispensable: órganos, energía, recuperación. La apariencia de la
		// piel queda más abajo en esa lista»: las mismas palabras, puestas en orden
		{ type: 'ladder', label: 'A qué le da prioridad el cuerpo cuando administra recursos', first: ['Órganos', 'Energía', 'Recuperación'], last: 'La apariencia de la piel' },
		{ type: 'p', text: 'Primero va lo indispensable: órganos, energía, recuperación.' },
		{ type: 'p', text: 'La apariencia de la piel queda más abajo en esa lista.' },
		{ type: 'p', text: 'Por eso hay personas que sienten que de un momento a otro:' },
		{ type: 'signs', items: ['Su cara perdió luminosidad', 'Las uñas se volvieron blandas o quebradizas', 'Los labios viven partidos', 'Las marcas tardan más en verse bien', 'La piel se siente más seca y menos elástica'] },
		{ type: 'p', text: 'No siempre se trata de la crema que te faltaba.' },
		{ type: 'key', text: 'A veces tu piel está mostrando que necesita una mirada más completa.' },

		reason(3, 'Estás cambiando productos cuando deberías mirar lo que se repite'),
		{ type: 'p', text: 'Compraste vitamina C.' },
		{ type: 'p', text: 'Después ácido hialurónico.' },
		{ type: 'p', text: 'Luego retinol, exfoliante, mascarilla, parches y una crema que prometía “piel de porcelana”.' },
		{ type: 'p', text: 'Pero cada vez que algo no funciona, cambias toda la rutina y vuelves a empezar.' },
		{ type: 'flatline', steps: ['Vitamina C', 'Ácido hialurónico', 'Retinol'], result: 'Vuelves a empezar' },
		{ type: 'p', text: 'Así es imposible saber qué le está gustando a tu piel y qué la está saturando.' },
		{ type: 'p', text: 'Hazte estas preguntas:' },
		{
			type: 'cards',
			kind: 'question',
			label: 'Preguntas para hacerte',
			items: [
				'¿Mi piel se ve apagada junto con cansancio físico?',
				'¿Mis labios y uñas cambiaron al mismo tiempo?',
				'¿Estoy comiendo cada vez menos variedad porque muchas cosas me caen pesadas?',
				'¿Estoy tomando poca agua?',
				'¿Estoy usando demasiados activos aunque mi piel ya arde o se descama?'
			]
		},
		{ type: 'p', text: 'La piel no necesita que le tires veinte productos encima.' },
		{ type: 'key', text: 'Necesita que entiendas qué está pasando.' },

		reason(4, 'SKNGLOW suma lo que tu tocador no puede darte', { reveal: true }),
		{ type: 'plate', image: 'lst-piel-tocador', zoom: false, caption: 'Un hábito que vaya más allá de aplicarte otra crema frente al espejo.', note: REFERENCE_NOTE },
		{ type: 'p', text: 'SKNGLOW viene en dulces duros sabor kiwi para acompañar piel, cabello y uñas en tu día a día.' },
		{ type: 'p', text: 'Tiene resveratrol, conocido por su papel antioxidante, y biotina, que participa en el metabolismo de proteínas importantes para los tejidos.' },
		{ type: 'p', text: 'Esa combinación tiene sentido cuando sientes que tu piel perdió vida y quieres sumar un hábito que vaya más allá de aplicarte otra crema frente al espejo.' },
		{
			type: 'product',
			name: PRODUCT_NAME,
			stats: [
				{ value: '4', label: 'dulces duros al día' },
				{ value: '120', label: 'unidades para 1 mes' },
				{ label: 'Sabor', value: 'kiwi', labelFirst: true }
			],
			notes: [
				'Fácil de llevar en la cartera, al trabajo o de viaje',
				'Pensado para sumar constancia, sin convertir tu día en otra lista de tareas'
			]
		},
		{ type: 'p', text: 'La crema puede seguir en tu baño.' },
		{ type: 'key', text: 'SKNGLOW puede acompañarte durante el día.' },
		{ type: 'cta', label: CTA_LABEL_SHORT },

		reason(5, 'Verte cuidada empieza cuando dejas de tapar las señales'),
		{ type: 'p', text: 'Una cara cansada no siempre pide más maquillaje.' },
		{ type: 'p', text: 'Unos labios partidos no siempre piden otro bálsamo.' },
		{ type: 'p', text: 'Una piel tirante no siempre pide el sérum que salió esta semana.' },
		{ type: 'p', text: 'Empieza por revisar descanso, hidratación, alimentación y digestión. Mantén una rutina facial coherente. Y si llevas tiempo sintiendo que tu piel, uñas o cabello cambiaron junto con fatiga, molestias digestivas o pérdida de peso, busca orientación profesional.' },
		{ type: 'p', text: 'Después suma SKNGLOW a tus días y dale a tu piel algo más que productos acumulados en el tocador.' },
		{ type: 'key', text: 'Pídelo hoy.' },
		{ type: 'p', text: 'Tu pedido llega en 3 a 5 días hábiles. Si no llega en ese tiempo, MIMA te lo reenvía sin costo adicional o te devuelve la inversión si pagaste de forma anticipada.' },
		// El copy no trae precio ni etiqueta de botón: van los del producto y la de las landings
		{ type: 'offer', ...OFFER, label: CTA_LABEL_SHORT }
	]
}

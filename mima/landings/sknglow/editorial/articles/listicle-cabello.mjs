// Listicle de cabello: cinco razones por las que el pelo se cae aunque cambies de champú.
// Copy: ../../listicle-cabello/copy listicle - cabello - sknglow.txt — los textos van tal
// cual; aquí solo se decide con qué bloque se cuenta cada parte y dónde cae cada imagen.
import { MASTHEAD, REFERENCE_NOTE, PRODUCT_NAME, CTA_LABEL_SHORT, OFFER, BUYBAR, LEGAL } from './shared.mjs'

const REASONS = 5
const reason = (n, text, extra = {}) => ({ type: 'reason', n, of: REASONS, text, ...extra })

export default {
	id: 'listicle-cabello',
	format: 'listicle',
	angle: 'cabello',
	copy: 'copy listicle - cabello - sknglow.txt',
	// Banner del formulario: el del ángulo de cabello (/mima/shared/*-form.css)
	banner: 'cabello',
	masthead: MASTHEAD,
	title: '5 razones por las que se te cae el pelo aunque compres el champú, la ampolleta y la vitamina que viste en TikTok',
	buybar: BUYBAR,
	legal: LEGAL,
	blocks: [
		// Abre la imagen del problema: los cabellos en la mano y el cepillo lleno
		{ type: 'plate', image: 'lst-cab-caida', lead: true, zoom: false, caption: 'El cepillo lleno aunque te lo peines suave.', note: REFERENCE_NOTE },

		{ type: 'p', lede: true, text: 'El cepillo termina lleno. En la ducha se te quedan mechones en las manos. Te haces una cola y sientes que ya no tiene el mismo volumen.' },
		{ type: 'p', text: 'Entonces compras otro champú anticaída, una ampolleta, un aceite y cualquier vitamina que prometa ayudarte.' },
		{ type: 'key', text: 'Pero el cabello sigue viéndose seco, más fino y cada vez menos abundante.' },

		reason(1, 'El cabello no se cae porque sí'),
		{ type: 'p', text: 'Cada hebra nace en un folículo que necesita energía, proteína, hierro, zinc, vitaminas y otros nutrientes para mantenerse en su ciclo de crecimiento.' },
		{ type: 'plate', image: 'lst-cab-foliculo', caption: 'El folículo, que está debajo de la piel y desde donde nace el cabello.' },
		{ type: 'p', text: 'Cuando el cuerpo atraviesa estrés físico, enfermedad, pérdida de peso, dietas muy restrictivas o una alimentación insuficiente, puede mandar más folículos a una fase de reposo.' },
		{ type: 'p', text: 'Semanas o meses después, ves el resultado:' },
		{ type: 'signs', items: ['Más pelo en la ducha', 'El cepillo lleno aunque te lo peines suave', 'Menor volumen en la cola', 'Cuero cabelludo más visible', 'Pelo opaco, fino o quebradizo'] },
		{ type: 'p', text: 'No tienes que saberte el nombre técnico del tipo de caída para entender lo importante: tu cabello también responde a cómo está tu cuerpo.' },

		reason(2, 'Un champú limpia el cuero cabelludo, pero no alimenta el folículo'),
		{ type: 'p', text: 'Aquí es donde muchas gastan dinero sin entender por qué siguen frustradas.' },
		{ type: 'p', text: 'El champú toca el cuero cabelludo por unos minutos y luego se enjuaga. Puede dejar el pelo más limpio, con olor rico o más manejable.' },
		{ type: 'p', text: 'Pero el folículo, que está debajo de la piel y desde donde nace el cabello, recibe lo que circula en el cuerpo.' },
		{ type: 'p', text: 'Por eso, si llevas tiempo con poca variedad de alimentos, comes menos porque muchas cosas te caen pesadas o vienes con fatiga y molestias digestivas, tu pelo puede resentirse.' },
		{
			type: 'cards',
			label: 'Lo que influye en tu cabello',
			items: [
				'El cuidado externo ayuda a que el pelo se vea mejor',
				'La alimentación influye en los recursos disponibles para formar cabello',
				'El estado de hierro, zinc y proteína merece atención cuando la caída es persistente',
				'La caída puede tener causas distintas: estrés, hormonas, tiroides, medicamentos, anemia o genética'
			]
		},
		{ type: 'pull', text: 'Seguir cambiando de champú sin mirar esas posibilidades es como pintar una matera mientras la planta lleva semanas sin agua.' },

		reason(3, 'Tu cuerpo prioriza lo vital antes que el volumen de tu cabello'),
		{ type: 'p', text: 'Cuando al cuerpo le faltan recursos, se enfoca primero en lo urgente.' },
		// «Mantener energía, órganos y funciones esenciales siempre tendrá prioridad sobre
		// dejarte el pelo brillante y abundante»: las mismas palabras, puestas en orden
		{ type: 'ladder', label: 'A qué le da prioridad el cuerpo cuando le faltan recursos', first: ['Energía', 'Órganos', 'Funciones esenciales'], last: 'El pelo brillante y abundante' },
		{ type: 'p', text: 'Mantener energía, órganos y funciones esenciales siempre tendrá prioridad sobre dejarte el pelo brillante y abundante.' },
		{ type: 'p', text: 'Por eso una etapa difícil puede reflejarse después en el cabello:' },
		{ type: 'signs', items: ['Días de poco apetito', 'Dietas muy limitadas', 'Cambios fuertes de peso', 'Cansancio que no se quita', 'Diarrea recurrente o digestión alterada', 'Periodos de mucho estrés físico o emocional'] },
		{ type: 'p', text: 'La caída de cabello no siempre significa que tienes una enfermedad digestiva o una deficiencia. Pero si ocurre junto con estas señales, deja de verlo como un simple tema de estética y busca orientación profesional.' },

		reason(4, 'SKNGLOW acompaña el cuidado de tu cabello desde el día a día', { reveal: true }),
		{ type: 'plate', image: 'lst-cab-rutina', zoom: false, caption: 'Se consume como parte de tu día.', note: REFERENCE_NOTE },
		{ type: 'p', text: 'SKNGLOW son dulces duros sabor kiwi con biotina y resveratrol.' },
		{ type: 'p', text: 'La biotina participa en el metabolismo de proteínas que forman parte de los tejidos. El resveratrol acompaña la protección antioxidante del organismo.' },
		{ type: 'p', text: 'Por eso SKNGLOW tiene una propuesta distinta a otro producto más para lavar o peinar el pelo: se consume como parte de tu día y acompaña también la apariencia de piel y uñas.' },
		{
			type: 'product',
			name: PRODUCT_NAME,
			stats: [
				{ value: '4', label: 'dulces duros al día' },
				{ value: '120', label: 'dulces duros para 1 mes' },
				{ label: 'Sabor', value: 'kiwi', labelFirst: true }
			],
			notes: [
				'Una alternativa práctica para llevar al trabajo, tener en la cartera o consumir en casa',
				'Pensado para quienes quieren ver su pelo, uñas y piel más cuidados con constancia'
			]
		},
		{ type: 'p', text: 'El acondicionador puede ayudarte con el frizz.' },
		{ type: 'key', text: 'SKNGLOW suma un gesto diario para acompañar el cuidado de los tejidos que ves en el espejo.' },
		{ type: 'cta', label: CTA_LABEL_SHORT },

		reason(5, 'Antes de resignarte a ver menos pelo, revisa el panorama completo'),
		{ type: 'p', text: 'No sigas juntando frascos mientras cada baño te genera angustia.' },
		{ type: 'p', text: 'Haz una pausa y observa cuándo empezó, qué cambió en tu alimentación, cómo estás durmiendo, si has perdido peso, si tomas medicamentos nuevos y si tienes molestias digestivas persistentes.' },
		{
			type: 'advice',
			items: [
				{ when: 'Si la caída es repentina, intensa o aparece en parches,', then: 'consulta pronto' },
				{ when: 'Si hay cansancio fuerte, palidez, diarrea frecuente, dolor abdominal o pérdida de peso,', then: 'pide valoración médica' },
				{ when: 'Si la caída es progresiva,', then: 'una evaluación puede revisar hierro, alimentación, estrés, hormonas y otras causas posibles' },
				{ then: 'Mantén una alimentación suficiente, trata el cabello con suavidad y evita peinados que lo tensionen constantemente' }
			]
		},
		{ type: 'p', text: 'Y si buscas acompañar ese proceso con un hábito fácil de sostener, suma SKNGLOW a tu día.' },
		{ type: 'key', text: 'Pide SKNGLOW hoy.' },
		{ type: 'p', text: 'Tu pedido llega en 3 a 5 días hábiles. Si no llega en ese tiempo, MIMA te lo reenvía sin costo adicional o te devuelve la inversión si pagaste de forma anticipada.' },
		// El copy no trae precio ni etiqueta de botón: van los del producto y la de las landings
		{ type: 'offer', ...OFFER, label: CTA_LABEL_SHORT }
	]
}

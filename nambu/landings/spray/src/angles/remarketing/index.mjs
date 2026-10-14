// Ángulo remarketing: ya visitó y no compró. Manda el precio rebajado del contraentrega.
// Copy: remarketing/copy landing remarketing - spray nasal.txt
// Producto propio: LUNG CLEANSING OFERTA ($69.900). El anticipado ($59.900) lo aplica el
// descuento del botón de Releasit, como en el resto de ángulos.
import { heroSlides, HERO, PEOPLE_TITLE, VOLUME, FAQ, BOTANY_NOTE_CLAIM, BOTANY_LEAD } from '../shared.mjs'
import { SIGN_FX } from '../../lib/art.mjs'
import { ladder, doubts } from './sections.mjs'

const head = '<use href="#ns-head" x="0" y="0" width="140" height="112"/>'
const headFrame = inner => `<svg viewBox="18 8 108 81" aria-hidden="true">${head}${inner}</svg>`

export default {
	id: 'remarketing',
	copy: 'copy landing remarketing - spray nasal.txt',
	signature: 'el precio que baja, escalón a escalón',
	product: { handle: 'lung-cleansing-oferta', title: 'LUNG CLEANSING OFERTA', variant: '52445372514464' },
	prices: { regular: '$69.900', prepaid: '$59.900', cod: '$69.900' },
	stickySubs: { regular: 'o $59.900 anticipado', prepaid: 'anticipado · ahorras otros $10.000', cod: 'pagas al recibir' },
	sticky: { price: '$69.900', sub: 'o $59.900 anticipado', cta: 'Lo quiero' },
	styles: ['styles/chain.css', 'angles/remarketing/signature.css'],
	hero: {
		...HERO,
		layout: 'deck',
		// La cinta del hero: lo que trae la oferta, en palabras del copy
		ticker: ['Oferta especial', '60 ml de contenido', 'Envío GRATIS en Colombia'],
		pretitle: ['Oferta especial'],
		title: 'Respira más libre. <em>Ahora te cuesta $10.000 menos.</em>',
		lead: 'Spray Nasal de Nambu combina extractos botánicos de <strong>eucalipto, menta y regaliz de origen colombiano</strong> para ayudar a despejar la congestión nasal y facilitar el paso del aire.',
		slides: heroSlides({ file: 'landings-spray-hero.webp', alt: 'Un hombre y una mujer sostienen el Spray Nasal de Nambu junto al frasco de 60 ml' }),
		price: { label: 'Pago contra entrega', figure: '$69.900', was: '$79.900', alt: 'Pago anticipado <strong>$59.900 COP</strong>', save: 'Ahorras otros $10.000.' },
		cta: 'Quiero aprovechar la oferta',
		trust: 'Envío <strong>GRATIS</strong> en Colombia',
		specs: [['Contenido', '60 ml'], ['Frente a 30 ml', 'El doble'], ['Precio habitual', '<s>$79.900 COP</s>']]
	},
	people: {
		title: PEOPLE_TITLE,
		order: ['genesis', 'carlos-aristizabal', 'catalina-aplica', 'jose-fernando', 'andres', 'wilson', 'camilo', 'andrea', 'marcos', 'carlos-mauricio-aplica']
	},
	problem: {
		banner: 'EL PROBLEMA: LO QUE TIENEN EN COMÚN',
		bannerLines: ['Las seis molestias del copy en el mapa de síntomas y lo que comparten, sumado', 'paso a paso. Debajo, las tres placas de referencia.'],
		eyebrow: 'El problema',
		title: 'Tu nariz ya te ha dado suficiente trabajo.',
		blocks: [
			{ type: 'signs', items: [['blocked', 'Congestión.'], ['drip', 'Flema bajando hacia la garganta.'], ['pressure', 'Presión en la cara.'], ['sneeze', 'Estornudos.'], ['runny', 'Moco.'], ['mouth', 'Respirar por la boca.']] },
			{ type: 'text', paragraphs: ['Aunque las causas pueden cambiar, muchas de estas molestias comparten algo:'] },
			{
				type: 'chain',
				label: 'Inflamación nasal más acumulación de moco más menos espacio para que pase el aire',
				steps: [
					{ text: 'Inflamación nasal', art: headFrame('<path class="ns-sign__lane" d="M93 62 C86 58 74 54 66 55.5"/><g class="ns-sign__fog"><ellipse cx="84" cy="59" rx="8" ry="4.6"/><ellipse cx="74" cy="56.5" rx="7" ry="4"/></g>') },
					{ text: 'Acumulación de moco', art: headFrame(SIGN_FX.drip), op: 'plus' },
					{ text: 'Menos espacio para que pase el aire', art: headFrame(SIGN_FX.blocked), op: 'plus' }
				]
			},
			{ type: 'text', paragraphs: ['Por eso el Spray de Nambu se aplica directamente en la nariz.'], className: 'ns-problem__text ns-problem__text--key' },
			{ type: 'xrays', items: ['airway', 'sinus', 'lungs'] }
		]
	},
	volume: { ...VOLUME, yes: 'Para tenerlo cerca cuando lo necesites.', long: true, claim: 'El doble frente a ese formato.', from: 'Y ahora desde <strong>$59.900 COP</strong>.' },
	botany: {
		lead: BOTANY_LEAD,
		plants: [
			'Estudiado alrededor de moco y congestión de las vías respiratorias.',
			'Su mentol genera una sensación refrescante relacionada con la percepción del paso del aire.',
			'Utilizado tradicionalmente en preparaciones para garganta, tos y secreciones.'
		],
		claim: BOTANY_NOTE_CLAIM
	},
	doubts: {
		eyebrow: 'Antes de decidir',
		title: 'Tal vez esto fue lo que te hizo dudar.',
		items: [
			{ quote: 'Tengo flema. ¿Por qué usaría algo en la nariz?', answer: ['Porque parte de esa sensación de flema puede venir del <strong>moco que baja desde la nariz hacia la garganta</strong>.', 'A eso se le conoce como goteo posnasal.'] },
			{ quote: 'Lo mío es sinusitis.', answer: ['Cuando la mucosa nasal se inflama, el drenaje de los senos paranasales puede dificultarse.', 'Ahí aparecen moco retenido, nariz tapada y presión en frente o mejillas.'] },
			{ quote: 'A mí me pasa por alergias.', answer: ['Polvo, ácaros, polen, humedad, moho o mascotas pueden inflamar la mucosa nasal y disparar estornudos, moco y congestión.', 'Nambu se usa directamente en la nariz cuando esa congestión aparece.'] },
			{ quote: 'Ya he comprado sprays demasiado pequeños.', answer: ['Este trae <strong>60 ml</strong>.', 'El doble frente al formato común de 30 ml.'] }
		]
	},
	sources: {
		eyebrow: 'Referencias públicas sobre las plantas',
		title: 'Estas plantas llevan años presentes en la conversación respiratoria.',
		items: [
			{ brand: 'healthline', title: 'Eucalipto y congestión', text: 'Healthline recoge información sobre el eucalipto y su principal compuesto, el cineol, en investigaciones relacionadas con moco y congestión respiratoria.' },
			{ brand: 'mnt', title: 'Menta y paso del aire', text: 'Medical News Today recoge investigaciones sobre el mentol y su relación con la percepción del flujo de aire por la nariz.' },
			{ brand: 'webmd', title: 'Regaliz y secreciones', text: 'WebMD incluye el regaliz entre plantas utilizadas tradicionalmente alrededor de garganta, tos y secreciones respiratorias.' }
		],
		note: 'Estas referencias corresponden a información publicada sobre ingredientes individuales. No representan estudios clínicos realizados sobre Spray Nasal de Nambu como producto terminado.'
	},
	ritual: { title: 'Mañana y noche.', easy: ['Directo en la nariz.', 'Sin preparar mezclas.'] },
	ladder: {
		eyebrow: 'La oferta',
		title: 'El precio también cambió.',
		before: { label: 'Precio habitual', figure: '$79.900' },
		cod: { label: 'Esta oferta', figure: '$69.900', note: 'Y puedes pagar cuando llegue.', cta: 'Quiero pagar al recibir' },
		prepaid: {
			title: '¿Quieres ahorrar todavía más?',
			text: 'Paga anticipado y recibe otros <strong>$10.000 de descuento</strong>.',
			was: '$69.900',
			figure: '$59.900',
			ticks: ['60 ml.', 'Envío GRATIS.', 'Mismo producto.'],
			total: '<strong>$20.000 menos frente al precio habitual de $79.900.</strong>',
			cta: 'Quiero pagar $59.900'
		}
	},
	box: {
		eyebrow: 'Lo que recibes',
		ticks: ['60 ml de contenido.', 'Extractos botánicos de origen colombiano.', 'Envío GRATIS.', 'Seguimiento del pedido.'],
		prices: [{ label: 'Contra entrega', value: '$69.900', main: true }, { label: 'Pago anticipado', value: '$59.900' }]
	},
	faq: [
		{ q: '¿Qué pasa si mi problema respiratorio es diferente al de otra persona?', a: ['La congestión nasal puede aparecer por causas distintas.', 'Alergias, resfriados, sinusitis, irritantes y acumulación de moco pueden producir síntomas parecidos.', 'Si tienes síntomas fuertes, persistentes o una condición respiratoria diagnosticada, consulta con un profesional de salud.'] },
		{ q: '¿Toda flema viene del pecho?', a: ['No necesariamente.', 'El moco de la nariz puede bajar hacia la garganta y generar sensación de flema, carraspera y tos.'] },
		{ q: '¿La sinusitis siempre es bacteriana?', a: ['No.', 'Puede estar relacionada con virus, alergias, inflamación nasal, factores anatómicos y, en algunos casos, hongos.'] },
		{ q: '¿Sirve para eliminar las alergias?', a: ['Nambu está pensado para el uso nasal cuando aparece congestión.', 'No elimina el alérgeno ni sustituye el tratamiento indicado para una alergia persistente.'] },
		{ q: '¿Por qué aparecen otros ingredientes en la etiqueta?', a: ['En nuestra comunicación usamos los nombres de las plantas de origen para explicar la fórmula de forma sencilla.', 'El empaque utiliza nomenclaturas técnicas para declarar los extractos y componentes de la formulación.', 'Por eso puedes encontrar nombres diferentes en la etiqueta.'] },
		{ q: FAQ.invima.q, a: [FAQ.invima.a[0], 'Si tienes antecedentes de alergias, sensibilidad a alguno de sus componentes, utilizas otros productos nasales o tienes una condición médica, revisa la composición y consulta con un profesional de salud antes de usarlo.'] },
		{ q: '¿Me puede caer mal?', a: ['Cada persona puede reaccionar de manera diferente a un producto nasal, incluso cuando sus componentes son de origen vegetal.', 'Revisa los ingredientes antes de usarlo y suspende el uso si notas una reacción inesperada.', 'Si tienes antecedentes de alergias o sensibilidad nasal, consulta previamente con un profesional de salud.'] },
		FAQ.content,
		FAQ.use,
		{ q: '¿Puedo pagar cuando llegue?', a: ['Sí. <strong>Contra entrega: $69.900 COP</strong>.', 'También puedes pagar anticipadamente y aprovechar el precio de <strong>$59.900 COP</strong>.'] },
		FAQ.shipping,
		FAQ.delivery
	],
	collage: ['genesis', 'marcos', 'carlos-mauricio-aplica', 'camilo', 'andrea', 'daniel'],
	close: {
		title: 'Ya lo viste. Ya sabes qué trae.',
		sub: 'Ahora también sabes cuánto puedes ahorrar.',
		claim: '60 ml · Envío GRATIS',
		price: { label: 'Pago contra entrega', figure: '$69.900', was: '$79.900', alt: 'Pago anticipado: <strong>$59.900 COP</strong>', save: '$20.000 menos frente al precio habitual.' },
		cta: 'Quiero aprovechar la oferta'
	},
	sections: ['top', 'hero', 'people', 'problem', 'volume', 'botany', doubts, 'sources', 'ritual', ladder, 'box', 'warranty', 'faq', 'collage', 'close', 'social', 'sticky']
}

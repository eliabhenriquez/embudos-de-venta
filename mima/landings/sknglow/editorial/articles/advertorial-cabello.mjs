// Advertorial de cabello: el desagüe de la ducha.
// Copy: ../../advertorial-cabello/copy adv cabello - sknglow.txt — los textos van tal cual;
// aquí solo se decide con qué bloque se cuenta cada parte y dónde cae cada lámina.
import { MASTHEAD, BYLINE, REFERENCE_NOTE, PRODUCT_NAME, PRODUCT_FACTS, CTA_LABEL, OFFER, OFFER_TERMS, BUYBAR, LEGAL } from './shared.mjs'

export default {
	id: 'advertorial-cabello',
	format: 'advertorial',
	angle: 'cabello',
	copy: 'copy adv cabello - sknglow.txt',
	// Banner del formulario: el del ángulo de cabello (/mima/shared/*-form.css)
	banner: 'cabello',
	masthead: MASTHEAD,
	title: 'Cómo Destapé el Desagüe de mi Ducha y Detuve la Caída de Pelo que me Tenía Aterrada en Solo 6 Semanas',
	dek: 'Sin ampollas capilares costosas, tratamientos de clínica ni cortes cada vez más cortos para disimular las entradas',
	byline: BYLINE,
	buybar: BUYBAR,
	legal: LEGAL,
	blocks: [
		// Abre la imagen del problema, no el esquema del ciclo capilar que pedía el copy:
		// quien llega aquí todavía no busca una solución, está viviendo la caída.
		{ type: 'plate', image: 'cab-raya', lead: true, caption: 'La raya del cabello se me veía más ancha.', note: REFERENCE_NOTE },

		{ type: 'p', lede: true, text: 'Todo empezó en el desagüe de la ducha.' },
		{ type: 'p', text: 'Llevaba meses notando que se me tapaba más rápido de lo normal, pero un domingo tuve que destaparlo con la mano y lo que saqué me dejó fría.' },
		{ type: 'pull', text: 'Un mechón entero de pelo, enredado, como si se me estuviera cayendo la mitad de la cabeza en una sola semana.' },
		{ type: 'p', text: 'Me miré en el espejo esa misma tarde y hasta entonces no había notado que la raya del cabello se me veía más ancha, y las entradas de la frente estaban más marcadas que hacía un año.' },
		{ type: 'p', text: 'Ese año había sido el más estresante de mi vida. Cerré un negocio, cuidé a mi mamá enferma y dormí mal más noches de las que puedo contar.' },
		{ type: 'key', text: 'Nunca hasta entonces conecté una cosa con la otra.' },

		{ type: 'heading', text: 'Meses Probando de Todo sin Ver Resultado Real' },
		{ type: 'flatline', steps: ['Ampollas capilares', 'Tres champús', 'Vitaminas genéricas'], result: 'Ningún cambio' },
		{ type: 'p', text: 'Compré ampollas capilares de las más caras que encontré en la farmacia.' },
		{ type: 'p', text: 'Cambié de champú tres veces, buscando el que prometiera frenar la caída.' },
		{ type: 'p', text: 'Probé vitaminas genéricas que venían en frascos enormes y que dejé de tomar a los quince días porque no vi ningún cambio.' },
		{ type: 'p', text: 'Una peluquera me llegó a decir que era por la edad y que ya tocaba resignarme a un corte más corto para que se viera con más volumen.' },
		{ type: 'pull', text: 'Salí de esa peluquería sintiendo que estaba maquillando el problema con un corte, no resolviéndolo.' },

		{ type: 'heading', text: 'El Momento en que Entendí Que el Estrés no Solo se Sentía, También se me Estaba Cayendo del Cuero Cabelludo' },
		{
			type: 'flow',
			steps: ['cab-estres-1', 'cab-estres-2', 'cab-estres-3', 'cab-estres-4'],
			full: 'cab-estres',
			label: 'Del estrés al cabello en caída, en cuatro pasos',
			caption: 'Del estrés sostenido al folículo.'
		},
		{ type: 'p', text: 'Mi amiga del laboratorio en Bogotá, la misma que me explicó lo de mi mancha en la cara, me explicó algo que tampoco sabía sobre el cabello.' },
		{ type: 'p', text: 'Cuando el estrés se mantiene por semanas o meses, el cuerpo eleva el cortisol de forma sostenida. Ese cortisol alto reduce el estrógeno y la progesterona, y al mismo tiempo favorece la señal de las hormonas andrógenas sobre el folículo.' },
		{ type: 'plate', image: 'cab-ciclo', caption: 'De la fase de crecimiento a la fase de caída.' },
		{ type: 'p', text: 'Ese cambio empuja al folículo a salir antes de tiempo de su fase de crecimiento y entrar en fase de caída. Y lo peor no es solo la caída de ese momento.' },
		{ type: 'plate', image: 'cab-foliculos', caption: 'El folículo quedó miniaturizado.' },
		{ type: 'p', text: 'Es que el pelo que crece después de ese ciclo afectado nace más fino y más débil, porque el folículo quedó miniaturizado. Y si el estrés se mantiene, cada ciclo siguiente puede salir un poco más débil que el anterior.' },
		{ type: 'plate', image: 'cab-fibras', caption: 'Cada ciclo, un poco más débil que el anterior.' },
		{ type: 'key', text: 'Por eso las ampollas y los champús solo trabajan sobre el pelo que ya salió. No tocan lo que está pasando dentro del folículo mientras el cuerpo sigue en modo de alarma.' },

		{ type: 'heading', text: 'Cómo Empecé a Trabajar el Folículo Desde Adentro', reveal: true },
		{ type: 'p', text: 'Le pregunté a mi amiga si la misma fórmula que estaba tomando para mi piel también podía ayudarme con esto, y me explicó que Sknglow, la que Vitaliah S.A.S. formuló en Bogotá con Resveratrol y Biotina, trabaja justo sobre esa base.' },
		{ type: 'product', name: PRODUCT_NAME, facts: PRODUCT_FACTS },
		{ type: 'plate', image: 'cab-antioxidante', caption: 'La protección antioxidante de las células que rodean el folículo.' },
		{ type: 'p', text: 'El Resveratrol acompaña la protección antioxidante de las células, incluidas las que rodean el folículo, en momentos donde el desgaste celular está más activo.' },
		{ type: 'plate', image: 'cab-queratina', caption: 'Las proteínas del cabello, desde la raíz.' },
		{ type: 'p', text: 'La Biotina interviene en el metabolismo celular de las proteínas del cabello, apoyando la estructura desde la raíz mientras el folículo se recupera de un ciclo debilitado.' },
		{ type: 'p', text: 'Son 4 dulces duros al día, sabor kiwi, no masticables. El empaque trae 120, para un mes completo.' },
		{ type: 'p', text: 'A las cuatro semanas noté menos pelo en la almohada por las mañanas. A las seis semanas, el desagüe de la ducha volvió a tardar meses en tapar como antes.' },
		{ type: 'p', text: 'No fue una ampolla milagrosa ni un tratamiento de clínica de esos que cuestan varios sueldos.' },
		{ type: 'pull', text: 'Fue empezar a trabajar el folículo desde el mismo lugar donde el estrés lo estaba afectando.' },
		{ type: 'cta', label: CTA_LABEL },

		{ type: 'heading', text: 'Lo Que me Dijeron Otras Mujeres que Probaron Sknglow' },
		{
			type: 'reviews',
			label: 'Reseñas de mujeres que probaron Sknglow',
			// Nombres del pool real de SKNGLOW (../../AGENTS.md §6), que no firman ya en la
			// landing de cabello; la ciudad es la del copy. El copy las trae con nombre y edad
			// de ejemplo: el cliente tiene que confirmar cada texto con quien lo firma.
			items: [
				{ name: 'Juli', place: 'Bucaramanga', text: 'Pasé un año muy duro en el trabajo y se me empezó a ver el cuero cabelludo en la raya. A las cinco semanas mi peluquera fue la que notó que había pelo nuevo saliendo en las entradas.' },
				{ name: 'Leidy', place: 'Bogotá', text: 'Ya había gastado en dos tratamientos de clínica sin resultado real. Con Sknglow, en un mes y medio dejé de encontrar tanto pelo en la almohada.' },
				{ name: 'Génesis', place: 'Medellín', text: 'Lo que más me convenció fue que me explicaron por qué se me estaba cayendo, no solo me vendieron un champú más. Después de dos meses mi cabello se siente más grueso al tacto.' }
			]
		},

		{ type: 'heading', text: 'Antes de que Sigas Viendo Cómo se Achica tu Cola de Caballo' },
		{ type: 'p', text: 'Si el estrés sigue sostenido y solo atacas el pelo que ya salió con champús y ampollas, lo más probable es que cada ciclo capilar salga un poco más débil que el anterior, porque el folículo sigue recibiendo la misma señal de alarma por dentro.' },
		{ type: 'p', text: 'Yo estuve meses viendo cómo mi cola de caballo se hacía más delgada sin entender por qué. No quiero que tú pases por lo mismo sin saber qué está pasando.' },

		{ type: 'heading', text: 'Cómo Pedir tu Sknglow Hoy' },
		{ type: 'offer', ...OFFER },
		...OFFER_TERMS.map(text => ({ type: 'p', text })),
		{ type: 'cta', label: CTA_LABEL },
		{ type: 'pull', text: 'No dejes que el desagüe de tu ducha te siga avisando lo que tu cuerpo lleva meses gritando. Tu cabello también se cuida desde adentro, y hoy es un buen día para empezar.' }
	]
}

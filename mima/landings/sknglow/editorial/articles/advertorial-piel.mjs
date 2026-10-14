// Advertorial de piel: la mancha en forma de mariposa.
// Copy: ../../advertorial-piel/copy adv piel - sknglow .txt — los textos van tal cual; aquí
// solo se decide con qué bloque se cuenta cada parte y dónde cae cada lámina.
import { MASTHEAD, BYLINE, REFERENCE_NOTE, PRODUCT_NAME, PRODUCT_FACTS, CTA_LABEL, OFFER, OFFER_TERMS, BUYBAR, LEGAL } from './shared.mjs'

export default {
	id: 'advertorial-piel',
	format: 'advertorial',
	angle: 'piel',
	copy: 'copy adv piel - sknglow .txt',
	// Banner del formulario: el del ángulo de piel (/mima/shared/*-form.css)
	banner: 'piel',
	masthead: MASTHEAD,
	title: 'Cómo Boté la Mancha en Forma de Mariposa que se Apoderó de mis Mejillas Durante 5 Años',
	dek: 'Sin cremas despigmentantes que arden, sesiones de láser que cuestan un ojo de la cara ni corrector como armadura diaria',
	byline: BYLINE,
	buybar: BUYBAR,
	legal: LEGAL,
	blocks: [
		// Abre la imagen del problema, no el mapa facial que pedía el copy (no se entregó):
		// de las seis láminas, es la única que enseña la mancha en la superficie.
		{ type: 'plate', image: 'piel-mancha', lead: true, caption: 'La mancha seguía ahí, terca, como si tuviera vida propia.', note: REFERENCE_NOTE },

		{ type: 'p', lede: true, text: 'Todo empezó con una foto.' },
		{ type: 'p', text: 'Estaba en la fiesta de cumpleaños de mi mamá, con toda la familia reunida, y mi prima me mandó las fotos del grupo esa misma noche.' },
		{ type: 'p', text: 'Me vi en la pantalla del celular y me quedé congelada.' },
		{ type: 'pull', text: 'Tenía dos manchas oscuras que le bajaban por las mejillas, como una mariposa pegada a la piel, y en las fotos con flash se veían todavía peor.' },
		{ type: 'p', text: 'Esas manchas me habían quedado después de mi segundo embarazo. Al principio pensé que se iban a ir solas, como me habían dicho tantas veces.' },
		{ type: 'key', text: 'Nunca se fueron.' },

		{ type: 'heading', text: 'Cinco Años Tapando lo Mismo que Nunca se Iba' },
		{ type: 'flatline', steps: ['Cremas despigmentantes', 'Peelings', 'Protector solar'], result: 'La mancha seguía ahí' },
		{ type: 'p', text: 'Probé de todo lo que me recomendaron en la farmacia y en las redes.' },
		{ type: 'p', text: 'Cremas despigmentantes que me ardían la cara y apenas aclaraban un poquito para después regresar la mancha igual o más oscura.' },
		{ type: 'p', text: 'Peelings que me dejaron la piel roja una semana entera y el resultado duró menos de dos meses.' },
		{ type: 'p', text: 'Protector solar todos los días, sombrero, evitar el sol al mediodía, y aun así la mancha seguía ahí, terca, como si tuviera vida propia.' },
		{ type: 'p', text: 'Una dermatóloga me llegó a decir que eso era genético y que tocaba aprender a vivir con corrector todos los días.' },
		{ type: 'pull', text: 'Yo salía de cada cita más frustrada que como entré, porque sentía que estaba gastando plata en tapar algo que seguía creciendo por debajo del maquillaje.' },

		{ type: 'heading', text: 'El Momento en que Entendí que Estaba Atacando lo Que se Veía y no lo Que lo Producía' },
		{ type: 'plate', image: 'piel-hormonas', caption: 'Un desequilibrio hormonal activa las células que producen el pigmento.' },
		{ type: 'p', text: 'Una amiga mía, que trabaja hace años en un laboratorio en Bogotá formulando suplementos, me explicó algo que ninguna crema me había explicado nunca.' },
		{ type: 'p', text: 'Las manchas de melasma no nacen en la superficie de la piel. Nacen en un desequilibrio hormonal que activa las células que producen el pigmento, y ese desequilibrio se agrava cuando la piel además está inflamada por el sol, el estrés o productos fuertes.' },
		{ type: 'plate', image: 'piel-melanocito', caption: 'Las células productoras de melanina.' },
		{ type: 'p', text: 'Cuando el estrógeno y la progesterona fluctúan, esas células productoras de melanina se vuelven hipersensibles. Y si encima la piel está inflamada, esa hipersensibilidad se dispara y saca más pigmento del que debería en zonas puntuales de la cara.' },
		{ type: 'plate', image: 'piel-pigmento', caption: 'Más pigmento del que debería en zonas puntuales de la cara.' },
		{ type: 'p', text: 'Por eso una crema puede aclarar la superficie por un tiempo, pero si el estímulo hormonal e inflamatorio sigue activo por dentro, la mancha vuelve a subir.' },
		{ type: 'pull', text: 'Eso me cayó como un baldazo de agua fría, porque llevaba cinco años peleando con el síntoma y ni una sola vez había tocado la causa.' },

		{ type: 'heading', text: 'Cómo Empecé a Trabajar la Piel Desde Otro Lado', reveal: true },
		{ type: 'p', text: 'Mi amiga me habló de una fórmula que estaba desarrollando junto con Vitaliah S.A.S., un laboratorio colombiano en Bogotá, pensada justo para acompañar la piel de mujeres que viven esta misma pelea.' },
		{ type: 'key', text: 'La llamaron Sknglow.' },
		{ type: 'product', name: PRODUCT_NAME, facts: PRODUCT_FACTS },
		{ type: 'p', text: 'Son dulces duros sabor kiwi, no masticables, con Resveratrol y Biotina.' },
		{ type: 'plate', image: 'piel-antioxidante', caption: 'El estrés oxidativo que amplifica esa sobreproducción de melanina.' },
		{ type: 'p', text: 'El Resveratrol ayuda a controlar el estrés oxidativo que amplifica esa sobreproducción de melanina cuando la piel está inflamada.' },
		{ type: 'plate', image: 'piel-renovacion', caption: 'La renovación de los tejidos desde adentro.' },
		{ type: 'p', text: 'La Biotina interviene en el metabolismo celular de las proteínas de la piel, apoyando la renovación de los tejidos desde adentro.' },
		{ type: 'p', text: 'La diferencia frente a lo que había probado antes es que esto no se queda en la superficie de la mancha. Acompaña la piel desde el organismo, mientras yo seguía usando mi protector solar y mi rutina básica por fuera.' },
		{ type: 'p', text: 'Son 4 dulces duros al día. El empaque trae 120, para un mes completo.' },
		{ type: 'p', text: 'Empecé a notar la piel más pareja a las cuatro semanas. A las ocho semanas, mis mismas primas me preguntaron con qué me había aclarado la cara.' },
		{ type: 'p', text: 'Les dije la verdad. No fue una crema milagrosa ni una sesión de láser de esas que cuestan un ojo de la cara.' },
		{ type: 'pull', text: 'Fue empezar a cuidar la piel también desde adentro, no solo por fuera.' },
		{ type: 'cta', label: CTA_LABEL },

		{ type: 'heading', text: 'Lo Que me Dijeron Otras Mujeres que Probaron Sknglow' },
		{
			type: 'reviews',
			label: 'Reseñas de mujeres que probaron Sknglow',
			// Nombres del pool real de SKNGLOW (../../AGENTS.md §6), que no firman ya en la
			// landing de piel; la ciudad es la del copy. El copy las trae con nombre y edad
			// de ejemplo: el cliente tiene que confirmar cada texto con quien lo firma.
			items: [
				{ name: 'Camila', place: 'Medellín', text: 'Tenía la mancha del embarazo hace seis años y ya la había dado por perdida. A los dos meses de tomar Sknglow mi esposo fue el primero en decirme que me veía la cara más uniforme. Seguí con mi protector solar, pero por dentro sentí que por fin estaba haciendo algo distinto.' },
				{ name: 'Anny', place: 'Bogotá', text: 'Yo gastaba plata todos los meses en corrector solo para las mejillas. Después de un mes y medio necesité mucho menos producto para tapar. Mi piel se ve más viva, no solo más clara.' },
				{ name: 'Shelyka', place: 'Cali', text: 'Lo que más me gustó es que no me tocó cambiar toda mi rutina ni gastar en tratamientos costosos. Solo agregué los dulces en la mañana y seguí con mi vida normal.' }
			]
		},

		{ type: 'heading', text: 'Antes de que Sigas Viviendo con la Cámara en Modo Selectivo' },
		{ type: 'p', text: 'Si sigues tapando la mancha sin trabajar lo que la mantiene activa por dentro, lo más probable es que en unos años esa mancha se vea más marcada, no menos, porque el estímulo hormonal e inflamatorio sigue ahí mientras tú solo atacas la superficie.' },
		{ type: 'p', text: 'Yo perdí cinco años haciendo eso. No quiero que tú pierdas los tuyos.' },

		{ type: 'heading', text: 'Cómo Pedir tu Sknglow Hoy' },
		{ type: 'offer', ...OFFER },
		...OFFER_TERMS.map(text => ({ type: 'p', text })),
		{ type: 'cta', label: CTA_LABEL },
		{ type: 'pull', text: 'No dejes que la mancha decida por ti las fotos en las que sales o no sales. Tu piel también se cuida por dentro, y hoy es un buen día para empezar.' }
	]
}

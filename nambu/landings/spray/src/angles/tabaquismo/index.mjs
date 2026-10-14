// Ángulo tabaquismo: fumadores, flema, tos al despertar, nariz cargada.
// Copy: tabaquismo/copy landing tabaquismo - spray nasal.txt
import { PRODUCT, REGULAR_PRICES, REGULAR_STICKY_SUBS, STICKY, heroSlides, HERO, PEOPLE_TITLE, VOLUME, BOX, VERSUS, CLOSE, FAQ, BOTANY_NOTE_CLAIM, BOTANY_LEAD, SOURCES_EYEBROW, OFFER_ALT } from '../shared.mjs'
import { smokeArt, mucusArt, slowCiliaArt, coughArt, irritationArt, loadedArt, allergyArt, wakeArt, clearThroatArt, expelArt } from './art.mjs'

export default {
	id: 'tabaquismo',
	copy: 'copy landing tabaquismo - spray nasal.txt',
	signature: 'la tos de la mañana contada paso a paso, tras las placas de pulmones y vías',
	product: PRODUCT,
	prices: REGULAR_PRICES,
	stickySubs: REGULAR_STICKY_SUBS,
	sticky: STICKY,
	styles: ['styles/chain.css', 'angles/tabaquismo/signature.css'],
	hero: {
		...HERO,
		layout: 'window',
		pretitle: ['Fumadores', 'Flema', 'Tos al despertar', 'Nariz cargada'],
		title: 'Que fumar no te deje con la nariz <em>cargada todo el día.</em>',
		lead: 'Spray Nasal de Nambu combina extractos botánicos de <strong>eucalipto, menta y regaliz de origen colombiano</strong> para ayudar a despejar la congestión nasal y facilitar el paso del aire cuando el humo deja tus vías respiratorias cargadas.',
		slides: heroSlides({ file: 'landings-spray-hero-tabaquismo.webp', alt: 'Un hombre y una mujer sostienen el Spray Nasal de Nambu junto al frasco de 60 ml, con un esquema de los pulmones' })
	},
	people: {
		title: PEOPLE_TITLE,
		order: ['wilson', 'carlos-aristizabal', 'marcos', 'andrea', 'camilo', 'catalina-aplica', 'jose-fernando', 'genesis', 'daniel', 'carlos-mauricio-aplica']
	},
	problem: {
		banner: 'EL PROBLEMA: PULMONES Y VÍAS',
		bannerLines: ['Las placas de pulmones y vías aéreas abren la sección (el cliente rechazó la', 'ilustración de los cilios, 2026-09-22: no se entendía). Después, la cadena del copy.'],
		eyebrow: 'El problema',
		title: 'El humo hace que tus vías respiratorias trabajen peor.',
		lead: 'Tus vías respiratorias producen moco para atrapar polvo, partículas y sustancias irritantes. Los cilios ayudan a mover ese moco para eliminarlo.',
		blocks: [
			{ type: 'xrays', items: ['lungs', 'airway'] },
			{ type: 'text', paragraphs: ['Fumar repetidamente puede aumentar el moco y hacer que esos cilios trabajen con menos eficacia.'] },
			{
				type: 'chain',
				label: 'Humo repetido, más moco más peor limpieza, flema retenida, carraspera y tos al despertar',
				steps: [
					{ text: 'Humo repetido', art: smokeArt },
					{ text: 'Más moco', art: mucusArt },
					{ text: 'Peor limpieza', art: slowCiliaArt, op: 'plus' },
					{ text: 'Flema retenida, carraspera y tos al despertar', art: coughArt }
				]
			},
			{ type: 'text', paragraphs: ['También puede irritar la nariz y hacer más evidente la congestión, especialmente si además tienes rinitis o alergias.'], className: 'ns-problem__text ns-problem__text--soft' }
		]
	},
	morning: {
		banner: 'LA ESCENA: LA TOS DE LA MAÑANA',
		bannerLines: ['Levantarse, carraspear, toser, intentar sacar flema: la escena del copy como cadena.'],
		tint: true,
		mod: 'morning',
		titleId: 'ns-morning-title',
		eyebrow: 'Al despertar',
		title: 'La tos de la mañana no aparece por casualidad.',
		lead: 'Durante horas puede acumularse moco en las vías respiratorias. Y si el humo ha afectado la eficiencia de los cilios, eliminar esas secreciones puede hacerse más difícil.',
		blocks: [
			{ type: 'text', paragraphs: ['Por eso muchos fumadores reconocen esa escena:'] },
			{
				type: 'chain',
				label: 'Levantarse, carraspear, toser, intentar sacar flema',
				steps: [
					{ text: 'Levantarse', art: wakeArt },
					{ text: 'Carraspear', art: clearThroatArt },
					{ text: 'Toser', art: coughArt },
					{ text: 'Intentar sacar flema', art: expelArt }
				]
			},
			{ type: 'text', paragraphs: ['La tos ayuda a movilizar secreciones, pero no reemplaza la función normal de los cilios ni significa que el pulmón esté “limpio”.'], className: 'ns-problem__text ns-problem__text--soft' }
		]
	},
	rhinitis: {
		banner: 'RINITIS O ALERGIAS + HUMO',
		titleId: 'ns-rhinitis-title',
		mod: 'rhinitis',
		eyebrow: 'Si además tienes rinitis',
		title: 'Si además tienes rinitis o alergias, el humo puede hacerlo más pesado.',
		lead: 'El humo actúa como irritante. En una nariz que ya reacciona al polvo, ácaros, polen o cambios de clima, puede aumentar la sensación de congestión y favorecer tos o carraspera.',
		blocks: [
			{
				type: 'chain',
				label: 'Alergia o rinitis más humo, más irritación, nariz más cargada',
				steps: [
					{ text: 'Alergia o rinitis', art: allergyArt },
					{ text: 'Humo', art: smokeArt, op: 'plus' },
					{ text: 'Más irritación', art: irritationArt },
					{ text: 'Nariz más cargada', art: loadedArt }
				]
			}
		]
	},
	botany: {
		lead: BOTANY_LEAD,
		plants: [
			'Estudiado alrededor de moco y congestión de las vías respiratorias.',
			'Su mentol genera una sensación refrescante relacionada con la percepción del paso del aire por la nariz.',
			'Utilizado tradicionalmente en preparaciones relacionadas con garganta, tos y secreciones.'
		],
		claim: BOTANY_NOTE_CLAIM
	},
	sources: {
		eyebrow: SOURCES_EYEBROW,
		title: 'Lo que se sabe sobre humo, moco y cilios.',
		items: [
			{ brand: 'cdc', title: 'Fumar aumenta el moco', text: 'CDC explica que fumar puede hacer que las vías respiratorias produzcan más mucosidad, llegando a obstruir el flujo de aire. También relaciona el tabaquismo con tos, flema y dificultad respiratoria.' },
			{ brand: 'ala', title: 'Moco más abundante y espeso', text: 'La American Lung Association explica que el moco y los cilios forman parte de la defensa natural de las vías respiratorias, y que los químicos del tabaco pueden aumentar la cantidad y el espesor del moco.' },
			{ brand: 'cleveland', title: 'La tos del fumador tiene una explicación', text: 'Cleveland Clinic señala que fumar aumenta la producción de moco y que la tos puede aparecer como respuesta del cuerpo ante lo que se acumula en las vías respiratorias.' }
		],
		note: 'Estas referencias explican los efectos del tabaquismo sobre las vías respiratorias. No representan estudios clínicos realizados sobre Spray Nasal de Nambu como producto terminado.'
	},
	volume: { ...VOLUME, yes: 'Para que un frasco pequeño no se te acabe volando.', long: true },
	offer: { alt: OFFER_ALT },
	ritual: { title: 'Mañana y noche.', easy: ['Directo en la nariz.'], note: 'Especialmente fácil de integrar si amaneces con sensación de congestión o nariz cargada.' },
	box: BOX,
	versus: VERSUS,
	faq: [
		{ q: '¿Por qué los fumadores suelen tener más flema?', a: ['El humo irrita las vías respiratorias y puede aumentar la producción de moco.', 'Además, fumar afecta los cilios, unas estructuras microscópicas encargadas de ayudar a mover el moco, partículas y microorganismos hacia afuera.'] },
		{ q: '¿Por qué toso más al despertar?', a: ['En fumadores, la combinación de <strong>más moco y una limpieza mucociliar menos eficiente</strong> puede favorecer la acumulación de secreciones.', 'Al levantarte aparece la tos como intento de movilizarlas.'] },
		{ q: '¿El Spray Nasal de Nambu limpia los pulmones?', a: ['No.', 'Spray Nasal de Nambu es un producto de <strong>aplicación nasal</strong>.', 'No limpia los pulmones, no elimina las sustancias acumuladas por fumar y no revierte daños pulmonares provocados por el tabaco.', 'Su uso está enfocado en la nariz y la sensación de congestión nasal.'] },
		{ q: '¿Puedo usarlo aunque siga fumando?', a: ['El producto se utiliza de forma nasal según sus indicaciones, pero <strong>no neutraliza los efectos del cigarrillo</strong>.', 'Reducir y, especialmente, dejar de fumar es la medida más importante para disminuir el daño respiratorio asociado al tabaco. CDC y Cleveland Clinic señalan que dejar de fumar mejora la salud respiratoria y reduce el riesgo de enfermedad pulmonar.'] },
		{ q: '¿Sirve para EPOC, bronquitis crónica o enfisema?', a: ['Spray Nasal de Nambu no sustituye el diagnóstico ni el tratamiento médico de estas enfermedades.', 'La falta de aire, los silbidos, la tos persistente o la disminución progresiva de la capacidad para hacer esfuerzo deben ser evaluados por un profesional de salud.'] },
		FAQ.use,
		FAQ.content,
		FAQ.plants,
		FAQ.label,
		{ q: FAQ.invima.q, a: [FAQ.invima.a[0], 'Si tienes antecedentes de alergias, utilizas otros productos nasales o tienes una condición médica, revisa la composición y consulta primero con un profesional de salud.'] },
		{ q: '¿Cuándo debería consultar a un médico?', a: ['Si tienes <strong>falta de aire nueva o progresiva, silbidos, dolor de pecho, sangre al toser, fiebre alta o tos y flema persistentes</strong>, busca valoración médica.', 'La tos y la flema no deberían asumirse simplemente como “cosas de fumadores”; también pueden aparecer en bronquitis crónica, EPOC, infecciones u otras enfermedades respiratorias.'] },
		FAQ.price,
		FAQ.shipping,
		FAQ.delivery
	],
	collage: ['carlos-mauricio-aplica', 'wilson', 'andrea', 'marcos', 'jose-fernando', 'catalina-aplica'],
	close: {
		...CLOSE,
		title: 'Que el humo no te deje con la nariz cargada todo el día.',
		pains: ['Flema.', 'Carraspera.', 'Tos al despertar.', 'Congestión nasal.']
	},
	sections: ['top', 'hero', 'people', 'problem', 'botany', 'sources', 'volume', 'offer', 'ritual', 'box', 'pay', { section: 'problem', dataKey: 'morning' }, { section: 'problem', dataKey: 'rhinitis' }, 'versus', 'warranty', 'faq', 'collage', 'close', 'social', 'sticky']
}

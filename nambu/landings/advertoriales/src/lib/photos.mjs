// Fotos del formato que no son personas del pool (spray/src/lib/pool.mjs) ni plantas.
//
// 🔴 El producto solo sale de las fotos de las landings: son las que llevan la etiqueta
// real («Cont. Neto: 60ml»). Las fotos de producto de los advertoriales anteriores dicen
// 30 ml o traen texto ilegible, y contradicen al artículo: no se usan.
//
// Las escenas con nombre de la tienda son archivos que ya tenía publicados (Contenido →
// Archivos) y se usan sin copia en el repo. Cada uno va listado en ../../store-files para
// que check-cdn.sh no lo dé por perdido.
const PHOTOS = {
	// Escenas: ilustran el problema. Siempre con el rótulo «Imagen de referencia»
	'scene-cough': { file: 'ac6e6d0a-e83e-414c-9d7b-447c21610e3f.png', w: 1024, h: 1536, alt: 'Un hombre se aclara la garganta con el puño frente a la boca' },
	'scene-night': { file: '64cf49a4-0a9b-4132-8646-47b6dc339d4a.png', w: 1536, h: 1024, alt: 'Un hombre sentado en la cama de madrugada, con la mano en el pecho' },
	'scene-morning': { file: '25a3573c-8bcd-4d35-a265-06ebf9e52d4e.png', w: 1536, h: 1024, alt: 'Un hombre recién despierto, sentado en la cama con los ojos cerrados' },
	'scene-balcony': { file: 'Recurso_3-8_3_11zon.jpg', w: 1081, h: 1081, alt: 'Un hombre en un balcón, con la ciudad y las montañas al fondo' },
	'scene-valley': { file: 'Recurso_1-8_1_11zon.jpg', w: 1081, h: 1081, alt: 'Un hombre señala una ciudad entre montañas cubierta por una capa de bruma' },
	'scene-tinto': { file: 'Recurso_7-8.jpg', w: 1080, h: 1080, alt: 'Una mujer con una taza de tinto en la mano y los ojos cerrados' },
	'scene-consult': { file: 'Recurso_3-8_1.jpg', w: 1080, h: 1080, alt: 'Una mujer conversa con un profesional de salud en un consultorio' },
	'sinus-art': { file: 'Recurso_1-8.jpg', w: 1080, h: 1080, alt: 'Ilustración de los senos paranasales, alrededor de la nariz, con secreciones acumuladas' },
	// Aperturas que entregó el cliente (2026-10-13): optimizadas en spray/assets, se suben a Archivos
	'scene-phlegm': { file: 'landings-spray-adv-flema.webp', w: 874, h: 848, alt: 'Una flema espesa con rastros de sangre sobre un mesón' },
	'scene-pressure': { file: 'landings-spray-adv-presion-nasal.webp', w: 1200, h: 800, alt: 'Una mujer de perfil se aprieta el puente de la nariz, resaltado en rojo' },
	// Sin duotono: su rótulo dice «el aire es negro en el RX» y teñida el negro saldría verde
	'sinus-xray': { file: 'landings-spray-adv-rx-senos.webp', w: 696, h: 486, alt: 'Radiografía de la cara con dos rótulos: «Senos paranasales: el aire es negro en el RX» y «Seno nasal obstruido»' },
	// Producto: de las landings, con la etiqueta de 60 ml. still: fondo blanco, se compone sobre un panel
	packshot: { file: 'landings-spray-packshot.webp', w: 601, h: 1100, alt: 'Frasco de Spray Nasal de Nambu de 60 ml', still: true },
	ingredients: { file: 'landings-spray-ingredientes.webp', w: 1000, h: 1000, alt: 'Frasco de Spray Nasal de Nambu sobre una piedra, rodeado de menta, regaliz y eucalipto' },
	'couple-flema': { file: 'landings-spray-hero-flema.webp', w: 1200, h: 1200, alt: 'Un hombre y una mujer sostienen el Spray Nasal de Nambu junto al frasco de 60 ml, con un esquema de las vías respiratorias' },
	'couple-alergias': { file: 'landings-spray-hero-alergias.webp', w: 1200, h: 1200, alt: 'Un hombre y una mujer sostienen el Spray Nasal de Nambu junto al frasco de 60 ml, con un esquema de la nariz de perfil' },
	'couple-sinusitis': { file: 'landings-spray-hero-sinusitis.webp', w: 1200, h: 1200, alt: 'Un hombre y una mujer sostienen el Spray Nasal de Nambu junto al frasco de 60 ml, con un esquema de los senos paranasales' },
	'couple-general': { file: 'landings-spray-hero.webp', w: 1200, h: 1200, alt: 'Un hombre y una mujer sostienen el Spray Nasal de Nambu junto al frasco de 60 ml' },
	// Placas de las landings: se pintan en duotono de marca
	airway: { file: 'landings-spray-vias.webp', w: 712, h: 690, alt: 'Radiografía lateral de cabeza y cuello con las vías aéreas respiratorias', plate: true },
	lungs: { file: 'landings-spray-pulmones.webp', w: 1000, h: 835, alt: 'Radiografía de tórax con los pulmones y los bronquios', plate: true },
	sinuses: { file: 'landings-spray-senos.webp', w: 1000, h: 651, alt: 'Tomografías de la cara con los senos paranasales', plate: true }
}

export const photo = key => {
	const found = PHOTOS[key]
	if (!found) throw new Error(`Foto desconocida: ${key}`)
	return { key, ...found }
}

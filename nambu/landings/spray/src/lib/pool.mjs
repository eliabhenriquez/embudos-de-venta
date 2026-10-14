// Personas reales del pool de UGC (humanized-images/nambu-spray/), con su nombre real.
// Una sola descripción por foto: la misma en cápsulas, testimonios y collage.
export const PEOPLE = {
	camilo: { name: 'Camilo', w: 700, h: 1126, alt: 'Camilo sostiene el frasco de Spray Nasal de Nambu' },
	catalina: { name: 'Catalina', w: 680, h: 1192, alt: 'Catalina sostiene el Spray Nasal de Nambu' },
	'catalina-aplica': { name: 'Catalina', w: 688, h: 1124, alt: 'Catalina se aplica el Spray Nasal de Nambu' },
	'carlos-mauricio': { name: 'Carlos Mauricio', w: 670, h: 1042, alt: 'Carlos Mauricio con su Spray Nasal de Nambu' },
	'carlos-mauricio-aplica': { name: 'Carlos Mauricio', w: 680, h: 1100, alt: 'Carlos Mauricio se aplica el Spray Nasal de Nambu' },
	'carlos-aristizabal': { name: 'Carlos Aristizábal', w: 682, h: 1090, alt: 'Carlos Aristizábal con la caja del Spray Nasal de Nambu' },
	andres: { name: 'Andrés', w: 682, h: 1044, alt: 'Andrés sostiene el Spray Nasal de Nambu' },
	andrea: { name: 'Andrea', w: 674, h: 1164, alt: 'Andrea sostiene el frasco de Spray Nasal de Nambu' },
	genesis: { name: 'Genésis', w: 692, h: 1190, alt: 'Genésis sostiene el Spray Nasal de Nambu' },
	'jose-fernando': { name: 'José Fernando', w: 700, h: 879, alt: 'José Fernando muestra el Spray Nasal de Nambu' },
	marcos: { name: 'Marcos', w: 676, h: 1088, alt: 'Marcos respira después de aplicarse el Spray Nasal de Nambu' },
	daniel: { name: 'Daniel', w: 700, h: 865, alt: 'Daniel muestra su Spray Nasal de Nambu' },
	wilson: { name: 'Wilson', w: 700, h: 876, alt: 'Wilson sostiene su Spray Nasal de Nambu' }
}

export const person = slug => {
	const found = PEOPLE[slug]
	if (!found) throw new Error(`Persona fuera del pool de UGC: ${slug}`)
	return { slug, file: `landings-spray-ugc-${slug}.webp`, ...found }
}

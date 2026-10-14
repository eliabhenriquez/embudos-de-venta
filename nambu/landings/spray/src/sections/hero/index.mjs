// Hero: tres composiciones sobre las mismas piezas (titular, las cuatro imágenes,
// precio junto al CTA, datos). Cada ángulo elige la suya en hero.layout y cada
// composición la usan dos ángulos: el hero es lo que más distingue una landing.
import { galleryHero } from './gallery.mjs'
import { windowHero } from './window.mjs'
import { deckHero } from './deck.mjs'

export const HERO_LAYOUTS = {
	gallery: { name: 'A · la galería que se despeja', render: galleryHero, styles: 'styles/hero/gallery.css' },
	window: { name: 'B · la ventana', render: windowHero, styles: 'styles/hero/window.css' },
	deck: { name: 'C · la baraja', render: deckHero, styles: 'styles/hero/deck.css' }
}

export const heroLayout = angle => {
	const layout = HERO_LAYOUTS[angle.hero.layout]
	if (!layout) throw new Error(`${angle.id}: hero.layout debe ser ${Object.keys(HERO_LAYOUTS).join(', ')} (llegó ${angle.hero.layout})`)
	return layout
}

export const hero = angle => heroLayout(angle).render(angle)

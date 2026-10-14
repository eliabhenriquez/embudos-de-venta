// Los artículos que genera build.mjs. El id es también la carpeta donde se escribe.
import advertorialCabello from './advertorial-cabello.mjs'
import advertorialPiel from './advertorial-piel.mjs'
import listicleCabello from './listicle-cabello.mjs'
import listiclePiel from './listicle-piel.mjs'

export const ARTICLES = {
	[advertorialCabello.id]: advertorialCabello,
	[advertorialPiel.id]: advertorialPiel,
	[listicleCabello.id]: listicleCabello,
	[listiclePiel.id]: listiclePiel
}

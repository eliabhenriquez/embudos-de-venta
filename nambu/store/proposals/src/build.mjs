// node nambu/store/proposals/src/build.mjs
// Escribe las dos maquetas estáticas junto a esta carpeta. Las imágenes se leen de
// nambu/landings/spray/assets/ y nambu/shared/assets/ por ruta relativa.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import proposalA from './a.mjs'
import proposalB from './b.mjs'

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PROPOSALS = [['a-tienda.html', proposalA], ['b-compra-rapida.html', proposalB]]

for (const [file, render] of PROPOSALS) {
	writeFileSync(join(OUT, file), render())
	console.log('escrito', file)
}

// node nambu/store/stores/co/proposals/src/build.mjs
// Genera portada-cro.html: la portada propuesta de nambuoficial.com, con el CSS real del tema de Colombia
// (stores/co/theme/assets/theme.css, sale de `pnpm build co`), su cabecera y su pie publicados (snapshots/) y los
// bloques de sections.mjs. Las imágenes salen del CDN de la tienda o van incrustadas: el archivo se ve completo enviado solo.
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { INSTAGRAM_URL, STORE_URL } from './content.mjs'
import { bestSellers, faq, footer, header, hero, kitPromo, needsFinder, newsletter, numbers, ribbon, stickyKit, story, voices } from './sections.mjs'

const SRC = dirname(fileURLToPath(import.meta.url))
const OUT = join(SRC, '..', 'portada-cro.html')
const THEME_CSS = join(SRC, '..', '..', 'theme', 'assets', 'theme.css')
const QUESTRIAL = `${STORE_URL}/cdn/fonts/questrial/questrial_n4.66abac5d8209a647b4bf8089b0451928ef144c07.woff2`

const read = file => readFileSync(join(SRC, file), 'utf8')

// Los snapshots traen rutas relativas y de protocolo (//): fuera de la tienda tienen que ser absolutas
const absolutize = html => html
	.replace(/(href|action)="\/(?!\/)/g, `$1="${STORE_URL}/`)
	.replace(/(^|["\s,])\/\/nambuoficial\.com/g, '$1https://nambuoficial.com')

// Falla si un cambio sobre los snapshots no encontró dónde aplicarse
const expectIn = (html, needle, what) => {
	if (!html.includes(needle)) throw new Error(`No se aplicó ${what}: revisa snapshots/`)
	return html
}

// Aviso de lo que harían los botones en la tienda (la maqueta no compra)
const toast = () => '<p class="pv-toast" role="status" data-pv-toast hidden></p>'

const css = () => {
	if (!existsSync(THEME_CSS)) throw new Error(`Falta ${THEME_CSS}: pásale antes \`pnpm build co\` desde nambu/store`)
	return [
		`@font-face { font-family: Questrial; font-weight: 400; font-style: normal; font-display: swap; src: url("${QUESTRIAL}") format("woff2"); }`,
		':root { --nb-font: Questrial, sans-serif; --nb-logo-width: 124px; }',
		readFileSync(THEME_CSS, 'utf8'),
		read('proposal.css'),
		read('review.css')
	].join('\n')
}

const headerHtml = () => {
	const html = header(absolutize(read('snapshots/header.html')))
	expectIn(html, 'nb-header__ig', 'Instagram en la cabecera')
	return expectIn(html, 'Instagram @nambuoficial', 'Instagram en el menú móvil')
}

const footerHtml = () => expectIn(footer(absolutize(read('snapshots/footer.html'))), INSTAGRAM_URL, 'Instagram en el pie')

const page = () => `<!doctype html>
<html lang="es">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="robots" content="noindex">
	<title>Propuesta · Portada CRO · Nambu Colombia</title>
	<link rel="preconnect" href="${STORE_URL}">
	<style>${css()}</style>
</head>
<body class="nb-body nb-body--home">
	${headerHtml()}
	<main id="MainContent" class="nb-main" role="main" tabindex="-1">
		${[hero(), ribbon(), bestSellers(), kitPromo(), needsFinder(), voices(), numbers(), story(), faq()].join('\n')}
	</main>
	${newsletter()}
	${footerHtml()}
	${stickyKit()}
	${toast()}
	<script>${read('page.js')}</script>
</body>
</html>
`

writeFileSync(OUT, page())
console.log(`Propuesta generada: ${OUT}`)

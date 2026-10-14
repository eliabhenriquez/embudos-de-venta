// Ilustraciones SVG compartidas. Los colores de lo que se reutiliza con <use> van
// en atributos: los estilos del documento no llegan de forma fiable a ese árbol.
const r = n => Math.round(n * 100) / 100
const r1 = n => Math.round(n * 10) / 10
const HEAD_LINE = '#9fbf95'

// La cabeza de perfil (mapa de síntomas, cadenas) y el degradado de la nube del CTA.
// Un ángulo puede añadir sus propios símbolos (sinusitis: la cara de frente).
export const defs = (extra = '') => `<svg class="ns-defs" aria-hidden="true" focusable="false"><defs><symbol id="ns-head" viewBox="0 0 140 112"><path d="M40 112 L40 90 C40 83 35 79 31 71 C23 57 23 35 35 21 C45 9 70 5 82 17 C88 23 90 33 90 42 C90 45 89 46 89 47 C92 51 97 56 100 60 C102 62.5 100.5 65 97 65 L92.4 65 C93.5 66.5 94.5 68.5 93.8 70.4 C93.3 71.6 91.4 71.8 91.4 72.6 C91.4 73.4 93.6 74.2 93.4 76.2 C93.2 78 90.4 78.6 90.2 80.2 C90.1 81.4 92.2 84 91.6 87 C91 90.4 87.6 92 84 92.6 C79 93.4 74 93 72 95.5 C70.4 99 70 106 70 112" fill="#ffffff" stroke="${HEAD_LINE}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/><path d="M93 62 C86 58 74 54 66 55.5 C60 57 58.6 64 59.2 74 C59.8 86 60 100 60 112" fill="none" stroke="#e8f6e0" stroke-width="6" stroke-linecap="round"/><path d="M76 44 q4 2.4 8 0" fill="none" stroke="${HEAD_LINE}" stroke-width="1.4" stroke-linecap="round"/><path d="M52 44 C46 44 45 56 51 58" fill="none" stroke="${HEAD_LINE}" stroke-width="1.4" stroke-linecap="round"/></symbol><radialGradient id="ns-puff"><stop offset="0" stop-color="#ffffff" stop-opacity="0.95"/><stop offset="0.55" stop-color="#ffffff" stop-opacity="0.55"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>${extra}</defs></svg>`

// Bruma ambiente que sube (hero y cierre). Un id por uso: el degradado no se comparte.
const MIST_DOTS = [[40, 320, 14], [92, 360, 8], [150, 300, 18], [210, 350, 10], [262, 310, 16], [318, 355, 9], [360, 290, 13], [70, 250, 7], [300, 240, 8], [190, 260, 6]]
export const mist = id => `<svg class="ns-mist" viewBox="0 0 400 400" aria-hidden="true" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="${id}"><stop offset="0" stop-color="#6fc350" stop-opacity="0.55"/><stop offset="1" stop-color="#6fc350" stop-opacity="0"/></radialGradient></defs>${MIST_DOTS.map(([cx, cy, rad]) => `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="url(#${id})"/>`).join('')}</svg>`

// Fichas del mapa de síntomas: la misma cabeza y la zona animada de cada síntoma
const headUse = '<use href="#ns-head" x="0" y="0" width="140" height="112"/>'
const star = (x, y, s) => `<path d="M${x} ${r(y - 4 * s)} l${r(1.6 * s)} ${r(2.4 * s)} ${r(2.4 * s)} ${r(1.6 * s)} ${r(-2.4 * s)} ${r(1.6 * s)} ${r(-1.6 * s)} ${r(2.4 * s)} ${r(-1.6 * s)} ${r(-2.4 * s)} ${r(-2.4 * s)} ${r(-1.6 * s)} ${r(2.4 * s)} ${r(-1.6 * s)}z"/>`
export const SIGN_FX = {
	blocked: '<path class="ns-sign__lane" d="M93 62 C86 58 74 54 66 55.5"/><g class="ns-sign__fog"><ellipse cx="84" cy="59" rx="8" ry="4.6"/><ellipse cx="74" cy="56.5" rx="7" ry="4"/></g><g class="ns-sign__air"><circle cx="108" cy="61" r="2.4"/><circle cx="114" cy="61" r="2.4"/><circle cx="120" cy="61" r="2.4"/></g>',
	mouth: '<g class="ns-sign__breath"><path d="M98 67.5 q3 5 0 10"/><path d="M103.5 65.5 q4.4 7 0 14"/><path d="M109 63.5 q5.6 9 0 18"/></g>',
	throat: '<path class="ns-sign__lane" d="M59.8 86 C60 94 60 100 60 106"/><path class="ns-sign__crack" d="M61.4 87 l-2.8 3.4 2.8 3.4 -2.8 3.4 2.8 3.4"/><g class="ns-sign__rays"><path d="M75 91 l7 -3.6"/><path d="M76 97 h8"/><path d="M75 103 l7 3.6"/></g>',
	pressure: '<circle class="ns-sign__ring" cx="72" cy="31" r="7.5"/><g class="ns-sign__chev"><path d="M57.5 26.5 l4.5 4.5 -4.5 4.5"/><path d="M86.5 26.5 l-4.5 4.5 4.5 4.5"/></g>',
	drip: '<path class="ns-sign__lane ns-sign__lane--soft" d="M66 55.5 C60 57 58.6 64 59.2 74 C59.8 86 60 100 60 106"/><path class="ns-sign__drop" transform="translate(59.4 76)" d="M0 -4.6 C2 -1.4 3.3 .4 3.3 2.2 A3.3 3.3 0 0 1 -3.3 2.2 C-3.3 .4 -2 -1.4 0 -4.6Z"/>',
	// Estornudo: el aire sale de golpe por la nariz en abanico
	sneeze: '<g class="ns-sign__burst"><path d="M101 60 l10 -6"/><path d="M102 63 h12"/><path d="M101 66 l10 6"/><circle cx="116" cy="52" r="1.8"/><circle cx="118" cy="63" r="1.8"/><circle cx="116" cy="74" r="1.8"/></g>',
	// Flema pegada: se queda en la garganta y late
	stuck: '<path class="ns-sign__lane ns-sign__lane--soft" d="M66 55.5 C60 57 58.6 64 59.2 74 C59.8 86 60 100 60 106"/><ellipse class="ns-sign__stuck" cx="60" cy="86" rx="5.4" ry="7"/>',
	// Moco: una gota que asoma por la nariz
	runny: '<path class="ns-sign__lane ns-sign__lane--soft" d="M93 62 C86 58 74 54 66 55.5"/><path class="ns-sign__drop ns-sign__drop--nose" transform="translate(96 70)" d="M0 -4.6 C2 -1.4 3.3 .4 3.3 2.2 A3.3 3.3 0 0 1 -3.3 2.2 C-3.3 .4 -2 -1.4 0 -4.6Z"/>'
}
const NIGHT = `<path class="ns-sign__moon" d="M80 28 A28 28 0 1 0 106 68 A22 22 0 1 1 80 28Z"/><g class="ns-sign__stars">${star(40, 34, 1)}${star(110, 24, 0.75)}${star(36, 82, 0.6)}</g>`
export const signArt = kind => `<svg class="ns-sign__svg" viewBox="14 0 116 108" aria-hidden="true">${kind === 'night' ? NIGHT : headUse + SIGN_FX[kind]}</svg>`

// La fórmula: eucalipto y menta a los lados, el frasco de pie sobre raíces de regaliz
const leaf = (x, y, angle, len, wid, veins = 2) => {
	const body = `M0 0 C${r1(len * 0.28)} ${r1(-wid)} ${r1(len * 0.78)} ${r1(-wid * 0.8)} ${len} 0 C${r1(len * 0.78)} ${r1(wid * 0.8)} ${r1(len * 0.28)} ${r1(wid)} 0 0Z`
	const lateral = []
	for (let i = 1; i <= veins; i++) {
		const sx = r1(len * (i / (veins + 1)) * 0.8)
		lateral.push(`M${sx} 0 L${r1(sx + len * 0.16)} ${r1(-wid * 0.55)}`, `M${sx} 0 L${r1(sx + len * 0.16)} ${r1(wid * 0.55)}`)
	}
	return `<g transform="translate(${x} ${y}) rotate(${angle})"><path class="ns-formula__leaf" d="${body}"/><path class="ns-formula__vein" d="M0 0 L${r1(len * 0.9)} 0 ${lateral.join(' ')}"/></g>`
}
const EUCALYPTUS_LEAVES = [[58, 250, 18], [96, 226, 17], [56, 196, 15.5], [92, 170, 14.5], [62, 142, 13], [90, 118, 11.5], [70, 94, 10], [84, 74, 8]]
const MINT_PAIRS = [[256, 36, 15], [220, 32, 13.5], [186, 27, 12], [156, 22, 10]]
const mintStemX = y => r1(284 + (296 - y) * 0.03)
const root = (x, y, angle, len) => `<g transform="translate(${x} ${y}) rotate(${angle})"><rect class="ns-formula__root" x="0" y="-6" width="${len}" height="12" rx="6"/><path class="ns-formula__fiber" d="M10 -2 H${len * 0.45} M${len * 0.3} 2 H${len - 12}"/><ellipse class="ns-formula__cut" cx="${len - 4}" cy="0" rx="3" ry="5.4"/></g>`
const stream = (id, [x, y]) => `<g class="ns-formula__stream" data-ns-plant-stream="${id}">${[2.6, 2.2, 1.8].map(rad => `<circle cx="${x}" cy="${y}" r="${rad}"/>`).join('')}</g>`
export const formulaArt = `<svg class="ns-formula__svg" viewBox="0 26 360 324" aria-hidden="true"><g class="ns-formula__plant is-on" data-ns-plant-art="1"><path class="ns-formula__stem" d="M78 296 C80 250 70 210 76 170 C82 130 76 100 80 66"/>${EUCALYPTUS_LEAVES.map(([cx, cy, rad]) => `<g><circle class="ns-formula__leaf" cx="${cx}" cy="${cy}" r="${rad}"/><path class="ns-formula__vein" d="M${cx} ${r1(cy + rad * 0.85)} C${r1(cx + rad * 0.15)} ${cy} ${r1(cx - rad * 0.1)} ${r1(cy - rad * 0.4)} ${cx} ${r1(cy - rad * 0.8)}"/></g>`).join('')}</g><g class="ns-formula__plant" data-ns-plant-art="2"><path class="ns-formula__stem" d="M288 296 C286 250 290 200 284 130"/>${MINT_PAIRS.map(([y, len, wid]) => leaf(mintStemX(y), y, -38, len, wid) + leaf(mintStemX(y), y, -142, len, wid)).join('')}${leaf(284, 132, -70, 20, 7, 1)}${leaf(284, 132, -110, 20, 7, 1)}</g><g class="ns-formula__plant" data-ns-plant-art="3">${root(96, 300, -4, 118)}${root(150, 312, 3, 126)}${root(118, 318, -1, 96)}</g>${stream(1, [104, 160])}${stream(2, [258, 176])}${stream(3, [180, 300])}<g class="ns-formula__labels"><text x="34" y="46">Eucalipto</text><text x="326" y="104" text-anchor="end">Menta</text><text x="180" y="342" text-anchor="middle">Regaliz</text></g></svg>`

// Frascos de la sección 60 ml: el líquido sube al verlos
const BOTTLE = 'M36 96c0-12 10-18 14-24h20c4 6 14 12 14 24v118a12 12 0 0 1-12 12H48a12 12 0 0 1-12-12Z'
export const bottle = ({ mod, fill, label, size, caption }) => `				<figure class="ns-bottle ns-bottle--${mod}">
					<svg class="ns-bottle__svg" viewBox="0 0 120 240" role="img" aria-label="${label}">
						<defs><clipPath id="ns-bottle-${fill}"><path d="${BOTTLE}"/></clipPath></defs>
						<g clip-path="url(#ns-bottle-${fill})">
							<g class="ns-bottle__liquid ns-bottle__liquid--${fill}">
								<path class="ns-bottle__wave" d="M-80 8 Q-60 0 -40 8 T0 8 T40 8 T80 8 T120 8 T160 8 T200 8 V260 H-80 Z"/>
							</g>
						</g>
						<path class="ns-bottle__glass" d="${BOTTLE}"/>
						<path class="ns-bottle__cap" d="M50 72V60h20v12M44 60h32v-6H44zM55 54V30l3-20h4l3 20v24"/>
					</svg>
					<figcaption><strong>${size}</strong><span>${caption}</span></figcaption>
				</figure>`

// Momentos del día: el frasco del producto y sus dos disparos
const PUFF = '<circle cx="60" cy="21" r="2.8"/><circle cx="53" cy="16" r="2.1"/><circle cx="67" cy="16" r="2.1"/><circle cx="57" cy="10" r="1.7"/><circle cx="64" cy="8" r="1.9"/><circle cx="48" cy="9" r="1.4"/><circle cx="72" cy="7" r="1.5"/>'
const SKY = {
	morning: '<circle cx="24" cy="30" r="9"/><path d="M24 12v5M24 43v5M6 30h5M37 30h5M11.3 17.3l3.5 3.5M33.2 39.2l3.5 3.5M11.3 42.7l3.5-3.5M33.2 20.8l3.5-3.5"/>',
	night: '<path d="M33 38a13 13 0 0 1-15.5-18.5A13 13 0 1 0 33 38Z"/><path d="M36 14v5M33.5 16.5h5"/>'
}
export const momentScene = sky => `					<div class="ns-moment__scene" aria-hidden="true">
						<svg viewBox="0 0 120 120">
							<g class="ns-moment__sky">${SKY[sky]}</g>
							<g class="ns-moment__spray">
								<rect class="ns-moment__body" x="45" y="68" width="30" height="48" rx="8"/>
								<rect class="ns-moment__band" x="45" y="82" width="30" height="16"/>
								<g class="ns-moment__pump">
									<rect x="52" y="60" width="16" height="8" rx="1.5"/>
									<rect x="46" y="55" width="28" height="5" rx="2.5"/>
									<path d="M57.8 55 59.4 26h1.2l1.6 29z"/>
								</g>
							</g>
							<g class="ns-moment__puff ns-moment__puff--1">${PUFF}</g>
							<g class="ns-moment__puff ns-moment__puff--2">${PUFF}</g>
						</svg>
						<span class="ns-moment__count">×2</span>
					</div>`

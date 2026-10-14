// Texto corrido del artículo: párrafos, titulares de sección y recursos tipográficos.

export const p = ({ text }) => `			<p class="ns-p">${text}</p>`

// Párrafo clave: la idea que cierra un tramo, en verde hondo
export const key = ({ text }) => `			<p class="ns-p ns-p--key">${text}</p>`

// Interjección de la escena («Ejem… ejem»)
export const shout = ({ text }) => `			<p class="ns-shout">${text}</p>`

export const pull = ({ text }) => `			<blockquote class="ns-pull">${text}</blockquote>`

// Frases cortas en cadena, como las trae el copy. closing: la última cierra, en verde
export const beats = ({ lines, closing = true }) => `			<div class="ns-beats${closing ? ' ns-beats--closing' : ''}">
${lines.map(line => `				<p class="ns-beats__line">${line}</p>`).join('\n')}
			</div>`

// Palabras sueltas del copy, seguidas en un mismo renglón
export const run = ({ items }) => `			<ul class="ns-run">
${items.map(item => `				<li class="ns-run__item">${item}</li>`).join('\n')}
			</ul>`

// Frases del copy una por línea, entre filetes (preguntas, medidas, salvedades)
export const rows = ({ items }) => `			<ul class="ns-rows">
${items.map(item => `				<li class="ns-row">${item}</li>`).join('\n')}
			</ul>`

// reveal: a partir de este titular el producto ya está presentado y sale la barra de compra.
// chapter: abre un capítulo del artículo (una ciudad, una pista), con filete encima.
export const heading = ({ text, reveal, chapter }, { id }) => `			<h2 class="ns-heading${chapter ? ' ns-heading--chapter' : ''}" id="${id}"${reveal ? ' data-ns-buybar-from' : ''}>${text}</h2>`

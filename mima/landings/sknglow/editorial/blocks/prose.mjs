// Texto corrido del artículo. El copy llega en frases cortas, una por párrafo: el ritmo
// lo pone el margen, no un bloque de texto.

// lede: el párrafo que abre el relato, un punto más grande
export const p = ({ text, lede }) => `			<p class="sg-p${lede ? ' sg-p--lede' : ''}">${text}</p>`

// La frase que cierra un tramo («Nunca se fueron.»)
export const key = ({ text }) => `			<p class="sg-p sg-p--key">${text}</p>`

// La frase que el relato deja en el aire: se saca del párrafo y se lee sola
export const pull = ({ text }) => `			<blockquote class="sg-pull" data-sg-enter>
				<p>${text}</p>
			</blockquote>`

// reveal: a partir de este titular el producto ya está presentado y sale la barra de compra
export const heading = ({ text, reveal }, { id }) => `			<h2 class="sg-h2" id="${id}"${reveal ? ' data-sg-product-revealed' : ''}>${text}</h2>`

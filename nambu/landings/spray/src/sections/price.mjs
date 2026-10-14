// Bloque de precio del hero: la cifra que manda y, debajo, la alternativa con su ahorro.
// label y was solo en remarketing (contraentrega rebajado sobre el precio habitual tachado).
export const priceBlock = ({ label, figure, was, alt, save }, indent) => [
	...(label ? [`${indent}<p class="ns-price__label">${label}</p>`] : []),
	`${indent}<p class="ns-price"><span class="ns-price__figure">${figure}</span><span class="ns-price__cur">COP</span>${was ? `<s class="ns-price__was">${was}</s>` : ''}</p>`,
	`${indent}<p class="ns-price__alt"><span>${alt}</span><span class="ns-price__save">${save}</span></p>`
].join('\n')

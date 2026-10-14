// La única ilustración del formato: la ruta nariz–garganta, dibujada sobre la placa
// de vías aéreas. El lienzo mide 712 × 534: la placa (712 × 690) recortada a 4:3 por
// abajo, que es como la enseña el marco. Las etiquetas van en HTML (blocks/figures.mjs).
const LANE = 'M572 226 C500 214 420 220 352 240 C312 254 300 300 296 360 C294 400 293 430 292 462'
const DROP = 'M0 -20 C9 -6 14 2 14 9 A14 14 0 0 1 -14 9 C-14 2 -9 -6 0 -20Z'
// Las tres paradas, en el orden del recorrido: nariz, detrás de la nariz, garganta
const STOPS = [[572, 226], [352, 240], [292, 462]]

export const routeArt = `<svg class="ns-route__svg" viewBox="0 0 712 534" aria-hidden="true"><path class="ns-route__halo" d="${LANE}"/><path class="ns-route__lane" d="${LANE}"/>${STOPS.map(([cx, cy]) => `<circle class="ns-route__dot" cx="${cx}" cy="${cy}" r="9"/>`).join('')}<g class="ns-route__drop"><path d="${DROP}"/></g></svg>`

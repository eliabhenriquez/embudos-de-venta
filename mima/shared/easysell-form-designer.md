# EasySell · skin, ganchos y límites

Complemento de [`easysell-form.css`](easysell-form.css). Misma piel que la de Releasit
([`releasit-form.css`](releasit-form.css)), sobre el DOM de EasySell.

Auditado en vivo el 2026-10-10 sobre `mimacolombia.com/pages/mimacalm-sueno` y
`/products/mima-calm?easysell=1` (extensión `easysell-cod-form-525`).

---

## 1. Qué se pega y dónde

El campo de CSS personalizado de EasySell admite **5.000 caracteres**. Es un campo global: vale para todas
las landings y para la ficha de producto.

| Archivo | Qué es |
|---|---|
| `easysell-form.css` | La fuente: tokens, comentarios, una regla por línea. **Aquí se edita** |
| `easysell-form.min.css` | El compilado. **Esto se pega en la app** |
| `build-easysell-css.mjs` | El compilador |

```sh
node mima/shared/build-easysell-css.mjs
# easysell-form.min.css → 4104 de 5000 caracteres (quedan 896)
```

El compilador sustituye los tokens por su valor (`var(--mima-border)` son 18 caracteres; `#ded0dc`, 7),
acorta a una letra las variables que cambian en ejecución y **falla sin escribir nada** si se pasa del
límite. La fuente no admite reglas `@`.

La app sirve el campo en `<style id="es-css">`, en el documento. Por eso `[data-sg-pay]` y
`body:has([data-rsi-banner])` alcanzan al formulario aunque cuelgue de `<body>`, fuera de la landing.

---

## 2. El límite: la app pinta inline con `!important`

| Nodo | Lo que llega inline |
|---|---|
| `#es-form-container` | `color`, `font-size`, `background`, `border-*`, `border-radius` — con `!important` |
| `.es-button` | `color`, `font-size`, `font-weight`, `border-*`, `border-radius`, `background`, `box-shadow` — con `!important` |
| Título, precio e insignia de la oferta | `color`, `font-size`, `font-weight`; la insignia también `background` — con `!important` |
| `.es-qo-container`, `.es-offer-container`, `.total-container` | `background`, `border-*`, `border-radius` — **sin** `!important` |

Lo que lleva `!important` no se pisa. Se pinta por encima con propiedades que la app no declara:

| Lo que se quería | Cómo |
|---|---|
| Radio de la tarjeta | En `#easysell`, un nivel por encima, con `overflow: hidden` |
| Relleno y contorno del botón | `:before`, sobre el fondo de la app |
| Forma de píldora | `clip-path`. Recorta también la sombra de la app |
| Color del texto y del icono | `-webkit-text-fill-color`, que gana a `color` |
| Fondo de la insignia | `box-shadow: inset 0 0 0 99px`: pinta sobre el fondo y bajo el texto |

Consecuencia: **el color, fondo, radio y sombra que se elijan para un botón en la app no se ven.**

---

## 3. Lo que se decide en la app

| Ajuste | Efecto |
|---|---|
| Alineación de etiquetas | `auto` y `vertical`: encima del campo. `horizontal`: al lado, en una columna del 34 % a 13 px |
| Orden de los botones | El CSS no reordena. Hoy va contraentrega y debajo el pago en línea |
| Borde de los botones | 0 o 1. Con 2 o más, el contorno queda metido hacia dentro |
| Textos de botones, ofertas y bump | Los títulos largos parten en tres líneas a 390 px |
| Insignia del primer escalón | Sale en neutro. "Ahorra 0%" resta: mejor "Precio regular" |

`$79.900,00` es el formato de moneda de la tienda, no de la app.

---

## 4. Los dos botones de pago

| Clase | Qué es |
|---|---|
| `.es-cta-btn` (`#es-form-button`) | Contraentrega |
| `.es-checkout-btn` | Pago en línea. La lleva todo botón cuyo `value` empieza por `checkout` (hoy `checkout_5950`) |

| Estado | Pago en línea | Contraentrega |
|---|---|---|
| Solo existe contraentrega | — | Relleno magenta |
| Los dos, sin `data-sg-pay` o con `prepaid` | Relleno | Contorno |
| `<html data-sg-pay="cod">` | Contorno | Relleno |

El atributo lo escribe la landing (`initPaymentSelector`) y arranca en `prepaid`. Es el mismo que lee la
skin de Releasit.

Medido a 320, 360, 390 y 1280 px: texto a 0–0,5 px del centro del botón y sin desborde horizontal. El foco
de teclado es un anillo interior, comprobado con Tab real.

---

## 5. Los CTA de las landings

EasySell abre el formulario desde **la clase** `.es-popup-button`: enlaza un `click` a cada elemento que la
lleve al arrancar. Cada CTA lleva los dos ganchos, y abre el formulario de la app que esté activa:

```html
<button type="button" id="es-popup-button"
	class="mc-cta es-popup-button es-popup-button-cart _rsi-cod-form-gempages-button-overwrite _rsi-cod-form-is-gempage">
```

El `id` se repite en todos los CTA. Es HTML inválido y no rompe nada: comprobado en vivo con los 9 CTA de
`mimacalm-sueno`, los 9 abren el formulario. Según el código de la app, ese id le sirve para dos cosas:
desactivar el botón si el producto se agota y **quitar del DOM todos los `#es-popup-button` cuando el
pedido se crea**. Leído en el bundle, no probado: no se creó ningún pedido.

🔴 **No es un cambio solo de HTML.** La hoja de EasySell estila esa clase, pensando en su propio botón:

```css
.es-popup-button:before { display: none !important }
.es-popup-button { margin-top: 10px; margin-bottom: 6px; border: 0 !important; … }
```

Medido en las seis landings: el CTA pierde la capa `::before` (la animación) y cada fila de botón crece
16 px. La defensa va en el CSS de cada landing, en la regla base del CTA:

```css
.mc-lp .mc-cta { margin: 0; }
.mc-lp .mc-cta::before { display: block !important; }   /* solo donde el CTA usa ::before */
```

Con eso, cargar la hoja de EasySell no cambia ningún estilo visible. Con Releasit activo, tampoco. El JS
de las landings no se toca: busca los CTA por clase.

**Lo que la app añade por su cuenta en una landing**, y la skin oculta donde la raíz lleva
`data-rsi-banner`: su botón "PAGO CONTRA ENTREGA" junto al Product Element y, con scroll, una barra fija
negra que tapaba el sticky de la landing. En la ficha de producto se quedan.

---

## 6. Banner por ángulo

No hay bloque Imagen en el formulario hoy. Si se añade, la skin ya lo trata como banner de landing: sale
oculto y se enciende donde la raíz lleva `data-rsi-banner`, con la imagen de ese ángulo.

| `data-rsi-banner` | Archivo |
|---|---|
| `piel` | `banner-image-form-final-sknglow.webp` |
| `cabello` | `banner-formulario-cabello-sknglow.webp` |
| `mimanad-energia` / `mimanad-memoria` | `banner-formulario-energia-mimanad.webp` / `…-memoria-…` |
| `mimacalm-sueno` / `mimacalm-cuerpo` | `banner-formulario-sueno-mimacalm.webp` / `…-cuerpo-…` |

La URL del bloque en la app da igual: el CSS la sustituye con `content: url()`. El navegador la descarga
de todos modos, así que conviene que sea uno de estos. Un ángulo nuevo es una regla más en la sección 8 de
la fuente. `check-cdn.sh` no ve estos banners.

---

## 7. Lo que se quedó fuera por el límite

| Qué | Cómo queda |
|---|---|
| Velo del modal | El de la app: negro al 40 % con desenfoque |
| Flecha de los desplegables | La de la app, negra |
| Texto de error | El rojo de la app. El borde del campo sí va en el rojo de marca |
| Brillo bajo el botón principal | No hay. El `clip-path` recorta cualquier sombra exterior |
| Opción descartada en una línea, sin icono | No. Solo cambia relleno por contorno |
| Transiciones | Ninguna |
| Opciones de envío, casillas, campo de texto largo | Sin piel. Con una sola tarifa la app ya oculta el envío |
| Upsell, downsell, OTP, página de gracias | Sin piel. Son modales aparte |

Quedan 896 caracteres.

---

## 8. Cómo verificar un cambio

Se prueba el **compilado**, inyectado donde lo sirve la app, sobre la landing publicada:

```js
// sonda.js
(async () => {
	const wait = ms => new Promise(r => setTimeout(r, ms))
	await wait(3200)
	document.querySelector('#es-css').appendChild(document.createTextNode(CSS_COMPILADO))
	document.querySelector('.mc-lp .mc-cta.es-popup-button').click()
	await wait(2200)
	// … medir
})()
```

```sh
node shot.mjs --url='https://www.mimacolombia.com/pages/mimacalm-sueno' \
	--width=390 --height=1800 --probe=sonda.js --out=/tmp/es.png
```

- El modal es `position: fixed` con scroll propio: para verlo entero se sube `--height`, no `--full`.
- Con campos vacíos, pulsar contraentrega solo valida: no envía nada. Así se revisa el estado de error.
- En la ficha de producto, `?easysell=1` abre el formulario solo. Allí la raíz mide 10 px y el CSS de la
  app va en `rem`: lo que se mida en la landing hay que mirarlo también ahí.
- **Bloques que la tienda no tiene activos.** La app lee `window.EASYSELL_CONFIG`, `EASYSELL_BUMPS` y
  `EASYSELL_QUANTITY_OFFERS`. Con `shot.mjs --init` se pone una trampa sobre esas globales antes de que
  cargue la página y la app pinta su DOM real, sin tocar lo publicado:

  ```js
  ;(() => {
  	let cfg
  	const mutate = v => { v.fields.splice(1, 0, { type: 'image', value: 'image_1', src: '<url>', style: { width: 100, justifyContent: 'center' } }); return v }
  	Object.defineProperty(window, 'EASYSELL_CONFIG', { configurable: true, get: () => cfg, set: v => { cfg = mutate(v) } })
  })()
  ```
- **La configuración cambia mientras se prueba.** El 2026-10-10 las etiquetas pasaron de `horizontal` a
  `vertical` y el bump apareció y desapareció entre dos pruebas. Antes de dar un fallo por bueno, volver a
  leer la configuración.

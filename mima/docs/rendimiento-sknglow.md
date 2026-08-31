# Rendimiento · landing SKNGLOW

URL: https://www.mimacolombia.com/pages/sknglow-piel-firme
Objetivo: móvil, que es ~90% del tráfico.

Todo lo de aquí está medido con Chrome headless emulando lo mismo que PageSpeed
móvil: 412×823, DPR 1.75, **CPU 4× más lenta** y red **Slow 4G** (1,6 Mbps,
150 ms de latencia), caché desactivada. El script está en el scratchpad de la
sesión (`perf.mjs` / `perf2.mjs`).

> **Sobre la precisión de los tiempos.** Las pasadas contra el servidor real
> varían **±700 ms** entre ejecuciones idénticas. Tres medidas del mismo
> escenario base dieron 2.676, 3.792 y 2.400 ms de FCP. Por eso aquí los
> **bytes son la unidad fiable** y los milisegundos indican dirección, no
> promesa. Cualquier mejora que se anuncie en segundos hay que desconfiarla.

---

## 1. Punto de partida (2026-08-27)

PageSpeed móvil **57** / escritorio 93.

| Métrica | Valor | Estado |
|---|---|---|
| FCP | 4,7 s | rojo |
| LCP | 7,6 s | rojo |
| Speed Index | 4,7 s | naranja |
| TBT | 160 ms | verde |
| CLS | 0,002 | verde |

**TBT y CLS ya están al máximo.** Suman el 55% del peso del score, así que el 57
sale entero de FCP, LCP y Speed Index — y los tres dependen de cuántos bytes hay
que bajar antes de pintar.

---

## 2. El diagnóstico: no es el servidor, es el ancho de banda

- **TTFB: 159 ms.** Excelente. El servidor no es el problema.
- **2.482 KB en 185 peticiones** peleando por una conexión lenta.
- 58 scripts, 41 imágenes, 10 bloques `<style>`, 7 preconnect.

### Reparto del peso por propiedad

| | Peso | % |
|---|---|---|
| **Nuestra landing** (imágenes, fuentes, bloque HTML) | ~210 KB | **9%** |
| **Tema + apps** | 2.061 KB | **91%** |

Esta es la conclusión que manda sobre todas las demás: **la landing no puede
mover el score sola.** Aunque quedara en cero bytes, seguirían bajando 2 MB.

### Los cuatro pesos pesados

| Qué | Peso | Cuándo carga | ¿Nuestro? |
|---|---|---|---|
| Bundle de Releasit (`main-Bmp3jl8I.js`) | 388 KB | 0,53 → 5,61 s | no |
| Checkout de Shopify precargado (`checkout-web`) | ~500 KB | 7 → 17 s | no |
| Píxeles de Facebook + TikTok | 387 KB | 6 → 10 s | no |
| Imagen del hero | 106 KB | 0,65 → 4,02 s | **sí** |

---

## 3. Qué se ha hecho

### 3.1 Hero: dos imágenes → una compuesta

La foto y el frasco eran dos `<img>` superpuestos: 276 KB y dos peticiones. Ahora
van compuestos en una sola imagen, con dos recortes servidos por `<picture>` y
`media` para que el móvil nunca descargue el de escritorio.

| | Peso móvil | Peticiones |
|---|---|---|
| Antes | 276 KB | 2 |
| Después | **77 KB** | **1** |

Detalle que no era obvio: la compuesta pesa **menos que la foto sola**, porque el
frasco tapa justo la zona de pelo rizado, que es la más cara de comprimir.

El lienzo lleva 25 px de más arriba, transparentes, para conservar la parte del
frasco que asoma por encima del panel. El margen negativo (`-2.907%`, que es
-25/860 y se resuelve contra el ancho) devuelve esa franja al layout, así que la
tarjeta ocupa exactamente lo mismo que antes.

### 3.2 Fuera la fuente cursiva

`aok-buenos-aires-400-italic.woff2` (19 KB) se descargaba entera para una nota al
pie muy por debajo del pliegue. El navegador la sintetiza desde la redonda.

### 3.3 Calidad de la compuesta: q80 → q68

105 → 77 KB, indistinguible al doble del tamaño de visualización.

---

## 4. Trampas encontradas (no repetir el error)

### 4.1 Pedir un `?width=` menor puede EMPEORAR el peso

El CDN de Shopify devolvía **JPEG** al redimensionar el master antiguo del hero,
y **WebP** solo al ancho nativo:

```
width=620  →  198 KB  image/jpeg
width=720  →  263 KB  image/jpeg   ← más pesado que el original
width=900  →  241 KB  image/webp
```

Las demás imágenes de la landing sí redimensionaban a WebP con normalidad; esa
no. **Comprobar siempre el `content-type` real** antes de dar por hecho que un
ancho menor ahorra:

```sh
curl -sSo /dev/null -w '%{size_download} %{content_type}\n' \
  -H 'Accept: image/avif,image/webp,image/*' \
  'https://www.mimacolombia.com/cdn/shop/files/ARCHIVO.webp?width=620'
```

Las compuestas nuevas sí redimensionan bien a WebP.

### 4.2 El nombre del hero lleva `-v1` por versionado manual

La landing publicada apunta a `landings-sknglow-hero-movil-v1.webp`: el sufijo lo
pone el equipo a mano para versionar la imagen, no Shopify. El repositorio está
alineado con ese nombre. Al generar una versión nueva hay que decidir si se
mantiene el nombre o se sube el siguiente `-v2`, y actualizar el marcado en
consecuencia.

### 4.3 Corrección de un diagnóstico mío equivocado

Llegué a afirmar que `base.css` lo inyectaba JavaScript —una app optimizadora de
velocidad difiriendo el CSS del tema—. **Es falso.** `base.css` viene como
`<link rel="stylesheet">` normal en el `<head>`; mi búsqueda no lo encontró
porque el atributo `href` va antes que `rel` y mi expresión regular exigía el
orden contrario. No hay ninguna app difiriendo el CSS.

---

## 5. Estado actual y qué queda

Tras los cambios: 2.482 → 2.307 KB, FCP 2.676 → 2.344 ms en mi entorno.

El LCP pasó a ser la propia compuesta y el cuello es claro: **arranca en 0,65 s y
no termina hasta 4,02 s**, porque comparte el tubo con los 388 KB de Releasit,
que lo ocupan de 0,53 s a 5,61 s.

### Coste medido de Releasit

| Escenario | FCP | LCP |
|---|---|---|
| Como está | 2.420 ms | 4.028 ms |
| Bloqueando el bundle de Releasit | **1.684 ms** | **3.412 ms** |

**~700 ms de FCP y ~600 ms de LCP** los pone una sola app. `deferLoading` ya está
en `true` en su configuración y aun así el bundle se descarga desde el segundo
0,5: va en el `<head>` como `<script type="module">`, que no bloquea el parseo
pero sí se pide con prioridad alta desde el principio.

### Cadena que bloquea el render, en orden

```
1,33 s   documento HTML (60 KB gzip, con 98 KB de <style> del tema en línea)
1,73 s   base.css (43 KB)
~2,3 s   component-predictive-search.css  +  CSS de Releasit
2,34 s   FCP
4,02 s   LCP (la compuesta)
```

### Pendiente, por orden de impacto

1. **Releasit, 388 KB.** Preguntarles si el formulario puede cargarse solo al
   interactuar. Es la palanca más grande de toda la página.
2. **Checkout de Shopify precargado, ~500 KB**, sin que nadie haya pulsado
   comprar.
3. **Facebook + TikTok, 387 KB.** Cargan después del LCP, así que no lo
   empeoran, pero engordan el total y generan tareas largas.
4. **7 preconnect** cuando PageSpeed penaliza a partir de 4.
5. **`component-predictive-search.css`** bloquea el render y esta landing no usa
   búsqueda predictiva. Si el tema permite cargarlo por plantilla, fuera.
6. **`shopify.jsdeliver.cloud/js/config.js`** — dominio de terceros ajeno a
   Shopify en el storefront. Averiguar qué app lo pone.

### Techo realista

Con 2 MB de tema y apps, **el score móvil no sube mucho por encima de 57 sin
tocar ese 91%.** Seguir puliendo la landing tiene rendimientos decrecientes: ya
son 210 KB de 2.307.

---

## 6. Todo lo que carga Releasit antes de que nadie toque nada

Con el formulario cerrado y sin ninguna interacción, la app descarga **~503 KB**:

| Recurso | Peso | Ventana |
|---|---|---|
| `main-Bmp3jl8I.js` | 388 KB | 0,53 → 5,61 s |
| `DownsellBg2-DWCVUhbc.jpg` | 80 KB | 6,88 → 8,65 s |
| `DownsellBg1-Vtx_D0HM.jpg` | 18 KB | 6,88 → 7,62 s |
| `DownsellBg0-BbeQyRVx.jpg` | 13 KB | 6,88 → 7,39 s |
| `main-CPtg0rMR.css` | 4 KB | 0,38 → 0,60 s (bloquea el render) |
| Hoja de Google Fonts (Public Sans) | 1 KB | 1,76 → 2,18 s |

Los 111 KB de fondos de *downsell* se bajan con `upsells.isEnabled = false`, o
sea con la función apagada. Ese es el punto más fácil de defender ante soporte:
no es una decisión de arquitectura, es un recurso que no debería pedirse.

#### La causa exacta, localizada en el bundle (2026-08-28)

Ya no hay que suponerlo. En `main-Bmp3jl8I.js` (1.432.522 caracteres), en el
offset 454.350, las tres rutas se resuelven como assets del módulo:

```js
image0 = "" + new URL("DownsellBg0-BbeQyRVx.jpg", import.meta.url).href,
image1 = "" + new URL("DownsellBg1-Vtx_D0HM.jpg", import.meta.url).href,
image2 = "" + new URL("DownsellBg2-DWCVUhbc.jpg", import.meta.url).href
```

`new URL()` solo construye una cadena; no descarga nada. La descarga está 850 KB
más adelante, en el offset 1.309.760, dentro del componente del formulario:

```js
const lt = useMemo(() => [image0, image1, image2], [])   // array constante
useEffect(() => {
  const preload = (u) => { const img = new Image(); img.src = u }
  if (zt.style.backgroundImage) preload(zt.style.backgroundImage)
  if (lt && lt.length > 0) lt.forEach(preload)
}, [zt.style.backgroundImage, lt])
```

Es un precargado **incondicional**. El array de dependencias es constante, así
que el efecto corre una vez al montar el componente — y el componente se monta
al cargar la página, con el modal cerrado. En ningún punto se consulta
`upsells.isEnabled`.

Comprobado además en el DOM en vivo, con la página cargada y sin tocar nada:

| Comprobación | Resultado |
|---|---|
| `upsells.isEnabled` | `false` |
| Elementos del DOM con `DownsellBg` en `background-image` | **0** |
| Elementos `<img>` con `DownsellBg` en `src` | **0** |
| Reglas CSS de cualquier hoja que mencionen `DownsellBg` | **0** |
| Bytes descargados | **110,5 KB** |

O sea: se bajan 110,5 KB que ningún elemento de la página usa, ni visible ni
oculto. El arreglo por su parte es de una línea — mover el `forEach` detrás del
mismo flag que ya gobierna la función.

La hoja de Public Sans llega antes de que el formulario exista, y nuestra piel
sobrescribe la tipografía entera, así que esa fuente no se muestra nunca.

---

## 7. Mensaje para el soporte de Releasit

En inglés, que es donde responden mejor a lo técnico. Listo para copiar.

```
Subject: Storefront performance — COD Form bundle (388 KB) loading before any interaction

Hi Releasit team,

Store: mimacolombia.com
Page: https://www.mimacolombia.com/pages/sknglow-piel-firme
App version: releasit-cod-form-443

We're optimising this landing for mobile (~90% of our traffic) and the COD Form
is currently the single heaviest asset on the page. I've measured it with Chrome
DevTools Protocol using the same emulation Lighthouse/PageSpeed uses for mobile
(412x823, DPR 1.75, 4x CPU throttling, Slow 4G at 1.6 Mbps / 150 ms RTT, cache
disabled). Numbers below are from that environment.

WHAT WE SEE

On page load — before the customer clicks anything and with the form closed —
the app downloads ~503 KB:

  388 KB  main-Bmp3jl8I.js        starts 0.53 s, finishes 5.61 s
   80 KB  DownsellBg2-DWCVUhbc.jpg
   18 KB  DownsellBg1-Vtx_D0HM.jpg
   13 KB  DownsellBg0-BbeQyRVx.jpg
    4 KB  main-CPtg0rMR.css       render-blocking in <head>
    +     fonts.googleapis.com stylesheet (Public Sans), requested at 1.76 s

MEASURED IMPACT

Our LCP element is a hero image (77 KB) that starts downloading at 0.65 s but
doesn't finish until 4.02 s, because it shares bandwidth with the 388 KB bundle
that occupies the connection from 0.53 s to 5.61 s.

Blocking only the app bundle, everything else unchanged:

                        FCP        LCP
  Current            2420 ms    4028 ms
  Bundle blocked     1684 ms    3412 ms

That's roughly 700 ms of FCP and 600 ms of LCP attributable to the bundle alone.
(These runs vary by a few hundred ms, but the direction is consistent across
repeated measurements.)

OUR QUESTIONS

1. Is there any way to load the form bundle on interaction — on the first click
   of a COD button — instead of at page load? Our form settings already have
   form.deferLoading = true, and the bundle still starts downloading at 0.53 s.
   It's injected in <head> as <script type="module">, which doesn't block parsing
   but is still fetched at high priority immediately.

2. Why are DownsellBg0/1/2.jpg (111 KB total) downloaded on every page load? Our
   configuration has upsells.isEnabled = false, so downsell should never render.

3. Why is the Google Fonts stylesheet for Public Sans requested before the form
   is opened? We override the form's font family entirely with our own CSS, so
   Public Sans is never displayed on our store.

We're not looking to disable the app — the form converts well for us and we want
to keep it. We're trying to find the right configuration, or understand whether a
lighter loading path is on your roadmap.

Happy to share the full HAR file or the measurement script if that helps.

Thanks,
```

### Versión corta (1.659 caracteres)

El formulario de contacto de Releasit **corta a los ~2.000 caracteres**: el
mensaje de arriba se trunca en la pregunta 2. Esta versión cabe entera y no
pierde ningún dato — solo comprime la explicación de la emulación y quita el
asunto, que va en su propio campo.

**Asunto:** `COD Form bundle (388 KB) loads before any interaction`

```
Store: mimacolombia.com
Page: https://www.mimacolombia.com/pages/sknglow-piel-firme
Version: releasit-cod-form-443

Optimising this page for mobile (90% of our traffic). Measured with Chrome
DevTools Protocol using Lighthouse mobile emulation: 4x CPU throttle, Slow 4G,
cache disabled.

With the form CLOSED and no interaction, the app loads ~503 KB:

  388 KB  main-Bmp3jl8I.js    starts 0.53s, ends 5.61s
   80 KB  DownsellBg2.jpg
   18 KB  DownsellBg1.jpg
   13 KB  DownsellBg0.jpg
    4 KB  main-CPtg0rMR.css   render-blocking in <head>
          fonts.googleapis.com (Public Sans) at 1.76s

Our LCP element is a 77 KB hero image. It starts at 0.65s but only finishes at
4.02s, because it shares bandwidth with the 388 KB bundle.

Blocking only that bundle, nothing else changed:

             FCP       LCP
  Current   2420ms   4028ms
  Blocked   1684ms   3412ms

So ~700ms FCP and ~600ms LCP come from the bundle alone. Runs vary by a few
hundred ms, but the direction is consistent.

QUESTIONS

1. Can the bundle load on the first COD button click instead of at page load?
form.deferLoading is already true and it still starts at 0.53s. It is a
<script type="module"> in <head>, so it is fetched at high priority immediately.

2. Why are DownsellBg0/1/2.jpg (111 KB) downloaded on every page load, when our
config has upsells.isEnabled = false and downsell never renders?

3. Why is the Public Sans stylesheet requested before the form opens? We
override the form font entirely with our own CSS, so it is never displayed.

We want to keep the app, the form converts well for us. We are looking for the
right configuration. Happy to share the HAR file.
```

### Por qué está redactado así

- **El bundle** va con la medición del antes y el después, que es lo que impide
  despacharlo con un "es normal".
- **Los fondos de downsell** son el punto más difícil de defender para ellos: una
  función apagada que igual descarga 111 KB en cada carga. Suele ser lo que antes
  se corrige.
- **La advertencia sobre la variabilidad** va a propósito. Si la omites y ellos
  repiten la prueba con otro resultado, pierdes credibilidad en todo lo demás.


---

## 8. Auditoría del orden de carga en la primera entrada (2026-08-28)

Medido con CDP sobre la URL productiva, emulación móvil de PageSpeed
(412×823, DPR 1,75, CPU 4×, Slow 4G), caché vacía y **sin hacer scroll en ningún
momento**. Total: **199 peticiones, 2.307 KB**.

### 8.1 Los primeros 3 segundos, en orden

| t | Peso | Recurso | De quién |
|---|---|---|---|
| 0,00 s | 61 KB | documento HTML | — |
| 0,36 s | 43 KB | `base.css` | tema |
| 0,36 s | 5 KB | `main-CPtg0rMR.css` | Releasit (bloquea render) |
| 0,37 s | 30 KB | `shrine.null.js` | tema |
| 0,37 s | 21 KB | `secondary.js` | tema |
| 0,40 s | **26 KB** | fuente `archivoblack_n4` | tema — no se usa en la landing |
| 0,40 s | 2 KB | `component-predictive-search.css` | tema — no hay buscador aquí |
| 0,47 s | 11 KB | `gp-lazyload` + `gp-global` | GemPages |
| 0,52 s | **388 KB** | `main-Bmp3jl8I.js` | Releasit |
| 0,55 s | 5 KB | logo MIMA | landing ✅ |
| 0,56 s | **106 KB** | hero compuesto | landing ✅ (elemento LCP) |
| 0,60 s | 47 KB | 17 chunks de `shop-cart-sync` | Shopify |
| 1,79 s | 1 KB | Google Fonts · Public Sans | Releasit — nunca se muestra |
| 2,29 s | 71 KB | `b5696…m.js` | píxel de terceros |
| 2,30 s | 30 KB | `trekkie.storefront` | Shopify analytics |
| 2,38–2,43 s | **75 KB** | 4 fuentes AOK Buenos Aires | landing |
| 2,49 s | 12 KB | `biotina.webp` | landing (lazy, ver 8.2) |
| 7,08 s | 111 KB | 3 `DownsellBg` | Releasit |

**Lo que hay que leer de esta tabla:** el hero sale a pedir a los 0,56 s, que
está bien, pero arranca **detrás** de los 388 KB de Releasit, que salieron 40 ms
antes y ocupan la línea hasta los 5,61 s. Por eso una imagen de 106 KB tarda
3,24 s en llegar y el LCP se va a 4.036 ms.

Las fuentes de la landing no se piden hasta los **2,38 s**, porque los
`@font-face` viven en el bloque `<style>` de GemPages, que se parsea después de
todo lo anterior. El texto del hero se pinta con la fuente de sistema y salta
cuando llegan.

### 8.2 Imágenes que se descargan sin haber hecho scroll

De las **40 imágenes** de la landing solo se descargan **2 + 1**:

| Imagen | Posición en el documento | ¿Se descarga? |
|---|---|---|
| Logo MIMA | 6 px | Sí — correcto |
| Hero compuesto | 175 px | Sí — correcto, es el LCP |
| `biotina.webp` | **2.007 px** | Sí — umbral de Chrome |
| `resveratrol.webp` | 2.325 px | No |
| Las 36 restantes | 2.673 → 16.025 px | No |

El marcado está bien: solo el logo y el hero van sin `loading="lazy"`; las otras
38 lo llevan, y GemPages no lo altera (comprobado en el HTML publicado).

`biotina.webp` cae dentro del **umbral de precarga de `loading="lazy"`**. Chrome
no espera a que la imagen entre en pantalla: la pide cuando está a ~1.250 px por
debajo del viewport. Con un viewport de 823 px, el corte queda en ~2.073 px:
biotina está a 2.007 px (dentro) y resveratrol a 2.325 px (fuera). El corte cayó
literalmente entre las dos. Es comportamiento normal del navegador, no un fallo;
son 11,7 KB y llega a los 2,49 s, fuera de la ruta crítica.

**El ebook no se descarga en frío.** Está a 7.787 px, muy lejos de cualquier
umbral. Si apareció en el Network fue por scroll o por una entrada en caliente.

Los dos `data:image/svg+xml` de la lista **no son peticiones de red**: son los
dos checks de las listas, embebidos en el CSS. Cuestan 0 bytes de transferencia;
DevTools los lista igual porque sí son recursos de imagen.

### 8.3 Hallazgo colateral: el CSS publicado está desactualizado

En producción siguen declarados **cuatro** `@font-face`, incluido
`aok-buenos-aires-400-italic.woff2` (19,2 KB), dentro del bloque
`<style id="custom-css-gdgSwcQqXf">` de GemPages. En el repositorio ese
`@font-face` ya no existe: se quitó al comprobar que ningún elemento usa cursiva.

El marcado sí está al día (el hero compuesto y el chip de pago anticipado están
publicados). Lo que no se actualizó es la **pestaña de CSS de GemPages**, que es
un campo aparte. Hay que volver a pegar el CSS.

Son 19,2 KB de una fuente que no se muestra, descargados en la ventana peor
posible: los 2,4 s, compitiendo con las tres fuentes que sí se usan.

### 8.4 Peso que no es de la landing y se podría quitar

| Recurso | Peso | Por qué sobra en esta página |
|---|---|---|
| 3 × `DownsellBg` | 111 KB | Downsells apagados; ver 6 |
| Fuente `archivoblack_n4` | 26 KB | Del tema; la landing no la usa |
| `aok-buenos-aires-400-italic` | 19 KB | Ya eliminada en el repo; falta publicar |
| `component-predictive-search.css` | 2 KB | Bloquea render; no hay buscador |
| Google Fonts · Public Sans | 1 KB | La piel del formulario la sobrescribe |

Solo lo que se puede quitar sin tocar el tema ni depender de Releasit —
la cursiva — son 19 KB. Con la respuesta de Releasit, 130 KB.

---

## 9. «¿Por qué 68% de carga de página? Con landings de imágenes teníamos 78-80%»

Reclamación del cliente (2026-08-28). La respuesta corta: **el % de carga de
página no mide si la página carga. Mide si el píxel dispara antes de que la
persona se vaya.** Y en esta tienda el píxel no empieza a descargarse hasta el
segundo 5,7.

### 9.1 Qué es realmente ese 68%

`Visitas a la landing ÷ Clics en el enlace`. La «visita a la landing» se registra
cuando dispara el `PageView` del píxel de Meta, que lo envía `fbevents.js`.

Cronología medida (Slow 4G, CPU 4×, dos ejecuciones):

| t | Peso | Qué pasa |
|---|---|---|
| 2,3–2,6 s | — | **FCP**: el titular, el precio y el CTA ya son legibles |
| 3,9–4,3 s | — | LCP: termina de pintarse el hero |
| 4,08 s | — | arranca el sandbox de Web Pixels de Shopify |
| **5,67–5,92 s** | **105 KB** | **empieza a bajar `fbevents.js`** |
| 7,72 s | 120 KB | configuración de señales de Meta |
| 8,34 s | — | primer evento de TikTok (`api/v2/pixel`) |

O sea: la persona puede estar **leyendo la landing desde el segundo 2,4** y aun
así no contar como visita hasta pasado el segundo 6. Ese hueco de ~3,5 s es
donde se pierde la mayor parte del 32%.

A eso se le suma lo que nunca se va a recuperar cambiando la landing:
ATT/ITP en iOS, bloqueadores, y clics accidentales en el anuncio.

### 9.2 Reparto real del peso

Primera entrada, sin scroll: **2.307 KB**, de los cuales la landing son
**122,5 KB — el 5,3%**. Aunque la landing pesara cero, el píxel seguiría
disparando en el segundo 5,7.

Página completa recorrida entera: **3.261 KB / 244 peticiones**

| Origen | Peticiones | Peso |
|---|---|---|
| Landing (imágenes + fuentes) | 42 | 1.151 KB |
| Releasit | 5 | 503 KB |
| Tracking y píxeles | 26 | 440 KB |
| Tema, apps y resto de Shopify | 171 | 1.167 KB |

### 9.3 La comparación directa: código vs. «diseñada»

Rastericé la landing **real** en tiras de pantalla completa, que es exactamente
lo que sería la versión hecha con imágenes, y las codifiqué en WebP:

| | Nuestra versión (código) | Versión rasterizada DPR 2 | Versión rasterizada DPR 3 |
|---|---|---|---|
| Peso total de la landing | **1.151 KB** | 1.171 KB | 1.843 KB |
| Primera pantalla | 106 KB (hero) | 90 KB (tira 1) | 144 KB (tira 1) |
| Texto legible en | **2,3–2,6 s (FCP)** | cuando llega la tira | cuando llega la tira |

Detalles del método: 21 tiras de 824×1646 (DPR 2) y de 1236×2469 (DPR 3),
WebP q75. En JPEG q80 — que es como se exportan normalmente — las mismas 21
tiras a DPR 2 pesan **2.451 KB**.

**Conclusión honesta: en bytes totales es un empate a DPR 2** (1.171 vs 1.151 KB).
La idea de que una landing de imágenes «pesa menos» es falsa. A DPR 3, que es lo
que tienen la mayoría de móviles actuales, la versión de imágenes pesa un **60%
más**.

**Y donde sí pierde de forma clara es en el primer pintado.** Hoy el texto se lee
a los 2,3–2,6 s porque está en el HTML, que ya llegó. En una landing de imágenes
no hay texto: no se lee nada hasta que baja y decodifica la primera tira. El hero
actual, del mismo tamaño y en la misma posición de la cola, termina a los 4,0 s.
Son **~1,5 s de pantalla en blanco añadidos**, justo en la ventana que decide el
rebote — y justo antes de que dispare el píxel.

### 9.4 Lo que sí subiría el número

Por orden de impacto, y ninguno tiene que ver con el formato de la landing:

1. Que Releasit deje de bajar 503 KB con el formulario cerrado (111 KB son fondos
   de una función apagada; ver §6).
2. Revisar si hacen falta Meta **y** TikTok cargando a la vez: 440 KB de tracking.
3. Fuente `archivoblack_n4` del tema (26 KB) y la cursiva ya eliminada en el repo
   pero aún publicada (19 KB); ver §8.3.

### 9.5 Cómo comparar bien

El 78-80% y el 68% no son comparables: distinto periodo, distinta audiencia,
distinto mix de dispositivos y distinto stack de apps. La única comparación que
demuestra algo es **el mismo tráfico, en el mismo periodo, repartido entre las
dos versiones**. Cualquier otra cosa es correlación.

---

## 10. Dónde tocar para subir el % de carga de página (2026-08-28)

### 10.0 La regla que ordena todo lo demás

El píxel arranca entre el **segundo 5,7 y el 7,2** (tres mediciones). **Solo cuenta
lo que carga antes de ese momento.** Todo lo que baja después no puede mover el
porcentaje, por mucho que pese.

Por delante del píxel hay **98 peticiones y 1.047 KB**:

| Origen | Peticiones | Peso | % de la cola |
|---|---|---|---|
| Releasit | 2 | 392 KB | **37%** |
| Landing (hero + fuentes) | 6 | 178 KB | 17% |
| Varios (WPM 71 · Archivo Black 26 · webmcp 19 · moneda 2) | 24 | 126 KB | 12% |
| Shopify plataforma (`shop-js`) | 43 | 112 KB | 11% |
| Tema | 4 | 96 KB | 9% |
| Analítica Shopify (trekkie 30 · perf-kit 23) | 14 | 67 KB | 6% |
| Documento HTML | 1 | 61 KB | 6% |
| GemPages | 2 | 11 KB | 1% |

### 10.1 Releasit — 388 KB, el 37% de la cola

`main-Bmp3jl8I.js` se declara como `<script type="module">` **sin `async`**, así
que el navegador lo pide en cuanto parsea la cabecera: arranca en el segundo 0,5
y ocupa la línea hasta el 5,6. Es, con diferencia, el mayor freno.

En `_RSI_COD_FORM_SETTINGS` no existe ninguna clave de carga diferida (las 23
claves están volcadas en `rsi-settings.json`). No es configurable desde el panel:
hay que pedírselo a soporte junto con lo del §6.

### 10.2 Tema — tres sitios concretos en `layout/theme.liquid`

La página **no renderiza ni cabecera ni pie**: solo tiene dos secciones, ambas de
GemPages. Todo lo que el tema carga para su propia cabecera sobra aquí.

**a) La precarga de Archivo Black — 25,8 KB, el arreglo más limpio.**
Justo después del `<link>` de `base.css` hay esto:

```html
<link rel="preload" as="font" type="font/woff2" crossorigin
  href="//www.mimacolombia.com/cdn/fonts/archivo_black/archivoblack_n4.b08d…woff2">
```

Comprobado: `base.css` **no menciona Archivo ni una vez**, y en la página hay
**0 elementos** cuya tipografía calculada sea Archivo Black. Solo existe como
`--font-heading-family` en los ajustes del tema. La fuente se descarga igualmente
porque un `preload` no pregunta si se usa. Llega en el segundo 1,58, en plena
ventana crítica.

Envolverlo en una condición para las plantillas de GemPages y listo.

**b) `component-predictive-search.css` — 1,9 KB, NO bloquea el render.**
Corrección de lo que dije en §8: el tema ya lo carga bien, con el patrón
`media="print" onload="this.media='all'"` (theme.liquid, líneas 360-367). Mi
lectura anterior salió de consultar el DOM cuando el `onload` ya había cambiado
`media` a `all`. Se puede quitar apagando la búsqueda predictiva en los ajustes,
pero es 1,9 KB y una petición, no un bloqueo.

**c) `base.css` (43,5 KB) + `shrine.null.js` (29,6 KB) + `secondary.js` (21 KB).**
94 KB de tema en una página con cero secciones de tema. Es el bloque más gordo
después de Releasit, pero también el más delicado: hay que probar si GemPages
depende de algún reset de `base.css` antes de condicionarlo.

### 10.3 Ajustes de Shopify (sin tocar código)

| Recurso | Peso | Dónde se controla |
|---|---|---|
| Gestor de Web Pixels | 71 KB | Configuración → Eventos de cliente |
| `shop-js` (Shop Pay / login) | 105 KB en 43 peticiones | Configuración → Pagos y canal Shop |
| `shopify-perf-kit` | 23 KB | monitorización de Shopify |
| `webmcp-0.1.1.js` | 19 KB | función nueva de Shopify |
| `shopify.jsdeliver.cloud/js/config.js` | 2 KB | ver 10.4 |

### 10.4 Revisar: `shopify.jsdeliver.cloud`

Script de terceros que se inyecta por JS (no está en el HTML). Devuelve un objeto
`Currency` con tasas de cambio de ~90 monedas. La tienda vende solo en COP.

El dominio **`jsdeliver.cloud` imita a `jsdelivr.net`**, que es el CDN legítimo.
Pesa poco, pero conviene identificar qué app lo mete y si hace falta.

### 10.5 Lo que NO va a mover el porcentaje

Ambas cosas cargan **después** del píxel. Bajan el peso total y ayudan en
PageSpeed, pero no en esta métrica:

| | Peso | Ventana |
|---|---|---|
| Los 3 `DownsellBg` | 111 KB | 7,08 s |
| Prefetch del checkout | **701 KB en 67 peticiones** | 7,3 → 23,5 s |

### 10.6 Ya resuelto

La cursiva `aok-buenos-aires-400-italic` **ya no carga** (verificado en producción
el 2026-08-28). 19 KB menos en la ventana de los 2,4 s.

---

## 11. Análisis de `layout/theme.liquid` (2026-08-28)

### 11.0 Qué parte del archivo llega a la landing

Comparando el HTML publicado de la home con el de la landing:

| Bloque de `theme.liquid` | Home | Landing |
|---|---|---|
| `<head>` completo (líneas 1-387) | sí | **sí** |
| `skip-to-content-link`, `header-group`, `footer-group` | sí | no |
| `promo-popup`, `scroll-to-top-btn`, `global-music-player` | sí | no |
| `window.cartStrings`, `initAnimations` | sí | no |
| `booster-page-speed-optimizer.js` (línea 525) | sí | no |
| Bloques `COD DEBUG` y `cod-debug` (líneas 527-552) | sí | no |

**CORRECCIÓN (2026-08-28, tras editar y publicar).** Lo anterior era una lectura
equivocada. La landing **no usa `layout/theme.liquid` en absoluto**: usa otro
archivo de layout, que es una copia antigua de esa cabecera.

Cadena de pruebas, usando como sonda el `@font-face` de Material Symbols —sale
del mismo `{% style %}` para todas las páginas— tras cambiarlo a `swap`:

| Página | `font-display` | `skip-to-content` | Layout |
|---|---|---|---|
| contact, mima-home, 404 | **swap** | sí | `theme.liquid` ✅ |
| landing-page-blank-aug-27 *(GemPages)* | **swap** | sí | `theme.liquid` ✅ |
| **sknglow-piel-firme** | **block** | no | **otro** ❌ |
| **cabello-unas** | **block** | no | **otro** ❌ |

Dos hipótesis descartadas por medición, no por razonamiento:

1. *Caché de página.* Descartada: otras páginas del mismo `PageDetailsController`
   sí se actualizaron, y 14 sondeos en 7,5 minutos con cache-buster no movieron nada.
2. *Instantánea de GemPages sin regenerar.* Descartada: se republicó la página
   (`publishedAt` pasó de `18:55:50Z` a `20:39:57Z`) y la cabecera siguió igual.

Lo que queda, y explica todas las observaciones: hay un **segundo archivo en
`layout/`** que sirve estas dos páginas. Es una copia de `theme.liquid` hecha
antes de que se añadiera el bloque `paid_landings` — por eso el `noindex` y el
`og:image` de esa landing **nunca se han aplicado**, ni antes ni ahora.

Los cambios de §11 hay que replicarlos en ese archivo. Se identifica al instante:
es el único de `layout/` que todavía dice `font-display: block`.

### 11.1 Cabecera — afecta a la landing

**Líneas 356-358 · la precarga de la fuente de titulares — 25,8 KB.** El punto
con mejor relación arreglo/riesgo. La variable `paid_landings` ya existe en la
línea 36:

```liquid
{%- unless settings.type_header_font.system? or paid_landings contains page.handle -%}
  <link rel="preload" as="font" href="{{ settings.type_header_font | font_url }}" type="font/woff2" crossorigin>
{%- endunless -%}
```

**Línea 15 + línea 386 · el conversor de moneda.**
`<script src="https://shopify.jsdeliver.cloud/js/config.js" defer>` más
`{% include 'bucks-cc' %}`. Devuelve tasas de ~90 monedas; la tienda vende en COP.
El dominio no tiene `preconnect`, así que paga DNS + TCP + TLS enteros. Llega en
el segundo 1,54. Además `include` está deprecado frente a `render`.

**Línea 11 · `preconnect` a `dashboard.shrinetheme.com`.** Sí se usa: el tema
llama a `/api/updates/check` **dos veces** en el segundo 4,55, en cada carga y
para cada visitante. Una comprobación de actualizaciones no pinta nada en el
escaparate.

**Líneas 12-13 · `preconnect` a `www.gstatic.com` y `fonts.gstatic.com`.**
En la landing no se pide **nada** de ninguno de los dos. Cada `preconnect` sin uso
gasta un handshake completo y ocupa una conexión.

**Líneas 54-55 · `shrine.null.js` (29,6 KB) + `secondary.js` (21 KB).** Van con
`defer`, así que no bloquean el parser, pero son 50,6 KB compitiendo por ancho de
banda antes del píxel, en una página sin interfaz de tema. Condicionarlos es más
delicado: hay que probar que ninguna sección de GemPages los necesite.

**Línea 351 · `base.css` con `preload: true`.** 43,5 KB con prioridad elevada.
Mismo caso y mismo riesgo que el anterior.

**Líneas 287-293 · Material Symbols con `font-display: block`.** En la landing no
se descarga. Donde sí se use, `block` deja los iconos invisibles hasta 3 s;
debería ser `swap`.

### 11.2 Cuerpo — no afecta a la landing, sí al resto de la tienda

**Línea 525 · `booster-page-speed-optimizer.js`.** Lo descargué: son 2.070 bytes
y el código es **instant.page** (prefetch de páginas al pasar el ratón o al tocar).
Dos problemas:

1. Está alojado en `cdn.shopify.com/s/files/1/0194/1736/6592/…`, que **no es esta
   tienda**. Quien controle esa tienda puede cambiar el archivo y ejecutar
   JavaScript en mimacolombia.com.
2. `script_tag` lo genera sin `defer` ni `async`, y en móvil el prefetch salta con
   `touchstart`: descarga páginas enteras que quizá nadie visite.

Si se quiere instant.page, que sea desde un asset del propio tema.

**Líneas 527-533 y 547-552 · bloques de depuración.** Vivos en la home. El
comentario `COD DEBUG` y el `<script id="cod-debug">` vuelcan metafields al HTML.

**Líneas 369-385 · `block_spy_tools`.** Ahora apagado (verificado: no aparece en el
HTML). Si se enciende: es un `<script>` en línea sin `defer`, o sea que **bloquea el
parser**, y arrastra dos fallos — redirige a `http://google.com/not-found` por HTTP
plano, y en la línea 377 quedó el marcador de posición
`window.location.href = "https://www.example.com/blocked.html"`, que enviaría a
example.com a cualquier visitante cuyo user-agent contenga esas cadenas.

**Líneas 494-524 · `disable_inspect`.** También apagado. Si se enciende,
`selectstart` con `preventDefault` **impide seleccionar texto** a todo el mundo.

---

## 12. Resultado del arreglo en `theme.gempages.blank.liquid` (2026-08-28)

El layout se identificó midiendo: se puso un marcador distinto en cada uno de los
cuatro y la landing devolvió `<!-- LAYOUT: gempages-blank -->`. `cabello-unas`, el
mismo.

### 12.1 Verificado en producción

| Marcador | Antes | Ahora |
|---|---|---|
| `font-display: block` | 1 | **0** |
| `<link rel="preload">` de Archivo Black | sí | **no** |
| `shopify.jsdeliver.cloud/js/config.js` | sí | **no** |
| Bloque inline `bucksCC` | sí | **no** |
| `preconnect` a `www.gstatic.com` | sí | **no** |
| `preconnect` a `fonts.gstatic.com` | sí | **no** |
| `<meta name="robots" content="noindex, follow">` | **no** | **sí** |
| `og:image` propio de la landing | **no** | **sí** |
| HTML del documento | 280,0 KB | **271,1 KB** |

### 12.2 Lo que NO se movió, y hay que decirlo

`fbevents.js` arrancó en **5,77 s** y **5,89 s** en dos ejecuciones. Antes: 5,67 /
5,92 / 7,20 s. **No hay mejora medible en el píxel.** Es coherente: se quitaron
unos 30 KB de los ~990 KB que van por delante, un 3%. La variación entre
ejecuciones es mayor que el ahorro.

El margen de verdad sigue donde estaba: los **388 KB de Releasit**, que son el 37%
de esa cola.

### 12.3 Archivo Black: quitar el preload no bastó

La fuente seguía descargándose, solo que más tarde (de 1,58 s a ~2,0 s), con
`initiator: parser` desde el documento. Contradictorio con lo medido en el DOM:
`document.fonts` la da como `unloaded` y **0 elementos** —incluidos pseudo-elementos
y shadow DOM— resuelven a esa familia. El único iframe es el sandbox de píxeles de
Shopify, cross-origin y sin contenido visible. No encontré la causa.

Se resolvió por la vía práctica, midiendo: se bloqueó la fuente y se compararon
8 pantallas píxel a píxel.

| Prueba | Pantallas distintas |
|---|---|
| Normal vs bloqueada | 1 de 8 (3.832 px, en el botón) |
| **Control: normal vs normal** | **1 de 8 (9.996 px, el mismo botón)** |

El control da *más* ruido que el test: es la animación `action-btns--glow` del CTA.
Descontado eso, **bloquear la fuente no cambia ni un píxel**.

Por eso el remate es no emitir el `@font-face` en las landings, no solo la
precarga. Aplicado en los dos layouts, pendiente de pegar. Son los 25,8 KB.

---

## 13. ¿Es obligatorio ese layout? Qué necesita de verdad la landing

### 13.1 La respuesta corta

Ese layout en concreto, no. **Algún** layout, sí: Shopify renderiza toda página
dentro de uno. Lo obligatorio no es el archivo, es su contenido mínimo:

| Obligatorio | Por qué |
|---|---|
| `{{ content_for_header }}` | Lo exige Shopify. Ahí inyecta la analítica, el gestor de Web Pixels y **todos los app embeds** — Releasit y GemPages entran por ahí. Sin esto no hay formulario COD. |
| `{{ content_for_layout }}` | Donde se pinta el contenido de la página. |
| `<html>` / `<head>` / `<body>` | El esqueleto. |

Todo lo demás de `theme.gempages.blank.liquid` es del tema. GemPages lo asignó al
ocultar cabecera y pie, y es una copia de `theme.liquid` con el cuerpo vaciado: por
eso arrastra recursos que esta landing no usa.

### 13.2 Lo que cuesta hoy

| Recurso | Peso |
|---|---|
| `base.css` | 43,5 KB |
| `shrine.null.js` + `secondary.js` | 50,6 KB |
| Bloque `{% style %}` de variables del tema (en línea) | 8,4 KB |
| `component-predictive-search.css` | 1,9 KB |
| **Total** | **~104 KB** |

### 13.3 Medido: qué pasa si no están

Bloqueando cada recurso y comparando 8 pantallas píxel a píxel, con umbral del 8%
para descartar el antialiasing:

| Condición | Alto del documento | Ancho | Formulario COD | Diferencia visual |
|---|---|---|---|---|
| Base | 16.773 px | 412 | ✅ | — |
| **Sin `shrine.null.js` + `secondary.js`** | **16.773 px** (idéntico) | 412 | ✅ | **ninguna**: caja de 1×1 px en la primera pantalla, y en la sexta la del botón animado (`action-btns--glow`), que el control ya daba |
| **Sin `base.css`** | 16.802 px (**+29 px**) | 412 | ✅ | **una caja de 29×56 px** (≈15×28 CSS px) en la primera pantalla, en la fila de iconos de pago |

En las cuatro condiciones `scrollWidth === clientWidth` (412), el formulario COD
sigue existiendo y los 7 CTA siguen ahí.

### 13.4 Lectura

Los **50,6 KB del JS del tema salen sin ninguna diferencia visual**. Es el recorte
limpio.

`base.css` son 43,5 KB por **un elemento de 15×28 px** y 29 px de alto en una
página de 16.773. Merece la pena, pero conviene mirarlo en pantalla antes.

Ninguno de los dos mueve el % de carga de página por sí solo: son 94 KB de los
~960 KB que van por delante del píxel. El 37% sigue siendo Releasit.

---

## 14. Recorte del tema en la landing: resultado (2026-08-28)

Aplicado en `theme.gempages.blank.liquid`, todo condicionado a `is_paid_landing`.
Fuera de la landing: `base.css`, `shrine.null.js`, `secondary.js`, el bloque
`{% style %}` del tema, `component-predictive-search.css`, Material Symbols. En su
lugar, tres reglas: `box-sizing`, `html { height: 100% }`, `body { margin: 0 }`.

| Medida | Al empezar | Ahora |
|---|---|---|
| HTML del documento | 280,0 KB | **261,7 KB** |
| Por delante del píxel | 98 pet · 1.047 KB | **65 pet · 863 KB** |
| Página completa | 182 pet · 2.307 KB | **158 pet · 2.091 KB** |
| `fbevents.js` | 5,67–7,20 s | 5,04 s |

Verificado tras el cambio: `scrollWidth === clientWidth` (412), formulario COD
presente, 7 CTA, `body { margin: 0 }` aplicado, tipografía AOK correcta.
Revisión visual de 8 pantallas: todo renderiza bien.

**Efecto secundario, menor.** El documento pasó de 16.773 a 16.493 px de alto
(−280 px, 1,7%). Causa localizada: el tema ponía `letter-spacing: 0.06rem` en
`body` y la landing lo heredaba; ahora el cómputo es `normal`. El texto va
ligeramente más junto y wrapea una línea menos en algunos párrafos. Si se quiere
el tracking anterior, va en el CSS de la landing —no en el layout— porque además
`html` ya no está a 62,5%, así que `0.06rem` no valdría lo mismo.

**No leer el 5,04 s de `fbevents` como una mejora.** El rango histórico es
5,04–7,20 s en siete ejecuciones. Lo que sí es firme son los bytes: **184 KB menos
por delante del píxel**, un 18% de esa cola.

---

## 15. Respuesta a soporte de Releasit: «¿A qué paquete te refieres?»

Contestaron en español preguntando eso. Respuesta lista para copiar. Va en español
porque es como escribieron ellos, e incluye la localización exacta en su bundle,
que es lo que convierte esto de «creemos que sobra» en «aquí está la línea».

```
Hola, gracias por responder.

Me refiero al archivo JavaScript de la app:

https://cdn.shopify.com/extensions/01a038fb-bef2-7641-ac4b-8e6c18a723b0/releasit-cod-form-443/assets/main-Bmp3jl8I.js

Son 388 KB y se descargan en cada carga de página, con el formulario cerrado y
sin que el visitante toque nada.

Tienda: mimacolombia.com
Página: https://www.mimacolombia.com/pages/sknglow-piel-firme
Versión: releasit-cod-form-443

Dos cosas concretas:


1. LOS TRES FONDOS DE DOWNSELL (111 KB) SE DESCARGAN SIEMPRE, INCLUSO CON LA
   FUNCIÓN APAGADA

DownsellBg0-BbeQyRVx.jpg (13 KB)
DownsellBg1-Vtx_D0HM.jpg (18 KB)
DownsellBg2-DWCVUhbc.jpg (80 KB)

Nuestra configuración tiene upsells.isEnabled = false. Comprobado sobre la página
ya cargada: 0 elementos del DOM los usan como background-image, 0 etiquetas <img>
los referencian y ninguna hoja de estilo los menciona. Aun así se descargan.

En vuestro bundle, en el offset 1.309.760, dentro del componente del formulario:

  const lt = useMemo(() => [image0, image1, image2], [])
  useEffect(() => {
    const preload = (u) => { const img = new Image(); img.src = u }
    if (zt.style.backgroundImage) preload(zt.style.backgroundImage)
    if (lt && lt.length > 0) lt.forEach(preload)
  }, [zt.style.backgroundImage, lt])

El array de dependencias es constante, así que el efecto se ejecuta una vez al
montar el componente — es decir, al cargar la página, con el modal cerrado. Y en
ningún punto consulta upsells.isEnabled.

¿Podéis condicionar ese forEach al mismo flag que ya gobierna la función?


2. ¿SE PUEDE CARGAR EL BUNDLE EN EL PRIMER CLIC AL BOTÓN COD?

form.deferLoading ya está en true y aun así arranca en el segundo 0,53. Se declara
como <script type="module"> en el <head>, así que el navegador lo pide con
prioridad alta en cuanto parsea la cabecera.

El 90% de nuestro tráfico es móvil. Medido con Chrome DevTools Protocol y la
emulación móvil de Lighthouse (CPU 4x, Slow 4G, caché desactivada), bloqueando
solo ese archivo y sin cambiar nada más:

             FCP        LCP
  Actual    2.420 ms   4.028 ms
  Bloqueado 1.684 ms   3.412 ms

Ya hemos limpiado todo lo que estaba en nuestra mano: la landing bajó de 2.307 KB
a 2.091 KB y de 98 a 65 peticiones antes de que dispare el píxel. Vuestro bundle
es ahora el 45% de lo que queda.

Queremos seguir con la app, el formulario nos convierte bien. Os paso el HAR si os
sirve.
```

---

## 16. Cómo funcionan los píxeles de Releasit (medido, 2026-08-28)

Instrumentando `window.fbq` y `window.ttq` con un Proxy antes de que cargue nada,
y recorriendo el flujo real sobre la página publicada.

### 16.1 Quién carga los píxeles

**Los carga Releasit, no el tema ni Shopify.** Bloqueando solo
`main-Bmp3jl8I.js`, sin tocar nada más:

| Recurso | Normal | Sin el bundle de Releasit |
|---|---|---|
| `connect.facebook.net/en_US/fbevents.js` | sí, 1,11 s | **no se carga** |
| `connect.facebook.net/signals/config/1369089581549099` | sí, 1,45 s | **no se carga** |
| `analytics.tiktok.com/i18n/pixel/events.js` | sí, 1,11 s | **no se carga** |
| `analytics.tiktok.com/api/v2/pixel` | sí, 1,63 s | **no se carga** |
| Sandbox de Web Pixels de Shopify | sí | sí |

El sandbox de Shopify sí carga en ambos casos, pero **no trae ningún píxel de
Meta**. Es decir: el único píxel de Meta que existe en esta landing lo inyecta
Releasit.

En el bundle está el código que lo hace: crea `window.fbq`, inserta
`connect.facebook.net/en_US/fbevents.js` y llama a `fbq("init", id)`. Para TikTok,
`ttq.load(id)` seguido de `ttq.page()`.

### 16.2 Cuándo dispara cada evento

| Momento | Evento | API |
|---|---|---|
| **Carga de página**, sin tocar nada | `fbq('init', 1369089581549099)` + `fbq('trackSingle', PageView)` | navegador |
| Carga de página | `ttq.load(CUP0KTBC77UE7K4ENLCG)` + `ttq.page()` | navegador |
| **Clic en el CTA** (se abre el formulario) | `InitiateCheckout` `{value: 129900, currency: COP, num_items: 2}` | navegador |
| Clic en el CTA, **en el mismo instante** | `AddToCart` con los mismos datos | navegador |
| **Primer campo que rellena el cliente** | `AddPaymentInfo` | navegador |
| Pedido confirmado | `Purchase` | navegador + servidor |

Dos cosas que no son obvias:

**`AddToCart` no es un «añadir al carrito».** Se dispara en el mismo `useCallback`
que `InitiateCheckout`, al abrir el formulario. Lo gobierna la casilla «Envía el
evento AddToCart a Facebook». Si en los informes de Meta se ve AddToCart e
InitiateCheckout con el mismo recuento y a la misma hora, es por esto.

**`AddPaymentInfo` se dispara al escribir en el primer campo**, no al pagar. En el
bundle: `if (!isAddInfoSent) { if (sendFill) { … 'AddPaymentInfo' } }`, dentro del
manejador de cambio de campo.

### 16.3 Navegador vs. servidor

- **Facebook Pixel** y **TikTok Pixel** son de navegador: los dispara el JS de
  Releasit desde el móvil del cliente.
- **Facebook Conversions API** y **TikTok Events API** son de servidor: los envía
  el backend de Releasit tras crear el pedido. Solo mandan `Purchase`.

El `Purchase` va por los dos caminos a propósito; Meta y TikTok deduplican por
`event_id`. No es un error.

### 16.4 Consecuencia: la pregunta 2 del correo a soporte es contraproducente

El mensaje preparado en §15 pedía **cargar el bundle en el primer clic al botón
COD**. Con lo medido aquí, eso sería un tiro en el pie:

Si el bundle no carga hasta el clic, **`fbevents.js` tampoco carga hasta el clic**,
y el `PageView` de Meta no se dispara nunca para quien no haga clic. El «% Carga de
página» —que es justo `visitas ÷ clics en el anuncio`— se hundiría.

**Hay que quitar esa pregunta antes de enviar.**

El orden correcto es el inverso:

1. Primero sacar el píxel de Meta de Releasit y ponerlo donde cargue solo: el canal
   de Meta de Shopify, o un píxel personalizado en Configuración → Eventos de
   cliente. Así el `PageView` deja de depender de 388 KB.
2. Solo entonces tiene sentido pedirle a Releasit que difiera el bundle.

### 16.5 A revisar en la configuración

En la pestaña de Píxeles hay **dos entradas de TikTok Events API** con IDs
distintos (`8f4f467b42e5bcf…` y `dbcb7289a535f6b…`). Si son dos cuentas de
anunciante distintas, correcto. Si son la misma, cada pedido manda `Purchase` dos
veces al servidor de TikTok.

### 16.6 Límite de esta medición

No se observó la petición saliente `facebook.com/tr` en headless, ni siquiera en la
condición normal. Las llamadas a `fbq(...)` sí se observaron directamente. Puede
ser un artefacto del headless o del consentimiento; no se confirmó la entrega final
del evento a Meta.

### 16.7 Tras quitar los píxeles de TikTok (2026-08-28)

No había campañas activas ahí. Medido después:

| | Antes | Ahora |
|---|---|---|
| Página completa | 2.091 KB · 158 pet | **1.933 KB · 156 pet** |
| Por delante del píxel | 863 KB | 865 KB |
| `fbevents.js` | — | 5,31 s |

Los 158 KB de TikTok cargaban **después** de `fbevents.js`, así que no tocan el
% de carga de página. Sí bajan el peso total y los datos que gasta el cliente.

Eventos que quedan, verificados en vivo:

| Momento | Evento |
|---|---|
| Carga de página, sin tocar nada (0,22 s sin throttling) | `PageView` |
| Clic en el CTA | `InitiateCheckout` + `AddToCart` |
| Primer campo rellenado | `AddPaymentInfo` |
| Pedido confirmado | `Purchase` |

### 16.8 Confirmado en navegador real (2026-08-28)

La primera lectura en el Chrome del usuario no mostraba `fbevents.js` y `fbq.version`
seguía en `"2.0"` — el stub que crea Releasit antes de traer el píxel. Causa: un
bloqueador de anuncios en su perfil. En incógnito, con las extensiones apagadas:

| Recurso | Empieza | Termina | Peso |
|---|---|---|---|
| `main-CPtg0rMR.css` | 0,35 s | 0,37 s | (caché) |
| `main-Bmp3jl8I.js` | 0,35 s | **0,69 s** | 387,5 KB |
| `fbevents.js` | **0,82 s** | 1,01 s | 105,3 KB |
| `signals/config/1369089581549099` | 1,04 s | 1,09 s | 120,6 KB |
| `DownsellBg0/1/2.jpg` | 1,66 s | 1,73 s | 108,8 KB |

`fbevents.js` arranca 0,13 s después de que termine el bundle de Releasit. La
cadena queda demostrada en un navegador normal, no solo en headless.

Estas cifras son de escritorio con buena conexión. Con el perfil móvil de
PageSpeed, `fbevents.js` arranca en el segundo 5,3.

**Nota para el % de carga de página:** el bloqueador del usuario impedía que el
píxel cargara. A una parte de los clientes reales les pasa lo mismo: llegan a la
landing y nunca se cuentan. Ese trozo del 32% no se arregla desde la web.

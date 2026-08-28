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

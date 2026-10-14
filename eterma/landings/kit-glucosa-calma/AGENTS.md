# AGENTS.md — KIT GLUCOSA EN CALMA

Contexto de producto. Hereda de `/AGENTS.md` (global) y de `/eterma/AGENTS.md` (marca), y **manda sobre
los dos** en caso de conflicto. Es la **tercera de la tanda nueva de kits (2026-09-16)** y sigue la línea
«Eterma viva» que estrenó [`kit-reset-digestivo`](../kit-reset-digestivo/AGENTS.md): misma columna
vertebral, **hero, pieza interactiva y CTA propios**.

---

## 1. El producto

Kit de **tres bebidas de 1 litro con vaso medidor**, con el ángulo de la glucosa: **TODO EN UNO**
(colágeno, pepino y resveratrol), **CLOROFULL** (clorofila, pectina y polidextrosa) y **ADVANCE** (té
verde y alcachofa, alrededor del momento posterior al almuerzo). Las tres: 30 ml al día, 33 dosis por
botella.

Copy aprobado: [`copy kit glucosa en calma [3].txt`](copy%20kit%20glucosa%20en%20calma%20%5B3%5D.txt).
**El copy manda.**

> **Sección de autoridad rehecha el 2026-09-17** con
> [`../copy correcciones autoridad kits [2026-09-17].txt`](../copy%20correcciones%20autoridad%20kits%20%5B2026-09-17%5D.txt), que **manda sobre el copy aprobado
> en esa sección concreta**. El resto de la landing sigue el copy original.

### Dos cosas que hay que confirmar antes de publicar

| Qué | Cómo está en la landing | Por qué |
|---|---|---|
| **Precio** | Anticipado **$119.900** · contraentrega **$129.900** · ahorro $10.000 | El copy trae `$[PRECIO REGULAR]` y `$[PRECIO ANTICIPADO]`. Se toma el esquema de los kits (`/eterma/AGENTS.md` §1). Si el cliente da otras cifras, se cambian en cuatro sitios: oferta, cierre, sticky y cinta |
| **Producto de Shopify** | `PRODUCT_HANDLE = 'kit-glucosa-en-calma'` | El kit **no existe** en `/products.json` (leído el 2026-09-16). Al crearlo, poner el handle real; de él dependen las ofertas de cantidad de Releasit en una landing de `/pages/` |

Envío gratis, entrega **3 a 5 días hábiles**, reenvío sin costo o devolución si se pagó anticipado.
WhatsApp de atención **300 696 4582**. **Sin bono, sin order bump ni upsell**.

- **Este es el copy con más límites de toda la tanda.** Habla de HbA1c, metformina, insulina, berberina,
  heridas en el pie y complicaciones en ojos, pies y corazón. Cada uno de esos bloques dice
  explícitamente que el kit **no reemplaza tratamiento**; esa frase va **dentro** del bloque, nunca en
  letra pequeña, y el pie lo repite: «este kit no trata ni previene la diabetes».
- **Sin testimonios**: el copy no trae citas, así que la tira de personas va sin frases.
- Registros: **Todo en Uno, Clorofull y Advance, INVIMA RSA-0029174-2023** (el copy escribe «RS-…»; se
  publica el de la etiqueta).
- Dirección del fabricante: **Carrera 59 # 5B-31** (la de la etiqueta). El copy escribe «#5-B31».
- Comparte los tres productos con **Rejuvenece**: lo que las separa es el ángulo, el motivo y la piel de
  la página, no el contenido de la caja.

---

## 2. Motivo propio: la montaña rusa que se calma

- **El titular lleva la curva.** Bajo «montaña rusa» hay una línea de picos amarilla que se desvanece y
  deja una curva verde suave, en bucle. Es el ángulo del kit dibujado: *menos montaña rusa*. Son dos SVG
  superpuestos que cruzan su `opacity`; no se anima ninguna forma.
- **Hero: el turno tranquilo.** Las cuatro fotos —el kit y cada producto— **se pasan solas cada 4,2 s**,
  con un botón de pausa y cuatro marcas que dicen por dónde va. **No hay puntos de carrusel.** Se paran
  al tocar la foto, con el botón, al salir de pantalla y con `prefers-reduced-motion`. Sin JS son cuatro
  fotos en fila deslizable con scroll-snap.
- **El CTA es «la curva»**: píldora lima con la misma línea del titular al final del texto, picos que dan
  paso a la curva. Al pasar el dedo, la banda de lima más viva barre **de derecha a izquierda**.
- **«Comes. Te da sueño. Después quieres dulce.»** Las tres frases del bajón entran **desde arriba** y
  cada una con más sangría que la anterior: el bajón, dibujado con márgenes.
- **«¿Te suena?» es una conversación**: lo que dice la clienta en una burbuja de color con su icono, y la
  respuesta debajo en una burbuja blanca. Sin interacción y sin JS: se lee de corrido. (En Reset
  Digestivo las notas se marcan; en Mujer Saciada se abren; aquí simplemente se responden.)
- **El bloque en verde profundo es uno solo**: «Ni más pastillas por tu cuenta. Ni promesas de abandonar
  las que necesitas.»
- **«El número importa»** son tres tarjetas —ojos, pies, corazón— con el icono en disco de color.
- **La investigación va en fichas con etiqueta**: «evidencia de baja certeza», «27 ensayos clínicos»,
  «advertencia del CDC». La etiqueta es **la frase del copy**, no una puntuación inventada.
- **Caja = cuatro azulejos** de color (no el tique de Reset Digestivo ni las filas de Mujer Saciada).
- **El precio va en la primera pantalla**: banda `.gc-deal` encima del CTA, con **$119.900 en píldora
  verde profundo y «anticipado» en lima** y el contraentrega al lado, en gris. Es regla común a las cinco
  (`/eterma/AGENTS.md` §2). Para dejarle sitio, **el trío de píldoras de producto baja bajo el CTA**
  en móvil y vuelve arriba a partir de 900 px.
- **Confianza al final**: Visa, Mastercard y PSE donde se ofrece el anticipado (oferta, cierre y pie)
  y **la cuenta de Instagram justo antes del pie**, enmarcada en **té verde**. Ficheros compartidos por
  toda la marca, no de este kit (`/eterma/AGENTS.md` §2).

Colores: **uva** para Todo en Uno (el resveratrol viene de la uva; la botella es verde salvia, pero la
gama ya tiene dos verdes), **menta** para Clorofull, **té verde** para Advance y **amarillo** para el
bajón de energía. La cinta superior va en menta.

---

## 3. Convenciones de código

- **Prefijo `gc-`.** Raíz `.gc-lp` con `id="gc-kit-glucosa-calma"`. Tokens de marca `--et-*` y de layout
  `--gc-*`. Todo en px. Sin estilos en línea.
- Tokens nuevos de la línea: **`--et-grape #ddd2f0` / `--et-grape-soft #f3eefb`** (Todo en Uno) y
  **`--et-tea #bfe6dd` / `--et-tea-soft #e6f5f2`** (Advance).
- Tipografía: **Fraunces 600** en titulares y **Questrial** en cuerpo, por `@font-face` desde el CDN.
- Script: `ROOT_SELECTOR`, `READY_FLAG = 'gcLandingReady'`, `PRODUCT_HANDLE`,
  `RELEASIT_PRODUCT_CACHE_ID`, `TURN_MS = 4200`, más `initPlayback`, `initPeopleHold`, `initTurn`,
  `initReveal`, `initSticky`, `initReleasitProductCache`.
- **`initReleasitProductCache()`**: rellena el JSON del producto cuando la landing se publica como página
  (`docs/releasit-form-styling.md` §4.4).
- `gp-product` y `#_rsi-buy-now-button-floating` se sacan del flujo, nunca `display: none`.
- Los CTA llevan `_rsi-cod-form-gempages-button-overwrite _rsi-cod-form-is-gempage`.
- **Vista previa local:** `./preview.sh eterma/landings/kit-glucosa-calma/general/september.html`. Las
  tres imágenes propias del kit están **pendientes de subir** (§5).

---

## 4. Personas: nombres reales

| Foto (CDN) | Persona | Producto |
|---|---|---|
| `landings-kit-dia-liviano-ugc-celeste.webp` | Celeste | Clorofull |
| `landings-kit-dia-liviano-ugc-valentina.webp` | Valentina | Clorofull |
| `landings-kit-dia-liviano-ugc-maria-fernanda.webp` | María Fernanda | Clorofull |
| `landings-kit-dia-liviano-ugc-joselin.webp` | Joselin | Advance |
| `landings-kit-dia-liviano-ugc-advance-pour.webp` | sin identificar | Advance |
| `landings-kit-dia-liviano-ugc-advance-3.webp` | sin identificar | Advance |
| `landings-kit-piel-viva-ugc-todo-en-uno-1/2/3.webp` | sin identificar | Todo en Uno |

Las de Todo en Uno y Advance sin nombre van **sin nombre**: se compararon contra el pool de Clorofull el
2026-09-06 y no coinciden. No se inventan.

---

## 5. Imágenes

| Archivo | Medidas | Dónde |
|---|---|---|
| `landings-kit-glucosa-calma-hero.webp` | 1200 × 1200 | Primera foto del turno del hero |
| `landings-kit-glucosa-calma-kit.webp` | 1000 × 1434 | «Todo el kit» |
| `landings-kit-glucosa-calma-mecanismo.webp` | 1000 × 1000 | Lámina de «Lo que dice la investigación» |

**Por subir a Contenido → Archivos: 3.** Las botellas, los vasitos y las nueve fotos de personas ya están
en el CDN con los nombres de Día Liviano y Piel Viva: se reutilizan, no se vuelven a subir.

**Además, cuatro ficheros compartidos** que **no son de este kit** y se suben una sola vez para toda
la marca: `landings-shared-pay-visa/-mastercard/-pse.webp` y `landings-shared-instagram.webp`
(`/eterma/shared/assets/`, ver `/eterma/AGENTS.md` §2).

---

## 6. Medidas (vista previa local, 2026-09-17)

Con el precio ya dentro de la primera pantalla (banda `.deal` encima del CTA):

| Ancho | Precio del hero | CTA del hero | Alto de página | Desborde |
|---|---|---|---|---|
| 360×740 | dentro | **675–733 px**, entero en la primera pantalla | 13 623 px | ninguno |
| 390×844 | dentro | **737–795 px**, entero en la primera pantalla | 13 424 px | ninguno |
| 1280 | dentro | — | 12 199 px | ninguno |

- Comprobado también a **412×915**: sin desbordes y el CTA dentro.
- Con el copy nuevo de la **sección de autoridad** (2026-09-17), aplicado **tal cual**: sin desbordes
  ni texto cortado a 360, 390 ni 1280, y los párrafos se leen enteros sin JavaScript.
- **El sticky sale a 460 px de scroll** a 390×844 (~0,5 pantallas). Antes esperaba a que el CTA
  del hero saliera del todo, casi una pantalla entera.
- `check-css-merge.mjs`: **sin cambios** a 390 y 1280 (346 reglas, 20 fusiones simuladas).
- Comprobado con el reloj en marcha: el turno pasa solo (kit → Todo en Uno) y el botón lo para; con la
  pausa puesta la foto no se mueve en cinco segundos y el rótulo cambia a «Pasar las fotos».
- Comprobado sin JavaScript: la banda del precio se ve, **los medios de pago y el Instagram también**,
  los CTA visibles y el sticky fuera.
- El sticky se queda fuera en el cierre, en el Instagram y en el pie: sin añadir `.gc-social` a la cola
  reaparecía sobre el banner.
- Fuentes computadas: titulares Fraunces, cuerpo Questrial.

---

## 7. Pendientes

1. Subir las 3 imágenes (§5) y pasar `check-cdn.sh`.
2. Subir los **4 ficheros compartidos** de §5 (pagos + Instagram), salvo que ya los haya subido otra
   landing: son los mismos para toda la marca.
3. Crear el kit en Shopify, poner su handle en `PRODUCT_HANDLE` y enlazarlo en el Product Element.
4. Confirmar precios (§1).
5. Pegar en el Custom Code de GemPages, **en sus tres pestañas**: `./split-tabs.sh` genera
   `september.tab-html.html`, `september.tab-css.css` y `september.tab-js.js` (`/eterma/AGENTS.md` §2).
   Detrás del CSS va [`/eterma/shared/releasit-form.css`](../../shared/releasit-form.css), en esa misma pestaña.
6. **No publicar sin pedirlo el cliente.**

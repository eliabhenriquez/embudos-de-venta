# AGENTS.md — KIT REJUVENECE

Contexto de producto. Hereda de `/AGENTS.md` (global) y de `/eterma/AGENTS.md` (marca), y **manda sobre
los dos** en caso de conflicto. Es la **quinta y última de la tanda nueva de kits (2026-09-16)** y sigue
la línea «Eterma viva» que estrenó [`kit-reset-digestivo`](../kit-reset-digestivo/AGENTS.md): misma
columna vertebral, **hero, pieza interactiva y CTA propios**.

---

## 1. El producto

Kit de **tres bebidas de 1 litro con vaso medidor**, con el ángulo de la movilidad y la piel: **TODO EN
UNO** (colágeno, pepino y resveratrol), **ADVANCE** (té verde y alcachofa, después del almuerzo) y
**CLOROFULL** (clorofila, pectina y polidextrosa). Las tres: 30 ml al día, 33 dosis por botella.

Copy aprobado: [`copy kit rejuvenece [5].txt`](copy%20kit%20rejuvenece%20%5B5%5D.txt). **El copy manda.**

> **Sección de autoridad rehecha el 2026-09-17** con
> [`../copy correcciones autoridad kits [2026-09-17].txt`](../copy%20correcciones%20autoridad%20kits%20%5B2026-09-17%5D.txt), que **manda sobre el copy aprobado
> en esa sección concreta**. El resto de la landing sigue el copy original.

### Tres cosas que hay que confirmar antes de publicar

| Qué | Cómo está en la landing | Por qué |
|---|---|---|
| **Precio** | Anticipado **$119.900** · contraentrega **$129.900** · ahorro $10.000 | El copy trae `$[PRECIO REGULAR]` y `$[PRECIO ANTICIPADO]`. Se toma el esquema de los kits (`/eterma/AGENTS.md` §1) |
| **Colágeno 2% + pepino 1% + resveratrol 1%** | Publicado tal cual, en píldora dentro de la ficha de Todo en Uno | El copy lo marca con «*Validar porcentajes contra etiqueta vigente antes de publicar*». **Son porcentajes de composición: hay que cotejarlos con la etiqueta antes de publicar.** En Piel Viva y en Duerme y Florece se optó por no darlos; aquí el copy los pide, así que van, pero marcados como pendiente |
| **Producto de Shopify** | `PRODUCT_HANDLE = 'kit-rejuvenece'` | El kit **no existe** en `/products.json` (leído el 2026-09-16). Al crearlo, poner el handle real |

Envío gratis, entrega **3 a 5 días hábiles**, reenvío sin costo o devolución si se pagó anticipado.
WhatsApp de atención **300 696 4582**. **Sin bono, sin order bump ni upsell.**

- **La sección de autoridad ya no lleva línea de límite.** La corrección de copy del 2026-09-17 la
  reescribió sin ella, y el copy manda: donde antes cada ficha cerraba con lo que el kit no hace —que los
  estudios de colágeno no se trasladan a Todo en Uno, que no elimina arrugas, que el resveratrol no
  superó al placebo—, ahora va el tercer párrafo del copy. **Los límites del kit siguen vivos** en la
  sección de señales médicas y en el pie.
- **Cuatro señales médicas** (dolor intenso, heridas que no cierran, úlceras por presión, cambios en la
  piel) van en su propia sección, con el límite dentro: «el Kit Rejuvenece no previene ni trata cáncer
  de piel».
- **Sin testimonios**: la tira de personas va sin frases.
- Registros: **Todo en Uno, Clorofull y Advance, INVIMA RSA-0029174-2023** (el copy escribe «RS-…»).
- Dirección del fabricante: **Carrera 59 # 5B-31** (la de la etiqueta).
- Comparte los tres productos con **Glucosa en Calma**: lo que las separa es el ángulo, el motivo y la
  piel de la página.

---

## 2. Motivo propio: los tres verbos

- **El titular son tres verbos que se encienden**: *Levantarte. Caminar. Moverte con más comodidad.* Cada
  línea entra desde la izquierda y sube su opacidad medio segundo después que la anterior, en bucle. Son
  los primeros movimientos del día, hechos tipografía. Es el único hero de la tanda **sin carrusel ni
  fichas**: una sola foto, porque el peso lo lleva el titular.
- **El CTA es «los pasos»**: píldora lima con **tres pasos que avanzan** al final del texto (tres barritas
  que se desplazan y se encienden en cadena). Al pasar el dedo, la banda de lima más viva entra
  **deslizándose desde la izquierda**, como quien empieza a caminar.
- **Las mañanas entran desde la izquierda**, cada frase con un poco más de sangría: el cuerpo que va
  despertando. Cierra con «Tu movilidad también merece atención» en uva.
- **«¿Te suena?» es un carril con flechas y cuenta «1/5»**, con la siguiente tarjeta asomando. **Sin
  puntos.** La cuenta es lo que dice por dónde vas. Sin JS se desliza con el dedo y las flechas no
  aparecen. (Duerme y Florece usa el mismo carril **sin** flechas; aquí las lleva porque las tarjetas son
  más densas y conviene poder avanzar sin gesto.)
- **El bloque en verde profundo es uno solo**: «Fuerza y movilidad significan independencia», con las
  seis acciones del copy en píldoras translúcidas e icono en lima.
- **Las fichas de la ciencia llevan etiqueta**: «11 ensayos · 870 participantes», «resultados que
  varían», «investigación en curso». La etiqueta sale del copy, así que cambió con la corrección del
  2026-09-17: las dos últimas decían «metaanálisis dividido» y «sin diferencia frente al placebo»
  porque el copy anterior lo decía. **Si vuelve a cambiar el copy, la etiqueta cambia con él.**
- **Caja = filas de color** con el disco de cantidad.
- **El precio va en la primera pantalla**: banda `.rj-deal` encima del CTA, con **$119.900 en píldora
  verde profundo y «anticipado» en lima** y el contraentrega al lado, en gris. Es regla común a las cinco
  (`/eterma/AGENTS.md` §2).
- **Confianza al final**: Visa, Mastercard y PSE donde se ofrece el anticipado (oferta, cierre y pie)
  y **la cuenta de Instagram justo antes del pie**, enmarcada en **uva**. Ficheros compartidos por
  toda la marca, no de este kit (`/eterma/AGENTS.md` §2).

Colores: **uva** para Todo en Uno (resveratrol), **menta** para Clorofull, **té verde** para Advance,
**rubor** para la piel y **amarillo** para las mañanas. La cinta superior va en uva.

---

## 3. Convenciones de código

- **Prefijo `rj-`.** Raíz `.rj-lp` con `id="rj-kit-rejuvenece"`. Tokens de marca `--et-*` y de layout
  `--rj-*`. Todo en px. Sin estilos en línea.
- Tipografía: **Fraunces 600** en titulares y **Questrial** en cuerpo, por `@font-face` desde el CDN.
- Script: `ROOT_SELECTOR`, `READY_FLAG = 'rjLandingReady'`, `PRODUCT_HANDLE`,
  `RELEASIT_PRODUCT_CACHE_ID`, más `initPlayback`, `initPeopleHold`, `initCases`, `initReveal`,
  `initSticky`, `initReleasitProductCache`.
- **`initCases()`** centra la tarjeta pedida y recalcula la cuenta al deslizar; en escritorio las
  primeras tarjetas ya están centradas y la flecha no mueve el carril, solo avanza la cuenta.
- `gp-product` y `#_rsi-buy-now-button-floating` se sacan del flujo, nunca `display: none`.
- Los CTA llevan `_rsi-cod-form-gempages-button-overwrite _rsi-cod-form-is-gempage`.
- **Vista previa local:** `./preview.sh eterma/landings/kit-rejuvenece/general/september.html`. Las tres
  imágenes propias del kit están **pendientes de subir** (§5).

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

---

## 5. Imágenes

| Archivo | Medidas | Dónde |
|---|---|---|
| `landings-kit-rejuvenece-hero.webp` | 1200 × 1200 | Foto del hero |
| `landings-kit-rejuvenece-kit.webp` | 1000 × 1444 | «Todo el kit» |
| `landings-kit-rejuvenece-mecanismo.webp` | 1000 × 1000 | Lámina de «Colágeno» |

**Por subir a Contenido → Archivos: 3.** Botellas, vasitos y fotos de personas ya están en el CDN con los
nombres de Día Liviano y Piel Viva.

**Además, cuatro ficheros compartidos** que **no son de este kit** y se suben una sola vez para toda
la marca: `landings-shared-pay-visa/-mastercard/-pse.webp` y `landings-shared-instagram.webp`
(`/eterma/shared/assets/`, ver `/eterma/AGENTS.md` §2).

---

## 6. Medidas (vista previa local, 2026-09-17)

Con el precio ya dentro de la primera pantalla (banda `.deal` encima del CTA):

| Ancho | Precio del hero | CTA del hero | Alto de página | Desborde |
|---|---|---|---|---|
| 360×740 | dentro | **677–735 px**, entero en la primera pantalla | 13 165 px | ninguno |
| 390×844 | dentro | **715–773 px**, entero en la primera pantalla | 12 843 px | ninguno |
| 1280 | dentro | — | 11 338 px | ninguno |

- Comprobado también a **412×915**: sin desbordes y el CTA dentro.
- Con el copy nuevo de la **sección de autoridad** (2026-09-17), aplicado **tal cual**: sin desbordes
  ni texto cortado a 360, 390 ni 1280, y los párrafos se leen enteros sin JavaScript.
- **El sticky sale a 440 px de scroll** a 390×844 (~0,5 pantallas). Antes esperaba a que el CTA
  del hero saliera del todo, casi una pantalla entera.
- `check-css-merge.mjs`: **sin cambios** a 390 y 1280 (339 reglas, 27 fusiones simuladas).
- Comprobado con clics reales: la flecha pasa la cuenta de 1/5 a 2/5 y el carril centra la tarjeta.
- Comprobado sin JavaScript: la banda del precio se ve, **los medios de pago y el Instagram también**,
  los CTA visibles y el sticky fuera.
- El sticky se queda fuera en el cierre, en el Instagram y en el pie: sin añadir `.rj-social` a la cola
  reaparecía sobre el banner.
- Fuentes computadas: titulares Fraunces, cuerpo Questrial.

---

## 7. Pendientes

1. Subir las 3 imágenes (§5) y pasar `check-cdn.sh`.
2. Subir los **4 ficheros compartidos** de §5 (pagos + Instagram), salvo que ya los haya subido otra
   landing: son los mismos para toda la marca.
3. **Validar los porcentajes de Todo en Uno contra la etiqueta vigente** (§1).
4. Crear el kit en Shopify, poner su handle en `PRODUCT_HANDLE` y enlazarlo en el Product Element.
5. Confirmar precios (§1).
6. Pegar en el Custom Code de GemPages, **en sus tres pestañas**: `./split-tabs.sh` genera
   `september.tab-html.html`, `september.tab-css.css` y `september.tab-js.js` (`/eterma/AGENTS.md` §2).
   Detrás del CSS va [`/eterma/shared/releasit-form.css`](../../shared/releasit-form.css), en esa misma pestaña.
7. **No publicar sin pedirlo el cliente.**

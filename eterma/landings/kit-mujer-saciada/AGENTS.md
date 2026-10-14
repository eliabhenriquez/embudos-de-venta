# AGENTS.md — KIT MUJER SACIADA

Contexto de producto. Hereda de `/AGENTS.md` (global) y de `/eterma/AGENTS.md` (marca), y **manda sobre
los dos** en caso de conflicto. Es la **segunda de la tanda nueva de kits (2026-09-16)** y sigue la línea
«Eterma viva» que estrenó [`kit-reset-digestivo`](../kit-reset-digestivo/AGENTS.md): misma columna
vertebral, **hero, pieza interactiva y CTA propios**.

---

## 1. El producto

Kit de **un desayuno en polvo y dos bebidas de 1 litro con vaso medidor**, con el ángulo de la saciedad:
**VITA-ADVANCE** (proteína aislada de soya, avena y glucomanano, en la mañana, 4 cucharadas de 60 g en
200 ml de agua), **ADVANCE** (té verde y alcachofa, después del almuerzo) y **CLOROFULL** (clorofila,
pectina y polidextrosa, durante el día). Las dos bebidas: 30 ml al día, 33 dosis por botella.

Copy aprobado: [`copy kit mujer saciada [2].txt`](copy%20kit%20mujer%20saciada%20%5B2%5D.txt). **El copy manda.**

> **Sección de autoridad rehecha el 2026-09-17** con
> [`../copy correcciones autoridad kits [2026-09-17].txt`](../copy%20correcciones%20autoridad%20kits%20%5B2026-09-17%5D.txt), que **manda sobre el copy aprobado
> en esa sección concreta**. El resto de la landing sigue el copy original.

### Tres cosas que hay que confirmar antes de publicar

| Qué | Cómo está en la landing | Por qué |
|---|---|---|
| **Precio** | Anticipado **$119.900** · contraentrega **$129.900** · ahorro $10.000 | El copy trae `$[PRECIO REGULAR]` y `$[PRECIO ANTICIPADO]`. Se toma el esquema de los kits (`/eterma/AGENTS.md` §1). Si el cliente da otras cifras, se cambian en cuatro sitios: oferta, cierre, sticky y cinta |
| **23 g de proteína y 5,2 g de fibra** | Publicado tal cual, en píldora dentro de la ficha de Vita-Advance | El copy lo marca con «*Validar valores contra ficha vigente antes de publicar*». **Es una declaración nutricional: hay que cotejarla con la ficha técnica antes de publicar**, no después |
| **Producto de Shopify** | `PRODUCT_HANDLE = 'kit-mujer-saciada'` | El kit **no existe** en `/products.json` (leído el 2026-09-16). Al crearlo, poner el handle real; de él dependen las ofertas de cantidad de Releasit en una landing de `/pages/` |

Envío gratis, entrega **3 a 5 días hábiles**, reenvío sin costo o devolución si se pagó anticipado.
WhatsApp de atención **300 696 4582**. **Sin bono, sin order bump ni upsell**: el copy no los trae.

- **Sin testimonios**: el copy no trae citas, así que la tira de personas va **sin frases**, solo nombre
  real y producto.
- Registros: **Clorofull y Advance, INVIMA RSA-0029174-2023**; **Vita-Advance, INVIMA NSA-0013091-2022**
  (el copy escribe «RS-…»; se publica el de la etiqueta, como en los demás kits).
- Dirección del fabricante: **Carrera 59 # 5B-31** (la de la etiqueta). El copy escribe «#5-B31».
- El copy habla de **premenopausia, SOP e hígado graso** y en los tres casos dice explícitamente que el
  kit no trata nada de eso. Esos límites van **dentro** de la respuesta, no en letra pequeña.

---

## 2. Motivo propio: el nivel que sube

Dentro de la línea «Eterma viva», este kit se apoya en la promesa del titular —*más saciedad, menos
picoteo*— y en los colores de sus productos: **amarillo** (mañana, Vita-Advance), **menta** (día,
Clorofull) y **té verde** (después del almuerzo, Advance), con el **rubor** de la foto del hero y la
**lima** para la acción.

- **Hero: la bandeja.** Una foto grande y cuatro fichas circulares debajo —el kit y cada producto— que la
  cambian. El rótulo va en banda propia **debajo de la foto**, nunca encima. **Sin JS son cuatro fotos en
  fila deslizable con scroll-snap**; el script las apila y deja mandar a las fichas (patrón de pestañas:
  `role="tab"` + `role="tabpanel"`). En móvil la ficha se queda solo en la miniatura —el nombre lo dice el
  rótulo de la bandeja, justo encima— y reaparece a partir de 600 px.
- **«saciedad» se llena.** Un marcador amarillo crece de izquierda a derecha detrás de la palabra, en
  bucle. Es la promesa del titular, no un adorno.
- **El CTA es «el nivel»**: píldora lima con sombra sólida y **tres barras que suben una tras otra**, como
  un nivel que se llena. Al pasar el dedo o el ratón, una banda de lima más viva sube por la píldora
  (`scaleY`, no `scaleX` como en Reset Digestivo). Solo `transform` y `opacity`.
- **«¿Te suena?» se abre.** Las seis situaciones son fichas plegadas que **se abren con un toque**
  (`role="button"`, `aria-expanded`) porque cada una tiene su respuesta en el copy. Sin JS están las seis
  abiertas y se leen seguidas. (En Reset Digestivo las notas se *marcan*; aquí se *abren*.)
- **Las barras de la evidencia.** En «La saciedad también se construye», cada ingrediente lleva una barra
  que se llena al entrar en pantalla y **llega hasta donde llega la evidencia**: proteína 92 %, fibra 80 %,
  té verde 28 %. No es un dato inventado, es la jerarquía que dice el copy («efectos modestos sobre el
  peso corporal»). Sin JS las barras ya están puestas: el script las vacía (`is-armed`) y las llena.
  **Esta sección ya no lleva línea de fuentes**: la corrección de copy del 2026-09-17 no la trae, y el
  copy manda. Harvard y los NIH siguen citados por su nombre dentro del texto.
- **El bloque en verde profundo es uno solo**: «¿Derrite grasa? No funciona así.» Es la pausa seria.
- **La secuencia** numerada 1-2-3 sustituye al recorrido ondulado de Reset Digestivo: tres fichas grandes
  en el orden del copy (mañana, después del almuerzo, durante el día).
- **Caja = lista de empaque**: filas de color con el disco de cantidad, junto a la foto del kit (no el
  tique troquelado de Reset Digestivo).
- **El precio va en la primera pantalla**: banda `.ms-deal` encima del CTA, con **$119.900 en píldora
  verde profundo y «anticipado» en lima** y el contraentrega al lado, en gris. Es regla común a las cinco
  (`/eterma/AGENTS.md` §2). Para dejarle sitio, **el trío de píldoras de producto baja bajo el CTA**
  en móvil y vuelve arriba a partir de 900 px.
- **Confianza al final**: Visa, Mastercard y PSE donde se ofrece el anticipado (oferta, cierre y pie)
  y **la cuenta de Instagram justo antes del pie**, enmarcada en **amarillo**. Ficheros compartidos por
  toda la marca, no de este kit (`/eterma/AGENTS.md` §2).

---

## 3. Convenciones de código

- **Prefijo `ms-`.** Raíz `.ms-lp` con `id="ms-kit-mujer-saciada"`. Tokens de marca `--et-*` y de layout
  `--ms-*`. Todo en px. Sin estilos en línea.
- Token nuevo de la línea: **`--et-tea #bfe6dd` / `--et-tea-soft #e6f5f2`** para ADVANCE. La botella real
  es gris; el color sale de la fórmula (té verde) porque el gris es justo lo que el cliente pidió quitar.
- Tipografía: **Fraunces 600 (SOFT 100, WONK 0)** en titulares y **Questrial** en cuerpo, las dos por
  `@font-face` desde el CDN de la tienda.
- Script: `ROOT_SELECTOR`, `READY_FLAG = 'msLandingReady'`, `PRODUCT_HANDLE`,
  `RELEASIT_PRODUCT_CACHE_ID`, más `initPlayback`, `initPeopleHold`, `initTray`, `initCases`, `initBars`,
  `initReveal`, `initSticky`, `initReleasitProductCache`.
- **`initReleasitProductCache()`**: si la landing se publica como página (`/pages/…`), Releasit no pinta
  las ofertas de cantidad porque su JSON de producto sale `null`; la función lo rellena con
  `/products/<handle>.js` (`docs/releasit-form-styling.md` §4.4).
- `gp-product` y `#_rsi-buy-now-button-floating` se sacan del flujo desde este bloque, nunca
  `display: none`.
- Los CTA llevan `_rsi-cod-form-gempages-button-overwrite _rsi-cod-form-is-gempage` y el texto dentro de
  `<span class="ms-cta__label">`.
- **Vista previa local:** `./preview.sh eterma/landings/kit-mujer-saciada/general/september.html` y nada
  más: **las tres imágenes del kit ya están en el CDN** (§5). No se reescriben a rutas locales.

---

## 4. Personas: nombres reales

Las fotos son las mismas que ya identificaron Día Liviano y Del Tinto a la Almohada contra
`/humanized-images/clorofull/`. **Sin cita**, porque el copy no trae testimonios.

| Foto (CDN) | Persona | Producto |
|---|---|---|
| `landings-kit-tinto-almohada-ugc-natalia.webp` | Natalia | Vita-Advance |
| `landings-kit-dia-liviano-ugc-celeste.webp` | Celeste | Clorofull |
| `landings-kit-dia-liviano-ugc-joselin.webp` | Joselin | Advance |
| `landings-kit-dia-liviano-ugc-valentina.webp` | Valentina | Clorofull |
| `landings-kit-dia-liviano-ugc-maria-fernanda.webp` | María Fernanda | Clorofull |
| `landings-kit-tinto-almohada-ugc-vita-advance-1.webp` | sin identificar | Vita-Advance |
| `landings-kit-tinto-almohada-ugc-vita-advance-3.webp` | sin identificar | Vita-Advance |
| `landings-kit-dia-liviano-ugc-advance-pour.webp` | sin identificar | Advance |
| `landings-kit-dia-liviano-ugc-advance-3.webp` | sin identificar | Advance |

Las que no están identificadas van **sin nombre**: no se inventan ni se reasignan nombres del pool a
otras caras.

---

## 5. Imágenes

Propias del kit (optimizadas a WebP desde los originales, que viven fuera de git en
`product-images/kit-mujer-saciada/`):

| Archivo | Medidas | Dónde |
|---|---|---|
| `landings-kit-mujer-saciada-hero.webp` | 1200 × 1200 | Bandeja del hero y miniatura de la ficha |
| `landings-kit-mujer-saciada-kit.webp` | 1000 × 1199 | «Todo el kit» |
| `landings-kit-mujer-saciada-mecanismo.webp` | 1000 × 1000 | Lámina de «La saciedad también se construye» |

**Nada por subir.** Comprobado el 2026-09-16: las tres responden `200` en el CDN y son exactamente estas
imágenes. El resto (botellas, vasitos, tarro de Vita-Advance y las nueve fotos de personas) ya está con
los nombres de Día Liviano, Del Tinto a la Almohada y Piel Viva: se reutilizan tal cual.

**Además, cuatro ficheros compartidos** que **no son de este kit** y se suben una sola vez para toda
la marca: `landings-shared-pay-visa/-mastercard/-pse.webp` y `landings-shared-instagram.webp`
(`/eterma/shared/assets/`, ver `/eterma/AGENTS.md` §2).

---

## 6. Medidas (vista previa local, 2026-09-17)

Con el precio ya dentro de la primera pantalla (banda `.deal` encima del CTA):

| Ancho | Precio del hero | CTA del hero | Alto de página | Desborde |
|---|---|---|---|---|
| 360×740 | dentro | **677–735 px**, entero en la primera pantalla | 11 547 px | ninguno |
| 390×844 | dentro | **723–781 px**, entero en la primera pantalla | 11 362 px | ninguno |
| 1280 | dentro | — | 10 024 px | ninguno |

- Comprobado también a **412×915**: sin desbordes y el CTA dentro.
- Con el copy nuevo de la **sección de autoridad** (2026-09-17), aplicado **tal cual**: sin desbordes
  ni texto cortado a 360, 390 ni 1280, y los párrafos se leen enteros sin JavaScript.
- **El sticky sale a 460 px de scroll** a 390×844 (~0,5 pantallas). Antes esperaba a que el CTA
  del hero saliera del todo, casi una pantalla entera.
- `check-css-merge.mjs`: **sin cambios** a 390 y 1280 (342 reglas, 14 fusiones simuladas).
- Comprobado con clics reales: la bandeja pasa del kit a Clorofull, las situaciones abren y cierran
  (`aria-expanded` false → true) y las barras de evidencia llegan a 0,92 · 0,80 · 0,28.
- Comprobado sin JavaScript: la banda del precio se ve, **los medios de pago y el Instagram también**,
  los CTA visibles y el sticky fuera.
- El sticky se queda fuera en el cierre, en el Instagram y en el pie: sin añadir `.ms-social` a la cola
  reaparecía sobre el banner.
- Fuentes computadas: titulares Fraunces, cuerpo Questrial.

---

## 7. Pendientes

1. ~~Subir las 3 imágenes (§5)~~ — ya estaban en el CDN; `check-cdn.sh` da todo `ok`.
2. Subir los **4 ficheros compartidos** de §5 (pagos + Instagram), salvo que ya los haya subido otra
   landing: son los mismos para toda la marca.
3. **Validar «23 g de proteína y 5,2 g de fibra» contra la ficha vigente** (§1).
4. Crear el kit en Shopify, poner su handle en `PRODUCT_HANDLE` y enlazarlo en el Product Element.
5. Confirmar precios (§1).
6. Pegar en el Custom Code de GemPages, **en sus tres pestañas**: `./split-tabs.sh` genera
   `september.tab-html.html`, `september.tab-css.css` y `september.tab-js.js` (`/eterma/AGENTS.md` §2).
   Detrás del CSS va [`/eterma/shared/releasit-form.css`](../../shared/releasit-form.css), en esa misma pestaña.
7. **No publicar sin pedirlo el cliente.**

# AGENTS.md — KIT RESET DIGESTIVO

Contexto de producto. Hereda de `/AGENTS.md` (global) y de `/eterma/AGENTS.md` (marca), y **manda sobre
los dos** en caso de conflicto. Es **el primero de la tanda nueva de kits (2026-09-15)** y estrena la
línea visual «Eterma viva»: la que siguen los demás kits nuevos (Mujer Saciada, Glucosa en Calma,
Duerme y Florece, Rejuvenece). Lo que aquí se decide como *línea* está resumido en
[`/eterma/AGENTS.md`](../../AGENTS.md) §2; lo que es de **este** kit está abajo.

---

## 1. El producto

Kit de **un desayuno en polvo y dos bebidas de 1 litro con vaso medidor**, con el ángulo de la
digestión: **VITA-ADVANCE** (proteína, avena y glucomanano, en la mañana, 4 cucharadas en 200 ml de
agua), **CLOROFULL** (clorofila, pectina y polidextrosa, durante el día) y **MULTIBRINA** (manzanilla,
toronjil, hierbabuena y mejorana, al final del día). Las dos bebidas: 30 ml al día, 33 dosis por botella.

Copy aprobado: [`copy kit reset digestivo [1].txt`](copy%20kit%20reset%20digestivo%20%5B1%5D.txt). **El copy
manda**; el copywriter rehízo los ángulos y esta es la versión buena.

> **Sección de autoridad rehecha el 2026-09-17** con
> [`../copy correcciones autoridad kits [2026-09-17].txt`](../copy%20correcciones%20autoridad%20kits%20%5B2026-09-17%5D.txt), que **manda sobre el copy aprobado
> en esa sección concreta**. El resto de la landing sigue el copy original.

### Dos cosas que hay que confirmar antes de publicar

| Qué | Cómo está en la landing | Por qué |
|---|---|---|
| **Precio** | Anticipado **$119.900** · contraentrega **$129.900** · ahorro $10.000 | El copy trae `$[PRECIO REGULAR]` y `$[PRECIO ANTICIPADO]`. Se toma el esquema de los kits anteriores (`/eterma/AGENTS.md` §1), y en concreto el de **Del Tinto a la Almohada**, que lleva **los mismos tres productos**. Si el cliente da otras cifras, se cambian en cuatro sitios: oferta, cierre, sticky y cinta |
| **Producto de Shopify** | `PRODUCT_HANDLE = 'kit-reset-digestivo'` | El kit **todavía no existe** en `/products.json` (leído el 2026-09-15). Al crearlo, poner el handle real; de él dependen las ofertas de cantidad de Releasit en una landing de `/pages/` |

Envío gratis, entrega **3 a 5 días hábiles**, reenvío sin costo o devolución si se pagó anticipado.
WhatsApp de atención **300 696 4582**. **Sin bono, sin order bump ni upsell**: el copy no los trae.

- **Sin testimonios**: este copy no trae citas, así que la tira de personas va **sin frases**, solo
  nombre real y producto. No se inventan citas ni se reciclan las de otros kits.
- Registros: **Clorofull y Multibrina, INVIMA RSA-0029174-2023**; **Vita-Advance, INVIMA
  NSA-0013091-2022** (el copy escribe «RS-…»; se publica el de la etiqueta, como en los demás kits, y el
  NSA sigue pendiente de cotejar contra la etiqueta vigente).
- Dirección del fabricante: **Carrera 59 # 5B-31** (la de la etiqueta). El copy escribe «#5-B31».

---

## 2. Motivo propio: el movimiento

Dentro de la línea «Eterma viva», este kit se apoya en la promesa del titular —*más movimiento*— y en
los tres colores de sus productos: **amarillo** (mañana, Vita-Advance), **menta** (día, Clorofull) y
**cielo** (final del día, Multibrina), con el **rubor** de la foto del hero y la **lima** para la acción.

- **Hero: la baraja.** Cuatro cartas —el kit y una por producto—, cada una con su color y su rótulo en
  banda propia **debajo de la foto**, nunca encima. La de arriba se lanza hacia la izquierda y pasa al
  fondo; se avanza tocando la carta, deslizando o con las flechas, que van sobre la banda del rótulo
  para no tapar producto. **Sin JS es una fila deslizable con scroll-snap**: el script solo la apila
  (`is-stacked`) y coloca cada carta por su posición (`data-rd-pos`, 0-3 y `out`).
- **El logo, sin cabecera.** No hay barra superior con el wordmark centrado (petición del cliente:
  «es repetitivo y aburrido»). El logo firma el hero **pequeño y a la izquierda**, junto a la píldora
  con el nombre del kit, y **reaparece gigante en el pie**, a todo el ancho. La **hoja de tres pétalos**
  se separa del wordmark y hace de separador en la cinta superior. Todo en vector, extraído de
  `docs/branding.pdf` a [`/eterma/shared/eterma-wordmark.svg`](../../shared/eterma-wordmark.svg) e
  incrustado como `<symbol>` + `<use>`: las letras toman `color` y la hoja, `fill`.
- **«Movimiento» lleva una ola** que corre bajo la palabra (translateX en bucle, en pausa fuera de
  pantalla).
- **Tres momentos = el recorrido del día.** Una línea ondulada une las tres paradas; cada marcador
  crece al entrar en pantalla. En móvil la línea es vertical y la foto va en miniatura junto al nombre
  (al lado del texto la columna se quedaba en 160 px); en escritorio la línea es horizontal y las tres
  paradas van en columnas.
- **«¿Te suena?» es interactivo.** Las seis situaciones son notas de colores ladeadas que **se marcan
  con un toque** (`role="button"`, `aria-pressed`) y una línea arriba cuenta «Marcaste 2 de 6». No hay
  puntuación, diagnóstico ni recomendación: solo el reflejo, que es lo que dice el copy. Sin JS son
  notas quietas y legibles.
- **Los ingredientes van en pestañas** (Avena + glucomanano · Glucomanano · Hierbabuena) alrededor de la
  lámina del cliente, recortada en círculo. Sin JS, las tres fichas se leen seguidas.
- **El bloque en verde profundo es uno solo**: «Antes de buscar algo "fuerte"…». Es la pausa seria de la
  página y por eso los cinco hábitos saltan ahí en fichas de color.
- **El CTA es «el movimiento»**: píldora lima con sombra sólida (pegatina) y **tres burbujas que se
  inflan una tras otra** al final del texto, como una ola que avanza. Al pasar el dedo o el ratón, una
  banda de lima más viva barre la píldora y las burbujas se desplazan. Solo `transform` y `opacity`; se
  sirve y se pausa con `is-playing`; sin JS es una píldora quieta; con `prefers-reduced-motion` las
  burbujas se quedan fijas.
- **Caja = tique**: lo que llega se lista como un tique de caja con el borde de abajo troquelado, montado
  sobre la foto del kit.
- **El precio va en la primera pantalla**: banda `.rd-deal` encima del CTA, con **$119.900 en píldora
  verde profundo y «anticipado» en lima** y el contraentrega al lado, en gris. Es regla común a las cinco
  (`/eterma/AGENTS.md` §2). Para dejarle sitio, **el trío de píldoras de producto baja bajo el CTA**
  en móvil y vuelve arriba a partir de 900 px.
- **Confianza al final**: Visa, Mastercard y PSE donde se ofrece el anticipado (oferta, cierre y pie)
  y **la cuenta de Instagram justo antes del pie**, enmarcada en **menta**. Ficheros compartidos por
  toda la marca, no de este kit (`/eterma/AGENTS.md` §2).

---

## 3. Convenciones de código

- **Prefijo `rd-`.** Raíz `.rd-lp` con `id="rd-kit-reset-digestivo"`. Tokens de marca `--et-*` y de
  layout `--rd-*`. Todo en px. Sin estilos en línea.
- Tipografía: **Fraunces 600 (SOFT 100, WONK 0)** en titulares y **Questrial** en cuerpo, las dos por
  `@font-face` desde el CDN de la tienda. Si Fraunces no está subida, los titulares caen a la serif del
  tema: la página no se rompe, solo pierde calidez.
- **Los `<span>` no llevan regla por etiqueta**: heredan de su contenedor (en las landings anteriores una
  regla `.lp span` obligaba a redeclarar la serif pieza por pieza).
- Script: `ROOT_SELECTOR`, `READY_FLAG = 'rdLandingReady'`, `PRODUCT_HANDLE`,
  `RELEASIT_PRODUCT_CACHE_ID`, más `initPlayback`, `initDeck`, `initRoute`, `initCheck`, `initTabs`,
  `initReveal`, `initSticky`, `initReleasitProductCache`.
- **`initReleasitProductCache()`**: si la landing se publica como página (`/pages/…`), Releasit no pinta
  las ofertas de cantidad porque su JSON de producto sale `null`; la función lo rellena con
  `/products/<handle>.js`. No hace nada en una ficha de producto (`docs/releasit-form-styling.md` §4.4).
- `gp-product` y `#_rsi-buy-now-button-floating` se sacan del flujo desde este bloque, nunca
  `display: none`.
- Los CTA llevan `_rsi-cod-form-gempages-button-overwrite _rsi-cod-form-is-gempage` y el texto dentro de
  `<span class="rd-cta__label">`.
- **Vista previa local:** `./preview.sh eterma/landings/kit-reset-digestivo/general/september.html` y
  nada más. Desde el 2026-09-16 los 20 ficheros (18 imágenes + las 2 fuentes) están subidos a
  Contenido → Archivos y `check-cdn.sh` los da todos `ok`, así que la vista previa tira del CDN igual
  que producción. **No reescribir a rutas locales**: un `file://` dentro de una página servida por
  http (la vista del IDE) lo bloquea el navegador y las fotos salen vacías.
- Si alguna vez hay que previsualizar un asset todavía sin subir, se reescribe solo ese nombre y se
  deshace al terminar; el `.preview.html` es derivado y se regenera, nunca se edita a mano.

---

## 4. Personas: nombres reales

Las fotos son las mismas que ya identificaron Día Liviano y Del Tinto a la Almohada contra
`/humanized-images/clorofull/`. **Sin cita**, porque el copy no trae testimonios.

| Foto (CDN) | Persona | Producto |
|---|---|---|
| `landings-kit-dia-liviano-ugc-celeste.webp` | Celeste | Clorofull |
| `landings-kit-tinto-almohada-ugc-natalia.webp` | Natalia | Vita-Advance |
| `landings-kit-dia-liviano-ugc-maria-de-los-angeles.webp` | María de los Ángeles | Multibrina |
| `landings-kit-dia-liviano-ugc-valentina.webp` | Valentina | Clorofull |
| `landings-kit-dia-liviano-ugc-gabriela.webp` | Gabriela | Multibrina |
| `landings-kit-dia-liviano-ugc-maria-fernanda.webp` | María Fernanda | Clorofull |
| `landings-kit-dia-liviano-ugc-victor.webp` | Victor | Multibrina |
| `landings-kit-tinto-almohada-ugc-vita-advance-{1,3}.webp` | sin identificar | Vita-Advance, sin nombre |

`clorofull ugc 4` (Luciana) **no se usa**: trae un rótulo de descuento incrustado.

---

## 5. Imágenes

Optimizadas en [`assets/`](assets/); las crudas del cliente, en `/product-images/kit-reset-digestivo/`,
fuera de git. **Solo hay tres nuevas**: el resto se sirve del CDN con los nombres que ya publicaron Día
Liviano (Clorofull y Multibrina) y Del Tinto a la Almohada (Vita-Advance), sin copia local ni nueva
subida; por eso `check-cdn.sh` las lista como «no está en el repo».

```sh
./check-cdn.sh eterma/landings/kit-reset-digestivo/general/september.html
```

| Archivo | Origen | Uso |
|---|---|---|
| `landings-kit-reset-digestivo-hero.webp` | `img-hero-kit reset digestivo.png` (1254²), a 1200 | Primera carta de la baraja, LCP |
| `landings-kit-reset-digestivo-kit.webp` | `img-kit reset digestivo.jpeg`, a 1000×1265 | «Todo el Kit» |
| `landings-kit-reset-digestivo-mecanismo.webp` | `img-mecanismo-kit reset digestivo.png`, a 1000 | Lámina de ingredientes, recortada en círculo |
| `fraunces-600-soft.woff2` | Google Fonts (OFL), instancia estática latina, 18 KB | Titulares de toda la línea nueva |

**Subidas el 2026-09-16**: los 20 ficheros responden `200` en el CDN (`check-cdn.sh`).

**Además, cuatro ficheros compartidos** que **no son de este kit** y se suben una sola vez para toda
la marca: `landings-shared-pay-visa/-mastercard/-pse.webp` y `landings-shared-instagram.webp`
(`/eterma/shared/assets/`, ver `/eterma/AGENTS.md` §2).

---

## 6. Medidas (vista previa local, 2026-09-17)

Con el precio ya dentro de la primera pantalla (banda `.deal` encima del CTA):

| Ancho | Precio del hero | CTA del hero | Alto de página | Desborde |
|---|---|---|---|---|
| 360×740 | dentro | **665–723 px**, entero en la primera pantalla | 10 346 px | ninguno |
| 390×844 | dentro | **699–757 px**, entero en la primera pantalla | 10 355 px | ninguno |
| 1280 | dentro | — | 9 265 px | ninguno |

- Comprobado también a **412×915**: sin desbordes y el CTA dentro.
- Con el copy nuevo de la **sección de autoridad** (2026-09-17), aplicado **tal cual**: sin desbordes
  ni texto cortado a 360, 390 ni 1280, y los párrafos se leen enteros sin JavaScript.
- **El sticky sale a 420 px de scroll** a 390×844 (~0,5 pantallas). Antes esperaba a que el CTA
  del hero saliera del todo, casi una pantalla entera.
- `check-css-merge.mjs`: **sin cambios** a 390 y 1280 (355 reglas, 17 fusiones simuladas).
- Comprobado por clic: la baraja avanza (`0,1,2,3` → `3,0,1,2`) y el aviso dice «Vita-Advance», las
  notas cuentan («Marcaste 2 de 6») y las pestañas cambian de panel y de `aria-selected`.
- Comprobado sin JavaScript: la banda del precio se ve, **los medios de pago y el Instagram también**,
  los CTA visibles y el sticky fuera.
- El sticky se queda fuera en el cierre, en el Instagram y en el pie: sin añadir `.rd-social` a la cola
  reaparecía sobre el banner.
- Fuentes computadas: titulares Fraunces, cuerpo Questrial.

---

## 7. Pendientes

1. ~~Subir los 4 archivos (§5)~~ — hecho el 2026-09-16, `check-cdn.sh` los da todos `ok`.
2. Subir los **4 ficheros compartidos** de §5 (pagos + Instagram), salvo que ya los haya subido otra
   landing: son los mismos para toda la marca.
3. Crear el kit en Shopify, poner su handle en `PRODUCT_HANDLE` y enlazarlo en el Product Element.
4. Confirmar precios (§1) y el registro NSA de Vita-Advance.
5. Pegar en el Custom Code de GemPages, **en sus tres pestañas**: `./split-tabs.sh` genera
   `september.tab-html.html`, `september.tab-css.css` y `september.tab-js.js` (`/eterma/AGENTS.md` §2).
   Detrás del CSS va [`/eterma/shared/releasit-form.css`](../../shared/releasit-form.css), en esa misma pestaña.
6. **No publicar sin pedirlo el cliente.**

# AGENTS.md — KIT DUERME Y FLORECE

Contexto de producto. Hereda de `/AGENTS.md` (global) y de `/eterma/AGENTS.md` (marca), y **manda sobre
los dos** en caso de conflicto.

> **Rehecha el 2026-09-16.** El copywriter rehízo los ángulos y esta landing se reconstruyó entera con la
> línea «Eterma viva» que estrenó [`kit-reset-digestivo`](../kit-reset-digestivo/AGENTS.md). La versión
> de la primera tanda (carrusel de la ventana de noche, notas de mesa de noche, etiqueta de frasco)
> **queda anulada**; lo único que sobrevive de aquella es el producto de Shopify, que es el mismo. **Es
> el único kit de la tanda nueva que ya existe en la tienda.**

---

## 1. El producto

Kit de **dos bebidas de 1 litro con vaso medidor y un frasco de gotas**: **MULTIBRINA** (manzanilla,
toronjil, hierbabuena y mejorana, al final del día), **VALERIANA** en gotas (tensión ocasional y el
momento previo a dormir, diluida en agua según la presentación) y **TODO EN UNO** (colágeno, pepino y
resveratrol, cuidado diario de piel, cabello, uñas y articulaciones). Las dos bebidas: 30 ml al día, 33
dosis por botella.

Copy aprobado: [`general/copy kit duerme y florece [4].txt`](general/copy%20kit%20duerme%20y%20florece%20%5B4%5D.txt).
**El copy manda.**

> **Sección de autoridad rehecha el 2026-09-17** con
> [`../copy correcciones autoridad kits [2026-09-17].txt`](../copy%20correcciones%20autoridad%20kits%20%5B2026-09-17%5D.txt), que **manda sobre el copy aprobado
> en esa sección concreta**. El resto de la landing sigue el copy original.

**Producto de Shopify (verificado el 2026-09-16 en `/products.json`):** handle **`kit-duerme-y-florece`**,
variante `64093190914417`, precio $129.900, que **coincide con el contraentrega del copy**. Ese handle ya
está puesto en `PRODUCT_HANDLE`: aquí no hay nada provisional.

| | Anticipado | Contraentrega |
|---|---|---|
| Kit | **$119.900** (ahorras $10.000) | **$129.900** |

Envío gratis, entrega **3 a 5 días hábiles**, reenvío sin costo o devolución si se pagó anticipado.
WhatsApp de atención **300 696 4582**. **Sin bono, sin order bump ni upsell.**

- **Los porcentajes de TODO EN UNO se quedan fuera**, como en Piel Viva: el copy nuevo tampoco los da.
  La landing dice «colágeno, pepino y resveratrol».
- **VALERIANA no lleva registro sanitario**: el copy dice literalmente «registro sanitario no comunicado
  hasta validación específica» y **así va en el pie**, sin inventar nada. Tampoco se da una dosis en
  gotas: «siguiendo la cantidad indicada en la presentación».
- Registros de las dos bebidas: **INVIMA RSA-0029174-2023**.
- **El copy es de los más delicados**: microsueños al conducir, alucinaciones por privación de sueño,
  demencia, diabetes, salud mental. Cada bloque dice **qué no hace el kit**, y el pie lo repite: «este
  kit no trata el insomnio ni otros trastornos del sueño».
- **Sin testimonios**: la tira de personas va sin frases.

---

## 2. Motivo propio: apagar el día

- **Hero con interruptor, al lado del titular.** El interruptor —«Apagar el día»— **baja la luz de toda
  la sección**: el fondo pasa a verde casi negro, el titular a hueso y el subtítulo a lima. **La foto no
  se toca** y las píldoras de los frascos siguen claras, con su texto oscuro. Es el titular, hecho gesto.
  Empieza encendido, se puede volver atrás y **sin JS el botón no aparece**.
  **Va en la misma fila que «Apaga el día»** (pedido del cliente el 2026-09-16, para ahorrar alto): el
  `<h1>` y el botón comparten un `.df-h1row` con `flex-wrap`, así que si no cabe el interruptor baja
  solo. Para caber en el móvil **habla por iconos**: sol y luna dentro del carril, y el que asoma es el
  estado al que vas. **El rótulo vuelve a partir de 640 px**; debajo, el nombre accesible lo lleva el
  `aria-label` del botón, que el JS cambia junto con el estado.
- **«día» lleva un halo** ámbar detrás que se apaga y se vuelve a encender en bucle (solo `opacity` y
  `transform`); de noche se queda casi apagado.
- **El CTA es «la luna que crece»**: píldora lima con **tres fases de luna** que se encienden una tras
  otra al final del texto. Al pasar el dedo, la banda de lima más viva se abre **desde el centro**
  (`scale`), no barre de lado como en las otras.
- **Los pensamientos se apagan.** En «Tu cuerpo llegó a la cama», las cuatro frases entran con **más
  sangría y menos luz** cada una (opacidad 1 → 0,58). Es la cabeza que no para, dibujada.
- **«¿Te suena?» es un carril de cinco tarjetas** que se pasan deslizando, con la siguiente asomando por
  el borde. **Sin puntos y sin flechas**: el gesto es el deslizamiento, y el carril es un `role="group"`
  enfocable con teclado.
- **El bloque en verde profundo es uno solo**: «Dormir poco no termina cuando suena la alarma», con
  cerebro, metabolismo y corazón en tarjetas translúcidas y su límite en cada una.
- **La advertencia de la falta de sueño extrema** va en tarjeta de rubor con borde, aparte del bloque
  oscuro: es una señal médica, no una sección de venta.
- **Caja = filas de color** con el disco de cantidad.
- **El precio va en la primera pantalla**: banda `.df-deal` encima del CTA, con **$119.900 en píldora
  verde profundo y «anticipado» en lima** y el contraentrega al lado, en gris. Es regla común a las cinco
  (`/eterma/AGENTS.md` §2).
- **Confianza al final**: Visa, Mastercard y PSE donde se ofrece el anticipado (oferta, cierre y pie)
  y **la cuenta de Instagram justo antes del pie**, enmarcada en **cielo**. Ficheros compartidos por
  toda la marca, no de este kit (`/eterma/AGENTS.md` §2).

Colores: **cielo** para Multibrina, **ámbar** para el frasco de Valeriana, **uva** para Todo en Uno, y
**menta** y **rubor** de apoyo. La cinta superior va en cielo.

---

## 3. Convenciones de código

- **Prefijo `df-`.** Raíz `.df-lp` con `id="df-kit-duerme-florece"`. Tokens de marca `--et-*` y de layout
  `--df-*`. Todo en px. Sin estilos en línea.
- Token nuevo de la línea: **`--et-amber #f6dcb0` / `--et-amber-soft #fdf3e4`** (Valeriana).
- Tipografía: **Fraunces 600** en titulares y **Questrial** en cuerpo, por `@font-face` desde el CDN.
- Script: `ROOT_SELECTOR`, `READY_FLAG = 'dfLandingReady'`, `PRODUCT_HANDLE`,
  `RELEASIT_PRODUCT_CACHE_ID`, más `initPlayback`, `initPeopleHold`, `initSwitch`, `initReveal`,
  `initSticky`, `initReleasitProductCache`.
- **Contraste del modo noche**: solo se recolorea lo que queda sobre el fondo oscuro. Lo que sigue siendo
  claro —las píldoras de los frascos, el rótulo de la foto, la pegatina ámbar— **mantiene su texto
  oscuro**. Si se añade algo al hero, comprobar los dos estados. La píldora del precio hace lo mismo: de
  día verde profundo con el importe en blanco, de noche hueso con el importe en verde.
- `gp-product` y `#_rsi-buy-now-button-floating` se sacan del flujo, nunca `display: none`.
- Los CTA llevan `_rsi-cod-form-gempages-button-overwrite _rsi-cod-form-is-gempage`.
- **Vista previa local:** `./preview.sh eterma/landings/kit-duerme-florece/general/september.html`. Solo
  falta subir la lámina (§5); el resto ya responde del CDN. Las imágenes de la primera tanda
  (`landings-kit-duerme-florece-hero-kit.webp`, `-kit-podium.webp`, `-mecanismo.webp`) **ya no se usan**,
  pero no se borran: el CDN cachea por nombre.

---

## 4. Personas: nombres reales

| Foto (CDN) | Persona | Producto |
|---|---|---|
| `landings-kit-dia-liviano-ugc-maria-de-los-angeles.webp` | María de los Ángeles | Multibrina |
| `landings-kit-dia-liviano-ugc-gabriela.webp` | Gabriela | Multibrina |
| `landings-kit-dia-liviano-ugc-victor.webp` | Victor | Multibrina |
| `landings-kit-piel-viva-ugc-valeriana-1/2/3.webp` | sin identificar | Valeriana |
| `landings-kit-piel-viva-ugc-todo-en-uno-1/2/3.webp` | sin identificar | Todo en Uno |

Las de Valeriana y Todo en Uno no están en el pool con nombre (comprobado el 2026-09-06): van **sin
nombre**.

---

## 5. Imágenes

| Archivo | Medidas | Dónde |
|---|---|---|
| `landings-kit-duerme-florece-hero.webp` | 1200 × 1200 | Foto del hero |
| `landings-kit-duerme-florece-kit.webp` | 1000 × 1334 | «Todo el kit» |
| `landings-kit-duerme-florece-mecanismo-v2.webp` | 1000 × 1000 | Lámina de «Lo que sabemos» |

**Por subir a Contenido → Archivos: 1**, la lámina. El hero y la foto del kit **ya están subidos** con
esos nombres (comprobado el 2026-09-16: el CDN devuelve exactamente estas imágenes).

⚠️ **La lámina lleva `-v2` a propósito.** `landings-kit-duerme-florece-mecanismo.webp` ya existe en el
CDN con la lámina de la primera tanda (la de ingredientes rotulados), y el CDN **cachea por nombre**: no
se puede reemplazar. La lámina nueva es otra imagen, así que va con sufijo (`docs/image-optimization.md`
§5).

**Además, cuatro ficheros compartidos** que **no son de este kit** y se suben una sola vez para toda
la marca: `landings-shared-pay-visa/-mastercard/-pse.webp` y `landings-shared-instagram.webp`
(`/eterma/shared/assets/`, ver `/eterma/AGENTS.md` §2).

---

## 6. Medidas (vista previa local, 2026-09-17)

Con el precio ya dentro de la primera pantalla (banda `.deal` encima del CTA):

| Ancho | Precio del hero | CTA del hero | Alto de página | Desborde |
|---|---|---|---|---|
| 360×740 | dentro | **643–701 px**, entero en la primera pantalla | 13 692 px | ninguno |
| 390×844 | dentro | **676–734 px**, entero en la primera pantalla | 13 430 px | ninguno |
| 1280 | dentro | — | 11 728 px | ninguno |

- Comprobado también a **412×915**: sin desbordes y el CTA dentro.
- Con el copy nuevo de la **sección de autoridad** (2026-09-17), aplicado **tal cual**: sin desbordes
  ni texto cortado a 360, 390 ni 1280, y los párrafos se leen enteros sin JavaScript.
- **El sticky sale a 400 px de scroll** a 390×844 (~0,5 pantallas). Antes esperaba a que el CTA
  del hero saliera del todo, casi una pantalla entera.
- `check-css-merge.mjs`: **sin cambios** a 390 y 1280 (376 reglas, 30 fusiones simuladas).
- Comprobado con clics reales: el interruptor apaga el hero (fondo `#10241c`, `aria-label` «Volver a
  encender») y lo vuelve a encender; el carril de noches mide 1.452 px con sus cinco tarjetas.
- Comprobado sin JavaScript: la banda del precio se ve, **los medios de pago y el Instagram también**,
  los CTA visibles y el sticky fuera.
- El sticky se queda fuera en el cierre, en el Instagram y en el pie: sin añadir `.df-social` a la cola
  reaparecía sobre el banner.
- Fuentes computadas: titulares Fraunces, cuerpo Questrial.

---

## 7. Pendientes

1. Subir `landings-kit-duerme-florece-mecanismo-v2.webp` (§5) y pasar `check-cdn.sh`.
2. Subir los **4 ficheros compartidos** de §5 (pagos + Instagram), salvo que ya los haya subido otra
   landing: son los mismos para toda la marca.
3. Confirmar precios (§1). El contraentrega ya coincide con Shopify; falta que Releasit descuente los
   $10.000 del anticipado.
4. Pegar en el Custom Code de GemPages, **en sus tres pestañas**: `./split-tabs.sh` genera
   `september.tab-html.html`, `september.tab-css.css` y `september.tab-js.js` (`/eterma/AGENTS.md` §2).
   Detrás del CSS va [`/eterma/shared/releasit-form.css`](../../shared/releasit-form.css), en esa misma pestaña.
5. **No publicar sin pedirlo el cliente.** Ojo: este kit **sí está vivo** en la tienda, así que publicar
   aquí sustituye una página que ya vende.

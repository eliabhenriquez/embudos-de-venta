# AGENTS.md — KIT DÍA LIVIANO

Contexto de producto. Hereda de `/AGENTS.md` (global) y de `/eterma/AGENTS.md` (marca), y **manda sobre
los dos** en caso de conflicto. Primero de los cinco kits de Eterma; los otros cuatro heredan su
estructura y cambian motivo, foto, CTA y orden de momentos (`/AGENTS.md` §7, "misma columna vertebral,
distinta piel").

---

## 1. El producto

Kit de **tres bebidas líquidas de 1 litro**, cada una con vaso medidor: **ADVANCE** (té verde y
alcachofa, después de almorzar), **CLOROFULL** (clorofila, vitaminas y minerales, durante la tarde) y
**MULTIBRINA** (manzanilla, toronjil, hierbabuena y mejorana, antes de dormir). **30 ml al día por
bebida, 33 dosis por botella.**

| | Anticipado | Contraentrega |
|---|---|---|
| Kit | **$119.900** (ahorras $10.000) | **$129.900** |

Envío gratis a Colombia, entrega **3 a 5 días hábiles**; si no llega, reenvío sin costo o devolución
del dinero si se pagó anticipado. WhatsApp de atención **300 696 4582** (viene en el copy). **Sin bono, sin
order bump ni upsell**: el copy no los trae y no se inventan.

**El copy manda** (decisión del cliente, 2026-09-06): [`general/copy kit dia liviano - eterma.txt`](general/copy%20kit%20dia%20liviano%20-%20eterma.txt).
- Los ingredientes que lista son los **principales**; no se completan con la etiqueta.
- El precio es el del copy; la web enseña otro ($129.900–$139.900 con "antes" $229.000) y **no se tacha nada**.
- Registro sanitario: **el mismo de toda Eterma, INVIMA RSA-0029174-2023** (el copy escribe "RS-…";
  se publica el de la etiqueta, como en CLOROFULL).
- Secciones: **solo las que tiene el copy.** Sin problema–agitación, sin línea de tiempo 30/60/90, sin
  bonos. La "línea de tiempo" de este kit es el día (almuerzo → tarde → noche), que sí está escrito.

**Producto de Shopify (leído de `/products/kit-dia-liviano.js` el 2026-09-06):** handle
`kit-dia-liviano`, product ID `15870479499633`, variante única `64093195960689`, precio en Shopify
$129.900 (el contraentrega), `available: true`, vendor `Eterma3`. **La landing está publicada como
página de producto**, `https://etermacolombia.com/products/kit-dia-liviano`, no como `/pages/…`: en la
página viva no hay `gp-product`; el contexto de producto lo da la propia ficha y Releasit engancha los
ocho CTA (`_rsi-buy-now-button-product`). El handle va en la constante `PRODUCT_HANDLE` del script solo
por trazabilidad; la landing no usa `/cart/add.js`.

`PREPAID_ENABLED = false` hasta que Releasit descuente los $10.000 reales (`/eterma/AGENTS.md` §5).

---

## 2. Motivo propio de esta landing (dentro de la línea Eterma)

La línea de marca está en `/eterma/AGENTS.md` §2. Lo que este kit añade:

- **El día de principio a fin.** El titular lo dice y la página lo cumple: un **carril del día** con
  tres paradas (después de almorzar · durante la tarde · antes de dormir) aparece en el hero, ordena
  las tarjetas de "Tres momentos" y vuelve como línea vertical en "Uso en cuatro pasos".
- **La página oscurece con el día.** Cada momento tiene su superficie: mediodía en gris frío
  `--et-bg-alt`, tarde en menta `--et-mint`, noche en verde profundo `--et-green-deep`. Las tarjetas
  de los momentos, los iconos (sol alto, sol bajo, luna) y el cierre siguen ese orden.
- **La dosis, tres veces.** El rótulo "30 ml" en serif sobre la foto del hero y las **tres fotos del
  vasito servido** (verde de Advance, verde oscuro de Clorofull, amarillo de Multibrina) como pasos de
  uso. Es el único color vivo de la página y va siempre en foto.
- **El CTA es "el arco del día": un sol que sale y se pone dentro de la píldora.** Un punto lima
  (`::after` del botón) recorre un arco de izquierda a derecha por la banda inferior del botón; una
  hairline curva (`::before`) marca el arco. Al pasar el dedo o el ratón, una banda verde media
  (`::before` de la etiqueta) barre el botón de izquierda a derecha. Por eso **el texto de cada CTA va
  dentro de `<span class="kl-cta__label">`**. Solo `transform` y `opacity`; el JS añade `is-inview`
  para servir y pausar; sin JS es una píldora verde estática; con `prefers-reduced-motion` el sol se
  queda quieto en el mediodía. Las variantes (`--light`, `--secondary`, `--sm`) cambian los colores
  del sol y del barrido con `--kl-sun` y `--kl-sweep`, no la mecánica.

---

## 3. Convenciones de código

- **Prefijo `kl-`.** Raíz `.kl-lp` con `id="kl-kit-dia-liviano"`. Todo selector cuelga de `.kl-lp`;
  todo ID empieza por `kl-`. Tokens de color `--et-*` (marca) y de layout `--kl-*`.
- Tipografía: Questrial por `@font-face` desde el CDN (`questrial-400.woff2`, ya subida); titulares con
  `var(--font-heading-family, Georgia, serif)`. `letter-spacing: 0` en la raíz. **Todo en px.**
- Script: `ROOT_SELECTOR`, `READY_FLAG = 'klLandingReady'`, `PRODUCT_HANDLE`, `PRICES`, `PREPAID_ENABLED`,
  `CTA_LABELS`. Precios y textos del sticky salen de las constantes.
- Pago, igual que CLOROFULL y VALERIANA: `data-kl-pay-choice="prepaid|cod"` en los botones de la
  oferta; al pulsar se escribe `data-cf-pay` en `<html>` (atributo histórico que escucha la skin
  compartida [`/eterma/shared/releasit-form.css`](../../shared/releasit-form.css)). Los CTA genéricos
  no escriben nada: el formulario abre en su estado neutro, que ya pone el anticipado primero.
- El sticky (solo móvil) aparece cuando el CTA del hero sale de pantalla y se esconde en el cierre y el pie.
- **El botón flotante naranja de Releasit se apaga desde este bloque** (`#_rsi-buy-now-button-floating`,
  fuera del scope, sacado del flujo y nunca `display: none`), igual que `gp-product`. Visto en la página
  viva el 2026-09-06 tapando el pie; el patrón es el de CLOROFULL (`/docs/releasit-form-styling.md` §4.4).
  No se toca en Releasit → Settings porque esa opción es global a la tienda.
- **El hero es un carrusel** (`data-kl-carousel`, scroll-snap y flechas; **sin puntos**, quitados a
  petición del cliente): el render del kit primero (LCP, `object-fit: contain` sobre menta) y luego
  Advance, Clorofull y Multibrina en el orden del día, con la foto de botella en mano **entera y centrada
  sobre la menta** (a `cover` en una caja apaisada solo se veía la franja del sello). El rótulo con
  producto y momento va en una **banda debajo de la foto, dentro de la caja**, nunca superpuesto: el
  cliente rechazó la versión flotante porque tapaba el producto. Pedido del cliente,
  2026-09-06. Las tres fotos de botella son las mismas de las tarjetas de momentos.
- Vista previa local: las imágenes con `data-kl-file` se reescriben a `../assets/` cuando la página se
  abre por `file://`. Las que no lo llevan (logo, Instagram, fuente) se sirven siempre del CDN porque ya
  están publicadas bajo otro nombre.

---

## 4. Testimonios: nombres reales

Regla del cliente: nombres reales del pool `/humanized-images/clorofull/`; la ciudad puede ser cualquiera
de Colombia. Las fotos de los kits llegaron sin nombre (`clorofull ugc 1..4`, `advance ugc 1..3`,
`multibrina ugc 1..3`) y se identificaron **cara a cara** contra el pool el 2026-09-06:

| Foto de origen | Persona | En la landing |
|---|---|---|
| `advance ugc 1` | **Joselin** | Cita de ADVANCE (Bogotá), tira del hero |
| `clorofull ugc 1` | **Celeste** | Tira del hero, collage del cierre |
| `clorofull ugc 2` | **Valentina** | Cita de CLOROFULL (Medellín) |
| `clorofull ugc 3` | **María Fernanda** | Collage del cierre |
| `clorofull ugc 4` | Luciana | **No se usa**: trae un rótulo "50% de descuento" incrustado |
| `multibrina ugc 1` | **María de los Ángeles** | Cita de MULTIBRINA (Cali), tira del hero |
| `multibrina ugc 2` | **Gabriela** | Collage del cierre |
| `multrina ugc 3` | **Victor** | Collage del cierre |
| `advance ug 2`, `advance ugc 3` | sin identificar | Solo en la tira del hero, que por copy no lleva nombres |

Las citas son las tres del copy, cada una sobre un producto distinto. Si se cambia una foto, cambiar
también el nombre.

---

## 5. Imágenes

Optimizadas en [`assets/`](assets/) con `/docs/image-optimization.md`; los originales del cliente
(PNG de 2 MB) están en `/product-images/kit-dia-liviano/`, fuera de git. Se suben a Contenido →
Archivos **con el mismo nombre** y se sirven desde `https://etermacolombia.com/cdn/shop/files/`.

```sh
./check-cdn.sh eterma/landings/kit-dia-liviano/general/september.html
```

| Archivo | Origen | Uso |
|---|---|---|
| `landings-kit-dia-liviano-hero-kit.webp` | `Kit Día Liviano - img.png` (1254², fondo blanco), a 1200 | Hero, LCP |
| `landings-kit-dia-liviano-kit-podium.webp` | `Kit Día Liviano 2 - img.png`, a 1000 | "Esto llega en tu pedido" |
| `landings-kit-dia-liviano-mecanismo.webp` | `img-mecanismo-kit dia liviano.png` (lámina del cliente con los ingredientes), a 1000 | "Lo que tomas en cada momento" |
| `landings-kit-dia-liviano-bottle-{advance,clorofull,multibrina}.webp` | `advance 2`, `clorofull 2`, `multibrina 1` (botella en mano), 4:5 a 800×1000 | Tarjetas de los tres momentos |
| `landings-kit-dia-liviano-vasito-{advance,clorofull,multibrina}.webp` | `vasito*.jpg` (3000×4000), recorte cuadrado al vaso, a 800 | Pasos de uso |
| `landings-kit-dia-liviano-ugc-*.webp` | UGC del cliente, 4:5 a 720×900 con la cara arriba | Tira del hero, citas, collage |

**Compartidas con otras landings, ya en el CDN y sin copia local** (por eso `check-cdn.sh` las marca
"no está en el repo"): el logo `landings-valeriana-eterma-logo.webp` y su versión blanca, la captura
`landings-valeriana-instagram.webp` y la fuente `questrial-400.woff2`.

---

## 6. Medidas y estado

Verificado con `shot.mjs` (móvil emulado) sobre la preview el 2026-09-06, imágenes servidas desde `assets/`:

| Ancho | Alto del hero | CTA del hero (top–bottom) | Página | Overflow horizontal |
|---|---|---|---|---|
| 360×740 | 778 px | 664–720 px, dentro de la primera pantalla | 9 866 px | ninguno |
| 390×844 | 836 px | 729–785 px, dentro de la primera pantalla | 9 808 px | ninguno |
| 1280 | 646 px | 609–665 px | 7 491 px | ninguno |

Fuentes computadas: titulares Georgia (serif del tema en producción), cuerpo Questrial. Sin `div`
ocultos por la regla `:empty`, todas las imágenes con `width`/`height`, sticky visible tras el hero y
oculto en escritorio.

- **Para que el CTA entre en la primera pantalla en móvil**, la foto del hero va apaisada (3/2 con
  `object-fit: contain` sobre menta; 16/9 hasta 375 px) y la fila de datos ("3 botellas · 33 dosis ·
  vaso medidor") baja por debajo del CTA con `order`, solo en móvil. En escritorio recupera su sitio
  entre el carril y el precio.
- **Numeración sin cero y aire vertical corto (2026-09-06, tercera ronda).** "Después de comprar" va 1, 2, 3;
  el relleno de sección baja a 48 px en móvil y 68 en escritorio, y se acortan los márgenes de tarjetas,
  uso, oferta y garantía. Mismo criterio que en Piel Viva; el cliente pidió aplicarlo a las dos.
- 2026-09-06: publicada en `/products/kit-dia-liviano` con los 17 ficheros de `assets/` en el CDN
  (`check-cdn.sh`: todas publicadas). Segunda ronda del mismo día: hero en carrusel y botón flotante de
  Releasit apagado; **pendiente pegar esta versión en GemPages** y comprobar en vivo que el naranja ya no
  aparece. Sigue pendiente activar el ahorro real de $10.000 en Releasit.

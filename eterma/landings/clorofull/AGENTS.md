# AGENTS.md — CLOROFULL

Contexto de producto. Hereda de `/AGENTS.md` (global) y de `/eterma/AGENTS.md` (marca), y **manda sobre
los dos** en caso de conflicto.

---

## 1. El producto

Bebida líquida de clorofila, **1 litro**, sabor menta, endulzada con estevia. Se toma **30 ml al día,
directo del vasito medidor incluido**: 33 dosis, más de un mes. Decisión del cliente (2026-09-01): el copy
manda sobre la etiqueta, que dice 120 ml y 8 porciones. **No "corregirlo" de vuelta.**

| | Anticipado | Contraentrega |
|---|---|---|
| 1 botella | **$69.900** (ahorras $10.000) | **$79.900** |
| Pack x2 (2 litros, 66 dosis) | **$129.900** | — |

El precio del pack lo dio el cliente como cifra única, sin desglose anticipado/contraentrega: se muestra
así. Envío gratis, entrega **3 a 5 días hábiles**; si no llega, reenvío o devolución (garantía del copy).
**Sin order bump ni upsell**: no hay copy para ellos.

**Producto de Shopify — OJO, la página publicada usa otro.** La decisión documentada era
`clorofull-mal-olor` (variant `63250970673521`), pero la página que está en vivo el 2026-09-03 es una
**GP_PRODUCT sobre `clorofull-1`** (product ID `15456322945393`, variant `63240614183281`), a $79.900 y
disponible. Ese ID **sí** está en la lista de las ofertas de cantidad de Releasit, así que el formulario
abre con la escalera correcta. Confirmar con el cliente cuál de los dos es el bueno y unificar: hoy el
repo y la tienda no dicen lo mismo.

Ficha original: handle `clorofull-mal-olor`, variant ID `63250970673521`. Hoy `available: false`:
hay que activarlo antes de publicar. En GemPages, el Product Element del final de la página se enlaza a
este producto (`/docs/releasit-form-styling.md` §4.4); la landing solo lo lleva en la constante `PRODUCT`
del script, por trazabilidad.

INVIMA **RSA-0029174-2023** · Fabricado por Laboratorios NaturalSplast SAS, Carrera 59 # 5B-31, Bogotá
D.C. Ficha completa (ingredientes, tabla oficial por 100 ml y 120 ml): `/eterma/AGENTS.md` §7.

---

## 2. Ángulos

| Carpeta | Promesa | Estado |
|---|---|---|
| [`olor/`](olor/) | "Que el olor no decida qué tan cerca te pones": aliento, sudor, gases, olor corporal que reaparece | **Construida y verificada en local, sin publicar** — [`olor/september.html`](olor/september.html) |
| [`hidratacion/`](hidratacion/) | "Que el calor no te lleve al límite": El Niño 2026-2027, calor extremo, pérdida de agua y sales; clorofila + vitaminas + minerales en 30 ml | **Construida y verificada en local (2026-09-08), sin publicar** — [`hidratacion/september.html`](hidratacion/september.html). Decisiones en §10 |
| [`remarketing/`](remarketing/) | "Que el olor deje de frenarte. Ahora te cuesta $10.000 menos empezar.": para quien vio la landing principal y no compró; **la objeción que se ataca es el precio** ($69.900 / $59.900) | **Construida y verificada en local (2026-09-17), sin publicar** — [`remarketing/september.html`](remarketing/september.html). **Falta el producto en Shopify a ese precio** (§11) |
| [`detox/`](detox/) | "Limpia por dentro. Empieza por el intestino.": detox digestivo; seis motivos (ciudad, polen, olor, panza inflada, colon lento, dejar el cigarrillo) y una sola ruta; clorofila + pectina + polidextrosa | **Construida y verificada en local (2026-10-09), sin publicar** — [`detox/september.html`](detox/september.html). Piel propia, «la frontera» (§12). **Manda el contraentrega.** Falta subir `detox-hero-2` |

Ángulo **unisex**: público mixto, testimonios de hombres y mujeres. El copy de este ángulo es
[`olor/copy-olor.md`](olor/copy-olor.md) y **manda** sobre la web de la marca y sobre la etiqueta.

---

## 3. Motivo propio de esta landing (dentro de la línea Eterma)

La línea de marca está en `/eterma/AGENTS.md` §2. Lo que esta landing añade:

- **El hilo es el día en que el olor aparece.** Los cuatro macroángulos del copy se presentan como
  momentos numerados (01 después del café · 02 calor y transporte · 03 después de comer · 04 media
  tarde) y las listas del propio copy ("Tinto en la mañana. Otro café a media mañana. Almuerzo…") hacen
  de reloj. Es literal al posicionamiento de Eterma, una bebida por momento, y no inventa copy.
- **El gesto de los 30 ml.** El número grande en serif y el vasito con el líquido verde aparecen en el
  hero, en "cómo se toma" y en el cierre. Es el único verde vivo de la página y siempre va en foto.
- **Cercanía.** Los titulares hablan de distancia; la composición es tranquila: texto a la izquierda,
  hairlines, aire. Sin tarjetas con sombra ni degradados.
- **Prueba social en dos capas:** tira de fotos del pool de UGC con nombre real, sin testimonio asociado,
  y las cuatro citas del copy en un **slider de tarjetas con la foto real de quien habla** (§6, §8). El
  cliente empezó pidiendo las citas sin foto y el 2026-09-02 lo cambió: slider con puntos, foto y
  nombre-foto reales, con la siguiente tarjeta asomando.
- **El CTA es "la medida": un vasito que se llena.** Dentro de la píldora hay dos capas de líquido
  verde (`::before` y `::after` del botón) cuya superficie se inclina ±1,2° en contrafase, como el vaso en
  la mano. Al entrar el botón en pantalla, el líquido sube hasta la marca (`--cf-level: 10px`, medidos
  desde el borde inferior para que en los botones de dos líneas tampoco toque el texto); cada
  4,8 s cae una gota y su anillo se expande desde la superficie (`::after` de la etiqueta); al pasar el
  dedo o el ratón, una tercera capa (`::before` de la etiqueta) llena el botón entero. Por eso **el
  texto de cada CTA va dentro de `<span class="cf-cta__label">`**: sin el span no hay relleno ni gota,
  y el JS del sticky escribe en ese span, no en el botón. Solo `transform` y `opacity`; el JS añade
  `is-inview` para servir y pausar; sin JS es una píldora verde estática; con `prefers-reduced-motion`
  el líquido queda quieto a la medida. Las variantes (`--secondary`, `--light`, `--outline-light`, el
  bloque verde) solo cambian el color del líquido con `--cf-liquid`, `--cf-liquid-light` y `--cf-ripple`.
- **El verde primario aparece tres veces a lo largo de la página** (franja superior, bloque "El foco",
  cierre y pie), como en la home, para que la landing se lea como Eterma sin mirar el logo.

---

## 4. Convenciones de código

- **Prefijo `cf-`.** Raíz `.cf-lp` con `id="cf-clorofull"`. Todo selector cuelga de `.cf-lp`; todo ID
  empieza por `cf-`. Tokens de color `--et-*` (paleta de marca) y de layout `--cf-*`.
- **Tipografía:** el cuerpo carga **Questrial** (`@font-face` en el bloque, `font-display: swap`,
  fichero `/eterma/shared/fonts/webfonts/questrial-400.woff2` en el CDN); un solo peso, así que las
  negritas (sticky) son sintéticas. Los titulares usan `var(--font-heading-family, Georgia, serif)`, la
  serif que Refresh publica en `:root`. `letter-spacing: 0` en la raíz (el tema pone `.06rem` en
  `body`).
- **Todo en px.** La raíz del tema va a 10,5px (`/eterma/AGENTS.md` §3) y la preview simula 16.
- Script: `ROOT_SELECTOR`, `READY_FLAG = 'cfLandingReady'`, `PRODUCT`, `PRICES`, `PREPAID_ENABLED`.
  Precios y textos de CTA salen de las constantes, no se repiten en el HTML.
- **Pago, igual que MIMA.** Cada botón de pago lleva `data-cf-pay-choice="prepaid|cod"`; al pulsarlo se
  escribe `data-cf-pay` en `<html>` y las clases `_rsi-cod-form-gempages-button-overwrite
  _rsi-cod-form-is-gempage` abren el formulario de Releasit. La skin
  ([`/eterma/shared/releasit-form.css`](../../shared/releasit-form.css), hecha el 2026-09-03) recoge
  `html[data-cf-pay]` y atenúa la opción descartada sin bloquearla. Se escribe la elección real aunque
  `PREPAID_ENABLED` siga en `false`. **Sin atributo** —los CTA genéricos no lo escriben— el formulario
  se queda en su estado neutro, que ya pone el pago anticipado primero: la regla de resaltarlo se
  cumple igual sin que nadie haya elegido nada.
- **La skin del formulario va en la pestaña CSS del mismo Custom Code**, detrás del CSS de la landing.
  El formulario de Eterma es el **legacy** de Releasit, no el de MIMA (`/eterma/AGENTS.md` §5): sus
  ganchos son `_rsi-*` y el skin de MIMA aquí no haría nada. Lo que el CSS no puede tocar —los colores
  de los dos botones, el order bump amarillo— está en
  [`/eterma/shared/releasit-form-designer.md`](../../shared/releasit-form-designer.md).
- **El pack x2 abre el mismo formulario.** La cantidad se elige dentro (quantity offers de Releasit); la
  landing no puede preseleccionarla sin verificarlo en vivo. Anotar aquí cuando se compruebe. El texto
  del botón ("Quiero el pack de 2") no venía en el copy: lo puso el agente, cambiarlo si el copy dice otro.
- **El sticky acompaña desde la carga.** Se esconde solo mientras el CTA del hero está en pantalla y al
  llegar al cierre o al footer (observa `.cf-hero .cf-cta`, no el hero entero). Motivo: el hero lleva el
  copy completo (titular, lead, cuatro situaciones, foto, precios) y su CTA queda a más de una pantalla;
  el sticky es el camino corto. En escritorio va oculto: los CTA están siempre a la vista.
- **Sin "envío gratis".** El copy no lo dice y no se añadió; si el cliente lo confirma, va en el bloque
  de confianza de la oferta y en el sticky.
- `gp-product` se saca del flujo con la regla de `/docs/releasit-form-styling.md` §4.4, nunca
  `display: none`.

---

## 5. Tabla nutricional por 30 ml (derivada) — retirada de la landing

**La sección "Información nutricional" se quitó el 2026-09-02 por decisión del cliente ("eso ya no
va"): sin HTML ni CSS en `september.html`.** Se conserva la tabla derivada por si vuelve a hacer falta
(etiqueta, ficha de producto o FAQ), pero no se reintroduce sin que lo pida.

Decisión: "lo que diga el copy", y el copy la anuncia por porción de 30 ml. La etiqueta viene por 100 ml
y por 120 ml, así que la columna de 30 ml es **0,3 × la de 100 ml**, redondeada a la precisión de la
etiqueta. Se muestra junto a la de 100 ml, que es la oficial.

| | Por 100 ml (etiqueta) | Por 30 ml |
|---|---|---|
| Calorías | 42 kcal | 13 kcal |
| Grasa total / saturada / trans | 0 g | 0 g |
| Carbohidratos totales | 8,2 g | 2,5 g |
| Fibra dietaria | 4,5 g | 1,4 g |
| Azúcares totales | 1,0 g | 0,3 g |
| Azúcares añadidos | 0,8 g | 0,2 g |
| Proteína | 0 g | 0 g |
| Sodio | 8,3 mg | 2,5 mg |
| Potasio | 958 mg | 287 mg |
| Vitamina A | 405 µg ER | 122 µg ER |
| Vitamina C | 45 mg | 13,5 mg |
| Calcio | 543 mg | 163 mg |
| Hierro | 10 mg | 3 mg |
| Vitamina D | 7,5 µg | 2,3 µg |
| Vitamina E | 4,5 mg ET | 1,4 mg ET |
| Vitamina B1 | 0,58 mg | 0,17 mg |
| Vitamina B2 | 0,58 mg | 0,17 mg |
| Niacina | 7,9 mg | 2,4 mg |
| Vitamina B6 | 0,69 mg | 0,21 mg |
| Ácido fólico | 88 µg | 26 µg |
| Vitamina B12 | 1,2 µg | 0,36 µg |
| Fósforo | 221 mg | 66 mg |
| Magnesio | 256 mg | 77 mg |
| Zinc | 5,7 mg | 1,7 mg |
| Ácido pantoténico | 3,0 mg | 0,9 mg |
| Selenio | 36 µg | 11 µg |

---

## 6. Testimonios: nombres reales

Regla del cliente: **siempre nombres reales** del pool `/humanized-images/clorofull/`. Ya sustituidos en
`olor/copy-olor.md`; las ciudades son las del copy.

| Copy original | En la landing | Ciudad |
|---|---|---|
| Mariana | **Natalia** | Bogotá |
| Sebastián | **Camilo** | Barranquilla |
| Valeria | **Valentina** | Medellín |
| Andrés | **Ricardo** | Cali |

Los cuatro llevan su foto en el slider de experiencias y aparecen también en la tira, con la misma
cara: Natalia `ugc-natalia`, Camilo `ugc-camilo`, Valentina `ugc-valentina-vasito` (su cita habla del
vasito) y Ricardo `ugc-ricardo`. Si se cambia una foto, cambiarla en los dos sitios.

---

## 7. Imágenes

Optimizadas en [`assets/`](assets/) con `/docs/image-optimization.md`; se suben a Contenido → Archivos
**con el mismo nombre** y se sirven desde `https://etermacolombia.com/cdn/shop/files/`. Estado real:

```sh
./check-cdn.sh eterma/landings/clorofull/olor/september.html
```

| Archivo | Origen | Uso |
|---|---|---|
| `landings-clorofull-hero-1.webp` … `-4.webp` | `img-hero-1..4.webp` del cliente (≈1250 px), a 1200 px q82, originales en `product-images/clorofull/hero/` | Carrusel del hero, en ese orden; la 1 es el LCP |
| `landings-clorofull-hero-hand.webp` | `product-images/clorofull 2.png` | Ya no se usa (era el hero fijo); sigue en el CDN |
| `landings-clorofull-bottle.webp` | `IMG-1-CLOROFULL-STOCK.png`, fondo recortado a alfa | Oferta (en el cierre se cambió por el collage) |
| `landings-clorofull-vasito.webp` | `vasito medidor.jpg`, recorte 4:5 | Ingrediente, el verde real |
| `landings-clorofull-pour.webp` | `modo de uso - cloro.png` (714 px, no se amplía) | Cómo se toma |
| `landings-clorofull-momento-*-v2.webp` (aliento, sudoracion, gases, olor-corporal) | Láminas del cliente en `product-images/clorofull/momentos/`, recortadas al borde de la tarjeta, **pasadas a alfa** (fondo plano 250,248,244 → transparente, con los colores desmezclados para que el rubor verde no se lave) y a 540×518 sin el margen vacío; webp q80 con alfa a 70, 33–49 KB. Van con `-v2` porque el cliente subió la primera versión (opaca, sin sufijo) antes de que se rehicieran y el CDN la tiene cacheada con ese nombre | Carrusel de los momentos del día |
| `landings-clorofull-ugc-*.webp` | `humanized-images/clorofull/`, 4:5 a 720×900 | Tira de personas, slider de experiencias y collage del cierre |
| `landings-clorofull-pubchem-logo.webp` | `pubchem-logo.webp` del cliente (3840×1122 con alfa) recortado al contenido y a 400 px, webp sin pérdida | Fuente 1 de autoridad |
| `landings-clorofull-pay-visa.webp`, `-pay-mastercard.webp`, `-pay-pse.webp` | Copia byte a byte de los `landings-sknglow-pay-*` de MIMA (222×72, 92×72, 72×72 con alfa); Shopify Files es por tienda, así que hay que subirlos también aquí | Tira de métodos del pago anticipado |
| `landings-clorofull-instagram.webp` | Captura del perfil del cliente (1504×428) recortada a 1270×428 para dejar el mismo aire a los dos lados —sobraban 343 px de negro a la derecha— y servida a 1100 px, q86 · 29 KB | Bloque de Instagram antes del pie |
| `landings-clorofull-producto-vasito.webp` | Foto de estudio del cliente (`producto-vasito.webp`, 1254×1254 sobre gris plano 240) recortada a 780×961 · 24 KB. **Se recorta por arriba, abajo e izquierda pero se conserva el aire de la derecha**: ahí van las dos etiquetas de la foto anotada | Sección «Cómo actúa» |
| `landings-clorofull-vasito-medidor.webp` | Foto del cliente (`vasito medidor.webp`, 1254×1254 sobre blanco), recortada al vaso y su sombra y reducida a 480×411, webp q84 · 7 KB. **No se llama `-vasito`**: ese nombre ya lo ocupa la foto UGC de la mano sosteniendo el vasito, y el CDN cachea por nombre | Hueco a la derecha del titular del hero |
| `landings-clorofull-natgeo-logo.webp` | `natgeo-logo.svg` del cliente rasterizado a 480 px con `-background none`, webp sin pérdida | Fuente 2 de autoridad |
| `landings-clorofull-eterma-logo-v1.webp` | Subido por el cliente el 2026-09-02 (634×185); sustituye al recorte del PDF, que quedó cacheado en el CDN con el nombre sin sufijo | Cabecera |
| `landings-clorofull-eterma-logo-white.webp` | ídem, panel sage a alfa | Pie |
| `questrial-400.woff2` (en `/eterma/shared/fonts/webfonts/`) | `Questrial-Regular.ttf` con `pyftsubset` | Tipografía del cuerpo; `check-cdn.sh` la busca ahí |

**Nada pendiente de subir** (`check-cdn.sh` da todo en ok el 2026-09-07, incluida
`landings-clorofull-instagram.webp`). El resto está en el CDN desde el 2026-09-03, incluidas
las láminas `-v2`, las cuatro del hero, los tres iconos de pago y el vasito medidor. De las láminas, las
que están en el CDN **sin** sufijo son la versión opaca descartada y no se usan. Los originales de los logos y de las láminas quedaron en
`product-images/clorofull/logos/` y `.../momentos/` (fuera de git), no en `assets/`, que solo guarda lo
optimizado. Las láminas llegaron con nombres con espacios ("mal aliento.webp"): en `assets/` van siempre
con el prefijo de landing y sin espacios. El admin las enseña como
`cdn.shopify.com/s/files/1/0994/1663/7809/files/<nombre>?v=…`; es el mismo fichero que
`etermacolombia.com/cdn/shop/files/<nombre>` (ver `/docs/image-optimization.md` §5).

El recorte de la botella de stock se hizo con flood fill desde las esquinas (fondo 253,253,253 con
fuzz 7 %): si se rehace, comprobar que la base crema de la botella sigue entera. `luciana.png` **no se
usa**: trae un rótulo "50% de descuento" incrustado.

---

## 8. Medidas y decisiones de maquetación (2026-09-02)

Verificado con `shot.mjs` (móvil emulado por DevTools) sobre la preview, con las imágenes servidas
desde `assets/`:

| Ancho | Alto del hero | CTA del hero (top) | Página | Overflow horizontal |
|---|---|---|---|---|
| 360 | 1122 px | 1061 px | 15 988 px | ninguno |
| 390 | 1075 px | 1013 px | 15 547 px | ninguno |
| 1280 | 882 px | 764 px | 13 735 px | ninguno |

Fuentes computadas en la preview: titulares Georgia (serif del tema en producción), cuerpo Helvetica
(Questrial en producción), `letter-spacing` normal, CTA `#825538`.

- **Hero rediseñado el 2026-09-02 para que la primera pantalla lo tenga todo.** Orden en móvil: foto a
  sangre y apaisada (13/11, `object-position: 50% 42%`, se ve sello y etiqueta) con el rótulo de la
  dosis arriba a la derecha y las cuatro situaciones del copy en una **marquesina sobre la banda
  inferior de la foto** (27 px/s); debajo, título, descripción, precios y CTA. Medido a 390×844: foto
  hasta 408 px, título a 428, precio a 601 y **CTA de 713 a 769 px, dentro del primer viewport**; a
  360×740 el CTA termina en 743. En escritorio la foto va a la izquierda a 4/5 ocupando dos filas
  (`grid-template-rows: auto 1fr`) y el texto y la compra a la derecha.
- **El vasito medidor va en el hueco del titular (2026-09-03), y ese hueco es una columna de rejilla,
  no una posición absoluta.** `.cf-hero__copy` pasó a `grid` con áreas `title title / lead cup`: el
  titular conserva el ancho completo —sus dos líneas están fijadas con `<br>` y no deben reflotar— y el
  párrafo se estrecha para dejarle sitio a la foto (108 px, alineada al borde derecho del `.cf-shell`).
  Se hizo así porque la serif de los titulares la sirve el tema (`--font-heading-family`) y no se sabe
  a ciencia cierta dónde termina cada línea: con posición absoluta bastaría un tipo un poco más ancho
  para que el vaso se comiera «te pones.». Con la rejilla el solape es imposible por construcción.
  Comprobado a 360, 390 y 1280: sin invasión de la banda del titular y sin desbordes.
- **La foto del vasito se funde con `mix-blend-mode: multiply`, no con alfa.** Llega con fondo blanco y
  la sombra pintada encima; sobre el hueso de la página (`--et-bg`) el multiplicado hace desaparecer el
  blanco y funde la sombra sin recortar nada. Extraer alfa como en las láminas **no vale aquí**: el
  borde esmerilado del vaso es casi blanco y el recorte se lo comería. Si un navegador no soportara el
  modo de fusión, lo peor que pasa es que se vea un rectángulo blanco sobre hueso.
- **La comparativa dejó de ser una tabla (2026-09-03).** Eran ocho filas iguales con dos columnas de
  datos y sus dos rótulos repetidos: dieciséis rótulos para dieciséis datos, y el argumento del titular
  no se veía por ningún lado. Ahora es una retícula de fichas —lo que ya hay en el baño— y una banda
  ancha para Clorofull: la forma dice el titular sin leerlo, muchas piezas pequeñas frente a una que
  ocupa el ancho entero. Dos columnas en móvil y cuatro en escritorio; **los siete son impares, así que
  el último ocupa dos columnas y se tumba** (`:nth-last-child(2):nth-child(odd)`, escrito con nth para
  que siga valiendo si se añade o se quita una solución). Los rótulos «Cuándo se usa» y «Qué cubre»
  siguen en el DOM en `.cf-visually-hidden`: la píldora se lee como momento y la frase de debajo como
  cobertura, así que pintarlos era ruido.
- **La marca de cada ficha es un círculo medio lleno; el de Clorofull, lleno entero.** Es el motivo de
  «cubre una parte», **no una medida**: los siete están al mismo nivel a propósito, porque repartir
  porcentajes por producto sería inventarse un dato. El líquido va en un pseudo-elemento y sube con
  `translateY` al entrar en pantalla, escalonado; con `prefers-reduced-motion` sale ya lleno.
- **Los iconos se redibujaron dos veces.** A 34 y a 40px no se leían, y dos fallaban de raíz: el hilo
  dental parecía un bocadillo y el raspador una copa de vino. Quedaron a 48px de marca y 26 de icono, el
  hilo como palillo en Y, el raspador como pala con mango y las mentas como aro. Cuatro siguen siendo
  botellas —enjuague, desodorante, perfume y Clorofull— porque en la realidad lo son; se distinguen por
  silueta (hombros, cúpula, atomizador, cuello alto).
- **`initFlow` pasó a `initReveal`** y sirve a cualquier bloque con `data-cf-reveal`: lo usan el flujo de
  los pasos y esta retícula. Un solo observador para los dos.
- **«Cómo actúa» lleva la foto de producto anotada (2026-09-03).** Era la única sección larga sin una
  sola imagen y habla justo de la dosis diaria, así que la botella entera junto al vasito servido es esa
  frase hecha objeto. Va entre los dos párrafos y el `cf-statement`, para partir el muro de texto por la
  mitad. Dos etiquetas —«1 litro» sobre la botella y «30 ml» sobre el vasito— colocadas **en porcentajes
  sobre la caja de la imagen**, que lleva `aspect-ratio` fijo: así caen siempre sobre la misma parte de
  la foto sea cual sea el ancho, sin la fragilidad de posicionar contra el texto. El guion que une
  etiqueta y pieza es un pseudo-elemento, no un div. Las dos cifras están en la propia etiqueta del
  envase («Cont. Neto 1000 ml»), así que no añaden ninguna afirmación nueva.
- **El gris del fondo se deja como está.** Es plano (240,240,240) y casi idéntico a `--et-bg-alt`
  (#eff0f5), así que dentro de una tarjeta con borde fino se lee como foto de producto. **No se pasa a
  alfa**: la etiqueta blanca del envase y el borde esmerilado del vasito están a 250 y el recorte se los
  comería. Tampoco `multiply` como en el vasito del hero: sobre un fondo gris, no blanco, dejaría un
  rectángulo gris cálido en vez de fundirse.
- **Antes del pie va la captura de Instagram (2026-09-03).** La cuenta oficial con sus 16,4 mil
  seguidores es **el único aval de marca que puede enseñar esta landing**: no hay WhatsApp, ni teléfono,
  ni políticas propias que enlazar (`/eterma/AGENTS.md` §6), así que cierra justo donde queda la duda de
  «¿esto existe de verdad?». Rótulo `cf-overline` y la captura debajo, alineada con él a la izquierda de
  la columna estrecha (centrarla descuadraba los dos elementos en escritorio).
- **La captura NO se enlaza.** Sacar a la clienta a Instagram a dos dedos del CTA es una salida del
  embudo. Va como imagen, con el contenido del perfil descrito en el `alt` para el lector de pantalla.
  El fondo casi negro se enmarca en tarjeta con radio para que se lea como lo que es —una pantalla— y no
  como un rectángulo negro suelto sobre el hueso; queda entre dos bloques oscuros (cierre y pie) y esa
  franja clara entre medias es la que lo separa.
- **GemPages impone `max-width: 100%` a TODO lo que hay dentro del bloque de código.** Verificado en
  producción el 2026-09-03: un `<div>` recién creado dentro de `.cf-lp` computa `max-width: 100%`, y el
  mismo `<div>` colgado de `<body>` computa `none`. Es la tercera defensa que hay que declarar contra el
  entorno, junto a `div:empty` y al estilado por etiqueta del tema.
  **Consecuencia real:** las dos marquesinas —barra superior y ticker del hero— salían con los dos
  juegos de texto **pisándose**. El carril lleva `width: max-content`, pero el `max-width: 100%` lo
  aplastaba a los 390 px del contenedor: medido 390 en vez de 1047. Se arregla con `max-width: none` en
  el carril y `flex: none; max-width: none` en los juegos. **No hace falta `!important`**: la regla de
  GemPages tiene la misma especificidad y nuestro bloque va después. Comprobado en vivo tocando las
  reglas propias por CSSOM, que es la única prueba que reproduce el orden real de la cascada —inyectar
  el CSS en el `<head>` NO vale, porque queda antes que el bloque de la landing y da un falso negativo.
- **El botón flotante de Releasit se apaga desde la landing, no desde la app.** Es
  `#_rsi-buy-now-button-floating`, un `div` naranja colgado de `<body>` con `position: fixed` y
  `z-index: 100.099.900` que aparece al bajar y **tapa el pie**; hace lo mismo que nuestro sticky pero
  sin respetar la elección de pago. Se saca del flujo con el mismo patrón que `gp-product` (nunca
  `display: none`: la app usa el nodo). Va aquí y no en Releasit → Settings porque esa opción es global
  a la tienda y otras fichas de producto siguen necesitándolo.
- **Ritmo vertical con dos tokens y nada más:** `--cf-pad` (40 px móvil, 72 escritorio) como relleno
  de toda sección y `--cf-gap` (18 px) como único hueco entre titular y contenido; los espacios internos
  van en 12–14 px (listas, tarjetas, tabla) y 18 px (citas, momentos). Antes cada bloque llevaba su
  cifra (56/96 de sección y 22–30 de hueco) y la página se veía larga y dispareja. Con la escala, la
  altura a 390 px bajó de 14 995 a 13 934 px (y de 13 677 a 12 460 en escritorio; 13 791 y 12 382 tras
  compactar las tarjetas de oferta; 13 633 y 12 352 con el slider de experiencias; 12 514 y 11 257 sin
  la tabla nutricional; 12 407 y 11 093 con el carrusel de fuentes y el collage del cierre; 12 431 y 11 115 al agrandar el
  asomo; 12 008 y 10 764 con los momentos en carrusel con arco).
- **Experiencias: slider de scroll nativo con `scroll-snap`, sin librería** (mismo patrón técnico que
  SKNGLOW, piel propia). Tarjeta blanca con la foto real arriba a 4:3 (`object-position: 50% 30%`; la de
  Valentina a 42 % para que entre el vasito), la cita con la barra lateral verde de la home y la firma
  abajo; en escritorio una sola tarjeta apaisada por vista, foto de 240 px a toda la altura (mínimo
  280 px) y texto a la derecha. **La siguiente tarjeta asoma**: el carril lleva `padding-right: 15px +
  --cf-story-peek` (52 px móvil, 60 escritorio), así la caja de contenido mide exactamente una tarjeta
  (`flex-basis: 100%`), asoma lo que dice el token y la última también encaja al inicio (medido: paso
  324 px y tope de scroll 972 = 3 × 324 a 390 px; 606 y 1818 a 1280). El hueco entre tarjetas (16 px) es
  mayor que el relleno izquierdo (15 px) para que no asome un filete de la anterior. Puntos de 6 px que se
  alargan a 20 px al activarse (`transform: scaleX`, sin cambiar ancho), área tocable 26×24, con un
  `<span>` oculto dentro por el `:empty` del tema. El JS solo pinta el punto activo leyendo `scrollLeft`
  (rAF) y hace `scrollTo` al pulsar; al tope del scroll se da por activa la última aunque un cambio de
  anchos la dejara sin poder alinearse. Con `prefers-reduced-motion` el desplazamiento es `auto` y el
  punto no transiciona.
- **Garantía: sello y anticipado por delante (regla global, `/AGENTS.md` §7).** El sello es un círculo
  menta de 52 px con anillo (`outline` de 1 px verde con `outline-offset: 3px`, hueco transparente
  porque cabalga dos fondos) y el escudo con check de trazo fino de sellos y confianza. Va **absoluto,
  a caballo del borde superior de la sección** (`top: calc(-26px - var(--cf-pad))`, `left: 15px`
  respecto a la `.cf-shell`, que es `position: relative`), alineado con la columna de texto y sin sumar
  alto: la sección bajó de 683 a 632 px a 390. El cliente lo pidió así tras verlo en flujo sobre el
  titular. Las dos formas de pago iban en tarjetas gemelas; ahora el anticipado es tarjeta en verde
  profundo con etiqueta lima e icono de porcentaje, el ahorro en serif lima a 24 px dentro de la frase
  del copy y su propio CTA (`cf-cta--light cf-cta--sm`, `data-cf-pay-choice="prepaid"`, a todo el ancho
  en móvil y a la derecha del texto en escritorio). El contraentrega tiene la **misma estructura en
  tarjeta blanca con filete** (etiqueta verde con camión, texto en tinta a 16 px) y sin CTA: segundo,
  pero legible. Primero se probó como nota apagada y el cliente la consideró demasiado opacada.
- **"Cómo se toma" es un flujo en zigzag, no una lista.** Cada paso es una píldora (número en serif
  sobre círculo menta + texto, `max-width: 80%`) alineada a la izquierda en los impares y a la derecha en
  los pares, unida al siguiente por una flecha en arco de trazo fino (SVG inline de 64×42, espejada con
  `scaleX(-1)` en los pares y desplazada un 42 % hacia el centro para que salga de la píldora y caiga
  sobre la siguiente). El último paso, "Repite cada día", lleva al lado una **flecha ovalada** (elipse
  14×10 con punta) en vez de arco: es el ciclo. El `<ol>` se conserva con `list-style: none`; el número
  visible va con `aria-hidden` para no leerse dos veces. Se revela una sola vez al entrar en pantalla
  (IntersectionObserver al 30 %, clases `is-armed` e `is-inview`): píldoras subiendo 10 px, flechas
  entrando hacia su punta y la ovalada girando 90°, con retardos en `nth-child` (0 a 1,3 s, sin estilos
  en línea). Sin JS no se arma y se ve entero; con `prefers-reduced-motion` igual. El flujo mide 357 px a
  390 (la lista medía unos 250): el cliente pidió "más visual, como un flujo" y aceptó el alto.
- **Autoridad: carrusel vertical de fuentes con su logotipo.** Mismo componente que el slider de
  experiencias, girado 90°: el carril lleva `padding-bottom: --cf-source-peek` y cada tarjeta
  `min-height: 100 %`, así mide justo el alto visible, la siguiente asoma y la última encaja arriba
  (medido: paso 252 y tope 504 = 2 × 252 a 390; 184 y 368 a 1280). **El alto del carril se calcula**,
  no se escribe: `calc(--cf-source-card + --cf-source-peek)`, con la tarjeta en 240 px (172 en
  escritorio) y el asomo en 76 (68). La tarjeta tiene que dar de sí para la más larga —naturales de 232,
  190 y 215 px a 390— porque si una crece las tres dejan de medir igual y el paso deja de ser uniforme.
  Del siguiente se ve el asomo menos el hueco: 64 px, suficiente para el logotipo entero. **El corte se
  disuelve con una máscara** (`mask-image: linear-gradient(...)`, con su prefijo `-webkit-`) de
  `--cf-source-fade` (40 px): el cliente no quería ver la tarjeta cortada. La zona de fundido es menor
  que el asomo a propósito, así al llegar al final la última tarjeta queda 76 px por encima y nunca se
  difumina. Cada tarjeta es
  blanca con hueco fijo de 30 px para el logotipo (PubChem y National Geographic reales, con alfa, y un
  icono de documento en la tercera fuente, que no tiene logo), la cita en serif y la atribución del copy
  anclada abajo con `margin-top: auto`. Los logotipos van con `alt=""`: la atribución ya los nombra.
- **El JS de carruseles es uno solo.** `initCarousel` lee `data-cf-carousel` (`x` o `y`) y saca de
  `CAROUSEL_AXES` los nombres de propiedad (`scrollLeft`/`scrollTop`, `offsetLeft`/`offsetTop`…), así
  que el mismo código sirve para experiencias y fuentes; los puntos son la clase compartida `.cf-dots` +
  `.cf-dot` y se buscan en el padre del carril. Antes había un `initStories` atado al eje horizontal.
- **El cierre lleva un collage de UGC, no la botella.** Cuatro fotos con el producto en la mano
  (Joselin, María de los Ángeles, Gabriela y Víctor: ninguna repite cara con el slider de experiencias),
  en dos columnas con la segunda descolgada 16 px y una inclinación de ±2/2,5° por foto, con un filo
  claro (`box-shadow: 0 0 0 1px rgba(255,255,255,.16)`) para que despeguen del verde profundo. Máximo
  300 px de ancho, centrado. El cliente pidió quitar la botella de esa sección; sigue en la oferta.
- **Los momentos del día son un carrusel con el arco del día (2026-09-03).** Primer intento: las cuatro
  láminas del cliente apiladas en la lista, a 320 px, con su fondo beis. El cliente: "se ve horrible, haz
  algo más creativo". Lo que quedó: (1) **las láminas en alfa**, para que el trazo flote sobre la tarjeta
  blanca como el resto de iconos de la landing en vez de ir metido en un cuadro beis; (2) **una tarjeta
  por momento en el carrusel horizontal** (mismo componente que experiencias, con `--cf-moment-peek` de
  52/60 px), lámina arriba **al 76 % del ancho de la tarjeta** en móvil (a todo el ancho se comía media
  pantalla; el cliente pidió menos alto y al 76 % el rótulo sigue leyéndose) y a la izquierda en 250 px
  desde 900; y (3) **el navegador es el arco del día**: un arco de radio 200 (centro en 160,236 de un
  cuadro de 320×116, pegado al carril sin margen: el cliente quería los puntos más cerca) con
  los cuatro puntos numerados a −44°, −15°, 15° y 44° y un sol lima que se mueve al momento activo
  girando alrededor del mismo centro a radio 230 (`.cf-arc__hand` con un `rotate` por índice, que
  `initCarousel` publica en `data-cf-active` del contenedor de los puntos). El punto activo se rellena
  con un `::before` que escala. Las láminas siguen trayendo número, rótulo e iconos, así que el h3 va
  oculto y la imagen es decorativa. Las láminas se exportan ya sin su margen vacío (recorte interior
  del 4 % a la izquierda, 5 % arriba y 3 % abajo → 540×518). La sección mide 770 px a 390 (2 282 con la
  lista), y la página queda en 12 008. Medido: paso 324 y tope 972 a 390; 606 y 1 818 a 1280; los puntos
  02/03 arrancan 32 px bajo la tarjeta.
- **El hero es un carrusel de cuatro fotos con flechas, sin puntos (2026-09-03).** Mismo componente
  (`data-cf-carousel="x"`), que desde este cambio admite flechas (`data-cf-prev` / `data-cf-next`)
  además de puntos, o solo una de las dos cosas; la flecha del extremo alcanzado se apaga con opacidad.
  Orden fijado por el cliente: mujer bebiendo del vasito, botella con ingredientes, botella en la mano
  con "1 litro / 33 días", dorso con la tabla. **El rótulo de la dosis va solo en la primera** (dentro de
  su `figure`, que es `position: relative`) y **pasó de la esquina derecha a la izquierda**: a la derecha
  tapaba la cara de la mujer y el vasito del que bebe; a la izquierda solo cubre el tapón. La marquesina
  y las flechas van sobre el carril, comunes a todas. Marco 13:11 en móvil (sin cambio de alto: hero 696 px y CTA a 635) con `object-position: 50%
  35%` para no cortar la cabeza en la primera, y **1:1 en escritorio** porque las cuatro fotos son casi
  cuadradas (el 4:5 anterior recortaba botella y texto). Carga: la 1 con `fetchpriority="high"`, la 2
  `eager` para que el primer deslizamiento no parpadee, la 3 y la 4 `lazy`. Flechas de 30 px a media
  altura, hueso translúcido con filete. Medido: paso 390 y tope 1 170 a 390; 460 y 1 380 a 1280.
- **Toda diapositiva de carrusel lleva `position: relative`.** El h3 oculto accesible de los momentos
  es `position: absolute` (`.cf-visually-hidden`); sin ancestro posicionado su caja se colocaba respecto
  al documento, fuera del carril, y el de la última diapositiva ensanchaba la página hasta 1 007 px a
  390 (en emulación móvil, Chrome estira el viewport de maquetación y con él el sticky fijo). El fallo se
  ve en `innerWidth`, no en `scrollWidth > innerWidth`, que compara dos cifras ya ensanchadas.
- **Iconos de Visa, Mastercard y PSE junto a cada pago anticipado, salvo en la celda del hero
  (2026-09-03, pedido del cliente).** Componente `.cf-pay` (inline-flex, iconos a 16 px de alto) en la
  opción anticipada de la oferta, la tarjeta de garantía, la respuesta del FAQ, el precio del cierre y
  el sticky (`--sm`, 12 px, en su propia fila del precio: dentro de la nota partía la línea). Sobre
  verde profundo van en píldora blanca (`--on-dark`): el negro de Mastercard y el azul de PSE no se leen
  sobre verde. Solo acompañan al anticipado; en contraentrega no se paga con tarjeta y ponerlos sueltos
  sería prometer algo que no ocurre. El sticky sube de 69 a unos 80 px por la fila nueva.
- **Tarjetas de oferta: el texto va en su propia columna (`.cf-plan__text`, grid de 10 px) y la
  botella a la derecha, alineados arriba.** Antes el título iba solo junto a la botella (95 px de alto)
  con `align-items: end`, y quedaban 60–80 px vacíos entre la etiqueta "Compra recomendada" y el
  nombre; el cliente lo marcó en captura. Con nombre + descripción (+ nota) en la columna, el texto
  llena la altura de la imagen (la x1 mide 91 px de texto frente a 95 de foto). Imagen a 30 px con
  6 px de relleno; en el pack, dos botellas en flex con 4 px de hueco. No usar `grid-row: 1 / -1`
  para que la foto abarque filas: sin filas explícitas `-1` es la línea 1 y la nota se colaba en la
  columna de la foto.
- **Toda sección con fondo propio lleva la onda arriba y abajo** (gris alterno, bloque verde, cierre y
  pie): pseudo-elementos de 8 px con `background: inherit` y la curva de la cabecera como `mask`
  (`-webkit-mask` también), montados fuera de la sección; el de arriba va con `scaleY(-1)`. Sin filetes
  rectos. Decisión del cliente: "nada cuadrado".
- **Cabecera:** marquesina verde con el mensaje de campaña (24 px/s), logo a 20 px sobre blanco y
  **borde inferior en onda** (SVG inline de 8 px, `currentColor` blanco) montado sobre la foto. Sin
  filete recto. Empezó en 15 px y el cliente lo pidió más discreto.
- **La dosis vive en el rótulo de la foto** ("30 ml al día · Directo del vasito medidor · Una botella para
  33 días"), no repetida como párrafo. No se pone texto grande sobre la foto: se probó "Clorofull" en
  serif y el cliente lo descartó.
- **H1 a 31 px en móvil y 44 px en escritorio, con `<br>` antes de la cursiva** para que "qué" no quede
  colgando; descripción a 17 px. La cursiva va limpia: se probaron un trazo en onda delante y un
  subrayado en onda debajo, y el cliente descartó los dos.
- **Precio y CTA son una sola pieza:** el botón se monta 28 px sobre el borde inferior del grid de
  precios con margen negativo (no `position: absolute`, para no sacarlo del flujo ni del observador del
  sticky); las celdas llevan 42 px de relleno inferior para dejarle sitio. Precios a 23 px.
- **La barra superior** son tres `span` con el separador en `::before`: al envolver no queda un punto
  huérfano al principio de línea.
- **La botella recortada** lleva el alfa erosionado 1 px: sin eso deja un filo claro sobre el marrón del
  cierre.
- **Paleta repintada el 2026-09-02** con los verdes y grises de la web (`/eterma/AGENTS.md` §2) tras
  descartar el cliente la del manual. Cambios de estructura que vinieron con ello: franja superior verde
  con el logo debajo sobre blanco (la cabecera de la tienda), la sección "El foco" como bloque verde
  profundo a mitad de página, citas con barra lateral verde, fotos de producto sobre menta, y el cierre y
  el pie en verde profundo con CTA off-white.

Cómo repetir la medición:

```sh
./preview.sh eterma/landings/clorofull/olor/september.html
A=$PWD/eterma/landings/clorofull/assets
sed -e "s#https://etermacolombia.com/cdn/shop/files/#file://$A/#g" -e 's/\.webp?width=[0-9]*/.webp/g' \
	eterma/landings/clorofull/olor/september.preview.html > /tmp/local.preview.html
node shot.mjs --url=file:///tmp/local.preview.html --width=390 --out=/tmp/m390.png --full
```

---

- **GemPages reordenó el CSS al publicar y la página viva tiene dos defectos (visto el 2026-09-07).**
  Su minificador fusiona las reglas de cuerpo idéntico en la posición de la primera (`/AGENTS.md`
  §4.13): `.cf-close__overline { color: lime }` subió junto a `.cf-section--deep .cf-statement em` por
  encima de `.cf-overline`, y el rótulo del cierre sale **gris** en vez de lima; en escritorio
  `.cf-close__title { font-size: 44px }` subió por encima de `.cf-h2 { 40px }` y el titular del cierre
  sale a **40 px**. Medido sobre `/products/clorofull-1`. Corregido en el fragmento con la base en el
  selector (`.cf-overline.cf-close__overline`, `.cf-h2.cf-close__title`, `.cf-cta.cf-cta--light`, que
  compartía cuerpo con `.cf-section--deep .cf-cta` y solo se salvaba porque GemPages no la movió);
  `node check-css-merge.mjs` da cero cambios. **Hay que volver a pegar el bloque en GemPages** para
  que la página viva lo recoja.

## 9. Antes de dar por bueno un cambio

1. `./preview.sh eterma/landings/clorofull/olor/september.html` y mirarla renderizada a 360, 390 y 1280
   con `shot.mjs` (§8). Una captura de Chrome con `--window-size=390` **no vale**: sale de un layout de
   ~500 px. Para el desbordamiento horizontal, sondear que `innerWidth` coincide con el ancho emulado
   (`scrollWidth > innerWidth` no lo detecta: Chrome ensancha los dos a la vez).
2. En cuanto haya página en GemPages, **medir el `font-size` raíz** y el color computado de los titulares.
   Antes de pegar, `node check-css-merge.mjs eterma/landings/clorofull/olor/september.html` debe dar
   cero cambios a 390 y 1280 (§8, fusión de reglas de GemPages).
3. `./check-cdn.sh` tras tocar cualquier imagen; versionado `-v2` si se reemplaza.
4. Si se toca el CTA, verificar sus tres estados con el runner: reposo (`--wait=2500`), hover
   (`--hover='.cf-hero .cf-cta'`) y servido a medias (`--wait=350`), a `--dpr=2` y recortando el
   botón. El relleno del hover se comprueba leyendo `getComputedStyle(label, '::before').transform`:
   debe ser `matrix(1, 0, 0, 1, 0, 0)` con el ratón encima y `translateY` positivo sin él.
5. Si se toca la retícula de la comparativa, comprobar que **las ocho fichas siguen en el DOM**: se
   generan de una lista y un `sed`/regex mal anclado se comió seis en la primera pasada. `grep -c
   'cf-kit__name'` tiene que dar ocho más las reglas de CSS. Y mirar los iconos renderizados a 3× antes
   de darlos por buenos: a tamaño de marca no siempre se leen.
6. Si se toca cualquiera de los cuatro carruseles (hero, momentos, experiencias, fuentes), sondear con el runner que `maxScroll === lastTarget` (la
   última tarjeta encaja al principio) y que al pulsar el último punto `aria-current` cambia y la tarjeta
   queda pegada al borde del carril, a 390 y 1280. En el vertical, comprobar además que **las tres
   tarjetas miden lo mismo**: si una desborda `--cf-source-height`, el paso deja de ser uniforme. El
   tamaño se ajusta solo con `--cf-story-peek` / `--cf-source-peek` y `--cf-source-card`; no tocar el
   relleno ni el alto del carril a mano. Si se sube `--cf-source-fade`, comprobar que sigue por debajo
   del asomo o la última tarjeta saldrá difuminada. En el arco de los momentos, si cambian los ángulos
   hay que recalcular a la vez las posiciones de los puntos (`x = 160 + 200·sin θ`, `y = 250 − 200·cos θ`)
   y los `rotate` del sol; la sonda confirma el giro leyendo la matriz de `.cf-arc__hand`.
7. Activar el producto en Shopify y enlazar el Product Element antes de probar el formulario.
8. Pegar `/eterma/shared/releasit-form.css` en la pestaña CSS y aplicar en la app lo de
   `/eterma/shared/releasit-form-designer.md`. Reauditar el formulario ya sobre `clorofull-mal-olor`:
   las ofertas de cantidad y el order bump se configuran **por producto**, y en la PDP pública abría
   preseleccionando 2 unidades ($113.400) con un «Envío Prioritario» de $3.500 premarcado.
9. Publicar **solo a petición explícita**.

---

## 10. Ángulo hidratación · El Niño (2026-09-08)

Copy: [`hidratacion/copy - hidratación - clorofull.md`](hidratacion/copy%20-%20hidrataci%C3%B3n%20-%20clorofull.md),
manda sobre todo. Mismo producto, mismos precios ($79.900 / $69.900, ahorras $10.000), **sin pack ×2**,
**sin testimonios** (el copy no trae ninguno: solo la tira de personas reales y el collage del cierre) y con
WhatsApp 300 696 4582 en el cierre y el pie, como en Valeriana. Fragmento:
[`hidratacion/september.html`](hidratacion/september.html), prefijo `cf-` (es el mismo producto), raíz
`#cf-clorofull-calor`, `data-cf-product="clorofull-1"` (el handle sobre el que está publicada la de olor;
confirmar con el cliente, §1).

### Motivo propio: el sol alto y la medida en vaso frío

La línea de marca (`/eterma/AGENTS.md` §2) se mantiene: hueso, verde profundo, hairlines, serif en
titulares, Questrial en cuerpo. **El calor lo ponen las fotos; la interfaz no se calienta** (sin ocres ni
naranjas, que la marca descarta). Lo que cambia respecto a olor, por escrito como piden los kits:

- **Hero «el sol alto».** Encima del marco de la foto va el preheadline del copy en una banda menta con
  un sol de trazo fino cuyos rayos giran una vuelta cada 48 s (`.cf-sun__rays`, `transform-box:
  fill-box`). Debajo, un **carrusel de tres fotos** con flechas y sin puntos (mujer bebiendo al sol —el
  LCP—, fórmula al sol, mano con la botella real) y, **en banda propia bajo el marco, el rótulo de la foto
  activa**: el JS escribe `data-cf-active` en `[data-cf-carousel-host]` y el CSS enseña el rótulo que
  toca. Nada se superpone a la foto (regla del cliente). Marco 6/5 en móvil (4/3 por debajo de 380 px),
  1/1 en escritorio. CTA del hero termina en **825 px a 390×844** y **770 a 360×740**; el sticky cubre
  el resto.
- **«En la prensa».** El «por qué ahora» del ángulo: tres titulares reales (Infobae Colombia 7 sep 2026
  ×2, Consultorsalud 15 jul 2026) con su captura recortada al bloque del titular como prueba y el
  titular repetido como texto, porque a 300 px de ancho la captura no se lee. **Sin enlaces**: no hay
  salidas del embudo. Son las tres capturas que entregó el cliente en `assets/` (medios 1, 2 y 3).
- **«El calor se acumula» = el termómetro.** Un SVG de termómetro cuyo mercurio (`rect` con
  `transform-box: fill-box`) sube de 0,12 a 1 al entrar en pantalla, junto a los tres «Más…» del copy
  como peldaños que se meten hacia dentro en móvil y suben de izquierda a derecha en escritorio. Es un
  motivo, no una medida: no marca grados. Primera versión salía en `column-reverse` (de abajo arriba,
  como sube el mercurio) y se leía al revés del copy: va en orden de lectura.
- **Las cuatro señales = la cadena de medallones** (2026-09-08, a petición del cliente: «estos son
  dolores, quiero que los muestres mejor, más visual, y que uses iconos para cada uno»). «Calambres.
  Mareo. Debilidad. Agotamiento.» cerraba la sección como un párrafo en serif y quedaba plano. Ahora son
  cuatro medallones de 62 px (72 desde 640) **enlazados por un filete a la altura de su centro** —de
  12,5 % a 12,5 % del `<ul>`, que en una rejilla de cuatro columnas son los centros del primero y el
  último— con la **escalada en el fondo**: menta pálida → menta → verde medio → verde profundo, y el
  icono invertido en los dos oscuros (menta y lima). Entran uno detrás de otro con `data-cf-reveal`. El
  filete pasa por detrás: los medallones llevan fondo opaco y `position: relative`.
- **Los iconos salen de la lámina del cliente** (`landings-clorofull-calor-senales.webp`), que trae una
  viñeta por dolor: chispa para los calambres, espiral para el mareo, corazón con pulso para la
  debilidad. Para el agotamiento se dibujó un **reloj de arena** (la lámina usa allí una figura tumbada,
  que no se resuelve a 30 px) y **se cambió también el reloj de la ficha «Agotamiento»** de la sección
  siguiente por el mismo reloj de arena: una palabra, un símbolo. Dos versiones anteriores se
  descartaron por medida, no por gusto: la pierna doblada de los calambres se leía como un garabato a
  30 px (ahora chispa entre dos arcos de contracción) y la espiral cerrada del mareo salía como un
  borrón (ahora vuelta y media con medias circunferencias, que se separan al trazo de 1,8).
- **«Tu cuerpo te avisa».** La composición de sol y síntomas del cliente a la izquierda y las cuatro
  señales como fichas con **numeral en serif sin cero, rótulo pegado al numeral e icono cerrando la fila**
  (regla de los kits).
- **«El calor exige más» = la dosis.** Bloque verde profundo con el vasito servido sobre un plato hueso
  (`mix-blend-mode: multiply`, como en el hero de olor) y «30 ml» en serif a 44/56 px: el único verde vivo
  del bloque va en la foto.
- **«No esperes a tener sed».** Las seis situaciones como fichas con icono (dos columnas en móvil, tres
  desde 640 px, todas a la misma altura); **la del sol es la única en verde profundo**, porque es el
  momento del ángulo. La suma del copy como fórmula con sus dos piezas y el signo en serif; en móvil el
  «+» viaja con la segunda pieza para no quedar huérfano al final de línea.
- **«30 ml. Así de simple».** Las tres formas de tomarlo (directo · diluido en agua · con jugos no
  cítricos) numeradas 1-2-3 con el icono a la derecha, los cuatro datos con filete menta y la foto real
  del vertido (`landings-clorofull-pour.webp`, reutilizada).
- **«El calor puede cambiar tu día» = por dentro.** Bloque verde profundo con la radiografía del cliente
  (`mecanismointerno.png`) **desaturada, al 22 % y fundida al verde con máscara radial** como textura, no
  como protagonista, y los seis síntomas sobre un **eje**: riel vertical con marcas lima en móvil,
  horizontal con las píldoras alternando arriba y abajo en escritorio (píldoras a dos líneas, ±58 px del
  riel, relleno 84 px para que no se pisen).
- **«33 días en cada botella».** Las seis piezas del copy como fichas con icono y la **foto anotada** del
  producto con el vasito (componente de olor: etiquetas «1 litro» y «30 ml» en porcentajes sobre la caja,
  las dos cifras están en la etiqueta del envase).
- **Oferta**: dos tarjetas, **anticipado primero en verde profundo** con lima, iconos de pago en píldora
  blanca y CTA «Quiero ahorrar $10.000»; contraentrega en blanco con «Pedir contraentrega». Los dos CTA
  del copy, en frase. **Garantía** con sello y tres filas numeradas. FAQ con las siete preguntas
  literales. Cierre con precios, CTA «Quiero Clorofull para esta temporada», enlace a WhatsApp y collage
  (Celeste, Ricardo, María Fernanda, Joselin).
- **El CTA es «la medida, en vaso frío».** Misma mecánica que olor (líquido que sube hasta la marca y se
  mece; relleno al pasar), pero en vez de la gota que cae al líquido, **una gota de condensación** nace en
  el borde superior izquierdo y resbala por el cristal cada 5,6 s (`::after` de la etiqueta, `cf-bead`).
  Solo `transform` y `opacity`; `is-inview` sirve y pausa; sin JS es una píldora estática; con
  `prefers-reduced-motion` no hay gota. Las variantes cambian el color de la gota con `--cf-bead`.
- **Revelado genérico**: los bloques con `data-cf-reveal` entran escalonados (`:nth-child` 1-6); el
  termómetro añade su propia transición sobre el mercurio.
- Relleno de sección **44 px móvil / 64 escritorio**, como Valeriana.

### Copy: qué no es literal

- Los CTA van en frase, no en versales (regla de marca): «Quiero mi Clorofull», «Quiero ahorrar
  $10.000», «Pedir contraentrega», «Quiero Clorofull para esta temporada».
- Los rótulos de las fotos del hero se componen con frases del copy («30 ml al día. Directo del vaso
  medidor.», «Clorofila. Vitaminas. Minerales. Todo en 30 ml.», «1 litro. 33 días en cada botella.»).
- La marquesina superior junta fragmentos del copy; los overlines («En la prensa», «Las señales», «Cómo
  se toma», «Oferta», «Garantía») son andamiaje, no copy.
- **El registro sanitario va como `RSA-0029174-2023`**: el copy dice `RS-0029174-2023`, pero el número
  real de la etiqueta y del pie de olor lleva la A. Es una errata del copy, no una decisión.
- El aviso legal del pie es el de olor adaptado («No reemplaza el consumo de agua durante el día…»).
- Las cuatro señales pierden el punto final al pasar de párrafo a rótulo de medallón («Calambres», no
  «Calambres.»): las palabras son las del copy, la puntuación es del formato.

### Imágenes de este ángulo

Las crudas que entregó el cliente en `hidratacion/assets/` se movieron a
`product-images/clorofull/calor/` (fuera de git); `assets/` del producto solo guarda lo optimizado.
**Las personas son las mismas fotos del pool** (`md5` idéntico a `humanized-images/clorofull/`), así que
se reutilizan los `ugc-*` de olor y solo se generan dos nuevas.

| Archivo | Origen | Uso |
|---|---|---|
| `landings-clorofull-calor-hero.webp` | `img-hero-1.png` del cliente (1254², composición al atardecer con hielo; **no es** la `hero-1` de olor, que es la misma modelo en interior), a 1200 q82 | Hero, primera foto (LCP) |
| `landings-clorofull-calor-formula.webp` | `ChatGPT Image … 02_27_45` (botella al sol con Clorofila / Vitaminas / Minerales rotulados: los tres rótulos coinciden con el copy) | Hero, segunda foto, y sección de la fórmula |
| `landings-clorofull-calor-senales.webp` | `ChatGPT Image … 02_25_04` (sol, viñetas de síntomas y botella) | «Tu cuerpo te avisa» |
| `landings-clorofull-calor-interno.webp` | `mecanismointerno.png` (radiografía), a 1200 q78 | Textura del bloque «El calor puede cambiar tu día» |
| `landings-clorofull-calor-prensa-{infobae-salud,consultorsalud,infobae-agua}.webp` | `medios 2/1/3.png`, recortadas al bloque del titular a proporción 3,8:1 (1000×263) | «En la prensa» |
| `landings-clorofull-ugc-celeste.webp`, `-maria-fernanda.webp` | `celeste 1.png`, `maria fernanda.png` a 4:5, 720×900 | Tira de personas y collage |
| Reutilizadas de olor | `hero-hand`, `pour`, `vasito-medidor`, `producto-vasito`, `instagram`, logos, `pay-*`, `ugc-*` | Ya en el CDN |

**No se usan:** `ChatGPT Image … 02_25_17` (infografía con «HIDRATA · Repone líquidos de forma
efectiva», «RESTAURA · Apoya tu energía y vitalidad»… **claims incrustados en la imagen que el copy no
hace**), `tabla-clorofull.jpeg` (foto de la etiqueta con «porción ½ vaso 120 ml · 8 porciones», que
contradice los 30 ml/33 dosis del copy) y `luciana.png` (rótulo «50% de descuento» incrustado).
`modo de uso - cloro.png`, `clorofull 2.png` y `vasito medidor clorofull.jpg` son los originales de
`pour`, `hero-hand` y `vasito`, ya optimizados.

**Pendientes de subir a Contenido → Archivos (9):** las cuatro `calor-*` de campaña, las tres de prensa y
las dos personas nuevas. `./check-cdn.sh eterma/landings/clorofull/hidratacion/september.html`.

### Medidas (vista previa local, 2026-09-08)

- Sin desbordes a 360, 390 ni 1280. Alto de página: 9 874 / 9 817 / 8 277 px (olor: ≈12 700 a 390).
- La cadena de señales cabe en cuatro columnas en todos los anchos: «Agotamiento» mide 80 px en una
  columna de 86 a 390 px, y por debajo de 380 el rótulo baja a 12,5 px (71 en 78). El filete se sitúa
  a la mitad exacta del medallón (30 px de 62; 35 de 72 desde 640).
- `node check-css-merge.mjs …/hidratacion/september.html`: **cero cambios** a 390 y 1280. Antes de eso, el
  lima de los dos subtítulos sobre verde se perdía en la fusión (dos modificadores con el mismo cuerpo
  subían por encima de `.cf-h2 + .cf-serif-line`); se resolvió por contexto
  (`.cf-section--deep .cf-h2 + .cf-serif-line`), no por modificador.
- Los `<span>` dentro de `.cf-stack`, `.cf-axis__item`, `.cf-tile` y `.cf-sum__part` llevan la serif por
  clase: la regla por etiqueta `.cf-lp span → sans` gana a la herencia y salían en Questrial.

### Publicada como landing de `/pages/` (2026-09-11)

`etermacolombia.com/pages/clorofull-hidratacion` es una **landing de GemPages**, no una ficha de
producto: olor vive en `/products/clorofull-1`. Las dos enlazan el mismo producto, pero en `/pages/` el
formulario de Releasit salía **sin las ofertas de cantidad** (1, 2 o 3 unidades). La causa: el JSON de
producto del app embed (`#rsi-cod-form-product-cache`) sale `null` sin `product` en Liquid. Lo arregla
`initReleasitProductCache()` en el JS de la landing, que lo rellena con `/products/clorofull-1.js`.
Verificado en vivo inyectando esa misma función: las tres ofertas salen idénticas a las de la ficha.
Detalle en `docs/releasit-form-styling.md` §4.4. **Si cambia el producto de la landing, cambiar
`PRODUCT_HANDLE`**: ahora también decide qué ofertas enseña Releasit.

---

## 11. Remarketing · la bajada de precio (2026-09-17)

La ve **quien pasó por la landing principal y no compró**. De sus objeciones, la que se ataca es el
precio: el producto baja $10.000 y eso manda desde el hero y a lo largo de toda la página. Copy:
[`remarketing/copy landing remarketing - Clorofull.txt`](remarketing/copy%20landing%20remarketing%20-%20Clorofull.txt),
**manda sobre todo**. Fragmento: [`remarketing/september.html`](remarketing/september.html).

| | Contraentrega | Anticipado |
|---|---|---|
| Remarketing | **$69.900** (antes $79.900) | $59.900 (ahorras $10.000 extra) |
| Olor e hidratación | $79.900 | $69.900 |

**Aquí manda el contraentrega, no el anticipado** (corrección del cliente, 2026-09-17): «lo importante
es resaltar el precio de 69.900, este producto originalmente vale 79.900, la rebaja del precio es a
69.900… el foco principal es el precio contra entrega que ya tiene una rebaja de 10 mil». Es la
**excepción** a la regla de marca de resaltar siempre el anticipado. El anticipado sigue visible en
todas partes, pero como **descuento extra**, en segundo plano.

**El tachado de $79.900 es un precio real**, no un «antes» inventado (`/eterma/AGENTS.md` §1): es lo que
cuesta hoy en la tienda y en la landing principal, y lo confirmó el cliente.

### ⚠️ Antes de publicar: el producto no existe a ese precio

Releasit cobra **el precio del producto de Shopify**, no el que pinta la landing. Leído
`/products.json` el 2026-09-17: los cinco Clorofull (`clorofull™`, `clorofull-1`, `clorofull`,
`clorofull-2`, `clorofull-mal-olor`) están a **$79.900**. Con cualquiera de ellos el formulario abriría
$20.000 por encima de lo que promete la página. Hace falta **un producto propio de este embudo a
$69.900**, con el ahorro del pago anticipado configurado en Releasit a **$10.000** (hoy la app ofrece
$5.000, `/eterma/AGENTS.md` §5) y sus ofertas de cantidad revisadas. `PRODUCT_HANDLE =
'clorofull-remarketing'` es **provisional**: poner el handle real al crearlo.

### Otra piel, a propósito

Decisión del cliente: **no puede parecerse a olor ni a hidratación**. Las dos comparten franja verde con
marquesina, logo centrado sobre blanco, foto a sangre, titular con cursiva, rejilla de dos precios y CTA
verde profundo. Esta va con la línea **«Eterma viva»** de los kits (`/eterma/AGENTS.md` §2): Fraunces,
papel cálido, **sin cabecera** (la firma va dentro del boleto del hero y el wordmark gigante en el pie), CTA lima tipo
pegatina y **menta** como color de Clorofull. Prefijo **`cr-`**, raíz `#cr-clorofull-remarketing`.

### Motivo: «la bajada»

- **El precio va en un boleto.** Parte de arriba en verde profundo con el **contraentrega**: «Pago contra
  entrega», **$79.900 tachado con la etiqueta «$10.000 menos» al lado** (antes → rebaja → ahora, en una
  fila) y **$69.900** en grande. Debajo, un **troquel** con agujeros y una muesca a cada lado (toman el
  color del fondo con `--cr-notch`, que fija cada sección) y el talón claro: en el hero, el anticipado
  como extra («Pago anticipado $59.900 COP · Ahorras $10.000 COP pagando anticipado.»); en la oferta y
  el cierre, el CTA del contraentrega. Con `--bottle` (solo en el cierre) **la botella recortada se
  apoya en el troquel**, con un halo menta detrás.
- **La firma va en el boleto del hero** (`--brand`, pedido del cliente el 2026-09-17): Eterma sobre el
  chip «Clorofull», **arriba a la derecha**, a la altura de la etiqueta y del precio tachado. Van
  **apiladas** porque en la fila de la etiqueta no caben (172 + 165 px contra 314 a 390). Rejilla
  `'label brand' 'was brand' 'price price'`: el precio sigue usando todo el ancho. El wordmark va en
  papel con la hoja menta y el chip en menta translúcida (`--cr-glow`), para no competir con la
  etiqueta «$10.000 menos», que es menta sólida.
- **El primer dígito rueda de 7 a 6**: de $79.900 a $69.900, que es lo único que cambia entre las dos
  cifras. Es una ventana de una línea con una tira `6 / 7` dentro: arranca enseñando el 7, espera
  0,6 s, baja en 1,1 s con aceleración y frenada, y rebota al asentarse. Después aparece la etiqueta
  «$10.000 menos». Solo `transform` y `opacity`. Pasa **una vez por boleto**, al verse al 60 %
  (`initDrops`): en el hero, en la oferta y en el cierre. **Sin JS o con movimiento reducido no se arma
  y se ve el precio final.** El precio real va en un `<span>` oculto para lectores de pantalla («Antes:
  $79.900», «Ahora: $69.900 COP»); la cifra animada es `aria-hidden`.
- **El anticipado es la tarjeta blanca** (`.cr-plan`) en la oferta y el cierre: $59.900 en Fraunces más
  pequeño que el del boleto, etiqueta menta «Ahorras $10.000…», su CTA lima y Visa, Mastercard y PSE.
  Los dos CTA son lima: los dos son compra; la jerarquía la pone el boleto, no el botón.
- **El rotulador de menta** (`.cr-mark`) subraya «$10.000 menos» en el hero y en la oferta. En el cierre
  el titular del copy dice «Empieza hoy por $59.900» y se deja **sin** rotulador: el protagonista es
  $69.900. Va con `white-space: nowrap`: en escritorio «$10.000 / menos» se partía entre líneas.
- **El CTA es «la etiqueta»**: píldora lima con una etiqueta de precio colgada de su hilo que se mece
  (`rotate` desde el hilo); al pasar el dedo, el lima vivo **baja desde arriba**, como el precio. El
  agujero de la etiqueta se hace con `fill-rule: evenodd` y deja ver el lima: `var()` no vale en un
  atributo SVG. La primera versión, estrecha y alta, se leía como una botellita. `.cr-cta--ghost` (borde
  y sin lima) queda definido pero hoy no lo usa ningún botón.

### Piezas (ninguna repite las de olor, hidratación ni los kits)

| Sección | Mecanismo |
|---|---|
| Barra | **Tres avisos que se turnan** (suben, se quedan y se van, 12 s por vuelta), con **festón de cupón** abajo. 30 px de alto: el cliente la quería más baja. Sin JS se queda el primero; con movimiento reducido se apilan los tres |
| Prueba social | **Historias**, como en Instagram, que es de donde llega este tráfico: foto 4:5 que avanza sola cuando se llena su barra (4,5 s, `--cr-story-time`, el único sitio donde vive el tiempo), se pausa fuera de pantalla y mientras se toca, y sigue al dedo y a las flechas. Barras en banda propia arriba, nombre y flechas en banda propia abajo: **nada sobre la foto** |
| Identificación | **Cuatro escenas que se apilan** al bajar (`position: sticky` con `top` creciente de 14 en 14 px): cada una tapa la anterior y deja asomar su franja. Sin JS. En escritorio, rejilla 2 × 2 |
| Producto | **La toma en foto real** (Ana sirviendo su medida en el vasito) con los tres datos apilados al lado, y debajo el **calendario de 33 vasitos** (11 × 3), que se llenan columna a columna al entrar en pantalla: lo que da de sí una botella |
| Uso | Foto del vertido en **arco** y «30 ml» a 58–72 px; las tres formas de tomarlo en fichas |
| Objeciones | **La respuesta en grande** («33 días.», «No.»): se lee sin leer la pregunta. La del vaso medidor lleva **la foto del vasito servido en la mano**, en círculo |
| Confianza | **La ficha**: los datos del fabricante con filetes gruesos y finos, como la tabla de un envase, junto a **la botella con sus ingredientes señalados** (segunda foto del hero de olor) |
| Oferta | **La botella en la mano con «1 litro · 33 días completos»** (tercera foto del hero de olor, recortada) entre el titular y los precios: el valor, justo cuando se decide. Después, el boleto del contraentrega (con «Pagas cuando recibes tu pedido.» y su CTA) y la tarjeta blanca del anticipado con su CTA y los medios de pago |
| Qué recibes | **Lista de empaque**: cada renglón se marca uno tras otro, papel con el borde en dientes |
| Garantía | El único bloque en verde profundo: **la ruta del pedido**, tres pasos unidos por un camino |
| Cierre | **Valentina sirviendo en el vasito**, bajo el titular; el boleto del contraentrega otra vez, con la botella (el dígito vuelve a bajar), y debajo la tarjeta del anticipado |

- **Forma de pago.** Los CTA del copy que eligen pago llevan `data-cr-pay-choice="prepaid|cod"` y lo
  escriben en `<html data-cf-pay>` para la skin de Releasit; **los genéricos lo borran**, para no
  arrastrar una elección vieja si se cierra el formulario y se vuelve a abrir desde el hero.
- Sticky: **`$69.900`** y «~~$79.900~~ · pagas al recibir», sale con medio scroll
  (`STICKY_REVEAL_MARGIN`) y se esconde en el cierre, el Instagram y el pie.
- El CTA del producto («Quiero empezar por $59.900») lleva `data-cr-pay-choice="prepaid"`: su texto es
  el precio anticipado, así que el formulario abre resaltando esa opción.
- Medios de pago (ficheros `landings-shared-*`) en la oferta, el cierre y el pie; **nunca en el hero**.
  Instagram (`landings-shared-instagram.webp`) antes del pie, enmarcado en menta y sin enlace.

### Copy: qué no es literal

- **La barra** va en frase («Clorofull · $10.000 menos con pago anticipado») y no en versales, como
  todos los titulares de la marca; su segunda línea se parte en dos avisos («1 litro para 33 días · Vaso
  medidor de regalo» y «Hecho en Colombia») porque entera no cabe en una línea a 360 px.
- **«CLOROFULL» del hero** es el chip bajo la firma de Eterma, dentro del boleto; el del cierre, la versalita encima
  del titular.
- **El $79.900 tachado y la etiqueta «$10.000 menos» del boleto no vienen en el copy**: salen de la
  corrección del cliente (el precio original es $79.900 y la rebaja es a $69.900). «$10.000 menos» es la
  frase del propio titular del copy.
- **En la oferta y el cierre el contraentrega va primero**, aunque el copy da antes el anticipado y
  llama «principal» a su CTA: manda el foco que pidió el cliente. Los textos de los CTA son los del copy.
- El párrafo del producto y los datos («1 litro para 33 días»…) bajan bajo el CTA en móvil y en
  escritorio, para que el boleto quede arriba.
- **Dirección: `Carrera 59 # 5B-31`**, la de la etiqueta; el copy escribe «#5-B31».
- El titular del Instagram («Hay una marca detrás de tu Clorofull. Y está en Instagram.»), el registro
  **INVIMA RSA-0029174-2023** del pie y su aviso legal (el de olor) **no vienen en este copy**: son los
  de la marca. En «Confianza» el copy dice «registro sanitario aplicable» y así se deja.

### Imágenes

**Nada que subir**: todo sale de lo que ya está en el CDN (`check-cdn.sh` en ok el 2026-09-17, incluidos
los cuatro `landings-shared-*`). **El hero lleva la foto principal de olor** (`landings-clorofull-hero-1`,
la mujer que toma su medida del vasito junto a la botella; pedido del cliente), enmarcada, sin nada
encima y **entera en todos los anchos** (1200:1141). La botella va de arriba abajo del encuadre y
cualquier recorte la corta: el 16:9 que llevaba en móvil lo rechazó el cliente («el producto se corta y
eso no está bien, se ve mal», 2026-09-17). **No volver a recortarla.** Para hacerle sitio, la firma pasó
al boleto, la barra bajó a 30 px y se redujeron el titular (34 px; 31 por debajo de 381; 50 en
escritorio), la bajada (19 px, en una línea desde unos 382 px de ancho) y los márgenes. En tablet
(640–899) el hero va en una columna de 600 px: a todo el ancho la foto pasaba de 800 px de alto y el
CTA se iba lejos. Además, botella
recortada (`bottle`, solo en el cierre), vertido (`pour`), botella con el vaso (`producto-vasito`) y
cuatro personas del pool en las historias: **Ana (tomando del vasito, abre), Joselin, Camilo y Víctor**.
**Natalia no se usa aquí**: su foto está girada 90° de origen y como primera historia salía tumbada.

**Producto + vasito en foto real, en tres puntos más** (pedido del cliente, 2026-09-17: «le hacen falta
imágenes del producto + vasito como de UGC»). Una foto distinta en cada sitio, sin repetir la del hero:

| Dónde | Foto | Fichero |
|---|---|---|
| Producto («Una toma diaria») | Ana sirve su medida de la botella al vasito | `landings-clorofull-ugc-ana-vasito.webp` · nuevo, **ya subido** (`check-cdn.sh` en ok) |
| Objeciones («¿Cómo sé cuánto servir?») | El vasito servido, en la mano | `landings-kit-dia-liviano-vasito-clorofull.webp` · ya en el CDN (lo publicó Día Liviano; `check-cdn.sh` avisa de que no está en esta carpeta, y es correcto) |
| Cierre | Valentina sirve en el vasito | `landings-clorofull-ugc-valentina-vasito.webp` · ya en el CDN |

- `ugc-ana-vasito` sale de `humanized-images/clorofull/ana 2.png` (718 × 1256), **recortada a 4:5 sin
  ampliar** (718 × 898, desde y = 110 para que entren cara, botella y vasito), `-strip`, q84 · 30 KB.
- **Ana 1 no vale para el cierre**: de la botella solo asoma el tapón. **`calor-hero` tampoco**: es la
  misma modelo que la foto del hero.
- El nombre de quien sale va **en banda propia bajo la foto** (`.cr-who`), nunca encima.

**La segunda y la tercera foto del hero de olor**, también a petición del cliente («creo que son buenas
imágenes que pueden ayudar»). Las dos ya estaban en el CDN:

| Dónde | Foto | Por qué ahí |
|---|---|---|
| Confianza, junto a la ficha | `hero-2`: la botella con clorofila, estevia, vitamina C, zinc y selenio señalados (los cinco están en la etiqueta) | «Saber qué compras» es qué lleva dentro además de quién lo hace |
| Oferta, entre el titular y los precios | `hero-3`: la botella en la mano con «1 litro» y «33 días completos» | El valor de la botella justo donde se decide el precio |

⚠️ **`hero-3` va recortada a propósito.** Su tercer dato dice **«30 mil al día» junto a un icono de
moneda**. Es casi seguro que quería decir 30 ml, pero en una landing cuyo argumento es el precio se lee
como «$30.000 al día» (el día real sale por unos $2.100). `.cr-offer__photo` la sirve a **16:10 anclada
arriba**: se ven los 750 px superiores de los 1200 y el dato empieza hacia los 830. Medido a 320, 360,
390, 640, 899, 900 y 1280: siempre 16:10 y 750 px. **No cambiar la proporción ni el anclaje** sin mirar el
recorte; si se quiere la foto entera, pedir al cliente la versión corregida («30 ml al día», con el icono
del vaso). La landing de olor la publica entera: allí el precio no es el tema, pero conviene corregirla
también.

### Medidas (vista previa local, 2026-09-17)

Con la foto del hero entera y la firma dentro del boleto:

| Ancho | Boleto | CTA del hero | Sticky | Alto de página | Desborde |
|---|---|---|---|---|---|
| 360×740 | 456–667 | **679–737**, entero en la primera pantalla | 460 px | 12 186 px | ninguno |
| 375×667 | 470–681 | 693–751: **fuera**; el sticky sale desde el principio | desde 0 | 12 208 px | ninguno |
| 390×844 | 505–741 | **753–811**, y la nota de entrega hasta 844 | 480 px | 12 304 px | ninguno |
| 412×915 | 526–762 | 774–832 | 480 px | 12 220 px | ninguno |
| 768×1024 | 651–887 | 899–957 | 560 px | 12 986 px | ninguno |
| 1280×900 | 237–517 | 539–597 | — | 10 342 px | ninguno |

A 375×667 (iPhone SE) el CTA del hero ya no entra: la foto entera no deja sitio. Se ve el precio del
contraentrega y el sticky trae precio y CTA desde el primer momento.

Los altos incluyen las cinco fotos añadidas después (las tres de producto + vasito y las dos del hero de
olor). Sin desbordes de 320 a 1280.

- **El precio nunca toca la botella** (boleto del cierre): 15 px de holgura a 360, 20 a 390, 60 a
  1280, 3 a 320. El «COP» se queda en la línea del precio de 340 a 1280 en los tres boletos; a 320 baja
  de línea en vez de desbordar (`flex-wrap`). El precio va a 56 px en móvil (52 por debajo de 381; 50
  con botella, 44 con botella por debajo de 381) y a 72 en escritorio.
- **A ≤380 se recorta aire del hero** (márgenes, relleno del boleto, titular a 31 px, bajada a 17 px en
  una línea y precio tachado a 18 px con menos hueco, para que quepa junto a la firma) para que el CTA
  entre a 360 × 740. A 320 la etiqueta baja a 1 px de espaciado para seguir en una línea junto a la
  firma; el precio tachado y su rebaja sí bajan a dos líneas; **a ≤340** el texto de los CTA baja a 15 px: «Quiero Clorofull por $59.900» desbordaba
  la tarjeta del anticipado a 320.
- `check-css-merge.mjs`: **sin cambios** a 390, 768 y 1280 (405 reglas, 24 fusiones simuladas).
  **Ojo:** a 1280 puede marcar, de vez en cuando y **también en el control `--no-merge`**,
  `.cr-close__layout margin-left/right: 0px → 80px`. No es la fusión: Chrome devuelve en esas pasadas el
  valor computado del `auto` en vez del usado. La caja está en x = 80 en todas las pasadas
  (`getBoundingClientRect`). Se repite y sale limpio.
- **Las tres pestañas** (`./split-tabs.sh`, CSS −26 %, JS −28 %) montadas de nuevo dan una página
  **idéntica píxel a píxel** a la del fragmento a 360, 390, 768 y 1280, y conservan las historias, la bajada, el
  sticky y la elección de pago.
- Comprobado sin JS (primer aviso de la barra, precio final, historias deslizables sin barras ni
  flechas, sticky fuera) y con movimiento reducido (nada se mueve; los tres avisos apilados, 79 px).
  Esa prueba destapó que el calendario seguía animándose con movimiento reducido: su regla ganaba por
  especificidad a la que apaga los revelados. Corregido.
- El apilado de las escenas **no se ve en una captura de página completa** (`captureBeyondViewport`
  descoloca lo `sticky`): se comprobó midiendo las tarjetas al hacer scroll (20 / 34 / 48 px) y con
  capturas solo del viewport.

### Pendientes

1. **Crear el producto a $69.900** en Shopify, con el ahorro anticipado de $10.000 en Releasit, y poner
   su handle en `PRODUCT_HANDLE` y en el Product Element (§11, arriba).
2. Pedir al cliente la **versión corregida de `hero-3`** («30 ml al día»): hasta entonces va recortada.
3. Pegar en GemPages **en sus tres pestañas** y, detrás del CSS, `/eterma/shared/releasit-form.css`.
4. Medir en vivo el `font-size` raíz y probar el formulario con el producto nuevo.
5. **No publicar sin pedirlo el cliente.**

---

## 12. Detox digestivo · «la frontera» (2026-10-09)

Copy: [`detox/copy_landing_detox_clorofull.txt`](detox/copy_landing_detox_clorofull.txt), **manda sobre
todo**. Fragmento: [`detox/september.html`](detox/september.html). Prefijo **`cd-`**, raíz
`#cd-clorofull-detox`. Mismo producto y mismos precios que olor e hidratación (**$79.900 contraentrega /
$69.900 anticipado**, ahorras $10.000), sin pack ×2, sin order bump ni upsell (no hay copy).

**Aquí manda el contraentrega** (corrección del cliente, 2026-10-09): «el precio de anticipado no se debe
resaltar, el contraentrega es el precio primario». La primera versión salió con el anticipado delante,
por la regla de marca, y se rehízo. **$79.900 es la cifra grande** en el hero, el sticky, la oferta y el
cierre; el anticipado va al lado o debajo, visible, **sin tachar nada y sin lima ni verde profundo**. Es
lo que dice el propio copy, que abre con «Precio: $79.900» y da el anticipado como frase aparte. Con
remarketing y Nambu ya son tres: **si el copy abre con el contraentrega, manda el contraentrega.**

### Otra piel, a propósito

Pedido del cliente: «quiero que seas creativo y uses una nueva línea visual, diferente a los ángulos ya
existentes de este producto». Es la **cuarta piel** de Clorofull. Lo que la separa de las otras tres:

| | Olor / hidratación | Remarketing | **Detox** |
|---|---|---|---|
| Arranque | Franja verde + logo centrado | Barra de avisos que se turnan | **Sin barra ni cabecera**: firma pequeña a la izquierda, dentro del hero |
| Color | Hueso, gris frío, verde profundo | Papel cálido, crema, menta | **Dos tonos con significado**: crema es lo que entra, menta es lo que sale |
| Superficies | Filetes, radios 10–14 | Boleto con troquel, tarjetas de 22 px, sombra sólida | **Lámina y filete, radio 8**; solo el CTA es píldora |
| Hilo | El momento del día / el sol | La bajada del precio | **La ruta**: seis hebras que se juntan en una y entran en el bloque verde |
| CTA | La medida (el vasito se llena) | La etiqueta que se mece | **El paso**: un punto cruza la frontera |

**El motivo sale del copy, no de un adorno.** «Seis motivos. Una sola ruta.» y «El intestino decide qué
se absorbe y qué sale. Clorofull trabaja justo en esa frontera.» Por eso:

- **Crema = fuera, menta = dentro.** `.cd-section--outside` (crema) lleva lo que entra: las seis
  entradas y los testimonios, que hablan del antes. `.cd-section--inside` (menta) lleva lo que se gana:
  beneficios, uso, bono y cierre. El resto va en papel. **No es alternancia decorativa**: si se añade
  una sección, se le da el tono que le toca por lo que dice.
- **La frontera es el único bloque verde del argumento** («Lo que entra, pasa por aquí.»), con la foto
  de vellosidades del cliente de fondo: en gris, **al 50 %** (salió al 20 % y el cliente la quiso más
  visible) y con un velo verde que oscurece arriba y abajo y la deja respirar en medio. **No subirla más
  sin volver a medir**: el contraste se calcula contra el píxel más claro que queda detrás de cada
  texto, no contra el verde plano, y hoy el más justo da 5,3:1. Para eso el texto de las paradas pasó
  del tono suave al claro (con el suave se quedaba en 4,7:1). El verde profundo vuelve en la garantía y
  en el pie: tres veces, como pide la marca.
- **El rótulo de sección lleva un filete verde delante** (`.cd-overline::before`): es la marca de
  estación de la ruta y sale en todas.
- **Titulares en dos frases**, la segunda en verde medio (`.cd-h2__soft`), porque el copy los trae
  siempre así («33 días. / Un hábito.», «Gotero. / O litro.»). Fraunces 600 en titulares y cifras,
  Questrial en el resto, como en la línea «Eterma viva».

### Piezas (ninguna repite las de olor, hidratación, remarketing ni los kits)

| Sección | Mecanismo |
|---|---|
| Hero | Firma + chip «Clorofull», titular, **carrusel de cuatro fotos** (las cuatro `img_*` del cliente, en su orden: Joselin con el tracto digestivo dibujado en verde, Celeste con la botella, la mano con «1 litro · 33 días» y la tabla nutricional), **mando en banda propia debajo** —nada tapa la foto—, ficha de tres datos, **banda de precio** y CTA. Todo en la primera pantalla |
| Caras | Cuatro retratos **redondos** con nombre real (Joselin, Celeste, Gabriela, Ana). Sin titular: son prueba, no sección |
| Lo que entra | **El mapa de la ruta** (rehecha el 2026-10-09; ver abajo): un tronco baja por el centro y los seis motivos se le unen, uno a cada lado y a alturas alternas, cada uno por su ramal curvo y con su empalme. Abajo, la frase «Todos pasan por el mismo lugar: tu intestino.» en píldora verde y **una sola línea que baja hasta tocar el bloque verde** (la sección va sin relleno abajo para que la toque) |
| La frontera | **La ruta**: un riel lima que crece de arriba abajo (`scaleY`) y tres paradas que se encienden en orden. La del medio —«Se intercepta.»— es la frontera: nodo lleno en menta, con halo, y nombre en lima. **De fondo, las vellosidades a la vista** (el cliente pidió que la foto «se vea un poco más») |
| La fórmula | Tres fichas con **la foto de cada ingrediente** y su «Para tu…» en verde; debajo, la botella con sus ingredientes señalados (segunda foto del hero de olor) junto a «Además: vitaminas y minerales…» |
| Lo que ganas | Seis fichas blancas con **la lámina del cliente en un círculo de menta**. Son seis, como las entradas, a propósito: seis motivos, seis respuestas |
| El proceso | **La regla de 33 marcas**: tres tramos (7, 14 y 12) de claro a oscuro, la primera marca de cada tramo más alta. Crecen al entrar. En escritorio cada tramo del copy cae **bajo su trozo de regla** (`7fr 14fr 12fr`) |
| Cómo se toma | Foto del vertido, «30 ml.» a 40–58 px (la dosis es la unidad de la marca) y los tres pasos numerados **1, 2, 3** (sin cero) |
| La oferta | **La botella entera al lado del precio** y, debajo, las dos formas de pago: **contraentrega primero, en verde profundo** (`.cd-plan--main`), con el CTA lima; anticipado en blanco, con CTA de borde y los medios de pago |
| El bono | El vaso medidor en primer plano y el pedido como lista con **la hoja del logo de viñeta** |
| Lo cuentan ellas | **Carrusel** (regla de marca) con flechas y puntos; la tarjeta siguiente asoma. Debajo, el respaldo en tres renglones |
| Gotero o litro | Tabla con **las dos fotos reales** y un icono por criterio. La columna de Clorofull es **una banda de menta continua**, de la foto a la última fila |
| Garantía | Bloque verde con sello |
| Cierre | **Collage de UGC** (pedido del cliente: «antes de finalizar la landing debe haber un collage de UGC»): una foto grande —Valentina sirviendo su medida— y cuatro pequeñas (Natalia, María Fernanda, María de los Ángeles, Camilo) en una retícula de cuatro columnas, sin giros: el de olor va con las fotos torcidas, este no. Después, los tres puntos del copy, precio y CTA |

- **El CTA es «el paso».** Píldora lima con un filete vertical cerca del borde derecho —la frontera— y
  un punto que sale apagado a su izquierda, **lo cruza y llega entero al otro lado** (3,6 s por vuelta).
  Al pasar el dedo o el ratón, el lima vivo **entra desde la izquierda**, en la misma dirección. El
  punto es `<span class="cd-cta__pass">` y vive **en el hueco entre el texto y el filete**: la primera
  versión pasaba por debajo del texto y se leía como un punto y seguido pegado a la última letra. Solo
  `transform` y `opacity`; `is-playing` lo sirve y lo pausa; sin JS es una píldora quieta; con
  `prefers-reduced-motion` no hay punto. `--quiet` (borde, relleno menta) es el del contraentrega.
- **«Seis motivos. Una sola ruta.» es un mapa, no una rejilla.** La primera versión eran seis tarjetas
  altas en dos columnas con las hebras debajo, y el cliente la devolvió: «muy larga y muy lineal…
  enfócate en el concepto de que es una ruta y plasma la idea de esa forma; la conexión con la siguiente
  sección sí está perfecta, eso debe mantenerse». Ahora:
  - **Tronco y ramales.** El tronco es el `::before` de `.cd-map`; cada ramal, el `::after` de su
    parada (un cuarto de círculo hecho con dos bordes, de radio medio hueco central) y cada empalme, su
    `::before`. Cuelgan de la parada, así que **se colocan solos con cualquier ancho**: no hay SVG ni
    coordenadas que mantener. Todo sale de cuatro variables de `.cd-map`: `--cd-map-gap`,
    `--cd-stop-art`, `--cd-pitch` y `--cd-route-w`.
  - **Zigzag.** Rejilla de dos columnas y siete filas; cada parada ocupa dos filas y empieza una más
    abajo que la anterior (`grid-row: n / span 2`), impares a la izquierda y pares a la derecha. Si un
    texto necesita más alto, las filas ceden solas.
  - **Las láminas, recortadas por CSS.** Los ficheros `entra-*` (480 × 744) traen el dibujo y una fila
    de pictogramas que a 80 px no se lee. Cada parada dice qué cuadrado del lienzo enseña
    (`--cd-crop`, `--cd-crop-x`, `--cd-crop-y`, en px del original, medidos sobre el alfa) y la imagen
    se escala y se corre hasta que ese cuadrado llena la caja. **No hubo que subir imágenes nuevas.**
  - **En escritorio** la lámina y su texto van en fila, con la lámina siempre del lado del tronco.
  - **Lo que no se toca:** la píldora y la línea que entra en el bloque verde (`.cd-merge`).
  - Mide **728 px a 390** (antes 1 119) y 723 a 1280.
- **Dos atributos de revelado.** `data-cd-reveal` escalona a los hijos; `data-cd-play` arma una pieza con
  coreografía propia (el mapa, la ruta, la regla). Van separados para que la regla genérica nunca
  toque a las piezas: así no dependen del orden del CSS, que GemPages cambia.
- **El carrusel tiene una parada por punto.** Un `::after` del carril, de ancho
  `100% − tarjeta − hueco`, deja el sitio justo para que **la última tarjeta encaje al principio**. No
  se hace con `padding-right`: algunos navegadores lo ignoran en un carril con scroll. Medido:
  encajes `[0, 324, 649]` y `maxScroll 649` a 390; `[0, 538, 1076]` y `1076` a 1280.
- **Un solo carrusel en el script, dos en la página.** `initCarousel` vale para cualquier
  `[data-cd-carousel]`: las fotos del hero y los testimonios. Cada uno dice cómo se llaman sus puntos
  con `data-cd-carousel-label`; las flechas son opcionales. El del hero lleva el mando fino
  (`.cd-mando--slim`): **solo puntos en móvil**, para no gastar alto de la primera pantalla, y flechas
  desde 900 px. La segunda foto va con `loading="lazy"`; el LCP es la primera.
- **El carrusel del hero va enmarcado** (pedido del cliente, 2026-10-09: «algún border o algo que haga
  parecer que está enmarcado y resalte un poco»): paspartú de menta de 6 px (`--cd-frame-pad`), filete y
  sombra. Las fotos traen el fondo blanco y sin marco se fundían con el papel. **Los puntos van dentro
  del marco**, como el pie de una lámina. El radio de fuera es el de dentro más el paspartú, para que
  las dos curvas vayan paralelas. No gasta alto: la foto cede 12 px de ancho y el marco los devuelve.
- **El CTA del hero ocupa todo el ancho** de su columna (354 px a 390; 488 a 1280), también por pedido
  del cliente. Los demás CTA siguen a su ancho natural, salvo los de las tarjetas de pago.
- Sticky: **`$79.900`** y «pagas al recibir». Sale con medio scroll
  (`STICKY_REVEAL_MARGIN`) y se esconde en el cierre, el Instagram y el pie. Oculto en escritorio.
- Forma de pago: igual que remarketing (`data-cd-pay-choice` → `<html data-cf-pay>`; los CTA genéricos
  lo borran).
- **Producto: `PRODUCT_HANDLE = 'clorofull-1'`**, el mismo sobre el que está publicada la de olor
  ($79.900, con las ofertas de cantidad de Releasit ya configuradas). **Sin confirmar con el cliente**:
  si este embudo estrena producto propio, cambiar la constante y enlazar el Product Element al mismo.
  A diferencia de remarketing, aquí el precio de la tienda y el de la landing coinciden.

### Copy: qué no es literal

- **Dos frases del hero las cambió el cliente (2026-10-09)** y mandan sobre el `.txt`: el preheadline es
  «Tu panza. Tu energía. Tu día a día.» (el copy decía «Para tu ciudad. Tu panza. Tu día a día.») y el
  subtítulo acaba en «En 1 litro de Clorofull.» (decía «de menta»). **No devolverlas al texto del
  fichero.**
- Cada motivo del mapa parte su frase en dos: lo primero va de titular («Respiras ciudad.») y lo
  demás, de detalle («Humo, polvo, buses.»). Las palabras son las del copy.
- **El registro va como `RSA-0029174-2023`.** El copy escribe `RSA-0029274-2023` (un 2 por un 1); el
  número de la etiqueta y del resto de landings es 0029**1**74. Es una errata del copy. **Confirmar con
  el cliente** antes de publicar: es un dato legal.
- **Dirección: `Carrera 59 # 5B-31`**, la de la etiqueta; el copy escribe «#5-B31».
- **La oferta va en el orden del copy**: contraentrega y después anticipado, con sus textos y sus CTA.
- **La banda de precio del hero** («$79.900 contraentrega · o $69.900 pago anticipado») resume la frase
  del copy («Precio: $79.900. Con pago anticipado, ahorras $10.000 y pagas $69.900.»). La frase
  completa va en el cierre. A 340 px y menos el rótulo se queda en «anticipado» para caber en una fila.
- El sticky dice «pagas al recibir» y no «contraentrega», que no cabe junto al botón.
- La nota bajo el CTA del hero («Pagas cuando recibes. Envío con garantía de entrega.») junta dos
  frases de la sección de oferta.
- Los rótulos («Por dónde entra», «La ruta de limpieza», «La fórmula», «Lo que ganas», «El proceso»,
  «Cómo se toma», «La oferta», «El bono», «Experiencias», «La comparación», «Garantía», «Clientes de
  Eterma») y el titular de las preguntas («Lo que suelen preguntar.») son andamiaje, no copy.
- **CTA intermedio tras la fórmula** («Quiero mi Clorofull»): no viene en el copy; es el del hero,
  repetido para que no pasen siete secciones sin botón.
- Los testimonios van con las citas tal cual; el de Ana pierde los corchetes de borrador que traía.
- El titular del Instagram es el de la marca. **El aviso legal del pie es el de olor** («En condiciones
  reales, Clorofull es un alimento y no un medicamento…») **sin la cláusula de higiene oral**, que es de
  aquel ángulo. Ojo: es un **alimento** (el registro es RSA), no un suplemento; no cambiar la palabra.

### Imágenes

Las crudas que entregó el cliente estaban en `detox/assets/` y se movieron a
`product-images/clorofull/detox/` (fuera de git, 16 MB). Nuevas, 19. **Las 18 primeras ya están en el
CDN** (subidas el 2026-10-09); **falta `landings-clorofull-detox-hero-2.webp`**
(`./check-cdn.sh eterma/landings/clorofull/detox/september.html`):

| Archivo | Origen | Uso |
|---|---|---|
| `landings-clorofull-detox-hero.webp` | `img_1_hero_detox.png` (1254²). Se le quita blanco sobrante a la izquierda y de la mesa; **ni la botella ni la persona se tocan**. 1100×1068, q82 · 130 KB | Hero, primera foto (LCP), entera en todos los anchos |
| `landings-clorofull-detox-hero-2.webp` | `img_beneficios_hero.png` (1254²). Solo pierde 36 px de mesa por abajo, para medir **lo mismo que la primera** (1100×1068): las dos comparten marco y ninguna se recorta al pasar. Botella, vaso y los cinco rótulos, enteros · 91 KB | Hero, segunda foto |
| `landings-clorofull-detox-villi.webp` | `bloque_mecanismo_clorofull.jpeg` (2048²) a 1100, q74 | Textura del bloque verde |
| `landings-clorofull-detox-entra-{humo,ambiente,olor,inflada,colon,cigarrillo}.webp` | `icono 2, 3, 4, 5, 6 y 1.png`: láminas sobre papel crema, **pasadas a alfa** y llevadas todas al mismo lienzo (480×744) para que la rejilla no baile | Las seis entradas |
| `landings-clorofull-detox-gana-{liviana,ambiente,frescura,transito,colon,cigarrillo}.webp` | `liviana`, `eliminación ambiente`, `frescura`, `tránsito ligero`, `colon limpio` y `cigarrillo.png`: se les recorta el marco, a alfa y al mismo cuadrado (340²) | Los seis beneficios |
| `landings-clorofull-detox-{clorofila,pectina,polidextrosa}.webp` | Las tres fotos del cliente, a 520 px | La fórmula |
| `landings-clorofull-detox-gotero.webp` | `gotero_clorofila_competencia.png` recortado al frasco, **sobre su blanco** (el paso a alfa le comía la etiqueta) | Comparativa |

Reutilizadas, ya en el CDN: `ugc-joselin`, `-celeste`, `-gabriela`, `-ana`, `-ana-vasito` y
`-valentina-vasito`; `hero-2`, `pour`, `producto-vasito`, `vasito-medidor`, `bottle`; los cuatro
`landings-shared-*` y las dos fuentes.

**Las cuatro `img_*` van en el carrusel del hero por decisión del cliente** (2026-10-09: «en el hero
debe haber un carrusel con todas esas imágenes» y, al ver que solo iban dos, «faltan la imagen de modo
de uso y tabla nutricional»). Tres se habían dejado fuera y se le avisó del motivo; lo confirmó dos
veces, así que **van tal cual y no se vuelven a quitar por cuenta propia**. Lo que arrastra cada una,
por si el cliente manda versiones corregidas (se subirían con sufijo `-v2`):

- `img_beneficios_hero.png` → `detox-hero-2`: cinco rótulos incrustados; tres —**«Respiración»,
  «Energía», «Rendimiento»**— son claims que el copy no hace. No se pueden quitar sin cortar la
  botella («Digestión» se monta sobre ella).
- `img_modo-de-uso_cloro.png`: dice **«30 mil al día»** con un icono de moneda. Ni es el precio ni es
  la dosis (son 30 **ml**).
- `img_tabla-nutricional_clorofull.png`: la etiqueta se lee, y dice «porción ½ vaso (120 ml) · 8
  porciones», que contradice los 30 ml y las 33 dosis del copy (§1).

**La tercera y la cuarta no se suben otra vez**: son las mismas fotos que olor publicó como
`landings-clorofull-hero-3.webp` y `-hero-4.webp` (comparadas con las crudas: 1 % de diferencia, la de la
compresión). Se sirven con ese nombre. Son cuadradas (1200²) y el marco del carrusel mide 1100 × 1068,
así que van con `object-fit: cover` y **ceden un 1,5 % arriba y abajo**: es aire, la botella de la
tercera se queda a más de un 4 % del borde.

### Medidas (vista previa local, 2026-10-09)

| Pantalla | Alto de página | Fotos del hero + mando | CTA del hero |
|---|---|---|---|
| 320 × 640 | 11 773 | 241–542 | 652–708, 68 px fuera; el precio sí entra |
| 360 × 740 | 11 439 | 241–580 | **669–725, entero** |
| 375 × 667 | 11 351 | 208–562 | 650–706, 39 px fuera; el precio sí entra |
| 390 × 844 | 11 441 | 266–634 | **732–788, entero** |
| 412 × 915 | 11 337 | 229–619 | **717–773, entero** |
| 768 × 1024 | 11 252 | 205–718 | **817–873, entero** |
| 1280 × 900 | 10 721 | 32–579 | **503–563, entero** |

- **Sin desbordes** en ninguno de los siete anchos. Entre 640 y 899 px el hero se queda en una columna
  de 560: a todo el ancho la foto, que va entera, mandaría el CTA lejos.
- **Contraste**: 91 combinaciones de texto y fondo calculadas sobre la página; la más justa, 5,7:1.
- `node check-css-merge.mjs …/detox/september.html --widths=320,390,768,1280`: 472 reglas, 30 fusiones,
  **cero cambios**.
- Los dos carruseles, el sticky, la forma de pago y las preguntas, probados a 390 y 1280. Encajes del
  hero: `[0, 354, 708, 1062]` y `maxScroll 1062` a 390; `[0, 520, 1040, 1560]` y `1560` a 1280. El sticky aparece hacia los
  450 px de scroll a 390 × 844.
- **Sin JS**: nada se arma, todo visible, el carril se desliza a mano y el mando y el sticky no salen.
  **Con movimiento reducido**: nada viaja ni se arma.
- Pestañas (`./split-tabs.sh`): CSS 62 → 43 KB, JS 9 → 7 KB. La página montada desde las tres tiene
  **los mismos 669 elementos, con la misma caja y los mismos estilos calculados** (propios, `::before` y
  `::after`) que el fragmento, a 390 y 1280. Ojo al comparar: hay que **dejar fuera las variables CSS**
  (el minificador las reescribe —`0.16` → `.16`— y Chrome las lista con el resto, así que salían los
  669 como distintos) y **no fiarse solo de los píxeles**: con los dos carriles, dos capturas del mismo
  fichero ya difieren en 14–37 px, que son el suavizado de las esquinas redondas de las tarjetas.

### Trampas que salieron al construirla

- **El `<svg>` que hace el `<use>` va con `viewBox="0 0 …"`**, no con el del símbolo. Con el del símbolo
  el wordmark y la hoja se dibujaban fuera del lienzo y no se veía nada (`/eterma/AGENTS.md` §2).
- **Nada de `<p>` vacío como celda de relleno.** La cabecera de la tabla llevaba uno para ocupar la
  primera columna: el tema lo borra (`p:empty`) y las fotos se corren. Las columnas se colocan con
  `grid-column`.
- **Una imagen con `position: absolute` puede falsear el comprobador de fusión.** El recorte de las
  láminas del mapa se hizo primero con la imagen posicionada (`top`/`left` en %). La página se veía
  bien, pero `check-css-merge` daba cuatro «cambios» a 1280: el margen calculado del contenedor
  centrado y del mapa pasaba de `0px` a `80px`. **No era la fusión**: salía igual con `--no-merge`.
  Con la imagen fuera de flujo, Chrome devuelve `0px` para un `margin: auto` aunque la caja esté
  centrada, y lo corrige en cuanto algo fuerza otro cálculo. Se resolvió corriendo la imagen con
  **márgenes negativos, en flujo**. Si el comprobador da cambios raros en márgenes, **pasar primero
  `--no-merge`**: si también salen, no es el orden del CSS.
- **La foto de producto de la oferta no se recorta.** La primera versión iba a 5:4 con `cover` y la
  botella perdía la tapa. Ahora va entera, en columna, al lado del precio.

### Pendientes

1. **Subir `landings-clorofull-detox-hero-2.webp`** a Contenido → Archivos, con el mismo nombre. Las
   otras 18 ya están.
2. **Confirmar el registro sanitario** (0029174 o 0029274) y **el producto de Shopify** del embudo.
3. Pegar las tres pestañas en GemPages, con `/eterma/shared/releasit-form.css` detrás del CSS, y
   enlazar el Product Element. Medir el `font-size` raíz sobre la página viva.
4. Publicar **solo a petición explícita**.

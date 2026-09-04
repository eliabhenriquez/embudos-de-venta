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

**Pendiente de subir** (`check-cdn.sh` la da en FALTA): solo
`landings-clorofull-instagram.webp`. El resto está en el CDN desde el 2026-09-03, incluidas
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

## 9. Antes de dar por bueno un cambio

1. `./preview.sh eterma/landings/clorofull/olor/september.html` y mirarla renderizada a 360, 390 y 1280
   con `shot.mjs` (§8). Una captura de Chrome con `--window-size=390` **no vale**: sale de un layout de
   ~500 px. Para el desbordamiento horizontal, sondear que `innerWidth` coincide con el ancho emulado
   (`scrollWidth > innerWidth` no lo detecta: Chrome ensancha los dos a la vez).
2. En cuanto haya página en GemPages, **medir el `font-size` raíz** y el color computado de los titulares.
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

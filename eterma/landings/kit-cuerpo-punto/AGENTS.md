# AGENTS.md — KIT CUERPO EN SU PUNTO

Contexto de producto. Hereda de `/AGENTS.md` (global) y de `/eterma/AGENTS.md` (marca), y **manda sobre
los dos** en caso de conflicto. Quinto y último kit de Eterma: comparte columna vertebral con
[`../kit-dia-liviano/`](../kit-dia-liviano/AGENTS.md) y cambia motivo, hero, sección de producto y CTA
(regla del cliente, 2026-09-06: "cada landing tiene algún toque único, sobre todo el hero").

---

## 1. El producto

Kit de **un desayuno en polvo y dos bebidas de 1 litro con vaso medidor**, de la mañana a la tarde:
**VITA-ADVANCE** (500 g, proteína aislada de soya, avena, glucomanano y spirulina, sabor vainilla, en la
mañana: 4 cucharadas = 60 g en 200 ml de agua), **ADVANCE** (té verde y alcachofa, después de almorzar) y
**CLOROFULL** (clorofila, vitaminas y minerales, durante la tarde). Las dos bebidas: 30 ml al día, 33
dosis por botella.

| | Anticipado | Contraentrega |
|---|---|---|
| Kit | **$119.900** (ahorras $10.000) | **$129.900** |

Envío gratis a Colombia, 3 a 5 días hábiles, reenvío o devolución si no llega. WhatsApp 300 696 4582.
**Sin bono, sin order bump ni upsell.** Copy: [`general/Copy kit cuerpo en su punto.txt`](general/Copy%20kit%20cuerpo%20en%20su%20punto.txt), manda sobre la web y la etiqueta.

- **Dos registros sanitarios, como en Del Tinto a la Almohada**: VITA-ADVANCE con el suyo
  ("INVIMA NSA-0013091-2022", pendiente de confirmar contra la etiqueta) y ADVANCE y CLOROFULL con el de
  toda Eterma, **INVIMA RSA-0029174-2023**.
- Los ingredientes del copy son los principales; la lámina del mecanismo enseña más y no se añaden.
- Secciones: solo las del copy. Sin problema–agitación, sin línea de tiempo 30/60/90, sin bonos.

**Producto de Shopify (leído de `/products/kit-cuerpo-en-su-punto.js` el 2026-09-06):** handle
**`kit-cuerpo-en-su-punto`**, product ID `15870472225137`, variante única `64093185540465`,
`available: true`. **Ojo: el precio en Shopify es $139.900, no los $129.900 del copy**, igual que en Del
Tinto a la Almohada; el cliente dijo que lo corrige en Shopify (2026-09-06). Se publica como página de
producto en `https://etermacolombia.com/products/kit-cuerpo-en-su-punto`. El handle va en
`PRODUCT_HANDLE` por trazabilidad; los CTA abren Releasit por el contexto de la ficha, sin `/cart/add.js`.

`PREPAID_ENABLED = false` hasta que Releasit descuente los $10.000 reales.

---

## 2. Motivo propio de esta landing (dentro de la línea Eterma)

- **La carpeta.** El hero es un **carrusel** (regla del cliente para todos los kits: el kit primero,
  luego una foto por producto) metido en una carpeta con **tres pestañas arriba**, "Mañana · Mediodía ·
  Tarde": son botones que saltan a la foto de su producto y se marcan solos (`aria-pressed`) al deslizar
  o usar las flechas; la pestaña activa toma el color menta de la hoja y se une a ella, como en una
  carpeta de verdad (la hoja lleva la esquina superior izquierda recta). Tocar la pestaña marcada
  devuelve al kit. El rótulo de cada hoja va en banda propia bajo la foto, nunca encima. Sin puntos. Sin
  JS quedan el kit, el gesto y las pestañas como texto. Los tres chips del copy van debajo como fichas
  con el color del momento a la izquierda (lima, verde, verde profundo) y no son controles.
- **Tres momentos = la escalera del día.** Tres escalones que bajan con el día: en móvil cada tarjeta
  entra 16 px más a la derecha que la anterior y un hilo discontinuo en L baja del escalón anterior; en
  escritorio son tres columnas que descienden (0, 36 y 72 px) unidas por el hilo. La foto de cada
  producto es un **plato redondo** con el borde de su color. Numeración sin cero (1, 2, 3) en la fila del
  icono y el momento.
- **Ingredientes = la esfera.** La tabla del copy se sirve alrededor de una **esfera de reloj** (SVG
  inline): doce marcas, un arco lima que recorre el día y tres puntos, mañana, mediodía y tarde, con el
  color de su momento; al lado, las tres filas con icono, nombre en serif, ingredientes y momento.
  "Uso diario" es **la bandeja**: tres tarjetas con el plato redondo asomando por el borde superior (el
  polvo con la cuchara y los dos vasitos servidos); la tira arranca alineada con el título y su relleno
  superior deja sitio al plato para que el scroll no lo recorte.
- **La tira de personas va en platos redondos** (círculos, los pares un punto más abajo). Las
  experiencias son **bocadillos**: la cita en una burbuja con borde del color del momento y punta hacia
  la persona, que va debajo con avatar, nombre y ciudad. El cierre es **la cascada**: tres fotos que
  bajan en escalera de izquierda a derecha, el mismo gesto que la sección de momentos.
- **El CTA es "las burbujas".** Dos burbujas lima (`::before` y `::after` del botón, anillos de 8 y 6 px)
  suben desde el borde inferior de la píldora y se desvanecen, a destiempo, como una bebida recién
  servida; al pasar el dedo o el ratón, una capa verde media **barre el botón de derecha a izquierda**
  (`::before` de la etiqueta). Por eso el texto va siempre dentro de `<span class="cp-cta__label">`.
  Solo `transform` y `opacity`; `is-inview` sirve y pausa; sin JS es una píldora estática; con
  `prefers-reduced-motion` no hay burbujas. Las variantes (`--light`, `--secondary`, `--sm`) cambian
  los colores con `--cp-bubble` y `--cp-sweep`, no la mecánica.

---

## 3. Convenciones de código

- **Prefijo `cp-`.** Raíz `.cp-lp` con `id="cp-kit-cuerpo-punto"`. Tokens `--et-*` (marca) y `--cp-*`.
- Tipografía, px, pago (`data-cp-pay-choice` → `data-cf-pay` en `<html>`), sticky: igual que en
  `kit-dia-liviano` (§3 de su `AGENTS.md`).
- **Vista previa local con dos atributos:** `data-cp-file` para las imágenes de `assets/` y
  `data-cp-shared` para las reutilizadas, cuyo valor es `<kit>/assets/<fichero>` relativo a
  `eterma/landings/` (ver §5). El script las cambia a rutas locales solo en `file://` o localhost.
- `gp-product` y `#_rsi-buy-now-button-floating` se sacan del flujo desde este bloque, como en los demás.
- Script: `ROOT_SELECTOR`, `READY_FLAG = 'cpLandingReady'`, `PRODUCT_HANDLE`, `PRICES`, `PREPAID_ENABLED`,
  `CTA_LABELS`, más `initFolder` para las pestañas.

---

## 4. Testimonios: nombres reales

Todas las fotos son las mismas de Día Liviano (ADVANCE y CLOROFULL) y Del Tinto a la Almohada
(VITA-ADVANCE), ya cotejadas con `/humanized-images/clorofull/` en sus `AGENTS.md` §4.

| Foto de origen | Persona | En la landing |
|---|---|---|
| `vita advance ugc 2` | **Natalia** | Cita de VITA-ADVANCE (Manizales) |
| `advance ugc 1` | **Joselin** | Cita de ADVANCE (Bogotá) |
| `clorofull ugc 3` | **María Fernanda** | Cita de CLOROFULL (Barranquilla) |
| `clorofull ugc 2` | **Valentina** | Tira del hero |
| `clorofull ugc 1` | **Celeste** | Cascada del cierre |
| `vita advanve ugc 1`, `vita advance ugc 3`, `advance ug 2`, `advance ugc 3` | sin identificar | Tira del hero y cascada, sin nombre |
| `clorofull ugc 4` | Luciana | **No se usa** (rótulo de descuento incrustado) |

Las citas son las tres del copy, una por producto. Si se cambia una foto, cambiar también el nombre.

---

## 5. Imágenes

Optimizadas en [`assets/`](assets/); originales en `/product-images/kit-cuerpo-punto/`, fuera de git.
**Solo hay que subir las tres de este kit**: el resto se sirve del CDN con los nombres que ya publicaron
Día Liviano (ADVANCE y CLOROFULL) y Del Tinto a la Almohada (VITA-ADVANCE), sin copia local ni nueva
subida; por eso `check-cdn.sh` las lista como "no está en el repo".

```sh
./check-cdn.sh eterma/landings/kit-cuerpo-punto/general/september.html
```

| Archivo | Origen | Uso |
|---|---|---|
| `landings-kit-cuerpo-punto-hero-kit.webp` | `KIT CUERPO EN SU PUNTO IMG.png` (1254², fondo blanco), a 1200 | Hoja del kit en la carpeta, LCP |
| `landings-kit-cuerpo-punto-kit-podium.webp` | `KIT CUERPO EN SU PUNTO 2.png`, a 1000 | "Esto llega en tu pedido" |
| `landings-kit-cuerpo-punto-mecanismo.webp` | `img-mecanismo-kit cuerpo en su punto.png`, a 1000 | "Lo que tomas a cada hora del día" |
| `landings-kit-dia-liviano-bottle-{advance,clorofull}.webp`, `-vasito-{advance,clorofull}.webp`, `-ugc-{joselin,advance-3,advance-pour,celeste,valentina,maria-fernanda}.webp` | ya en el CDN (Día Liviano) | Carpeta, escalera, bandeja, tira, citas y cascada |
| `landings-kit-tinto-almohada-jar-vita-advance.webp`, `-polvo-vita-advance.webp`, `-ugc-natalia.webp`, `-ugc-vita-advance-{1,3}.webp` | ya en el CDN (Del Tinto a la Almohada, comprobado el 2026-09-07) | Carpeta, escalón 1, bandeja, tira, cita y cascada |

Logo, Instagram y fuente: los ficheros ya publicados por Valeriana y Clorofull, sin copia local.

---

## 6. Medidas y estado

Verificado con `shot.mjs` (móvil emulado) sobre la preview el 2026-09-07, imágenes locales:

| Ancho | Alto del hero | CTA del hero (top–bottom) | Página | Overflow horizontal |
|---|---|---|---|---|
| 360×740 | 802 px | 681–737 px, dentro de la primera pantalla | 9 493 px | ninguno |
| 390×844 | 887 px | 773–829 px, dentro de la primera pantalla | 9 331 px | ninguno |
| 1280 | 712 px | 675–731 px | 7 200 px | ninguno |

Fuentes computadas: titulares Georgia (serif del tema en producción), cuerpo Questrial. Comprobado por
rectángulos que ni el rótulo ni las flechas tocan la foto de la hoja visible (en escritorio la hoja del
kit va al 82 % de ancho). Carpeta probada simulando el salto a la hoja de Advance: cambia la hoja, el
rótulo, `aria-pressed` y la pestaña "Mediodía" pasa a menta. Los tres platos de la bandeja quedan dentro
del carril (19 px desde su borde superior), sin recorte. Ocho CTA con las clases de Releasit. Sticky
visible tras el hero y oculto en escritorio.

- Las pestañas suman unos 28 px al hero, así que la hoja va a 16:11 en móvil (4:3 dejaba el CTA a
  851 px en 390), 16:9 en pantallas de 375 px o menos y cuadrada en escritorio.
- 2026-09-07: construida en local, sin publicar. Pendiente: subir las tres imágenes de `assets/` al CDN,
  corregir el precio de la variante en Shopify ($139.900 → $129.900), confirmar el NSA de VITA-ADVANCE,
  activar el anticipado en Releasit.

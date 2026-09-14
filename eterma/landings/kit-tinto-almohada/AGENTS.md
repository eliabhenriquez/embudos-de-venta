# AGENTS.md — KIT DEL TINTO A LA ALMOHADA

Contexto de producto. Hereda de `/AGENTS.md` (global) y de `/eterma/AGENTS.md` (marca), y **manda sobre
los dos** en caso de conflicto. Tercer kit de Eterma: comparte columna vertebral con
[`../kit-dia-liviano/`](../kit-dia-liviano/AGENTS.md) y [`../kit-piel-viva/`](../kit-piel-viva/AGENTS.md)
y cambia motivo, hero, sección de producto y CTA (regla del cliente, 2026-09-06: "cada landing tiene
algún toque único, sobre todo el hero").

---

## 1. El producto

Kit de **un desayuno en polvo y dos bebidas de 1 litro con vaso medidor**: **VITA-ADVANCE** (500 g,
proteína aislada de soya, avena, glucomanano y spirulina, sabor vainilla, en la mañana: 4 cucharadas =
60 g en 200 ml de agua), **CLOROFULL** (clorofila, vitaminas y minerales, durante la tarde) y
**MULTIBRINA** (manzanilla, toronjil, hierbabuena y mejorana, antes de dormir). Las dos bebidas: 30 ml
al día, 33 dosis por botella.

| | Anticipado | Contraentrega |
|---|---|---|
| Kit | **$119.900** (ahorras $10.000) | **$129.900** |

Envío gratis a Colombia, 3 a 5 días hábiles, reenvío o devolución si no llega. WhatsApp 300 696 4582.
**Sin bono, sin order bump ni upsell.** Copy: [`general/Copy Kit del tinto a la almohada - eterma.txt`](general/Copy%20Kit%20del%20tinto%20a%20la%20almohada%20-%20eterma.txt), manda sobre la web y la etiqueta.

- **Dos registros sanitarios, como trae el copy.** VITA-ADVANCE es un alimento en polvo y el copy le da
  su propio registro (`NSA-0013091-2022`); se publica como "INVIMA NSA-0013091-2022". CLOROFULL y
  MULTIBRINA llevan el de toda Eterma, **INVIMA RSA-0029174-2023** (el copy escribe "RS-…"). **Confirmar
  con el cliente el NSA de VITA-ADVANCE contra la etiqueta antes de publicar.**
- Los ingredientes del copy son los principales; la lámina del mecanismo enseña más (berenjena,
  alcachofa, bayas de goji) y no se añaden al texto.
- Secciones: solo las del copy. Sin problema–agitación, sin línea de tiempo 30/60/90, sin bonos.

**Producto de Shopify (leído de `/products/kit-del-tinto-a-la-almohada.js` el 2026-09-06):** handle
**`kit-del-tinto-a-la-almohada`**, product ID `15870477730161`, variante única `64093193798001`,
`available: true`. **Ojo: el precio en Shopify es $139.900, no los $129.900 del copy.** Releasit cobra el
precio de la ficha, así que hay que corregir la variante (o el copy) antes de publicar; la landing sigue
al copy. Se publica como página de producto en
`https://etermacolombia.com/products/kit-del-tinto-a-la-almohada`. El handle va en `PRODUCT_HANDLE`
por trazabilidad; los CTA abren Releasit por el contexto de la ficha, sin `/cart/add.js`.

`PREPAID_ENABLED = false` hasta que Releasit descuente los $10.000 reales.

---

## 2. Motivo propio de esta landing (dentro de la línea Eterma)

- **La agenda.** El hero es un **carrusel** (regla del cliente para todos los kits: el kit primero,
  luego una foto por producto) metido en una libreta: caja menta con **lomo lima y anillas** a la
  izquierda y el rótulo de cada hoja en una banda bajo la foto, nunca encima. Lo propio de este kit es
  **la regla del día**, una banda propia al pie de la libreta que va **del tinto (taza, izquierda) a la
  almohada (derecha)** con marcas de hora: sus tres tramos, "Mañana · Tarde · Noche", son botones que
  saltan a la foto de su producto y se marcan solos (`aria-pressed`) al deslizar o usar las flechas; un
  marcador lima se desplaza bajo el tramo activo (`data-ta-slide` en la libreta) y desaparece en la hoja
  del kit. Tocar el tramo marcado devuelve al kit. Sin puntos. Sin JS quedan el kit, el gesto y la regla
  como texto. Los tres chips del copy van debajo como entradas de agenda con su color de momento arriba
  (lima, verde, verde profundo) y no son controles.
- **Tres momentos = la agenda del día.** La sección de producto es un **eje de horas con marcas** (línea
  con ticks cada 14 px) y tres entradas colgadas de él con un punto de color; en móvil el eje es vertical
  a la izquierda y en escritorio se tumba arriba y las entradas van en tres columnas. Numeración sin cero
  (1, 2, 3) en la misma fila que el icono y el momento. La primera entrada enseña la dosis en cucharadas,
  no en ml: es el único producto en polvo de los kits.
- **Fórmulas = la carta.** La tabla del copy (producto · ingredientes · momento) se sirve como carta
  impresa: doble marco, cada fila con icono de momento, nombre en serif, **puntos de guía** hasta el
  momento de uso y los ingredientes debajo. "Uso diario" es **la receta**: tres tarjetas con foto arriba
  (el polvo con la cuchara, y los dos vasitos servidos), el momento, la frase y las medidas como
  chips; las formas de tomar las bebidas van en una fila aparte, no como cuarta tarjeta. La tira arranca
  alineada con el título y las tarjetas comparten alto.
- **La tira de personas va en arcos** (esquinas superiores redondas) y el cierre cuelga tres fotos de
  **un hilo que va de la taza a la almohada**, el mismo par de iconos de la regla del hero.
- **El CTA es "el tic-tac": una manecilla que recorre una regla.** En la banda inferior de la píldora hay
  13 marcas (`::before` del botón, `repeating-linear-gradient`) y una manecilla lima (`::after`) que las
  recorre de izquierda a derecha **saltando marca a marca** (`steps(12)`), como la aguja de un reloj;
  al llegar se apaga y vuelve a empezar (6,5 s). Al pasar el dedo o el ratón, una capa verde media
  barre el botón de izquierda a derecha (`::before` de la etiqueta). Por eso el texto va siempre dentro
  de `<span class="ta-cta__label">`. Solo `transform` y `opacity`; `is-inview` sirve y pausa; sin JS es
  una píldora estática; con `prefers-reduced-motion` la manecilla se queda en la primera marca. Las
  variantes (`--light`, `--secondary`, `--sm`) cambian los colores de marcas, manecilla y barrido con
  `--ta-tick`, `--ta-hand` y `--ta-sweep`, no la mecánica.

---

## 3. Convenciones de código

- **Prefijo `ta-`.** Raíz `.ta-lp` con `id="ta-kit-tinto-almohada"`. Tokens `--et-*` (marca) y `--ta-*`.
- Tipografía, px, pago (`data-ta-pay-choice` → `data-cf-pay` en `<html>`), sticky: igual que en
  `kit-dia-liviano` (§3 de su `AGENTS.md`).
- **Vista previa local con dos atributos:** `data-ta-file` para las imágenes de `assets/` y
  `data-ta-shared` para las que se reutilizan de `../kit-dia-liviano/assets/` (ver §5). El script las
  cambia a rutas locales solo en `file://` o localhost.
- `gp-product` y `#_rsi-buy-now-button-floating` se sacan del flujo desde este bloque, como en los demás.
- Script: `ROOT_SELECTOR`, `READY_FLAG = 'taLandingReady'`, `PRODUCT_HANDLE`, `PRICES`, `PREPAID_ENABLED`,
  `CTA_LABELS`, más `initRuler` para la regla del día.

---

## 4. Testimonios: nombres reales

Las fotos de CLOROFULL y MULTIBRINA son las mismas de Día Liviano, ya identificadas cara a cara contra
`/humanized-images/clorofull/` (§4 de su `AGENTS.md`). Las de VITA-ADVANCE se compararon el 2026-09-06:
**`vita advance ugc 2` es Natalia** (`natalia 1.png` del pool, misma persona y mismo encuadre). Las otras
dos no están en el pool.

| Foto de origen | Persona | En la landing |
|---|---|---|
| `vita advance ugc 2` | **Natalia** | Cita de VITA-ADVANCE (Manizales) |
| `clorofull ugc 1` | **Celeste** | Cita de CLOROFULL (Bogotá) |
| `multibrina ugc 2` | **Gabriela** | Cita de MULTIBRINA (Medellín) |
| `clorofull ugc 2` | **Valentina** | Tira del hero |
| `multibrina ugc 1` | **María de los Ángeles** | Tira del hero |
| `clorofull ugc 3` | **María Fernanda** | Hilo del cierre |
| `multrina ugc 3` | **Victor** | Hilo del cierre |
| `vita advanve ugc 1`, `vita advance ugc 3` | sin identificar | Tira del hero y hilo del cierre, sin nombre |
| `vita-advance 1` | sin identificar (misma persona que `ugc 1`) | **No se usa** |
| `clorofull ugc 4` | Luciana | **No se usa** (rótulo de descuento incrustado) |

Las citas son las tres del copy, una por producto. Si se cambia una foto, cambiar también el nombre.

---

## 5. Imágenes

Optimizadas en [`assets/`](assets/); originales en `/product-images/kit-tinto-almohada/`, fuera de git.
**Solo hay que subir las ocho de este kit**: las fotos de CLOROFULL y MULTIBRINA (botellas en mano,
vasitos servidos y UGC) se sirven del CDN con los nombres que ya publicó Día Liviano, sin copia local ni
nueva subida; por eso `check-cdn.sh` las lista como "no está en el repo".

```sh
./check-cdn.sh eterma/landings/kit-tinto-almohada/general/september.html
```

| Archivo | Origen | Uso |
|---|---|---|
| `landings-kit-tinto-almohada-hero-kit.webp` | `KIT DEL TIENTO A LA ALMOHADA IMG.png` (1254², fondo blanco), a 1200 | Hoja del kit en la agenda, LCP |
| `landings-kit-tinto-almohada-kit-podium.webp` | `KIT DEL TIENTO A LA ALMOHADA 2.png`, a 1000 | "Esto llega en tu pedido" |
| `landings-kit-tinto-almohada-mecanismo.webp` | `img-mecanismo-kit del tinto a la almohada.png`, a 1000 | "Qué tomas en cada momento" |
| `landings-kit-tinto-almohada-jar-vita-advance.webp` | `vita-adavance 2.png` (tarro en primer plano), 4:5 a 800×1000 | Hoja de Vita-Advance y entrada 1 de la agenda |
| `landings-kit-tinto-almohada-polvo-vita-advance.webp` | `vita-advance polvo 3.png` (polvo con cuchara), cuadrado a 800 | Tira del hero y receta de la mañana |
| `landings-kit-tinto-almohada-ugc-natalia.webp` | `vita advance ugc 2.png` (apaisada 1748×1294), 4:5 a 720×900 desplazado 70 px a la izquierda | Cita de Vita-Advance |
| `landings-kit-tinto-almohada-ugc-vita-advance-{1,3}.webp` | `vita advanve ugc 1`, `vita advance ugc 3`, 4:5 a 720×900 con la cara arriba | Tira del hero, hilo del cierre |
| `landings-kit-dia-liviano-bottle-{clorofull,multibrina}.webp` | ya en el CDN (Día Liviano) | Hojas de la agenda y entradas 2 y 3 |
| `landings-kit-dia-liviano-vasito-{clorofull,multibrina}.webp` | ya en el CDN (Día Liviano) | Receta de la tarde y de la noche |
| `landings-kit-dia-liviano-ugc-{celeste,gabriela,valentina,maria-de-los-angeles,maria-fernanda,victor}.webp` | ya en el CDN (Día Liviano) | Citas, tira e hilo |

Logo, Instagram y fuente: los ficheros ya publicados por Valeriana y Clorofull, sin copia local.

---

## 6. Medidas y estado

Verificado con `shot.mjs` (móvil emulado) sobre la preview el 2026-09-06, imágenes locales:

| Ancho | Alto del hero | CTA del hero (top–bottom) | Página | Overflow horizontal |
|---|---|---|---|---|
| 360×740 | 784 px | 662–718 px, dentro de la primera pantalla | 9 464 px | ninguno |
| 390×844 | 855 px | 738–794 px, dentro de la primera pantalla | 9 441 px | ninguno |
| 1280 | 666 px | 632–688 px | 7 693 px | ninguno |

Fuentes computadas: titulares Georgia (serif del tema en producción), cuerpo Questrial. Comprobado por
rectángulos que ni el rótulo, ni la regla, ni las flechas tocan la foto de la hoja visible (en escritorio
las flechas se pegan al borde para no rozar el kit). Regla probada simulando el salto al tramo "Tarde":
cambia la hoja, el rótulo, `aria-pressed` y el marcador se desplaza un tramo. Ocho CTA con las clases de
Releasit. Sticky visible tras el hero y oculto en escritorio.

- El titular va a 34 px en móvil (36 lo partía en tres líneas a 390 px y bajaba el CTA a 834). La
  libreta va a 4:3 en móvil y a 16:10 en pantallas de 375 px o menos; en escritorio, cuadrada.
- 2026-09-06: construida en local. Las ocho imágenes de `assets/` ya están en el CDN (comprobado con
  `check-cdn.sh` el 2026-09-07); Cuerpo en su Punto las reutiliza por nombre. Pendiente: corregir el
  precio de la variante en Shopify ($139.900 → $129.900, el cliente dijo que lo hace), confirmar el NSA de
  VITA-ADVANCE, activar el anticipado en Releasit, pegar en GemPages.

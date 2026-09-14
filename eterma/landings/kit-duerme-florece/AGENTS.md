# AGENTS.md — KIT DUERME Y FLORECE

Contexto de producto. Hereda de `/AGENTS.md` (global) y de `/eterma/AGENTS.md` (marca), y **manda sobre
los dos** en caso de conflicto. Cuarto kit de Eterma: comparte columna vertebral con
[`../kit-dia-liviano/`](../kit-dia-liviano/AGENTS.md) y cambia motivo, hero, sección de producto y CTA
(regla del cliente, 2026-09-06: "cada landing tiene algún toque único, sobre todo el hero").

---

## 1. El producto

Kit de **dos bebidas de 1 litro con vaso medidor y un frasco de gotas**, pensado para la noche y el
cuidado diario: **MULTIBRINA** (manzanilla, toronjil, hierbabuena y mejorana, antes de dormir),
**VALERIANA** en gotas (noches de tensión ocasional, según la etiqueta) y **TODO EN UNO** (colágeno,
pepino y resveratrol, sabor uva, durante el día o en la noche). Las dos bebidas: 30 ml al día, 33 dosis
por botella.

| | Anticipado | Contraentrega |
|---|---|---|
| Kit | **$119.900** (ahorras $10.000) | **$129.900** |

Envío gratis a Colombia, 3 a 5 días hábiles, reenvío o devolución si no llega. WhatsApp 300 696 4582.
**Sin bono, sin order bump ni upsell.** Copy: [`general/Copy Kit duerme y florece - eterma.txt`](general/Copy%20Kit%20duerme%20y%20florece%20-%20eterma.txt), manda sobre la web y la etiqueta.

- **Porcentajes de TODO EN UNO fuera**, como en Piel Viva: el copy los marca "validar contra la etiqueta
  vigente antes de publicar". Hasta entonces la landing dice "colágeno, pepino y resveratrol".
- **VALERIANA no lleva registro sanitario ni dosis en gotas**: "según la indicación de la etiqueta".
- Registro sanitario de las dos bebidas: **INVIMA RSA-0029174-2023**, el de toda Eterma.
- Secciones: solo las del copy. Sin problema–agitación, sin línea de tiempo 30/60/90, sin bonos.

**Producto de Shopify (leído de `/products/kit-duerme-y-florece.js` el 2026-09-06):** handle
**`kit-duerme-y-florece`**, product ID `15870475338097`, variante única `64093190914417`, precio en
Shopify $129.900 (coincide con el contraentrega del copy), `available: true`. Se publica como página de
producto en `https://etermacolombia.com/products/kit-duerme-y-florece`. El handle va en `PRODUCT_HANDLE`
por trazabilidad; los CTA abren Releasit por el contexto de la ficha, sin `/cart/add.js`.

`PREPAID_ENABLED = false` hasta que Releasit descuente los $10.000 reales.

---

## 2. Motivo propio de esta landing (dentro de la línea Eterma)

- **La ventana de noche.** El hero es un **carrusel** (regla del cliente para todos los kits: el kit
  primero, luego una foto por producto) cuya caja **cambia con la hoja visible**: menta con el kit,
  **noche cerrada con estrellas** con Multibrina, noche suave (verde medio) con Valeriana y otra vez
  menta, la mañana, con Todo en uno. Son dos capas de color (`::before` con el cielo y `::after` con la
  noche suave) que solo cambian de opacidad según `data-df-slide`. El rótulo de cada hoja va en banda
  propia bajo la foto, nunca encima. Los **tres chips del copy son los controles**, con icono de luna,
  luna con estrella y flor: saltan a su foto y se marcan solos (`aria-pressed`) al deslizar o usar las
  flechas; tocar el chip marcado devuelve al kit. Sin puntos. Sin JS quedan el kit, el gesto y los chips
  como texto.
- **Tres momentos = notas de la mesa de noche.** Tres tarjetas con la **esquina doblada** (gradiente en
  el `::after`), en el orden del día: Multibrina en verde profundo, Valeriana en verde medio y Todo en
  uno en blanco con borde lima, la mañana. En móvil se escalonan diez píxeles a cada lado; en escritorio
  van en tres columnas. Numeración sin cero (1, 2, 3) en la fila del icono y el momento.
- **Fórmulas = la etiqueta.** La tabla del copy se presenta como la etiqueta de un frasco: regla gruesa
  arriba y abajo, leyenda en versalitas, cada fila con su icono, nombre en serif, ingredientes y el uso
  sugerido con un guion lima. "Uso diario" es **la rutina**: una sola tarjeta con las tres tomas en fila
  (foto redonda del vasito o del gotero) y las formas de tomar las bebidas al pie; en escritorio las tres
  tomas van en columnas.
- **La tira de personas es un mosaico 2×2** sin scroll (4 columnas en escritorio, pares un punto más
  abajo). Las experiencias son **notas con pin**: papel crema, punto de color en el borde superior,
  avatar redondo con nombre y ciudad, y la cita en serif. El cierre **amanece**: fondo que pasa de verde
  profundo a verde medio y una ventana de tres hojas con las fotos en un solo marco claro.
- **El CTA es "las estrellas y la flor".** Dos estrellas lima de cuatro puntas (`::before` y `::after` del
  botón, con `clip-path`) parpadean a destiempo en las esquinas de la píldora, como el cielo de la
  ventana; al pasar el dedo o el ratón, **una flor de color se abre desde el centro** (`::before` de la
  etiqueta: un círculo que escala de 0 a 1). Por eso el texto va siempre dentro de
  `<span class="df-cta__label">`. Solo `transform` y `opacity`; `is-inview` sirve y pausa; sin JS es una
  píldora estática; con `prefers-reduced-motion` las estrellas se quedan fijas. Las variantes
  (`--light`, `--secondary`, `--sm`) cambian los colores con `--df-star` y `--df-bloom`, no la mecánica.

---

## 3. Convenciones de código

- **Prefijo `df-`.** Raíz `.df-lp` con `id="df-kit-duerme-florece"`. Tokens `--et-*` (marca) y `--df-*`.
- Tipografía, px, pago (`data-df-pay-choice` → `data-cf-pay` en `<html>`), sticky: igual que en
  `kit-dia-liviano` (§3 de su `AGENTS.md`).
- **Vista previa local con dos atributos:** `data-df-file` para las imágenes de `assets/` y
  `data-df-shared` para las reutilizadas, cuyo valor es `<kit>/assets/<fichero>` relativo a
  `eterma/landings/` (ver §5). El script las cambia a rutas locales solo en `file://` o localhost.
- `gp-product` y `#_rsi-buy-now-button-floating` se sacan del flujo desde este bloque, como en los demás.
- Script: `ROOT_SELECTOR`, `READY_FLAG = 'dfLandingReady'`, `PRODUCT_HANDLE`, `PRICES`, `PREPAID_ENABLED`,
  `CTA_LABELS`, más `initWindow` para la ventana.

---

## 4. Testimonios: nombres reales

Todas las fotos son las mismas de Día Liviano (MULTIBRINA) y Piel Viva (VALERIANA y TODO EN UNO), ya
cotejadas con `/humanized-images/clorofull/` en sus `AGENTS.md` §4. **Las dos citas de VALERIANA y TODO
EN UNO siguen sin nombre**, las mismas caras que en Piel Viva: cuando el cliente dé esos nombres se
escriben en las dos landings.

| Foto de origen | Persona | En la landing |
|---|---|---|
| `multrina ugc 3` | **Victor** | Cita de MULTIBRINA (Cartagena) |
| `valeriana ugc 2` | **pendiente** | Cita de VALERIANA: hoy "Clienta · Bucaramanga", sin nombre |
| `todo en uno ugc 2` | **pendiente** | Cita de TODO EN UNO: hoy "Clienta · Pereira", sin nombre |
| `multibrina ugc 1` | **María de los Ángeles** | Mosaico del hero y ventana del cierre |
| `multibrina ugc 2` | **Gabriela** | Mosaico del hero |
| `valeriana ugc 1`, `valeriana ugc 3`, `todo en uno ugc 1`, `todo en uno ugc 3` | sin identificar | Mosaico y ventana del cierre, sin nombre |

Las citas son las tres del copy, una por producto. Los `figcaption` pendientes llevan
`data-df-name-pending`. No se inventan ni se reasignan nombres del pool a otras caras.

---

## 5. Imágenes

Optimizadas en [`assets/`](assets/); originales en `/product-images/kit-duerme-florece/`, fuera de git.
**Las tres de este kit ya están en el CDN (comprobado el 2026-09-07)**: el resto se sirve del CDN con los nombres que ya publicaron
Día Liviano (MULTIBRINA) y Piel Viva (VALERIANA y TODO EN UNO), sin copia local ni nueva subida; por eso
`check-cdn.sh` las lista como "no está en el repo".

```sh
./check-cdn.sh eterma/landings/kit-duerme-florece/general/september.html
```

| Archivo | Origen | Uso |
|---|---|---|
| `landings-kit-duerme-florece-hero-kit.webp` | `KIT DUERME Y FLORECE IMG.png` (1254², fondo blanco), a 1200 | Hoja del kit en la ventana, LCP |
| `landings-kit-duerme-florece-kit-podium.webp` | `KIT DUERME Y FLORECE 2.png`, a 1000 | "Esto llega en tu pedido" |
| `landings-kit-duerme-florece-mecanismo.webp` | `img-mecanismo-kit duerme y florece.png`, a 1000 | "Qué tomas antes de dormir y cada día" |
| `landings-kit-dia-liviano-bottle-multibrina.webp`, `-vasito-multibrina.webp`, `-ugc-{maria-de-los-angeles,gabriela,victor}.webp` | ya en el CDN (Día Liviano) | Ventana, nota 1, rutina, mosaico, cita y cierre |
| `landings-kit-piel-viva-valeriana-{studio,drops}.webp`, `-bottle-todo-en-uno.webp`, `-vasito-todo-en-uno.webp`, `-ugc-valeriana-{1,2,3}.webp`, `-ugc-todo-en-uno-{1,2,3}.webp` | ya en el CDN (Piel Viva, comprobado el 2026-09-06) | Ventana, notas 2 y 3, rutina, mosaico, citas y cierre |

Logo, Instagram y fuente: los ficheros ya publicados por Valeriana y Clorofull, sin copia local.

---

## 6. Medidas y estado

Verificado con `shot.mjs` (móvil emulado) sobre la preview el 2026-09-06, imágenes locales:

| Ancho | Alto del hero | CTA del hero (top–bottom) | Página | Overflow horizontal |
|---|---|---|---|---|
| 360×740 | 763 px | 656–712 px, dentro de la primera pantalla | 9 632 px | ninguno |
| 390×844 | 846 px | 743–799 px, dentro de la primera pantalla | 9 583 px | ninguno |
| 1280 | 785 px | 744–800 px | 7 307 px | ninguno |

Fuentes computadas: titulares Georgia (serif del tema en producción), cuerpo Questrial. Comprobado por
rectángulos que ni el rótulo ni las flechas tocan la foto de la hoja visible (en escritorio la hoja del
kit va al 82 % de ancho para dejar sitio a las flechas). Ventana probada simulando el salto a la hoja de
Multibrina: cambia la hoja, el rótulo, `aria-pressed` y el cielo pasa a opacidad 1. Ocho CTA con las
clases de Releasit. Sticky visible tras el hero y oculto en escritorio.

- El titular es el más largo de los kits (dos frases) y va a 31 px en móvil y 28 en pantallas de 375 px
  o menos; la ventana va a 16:11 en móvil, 16:10 en ≤375 px y cuadrada en escritorio. Los chips con
  icono son más altos que los de texto, así que el hero se apretó (relleno, huecos, icono de 28 px) para
  que el CTA quede en la primera pantalla también a 360×740.
- 2026-09-06: construida en local, sin publicar. Imágenes en el CDN desde el 2026-09-07. Pendiente:
  pegar el bloque en GemPages, nombres de dos citas (los mismos que Piel Viva), validar porcentajes de TODO EN UNO, activar el
  anticipado en Releasit.

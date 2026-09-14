# AGENTS.md — KIT PIEL VIVA

Contexto de producto. Hereda de `/AGENTS.md` (global) y de `/eterma/AGENTS.md` (marca), y **manda sobre
los dos** en caso de conflicto. Segundo kit de Eterma: comparte columna vertebral con
[`../kit-dia-liviano/`](../kit-dia-liviano/AGENTS.md) y cambia motivo, hero, CTA y ritmo (regla del
cliente, 2026-09-06: "cada landing tiene algún toque único, sobre todo el hero").

---

## 1. El producto

Kit de **dos bebidas de 1 litro con vaso medidor y un frasco de gotas**: **TODO EN UNO** (colágeno,
pepino y resveratrol, sabor uva, durante el día), **CLOROFULL** (clorofila, vitaminas y minerales,
durante la tarde) y **VALERIANA** en gotas (antes de dormir, según la etiqueta). Las dos bebidas: 30 ml
al día, 33 dosis por botella.

| | Anticipado | Contraentrega |
|---|---|---|
| Kit | **$119.900** (ahorras $10.000) | **$129.900** |

Envío gratis a Colombia, 3 a 5 días hábiles, reenvío o devolución si no llega. WhatsApp 300 696 4582.
**Sin bono, sin order bump ni upsell.** Copy: [`general/Copy Kit piel viva - eterma.txt`](general/Copy%20Kit%20piel%20viva%20-%20eterma.txt), manda sobre la web y la etiqueta.

- **Porcentajes de TODO EN UNO fuera.** El copy escribe "Colágeno 2%, pepino 1% y resveratrol 1%" con
  el asterisco "validar contra la etiqueta vigente antes de publicar" y la etiqueta fotografiada no los
  enseña. Hasta que el cliente los valide, la landing dice "colágeno, pepino y resveratrol".
- **VALERIANA no lleva registro sanitario** ni dosis en gotas: el copy del kit dice "según la indicación
  de la etiqueta" y así se publica (el "20 a 40 gotas" es de la landing de Valeriana, no de este copy).
- Registro sanitario de las dos bebidas: **INVIMA RSA-0029174-2023**, el de toda Eterma.

**Producto de Shopify (leído de `/products.json` el 2026-09-06):** handle **`kit-piel-viva-eterma`**
—ojo, no `kit-piel-viva`—, product ID `15870464852337`, variante única `64093173907825`, precio en
Shopify $129.900, `available: true`. Se publica como página de producto en
`https://etermacolombia.com/products/kit-piel-viva-eterma`. El handle va en `PRODUCT_HANDLE` por
trazabilidad; los CTA abren Releasit por el contexto de la ficha, sin `/cart/add.js`.

`PREPAID_ENABLED = false` hasta que Releasit descuente los $10.000 reales.

---

## 2. Motivo propio de esta landing (dentro de la línea Eterma)

- **La vitrina.** El hero es un **carrusel** (regla del cliente para todos los kits: el kit primero,
  luego una foto por producto) vestido de vitrina: caja menta con placa lima detrás, repisa fina y el
  rótulo de cada slide en una banda bajo la foto, nunca encima. Lo propio de este kit: los **tres chips
  de producto** del copy saltan a la foto de su producto y se marcan solos (`aria-pressed`) al deslizar o
  usar las flechas; tocar el chip marcado devuelve al kit. Sin puntos. Sin JS quedan el kit, el gesto y
  los chips como texto.
- **Tres pausas, no un carril.** La sección de producto es un **zigzag editorial**: foto sobre una placa
  de color desplazada, numeral en serif y texto en alternancia izquierda/derecha, con un hilo vertical
  fino. Los colores de pausa: día blanco con acento lima, tarde menta, noche verde profundo.
  **Numeración sin cero (1, 2, 3), y el numeral en la misma fila que el icono y el momento**: el cliente
  rechazó el "01 · 02 · 03" apilado (2026-09-06). Aplica también a "Después de tu compra" y a Día Liviano.
- **Las tiras horizontales arrancan alineadas con el título de su sección** (dentro del shell, sin
  márgenes negativos) y sus tarjetas comparten alto con el contenido centrado: la más alta ya no deja un
  hueco vacío bajo las visibles. El aire vertical de la sección de uso se acortó a petición del cliente.
- **La tira de personas va escalonada** (los impares bajan unos píxeles) y el cierre lleva las fotos en
  **abanico**, no en cuadrícula.
- **El CTA es "el brillo": un destello que recorre la píldora.** Una banda clara inclinada (`::after`
  del botón) cruza el botón de izquierda a derecha cada 5,2 s, como la luz sobre una superficie
  hidratada; al pasar, una capa verde media (`::before` de la etiqueta) sube desde abajo. Se probó
  además una luz fija de volumen en la esquina y se quitó: a 12 % de blanco se leía como una mancha. Texto siempre dentro de
  `<span class="kp-cta__label">`. Solo `transform` y `opacity`; `is-inview` sirve y pausa; sin JS es una
  píldora estática; con `prefers-reduced-motion` no hay destello.

---

## 3. Convenciones de código

- **Prefijo `kp-`.** Raíz `.kp-lp` con `id="kp-kit-piel-viva"`. Tokens `--et-*` (marca) y `--kp-*`.
- Tipografía, px, pago (`data-kp-pay-choice` → `data-cf-pay` en `<html>`), sticky, vista previa local con
  `data-kp-file`: igual que en `kit-dia-liviano` (§3 de su `AGENTS.md`).
- `gp-product` y `#_rsi-buy-now-button-floating` se sacan del flujo desde este bloque, como en los demás.
- Script: `ROOT_SELECTOR`, `READY_FLAG = 'kpLandingReady'`, `PRODUCT_HANDLE`, `PRICES`, `PREPAID_ENABLED`,
  `CTA_LABELS`, más `initShowcase` para la vitrina.

---

## 4. Testimonios: nombres reales

Las fotos de CLOROFULL vienen del pool con nombre (`/humanized-images/clorofull/`). **Las de TODO EN UNO y
VALERIANA no están en ese pool**: se compararon cara a cara con Ana, Camilo, Natalia y Ricardo el
2026-09-06 y no coinciden.

| Foto de origen | Persona | En la landing |
|---|---|---|
| `clorofull ugc 3` | **María Fernanda** | Cita de CLOROFULL (Barranquilla) |
| `clorofull ugc 1` | **Celeste** | Tira del hero |
| `clorofull ugc 2` | **Valentina** | Abanico del cierre |
| `clorofull ugc 4` | Luciana | **No se usa** (rótulo de descuento incrustado) |
| `todo en uno ugc 2` | **pendiente** | Cita de TODO EN UNO: hoy "Clienta · Pereira", sin nombre |
| `valeriana ugc 2` | **pendiente** | Cita de VALERIANA: hoy "Clienta · Bucaramanga", sin nombre |
| `todo en uno ugc 1`, `todo en uno ugc 3`, `valeriana ugc 1`, `valeriana ugc 3` | sin identificar | Tira del hero y abanico del cierre, sin nombre |

**Pedir al cliente los nombres de las dos citas** y escribirlos en el `figcaption` marcado con
`data-kp-name-pending`. No se inventan ni se reasignan nombres del pool a otras caras.

---

## 5. Imágenes

Optimizadas en [`assets/`](assets/); originales en `/product-images/kit-piel-viva/`, fuera de git. Se
suben a Contenido → Archivos con el mismo nombre.

```sh
./check-cdn.sh eterma/landings/kit-piel-viva/general/september.html
```

| Archivo | Origen | Uso |
|---|---|---|
| `landings-kit-piel-viva-hero-kit.webp` | `KIT VIEL VIVA IMG 1.png` (1254², fondo blanco), a 1200 | Vitrina del hero, LCP |
| `landings-kit-piel-viva-kit-podium.webp` | `KIT VIEL VIVA IMG 2.png`, a 1000 | "Esto llega en tu pedido" |
| `landings-kit-piel-viva-mecanismo.webp` | `img-mecanismo-kit piel viva.png`, a 1000 | "Qué incluye cada momento" |
| `landings-kit-piel-viva-bottle-{todo-en-uno,clorofull}.webp` | `todo en uno 1`, `clorofull 2` (en mano), 4:5 a 800×1000 | Vitrina, chips y pausas |
| `landings-kit-piel-viva-valeriana-studio.webp` | `valeriana 1.webp` (675×900, estudio sobre crema), tal cual | Vitrina, chip y pausa de la noche |
| `landings-kit-piel-viva-valeriana-drops.webp` | `valeriana 2.png` (gotero sobre el vaso), 4:5 a 800×1000 | Paso de uso de la noche |
| `landings-kit-piel-viva-vasito-{todo-en-uno,clorofull}.webp` | `vasito*.jpg`, cuadrado al vaso, a 800 | Pasos de uso |
| `landings-kit-piel-viva-ugc-*.webp` | UGC del cliente, 4:5 a 720×900 | Tira, citas y abanico |

Logo, Instagram y fuente: los ficheros ya publicados por Valeriana y Clorofull, sin copia local.

---

## 6. Medidas y estado

Verificado con `shot.mjs` (móvil emulado) sobre la preview el 2026-09-06, imágenes desde `assets/`:

| Ancho | Alto del hero | CTA del hero (top–bottom) | Página | Overflow horizontal |
|---|---|---|---|---|
| 360×740 | 783 px | 674–730 px, dentro de la primera pantalla | 9 717 px | ninguno |
| 390×844 | 830 px | 726–782 px, dentro de la primera pantalla | 9 685 px | ninguno |
| 1280 | 712 px | 675–731 px | 8 527 px | ninguno |

Fuentes computadas: titulares Georgia (serif del tema en producción), cuerpo Questrial. Vitrina probada
simulando el toque del chip de Clorofull: cambia la vista, el rótulo y `aria-pressed`. Sticky visible
tras el hero y oculto en escritorio.

- El hero pesa más que el de Día Liviano (overline de dos líneas y chips con miniatura), así que en
  móvil la vitrina va a 16/10 y en pantallas de 375 px o menos a 1,85, con tipografía y huecos un punto
  más cortos. La fila de datos baja tras el CTA solo en móvil, como en Día Liviano.
- 2026-09-06: construida en local. Los 18 ficheros de `assets/` ya están en el CDN (comprobado con
  `check-cdn.sh` la noche del 2026-09-06); Duerme y Florece los reutiliza por nombre. Pendiente: nombres de
  dos citas, validar porcentajes de TODO EN UNO, activar el anticipado en Releasit, pegar en GemPages.

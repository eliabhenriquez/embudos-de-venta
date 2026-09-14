# AGENTS.md — VALERIANA

Contexto de producto. Hereda de `/AGENTS.md` (global) y de `/eterma/AGENTS.md` (marca), y **manda sobre
los dos** en caso de conflicto. Es la única landing de Eterma con paleta propia: ciruela, rosa y crema,
los colores del frasco ámbar (el cliente los validó el 2026-09-07: "hacen relación al color del producto").

---

## 1. El producto

**Valeriana ETERMA en gotas**: un frasco con gotero para acompañar la pausa nocturna. Uso: 20 a 40 gotas
en agua, en la noche o en un momento de tensión ocasional.

| | Anticipado | Contraentrega |
|---|---|---|
| Frasco | **$59.900** (ahorras $10.000) | **$69.900** |

Envío a Colombia, 3 a 5 días hábiles, reenvío o devolución si no llega. WhatsApp 300 696 4582.
**Sin bono, sin order bump ni upsell.** Copy: [`general/copy landing - valeriana.txt`](general/copy%20landing%20-%20valeriana.txt), manda sobre la web.

- **Sin registro INVIMA**: por su categoría no se comercializa como suplemento ni como alimento; la
  landing lo dice tal cual en "Información de categoría".
- **Expectativas claras**: la sección "Una elección informada" y el aviso de "Úsala con calma" van
  literales del copy; no se añaden beneficios ni claims.
- Secciones: las once del copy. Sin bonos, sin línea de tiempo 30/60/90.

**Producto de Shopify (leído de `/products/valeriana1.js` el 2026-09-07):** handle **`valeriana1`**,
product ID `15456323273073`, variante única `63240614904177`, precio en Shopify $69.900 (coincide con el
contraentrega del copy), `available: true`. Se publica como página de producto en
`https://etermacolombia.com/products/valeriana1` (la ficha viva todavía no lleva el bloque). El handle va
en `PRODUCT_HANDLE` por trazabilidad; los CTA abren Releasit por el contexto de la ficha, sin `/cart/add.js`.

`PREPAID_ENABLED = false` hasta que Releasit descuente los $10.000 reales.

---

## 2. Motivo propio de esta landing

Rehecha el 2026-09-07 sobre la primera versión (2026-09-04) a petición del cliente: "mejora
considerablemente el hero, espaciados, secciones más dinámicas, visuales e intuitivas, y la animación
del CTA que no me gusta nada". El copy y la paleta se mantienen.

- **La lámpara.** El hero es un **carrusel** (cuatro fotos: frasco en manos reales, descanso en el sofá,
  raíz y gotero, modo de uso) dentro de una caja de niebla clara con **un halo cálido que respira**
  detrás de la foto (`::before` con gradiente radial, `opacity` y `scale` en 6,5 s alternos). El rótulo
  de cada foto va en banda propia debajo, nunca encima; flechas, **sin puntos y sin miniatura** sobre la
  foto (los dos errores de la versión anterior). Debajo, los tres datos del copy como chips con icono,
  precios, CTA y la fila de datos.
- **Una pausa en gotas = el atenuador.** Los tres pasos cuelgan de un riel que se apaga de la crema a la
  ciruela: tarjeta clara, rosa y ciruela. En móvil el riel es vertical; en escritorio se tumba arriba.
- **Si la noche se siente larga = pensamientos.** Fondo ciruela con puntos de luz y cuatro tarjetas en
  zigzag; el cierre "Valeriana ETERMA cabe en ese momento" va en una píldora con la gota.
- **Úsala con calma = tres gotas.** Tres tarjetas con el numeral dentro de una **gota ámbar**; la
  primera enseña **la dosis como puntos**: 20 puntos ciruela y 20 rosa entre "20" y "40 gotas". En móvil
  se deslizan alineadas con el título; en escritorio van en columnas junto a la foto del gotero.
- **Lo que recibes** con la caja en la mano dentro de un arco y cuatro fichas con icono. **Las fuentes**
  como fichas con iniciales (MNT, AFP, EBSCO, NIH), sin acordeones que escondan el texto. **Dónde encaja**
  como tabla real en escritorio (alternativa · puede servir para · Valeriana suma) y tarjetas con dos
  celdas en móvil. **Garantía** con sello y dos fichas numeradas. **Cierre = la luna**: una foto grande
  redonda y dos pequeñas que la orbitan.
- **Numeración sin cero (1, 2, 3)**, rótulo pegado al número e icono al final de la fila, como en los
  kits. Relleno de sección 44 px en móvil y 64 en escritorio (antes 68/88).
- **El CTA es "la onda en el agua".** Dos ondas concéntricas (`::before` y `::after` del botón, anillos
  de 200 px) se abren desde el centro de la píldora a destiempo y se desvanecen, como una gota al caer
  en el vaso; al pasar el dedo o el ratón, el agua sube (`::before` de la etiqueta, capa ciruela suave).
  Sustituye a la gota que caía por la izquierda de la versión anterior, rechazada por el cliente. Texto
  siempre dentro de `<span class="vl-cta__label">`. Solo `transform` y `opacity`; `is-inview` sirve y
  pausa; sin JS es una píldora estática; con `prefers-reduced-motion` no hay ondas ni halo. Las variantes
  (`--light`, `--secondary`, `--sm`) cambian los colores con `--vl-ring` y `--vl-rise`.

---

## 3. Convenciones de código

- **Prefijo `vl-`.** Raíz `.vl-lp` con `id="vl-valeriana"`. Tokens `--vl-*` (paleta propia) más
  `--vl-serif` y `--vl-sans` (Questrial, como el resto de Eterma).
- Tipografía, px, pago (`data-vl-pay-choice` → `data-cf-pay` en `<html>`), sticky y vista previa local con
  `data-vl-file`: igual que en `kit-dia-liviano` (§3 de su `AGENTS.md`).
- `gp-product` y `#_rsi-buy-now-button-floating` se sacan del flujo desde este bloque (faltaba en la
  primera versión).
- **Modificadores con la base en el selector** (`.vl-lp .vl-plan.vl-plan--best`,
  `.vl-lp .vl-fit__cell.vl-fit__cell--plus`): GemPages fusiona las reglas de cuerpo idéntico en la
  posición de la primera (`/AGENTS.md` §4.13). El 2026-09-07 `.vl-plan--best` compartía cuerpo con
  `.vl-dim--3`, subía por encima de `.vl-plan` y la tarjeta de pago anticipado salía blanca con el texto
  crema (el cliente lo vio en GemPages). `node check-css-merge.mjs` da cero cambios a 390 y 1280.
- Script: `ROOT_SELECTOR`, `READY_FLAG = 'vlLandingReady'`, `PRODUCT_HANDLE`, `PRICES`, `PREPAID_ENABLED`,
  `CTA_LABELS`, `SKIN_PAY_ATTRIBUTE`.

---

## 4. Fotos reales

El copy pide "fotos o videos reales de clientas, sin testimonios inventados": la landing no lleva citas,
solo fotos. Las personas no están en el pool con nombre de `/humanized-images/`, así que van sin nombre.
Los originales (doce capturas de video y tres fotos de la caja, el frasco y el gotero) se sacaron de
`assets/` a `/product-images/valeriana/`, fuera de git, el 2026-09-07; en el commit hay que quitar de git
los quince ficheros crudos que estaban trackeados.

---

## 5. Imágenes

Optimizadas en [`assets/`](assets/). Se suben a Contenido → Archivos con el mismo nombre.

```sh
./check-cdn.sh eterma/landings/valeriana/general/september.html
```

| Archivo | Origen | Uso |
|---|---|---|
| `landings-valeriana-hero-v3.webp` | `img-hero-1.png` (clave, mujer sirviendo las gotas en el vaso), 1254×1254 webp q82 | Foto 1 de la lámpara, LCP |
| `landings-valeriana-ugc-sofa.webp` | captura 7.23.54 (mujer en el sofá), 4:5 a 720×900 | Foto 2 de la lámpara y luna del cierre |
| `landings-valeriana-ingredient-drops.webp`, `-how-to-use.webp` | ya en el CDN | Fotos 3 y 4 de la lámpara; la primera también en el atenuador |
| `landings-valeriana-ugc-drops-glass.webp` | captura 7.20.53 (abre el frasco junto al vaso), 4:5 | Tira de personas |
| `landings-valeriana-ugc-bag.webp` | captura 7.20.30 (caja saliendo del bolso), 4:5 | Tira de personas |
| `landings-valeriana-ugc-dropper-pour.webp` | captura 7.22.16 (gotero sobre el vaso), 4:5 | "Úsala con calma" |
| `landings-valeriana-box-hand.webp` | `IMG_20260701_120805.jpg` (caja en la mano), 4:5 a 800×1000 | "Lo que recibes" |
| `landings-valeriana-ugc-water.webp`, `-ugc-woman-product.webp`, `-ugc-man-use.webp` | ya en el CDN | Tira y luna del cierre |
| `landings-valeriana-benefits.webp`, `-product.webp`, `-product-cutout-v2.webp`, `-ugc-man-product.webp`, `-hero-nervous-system-v2.webp` | ya en el CDN | **Sin uso en esta versión**; se conservan por si se vuelve a ellos |

Logo, Instagram y fuente: `landings-valeriana-eterma-logo.webp`, su versión blanca,
`landings-valeriana-instagram.webp` y `questrial-400.woff2`, ya publicados.

---

## 6. Medidas y estado

Verificado con `shot.mjs` (móvil emulado) sobre la preview el 2026-09-07, imágenes locales:

| Ancho | Alto del hero | CTA del hero (top–bottom) | Página | Overflow horizontal |
|---|---|---|---|---|
| 360×740 | 765 px | 652–708 px, dentro de la primera pantalla | 11 096 px | ninguno |
| 390×844 | 851 px | 744–800 px, dentro de la primera pantalla | 10 945 px (antes 12 525) | ninguno |
| 1280 | 716 px | 610–666 px | 8 157 px (antes 9 372) | ninguno |

Fuentes computadas: titulares Georgia (serif del tema en producción), cuerpo Questrial. Comprobado por
rectángulos que ni el rótulo ni las flechas tocan la foto visible (en escritorio la foto va al 82 % de
ancho). Seis CTA con las clases de Releasit. Sticky visible tras el hero y oculto en escritorio.

- El titular es largo (tres líneas a 32 px en móvil); la lámpara va a 4:3 en móvil, 16:10 en pantallas
  de 375 px o menos y cuadrada en escritorio. A 360 px el CTA del hero baja a 15,5 px para no partirse
  en dos líneas.
- 2026-09-07: construida en local. El cliente pegó el bloque en GemPages y la tarjeta de pago anticipado
  salió sin fondo: era la fusión de reglas de GemPages (§3), corregida en el fragmento; **hay que volver
  a pegar el bloque**. Pendiente: subir cinco imágenes nuevas de `assets/` al CDN, activar el anticipado
  en Releasit.

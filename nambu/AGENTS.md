# AGENTS.md — NAMBU

Contexto de marca. Hereda de `/AGENTS.md` (global) y lo sobrescribe en caso de conflicto. Cada
producto tiene además su propio `landings/<producto>/AGENTS.md`, que es el que manda al final. Hoy
existen dos: [`landings/spray/AGENTS.md`](landings/spray/AGENTS.md) y, para el formato de artículo del
mismo producto, [`landings/advertoriales/AGENTS.md`](landings/advertoriales/AGENTS.md).

Todo lo que hay aquí está **verificado en vivo sobre `nambuoficial.com` el 2026-09-20**, no supuesto.
Cuando algo se mida otra vez, se actualiza la fecha.

---

## 1. Qué es NAMBU

Marca colombiana de **bienestar y cuidado personal de origen botánico**, con el relato del **Pacífico
colombiano** como eje ("La esencia del Pacífico en cada ritual", "El Pacífico susurra. Tu cuerpo
escucha."). Vende directo por Shopify con tráfico de paid, mayoritariamente móvil.

Tienda: **nambuoficial.com** · Instagram: **@nambuoficial** · Soporte y garantías:
**nambushop.col@gmail.com** (cliente, 2026-10-16; las políticas decían `soporte@NambuShop.com`, que no es de
la marca, y se corrigieron ese día).

El tono de la marca es **sensorial y natural, de tú**, ligado a la planta y al ritual. No es clínico y
no receta: acompaña. El público de las landings llega frío desde un anuncio y es **mixto** (hombre y
mujer, 25–55).

### Catálogo

| Producto | Qué es | Precio |
|---|---|---|
| **Spray Nasal** (interno: *Lung Cleansing*) | Spray nasal de 60 ml con extractos de eucalipto, menta y regaliz | $79.900 / $69.900 anticipado |
| Piel de Porcelana | Sérum facial | $79.900 |
| Sérum Niacinamida 10% | Sérum facial | $69.700 |
| 1 Week | Fortalecedor de uñas | $69.900 |
| Golden Glow | Aclarante de cabello | $59.900 |
| ISOUL | Autobronceador | $69.900–$89.900 |
| Chest Relief | Ungüento | $19.000–$45.000 |

**El Spray Nasal es el producto estrella y el que sostiene el negocio.** Es el que más presupuesto de
paid recibe y el que tiene más ángulos abiertos. La barra de calidad de sus landings es la más alta
del repositorio.

---

## 2. Identidad visual

### Paleta

🔴 **Solo dos colores: el verde manzana del frasco y el blanco.** Decisión del cliente del 2026-09-21
tras rechazar dos versiones del `general/`:

1. **Crema, verde bosque y terracota de la web viva** → *"plana, aburrida, triste, opaca"*.
2. **Verde hoja en bloques, noche profunda y naranja del manual** → *"anticuada, los demás colores de
   la marca no pegan"*.

Lo que funciona es la **combinación del producto**: etiqueta verde manzana sobre frasco transparente y
tapa blanca. Es un producto para limpiar las cavidades nasales y la página tiene que **verse limpia**:
mucho blanco, filetes finos, sombras muy suaves teñidas de verde. Ni el olivo, ni el marrón, ni el
naranja del manual entran en las landings del spray.

| Token | Hex | Uso |
|---|---|---|
| `--ns-apple` | `#6FC350` | El verde de la etiqueta (muestreado). CTA, chapas, rellenos, halos, trazos |
| `--ns-apple-light` | `#8BD46C` | Brillo superior del degradado del CTA |
| `--ns-apple-deep` | `#2F7D22` | El mismo verde, hondo: **todo texto o cifra verde sobre blanco** (5,2:1) |
| `--ns-apple-ink` | `#0F2E0B` | **Texto sobre verde manzana** (6:1). Nunca blanco sobre manzana: 2,2:1 |
| `--ns-apple-50` / `-100` / `-200` | `#F5FBF1` / `#E8F6E0` / `#CFEEBF` | Tintes: secciones, chips, bordes activos |
| `--ns-ink` / `--ns-text` | `#0F1A10` / `#4D5A4F` | Titulares y cuerpo: neutros con un punto de verde, no un color más |
| `--ns-line` | `#E5EEE1` | Filetes de 1px |

**Reglas que esta paleta obliga a respetar** (sonda de contraste sobre estilos computados, 0 fallos a
390 y 1280 px):

- El verde manzana **nunca lleva texto blanco**. El CTA es manzana con texto `--ns-apple-ink`.
- Cifras y rótulos verdes sobre blanco van en `--ns-apple-deep`, no en manzana.
- Las secciones no se separan con bloques de color: se separan con aire y con un tinte
  `--ns-apple-50` que entra y sale en degradado. **Nada de secciones oscuras.**
- **Aire, pero corto.** `--ns-pad` es **32 px en móvil y 52 px desde 700 px**: quedan unos 64 px
  visibles entre el contenido de dos secciones (104 en escritorio). Con 52–64 px de padding (128 px
  de hueco) el cliente las vio *"demasiado lejos"* (2026-09-21). El hero y el carrusel de personas
  van más pegados (32 px): son un mismo bloque.
- **Los chips (antetítulos) van sin punto**: solo texto sobre `--ns-apple-100` (cliente, 2026-09-21).
- **Las tarjetas no llevan números** (1, 2, 3): ni en plantas ni en garantía (cliente, 2026-09-21).
- El frasco (`landings-spray-packshot.webp`) está nivelado a **blanco puro** y se pinta con
  `mix-blend-mode: multiply` sobre un halo manzana: se funde con cualquier fondo claro. El contenedor
  **no** puede llevar `isolation: isolate`, o el multiply solo ve el halo y aparece el recuadro blanco.

### Logotipo

El manual solo trae **JPG de 1080×1080 con fondo sólido**. El logotipo se genera recortando la mancha y
recoloreándolo con alfa (procedimiento en `landings/spray/AGENTS.md` §5). El que usan las landings es
`landings-nambu-wordmark-green.webp`, **recoloreado a `#2F7D22`** para que case con el verde del
frasco. `landings-nambu-wordmark-cream.webp` queda en `assets/` por si algún día hace falta sobre
oscuro, pero hoy no se usa.

### Tipografía

La tienda sirve **Questrial** en el cuerpo y una **serif del sistema** en los titulares (New York en
iPhone, Noto/Droid Serif o Times en Android). La serif es buena parte de lo que hizo que la segunda
versión se leyera **anticuada**.

Las landings del spray usan **Questrial en todo**, titulares incluidos, a tamaños grandes y con tracking
negativo (−1 a −2 px): geométrica, limpia, actual. **No es una fuente nueva**: se declara con
`@font-face` apuntando a la **misma URL** del CDN de la tienda que ya usa el tema
(`/cdn/fonts/questrial/questrial_n4.66abac5d….woff2`, CORS abierto). En producción sale de caché; en
la vista previa se carga igual y lo que se revisa es lo que se publica. La decisión del cliente del
2026-09-20 —no subir fuentes nuevas al CDN— sigue en pie.

Questrial tiene **un solo peso**: nada de negritas (serían simuladas). La jerarquía se hace con tamaño,
tracking y color.

---

## 3. El tema de Shopify y el entorno real

| Dato | Valor | Verificado |
|---|---|---|
| Tema | **Refresh 15.4.0** (base Dawn) | 2026-09-20 |
| Raíz tipográfica | **`html` a 10,5 px**, `body` a 15,75 px | medido, no supuesto |
| Fondo por defecto del `body` | `#EFF0F5` | 2026-09-20 |
| Regla de vacíos | `a:empty, div:empty, p:empty, section:empty… { display: none }` en `base.css` | 2026-09-20 |
| CDN | `https://nambuoficial.com/cdn/shop/files/` | responde 200 |
| GemPages | instalado (V7, `gempages-cro-164`) | 2026-09-20 |
| Releasit | **formulario NUEVO** (`#rsi_form_wrapper`, `rsi-*`); antes, LEGACY (`_rsi-`) | 2026-09-28 |

🔴 **`html` va a 10,5 px, no a 16 px.** La cabecera de `./preview.sh` monta la vista previa a 16 px,
así que **cualquier medida en `rem` se vería un 52% más grande en local que en producción**. En esta
marca la regla de "todo en px" de `/AGENTS.md` §9 no es una preferencia: es la única forma de que la
vista previa no mienta.

**Las landings de GemPages no llevan cabecera, barra de anuncios ni pie del tema** (comprobado sobre
`/products/advertorial-general-capitales-lung-cleansing`: `header`, `footer` y `announcement-bar` no
existen en el DOM). La landing está sola en la página: el logotipo, los datos de confianza y el
cierre tienen que salir del propio bloque, porque no hay tema que los ponga.

---

## 4. El formulario de Releasit — versión NUEVA (desde el 2026-09-28)

**Esta tienda sirve el formulario nuevo** desde que se cambió en *Releasit → Settings → General → COD
Form version* (2026-09-28): en el DOM existe `dialog#rsi_form_wrapper` y **no** existe
`#_rsi-cod-form-modal`. Es el mismo formulario que MIMA; el mapa que aplica es
`/docs/releasit-form-styling.md` **§6.7**. El skin del formulario antiguo se retiró entero: sus
selectores `_rsi-` no tocaban nada del nuevo.

Los CTA de la landing son botones propios con las clases de integración, que no cambian de versión:

```
_rsi-cod-form-gempages-button-overwrite _rsi-cod-form-is-gempage
```

**Las dos formas de pago viven dentro del modal**, no en la landing:

| Botón del modal | Clase | Qué hace |
|---|---|---|
| Contraentrega | `.rsi-submit_button` | Cierra el pedido COD |
| Pago anticipado | `.rsi-additionals_checkout_button` | "Paga con tarjeta o PSE" → checkout de Shopify |

El botón de anticipado lleva **un código de descuento de Releasit asociado**: es el que aplica el
ahorro. La landing no calcula precios ni genera descuentos, solo los comunica.

### El skin (2026-09-28)

- **[`shared/releasit-form.css`](shared/releasit-form.css)**: misma estructura que el de MIMA, con los
  tokens de la landing (`--ns-*`: verde manzana y blanco) y las decisiones de Nambu: Questrial en un
  solo peso, campos de 52 px con el icono en un plato verde, totales en verde claro, bumps en verde
  claro con filete manzana (sin el amarillo, el borde rojo ni las hormigas), el anticipado **primero**
  y en la píldora del CTA, la contraentrega en blanco con filete, sin pulso ni sacudida, y un anillo
  que late alrededor del anticipado. Verificado **en vivo con el modal abierto** en
  `/pages/spray-nasal-sinusitis` y `/products/lung-cleansing`, a 390 y 1280 px, con el CSS minificado
  de la pestaña. **No hay que pegarlo a mano:** `src/build.mjs` lo añade al final del CSS de cada
  landing del Spray, así que va en la misma pestaña CSS de GemPages.
- **Casi todo lleva `!important`, y es a propósito.** El formulario nuevo no pinta nada en línea con
  `!important` (se acabaron las capas que tapaban botones y bumps), pero su hoja de styled-components
  declara casi todas las propiedades con `!important` desde una clase suelta. Con el mismo peso, el ID
  de nuestros selectores gana por especificidad; los estados (marcado, foco, error, elección de pago)
  llevan más especificidad que su base.
- **El anticipado va primero** con `order`: cada botón vive en un bloque hijo directo de la columna
  flex `.rsi-layout-wrapper`, y el selector se engancha a dos clases estables con `:has()`. Las landings
  escriben `<html data-ns-pay="prepaid|cod">` desde la sección de pago y el skin pone primero la
  elegida; la otra cambia de piel (de llena a contorno), no se atenúa.
- **[`shared/releasit-form-designer.md`](shared/releasit-form-designer.md)**: lo que es de la app. El
  formulario **abre con la oferta de cantidad x2 y el Envío Prioritario marcados** ($113.400 en la
  ficha de flema): es **configuración deliberada del cliente** (2026-10-05) y no se reporta como
  problema. Sigue abierto el **$5.000** del anticipado frente a los $10.000 de las landings.
- **La caché de producto ya no hace falta.** El formulario antiguo necesitaba que la landing rellenara
  `#rsi-cod-form-product-cache` en `/pages/`; el nuevo lee otro script
  (`script.rsi-cod-form-app-block-product-cache`) y encuentra el producto solo. `initReleasitProductCache`
  se quitó del JS.
- **`check-css-merge.mjs` no ve el skin** (en la vista previa no hay modal). El skin se comprueba
  inyectándolo en la página publicada con `shot.mjs` y abriendo el modal
  (`/docs/releasit-form-styling.md` §6.7, «Procedimiento de reverificación»).

---

## 5. Comercial

- Precios en **COP**, formato `$79.900`. Dos vías: **anticipado** (con descuento) y **contraentrega**.
- 🔴 **Jerarquía de precio: $79.900 es el precio.** Es la cifra grande en hero, oferta, caja, cierre y
  sticky; el anticipado ($69.900) va en una línea secundaria con su chip de ahorro. El $79.900 **nunca
  se tacha** (se leería como precio anterior). Cliente, 2026-09-21. Es una excepción a la regla
  general de `/AGENTS.md` de resaltar el anticipado; lo único que se mantiene es la tarjeta destacada
  del anticipado en la sección que compara las dos formas de pago.
- **Envío estándar gratis en todos los pedidos** (medido en el carrito real: tarifa «Standard» a $0 incluso
  con un jabón de $18.000). **Envío prioritario** opcional con costo (el que ofrece el formulario de Releasit).
  La política publicada decía «gratis desde $74.700» y $9.700 de estándar: corregida el 2026-10-16 a petición
  del cliente, junto con las fichas que decían 2–3 y 2–5 días.
- Entrega **3 a 5 días hábiles**. Es el plazo en todas partes: política, fichas, preguntas, portada y landings.
- **Claims — crítico.** Son productos de bienestar, no medicamentos. Se habla de **sensación y
  cuidado** ("ayuda a despejar la sensación de nariz tapada"), nunca de curar, tratar o prevenir. El
  registro sanitario como producto homeopático del Spray Nasal está **en trámite ante INVIMA** y así
  es como se comunica, sin adornos.
- **Autoridad:** solo lo que el copy aprobado trae (Healthline, Medical News Today, WebMD) y siempre
  **referida a las plantas, no al producto terminado**. No se añaden medios, logos, estudios ni cifras
  que no estén en el copy.
- **Testimonios:** solo personas reales del pool de `humanized-images/nambu-spray/`, con su nombre
  real. No se inventan nombres, ciudades ni edades.

---

## 6. Estructura de la marca en el repositorio

**Lo que comparten todas las landings de la marca va en `shared/assets/`, una sola vez**: la captura de
Instagram y los logotipos de medios de pago (cliente, 2026-09-21). No se duplica por producto ni por
ángulo; en el CDN tienen un único nombre (`landings-shared-pay-*.webp`, `landings-spray-instagram.webp`).

```
nambu/
├── AGENTS.md                 # este archivo
├── docs/                     # manual de logotipos (LOGO-*.jpg)
├── shared/
│   ├── releasit-form.css     # skin del formulario (§4); build.mjs lo añade a cada landing
│   ├── releasit-form-designer.md  # lo que solo se cambia en la app de Releasit
│   └── assets/               # lo común a TODAS las landings de la marca: captura de Instagram,
│                             # logotipos de Visa, Mastercard y PSE
└── landings/
    ├── spray/                # producto estrella
    │   ├── AGENTS.md
    │   ├── assets/           # webp optimizados, compartidos por los 6 ángulos y los advertoriales
    │   ├── src/              # generador de los 6 september.html (AGENTS.md §7)
    │   └── general/  alergias/  flema/  sinusitis/  tabaquismo/  remarketing/   # ← construidos
    ├── advertoriales/        # el mismo producto en formato de artículo
        ├── AGENTS.md
        ├── src/              # generador de los october.html; importa lib/ y styles/shared/ del spray
        └── flema/  alergias/  sinusitis/  capitales/  neumonia/   # ← los cinco construidos

nambu/store/                  # tema propio de la tienda (MX primero, luego CO): ver store/AGENTS.md
```

# AGENTS.md — MIMA

Contexto de marca. Hereda de `/AGENTS.md` (global) y lo sobrescribe en caso de conflicto. Cada
producto tiene además su propio `landings/<producto>/AGENTS.md`, que es el que manda al final.

---

## 1. Qué es MIMA

Marca colombiana de **suplementos de bienestar para hombres y mujeres**. Vende directo por Shopify con tráfico de
paid, mayoritariamente Meta y mayoritariamente móvil. Tienda: **mimacolombia.com**.

El público es LATAM y llega frío desde un anuncio: femenino en SKNGLOW, **mixto en MIMANAD y MIMACALM**. El tono es **cercano, de tú, cálido y
sin promesas médicas**: acompaña, no receta. Nada de lenguaje clínico ni de vendedor agresivo.

### Catálogo y cómo se encadena

| Producto | Qué es | Papel en el funnel |
|---|---|---|
| **SKNGLOW** | Dulces duros de Biotina + Resveratrol para piel, cabello y uñas | Producto principal |
| **MIMACALM** | Polvo sabor sandía de Ashwagandha, Glicinato de Magnesio y Té Verde | **Order bump** de SKNGLOW ($39.950) y landing propia ($69.900 / $79.900) |
| **MIMANAD** | Niacina, Resveratrol y Melena de León | **Upsell** one-time de SKNGLOW ($39.950) y landing propia ($69.900 / $79.900) |

Los tres van dentro del mismo pedido de Releasit. El copy del bump y del upsell vive en el ángulo que
los dispara, no en `docs/`.

---

## 2. Identidad visual

### Paleta

Fuente única de verdad: **Manual de Marca MIMA 2025** (`docs/branding.pdf`). Los tokens ya están
implementados y auditados de contraste en [`shared/releasit-form.css`](shared/releasit-form.css) —
cópialos de ahí, no los redefinas:

| Token | Hex | Uso |
|---|---|---|
| `--mima-lilac` | `#e1addd` | Fondos suaves, acentos |
| `--mima-purple` | `#aa6aa6` | Color de marca |
| `--mima-magenta` | `#ff00a5` | Oficial del manual. **3.6:1 — no sostiene texto blanco** |
| `--mima-magenta-deep` | `#e0008f` | El que sí lo sostiene (4.6:1). **CTAs van con este** |
| `--mima-ink` | `#7b3e76` | Texto principal. Derivado, no está en el manual (7.5:1) |
| `--mima-text` / `--mima-text-muted` | `#241f24` / `#6b5f6a` | Neutros teñidos de lila, no grises de sistema |
| `--mima-border` / `--mima-surface-alt` | `#ded0dc` / `#faf5f9` | Bordes y superficies |
| `--mima-error` | `#c0261f` | Rojo a propósito: en magenta se confundiría con la interfaz |

**Dos derivaciones del manual que hay que respetar:** el manual no trae ni tono oscuro de texto ni un
magenta que pase AA. `--mima-ink` y `--mima-magenta-deep` cubren ese hueco. No los "corrijas" de vuelta
al valor del manual: se rompe el contraste.

### Tipografía

**AOK Buenos Aires**. Archivos en [`shared/fonts/webfonts/`](shared/fonts/webfonts/) (400, 400-italic,
600, 700).

⚠️ **Hay un problema de licencia sin resolver.** Los archivos que circulan son el corte a medida de
AOK (la aseguradora alemana), sin licencia de redistribución web. Lo correcto es comprar la familia
comercial *Buenos Aires* de Luzi Type. Antes de subir nada al CDN de una tienda que factura, leer
**`/docs/brand-typography.md` §1**.

Las landings **no declaran `font-family`**: heredan. La fuente se instala una sola vez en el tema.

---

## 3. El tema de Shopify — lee esto antes de tocar nada

En [`theme/`](theme/) hay tres archivos y **es fácil editar el que no es**:

| Archivo | Qué es |
|---|---|
| `theme.liquid` | Layout por defecto del tema. **Las landings NO pasan por aquí** |
| `theme.gempages.blank.liquid` | **El layout que sí envuelve las landings de GemPages** |
| `theme-backup.liquid` | Copia de seguridad. No se edita |

Editar `theme.liquid` esperando ver cambios en la landing **no hace nada**. Esto costó horas de
diagnóstico erróneo (caché de Shopify, snapshot de GemPages: las dos hipótesis eran falsas). Se
confirma en 30 segundos metiendo un comentario HTML marcador en el layout y buscándolo en el HTML
servido. **Hazlo siempre antes de dar por bueno un cambio de tema.**

### El flag `is_paid_landing`

`theme.gempages.blank.liquid` (y `theme.liquid`, sincronizado) abre con la configuración de las
landings de paid, una línea por landing con `handle::alt de la imagen social`:

```liquid
{%- capture paid_landings_config -%}
  sknglow-piel-firme::SKNGLOW de MIMA, con Biotina y Resveratrol
  |mimanad-energia::MIMANAD de MIMA, con Niacina, Resveratrol y Melena de León
{%- endcapture -%}
```

La `og:image` se deriva del handle: `landings-og-<handle>.jpg`, 1200x630, en Contenido → Archivos. Si
falta el fichero, la vista previa al compartir el enlace sale rota.

Detecta por `page.handle` **y** por `request.path` (doble vía, porque no siempre hay `page`). Cuando
es `true`, el layout **quita del camino crítico** todo lo que la landing no usa: `base.css`,
`shrine.null.js`, `secondary.js`, el CSS de predictive-search, los preconnect a gstatic, el script de
moneda y el `@font-face` de la cabecera. Y **añade** el código base de Meta.

🔴 **Cuando publiques una landing nueva, añade su línea a esa configuración y sube su `landings-og-<handle>.jpg`.** Si no, hereda el tema completo
y pierde toda la optimización sin avisar de nada.

### Cómo se pasa una landing a GemPages

El Custom Code de GemPages tiene **tres pestañas** (HTML, CSS, JS), y el CSS y el JS van sin sus etiquetas.
`./split-tabs.sh mima/landings/<producto>/<ángulo>/<campaña>.html` genera las tres al lado del fragmento
(`…tab-html.html`, `…tab-css.css`, `…tab-js.js`). Son derivadas: se regeneran, nunca se editan. Van
versionadas a propósito: tras tocar una landing, `git status` dice cuál de las tres hay que volver a pegar.

En MIMA la pestaña CSS lleva **solo** el CSS de la landing: las skins de los formularios se pegan en su
app (Releasit o EasySell), no detrás.

Verificado el 2026-10-10 en las seis: la página montada desde las tres pestañas da los mismos estilos
calculados y las mismas cajas que el fragmento, a 390 y 1280, sin errores de JS.

---

## 4. Píxeles y medición

- El código base de Meta (`fbq('init', '1369089581549099')` + `PageView`) vive **en el `<head>` del
  layout**, condicionado a `is_paid_landing`. Se puso ahí para que dispare al cargar la página y no al
  abrir el formulario.
- **`fbevents.js` lo carga Releasit**, no el tema. Bloquear su bundle mata Meta por completo.
- **No añadas un custom pixel de Shopify para esto.** Corre en un sandbox donde Releasit no lo ve, y
  el resultado es un `PageView` duplicado.
- ⚠️ **Un bloqueador de anuncios en tu propio navegador oculta `fbevents.js`.** Si `fbq.version` da
  `"2.0"` estás viendo el stub de Releasit, no el píxel real (`2.9.385`). Comprueba en incógnito antes
  de diagnosticar nada.

Registro vivo de rendimiento y medición: [`docs/rendimiento-sknglow.md`](docs/rendimiento-sknglow.md).

---

## 5. El formulario de Releasit

Toda la marca comparte **un solo formulario**. Su skin está en
[`shared/releasit-form.css`](shared/releasit-form.css) y se pega en la pestaña de CSS de Releasit.

El reparto de responsabilidades es estricto y la mitad de los problemas vienen de ignorarlo:

- Lo que Releasit pinta con **estilo inline** no se toca desde el CSS. Va en el **Form Designer**, y la
  lista exacta de qué propiedad vive dónde está en
  [`shared/releasit-form-designer.md`](shared/releasit-form-designer.md).
- Las clases con nombre propio (`rsi-submit_button`, `rsi-additionals_checkout_button`) son estables.
  Las generadas tipo `sc-cCcVtu` cambian en cada versión: **no cuelgues nada de ellas**.
- Reglas de estilado y la excepción documentada al `!important`: `/docs/releasit-form-styling.md`.

Cualquier cambio se verifica **renderizado en vivo**, nunca leyendo el CSS.

### EasySell (en prueba desde 2026-10-10)

El cliente está probando **EasySell** como formulario COD en lugar de Releasit. Solo una de las dos apps
está activa a la vez, y las landings funcionan con cualquiera.

- **Los CTA llevan los dos ganchos.** Además de las clases de Releasit: `id="es-popup-button"` y las clases
  `es-popup-button es-popup-button-cart`. Un CTA nuevo los lleva todos.
- 🔴 **La clase de EasySell no es gratis.** Su hoja trae `.es-popup-button:before { display: none
  !important }` y márgenes: apaga la capa animada del CTA y cada fila crece 16px. Cada landing lo
  neutraliza en la regla base de su CTA (`margin: 0` y `::before { display: block !important }`).
- **La skin tiene un límite de 5.000 caracteres**, el del campo de CSS de la app. Se edita
  [`shared/easysell-form.css`](shared/easysell-form.css) y se pega el compilado, `easysell-form.min.css`,
  que genera `node mima/shared/build-easysell-css.mjs`. El compilador falla si se pasa.
- EasySell pinta botones e insignias con **estilo inline `!important`**. La skin no lo pisa: pinta por
  encima con `:before`, `clip-path` y `-webkit-text-fill-color`.
- Reutiliza los atributos de las landings (`data-sg-pay`, `data-rsi-banner`). Donde hay
  `data-rsi-banner`, la skin oculta el botón y la barra fija que la app inyecta por su cuenta.
- Ganchos, estados, lo que quedó fuera y cómo se verifica:
  [`shared/easysell-form-designer.md`](shared/easysell-form-designer.md).

---

## 6. Comercial

- Precios en **COP**, formato `$79.900`. Las tres landings: **$69.900 anticipado / $79.900 contraentrega**
  (desde 2026-10-10). Envío gratis a Colombia, entrega 3–5 días hábiles.
- Dos formas de pago: **anticipado** (con descuento) y **contraentrega**. Confirmación por WhatsApp.
- **Claims — crítico.** Son suplementos, no medicamentos. Se habla de **apariencia y cuidado**
  ("ayuda a que la piel se vea…"), nunca de curar, tratar o prevenir. No reescribas un claim aprobado.
- Autoridad citable: **El País, Univision, La Vanguardia, PubMed**. Los logos están en `/docs/`. No
  añadas medios, estudios ni cifras que no estén documentados.
- Testimonios: solo los aprobados. El UGC crudo está en `/humanized-images/<producto>/<persona>/`.

### Testimonios en carrusel (los tres productos, 2026-09-22)

Mismo mecanismo en SKNGLOW (`sg-`), MIMACALM (`mc-`) y MIMANAD (`mn-`), cada uno con sus tokens:

- `[data-*-stories]` envuelve un carril a sangre (`[data-*-stories-track]`) y un mando
  `[data-*-stories-nav]` que nace `hidden`: flecha, un punto por historia (`aria-current`) y flecha.
  El JS (`initStories`) lo enciende solo si hay algo que deslizar y añade `is-carousel`, que quita la
  barra de scroll. Sin JS queda el carril con el dedo.
- Móvil: tarjeta vertical al 82 % arrancando en la línea del shell, la siguiente asoma.
- Desde 600 px la activa va **al centro** y las vecinas asoman a los dos lados: el relleno del carril es
  `(100% - ancho de tarjeta) / 2`, así la primera y la última también encajan y cada punto tiene su
  posición. Desde 760 px (700 en SKNGLOW) la tarjeta es horizontal (foto a la izquierda, relato al
  lado), 600 px de ancho; desde 900, 720 px.
- En SKNGLOW la firma «Colaboración con MIMA» baja al pie de la tarjeta para quedar a la misma altura en
  todas.

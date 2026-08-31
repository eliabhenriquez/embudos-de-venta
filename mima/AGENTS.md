# AGENTS.md — MIMA

Contexto de marca. Hereda de `/AGENTS.md` (global) y lo sobrescribe en caso de conflicto. Cada
producto tiene además su propio `landings/<producto>/AGENTS.md`, que es el que manda al final.

---

## 1. Qué es MIMA

Marca colombiana de **suplementos de bienestar para mujer**. Vende directo por Shopify con tráfico de
paid, mayoritariamente Meta y mayoritariamente móvil. Tienda: **mimacolombia.com**.

El público es femenino, LATAM, y llega frío desde un anuncio. El tono es **cercano, de tú, cálido y
sin promesas médicas**: acompaña, no receta. Nada de lenguaje clínico ni de vendedor agresivo.

### Catálogo y cómo se encadena

| Producto | Qué es | Papel en el funnel |
|---|---|---|
| **SKNGLOW** | Dulces duros de Biotina + Resveratrol para piel, cabello y uñas | Producto principal |
| **MIMACALM** | Ashwagandha, Glicinato de Magnesio y Té Verde | **Order bump** de SKNGLOW ($39.950) |
| **MIMANAD** | Niacina, Resveratrol y Melena de León | **Upsell** one-time de SKNGLOW ($39.950) |

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

`theme.gempages.blank.liquid` abre con una lista de handles de landing de paid:

```liquid
{%- assign paid_landings = 'sknglow-piel-firme' | split: ',' -%}
```

Detecta por `page.handle` **y** por `request.path` (doble vía, porque no siempre hay `page`). Cuando
es `true`, el layout **quita del camino crítico** todo lo que la landing no usa: `base.css`,
`shrine.null.js`, `secondary.js`, el CSS de predictive-search, los preconnect a gstatic, el script de
moneda y el `@font-face` de la cabecera. Y **añade** el código base de Meta.

🔴 **Cuando publiques una landing nueva, añade su handle a esa lista.** Si no, hereda el tema completo
y pierde toda la optimización sin avisar de nada.

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

---

## 6. Comercial

- Precios en **COP**, formato `$89.900`. Envío gratis a Colombia, entrega 3–5 días hábiles.
- Dos formas de pago: **anticipado** (con descuento) y **contraentrega**. Confirmación por WhatsApp.
- **Claims — crítico.** Son suplementos, no medicamentos. Se habla de **apariencia y cuidado**
  ("ayuda a que la piel se vea…"), nunca de curar, tratar o prevenir. No reescribas un claim aprobado.
- Autoridad citable: **El País, Univision, La Vanguardia, PubMed**. Los logos están en `/docs/`. No
  añadas medios, estudios ni cifras que no estén documentados.
- Testimonios: solo los aprobados. El UGC crudo está en `/humanized-images/<producto>/<persona>/`.

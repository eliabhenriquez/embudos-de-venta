# Releasit COD Form — guía de estilos

Guía operativa para personalizar el **botón** y el **formulario** de Releasit COD Form & Upsells en
nuestras landings de Shopify + GemPages. Aplica a todas las marcas.

> **Aviso importante.** Releasit **no publica** el mapa de clases internas del formulario y **no expone
> un campo de Custom CSS** en la app: su vía oficial es el *Form Designer*. Lo único documentado
> públicamente son las clases de integración (§4). El resto del mapa de §6 está obtenido **por auditoría
> en vivo**, no por documentación: son clases internas que **pueden cambiar en cualquier actualización de
> la app**. De ahí las reglas de §3 y el inventario versionado y fechado de §6.

---

## 1. Reglas de oro

1. **Lo que se pueda hacer en el Form Designer, se hace en el Form Designer.** El CSS es el último
   recurso, no el primero.
2. **Nunca se toca el DOM de Releasit con JS.** Ni mover nodos, ni envolverlos, ni reescribir HTML.
   Solo CSS, y solo cosmético.
3. **Ningún campo requerido se oculta con CSS.** La validación de la app sigue viva y el usuario queda
   bloqueado sin saber por qué.
4. **Los selectores se verifican en vivo antes de usarse** (§5) y se anotan en el inventario (§6) con
   fecha y versión.
5. **Cada override lleva un comentario** con qué hace y qué pasa si Releasit cambia la clase.
6. **Si el formulario se renderiza en `<iframe>` o shadow DOM cerrado, no hay CSS posible**: se
   comprueba primero (§5.1) y, si es el caso, todo se resuelve en el Form Designer.

---

## 2. Dónde encaja en el funnel

Releasit es quien **cierra la compra**: sustituye al checkout nativo de Shopify en el flujo de
contraentrega (COD), que es el dominante en Colombia.

```
Landing (GemPages)  →  CTA  →  Formulario Releasit  →  Order bump  →  Upsell  →  Thank you page
```

Consecuencia directa: **el formulario es el punto de mayor fricción y mayor caída de todo el funnel.**
Un formulario que estéticamente no pertenece a la landing (otra tipografía, otros colores, otro radio de
borde) rompe la continuidad visual justo en el momento de dar los datos personales, y es una de las
causas principales de la percepción de "esto parece estafa" que este proyecto viene a corregir. Por eso
esta guía existe: **la coherencia visual entre landing y formulario es una palanca de CRO, no un detalle.**

Referencias de copy del flujo completo: `<marca>/landings/<producto>/<ángulo>/order_bump_upsell.md`.

---

## 3. Jerarquía de decisión: Form Designer vs. CSS

Antes de escribir una línea de CSS, comprobar si está cubierto por la app.

| Necesidad | Dónde se hace | Notas |
|---|---|---|
| Textos, labels, placeholders | Form Designer | Editable por campo |
| Mostrar/ocultar campos, orden, campos nuevos | Form Designer | Drag & drop; nunca por CSS |
| Validación / campo obligatorio | Form Designer | Nunca simular por CSS |
| Colores y texto del botón COD | Form Designer → Buy Button | Texto, fuente, tamaño, colores, posición |
| Diseño y colores del botón de envío del form | Form Designer | Artículo dedicado en el help center |
| Fondo del form (color, degradado, imagen) | Form Designer | Soporta degradados e imágenes |
| Tipografía del formulario | Form Designer | Preferir la de la marca |
| Imagen/GIF dentro del form | Form Designer | |
| Selector de cantidad, descuentos, botón WhatsApp | Form Designer | Funcionalidad, no maquetar a mano |
| Sticky buy button | Form Designer | Ojo con el sticky del tema y con nuestro CTA sticky |
| Thank you page | Form Designer | |
| **Ajuste fino de espaciados, radios, sombras, estados** | **CSS** | Lo que la app no expone |
| **Encaje del form con los tokens de la landing** | **CSS** | Coherencia visual |
| **Retoques responsive concretos** | **CSS** | Mobile-first |

**Si aparece dos veces, gana el Form Designer.** Un override CSS de algo que la app ya controla es
deuda técnica que se rompe sola en la siguiente actualización.

---

## 4. Integración con GemPages (documentado y estable)

Estas son las únicas clases oficiales. Son de **integración**, no de estilo: no las uses como gancho de
CSS decorativo.

### 4.1 GemPages V7 — elemento nativo

1. Buscar el elemento **"Releasit COD"** en el editor de GemPages.
2. **Arrastrarlo DENTRO de un Product Element.** Es obligatorio: fuera de él, el formulario no se
   renderiza correctamente.
3. Configurar en la pestaña Settings el producto y la versión.
4. Guardar y publicar.

### 4.2 GemPages V6 — elemento Liquid

```html
<script type="text/plain" class="product-json" id="product-json{{product.id}}">{{ product | json }}</script>
<div class="_rsi-cod-form-is-gempage"></div>
<div class="_rsi-cod-form-gempages-button-hook"></div>
```

### 4.3 Botón propio que abre el formulario

Es lo que usaremos en nuestras landings para que **el CTA sea nuestro**, con nuestro diseño, y solo
dispare el formulario.

1. Añadir un **Generic Button** en GemPages.
2. Abrir **Advanced → CSS Class**.
3. Pegar exactamente:

```
_rsi-cod-form-gempages-button-overwrite _rsi-cod-form-is-gempage
```

4. Publicar y probar en la tienda en vivo.

**Notas:**

- Se pueden poner **varios botones** en la misma página con estas mismas clases: es justo lo que pide
  nuestra estructura de landing, con CTA repetido tras cada bloque de valor.
- Si no funciona: revisar que las clases estén escritas exactamente igual, y limpiar caché.
- La versión del formulario se elige en **Releasit → Settings → General → COD Form version**, y debe ser
  compatible con la versión de GemPages (V6 → legacy, V7 → latest). **Anotar la versión en uso en §6.**
- A este botón le podemos aplicar además nuestras propias clases de marca para estilarlo como cualquier
  otro CTA de la landing. Las clases `_rsi-*` se dejan intactas.

### 4.4 Arquitectura de despliegue — VERIFICADA en producción

Es el montaje que funciona en `mimacolombia.com/pages/sknglow-piel-firme`. Vale para cualquier landing.

**Cómo queda la página:**

1. La landing entera vive en un **Custom Code** de GemPages (pestañas HTML / CSS / JS).
2. Al final de la página se añade **un Product Element** enlazado al producto de ESA landing.
   No lleva nada dentro: es solo el proveedor de contexto.
3. Los CTA de la landing son botones nuestros con las clases de §4.3.

Releasit detecta el producto a través del Product Element y engancha los CTA. Cada landing enlaza su
propio producto desde el editor, sin tocar el tema y sin handles escritos a mano en ningún sitio.

**Lo que hay que neutralizar y por qué:**

Releasit pinta su propio botón dentro del Product Element — en el DOM real aparece como último hijo del
`<form>`:

```
gp-product > product-form > form > button#rsi_buy_now_button
```

Ese botón sobra: la landing ya tiene sus CTA. Se neutraliza **el contenedor entero**, nunca los
elementos de la app uno a uno:

```css
gp-product {
	position: absolute !important;
	width: 1px !important;
	height: 1px !important;
	overflow: hidden !important;
	clip-path: inset(50%) !important;
	pointer-events: none !important;
}
```

Por qué así:

- **El contenedor, no la app.** Perseguir clases `_rsi-*` no escala: son internas, cambian de versión a
  versión y hay varias (`_rsi-buy-now-button-floating`, `_rsi-buy-now-button-app-block-hook`,
  `#rsi_buy_now_button`…). Regla única sobre `gp-product` y da igual lo que Releasit añada dentro.
- **Nunca `display:none`.** La app necesita el nodo renderizado para leer el producto e inicializar el
  formulario. Se saca del flujo, no se elimina.
- **Sin JS ni parpadeo.** `<gp-product>` viene ya en el HTML del servidor, así que el CSS aplica en el
  primer pintado.
- **Corolario:** en estas landings el Product Element es andamiaje, no interfaz. Si alguna vez se quiere
  un Product Element visible, hay que acotar esta regla por `data-uid`.

**Ojo con el botón fijo:** además, Releasit puede pintar un CTA flotante propio sobre toda la tienda.

> **Corregido el 2026-09-03 con la landing de CLOROFULL en producción.** Sí se puede —y conviene—
> apagarlo desde el CSS de la landing. El nodo es `div#_rsi-buy-now-button-floating`, hijo directo de
> `<body>`, `position: fixed`, `z-index: 100099900`; aparece al bajar y **tapa el pie y nuestro sticky**.
> Como el CSS de la landing solo carga en su página, el alcance es exacto, mientras que la opción de
> *Releasit → Settings* es **global a la tienda** y apagarla ahí se lleva por delante el botón de las
> demás fichas de producto. Se neutraliza con el mismo patrón que `gp-product` —fuera del flujo, nunca
> `display: none`— porque la app usa el nodo:
>
> ```css
> #_rsi-buy-now-button-floating {
> 	position: absolute !important;
> 	width: 1px !important;
> 	height: 1px !important;
> 	overflow: hidden !important;
> 	clip-path: inset(50%) !important;
> 	pointer-events: none !important;
> }
> ```

**Los CTA no funcionan en la vista previa del app proxy.** La URL
`/a/gempages?...&page_type=GP_PRODUCT` renderiza la página pero **sin contexto de producto**: no hay
`gp-product`, ni `product-json`, ni `form[action*="/cart/add"]`, así que Releasit engancha los botones
—les añade `_rsi-buy-now-button-product`— pero al pulsarlos no abre nada y **no da ningún error en
consola**. En la URL publicada del producto sí funcionan. Antes de dar por roto un CTA, comprobarlo en
`/products/<handle>`, nunca en la preview.

**Todos los botones enganchados comparten `id="_rsi-buy-now-button-overwrite"`.** Es cosa de la app:
diez CTA, diez veces el mismo id. HTML inválido, pero no rompe nada —el enganche es por clase—:
verificado en producción que los diez abren el formulario. No intentar "arreglarlo" tocando los ids.

---

## 5. Procedimiento para descubrir los selectores reales

Obligatorio antes de escribir cualquier override. Se hace sobre la **página publicada en vivo**, con el
formulario **abierto y visible**.

### 5.1 Paso 0 — ¿es estilable siquiera?

Si el formulario vive en un `<iframe>` o en un shadow DOM cerrado, **nuestro CSS no llega**. Comprobarlo
primero, en la consola:

```js
// ¿iframe?
console.log('iframes:', document.querySelectorAll('iframe[src*="releas"], iframe[id*="rsi"], iframe[class*="rsi"]').length)

// ¿shadow DOM?
console.log('shadow hosts:', [...document.querySelectorAll('*')].filter(el => el.shadowRoot).map(el => el.tagName + '.' + el.className))
```

- **0 iframes y 0 shadow hosts relevantes** → DOM normal, se puede estilar. Continuar.
- **Hay iframe** → no hay override posible. Todo al Form Designer. Documentarlo aquí.
- **Hay shadow DOM abierto** → los estilos externos **no** heredan; solo llegan las custom properties.
  En ese caso, la vía es definir variables CSS heredables en un ancestro. Documentarlo aquí.

### 5.2 Paso 1 — volcar todas las clases `_rsi-`

```js
const nodes = document.querySelectorAll('[class*="_rsi"]')
const classes = new Set()
nodes.forEach(node => node.classList.forEach(name => name.includes('_rsi') && classes.add(name)))
console.log('nodos:', nodes.length)
console.log([...classes].sort().join('\n'))
```

### 5.3 Paso 2 — identificar el nodo raíz y los bloques

```js
// Raíz: el nodo _rsi más alto del árbol
const root = document.querySelector('[class*="_rsi"]')
console.log(root.className, '→ padre:', root.parentElement.tagName)

// ¿Se monta en el body (modal) o dentro de nuestra sección?
console.log('¿hijo directo de body?', root.parentElement === document.body)
```

Anotar por separado: raíz, contenedor del formulario, cada campo (label, input, error), selector de
cantidad / ofertas, order bump, resumen del pedido, botón de envío, overlay del modal.

### 5.4 Paso 3 — detectar estilos inline

```js
document.querySelectorAll('[class*="_rsi"][style]').forEach(node => console.log(node.className, '→', node.getAttribute('style')))
```

Lo que salga aquí **solo se puede sobrescribir con `!important`** (un estilo inline gana a cualquier
selector externo, tenga la especificidad que tenga). Es la **excepción documentada** a la regla de
`AGENTS.md` §4.9 sobre `!important`.

### 5.5 Paso 4 — anotar en el inventario

Rellenar §6 con lo encontrado, la fecha y la versión del formulario. Si algo deja de funcionar en el
futuro, lo primero es repetir este procedimiento y comparar.

---

## 6. Inventario de selectores — VERIFICADO

**Hay dos formularios en juego y cada tienda sirve el suyo.** La versión se elige en *Releasit →
Settings → General → COD Form version* y es **global a la tienda**, así que lo primero de cualquier
auditoría es saber cuál está servido: si al abrir el modal existe `#rsi_form_wrapper` es el **nuevo**
(§6.7); si existe `#_rsi-cod-form-modal` es el **legacy** (§6.1–6.6). Los ganchos no se parecen en nada
y un skin escrito contra el otro no hace absolutamente nada.

| Tienda | Versión servida | Verificado | Skin |
|---|---|---|---|
| mimacolombia.com | **Nuevo** (`rsi-*`) | 2026-08-26 | `/mima/shared/releasit-form.css` |
| etermacolombia.com | **Legacy** (`_rsi-*`) | 2026-09-03 | `/eterma/shared/releasit-form.css` |

### 6.0 Auditoría de MIMA

- **Tienda / marca:** mimacolombia.com — MIMA
- **Página auditada:** `/products/skinglow-rostro-descansado`
- **Renderizado:** **DOM normal.** Sin iframe y sin shadow DOM en el formulario → **se puede estilar por CSS.**
  (El único iframe de la página es el web pixel de Shopify; el único shadow host es `SHOP-CART-SYNC`.)
- **Verificado el:** 2026-08-26
- **Nodos `_rsi-` cerrado / abierto:** 29 / 100 · **61 clases distintas**

> Reverificar tras cada actualización de la app repitiendo §5, y actualizar la fecha.

> **⚠️ §6.1–6.6 documentan el formulario LEGACY (prefijo `_rsi-`).** La tienda sirve
> hoy el **formulario nuevo**, cuyo DOM es distinto: ver **§6.7**, que es el que
> aplica. Se conserva lo anterior porque Releasit permite volver a la versión
> legacy desde *Settings → General → COD Form version*.

### 6.1 Estructura real del DOM

```
body
└─ div._rsi-cod-form-modal-open              ← hijo DIRECTO de <body>, position: fixed, z-index: 2147483647
   │                                            solo existe con el modal abierto → sirve de gate de estado
   └─ div._rsi-modal-container                  (variante RTL: ._rsi-modal-container-rtl)
      ├─ div._rsi-modal-header
      │    └─ ._rsi-modal-header-title
      ├─ button._rsi-modal-close-button
      └─ form._rsi-modal-form
         ├─ ._rsi-build-block._rsi-build-block-order-summary
         │    └─ ._rsi-modal-line-items > ._rsi-modal-line-item
         │         ._rsi-modal-line-item-image-container / -image / -info / -title / -quantity / -final-price
         ├─ ._rsi-build-block._rsi-build-block-totals-summary
         │    └─ ._rsi-modal-checkout-lines > ._rsi-modal-checkout-line
         │         ._rsi-modal-checkout-line-title / -price / -value / -value-bigger
         ├─ ._rsi-build-block._rsi-build-block-shipping-rates
         │    └─ ._rsi-modal-shipping-rates-title / -item / -item-title
         │       ._rsi-modal-shipping-rates-item-checkbox / -checkbox-container
         ├─ ._rsi-build-block._rsi-build-block-discount-codes._rsi-build-block-not-active
         ├─ ._rsi-build-block._rsi-build-block-custom-text > ._rsi-custom-text-field
         ├─ div._rsi-modal-fields-item[._rsi-modal-fields-item-with-icon][data-icon-type]
         │    ├─ label            ← SIN CLASE
         │    ├─ ._rsi-modal-required-label
         │    └─ input | select   ← SIN CLASE: se targetean por [data-type]
         ├─ ._rsi-tick-ups-container   ← ofertas por cantidad / bumps
         │    └─ ._rsi-tick-ups / -offer / -offer-desc / -offer-with-border / -img-container
         ├─ ._rsi-build-block._rsi-build-block-submit-button
         │    └─ button._rsi-modal-submit-button[type=submit]
         └─ ._rsi-build-block._rsi-build-block-custom-button._rsi-build-block-custom-button-checkout
```

### 6.2 Las dos reglas que cambian cómo se escribe el CSS

1. **Inputs, selects y labels NO tienen clase.** Se targetean por atributo dentro del formulario:
   `._rsi-modal-form input[data-type='phone']`. Nunca por posición (`:nth-child`), que se rompe al
   reordenar campos en el Form Designer.
2. **El estado de error vive en el CONTENEDOR, no en el input:** `._rsi-modal-fields-item-error`.
   Patrón oficial observado en su hoja de estilos:
   `._rsi-modal-fields-item._rsi-modal-fields-item-error._rsi-modal-fields-item-with-icon input[data-type='email']`.

### 6.3 `data-type` disponibles (form actual de MIMA)

| `data-type` | Elemento | Requerido | Icono |
|---|---|---|---|
| `first_name` | `input[type=text]` | Sí | — |
| `last_name` | `input[type=text]` | Sí | — |
| `phone` | `input[type=tel]` | Sí | `whatsapp` |
| `address` | `input[type=text]` | Sí | — |
| `province_country_field` | `select` | Sí | — |
| `city` | `input[type=text]` | Sí | — |
| `email` | `input[type=email]` | No | — |
| `newsletter_subscribe_checkbox` | `input[type=checkbox]` | No | — |
| `custom_text` | `div` | — | — |
| `additionals_custom_text.<timestamp>` | `div` | — | — |
| `additionals_checkout_button.<timestamp>` | `div` | — | — |

`data-icon-type` vistos: `whatsapp` (en uso), `person`, `date` (presentes en su CSS).

> Los `data-type` con timestamp (`additionals_*.1763255778600`) son **inestables**: cambian si se
> recrea el bloque en el Form Designer. Targetearlos con prefijo: `[data-type^='additionals_custom_text']`.

### 6.4 Botón COD en la página

`._rsi-buy-now-button` (base) · `-product` · `-floating` · `-product-floating` · `-with-subtitle` ·
`-subtitle` · `-shaker` · `._rsi-button-icon` · `._rsi-button-icon-left` ·
`._rsi-buy-now-custom-additionals-button`

### 6.5 Elementos con estilo inline → NO se pueden sobrescribir

Confirmados en vivo (§5.4). Son los que pinta el Form Designer:

- `._rsi-buy-now-button` y todas sus variantes (background, color, border-radius, tipografía)
- `._rsi-modal-header-title`
- `._rsi-modal-shipping-rates-title`
- `._rsi-custom-text-field`
- `._rsi-tick-ups-offer-desc`
- `._rsi-modal-submit-button`

**Traducción práctica:** color, fondo y radio de estos elementos **se cambian en el Form Designer**.
No es que por CSS quede frágil: es que **no aplica**.

> **La regla dura, comprobada en vivo el 2026-09-03 sobre etermacolombia.com.** El Form Designer no
> escribe `style="background: X"`, escribe `style="background: X !important"`. Y una declaración
> `!important` en el atributo `style` **gana a cualquier `!important` de una hoja de estilos**: el paso
> «Element-Attached Styles» del orden de cascada (CSS Cascade 4 §6.4) se resuelve *después* de origen e
> importancia, así que ninguna especificidad lo alcanza. Se probó inyectando
> `background: … !important` sobre los dos botones de pago del formulario de Eterma y se quedaron con su
> color original.
>
> Antes de escribir un override contra cualquier elemento de esta lista, leer su atributo `style` real
> (§5.4) y comprobar si lleva `!important`:
>
> - **con `!important`** → Form Designer, punto. Documentarlo en el
>   `<marca>/shared/releasit-form-designer.md` de la marca y no escribir la regla.
> - **sin `!important`** → un `!important` nuestro sí lo gana. Es el caso de las plaquitas de las ofertas
>   de cantidad y del estado seleccionado, que se resuelven por CSS en las dos marcas.

### 6.6 Hallazgos abiertos en mimacolombia.com

Detectados durante la auditoría. No son de estilo, pero afectan de lleno a la conversión:

1. **El resumen del pedido muestra `-SKNGLOW-NO-USAR`** como nombre del producto. Un nombre interno de
   pruebas visible justo en la pantalla de pago. Es exactamente la señal que dispara la sensación de
   estafa. **Prioridad máxima.** Se corrige renombrando el producto en Shopify.
2. **Formato de moneda `$79.900,00`.** El peso colombiano no lleva decimales. Se corrige en Releasit
   (artículo *How to Change the Currency Format*).
3. **`font-size: 15.96px` en los inputs.** Por debajo de 16px, iOS hace zoom automático al enfocar y
   descuadra el modal en mobile. Se corrige por CSS (§8).
4. **"Envío Prioritario $3.500" suma al total** ($83.400) mientras el método seleccionado dice "Envío
   gratis", y la landing promete envío gratis. Descuadre entre lo prometido y lo cobrado: verificar la
   configuración de tarifas de envío.
5. **El título del producto se renderiza como enlace subrayado** dentro del resumen: parece un link roto
   y además es una salida del funnel. Neutralizar por CSS (§8).

### 6.7 Formulario NUEVO — inventario verificado

- **Verificado el:** 2026-08-26 · `/pages/sknglow-piel-firme`, modal abierto, viewport 390px y 475px
- **Bundle:** `releasit-cod-form-443/assets/main-Bmp3jl8I.js`
- **Renderizado:** `<dialog id="rsi_form_wrapper">` en el DOM de la página.
  **Sin iframe y sin shadow DOM → se puede estilar entero por CSS.**

#### La regla que lo cambia todo: dos clases por nodo

Cada elemento lleva una clase de styled-components y una clase semántica:

```html
<input class="sc-gjNGSd bsajLB rsi-text-input-field" id="phone">
        └──────┬──────┘  └──────────┬──────────┘
         hash VOLÁTIL          gancho ESTABLE
```

El hash cambia en cada build de la app. **Usar solo las `rsi-*`.** Un CSS escrito
sobre `.sc-gjNGSd` se rompe en la siguiente actualización sin aviso.

Ojo con dos detalles de nomenclatura:

- El formulario nuevo usa `rsi-` **sin guion bajo inicial**. El `_rsi-` sigue
  existiendo, pero solo en los ganchos de integración (`_rsi_main_form_element`,
  `_rsi-cod-form-gempages-button-overwrite`).
- Los botones mezclan guion y guion bajo: `rsi-custom-button` pero
  `rsi-submit_button` y `rsi-additionals_checkout_button`.

#### Ganchos por zona

| Zona | Clases |
|---|---|
| Diálogo | `#rsi_form_wrapper` · `rsi-form-wrapper-dialog` · `_rsi_main_form_dialog_element` |
| Formulario | `rsi-form-main` · `_rsi_main_form_element` |
| Cabecera | `rsi-form-header` · `rsi-form-title-container` · `rsi-form-close-button` |
| Contenido | `rsi-form-content-wrapper` · `rsi-form-page-wrapper` · `rsi-form-page-container` · `rsi-form-page-content` · `rsi-form-spacer` |
| Layout | `rsi-layout-wrapper` · `rsi-layout-tablet` · `rsi-layout-tablet-first` · `rsi-layout-tablet-second` |
| Campos texto | `rsi-text-input-wrapper` · `rsi-text-input-label` · `rsi-text-input-required` · `rsi-text-input-row` · `rsi-text-input-field` · `rsi-text-input-icon` |
| Select | `rsi-select-wrapper` · `rsi-select-label` · `rsi-select-required` · `rsi-select-input-row` · `rsi-select-field` · `rsi-select-option` |
| Botones | `rsi-custom-button-wrapper` · `rsi-custom-button-row` · `rsi-custom-button` · `rsi-custom-button-content` · `rsi-submit_button` · `rsi-additionals_checkout_button` |
| Producto | `rsi-product-details-wrapper` · `rsi-product-details-column` · `rsi-product-item-wrapper` · `rsi-product-item-image` · `rsi-product-item-quantity` · `rsi-product-item-title` · `rsi-product-item-name` · `rsi-product-item-prices` · `rsi-product-item-original-price` |
| Totales | `rsi-total-summary-wrapper` · `rsi-total-summary-column` · `rsi-total-summary-label` · `rsi-total-summary-value` · `rsi-total-summary-total-label` · `rsi-total-summary-total-value` |
| Envío | `rsi-shipping-rates-wrapper` · `rsi-shipping-rates-item` · `rsi-shipping-rates-radio` · `rsi-shipping-rates-text` · `rsi-shipping-rates-label` · `rsi-shipping-rates-title` |
| Checkbox | `rsi-checkbox-wrapper` · `rsi-checkbox-row` · `rsi-checkbox-column` · `rsi-checkbox-input` · `rsi-checkbox-label` · `rsi-checkbox-error-row` |
| One-tick / bump | `rsi-onetick-wrapper` · `rsi-onetick-label` · `rsi-onetick-text` · `rsi-onetick-desc` |
| Oferta de cantidad | `rsi-quantity-product` · `rsi-quantity-image-wrapper` · `rsi-quantity-image` · `rsi-quantity-title-wrapper` · `rsi-quantity-title` · `rsi-quantity-price-container` · `rsi-quantity-price-wrapper` · `rsi-quantity-old-price` · `rsi-quantity-plaque` |
| Texto libre | `rsi-custom-text` |
| Animación | `rsi_animation_shake` · `rsi_animation_none` |

#### Trampas verificadas

1. **El contenedor del order bump es `.rsi-onetick-wrapper`, no `.rsi-onetick-label`.**
   El fondo saturado y el trazo discontinuo viven en el wrapper. Estilar el label
   produce una caja dentro de otra.
2. **El trazo discontinuo es `outline`, no `border`.** Cambiar `border-style` no
   lo quita: hace falta `outline: none`.
3. **El color de `.rsi-custom-text` está en el `<span>` interior**, no en el `<p>`.
   Hay que alcanzar a los dos.
4. **El campo de texto tiene radio asimétrico** (`0 20px 20px 0`) porque el icono
   es un hermano con su propio fondo. La solución es mover marco y radio a
   `.rsi-text-input-row` y dejar icono y campo transparentes.
5. **`accent-color` de los radios viene fijado a `#2458D2`** por clase. Conviene
   valor literal y `!important` en lugar de variable heredada.
6. **La oferta de cantidad no lleva clase de seleccionado.** El estado se detecta
   con `:has(input:checked)` sobre `.rsi-quantity-product`, igual que el order bump.
7. **El contenedor del precio de la oferta no es flex.** Sale `display: block`, así
   que `gap` no hace nada y el importe acaba pegado al badge de ahorro. Hay que
   forzar `display: flex` antes de separarlos.
8. **Con decimales, el importe de la oferta se parte a mitad de número**
   (`$125.860,` / `00`). Se evita con `white-space: nowrap`, pero la solución de
   fondo es quitar los decimales en la app: el peso colombiano no los lleva.
9. **`rsi-layout-tablet` solo aparece a partir de ~485px.** A 390px el formulario
   es de una columna. A ancho tablet monta dos columnas y el order bump queda en
   una columna de ~200px que parte palabras. Revisar siempre a los dos anchos.

#### Con estilo inline → van al Form Designer, no al CSS

- `.rsi-product-item-wrapper` — `background-color`, `border`, `border-radius`, `color`
- `.rsi-onetick-text` — `color`
- `.rsi-onetick-desc` — `color`
- `.rsi-total-summary-total-label` — `font-weight`
- `.rsi-form-spacer` — `font-size`

#### Procedimiento de reverificación

No hace falta la extensión de Chrome. Con Chrome headless y CDP (Node 22 trae
`WebSocket` nativo):

```
chrome --headless=new --remote-debugging-port=9222 --user-data-dir=/tmp/prof about:blank
```

Luego, por CDP: `Emulation.setDeviceMetricsOverride` a 390px, navegar, hacer
`click()` sobre `._rsi-cod-form-gempages-button-overwrite`, esperar ~6s y volcar
el árbol de `#rsi_form_wrapper`. Para probar cambios sin publicar, inyectar la
hoja con un `<style>` y capturar con `Page.captureScreenshot`.

### 6.8 Eterma — formulario LEGACY, inventario verificado

- **Verificado el:** 2026-09-03 · `etermacolombia.com/products/clorofull™`, modal abierto, 390px y 1280px
- **Renderizado:** DOM normal, sin iframe ni shadow DOM. `#rsi_form_wrapper` **no existe**;
  el árbol es `body > div#_rsi-cod-form-modal._rsi-cod-form-modal-open > div._rsi-modal-container >
  form#_rsi-cod-form-modal-form._rsi-modal-form`.
- **Aplica §6.1–6.6.** Aquí solo se anota lo que aquella auditoría no cubría.

#### Ofertas de cantidad (no estaban en §6.1)

Sustituyen al resumen del pedido, que llega con `._rsi-build-block-not-active`.

```
div#rsi-cod-form-quantity-offers-hook > div._rsi-quantity-offers
  └─ div._rsi-quantity-offers-offer-container[._rsi-quantity-offers-selected]
     ├─ div._rsi-quantity-offers-offer
     │   ├─ div._rsi-modal-line-item-image-container > img._rsi-modal-line-item-image
     │   ├─ div._rsi-quantity-offers-info
     │   │   ├─ div._rsi-quantity-offers-title
     │   │   └─ div._rsi-quantity-offers-plaque-container > ._rsi-quantity-offers-plaque
     │   └─ div._rsi-quantity-offers-prices
     │       ├─ div._rsi-quantity-offers-old-price
     │       └─ div._rsi-quantity-offers-new-price
     └─ input._rsi-quantity-offers-item-input
```

**El seleccionado SÍ trae clase propia** (`._rsi-quantity-offers-selected`): a diferencia del formulario
nuevo (§6.7, trampa 6), aquí no hace falta `:has(input:checked)`.

#### El plato del icono va dentro del `background-image` del input

`._rsi-modal-fields-item-with-icon` no tiene ni pseudo-elemento ni nodo hermano: el icono es un SVG en
`background` del propio `<input>`, con el rectángulo gris, la divisoria y el glifo **dibujados dentro**
(`background-size: 44px auto`, `padding-left: 59px`). No se puede recolorear con `color` ni con
`filter` sin afectar al texto: hay que **sustituir el SVG por el mismo dibujo con los hexes cambiados**,
que es lo que hace el skin de Eterma. Cuatro sprites: persona (nombre y apellido), teléfono, chincheta
(dirección y ciudad) y arroba (correo). El `<select>` no lleva plato, solo el chevrón.

#### Estado de error — verificado enviando el formulario vacío

```html
<div class="_rsi-modal-fields-item _rsi-modal-fields-item-with-icon _rsi-modal-fields-item-error">
  <label>Nombre<span class="_rsi-modal-required-label">*</span></label>
  <input data-type="first_name" …>
  <p class="_rsi-modal-fields-item-error-text">Este campo es obligatorio.</p>
</div>
```

No hay `aria-invalid`: el único gancho es la clase del contenedor y el `<p>` hermano.

#### Los dos botones de pago

| | Contraentrega | Pago anticipado |
|---|---|---|
| Etiqueta | `<button>` | **`<a>`**, no `<button>` |
| Clase | `._rsi-modal-submit-button` | `._rsi-buy-now-custom-additionals-button` |
| Bloque padre | `._rsi-build-block-submit-button` | `._rsi-build-block-custom-button-checkout` |

Los dos bloques son **hijos directos del `<form>`**, que es `display: block`. Pasándolo a columna flex
se pueden reordenar con `order` — es lo único que queda cuando el color está bloqueado inline. El skin
de Eterma lo usa para poner el pago anticipado primero.

#### Inline en esta tienda (§6.5)

- **Con `!important`, intocables por CSS:** los dos botones de pago (fondo, color, radio, borde, sombra,
  tamaño de letra), `._rsi-modal-header-title`, `._rsi-custom-text-field` y el `<label>` del order bump
  (fondo amarillo y borde rojo).
- **Sin `!important`, ganables por CSS:** `._rsi-quantity-offers-plaque`,
  `._rsi-quantity-offers-new-price` y el fondo y borde de `._rsi-quantity-offers-selected`.

#### Hallazgos abiertos en etermacolombia.com

No son de estilo, pero pesan más que cualquier override. Detalle y valores en
`/eterma/shared/releasit-form-designer.md`.

1. **El formulario abre preseleccionando la oferta de 2 unidades**: total $113.400 frente a los $79.900
   que anuncia la landing. Es el mismo patrón que se vio en MIMA.
2. **«Envío Prioritario» de $3.500 premarcado**, sin copy que lo respalde en la landing.
3. **El botón de pago anticipado ofrece $5.000 de ahorro** y la landing promete $10.000.
4. **Importes con decimales** (`$79.900,00`).
5. **Inputs a 15,96px** → iOS hace zoom al enfocar. Corregido por CSS en el skin.
6. **Sacudida activa en los dos botones** a la vez.

---


---

## 7. Dónde va nuestro CSS y cómo se escribe

### 7.1 Ubicación

- **Por defecto:** un bloque `<style>` **dedicado y separado** dentro de la landing, al final del
  archivo, bajo una cabecera `/* === RELEASIT OVERRIDES === */`. Separado del CSS de la landing porque
  tiene otro ciclo de vida: se rompe con las actualizaciones de la app y hay que poder auditarlo de un
  vistazo.
- **Solo si el form debe verse igual en toda la tienda:** CSS del tema. Requiere acuerdo explícito, no
  se decide sobre la marcha.

**Decisión vigente en MIMA (2026-08-26):** el skin va en la pestaña **CSS del custom code de la
landing**, pegado a continuación del CSS de la landing. Dos motivos:

1. Las ediciones de `theme.liquid` de esta tienda **no llegan al HTML servido** (hay un optimizador de
   velocidad de por medio), así que el tema no es un sitio fiable donde poner nada ahora mismo.
2. El `@font-face` de AOK Buenos Aires lo declara la propia landing y es de documento, así que el modal
   hereda la tipografía de marca **sin tocar el tema**. Verificado: dentro de `#rsi_form_wrapper` la
   fuente computada es `AOK Buenos Aires`.

Contrapartida asumida: en páginas sin landing (ficha de producto) el formulario sigue saliendo genérico.
Cuando exista una segunda landing, extraer el skin a un asset compartido del tema y resolver ahí la
tipografía.

### 7.2 El problema del scope

**Confirmado en la auditoría:** el wrapper `._rsi-cod-form-modal-open` es **hijo directo de `<body>`**,
es decir **fuera** del contenedor raíz de nuestra landing. Nuestro namespace `.sg-lp` no lo alcanza, y las
reglas de un `<style>` aplican a todo el documento aunque el `<style>` viva dentro de nuestra sección.

Resultado: sin precaución, el CSS de una landing **modifica el formulario de toda la tienda**.

**Solución:** marcar el documento desde la propia landing y colgar los overrides de esa marca.

```html
<script>
	(function () {
		document.documentElement.classList.add('sg-lp-active')
	})()
</script>
```

```css
/* === RELEASIT OVERRIDES ===
   Solo activos en landings que marcan <html class="sg-lp-active">.
   Selectores internos NO documentados por Releasit: revisar tras cada update de la app.
   Inventario y verificación: docs/releasit-form-styling.md §6 */

.sg-lp-active ._rsi-modal-container {
	--sg-radius-field: 10px;
}
```

Funciona porque `.sg-lp-active` va en `<html>`, que **sí** es ancestro del wrapper colgado de `<body>`.

`._rsi-cod-form-modal-open` **solo existe mientras el modal está abierto**: sirve además como hook de
estado si se necesita afectar a la página de fondo (bloquear scroll, atenuar el CTA sticky).

### 7.3 Especificidad y `!important`

Orden de preferencia:

1. **Custom properties** en un ancestro, si el formulario las consume (lo más limpio y lo único que
   atraviesa un shadow DOM abierto).
2. **Selector normal** con el prefijo de gate: `.sg-lp-active ._rsi-modal-form input[data-type='phone']`.
3. **Doble clase** para subir especificidad sin `!important`:
   `.sg-lp-active ._rsi-modal-submit-button._rsi-modal-submit-button`.
4. **`!important`**, solo contra los elementos con estilo inline **sin `!important`** de §6.5, y siempre
   con comentario. Contra los que sí lo llevan no hay CSS posible: van al Form Designer.

### 7.4 Clase exacta o atributo

Las clases de Releasit son **legibles y sin hash de build** (`_rsi-modal-submit-button`), así que se usa la
**clase exacta**: es más precisa y más fácil de auditar. El comodín se reserva para dos casos:

- **`[data-type]` con timestamp**: `[data-type^='additionals_custom_text']` (§6.3).
- **Prefijos de familia** cuando de verdad interesa el grupo entero: `[class^='_rsi-tick-ups']`.

**Nunca** `[class*='_rsi']` a secas: engancha los 100 nodos del árbol de la app.

### 7.5 Tokens compartidos

El formulario debe heredar los tokens de la landing, no colores sueltos. Se declaran una vez y se
reutilizan, cumpliendo la regla de "sin magic numbers" de `AGENTS.md` §6.

```css
.sg-lp-active {
	--sg-color-primary: #000;
	--sg-color-border: #e5e5e5;
	--sg-color-error: #d92d20;
	--sg-radius-field: 10px;
	--sg-font-body: inherit;
}
```

---

## 8. Plantilla de override

Selectores **reales y verificados** (§6). Ajustar valores a los tokens de cada marca.

```css
/* === RELEASIT OVERRIDES ===
   Landing: <producto>-<campaña>
   Selectores verificados el 2026-08-26 · mimacolombia.com
   Ver docs/releasit-form-styling.md. Si algo deja de aplicar tras un update
   de Releasit, repetir §5 y actualizar el inventario §6. */

/* Gate: el wrapper del modal cuelga de <body>, fuera del scope de la landing.
   .sg-lp-active va en <html>, que sí es ancestro suyo. Sin este gate,
   estos estilos afectarían al formulario de TODA la tienda. */

/* ---- Campos ---- */
.sg-lp-active ._rsi-modal-form input,
.sg-lp-active ._rsi-modal-form select {
	font-size: 16px; /* < 16px provoca zoom automático en iOS. Actual: 15.96px */
	border-radius: var(--sg-radius-field);
}

/* Foco visible: accesibilidad y sensación de control */
.sg-lp-active ._rsi-modal-form input:focus-visible,
.sg-lp-active ._rsi-modal-form select:focus-visible {
	outline: 2px solid var(--sg-color-primary);
	outline-offset: 2px;
}

/* Campo concreto por data-type, nunca por :nth-child */
.sg-lp-active ._rsi-modal-form input[data-type='phone'] {
	letter-spacing: 0.02em;
}

/* Estado de error: vive en el contenedor, no en el input */
.sg-lp-active ._rsi-modal-fields-item._rsi-modal-fields-item-error input {
	border-color: var(--sg-color-error);
}

/* ---- Resumen del pedido ---- */
/* El título del producto sale como enlace subrayado: parece roto y es una
   salida del funnel. Se neutraliza visualmente. */
.sg-lp-active ._rsi-modal-line-item-title a {
	text-decoration: none;
	color: inherit;
	pointer-events: none;
}

/* ---- Botón de envío ---- */
/* Colores y tipografía: Form Designer (lleva estilo inline).
   Aquí solo geometría, que la app no expone. */
.sg-lp-active ._rsi-modal-submit-button {
	min-height: 52px;
}

/* ---- Mobile ---- */
@media (max-width: 767px) {
	.sg-lp-active ._rsi-modal-container {
		max-height: 92dvh;
		padding-bottom: env(safe-area-inset-bottom);
	}
}

/* ---- Overrides contra estilo inline ----
   Solo para los elementos listados en §6.5. Sin !important no aplican:
   un estilo inline gana a cualquier selector externo.
   Preferir siempre cambiarlo en el Form Designer antes que esto. */
.sg-lp-active ._rsi-modal-header-title {
	letter-spacing: 0 !important; /* inline: tipografía del Form Designer */
}
```

**Nota sobre el CTA propio.** El botón de GemPages con `_rsi-cod-form-gempages-button-overwrite` (§4.3)
es *nuestro*: no lleva estilo inline de Releasit y se estila con las clases de marca, sin `!important`.
Es la vía recomendada frente a estilar `._rsi-buy-now-button`.

## 9. Qué NUNCA hacer

- **Ocultar campos requeridos con CSS.** La validación sigue activa → usuario bloqueado sin explicación.
  Caída directa de conversión y de las peores de diagnosticar.
- **Mover, envolver, clonar o reescribir nodos de Releasit con JS.** La app re-renderiza y se pierde el
  binding: el formulario deja de enviar.
- **`display: none` sobre el botón de envío o el resumen del pedido**, ni siquiera "temporalmente".
- **Maquetar un formulario propio** que imite el de Releasit y envíe por nuestra cuenta. No hay endpoint
  público y se pierden order bump, upsell y tracking.
- **Modificar las clases `_rsi-*` de integración** (§4) o añadirles estilos que cambien layout.
- **`[class*='_rsi'] { ... }`** o selectores comodín sobre todo el árbol de la app.
- **Overrides sin el gate de §7.2**: afectan al formulario de toda la tienda.
- **Dar por buenos estos selectores sin verificarlos** (§5). Es la causa nº 1 de "el CSS no hace nada".

---

## 10. Mobile, rendimiento y accesibilidad

- **Mobile primero.** El grueso del tráfico es paid mobile: el formulario se valida a 360 px antes que en
  desktop.
- **`font-size: 16px` mínimo en inputs.** Por debajo, iOS hace zoom al enfocar y descoloca la vista.
  **Confirmado en mimacolombia.com: los inputs están a 15.96px.** Corregido en la plantilla de §8.
- **Área de toque ≥ 44–48 px** en campos y botones.
- **Teclados correctos:** el tipo de campo debe estar bien configurado en el Form Designer para que el
  teléfono abra teclado numérico. Es de las mejoras de conversión más baratas que existen.
- **CTA sticky + botón sticky de Releasit + header sticky del tema**: los tres a la vez tapan el
  formulario en mobile. Elegir uno y desactivar los otros. El modal de Releasit va a
  `z-index: 2147483647` (el máximo posible): **nada de la landing puede quedar por encima**, así que no
  hace falta pelear z-index, solo evitar solapes cuando está cerrado.
- **CLS:** el formulario carga de forma asíncrona. Si se inserta embebido en la landing, reservarle una
  altura mínima para que no empuje el contenido al montarse.
- **Contraste AA** en labels, placeholders y mensajes de error. Los placeholders grises claros sobre
  blanco son un problema real de legibilidad, no una cuestión estética.

---

## 11. CRO del formulario

- **Solo los campos imprescindibles para entregar el pedido.** Cada campo extra cuesta conversión.
- **Confianza junto al botón de envío**, que es donde aparece la duda: pago contraentrega, envío gratis,
  plazo de 3–5 días hábiles, confirmación por WhatsApp.
- **El precio del formulario y el de la landing deben coincidir exactamente.** Cualquier descuadre entre
  lo prometido arriba y lo que se ve al pagar dispara el abandono.
- **Order bump dentro del formulario**, con el copy aprobado en `docs/`, no improvisado.
- **Continuidad visual:** mismos colores, tipografía y radios que la landing. El usuario debe percibir
  que sigue en el mismo sitio.
- **Sin patrones oscuros** (`AGENTS.md` §7): nada de casillas premarcadas ni cargos no evidentes.

---

## 12. Checklist antes de publicar

- [ ] Ejecutado §5 y actualizado el inventario §6 con fecha y versión
- [ ] Todo lo cubierto por el Form Designer está hecho ahí, no por CSS
- [ ] Los overrides van en su bloque dedicado y con el gate de §7.2
- [ ] Cada `!important` corresponde a un estilo inline verificado y está comentado
- [ ] Envío real de prueba completado de principio a fin, con pedido recibido en Shopify
- [ ] Probado con datos inválidos: los errores se ven y se entienden
- [ ] Probado a 360 px: sin scroll horizontal, sin zoom al enfocar, sin solapes con elementos sticky
- [ ] Order bump y upsell se muestran y se pueden aceptar y rechazar
- [ ] Sin errores en consola
- [ ] Verificado que el CSS de la landing no altera el formulario de otras páginas

---

## 13. Fuentes

- [Cómo añadir un botón custom para el COD Form en GemPages — Releasit](https://help.releas.it/en/article/how-to-add-a-custom-button-for-the-cod-form-in-gempages-10ik3sp/)
- [Releasit COD Form & Upsells — Help Center de GemPages](https://help.gempages.net/articles/v7-releasit-cod-form-upsells)
- [Cómo personalizar tu COD Form — Releasit](https://help.releas.it/en/article/how-to-customize-your-cod-form-in-releasit-1hs11pz/)
- [Cómo personalizar diseño y estilo del botón COD — Releasit](https://help.releas.it/en/article/how-to-customize-the-design-and-style-of-the-cod-button-on-product-and-cart-pages-1ktypl3/)
- [Form Customization & Design (categoría completa) — Releasit](https://help.releas.it/en/category/form-customization-design-1kzonjp/)

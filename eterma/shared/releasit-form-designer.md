# ETERMA · Ajustes en Releasit que el CSS no puede hacer

Complemento de `eterma/shared/releasit-form.css`. Aquí va lo que depende de la
**configuración de la app**, no de la hoja de estilos: precios, ofertas, textos,
moneda y los colores que Releasit pinta con estilo inline.

Auditado en vivo el **2026-09-03** sobre `etermacolombia.com/products/clorofull™`
con el formulario abierto, viewport 390px y 1280px.

> **Esta tienda sirve el formulario LEGACY** (prefijo `_rsi-`, contenedor
> `#_rsi-cod-form-modal`), no el nuevo que usa MIMA. Se comprobó abriendo el
> modal: `#rsi_form_wrapper` no existe. Si se cambia la versión en
> *Releasit → Settings → General → COD Form version*, hay que rehacer el skin
> entero contra `/docs/releasit-form-styling.md` §6.7.

> **La auditoría es sobre `clorofull™`, la PDP pública.** El producto de la
> landing es `clorofull-mal-olor` y hoy está `available: false`, así que no se
> puede abrir su formulario. Las **ofertas de cantidad y el order bump se
> configuran por producto**: al activarlo hay que repetir esta comprobación
> sobre él. El diseño del formulario (colores, campos, bloques) sí es global.

---

## 1. Crítico — el formulario abre con otro producto y otro precio

La landing vende **una botella**: $79.900 contraentrega, $69.900 anticipado. El
formulario abre así:

```
Compra 1 Clorofull                      $79.900,00
Compra 2 Clorofull – Detox 66 días  ←  PRESELECCIONADA
Compra 3 Clorofull – Pack 99 días
────────────────────────────────────────────────────
Subtotal                               $159.800,00
Descuentos                            - $49.900,00
Envío Prioritario                        $3.500,00
Total                                  $113.400,00
```

Quien pulsa «Quiero probar Clorofull» esperando pagar **$79.900** se encuentra
**$113.400**. Es un salto de +42% en la pantalla donde se dan los datos
personales, y es la causa más directa de abandono que tiene hoy este funnel.

**Qué hacer:**

1. **Preseleccionar la oferta de 1 unidad.** Releasit → *Quantity Offers* del
   producto → marcar la de 1 como opción por defecto. La escalera de 2 y 3 se
   queda: la landing tiene un CTA de pack x2 y es donde debe elegirse.
2. **Quitar «Envío Prioritario» de $3.500** (ver §3).

Con las dos cosas, el total de apertura queda en $79.900 y coincide con la
landing.

---

## 2. Crítico — el ahorro por pago anticipado no es el que promete la landing

El botón naranja dice **«Ahorra 5.000$ por pago anticipado»**. La landing
promete **$10.000** ($79.900 → $69.900) y lo repite en el hero, en la oferta, en
la garantía, en el FAQ, en el cierre y en la barra fija.

**Qué hacer:** subir el descuento del botón de pago anticipado a **$10.000** y
dejar el texto como *«Pagar anticipado y ahorrar $10.000»* con subtítulo
*«Con tarjeta o PSE · $69.900»*.

Si el negocio no puede dar $10.000, entonces **el que cambia es el copy de la
landing**, no al revés: hoy hay una promesa escrita seis veces que el
formulario no cumple.

> Mientras esto no esté resuelto, `PREPAID_ENABLED` sigue en `false` en
> `september.html` y la barra fija anuncia el precio de contraentrega. La
> constante existe justo para que la página nunca prometa un precio que el
> formulario no cobra.

---

## 3. Crítico — «Envío Prioritario» premarcado

Una casilla marcada de origen que **añade $3.500** que el cliente no pidió, con
fondo amarillo y borde rojo, justo encima del botón de pagar.

Tres problemas a la vez:

1. **La landing no lo menciona.** No hay copy de order bump para este ángulo
   (`eterma/AGENTS.md` §1): esta landing no lleva bump.
2. **Viene premarcado.** Además de ser mal patrón, el Estatuto del Consumidor
   colombiano no ampara cobros por adiciones no solicitadas.
3. **Contradice la línea de envío del propio resumen**, que dice «Envío ·
   Gratis» dos líneas más arriba.

**Qué hacer:** Releasit → *Tick-ups / One-tick* → **retirar la oferta de Envío
Prioritario** de este producto. Si el cliente la quiere mantener, tiene que
llegar desmarcada y con copy aprobado en `olor/order_bump_upsell.md`, y la
landing tiene que anunciarla.

Mientras siga ahí, el amarillo y el borde rojo **no se pueden quitar por CSS**:
van inline con `!important` (§6).

---

## 4. Los dos botones de pago

Hoy son **negro** (contraentrega) y **naranja `#d68206`** (anticipado), con
radio de 2px y una sacudida activada. Ninguno de los dos es un color de Eterma,
y el naranja es precisamente el que `eterma/AGENTS.md` §2 descarta por ser el
botón por defecto de Releasit.

Los seis valores van inline con `!important`, así que **solo se cambian aquí**.
El orden sí lo resuelve el CSS: el anticipado va primero.

| | Pago anticipado (principal) | Contraentrega (secundario) |
|---|---|---|
| Fondo | `#0f2e20` | `#ffffff` |
| Texto | `#ffffff` | `#0f2e20` |
| Borde | ninguno | `2px solid #0f2e20` |
| Radio | `999px` | `999px` |
| Sombra | ninguna | ninguna |
| Sacudida | **off** | **off** |

Es el mismo par que la landing usa en sus CTA: relleno verde profundo para el
anticipado, contorno para el contraentrega. **Contraentrega no se castiga**:
mismo tamaño y mismo cuerpo de letra. Sigue siendo la vía de compra mayoritaria
en Colombia y esconderla cuesta pedidos.

La **sacudida** se apaga en los dos: es urgencia falsa (`/AGENTS.md` §7) y la
app la aplica a ambos botones a la vez, que es ruido puro en la pantalla de
pago. El CSS ya la neutraliza, pero apagarla en la app evita el parpadeo del
primer fotograma.

---

## 5. Formato de moneda

Hoy: `$79.900,00` · `$3.500,00` · `$113.400,00`

El peso colombiano no lleva decimales. Los `,00` en cada cifra hacen que el
formulario parezca mal configurado justo donde el cliente mira el dinero, y
además parten los importes largos a mitad de número cuando no caben.

Releasit → *How to Change the Currency Format* → quitar decimales.

---

## 6. Lo que Releasit pinta inline y por qué no hay CSS que lo arregle

Una declaración `!important` en el atributo `style` **gana a cualquier
`!important` de una hoja de estilos** (CSS Cascade 4 §6.4, paso
«Element-Attached Styles»). No es que el override quede frágil: es que no
aplica. Comprobado en vivo inyectando `background: … !important` sobre los dos
botones: se quedaron negro y naranja.

Con estilo inline `!important` — **solo Form Designer**:

| Elemento | Propiedades bloqueadas |
|---|---|
| `._rsi-modal-submit-button` (contraentrega) | fondo, color, radio, borde, sombra, tamaño de letra |
| `._rsi-buy-now-custom-additionals-button` (anticipado) | las mismas |
| `._rsi-modal-header-title` | color, peso, tamaño, alineación |
| `._rsi-custom-text-field` | color, peso, tamaño, alineación |
| `<label>` del order bump | fondo amarillo, borde rojo de 2px |

Con estilo inline **sin** `!important` — los gana el CSS y ya están resueltos en
`releasit-form.css`, **no hace falta tocarlos en la app**:

- `._rsi-quantity-offers-plaque` (las tres plaquitas de color distinto)
- `._rsi-quantity-offers-new-price`
- el fondo y el borde de la oferta seleccionada

> Se resuelven en el CSS a propósito: en la app cada oferta tiene su propio
> selector de color y no hay forma de garantizar que las tres sean la misma
> pieza. Desde el CSS son una sola regla y el color lo pone el estado, no el
> texto.

---

## 7. Textos

- **Título del modal:** hoy «PAGO CONTRA REEMBOLSO». Además de que ya no
  describe el formulario —hay dos formas de pago—, «reembolso» es la palabra
  equivocada: en contraentrega no hay reembolso, hay pago al recibir. Propuesta:
  **«Completa tu pedido»**.
- **Encabezado de los campos:** «Ingrese su dirección de envío» está bien; en la
  landing se tutea de principio a fin, así que encaja mejor **«¿A dónde te lo
  enviamos?»**.
- **Botones:** ver §4.

Todo el copy definitivo sale de `olor/copy-olor.md` cuando el cliente lo
apruebe: **el copy manda** (`eterma/AGENTS.md` §6).

---

## 8. Checklist de reverificación

Repetir esto tras cada actualización de la app y **obligatoriamente** cuando se
active `clorofull-mal-olor`:

- [ ] El modal sigue siendo el legacy (`#_rsi-cod-form-modal` existe,
      `#rsi_form_wrapper` no)
- [ ] Las clases del inventario siguen vivas (`/docs/releasit-form-styling.md` §6)
- [ ] La oferta preseleccionada es la de 1 unidad y el total abre en $79.900
- [ ] No hay order bump premarcado
- [ ] El ahorro por anticipado es de $10.000
- [ ] Los importes no llevan decimales
- [ ] Los inputs miden 16px (por debajo, iOS hace zoom al enfocar)
- [ ] Pedido de prueba completo, recibido en Shopify

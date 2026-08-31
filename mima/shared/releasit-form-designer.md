# MIMA · Ajustes en Releasit que el CSS no puede hacer

Complemento de `mima/shared/releasit-form.css`. Aquí va lo que depende de la
**configuración de la app**, no de la hoja de estilos: textos, moneda, tarifas y
ofertas. Ordenado por impacto en conversión, no por dificultad.

Auditado en vivo el 2026-08-26 sobre `mimacolombia.com/pages/sknglow-piel-firme`
con el formulario abierto (form v443, viewport 390px).

---

## 1. Crítico — el total no coincide con lo que promete la landing

En la misma pantalla, una debajo de otra, hoy se lee:

```
Subtotal              $89.900,00
Envío                     Gratis
Envío Prioritario      $3.500,00
────────────────────────────────
Total                 $93.400,00
```

Y el botón dice **PAGA CONTRAENTREGA - $93.400,00**.

> **Actualización 2026-08-27:** el precio del producto ya es $89.900 y coincide con
> el que anuncia la landing para contraentrega. Ese punto está resuelto. Lo que
> sigue abierto es el envío prioritario.

Dos problemas encadenados:

1. **"Envío: Gratis" y "Envío Prioritario: $3.500" se contradicen** a dos líneas
   de distancia. La landing promete envío gratis siete veces, y la barra de
   confianza que queda detrás del modal dice literalmente "Envío gratis · 3 a 5
   días". Cobrar un envío no anunciado en la pantalla final es de las causas más
   directas de abandono y de reclamación posterior.
2. **La casilla del Envío Prioritario viene marcada por defecto.** Un cargo
   añadido que la clienta no pidió y que tiene que descubrir y desmarcar. Además
   de ser un mal patrón, el Estatuto del Consumidor colombiano no ampara cobros
   por adiciones no solicitadas.
**Qué hacer** — decidir *una* de las dos y dejar todo coherente:

- **Opción A (recomendada): el envío prioritario desaparece.** Es lo que ya
  promete la landing. Releasit → *Upsells / One-tick* → desactivar la oferta de
  Envío Prioritario. Total = precio del producto, sin sorpresas.
- **Opción B: se mantiene, pero desmarcado y como mejora opcional.** Nunca
  premarcado. Y entonces la landing debe decir "envío gratis en 3-5 días, o
  prioritario por $3.500", no solo "envío gratis".

Con el envío prioritario fuera, el total queda en $89.900 y coincide exactamente
con lo que promete la landing.

---

## 2. Formato de moneda

Hoy: `$79.900,00` · `$3.500,00` · `$39.950,00`

El peso colombiano no lleva decimales. Los `,00` en cada cifra hacen que el
formulario parezca mal configurado justo donde la clienta mira el dinero.

Releasit → *Change the Currency Format Displayed in the COD Form* → formato sin
decimales. Objetivo: `$79.900`.

Aparte, en el botón secundario se lee **"Ahorra 5.000$"**, con el símbolo detrás
del número mientras el resto del formulario lo pone delante. Y contradice a la
landing, que ofrece **$10.000** de ahorro por pago anticipado. Unificar cifra y
formato: `Ahorras $10.000`.

---

## 3. Textos

| Dónde | Hoy | Propuesta | Por qué |
|---|---|---|---|
| Sobre el formulario | Ingrese su dirección de envío | ¿A dónde te lo enviamos? | La landing entera tutea ("tu piel", "tus manchas"). El usted rompe la voz justo al pagar. |
| Botón **principal** (anticipado) | Paga con tarjeta o PSE / Ahorra 5.000$ | Pagar ahora · $79.900 / Ahorras $10.000 | Es la opción recomendada en la landing. Cifra y formato coherentes. |
| Botón **secundario** (contraentrega) | PAGA CONTRAENTREGA - $93.400,00 | Prefiero pagar al recibir · $89.900 | Describe la elección sin castigarla. En mayúsculas y con el total inflado parece una advertencia. |
| Subtexto del secundario | Paga en efectivo al recibir | Pagas en efectivo cuando lo recibes | Tuteo, y el presente refuerza que no hay pago ahora. |
| Order bump | Párrafo de 5 líneas | Ver §4 | Nadie lee 5 líneas dentro de un checkout. |

### Placeholders

Hoy cada campo repite su etiqueta: label "Teléfono" + placeholder "Teléfono".
Ocupa sitio y no aporta nada. Mejor usar el placeholder para resolver la duda
real de formato:

| Campo | Placeholder propuesto |
|---|---|
| Teléfono | 300 123 4567 |
| Dirección | Calle 45 #12-30, apto 302 |
| Ciudad | Bucaramanga |
| Correo electrónico | Para enviarte la guía de 28 días |

El de correo hace doble trabajo: justifica por qué se pide un dato opcional y
recuerda el bono. El correo debe seguir siendo **opcional**.

### Casilla de newsletter

"Suscríbete para recibir notificaciones de nuevos productos y ofertas" añade una
decisión más en el punto de máxima fricción, y no aporta a esta venta. Quitarla
del formulario: ese consentimiento se pide mejor en el correo de confirmación.

---

## 4. Order bump — MIMA Calm

El copy aprobado (`landings/sknglow/piel/order_bump_upsell.md`) ocupa cinco
líneas dentro de una caja de checkout. Versión corta, mismo mensaje:

> **Agrega MIMA Calm por $39.950**
> El estrés y dormir poco se te notan en la piel. Ashwagandha, Magnesio y Té
> Verde para dormir mejor y potenciar tu SKNGLOW.

Dos líneas, el precio delante y el beneficio conectado con lo que ya está
comprando.

---

## 5. Bloques de confianza

Releasit permite texto personalizado encima del botón de envío, que es justo
donde aparece la duda. Copy corto, y **solo cosas que ya promete la landing**:

- Pagas cuando recibes tu pedido
- Envío gratis · llega en 3 a 5 días hábiles
- Confirmamos tu pedido por WhatsApp

Los tres datos ya están en el copy aprobado, así que refuerzan en vez de
introducir promesas nuevas.

---

## 6. Orden de los bloques

Hoy: producto → **totales** → método de envío → dirección → extras → botón.

Los totales aparecen antes de que la clienta haya escrito nada, y el método de
envío antes que la dirección, cuando el envío depende de a dónde va. Orden que
funciona mejor:

producto → dirección → método de envío → extras → **totales** → botones

El total justo encima del botón es lo último que se lee antes de decidir, que es
donde debe estar.

### Orden de los dos botones

Hoy sale primero **contraentrega** y debajo **pago anticipado**. Como el
anticipado es el principal, debería ir arriba.

**Esto no se puede resolver por CSS**: el contenedor de los botones es
`display: block`, así que `order` no tiene efecto, y convertirlo en flex
reordenaría también el resto de bloques del formulario. Hay que cambiarlo en el
Form Designer.

---

## 7. Comprobar

- **Imagen del producto en el resumen:** hoy sale un frasco granate. Verificar
  que es la imagen correcta de SKNGLOW y no la de otro producto.
- **Nombre del producto:** ya aparece como `SKNGLOW`. Resuelto.
- **Teclado numérico en móvil:** el campo teléfono es `type="tel"`, así que abre
  el teclado numérico. Correcto.
- **Autocompletado:** los campos no declaran `autocomplete`, así que el navegador
  no ofrece rellenar nombre, teléfono ni dirección. Si Releasit no lo expone en
  ajustes, se puede añadir por JS desde la landing.
- **Zoom de iOS:** los inputs están a 16px, que es el mínimo para que iOS no haga
  zoom al enfocar. El CSS lo fija explícitamente para que no se pierda.

---

## 7b. Oferta de cantidad que no aparece en el formulario — RESUELTO

**Causa:** en el editor de la oferta, la casilla **"Mostrar encima del botón de
compra (Disponible solo en modo emergente)"**. Marcada, el selector no se pinta
dentro del formulario. Desmarcarla y aparece.

Internamente es el flag `inlineOnPDP` de la oferta: con `true` el selector se
renderiza incrustado en la ficha de producto, no en el modal. Se detectó porque
era la única diferencia de configuración respecto a las dos ofertas que sí
funcionaban en la tienda.

Se conserva abajo lo que se descartó, porque son las hipótesis obvias y ahorra
repetir el camino.

### Descartado con pruebas

| Hipótesis | Resultado |
|---|---|
| La oferta no está activa o apunta a otro producto | **Falso.** `pIds: ["8980650983564"]`, exactamente el producto de la landing. |
| La oferta no le llega a la página | **Falso.** Viaja completa en `_RSI_COD_FORM_SETTINGS.quantityOffers[2]`. |
| Falta el JSON del producto | **No es eso.** Inyectando `window.productData` y `script.product-json` el selector sigue sin aparecer. |
| Releasit cree que no es página de producto (`isHomePage: true`) | **No es eso.** Forzado a `false`, sigue sin aparecer. |

### La pista buena

De las tres ofertas de cantidad de la tienda, la nuestra es la única con este flag:

```
"Oferta de cantidad SKNGLOW"   inlineOnPDP: true
"MIMA NAD"                     inlineOnPDP: undefined
"SKNGLOW- Uñas y Cabello"      inlineOnPDP: undefined
```

`inlineOnPDP` = *inline on Product Detail Page*: el selector se pinta **incrustado
en la ficha de producto**, no dentro del formulario COD. Nuestra landing no es una
ficha de producto y el formulario es un modal, así que no hay dónde pintarlo.

El bundle de la app (`main-Bmp3jl8I.js`) usa el flag para decidir el flujo:

```js
if (P && cr && cr.inlineOnPDP && !xr) { e(zt); await sleep(150); n(false); return; }
```

**Qué probar:** en el editor de la oferta, buscar el ajuste que controla dónde se
muestra el selector — algo del tipo "mostrar en la página de producto" / "inline"
— y desactivarlo, para que se pinte dentro del formulario. Es la única diferencia
de configuración respecto a las dos ofertas que sí funcionan.

### Además

`currentProductId`, que es contra lo que se filtran las ofertas, **se deriva de
las líneas del carrito**, no de la página:

```js
currentProductId: Number(vt.merchandise.product.id.split("/").pop())
```

Así que conviene probar siempre con el carrito vacío: un carrito con restos de
pruebas anteriores cambia el resultado.

Y si el selector llega a aparecer, **verificar que el descuento se aplica de
verdad**. En la captura del modal con 2 unidades el total era $179.800, es decir
2 × $89.900 sin descuento, cuando el escalón de 2 está configurado al 30%. Los
escalones usan códigos de descuento de Shopify (`RSI_QUANTITY_…`) y hay que
confirmar que entran.

---

## 7c. Banner de cabecera — PENDIENTE de dos ajustes

Añadido el 2026-08-27 como bloque de imagen (`custom_image`), en posición 0.
La app solo deja configurar URL y tamaño en %; el radio, el contorno y la
separación con el bloque de abajo los pone `releasit-form.css` §2b.

Quedan dos cosas que **solo se pueden hacer desde la app**:

**1. Limitarlo a SKNGLOW — RESUELTO, y no desde aquí.** El panel del bloque de
imagen solo tiene URL y tamaño: no expone restricción por producto, aunque el
dato `productsEnabled` sí viaje en la configuración. El mecanismo que ofrece
Releasit para servir formularios distintos son las **Versiones del Formulario**,
que son de plan Unlimited.

Resuelto por CSS, con interruptor por landing (`releasit-form.css` §2b): el
banner va oculto por defecto y solo se enciende donde el elemento raíz de la
landing lleva `data-rsi-banner`. Verificado en vivo: sin el atributo el bloque
queda en `display:none` y 0px de alto; con él, `display:flex` y 113px.

Si algún día se pasa al plan Unlimited, las Versiones del Formulario son mejor
sitio para esto: permitirían además tener oferta de cantidad y textos distintos
por landing, no solo el banner.

**2. La oferta de cantidad se fue al fondo.** Al colocar el banner, el bloque
`quantity_offer` pasó de la posición 1 a la 16. En escritorio no se nota porque
cae en la columna derecha, pero **en móvil aparece a 1036px de scroll**, después
de nombre, apellido, teléfono, correo, dirección, departamento y ciudad. El
cliente ve "Lleva 2 con 30% de descuento" cuando ya rellenó todo el formulario,
que es justo cuando cambiar de cantidad se siente como volver atrás. Antes
estaba arriba, donde se elige cantidad *antes* de invertir esfuerzo. Conviene
devolverla a la posición 1, debajo del banner.

**Sobre el tamaño en escritorio.** A partir de ~485px el formulario se parte en
dos columnas y el banner cae en la izquierda, a 245px de ancho — más pequeño que
en móvil (339px). No tiene arreglo por CSS: las columnas son dos y un bloque no
puede cruzarlas. Los elementos van a la derecha solo si tienen `layoutPosition`,
y aun así seguirían siendo una columna. Si el texto pequeño molesta, la salida
es una versión más compacta del banner, no un cambio de maquetación.

## 7d. Upsell de MIMANAD — el flujo del documento NO es posible tal cual

Analizado sobre el bundle de la app (form v443) el 2026-08-27.

`mima/docs/copy/order_bump_upsell.md` pide una pantalla de upsell **solo para
quien elige pago anticipado**. Releasit no puede hacer eso, y no es cuestión de
configurarlo mejor: **el concepto de método de pago no existe en la app**.
Búsqueda en el bundle: `paymentMethod`, `paymentType`, `prepaid`, `isPrepaid` →
**0 apariciones**. No hay dónde poner esa condición.

### Los dos únicos modos que existen

El orden de páginas lo decide una sola línea:

```js
Mt = o?.isPostPurchase ? [$t, or] : [or, $t]   // $t = fields, or = upsells
```

| `isPostPurchase` | Orden | Cuándo lo ve el cliente |
|---|---|---|
| `false` | `[upsells, fields]` | Al abrir el modal, **antes** de rellenar nada |
| `true` | `[fields, upsells]` | Después de crear el pedido contraentrega |

Con `false` la pantalla sale la primera, cuando el cliente todavía no ha elegido
forma de pago — y el copy "ESPERA. ANTES DE CONTINUAR" no tendría de qué
continuar.

Con `true` se dispara desde el envío del formulario (`create-order-new`), que es
la ruta **contraentrega**. El botón de pago anticipado no pasa por ahí: crea un
borrador (`lr.isDraft = !0`) y se va al checkout de Shopify. Releasit ya no
controla la pantalla.

### Qué sí se puede

1. **Upsell post-compra en contraentrega** (`isEnabled: true`, `isPostPurchase:
   true`). Sin código. Alcanza a la mayoría del volumen. Hay que reescribir el
   copy: va después del pedido, no antes.
2. **Upsell al abrir el modal** (`isPostPurchase: false`). Sin código, pero pide
   el añadido antes de que el cliente se haya comprometido con el producto
   principal. No recomendado.
3. **Para pago anticipado**: no es territorio de Releasit. El sitio correcto es la
   capa **post-purchase de Shopify** (pantalla posterior al pago), que es
   exactamente el formato que describe el documento y le llega justo a ese
   público. Requiere app de post-purchase o extensión propia — y confirmar que
   funciona sobre checkouts originados en borrador de pedido.

### El order bump sí funciona ya

`one_tick_upsells` está activo (posición 18) y vive dentro del formulario, antes
de los botones: le llega a **las dos** formas de pago. Solo falta cargarle el copy
de MIMA Calm del documento.

## 8. Qué NO tocar desde el Form Designer

Estos ya los resuelve `releasit-form.css` y configurarlos también en la app
dejaría la definición duplicada en dos sitios:

- Colores de botones, campos, cajas y cabecera
- Tipografía
- Radios de esquina y bordes
- Estados de foco y de selección

La regla: **la app decide qué se dice y qué se cobra; el CSS decide cómo se ve.**

---

## 7e. Condicionar el formulario según la elección de la landing

**Problema reportado (2026-08-28).** En «Elige cómo pagar» la clienta marca pago
anticipado, pulsa el CTA, y el formulario abre mostrando contraentrega con el
mismo peso visual. Elegir no servía de nada.

### Cómo está montado

La landing escribe la elección en `<html data-sg-pay="prepaid|cod">` desde su
propio `sync()`, y la piel del formulario la recoge en la sección 6b.

Se escribe la elección **real**, no el `mode` interno, porque el script tiene una
bandera `PREPAID_ENABLED` que fuerza todo a `cod`. Así esto funciona aunque esa
bandera siga apagada.

### Lo que se encontró en el DOM del formulario

| Elemento | Selector |
|---|---|
| Botón de pago anticipado | `.rsi-custom-button.rsi-additionals_checkout_button` |
| Botón de contraentrega | `.rsi-custom-button.rsi-submit_button` |
| Título del botón | `.rsi-custom-button-content > span` |
| Subtítulo | `.rsi-custom-button-content > p` |
| Icono | `.rsi-icon` |

**No se pueden reordenar.** Cada botón vive en su propia
`.rsi-custom-button-row` dentro de su propia `.rsi-custom-button-wrapper`, o sea
contenedores flex distintos: `order` no puede moverlos entre sí. El único padre
común es un `<div>` sin clase y colgar de ahí un selector estructural se rompería
con cualquier versión nueva de la app.

### Comportamiento resultante

| Estado | Anticipado | Contraentrega |
|---|---|---|
| Sin atributo | relleno magenta | contorno |
| `prepaid` | relleno magenta | **enlace subrayado** |
| `cod` | **enlace subrayado** | relleno magenta |

Verificado inyectando la sección 6b sobre el formulario publicado y capturando
los tres estados.

### Atenuar, no esconder

Contraentrega es la vía mayoritaria en Colombia. Si la clienta abre el
formulario, se lo repiensa y no encuentra cómo pagar al recibir, se pierde el
pedido. La opción descartada sigue existiendo y sigue siendo clicable: solo deja
de competir. La regla para ocultarla del todo está al final de 6b, comentada.

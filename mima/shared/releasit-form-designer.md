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

El copy aprobado (`docs/products/sknglow/copy/order_bump_upsell.md`) ocupa cinco
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

## 8. Qué NO tocar desde el Form Designer

Estos ya los resuelve `releasit-form.css` y configurarlos también en la app
dejaría la definición duplicada en dos sitios:

- Colores de botones, campos, cajas y cabecera
- Tipografía
- Radios de esquina y bordes
- Estados de foco y de selección

La regla: **la app decide qué se dice y qué se cobra; el CSS decide cómo se ve.**

# NAMBU · Ajustes en Releasit que el CSS no puede hacer

Complemento de `nambu/shared/releasit-form.css`. Aquí va lo que depende de la
**configuración de la app**, no de la hoja de estilos: qué bloques lleva el
formulario, ofertas, order bumps, descuentos, textos y moneda.

Auditado en vivo el **2026-09-28** con el formulario abierto, a 390 y 1280 px, en
`nambuoficial.com/pages/spray-nasal-sinusitis` (landing publicada) y en
`nambuoficial.com/products/lung-cleansing` (ficha). La oferta de cantidad y los
bumps son los mismos para `lung-cleansing-oferta` (remarketing): la oferta
«Lung Cleansing spray» cubre los dos productos.

> **Desde el 2026-09-28 esta tienda sirve el formulario NUEVO**
> (`dialog#rsi_form_wrapper`, clases `rsi-*`, bundle
> `releasit-cod-form-451/assets/main-DKQLqBEL.js`), el mismo que MIMA. Mapa de
> selectores: `/docs/releasit-form-styling.md` §6.7. La auditoría del formulario
> antiguo (2026-09-21) queda en el historial de git.

> **Qué cambió para el CSS.** El formulario antiguo pintaba botones, título y
> bumps en línea con `!important` y había que taparlos con capas. El nuevo no:
> **todo se viste desde el skin**, colores y radios de los botones incluidos. Lo
> que queda aquí son decisiones de contenido y configuración.

---

## 1. El formulario abre con 2 unidades

> **Decisión del cliente, 2026-10-05.** La oferta de cantidad x2 preseleccionada y el Envío
> Prioritario marcado (§3) son **configuración deliberada**: el formulario abre en $113.400 a
> propósito. No se reporta como problema ni se propone cambiarlo; lo que sigue queda como registro
> de lo medido.

> **Actualización, 2026-10-05.** El bloque de ofertas de cantidad ya está activo (medido en
> `/products/lung-cleansig-bg-3`): el selector se ve y el cliente puede bajar a 1 unidad. **Sigue
> pendiente el paso 1 de abajo:** el pack de 2 continúa preseleccionado y el formulario abre en
> $113.400 ($159.800 − $49.900 + $3.500 del Envío Prioritario), no en los $79.900 del anuncio.

El formulario nuevo **no lleva el bloque de ofertas de cantidad en su maqueta**,
pero **sí aplica la oferta preseleccionada**: la de 2 unidades (`pres: true` en la
oferta «Lung Cleansing spray», visible en `window._RSI_COD_FORM_QUANTIY_OFFERS`).
Medido con el carrito vacío y un navegador limpio, en la landing y en la ficha:

| | La landing dice | El formulario abre en |
|---|---|---|
| Línea de producto | 1 frasco, $79.900 | **2 unidades, $159.800** |
| Descuento del pack | — | **no aparece** (ni línea de descuento en los totales) |
| Envío Prioritario | Envío GRATIS | **+$3.500, premarcado** (§3) |
| **Total** | **$79.900** | **$163.300** |

En la ficha propia de la flema (*SPRAY NASAL | FLEMA*, 2026-09-28) el pack de 2 también viene
preseleccionado, esta vez con su descuento: $159.800 − $49.900 + $3.500 = **$113.400**. Tampoco es
el $79.900 que promete la landing.

Y no hay cómo bajarlo: el selector de ofertas no se pinta y el botón de quitar
producto (`.rsi-product-item-remove`) viene oculto por la app. Quien llega desde
un anuncio de $79.900 ve **el doble** en la pantalla donde deja sus datos. Es el
fallo más caro que tiene hoy el funnel, y afecta a las seis landings y a la ficha.

**Qué hacer, en este orden:**

1. **Preseleccionar la oferta de 1 unidad** (*Quantity Offers* → «Lung Cleansing
   spray» → la de 1 como opción por defecto). Solo con esto el formulario abre en
   $79.900.
2. **Añadir el bloque de ofertas de cantidad a la maqueta del formulario nuevo**,
   si se quieren ofrecer los packs. El skin ya lo tiene preparado
   (`releasit-form.css` §4b); al añadirlo hay que reverificarlo en vivo, y en
   una landing de `/pages/` comprobar que las ofertas salen (en el formulario
   antiguo hacía falta rellenar a mano la caché de producto; el nuevo la lee de
   `script.rsi-cod-form-app-block-product-cache`, docs §4.4).
3. Quitar el Envío Prioritario premarcado (§3).

Con 1 y 3, el total de apertura coincide con la landing: $79.900 (y $69.900 en
el remarketing).

---

## 2. Crítico: el ahorro por pago anticipado no es el que promete la landing

El botón de anticipado sigue diciendo **«Ahorra 5.000$ por pago anticipado»**. Las
landings prometen **$10.000**: $79.900 → $69.900 en los cinco ángulos, y $69.900 →
$59.900 en el remarketing. Lo repiten el hero, la oferta, la caja, la sección de
pago, la FAQ, el cierre y la barra fija.

**Qué hacer:**

- El descuento del botón debe ser de **$10.000 fijos**, no un porcentaje: así
  cuadra en los dos productos a la vez.
- Subtítulo del botón: **«Ahorras $10.000»**.

Si el negocio no puede dar $10.000, entonces **el que cambia es el copy de las
landings**, no al revés.

---

## 3. «Envío Prioritario» premarcado

> **Decisión del cliente, 2026-10-05:** viene marcado a propósito (§1). Lo que sigue es el registro
> de lo medido, no un pendiente.

Sigue llegando **marcado de origen**: añade $3.500 que nadie pidió, justo encima
de los botones de pago.

1. **Contradice la landing**, que promete «Envío GRATIS en Colombia», y la línea
   «Envío · Gratis» del propio resumen.
2. **Viene premarcado.** Además de ser mal patrón, el Estatuto del Consumidor no
   ampara cobros por adiciones no solicitadas.
3. No hay copy de order bump aprobado para el Spray.

**Qué hacer:** *Tick-ups* → **retirarlo**. Si se mantiene, tiene que llegar
**desmarcado**, con copy aprobado y anunciado en la landing. (El amarillo y el
borde rojo ya los quita el skin.)

---

## 4. Los dos botones de pago: textos y animaciones

**Los colores y la forma ya los pone el skin** (`releasit-form.css` §10–§11): el
anticipado primero, en la píldora verde manzana del CTA de la landing con texto
tinta; la contraentrega en blanco con filete verde. No hace falta configurarlos
aquí. Si alguien los cambia en la app, el skin sigue mandando.

Lo que sí es de la app:

- **Animaciones:** la contraentrega tiene un pulso y el anticipado una sacudida.
  El skin las apaga, pero conviene **apagarlas aquí** también: son urgencia falsa.
- **Textos.** Propuesta, con las palabras del copy de las landings
  («QUIERO PAGAR ANTICIPADO Y AHORRAR», «PREFIERO PAGAR AL RECIBIR»):

| | Texto | Subtítulo |
|---|---|---|
| Anticipado | Pagar anticipado con tarjeta o PSE | Ahorras $10.000 |
| Contraentrega | Pagar al recibir | En efectivo, cuando te llegue |

Hoy el de contraentrega dice «PAGA CONTRAENTREGA - $163.300,00» en mayúsculas y
con el total dentro: ocupa dos líneas en móvil, y con la píldora se nota más. El
total ya está en el resumen.

---

## 5. Ofertas de cantidad: textos

Cuando se añada el bloque (§1), estos son sus textos hoy en la app:

| Oferta | Hoy | Problema |
|---|---|---|
| 1 unidad | «Compra 1 Spray Nasal de Nambu» | Bien (ya no dice «Lung Cleansing») |
| 2 unidades | «Compra 2 unidades, pack **pulmones sanos** 🌿 ahorra **$30.000**» | Claim de salud fuera del copy aprobado (el Spray es nasal y su FAQ dice que no limpia los pulmones). Y el ahorro real es **$49.900** ($159.800 → $109.900) |
| 3 unidades | «Compra 3 unidades, pack **familia saludable** 🌿🌿 ahorra $99.800» | Claim fuera del copy |
| plaquitas | «OFERTA REGULAR», «MAS VENDIDO», «MAYOR DESCUENTO» | Falta la tilde: «MÁS VENDIDO» |

Propuesta: «1 Spray Nasal de Nambu», «2 Spray Nasal de Nambu · ahorras
$49.900», «3 Spray Nasal de Nambu · ahorras $99.800». El ahorro, siempre contra
el precio tachado que se ve al lado.

---

## 6. Textos del formulario y order bump del ungüento

- **Título del modal:** hoy «PAGO CONTRA REEMBOLSO». «Reembolso» es la palabra
  equivocada: en contraentrega no hay reembolso, hay pago al recibir, y además hay
  dos formas de pago. Propuesta: **«Completa tu pedido»**.
- **Encabezado de los campos:** «Ingrese su dirección de envío» trata de usted y
  las landings tutean. Propuesta: **«¿A dónde te lo enviamos?»**.
- **Pesos:** ya no hace falta tocarlos aquí. El skin deja todo en el único peso
  de Questrial (el 600 salía como negrita simulada).
- **Bump «Chest Relief Ungüento» ($19.000):** llega desmarcado, bien. Su copy
  (*«¿Solo spray nasal? Completa tu alivio respiratorio… despeja tu pecho y calma
  la tos desde afuera»*) son claims de salud que no están en ningún copy aprobado.
  Tiene que aprobarlo el cliente o quitarse.

---

## 7. Casilla del boletín premarcada

«Suscríbete para recibir notificaciones de nuevos productos y ofertas» sigue
llegando **marcada**. La Ley 1581 de 2012 pide autorización **previa, expresa e
informada** para tratar datos con fines comerciales, y una casilla premarcada
difícilmente lo es. Debe llegar **desmarcada**; conviene confirmarlo con quien
lleve lo legal de la tienda.

---

## 8. Código de descuento

El formulario nuevo lo trae dentro del bloque de totales. El skin lo pinta con la
marca, pero la pregunta es si debe estar: un campo de cupón a mitad del
formulario manda a buscar cupones fuera de la página, y el descuento del
anticipado ya lo pone su botón. **Si no hay campañas con códigos (influencers,
WhatsApp), quitarlo.**

---

## 9. Formato de moneda

Hoy: `$159.800,00` · `$3.500,00` · `$163.300,00`. El peso colombiano no lleva
decimales y la landing escribe `$79.900`. *Releasit → How to Change the Currency
Format* → quitar decimales.

---

## 10. Método de envío

Hay una sola tarifa («Envío gratis») y el skin la oculta visualmente (sigue
marcada y viaja con el pedido). **Antes de configurar una segunda tarifa**, hay
que quitar esa regla (`releasit-form.css` §6) o el cliente no podría elegir.

---

## 11. Checklist de reverificación

Repetir tras cada actualización de la app, con el modal abierto en la landing y
en la ficha:

- [ ] Sigue siendo el formulario nuevo (`#rsi_form_wrapper` existe,
      `#_rsi-cod-form-modal` no)
- [ ] Las clases del inventario siguen vivas (`/docs/releasit-form-styling.md` §6.7)
- [ ] Abre con la oferta x2 y el Envío Prioritario marcados, como quiere el cliente (§1)
- [ ] Si está el bloque de ofertas: sale en la landing de `/pages/` y con la piel
      de Nambu
- [ ] Ningún order bump premarcado aparte del Envío Prioritario
- [ ] El anticipado descuenta $10.000 fijos (pedido de prueba hasta el checkout)
- [ ] El anticipado va primero y en verde; ninguno de los dos se mueve
- [ ] Sin claims en los textos de las ofertas y del bump
- [ ] Boletín desmarcado
- [ ] Importes sin decimales
- [ ] Los campos miden 16 px (por debajo, iOS hace zoom al enfocar)
- [ ] Con un campo vacío, al pulsar pagar, la fila sale en rojo (también el
      desplegable)
- [ ] Pedido de prueba completo, recibido en Shopify

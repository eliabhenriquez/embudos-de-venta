# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Tema propio de Shopify con el modelo estable (secciones, plantillas JSON y theme blocks), Liquid +
TypeScript compilado con esbuild vía pnpm. Horizon solo como referencia de patrones. Las propuestas de
diseño previas al tema son HTML estático en `proposals/`. Un mismo tema para dos tiendas: primero
**Nambu México** (`nambumx.com`, `wieuyq-6a.myshopify.com`), después **Nambu Colombia**
(`nambuoficial.com`).

## Users

Compradores de México que llegan sobre todo desde el móvil y desde anuncios en redes. Público mixto
(hombre y mujer, 25–55), heredado de Nambu Colombia; *sin datos propios de México todavía*.

La tienda hace tres trabajos a la vez (confirmado):

1. **Dar confianza.** Quien viene de un anuncio, de una landing o de Instagram entra a comprobar que la
   marca es real: catálogo, políticas, contacto, medios de pago.
2. **Explorar el catálogo.** Navegar por categorías, descubrir otros productos y comprar varios en un
   mismo pedido.
3. **Recompra.** Quien ya compró vuelve a pedir rápido el mismo producto.

## Product Purpose

La tienda online es la casa de la marca y de su catálogo de cuidado personal y bienestar. No es un
embudo de un producto: la persuasión de un producto concreto vive en las landings de anuncios
(páginas de GemPages con EasySell), que apuntan a los mismos productos de la tienda.

Éxito: que la tienda se perciba como una marca profesional y fiable (el problema de origen del
proyecto es que las tiendas actuales parecen estafa), que el pedido medio crezca con más de un producto
y que la recompra sea directa.

## Positioning

Sin relato de marca definido para México (confirmado). Por ahora la marca se presenta con su nombre y
sus productos. El relato del Pacífico colombiano de Nambu Colombia **no** se usa en México.

## Operating Context

- Hoy hay un solo producto creado: **Spray Nasal de Nambu**, 60 ml, **$460 MXN**, sin precio con
  descuento.
- El catálogo crecerá con las líneas de Colombia (confirmado): bienestar respiratorio (Spray Nasal,
  Chest Relief ungüento), piel (Sérum Piel de Porcelana, Sérum Niacinamida 10 %, Jabón Cuerpo de
  Porcelana), uñas (1 Week), cabello (Golden Glow), bronceado (ISOUL). Fechas y precios en México sin
  definir.
- Compra en la tienda: carrito y checkout nativos de Shopify. Sin contraentrega en la tienda.
- Contraentrega: solo en las landings, con EasySell, que no se activa en el tema.
- Un producto de Shopify por artículo real; los anuncios no duplican productos.
- Cuentas de cliente: las nativas de Shopify, sin estilar. Sin blog.

## Capabilities and Constraints

- Lo que cambia por país o por producto son datos (metacampos, metaobjetos, ajustes del tema), nunca
  código.
- **Sin definir en México** (se simulan y se marcan como tales): costo y plazo de envío, garantía,
  WhatsApp, correo, Instagram, razón social, políticas, medios de pago más allá de tarjeta, impuestos
  incluidos o no.
- **Nada de Colombia en México**: ni origen colombiano, ni INVIMA, ni contactos, ciudades o precios de
  Colombia.
- Claims de salud: son productos de bienestar y cuidado; se habla de sensación y apariencia, nunca de
  curar, tratar o prevenir. No se modifican claims aprobados ni se inventan nuevos.
- Sin patrones oscuros: sin descuentos, stock, contadores ni reseñas falsas.

## Brand Commitments

- Nombre **Nambu**; logotipo verde `nambu/landings/spray/assets/landings-nambu-wordmark-green.webp`.
- Línea visual vinculante (usuario): **colores y tipografía** de la marca — verde manzana de la
  etiqueta del spray + blanco, y Questrial. Sin secciones oscuras (decisión del cliente en Colombia).
- **Los botones de la tienda no se animan**: solo estados hover, foco y deshabilitado. Las animaciones
  de CTA son exclusivas de las landings.
- De las primeras propuestas (2026-10-14) se aprobaron **cabecera, pie y ficha de producto**; se
  rechazó el home por parecer una landing de un solo producto.
- Voz: español neutro para México, de tú, cercana y sensorial; no clínica.

## Evidence on Hand

- Fotos de producto del catálogo de Colombia en su CDN (`nambuoficial.com/cdn/shop/files/`): sérums,
  1 Week, Golden Glow, ISOUL, Chest Relief, jabón, spray, y una foto de familia de todos los frascos.
- Spray: fotos optimizadas en `nambu/landings/spray/assets/` y copy aprobado en
  `nambu/landings/spray/general/`.
- 13 personas reales del pool de UGC del spray (`humanized-images/nambu-spray/`), con nombre real; en
  México se usan con ciudades de México (decisión del usuario).
- Fuentes referidas a las plantas del spray: Healthline, Medical News Today, WebMD.
- **No existen**: reseñas con estrellas, testimonios de los demás productos, prensa, certificaciones ni
  registro sanitario en México. No se fabrican.

## Product Principles

1. **La tienda es la casa del catálogo, no el embudo de un producto.** Ninguna página de la tienda se
   organiza alrededor de un solo producto salvo su ficha.
2. **De uno a muchos productos sin rediseñar.** Todo bloque funciona con 1 producto hoy y con 20
   mañana.
3. **La confianza se ve.** Envío, pagos, contacto y políticas a la vista, sin esconder nada.
4. **Honestidad comercial.** Lo que no existe no se inventa; lo que falta se marca como pendiente.
5. **Un código, dos países.** Lo local entra por datos.

## Accessibility & Inclusion

WCAG 2.2 AA: contraste mínimo, foco visible, objetivos táctiles de 44 px, `prefers-reduced-motion`.

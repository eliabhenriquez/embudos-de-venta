# Nambu México — propuestas de tienda (ronda 2)

Dos maquetas estáticas para que el cliente elija la estructura de la tienda (`nambumx.com`) antes de
desarrollar el tema de Shopify. Cada una tiene **inicio, tienda (colección), ficha del Spray Nasal y
carrito**. La barra oscura de arriba no es diseño: cambia de vista y enlaza la otra propuesta.

| Archivo | Propuesta | Estructura del home |
|---|---|---|
| `a-tienda.html` | **A · Tienda de marca** | La de `nambuoficial.com`, bien resuelta: aviso, banner del spray, categorías, productos, spray destacado, opiniones, compra con confianza, ayuda y suscripción. Logo centrado, carrito lateral. |
| `b-compra-rapida.html` | **B · Compra rápida** | Banner compacto del spray, buscador y chips de categoría fijos, más pedidos con botón + directo, volver a pedir, categorías, spray destacado, opiniones y compra segura. Cabecera en cápsula, carrito en hoja inferior. |

Las dos conservan la cabecera, el pie y la ficha aprobados en la primera ronda. Los botones no se
animan: solo cambian de tono al pasar, al pulsar y al enfocar.

## Regenerar

```sh
node nambu/store/proposals/src/build.mjs
```

- `src/content.mjs` — catálogo, colecciones, copy del spray adaptado a México y datos simulados (`MOCK`).
- `src/shared.mjs` — iconos, botones, imágenes, medios de pago, marco y JS de la tienda (vistas,
  carrito, filtros, buscador, carriles).
- `src/a.mjs`, `src/b.mjs` — cada propuesta.

Contexto de producto en `../PRODUCT.md`; dirección de cada propuesta en
`../.impeccable/surfaces/proposals-a-tienda-html.md`.

## Qué es real y qué es ejemplo

- **Real:** el Spray Nasal a $460 MXN, su copy aprobado, sus fotos y las tres personas de las opiniones.
- **Catálogo de ejemplo ("Próximamente"):** los demás productos de Nambu Colombia, con sus fotos del CDN
  de `nambuoficial.com`, para enseñar cómo crece la tienda. Sin precio en México.
- **Punteado ámbar:** datos por definir — envío y plazos, garantía, devoluciones, WhatsApp, correo,
  Instagram, razón social, medios de pago distintos de Visa/Mastercard e impuestos incluidos.

Las imágenes del spray se leen por ruta relativa de `nambu/landings/spray/assets/` y
`nambu/shared/assets/`: las maquetas solo se ven completas abiertas desde el repo.

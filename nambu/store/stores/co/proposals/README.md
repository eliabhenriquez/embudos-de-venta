# Nambu Colombia — propuesta de portada CRO (ronda 2, 2026-10-21)

Maqueta estática de la portada de `nambuoficial.com` para que el cliente decida antes de tocar el tema. Parte del
feedback del cliente («ese home no convierte») y de su referencia, femprobiotics.co: se toman las ideas que encajan
con Nambu y no su estética.

**Abrir:** `portada-cro.html`. Se ve completa enviada sola: imágenes y tipografía del CDN de la tienda, y la foto
nivelada del ungüento incrustada. Los botones no compran: un aviso dice lo que harían en la tienda. Lo marcado con
punteado ámbar es un dato por definir.

**Ronda 2** (feedback del usuario sobre la ronda 1: «muy vacía», «muy plana»): más color con la familia del verde
del frasco (degradado bajo la cabecera, cinta manzana, banda de opiniones, correo en manzana, pie verde claro) y,
en cada producto, el tinte de su propia etiqueta; cabecera flotante con Instagram; portada con 3 fotos de clientes
que rotan; tarjetas y selector de necesidades propios; bloques nuevos del kit y de cifras como los de la referencia.

| Bloque | Qué es |
|---|---|
| Cabecera | Cápsula flotante sobre el verde, menú con píldoras, Instagram y carrito en manzana |
| Portada con el kit | 3 fotos de clientes del Spray que rotan con barras de progreso; kit con precio, ahorro y botón en la primera pantalla |
| Cinta de beneficios | Banda manzana inclinada que corre sin parar (se pausa al pasar el ratón): contraentrega, envío gratis, 3 a 5 días hábiles, guía por WhatsApp, reposición y el 10%. Sustituye a la barra de anuncios |
| Lo más vendido | Carrusel en el orden real de ventas; cada producto sobre el tinte de su etiqueta, precio y «Agregar» |
| Bloque del kit | Como el de suscripción de la referencia: ahorro, 4 ventajas, precio y botón |
| Elige por necesidad | Eliges la necesidad y aparece su producto con precio y botón |
| Opiniones con foto | Personas reales del Spray con su opinión aprobada, sobre banda verde clara |
| Cifras | Como el bloque de la referencia, sin el registro sanitario |
| Historia de marca | Más corta, con la foto de la línea completa y botón a «Sobre Nambu» |
| Preguntas frecuentes | Con WhatsApp al lado; sustituyen a «Compra con confianza» y «¿Necesitas ayuda?» |
| Correo | El 10% de la primera compra (Klaviyo), en banda manzana |
| Barra fija del kit | Aparece al pasar la portada y se aparta al llegar al correo |

## Qué es real y qué es ejemplo

- **Real:** catálogo, precios, imágenes y orden de «Más vendidos» (tienda, 2026-10-21); subtítulos y descripciones
  cortas (metacampos); respuestas de las preguntas (políticas publicadas y checkout de Colombia); opiniones y fotos
  del pool de UGC del Spray con su texto aprobado; el 10% de Klaviyo (cupón confirmado por el usuario); la foto de la
  línea de la historia de marca (la pasó el usuario; `src/assets/story-linea-nambu.webp`, hay que subirla a la tienda).
- **Ejemplo, con punteado ámbar:** el kit es un producto nuevo (Spray Nasal + Ungüento Chest Relief). Su nombre
  («Kit Respira»), su precio ($99.900) y el ahorro ($25.000) los decide el cliente; «Por separado $124.900» es la suma
  de los precios publicados. Sin foto del kit: composición con el frasco nivelado de las landings y el tarro nivelado
  a blanco (`src/assets/`). El número de compradores (+X.XXX) sale de Shopify cuando el cliente lo autorice.
- **Títulos de producto:** se muestran corregidos (sin mayúsculas ni punto final); el usuario los cambia en Shopify.

## Regenerar

```sh
pnpm build co                                   # desde nambu/store: compila el theme.css real del tema
node stores/co/proposals/src/build.mjs
```

- `src/content.mjs` — datos, cada uno con su fuente.
- `src/sections.mjs` — los bloques; la cabecera y el pie publicados con Instagram añadido.
- `src/proposal.css` — solo lo nuevo; lo demás es el `theme.css` del tema de Colombia.
- `src/page.js` — carriles, carrusel, selector, barra fija y el aviso de los botones (`src/review.css`).
- `src/snapshots/` — cabecera y pie publicados el 2026-10-21. `src/assets/` — imágenes propias de la propuesta.

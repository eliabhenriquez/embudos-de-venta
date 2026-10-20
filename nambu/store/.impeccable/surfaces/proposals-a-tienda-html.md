---
version: 1
slug: "proposals-a-tienda-html"
primary_target: "proposals/a-tienda.html"
related_targets: ["proposals/b-compra-rapida.html"]
---

# Tienda Nambu México — propuestas de home

Alcance: home, colección (tienda), ficha de producto y carrito de la tienda online. Modo: Persuade
(tienda: la acción es agregar al carrito). Dos propuestas para que el cliente elija; las dos conservan
la cabecera, el pie y la ficha aprobados en la ronda anterior.

Audiencia y trabajo: compradores de México en móvil que llegan de anuncios o de Instagram (confianza),
exploran el catálogo y vuelven a comprar. Hoy solo el Spray Nasal está a la venta ($460 MXN): se
destaca en el banner y en una segunda sección; el resto del catálogo de Colombia aparece como
"Próximamente" para demostrar que la tienda escala.

Restricciones: botones sin animación (hover, foco y deshabilitado); colores y tipografía de marca;
nada de secciones de landing (problema, agitación, 60 ml gigante, cierre) en el home; datos de México
simulados y marcados.

Decisión pendiente: el cliente elige entre A y B.

## Direction contract

### A · Tienda de marca (estructura de nambuoficial.com, bien ejecutada)

THESIS: el home de una tienda de marca con catálogo por necesidad: banner del spray, categorías,
productos, spray destacado, opiniones, confianza, ayuda y suscripción. Rechaza el embudo de un producto
y el hero de landing con argumento.
OWN-WORLD: blanco dominante, verde manzana solo en acciones, precios y estados; tintes `apple-50` como
fondo de fichas y franjas; Questrial de un peso; filetes de 1 px; fotografía de producto a color sobre
blanco; logotipo centrado.
STORY: entiendo que Nambu es una marca con varias líneas, que hoy abre con el spray, que puedo comprarlo
ya y que la tienda es seria (envío, pagos, contacto, políticas).
FIRST VIEWPORT: barra de aviso estática; cabecera con logo centrado; banner partido: foto del spray a
la derecha (móvil: arriba) y a la izquierda nombre, frase del copy aprobado, precio y dos botones
(Agregar al carrito / Ver producto). Debajo asoma la fila de categorías.
FORM: estructura de la tienda actual (pinned por el usuario, por encima del roll); seed: 29433e55.
Interacción firma: rejilla de producto con agregar directo y estado "Próximamente".
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

### B · Compra rápida

THESIS: la tienda como herramienta de compra: buscar, filtrar y agregar en un toque, y volver a pedir
sin rodeos. Rechaza la portada de marca que obliga a hacer scroll antes de ver productos.
OWN-WORLD: cabecera en cápsula con carrito oscuro; buscador grande y chips de categoría fijos;
tarjetas de producto con botón + redondo; paneles `apple-50` redondeados de 28 px; Questrial; nada
de bloques a sangre.
STORY: veo enseguida qué se puede comprar, encuentro el spray destacado, lo agrego sin salir del home,
y si ya compré lo vuelvo a pedir desde una fila propia.
FIRST VIEWPORT: cabecera en cápsula; buscador + chips (Todo, Respiración, Piel, Uñas, Cabello,
Bronceado); tarjeta banner del spray con foto, precio y botón +; empieza la rejilla "Más pedidos".
FORM: candidato 5 de 7 (Compra rápida), elegido por el usuario; seed: 29433e55.
Interacción firma: chips que filtran la rejilla en el sitio y agregar con + sin abrir la ficha.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

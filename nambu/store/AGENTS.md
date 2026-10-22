# AGENTS.md — NAMBU · TIENDA (tema de Shopify)

Contexto del tema propio de la tienda. Hereda de `/AGENTS.md` y de `/nambu/AGENTS.md`, pero **las reglas
de landings (bloque autocontenido, sin build, sin dependencias) no aplican aquí**: esto es un tema
completo. El producto y sus decisiones están en [`PRODUCT.md`](PRODUCT.md).

Dos tiendas, **dos temas separados**: dos países y dos mercados distintos, sin nada del tema en común
(código, copy, catálogo, datos):

| Tienda | Carpeta / entorno | Dominio | Admin |
|---|---|---|---|
| Nambu México | `mx` | nambumx.com | `wieuyq-6a.myshopify.com` |
| Nambu Colombia | `co` | nambuoficial.com | `pmrhdj-rj.myshopify.com` |

🔴 **Un cambio en el tema de una tienda no toca nunca el de la otra.** Hasta el 2026-10-20 compartían el
código (solo los datos iban por tienda) y el usuario lo corrigió: desde el principio pidió dos temas
separados. Si algo sirve a las dos, se hace en cada una por separado y con su propia revisión.

---

## 1. Estructura

```
nambu/store/
├── PRODUCT.md            # contexto de producto (impeccable)
├── AGENTS.md             # este archivo
├── package.json          # pnpm: build, dev, push, pull, check…
├── shopify.theme.toml    # un entorno de la CLI por tienda (dominio y ruta)
├── scripts/              # herramientas (no son tema): build.mjs (esbuild), store.mjs (dev/push/pull/check),
│                         # check-pending.mjs y seed.mjs
├── stores/<tienda>/      # mx · co: cada una es un tema completo y propio
│   ├── theme/            # EL TEMA de esa tienda, tal cual lo sube la CLI: layout, sections, snippets, locales,
│   │                     # config y templates (código y datos) + .shopifyignore (archivos de apps)
│   │   └── assets/       # theme.css y theme.js son generados desde src/ (gitignored): no se editan a mano
│   ├── src/ts/           # web components en TypeScript → theme/assets/theme.js
│   ├── src/styles/       # CSS por zonas → theme/assets/theme.css
│   └── data/ …           # material de la tienda (contenido para `pnpm seed`, CSV, copy de origen)
└── proposals/            # maquetas de MX (ronda 2 elegida: A + carrito de B); las de CO, en stores/co/proposals/
```

Modelo estable de Shopify: plantillas JSON + secciones + bloques de sección. Horizon solo fue
referencia. Sin dependencias en el navegador: el JS son web components registrados en `main.ts`.

**Punto de partida de la separación (2026-10-20):** cada tema es exactamente el que la tienda tenía en vivo ese
día, comprobado contra la tienda (Liquid y JSON iguales; `theme.css` y `theme.js` compilados idénticos byte a
byte). México es el código que se publicó el 2026-10-16; Colombia, el de su lanzamiento. Lo que escribe el
personalizador (`config/settings_data.json`, `templates/**/*.json`, `sections/*.json`) vive en el mismo
`stores/<tienda>/theme/` y se trae con `pnpm pull <tienda>`.

## 2. Comandos

```sh
pnpm install
pnpm dev <tienda>                            # compila y vigila stores/<tienda>/src y abre shopify theme dev (tema de desarrollo)
pnpm push <tienda>                           # sube como tema SIN publicar (con --theme <id> sube a ese tema)
pnpm pull <tienda>                           # trae los datos del tema publicado a stores/<tienda>/theme/
pnpm check                                   # tipos + lint + build + theme check + pendientes, de todas las tiendas
pnpm build [tienda]                          # solo compila theme.css y theme.js (de una tienda o de todas)
pnpm seed <tienda> [--dry-run]               # carga stores/<tienda>/data/content.json en la tienda (§7)
pnpm upload <tienda> <archivo>… [--alt "…"]  # sube imágenes a Contenido → Archivos (idempotente por nombre): shopify://shop_images/<nombre>
```

Los flags de más pasan a la CLI de Shopify (`pnpm push co --theme 123 --nodelete`, `pnpm pull mx --theme 456`).

- **`pnpm check:pending [tienda]` falla mientras quede un `[POR DEFINIR]`** en ajustes, plantillas o
  grupos. Tras editar en el personalizador: `pnpm pull <tienda>` y volver a pasarlo. **No se publica con
  pendientes.**
- **Apps dentro del tema (GemPages):** escriben sus propios archivos en el tema publicado. El
  `.shopifyignore` de cada tema (`stores/<tienda>/theme/.shopifyignore`) los lista: la CLI ni los sube, ni los
  borra, ni los trae, y `pnpm pull` los ignora. Si una app nueva escribe en el tema, se añade ahí.
- `pnpm dev` pide la **contraseña de la tienda online** (Tienda online → Preferencias) mientras la
  tienda esté cerrada: hay que lanzarlo en una terminal interactiva y que la escriba el usuario.
- Los cambios del personalizador sobre el tema de desarrollo no vuelven solos al repo: se traen con
  `pnpm pull <tienda> --development`.
- La CLI 4.9 responde **502** a cualquier 404 de la tienda (fallo suyo, no del tema). El 404 se
  revisa con `/?section_id=main-404`.
- **Sección y plantilla a la vez en `pnpm dev`:** si un ajuste nuevo de una sección y la plantilla que lo
  usa se suben en el mismo segundo, Shopify puede descartar el valor (la sección aún no lo declaraba).
  Si un ajuste no aplica, se vuelve a guardar la plantilla con un cambio real (un `touch` no la sube).
- Nunca publicar ni cambiar el tema activo sin que el usuario lo pida.
- **En vivo (MX, 2026-10-16):** tema «Nambu MX» #160585515179, publicado a petición del usuario; Horizon
  quedó sin publicar como respaldo. La tienda está abierta (sin contraseña). Antes de subir: `pnpm pull mx`
  por si el personalizador tocó algo y comparar el tema en vivo (`shopify theme pull --store … --path <tmp>`)
  con `stores/mx/theme`, para subir solo lo que cambia (`pnpm push mx --theme 160585515179 --nodelete
  --allow-live --only <archivo>…`). Un cambio grande va antes a un tema sin publicar (`pnpm push mx`) y se
  revisa con su `preview_theme_id`. Shopify reescribe los JSON al subirlos (cabecera de comentario,
  `settings: {}` vacíos): compararlos parseados, no por texto.
- **Portada CRO en México (2026-10-22, a petición del usuario):** el código del tema de Colombia se copió una vez a `stores/mx`
  (sin lo que solo es de Colombia: cabeza de Refresh para GemPages, Releasit, botón de Klaviyo y
  «Banner de marca»), con lo propio de México: logotipo al centro, Visa y Mastercard comentados y la suscripción solo con
  el formulario de Shopify. Datos de la portada con el copy de Colombia y lo de México (pago contra entrega, envío de 2 a 5
  días hábiles a ciudades principales, seguimiento por correo, reenvío si no llega a tiempo, 30 días para devolver; cifra
  «+49.000 personas en Colombia»; carril elegido a mano con el Spray primero; sin botón «Conoce Nambu», que en México no
  tiene página). Contenido en `stores/mx/data/content.json` (`pnpm seed mx`, con su `shopify store auth` aprobado el
  2026-10-22). Kit Respira Libre a **$760 MXN** (referencia $920 = dos Spray) y Chest Relief habilitado a **$260 MXN** con
  1000 unidades. Publicado en «Nambu MX» tras revisarlo en «Nambu MX · Portada CRO» #160847593643 (sin archivos de
  GemPages: no publicarlo).
- **`/collections/all` en México tiene orden propio (2026-10-22):** colección «Todos los productos» con handle `all`, que
  sustituye a la automática de Shopify en esa dirección. Es automática (proveedor = Nambu: los productos nuevos entran
  solos, al final) y con orden manual: Spray, kit, Chest Relief y los «Próximamente». Se reordena arrastrando en
  Productos → Colecciones. Colombia sigue con su colección `productos` (orden real de ventas).

## 3. Reglas del tema

- **Clases con prefijo `nb-`** y web components con nombre propio: en las mismas páginas conviven
  GemPages (`gp-`), las landings (`ns-`) y las apps (EasySell `es-`).
- **Todo en px.** Variables de color y medida en `stores/<tienda>/src/styles/tokens.css`.
- **Botones sin animación**: solo hover, pulsado, foco y deshabilitado. Las animaciones de CTA son de
  las landings, no de la tienda.
- **El producto no se recorta**: la galería usa `object-fit: contain`; los banners eligen foto y
  proporción para que el producto entre entero.
- **Sin JS también funciona**: agregar al carrito, cantidades del carrito (`/cart/change?line=`),
  orden de colección y menú móvil (`<details>`) tienen su camino nativo; el JS solo mejora.
- **Precio** (snippets `price` y `money`): `money_without_trailing_zeros`, con el código si lo pide el ajuste «Mostrar
  el código de moneda» (MX: `$ 460 MXN`, el espacio es del formato de moneda de la tienda; CO: `$79.900`). Precio
  tachado solo si existe `compare_at_price` real y el ajuste «Mostrar el precio tachado» activo: las dos tiendas lo
  apagan (el kit enseña su referencia en texto, «solo en los dos sprays»; en CO los precios de comparación siguen en
  Shopify para las landings).
- **Iconos de pago**: MX, Visa y Mastercard escritos en `snippets/pay-icons.liquid` y **comentados desde el
  2026-10-20** (solo contraentrega; se descomentan cuando haya pago con tarjeta). CO, ajuste «Iconos de medios de
  pago» (nombres de Shopify).

Desde el 2026-10-22 los dos temas tienen la misma portada y los mismos componentes (cada uno en su carpeta). Lo que
sigue es **solo del tema de Colombia** salvo donde se dice:

- **Apps de terceros** se neutralizan en `stores/co/src/styles/apps.css`, acotadas a los componentes `nb-`. Releasit
  inyecta su «COMPRAR AHORA» en todo formulario de compra y oculta el «Comprar ahora» de Shopify: en la
  tienda se compra con el checkout de Shopify, así que dentro de `nb-product-form` (todo formulario del snippet
  `product-add`: tarjetas, portada del kit, bloque del kit, buscador, banners), `nb-buybox`, `nb-sticky`, `nb-drawer`
  y `nb-cart` sus nodos (patrón `rsi`) no se ven y el botón de Shopify vuelve. Una sección nueva que compre con
  `product-add` ya queda cubierta (hasta el 2026-10-22 era una lista de componentes y la portada nueva salió con 16
  «COMPRAR AHORA»). Las landings de GemPages no usan esas
  clases y siguen con Releasit. **No se apaga en los ajustes de Releasit**: son globales y las seis landings
  del Spray usan el mismo producto que la tienda (`spray-nasal-nambu`).
- **Sin magic strings**: textos de interfaz en `locales/es.default.json`; contenido en ajustes de
  sección, metacampos o metaobjetos.
- **Cabecera** (las dos): cápsula flotante con Instagram. CO, logotipo a la izquierda (ajuste «Logotipo a la izquierda»);
  MX, al centro. Si el menú no cabe en una línea, `<site-header>` pasa al menú desplegable en cualquier ancho.
- **Recomendaciones** («Completa tu ritual»): las de Shopify, completadas con la colección de respaldo. Con
  «Solo productos de esta colección» no sale nada de fuera (CO: `productos`), porque Shopify también recomienda
  los duplicados de campañas y advertoriales.
- **Secciones de la portada** (las dos, salvo el banner de marca): «Portada con kit», «Cinta de beneficios», «Productos»
  (rejilla o carril, productos elegidos a mano o de una colección), «Bloque del kit», «Necesidades» (buscador con
  pestañas; un «Próximamente» enseña el aviso en vez del precio), «Opiniones» con foto, «Cifras», «Imagen con texto» y
  «Preguntas y contacto». «Banner de producto», «Categorías», «Destacado» y «Confianza» siguen disponibles sin uso en la
  portada. «Banner de marca» solo en CO, sin uso.

En los dos: contraste AA, foco visible, objetivos de 44 px, `prefers-reduced-motion`.

## 4. «Próximamente» (opciones 1 y 2, decididas con el usuario)

Un producto sale como **Próximamente** cuando **no tiene stock** y su metacampo
`custom.coming_soon` está activo (`snippets/product-state.liquid`). Entonces:

- La tarjeta y la ficha muestran «Próximamente», **sin precio** y con el botón deshabilitado.
- **Shopify rechaza agregarlo al carrito** porque no hay inventario: no depende del tema.
- Si el producto recibe stock, el metacampo se ignora y se vende normalmente.

Ajuste del tema **Productos → Mostrar productos «Próximamente»**: apagado, esos productos no salen en
rejillas ni categorías (opción 1). Las categorías sin nada que enseñar desaparecen solas.

Procedimiento para un producto Próximamente:

1. Crear el producto con fotos y textos; **inventario rastreado a 0** y «Seguir vendiendo cuando no
   hay stock» **desactivado**.
2. Activar el metacampo **Próximamente** (`custom.coming_soon`).
3. Publicarlo **solo en Tienda online** (no en catálogos de Meta/Google).
4. Opcional: metacampo `seo.hidden` = 1 (entero) para que Google no lo indexe ni salga en el sitemap.
   Ojo: también lo saca del buscador de la tienda.
5. El precio de la variante es visible en el JSON público del producto aunque el tema lo oculte: poner
   el precio real solo si está decidido.

«Avísame cuando llegue» **no existe** sin una app; no se promete.

Los Próximamente de MX se crearon con [`stores/mx/data/proximamente.csv`](stores/mx/data/proximamente.csv) (Productos →
Importar, **sin** «publicar en todos los canales»): precio 0, inventario 0 que no se vende sin stock,
metacampo activo y fotos del CDN de Colombia. Las colecciones se asignan después, desde la lista de
productos (acción «Agregar a colecciones»). La rejilla «Nuestros productos» pinta primero lo disponible.
Si una colección mezcla disponibles y Próximamente, se pone en orden manual con lo disponible delante.

## 5. Lo que hay que crear a mano en el admin

### Metaobjetos (Contenido → Metaobjetos → Agregar definición)

Activar **acceso de Tiendas online (Storefronts)** en cada definición, o Liquid no los lee. Con
«Estados activo y borrador» activado, cada entrada tiene que quedar **Activa** para verse en la tienda.

Creados en `nambumx.com` el 2026-10-14: los 3 metaobjetos (usuario), los 8 metacampos de producto, las
entradas (3 ingredientes, 6 preguntas, 3 opiniones, todas activas) y el contenido del Spray Nasal.

**Las claves son el contrato con el tema; Shopify no deja cambiarlas después.** En MX el de ingredientes
nació como `custom.ingredientes` y la sección no salía: se creó `custom.ingredients` al lado y la vieja
quedó como «Ingredientes (borrar)». Para comprobar qué claves tiene un producto, una plantilla alternativa
temporal (`templates/product.debug.liquid` + `?view=debug`) que recorra `product.metafields.custom`.

| Definición | Tipo (handle) | Campos (clave · tipo) |
|---|---|---|
| Testimonio | `testimonial` | `name` (una línea), `city` (una línea), `quote` (una línea), `body` (varias líneas), `photo` (archivo: imagen), `product` (referencia de producto) |
| Ingrediente | `ingredient` | `name` (una línea), `image` (archivo: imagen), `description` (varias líneas) |
| Pregunta frecuente | `faq` | `question` (una línea), `answer` (varias líneas o texto enriquecido) |

### Metacampos de producto (Configuración → Metacampos y metaobjetos → Productos)

| Nombre | Clave | Tipo |
|---|---|---|
| Próximamente | `custom.coming_soon` | Verdadero o falso |
| Subtítulo | `custom.subtitle` | Texto de una línea |
| Descripción corta | `custom.short_description` | Texto de varias líneas |
| Cómo se usa | `custom.how_to_use` | Texto enriquecido |
| Ingredientes | `custom.ingredients` | Metaobjeto · Ingrediente · lista |
| Nota de la etiqueta | `custom.ingredients_note` | Texto de varias líneas |
| Preguntas frecuentes | `custom.faqs` | Metaobjeto · Pregunta frecuente · lista |
| Opiniones | `custom.testimonials` | Metaobjeto · Testimonio · lista |
| (opcional) Ocultar de buscadores | `seo.hidden` | Entero |

### Resto

- **Colecciones**: Respiración, Piel, Uñas, Cabello, Bronceado (con imagen de colección).
- **Menús** (Tienda online → Navegación): `main-menu` (Tienda, Spray Nasal, Ayuda, Contacto),
  `tienda` (Todos los productos + categorías), `footer` (Preguntas, Envíos, Devoluciones, Contacto),
  `ayuda` (los enlaces del bloque «¿Necesitas ayuda?»). Shopify no tiene página pública de
  seguimiento: «Rastrear mi pedido» puede apuntar a la cuenta del cliente.
- **Páginas**: Contacto con la plantilla `page.contact`.
- **Pagos (MX, 2026-10-20, a petición del usuario):** **solo contraentrega** mientras no haya pago con tarjeta
  ni entidad. Forma de pago manual «Pago contra entrega (COD)» sin texto adicional y PayPal desactivado
  (configuración incompleta; se reactiva en Pagos → PayPal). El checkout ofrece solo esa forma de pago (comprobado).
  En el tema: «Pago contra entrega» en la barra de anuncios y la ficha, «Pagas cuando recibes tu pedido.» en la
  portada, e iconos de tarjeta comentados. Pendiente del usuario: teléfono de envío obligatorio y contacto
  «teléfono o correo» en Configuración → Pantalla de pago (el filtro de permisos no dejó guardarlo). Los
  Términos del servicio automatizados hablan de cobrar antes de aceptar el pedido y de tarjetas: no se tocaron.
- **Mercado y envío**: el mercado del país tiene que existir y su zona de envío tener tarifa, o el checkout
  no deja pagar. MX (2026-10-14): mercado «México» activo, «Colombia» en borrador, zona México con
  «Envío gratis» de 2 a 5 días hábiles. Comprobar con `/cart/shipping_rates.json?shipping_address[country]=…`.
- **Políticas** (Configuración → Políticas): en modo **automatizado**, Shopify las redacta a partir de la
  configuración. La de envíos lista los destinos de las zonas de envío, y la de devoluciones sale de la
  **regla de devolución por mercado**. Hay que configurar primero el mercado y el envío, y después
  activar las políticas. MX: regla «México» de 30 días desde la entrega, envío de vuelta a cargo del
  cliente y cancelación en 15 minutos. Términos del servicio: también automatizados. La **Información de
  contacto** automatizada toma nombre, correo, teléfono y dirección de Configuración → General (en MX
  aún sale Bogotá). El **Aviso legal** no tiene plantilla: es texto libre con datos de la entidad. El pie
  y la ficha enlazan las políticas solas; `pages.css` estila su marcado (`.shopify-policy__*`).
- **Ajustes del tema**: logotipo (`landings-nambu-wordmark-green.webp`, ya en `stores/mx/theme/config/settings_data.json`
  como `shopify://shop_images/…`; el archivo tiene que existir en Contenido → Archivos), favicon, WhatsApp,
  correo, Instagram.
- **Nombre de la tienda** (Configuración → General): sale en el título, el pie, el alt del logo y el
  checkout. En MX, «Nambu».
- **Home**: en MX viene preconfigurada en `stores/mx/theme/templates/index.json` (Spray, categorías y opiniones). En el JSON,
  `product` y `collection_list` van por handle, y `metaobject_list` **por handle a secas**
  (`"catalina"`; ni `testimonial.catalina` ni GID). Un handle que no existe deja la sección oculta.

El copy aprobado para el Spray Nasal en México (subtítulo, descripción corta, modo de uso, plantas,
nota de la etiqueta, preguntas y opiniones) está en `proposals/src/content.mjs`. Las fotos, en
`nambu/landings/spray/assets/`.

## 6. Verificación

1. `pnpm check` en verde (salvo `check:pending` mientras falten datos de México).
2. `pnpm dev` y revisar a 360, 390 y 1280 px: inicio, colección, ficha, carrito lateral, página de
   carrito, búsqueda, 404 y contraseña.
3. Agregar al carrito desde tarjeta, banner, destacado, ficha y barra fija; cambiar cantidades y
   eliminar en el carrito lateral y en `/cart`; comprobar el contador de la cabecera.
4. Un producto Próximamente: sin precio, botón deshabilitado y `/cart/add` rechazado.

## 7. Colombia (`co`, desde 2026-10-16)

Decidido con el usuario: **misma UI/UX, copy de la tienda actual** (nambuoficial.com, tema Refresh), en la
tienda **solo se compra con el checkout de Shopify** (Mercado Pago + «Pago contra entrega» manual; Releasit
solo en las landings) y **se muestran los mismos productos que hoy**: la colección `productos` (10).

- **Copy de origen:** [`stores/co/copy.md`](stores/co/copy.md), extraído el 2026-10-16. No se reescribe ahí.
- **Portada CRO (publicada el 2026-10-22 en «Nambu CO»)**: la ronda 2 de la propuesta, aprobada por el cliente. Secciones
  nuevas: «Portada con kit» (`kit-hero`: 3 fotos horizontales 16:9 con leyenda que rotan solas y se cambian a mano con flechas, barras, deslizando o con el teclado, tarjeta del kit, botón y barra
  fija `sticky-buy` hasta el pie), «Cinta de beneficios» (`benefit-ribbon`, corre sin parar), «Bloque del kit»
  (`kit-promo`), «Necesidades» como buscador con pestañas (`need-list` → `need-finder`), «Cifras» (`trust-numbers`:
  +49.000 = clientes con al menos un pedido el 2026-10-21, redondeado hacia abajo), «Preguntas y contacto»
  (`faq-contact`); «Productos» en carril con etiqueta del primero; testimonios con foto en banda verde; suscripción que
  abre el formulario de Klaviyo `TWWXYW` (`klaviyo-open`); Instagram en cabecera y pie; barra de anuncios oculta en
  la portada. Tarjetas con el tinte de cada producto (metacampo `custom.card_tint`) y etiqueta (`custom.badge`), los
  dos en `content.json` (`product_metafields`).
- **Modal del 10 % de Klaviyo** («Email Popup Principal», `TWWXYW`): se estila en el editor de Klaviyo, no en el tema
  (sale también en las landings de GemPages, que no cargan `theme.css`). Desde el 2026-10-22: Questrial en todo, campos en
  píldora de 48 px con borde `#D3E1CD` (ojo: la opacidad del color venía a 0 %) y `#2F7D22` al escribir, botones
  `#6FC350` con texto `#0F2E0B`. Sale solo al 50 % de scroll, a los 30 s o al ir a salir, y no vuelve en 5 días a quien la
  cerró ni a quien ya está en Klaviyo: para verla como cliente nuevo, incógnito.
- **Kit Respira Libre** (`kit-respira-libre`, creado el 2026-10-21 por la API): $129.900, precio de comparación $159.800
  («solo en los dos sprays»), copy del cliente en `content.json`. Foto principal: recorte cuadrado de la foto del
  cliente con plantas (`data/media/kit-respira-libre-plantas.webp`); el bloque del kit usa la composición limpia
  (`kit-respira-libre-bloque.webp` en Archivos) para no repetir la foto que abre la portada. Las fotos de la portada
  están en `data/media/hero-*.webp` y en Archivos.
- **Propuesta de portada CRO (2026-10-21, ronda 2):** [`stores/co/proposals/`](stores/co/proposals/README.md),
  maqueta con la referencia femprobiotics.co. Ronda 2 a petición del usuario (la 1 se veía vacía y plana): más color con la
  familia del verde y el tinte de la etiqueta de cada producto, cabecera flotante con Instagram, portada con 3 fotos de
  clientes que rotan y un kit nuevo (Spray + Chest Relief; nombre, precio y ahorro por definir) con barra fija, cinta que
  corre sin parar, bloque del kit y bloque de cifras (sin registro sanitario) como los de la referencia, selector de
  necesidades y el 10% de Klaviyo. El popup y el teaser «10% de descuento» son un formulario de Klaviyo («Email Popup
  Principal»), no del tema. El pie ya admite Instagram (ajuste «Instagram», vacío en CO); la cabecera necesita código.
- **Contenido de las fichas:** [`stores/co/data/content.json`](stores/co/data/content.json) reparte ese copy en
  el contrato del tema (`scripts/lib/content-model.mjs`): subtítulo, descripción corta, modo de uso,
  ingredientes, preguntas, opiniones y, para el lanzamiento, la descripción larga. Una sola pregunta de envío
  (`envio-colombia`) para todas las fichas. Lo carga `pnpm seed co`, idempotente.
- **`pnpm seed` necesita `shopify store auth`** una vez (lo aprueba el usuario en su navegador):
  `pnpm exec shopify store auth --store pmrhdj-rj.myshopify.com --scopes read_products,write_products,read_metaobject_definitions,write_metaobject_definitions,read_metaobjects,write_metaobjects,read_files,write_files,read_online_store_navigation,write_online_store_navigation`.
- **Las descripciones se cambian solo al publicar** (`pnpm seed co --descriptions`): el tema Refresh pinta la
  descripción entera y hoy el Spray y Chest Relief llevan ahí sus preguntas y su modo de uso.
- **Envío (verdad única):** envío estándar gratis en todos los pedidos, 3 a 5 días hábiles; prioritario
  opcional con costo. Corregido en vivo el 2026-10-16 en la política, la descripción del Spray y las
  preguntas de las cinco plantillas de Refresh.
- **Políticas** (páginas, no las de Shopify): reescritas el 2026-10-16 en HTML limpio, con
  nambushop.col@gmail.com y sin los restos de otras tiendas (NetaStore, NambuShop, segurbuy, merkalustore).
  Los originales están en `copy.md`.
- **GemPages en el tema publicado** (medido con `theme pull`): plantillas `*.gp-template-*` y `*.gem-*`
  (52 de producto, 6 de página, 2 de artículo), layouts `theme.gem*` (copias del `theme.liquid` de Refresh:
  dependen de su CSS y de sus ajustes), secciones, snippets y assets `gp-*`. Las seis landings del Spray van
  sobre `spray-nasal-nambu`. **Migrarlas** es volver a publicarlas desde GemPages en el tema nuevo y
  revisarlas con `preview_theme_id` antes de publicar.
- **Cargado el 2026-10-16** con `pnpm seed co`: 3 definiciones de metaobjetos, 8 metacampos, 90 entradas,
  7 fichas y el menú `ayuda`. Tema **«Nambu CO» #200556019872, publicado el 2026-10-16** a petición
  del usuario (Refresh #146306924704 queda sin publicar como respaldo).
- **Buscador:** `search_collection` en `content.json` → `pnpm seed` marca `seo.hidden` = 1 en todo producto fuera
  de `productos` (50 duplicados de campañas, aprobado por el usuario el 2026-10-16). Sus URLs siguen
  funcionando y llevan `noindex`; el buscador tarda unos minutos en reindexar. Volver a pasar `pnpm seed co`
  cuando se creen duplicados nuevos.
- **Fichas de campaña con contraentrega:** 4 duplicados usan la ficha normal (no GemPages) y venden con Releasit
  (`chest-relief-unguento`, `isoul`, `lung-cleansing-general-tiktok`, `lung-cleansig-dificulad-para-respirar-por-flema-tiktok`).
  Van con la plantilla `product.contraentrega` (ajuste «Dejar el botón de compra de las apps»), asignada por
  `product_templates` en `content.json`. Refresh no tiene esa plantilla, así que hoy no cambia nada.
- **GemPages con el estilo de Refresh** (ajuste «Páginas de GemPages con el estilo de Refresh», solo CO): las
  páginas con plantilla `*.gp-template-*` cargan `snippets/refresh-head.liquid` (los CSS y JS de Refresh copiados
  como `assets/refresh-*` y sus variables renderizadas el 2026-10-16) en vez de nuestra cabeza. Así las 46
  landings de GemPages (10 hechas en este repo y 36 nativas) se ven y funcionan como antes: medido, mismo alto al
  píxel, colores y formulario de Releasit. Las 2 que usan el layout del tema (Black Friday y el advertorial de
  manchas) llevan nuestra cabecera y pie: el cuerpo de `theme.liquid` les añade `theme.css`. Se retira cuando no
  quede ninguna landing antigua.
- **Archivos de GemPages en «Nambu CO»:** pre-cargados desde Refresh (60 plantillas de landings, 382 secciones,
  snippets y assets `gp-*`); las 9 plantillas de respaldo y por defecto de GemPages, hechas con secciones de
  Refresh, no se suben. Los layouts `theme.gem*` se generaron desde nuestro `theme.liquid` igual que hace
  GemPages (cabeza + `<body>` + `<main>`). GemPages no publica en temas sin publicar: traslada y regenera sus
  archivos al publicar el tema (help.gempages.net, «What happens when I change the theme»).

### Publicar Colombia (hecho el 2026-10-16; sirve para volver a cambiar de tema)

1. Volver a copiar los archivos de GemPages del tema publicado al nuevo, por si el equipo editó landings:
   `shopify theme pull --theme <publicado> --only` con los patrones de `stores/co/theme/.shopifyignore` y `shopify theme push --theme
   <nuevo> --nodelete` con los mismos (plantillas `*.gem-*` y `*bk-default*` fuera; primero secciones,
   snippets y assets, después plantillas). **Los layouts `theme.gem*` no se copian**: se generan desde el
   `theme.liquid` del tema nuevo (cabeza + `<body>` + `<main>`).
2. `pnpm pull co --theme <Nambu CO>` si se tocó el personalizador, `pnpm check` y `pnpm push co --theme <Nambu CO> --nodelete`.
3. Publicar en horas de poco tráfico: `shopify theme publish --theme <Nambu CO>` (con la CLI en la cuenta de CO).
4. `pnpm seed co --descriptions` en cuanto queda publicado.
5. Revisar las landings comparándolas con el tema anterior por `preview_theme_id` (ids de elementos `gp-` y botones
   de Releasit), el formulario de Releasit abierto, la ficha, el carrito y el checkout. El 2026-10-16: 46 fichas y
   6 páginas idénticas a Refresh, sin volver a publicar nada en GemPages.
   🔴 **No volver a publicar las «páginas del tema» que GemPages señala tras el cambio** (aviso «Como cambió el tema,
   las páginas del tema se fijaron como predeterminadas»): son su portada y su ficha por defecto, y al publicarlas
   reemplazarían las del tema.
6. Refresh queda sin publicar como respaldo: volver a publicarlo deshace el cambio.
- **Sesiones de la CLI:** cada tienda va con su cuenta (MX: nambumx@gmail.com; CO: la del cliente). Con la de
  otra tienda abierta, la CLI responde «you don't have access»: `pnpm exec shopify auth login` y elegir la
  cuenta. `pnpm seed` usa otra autorización, la de `shopify store auth`, y no depende de esa sesión.
- **SEO de la portada** (Tienda online → Preferencias, 2026-10-16, igual que MX): título «Nambu Colombia | Spray nasal,
  sérums y cuidado natural» (54), meta descripción del copy de la portada + envío (145) e imagen de redes 1200 × 628
  `nambu-co-redes.jpg` (fuente en `stores/co/seo/`: `og.html` y el JPG). 🔴 En el navegador integrado, «Agregar imagen»
  de Preferencias rellena solo el selector con el último archivo usado (subió `nambu-mx-og.jpg` a CO): mirar la
  vista previa antes de guardar. Se corrigió con `fileUpdate` (Admin API) sobre ese archivo, sin volver a abrir el selector.
- **Favicon** (2026-10-16): `nambu-favicon-emblema.png` (copia en `nambu/shared/assets/`), el emblema del sello de
  `docs/LOGO-07.jpg` sin el texto circular, recortado al disco y pasado a los verdes de la tienda (`#2F7D22` y `#6FC350`).
  El sello entero (`nambu-01_…png`) no se leía a 16–32 px.
- **Embeds activos** copiados a `stores/co/theme/config/settings_data.json`: Releasit, GemPages y Klaviyo
  (el de suscripciones estaba apagado).


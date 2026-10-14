# AGENTS.md — NAMBU · SPRAY NASAL

Contexto de producto. Hereda de `/AGENTS.md` y de [`../../AGENTS.md`](../../AGENTS.md), y **manda
sobre los dos** en caso de conflicto.

---

## 1. Qué es

**Spray Nasal de Nambu** — spray nasal de **60 ml** con extractos botánicos de **eucalipto, menta y
regaliz** de origen colombiano. Ayuda a despejar **la sensación** de nariz tapada y a facilitar el
paso del aire. No es un medicamento y no se comunica como tal.

| Dato | Valor |
|---|---|
| Contenido | **60 ml** (el doble del formato común de 30 ml) — es el diferencial principal |
| Uso | 2 aplicaciones en cada fosa nasal, mañana y noche |
| Precio contraentrega | **$79.900 COP** |
| Precio anticipado | **$69.900 COP** (ahorra $10.000) |
| Envío | Gratis en Colombia · 3 a 5 días hábiles |
| Registro | Homeopático **en trámite ante INVIMA** |
| Producto en Shopify | `lung-cleansing` — *SPRAY NASAL.* (variante `52477454581920`) |

**Nombre interno vs nombre comercial.** En Shopify y en los anuncios el producto aparece como *Lung
Cleansing*; en la landing y en la tienda se llama **Spray Nasal de Nambu**. En el copy nunca se usa el
nombre interno.

**La etiqueta física no dice "eucalipto, menta y regaliz".** Declara las nomenclaturas técnicas de los
extractos. El copy aprobado lo aclara con una nota y esa nota **no se quita**: es lo que evita que el
cliente sienta que le vendieron otra cosa al abrir la caja.

---

## 2. Ángulos

Seis carpetas, un argumento cada una. Los seis `september.html` están **construidos** (2026-09-21) y
salen del generador de `src/` (§7): no se editan a mano.

| Ángulo | Dolor de entrada | Producto | Sello propio |
|---|---|---|---|
| `general/` | Congestión, moco, presión, respirar por la boca | `lung-cleansing` | **Mapa de síntomas**: la misma cabeza de perfil con cada zona animada |
| `alergias/` | Estornudos, moco claro, nariz tapada por el ambiente | `lung-cleansing` | **La reacción en cadena**: polen, ácaros, polvo, moho y mascotas → nariz inflamada → estornudo |
| `flema/` | Flema pegada, carraspera, tos al acostarte | ficha propia *SPRAY NASAL \| FLEMA* (§4) | **El goteo hacia atrás** (cadena de 4 pasos) y **el bucle de la carraspera**: un punto que gira sin parar |
| `sinusitis/` | Presión facial, nariz tapada, moco espeso | `lung-cleansing` | **El mapa de la presión**: cara de frente con los senos, en los 4 estados de la cadena |
| `tabaquismo/` | Flema, tos al despertar, nariz cargada del fumador | `lung-cleansing` | **La tos de la mañana**: la escena del copy (levantarse, carraspear, toser, sacar flema) como cadena propia. El problema abre con las placas de pulmones y vías; la ilustración de los cilios se retiró el 2026-09-22 porque el cliente no la entendía |
| `remarketing/` | Ya visitó y no compró | `lung-cleansing-oferta` | **El precio que baja**: escalera $79.900 → $69.900 → $59.900 con tachado dibujado, y las dudas en bocadillos |

🔴 **La base de UI/UX es la del `general/` y cada ángulo lleva algo que lo diferencia** (cliente,
2026-09-21: *"la base de todas será la ya construida de general… cada ángulo necesita que tenga algo
que lo diferencie"*). Lo común: CTA "el disparo", cápsulas, fórmula, fuentes, 60 ml, oferta, modo de
uso, caja, pago, garantía, FAQ, collage y cierre. Lo propio: la composición del hero (abajo), la
sección del problema (el sello), el orden de las personas reales y del collage, y la placa de
radiografía que destaca.

### Tres composiciones de hero, dos ángulos cada una

El cliente, 2026-09-21: *"quiero tener al menos 3 variantes de hero y repartirlo entre las 6 landing…
que mantengan la misma esencia del hero… pero que se vean diferente"*. Las tres llevan lo mismo
—antetítulo de dolores, titular, las cuatro imágenes (la primera, la del ángulo), precio pegado al CTA
en la primera pantalla, confianza, medios de pago, subtítulo y datos del producto— y nada encima de la
foto. Cambia cómo se colocan y cómo se pasa de imagen:

| Hero | Ángulos | Móvil | Escritorio | Paso de imagen | Datos |
|---|---|---|---|---|---|
| **A · La galería que se despeja** | `general/`, `sinusitis/` | Titular → foto en escenario con halo y bruma → leyenda con flechas | Foto a la izquierda, texto a la derecha, miniaturas debajo | Vaho blanco que se retira | Filas |
| **B · La ventana** | `alergias/`, `tabaquismo/` | **Foto primero**, a sangre desde el borde izquierdo, con un **carril vertical de 4 miniaturas** cuadradas → dolores en etiquetas → titular | Espejo de A: texto a la izquierda, ventana y carril a la derecha | **Franja de aire** que cruza la foto | Cifras con filetes |
| **C · La baraja** | `flema/`, `remarketing/` | **Cinta verde** con los dolores en movimiento → titular centrado → **fotos apiladas en abanico** (la de delante despejada, las de detrás empañadas) → mando en cápsula → **precio y CTA en tarjeta** | Titular centrado arriba; baraja y tarjeta frente a frente | La de delante sale lanzada y vuelve al fondo; gesto, toque, flechas o teclado | Fichas |

- Las parejas se eligieron para que no coincidan los que más se cruzan: el `general/` y el
  remarketing (misma foto de hero y el mismo visitante) van en composiciones distintas. B va a
  ángulos de titular corto: la foto ocupa menos alto y el CTA queda a ~640–705 px en móvil.
- La cinta de C repite `hero.pretitle`; el remarketing le da la suya (`hero.ticker`: *Oferta especial*,
  *60 ml de contenido*, *Envío GRATIS en Colombia*, del copy). Es decorativa (`aria-hidden`): el
  antetítulo va aparte para lectores de pantalla.
- El CTA de la tarjeta de C conserva el ancho de columna (la tarjeta sale 8 px hacia el margen): con
  el ancho de dentro de la tarjeta, *"Quiero mi Spray Nasal de Nambu"* se partía en dos líneas.
- Se elige en `src/angles/<ángulo>/index.mjs` con `hero.layout` (`gallery`, `window`, `deck`); §7.

**Orden de las personas.** Cápsulas, collage y testimonios rotan en cada ángulo: nunca el mismo orden
(cliente, 2026-09-21). Se definen en `src/angles/<ángulo>/index.mjs`.

**Testimonios.** Los copys traen nombres con edad y ciudad («Daniela, 37 años · Bogotá») que no son del
pool de UGC. Como en el `general/`, cada testimonio se asigna a una persona real del pool, **solo con
su nombre**. Tabaquismo y remarketing no traen testimonios en el copy y no llevan esa sección.
Son carrusel también en escritorio (2026-09-22): desde 980 px las tarjetas pasan a 460 px (a 340 cabían
las tres y las flechas salían desactivadas) y el carril arranca en la línea del shell, alineado con la
cabecera.

**Precio.** En los cinco ángulos de precio normal, $79.900 es la cifra grande y el anticipado ($69.900)
la alternativa (`/nambu/AGENTS.md` §5). En el **remarketing** manda el **contraentrega rebajado**
($79.900 tachado → $69.900) y el anticipado ($59.900) es el descuento extra (memoria del cliente,
remarketing de Clorofull).

---

## 3. El sello del `general/`: despejar

Tercera versión (2026-09-21). Las dos anteriores se rechazaron por la paleta —ver `/nambu/AGENTS.md`
§2— y la segunda además por **anticuada y poco creativa** y porque **la animación del CTA no hacía
entender el producto**. Lo que las sustituye:

**El motivo: despejar.** Es lo que hace el producto y lo que dice el copy (*"ayudar a despejar la
sensación de nariz tapada"*). Se cuenta con el vaho que se retira de las fotos, la bruma del disparo y
los extractos que viajan de cada planta al frasco. Todo en blanco y verde manzana.

**El CTA: el disparo.** El icono es el **pictograma universal de spray** con la silueta del producto:
frasco de pie, boquilla alta, pestaña y banda verde, con tres gotas en reposo junto a la punta. Cada
4,2 s se presiona la boquilla (`translateY` de la pestaña) y sale **una nube**: cuatro soplos con
degradado radial que se abren desde la punta y diez gotas finas que **cruzan el botón entero**, con un
golpe de frescor detrás. Se lee como spray a primera vista.

- 🔴 **Un frasco tumbado no se entiende.** El primer intento de la v3 lo puso de perfil y se leía como
  un enchufe o una batería. El frasco va **de pie**.
- **Gotas sueltas no bastan.** Doce puntos de 2 px se leen como destellos; lo que dice "spray" es la
  nube que se expande. Soplos grandes y blandos + gotas finas.
- El degradado de la nube vive en un único `<svg class="ns-defs">` al principio del bloque (ids únicos);
  ese contenedor va a tamaño cero, **nunca** `display:none`, o Safari y Firefox no pintan el degradado.
- Las distancias de la nube van en unidades del `viewBox` (el icono se pinta a 0,75): ×1,33 sobre los
  px que se quieren ver.

**Mecanismo por sección:**

| Sección | Mecanismo |
|---|---|
| Hero (A, la del `general/`) | **Galería de 4 imágenes** (`hero`, `beneficios`, `ingredientes`, `modo-uso`) a gesto y flechas, sin puntos. Al llegar a cada imagen, un **vaho blanco se retira** (`.is-entering`). Leyenda y contador en su propia fila, debajo. Miniaturas en escritorio. Bruma ambiente subiendo detrás. Las otras dos composiciones, en §2 |
| Personas reales | **Cápsulas que flotan** desfasadas, como gotas suspendidas, con anillo blanco y filete manzana |
| Problema | **Radiografías** de vías aéreas y de pulmones y bronquios (cliente, 2026-09-21: *"más impactante"*), en duotono: el negro de la placa pasa a `--ns-apple-ink` con `mix-blend-mode: screen` y una franja manzana las barre como un escáner. Pie con el nombre de cada placa y *"Imágenes de referencia."*. Debajo, **el mapa de síntomas**: una ficha por síntoma con la **misma cabeza de perfil** (`<symbol id="ns-head">`) y su zona animada —aire que se queda en la puerta de la nariz, bocanadas por la boca, grieta en la garganta, frente que aprieta, gota que baja por detrás—, más una sexta ficha de noche (luna y estrellas). Detonantes en un panel con iconos grandes |
| Fórmula | **Ilustración de la fórmula** (`formula/art.mjs` en el generador): eucalipto de hoja redonda y menta a los lados, el frasco de pie sobre raíces de regaliz, y extractos que viajan de cada planta al frasco. La tarjeta elegida destaca su planta (`data-ns-plant-art`) y la mece. Tarjetas **con la foto de cada ingrediente** y **sin números**. Sustituye al conducto despejándose, que según el cliente no comunicaba los ingredientes |
| Fuentes | **Logotipos** de Healthline, Medical News Today y WebMD en SVG en línea, en un solo tono (`--ns-ink`). El de Medical News Today se vectorizó del PNG con `potrace` + `svgo` (2,6 KB) |
| 60 ml | Cifra gigante y **frascos cuyo líquido sube** al verlos, con la superficie meciéndose. El de 30 ml es **más pequeño entero** (`ns-bottle--common`), no solo de líquido |
| Modo de uso | Cada momento dibuja el gesto: frasco del producto, **dos presiones y dos nubes** |
| Clientes reales | **Collage** de seis fotos justo antes del cierre (una grande y cinco pequeñas); cada foto se despeja al entrar, en cascada por fila |
| Cierre | El frasco entre la bruma; los síntomas aparecen **tachados en verde** |
| Fotos de producto | Se **despejan** al entrar: el vaho blanco se retira y el frasco se asienta |

**El mapa de síntomas es la sección clave del problema** (cliente, 2026-09-21: *"esa sección es muy
importante"*). Sustituyó a unas píldoras pequeñas que no se leían. La cabeza lleva los colores en
atributos, no en CSS: los estilos del documento no llegan de forma fiable al árbol de un `<use>`.

**Lo que es solo del `general/`:** el mapa de síntomas con la cabeza de perfil y los detonantes. El
resto de mecanismos de esta tabla es la base común de los seis ángulos (§2).

---

## 4. Despliegue

Cada ángulo es un **Custom Code** de GemPages (pestañas HTML, CSS y JS). Hay dos montajes en uso:

| Montaje | Ejemplo | Producto |
|---|---|---|
| Página | `/pages/spray-nasal-sinusitis` | `lung-cleansing` (Spray Nasal) |
| Ficha de producto propia | `/products/lung-cleansig-dificulad-para-respirar-por-flema` | *SPRAY NASAL \| FLEMA* (variante `52559901655200`, $79.900) |

Lo que tiene que cumplir la página en GemPages, en los dos montajes:

1. 🔴 **El Custom Code va en una fila de ancho completo.** La flema se publicó el 2026-09-28 dentro de
   dos filas anidadas con el ancho de contenido del tema (`--w: var(--g-ct-w, 1200px)`): en escritorio
   la landing salía encajonada a 1200 px con el gris del `body` a los lados, y la fila interior lleva
   además un fondo `#F4F4F4` en móvil. La referencia es la sinusitis: el Custom Code solo, en una fila
   al 100 %. No se corrige desde el CSS de la landing (habría que pisar variables internas de GemPages
   o usar `100vw`, que desborda con la barra de scroll de Windows).
2. 🔴 **Hace falta un Product Element de GemPages** al final de la página, **también en `/products/`**:
   el formulario nuevo solo engancha los CTA si hay un `gp-product` en el DOM
   (`/docs/releasit-form-styling.md` §4.4). Sin él, los CTA no hacen nada y no hay error en consola
   (la flema, 2026-09-28). En una página va enlazado al Spray Nasal; en una ficha, al producto de la
   ficha. No lleva nada dentro. Se neutraliza con la regla sobre `gp-product` (fuera del flujo,
   **nunca** `display:none`).
3. **El botón flotante de Releasit** taparía el sticky y el pie. En el formulario nuevo es
   `#floatingBuyNowButton` (hoy apagado en la app, `floatingEnabled: false`); si alguien lo enciende,
   el CSS de la landing lo saca del flujo con el mismo patrón.
4. **En una ficha de producto, Releasit pinta el esqueleto gris de su botón** (`.rsi-btn-skel`) arriba
   del todo. El CSS de la landing lo oculta.

Con el formulario antiguo había otra más: en `/pages/` las ofertas de cantidad necesitaban que la
landing rellenara `#rsi-cod-form-product-cache` (`initReleasitProductCache()`). **El formulario nuevo
(desde el 2026-09-28) ya no lee ese script** y encuentra el producto solo, así que el paso se quitó
del JS. Si se añade el bloque de ofertas al formulario y no sale en la landing, mirar
`/docs/releasit-form-styling.md` §4.4.

🔴 **El remarketing usa otro producto: `lung-cleansing-oferta`** (*LUNG CLEANSING OFERTA*, variante
`52445372514464`, $69.900). Su Product Element de GemPages tiene que apuntar a ese producto, no al
Spray Nasal normal, y el botón de anticipado de Releasit tiene que llevar el mismo descuento de
$10.000 para que salga a $59.900. **Comprobarlo con el modal abierto antes de lanzar tráfico.**

**El formulario de Releasit va con el skin de la marca** (`/nambu/shared/releasit-form.css`, escrito
para el formulario NUEVO desde el 2026-09-28), que `src/build.mjs` añade al final del CSS de cada
ángulo: la pestaña CSS ya lo lleva, no se pega aparte. Auditado en vivo el 2026-09-28: 🔴 **hoy abre
con 2 unidades y sin selector** ($159.800 + $3.500 de Envío Prioritario premarcado = $163.300), porque
aplica la oferta preseleccionada del pack de 2 pero no lleva el bloque de ofertas; y el anticipado
sigue ofreciendo $5.000. Nada de eso se arregla con CSS: está en
`/nambu/shared/releasit-form-designer.md` y es lo primero que hay que cambiar en la app antes de lanzar
tráfico.

**Los CTA no funcionan en la vista previa del app proxy de GemPages** (no hay contexto de producto).
Se prueban en la URL publicada, nunca en la preview.

---

## 5. Imágenes

Todas en `assets/`, compartidas por los seis ángulos, con el **mismo nombre en Contenido → Archivos**.
Lo que comparte toda la marca (captura de Instagram, logotipos de Visa, Mastercard y PSE) vive en
`/nambu/shared/assets/`.

**Hero.** Los seis usan las mismas cuatro imágenes salvo la primera, que es la de su ángulo
(`landings-spray-hero-<ángulo>.webp`, 1200×1200). El remarketing reutiliza la del `general/`: su
original es la misma imagen. Los PNG originales están en `product-images/spray/heroes/`.
Base del CDN: `https://nambuoficial.com/cdn/shop/files/`.

| Archivo | Qué es | Origen |
|---|---|---|
| `landings-nambu-wordmark-cream.webp` / `-green.webp` | Logotipo con alfa | `nambu/docs/LOGO-02.jpg` |
| `landings-spray-hero.webp` | Pareja real con el producto y el esquema respiratorio | creatividad de la marca |
| `landings-spray-packshot.webp` | Frasco **nivelado a blanco puro** (`-level 0%,88%`) y recortado centrado, 601×1100. Se pinta con `multiply` | `product-images/spray/spray_nasal_1.jpeg` |
| `landings-spray-ingredientes.webp` | Frasco con menta, regaliz y eucalipto | creatividad |
| `landings-spray-modo-uso.webp` | Frasco con el modo de uso | creatividad |
| `landings-spray-beneficios.webp` | Frasco con los cuatro beneficios | creatividad |
| `landings-spray-hero-{alergias,flema,sinusitis,tabaquismo}.webp` | Primera imagen del hero de cada ángulo | `product-images/spray/heroes/` |
| `landings-spray-vias.webp` · `-pulmones.webp` · `-senos.webp` | Radiografías y TAC de referencia (en el problema de cada ángulo) | creatividad |
| `landings-spray-adv-flema.webp` · `-adv-presion-nasal.webp` · `-adv-rx-senos.webp` | Foto que abre los advertoriales de flema, alergias y sinusitis. No las usa ninguna landing | `product-images/spray/advertoriales/` |
| `landings-spray-ingrediente-{eucalipto,menta,regaliz}.webp` | Foto de cada planta, 900 px de ancho | `general/assets/*.jpg` |
| `landings-spray-ugc-*.webp` | 13 personas reales | `humanized-images/nambu-spray/` |
| `landings-spray-empaque.webp` | Pedido empacándose | `humanized-images/nambu-spray/` |
| `landings-spray-instagram.webp` | Bio de @nambuoficial | captura |

**El logotipo se genera, no se recorta a mano.** Los archivos del manual son JPG con fondo sólido; un
recorte directo arrastra el cuadro de color. El procedimiento:

```sh
magick nambu/docs/LOGO-02.jpg -fuzz 12% -trim +repage -resize 568x \
	-colorspace gray -auto-level -level 22%,78% /tmp/wm-mask.png
magick -size 568x138 xc:'#F4EFE2' /tmp/wm-mask.png \
	-alpha off -compose copy_opacity -composite -strip -quality 90 \
	nambu/landings/spray/assets/landings-nambu-wordmark-cream.webp
```

### Una imagen con claims fuera del copy, en el hero por decisión del cliente

`landings-spray-beneficios.webp` lleva rotulado *"Mejora la energía"* y *"Limpia vías respiratorias"*,
claims más fuertes que el copy aprobado (que solo habla de *ayudar a despejar la sensación*). Se avisó
el 2026-09-20 y el cliente la pidió en el carrusel del hero el 2026-09-21: está dentro por decisión
suya, y el 2026-09-21 pidió también las mismas imágenes de hero en los seis ángulos: está en todos.

**Las radiografías están dentro por decisión del cliente (2026-09-21)**, que las pidió en lugar del
esquema del conducto y después en todos los ángulos. Cada ángulo destaca la suya: senos en sinusitis
(sola y grande), vías + senos en alergias, vías + pulmones en flema, pulmones + vías en tabaquismo,
las tres en remarketing. Se avisó antes de que, junto a un producto de bienestar, pueden leerse como
promesa de tratamiento. Por eso van en duotono de marca, con *"Imágenes de referencia."* y nunca como
un antes y después ni pegadas a una promesa de mejora.

**El producto no se tapa ni se muerde.** Ningún rótulo, punto o badge encima de la foto del hero, y
ningún recorte que corte el frasco (`/AGENTS.md` §7 y memoria del cliente).

---

## 6. Comprobaciones antes de entregar

```sh
node nambu/landings/spray/src/build.mjs          # regenera los seis, su vista previa y sus pestañas
node shot.mjs --url=file://$PWD/nambu/landings/spray/<ángulo>/september.preview.html --width=360 --out=/tmp/m360.png --full
node check-css-merge.mjs nambu/landings/spray/<ángulo>/september.html
./check-cdn.sh nambu/landings/spray/<ángulo>/september.html
```

Estado al 2026-09-21 (tras las tres composiciones de hero), en los seis: sin scroll horizontal a 360 px, CTAs en una línea, contraste AA sin
fallos a 360 y 1280, fusión de GemPages sin cambios de estilo, sin vacíos ni ids duplicados.

**La vista previa lee las imágenes del CDN**, con el mismo `srcset` que producción. Solo si una aún no
está subida, `initLocalFallback()` la toma de `assets/` o de `/nambu/shared/assets/`, y únicamente en local (`file:` o localhost):
así se revisa antes de subir sin esconder nada, porque `./check-cdn.sh` sigue marcando lo que falta.
Shopify **recomprime** al
subir: el md5 nunca coincide con el local, aunque las dimensiones sí. Para comprobar que se subió la
versión buena se comparan píxeles (`magick compare -metric RMSE local cdn null:`, < 1,5% es
recompresión), no hashes. Una imagen modificada se sube con sufijo `-v2`: el CDN cachea por nombre.

---

## 7. El generador (`src/`)

Las seis landings comparten más del 80 % del marcado, del CSS y del JS. Para que un arreglo común no
haya que repetirlo seis veces, salen de un generador. **El entregable sigue siendo un fragmento
autocontenido por ángulo** (`<ángulo>/september.html`), como pide `/AGENTS.md` §4; lo que cambia es
que se edita la fuente y se regenera.

```
src/
├── build.mjs              # node nambu/landings/spray/src/build.mjs [ángulo…] [--no-derived]
├── lib/                   # piezas: img, CTA "el disparo", ilustraciones, logotipos, pool de UGC, medios de pago
├── sections/              # una sección común por archivo; el problema se compone por bloques
├── sections/hero/         # parts.mjs (piezas comunes) + gallery, window y deck (las tres composiciones)
├── styles/shared/         # base y tokens, CTA, medios de pago y andamiaje de Releasit: van delante
│                          # y los usan también los advertoriales (/nambu/landings/advertoriales/)
├── styles/landing.css     # las secciones de la landing
├── styles/hero/           # el CSS de cada composición del hero: cada ángulo lleva solo el suyo
├── styles/chain.css       # la cadena del problema, que usan los cinco ángulos
├── scripts/landing.js     # el JS común; build.mjs escribe su bloque build:config
│                          # el CSS de cada landing termina con /nambu/shared/releasit-form.css (skin de Releasit)
├── logos/                 # originales de los logotipos de las fuentes
└── angles/<ángulo>/       # index.mjs (contenido y orden de secciones), art.mjs y signature.css (su sello)
```

- 🔴 **`lib/` y `styles/shared/` son también de los advertoriales**, que los importan desde su propio
  generador. Un cambio ahí se comprueba en las dos familias (`node …/advertoriales/src/build.mjs`).
- **Un ángulo es un archivo de contenido**: textos del copy, orden de secciones, personas, producto y
  precios. Lo común (`angles/shared.mjs`) se importa y se sobrescribe donde el copy cambia.
- **El problema se compone por bloques** (`xrays`, `signs`, `triggers`, `text`, `chain`, `custom`). Un
  ángulo puede tener varias secciones de problema (flema: el goteo y el bucle; tabaquismo: humo y moco,
  la tos de la mañana y la rinitis).
- **Los sellos viven en su ángulo** (`art.mjs` + `signature.css`). Si un sello pasa a usarlo otro
  ángulo, se sube a `lib/` o `styles/` (así pasó con la flema pegada, que usa también tabaquismo).
- **El hero es un registro de composiciones** (`sections/hero/index.mjs`): cada una trae su render y
  su hoja, y `build.mjs` añade la hoja del hero del ángulo entre el CSS común y el sello. Una cuarta
  composición es un archivo en `sections/hero/`, otro en `styles/hero/` y una línea en el registro.
- **El JS es el mismo en los seis**: solo cambian `READY_FLAG`, `PRODUCT_HANDLE`, `PRICES` y
  `STICKY_SUBS`, que `build.mjs` escribe entre `// build:config` y `// /build:config`. La galería (A y
  B) y la baraja (C) salen sin hacer nada si su hero no está en la página.
- **La baraja se centra con flex, no con `margin: auto`**: Chrome informa `0px` en los márgenes auto
  de un elemento con `aspect-ratio`, y `check-css-merge.mjs` lo marcaba como cambio (también con
  `--no-merge`) aunque la caja no se moviera.
- El `general/` se reconstruyó desde el generador y se comparó con el aprobado: marcado y CSS idénticos
  salvo los comentarios de cabecera, los medios de pago añadidos y el respaldo local de imágenes.

### Avisos sobre el copy de los ángulos

- **Sinusitis se contradice.** El problema dice *"…y, con mucha frecuencia por hongos"*; su propia FAQ
  dice *"con menor frecuencia, los hongos"* y *"son menos frecuentes que las sinusitis virales"*. Está
  tal cual el copy (no se corrige un claim por cuenta propia), pero hay que resolverlo con el cliente.
- **Logotipos de las fuentes (2026-09-22).** Las seis fuentes llevan logotipo en SVG inline y en un
  solo tono (`lib/logos.mjs`, originales en `src/logos/`). CDC y American Lung Association son SVG del
  cliente; Cleveland Clinic llegó en AVIF y se vectorizó con potrace. El blanco del CDC (filete y
  letras) va como calado (`.ns-source__knockout`). Ya no hay rótulo tipográfico de reserva: una fuente
  sin logotipo para el build. No se dibujan logotipos de memoria.

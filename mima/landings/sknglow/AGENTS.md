# AGENTS.md — SKNGLOW

Contexto de producto. Hereda de `/AGENTS.md` (global) y de `/mima/AGENTS.md` (marca), y **manda sobre
los dos** en caso de conflicto.

---

## 1. El producto

Dulces duros sabor kiwi de **Biotina + Resveratrol**. Presentación: **120 unidades, 4 al día, 30 días
de uso**. Actúa sobre piel, cabello y uñas — de ahí que tenga más de un ángulo.

| | Anticipado | Contraentrega |
|---|---|---|
| Precio | **$79.900** | **$89.900** |

Envío gratis a Colombia, entrega 3–5 días. Order bump **MIMACALM** y upsell **MIMANAD**, ambos a
$39.950 (copy en `piel/order_bump_upsell.md`).

---

## 2. Ángulos

| Carpeta | Promesa | Estado |
|---|---|---|
| [`piel/`](piel/) | Piel firme, luminosa, con menos manchas | **En producción** — handle `sknglow-piel-firme` |
| [`cabello/`](cabello/) | Cabello con cuerpo desde la raíz, uñas resistentes | **Construida, sin publicar** — ver §6 |

Mismo producto, misma variante de Shopify, mismo precio. **Lo único que cambia es el argumento.** Un
ángulo nuevo es una carpeta nueva con su copy y su HTML, nunca un `if` dentro de una landing existente.

Los `.webp` optimizados están en [`assets/`](assets/) y **los comparten los dos ángulos**. Antes de
optimizar una imagen nueva, mira si ya está ahí.

---

## 3. Convenciones de código de este producto

- **Prefijo: `sg-`.** Contenedor raíz `.sg-lp` con `id="sg-sknglow"`. Todos los selectores cuelgan de
  `.sg-lp`; todos los IDs empiezan por `sg-`.
- Constantes al inicio del script, ya extraídas: `ROOT_SELECTOR`, `READY_FLAG`, `PREPAID_ENABLED`,
  `PRICES`, `CTA_LABELS`, `CTA_LABEL_FALLBACK`. **Precios y textos de CTA salen de ahí**, no repetidos
  en el HTML.
- `READY_FLAG` (`sgLandingReady`) evita doble inicialización: GemPages puede re-montar el DOM.
- El bloque abre con **`data-rsi-banner="<ángulo>"`**. El atributo enciende el banner del formulario de
  Releasit (oculto por defecto, porque el bloque de imagen es global a la tienda) y **su valor elige
  cuál se pinta**: `"piel"` deja el que está puesto en la app, `"cabello"` lo sustituye con
  `content: url()` desde `shared/releasit-form.css`. Un ángulo nuevo = una regla más ahí.

### Estructura de la landing de piel

Cabecera · Hero · Puente · Mecanismo · Dolores · Uso simple · **Selector de pago** · Bono · Historias ·
Autoridad · Qué recibes · Garantía · FAQ · Cierre · Instagram · Footer · **CTA sticky**.

---

## 4. El selector de pago — la parte delicada

`#sg-payment` tiene dos radios: `#sg-pay-prepaid` (marcado por defecto) y `#sg-pay-cod`.

La elección **tiene que llegar hasta el formulario de Releasit, que se inyecta fuera de `.sg-lp`**. Por
eso `sync()` escribe el atributo en la raíz del documento:

```js
document.documentElement.setAttribute('data-sg-pay', choice)
```

La skin lo recoge en `mima/shared/releasit-form.css` §6b (`html[data-sg-pay="prepaid"] …`) y degrada a
enlace la opción descartada, dejando la elegida como botón principal. **Las dos siguen siendo
clicables**: nadie queda encerrado en una vía. Verificado de extremo a extremo.

Se escribe la elección **real**, no el modo resultante — así funciona aunque `PREPAID_ENABLED` siga
en `false`. Sin el atributo, el formulario se ve como siempre: otras landings no se ven afectadas.

### 🔴 Dos cosas abiertas, decisión del cliente

1. **`PREPAID_ENABLED` está en `false`.** Mientras siga así, el precio del CTA sticky y el texto del
   botón **ignoran la elección** y se comportan siempre como contraentrega. El atributo sí funciona.
2. **El formulario abre con `quantity_offer_1` (2 unidades) preseleccionado.** Por eso el usuario ve
   **$119.900 / $129.900** en vez de los $79.900 / $89.900 que promete la landing. Es una
   inconsistencia de precio visible, no un bug de código.

---

## 5. Antes de dar por bueno un cambio

- La landing se pega en el bloque HTML de **GemPages**; la skin del formulario, en la pestaña de CSS de
  **Releasit**. Son dos sitios distintos: publicar solo uno deja el cambio a medias.
- Si es una landing nueva, **su handle va en `paid_landings`** del layout
  `mima/theme/theme.gempages.blank.liquid`. Sin eso hereda el tema completo.
- Vista previa local: `./preview.sh mima/landings/sknglow/piel/august.html`.
- Verificar **renderizado en vivo**, no leyendo el CSS. Comprobar colores computados: una regla de
  etiqueta del tema le gana a una de clase y deja texto ilegible sin avisar.

---

## 6. Ángulo cabello — estado

`cabello/august.html` está construido y verificado en local, **pendiente de publicar**.

Hereda la hoja de estilos completa de piel y añade dos bloques que allí no existen:

- **Carrusel de UGC** justo después del hero (Parte 2 del copy), reutilizando `.sg-gallery`.
- **Línea de tiempo** de 90 días (Parte 5), clases `.sg-timeline*`. Guía y puntos van con
  `::before`/`::after` sobre el `<li>`, nunca con capas vacías: el tema borra los `div:empty`.

### Hero "superpuesto" — patrón reutilizable

El hero de cabello **no** apila titular → foto → datos → mecanismo → compra como el de piel. Lleva un
**slider de 5 imágenes cuadradas** y la **tarjeta de compra se monta sobre su borde inferior** con
margen negativo. Se lee como ficha de producto en vez de como artículo, que es lo que lo diferencia
del otro ángulo.

**Los dos ángulos comparten el slider y las cuatro infografías** (`cab-hero-2..5`: beneficios,
ingredientes, modo de uso, tabla nutricional). **La primera imagen es propia de cada ángulo**:

| Ángulo | Slide 1 |
|---|---|
| piel | `landings-sknglow-piel-hero-1-v2.webp` — la compuesta foto+frasco, 800×762 |
| cabello | `landings-sknglow-cab-hero-1.webp` — retrato de Juli, 1:1 |

**La caja del slider de piel no es cuadrada: va a 800/762**, la proporción de su compuesta. Con 1:1 la
compuesta dejaba una banda vacía del 11 % arriba, que es justo lo que se veía mal.

Elegir esa proporción tiene un coste: las cuatro infografías son cuadradas y pierden un **2,4 % arriba
y abajo**. Está medido y comprobado que cabe en sus márgenes. **No bajar más la caja**: a 1:1 exacto el
recorte sube al 5,7 % por lado y **parte la tabla nutricional del slide 5**, que solo tiene 2,6 % de
margen superior. La compuesta se recortó de 860 a 800 de ancho **por el borde derecho**; el frasco
queda intacto.

🔴 **La compuesta de piel trae el redondeo horneado en el canal alfa, no lo pone el CSS.** Es una
tarjeta de esquinas a **45 px de radio sobre 800 de ancho**, con una **banda transparente de 25 px
arriba** por la que asoma el tapón del frasco (x 155–371). No hay RGB debajo del alfa: aplanarla deja
las esquinas en negro, así que no se puede quitar la transparencia.

Consecuencia práctica: **recortar la imagen de ancho decapita las dos esquinas de ese lado y quedan en
pico.** Pasó exactamente eso al bajarla de 860 a 800. La v2 se las devuelve copiando **en espejo el
alfa de las esquinas izquierdas** — no reconstruyendo el arco a ojo, que deja 6 px de asimetría en la
fila superior. **Si se vuelve a tocar el ancho, hay que rehacer ese espejo.**

Por qué encaja igual con los otros slides: el radio horneado se renderiza a `45 × (ancho_slide / 800)`
y con `max-width: 420px` nunca pasa de **23,6 px**, por debajo de los **24 px** de `--sg-radius-lg`.
Manda siempre el radio CSS, así que la esquina se ve idéntica a la de las infografías. Verificado
midiendo el hueco contra un fondo de contraste: slide 1 y slide 2 dan el mismo perfil de esquina.

Las cinco imágenes de cabello (`cab-hero-1..5`) son **cuadrados opacos sin alfa**: este problema no
existe en ese ángulo.

También cambia la maquetación: piel apila titular → slider → datos → mecanismo → compra; cabello monta
la tarjeta de compra sobre el borde inferior del slider.

⚠️ El prefijo `cab-` de las infografías se quedó de cuando eran exclusivas de cabello. Renombrarlas
obliga a resubir las cuatro al CDN, así que se dejó como está.

**El slider es scroll nativo con `scroll-snap`, sin librería.** El JS solo pinta el punto activo
leyendo `scrollLeft`, así que si falla sigue deslizándose con el dedo. Los puntos van en una píldora
oscura translúcida a `bottom: 42px`: **la píldora no es decorativa** — tres de los cinco slides tienen
fondo blanco y unos puntos claros desaparecerían. Miden 7 px (18 el activo) con área tocable de 25 px.
Solo la primera imagen va sin `loading="lazy"`: es el LCP.

**Tope de ancho obligatorio en `.sg-hero__media` (`max-width: 420px`).** Sin él, entre 500 y 900 px la
imagen cuadrada se va a ~650 px de lado y dispara el hero por encima de los 1150 px. Pasó en los dos
ángulos.

**El rótulo (`.sg-hero__claim`) vive dentro del slide 1**, no del slider: solo tiene sentido sobre la
foto, no sobre las infografías. Los puntos van dentro de su misma banda de degradado, debajo del texto,
así que el `padding-bottom` del rótulo es lo que les hace sitio — 42 px en piel, 72 px en cabello,
que además tiene que salvar la tarjeta de compra.

En piel hay un detalle que no es obvio: la compuesta no es cuadrada y va con `object-fit: contain`, que
por defecto la centra y deja banda arriba **y abajo**. El rótulo caía entonces en la banda inferior,
sobre el degradado de la página, en blanco sobre lila: ilegible. Con `object-position: center bottom`
toda la banda se va arriba —donde la compuesta ya trae su franja transparente por diseño— y el rótulo
queda sobre la foto. Verificado: su borde inferior coincide al píxel con el de la imagen en 360, 390,
428, 700 y 1200.

De piel se retiraron además las reglas muertas de la versión por capas (`.sg-hero__portrait`,
`.sg-hero__bottle`), que ya no tenían marcado que las usara.

Orden: titular → foto → **tarjeta (precio + CTA + confianza)** → datos rápidos → mecanismo. Los datos
van debajo de la tarjeta a propósito: son detalle, no deciden la compra, y arriba empujaban el CTA 44 px.

Medido a 390 px: hero **926 px** (antes 1048) y **CTA a 703 px** (antes ~800). Añadir el slider no
costó altura: el alto lo fija la proporción 1:1 de las imágenes, no su número.

Tres cosas que respetar si se replica en otra landing:

- **`z-index: 2` en la tarjeta.** El rótulo de la foto va posicionado; sin esto se cuela por encima del
  borde de la tarjeta.
- **Tope de ancho en la foto** (`max-width: 420px`). A ancho completo, entre 500 y 900 px la cuadrada se
  iba a 660 px de lado y disparaba el hero a 1193 px.
- **Neutralizar la tarjeta a partir de 900 px.** Ahí el hero es de dos columnas y la compra tiene la
  suya: el margen negativo y el recuadro blanco sobran.
- **Cuidado con el hueco hasta el carrusel.** Se apilaban cuatro separaciones —padding inferior del
  hero, padding de la sección, `margin-top` de `.sg-gallery` y el del track— y sumaban 81 px. La
  galería trae ese margen porque en piel va detrás de contenido; aquí es lo único de su sección y hay
  que anularlo. Ahora son 22 px.

Se probó antes una variante "split" (dos columnas desde móvil). Bajaba el hero a 727 px, pero se
descartó: **se veía apretada**, y en columna estrecha el recorte se comía el pelo, que es lo único que
este ángulo tiene que enseñar.

El hero tampoco es una imagen compuesta como en piel: la toma original ya trae el frasco en la mano.

### 🔴 Bloqueado antes de publicar

1. **La cifra de 2,5 mg de Biotina del NIH contradice la etiqueta del propio producto.** La tabla
   nutricional (slide 5 del hero) declara **9 µg de Biotina por porción de 3 dulces duros** —unas
   **280 veces menos** que el estudio citado— y **no declara Resveratrol** con cantidad. Citar ese
   estudio insinúa un efecto que la fórmula no respalda. Hay que quitar la cifra o acotarla.
2. **El estudio de Resveratrol y densidad capilar usa una fórmula TÓPICA** y Sknglow es oral. En
   revisión con el copywriter, marcado con `EN REVISIÓN`.
3. **La etiqueta y el copy no coinciden en la porción:** la tabla dice 3 dulces duros (~30 porciones
   por envase) y toda la landing dice 4 al día durante 30 días. Es del cliente, pero conviene avisarlo.
3. **La portada del bono es la de piel** ("28 días para proteger tu piel"), mientras el titular habla de
   cabello. Provisional, a la espera de la nueva imagen.
4. **`+1400 mujeres felices`** del copy no se incluyó: no hay dato que lo sostenga y la línea de
   confianza se sostiene sola con envío gratis y garantía.

### Imágenes propias del ángulo

17 ficheros `landings-sknglow-cab-*.webp` en [`assets/`](assets/), generados desde
`humanized-images/` y **rotados a propósito**: ninguna clienta destacada en piel repite protagonismo
aquí. Hay que subirlos a Contenido → Archivos de Shopify con el nombre exacto.

⚠️ **La mayoría de `humanized-images/` son copias reescaladas a ~510x900**, que es poca resolución para
un hero. Los únicos originales de cámara son `Juli (1).JPEG` (2316x3088), `Leidy Lopez (1)(2).JPG`,
`Isabella Vergara (1)(2)(3).jpg` y `Camila Logistica (1)(2).HEIC` (3088x2316). **Para heros hay que
tirar de esos.** ImageMagick no lee HEIC en esta máquina; se convierten con `sips -s format png`.

El hero sale de `Juli (1).JPEG` y **va volteado en horizontal**: es una selfie de espejo y sin voltearla
la etiqueta del frasco se lee al revés. Comprobar siempre el sentido de la etiqueta antes de publicar
una foto de producto tomada frente a un espejo.

### El timeline de cabello: por qué va en `px`

La sección `.sg-timeline` se escribió en `rem` y **salió un 60% más grande en producción que en la
vista previa**: 24px el texto de las viñetas en vez de 15, y la sección entera a **1170px de alto en
vez de 612**. La causa no estaba en la landing sino en `preview.sh`, que declaraba la raíz a 10px
cuando la página viva la tiene a 16.

Ya está corregido en los dos sitios, pero la regla que queda es: **en estas landings todo va en `px`**.
Piel no tiene ni un `rem` y cabello ya tampoco. Ver `/AGENTS.md` §9 punto 5.

### La fila del precio y el chip de envío

`$89.900` + "Envío gratis a Colombia" van en un flex con `flex-wrap`. **Si envuelven, la fila salta de
51px a ~91px** y el CTA se va casi media pantalla hacia abajo. El chip lleva `font-size` en `clamp()`
justo por eso: no es cosmética, es lo que evita el salto.

El punto crítico no es piel sino **cabello**, porque su tarjeta de compra es más estrecha:

| Ancho | Útil en piel | Útil en cabello | Hace falta |
|---|---|---|---|
| 320 | 288 | **250** | 275 |
| 344 | 312 | **274** | 282 |
| 360 | 328 | **290** | 287 |
| ≥375 | 343+ | 305+ | 291 |

De dónde sale la diferencia: piel pierde 32px por lado de `.sg-shell` y nada más, porque su bloque de
compra **no es tarjeta**. Cabello pierde 40 del shell (20px, no 16) **más 28 de padding y 2 de borde
de la tarjeta**: 70 en total.

Por eso cabello lleva un tramo propio **por debajo de 380px** que aprieta el marco en vez del
contenido: shell a 16px, tarjeta a 10px de padding y precio a 28px. Con eso **ninguna de las dos
envuelve a ningún ancho desde 320**, con 8px de margen en el caso más justo.

En ese mismo tramo se encoge también **`.sg-price__prepay`**: pedía 270px y a 320 partía "tarjeta o
PSE", pasando de 39px a 60px de alto.

⚠️ Si se toca el tamaño del precio, el padding de la tarjeta de compra o el texto del chip, **hay que
volver a medir el barrido de anchos**, no mirarlo a 390 y darlo por bueno.

**`.sg-price__amount` lleva `line-height: 1.15` propio y no se puede quitar.** El `1.6` de `.sg-lp`
está pensado para párrafos: sobre un número de 32px inflaba la caja a **51px cuando los glifos ocupan
38** (ascendente 31 + descendente 7, medido de la fuente), o sea 13px de interlínea muerta justo
encima del CTA. Se ve como caja y no como texto porque `.sg-price` es flex y eso **bloquea** el span:
su rectángulo pasa a ser la línea entera, no el área de la fuente.

### El mockup del bono no lleva `mix-blend-mode`

Aquí está la diferencia con piel y es fácil romperla al copiar CSS de un ángulo al otro:

| | piel | cabello |
|---|---|---|
| Fichero | `landings-sknglow-ebook.webp` | `landings-sknglow-cab-ebook.webp` |
| Fondo del original | blanco sólido | **gris de estudio con viñeteado** |
| Cómo desaparece | `mix-blend-mode: multiply` | recortado, con la sombra en el **canal alfa** |

El de cabello se generó desde `mockups_landing.webp` (1055×1491). El fondo de ese render **tiene
viñeteado en los dos ejes** (214 → 227 → 215 en horizontal), así que un modelo de fondo fila a fila
deja costras: hay que ajustarlo como **superficie polinómica 2D con descarte iterativo**, porque la
sombra contamina las muestras. Con eso el residuo baja de 47 a 4,9 y la silueta sale limpia.

Detalles que costaron una vuelta cada uno:
- La portada pálida tiene **croma 9-15**, muy cerca del fondo: separarla por croma no funciona, hay
  que compararla contra el fondo ajustado.
- La sombra llega a **croma 9**, así que el umbral que la distingue del libro va en 10, no en 6.
- Quedarse solo con el **componente conexo** del libro barre las costras sueltas.

🔴 **Si se le pone `multiply`, el halo rosa del `::before` tiñe el libro y la sombra se oscurece dos
veces.** El CSS de cabello lo tiene comentado en el sitio.

### `cab-hero-2` va sin `?width=` — y es a propósito

**Shopify reencoda peor que nosotros en las imágenes con foto.** Medido con cabeceras de navegador
sobre el slide 2 del hero, que es el más pesado de los que se descargan sin scrollear:

| | Peso | Píxeles |
|---|---|---|
| Shopify `?width=860` | 82 KB | 860 |
| Fichero propio, 1050 q76, **sin parámetro** | **63 KB** | **1050** |

Más resolución por menos peso, y 1050 es justo lo que pinta un móvil DPR3 sobre una caja de 350 CSS px.
Comprobado que **sin `?width=` el CDN sirve el fichero byte a byte** (`cab-hero-3` y `-4` dan en el CDN
exactamente lo que pesan en el repo). Si se le vuelve a poner el parámetro, pasa otra vez por el
reencode de Shopify y se pierde la ventaja.

⚠️ **Esto no se generaliza al resto.** En los otros tres, que son gráficos planos, el mismo tratamiento
solo da 3-6 KB: no compensa el versionado ni la resubida.

| Slide | Shopify 860 | Propio 1050 q76 |
|---|---|---|
| cab-hero-3 | 25 KB | 22 KB |
| cab-hero-4 | 42 KB | 36 KB |
| cab-hero-5 | 76 KB | 71 KB |

### Versionado en el CDN

Los ficheros rehechos llevan sufijo porque **el CDN de Shopify no suelta la versión vieja ni borrando
el archivo**. Estado comprobado contra el CDN el 2026-08-31:

| Fichero | Estado |
|---|---|
| `landings-sknglow-cab-bento-juli-v2.webp` | ✅ subido y en uso |
| `landings-sknglow-cab-hero-v2.webp` | ✅ subido, pero **ya no se referencia**: el hero pasó al slider `cab-hero-1..5`. Se puede borrar del CDN |
| `landings-sknglow-cab-ebook.webp` | 🔴 por subir |
| `landings-sknglow-cab-hero-2-v2.webp` | 🔴 por subir — reemplaza a `cab-hero-2`, que se puede borrar |
| `banner-formulario-cabello-sknglow.webp` | 🔴 por subir — **`check-cdn.sh` no lo ve**, se referencia desde `shared/releasit-form.css` |

Regla general en `/docs/image-optimization.md` §5. Estado real en cualquier momento:

```sh
./check-cdn.sh mima/landings/sknglow/cabello/august.html
```

Los nombres de los testimonios son los **reales del pool de UGC** (Anny, Camila, Natalia). El copy
llega siempre con nombres ficticios: se sustituyen. Las ciudades sí vienen del copy.

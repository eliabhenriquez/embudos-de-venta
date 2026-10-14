# AGENTS.md — MIMANAD

Contexto de producto. Hereda de `/AGENTS.md` (global) y de `/mima/AGENTS.md` (marca), y **manda sobre
los dos** en caso de conflicto.

---

## 1. El producto

Dulces duros sabor kiwi de **Niacina 500 mg + Resveratrol 100 mg + Melena de León 200 mg**.
Presentación: **120 unidades, 4 al día, 30 días de uso**.

| | Anticipado | Contraentrega |
|---|---|---|
| Precio | **$69.900** (ahorras $10.000) | **$79.900** |

Precios vigentes desde el **2026-10-10** (antes $79.900 / $89.900). Los `.md` de copy del ángulo conservan
las cifras anteriores: en precio **manda esta tabla**. Coinciden con la tienda: el producto enlazado vale
$79.900 y el botón de pago en línea del formulario descuenta $10.000 fijos.

Producto enlazado en las dos landings: `mimanad` (variante `44343316381836`). Leído de la tienda el
2026-10-10.

Envío gratis a Colombia, entrega 3–5 días hábiles, +1.400 clientes, confirmación por WhatsApp.
Además es el **upsell de SKNGLOW** a $39.950 (copy en `sknglow/piel/order_bump_upsell.md`).

### 🔴 El copy manda sobre la etiqueta — decisión cerrada

Hay dos versiones de etiqueta en circulación y no cuadran con el copy:

| | Copy | Etiqueta de estudio (`hero-img-3`) | Foto `table nutricional` |
|---|---|---|---|
| Uso | 4 al día · 30 días | 120 masticables · aprox. 30 porciones ✓ | 3 dulces por porción · aprox. 40 |
| Sabor | Kiwi | "Sabor artificial a kiwi" ✓ | — |
| Niacina | 500 mg | No aparece en el frente | 30 mg / 100 g (0,45 mg por porción) |

El cliente confirma que **el problema es de etiqueta y es legal, no comercial**: se usa **siempre el
copy**. No se "corrige" ningún dato del copy con la etiqueta ni se vuelve a plantear.

Activo de confianza legible en el frasco: **Notificación sanitaria NSA-0009109-2020**.

---

## 2. Ángulos

| Carpeta | Promesa | Estado |
|---|---|---|
| [`energia/`](energia/) | Que te quede energía cuando todavía queda día | **En construcción** — copy en `energia/Copy - Energía - MimaNad [agosto].txt` |
| [`memoria/`](memoria/) | Que tu mente siga el ritmo de tu día | **Construida, sin publicar** — copy en `memoria/Copy - Memoria - Mimanad [Agosto].txt`. Ver §9 |

Las imágenes crudas llegaron en `energia/assets/`. Las **optimizadas van a [`assets/`](assets/)**
(prefijo `landings-mimanad-`) para que las compartan los dos ángulos. Ojo: los `.DNG` de esa carpeta
son **JPEG con la extensión mal puesta** — ImageMagick solo los abre forzando `jpg:"archivo.DNG"`.

---

## 3. Público y piel visual — lo que lo separa de SKNGLOW

**MIMANAD es para hombres y mujeres.** El UGC es 4 hombres y 3 mujeres, 25 a 55+ años. SKNGLOW es
rosa/magenta; aquí **no hay magenta ni rosa**: la piel sale del propio frasco.

Paleta medida sobre `hero-img-3` (cuantización de tapa, etiqueta y vidrio) y comprobada contra blanco:

| Token | Hex | Contraste | Origen · uso |
|---|---|---|---|
| `--mn-plum-deep` | `#3d0f33` | 15.7:1 | Sombra de etiqueta · texto principal, bandas oscuras |
| `--mn-plum` | `#611b52` | 11.6:1 | Etiqueta · titulares, color de marca |
| `--mn-violet` | `#893889` | 7.0:1 | Tapa · acentos con texto, tarjeta de anticipado |
| `--mn-violet-soft` | `#a151a5` | 4.9:1 | Tapa con luz · bordes, iconos |
| `--mn-lilac` | `#be72c5` | — | Brillo de tapa · **solo decorativo** |
| `--mn-amber` | `#b85510` | 4.8:1 | Vidrio y dulces · acento de energía, numerales, bordes del anticipado |
| `--mn-cta-base` | `#9e4a0d` | 6.1:1 | **CTA en reposo** (blanco encima) |
| `--mn-cta-charge` | `#bc5b12` | 4.5:1 | **La carga** que recorre el CTA — sigue siendo AA con el texto encima |
| `--mn-sand` | `#e9e3de` | — | Fondo del set de estudio · superficies |

El ámbar es el color de la energía y el complementario del morado: el CTA es lo que más salta de la
página. Neutros de texto y error se heredan de la marca.

**Motivo de la landing: la tarde.** Dos recursos que se repiten:
- **El cielo de la tarde** (`--mn-sky`: ámbar → violeta → berenjena) en la promesa y el cierre. Todos
  sus tonos sostienen texto blanco (≥4.8:1).
- **La carga**: tres celdas, una por ingrediente (berenjena, violeta, ámbar). Es la fórmula del hero,
  el navegador del mecanismo, la batería de la constancia y el CTA.

**CTA "la carga" — construido.** `::before` rellena el botón en **cuatro saltos** (los cuatro dulces
del día), se sostiene lleno y se apaga; solo `scaleX` y `opacity`. Arranca en pausa y un
IntersectionObserver lo enciende solo en pantalla; sin JS es un botón quieto. Con hover se queda
cargado. 🔴 **No dibujar las celdas con líneas fijas:** se probó y las separaciones cruzaban el texto
("QUIERO MI | MIMANAD"), leyéndose como defecto. Los saltos ya dicen "cuatro".

---

## 4. Convenciones de código

- **Prefijo `mn-`.** Raíz `.mn-lp` con `id="mn-mimanad"`. Todos los selectores cuelgan de `.mn-lp`,
  todos los IDs empiezan por `mn-`.
- Mismas constantes que SKNGLOW al inicio del script: `ROOT_SELECTOR`, `READY_FLAG` (`mnLandingReady`),
  `PREPAID_ENABLED`, `PRICES`, `CTA_LABELS`.
- Mismo selector de pago que SKNGLOW (escribe `data-sg-pay` en `<html>` para la skin de Releasit —
  el nombre del atributo es de la skin, no del producto; no se renombra).
- Todo en `px`, nunca `rem` (§9.5 global).

---

## 5. Assets — qué se usa y cómo

31 ficheros `landings-mimanad-*.webp` en [`assets/`](assets/), 1,6 MB en total (los originales
sumaban >40 MB). Todos con `-strip`: las fotos de iPhone traían GPS.

| Fichero | Origen | Dónde | Cómo se sirve |
|---|---|---|---|
| `hero-1..3` | `hero-img-1..3.png` | Slider del hero (y `hero-1` otra vez en el collage del cierre, ya en caché) | 1050 px q70, **sin `?width=`** — 91 / 83 / 48 KB |
| `niacina`, `resveratrol`, `melena`, `neuronas` | los cuatro del mecanismo | Tarjetas del mecanismo · `neuronas` en autoridad | 1000 px q80, `?width=640/900` |
| `logo-nih`, `logo-elpais` | logos | Autoridad | 600 px, `?width=300` |
| `bottle-wall`, `bottle-hand`, `pills-hand` | `producto 1/2`, `dulces en mano` | Pago · Qué recibes | 1000×1333 q80 |
| `bottle-table` | `producto 3.jpg` | **Sin uso** todavía | — |
| `ugc-*`, `benefit-*`, `use-*`, `story-*`, `close-*` | UGC, ver §6 | Galería, beneficios, modo de uso, testimonios, cierre | Nativas 510 q84; originales de cámara a 800 q80; `?width=` |

- **Los heros van sin `?width=` a propósito** (lección de `cab-hero-2` en SKNGLOW: Shopify reencoda
  las fotos peor). q70 frente a q76 no se distingue en las caras y ahorra 12 KB en el LCP; comprobado
  recortando las caras a 2×.
- Logos de MIMA, medios de pago e Instagram se **reutilizan de SKNGLOW** (`landings-sknglow-*`): ya
  están en el CDN y son de marca.
- Falta el logo de **Infobae**: la tarjeta lleva el nombre en texto, nunca una imitación del logotipo.

⚠️ **zsh no parte palabras en `set -- $var`.** Un bucle de medición con `set -- $cfg` le pasó a
ImageMagick `-resize "1050 76x"` sin calidad y se colgó más de 4 minutos. Usar bucles anidados o
`${=var}`.

---

## 6. Prueba social y autoridad

- **Nombres de los testimonios = nombre de la carpeta del UGC**, nunca el del copy. El copy aporta el
  texto; la persona y el nombre salen de `/humanized-images/mimanad/<persona>/`. Pool: Camila
  (dos carpetas), Camilo, Carlos Mauricio, Catalina Rodríguez, José Fernando, Luis Alejandro.
- El UGC son **secuencias de vídeo**: 4–5 frames casi iguales por persona. Se elige uno por persona.
- **Hay originales de cámara de alta resolución** — úsalos donde la foto se ve grande: `Camilo (1)(2).jpeg`
  (2268×4032), `Jose Fernandez (1).JPG` (1563×2777) y `Camila Logistica (1)(2).HEIC` (ImageMagick no
  lee HEIC: `sips -s format png`).
- **Comprobar el sentido de la etiqueta "NAD+"** antes de usar un frame: `Camila (6)` sale en espejo y
  se descartó.

Reparto actual (fichero ← frame):

| Sección | Fotos |
|---|---|
| Galería (Parte 2) | `ugc-camila-l` ← Camila Logística HEIC (1) · `ugc-camilo` ← Camilo (1).jpeg · `ugc-catalina` ← (19) · `ugc-carlos` ← (17) · `ugc-camila` ← Camila (2) · `ugc-jose` ← (1).png · `ugc-luis` ← (6) |
| Beneficios (Parte 6) | energía ← Carlos (13) · planes ← Camila Logística (7) · claridad ← Catalina (1) · presente ← José (1).JPG |
| Modo de uso (Parte 7) | desayuno ← Catalina (9) · pausa ← Luis (3) · entreno ← Camilo (15) |
| Testimonios (Parte 11) | Camilo · Bogotá ← (2).jpeg · Camila · Medellín ← Camila (3) · Luis Alejandro · Cali ← (1) |
| Cierre | `close-camila` ← Camila Logística HEIC (2) |

Testimonios: nombre de la carpeta, texto y ciudad del copy (mismo criterio que SKNGLOW). El texto de
"Santiago" pasó a Camilo y el de "Andrés" a Luis Alejandro.
- **Catalina Rodríguez es la modelo del hero de estudio**: hilo visual entre hero y prueba social.
- **NIH, Infobae y El País no son avales.** Son publicaciones sobre los ingredientes que la landing
  cita. Se presentan como "lo que se ha publicado sobre…", nunca como respaldo al producto final.

---

## 7. Estructura del ángulo energía

Hero · Carrusel UGC · Promesa · Autoridad · Mecanismo · Beneficios · Modo de uso · Constancia ·
**Selector de pago** · Testimonios · Comparativa · Qué recibes · Garantía · FAQ · Cierre · Instagram ·
Footer · **CTA sticky**.

**Con bono (Parte 10), en los dos ángulos** — añadido el 2026-09-10 cuando llegaron las láminas. Va
entre el pago y los testimonios, y "Qué recibes" recupera su línea de la guía.

- **La lámina ya trae todo el copy** (titular, qué incluye e iconos): se usa tal cual, sin reconstruir
  su texto en HTML — mismo criterio que los hero 2 y 3. El copy completo va en un bloque
  `.mn-visually-hidden` para lector de pantalla.
- Cada ángulo la viste con su motivo: energía, halo ámbar detrás; memoria, la pila de tarjetas del
  hero (reutiliza `.mn-deck`).

| Fichero | Origen | Uso |
|---|---|---|
| `landings-mimanad-bono-energia.webp` | `energia/assets/bono-landing.jpeg` | Sección bono de energía · 1050 q80, 89 KB, sin `?width=` |
| `landings-mimanad-bono-memoria.webp` | `memoria/assets/bono-landing.jpeg` | Sección bono de memoria · 1050 q80, 100 KB, sin `?width=` |
| `banner-formulario-energia-mimanad.webp` | `energia/assets/bono-formulario.jpeg` | Banner del formulario de Releasit · 1280×464, 50 KB |
| `banner-formulario-memoria-mimanad.webp` | `memoria/assets/bono-formulario.jpeg` | Banner del formulario de Releasit · 1280×464, 60 KB |

**Banner del formulario por ángulo.** Cada landing declara `data-rsi-banner="mimanad-energia"` o
`"mimanad-memoria"` en su raíz, y `shared/releasit-form.css` sustituye con `content: url()` lo que pinta
el bloque de imagen global de la app (mismo mecanismo que `cabello` en SKNGLOW). El de memoria trae
esquinas redondeadas horneadas sobre blanco (radio ~16px a 1280, ~5px en el modal): el radio CSS de 12px
del bloque las tapa. ⚠️ **`check-cdn.sh` no ve estos dos ficheros**: se referencian desde la skin, no
desde la landing. Y la skin hay que pegarla de nuevo en la pestaña de CSS de Releasit.

### Hero — decisiones medidas

- **Flechas a los lados de la foto, sin puntos ni contador visible** (el contador queda para lector de
  pantalla). La primera versión llevaba una banda de controles debajo y la foto a ancho completo: el
  CTA caía a **778 px** a 390. Con las flechas fuera de la foto baja a **652 px** (cabello: 692).
  Medido: 320 → 587 · 360 → 627 · 390 → 652 · 428 → 676. Sin desbordamiento en ninguno.
- Orden: titular → slider → compra (precio + anticipado + CTA + confianza) → fórmula en celdas → datos.
  La fórmula y los datos van debajo del CTA: son detalle y arriba lo empujaban.
- Nada superpuesto a las fotos: ni rótulo, ni tarjeta montada encima (el patrón de cabello taparía el
  frasco y los dulces del hero 1).

### Carrete de la comunidad (Parte 2) — propio, no la galería de SKNGLOW

El usuario lo pidió explícitamente: todas las landings tenían el mismo carrusel tras el hero. Aquí es
un **carrete con foco** (`.mn-reel`):

- La tarjeta centrada manda; las laterales se encogen (0.82), se atenúan (0.5), bajan 14px y se
  **inclinan hacia el centro** (5°), como una mano de cartas abierta.
- Cada foto lleva el **nombre real** en una banda bajo la imagen, nunca encima (ahí está el frasco).
- Debajo, **una batería con una celda por persona** que se carga hasta la que está al centro, del ámbar
  al berenjena. Cada celda es un botón que lleva a su persona.
- Arranca con la **segunda persona al centro** (`REEL_START_INDEX`) para que haya tarjetas a los dos
  lados desde el primer vistazo.

Cómo está hecho, y por qué así:
- El JS solo escribe `--mn-focus` (0–1) y `--mn-lean` (±1) **en el `<li>`**, por fotograma de scroll
  con `requestAnimationFrame`. La tarjeta (`<figure>`) es la que se transforma: si se midiera el
  mismo nodo que se escala, la medida se contaminaría con su propia escala.
- La unidad de distancia es la separación real entre centros de dos tarjetas (`offsetLeft`), no un
  número fijo: vale en cualquier ancho.
- La sombra es un `::before` del `<li>` que **solo cambia de opacidad**: animar `box-shadow` en cada
  fotograma obligaría a repintar.
- Sin JS: variables a 1, tarjetas enteras y un carril que desliza; la batería queda oculta (`hidden`)
  porque sus botones no harían nada.
- `prefers-reduced-motion`: sigue al dedo (es manipulación directa) pero sin inclinar ni desplazar.
- 🔴 El tramo berenjena de las celdas (`nth-child(n + 6)`) lleva la clase doblada: `check-css-merge`
  detectó que GemPages lo subía por encima del violeta al fusionar cuerpos iguales.

### Verificación hecha

- `check-css-merge.mjs`: 22 fusiones simuladas, **sin cambios de estilo** a 390 y 1280.
- Contraste computado a 390: todo AA. El único aviso (segmento activo del mecanismo) es un falso
  positivo: su fondo berenjena lo pinta `::before`, que la sonda no ve.
- `.mn-headline` va en px y no en `ch`: el `ch` se mide con los 16px del contenedor y en escritorio
  partía los titulares en cuatro líneas.

---

## 8. 🔴 Pendiente antes de publicar

1. **Subir los 30 ficheros** `landings-mimanad-*.webp` a Contenido → Archivos con el nombre exacto.
   `./check-cdn.sh mima/landings/mimanad/energia/august.html` dice cuáles faltan.
2. **Handles** `mimanad-energia` y `mimanad-memoria` ya están en `paid_landings_config` de los dos
   layouts. Falta pegar los layouts en el tema y subir `landings-og-mimanad-energia.jpg` y
   `landings-og-mimanad-memoria.jpg` a Archivos.
3. **Formulario de Releasit**: banner propio por ángulo resuelto (§7). Falta decidir si el bump
   MIMACALM y el upsell aplican aquí — el upsell hoy **es** MIMANAD.
4. **`PREPAID_ENABLED`** está en `false`, como en SKNGLOW: el sticky y el botón del selector se
   comportan como contraentrega. Confirmar para este producto.
5. Logo de Infobae.
6. **`NSA-0009109-2020`** sale de la etiqueta antigua (la de 3 dulces por porción). Confirmar que sigue
   vigente antes de publicarla en el pie y en la confianza del pago.
7. El pie no lleva fabricante: en SKNGLOW es Vitaliah S.A.S., pero no hay dato para MIMANAD.

---

## 9. Ángulo memoria — qué lo separa de energía

Mismo producto, precio, paleta y reglas (copy manda, nombres reales del UGC). **Distinto
diseño**: el motivo es **la conexión** —nodos que se unen, como una idea que vuelve— y el color que
manda es el **violeta**; el ámbar queda de acento puntual.

| Pieza | Energía | Memoria |
|---|---|---|
| Hero | Slider con flechas a los lados | **Pila de fotos**: dos tarjetas giradas asoman detrás de la foto (pseudo-elementos, nunca encima). Flechas a los lados |
| Fórmula del hero | Batería de tres celdas | **Tres nodos unidos** por un eje |
| CTA | "La carga", ámbar, 4 saltos | **"La conexión"**, violeta: dos mitades nacen en los extremos y se encuentran en el centro. `--mn-cta-base` `#893889` (7.0:1) y `--mn-cta-glow` `#a151a5` (4.9:1) |
| Carrusel UGC | Carrete con foco + batería | **Muro de recuerdos**: polaroids en dos filas que derivan en sentidos opuestos, nombre en el margen blanco. Se para al tocarlo y fuera de pantalla |
| Bandas oscuras | Cielo de la tarde (ámbar → berenjena) | **La red**: berenjena con resplandores violeta y una trama de nodos |
| Promesa | Cuatro paradas y un sol | Cuatro escenas como **nodos que se encienden** en secuencia |
| Mecanismo | Navegador de celdas + carril | **Tríada**: tres nodos con la foto de cada ingrediente en triángulo; cada uno resalta su ficha, las tres visibles |
| Beneficios | Zigzag sobre la guía del día | **Libreta**: notas de papel rayado con foto prendida y casillas que se marcan |
| Constancia | Batería que se llena | **Red que se tupe**: 3, 5 y 8 conexiones |

Detalles técnicos que importan:
- **Lo que se enciende al entrar arranca visible.** El JS lo "arma" (`is-armed`, apagado) solo si hay
  IntersectionObserver para encenderlo después (`is-in`). Sin JS nada queda a medias.
- La tríada coloca los nodos con la propiedad **`translate`** y los hace crecer con **`scale`**: son
  independientes de `transform` y no se pisan.
- El muro repite cada serie una vez (la copia `aria-hidden`) y se desplaza `-50%`: bucle sin costura.
  El hueco final de cada serie iguala al interior, o el salto se nota. Con movimiento reducido se
  queda quieto, se desliza a mano y la copia desaparece.

### Imágenes nuevas de memoria

| Fichero | Origen | Nota |
|---|---|---|
| `mem-hero-1` | `memoria/assets/img_hero_1.png` | 1050 q70, 76 KB, sin `?width=`. Reutilizado en el cierre (caché) |
| `logo-infobae`, `logo-lavanguardia` | logos de memoria | Recortados al contenido y con margen de **su propio color**; al de La Vanguardia se le quitaron 16px del borde derecho (traía una línea clara) |
| `story-catalina` ← Catalina (5) · `story-camila-m` ← Camila (10) | UGC | **Volteadas con `-flop`**: selfies con la etiqueta en espejo ("+DAN") |

El resto se reutiliza de energía. Todas las demás de `memoria/assets/` son **idénticas byte a byte** a
las de `energia/assets/` (comprobado por md5). El logo de Infobae se incorporó también a energía,
donde estaba pendiente.

Testimonios: Marcela → **Catalina · Bogotá**, Felipe → **Luis Alejandro · Medellín**, Diana → **Camila
· Cali**. Bono y banner del formulario: ver §7.

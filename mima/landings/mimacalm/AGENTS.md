# AGENTS.md — MIMACALM

Contexto de producto. Hereda de `/AGENTS.md` (global) y de `/mima/AGENTS.md` (marca), y **manda sobre
los dos** en caso de conflicto.

---

## 1. El producto

**Polvo sabor sandía** de **Ashwagandha Wanda™ + Glicinato de Magnesio + Extracto de Té Verde**.
Presentación: **400 g, 1 cucharada (15 g) al día en 240 ml de agua, aproximadamente 27 porciones**.
Se prepara frío, con hielo o caliente. Es el único producto de la marca que **no es un dulce duro**:
todo lo visual gira alrededor de la cucharada, el vaso y el agua.

| | Anticipado | Contraentrega |
|---|---|---|
| Precio | **$79.900** (ahorras $10.000) | **$89.900** |

Envío gratis a Colombia, entrega 3–5 días hábiles, +1.400 clientes, confirmación por WhatsApp.
Además es el **order bump de SKNGLOW** a $39.950 (copy en `sknglow/piel/order_bump_upsell.md`).

Handle en Shopify: **`mima-calm`** (variante `44333360545932`, $89.900). Existe también
`mima-calm-sueno-black-friday` a $79.900 (campaña vieja; no se usa).

### Lo que dice la etiqueta (y no el copy)

La etiqueta del frasco dice "Mezcla en polvo para preparar bebida a base de hierbas aromáticas
fortificada con vitaminas y minerales con té verde, té negro y glicinato de magnesio · Sabor artificial
a sandía · 400 g · 27 porciones aprox." y trae el octógono **"Contiene edulcorantes — MinSalud"**. El
registro no se lee en la etiqueta: lo dio el cliente el 2026-09-14 — **Registro INVIMA RSA-0245-2025**,
fabricado por Vitaliah S.A.S. (Calle 24 B N° 26-06, Bogotá), atención al cliente 300 696 4582. Va en
la confianza del pago y en el pie de las dos landings. El copy manda en todo lo demás.

Los copys de MIMACALM **no traen disclaimer legal**: el pie usa el estándar de suplemento de la marca
(el mismo de MIMANAD con el nombre cambiado) y "Contiene edulcorantes". En el copy de sueño hay una
errata ("TÉ VERcDE") que se corrige sin más.

---

## 2. Ángulos

| Carpeta | Promesa | Estado |
|---|---|---|
| [`sueno/`](sueno/) | Despierta con la calma que tu noche te debía | **Construida, sin publicar** — copy en `sueno/Copy - Sueño - Landing Mimacalm.txt` |
| [`cuerpo/`](cuerpo/) | Que el día no se te quede pegado al cuerpo | **Construida, sin publicar** — copy en `cuerpo/Copy - Cuerpo - Landing MIMACALM.txt` |

Las láminas crudas llegaron en `sueno/assets/` y `cuerpo/assets/`; las optimizadas van a
[`assets/`](assets/) con prefijo `landings-mimacalm-`. Cuatro ficheros son idénticos entre las dos
carpetas (los tres ingredientes y `mecanismo.png`, comprobado por md5) y se optimizaron una vez.

El orden de secciones **sigue el orden del copy de cada ángulo**, que no es el mismo: en sueño el
respaldo va después de los testimonios; en cuerpo va antes del modo de uso.

---

## 3. Público y piel visual — lo que lo separa de SKNGLOW y de MIMANAD

Producto para **hombres y mujeres** (el UGC son 4 hombres y 7 mujeres). **La paleta sale del frasco,
no del manual**: etiqueta azul marino, tapa blanca y la bebida color sandía. La web viva presenta el
producto dentro del tema lila/magenta de la tienda; la landing no lo hereda porque el cliente pidió
expresamente que este producto tenga su propio color.

Paleta medida por cuantización sobre `hero-3` de sueño (etiqueta, tapa, vaso, mármol) y comprobada
contra blanco:

| Token | Hex | Contraste | Origen · uso |
|---|---|---|---|
| `--mc-navy-deep` | `#09172c` | 17.9:1 | Sombra de la etiqueta · bandas de noche, texto principal |
| `--mc-navy` | `#1d3152` | 13.0:1 | Etiqueta · titulares, color de marca |
| `--mc-navy-soft` | `#3e4c69` | 8.6:1 | Etiqueta con luz · texto secundario, bordes fuertes |
| `--mc-muted` | `#5d6577` | 5.8:1 | Texto atenuado (el `#6f798c` medido queda para decoración) |
| `--mc-melon` | `#e46964` | 3.2:1 | La bebida · **solo decorativo o texto grande** |
| `--mc-melon-deep` | `#b83a36` | 5.7:1 | **CTA en reposo** y acentos con texto |
| `--mc-melon-wash` | `#c94a45` | 4.6:1 | El lavado que recorre el CTA: sigue AA con el texto encima |
| `--mc-melon-light` | `#ee9590` | 8.0:1 sobre `navy-deep` | Acento sobre las bandas oscuras |
| `--mc-mist` | `#dde2e9` | — | Las ondas azules del hero 1 · tintes fríos (sueño) |
| `--mc-sand` | `#d1beb3` | — | El mármol · tintes cálidos (cuerpo) |

El **sandía es el color del CTA** en los dos ángulos: es lo único cálido de la página y es la bebida.
Ojo con `--mc-melon-light` sobre `--mc-navy-soft`: se queda en 3.8:1 (el rótulo del segundo cuarto del
dimmer va en `#ffd0cd`, 5.8:1). Sobre `--mc-navy-deep` sí llega.

⚠️ `--mc-stars` son **cinco** degradados radiales: `background-size` necesita cinco valores (o la lista
se recicla y trocea el degradado de la noche en franjas de 140px; pasó en el bono).

### Motivos, uno por ángulo

| Pieza | Sueño — "apagar el día" | Cuerpo — "soltar" |
|---|---|---|
| Tintes | Fríos: bruma azul, bandas de noche con estrellas | Cálidos: arena y mármol, bandas azul liso |
| Hero | Foto sobre una **ventana de noche** (panel marino con estrellas asomando detrás) | Foto sobre una **repisa** (banda de arena tras el tercio inferior) |
| Fórmula del hero | **Fases de la luna**: creciente, media y llena, una por ingrediente | **Tres zonas**: mente, hombros, estómago |
| CTA | **"La disolución"**: la cucharada toca el agua y el color sandía se extiende desde la izquierda | **"Soltar el nudo"**: una banda tensa en el centro se afloja hasta llenar el botón |
| Carrusel UGC | **Ventanas encendidas**: fotos como ventanas en un edificio de noche; la del centro está iluminada y avanza sola | **El tendedero**: fotos colgadas de una cuerda con pinza, que se balancean; la del centro se endereza |
| Problema | **La madrugada**: un reloj cuyas manecillas avanzan con cada pensamiento; la banda amanece al final | **El mapa de la tensión**: silueta con cuatro puntos (mandíbula, cuello, hombros, estómago) que se encienden |
| Fórmula | **El volumen**: el cerebro con un medidor que baja de 8 a 2 barras según entran los ingredientes | **La columna**: tres nodos sobre un eje vertical, uno por zona |
| Constancia | **El dimmer**: tres cuartos que se oscurecen de día a noche, con la lámpara cada vez más baja | **El nudo que se afloja**: tres cuerdas, de nudo apretado a línea suelta |
| Modo de uso | Tres pasos con foto y el **minuto** como aro que gira | Los mismos pasos, con los **tres momentos** del día |
| Cierre | **El amanecer**: la banda va de noche a luz | Banda marina con resplandor sandía |

Regla común: la lámina del bono y los hero 2 y 3 se usan **tal cual**, sin reconstruir su texto en
HTML. Nada superpuesto a la foto del producto.

---

## 4. Convenciones de código

- **Prefijo `mc-`.** Raíz `.mc-lp` con `id="mc-mimacalm"`. Todos los selectores cuelgan de `.mc-lp`,
  todos los IDs empiezan por `mc-`.
- Mismas constantes que SKNGLOW y MIMANAD al inicio del script: `ROOT_SELECTOR`, `READY_FLAG`
  (`mcLandingReady`), `PREPAID_ENABLED`, `PRICES`, `CTA_LABELS`.
- Mismo selector de pago (escribe `data-sg-pay` en `<html>`; el nombre es de la skin de Releasit).
- Todo en `px`, nunca `rem` (§9.5 global). Modificadores con la base en el selector (§4.13 global).
- Lo que se enciende al entrar **arranca visible**; el JS lo arma (`is-armed`) solo si hay
  IntersectionObserver y lo enciende después (`is-in`). Sin JS nada queda a medias.
- Fichero de campaña: `september.html` (los copys no traen mes; se construyeron en septiembre de 2026).

---

## 5. Assets — qué se usa y cómo

37 ficheros `.webp` en [`assets/`](assets/), 2,0 MB (los originales sumaban ~48 MB), más las dos
imágenes sociales `landings-og-mimacalm-*.jpg`. Todos con `-strip`.

| Fichero | Origen | Dónde | Cómo se sirve |
|---|---|---|---|
| `sueno-hero-1..3`, `cuerpo-hero-1..3` | `img-*-hero.png` de cada ángulo | Slider del hero (el 1 vuelve en el collage del cierre) | 1050 px q70, **sin `?width=`** — 68 a 97 KB |
| `brain` | `mecanismo.png` (cerebro con la zona del estrés encendida) | Fórmula, los dos ángulos | 900 px q78 |
| `ashwagandha`, `magnesio`, `te-verde` | los tres PNG de ingredientes, aplanados sobre blanco | Fichas de la fórmula | 800 px q80, `?width=` |
| `logo-cnn`, `logo-infobae`, `logo-lavanguardia` | logos de cada ángulo | Respaldo (CNN solo en sueño, La Vanguardia solo en cuerpo) | 600 px q85, `?width=300` |
| `bono-sueno`, `bono-cuerpo` | `img-bono-*.png` | Sección bono | 1050 q80, sin `?width=` |
| `banner-formulario-sueno-mimacalm`, `banner-formulario-cuerpo-mimacalm` | `img-formulario-*.png` | Banner del formulario de Releasit | 1280×464 q80 |
| `ugc-*` | `/humanized-images/mimacalm/`, ver §6 | Ventanas, tendedero, modo de uso, testimonios, cierre | Nativas (505–646 px) q84; la de cámara de Camila a 800 q80 |

- Instagram, logos de MIMA y medios de pago se **reutilizan de SKNGLOW** (`landings-sknglow-*`). El
  `feed instagram mima.png` que llegó con las láminas es el mismo perfil con otro recorte: no hace
  falta subirlo.
- El CNN traía transparencia: se aplanó sobre su propio rojo.
- `UGC Camila Logistica (2).JPG` es de cámara (3088×2316, orientación EXIF 6): hay que pasarla por
  `-auto-orient` o sale tumbada.

---

## 6. Prueba social y autoridad

- **Nombres de los testimonios = nombre real del fichero de UGC**, nunca el del copy. Pool: Alejandra,
  Andrés Iglesias, Camila, Camila (Logística), Carlos Aristizábal, Catalina, Génesis Melodía, José
  Fernando, Luis Alejandro, Natalia Portelo, Shelyka.
- Los tres testimonios de cada copy están escritos en femenino ("acelerada", "ligera"): van con las
  mujeres del pool. Los hombres llevan el carrusel, el modo de uso y el cierre.
- **Etiqueta en espejo** (selfies con cámara frontal): Catalina (4)(6), Génesis (3)(5) y Natalia
  (11)(6) se voltearon con `-flop`. Se comprobó recortando la etiqueta a 2×: el resto lee "MIMACALM"
  correctamente.

Reparto (fichero ← frame):

| Sección | Sueño | Cuerpo |
|---|---|---|
| Carrusel UGC | camila-l-2 (HEIC de cámara) · carlos-3 (13) · alejandra-2 (2) · jose (1) · genesis-2 (5) · luis (4) | camila-l-1 (1) · carlos-2 (12) · natalia-1 (11) · andres-2 (5) · catalina-1 (4) · jose (1) |
| Modo de uso | andres-1 (3, cuchara) · genesis-1 (3, mezcla) · catalina-2 (6, toma) | carlos-1 (11, cuchara) · shelyka-2 (10, mezcla) · luis (4, toma) |
| Testimonios | Laura → **Natalia Portelo · Bogotá** (11) · Valentina → **Catalina · Medellín** (4) · Daniela → **Alejandra · Cali** (ALEJANDRA) | Laura → **Camila · Bogotá** (12) · Valentina → **Shelyka · Medellín** (1) · Daniela → **Génesis Melodía · Cali** (5) |
| Qué recibes | hero-2 + camila-l-2 | hero-2 + alejandra-1 |
| Cierre (collage) | hero-1 al centro · camila-l-1 · carlos-1 | hero-1 al centro · alejandra-2 · carlos-3 |

- **Infobae, CNN en Español y La Vanguardia no son avales.** Son publicaciones sobre los ingredientes.
  La tercera ficha de cada respaldo no trae medio en el copy: va sin logo, con el rótulo "Investigación".

---

## 7. Bono y banner del formulario

Igual que en MIMANAD: la lámina va tal cual entre el pago y los testimonios, con el copy completo en
un bloque `.mc-visually-hidden`; "Qué recibes" lleva la línea de la guía. Cada landing declara
`data-rsi-banner="mimacalm-sueno"` o `"mimacalm-cuerpo"` en su raíz y `shared/releasit-form.css`
sustituye el banner con `content: url()`. ⚠️ `check-cdn.sh` no ve los dos banners (se referencian
desde la skin) y la skin hay que volver a pegarla en Releasit.

---

## 8. 🔴 Pendiente antes de publicar

1. **Subir los 37 ficheros** de [`assets/`](assets/) a Contenido → Archivos con el nombre exacto.
   `./check-cdn.sh mima/landings/mimacalm/sueno/september.html` dice cuáles faltan (menos los dos
   banners del formulario, que hay que subir igual).
2. **Crear las páginas en GemPages** y confirmar sus handles. Los layouts del tema ya llevan
   `mimacalm-sueno` y `mimacalm-cuerpo` en `paid_landings_config`, con `landings-og-mimacalm-sueno.jpg`
   y `landings-og-mimacalm-cuerpo.jpg` en [`assets/`](assets/). Si el handle final es otro, cambiar la
   línea del tema y el nombre de la imagen.
3. **Pegar `shared/releasit-form.css`** en la pestaña de CSS de Releasit (banners nuevos).
4. **`PREPAID_ENABLED`** está en `false`, como en el resto de la marca.
5. **Ofertas de cantidad de Releasit**: si la página es de `/pages/`, el formulario necesita el
   `initReleasitProductCache()` documentado en `docs/releasit-form-styling.md` para pintar las ofertas.
   No está en estas landings porque no hay oferta de cantidad definida para MIMACALM.
6. **Carrito compartido entre landings del mismo producto**: pendiente el `initCartReset()` acordado
   (ver conversación del 2026-09-11); aplica también aquí cuando se implemente.

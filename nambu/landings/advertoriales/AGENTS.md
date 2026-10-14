# AGENTS.md — NAMBU · ADVERTORIALES DEL SPRAY NASAL

Contexto del formato. Hereda de `/AGENTS.md` y de [`../../AGENTS.md`](../../AGENTS.md), y **manda sobre
los dos** en caso de conflicto. El producto es el mismo de [`../spray/`](../spray/AGENTS.md): sus datos
(60 ml, uso, precio, claims, INVIMA, personas reales) salen de ahí y no se repiten aquí.

---

## 1. Qué es

**Anuncios redactados y compuestos como un artículo de prensa** que venden el Spray Nasal de Nambu: el
lector llega desde un anuncio a un texto que explica un problema, y el producto aparece dentro del
relato. No son landings de venta con otra piel: el orden lo pone el artículo y lo que se ve es
**texto y fotografía con pie**, no secciones con iconos.

Sustituyen a los advertoriales publicados hasta octubre de 2026, que eran el problema que este
repositorio viene a arreglar: un «neumólogo» y un autor inventados, claims médicos (desinflamar,
bronquitis, neumonía), contador y «50% OFF» falsos, un testimonio con nombre, edad y ciudad sin
respaldo, «30 ml» en un frasco de 60 y un pie legal de otra tienda.

🔴 **Todo artículo se declara como contenido de la marca.** El antetítulo del copy («Contenido editorial
de Nambu», «Contenido publicitario de Nambu») va arriba del titular y no se quita: el **logotipo hace de
la palabra «Nambu»** (su `alt` la conserva) y es la única cabecera de la página. No hay autor, fecha,
médico ni medio que no existan.

---

## 2. Artículos

Los cinco están construidos (2026-10-05).

| Carpeta | Tema | Ficha donde se publica | Página anterior (de ahí salen escenas) |
|---|---|---|---|
| `flema/` | La ruta nariz–garganta (goteo posnasal) | **Publicado** en `/blogs/noticias/flema-spray-nasal-nambu` (2026-10-06); el formulario va contra `spray-nasal-general` | `/products/lung-cleansig-bg-3` |
| `sinusitis/` | Qué frena el drenaje | `/products/advertorial-sinusitis-lung-cleansing` (`53249595703456`) | La misma |
| `capitales/` | El aire de cuatro capitales | `/products/advertorial-general-capitales-lung-cleansing` (`53256640135328`) | La misma |
| `alergias/` | La rinitis deja pistas en la casa | **Por definir** | No hay |
| `neumonia/` | La recuperación tras una neumonía | **Por definir** | No hay |

El copy de cada uno es `<carpeta>/copy_adv_<carpeta>_spray.txt`. Todos venden a $79.900.

---

## 3. La línea visual: la de la marca, en formato de artículo de prensa

La paleta, la tipografía y el CTA son los de `/nambu/AGENTS.md` §2: verde manzana y blanco, Questrial en
un solo peso, «el disparo». Lo que cambia es la composición:

- **Sin cabecera.** Arriba solo va el antetítulo con el logotipo, sobre un filete (cliente, 2026-10-05).
- **Una columna de lectura de 680 px**, cuerpo de 18 px (19 desde 700 px) e interlineado 1,62. El copy va
  en frases cortas, una por párrafo: el ritmo lo pone el margen.
- **Encabezado de artículo**: antetítulo, titular, entradilla, los minutos de lectura (medidos sobre el
  copy, no inventados) y las fuentes: con su logotipo si se entregó (solo Cleveland Clinic), con su
  nombre si no. Debajo, **la foto que abre**, a sangre en móvil: es el LCP.
- 🔴 **Fotografía, no iconografía** (cliente, 2026-10-05: la primera versión *"se siente mucha
  iconografía, no hay prácticamente ninguna foto de UGC"*). No hay iconos ni esquemas dibujados: nada de
  rejillas de factores, pistas con pictograma ni barras comparativas. Lo que el copy enumera va como
  texto; lo que se puede enseñar, con una foto y su pie.
- **Antes de presentar el producto, escenas y placas; después, producto y personas reales.** El producto
  no aparece en ninguna imagen hasta el titular con `reveal: true`.
- **La barra de compra es un solo componente.** En móvil es una barra fija abajo que **sale cuando el
  artículo ya presentó el producto**. En escritorio (≥ 1140 px) es la tarjeta del margen derecho, pegada
  al hacer scroll y visible desde el principio.
- **Barra de progreso de lectura** de 3 px arriba.
- **Sin números en tarjetas, sin secciones oscuras, sin serif** (cliente, 2026-09-21).

### Los recursos tipográficos

Con qué bloque se cuenta cada cosa del copy, sin iconos:

| Bloque | Para qué |
|---|---|
| `pull` / `key` / `shout` | La frase que el copy destaca (`###`, negrita sola en su línea), la idea que cierra un tramo, la interjección |
| `beats` | Frases cortas en cadena, apiladas; con `closing` (por defecto) la última cierra en verde |
| `run` | Palabras sueltas seguidas en un renglón («Colchón. Almohadas. Cobijas.») |
| `rows` | Frases una por línea entre filetes: preguntas, medidas, lo que el producto no hace |
| `term` | El término que nombra el problema, con lo que explica la fuente |
| `stat` | La cifra que el copy pone en negrita, en grande, delante del párrafo que la explica |
| `heading` con `chapter` | Abre un capítulo (una ciudad, una pista): filete encima y el nombre en verde con `<em>` |
| `caution` | Cuándo consultar y lo que el producto no hace. No se recorta ni se baja de sitio |

### Las tres clases de imagen

| Clase | Qué es | Cómo se marca |
|---|---|---|
| **Escena** | Ilustra el problema (alguien carraspeando, la ciudad con bruma, una consulta). No es un cliente | Pie **«Imagen de referencia.»** (`REFERENCE_NOTE`). Nunca firma un texto ni sostiene el producto |
| **Producto** | El frasco solo (bodegón, o con las tres plantas) y la pareja de la landing del ángulo | Pie con una frase del copy, si lleva |
| **Persona real** | El pool de UGC de `spray/src/lib/pool.mjs` | **Su nombre sobre la foto** (`lib/ugc.mjs`): es lo que la distingue de una escena |

🔴 **El producto solo sale de las fotos de las landings.** Son las únicas con la etiqueta real
(«Cont. Neto: 60ml»). Las fotos de producto de los advertoriales anteriores —el frasco entre hojas, los
bodegones sobre verde o gris— dicen **«Cont. Neto: 30ml»**, y la del frasco sobre el mesón trae texto
ilegible en la etiqueta: contradicen a un artículo cuyo argumento es «60 ml, el doble de 30». Comprobado
ampliando cada etiqueta el 2026-10-05. De esas páginas se toman **solo las escenas**.

Las escenas **son archivos que la tienda ya tenía publicados** y se usan con su nombre: no hay copia en
el repo. Están declaradas en `src/lib/photos.mjs` y listadas en `store-files`, que es lo que lee
`check-cdn.sh`. No se reutilizan las fotos de esos mismos personajes aplicándose o enseñando el frasco
(eso lo hacen las personas reales), ni sus retratos de «autor», ni las de consulta con inhaladores o
tomografías. De la página de sinusitis tampoco la imagen que la abre (cliente, 2026-10-05).

**Tres aperturas las entregó el cliente** (2026-10-13) y sustituyen a la escena que abría flema,
sinusitis y alergias. No son archivos de la tienda: están optimizadas en `../spray/assets/` como
`landings-spray-adv-*.webp` y **se suben a Contenido → Archivos** igual que cualquier otra. Los originales
están en `product-images/spray/advertoriales/<artículo>.jpeg`.

- **Flema** (`scene-phlegm`): una flema con sangre sobre un mesón. ⚠️ El propio copy manda a consultar a
  un profesional «si aparecen […] fiebre, sangre, dolor en el pecho»: la foto que abre enseña justo esa
  señal. Es decisión del cliente; se le avisó el 2026-10-13.
- **Sinusitis** (`sinus-xray`): una radiografía con los rótulos dentro de la imagen. Va **entera** —los
  rótulos llegan a los bordes y cualquier recorte los corta— y **sin duotono**: uno dice «el aire es negro
  en el RX» y teñida el negro saldría verde. Mide 696 px de ancho: en escritorio y en pantallas de alta
  densidad se ve blanda; si aparece el original a más tamaño, se sube como `-v2`.
- **Alergias** (`scene-pressure`): una mujer que se aprieta el puente de la nariz.

Las tres escenas que abrían antes (`scene-cough`, `scene-tinto`, `scene-morning`) siguen declaradas en
`photos.mjs` y hoy no las usa ningún artículo.

### La única ilustración

Un artículo puede llevar **una** figura explicativa que pague el titular, y va sobre una fotografía. Hoy
solo la tiene flema: **la ruta nariz–garganta dibujada sobre la placa de vías aéreas**, con un trazo
punteado, tres paradas rotuladas y una gota que lo recorre. El marco es 4:3 con la placa anclada abajo,
para que el dibujo (`lib/art.mjs`, lienzo de 712 × 534) caiga sobre la anatomía; si se cambia el
recorte, se recolocan las paradas. En los demás, las placas van sin dibujo.

### Qué imágenes lleva cada artículo

| | Abre | Antes del producto | Producto | Personas (fuera de los testimonios) | Oferta |
|---|---|---|---|---|---|
| **flema** | Foto de la flema (cliente) | La ruta sobre la placa; escena de la noche | Frasco solo + tres plantas | Carlos Mauricio (aplica), Genésis (60 ml), secuencia Catalina · Catalina · Marcos | Pareja de flema |
| **sinusitis** | Radiografía rotulada (cliente) | Tomografías de senos; ilustración de los senos | Frasco solo + tres plantas | Carlos Mauricio (aplica), Andrea (60 ml), secuencia Catalina · Catalina · Marcos | Pareja de sinusitis |
| **capitales** | Escena del balcón | Escena del valle con bruma (Medellín); placa de vías | Frasco solo + tres plantas | Catalina (aplica), Camilo (60 ML) | Pareja general |
| **alergias** | Mujer con presión en la nariz (cliente) | Placa de vías | Frasco con las tres plantas | Catalina (aplica), Camilo (60 ml) | Pareja de alergias |
| **neumonia** | Placa de pulmones | — | Frasco con las tres plantas | Catalina (aplica), Marcos | Frasco solo |

- **Alergias y neumonía no tienen página anterior**: llevan imágenes de las landings. La única excepción
  es la foto que abre alergias, que entregó el cliente.
- **En neumonía el producto no va junto a ningún esquema de pulmones**: el artículo insiste en que el
  spray es para la nariz y no trata la neumonía, y las parejas de las landings llevan ese holograma.
- En el texto de los capítulos de alergias (las cuatro pistas) no hay imágenes: no existe ninguna foto
  de la casa. Si llegan, van una por pista.

---

## 4. Reglas del copy

- **Los textos van tal cual.** En `src/articles/<id>.mjs` solo se decide con qué bloque se cuenta cada
  parte. Los pies de figura y rótulos se arman con frases del propio copy.
- **Lo que no está en el copy no entra**: ni anticipado, ni INVIMA, ni garantía, ni cifras. Cada artículo
  dice el pago con sus palabras («Pagas cuando recibes tu pedido», «…en casa»): `trustLine()` las repite
  bajo el CTA.
- **Ningún rótulo propio.** Las preguntas del copy van como preguntas, sin «marca las que te pasan» ni
  veredicto («tienes goteo posnasal»).
- **La sección de cuándo consultar no se recorta ni se baja de sitio.**
- Una cifra y su unidad no se separan al partir línea en las frases grandes (`60&nbsp;ml`).

### Testimonios

🔴 Los copys los traen como **«REVIEW PARA ADAPTAR A TESTIMONIO REAL — [NOMBRE], [EDAD]»** o **«REVIEW
MODELO»** con nombre y edad de ejemplo y la nota *«Publicar únicamente asociado a una experiencia real
equivalente»*. Se aplica la decisión del cliente para las landings (`/nambu/AGENTS.md` §5): cada texto se
asigna a **una persona real del pool de UGC, solo con su nombre**. Sin edades, sin ciudades, sin
estrellas. **Antes de publicar, el cliente tiene que confirmar cada texto con la persona que lo firma, o
sustituirlo por su testimonio real.**

- No repetir a quien ya firma otro texto en la landing del mismo ángulo (capitales cuenta como general).
- El género del texto manda («congestionada», «cansado», «mi esposa»).
- Siempre en carrusel, en móvil y en escritorio (`/AGENTS.md` §7). La foto de quien firma abre la tarjeta.

| Artículo | Firman | A tener en cuenta |
|---|---|---|
| flema | Andrea, Daniel, José Fernando | — |
| sinusitis | Carlos Aristizábal, Genésis, Camilo | — |
| alergias | Wilson, Andrés, Genésis | — |
| capitales | Daniel, Andrea, Wilson, José Fernando | 🔴 Cada texto dice **en qué ciudad vive** quien lo firma (Bogotá, Medellín, Cali, Barranquilla): tiene que ser verdad de esa persona o se cambia el texto |
| neumonia | José Fernando, Catalina, Carlos Aristizábal | 🔴 **Retenidos.** Los tres cuentan que quien firma **tuvo una neumonía**: con foto y nombre de una persona real, eso es atribuirle una enfermedad. Están escritos en el artículo con `hold` y el build no los publica; se sueltan quitando esa línea cuando haya testimonio confirmado |

---

## 5. Despliegue

Igual que una landing del spray en ficha de producto (`../spray/AGENTS.md` §4):

1. **Custom Code en una fila de ancho completo**, con las tres pestañas (`october.tab-html.html`,
   `.tab-css.css`, `.tab-js.js`).
2. **Product Element de GemPages al final**, enlazado al producto de la ficha: sin él, los CTA no abren
   el formulario.
3. El skin de Releasit ya va al final del CSS.

El formulario abre con la oferta de cantidad x2 y el Envío Prioritario marcados ($113.400). **Es
configuración deliberada del cliente** (2026-10-05): no se reporta como problema.

### En un artículo de blog

El cliente los publica como **artículo de blog de GemPages** (`/blogs/noticias/<slug>`), no en la ficha
anterior. Comprobado en vivo con flema el 2026-10-06: sale a todo el ancho, sin cabecera ni pie del
tema, y los CTA abren el formulario con el Product Element enlazado a un producto cualquiera del spray
(ahí, `spray-nasal-general`).

🔴 **La URL anterior no se redirige sola.** La publicidad activa apunta a la ficha vieja y Shopify **solo
aplica una redirección de URL cuando el origen da 404**: mientras el producto siga activo y publicado en
la tienda online, la redirección existe pero no hace nada. Hay que dejar libre la ruta —producto en
borrador o fuera del canal Tienda online, o cambiarle el handle **sin** marcar la redirección automática—
y después comprobar el 301. El producto que se retira no puede ser el que usa el formulario del artículo.

- **Las redirecciones de esta tienda conservan los parámetros** (`utm_*`, `fbclid`): medido el 2026-10-06
  sobre dos handles antiguos (`/products/lung-cleansing?utm_source=…&fbclid=…` llega con los dos).
- **Cada prueba sobre la ruta viva cuesta tráfico de pago.** La redirección se prueba antes con una ruta
  libre (`/products/prueba-<artículo>` → el artículo) y solo entonces se libera la ruta del anuncio.
- Al devolver un handle a su valor anterior, Shopify crea por defecto una redirección desde el
  provisional: no reutilizar ese nombre.
- En flema la ruta vieja **sigue sirviendo la ficha antigua** (2026-10-06): dos intentos de liberarla
  acabaron en 404 sin redirigir, así que la entrada guardada no coincide con la ruta o con el destino.

---

## 6. El generador (`src/`)

```
src/
├── build.mjs              # node nambu/landings/advertoriales/src/build.mjs [artículo…] [--no-derived]
├── articles/              # un archivo por artículo: textos del copy y orden de bloques
│   └── shared.mjs         # lo que repiten los cinco copys: CTA, precio, fórmula, barra de compra
├── blocks/                # prose, figures, product, voices, frame; index.mjs es el registro
├── lib/photos.mjs         # escenas, producto y placas, con su nombre de archivo
├── lib/ugc.mjs            # foto de una persona del pool con su nombre encima
├── lib/art.mjs            # la ruta que se dibuja sobre la placa
├── styles/article.css     # todo el CSS del formato
└── scripts/article.js     # progreso, entradas, carrusel, barra de compra
assets-from                # de qué producto toma las imágenes (lo lee check-cdn.sh)
store-files                # archivos de la tienda que se usan sin copia en el repo (ídem)
```

- **Depende del generador del spray** (`../spray/src/`), una sola fuente para las dos familias:
  `lib/` (CTA, `img`, pool de personas, medios de pago, logotipos) y `styles/shared/` (base y tokens,
  CTA, medios de pago, andamiaje de Releasit).
- **Un artículo nuevo** es un archivo en `articles/` y una línea en `articles/index.mjs`. Un bloque que
  falte se añade a `blocks/` y al registro; un `type` desconocido para el build.
- **`hold: '<motivo>'` en un bloque lo deja escrito pero fuera de la página**: el build lo salta y lo
  avisa por consola. Los ids de los demás bloques no cambian.
- **`product` es opcional**: sin él, la cabecera del fragmento dice que la ficha está por definir.
- **Una foto nueva** se declara en `lib/photos.mjs`; si es un archivo de la tienda, se añade también a
  `store-files`; si la entrega el cliente, se optimiza a `../spray/assets/` (`/docs/image-optimization.md`)
  y el original va a `product-images/spray/advertoriales/`. El marco de cada foto lleva su clave
  (`.ns-photo__frame--<clave>`): ahí se le fija el encuadre cuando hace falta (la foto que abre, las
  cuadradas en escritorio). `plate` la pinta en duotono; `still` la compone sobre un panel (el frasco
  nivelado a blanco).
- El JS repite los ayudantes de `spray/src/scripts/landing.js` (observador, carrusel, respaldo local de
  imágenes). Si se toca uno, se toca el otro.

### Comprobaciones antes de entregar

```sh
node nambu/landings/advertoriales/src/build.mjs
node shot.mjs --url=file://$PWD/nambu/landings/advertoriales/<id>/october.preview.html --width=360 --out=/tmp/a360.png --full
node check-css-merge.mjs nambu/landings/advertoriales/<id>/october.html --widths=360,390,1280
./check-cdn.sh nambu/landings/advertoriales/<id>/october.html
```

Estado de los cinco al 2026-10-05: sin scroll horizontal a 360, 390, 768 y 1280 px, los CTA en una
línea (la etiqueta del copy es más larga que la de las landings y en móvil el botón va más ceñido),
contraste AA sin fallos, fusión de GemPages sin cambios de estilo, sin vacíos ni ids duplicados, y todas
las imágenes publicadas.

Tras el cambio de aperturas del 2026-10-13: fusión sin cambios de estilo en los cinco y sin scroll
horizontal. **Faltan por subir** `landings-spray-adv-flema.webp`, `-presion-nasal.webp` y `-rx-senos.webp`.
El artículo de flema publicado en el blog sigue con la apertura anterior hasta que se vuelvan a pegar sus
pestañas HTML y CSS.

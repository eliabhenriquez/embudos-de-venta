# AGENTS.md — ETERMA

Contexto de marca. Hereda de `/AGENTS.md` (global) y lo sobrescribe en caso de conflicto. Cada producto
tiene su propio `landings/<producto>/AGENTS.md`, que es el que manda al final. Hoy existe uno:
[`landings/clorofull/AGENTS.md`](landings/clorofull/AGENTS.md).

Análisis hecho el 2026-09-01 a partir de `docs/branding.pdf` (una sola página: logo y variantes de
color, nada más), de etermacolombia.com y de las fotos de `product-images/`. Lo que dice "verificado"
se midió; lo demás está marcado como pendiente.

---

## 1. Qué es ETERMA

Marca colombiana de **bebidas funcionales líquidas** (botella de 1 litro, se toma con vasito medidor).
Vende directo por Shopify: **etermacolombia.com** (`w16ka8-bq.myshopify.com`). La idea comercial es
**una bebida por momento del día**: "Tu día ya tiene los momentos. Eterma pone la función en cada uno."

Es **el mismo operador que MIMA**: la etiqueta dice "Comercializado por Vitalcom Group Commerce SAS" y
en Shopify los productos llevan `vendor: Mima` o `Eterma3`. Consecuencia práctica: todo lo aprendido en
[`/mima/`](../mima/) sobre Releasit, GemPages y píxeles aplica aquí; **lo que no aplica es el tema** (§3).

**Público y tono según la web:** "hecho para la mujer que trabaja, madruga y se cuida". Tuteo, práctico,
lenguaje de hábito y constancia, cero milagro (un testimonio de la propia web: "No es milagro, pero sí se
nota cuando uno es constante"). El ángulo **olor** de CLOROFULL es unisex —el copy y el pool de UGC traen
hombres—, así que ahí el tono se mantiene cercano pero sin feminizar.

### Catálogo (precios vivos en la web, COP)

| Producto | Momento | Promesa en la web | Precio | "Antes" |
|---|---|---|---|---|
| **VITA-ADVANCE** | Mañana | Saciedad + digestión (proteína, fibra, verdes) | $79.900 | $179.800 |
| **ADVANCE** | Mediodía | Ligereza post-almuerzo | $69.900 | $179.800 |
| **CLOROFULL** | Tarde | "Tu pausa verde de 30 ml al día", frescura + hidratación | **$79.900** | $109.900 |
| **TODO EN UNO** | Diario | Piel, cabello, uñas y articulaciones | $69.900 | $179.800 |
| **MULTIBRINA X6** | Noche | Calma + descanso | $69.900 | $179.800 |
| **VALERIANA** | Puntual | Apoyo para noches difíciles | $69.900 | $139.900 |
| Kits x2/x3 (Día Liviano, Del Tinto a la Almohada, Duerme y Florece, Cuerpo en Su Punto, Piel Viva) | — | Combinaciones | $129.900–$139.900 | $229.000 |

⚠️ **Los "antes" son 1,4×–2,6× el precio real y no hay evidencia de que se hayan cobrado nunca.** Regla
global §7: descuento inventado, no. La landing usa el esquema del copy —**contraentrega $79.900 /
anticipado $69.900**— y no tacha $109.900 salvo que el cliente lo justifique.

**El catálogo está duplicado.** CLOROFULL existe cinco veces, presumiblemente una por funnel:

| Handle | Título | Variant ID | Estado |
|---|---|---|---|
| `clorofull™` | CLOROFULL™ | `63240614740337` | El de la PDP pública |
| `clorofull-1` | (CLOROFULL) | `63240614183281` | Descripción distinta ("Hidrata tu cuerpo…") |
| `clorofull` | CLOROFULL* | `64072619491697` | Creado 2026-06-17 |
| `clorofull-2` | CLOROFULL** | `64072664514929` | Creado 2026-06-17 |
| `clorofull-mal-olor` | CLOROFULL* | `63250970673521` | **El de la landing de olor.** Hoy `available: false` en Shopify |

Mismo SKU en todos (`V-SNP-CLFL-1000ML-LQD-ETM-MNT-V1-001`). **Decidido (2026-09-01): la landing de
olor vende `clorofull-mal-olor`, variant ID `63250970673521`.** Va a la constante de config del script,
no suelto en el HTML. Que figure `available: false` es cosa de activarlo antes de publicar, no de maquetar.

Order bump y upsell: **no hay copy, así que esta landing no los lleva.** Si el cliente los quiere, llegan
como `olor/order_bump_upsell.md`, igual que en SKNGLOW.

---

## 2. Identidad visual

### Paleta

**Decisión del cliente (2026-09-02): la paleta de las landings es la de etermacolombia.com, no la del
PDF.** La primera versión salió con los tonos del manual (crema, arena, marrón, ocre) y se descartó de
plano. El manual manda solo en el logo. Los valores salen del CSS de la tienda (esquemas de color del
tema y secciones custom de la home), leídos y capturados con `shot.mjs` el 2026-09-02:

| Token | Hex | Dónde lo usa la web | Uso en la landing | Contraste |
|---|---|---|---|---|
| `--et-green-deep` | `#0f2e20` | Foreground del tema, bloques oscuros de la home, botones "Agregar al carrito", fondo entero de la PDP | **Primario**: titulares, CTA, franja superior, bloque central, cierre | 13,4:1 sobre `--et-bg`; 14,7:1 con blanco |
| `--et-green-mid` | `#315b45` | Botón de testimonios, barra lateral de las citas | Hover del CTA, barra de las citas, autor | 7,1:1 sobre `--et-bg` |
| `--et-green` | `#496c56` | Botón del hero, eyebrows | Numeración, iconos, bordes activos, cursivas del titular | 5,4:1 sobre `--et-bg`; 5,9:1 con blanco |
| `--et-ink` | `#10251a` | Títulos y opciones del selector | Texto principal; fondo del pie | 14,8:1 sobre `--et-bg` |
| `--et-muted` | `#52715b` | Eyebrow editorial | Texto secundario y overlines | 5,0:1 sobre `--et-bg`; 5,4:1 sobre blanco |
| `--et-lime` | `#c2d85a` | Eyebrows y enlaces sobre verde profundo | Overlines en los bloques oscuros | 9,3:1 sobre `--et-green-deep` |
| `--et-mint` | `#dcf2dc` | Fondo de las fotos de producto en "Los más elegidos" | Caja de la foto del hero, celda de precio destacada, fila de Clorofull, pack recomendado, miniaturas | 12,4:1 con `--et-green-deep` |
| `--et-bg` | `#fffcf5` | Tarjetas de rutina y de soporte de la home | Fondo base (blanco hueso; el `#f8f5e9` de las secciones de la home se descartó por demasiado cálido) | — |
| `--et-bg-alt` | `#eff0f5` | Fondo del esquema 1 del tema y de "Los más elegidos" | Secciones alternas, cabecera de la tabla | — |
| `--et-surface` | `#ffffff` | Tarjetas, cabecera con el logo | Tarjetas, cabecera | — |
| `--et-border` | `#d7d5c9` | Bordes de tarjetas y filetes | Hairlines | — |

`#5f7867`, el gris verdoso que la web usa en texto secundario, se queda en 4,3:1 sobre el fondo y no
pasa AA a 12–14px: por eso `--et-muted` es `#52715b`, que también está en la web.

**Lo que no se toma de la web:** el naranja de "Comprar ahora" (es el botón por defecto de Releasit, no
un color de marca), el azul marino `#0e1b4d` y el rojo `#e32402` de los esquemas 3 y 5 (plantilla de
Refresh sin uso visible). El verde saturado de la botella de los renders de la web tampoco: el producto
real es gris oliva y en la landing va en foto.

**Colores del manual (`docs/branding.pdf`), solo para el logo:** crema `#f1efe3`, arena `#f4edcb`, sage
`#82856a`, pizarra `#8899a3`, ocre `#916b2d`, marrón `#825538`. No se usan como color de interfaz.

### Logo

Wordmark serif "Eterma" con una hoja de tres pétalos sobre la `a` final. Variantes en el manual: sage
sobre crema (principal), blanco sobre foto/sage/pizarra/ocre/marrón, y marrón sobre arena.

| Archivo | Qué es | Sirve para |
|---|---|---|
| `docs/branding.pdf` | Vector, 1 página | **Única fuente vectorial.** `pdftocairo -svg` y recortar |
| `product-images/logo_eterma.jpg` | 1080×1080, sage sobre crema, JPEG | Referencia. No sube a web (JPEG con fondo) |
| `Eterma_propuesta_01-01.png` (CDN de la tienda) | El que usa el tema hoy | Provisional |

Pendiente: **pedir el logo en SVG** (sage y blanco). Mientras, extraerlo del PDF.

### Tipografía

Lo que hay es poco y conviene saberlo antes de decidir:

- **El wordmark está vectorizado**: serif display de alto contraste con remates afilados. El manual no
  nombra la fuente. **No se compone como texto**; se usa el logo como imagen.
- **El único nombre de fuente en los metadatos del PDF es Mont** (Fontfabric, comercial, geométrica). No
  se ve en el arte —seguramente el texto de apoyo antes de vectorizar—. Es la pista de que la sans
  prevista es geométrica.
- **La tienda hoy:** cuerpo en **Questrial 400** (librería de Shopify, gratis, geométrica: el pariente
  libre de Mont, servida desde `/cdn/fonts/questrial/`) y titulares en la pila de sistema *"New York",
  Iowan Old Style, … Times New Roman, serif* (valor por defecto de Refresh). En Android y Windows —la
  mayoría del tráfico de paid— eso es **Times New Roman**.
- **Questrial tiene un solo peso.** Cualquier `font-weight: 700` se sintetiza (faux bold). La jerarquía se
  hace con tamaño, color y la serif de titulares, no con negritas.

**Decisión del cliente (2026-09-02): la landing carga Questrial para el cuerpo.** El original está en
[`shared/fonts/Questrial-Regular.ttf`](shared/fonts/Questrial-Regular.ttf) y el que se sirve es
[`shared/fonts/webfonts/questrial-400.woff2`](shared/fonts/webfonts/questrial-400.woff2) (subconjunto latino con
`pyftsubset`, 23 KB), subido a Contenido → Archivos y declarado con `@font-face` y `font-display: swap`
en el propio bloque de la landing (`/docs/brand-typography.md` §4). Licencia OFL: sin el problema de
MIMA. Los titulares siguen la serif del tema vía `--font-heading-family`; elegirla en el editor del tema
sigue pendiente (§8).

### Línea visual de las landings Eterma

Regla global §7: misma columna vertebral que MIMA, **distinta piel**. Esto es lo que hace reconocible una
landing de Eterma sin mirar el logo, y lo que la diferencia de MIMA en cada decisión:

| | MIMA | ETERMA |
|---|---|---|
| Fondo | Blanco con lila suave, degradados y halos | **Blanco hueso `#fffcf5` con secciones en gris frío `#eff0f5` y bloques en verde profundo.** Las tarjetas van en blanco puro y se distinguen por el filete |
| Voz tipográfica | Sans redondeada en negrita 800, titulares en frase corta | **Serif del tema en titulares, peso normal, tamaño grande.** Sans en cuerpo y datos. Titulares como frase, nunca en mayúsculas |
| Color | Magenta como energía, lila como atmósfera | **Verde profundo `#0f2e20` como primario** (titulares, CTA, bloques), verde medio en detalles, menta detrás del producto. Sin marrones ni ocres. El verde saturado del líquido va solo en foto |
| Superficies | Tarjetas con sombra y radio 24px | **Hairlines `#d7d5c9` de 1px, radios de 10–14px, sombra casi nula.** Numeración y filetes en vez de cajas |
| Fotografía | Producto en mano de clienta, brillo, retoque | Gente real en sitios reales (oficina, cocina), luz natural, sin retoque. Producto sobre menta |
| Ritmo | Bloques centrados, mucho énfasis | **Editorial**: texto alineado a la izquierda, aire, una idea por pantalla |
| Motivo | El "glow" | **El momento del día.** Eterma vende una bebida por momento; cada landing ordena su historia por los momentos en que aparece el problema |
| Unidad | El dulce | **La dosis**: el número en serif ("30 ml") y el vasito medidor |

Lo que es de marca, no de producto, y se repite en todas las landings de Eterma:

- Overlines en versalitas espaciadas, en `--et-muted`; sobre verde profundo, en lima `--et-lime`, como
  los eyebrows de la home. Numeración `01 · 02 · 03` en serif y en `--et-green`.
- CTA en píldora verde profundo `--et-green-deep`, texto blanco, **en frase** ("Quiero probar
  Clorofull"), como lo trae el copy. Sobre bloques verdes se invierte a off-white. **Cada producto
  diseña su propia animación del CTA** (regla global §7); la de CLOROFULL es "la medida", en su
  `AGENTS.md` §3.
- Franja superior en verde profundo con el mensaje de la campaña, y debajo el logo sobre blanco: la
  misma cabecera que la tienda.
- Citas con barra lateral verde a la izquierda, como los testimonios de la home, en tarjetas con la
  foto real de quien habla y en slider con la siguiente asomando (CLOROFULL §8).
- Iconos de trazo fino (1,5px) en `--et-green`, sin rellenos. El sello de garantía es un círculo menta
  con anillo y el escudo dentro, como un cuño a caballo del borde de la sección.
- Donde se enfrentan las dos formas de pago, el anticipado va en tarjeta de verde profundo con su CTA y
  el contraentrega en tarjeta blanca con filete, misma estructura y sin CTA (regla global
  `/AGENTS.md` §7): segundo, pero sin opacarlo.
- Logo: wordmark sage del manual sobre blanco en cabecera (como en la web), blanco sobre verde en el
  pie. No se recolorea.
- Prueba social con fotos del pool de UGC y **nombres reales**; sin fotos de stock de personas.

Lo que cambia por producto (lo fija el `AGENTS.md` del producto): qué momentos del día ordenan la
página, qué gesto de uso se enseña, qué foto lleva el hero y qué acento de la paleta se usa más.

**Cómo se hereda la tipografía sin declarar fuentes.** Las landings no cargan ninguna fuente ni escriben
familias a mano. Refresh publica en `:root` las variables `--font-heading-family` y `--font-body-family`
con lo que se elija en el editor del tema, así que la landing las usa con fallback:
`font-family: var(--font-heading-family, Georgia, serif)` en titulares y
`var(--font-body-family, inherit)` en el resto. Cambiar la serif en el tema cambia todas las landings.
En la vista previa local caen a Georgia y Helvetica, que es justo el contraste serif/sans buscado.

---

## 3. El tema de Shopify — Refresh, no Dawn, y sin exportar

Tema **Refresh 15.4.1** (id `194240282993`, assets en `/cdn/shop/t/3/`). Es de la familia Dawn, así que
hereda sus trampas. Verificado sobre la página viva el 2026-09-01:

- **La regla `:empty { display: none }` existe** en `base.css`, con la misma lista de etiquetas que Dawn.
  La defensa `.cf-lp div:empty { display: block }` de `/AGENTS.md` §4.9 es obligatoria.
- **La raíz va a 10,5px, no a 16.** `theme.liquid` lleva
  `html { font-size: calc(var(--font-body-scale) * 62.5%) }` con `--font-body-scale: 1.05`. En MIMA se
  midieron 16px porque el layout de GemPages quita `base.css`; **aquí no hay ese layout**, así que hasta
  que se mida sobre la landing real, `preview.sh` (que simula 16px) **puede mentir**. Todo en `px` (ya
  obligatorio) y medir con `getComputedStyle(document.documentElement).fontSize` en cuanto haya página.
- Los colores del tema (`--color-foreground: 15,46,32`, `--color-button: 73,108,86`) son **verdes de
  plantilla de Refresh, no del manual**. No copiarlos.
- Los titulares del tema van por etiqueta (`h1, .h1 { font-family: var(--font-heading-family) }`): los
  `h1`–`h3` de la landing se estilan **por clase** y se comprueba el color computado, como en MIMA.
- **`body` lleva `letter-spacing: .06rem` y se hereda.** La raíz de la landing lo pone a `0` y cada
  overline define el suyo en px.

**No hay `theme/` en este repo**: ni `theme.liquid`, ni `theme.gempages.blank.liquid`, ni flag
`is_paid_landing`. Pendiente pedir acceso al tema y replicar el patrón de
[`/mima/theme/`](../mima/theme/) (layout limpio para landings de paid + lista de handles). Hasta entonces
la landing hereda el tema completo.

---

## 4. Píxeles y medición

- **No hay `fbq` en el HTML del tema.** Sí hay `web-pixels-manager` (píxeles de Shopify), pero desde
  fuera no se ve qué contiene.
- Aplica lo de [`/mima/AGENTS.md`](../mima/AGENTS.md) §4: `fbevents.js` lo carga Releasit; un custom
  pixel de Shopify **duplica el PageView** y Releasit no lo ve. Recomendación: código base en el layout,
  condicionado a landings de paid, como en MIMA.
- ID de píxel de Meta: **desconocido** → preguntar (§8). Comprobar siempre en incógnito: el bloqueador de
  anuncios enseña el stub de Releasit (`fbq.version === "2.0"`).

---

## 5. El formulario de Releasit

### Esta tienda sirve el formulario LEGACY, no el de MIMA

**Corregido el 2026-09-03.** Aquí se dio por hecho que, al compartir build (`releasit-cod-form-443`),
Eterma servía el mismo formulario que MIMA. **No es así.** Al abrir el modal en vivo,
`#rsi_form_wrapper` no existe: el árbol es `#_rsi-cod-form-modal > ._rsi-modal-container`, es decir el
formulario **legacy** de `/docs/releasit-form-styling.md` §6.1–6.6 (+ §6.8, la auditoría de esta tienda).
El build de la app y la *versión del formulario* son ajustes distintos; la segunda vive en
**Releasit → Settings → General → COD Form version** y es global a la tienda.

Consecuencia práctica: **el skin de MIMA no se puede copiar.** Sus ganchos (`.rsi-text-input-field`,
`.rsi-onetick-wrapper`, `#rsi_form_wrapper`…) no existen aquí y no harían nada. Si algún día se cambia
la versión en la app, este skin deja de aplicar entero y hay que reescribirlo contra §6.7.

### El skin

- **[`shared/releasit-form.css`](shared/releasit-form.css)** — verificado en vivo el 2026-09-03 sobre la
  PDP de CLOROFULL™ a 390 y 1280px. Se pega en la pestaña **CSS** del custom code de la landing, detrás
  del CSS de la landing (misma decisión que en MIMA, `/docs/releasit-form-styling.md` §7.1). Cubre velo,
  tarjeta, cabecera, ofertas de cantidad, totales, campos con sus iconos recoloreados, errores y el
  orden de los botones. Recoge `html[data-cf-pay]` para atenuar la opción de pago descartada.
- **[`shared/releasit-form-designer.md`](shared/releasit-form-designer.md)** — lo que el CSS **no puede**
  tocar y hay que cambiar en la app.
- **Sin banner.** Comprobado: el formulario de Eterma no tiene bloque de imagen, y esta landing no lo
  quiere. No se deja regla preventiva para ocultarlo (la clase del bloque en legacy no está verificada).

### El límite, y es duro

Lo que el Form Designer pinta con **estilo inline `!important`** no se puede sobrescribir desde una hoja
de estilos: gana siempre (CSS Cascade 4 §6.4). Comprobado inyectando `background: … !important` sobre
los dos botones de pago, que se quedaron negro y naranja. Quedan fuera del CSS: los dos botones, el
título del modal, los textos libres y el fondo amarillo con borde rojo del order bump.

### Lo que hay configurado hoy (auditado el 2026-09-03)

Sobre `clorofull™`, la PDP pública, porque `clorofull-mal-olor` está `available: false`. Las ofertas de
cantidad y el order bump **se configuran por producto**: repetir la auditoría al activarlo.

- Campos: nombre, apellido, teléfono, dirección, departamento, ciudad, correo (opcional) y casilla de
  boletín. Una sola tarifa de envío («Envío gratis»), que el skin oculta.
- **Ofertas de cantidad de 1, 2 y 3 unidades, con la de 2 preseleccionada** → el formulario abre en
  $113.400 cuando la landing anuncia $79.900.
- **Order bump «Envío Prioritario» de $3.500, premarcado**, sin copy que lo respalde.
- **El botón de pago anticipado ofrece $5.000 de ahorro**; la landing promete $10.000.
- Importes con decimales y sacudida activa en los dos botones.

Los cuatro últimos puntos son de la app, no del CSS, y están detallados con valores en
`shared/releasit-form-designer.md`. **Hasta que el ahorro sea de $10.000, `PREPAID_ENABLED` sigue en
`false`** en la landing.

---

## 6. Comercial y confianza — el copy manda, la web es solo referencia

**Decisión del cliente (2026-09-01): todo lo comercial sale de `olor/copy-olor.md`.** La web se usó solo
como contexto de marca. Lo que dice se deja anotado porque explica por qué la landing **no enlaza nada de
allí** y por qué no hay que "corregir" el copy con datos de la tienda.

**Entrega — tres cifras distintas:**

| Dónde | Qué dice |
|---|---|
| PDP de CLOROFULL | "Envío gratis 2-5 días" |
| Política de envío | Gratis desde $79.700; estándar $9.700; **3–5 días después de enviado** + 2–3 de preparación |
| `copy-olor.md` | 3 a 5 días hábiles, con reenvío o devolución si no llega |

**La landing lleva la del copy: 3 a 5 días hábiles, con reenvío o devolución si no llega.**

**Pago (copy):** contraentrega **$79.900** / anticipado **$69.900**, "ahorras $10.000". La web solo enseña
tarjetas (Visa, Mastercard, Amex, Diners); contraentrega existe vía Releasit. Cómo se cobra el anticipado
en el formulario de Eterma está por comprobar (§8).

**Contacto: no hay WhatsApp, teléfono ni NIT en ninguna página.** Las políticas son **plantillas de otra
tienda**: hablan de `soporte@EtermaShop.com`, "EtermaShop SHOP", garantía por "reparación" y "centros de
servicio". Enlazarlas desde la landing empeora la confianza: **no se enlazan**. El copy no incluye WhatsApp ni
contacto, así que la landing tampoco. Su bloque de confianza es la garantía del copy ("Tu pedido llega. O
respondemos.") más los datos legales de la etiqueta.

**Datos legales (de la etiqueta, fuente primaria):**

- Registro sanitario **INVIMA RSA-0029174-2023** — es registro de **alimento**.
- Fabricado por **Laboratorios NaturalSplast SAS**, Carrera 59 # 5B-31, Bogotá D.C. Industria colombiana.
- Comercializado por **Vitalcom Group Commerce SAS**.
- Sello frontal octogonal **"Contiene edulcorantes — MinSalud"**: obligatorio en el envase. Sale en todas
  las fotos; no se retoca ni se esconde.

**Claims.** La etiqueta lo dice: "Este producto es un alimento y debe ser comercializado como tal". Se
habla de **acompañar, ayudar, sensación**; nunca "elimina el mal olor", "cura", "desintoxica" (la propia
PDP aclara "no es un detox"). El copy de olor ya está escrito con ese cuidado ("ayuda a reducir la
intensidad", "acompaña"): no endurecerlo.

**Testimonios.** Los de la web (Josefa M, Ramos M, Luz P) hablan de hidratación, no de olor: no sirven
para este ángulo. Van los cuatro del copy (Mariana · Bogotá, Sebastián · Barranquilla, Valeria · Medellín,
Andrés · Cali). Pendiente (§8) si llevan foto del pool de UGC `/humanized-images/clorofull/` (12 personas,
3 hombres) y, en ese caso, si el nombre es el del copy o el real de la foto, que es el criterio de MIMA.

**Autoridad.** Desde el 2026-09-03 las dos primeras fuentes se muestran con su **logotipo real**
(pedido del cliente), en tarjetas que citan la frase del copy y la atribuyen debajo. Son citas de
fuente, no patrocinios: no escribir nada que sugiera respaldo, aval o colaboración de esas entidades.
El copy cita PubChem/NIH, National Geographic Education y una "revisión científica
internacional" sin nombre. El copy manda: las tres tarjetas van **como texto, tal cual**. Sin logos, sin
cifras ni fuentes añadidas por cuenta propia (regla global §8).

---

## 7. CLOROFULL — ficha del producto (fuente: la etiqueta)

Fotos en `product-images/IMG_20260701_1213*.jpg` (frente, dorso con ingredientes, dorso con tabla
nutricional). Lo que sigue está transcrito de ahí.

- **Clorofull. Bebida endulzada con estevia, con clorofila.** Sabor idéntico al natural a menta.
  Cont. neto 1000 ml.
- **Tamaño de porción: ½ vaso (120 ml). Porciones por envase: aprox. 8.** Modo de uso: "Tomar una porción
  al día". Agítese antes de consumir.
- Lote 5311125, vence 11/2027 (el envase fotografiado).

**Decidido (2026-09-01): el copy manda → 30 ml al día, 33 dosis por botella.** La etiqueta dice 120 ml
y 8 porciones; es una inconsistencia que el cliente asume y queda anotada para que nadie la "corrija" de
vuelta.

**Ingredientes (orden de la etiqueta):** agua purificada, pectina (estabilizante), polidextrosa, fosfato
tricálcico, citrato de potasio, gluconato de calcio, saborizante idéntico al natural menta, cloruro de
potasio, goma xantan (espesante), citrato de magnesio, **clorofila (0,2 %)** (colorante natural), óxido
de magnesio, cloruro de magnesio, sulfato de magnesio, ácido cítrico (acidulante), benzoato de sodio
(conservante), sorbato de potasio (conservante), vitamina C, sulfato ferroso, sulfato de zinc, estevia
hojas (edulcorante), vitamina E, niacina, ácido pantoténico, vitamina A, vitamina B6, vitamina B2,
vitamina B1, vitamina D3, ácido fólico, biotina, selenito de sodio, vitamina B12.

**Tabla nutricional** (por 100 ml / por porción de 120 ml). El copy la deja como placeholder; esta es la
oficial:

| | Por 100 ml | Por porción |
|---|---|---|
| Calorías | 42 kcal | 50 kcal |
| Grasa total / saturada / trans | 0 g | 0 g |
| Carbohidratos totales | 8,2 g | 9,8 g |
| Fibra dietaria | 4,5 g | 5,4 g |
| Azúcares totales | 1,0 g | 1,2 g |
| Azúcares añadidos | 0,8 g | 1,0 g |
| Proteína | 0 g | 0 g |
| Sodio | 8,3 mg | 10 mg |
| Potasio | 958 mg | 1149 mg |
| Vitamina A | 405 µg ER | 486 µg ER |
| Vitamina C | 45 mg | 54 mg |
| Calcio | 543 mg | 651 mg |
| Hierro | 10 mg | 12 mg |
| Vitamina D | 7,5 µg | 9,0 µg |
| Vitamina E | 4,5 mg ET | 5,4 mg ET |
| Vitamina B1 | 0,58 mg | 0,70 mg |
| Vitamina B2 | 0,58 mg | 0,70 mg |
| Niacina | 7,9 mg | 9,5 mg |
| Vitamina B6 | 0,69 mg | 0,83 mg |
| Ácido fólico | 88 µg | 108 µg |
| Vitamina B12 | 1,2 µg | 1,4 µg |
| Fósforo | 221 mg | 266 mg |
| Magnesio | 256 mg | 308 mg |
| Zinc | 5,7 mg | 6,8 mg |
| Ácido pantoténico | 3,0 mg | 3,6 mg |
| Selenio | 36 µg | 43 µg |

El copy la presenta "por porción de 30 ml". Pendiente (§8) cómo se muestra: la etiqueta tal cual (por
100 ml y por 120 ml) o con una columna de 30 ml calculada (0,3 × la de 100 ml). Lo que no se hace es
titular "30 ml" sobre la columna de 120.

**Posicionamiento vivo vs. ángulo nuevo.** La PDP vende "hidratación consciente" y "piel luminosa"; las
descripciones de Shopify de los cinco CLOROFULL dicen "para cuidar piel, cabello y uñas" (copy pegado de
TODO EN UNO). **El ángulo olor no existe hoy en la tienda: la landing lo estrena.** No hay nada en la web
de donde tomar claims para él.

**Vasito medidor incluido** (foto `vasito medidor.jpg`; el vertido, en `modo de uso - cloro.png`).

---

## 8. Preguntas abiertas

**Resueltas el 2026-09-01:** producto (`clorofull-mal-olor`), dosis (30 ml, copy manda), plazo de
entrega (copy manda), precio anticipado ($69.900), contacto y políticas de la web (no se usan), autoridad
(como texto, tal cual), "simulación académica" (eliminado), "En condiciones reales" (se queda, decisión
del cliente).

**Resueltas el 2026-09-02:** pack x2 a $129.900 (cifra única); testimonios siempre con nombres reales
del pool y, desde la tarde de ese día, **con foto real en slider** (primero se habían pedido sin foto); tabla nutricional "lo que diga el copy" (por 30 ml, calculada); pago anticipado
igual que MIMA; fotos de personas siempre, con estructura de secciones parecida a SKNGLOW.

**Abiertas, no bloquean:** si la landing debe decir "envío gratis" (el copy no lo dice y no se añadió);
si el pack x2 tiene precio distinto en anticipado; el texto del botón del pack ("Quiero el pack de 2" lo
puso el agente, el copy no traía botón).

**Para publicar, no para maquetar:** activar el producto en Shopify, píxel de Meta (§4), acceso al tema
y medida del `font-size` raíz (§3), serif de titulares (§2), logo en SVG.

---

## 9. La primera landing: CLOROFULL · olor

**Estado (2026-09-02): construida y verificada en local, sin publicar.** Detalle, medidas y pendientes
en [`landings/clorofull/AGENTS.md`](landings/clorofull/AGENTS.md).

### Estructura

```
eterma/
├── AGENTS.md                       # este archivo
├── docs/branding.pdf               # manual (1 página)
├── shared/                         # skin de Releasit + ajustes de la app (§5)
├── product-images/                 # crudas, gitignored — inventario abajo
└── landings/clorofull/
    ├── AGENTS.md                   # contexto del producto
    ├── assets/                     # 16 .webp optimizados, landings-clorofull-<uso>.webp
    └── olor/
        ├── copy-olor.md            # copy aprobado, ya con precio x2 y nombres reales
        ├── september.html          # el entregable
        └── september.preview.html  # derivado de ./preview.sh, no se edita
```

### Convenciones de código de este producto

- **Prefijo `cf-`.** Raíz `.cf-lp` con `id="cf-clorofull"`. Todo selector cuelga de `.cf-lp`; todo ID
  empieza por `cf-`.
- **Tokens de color `--et-*`** (tabla de §2) declarados dentro de `.cf-lp`, con los mismos nombres que
  llevará la skin del formulario. Tokens de layout (`--cf-radius`, `--cf-shell`) con prefijo de producto.
- Constantes al inicio del script como en SKNGLOW: `ROOT_SELECTOR`, `READY_FLAG` (`cfLandingReady`),
  `PREPAID_ENABLED`, `PRICES`, `CTA_LABELS`. Precios y textos de CTA salen de ahí.
- Imágenes al CDN con nombre idéntico al del repo:
  `https://etermacolombia.com/cdn/shop/files/landings-clorofull-<uso>.webp`. `check-cdn.sh` toma la base
  del propio HTML, así que funciona sin cambios.
- Todo en `px`. Ni un `rem` (§3).

### Copy (`olor/copy-olor.md`): estado

- **"dentro de esta simulación académica"**: eliminado en sus dos apariciones (2026-09-01). Era un resto
  del prompt del copywriter.
- **"En condiciones reales,"** en el disclaimer legal: **se queda**, decisión del cliente.
- "[INSERTAR AQUÍ LA TABLA NUTRICIONAL]" → **no va**: el cliente retiró la sección el 2026-09-02
  (la tabla derivada sigue en el `AGENTS.md` de CLOROFULL §5 por si se necesita en otro sitio).
- Pack x2 sin precio → §8.
- Todo lo demás va **tal cual**: dosis, plazos, precios, testimonios, autoridad. El copy manda sobre la
  web y sobre la etiqueta.

Lo que sí está bien y hay que respetar: la promesa ("Que el olor no decida qué tan cerca te pones"), los
cuatro macroángulos (aliento tras el café, sudor, gases, olor que reaparece), el tono contenido de los
claims y el esquema de pago anticipado/contraentrega.

### Inventario de imágenes crudas (`product-images/`, fuera de git)

| Archivo | Píxeles | Qué es | Uso probable |
|---|---|---|---|
| `IMG-1-CLOROFULL-STOCK.png` | 1254×1254 | Botella recortada sobre blanco (la de la PDP) | Hero, "qué recibes" |
| `clorofull 1.png` | 998×1250 | Botella en mano, chaqueta de jean | Hero alternativo, aire UGC |
| `clorofull 2.png` | 1016×1342 | Botella en mano, fondo claro | Sección producto |
| `IMG_20260701_121317.jpg` | 3000×4000 | Frente del envase en mano | Ficha, detalle |
| `IMG_20260701_121324.jpg` | 3000×4000 | Dorso: ingredientes y modo de uso | Fuente de §7; no para publicar tal cual |
| `IMG_20260701_121330.jpg` | 3000×4000 | Dorso: tabla nutricional | Fuente de §7 |
| `vasito medidor.jpg` | 3000×4000 | Vasito con el líquido verde, en mano | "Cómo se toma", el verde real |
| `modo de uso - cloro.png` | 714×1260 | Vertido de la botella al vasito | "Cómo se toma" (baja resolución: solo a ancho de columna) |
| `logo_eterma.jpg` | 1080×1080 | Logo sage sobre crema | Referencia (§2) |

UGC en `/humanized-images/clorofull/`: 15 archivos, ~710–990 px de ancho (uno a 1608). **No escalar hacia
arriba.** Procedimiento y comandos: `/docs/image-optimization.md`.

### Para publicarla

1. Subir los 16 `assets/*.webp` a Contenido → Archivos con el nombre exacto y pasar
   `./check-cdn.sh eterma/landings/clorofull/olor/september.html`.
2. Activar el producto `clorofull-mal-olor` en Shopify y enlazarlo en el Product Element de GemPages.
3. Pegar el bloque en el Custom Code de GemPages y **medir en vivo** el `font-size` raíz y el color
   computado de los titulares (§3).
4. Pegar [`shared/releasit-form.css`](shared/releasit-form.css) en la pestaña CSS del mismo Custom Code
   y aplicar en la app lo de [`shared/releasit-form-designer.md`](shared/releasit-form-designer.md)
   (§5): la oferta de 1 unidad preseleccionada, el order bump fuera, el ahorro anticipado a $10.000 y
   los colores de los dos botones.
5. Reauditar el formulario ya sobre `clorofull-mal-olor` y actualizar §5.
6. Decidir la serif de titulares en el tema (§2) y añadir el handle al layout de paid cuando exista.
7. Publicar **solo a petición explícita**.

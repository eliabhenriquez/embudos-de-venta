# AGENTS.md

Contexto raíz del repositorio. Aplica a **todas** las marcas.

El contexto está en **tres niveles que cascadean**, del general al específico:

| Nivel | Archivo | Qué contiene |
|---|---|---|
| Global | `AGENTS.md` | Stack, reglas técnicas, rendimiento, principios de CRO |
| Marca | `<marca>/AGENTS.md` | Identidad, paleta, tipografía, tono, tema de Shopify, formulario |
| Producto | `<marca>/landings/<producto>/AGENTS.md` | Qué es, precio, ángulos, prefijo CSS, claims, funnel |

**El más específico gana** en caso de conflicto. Lee los tres antes de tocar una landing.

---

## 1. Qué es este proyecto

Repositorio de **CRO** para tiendas online y landing pages de sales funnels de varias marcas de
**salud y bienestar corporal** (suplementos, cuidado personal, productos físicos).

**Problema que resolvemos:** las landings actuales no generan confianza, tienen mala UI/UX y llegan a
percibirse como estafa. El objetivo de todo lo que se construya aquí es **profesionalizar la marca**:
landings que transmitan seguridad y credibilidad, y que por esa vía suban la conversión.

**Criterio de decisión ante cualquier duda:** ¿esto aumenta la confianza del usuario y la probabilidad
de compra, sin engañarlo? Si la respuesta no es un sí claro, no se hace.

---

## 2. Estructura del repositorio

```
/
├── AGENTS.md                       # este archivo (contexto global, todas las marcas)
├── preview.sh                      # vista previa local de un fragmento (ver §9)
├── check-cdn.sh                    # qué imágenes de una landing faltan por subir al CDN
├── docs/                           # guías transversales de plataforma
│   ├── releasit-form-styling.md
│   ├── image-optimization.md
│   └── brand-typography.md
├── humanized-images/               # UGC crudo, por producto y persona  ┐ gitignored:
├── product-images/                 # foto de producto cruda            ┘ pesan más que el repo
└── <marca>/                        # mima, nambu
    ├── AGENTS.md                   # contexto de la marca
    ├── docs/                       # info GENERAL de marca: branding, logos, informes
    ├── theme/                      # tema Liquid de Shopify (lo que envuelve la landing)
    ├── shared/                     # activos transversales de la marca (skin de Releasit, fuentes)
    └── landings/
        └── <producto>/             # sknglow, mimacalm, mimanad
            ├── AGENTS.md           # contexto del producto
            ├── assets/             # .webp optimizados, COMPARTIDOS por todos los ángulos
            └── <ángulo>/           # piel, cabello, ...
                ├── <campaña>.html  # el entregable (august.html)
                └── *.md            # copy aprobado de ese ángulo
```

**Qué es un ángulo.** El mismo producto vendido con un argumento distinto a un público distinto.
SKNGLOW sirve para la piel y para el cabello, así que tiene `piel/` y `cabello/`: misma variante de
Shopify y mismo precio, pero landing, copy y promesa propios. Un ángulo nuevo es una carpeta nueva,
nunca un condicional dentro de una landing existente.

**Los tres `AGENTS.md` cascadean.** Global → marca → producto. El más específico **gana** en caso de
conflicto. Antes de tocar una landing hay que haber leído los tres.

**Dónde va cada cosa — reglas que no se negocian:**

| Contenido | Ubicación | Por qué ahí |
|---|---|---|
| Branding, paleta, logo, tono | `<marca>/docs/` | Es de la marca, no de un producto |
| Copy, claims, precios | `<producto>/<ángulo>/*.md` | Cada ángulo tiene su propio argumento |
| Imágenes optimizadas | `<producto>/assets/` | Se comparten entre ángulos; duplicarlas es un error |
| Imágenes crudas | `humanized-images/`, `product-images/` | Fuera de git; ver `docs/image-optimization.md` |
| Skin de Releasit, fuentes | `<marca>/shared/` | Un solo formulario para toda la marca |

Marcas activas: `mima` (productos: **SKNGLOW**, **MIMACALM**, **MIMANAD**), `nambu` (aún vacía).

**Regla:** antes de escribir una sola línea de una landing, leer el `AGENTS.md` del producto, el
`docs/` de la marca (branding) y el copy del ángulo. El copy y los claims salen de ahí, **no se
inventan**.

---

## 3. Stack y entorno productivo

- **Producción:** Shopify.
- **Constructor de páginas:** **GemPages** (las landings se pegan/embeben dentro de GemPages).
- **Checkout / cierre de compra:** **Releasit COD Form & Upsells**. Es quien recoge el pedido y cierra
  el flujo (contraentrega, order bump y upsell), no el checkout nativo de Shopify. Antes de estilar su
  botón o su formulario, leer **`docs/releasit-form-styling.md`** — tiene reglas propias y una excepción
  documentada a §4.9.
- **Tecnología permitida:** HTML + CSS + JavaScript vanilla. Nada más.
- **Sin frameworks, sin build step, sin CDNs externos** (nada de Tailwind, Bootstrap, jQuery, GSAP,
  AOS, etc.). Todo debe ser autocontenido y funcionar pegado tal cual.
- Existe MCP de GemPages disponible para listar/crear/actualizar páginas y secciones y subir imágenes
  al CDN de Shopify. Úsalo cuando el usuario pida publicar o sincronizar; **nunca publiques ni
  modifiques una página en producción sin que el usuario lo pida explícitamente.**

---

## 4. Reglas técnicas no negociables (Shopify + GemPages)

El código no vive aislado: se inyecta dentro de un tema de Shopify que ya trae su propio CSS, su JS y
su header sticky. Todo lo que se escriba debe ser **a prueba de colisiones**.

1. **Un solo bloque autocontenido.** El entregable es un `<section>` (o `<div>`) raíz + un `<style>` +
   un `<script>`. Nunca `<html>`, `<head>` ni `<body>`.
2. **Namespace obligatorio.** Clase raíz por landing (`sg-`, `mc-`, etc. según producto) y **todos**
   los selectores colgando de ella. Prohibido estilar etiquetas desnudas (`h2 { }`, `p { }`,
   `button { }`) o usar selectores globales (`*`, `body`, `:root` sin scope).
3. **Reset acotado al scope**, nunca global:
   `.sg-lp *, .sg-lp *::before, .sg-lp *::after { box-sizing: border-box; }`
4. **Variables CSS dentro del scope raíz** (`.sg-lp { --sg-color-primary: ...; }`), no en `:root`.
5. **IDs con prefijo** (`id="sg-offer"`). Los IDs son globales y el tema ya usa los suyos.
6. **JS encapsulado en IIFE**, sin variables globales, sin `window.algo = ...`, sin dependencia de
   jQuery. Query siempre acotada al contenedor raíz, no a `document` completo.
7. **JS defensivo:** GemPages puede montar/re-montar el DOM. Comprobar existencia de nodos antes de
   usarlos y evitar asumir orden de carga (`DOMContentLoaded` puede haber pasado ya).
8. **`!important` solo como último recurso** documentado con un comentario de una línea explicando qué
   estilo del tema se está sobreescribiendo.
9. **Los elementos decorativos vacíos son un campo minado.** El tema (Dawn) trae
   `a:empty, div:empty, p:empty, section:empty, ul:empty { display: none }`. Cualquier `<div>` vacío
   que uses como capa —velos, halos, degradados— **desaparece en producción aunque funcione en la
   vista previa**. Defensa obligatoria en todo bloque, y comprobarla simulando la regla del tema:

   ```css
   .sg-lp div:empty { display: block; }
   ```

10. **Nada de estilos en línea** (regla global del usuario), salvo el `width`/`height` de imágenes y
   casos estrictamente necesarios.
11. **Cuidado con `position: fixed`/`sticky`**: el tema ya tiene header sticky. Un CTA fijo en mobile
    va anclado abajo y debe respetar `env(safe-area-inset-bottom)`.
12. **Carrito:** usar los mecanismos nativos — elemento producto de GemPages, `/cart/add.js`, o
    permalink `/cart/<variantId>:<qty>`. Nunca hardcodear IDs de variante en el código sin extraerlos
    a una constante/config al inicio del script.

---

## 5. Rendimiento (Core Web Vitals)

El tráfico es mayoritariamente **mobile y de paid**: cada 100 ms cuentan.

- **Mobile-first siempre.** Se diseña a 360–390 px y se escala hacia arriba.
- **LCP:** imagen del hero con `fetchpriority="high"`, sin `loading="lazy"`. El resto, `loading="lazy"`
  + `decoding="async"`.
- **CLS:** `width` y `height` explícitos en toda imagen y vídeo. Reservar espacio de todo lo que
  aparezca dinámicamente (contadores, badges, sliders).
- **Imágenes:** WebP, servidas desde el CDN de Shopify con `?width=` y `srcset`. Las de
  `product-images/` y `humanized-images/` son crudas (2–3 MB): **hay que optimizarlas antes de
  usarlas**, nunca referenciarlas tal cual. Las optimizadas viven en `<producto>/assets/` y las
  comparten todos los ángulos. Procedimiento, comandos y tamaños: **`docs/image-optimization.md`**.
- **Versionado obligatorio.** El CDN de Shopify cachea por nombre y no suelta la versión vieja ni
  borrándola. Una imagen ya subida **nunca** se reemplaza con el mismo nombre: se sube como `-v2`,
  `-v3`… y se actualiza la referencia. Comprobar con `./check-cdn.sh <landing>` antes de dar por
  publicado cualquier cambio de imagen. Detalle en `docs/image-optimization.md` §5.
- **Tipografías:** las landings **no declaran `font-family`**, heredan la del tema. La tipografía de
  marca se instala una sola vez en el tema: ver **`docs/brand-typography.md`**.
- **Animaciones:** solo `transform` y `opacity`. Respetar `prefers-reduced-motion`.
- Nada de librerías para carruseles/acordeones: se resuelven con CSS + JS mínimo.

---

## 6. Convenciones de código

- Naming (clases, funciones, archivos, variables) **en inglés**; el **contenido visible en español**
  (mercado LATAM, ver §8).
- **camelCase** en JS. Clases CSS en **kebab-case** con prefijo de marca/producto.
- Archivos de landing: `<campaña>.html` (ej. `august.html`). La ruta ya dice marca, producto
  y ángulo — repetirlo en el nombre es ruido.
- **Indentación con tabs**, siempre. Comillas **simples** en JS. Sin punto y coma final en JS.
- Comentarios breves y concretos, solo donde el "por qué" no sea obvio.
- **Sin magic numbers/strings**: precios, IDs de variante, textos repetidos, breakpoints y colores van
  a constantes o variables CSS al inicio del bloque.
- HTML **semántico y accesible**: `section`, `h1`–`h3` en jerarquía real, `button` para acciones y `a`
  para navegación, `alt` descriptivo, foco visible, contraste AA mínimo.
- Secciones reutilizables: cuando un bloque (garantía, FAQ, testimonios, selector de pago) se repita
  entre landings, extraerlo a un patrón reutilizable en lugar de copiar y pegar variantes divergentes.

---

## 7. CRO: estructura y principios

Estructura base de una landing de venta (se adapta, no se aplica a ciegas):

1. **Hero** — promesa clara + producto visible + CTA. Qué es, para quién y qué gana, en < 3 segundos.
2. **Mecanismo / ingredientes** — por qué funciona, explicado simple.
3. **Problema–agitación** — los escenarios reales del usuario, con su lenguaje.
4. **Cómo se usa** — hacer que se vea fácil de sostener.
5. **Oferta y formas de pago** — precio, ahorro, opciones (anticipado vs contraentrega) sin ambigüedad.
6. **Bonos / valor añadido**.
7. **Prueba social** — testimonios reales, con nombre y ciudad.
8. **Autoridad** — respaldo de ingrediente/medios/estudios, siempre verificable.
9. **Qué recibes** — desglose tangible del pedido.
10. **Garantía** — condiciones explícitas y cumplibles.
11. **FAQ** — objeciones reales, incluida la de seguridad de uso.
12. **Cierre** — repetición de oferta + CTA final.

Principios:

- **Un solo objetivo por página.** Sin menú, sin links de salida, sin distracciones.
- **CTA repetido** después de cada bloque que aporta valor, con el mismo texto y estilo. En mobile,
  CTA sticky tras pasar el hero.
- **Fricción baja:** menos campos, menos pasos, precio y envío sin sorpresas.
- **Confianza explícita y visible:** política de envío/devolución, datos de contacto, WhatsApp,
  métodos de pago, garantía. La ausencia de esto es la principal causa de percepción de estafa.
- **Nada de patrones oscuros:** sin contadores falsos, sin stock falso, sin descuentos inventados, sin
  reviews falsas. Rompen la confianza y son exactamente el problema que venimos a arreglar.
- La **escasez/urgencia solo si es real** (upsell one-time real, campaña con fecha real).

---

## 8. Mercado, contenido y claims

- **Mercado principal:** Colombia. Español neutro-colombiano, tuteo, tono cercano y femenino según
  marca. Precios en **COP** con formato `$89.900`.
- **Pagos:** pago anticipado (con descuento) y **contraentrega**. Confirmación y seguimiento por
  **WhatsApp**. Envío gratis. Entrega 3–5 días hábiles.
- **Funnel:** landing → **formulario Releasit** con **order bump** → **upsell** one-time → thank you page
  (copy en `landings/<producto>/<ángulo>/order_bump_upsell.md`; estilos en `docs/releasit-form-styling.md`).
- **Claims de salud — crítico.** Son suplementos, no medicamentos. El copy habla siempre de
  **apariencia y cuidado** ("ayuda a que la piel se vea…"), nunca de curar, tratar o prevenir
  enfermedades. No modificar ni "mejorar" un claim del copy aprobado por cuenta propia.
- **Autoridad verificable:** medios y estudios citados deben ser los que están en `docs/`. No añadir
  fuentes, logos ni cifras que no estén documentados.
- **Testimonios:** solo los aprobados en `docs/`. No generar testimonios nuevos.

---

## 9. Flujo de trabajo del agente

1. Identificar **marca, producto y ángulo**; leer los tres `AGENTS.md`, el `docs/` de la marca
   (branding) y el copy del ángulo.
2. Si falta información (variante de Shopify, imagen, claim, precio), **preguntar**; no rellenar con
   supuestos ni con placeholders que puedan acabar en producción.
3. Construir el bloque autocontenido siguiendo §4–§6. Si la landing toca el botón o el formulario de
   Releasit, aplicar además `docs/releasit-form-styling.md`.
4. Verificar antes de entregar: mobile 360 px, sin scroll horizontal, sin colisiones de selectores,
   sin errores de consola, imágenes con dimensiones, CTAs funcionando, textos coincidiendo con el copy.
   **Comprobar los colores computados, no solo el CSS escrito:** una regla genérica de elemento
   (`.card p`) gana a una de clase (`.card__tag`) y deja texto ilegible sin avisar.
5. **Regenerar la vista previa SIEMPRE al terminar de tocar una landing.** No es opcional ni es solo
   para mirarla uno mismo: el `.preview.html` está versionado en el repo y es lo que abre el usuario
   para revisar el trabajo. Una preview vieja enseña el estado anterior y hace perder el viaje.

   ```sh
   ./preview.sh <marca>/landings/<producto>/<ángulo>/<campaña>.html
   ```

   Genera un `.preview.html` con la cabecera del tema. Los fragmentos **no llevan `<meta viewport>`**
   —lo pone Shopify—, así que abiertos en crudo el móvil los renderiza a ~980 px, con el layout de
   escritorio encogido. No es un fallo de la landing: es que le falta el documento que la envuelve.

   🔴 **Todas las medidas en `px`. Nunca `rem` en una landing.** La cabecera de `preview.sh` sirve para
   parecerse al tema, pero **es una imitación y puede mentir**. Ya pasó: llevaba un
   `html{font-size:62.5%}` heredado de otro tema, cuando la página viva va a **16px** (medido, no
   supuesto). Resultado: un bloque escrito en `rem` se veía correcto en la vista previa y salía **un
   60% más grande al publicar** — la sección pasaba de 612px a 1170px de alto y nadie lo veía hasta
   tener el móvil delante. En `px` el problema no puede existir, porque no dependen de la raíz.

   Si alguna vez hay que cambiar esa cabecera, **se mide sobre la página viva**:

   ```js
   getComputedStyle(document.documentElement).fontSize
   ```
6. **Si cambió alguna imagen, comprobar el CDN:** `./check-cdn.sh <landing>` dice cuáles faltan por
   subir. Recordar el versionado `-v2` de §5.
7. No tocar producción (publicar/despublicar páginas, cambiar el tema) sin petición explícita.

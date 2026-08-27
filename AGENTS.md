# AGENTS.md

Contexto raíz del repositorio. Aplica a **todas** las marcas. Cada marca puede tener su propio
`<marca>/AGENTS.md` con contexto específico (tono, paleta, productos, restricciones legales propias);
ese archivo **sobrescribe** lo que se diga aquí en caso de conflicto.

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
├── AGENTS.md                 # este archivo (contexto global)
├── docs/                     # guías transversales de plataforma (todas las marcas)
│   ├── releasit-form-styling.md
│   ├── image-optimization.md
│   └── brand-typography.md
├── <marca>/                  # una carpeta por marca (mima, nambu, ...)
│   ├── AGENTS.md             # contexto específico de la marca
│   ├── docs/                 # fuente de verdad de la marca
│   │   ├── branding.pdf      # identidad visual (colores, tipografías, logo, tono)
│   │   └── products/
│   │       └── <producto>/
│   │           ├── copy/     # copies aprobados (landing, order bump, upsell, ads)
│   │           └── images/   # material fotográfico crudo del producto
│   ├── shared/               # activos transversales de la marca (skin del form, tokens)
│   └── landings/             # entregables: <producto>-<campaña>.html
```

Marcas activas: `mima` (productos: **SKNGLOW**, **MIMACALM**, **MIMANAD**), `nambu`.

**Regla:** antes de escribir una sola línea de una landing, leer `docs/` de esa marca y producto
(branding + copy). El copy y los claims salen de ahí, **no se inventan**.

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
- **Imágenes:** WebP, servidas desde el CDN de Shopify con `?width=` y `srcset`. Las fotos de
  `docs/products/*/images` son crudas (2–3 MB): **hay que optimizarlas antes de usarlas**, nunca
  referenciarlas tal cual. Procedimiento, comandos y tamaños: **`docs/image-optimization.md`**.
- **Tipografías:** las landings **no declaran `font-family`**, heredan la del tema. La tipografía de
  marca se instala una sola vez en el tema: ver **`docs/brand-typography.md`**.
- **Animaciones:** solo `transform` y `opacity`. Respetar `prefers-reduced-motion`.
- Nada de librerías para carruseles/acordeones: se resuelven con CSS + JS mínimo.

---

## 6. Convenciones de código

- Naming (clases, funciones, archivos, variables) **en inglés**; el **contenido visible en español**
  (mercado LATAM, ver §8).
- **camelCase** en JS. Clases CSS en **kebab-case** con prefijo de marca/producto.
- Archivos de landing: `<producto>-<campaña>.html` (ej. `sknglow-august.html`).
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
  (copy en `docs/products/*/copy/order_bump_upsell.md`; estilos en `docs/releasit-form-styling.md`).
- **Claims de salud — crítico.** Son suplementos, no medicamentos. El copy habla siempre de
  **apariencia y cuidado** ("ayuda a que la piel se vea…"), nunca de curar, tratar o prevenir
  enfermedades. No modificar ni "mejorar" un claim del copy aprobado por cuenta propia.
- **Autoridad verificable:** medios y estudios citados deben ser los que están en `docs/`. No añadir
  fuentes, logos ni cifras que no estén documentados.
- **Testimonios:** solo los aprobados en `docs/`. No generar testimonios nuevos.

---

## 9. Flujo de trabajo del agente

1. Identificar **marca y producto**; leer su `AGENTS.md`, `docs/branding.*` y el `copy/` correspondiente.
2. Si falta información (variante de Shopify, imagen, claim, precio), **preguntar**; no rellenar con
   supuestos ni con placeholders que puedan acabar en producción.
3. Construir el bloque autocontenido siguiendo §4–§6. Si la landing toca el botón o el formulario de
   Releasit, aplicar además `docs/releasit-form-styling.md`.
4. Verificar antes de entregar: mobile 360 px, sin scroll horizontal, sin colisiones de selectores,
   sin errores de consola, imágenes con dimensiones, CTAs funcionando, textos coincidiendo con el copy.
   **Comprobar los colores computados, no solo el CSS escrito:** una regla genérica de elemento
   (`.card p`) gana a una de clase (`.card__tag`) y deja texto ilegible sin avisar.
5. **Para verlo fuera de GemPages:** `./preview.sh <marca>/landings/<archivo>.html` genera un
   `.preview.html` con la cabecera del tema. Los fragmentos **no llevan `<meta viewport>`** —lo pone
   Shopify—, así que abiertos en crudo el móvil los renderiza a ~980 px, con el layout de escritorio
   encogido. No es un fallo de la landing: es que le falta el documento que la envuelve.
5. No tocar producción (publicar/despublicar páginas, cambiar el tema) sin petición explícita.

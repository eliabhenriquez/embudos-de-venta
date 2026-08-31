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
| [`cabello/`](cabello/) | Cabello con cuerpo desde la raíz, uñas resistentes | Copy listo, `august.html` vacío |

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
- El bloque abre con `data-rsi-banner`, que es lo que activa el banner del formulario de Releasit.

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

# Optimización de imágenes

Guía transversal. Las landings viven en Shopify y el tráfico es mayoritariamente mobile de pago:
el peso de las imágenes es la palanca de rendimiento más grande que tenemos.

## 1. Formato: WebP

Medido sobre una foto real de producto (`IMG_5671`, 4284×5712) reducida a 1200px de ancho:

| Formato | Peso | vs JPEG |
|---|---|---|
| JPEG q82 | 192 KB | — |
| **WebP q82** | **60 KB** | **−69%** |
| AVIF q60 | 36 KB | −81% |

**Usamos WebP, no AVIF**, aunque AVIF pese un 40% menos. El motivo es el CDN de Shopify: procesa
WebP de forma nativa (incluye el redimensionado con `?width=`), mientras que un AVIF subido a
Archivos se sirve tal cual, sin transformaciones. Perderíamos las imágenes responsive por ahorrar
unos KB. AVIF se reevalúa cuando Shopify lo soporte en su pipeline.

## 2. El CDN de Shopify ya hace la mitad del trabajo

Verificado en `mimacolombia.com` sobre un archivo real:

```
imagen original ................................. 176 KB
?width=600 ...................................... 62 KB   (redimensiona en servidor)
?width=600 + Accept: image/webp ................. 38 KB   (convierte a WebP solo)
```

Es decir: **Shopify negocia el formato con el navegador y sirve WebP automáticamente**, y `?width=`
genera la variante del tamaño pedido. Por eso:

- Se sube **una sola** imagen por asset, ya optimizada, al tamaño máximo que se vaya a mostrar.
- En el HTML se usa `?width=` con `srcset` y `sizes`, y el CDN se encarga del resto.
- No hace falta generar y subir 3 tamaños a mano.

## 3. Dónde se optimiza: aquí, en el repo

La optimización es un paso versionado del repo, no algo que se haga a mano en una web externa.
Así el resultado es reproducible, revisable y consistente entre marcas.

Los originales se quedan en `product-images/<producto>/` (foto de producto) y
`humanized-images/<producto>/<persona>/` (UGC), **ambos en la raíz del repo y fuera de git**. Los
optimizados salen a `<marca>/landings/<producto>/assets/`, que comparten todos los ángulos del
producto: antes de optimizar una imagen, comprueba si ya está ahí.

Requiere ImageMagick (`brew install imagemagick`).

```sh
# Foto de producto → 1200px de ancho para hero, 1000px para secciones
magick origen.jpg -resize '1200x>' -strip -quality 82 destino.webp

# UGC (nativas ~510px): NUNCA escalar hacia arriba, solo convertir
magick origen.png -resize '510x>' -strip -quality 84 destino.webp
```

- `-resize '1200x>'` — el `>` evita ampliar imágenes que ya son más pequeñas. Ampliar solo añade
  peso y emborrona.
- `-strip` — quita EXIF: menos peso y, en fotos de UGC, evita publicar geolocalización.
- `q82–84` — el punto donde WebP deja de distinguirse del original a simple vista.

## 4. Tamaños de referencia

| Uso | Ancho a subir |
|---|---|
| Hero de producto | 1200 px |
| Foto de sección | 1000 px |
| Card / testimonio | tamaño nativo si es UGC (~510 px) |
| Icono o logo | SVG, no bitmap |

## 5. Nombres y organización en Shopify

**Shopify Archivos (Contenido → Archivos) no tiene carpetas: es una lista plana.** La organización se
consigue con prefijos en el nombre, que además agrupan al ordenar alfabéticamente y funcionan con el
buscador:

```
landings-sknglow-bottle-hero.webp
landings-sknglow-ugc-isabella.webp
landings-mimacalm-hero.webp
```

Patrón: `landings-<producto>-<uso>.webp`. El nombre del repo y el del CDN deben ser **idénticos**
para poder rastrear cualquier imagen de la landing hasta su original.

La URL resultante es predecible:

```
https://www.mimacolombia.com/cdn/shop/files/<nombre-del-archivo>
```

**El admin de Shopify enseña otra URL para el mismo fichero** y es fácil pensar que la nuestra está mal:

```
https://cdn.shopify.com/s/files/1/0994/1663/7809/files/<nombre>.webp?v=1788327383
```

Son equivalentes. `cdn.shopify.com/s/files/1/<id-de-tienda>/files/` es el CDN en crudo y
`<tienda>/cdn/shop/files/` es el mismo CDN servido bajo el dominio de la tienda; `?v=` es solo el sello
de versión que añade el admin y no hace falta. Usamos la del dominio de la tienda porque no lleva el id
numérico de la tienda y `check-cdn.sh` la reconoce. Verificado el 2026-09-02 en etermacolombia.com: las
dos responden 200 con el mismo contenido y `?width=` funciona en ambas.

Si tras subir los ficheros siguen viéndose rotos, casi siempre es la caché del navegador con los 404
de antes de subirlos: recarga forzada (Cmd+Shift+R) o ventana privada. `check-cdn.sh` no engaña.

### 🔴 Versionado: nunca reemplaces una imagen con el mismo nombre

**El CDN de Shopify cachea por nombre de archivo y no suelta la versión vieja.** Subir un fichero nuevo
encima de uno que ya existía no basta, y **borrarlo de Contenido → Archivos tampoco**: el origen
devuelve 404 pero los navegadores y los nodos de borde siguen sirviendo la copia antigua durante mucho
tiempo. En la práctica el cambio no se ve, y no hay forma de forzarlo desde el HTML.

La única solución fiable es **cambiar la URL**, y eso significa cambiar el nombre:

| Situación | Nombre |
|---|---|
| Imagen nueva, nunca subida | `landings-sknglow-cab-hero.webp` |
| Se modifica esa imagen | `landings-sknglow-cab-hero-v2.webp` |
| Se vuelve a modificar | `landings-sknglow-cab-hero-v3.webp` |

La primera versión **no lleva sufijo**. Cada reemplazo posterior sube el contador. Se actualiza la
referencia en el HTML de la landing y se sube el fichero nuevo; **la versión anterior la borra el
responsable de la tienda** cuando el cambio ya está publicado y verificado.

No sirven las alternativas que parecen más cómodas:

- `?v=2` o cualquier query propia — Shopify usa `?width=` para generar derivados y **ignora los
  parámetros que no conoce**, así que la URL cacheada es la misma.
- Borrar y volver a subir con el mismo nombre — es exactamente el caso que falla.

**Antes de dar por buena una imagen modificada, comprueba qué hay realmente publicado:**

```sh
./check-cdn.sh mima/landings/sknglow/cabello/august.html
```

Lista cada imagen referenciada y si responde 200 (ya está) o 404 (falta subirla). Es la forma de
detectar tanto una imagen que falta como una que se cambió sin versionar.

## 6. En el HTML

```html
<img
	src="https://www.mimacolombia.com/cdn/shop/files/landings-sknglow-bottle-hero.webp?width=900"
	srcset="…?width=600 600w, …?width=900 900w, …?width=1200 1200w"
	sizes="(max-width: 900px) 92vw, 46vw"
	width="1200" height="1600"
	alt="Descripción real de lo que se ve"
	fetchpriority="high" decoding="async">
```

- `width` y `height` **siempre**, con las dimensiones reales: es lo que evita el salto de layout (CLS).
- `fetchpriority="high"` y **sin** `loading="lazy"` solo en la imagen del hero (el LCP).
- Todo lo demás: `loading="lazy" decoding="async"`.

## 7. Referencia: el set de SKNGLOW

8 imágenes, **472 KB en total** antes de que el CDN aplique `?width=`: 4 de producto (1200/1000 px) y
4 de UGC a resolución nativa. Los originales sumaban 113 MB.

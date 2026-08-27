# Tipografía de marca en Shopify

Cómo hacer que la tipografía del manual funcione en la tienda. Guía transversal.

## 1. Lo primero: la licencia

El manual de MIMA especifica **AOK Buenos Aires**. Esa fuente es de **Luzi Type**
(Luzi Gantenbein, fundición suiza) y es **comercial**.

**"AOK Buenos Aires" no es la versión que se vende.** Es un corte a medida hecho para AOK, la
aseguradora sanitaria alemana. Lo que se distribuye en las webs de "fuentes gratis" son esos archivos,
que **no tienen licencia de redistribución ni de uso web**. Publicarlos en el CDN de una tienda que
factura es exponerse a una reclamación de la fundición, y además el archivo queda a la vista de
cualquiera en el código.

Lo correcto es comprar la familia comercial **Buenos Aires** en https://luzi-type.ch/buenosaires con
**licencia web**. La licencia web incluye ya los `.woff2`, así que no hay que convertir nada.

Al comprar conviene comprobar dos cosas:

- Que la licencia cubra el **dominio** de la tienda y el volumen de visitas previsto.
- Si venden la **versión variable** (`woff2` variable). Merece la pena: un solo archivo cubre todos
  los pesos, en vez de uno por peso.

Si el presupuesto o los plazos no dan, el camino honesto es elegir una alternativa con licencia libre
y dejar constancia en el manual. No usar el archivo de AOK "mientras tanto".

## 2. Formato: WOFF2 y nada más

WOFF2 comprime mejor que cualquier otra opción y lo soportan todos los navegadores en uso. No hace
falta servir `woff`, `ttf`, `otf` ni `eot`: solo añaden peso y superficie de error.

Si la fundición solo entrega OTF o TTF, se convierten con `fontTools`:

```sh
pip install "fonttools[woff]" brotli
pyftsubset BuenosAires-Regular.otf \
	--flavor=woff2 \
	--layout-features='*' \
	--unicodes='U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+2000-206F,U+20AC,U+2122' \
	--output-file=BuenosAires-Regular.woff2
```

El rango de `--unicodes` es latín básico + latín-1 + puntuación + símbolo de euro: suficiente para
español y recorta bastante peso frente a la fuente completa.

## 3. Dónde se suben: Contenido → Archivos

**Contenido → Archivos**, el mismo sitio que las imágenes. Shopify acepta `.woff2` ahí y lo sirve con
`Access-Control-Allow-Origin: *` (verificado), que es la cabecera que `@font-face` necesita para cargar
desde otro origen.

Esto es lo que permite que **una sola URL absoluta funcione en los dos entornos**:

```
https://<tienda>/cdn/shop/files/aok-buenos-aires-400.woff2
```

- En **GemPages** carga porque el bloque está en el mismo dominio.
- En la **vista previa local** (`./preview.sh`) carga por la red, gracias al CORS abierto.

La alternativa son los **assets del tema**, pero su URL incluye el id del tema
(`/cdn/shop/t/<id>/assets/…`) y se rompe al duplicar o actualizar el tema. Solo compensa si además se
va a declarar la tipografía a nivel de tema (§5).

Subir solo los pesos que se usan. En la landing de SKNGLOW son cuatro: 400, 400 itálica, 600 y 700.

## 4. Declararla en la propia landing

El `@font-face` va en el `<style>` del bloque, antes de los tokens. Así la landing sigue siendo
autocontenida (regla de `AGENTS.md` §4.1) y no depende de que nadie toque el tema:

```css
	@font-face {
		font-family: 'AOK Buenos Aires';
		src: url('https://<tienda>/cdn/shop/files/aok-buenos-aires-400.woff2') format('woff2');
		font-weight: 400;
		font-style: normal;
		font-display: swap;
	}
```

Dos detalles que importan:

- **`font-display: swap`.** Sin esto hay un tramo de texto invisible mientras carga la fuente, y eso
  penaliza el LCP.
- **El peso más alto disponible se declara como rango.** AOK Buenos Aires llega hasta Bold (700), pero
  los titulares usan 800. Si no se cubre, el navegador **simula** la negrita y deforma las letras:

```css
	@font-face {
		font-family: 'AOK Buenos Aires';
		src: url('…aok-buenos-aires-700.woff2') format('woff2');
		font-weight: 700 800;   /* el archivo real cubre ambos */
		font-style: normal;
		font-display: swap;
	}
```

Comprobación de que no hay negrita simulada:

```js
document.fonts.forEach(f => f.family.includes('AOK') && console.log(f.weight, f.status))
// debe aparecer "700 800 loaded", no "700 loaded" a secas
```

## 5. Si se quiere en toda la tienda

Lo anterior cubre la landing. El **modal de Releasit y la cabecera y pie del tema** viven fuera del
bloque, así que para que también usen la tipografía hay que repetir el mismo `@font-face` en
`theme.liquid` y apuntar el `body` del tema a la familia:

```css
body { font-family: 'AOK Buenos Aires', 'Helvetica Neue', Helvetica, Arial, sans-serif; }
```

Con eso, el token `--mima-font` de `<marca>/shared/releasit-form.css` resuelve solo.

## 6. Comprobar que funciona

En la consola del navegador, sobre la tienda publicada:

```js
document.fonts.check('400 16px "Buenos Aires"')   // debe dar true
getComputedStyle(document.body).fontFamily        // debe empezar por Buenos Aires
```

Y en la pestaña Network, filtrando por `Font`: solo deben aparecer los pesos declarados, una vez cada
uno, en `woff2`.

## 7. Qué no hacer

- **No usar los archivos de "AOK Buenos Aires" de las webs de fuentes gratis.** Sin licencia web.
- **No cargar la fuente desde un CDN de terceros** ajeno a Shopify: una dependencia externa más que
  puede caerse o cambiar.
- **No subir la familia completa** si solo se usan tres pesos.
- **No declarar `font-family` en cada landing.** Se declara una vez en el tema y todo lo demás hereda.

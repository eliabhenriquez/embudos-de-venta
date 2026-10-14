#!/usr/bin/env sh
# Parte un fragmento de landing en las tres pestañas del Custom Code de GemPages.
#
# En el repo cada landing es UN solo fichero autocontenido: <section>, <style> y
# <script> seguidos. Eso es lo que permite previsualizarla entera y medirla. Pero
# en GemPages el Custom Code tiene tres pestañas separadas —HTML, CSS y JS— y el
# CSS y el JS van SIN sus etiquetas <style> y <script>: GemPages las pone. Copiar
# el fichero entero en la pestaña HTML deja el CSS como texto y la landing sale
# rota (`docs/releasit-form-styling.md` §4.4).
#
#   ./split-tabs.sh eterma/landings/kit-reset-digestivo/general/september.html
#
# Genera, junto al fragmento:
#   <nombre>.tab-html.html   → pestaña HTML
#   <nombre>.tab-css.css     → pestaña CSS  (detrás va shared/releasit-form.css)
#   <nombre>.tab-js.js       → pestaña JS
#
# El CSS sale minificado y el JS compactado (`minify.mjs` explica por qué el JS
# no se minifica del todo). Los comentarios que explican el porqué de cada cosa
# viven en el fragmento, que es lo que se lee y se edita; dentro de GemPages no
# le sirven a nadie. Con `--legible` se generan sin tocar, para depurar.
#
# Son ficheros DERIVADOS: se regeneran, nunca se editan a mano. Lo que se edita
# es siempre el fragmento.

set -eu

SRC=""
READABLE="no"
for arg in "$@"; do
	case "$arg" in
		--legible) READABLE="si" ;;
		*) SRC="$arg" ;;
	esac
done

if [ -z "$SRC" ] || [ ! -f "$SRC" ]; then
	echo "uso: ./split-tabs.sh [--legible] <ruta-al-fragmento.html>" >&2
	exit 1
fi

REPO_DIR=$(dirname "$0")
BASE="${SRC%.html}"

# Las tres etiquetas van solas y a columna cero en todas las landings; si algún
# día dejan de ir así, es mejor fallar que generar pestañas a medias.
style_open=$(grep -n '^<style>$' "$SRC" | cut -d: -f1)
style_close=$(grep -n '^</style>$' "$SRC" | cut -d: -f1)
script_open=$(grep -n '^<script>$' "$SRC" | cut -d: -f1)
script_close=$(grep -n '^</script>$' "$SRC" | cut -d: -f1)

for mark in "$style_open" "$style_close" "$script_open" "$script_close"; do
	case "$mark" in
		'' | *[!0-9]*)
			echo "no encuentro <style>/<script> a columna cero en $SRC" >&2
			exit 1
			;;
	esac
done

sed -n "1,$((style_open - 1))p" "$SRC" > "$BASE.tab-html.html"
sed -n "$((style_open + 1)),$((style_close - 1))p" "$SRC" > "$BASE.tab-css.css"
sed -n "$((script_open + 1)),$((script_close - 1))p" "$SRC" > "$BASE.tab-js.js"

printf 'pestañas generadas:\n'
printf '  HTML  %s  (%s líneas)\n' "$BASE.tab-html.html" "$(wc -l < "$BASE.tab-html.html" | tr -d ' ')"

if [ "$READABLE" = "si" ]; then
	printf '  CSS   %s  (%s líneas, sin minificar)\n' "$BASE.tab-css.css" "$(wc -l < "$BASE.tab-css.css" | tr -d ' ')"
	printf '  JS    %s  (%s líneas, sin compactar)\n' "$BASE.tab-js.js" "$(wc -l < "$BASE.tab-js.js" | tr -d ' ')"
	exit 0
fi

printf '  CSS   '
node "$REPO_DIR/minify.mjs" --css "$BASE.tab-css.css" "$BASE.tab-css.css"
printf '  JS    '
node "$REPO_DIR/minify.mjs" --js "$BASE.tab-js.js" "$BASE.tab-js.js"

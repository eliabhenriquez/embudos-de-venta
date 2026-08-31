#!/usr/bin/env sh
# Genera un HTML completo y navegable a partir de un fragmento de landing.
#
# Los fragmentos de landings/ NO llevan <html>, <head> ni <body>: eso lo pone
# Shopify/GemPages. Al abrirlos sueltos falta el meta viewport y el móvil los
# renderiza con un viewport de ~980px, o sea, con el layout de escritorio
# encogido. Este script añade la misma cabecera que usa el tema para que la
# vista previa coincida con producción.
#
#   ./preview.sh mima/landings/sknglow/piel/august.html
#
# Genera <nombre>.preview.html junto al fragmento. Es un archivo derivado:
# se regenera, nunca se edita a mano.

set -eu

SRC="${1:-}"
if [ -z "$SRC" ] || [ ! -f "$SRC" ]; then
	echo "uso: ./preview.sh <ruta-al-fragmento.html>" >&2
	exit 1
fi

OUT="${SRC%.html}.preview.html"
TITLE=$(basename "${SRC%.html}")

{
	printf '%s\n' '<!doctype html>'
	printf '%s\n' '<html lang="es">'
	printf '%s\n' '<head>'
	printf '%s\n' '<meta charset="utf-8">'
	# Idéntico al del tema de Shopify: sin esto el móvil miente sobre el ancho
	printf '%s\n' '<meta name="viewport" content="width=device-width,initial-scale=1">'
	printf '%s\n' '<meta name="robots" content="noindex">'
	printf '<title>%s · vista previa</title>\n' "$TITLE"
	printf '%s\n' '<style>'
	printf '%s\n' 'body{margin:0}'
	# --- Simulación del entorno real de Shopify + tema Dawn ---
	# Sin esto la vista previa miente: el bloque se ve perfecto en local y
	# se rompe al publicar. Estas tres reglas son las del tema en producción.
	printf '%s\n' 'html{font-size:62.5%}          /* 1rem = 10px, no 16px */'
	printf '%s\n' 'body{font-size:1.5rem;font-family:Helvetica,Arial,sans-serif}'
	printf '%s\n' 'a:empty,article:empty,div:empty,dl:empty,h1:empty,h2:empty,h3:empty,h4:empty,h5:empty,h6:empty,p:empty,section:empty,ul:empty{display:none}'
	# Fuente deliberadamente distinta: si un titular sale en serif, es que
	# la regla de etiqueta del tema le está ganando a la nuestra.
	printf '%s\n' '.h0,.h1,.h2,.h3,.h4,.h5,h1,h2,h3,h4,h5{font-family:Georgia,serif}'
	printf '%s\n' '</style>'
	printf '%s\n' '</head>'
	printf '%s\n' '<body>'
	cat "$SRC"
	printf '%s\n' '</body>'
	printf '%s\n' '</html>'
} > "$OUT"

echo "vista previa generada: $OUT"

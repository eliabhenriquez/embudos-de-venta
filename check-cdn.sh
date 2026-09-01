#!/usr/bin/env sh
# Comprueba qué imágenes de una landing están realmente publicadas en el CDN.
#
# El CDN de Shopify cachea por nombre de archivo y no suelta la versión vieja
# ni borrándola (ver docs/image-optimization.md §5). Por eso una imagen
# modificada hay que subirla con sufijo -v2, -v3... Este script dice qué falta
# por subir y qué referencia el HTML pero no existe en el repo.
#
#   ./check-cdn.sh mima/landings/sknglow/cabello/august.html

set -eu

SRC="${1:-}"
if [ -z "$SRC" ] || [ ! -f "$SRC" ]; then
	echo "uso: ./check-cdn.sh <ruta-a-la-landing.html>" >&2
	exit 1
fi

# La base del CDN sale del propio archivo: así vale para cualquier marca.
BASE=$(grep -o 'https://[a-z0-9.-]*/cdn/shop/files' "$SRC" | head -1)
if [ -z "$BASE" ]; then
	echo "no encuentro ninguna URL de CDN en $SRC" >&2
	exit 1
fi

# assets/ del producto: dos niveles por encima del ángulo.
# Las fuentes no viven ahí sino en el shared/ de la marca, así que se buscan
# en los dos sitios antes de dar un fichero por desaparecido.
ASSETS=$(dirname "$(dirname "$SRC")")/assets
SHARED=$(dirname "$(dirname "$(dirname "$(dirname "$SRC")")")")/shared/fonts/webfonts

echo "landing: $SRC"
echo "cdn:     $BASE"
echo "assets:  $ASSETS"
echo

faltan=0
sin_local=0

for name in $(grep -o "$BASE/[A-Za-z0-9._-]*" "$SRC" | sed "s#$BASE/##" | sort -u); do
	code=$(curl -s -o /dev/null -w '%{http_code}' -I "$BASE/$name" || echo "ERR")
	if [ -f "$ASSETS/$name" ] || [ -f "$SHARED/$name" ]; then
		local_mark=""
	else
		local_mark="  (no está en el repo)"
		sin_local=$((sin_local + 1))
	fi

	case "$code" in
		200) printf '  ok     %s%s\n' "$name" "$local_mark" ;;
		*)   printf '  FALTA  %s  [%s]%s\n' "$name" "$code" "$local_mark"; faltan=$((faltan + 1)) ;;
	esac
done

echo
if [ "$faltan" -eq 0 ]; then
	echo "Todas las imágenes están publicadas."
else
	echo "$faltan por subir a Contenido → Archivos."
fi
[ "$sin_local" -eq 0 ] || echo "$sin_local referenciadas que no están en el repo — revisa el nombre."

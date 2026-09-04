#!/usr/bin/env bash
#
# upload-seed-apks.sh — sube a R2 los APK que el seed da por publicados.
#
# El seed (packages/db/prisma/seed.ts) crea las versiones de TicTacToe80s y
# SnakeArcade80s en estado APPROVED apuntando a una fileKey fija. Si el fichero
# no esta en el bucket, la ficha carga bien pero el boton de descarga devuelve
# NoSuchKey (404 de R2). Este script sube los ficheros a esas mismas claves.
#
# Comprueba el sha256 antes de subir: si no coincide con el que guarda el seed,
# aborta. Asi el fileSha256 de la base de datos siempre describe el binario real.
#
# Variables (las mismas que usa el API en Railway):
#   CF_ACCOUNT_ID   (requerida) id de cuenta de Cloudflare
#   R2_ACCESS_KEY   (requerida) access key id del token de R2
#   R2_SECRET_KEY   (requerida) secret access key del token de R2
#   R2_BUCKET       (opcional)  por defecto altstore-apks
#
# Rutas locales de los APK (opcionales, hay valores por defecto):
#   TICTACTOE_APK, SNAKE_APK
#
# Uso:
#   CF_ACCOUNT_ID=... R2_ACCESS_KEY=... R2_SECRET_KEY=... ./scripts/upload-seed-apks.sh
#
# Solo lee y sube. No borra nada del bucket.

set -euo pipefail

BUCKET="${R2_BUCKET:-altstore-apks}"

TICTACTOE_APK="${TICTACTOE_APK:-$HOME/projects/FORMACIÓN/TicTacToe80s/TicTacToe80s.apk}"
SNAKE_APK="${SNAKE_APK:-$HOME/projects/FORMACIÓN/snake-arcade-80s/app-release.apk}"

# Clave en el bucket + sha256 esperado, copiados de packages/db/prisma/seed.ts.
TICTACTOE_KEY="apps/com.altstore.tictactoe80s/1.0.0/TicTacToe80s.apk"
TICTACTOE_SHA="0c2abd632095dcf39209911deff44ee84278956edcae95da102645f5ad35e1c4"
SNAKE_KEY="apps/com.altstore.snakearcade80s/1.0.0/SnakeArcade80s.apk"
SNAKE_SHA="a370d642eae4c7f6fada3cf308ba6789b936b4a358f6a5a46ae7d8358e0a136c"

for var in CF_ACCOUNT_ID R2_ACCESS_KEY R2_SECRET_KEY; do
  if [[ -z "${!var:-}" ]]; then
    echo "FAIL falta $var" >&2
    exit 1
  fi
done

command -v aws >/dev/null || {
  echo "FAIL hace falta el aws cli (R2 habla S3)" >&2
  exit 1
}

ENDPOINT="https://${CF_ACCOUNT_ID}.r2.cloudflarestorage.com"

# R2 no implementa el checksum por defecto que anade el aws cli v2.
export AWS_REQUEST_CHECKSUM_CALCULATION=when_required
export AWS_RESPONSE_CHECKSUM_VALIDATION=when_required
export AWS_ACCESS_KEY_ID="$R2_ACCESS_KEY"
export AWS_SECRET_ACCESS_KEY="$R2_SECRET_KEY"
export AWS_DEFAULT_REGION=auto

fail=0

upload_apk() {
  local label="$1" path="$2" key="$3" want_sha="$4"

  if [[ ! -f "$path" ]]; then
    echo "SKIP $label — no encuentro $path"
    fail=1
    return
  fi

  local got_sha
  got_sha=$(shasum -a 256 "$path" | cut -d' ' -f1)
  if [[ "$got_sha" != "$want_sha" ]]; then
    echo "FAIL $label — sha256 distinto del que espera el seed"
    echo "     fichero: $got_sha"
    echo "     seed   : $want_sha"
    fail=1
    return
  fi

  if aws s3api head-object --endpoint-url "$ENDPOINT" \
      --bucket "$BUCKET" --key "$key" >/dev/null 2>&1; then
    echo "OK   $label — ya estaba en el bucket"
    return
  fi

  echo "  subiendo $label ($(du -h "$path" | cut -f1))…"
  if aws s3api put-object --endpoint-url "$ENDPOINT" \
      --bucket "$BUCKET" --key "$key" --body "$path" \
      --content-type application/vnd.android.package-archive >/dev/null; then
    echo "OK   $label -> s3://$BUCKET/$key"
  else
    echo "FAIL $label — la subida no ha ido"
    fail=1
  fi
}

echo "Bucket: $BUCKET"
echo "Endpoint: $ENDPOINT"
echo

upload_apk "TicTacToe80s" "$TICTACTOE_APK" "$TICTACTOE_KEY" "$TICTACTOE_SHA"
upload_apk "SnakeArcade80s" "$SNAKE_APK" "$SNAKE_KEY" "$SNAKE_SHA"

echo
if [[ "$fail" -eq 0 ]]; then
  echo "Listo. Comprueba la descarga en /apps/tictactoe80s y /apps/snakearcade80s."
else
  echo "Ha quedado algo pendiente (mira los FAIL/SKIP de arriba)." >&2
fi

exit "$fail"

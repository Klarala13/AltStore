#!/usr/bin/env bash
#
# keepalive.sh — evita que Supabase pause el proyecto por inactividad.
#
# Supabase pausa los proyectos del plan free tras ~7 dias sin actividad.
# Cada pausa obliga a reconfigurar Railway a mano, asi que lanzamos un
# ping cada 3 dias desde GitHub Actions (.github/workflows/keepalive.yml).
#
# Hace dos pings:
#   1. REST de Supabase  -> registra actividad en el propio proyecto.
#   2. GET /apps del API -> mantiene Railway despierto y hace una query real
#                           contra Postgres (Prisma), que es la senal mas fiable.
#
# Variables:
#   SUPABASE_URL            (requerida) https://<ref>.supabase.co
#   SUPABASE_ANON_KEY       (una de las dos) clave anon, preferida
#   SUPABASE_SERVICE_ROLE_KEY (fallback si no hay anon)
#   API_URL                 (opcional) base del API en Railway
#
# Uso local:  SUPABASE_URL=... SUPABASE_ANON_KEY=... ./scripts/keepalive.sh

set -euo pipefail

CURL_OPTS=(--silent --show-error --location --max-time 30 --retry 3 --retry-delay 5 --retry-all-errors)

fail=0

# Un secret con una URL que no es http se veia antes como "HTTP 000000" tras
# tres reintentos de curl. Se comprueba la forma antes de llamar.
require_http_url() {
  local name="$1" value="$2"
  if [[ ! "$value" =~ ^https?:// ]]; then
    echo "FAIL $name no es una URL http(s): ${value%%:*}://…" >&2
    echo "     Revisa el secret $name. Tiene que ser la URL publica del" >&2
    echo "     servicio, no una cadena de conexion a Postgres." >&2
    return 1
  fi
}

ping_url() {
  local label="$1" url="$2"
  shift 2
  local code
  code=$(curl "${CURL_OPTS[@]}" --output /dev/null --write-out "%{http_code}" "$@" "$url" || echo "000")
  if [[ "$code" =~ ^2|^3 ]]; then
    echo "OK   $label -> HTTP $code"
  else
    echo "FAIL $label -> HTTP $code"
    if [[ "$code" == "401" || "$code" == "403" ]]; then
      echo "     $code es rechazo de credenciales, no que el servicio este caido." >&2
      echo "     Revisa la clave que usa este ping." >&2
    fi
    fail=1
  fi
}

if [[ -z "${SUPABASE_URL:-}" ]]; then
  echo "FAIL falta SUPABASE_URL" >&2
  exit 1
fi

require_http_url SUPABASE_URL "$SUPABASE_URL" || exit 1

supabase_key="${SUPABASE_ANON_KEY:-${SUPABASE_SERVICE_ROLE_KEY:-}}"
if [[ -z "$supabase_key" ]]; then
  echo "FAIL falta SUPABASE_ANON_KEY o SUPABASE_SERVICE_ROLE_KEY" >&2
  exit 1
fi

# Supabase tiene dos generaciones de clave y no aceptan las mismas cabeceras:
#
#   - Las de siempre (anon / service_role) son un JWT. Valen en `apikey` y
#     tambien en `Authorization: Bearer`.
#   - Las nuevas (sb_publishable_… / sb_secret_…) NO son un JWT. Van en
#     `apikey`. Si se mandan ademas en `Authorization: Bearer`, PostgREST
#     intenta leerlas como JWT, no puede, y contesta 401 aunque la clave sea
#     correcta.
#
# `apikey` a secas basta para autenticar como rol anon en los dos casos, asi
# que se prueba eso primero. Si falla, se reintenta con las dos cabeceras por
# si el proyecto espera la forma antigua. El log dice cual funciono.
ping_supabase() {
  local url="${SUPABASE_URL%/}/rest/v1/"
  local code

  code=$(curl "${CURL_OPTS[@]}" --output /dev/null --write-out "%{http_code}" \
    --header "apikey: ${supabase_key}" "$url" || echo "000")
  if [[ "$code" =~ ^2|^3 ]]; then
    echo "OK   supabase rest -> HTTP $code (cabecera apikey)"
    return
  fi

  local first="$code"
  code=$(curl "${CURL_OPTS[@]}" --output /dev/null --write-out "%{http_code}" \
    --header "apikey: ${supabase_key}" \
    --header "Authorization: Bearer ${supabase_key}" "$url" || echo "000")
  if [[ "$code" =~ ^2|^3 ]]; then
    echo "OK   supabase rest -> HTTP $code (apikey + Bearer)"
    return
  fi

  echo "FAIL supabase rest -> HTTP $first con apikey, HTTP $code con apikey+Bearer"
  if [[ "$first" == "401" && "$code" == "401" ]]; then
    echo "     401 por las dos vias es la clave, no el proyecto." >&2
    echo "     Cogela de Supabase > Settings > API Keys. Vale la 'anon public'" >&2
    echo "     o la 'sb_publishable_…'. Pegala sin espacios ni salto de linea:" >&2
    echo "     un \\n al final basta para que Supabase la rechace entera." >&2
  fi
  fail=1
}

ping_supabase

if [[ -n "${API_URL:-}" ]]; then
  if require_http_url API_URL "$API_URL"; then
    ping_url "api /apps" "${API_URL%/}/apps?limit=1"
  else
    fail=1
  fi
else
  echo "SKIP api /apps (API_URL no definida)"
fi

exit "$fail"

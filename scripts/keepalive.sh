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

# El ping no puede ir a /rest/v1/ (la raiz que sirve el OpenAPI): ese endpoint
# solo lo admiten las claves secretas. Con una publishable contesta 401 con
# {"message":"Secret API key required"}, que se lee igual que "la clave no vale"
# y manda a cambiar una clave que estaba bien.
#
# Se pide una tabla de verdad, que ademas es mejor senal: es una consulta a
# Postgres via PostgREST, no solo tocar la puerta del proyecto. Si falla, se
# prueba /auth/v1/health, que responde sin llegar a la base de datos: sirve para
# que Supabase no pause el proyecto, pero se avisa de que Postgres no se toco.
#
# La clave va solo en `apikey`. Las nuevas (sb_publishable_…) no son un JWT, asi
# que mandarlas ademas en `Authorization: Bearer` hace que PostgREST intente
# leerlas como JWT y devuelva 401 aunque sean correctas.
SUPABASE_KEEPALIVE_TABLE="${SUPABASE_KEEPALIVE_TABLE:-App}"

ping_supabase() {
  local base="${SUPABASE_URL%/}"
  local code

  local table_url="${base}/rest/v1/${SUPABASE_KEEPALIVE_TABLE}?select=id&limit=1"
  code=$(curl "${CURL_OPTS[@]}" --output /dev/null --write-out "%{http_code}" \
    --header "apikey: ${supabase_key}" "$table_url" || echo "000")
  if [[ "$code" =~ ^2|^3 ]]; then
    echo "OK   supabase postgres -> HTTP $code (select en ${SUPABASE_KEEPALIVE_TABLE})"
    return
  fi

  local table_code="$code"
  code=$(curl "${CURL_OPTS[@]}" --output /dev/null --write-out "%{http_code}" \
    --header "apikey: ${supabase_key}" "${base}/auth/v1/health" || echo "000")
  if [[ "$code" =~ ^2|^3 ]]; then
    echo "OK   supabase health -> HTTP $code"
    echo "WARN el select en ${SUPABASE_KEEPALIVE_TABLE} dio HTTP ${table_code}, asi que Postgres no se toco."
    echo "     Comprueba SUPABASE_KEEPALIVE_TABLE: PostgREST distingue mayusculas."
    return
  fi

  echo "FAIL supabase -> HTTP ${table_code} en la tabla, HTTP ${code} en health"
  if [[ "$table_code" == "401" && "$code" == "401" ]]; then
    echo "     401 en los dos sitios apunta a la clave." >&2
    echo "     Cogela de Supabase > Settings > API Keys: vale la 'anon public' o" >&2
    echo "     la 'sb_publishable_…', no la secreta. Pegala sin espacios ni salto" >&2
    echo "     de linea: un \\n al final basta para que Supabase la rechace." >&2
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

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

ping_url() {
  local label="$1" url="$2"
  shift 2
  local code
  code=$(curl "${CURL_OPTS[@]}" --output /dev/null --write-out "%{http_code}" "$@" "$url" || echo "000")
  if [[ "$code" =~ ^2|^3 ]]; then
    echo "OK   $label -> HTTP $code"
  else
    echo "FAIL $label -> HTTP $code"
    fail=1
  fi
}

if [[ -z "${SUPABASE_URL:-}" ]]; then
  echo "FAIL falta SUPABASE_URL" >&2
  exit 1
fi

supabase_key="${SUPABASE_ANON_KEY:-${SUPABASE_SERVICE_ROLE_KEY:-}}"
if [[ -z "$supabase_key" ]]; then
  echo "FAIL falta SUPABASE_ANON_KEY o SUPABASE_SERVICE_ROLE_KEY" >&2
  exit 1
fi

ping_url "supabase rest" "${SUPABASE_URL%/}/rest/v1/" \
  --header "apikey: ${supabase_key}" \
  --header "Authorization: Bearer ${supabase_key}"

if [[ -n "${API_URL:-}" ]]; then
  ping_url "api /apps" "${API_URL%/}/apps?limit=1"
else
  echo "SKIP api /apps (API_URL no definida)"
fi

exit "$fail"

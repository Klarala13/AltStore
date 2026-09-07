/**
 * URL publica del sitio, para canonicals, sitemap y Open Graph.
 *
 * Antes habia un dominio escrito a mano como valor por defecto. Eso salio mal:
 * el dominio no era nuestro (estaba aparcado por otra persona), asi que
 * mientras NEXT_PUBLIC_SITE_URL no estuviera puesta en Vercel, el sitemap y
 * todos los canonical mandaban a Google a la web de un tercero.
 *
 * Asi que no se adivina ningun dominio. El orden es:
 *   1. NEXT_PUBLIC_SITE_URL, cuando hay dominio propio.
 *   2. El dominio de produccion que Vercel inyecta solo. Sobrevive a que el
 *      proyecto se renombre, que es justo lo que acaba de pasar.
 *   3. localhost, para desarrollo.
 *
 * Peor caso: un canonical que apunta a la URL de Vercel. Es fea, pero es
 * nuestra y responde.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}

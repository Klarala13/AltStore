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

/**
 * URL de privacidad por defecto que los formularios envian al crear una app.
 *
 * Existe aparte de getSiteUrl() porque los formularios son componentes de
 * cliente y VERCEL_PROJECT_PRODUCTION_URL solo existe en el servidor. Ahi
 * getSiteUrl() caeria a localhost dentro del navegador de un usuario.
 *
 * Por que importa tanto: `privacyUrl` es obligatorio en el DTO (`@IsUrl()`) y
 * ningun formulario lo pinta, asi que se manda a ciegas. Cuando esto devolvia
 * cadena vacia, el API rechazaba la creacion con «privacyUrl must be a URL
 * address» — un error sobre un campo que no esta en pantalla, imposible de
 * arreglar desde la interfaz. Tuvo rotas las dos vias de alta de app.
 *
 * Llamala DENTRO del handler, nunca en el ambito del modulo: durante el
 * render en servidor `window` no existe.
 */
export function getDefaultPrivacyUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return `${explicit.replace(/\/+$/, "")}/privacy`;

  // En el navegador siempre sabemos el dominio real, sin configurar nada.
  if (typeof window !== "undefined") {
    return `${window.location.origin}/privacy`;
  }

  return "";
}

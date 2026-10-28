/**
 * Sube el icono y las capturas de una ficha, en tres pasos, igual que el APK.
 *
 *   1. pedir URL firmada   JSON pequeno, por nuestro servidor
 *   2. PUT al almacen      la imagen, sin intermediarios
 *   3. confirmar           el API mira los bytes y la guarda en la ficha
 *
 * Una captura de movil no llega a los 4,5 MB que corta Vercel, pero seis en el
 * mismo envio si, y no tiene sentido hacerlas pasar por dos servidores cuando
 * pueden ir directas.
 *
 * Lo comparten el formulario sin cuenta y el del panel: solo cambian la ruta
 * base y las cabeceras.
 */

export interface ImageUploadTarget {
  /** Ruta base, sin barra final. Ej: `/api/submissions/abc123/images` */
  basePath: string;
  headers?: Record<string, string>;
}

export type ImageKind = "icon" | "screenshot";

/** SVG queda fuera a proposito: se sirve desde nuestro dominio y lleva scripts. */
export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];
export const ACCEPT_ATTRIBUTE = ACCEPTED_IMAGE_TYPES.join(",");

export const MAX_ICON_BYTES = 1 * 1024 * 1024;
export const MAX_SCREENSHOT_BYTES = 4 * 1024 * 1024;
export const MAX_SCREENSHOTS = 6;

export class ImageUploadError extends Error {}

export function maxBytesFor(kind: ImageKind): number {
  return kind === "icon" ? MAX_ICON_BYTES : MAX_SCREENSHOT_BYTES;
}

/**
 * Comprueba lo evidente antes de gastar una subida. El API lo vuelve a mirar
 * sobre los bytes reales: esto es comodidad, no seguridad.
 */
export function describeRejection(file: File, kind: ImageKind): string | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return `"${file.name}" is not a PNG, JPEG or WebP image.`;
  }
  const limit = maxBytesFor(kind);
  if (file.size > limit) {
    return `"${file.name}" is larger than ${Math.round(limit / (1024 * 1024))} MB.`;
  }
  return null;
}

async function readError(res: Response, fallback: string): Promise<string> {
  try {
    const data = (await res.json()) as { message?: string | string[] };
    if (Array.isArray(data.message)) return data.message.join(", ");
    if (data.message) return data.message;
  } catch {
    // El cuerpo no era JSON: el almacen contesta XML, y Vercel HTML.
  }
  return fallback;
}

export async function uploadImage(
  target: ImageUploadTarget,
  kind: ImageKind,
  file: File
): Promise<{ url: string }> {
  const rejection = describeRejection(file, kind);
  if (rejection) throw new ImageUploadError(rejection);

  const headers = target.headers ?? {};

  const started = await fetch(`${target.basePath}/upload-url`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ kind, contentType: file.type }),
  });
  if (!started.ok) {
    throw new ImageUploadError(await readError(started, `Could not upload ${file.name}.`));
  }
  const { uploadUrl, uploadRef, contentType } = (await started.json()) as {
    uploadUrl: string;
    uploadRef: string;
    contentType: string;
  };

  // El Content-Type va dentro de la firma: tiene que ser exactamente el que
  // devolvio el paso 1 o el almacen rechaza el PUT.
  const put = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": contentType },
    body: file,
  }).catch(() => {
    throw new ImageUploadError(
      "The browser blocked the upload. Check the storage CORS policy allows PUT from this site."
    );
  });
  if (!put.ok) {
    throw new ImageUploadError(`The storage service rejected ${file.name} (HTTP ${put.status}).`);
  }

  const completed = await fetch(`${target.basePath}/complete`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ uploadRef }),
  });
  if (!completed.ok) {
    throw new ImageUploadError(await readError(completed, `Could not save ${file.name}.`));
  }

  return (await completed.json()) as { url: string };
}

/**
 * Icono primero y capturas despues, de una en una.
 *
 * En serie y no en paralelo porque el API empuja cada captura al array de la
 * ficha: dos confirmaciones a la vez leerian la misma lista y una pisaria a la
 * otra. Son ficheros pequenos, asi que no se nota.
 */
export async function uploadAppImages(
  target: ImageUploadTarget,
  images: { icon?: File | null; screenshots?: File[] }
): Promise<void> {
  if (images.icon) {
    await uploadImage(target, "icon", images.icon);
  }
  for (const shot of images.screenshots ?? []) {
    await uploadImage(target, "screenshot", shot);
  }
}

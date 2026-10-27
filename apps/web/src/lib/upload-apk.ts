/**
 * Sube un APK en tres pasos, con el binario yendo directo al almacen.
 *
 * Antes era un solo POST con el fichero dentro, y no podia funcionar: ese POST
 * atraviesa una funcion de Vercel, cuyo cuerpo esta limitado a 4,5 MB
 * (FUNCTION_PAYLOAD_TOO_LARGE). Ningun APK real cabe — Snake pesa 18 MB y
 * TicTacToe 61 MB. Solo pasaba un zip falso de 692 bytes, que es con lo que se
 * "probo" en su dia.
 *
 *   1. pedir URL firmada   JSON pequeno, por nuestro servidor
 *   2. PUT a R2            el APK, sin intermediarios
 *   3. confirmar           JSON pequeno; el API verifica el objeto
 *
 * Lo comparten el formulario sin cuenta y el del dashboard: solo cambian la
 * ruta base y las cabeceras de autorizacion.
 */

export interface ApkUploadTarget {
  /** Ruta base, sin barra final. Ej: `/api/submissions/abc123/apk` */
  basePath: string;
  /** Cabeceras de autorizacion: token de subida o nada si hay sesion. */
  headers?: Record<string, string>;
}

export interface ApkVersionFields {
  versionName: string;
  versionCode: number;
  platform: string;
  changelog: string;
  minOs: string;
}

export class ApkUploadError extends Error {}

async function readError(res: Response, fallback: string): Promise<string> {
  try {
    const data = (await res.json()) as { message?: string | string[] };
    if (Array.isArray(data.message)) return data.message.join(", ");
    if (data.message) return data.message;
  } catch {
    // El cuerpo no era JSON: R2 contesta XML, y Vercel HTML en sus errores.
  }
  return fallback;
}

export async function uploadApk(
  target: ApkUploadTarget,
  file: File,
  fields: ApkVersionFields
): Promise<void> {
  const headers = target.headers ?? {};

  // --- 1. URL firmada ---
  const started = await fetch(`${target.basePath}/upload-url`, {
    method: "POST",
    headers,
  });
  if (!started.ok) {
    throw new ApkUploadError(await readError(started, "Could not start the upload."));
  }
  const { uploadUrl, uploadRef, contentType } = (await started.json()) as {
    uploadUrl: string;
    uploadRef: string;
    contentType: string;
  };

  // --- 2. el binario, directo al almacen ---
  // El Content-Type va dentro de la firma, asi que tiene que ser exactamente el
  // que devolvio el paso 1 o R2 rechaza el PUT.
  const put = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": contentType },
    body: file,
  });
  if (!put.ok) {
    throw new ApkUploadError(
      put.status === 0
        ? "The upload was blocked by the browser. Check the storage CORS policy."
        : `The storage service rejected the upload (HTTP ${put.status}).`
    );
  }

  // --- 3. confirmar ---
  const completed = await fetch(`${target.basePath}/complete`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ ...fields, uploadRef }),
  });
  if (!completed.ok) {
    throw new ApkUploadError(await readError(completed, "Could not finish the upload."));
  }
}

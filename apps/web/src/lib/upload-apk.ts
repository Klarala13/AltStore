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

/** Progreso de 0 a 100 del paso 2, el unico que tarda. */
export type ProgressFn = (percent: number) => void;

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
  fields: ApkVersionFields,
  onProgress?: ProgressFn
): Promise<unknown> {
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
  await putWithProgress(uploadUrl, contentType, file, onProgress);

  // --- 3. confirmar ---
  const completed = await fetch(`${target.basePath}/complete`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ ...fields, uploadRef }),
  });
  if (!completed.ok) {
    throw new ApkUploadError(await readError(completed, "Could not finish the upload."));
  }

  return completed.json();
}

/**
 * El PUT va con XMLHttpRequest y no con fetch por una razon concreta: fetch no
 * informa del progreso de subida, y aqui pueden ser 60 MB. Una barra parada es
 * indistinguible de algo colgado.
 *
 * El Content-Type va dentro de la firma, asi que tiene que ser exactamente el
 * que devolvio el paso 1 o R2 rechaza el PUT.
 */
function putWithProgress(
  url: string,
  contentType: string,
  file: File,
  onProgress?: ProgressFn
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", url);
    xhr.setRequestHeader("Content-Type", contentType);

    xhr.upload.addEventListener("progress", (ev) => {
      if (ev.lengthComputable) onProgress?.(Math.round((ev.loaded / ev.total) * 100));
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        onProgress?.(100);
        resolve();
        return;
      }
      reject(new ApkUploadError(`The storage service rejected the upload (HTTP ${xhr.status}).`));
    });

    // Un fallo de CORS llega aqui, sin estado y sin cuerpo: el navegador no deja
    // ver la respuesta. Por eso el mensaje nombra CORS en vez de decir "error de
    // red", que mandaria a buscar en el sitio equivocado.
    xhr.addEventListener("error", () => {
      reject(
        new ApkUploadError(
          "The browser blocked the upload. Check the storage CORS policy allows PUT from this site."
        )
      );
    });

    xhr.addEventListener("abort", () => {
      reject(new ApkUploadError("The upload was cancelled."));
    });

    xhr.send(file);
  });
}

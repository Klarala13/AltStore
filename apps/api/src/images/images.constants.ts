/**
 * Imagenes de ficha: icono y capturas.
 *
 * SVG NO esta permitido, y es deliberado. Estas imagenes se sirven desde
 * nuestro propio dominio, asi que un SVG subido por cualquiera correria su
 * JavaScript como si fuera nuestro. Un XSS de manual. Solo mapas de bits.
 */
export const IMAGE_KINDS = ["icon", "screenshot"] as const;
export type ImageKind = (typeof IMAGE_KINDS)[number];

interface ImageType {
  ext: string;
  /** Reconoce el formato por sus primeros bytes, no por lo que diga el cliente. */
  matches(prefix: Buffer): boolean;
}

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG_MAGIC = Buffer.from([0xff, 0xd8, 0xff]);

export const ALLOWED_IMAGE_TYPES: Record<string, ImageType> = {
  "image/png": {
    ext: "png",
    matches: (p) => p.subarray(0, 8).equals(PNG_MAGIC),
  },
  "image/jpeg": {
    ext: "jpg",
    matches: (p) => p.subarray(0, 3).equals(JPEG_MAGIC),
  },
  "image/webp": {
    // WebP es un contenedor RIFF: "RIFF" al principio y "WEBP" en el byte 8.
    ext: "webp",
    matches: (p) =>
      p.subarray(0, 4).toString("ascii") === "RIFF" &&
      p.subarray(8, 12).toString("ascii") === "WEBP",
  },
};

export const ALLOWED_CONTENT_TYPES = Object.keys(ALLOWED_IMAGE_TYPES);

/** Bytes que hay que leer para reconocer cualquiera de los formatos de arriba. */
export const MAGIC_PREFIX_BYTES = 12;

export const MAX_ICON_BYTES = 1 * 1024 * 1024;
export const MAX_SCREENSHOT_BYTES = 4 * 1024 * 1024;
export const MAX_SCREENSHOTS = 6;

export function maxBytesFor(kind: ImageKind): number {
  return kind === "icon" ? MAX_ICON_BYTES : MAX_SCREENSHOT_BYTES;
}

/** Donde viven en el almacen. */
export const IMAGE_KEY_PREFIX = "images";

/**
 * Lo que se guarda en la base de datos. Es RELATIVO a proposito: el dia que
 * Appia tenga dominio propio, las fichas no se quedan apuntando a
 * appia-nu.vercel.app. El formulario ya usaba "/icon.svg", misma idea.
 */
export const IMAGE_PUBLIC_PREFIX = "/api/images";

/**
 * Lo unico que la ruta publica acepta: <appId>/<uuid>.<ext>.
 *
 * Sin esto, el proxy del front seria una puerta para pedir cualquier clave del
 * bucket, incluidos los APK en cuarentena.
 */
export const PUBLIC_IMAGE_PATH = /^[A-Za-z0-9_-]{1,40}\/[0-9a-f-]{36}\.(png|jpg|webp)$/;

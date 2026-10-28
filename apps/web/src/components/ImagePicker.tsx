"use client";

import { useEffect, useState } from "react";
import { labelClass } from "@/components/AppDetailsFields";
import {
  ACCEPT_ATTRIBUTE,
  describeRejection,
  maxBytesFor,
  type ImageKind,
} from "@/lib/upload-image";

interface Props {
  id: string;
  label: string;
  hint: string;
  kind: ImageKind;
  files: File[];
  onChange: (files: File[]) => void;
  /** Cuantas caben. 1 reemplaza la anterior; mas de 1 acumula. */
  max: number;
  disabled?: boolean;
}

/**
 * Elige imagenes y las ensena antes de enviarlas.
 *
 * No sube nada: solo guarda los File. La subida ocurre al enviar el
 * formulario, cuando ya existe la app de la que colgarlas.
 */
export const ImagePicker = ({ id, label, hint, kind, files, onChange, max, disabled }: Props) => {
  const [rejected, setRejected] = useState<string | null>(null);

  const handlePick = (picked: FileList | null) => {
    if (!picked?.length) return;
    setRejected(null);

    const accepted: File[] = [];
    for (const file of Array.from(picked)) {
      const problem = describeRejection(file, kind);
      if (problem) {
        setRejected(problem);
        continue;
      }
      accepted.push(file);
    }

    const next = max === 1 ? accepted.slice(0, 1) : [...files, ...accepted].slice(0, max);
    if (max > 1 && files.length + accepted.length > max) {
      setRejected(`Only ${max} images fit. The extra ones were left out.`);
    }
    onChange(next);
  };

  const remove = (index: number) => {
    setRejected(null);
    onChange(files.filter((_, i) => i !== index));
  };

  const full = files.length >= max;

  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <p className="mb-2 text-xs text-zinc-500">
        {hint} PNG, JPEG or WebP, up to {Math.round(maxBytesFor(kind) / (1024 * 1024))} MB
        {max > 1 ? ` each, ${max} max` : ""}.
      </p>

      {files.length > 0 && (
        <ul className={`mb-3 flex flex-wrap gap-3 ${max === 1 ? "" : "items-start"}`}>
          {files.map((file, i) => (
            <li key={`${file.name}-${file.lastModified}-${i}`} className="relative">
              <Thumbnail file={file} square={max === 1} />
              <button
                type="button"
                onClick={() => remove(i)}
                disabled={disabled}
                aria-label={`Remove ${file.name}`}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-zinc-700 bg-black text-sm text-zinc-300 transition-colors duration-150 hover:border-zinc-500 hover:text-white disabled:opacity-50"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <input
        id={id}
        type="file"
        accept={ACCEPT_ATTRIBUTE}
        multiple={max > 1}
        onChange={(e) => {
          handlePick(e.target.files);
          // Permite volver a elegir el mismo fichero despues de quitarlo.
          e.target.value = "";
        }}
        disabled={disabled || full}
        className="block w-full rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm text-zinc-300 file:mr-3 file:rounded file:border-0 file:bg-zinc-800 file:px-3 file:py-1 file:text-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
      />

      {rejected && <p className="mt-2 text-xs text-red-400">{rejected}</p>}
      {full && !rejected && (
        <p className="mt-2 text-xs text-zinc-500">
          {max === 1 ? "Pick another file to replace it." : "Remove one to add a different image."}
        </p>
      )}
    </div>
  );
};

const Thumbnail = ({ file, square }: { file: File; square: boolean }) => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setUrl(objectUrl);
    // Sin esto el navegador se queda el fichero en memoria hasta recargar.
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const box = square ? "h-16 w-16" : "h-28 w-16";

  return (
    <span className={`${box} block overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- blob local, next/image no lo sirve */}
      {url && <img src={url} alt={file.name} className="h-full w-full object-cover" />}
    </span>
  );
};

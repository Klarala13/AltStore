"use client";

import { useEffect, useRef } from "react";

/**
 * Banda de error de un formulario, que se trae al usuario consigo.
 *
 * Los tres formularios de alta la pintaban arriba del todo con el mismo marcado
 * copiado. En uno largo eso significa enviar desde el final, no ver nada
 * cambiar, y concluir que el boton no funciona: el error estaba a una pantalla
 * de distancia hacia arriba.
 *
 * Al aparecer, se desplaza hasta quedar a la vista y toma el foco. El foco hace
 * dos cosas: lo anuncia a un lector de pantalla y deja el tabulador justo
 * delante del formulario, no al principio de la pagina.
 */
export const FormError = ({ message }: { message: string | null }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!message) return;
    const el = ref.current;
    if (!el) return;

    // `block: "center"` y no "start": con la cabecera fija (sticky) un "start"
    // deja el aviso justo debajo de ella, medio tapado.
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.focus();
  }, [message]);

  if (!message) return null;

  return (
    <div
      ref={ref}
      role="alert"
      tabIndex={-1}
      className="mb-6 rounded-lg border border-red-900/60 bg-red-950/40 px-4 py-3 text-sm text-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
    >
      {message}
    </div>
  );
};

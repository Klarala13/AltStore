/**
 * La "A" de Appia, dibujada para las imagenes de Open Graph.
 *
 * Es el mismo trazo que `public/icon.svg`, repetido aqui a proposito: Satori no
 * puede cargar un SVG externo, asi que el icono del sitio no se puede
 * referenciar. Si cambia la marca, hay que cambiar los dos.
 */
export const OgMark = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="7" fill="#000000" />
    <path
      d="M7 26 L16 6 L25 26"
      stroke="#ffffff"
      strokeWidth={2.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <line x1="10.5" y1="19" x2="21.5" y2="19" stroke="#1eff00" strokeWidth={2.8} />
  </svg>
);

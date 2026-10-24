import { BackgroundTextureVariant } from "@/constants/pageConfig";

interface BackgroundTextureProps {
  variant: BackgroundTextureVariant;
}

/** Fixed, decorative texture layer behind the page content (see globals.css). */
export default function BackgroundTexture({ variant }: BackgroundTextureProps) {
  return (
    <div aria-hidden="true" className={`page-texture page-texture--${variant}`} />
  );
}

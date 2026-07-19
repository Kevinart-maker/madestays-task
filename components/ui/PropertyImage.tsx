"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOffIcon } from "@/components/icons";
import { cn } from "@/lib/format";

interface PropertyImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Handles two distinct "no image" cases so the card never shows a broken
 * image icon or an empty box:
 *  - src is empty/missing (e.g. Porthcurno Cliff House in the sample data)
 *  - src is present but the request fails (404, network error, etc.)
 */
export function PropertyImage({ src, alt, className }: PropertyImageProps) {
  const [failed, setFailed] = useState(false);
  const hasSrc = Boolean(src) && !failed;

  if (!hasSrc) {
    return (
      <div
        className={cn(
          "flex size-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-neutral-700 to-neutral-900 text-neutral-400",
          className
        )}
      >
        <ImageOffIcon className="size-8" />
        <span className="text-xs font-medium">No image available</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      className={cn("object-cover", className)}
      onError={() => setFailed(true)}
    />
  );
}

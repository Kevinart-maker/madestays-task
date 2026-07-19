"use client";

import { useState } from "react";
import { cn } from "@/lib/format";

interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: number;
  className?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Falls back to initials-on-color whenever there's no image URL at all
 * (the owner record in this app never has one) or the image fails to load.
 */
export function Avatar({ name, imageUrl, size = 33, className }: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(imageUrl) && !failed;

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-800 text-white select-none",
        className
      )}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      title={name}
    >
      {showImage ? (
        
        <img
          src={imageUrl}
          alt={name}
          className="size-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        // <span className="font-medium tracking-wide">{getInitials(name)}</span>
        <img
          src={"/profile.png"}
          alt={name}
          className="size-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

import { cn } from "@/lib/format";

/**
 * A bounded panel (not the full card) that blends from the sharp photo
 * above it into a frosted glass effect at the very bottom, matching the
 * Figma card. Each layer only exists within this panel, so the photo
 * above it stays completely untouched — there's no element there to blur
 * it. Within the panel, blur radii increase layer over layer with
 * overlapping gradient masks, so it reads as one smooth ramp (none at the
 * panel's own top, strongest at the card's bottom edge) instead of a flat
 * blur with a hard seam.
 */
const LAYERS: { blur: number; start: number; end: number }[] = [
  { blur: 2, start: 0, end: 45 },
  { blur: 5, start: 20, end: 65 },
  { blur: 10, start: 45, end: 85 },
  { blur: 18, start: 70, end: 100 },
];

interface ProgressiveBlurProps {
  className?: string;
}

export function ProgressiveBlur({ className }: ProgressiveBlurProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 h-[42%] overflow-hidden",
        className
      )}
    >
      {LAYERS.map((layer) => {
        const mask = `linear-gradient(to bottom, transparent ${layer.start}%, black ${layer.end}%)`;
        return (
          <div
            key={layer.blur}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${layer.blur}px)`,
              WebkitBackdropFilter: `blur(${layer.blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
    </div>
  );
}

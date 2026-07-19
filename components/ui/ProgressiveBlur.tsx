import { cn } from "@/lib/format";

/**
 * Doubling blur radii stacked with overlapping gradient masks. Because each
 * layer's backdrop-filter blurs everything rendered behind it (including
 * earlier, already-blurred layers), the blur compounds toward the bottom —
 * sharp photo at the top, smoothly increasing to maximum blur at the very
 * bottom edge, rather than one flat blur value with a hard start line.
 */
const LAYER_BLUR_PX = [1, 2, 4, 8, 16, 32];
const LAYER_STEP = 14;
const LAYER_SPAN = 34;

interface ProgressiveBlurProps {
  className?: string;
}

export function ProgressiveBlur({ className }: ProgressiveBlurProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {LAYER_BLUR_PX.map((blur, index) => {
        const start = index * LAYER_STEP;
        const end = Math.min(start + LAYER_SPAN, 100);
        const mask = `linear-gradient(to bottom, transparent ${start}%, black ${end}%)`;
        return (
          <div
            key={blur}
            className="absolute inset-0"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
    </div>
  );
}

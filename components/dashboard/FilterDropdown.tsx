"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/format";

export interface DropdownOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  placeholder: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  icon: ReactNode;
  isActive: boolean;
}

export function FilterDropdown({
  placeholder,
  value,
  options,
  onChange,
  icon,
  isActive,
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative w-full sm:w-[171px]">
      <div
        className={cn(
          "flex items-center justify-between overflow-hidden rounded-full border border-solid transition-colors",
          isActive ? "border-black/20" : "border-[#f4f4f4]"
        )}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="h-[29px] min-w-0 flex-1 truncate px-[13px] text-left text-xs font-medium"
        >
          <span className={isActive ? "text-black/70" : "text-[#a7a7a7]"}>
            {selected?.label ?? placeholder}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          tabIndex={-1}
          aria-hidden
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-solid border-black/10"
        >
          {icon}
        </button>
      </div>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-20 mt-2 max-h-64 w-full min-w-[190px] overflow-auto rounded-2xl border border-black/5 bg-white py-1.5 shadow-lg"
        >
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={cn(
                  "block w-full px-4 py-2 text-left text-xs font-medium transition-colors hover:bg-neutral-50",
                  option.value === value ? "text-black" : "text-black/60"
                )}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

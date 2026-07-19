"use client";

import { SearchIcon } from "@/components/icons";
import { cn } from "@/lib/format";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between overflow-hidden rounded-full border border-solid transition-colors sm:w-[171px]",
        value ? "border-black/20" : "border-[#f4f4f4]"
      )}
    >
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Enter title"
        aria-label="Search properties by title or location"
        className="h-[29px] min-w-0 flex-1 bg-transparent px-[13px] text-xs font-medium text-black/70 placeholder:text-[#a7a7a7] focus:outline-none"
      />
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-solid border-black/10 text-black/60">
        <SearchIcon className="size-4" />
      </span>
    </div>
  );
}

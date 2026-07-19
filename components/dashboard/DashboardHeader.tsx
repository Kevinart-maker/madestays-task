import { BellIcon, SettingsIcon } from "@/components/icons";
import { Avatar } from "@/components/ui/Avatar";

interface DashboardHeaderProps {
  ownerName: string;
}

export function DashboardHeader({ ownerName }: DashboardHeaderProps) {
  return (
    <header className="flex w-full items-center justify-between">
      <p className="font-[family-name:var(--font-logo)] text-[32px] font-semibold tracking-[-2.5px] text-black/70 sm:text-[40px] sm:tracking-[-3.6px]">
        Madestays
      </p>
      <div className="flex items-center gap-5 sm:gap-8">
        <button
          type="button"
          aria-label="Notifications"
          className="text-black/70 transition-colors hover:text-black"
        >
          <BellIcon className="h-[19px] w-auto" />
        </button>
        <button
          type="button"
          aria-label="Settings"
          className="text-black/70 transition-colors hover:text-black"
        >
          <SettingsIcon className="h-[20px] w-auto" />
        </button>
        <Avatar name={ownerName} size={33} />
      </div>
    </header>
  );
}

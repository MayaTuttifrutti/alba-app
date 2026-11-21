"use client";

import { TABS, type TabId } from "@/data/alba";
import { Icon, type IconName } from "@/components/ui";

const ICONS: Record<TabId, IconName> = {
  home: "gauge",
  income: "download",
  taxes: "shield",
  safety: "checkCircle",
  advisor: "chat",
};

export function TabBar({ active, onSelect }: { active: TabId; onSelect: (tab: TabId) => void }) {
  return (
    <nav aria-label="Main" className="flex h-[84px] flex-none border-t border-line bg-surface pb-[env(safe-area-inset-bottom)]">
      {TABS.map((tab) => {
        const on = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelect(tab.id)}
            aria-current={on ? "page" : undefined}
            className={`relative flex flex-1 flex-col items-center justify-center gap-1 pt-1 t-caption ${
              on ? "font-semibold text-fg" : "text-fg-2"
            }`}
          >
            {on ? <span className="absolute top-0 h-[3px] w-5 rounded-full bg-accent" /> : null}
            <Icon name={ICONS[tab.id]} size={24} />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}

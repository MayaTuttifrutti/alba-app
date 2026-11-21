"use client";

import { BackButton, Button, Icon, StatusChip } from "@/components/ui";
import { RUNWAY_AT_RISK, SURVIVAL_OPTIONS } from "@/data/alba";

export function projectedRunway(selected: string[]): number {
  return (
    RUNWAY_AT_RISK +
    SURVIVAL_OPTIONS.filter((o) => selected.includes(o.id)).reduce((sum, o) => sum + o.gainDays, 0)
  );
}

export function ChoiceScreen({
  selected,
  onToggle,
  onBack,
  onApply,
  onSkip,
}: {
  selected: string[];
  onToggle: (id: string) => void;
  onBack: () => void;
  onApply: () => void;
  onSkip: () => void;
}) {
  const count = selected.length;
  return (
    <div className="alba-screen flex h-full flex-col gap-5 overflow-y-auto px-6 pb-8 pt-4">
      <div className="flex items-center justify-between">
        <BackButton onClick={onBack} />
        <StatusChip tone="warn">Survival Mode</StatusChip>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="t-h1">You decide. Alba won’t act without you.</h1>
        <p className="t-body-m text-fg-2">
          Runway is {RUNWAY_AT_RISK} days. Pick what feels right. Every action can be undone.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {SURVIVAL_OPTIONS.map((o) => {
          const on = selected.includes(o.id);
          return (
            <button
              key={o.id}
              type="button"
              role="checkbox"
              aria-checked={on}
              onClick={() => onToggle(o.id)}
              className={`flex items-center gap-3 rounded-lg border-[1.5px] bg-surface p-4 text-left transition ${
                on ? "border-accent shadow-[0_0_0_3px_rgba(245,163,92,0.16)]" : "border-line"
              }`}
            >
              <span
                className={`flex h-6 w-6 flex-none items-center justify-center rounded-full border-[1.5px] transition ${
                  on ? "border-accent bg-accent text-fg-inverse" : "border-ink-300 text-transparent"
                }`}
              >
                <Icon name="check" size={14} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block t-label">{o.title}</span>
                <span className="mt-1 block t-caption text-fg-2">{o.reason}</span>
              </span>
              <span className="whitespace-nowrap t-label text-safe-fg">+{o.gainDays} days</span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <p className="t-caption text-fg-2">
          {count} {count === 1 ? "action" : "actions"} selected · runway {RUNWAY_AT_RISK} → {projectedRunway(selected)} days
        </p>
        <Button full disabled={count === 0} onClick={onApply}>
          Apply {count} {count === 1 ? "action" : "actions"}
        </Button>
        <Button full variant="ghost" onClick={onSkip}>
          Do nothing for now
        </Button>
      </div>
    </div>
  );
}

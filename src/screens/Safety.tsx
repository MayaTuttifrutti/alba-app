"use client";

import { useState } from "react";
import { ListRow, ProgressBar, RowsCard, ScreenTitle, StatusChip } from "@/components/ui";
import { SAFETY, eur } from "@/data/alba";

export function SafetyScreen({ onSurvival }: { onSurvival: () => void }) {
  const [on, setOn] = useState(true);

  return (
    <div className="alba-screen flex h-full flex-col gap-6 overflow-y-auto px-6 pb-6 pt-4">
      <ScreenTitle title="Safety" right={<StatusChip tone="safe">Protected</StatusChip>} />

      <div className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-6">
        <div className="t-h3 text-fg-2">Safety buffer</div>
        <div className="t-h1 tabular-nums">{eur(SAFETY.buffer)}</div>
        <ProgressBar value={SAFETY.buffer / SAFETY.target} trackClass="bg-muted" fillClass="bg-accent-safe" />
        <div className="t-caption text-fg-2">
          {Math.round((SAFETY.buffer / SAFETY.target) * 100)}% of your {eur(SAFETY.target)} target · 14-day safety line
        </div>
      </div>

      <div className="flex items-center gap-4 rounded-lg border border-line bg-surface p-4">
        <button type="button" onClick={onSurvival} className="flex min-w-0 flex-1 flex-col gap-1 text-left">
          <span className="t-h3">Survival Mode</span>
          <span className="t-body-m text-fg-2">
            Alba proposes actions when your runway drops below 14 days. Nothing happens without your approval.
          </span>
          <span className="t-caption text-safe-fg">See how it works</span>
        </button>
        <button
          type="button"
          role="switch"
          aria-checked={on}
          aria-label="Survival Mode"
          onClick={() => setOn((v) => !v)}
          className={`relative h-7 w-12 flex-none rounded-full transition-colors ${on ? "bg-accent-safe" : "bg-ink-300"}`}
        >
          <span
            className={`absolute top-[3px] h-[22px] w-[22px] rounded-full bg-surface transition-all ${
              on ? "left-[23px]" : "left-[3px]"
            }`}
          />
        </button>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="t-h3">Recent actions</h2>
        <RowsCard>
          {SAFETY.actions.map((a) => (
            <ListRow key={a.id} initial={a.initial} title={a.title} subtitle={a.note} amount="Undo" />
          ))}
        </RowsCard>
      </section>
    </div>
  );
}

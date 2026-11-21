"use client";

import { Button, StatusChip } from "@/components/ui";
import { RUNWAY_AT_RISK } from "@/data/alba";

/** A dimmed banner over the real Home screen, not a full-screen takeover: it should read as care, not failure. */
export function AlertOverlay({ onSeeOptions, onDismiss }: { onSeeOptions: () => void; onDismiss: () => void }) {
  return (
    <div className="absolute inset-0 z-40" role="dialog" aria-modal="true" aria-label="Runway alert">
      <button type="button" aria-label="Dismiss alert" onClick={onDismiss} className="absolute inset-0 bg-brand/50" />
      <div className="alba-pop absolute left-6 right-6 top-[110px] flex flex-col gap-3 rounded-xl bg-surface p-6 shadow-[0_30px_60px_-20px_rgba(20,27,45,0.45)]">
        <div>
          <StatusChip tone="warn">Heads up</StatusChip>
        </div>
        <h2 className="t-h2">Your runway is down to {RUNWAY_AT_RISK} days</h2>
        <p className="t-body-m text-fg-2">
          Two client payments are late and bills land next week. Alba found 3 ways to help. Nothing happens until you say so.
        </p>
        <div className="flex items-center gap-2 pt-1">
          <Button size="S" onClick={onSeeOptions}>
            See options
          </Button>
          <Button size="S" variant="ghost" onClick={onDismiss}>
            Not now
          </Button>
        </div>
      </div>
    </div>
  );
}

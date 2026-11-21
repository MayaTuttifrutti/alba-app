"use client";

import { Button, Icon, StatusChip } from "@/components/ui";
import { RUNWAY_AT_RISK, RUNWAY_THRESHOLD } from "@/data/alba";
import { useCountUp } from "@/lib/useCountUp";

export function RecoveryScreen({
  after,
  changes,
  onHome,
}: {
  after: number;
  changes: string[];
  onHome: () => void;
}) {
  const days = useCountUp(after, { from: RUNWAY_AT_RISK, duration: 1500 });
  const safe = after >= RUNWAY_THRESHOLD;

  return (
    <div className="alba-screen flex h-full flex-col gap-6 overflow-y-auto px-6 pb-8 pt-4">
      <div className="flex justify-end">
        <StatusChip tone="safe">Plan applied</StatusChip>
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-safe-bg p-6">
        <div className="t-overline text-safe-fg">Runway</div>
        <div className="flex items-baseline gap-3">
          <span className="text-[34px] font-semibold leading-none text-fg-2">{RUNWAY_AT_RISK}</span>
          <Icon name="arrow" size={28} className="self-center text-safe-fg" />
          <span className="t-num tabular-nums">{days}</span>
          <span className="t-h2">days</span>
        </div>
        <p className="t-body-l text-safe-fg">
          {safe
            ? `You are back above your ${RUNWAY_THRESHOLD}-day safety line.`
            : `Better, but still below your ${RUNWAY_THRESHOLD}-day safety line.`}
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-lg bg-surface p-4">
        <h2 className="t-h3">What changed</h2>
        {[...changes, "Alba is watching your cash flow"].map((line) => (
          <div key={line} className="flex items-center gap-3 t-body-m">
            <Icon name="check" size={18} className="flex-none text-safe-fg" />
            {line}
          </div>
        ))}
      </div>

      <p className="t-body-m text-fg-2">
        You don’t need to check in. Alba will tell you if anything changes, and you can undo any action in Safety.
      </p>

      <div className="mt-auto">
        <Button full onClick={onHome}>
          Back to home
        </Button>
      </div>
    </div>
  );
}

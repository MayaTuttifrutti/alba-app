"use client";

import { Button, ProgressBar } from "@/components/ui";
import { RUNWAY_HEALTHY, runwayProgress } from "@/data/alba";

export function WelcomeScreen({ onStart, onHaveAccount }: { onStart: () => void; onHaveAccount: () => void }) {
  return (
    <div className="alba-screen flex h-full flex-col gap-6 overflow-y-auto px-6 pb-8 pt-4">
      <div className="t-h2">Alba</div>

      <div className="flex flex-col gap-3 rounded-xl bg-brand p-6 text-fg-inverse">
        <div className="t-overline opacity-70">Predictive runway</div>
        <div className="flex items-baseline gap-2">
          <span className="t-num">{RUNWAY_HEALTHY}</span>
          <span className="t-h2">days</span>
        </div>
        <div className="t-body-l opacity-75">of safety at your current pace</div>
        <ProgressBar value={runwayProgress(RUNWAY_HEALTHY)} trackClass="bg-ink-500" fillClass="bg-accent" />
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="t-h1">Your CFO in your pocket.</h1>
        <p className="t-body-l text-fg-2">
          Alba forecasts your income, sets taxes aside and warns you before cash runs short. You always decide.
        </p>
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <Button full onClick={onStart}>
          Get started
        </Button>
        <Button full variant="ghost" onClick={onHaveAccount}>
          I already have an account
        </Button>
      </div>
    </div>
  );
}

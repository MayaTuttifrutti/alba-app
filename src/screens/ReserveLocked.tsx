"use client";

import { useState } from "react";
import { BackButton, Button, Icon, StatusChip } from "@/components/ui";
import { RUNWAY_HEALTHY, TAX_RESERVE, USER } from "@/data/alba";

export function ReserveLockedScreen({ onBack, onDetails }: { onBack: () => void; onDetails: () => void }) {
  const [reportReady, setReportReady] = useState(false);

  return (
    <div className="alba-screen flex h-full flex-col gap-6 overflow-y-auto px-6 pb-8 pt-4">
      <div className="flex items-center justify-between">
        <BackButton onClick={onBack} />
        <StatusChip tone="safe">Reserve locked</StatusChip>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="t-h1">
          {USER.name}, you’ve secured <span className="text-warn-fg">{RUNWAY_HEALTHY} days</span> of business safety.
        </h1>
        <p className="t-body-l text-fg-2">
          Your predictive runway is up to date. Alba locked your tax reserve, so upcoming income swings can’t touch it.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Button full onClick={onDetails}>
          View allocation details
        </Button>
        <Button full variant="secondary" onClick={() => setReportReady(true)}>
          {reportReady ? "Report ready (sample)" : "Download report"}
        </Button>
      </div>

      <div className="flex flex-col items-center gap-2 rounded-xl bg-brand p-6 text-center text-fg-inverse">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-dawn-100 text-brand">
          <Icon name="check" size={26} />
        </span>
        <div className="t-h2 mt-1">Tax Guard active</div>
        <div className="t-caption">Ref ID {TAX_RESERVE.refId}</div>
        <span className="mt-1 rounded-full border border-fg-inverse/70 px-4 py-1 t-overline">Runway safe-haven</span>
      </div>
    </div>
  );
}

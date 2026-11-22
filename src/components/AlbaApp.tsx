"use client";

import { useEffect, useRef, useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { TabBar } from "@/components/TabBar";
import {
  DEFAULT_SELECTED,
  RUNWAY_AT_RISK,
  RUNWAY_HEALTHY,
  SURVIVAL_OPTIONS,
  type ScreenId,
  type TabId,
} from "@/data/alba";
import { AdvisorScreen } from "@/screens/Advisor";
import { AlertOverlay } from "@/screens/AlertOverlay";
import { ChoiceScreen, projectedRunway } from "@/screens/Choice";
import { ConnectScreen } from "@/screens/Connect";
import { HomeScreen } from "@/screens/Home";
import { IncomeScreen } from "@/screens/Income";
import { RecoveryScreen } from "@/screens/Recovery";
import { ReserveLockedScreen } from "@/screens/ReserveLocked";
import { SafetyScreen } from "@/screens/Safety";
import { TaxReserveScreen } from "@/screens/TaxReserve";
import { TaxesScreen } from "@/screens/Taxes";
import { WelcomeScreen } from "@/screens/Welcome";

const TAB_SCREENS: ScreenId[] = ["home", "income", "taxes", "safety", "advisor"];

/**
 * The whole prototype is one small state machine:
 *  - `stack`      screens the user has opened (the last one is on screen)
 *  - `runway`     days of safety, 47 healthy -> 9 after the simulated dip -> N after applying actions
 *  - `alertOpen`  the Survival Mode banner over Home
 *  - `selected`   actions ticked on the Choice screen
 * Deep links for the portfolio: /?start=home, /?start=alert and /?start=reserve (Tax Guard flow).
 */
export function AlbaApp() {
  const [stack, setStack] = useState<ScreenId[]>(["welcome"]);
  const [runway, setRunway] = useState(RUNWAY_HEALTHY);
  const [alertOpen, setAlertOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(DEFAULT_SELECTED);
  const [applied, setApplied] = useState<string[]>([]);
  const timers = useRef<number[]>([]);

  const screen = stack[stack.length - 1];
  const activeTab = TAB_SCREENS.includes(screen) ? (screen as TabId) : null;
  /** The Tax reserve screen has a dark header that also covers the status bar. */
  const darkTop = screen === "reserve-detail";

  const push = (s: ScreenId) => setStack((st) => [...st, s]);
  const replace = (s: ScreenId) => setStack([s]);
  const back = () => setStack((st) => (st.length > 1 ? st.slice(0, -1) : st));
  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => window.clearTimeout(t));
  }, []);

  useEffect(() => {
    const start = new URLSearchParams(window.location.search).get("start");
    if (start === "home") {
      replace("home");
    } else if (start === "alert") {
      replace("home");
      setRunway(RUNWAY_AT_RISK);
      setAlertOpen(true);
    } else if (start === "reserve") {
      setStack(["home", "reserve"]);
    }
  }, []);

  /** Simulates the cash dip: runway counts down, then the alert slides in. */
  function startDip(fromOtherScreen: boolean) {
    if (alertOpen) return;
    if (fromOtherScreen) replace("home");
    setSelected(DEFAULT_SELECTED);
    const lead = fromOtherScreen ? 400 : 0;
    const countdown = runway === RUNWAY_AT_RISK ? 0 : 1400;
    later(() => setRunway(RUNWAY_AT_RISK), lead);
    later(() => setAlertOpen(true), lead + countdown);
  }

  function toggle(id: string) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  function applyPlan() {
    setApplied(selected);
    setRunway(projectedRunway(selected));
    push("recovery");
  }

  const changes = SURVIVAL_OPTIONS.filter((o) => applied.includes(o.id)).map((o) => o.changed);

  function renderScreen() {
    switch (screen) {
      case "welcome":
        return <WelcomeScreen onStart={() => push("connect")} onHaveAccount={() => replace("home")} />;
      case "connect":
        return <ConnectScreen onBack={back} onConnect={() => replace("home")} onSkip={() => replace("home")} />;
      case "home":
        return <HomeScreen runway={runway} onRunwayTap={() => startDip(false)} onTaxGuard={() => push("reserve")} />;
      case "reserve":
        return <ReserveLockedScreen onBack={back} onDetails={() => push("reserve-detail")} />;
      case "reserve-detail":
        return <TaxReserveScreen onBack={back} onAsk={() => replace("advisor")} />;
      case "income":
        return <IncomeScreen />;
      case "taxes":
        return <TaxesScreen />;
      case "safety":
        return <SafetyScreen onSurvival={() => startDip(true)} />;
      case "advisor":
        return <AdvisorScreen />;
      case "choice":
        return (
          <ChoiceScreen
            selected={selected}
            onToggle={toggle}
            onBack={() => {
              back();
              setAlertOpen(true);
            }}
            onApply={applyPlan}
            onSkip={() => replace("home")}
          />
        );
      case "recovery":
        return <RecoveryScreen after={runway} changes={changes} onHome={() => replace("home")} />;
    }
  }

  return (
    <PhoneFrame>
      <div className="relative flex h-full flex-col bg-app">
        <div
          className={`hidden h-[54px] flex-none px-6 pt-[18px] t-label sm:block ${darkTop ? "bg-brand text-fg-inverse" : ""}`}
        >
          9:41
        </div>
        <div className={`h-[env(safe-area-inset-top)] flex-none sm:hidden ${darkTop ? "bg-brand" : ""}`} />

        <main key={screen} className="min-h-0 flex-1">
          {renderScreen()}
        </main>

        {activeTab ? <TabBar active={activeTab} onSelect={(tab) => replace(tab)} /> : null}

        {alertOpen && screen === "home" ? (
          <AlertOverlay
            onSeeOptions={() => {
              setAlertOpen(false);
              push("choice");
            }}
            onDismiss={() => setAlertOpen(false)}
          />
        ) : null}
      </div>
    </PhoneFrame>
  );
}

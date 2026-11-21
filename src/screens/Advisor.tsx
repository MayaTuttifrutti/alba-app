"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Button, Icon } from "@/components/ui";
import { ADVISOR_INTRO, ADVISOR_REPLIES, type ChatMessage } from "@/data/alba";

/**
 * Prototype only: replies are prepared. To connect a real model later, replace `reply()`
 * with a call to a server route that talks to the Anthropic API (see README, "Next steps").
 */
export function AdvisorScreen() {
  const [messages, setMessages] = useState<ChatMessage[]>(ADVISOR_INTRO);
  const [answered, setAnswered] = useState(false);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const counter = useRef(ADVISOR_INTRO.length);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => window.clearTimeout(t));
  }, []);

  useEffect(() => {
    box.current?.scrollTo({ top: box.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function nextId() {
    counter.current += 1;
    return `m${counter.current}`;
  }

  function reply(userText: string, albaText: string) {
    setAnswered(true);
    setMessages((m) => [...m, { id: nextId(), from: "user", text: userText }]);
    setTyping(true);
    const t = window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: nextId(), from: "alba", text: albaText }]);
    }, 900);
    timers.current.push(t);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || typing) return;
    setDraft("");
    reply(text, ADVISOR_REPLIES.generic);
  }

  return (
    <div className="alba-screen flex h-full flex-col gap-4 pt-4">
      <div className="flex items-center justify-between px-6">
        <h1 className="t-h1">Advisor</h1>
        <span className="t-caption text-fg-2">Alba proposes, you decide</span>
      </div>

      <div ref={box} className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-6" aria-live="polite">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`t-body-m rounded-lg px-4 py-3 ${
              m.from === "alba"
                ? "max-w-[290px] self-start border border-line bg-surface"
                : "max-w-[250px] self-end bg-brand text-fg-inverse"
            }`}
          >
            {m.text}
          </div>
        ))}
        {typing ? (
          <div className="self-start rounded-lg border border-line bg-surface px-4 py-3 t-body-m text-fg-2">Alba is typing…</div>
        ) : null}
        {!answered ? (
          <div className="flex gap-2">
            <Button size="S" onClick={() => reply(ADVISOR_REPLIES.plan.user, ADVISOR_REPLIES.plan.alba)}>
              {ADVISOR_REPLIES.plan.user}
            </Button>
            <Button size="S" variant="secondary" onClick={() => reply(ADVISOR_REPLIES.skip.user, ADVISOR_REPLIES.skip.alba)}>
              {ADVISOR_REPLIES.skip.user}
            </Button>
          </div>
        ) : null}
      </div>

      <form onSubmit={onSubmit} className="mx-6 mb-4 flex items-center gap-3 rounded-full border border-line bg-surface py-2 pl-6 pr-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask Alba anything"
          aria-label="Ask Alba anything"
          className="min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-fg-2"
        />
        <button
          type="submit"
          aria-label="Send"
          className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-brand text-fg-inverse"
        >
          <Icon name="send" />
        </button>
      </form>
    </div>
  );
}

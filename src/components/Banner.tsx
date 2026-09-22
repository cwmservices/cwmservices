"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type TabKey = "main" | "api" | "config";

const TAB_ORDER: TabKey[] = ["main", "api", "config"];

const FILES: Record<TabKey, { label: string; code: string }> = {
  main: {
    label: "main.ts",
    code:
      `import { Application } from '@cwm/core';\n` +
      `import { Database } from '@cwm/database';\n\n` +
      `const app = new Application();\n` +
      `app.configure({ mode: 'production' });\n` +
      `app.launch();`,
  },
  api: {
    label: "api.ts",
    code:
      `import { Router } from '@cwm/router';\n\n` +
      `export const work = new Router();\n\n` +
      `work.get('/projects', listProjects);\n` +
      `work.get('/projects/:id', getProject);\n` +
      `work.post('/projects', startProject);`,
  },
  config: {
    label: "config.ts",
    code:
      `export const config = {\n` +
      `  team: 'Cwmservices',\n` +
      `  env: 'production',\n` +
      `  contact: 'masood@cwmservices.dev',\n` +
      `  available: true,\n` +
      `};`,
  },
};

/* ── Tiny syntax tokenizer — good enough for short snippets ── */
const CLR = {
  base: "text-foreground",
  keyword: "text-[var(--code-keyword)]",
  string: "text-[var(--code-string)]",
  fn: "text-[var(--code-function)]",
  punct: "text-[#8791A8]",
};

const TOKEN_RE =
  /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|(\b(?:import|export|const|new|from|return|true|false|let)\b)|([A-Za-z_$][\w$]*(?=\())|([{}();,.:])/g;

function tokenize(code: string) {
  const parts: { text: string; cls: string }[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;
  while ((match = TOKEN_RE.exec(code))) {
    if (match.index > lastIndex) {
      parts.push({ text: code.slice(lastIndex, match.index), cls: CLR.base });
    }
    const [full, str, kw, fn, punct] = match;
    let cls = CLR.base;
    if (str) cls = CLR.string;
    else if (kw) cls = CLR.keyword;
    else if (fn) cls = CLR.fn;
    else if (punct) cls = CLR.punct;
    parts.push({ text: full, cls });
    lastIndex = TOKEN_RE.lastIndex;
  }
  if (lastIndex < code.length) parts.push({ text: code.slice(lastIndex), cls: CLR.base });
  return parts;
}

/* Reveals tokens up to `typedLength` characters, keeping each token's color */
function renderTyped(tokens: { text: string; cls: string }[], typedLength: number) {
  let remaining = typedLength;
  const nodes: React.ReactNode[] = [];
  for (let i = 0; i < tokens.length; i++) {
    if (remaining <= 0) break;
    const t = tokens[i];
    const slice = t.text.slice(0, remaining);
    if (slice) nodes.push(<span key={i} className={t.cls}>{slice}</span>);
    remaining -= t.text.length;
  }
  return nodes;
}

/* Given the full code string and how many characters have been "typed",
   work out the current line + column — used to drive the status bar
   so it reads like a real editor cursor position. */
function getLineCol(code: string, pos: number) {
  const upto = code.slice(0, Math.max(pos, 0));
  const lines = upto.split("\n");
  const line = lines.length;
  const col = lines[lines.length - 1].length + 1;
  return { line, col };
}

/* ── Traffic-light window dots ── */
function TrafficLights() {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-[11px] h-[11px] rounded-full bg-[#FF5F57]" />
      <span className="w-[11px] h-[11px] rounded-full bg-[#FEBC2E]" />
      <span className="w-[11px] h-[11px] rounded-full bg-[#28C840]" />
    </div>
  );
}

/* Speed of the typewriter — ms between each single character reveal. */
const TYPE_INTERVAL_MS = 32;
/* How long to sit on a finished tab before auto-advancing to the next one */
const AUTO_ADVANCE_PAUSE_MS = 2200;

export default function Banner() {
  const [activeTab, setActiveTab] = useState<TabKey>("main");
  const [typedLength, setTypedLength] = useState(0);

  const tokens = useMemo(() => tokenize(FILES[activeTab].code), [activeTab]);
  const totalLines = FILES[activeTab].code.split("\n").length;
  const { line, col } = getLineCol(FILES[activeTab].code, typedLength);

  /* Typewriter effect — replays every time the active tab changes,
     whether triggered by a tab click, the Our Work / Contact buttons,
     or the automatic tab rotation below. */
  useEffect(() => {
    setTypedLength(0);
    const fullLength = FILES[activeTab].code.length;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTypedLength(Math.min(i, fullLength));
      if (i >= fullLength) clearInterval(id);
    }, TYPE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [activeTab]);

  /* Automatic tab rotation — once the current tab has finished "typing",
     wait a moment, then move on to the next tab in order. Restarts
     cleanly whenever activeTab changes, so a manual click (or the
     Our Work / Contact buttons) simply resets the cycle from there —
     both manual and automatic switching work together. */
  useEffect(() => {
    const fullLength = FILES[activeTab].code.length;
    const typingDuration = fullLength * TYPE_INTERVAL_MS;
    const timeout = setTimeout(() => {
      setActiveTab((prev) => {
        const idx = TAB_ORDER.indexOf(prev);
        return TAB_ORDER[(idx + 1) % TAB_ORDER.length];
      });
    }, typingDuration + AUTO_ADVANCE_PAUSE_MS);
    return () => clearTimeout(timeout);
  }, [activeTab]);

  return (
    <section className="relative pb-10 mb-0 w-full bg-canvas overflow-hidden font-body">
      <style jsx>{`
    @keyframes caretBlink {
      0%, 49% { opacity: 1; }
      50%, 100% { opacity: 0; }
    }
    .caret {
      display: inline-block;
      width: 2px;
      height: 1em;
      margin-left: 1px;
      vertical-align: text-bottom;
      background: currentColor;
      animation: caretBlink 0.9s steps(1) infinite;
    }
  `}</style>



      <div className="relative z-10 w-[92%] lg:w-[90%] xl:w-[88%] 2xl:w-[85%] max-w-[1400px] mx-auto py-16 sm:py-20 lg:py-24 xl:py-28 2xl:py-36 pb-24 lg:pb-28 2xl:pb-36">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-14 lg:gap-10 xl:gap-16 2xl:gap-24">

          {/* ── Copy + actions ── */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left max-w-2xl 2xl:max-w-3xl lg:max-w-none lg:flex-1 lg:shrink-0">
            
            <span className="font-nav text-[12.5px] lg:text-[13.5px] 2xl:text-[15px] font-semibold uppercase tracking-[0.08em] text-muted mb-4 2xl:mb-5">
    For Startups, Founders & Product Teams
  </span>

            <h1 className="font-display max-w-[19ch] 2xl:max-w-[22ch] mx-auto lg:mx-0 text-[36px] sm:text-[46px] lg:text-[52px] 2xl:text-[64px] font-extrabold leading-[1.15] tracking-[-0.015em] text-foreground">
              Build Your Next Product With Confidence.
            </h1>

            <p className="font-body mt-6 2xl:mt-8 max-w-md 2xl:max-w-xl mx-auto lg:mx-0 text-[15.5px] lg:text-[16.5px] 2xl:text-[19px] leading-relaxed text-muted">
              Fast, scalable and not AI-generated shortcuts. From idea to production-ready app in weeks, we create software that helps companies grow.            </p>

            <div className="mt-9 2xl:mt-12 flex flex-col sm:flex-row items-center gap-3 2xl:gap-4">
              <Link href="/#projects">
                <button
                  onClick={() => setActiveTab("api")}
                  className="w-auto font-nav text-[15px] 2xl:text-[17px] font-semibold tracking-[0.02em] px-7 py-3 2xl:px-9 2xl:py-4 rounded-full bg-primary text-white opacity-90 hover:opacity-100 transition-opacity duration-200"
                >
                  Our Work
                </button>
              </Link>
              <Link href="/#contact">

                <button
                  onClick={() => setActiveTab("config")}
                  className="w-auto font-nav text-[15px] 2xl:text-[17px] font-semibold tracking-[0.02em] px-7 py-3 2xl:px-9 2xl:py-4 rounded-full bg-transparent border border-line text-foreground hover:bg-tint hover:border-transparent transition-colors duration-200"
                >
                  Contact
                </button>
              </Link>
            </div>
          </div>

          {/* ── Editor mockup ── */}
          <div className="relative w-full max-w-[380px] sm:max-w-[440px] md:max-w-[480px] xl:max-w-[520px] 2xl:max-w-[680px] mx-auto mt-16 lg:mt-0 lg:mx-0 lg:max-w-[440px] xl:max-w-[520px] 2xl:max-w-[680px] lg:flex-1 lg:shrink-0">
            {/* Soft blurred glow sitting behind the card — plain box-shadow
            blended into the black background, so this gives it a
            visible, ambient halo instead. */}
            <div className="absolute inset-0 rounded-3xl bg-primary/5 blur-3xl" />

            <div className="relative rounded-2xl overflow-x-hidden overflow-y-visible bg-panel border border-line shadow-sm">

              {/* Title bar */}
              <div className="flex items-center gap-3 px-4 2xl:px-5 py-3 2xl:py-4 bg-panel">
                <TrafficLights />
                <span className="font-nav text-[12px] 2xl:text-[14px] text-muted">
                  Cwmservices — VS Code
                </span>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 px-2 pt-2 bg-panel">
                {TAB_ORDER.map((key) => {
                  const active = key === activeTab;
                  return (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={[
                        "flex items-center gap-1.5 font-nav text-[12.5px] 2xl:text-[14px] px-3 2xl:px-4 py-2 2xl:py-2.5 rounded-t-lg transition-opacity duration-200",
                        active
                          ? "bg-panel text-foreground opacity-100"
                          : "text-muted opacity-70 hover:opacity-100",
                      ].join(" ")}
                    >
                      <span
                        className="w-[6px] h-[6px] 2xl:w-[7px] 2xl:h-[7px] rounded-full bg-primary transition-opacity duration-200"
                        style={{ opacity: active ? 1 : 0 }}
                      />
                      {FILES[key].label}
                    </button>
                  );
                })}
              </div>

              {/* Code area */}
              <div className="bg-panel px-5 2xl:px-7 py-5 2xl:py-7 min-h-[230px] 2xl:min-h-[300px] overflow-x-auto">
                <div className="flex gap-4 2xl:gap-5 font-mono text-[13px] 2xl:text-[15px] leading-6 2xl:leading-7">
                  <div className="select-none text-right text-muted/40">
                    {Array.from({ length: totalLines }).map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  <pre className="whitespace-pre m-0 flex-1">
                    {renderTyped(tokens, typedLength)}
                    <span className="caret text-primary" />
                  </pre>
                </div>
              </div>

              {/* Status bar */}
              <div className="flex items-center justify-between px-4 2xl:px-5 py-1.5 2xl:py-2 bg-panel border-t border-line text-muted font-nav text-[11px] 2xl:text-[13px] tracking-[0.01em]">
                <div className="flex items-center gap-3">
                  <span>TypeScript</span>
                  <span className="opacity-70">UTF-8</span>
                </div>
                <span>Ln {line}, Col {col}</span>
              </div>
            </div>

            {/* Floating build badge */}
            <motion.div
              initial={false}
              className="absolute -bottom-6 2xl:-bottom-8 -right-3 sm:-right-6 2xl:-right-8 flex items-center gap-3 2xl:gap-4 px-4 2xl:px-5 py-3 2xl:py-4 rounded-2xl bg-panel border border-line shadow-sm"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="flex items-center justify-center w-8 h-8 2xl:w-10 2xl:h-10 rounded-full bg-primary/10 text-primary text-[15px] 2xl:text-[18px]">
                ✓
              </span>
              <div className="leading-tight">
                <p className="font-nav text-[10px] 2xl:text-[11px] font-semibold uppercase tracking-[0.06em] text-muted">
                  Build
                </p>
                <p className="font-nav text-[14px] 2xl:text-[16px] font-bold text-foreground">
                  Success
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
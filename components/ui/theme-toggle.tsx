"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Sun, Moon, Monitor } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const ORDER = ["system", "light", "dark"] as const;
type Mode = (typeof ORDER)[number];

const ICONS: Record<Mode, typeof Sun> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("theme");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current: Mode = mounted ? ((theme as Mode) ?? "system") : "system";
  const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
  const Icon = ICONS[current];

  return (
    <button
      type="button"
      aria-label={t(current)}
      title={t(current)}
      onClick={() => setTheme(next)}
      suppressHydrationWarning
      className="relative inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-foreground/10 bg-card/60 backdrop-blur transition-colors hover:bg-foreground/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex"
        >
          <Icon className="h-4 w-4" aria-hidden suppressHydrationWarning />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

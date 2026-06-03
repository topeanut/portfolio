"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import clsx from "clsx";
import { ThemeToggle } from "./theme-toggle";
import { LangToggle } from "./lang-toggle";

const SECTIONS = [
  "about",
  "skills",
  "projects",
  "experience",
  "activities",
  "contact",
] as const;

export function Nav() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const prevY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 12);

    if (open) {
      prevY.current = y;
      return;
    }

    const diff = y - prevY.current;
    if (y < 80) {
      setHidden(false);
    } else if (diff > 4) {
      setHidden(true);
    } else if (diff < -4) {
      setHidden(false);
    }
    prevY.current = y;
  });

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: hidden ? -80 : 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-150",
        scrolled
          ? "border-b border-foreground/5 bg-background/70 backdrop-blur-lg"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
        <a
          href="#top"
          className="text-sm font-semibold tracking-tight md:text-base"
        >
          {t("logo")}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <li key={s}>
              <a
                href={`#${s}`}
                className="rounded-full px-3 py-2 text-sm text-muted transition-colors hover:bg-foreground/5 hover:text-foreground"
              >
                {t(s)}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <LangToggle />
          <ThemeToggle />
        </div>

        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-foreground/10 bg-card/60 backdrop-blur md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-foreground/5 bg-background/95 backdrop-blur-lg md:hidden"
          >
            <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
              {SECTIONS.map((s) => (
                <li key={s}>
                  <a
                    href={`#${s}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base text-foreground hover:bg-foreground/5"
                  >
                    {t(s)}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex items-center justify-between border-t border-foreground/5 pt-3">
                <LangToggle />
                <ThemeToggle />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

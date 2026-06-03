"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { FadeIn } from "@/components/motion/fade-in";
import { activities } from "@/lib/data";
import type { Locale } from "@/i18n/routing";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Activities() {
  const t = useTranslations("activities");
  const tExp = useTranslations("experience");
  const locale = useLocale() as Locale;

  return (
    <section id="activities" className="relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="font-mono text-sm uppercase tracking-widest text-accent">
            {t("subtitle")}
          </p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-2xl text-muted">{t("body")}</p>
        </FadeIn>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-10 grid gap-4 md:grid-cols-2"
        >
          {activities.map((a) => (
            <motion.li
              key={a.name.ko}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: EASE },
                },
              }}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
              className="rounded-2xl border border-foreground/10 bg-card/60 p-6 backdrop-blur"
            >
              <p className="font-mono text-xs text-muted">
                {a.period.start} — {a.period.end ?? tExp("present")}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{a.name[locale]}</h3>
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted">
                {a.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{b[locale]}</span>
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

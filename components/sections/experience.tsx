"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "motion/react";
import { Briefcase, GraduationCap } from "lucide-react";
import { experiences } from "@/lib/data";
import type { Locale } from "@/i18n/routing";
import { FadeIn } from "@/components/motion/fade-in";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Experience() {
  const t = useTranslations("experience");
  const locale = useLocale() as Locale;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 25%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="font-mono text-sm uppercase tracking-widest text-accent">
            {t("subtitle")}
          </p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
        </FadeIn>

        <div ref={ref} className="relative mt-12 pl-8">
          <div className="absolute left-3 top-2 h-full w-px bg-foreground/10" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-3 top-2 w-px bg-gradient-to-b from-accent via-fuchsia-500 to-sky-500"
          />

          <ul className="space-y-10 md:space-y-12">
            {experiences.map((e) => {
              const Icon = e.kind === "work" ? Briefcase : GraduationCap;
              return (
                <motion.li
                  key={`${e.company.ko}-${e.period.start}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="relative"
                >
                  <span className="absolute -left-[26px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-foreground/10 bg-background text-accent">
                    <Icon className="h-3 w-3" />
                  </span>
                  <p className="font-mono text-xs text-muted">
                    {e.period.start} — {e.period.end ?? t("present")}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold md:text-xl">
                    {e.role[locale]}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted">
                    {e.company[locale]}
                  </p>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

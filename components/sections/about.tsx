"use client";

import { useLocale, useTranslations } from "next-intl";
import { Award } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/fade-in";
import { profile, resumeProjects } from "@/lib/resume";
import { certifications } from "@/lib/data";
import type { Locale } from "@/i18n/routing";

const stats: Array<{
  key: "projects" | "activities";
  value: string;
}> = [
  { key: "projects", value: String(resumeProjects.length) },
  { key: "activities", value: "2" },
];

export function About() {
  const t = useTranslations("about");
  const locale = useLocale() as Locale;

  return (
    <section id="about" className="relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="font-mono text-sm uppercase tracking-widest text-accent">
            {t("subtitle")}
          </p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-12 md:grid-cols-5 md:gap-16">
          <div className="space-y-4 md:col-span-3">
            {profile.introduction.map((p, i) => (
              <FadeIn key={i} delay={0.05 * i}>
                <p className="text-pretty text-base leading-relaxed text-muted md:text-lg md:leading-relaxed">
                  {p[locale]}
                </p>
              </FadeIn>
            ))}

            <FadeIn delay={0.05 * profile.introduction.length}>
              <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-foreground/10 bg-card/50 px-4 py-3 backdrop-blur">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Award className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted">
                    {t("certificationsLabel")}
                  </p>
                  <p className="text-sm font-medium">
                    {certifications.map((c) => c[locale]).join(" · ")}
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          <Stagger className="grid grid-cols-2 gap-4 md:col-span-2 md:grid-cols-1 md:gap-6">
            {stats.map((s) => (
              <StaggerItem key={s.key}>
                <div className="rounded-2xl border border-foreground/10 bg-card/50 p-4 backdrop-blur md:p-6">
                  <p className="text-3xl font-semibold md:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs text-muted md:text-sm">
                    {t(`highlights.${s.key}`)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

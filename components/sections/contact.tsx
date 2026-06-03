"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { contacts } from "@/lib/data";
import type { Locale } from "@/i18n/routing";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Contact() {
  const t = useTranslations("contact");
  const locale = useLocale() as Locale;

  return (
    <section id="contact" className="relative px-4 py-24 md:px-8 md:py-32">
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
          className="mt-10 grid gap-3 sm:grid-cols-3"
        >
          {contacts.map(({ label, href, icon: Icon, hint }) => {
            const finalHref = label === "resume" ? `/api/resume?lang=${locale}` : href;
            const isExternal = finalHref.startsWith("http");
            return (
              <motion.li
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: EASE },
                  },
                }}
              >
                <a
                  href={finalHref}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between rounded-2xl border border-foreground/10 bg-card/60 p-5 backdrop-blur transition-colors hover:border-accent/40 hover:bg-card"
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium">{t(label)}</span>
                      {hint && (
                        <span className="text-xs text-muted">{hint}</span>
                      )}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                </a>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

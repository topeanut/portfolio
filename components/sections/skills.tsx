"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";
import { FadeIn } from "@/components/motion/fade-in";
import { skills } from "@/lib/data";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Skills() {
  const t = useTranslations("skills");
  const tCat = useTranslations("skills.categories");

  const grouped = (["frontend", "backend", "cowork"] as const).map((category) => ({
    category,
    items: skills.filter((s) => s.category === category),
  }));

  return (
    <section id="skills" className="relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="font-mono text-sm uppercase tracking-widest text-accent">
            {t("subtitle")}
          </p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
        </FadeIn>

        <div className="mt-12 space-y-10">
          {grouped.map((g, gi) => (
            <FadeIn key={g.category} delay={0.05 * gi}>
              <h3 className="mb-4 text-sm font-medium text-muted">
                {tCat(g.category)}
              </h3>
              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06 } },
                }}
                className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
              >
                {g.items.map(({ name, icon: Icon }) => (
                  <motion.li
                    key={name}
                    variants={{
                      hidden: { opacity: 0, y: 16, scale: 0.95 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: { duration: 0.4, ease: EASE },
                      },
                    }}
                    whileHover={{ y: -4, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex items-center gap-3 rounded-xl border border-foreground/10 bg-card/60 p-3 backdrop-blur md:p-4"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium">{name}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

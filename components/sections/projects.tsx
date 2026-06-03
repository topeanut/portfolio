"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Smartphone,
} from "lucide-react";
import clsx from "clsx";
import useEmblaCarousel from "embla-carousel-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { FadeIn } from "@/components/motion/fade-in";
import { GithubIcon } from "@/components/ui/brand-icons";
import { projects, type Project } from "@/lib/projects";
import type { Locale } from "@/i18n/routing";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function ProjectGallery({
  items,
  alt,
  locale,
  aspect = "mobile",
}: {
  items: NonNullable<Project["gallery"]>;
  alt: string;
  locale: Locale;
  aspect?: "mobile" | "web";
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: false,
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="-ml-3 flex">
            {items.map((item, i) => {
              const isItemWeb = (item.aspect ?? aspect) === "web";
              return (
                <div
                  key={item.src}
                  className={clsx(
                    "min-w-0 pl-3",
                    isItemWeb
                      ? "flex-[0_0_92%] sm:flex-[0_0_88%] md:flex-[0_0_80%]"
                      : "flex-[0_0_70%] sm:flex-[0_0_55%] md:flex-[0_0_45%]",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`${alt} — ${item.caption[locale]} (확대 보기)`}
                    className={clsx(
                      "group relative block w-full cursor-pointer overflow-hidden rounded-2xl border border-foreground/10 bg-card/40",
                      isItemWeb ? "aspect-[16/10]" : "aspect-[390/844]",
                    )}
                  >
                    <Image
                      src={item.src}
                      alt={`${alt} — ${item.caption[locale]}`}
                      fill
                      sizes={
                        isItemWeb
                          ? "(max-width: 768px) 92vw, 720px"
                          : "(max-width: 768px) 70vw, 280px"
                      }
                      unoptimized
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <span className="pointer-events-none absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-background/70 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                      <Maximize2 className="h-3.5 w-3.5" />
                    </span>
                  </button>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {i + 1}. {item.caption[locale]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {items.length > 1 && (
          <>
            <button
              type="button"
              aria-label="prev"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              className="absolute -left-2 top-[38%] hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-foreground/10 bg-background/90 shadow-sm backdrop-blur transition hover:bg-foreground/5 disabled:cursor-not-allowed disabled:opacity-30 md:inline-flex"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="next"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              className="absolute -right-2 top-[38%] hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-foreground/10 bg-background/90 shadow-sm backdrop-blur transition hover:bg-foreground/5 disabled:cursor-not-allowed disabled:opacity-30 md:inline-flex"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {items.length > 1 && (
        <div className="flex items-center justify-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`go to ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={clsx(
                "h-1.5 cursor-pointer rounded-full transition-all",
                selectedIndex === i
                  ? "w-6 bg-accent"
                  : "w-1.5 bg-foreground/20 hover:bg-foreground/40",
              )}
            />
          ))}
        </div>
      )}

      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex < 0 ? 0 : lightboxIndex}
        close={() => setLightboxIndex(-1)}
        plugins={[Zoom]}
        slides={items.map((item) => ({
          src: item.src,
          alt: `${alt} — ${item.caption[locale]}`,
          description: item.caption[locale],
        }))}
        carousel={{ finite: true }}
        zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
        styles={{ container: { backgroundColor: "rgba(0, 0, 0, 0.92)" } }}
      />
    </div>
  );
}

function formatPeriod(p: Project["period"], present: string) {
  return `${p.start} — ${p.end ?? present}`;
}

export function Projects() {
  const t = useTranslations("projects");
  const tExp = useTranslations("experience");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeSlug = searchParams.get("project");
  const active = activeSlug
    ? projects.find((p) => p.slug === activeSlug) ?? null
    : null;

  const setProjectParam = useCallback(
    (slug: string | null, mode: "push" | "replace") => {
      const params = new URLSearchParams(searchParams.toString());
      if (slug) params.set("project", slug);
      else params.delete("project");
      const qs = params.toString();
      const url = qs ? `${pathname}?${qs}` : pathname;
      if (mode === "push") router.push(url, { scroll: false });
      else router.replace(url, { scroll: false });
    },
    [router, pathname, searchParams],
  );

  const openProject = useCallback(
    (slug: string) => setProjectParam(slug, "push"),
    [setProjectParam],
  );

  const closeProject = useCallback(
    () => setProjectParam(null, "replace"),
    [setProjectParam],
  );

  const initialActiveSlug = useRef(activeSlug);
  useEffect(() => {
    if (!initialActiveSlug.current) return;
    requestAnimationFrame(() => {
      document
        .getElementById("projects")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  useEffect(() => {
    if (active) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, closeProject]);

  return (
    <section id="projects" className="relative px-4 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn>
          <p className="font-mono text-sm uppercase tracking-widest text-accent">
            {t("subtitle")}
          </p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
        </FadeIn>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((p) => (
            <motion.li
              key={p.slug}
              layoutId={`card-${p.slug}`}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: EASE },
                },
              }}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={() => openProject(p.slug)}
              className="group cursor-pointer overflow-hidden rounded-2xl border border-foreground/10 bg-card/60 backdrop-blur"
            >
              <motion.div
                layoutId={`cover-${p.slug}`}
                className={clsx(
                  "relative aspect-[4/3] overflow-hidden bg-gradient-to-br",
                  p.gradient,
                )}
              >
                {p.cover && (
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                    className="object-cover object-top"
                  />
                )}
                <div className="absolute inset-x-4 bottom-3 flex items-center justify-between rounded-md bg-background/40 px-2 py-1 font-mono text-xs text-foreground backdrop-blur-sm">
                  <span>{formatPeriod(p.period, tExp("present"))}</span>
                </div>
              </motion.div>
              <div className="p-5">
                <motion.h3
                  layoutId={`title-${p.slug}`}
                  className="text-lg font-semibold"
                >
                  {p.title}
                </motion.h3>
                <p className="mt-1 text-sm text-muted">{p.summary[locale]}</p>
                {p.role && (
                  <p className="mt-2 text-xs font-medium text-accent">
                    {p.role[locale]}
                  </p>
                )}
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {p.techStack.slice(0, 4).map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-foreground/10 px-2 py-0.5 text-xs text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                  {p.techStack.length > 4 && (
                    <li className="rounded-full border border-foreground/10 px-2 py-0.5 text-xs text-muted">
                      +{p.techStack.length - 4}
                    </li>
                  )}
                </ul>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[100] flex cursor-pointer items-end justify-center bg-black/60 backdrop-blur-sm md:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProject}
          >
            <motion.div
              layoutId={`card-${active.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="relative flex max-h-[90svh] w-full max-w-2xl cursor-default flex-col overflow-hidden rounded-t-3xl border border-foreground/10 bg-background md:max-h-[88vh] md:rounded-3xl"
            >
              <motion.div
                layoutId={`cover-${active.slug}`}
                className={clsx(
                  "relative aspect-[16/9] shrink-0 overflow-hidden bg-gradient-to-br",
                  active.gradient,
                )}
              >
                {active.cover && (
                  <Image
                    src={active.cover}
                    alt={active.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                    className="object-contain p-4 md:p-6"
                  />
                )}
              </motion.div>
              <button
                type="button"
                aria-label={t("close")}
                onClick={closeProject}
                className="absolute right-4 top-4 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-foreground/10 bg-card/80 backdrop-blur"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <motion.h3
                  layoutId={`title-${active.slug}`}
                  className="text-2xl font-bold md:text-3xl"
                >
                  {active.title}
                </motion.h3>
                <p className="mt-1 font-mono text-xs text-muted">
                  {formatPeriod(active.period, tExp("present"))}
                </p>
                {active.role && (
                  <p className="mt-1 text-sm font-medium text-accent">
                    {active.role[locale]}
                  </p>
                )}
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {active.summary[locale]}
                </p>

                <ul className="mt-4 space-y-1.5 text-sm leading-relaxed text-muted">
                  {active.responsibilities.map((r, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{r[locale]}</span>
                    </li>
                  ))}
                </ul>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {active.techStack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-foreground/10 px-2 py-0.5 text-xs text-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                {active.gallery && active.gallery.length > 0 && (
                  <div className="mt-6">
                    <p className="mb-2 text-xs uppercase tracking-widest text-muted">
                      {locale === "ko" ? "작업한 화면" : "Screens I built"}
                    </p>
                    <ProjectGallery
                      items={active.gallery}
                      alt={active.title}
                      locale={locale}
                      aspect={active.galleryAspect}
                    />
                  </div>
                )}

                {active.preview && (
                  <div className="mt-6">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs uppercase tracking-widest text-muted">
                        {locale === "ko" ? "전체 페이지 미리보기" : "Full page preview"}
                      </p>
                      <a
                        href={active.preview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-foreground/15 px-2.5 py-1 text-xs font-medium hover:bg-foreground/5"
                      >
                        {locale === "ko" ? "원본 크기로 열기" : "Open full size"}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <div className="overflow-hidden rounded-xl border border-foreground/10">
                      <Image
                        src={active.preview}
                        alt={`${active.title} full preview`}
                        width={1440}
                        height={3000}
                        sizes="(max-width: 768px) 100vw, 600px"
                        unoptimized
                        className="h-auto w-full"
                      />
                    </div>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  {active.liveUrl && (
                    <a
                      href={active.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {t("viewLive")}
                    </a>
                  )}
                  {active.codeUrl && (
                    <a
                      href={active.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-sm font-medium hover:bg-foreground/5"
                    >
                      <GithubIcon className="h-4 w-4" />
                      {t("viewCode")}
                    </a>
                  )}
                  {active.appUrl && (
                    <a
                      href={active.appUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-4 py-2 text-sm font-medium hover:bg-foreground/5"
                    >
                      <Smartphone className="h-4 w-4" />
                      {t("viewApp")}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

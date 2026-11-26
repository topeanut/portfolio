import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Activities, SmallProjects } from "@/components/sections/activities";
import { Contact } from "@/components/sections/contact";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Suspense fallback={null}>
        <Projects />
      </Suspense>
      <SmallProjects />
      <Experience />
      <Activities />
      <Contact />
    </main>
  );
}

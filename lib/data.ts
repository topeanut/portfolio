import {
  Code2,
  FileType2,
  Layers,
  Wind,
  Database,
  GitBranch,
  MessageSquare,
  Palette,
  Blocks,
  Boxes,
  Server,
  Mail,
  FileText,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { GithubIcon } from "@/components/ui/brand-icons";
import {
  certifications as resumeCertifications,
  education,
  otherExperiences,
  profile,
  skillGroups,
} from "./resume";

export type Skill = {
  name: string;
  icon: LucideIcon;
  category: "frontend" | "cowork";
};

const ICON_MAP: Record<string, LucideIcon> = {
  JavaScript: Code2,
  TypeScript: FileType2,
  React: Wind,
  "Next.js": Layers,
  "Tailwind CSS": Palette,
  "shadcn/ui": Blocks,
  Zustand: Database,
  "Redux Toolkit": Boxes,
  "TanStack Query": Server,
  GitHub: GitBranch,
  Slack: MessageSquare,
};

export const skills: Skill[] = skillGroups.flatMap((g) =>
  g.items.map((name) => ({
    name,
    icon: ICON_MAP[name] ?? Code2,
    category: g.category,
  })),
);

export type ExperienceItem = {
  company: { ko: string; en: string };
  role: { ko: string; en: string };
  period: { start: string; end?: string };
  kind: "work" | "education";
};

const workExperiences: ExperienceItem[] = [
  {
    company: { ko: "전능아이티", en: "전능아이티" },
    role: { ko: "프론트엔드 엔지니어", en: "Frontend Engineer" },
    period: { start: "2025.04" },
    kind: "work",
  },
];

export const experiences: ExperienceItem[] = [
  ...workExperiences,
  ...education.map<ExperienceItem>((e) => ({
    company: e.school,
    role: e.major,
    period: e.period,
    kind: "education",
  })),
];

export type Activity = {
  name: { ko: string; en: string };
  period: { start: string; end?: string };
  bullets: { ko: string; en: string }[];
};

export const activities: Activity[] = otherExperiences.map((o) => ({
  name: o.title,
  period: o.period,
  bullets: o.bullets,
}));

export type CertificationItem = { ko: string; en: string };

export const certifications: CertificationItem[] = resumeCertifications.map(
  (c) => c.name,
);

export type ContactLink = {
  label: "email" | "github" | "resume";
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  hint?: string;
};

export const contacts: ContactLink[] = [
  { label: "email", href: `mailto:${profile.email}`, icon: Mail, hint: profile.email },
  {
    label: "github",
    href: profile.github.href,
    icon: GithubIcon,
    hint: profile.github.label,
  },
  { label: "resume", href: "/api/resume?lang=ko", icon: FileText },
];

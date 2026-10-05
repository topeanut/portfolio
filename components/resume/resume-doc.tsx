import path from "node:path";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";
import {
  profile,
  skillGroups,
  certifications,
  education,
  resumeProjects,
  otherExperiences,
  workExperiences,
} from "@/lib/resume";
import type { Locale } from "@/i18n/routing";

const FONT_DIR = path.join(process.cwd(), "public", "fonts");

Font.register({
  family: "Pretendard",
  fonts: [
    { src: path.join(FONT_DIR, "Pretendard-Regular.ttf"), fontWeight: 400 },
    { src: path.join(FONT_DIR, "Pretendard-SemiBold.ttf"), fontWeight: 600 },
    { src: path.join(FONT_DIR, "Pretendard-Bold.ttf"), fontWeight: 700 },
  ],
});

Font.registerHyphenationCallback((word) => [word]);

const PALETTE = {
  text: "#111111",
  muted: "#5b5b66",
  subtle: "#9a9aa8",
  border: "#e4e4e8",
  accent: "#4f46e5",
  bg: "#ffffff",
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 44,
    fontFamily: "Pretendard",
    fontSize: 10,
    color: PALETTE.text,
    backgroundColor: PALETTE.bg,
    lineHeight: 1.55,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: PALETTE.border,
  },
  headerLeft: { flexDirection: "column" },
  name: {
    fontSize: 24,
    fontWeight: 700,
    color: PALETTE.text,
    lineHeight: 1.15,
  },
  role: {
    fontSize: 12,
    color: PALETTE.muted,
    marginTop: 6,
    lineHeight: 1.2,
  },
  headerRight: {
    flexDirection: "column",
    alignItems: "flex-end",
    fontSize: 9.5,
  },
  contactRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  contactLabel: {
    color: PALETTE.subtle,
    width: 50,
  },
  contactValue: {
    color: PALETTE.text,
  },

  section: { marginTop: 20 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: PALETTE.text,
    marginBottom: 8,
    lineHeight: 1.25,
  },

  introPara: {
    color: PALETTE.text,
    marginBottom: 5,
  },

  twoCol: { flexDirection: "row", gap: 24 },
  skillCategoryLabel: {
    fontWeight: 600,
    color: PALETTE.muted,
    width: 70,
    fontSize: 10,
  },
  skillRow: { flexDirection: "row", marginBottom: 3 },
  skillItems: { flex: 1, color: PALETTE.text },

  bulletRow: { flexDirection: "row", marginBottom: 3 },
  bulletDot: {
    width: 10,
    color: PALETTE.accent,
    fontWeight: 700,
  },
  bulletText: { flex: 1, color: PALETTE.text },

  projectItem: { marginBottom: 14 },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: PALETTE.text,
    lineHeight: 1.25,
  },
  projectPeriod: { fontSize: 9.5, color: PALETTE.subtle },
  projectSummary: { color: PALETTE.muted, marginBottom: 4 },
  projectRoleLine: {
    fontWeight: 600,
    color: PALETTE.accent,
    marginBottom: 4,
    fontSize: 10,
  },
  techLine: { marginTop: 4, color: PALETTE.muted, fontSize: 9.5 },
  techLabel: { fontWeight: 600, color: PALETTE.text },

  link: { color: PALETTE.accent, textDecoration: "none" },

  experienceItem: { marginBottom: 10 },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  experienceTitle: { fontWeight: 700, color: PALETTE.text, lineHeight: 1.25 },
});

const SECTION_LABELS: Record<string, { ko: string; en: string }> = {
  intro: { ko: "소개", en: "Introduction" },
  skills: { ko: "기술", en: "Skills" },
  certifications: { ko: "자격증", en: "Certifications" },
  education: { ko: "학력", en: "Education" },
  work: { ko: "경력", en: "Work Experience" },
  projects: { ko: "프로젝트", en: "Projects" },
  otherExperience: { ko: "기타 경력 및 경험", en: "Other Experience" },
};

const HEADER_LABELS: Record<string, { ko: string; en: string }> = {
  phone: { ko: "Mobile", en: "Mobile" },
  email: { ko: "Email", en: "Email" },
  github: { ko: "GitHub", en: "GitHub" },
};

function formatPeriod(p: { start: string; end?: string }, present: string) {
  return `${p.start} — ${p.end ?? present}`;
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.bulletRow}>
      <Text style={styles.bulletDot}>•</Text>
      <Text style={styles.bulletText}>{children}</Text>
    </View>
  );
}

export function ResumeDoc({ locale }: { locale: Locale }) {
  const present = locale === "ko" ? "현재" : "Present";

  return (
    <Document
      title={`${profile.name[locale]} — ${profile.role[locale]}`}
      author={profile.name.en}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{profile.name[locale]}</Text>
            <Text style={styles.role}>{profile.role[locale]}</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>
                {HEADER_LABELS.phone[locale]}
              </Text>
              <Text style={styles.contactValue}>{profile.phone}</Text>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>
                {HEADER_LABELS.email[locale]}
              </Text>
              <Link src={`mailto:${profile.email}`} style={styles.link}>
                {profile.email}
              </Link>
            </View>
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>
                {HEADER_LABELS.github[locale]}
              </Text>
              <Link src={profile.github.href} style={styles.link}>
                {profile.github.label}
              </Link>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{SECTION_LABELS.intro[locale]}</Text>
          {profile.introduction.map((p, i) => (
            <Text key={i} style={styles.introPara}>
              {p[locale]}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {SECTION_LABELS.skills[locale]}
          </Text>
          {skillGroups.map((g) => (
            <View key={g.category} style={styles.skillRow}>
              <Text style={styles.skillCategoryLabel}>{g.label[locale]}</Text>
              <Text style={styles.skillItems}>{g.items.join(" · ")}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {SECTION_LABELS.certifications[locale]}
          </Text>
          {certifications.map((c, i) => (
            <Bullet key={i}>{c.name[locale]}</Bullet>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {SECTION_LABELS.education[locale]}
          </Text>
          {education.map((e, i) => (
            <View key={i} style={styles.bulletRow}>
              <Text style={styles.bulletDot}>•</Text>
              <Text style={styles.bulletText}>
                {e.school[locale]} — {e.major[locale]}{" "}
                <Text style={{ color: PALETTE.subtle }}>
                  ({formatPeriod(e.period, present)})
                </Text>
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {SECTION_LABELS.work[locale]}
          </Text>
          {workExperiences.map((w) => (
            <View key={w.slug} style={styles.experienceItem} wrap={false}>
              <View style={styles.experienceHeader}>
                <Text style={styles.experienceTitle}>
                  {w.company[locale]} — {w.role[locale]}
                </Text>
                <Text style={styles.projectPeriod}>
                  {formatPeriod(w.period, present)}
                </Text>
              </View>
              {w.bullets.map((b, i) => (
                <Bullet key={i}>{b[locale]}</Bullet>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {SECTION_LABELS.projects[locale]}
          </Text>
          {resumeProjects.map((p) => (
            <View key={p.slug} style={styles.projectItem} wrap={false}>
              <View style={styles.projectHeader}>
                <Text style={styles.projectTitle}>{p.title}</Text>
                <Text style={styles.projectPeriod}>
                  {formatPeriod(p.period, present)}
                </Text>
              </View>
              <Text style={styles.projectSummary}>{p.summary[locale]}</Text>
              {p.role && (
                <Text style={styles.projectRoleLine}>● {p.role[locale]}</Text>
              )}
              {p.responsibilities.map((r, i) => (
                <Bullet key={i}>{r[locale]}</Bullet>
              ))}
              <Text style={styles.techLine}>
                <Text style={styles.techLabel}>
                  {locale === "ko" ? "사용 기술: " : "Tech: "}
                </Text>
                {p.techStack.join(", ")}
              </Text>
              {p.codeUrl && (
                <Text style={styles.techLine}>
                  <Text style={styles.techLabel}>GitHub: </Text>
                  <Link src={p.codeUrl} style={styles.link}>
                    {p.codeUrl.replace("https://", "")}
                  </Link>
                </Text>
              )}
              {p.liveUrl && (
                <Text style={styles.techLine}>
                  <Text style={styles.techLabel}>Live: </Text>
                  <Link src={p.liveUrl} style={styles.link}>
                    {p.liveUrl.replace("https://", "")}
                  </Link>
                </Text>
              )}
              {p.appUrl && (
                <Text style={styles.techLine}>
                  <Text style={styles.techLabel}>App: </Text>
                  <Link src={p.appUrl} style={styles.link}>
                    {p.appUrl.replace("https://", "")}
                  </Link>
                </Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {SECTION_LABELS.otherExperience[locale]}
          </Text>
          {otherExperiences.map((o) => (
            <View key={o.slug} style={styles.experienceItem} wrap={false}>
              <View style={styles.experienceHeader}>
                <Text style={styles.experienceTitle}>{o.title[locale]}</Text>
                <Text style={styles.projectPeriod}>
                  {formatPeriod(o.period, present)}
                </Text>
              </View>
              {o.bullets.map((b, i) => (
                <Bullet key={i}>{b[locale]}</Bullet>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

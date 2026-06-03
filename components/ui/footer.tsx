import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/5 py-10">
      <div className="mx-auto flex max-w-6xl items-center justify-start px-4 text-sm text-muted md:px-8">
        <p>
          © {year} Jeonghan Lee. {t("rights")}
        </p>
      </div>
    </footer>
  );
}

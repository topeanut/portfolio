import { renderToBuffer } from "@react-pdf/renderer";
import { NextResponse, type NextRequest } from "next/server";
import { ResumeDoc } from "@/components/resume/resume-doc";
import { routing, type Locale } from "@/i18n/routing";
import { profile } from "@/lib/resume";

export const runtime = "nodejs";

function resolveLocale(raw: string | null): Locale {
  if (raw && (routing.locales as readonly string[]).includes(raw)) {
    return raw as Locale;
  }
  return routing.defaultLocale;
}

export async function GET(request: NextRequest) {
  const locale = resolveLocale(request.nextUrl.searchParams.get("lang"));

  const buffer = await renderToBuffer(<ResumeDoc locale={locale} />);

  const baseName =
    locale === "ko"
      ? `${profile.name.ko}_이력서`
      : `${profile.name.en.replace(/\s+/g, "_")}_Resume`;

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(baseName)}.pdf`,
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}

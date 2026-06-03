export type LocalizedString = { ko: string; en: string };

export type ResumeProfile = {
  name: LocalizedString;
  role: LocalizedString;
  phone: string;
  email: string;
  github: { label: string; href: string };
  introduction: LocalizedString[];
};

export type SkillGroup = {
  category: "frontend" | "cowork";
  label: LocalizedString;
  items: string[];
};

export type Certification = {
  name: LocalizedString;
};

export type Education = {
  school: LocalizedString;
  major: LocalizedString;
  period: { start: string; end?: string };
};

export type ResumeProject = {
  slug: string;
  title: string;
  period: { start: string; end?: string };
  summary: LocalizedString;
  role?: LocalizedString;
  responsibilities: LocalizedString[];
  techStack: string[];
  liveUrl?: string;
  codeUrl?: string;
  appUrl?: string;
  gradient: string;
  cover?: string;
  preview?: string;
  gallery?: {
    src: string;
    caption: LocalizedString;
    aspect?: "mobile" | "web";
  }[];
  galleryAspect?: "mobile" | "web";
};

export type OtherExperience = {
  slug: string;
  title: LocalizedString;
  period: { start: string; end?: string };
  bullets: LocalizedString[];
};

export const profile: ResumeProfile = {
  name: { ko: "이정한", en: "Jeonghan Lee" },
  role: { ko: "프론트엔드 엔지니어", en: "Frontend Engineer" },
  phone: "+82 10-2748-1648",
  email: "ljhh1648@gmail.com",
  github: { label: "github.com/topeanut", href: "https://github.com/topeanut" },
  introduction: [
    {
      ko: "프론트엔드 엔지니어로서 다양한 서비스의 기획·개발·배포를 경험했습니다. 주로 웹 서비스 개발을 담당했으며, 필요에 따라 프론트엔드 파트장을 겸하며 팀을 이끌었습니다.",
      en: "As a frontend engineer, I've taken services through planning, development, and deployment. Mostly building web services, I've also led the frontend track as part lead when needed.",
    },
    {
      ko: "직군을 넘나드는 협업을 중요하게 생각하며, 다양한 팀원들과 적극적으로 소통하며 프로젝트를 수행해왔습니다.",
      en: "I value cross-functional collaboration and have driven projects by communicating actively with teammates across roles.",
    },
    {
      ko: "내가 작성한 코드의 결과로 그것을 사용하는 사람들이 어떤 경험을 할지에 대해 고민합니다.",
      en: "I keep thinking about the experience people will have because of the code I write.",
    },
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    category: "frontend",
    label: { ko: "프론트엔드", en: "Frontend" },
    items: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "shadcn/ui",
      "Zustand",
      "Redux Toolkit",
      "TanStack Query",
    ],
  },
  {
    category: "cowork",
    label: { ko: "협업", en: "Co-work" },
    items: ["GitHub", "Slack"],
  },
];

export const certifications: Certification[] = [
  { name: { ko: "정보처리산업기사", en: "Engineer Information Processing" } },
];

export const education: Education[] = [
  {
    school: { ko: "홍익대학교", en: "Hongik University" },
    major: { ko: "컴퓨터공학과", en: "Computer Engineering" },
    period: { start: "2022.03" },
  },
];

export const resumeProjects: ResumeProject[] = [
  {
    slug: "loopin",
    title: "Loopin",
    period: { start: "2025.10" },
    summary: {
      ko: "AI 플래너로 루틴(루프)을 만들고, 캘린더로 진척을 관리하며, 팀 루프로 함께 동기부여하는 학습 루틴 플랫폼. 모바일 웹으로 운영 중이며, 동일 코드 기반 안드로이드 웹뷰 앱도 함께 작업 중.",
      en: "A learning-routine platform — create loops with an AI planner, track them on a calendar, and stay motivated through team loops. Live as a mobile web app, with an Android WebView wrapper in progress.",
    },
    role: {
      ko: "프론트엔드 개발 (FE 2인 팀)",
      en: "Frontend (2-person FE team)",
    },
    responsibilities: [
      {
        ko: "AI 플래너 채팅 — 자연어 입력으로 추천 루프를 생성·선택하는 채팅 플로우. SSE(Server-Sent Events) 기반 단방향 스트리밍으로 구현하고, usePlannerChat 훅에서 토큰 단위로 메시지를 누적 렌더링 + 추천 카드 JSON을 파싱해 인라인으로 띄움.",
        en: "AI planner chat — natural-language flow that generates and selects recommended loops. Built on SSE (Server-Sent Events) for one-way streaming; usePlannerChat accumulates tokens for incremental rendering and parses recommendation-card JSON inline.",
      },
      {
        ko: "인증·온보딩 — OAuth 콜백 라우트, Redux authSlice, providers 및 닉네임 입력 + 4단계 이미지 온보딩 페이지 구현.",
        en: "Auth & onboarding — OAuth callback route, Redux authSlice, providers, nickname entry, and the 4-step image onboarding pages.",
      },
      {
        ko: "공통 API 라이브러리(api.ts) 및 디자인 시스템 컴포넌트(Button / Dialog / Sheet / Segmented control / ActionButton) 공통화와 Storybook 정리.",
        en: "Shared API library (api.ts) and design-system primitives (Button / Dialog / Sheet / Segmented control / ActionButton), with Storybook coverage.",
      },
      {
        ko: "마이페이지, 알림, 개인정보 처리방침, 서비스 소개(introduce) 페이지 및 (auth) 라우트 그룹 + 패럴렐 헤더 슬롯 구조 리팩터링.",
        en: "My-page, notifications, privacy policy, the service-introduce page, and an (auth) route-group refactor with parallel-route header slots.",
      },
      {
        ko: "안드로이드 웹뷰 앱 동시 진행 — 동일 코드베이스를 네이티브 셸에 얹는 작업.",
        en: "Android WebView app in parallel — wrapping the same codebase in a native shell.",
      },
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "Firebase",
      "Radix UI",
      "React Hook Form",
      "SSE",
    ],
    liveUrl: "https://loopin.co.kr",
    codeUrl: "https://github.com/ITA-Loopin/loopin-fe",
    gradient: "from-orange-400/30 via-rose-400/20 to-amber-400/30",
    cover: "/projects/loopin-planner.png",
    gallery: [
      {
        src: "/projects/loopin-planner.png",
        caption: {
          ko: "AI 플래너 — 자연어로 루프를 요청하면 3가지 추천 루프 생성",
          en: "AI planner — natural-language input yields 3 recommended loops",
        },
      },
      {
        src: "/projects/loopin-recommend-select.png",
        caption: {
          ko: "추천 루프 선택 — 카드의 '선택하기'를 누르면 추천 데이터가 자동으로 채워진 루프 추가 시트가 열림",
          en: "Pick a recommendation — tapping a card opens an add-loop sheet pre-filled with the recommended data",
        },
      },
      {
        src: "/projects/loopin-recommend-select-bottom.png",
        caption: {
          ko: "시트 하단 — 반복 주기와 반복 기간을 조정하고 '루프 추가하기'로 확정",
          en: "Sheet bottom — adjust repeat cycle and date range, then confirm with 'Add loop'",
        },
      },
      {
        src: "/projects/loopin-recommend-added.png",
        caption: {
          ko: "추가 결과 — 홈 Loop List에 새로 생성된 루프가 곧바로 반영",
          en: "Result — the new loop lands in the home Loop List right away",
        },
      },
      {
        src: "/projects/loopin-onboarding.png",
        caption: {
          ko: "온보딩 — AI 플래너 사용 흐름을 4단계 이미지로 안내",
          en: "Onboarding — a 4-step image tour of the AI planner flow",
        },
      },
    ],
  },
  {
    slug: "valanse",
    title: "ValanSe",
    period: { start: "2025.05" },
    summary: {
      ko: "밸런스 게임에 진심인 사람들을 위한 플랫폼. 카카오 로그인 기반으로 밸런스 게임을 만들고 투표하고 댓글로 공유하는 서비스 — Google Play 안드로이드 웹뷰 배포 진행.",
      en: "A platform for balance-game enthusiasts — create, vote, comment, and share. Kakao OAuth, shipped as an Android webview on Google Play.",
    },
    role: {
      ko: "팀장 / 프론트엔드 파트장 / 기획 (FE 2인 팀)",
      en: "Team Lead / Frontend Lead / Product (2-person FE team)",
    },
    responsibilities: [
      {
        ko: "밸런스 탭(메인) 설계·구현 — 카테고리 필터, 인기 급상승 토픽, 무한 스크롤 카드 리스트",
        en: "Designed and shipped the main Balanse tab — category filter, hot topics, infinite-scroll card list",
      },
      {
        ko: "투표 상세 페이지 구현 — 선택지·결과·댓글",
        en: "Built the poll detail page — options, results, comments",
      },
      {
        ko: "핫이슈(인기) 페이지 및 마이페이지(개인정보·포인트·칭호) 구현",
        en: "Shipped the hot-issue page and the My pages (profile, points, titles)",
      },
      {
        ko: "비로그인 로직, SEO 메타 초기화 + Google Search Console 등록",
        en: "Implemented non-login flow, SEO metadata, and Google Search Console submission",
      },
      {
        ko: "공통 컴포넌트 — 로딩 스피너, 뒤로가기 모달, 댓글, 전체보기 버튼 등",
        en: "Built shared components — loading spinner, back-confirm modal, comments, see-all buttons, etc.",
      },
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "Axios",
      "Radix UI",
      "Chart.js",
      "Storybook",
    ],
    liveUrl: "https://valanse.kr",
    codeUrl: "https://github.com/ValanSee/ValanSe_Web",
    appUrl: "https://play.google.com/store/apps/details?id=com.valanse&hl=ko",
    gradient: "from-slate-400/30 via-blue-400/20 to-orange-400/30",
    cover: "/projects/valanse-home.png",
    gallery: [
      {
        src: "/projects/valanse-home.png",
        caption: {
          ko: "홈 — 저울 일러스트와 카테고리 진입",
          en: "Home — scale illustration and category entry",
        },
      },
      {
        src: "/projects/valanse-balanse.png",
        caption: {
          ko: "밸런스 탭 — 인기 토픽, 카테고리 필터, 무한스크롤 카드",
          en: "Balanse tab — hot topics, category filter, infinite-scroll cards",
        },
      },
      {
        src: "/projects/valanse-poll-detail.png",
        caption: {
          ko: "투표 결과 — 남자/여자 분포",
          en: "Poll result — male/female distribution",
        },
      },
      {
        src: "/projects/valanse-poll-detail-age.png",
        caption: {
          ko: "투표 결과 — 나이대별 분포",
          en: "Poll result — by age group",
        },
      },
      {
        src: "/projects/valanse-poll-detail-mbti.png",
        caption: {
          ko: "투표 결과 — MBTI별 분포",
          en: "Poll result — by MBTI",
        },
      },
      {
        src: "/projects/valanse-hot.png",
        caption: {
          ko: "오늘의 핫이슈 — 인기 투표 큐레이션",
          en: "Today's hot issue — popular poll curation",
        },
      },
      {
        src: "/projects/valanse-point.png",
        caption: {
          ko: "포인트 — 보유 포인트·적립/사용 내역",
          en: "Points — balance and history",
        },
      },
      {
        src: "/projects/valanse-titles.png",
        caption: {
          ko: "칭호 — 티어별 보유/잠금 표시",
          en: "Titles — owned and locked by tier",
        },
      },
      {
        src: "/projects/valanse-create.png",
        caption: {
          ko: "밸런스 게임 만들기 — 질문·썰·선택지 폼",
          en: "Create — question, story, and options form",
        },
      },
    ],
  },
  {
    slug: "cmc-allground",
    title: "All Ground",
    period: { start: "2026.05", end: "2026.05" },
    summary: {
      ko: "장애인 생활체육을 위한 안심 네트워크 플랫폼. 위치 기반으로 접근성이 보장된 시설을 찾고 함께할 메이트를 매칭하는 모바일 서비스 — 스포츠 주제 해커톤 프로젝트.",
      en: "A trusted network for adaptive sports — find accessible facilities nearby and match with workout mates. Built for a sports-themed hackathon.",
    },
    role: {
      ko: "프론트엔드 개발 (FE 2인 팀)",
      en: "Frontend (2-person FE team)",
    },
    responsibilities: [
      {
        ko: "시설(facility) 페이지 및 위치 선택 컴포넌트 설계·구현",
        en: "Designed and shipped the facility page and the location selector component",
      },
      {
        ko: "메이트(mate) 기능 UI 구현",
        en: "Built the mate feature UI",
      },
      {
        ko: "시설 상세 페이지 및 공용 토스트(Toast) UI 컴포넌트 제작",
        en: "Built the facility detail page and the shared toast UI component",
      },
      {
        ko: "홈 화면 UI 컴포넌트 재사용성 개선",
        en: "Improved component reusability on the home screen",
      },
      {
        ko: "공통 컴포넌트(로딩 스피너, 찜하기 / 뒤로가기 버튼, 바텀시트 등) 제작",
        en: "Built shared components — loading spinner, like / back buttons, bottom sheet, etc.",
      },
      {
        ko: "E2E(Playwright) 초기 셋업 및 컴포넌트 단위 테스트 작성",
        en: "Bootstrapped Playwright E2E and authored component unit tests",
      },
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "TanStack Query",
      "shadcn/ui",
      "Zod",
      "Axios",
      "Playwright",
      "Vitest",
    ],
    liveUrl: "https://all-ground.vercel.app",
    codeUrl: "https://github.com/Nerdinary-D/team-d-fe",
    gradient: "from-emerald-500/30 via-teal-500/20 to-lime-500/30",
    cover: "/projects/cmc-allground.png",
    gallery: [
      {
        src: "/projects/cmc-allground.png",
        caption: {
          ko: "홈 — 추천 시설 카드",
          en: "Home — recommended facility cards",
        },
      },
      {
        src: "/projects/cmc-mate.png",
        caption: {
          ko: "메이트 — 모집 중인 그라운드 리스트",
          en: "Mate — recruiting grounds list",
        },
      },
      {
        src: "/projects/cmc-spot-detail.png",
        caption: {
          ko: "시설 상세 — 편의시설·메이트 모집글",
          en: "Spot detail — amenities & partner posts",
        },
      },
      {
        src: "/projects/cmc-mate-form.png",
        caption: {
          ko: "모집글 등록 — 바텀시트 폼",
          en: "Create post — bottom sheet form",
        },
      },
    ],
  },
  {
    slug: "career-for-me",
    title: "Career for Me",
    period: { start: "2025.01", end: "2025.02" },
    summary: {
      ko: "내 커리어의 맞춤형 로드맵 — 포트폴리오를 분석해 활동 간 연결성을 찾고, 직무와 활동(대외활동·공모전·인턴 등)을 추천해주는 서비스.",
      en: "Your personalized career roadmap — analyzes personal portfolios to find connections across activities and recommends roles and opportunities (clubs, contests, internships, etc.).",
    },
    role: {
      ko: "프론트엔드 파트장 (FE 4인 팀)",
      en: "Frontend Lead (4-person FE team)",
    },
    responsibilities: [
      {
        ko: "포트폴리오 분석 페이지 단독 설계·구현",
        en: "Solely designed and shipped the portfolio analysis page",
      },
      {
        ko: "프로젝트 초기 세팅 (Tailwind CSS + DaisyUI, App Router 구조)",
        en: "Bootstrapped the project — Tailwind CSS + DaisyUI, App Router layout",
      },
      {
        ko: "공통 컴포넌트 설계·구현 (RecommendationList, FieldSelection, ActivityTopInfo, portfolioButton 등)",
        en: "Designed shared components (RecommendationList, FieldSelection, ActivityTopInfo, portfolioButton, etc.)",
      },
      {
        ko: "팀원 PR 리뷰·머지 전담",
        en: "Owned PR review and merges, integrating the team's work",
      },
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
      "Zustand",
      "Axios",
      "NextAuth.js",
    ],
    codeUrl: "https://github.com/CAREER-For-Me/Career-web",
    gradient: "from-indigo-500/30 via-fuchsia-500/20 to-sky-500/30",
    cover: "/projects/career-for-me.png",
    preview: "/projects/career-for-me-full.png",
  },
  {
    slug: "travel-compass",
    title: "Travel Compass",
    period: { start: "2024.01", end: "2024.07" },
    summary: {
      ko: "여행 계획 공유와 거리 계산 등으로 여행의 방향성을 잡아주는 서비스.",
      en: "A service that helps shape your trip with shared plans and distance calculations.",
    },
    role: { ko: "프론트엔드 파트장", en: "Frontend Lead" },
    responsibilities: [
      {
        ko: "여행 계획 생성 페이지 제작 — 목적지·기간·일자별 일정 입력 흐름",
        en: "Built the trip planning page — destination, dates, and per-day itinerary entry",
      },
      {
        ko: "개발 환경 세팅 및 공통 컴포넌트(Button, Modal) 개발",
        en: "Set up the dev environment and built shared components (Button, Modal)",
      },
      {
        ko: "react-datepicker 듀얼 캘린더로 여행 기간 선택 구현",
        en: "Built trip-period selection with a react-datepicker dual calendar",
      },
    ],
    techStack: ["React", "JavaScript", "react-datepicker"],
    codeUrl: "https://github.com/TravelCompass-UMC/Frontend",
    gradient: "from-cyan-500/30 via-sky-500/20 to-blue-500/30",
    cover: "/projects/travel-compass-destination.png",
    galleryAspect: "web",
    gallery: [
      {
        src: "/projects/travel-compass-destination.png",
        caption: {
          ko: "여행 계획 시작 — 제목·목적지·초대 코드 입력",
          en: "Plan start — title, destination, invitation code",
        },
      },
      {
        src: "/projects/travel-compass-date.png",
        caption: {
          ko: "여행 기간 선택 — react-datepicker 듀얼 캘린더",
          en: "Trip dates — react-datepicker dual calendar",
        },
      },
      {
        src: "/projects/travel-compass-detail.png",
        caption: {
          ko: "상세 일정 작성 — 사이드바·일자별 시간·교통수단·인원",
          en: "Detail plan — sidebar, per-day times, transport, party",
        },
      },
    ],
  },
  {
    slug: "peer",
    title: "Peer",
    period: { start: "2024.04", end: "2024.05" },
    summary: {
      ko: "사이드 프로젝트하는 사람들을 위한 멘토 매칭·상담 예약 플랫폼. 멘토의 재능 기부 기반으로 모든 상담은 무료로 제공.",
      en: "A mentor-matching and counseling-reservation platform for side-project builders. All sessions are free, built on mentors' pro-bono contributions.",
    },
    role: {
      ko: "프론트엔드 개발 (FE 2인 팀)",
      en: "Frontend (2-person FE team)",
    },
    responsibilities: [
      {
        ko: "메인 페이지 모바일·데스크탑 반응형 구현",
        en: "Built the main page with mobile and desktop responsive layouts",
      },
      {
        ko: "공통 컴포넌트 — 헤더·푸터·사이드바",
        en: "Shared components — header, footer, sidebar",
      },
      {
        ko: "멘토 리스트·상세·예약 페이지 구현",
        en: "Built the mentor list, detail, and reservation pages",
      },
      {
        ko: "내 상담(counsels) 페이지 구현",
        en: "Built the my-counsels page",
      },
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "React Hook Form",
      "Zod",
      "Framer Motion",
      "Axios",
    ],
    codeUrl: "https://github.com/swyp-peer/peer-client",
    gradient: "from-orange-500/30 via-amber-400/20 to-yellow-400/30",
    cover: "/projects/peer-landing.png",
    galleryAspect: "web",
    gallery: [
      {
        src: "/projects/peer-landing.png",
        caption: {
          ko: "메인 (PC) — 로고·서비스 소개·후기 카드 슬라이드",
          en: "Landing (PC) — logo, intro, reviews carousel",
        },
      },
      {
        src: "/projects/peer-mentors.png",
        caption: {
          ko: "멘토 리스트 (PC) — 사이드바 내비게이션·카드 그리드",
          en: "Mentor list (PC) — sidebar nav, card grid",
        },
      },
      {
        src: "/projects/peer-reserve.png",
        caption: {
          ko: "상담 신청 1단계 (PC) — Q1 인원 수 선택",
          en: "Reservation step 1 (PC) — Q1 headcount selection",
        },
      },
      {
        src: "/projects/peer-reserve-textarea.png",
        caption: {
          ko: "상담 신청 5단계 (PC) — Q5 고민 텍스트 입력",
          en: "Reservation step 5 (PC) — Q5 free-text concerns",
        },
      },
      {
        src: "/projects/peer-reserve-done.png",
        caption: {
          ko: "상담 신청 완료 (PC) — 승인 안내·나의 상담 링크",
          en: "Reservation complete (PC) — approval notice and my-counsels link",
        },
      },
      {
        src: "/projects/peer-landing-mobile.png",
        aspect: "mobile",
        caption: {
          ko: "메인 (모바일) — Peer 로고·헤드라인·시작 CTA",
          en: "Landing (mobile) — Peer logo, headline, start CTA",
        },
      },
      {
        src: "/projects/peer-mentors-mobile.png",
        aspect: "mobile",
        caption: {
          ko: "멘토 리스트 (모바일) — 카드 캐러셀·하단 탭 네비",
          en: "Mentor list (mobile) — card carousel, bottom tab nav",
        },
      },
      {
        src: "/projects/peer-reserve-mobile.png",
        aspect: "mobile",
        caption: {
          ko: "상담 신청 (모바일) — Q1 인원 선택 단계",
          en: "Reservation (mobile) — Q1 headcount step",
        },
      },
    ],
  },
  {
    slug: "twc",
    title: "Twincle",
    period: { start: "2025.02", end: "2025.02" },
    summary: {
      ko: "사용자가 뉴스를 정리하고 스크랩할 수 있도록 돕는 서비스.",
      en: "A service that helps users organize and scrap news articles.",
    },
    role: { ko: "프론트엔드 개발", en: "Frontend" },
    responsibilities: [
      { ko: "워드 클라우드 페이지 제작", en: "Built the word-cloud page" },
      { ko: "완성된 타임목록 제작", en: "Built the finished time-list view" },
    ],
    techStack: ["React", "JavaScript", "Axios", "D3.js", "styled-components"],
    codeUrl: "https://github.com/TWC-codeit/TWC_FE",
    gradient: "from-rose-500/30 via-orange-500/20 to-amber-500/30",
    cover: "/projects/twc-today.png",
    galleryAspect: "web",
    gallery: [
      {
        src: "/projects/twc-today.png",
        caption: {
          ko: "오늘의 보도 — D3 버블 차트 워드 클라우드",
          en: "Today's news — D3 bubble-chart word cloud",
        },
      },
      {
        src: "/projects/twc-timeline.png",
        caption: {
          ko: "타임라이너 — 완성된 타임라인 폴더 목록",
          en: "Timeliner — finished timeline folder list",
        },
      },
    ],
  },
  {
    slug: "mypath",
    title: "MyPath",
    role: { ko: "풀스택 개발", en: "Full-stack Developer" },
    period: { start: "2023.08", end: "2023.08" },
    summary: {
      ko: "자신의 경험을 타인에게 공유하고 찾아보기 위한 플랫폼.",
      en: "A platform to share your experiences and browse others'.",
    },
    responsibilities: [
      {
        ko: "검색 기능 구현 — 검색 결과 페이지 및 카테고리별 검색",
        en: "Built search — results page and category-based search",
      },
      {
        ko: "공통 헤더·푸터 컴포넌트 및 베이스 CSS 작업",
        en: "Shared header/footer components and base CSS",
      },
    ],
    techStack: ["HTML", "CSS", "JavaScript", "Django"],
    gradient: "from-violet-500/30 via-purple-500/20 to-pink-500/30",
    cover: "/projects/mypath-home.png",
    galleryAspect: "web",
    gallery: [
      {
        src: "/projects/mypath-home.png",
        caption: {
          ko: "메인 — 헤더·검색바·카테고리 칩·이용 가이드 (공통 base.css 적용)",
          en: "Home — header, search bar, category chips, usage guide (shared base.css)",
        },
      },
      {
        src: "/projects/mypath-category.png",
        caption: {
          ko: "카테고리 선택 — '취업/진로' 칩 active + 카테고리별 결과 리스트",
          en: "Category selected — 'Career' chip active + category result list",
        },
      },
      {
        src: "/projects/mypath-search.png",
        caption: {
          ko: "검색 결과 — searched.html (직접 구현한 검색 결과 페이지)",
          en: "Search results — searched.html (the results page I built)",
        },
      },
    ],
  },
];

export const otherExperiences: OtherExperience[] = [
  {
    slug: "codeit-boost",
    title: {
      ko: "코드잇 부스트 — 파워부스트 프론트엔드 트랙",
      en: "Codeit Boost — Power Boost Frontend Track",
    },
    period: { start: "2024.03", end: "2025.01" },
    bullets: [
      {
        ko: "약 11개월간 프론트엔드 트랙을 이수하며 JavaScript·React·Next.js 등 핵심 모듈을 거쳐 실무 패턴을 익힘",
        en: "Completed an ~11-month frontend track, working through JavaScript, React, and Next.js modules to build a base of real-world patterns",
      },
      {
        ko: "학습한 내용을 노션 위키로 정리·축적해 이후 프로젝트의 의사결정 근거로 재사용",
        en: "Built a Notion knowledge base from what I learned — later reused as decision-making reference in real projects",
      },
      {
        ko: "학습한 개념을 직접 적용한 프로젝트를 기획·구현",
        en: "Designed and shipped my own projects that applied what I had learned",
      },
    ],
  },
  {
    slug: "experit-president",
    title: {
      ko: "대학생 연합 경험 동아리 'EXPERIT' 회장",
      en: "President — EXPERIT, a multi-university experience club",
    },
    period: { start: "2023.01", end: "2023.07" },
    bullets: [
      {
        ko: "수기로 진행되던 출석 체크의 비효율을 해결하기 위해 출석부 자동화 시스템을 개발하여 운영 부담 해소",
        en: "Built an attendance automation system to replace the inefficient manual check-in, easing the team's operational overhead",
      },
      {
        ko: "임원진과 함께 부서별 분담 체계를 설계·운영하며 직군 간 협업을 조율하고, 이후 프로젝트 파트장 역할의 기반이 됨",
        en: "Designed and ran a division-based delegation system with the executive team to coordinate cross-team collaboration, which later became a foundation for my part-lead work",
      },
    ],
  },
];

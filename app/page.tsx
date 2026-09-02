"use client";

import { useState } from "react";
import FrozenKeyboard from "@/components/FrozenKeyboard";
import SmoothScroll from "@/components/smooth-scroll";
import Reveal from "@/components/Reveal";
import SectionNav from "@/components/SectionNav";
import SeasonPicker from "@/components/SeasonPicker";
import LanguagePicker from "@/components/LanguagePicker";
import ProjectModal, {
  type ProjectDetail,
} from "@/components/ProjectModal";
import { useLanguage } from "@/components/LanguageProvider";
import { useIsMobile } from "@/lib/useIsMobile";
import { SKILLS_FLAT, STACK_TO_SLUG } from "@/lib/skills";
import type { Lang } from "@/lib/i18n";

const EMAIL = "josemariaalberobelamendia@gmail.com";

// Localised content lives in `{ es, en }` objects inside these arrays so the
// page can be a straightforward array.map() at render time. Tech names stay
// as plain strings (they're brand names, not localised).
type Localised = Record<Lang, string>;

type Project = ProjectDetail & {
  align: "left" | "right";
  section: "project1" | "project2" | "project3" | "project4";
};

const projects: Project[] = [
  {
    num: "01",
    name: {
      id: "Analisis Elastisitas Harga & Permintaan",
      en: "Price & Demand Elasticity Analysis",
    },
    stack: [
      "Python",
      "Pandas",
      "NumPy",
      "Regression",
      "Forecasting",
      "Flask",
      "PHP",
      "Google Colab",
      "Excel",
      "GitHub",
    ],
    desc: {
      id: "Menganalisis hubungan harga dan permintaan berdasarkan ribuan transaksi penjualan untuk membantu memahami dampak perubahan harga terhadap penjualan dan profit.",
      en: "Analyzing the relationship between price and demand across thousands of sales transactions to understand the impact of price changes on sales and profit.",
    },
    details: {
      id: "Menganalisis 6.203 transaksi penjualan dari lima kategori popok untuk memahami hubungan antara perubahan harga dan permintaan. Data dibersihkan dan dipersiapkan sebelum dilakukan analisis menggunakan Log-Log Regression untuk mengestimasi elastisitas harga serta Semi-Log Regression untuk memodelkan permintaan.\n\nModel dievaluasi menggunakan pengujian statistik serta metrik MAE, RMSE, dan MAPE. Analisis kemudian digunakan untuk melakukan simulasi perubahan harga sebesar 5%, 10%, dan 15% guna melihat dampaknya terhadap permintaan, pendapatan, dan profit.\n\nHasil analisis juga diimplementasikan menjadi aplikasi web dengan Python sebagai backend/API dan PHP sebagai frontend, sehingga analisis dan simulasi dapat digunakan melalui antarmuka yang lebih mudah dipahami.",
      en: "Analyzing 6,203 sales transactions across five diaper categories to understand the relationship between price changes and demand. Data was cleaned and prepared before conducting analysis using Log-Log Regression to estimate price elasticity and Semi-Log Regression to model demand.\n\nThe models were evaluated using statistical testing and MAE, RMSE, and MAPE metrics. The analysis was then applied to simulate price changes of 5%, 10%, and 15% to assess the impact on demand, revenue, and profit.\n\nThe findings were also implemented as a web application with Python as the backend/API and PHP as the frontend, allowing the analysis and simulations to be explored through an intuitive user interface.",
    },
    url: "https://haidarpunya.xo.je/",
    media: [
      "/projects/elastisitas/dashboard.png",
      "/projects/elastisitas/simulasi.png",
      "/projects/elastisitas/forecast.png",
      "/projects/elastisitas/elastisitas.png",
      "/projects/elastisitas/eda.png",
    ],
    highlights: [
      "python",
      "pandas",
      "numpy",
      "scikitlearn",
      "flask",
      "php",
      "googlecolab",
      "excel",
      "github",
    ],
    align: "left",
    section: "project1",
  },
  {
    num: "02",
    name: {
      id: "Kontrol Suhu HACCP",
      en: "HACCP Temperature Control",
    },
    stack: [
      "Next.js 16",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Supabase",
      "Claude API",
      "Stripe",
      "Celery",
    ],
    desc: {
      id: "Aplikasi restoran untuk digitalisasi log suhu HACCP serta pembuatan rencana dan laporan otomatis untuk inspeksi sanitasi.",
      en: "App for restaurants that digitises HACCP temperature logs and auto-generates plans and reports for food safety inspections.",
    },
    details: {
      id: "Digitalisasi kontrol HACCP menyeluruh untuk restoran: log suhu, penelusuran bahan, alergen, dan pembuatan rencana HACCP berbantuan AI. Terintegrasi dengan Open Food Facts untuk alergen, autentikasi terlindungi MFA, multi-bahasa dengan next-intl, dan tagihan langganan via Stripe. Backend asinkron penuh menggunakan FastAPI + SQLAlchemy dan Celery workers.",
      en: "Full HACCP digitisation for a restaurant: temperature logs, traceability, allergens, and AI-assisted generation of HACCP plans. Integrates with Open Food Facts for allergens, MFA-protected auth, i18n with next-intl, subscription billing with Stripe. Fully async backend with FastAPI + SQLAlchemy and Celery workers.",
    },
    url: "https://aptia.txemaalbero.com/",
    media: [
      "/projects/aptia/landing.png",
      "/projects/aptia/panel.png",
      "/projects/aptia/registros.png",
      "/projects/aptia/carta-alergenos.png",
      "/projects/aptia/inspeccion.png",
      "/projects/aptia/cuestionario.png",
    ],
    highlights: ["nextdotjs", "tailwindcss", "python", "postgresql", "typescript"],
    badge: { id: "Dalam pengembangan", en: "In progress" },
    align: "right",
    section: "project2",
  },
  {
    num: "03",
    name: {
      id: "Pelacak Keuangan Pribadi",
      en: "Personal Finance Tracker",
    },
    stack: [
      "Django",
      "Python",
      "SQLite",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Chart.js",
      "pandas",
    ],
    desc: {
      id: "Dashboard untuk melacak pemasukan, pengeluaran, dan target tabungan dengan grafik visual, impor Excel, serta laporan bulanan.",
      en: "Dashboard to track income, expenses and savings goals with visual charts, Excel import and monthly reports.",
    },
    details: {
      id: "Aplikasi Django klasik (MVT) untuk keuangan pribadi: kategorisasi pengeluaran, target tabungan, impor massal dari Excel (xlsx/xls), dan grafik berbasis Chart.js. Tema terang/gelap dengan CSS murni tanpa dependensi frontend. Proyek yang mengutamakan kesederhanaan dan keandalan: tanpa framework sisi klien, autentikasi bawaan Django, dan penyimpanan SQLite.",
      en: "Classic Django (MVT) app for personal finance: expense categorisation, savings goals, bulk import from Excel (xlsx/xls) and Chart.js-powered graphs. Light/dark themes in pure CSS with zero frontend dependencies. A project that favours simplicity and robustness: no client framework, Django's built-in auth, SQLite storage.",
    },
    github: "https://github.com/Txemalon/Gestor-de-gastos-personales",
    media: [
      "/projects/gestor-gastos/dashboard.png",
      "/projects/gestor-gastos/wallets.png",
      "/projects/gestor-gastos/transacciones.png",
      "/projects/gestor-gastos/categorias.png",
      "/projects/gestor-gastos/reportes.png",
      "/projects/gestor-gastos/inversiones.png",
    ],
    highlights: ["python", "javascript", "html5", "css"],
    align: "left",
    section: "project3",
  },
  {
    num: "04",
    name: {
      id: "E-Commerce Papan Dart",
      en: "Dartboards e-commerce",
    },
    stack: [
      "Next.js 15",
      "React",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "NextAuth",
      "Stripe",
      "Framer Motion",
    ],
    desc: {
      id: "E-commerce modern untuk penjualan papan dart dengan pembayaran terintegrasi, autentikasi sosial, panel admin, dan animasi yang mulus.",
      en: "Modern e-commerce for dartboards with integrated payments, social auth, an admin panel and smooth animations.",
    },
    details: {
      id: "Toko online lengkap dengan katalog, keranjang belanja, dan pembayaran via Stripe. NextAuth dengan Google OAuth dan kredensial, rate limiting menggunakan Upstash Redis, validasi Zod, serta panel admin terpisah (AdminJS di atas Express, port 3001). Transisi dan mikro-interaksi menggunakan Framer Motion untuk pengalaman pengguna yang lebih premium.",
      en: "A full e-commerce with catalogue, cart and Stripe checkout. NextAuth with Google OAuth and credentials, Upstash Redis for rate limiting, Zod validation, and a separate admin panel (AdminJS on Express, port 3001). Framer Motion powers transitions and micro-interactions for a more premium feel than a typical shop.",
    },
    media: [
      "/projects/dianas/packs.png",
      "/projects/dianas/catalogo.png",
    ],
    highlights: ["nextdotjs", "react", "typescript", "tailwindcss", "postgresql"],
    badge: { id: "Dalam pembangunan", en: "Under construction" },
    align: "right",
    section: "project4",
  },
];

const experiences: Array<{
  role: Localised;
  company: string;
  period: Localised;
  location: Localised;
  summary: Localised;
  bullets: Localised[];
  stack: string[];
}> = [
  {
    role: {
      id: "Administrative & Data Management Support",
      en: "Administrative & Data Management Support",
    },
    company: "Haidar Plastik",
    period: { id: "Juni 2026 – Sekarang", en: "June 2026 – Present" },
    location: { id: "Bekasi, Indonesia", en: "Bekasi, Indonesia" },
    summary: {
      id: "Mendukung digitalisasi, pengelolaan, dan analisis data operasional toko untuk memahami pergerakan stok dan kondisi pembelian.",
      en: "Supporting the digitization, management, and operational data analysis of store operations to understand stock movements and purchasing patterns.",
    },
    bullets: [
      {
        id: "Digitalisasi data — mencatat transaksi, produk, dan inventory dari dokumen fisik ke sistem digital.",
        en: "Data digitization — recording transactions, products, and inventory from physical documents into digital systems.",
      },
      {
        id: "Data cleaning — membersihkan dan memvalidasi data sebelum digunakan untuk analisis.",
        en: "Data cleaning — cleaning and validating data prior to analysis.",
      },
      {
        id: "Inventory analysis — menganalisis perubahan stok untuk mengidentifikasi produk dengan pergerakan rendah.",
        en: "Inventory analysis — analyzing stock changes to identify slow-moving products.",
      },
      {
        id: "Business visualization — membuat visualisasi data stok dan pembelian menggunakan dashboard untuk mendukung analisis bisnis.",
        en: "Business visualization — creating stock and purchase data visualizations using dashboards to support business insights.",
      },
    ],
    stack: ["Tableau", "Power BI", "Excel", "Android", "Google Sheets"],
  },
  {
    role: {
      id: "Administration Intern",
      en: "Administration Intern",
    },
    company: "BPJS Ketenagakerjaan",
    period: { id: "Februari 2025 – Mei 2025", en: "February 2025 – May 2025" },
    location: { id: "Bekasi, Indonesia", en: "Bekasi, Indonesia" },
    summary: {
      id: "Mendukung proses administrasi kepesertaan dengan melakukan input, verifikasi, dan pembaruan data peserta untuk memastikan informasi tercatat secara akurat dan sesuai kebutuhan administrasi.",
      en: "Supporting the membership administration process by inputting, verifying, and updating participant data to ensure accurate records in accordance with administrative standards.",
    },
    bullets: [
      {
        id: "Data entry — memproses pendaftaran dan pembatalan kepesertaan untuk program khusus dengan volume lebih dari 100 peserta per hari.",
        en: "Data entry — processing membership registrations and cancellations for special programs with a volume of over 100 participants per day.",
      },
      {
        id: "Data verification — memeriksa dan mencocokkan informasi peserta serta melakukan koreksi terhadap data yang tidak sesuai.",
        en: "Data verification — checking and cross-referencing participant information and correcting any inconsistent data.",
      },
      {
        id: "Administrative processing — mengelola dan memperbarui data kepesertaan sesuai proses administrasi yang berlaku.",
        en: "Administrative processing — managing and updating membership records in compliance with standard administrative procedures.",
      },
      {
        id: "Billing support — membantu proses pengingat pembayaran kepada peserta untuk mendukung kelancaran administrasi kepesertaan.",
        en: "Billing support — assisting with payment reminder notifications to participants to maintain smooth membership administration.",
      },
    ],
    stack: ["Excel", "Data Entry", "Data Validation", "Administration"],
  },
  {
    role: {
      id: "Guru – Teaching Program",
      en: "Teacher – Teaching Program",
    },
    company: "Pondok Pesantren Ar-Ridho",
    period: { id: "Mei 2020 – Juli 2021", en: "May 2020 – July 2021" },
    location: { id: "Bogor, Indonesia", en: "Bogor, Indonesia" },
    summary: {
      id: "Mengajar literasi komputer dan Microsoft Office dengan fokus pada penggunaan Excel, pengolahan data dasar, serta keterampilan komputer yang dapat diterapkan untuk kebutuhan pembelajaran dan administrasi.",
      en: "Teaching computer literacy and Microsoft Office with a focus on Excel usage, basic data processing, and practical computer skills applicable for educational and administrative needs.",
    },
    bullets: [
      {
        id: "Literasi komputer — mengajarkan dasar penggunaan komputer dan aplikasi Microsoft Office.",
        en: "Computer literacy — teaching the fundamentals of computer usage and Microsoft Office applications.",
      },
      {
        id: "Microsoft Excel — membimbing data entry, formatting, sorting, dan filtering data.",
        en: "Microsoft Excel — guiding data entry, formatting, sorting, and filtering data.",
      },
      {
        id: "Pengolahan data — mengajarkan penggunaan formula SUM, AVERAGE, COUNT, dan IF untuk pengolahan data dasar.",
        en: "Data processing — teaching the use of formulas such as SUM, AVERAGE, COUNT, and IF for basic data processing.",
      },
      {
        id: "Keterampilan kerja — membantu peserta memahami penggunaan teknologi secara praktis dan membangun keterampilan komunikasi serta kerja sama.",
        en: "Workplace skills — helping students understand practical technology usage and building communication and teamwork skills.",
      },
    ],
    stack: ["Excel", "Microsoft Office", "Data Entry", "Data Processing"],
  },
];

function pick<T>(loc: Record<Lang, T>, lang: Lang): T {
  return loc[lang];
}

// Hero name split per word so each can rise independently. Whitespace
// preserved as its own span so the line wraps naturally if needed.
function HeroWord({
  text,
  delay,
  className = "",
}: {
  text: string;
  delay: number;
  className?: string;
}) {
  return (
    <span className={`hero-word ${className}`}>
      <span style={{ animationDelay: `${delay}ms` }}>{text}</span>
    </span>
  );
}

export default function Home() {
  const { t, lang } = useLanguage();
  const isMobile = useIsMobile();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <SmoothScroll>
      <div className="relative">
        {/* Desktop: persistent 3D scene fullscreen behind content. On mobile
            the canvas lives inside the hero instead (see below) so it scrolls
            away and the rest of the page is clean, fast 2D. */}
        {!isMobile && (
          <div className="fixed inset-0 z-0">
            <FrozenKeyboard />
          </div>
        )}

        {/* Header */}
        <header className="fixed top-0 inset-x-0 z-50 px-6 sm:px-10 md:px-14 py-5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <span
              data-cursor="hover"
              className="text-sm font-semibold tracking-tight text-ice-100 whitespace-nowrap"
            >
              Haidar Labib Izzakif
            </span>
            {/* Wrapper (not the pill itself) carries the hide: .status-pill
                hard-sets display:inline-flex, which beats Tailwind's .hidden
                due to CSS source order, so hiding must happen on a parent. */}
            <span className="hidden md:inline-flex">
              <span className="status-pill">{t("header.availability")}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 pointer-events-auto">
            <SeasonPicker />
            <span className="hidden md:inline-flex">
            <a
              href="https://github.com/haidarlabib"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="frost-btn !py-1.5 !px-3 !text-xs"
            >
              <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden>
                <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <span>GitHub</span>
            </a>
            </span>
            <LanguagePicker />
          </div>
        </header>

        <SectionNav />

        <main className="relative z-10 pointer-events-none">
          {/* Hero */}
          <section
            data-kb-section="hero"
            className="min-h-screen flex flex-col justify-center p-6 sm:p-10 md:p-14"
          >
            {/* Mobile-only 3D centerpiece. Lives inside the hero (scrolls away
                with it) and takes pointer events so keycaps are tappable. */}
            {isMobile && (
              <div className="w-full h-[34vh] mt-12 -mb-4 pointer-events-auto">
                <FrozenKeyboard mobile />
              </div>
            )}
            <div className="mt-2 md:mt-20">
              <p
                className="text-[11px] uppercase tracking-[0.3em] text-ice-300 mb-5 fade-in-up"
                style={{ ["--d" as string]: "0ms" }}
              >
                {t("hero.greeting")}
              </p>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-bold tracking-[-0.03em] text-ice-50 leading-[0.92] whitespace-nowrap">
                <HeroWord text="Haidar" delay={120} />
                <br />
                <HeroWord text="Labib" delay={200} className="text-ice-400" />
                <br />
                <HeroWord text="Izzakif" delay={280} className="text-ice-400" />
              </h1>
              <p
                className="mt-8 text-base sm:text-lg md:text-xl text-ice-200 max-w-xl leading-relaxed fade-in-up"
                style={{ ["--d" as string]: "520ms" }}
              >
                {t("hero.roleLine")}
                <br />
                {t("hero.tagline")}
              </p>

              {/* CTAs */}
              <div
                className="mt-10 flex flex-wrap items-center gap-3 pointer-events-auto fade-in-up"
                style={{ ["--d" as string]: "700ms" }}
              >
                <a
                  href={lang === "en" ? "/cv_en.pdf" : "/cv.pdf"}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-btn frost-btn--primary"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
                    <path d="M14 3v5h5" />
                  </svg>
                  {t("hero.cv")}
                </a>
                <button
                  type="button"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-btn"
                  onClick={() =>
                    document
                      .querySelector<HTMLElement>(
                        '[data-kb-section="contact"]'
                      )
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                >
                  {t("hero.hire")}
                </button>
                {/* Mobile-only full-width break: forces the social icons onto
                    their own row below the two primary buttons. Hidden on md+
                    so desktop keeps everything on a single line. */}
                <div className="basis-full h-0 md:hidden" aria-hidden />
                <a
                  href="https://www.linkedin.com/in/haidar-labib-izzakif"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-icon"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
                    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.4 0h4.37v1.92h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V22h-4.56v-6.59c0-1.57-.03-3.6-2.19-3.6-2.19 0-2.53 1.71-2.53 3.48V22H7.62V8z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/haidarlabib"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  data-magnetic
                  className="frost-icon"
                  aria-label="GitHub"
                >
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden>
                    <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Animated scroll indicator at bottom */}
            <div
              className="mt-10 md:mt-auto flex items-center gap-3 fade-in-up"
              style={{ ["--d" as string]: "900ms" }}
            >
              <span className="scroll-indicator">
                {t("hero.scroll") && <span>{t("hero.scroll")}</span>}
                <span className="scroll-indicator__rail" />
              </span>
              <span className="text-[11px] uppercase tracking-[0.25em] text-ice-400 hidden sm:inline">
                {t("hero.keysHint")}
              </span>
            </div>
          </section>

          {/* Stack — desktop relies on the 200vh scroll + sticky title while
              the keyboard does the talking on hover. On mobile (md:) that
              choreography is gone, so we drop the tall scroll and render a
              real, legible skills grid with the same taglines. */}
          <section
            data-kb-section="stack"
            className="relative md:min-h-[200vh] p-6 sm:p-10 md:p-14"
          >
            <div className="relative md:h-[150vh]">
              <div className="md:sticky md:top-28 text-center">
                <Reveal>
                  <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-ice-50 leading-[0.95]">
                    {t("stack.title")}
                  </h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="mt-3 text-sm sm:text-base text-ice-400">
                    <span className="hidden md:inline">{t("stack.hint")}</span>
                    <span className="md:hidden">{t("stack.hintMobile")}</span>
                  </p>
                </Reveal>
              </div>

              {/* Mobile skills grid (recovers the hover interaction as static
                  content the keyboard can't surface on touch). */}
              {isMobile && (
                <div className="md:hidden mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 pointer-events-auto">
                  {SKILLS_FLAT.map((s) => (
                    <div
                      key={s.slug}
                      className="flex items-start gap-3 rounded-xl bg-ink-1/70 backdrop-blur-sm border border-ink-3 p-4"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                        fill={`#${s.hex}`}
                        className="flex-none mt-0.5"
                        aria-hidden
                      >
                        <path d={s.path} />
                      </svg>
                      <div>
                        <p className="text-ice-50 font-medium text-sm">
                          {s.title}
                        </p>
                        <p className="text-ice-400 text-xs mt-0.5 leading-snug">
                          {t(`keyboard.taglines.${s.slug}`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          {/* Experience — title is sticky at top-24 (feels anchored) but sits
              BEHIND the cards (z-0 vs. card wrapper's z-10), so as you scroll
              the card slides over the title. The section has no extra filler
              beyond the cards, so when you scroll past the last card the
              section ends and the title un-pins and exits the viewport at the
              same time — giving the "anchored then both disappear" feel. */}
          <section
            data-kb-section="experience"
            className="relative p-6 sm:p-10 md:p-14 pb-24"
          >
            <div className="sticky top-24 sm:top-28 text-center mb-12 sm:mb-16 z-0">
              <Reveal>
                <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-[-0.03em] text-ice-50 leading-[0.95]">
                  {t("experience.title")}
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-3 text-sm sm:text-base text-ice-300">
                  {t("experience.subtitle")}
                </p>
              </Reveal>
            </div>

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              {experiences.map((exp, idx) => (
                <Reveal
                  key={`${exp.company}-${idx}`}
                  delay={idx * 120}
                  as="article"
                  className="relative rounded-2xl bg-ink-1/75 backdrop-blur-md border border-ink-3 p-6 sm:p-8 md:p-10 pointer-events-auto shadow-[0_8px_40px_-20px_rgba(0,0,0,0.6)]"
                >
                  <header className="flex flex-wrap items-start justify-between gap-3 mb-5">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-ice-50 tracking-tight">
                        {pick(exp.role, lang)}
                      </h3>
                      <p className="text-ice-400 font-medium mt-1">
                        {exp.company}
                        <span className="text-ice-500/80 font-normal">
                          {" · "}
                          {pick(exp.location, lang)}
                        </span>
                      </p>
                    </div>
                    <span className="font-mono text-xs text-ice-100 px-3 py-1 rounded-full border border-ice-700/70 bg-ink-2/60 whitespace-nowrap">
                      {pick(exp.period, lang)}
                    </span>
                  </header>

                  <p className="text-ice-200 leading-relaxed mb-5">
                    {pick(exp.summary, lang)}
                  </p>

                  <ul className="space-y-2.5 mb-6">
                    {exp.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex gap-3 text-ice-100 leading-relaxed"
                      >
                        <span className="mt-[0.65em] flex-none w-1.5 h-1.5 rounded-full bg-ice-400" />
                        <span>{pick(b, lang)}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.stack.map((s) => (
                      <span
                        key={s}
                        data-cursor="hover"
                        className="frost-chip"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Projects */}
          {projects.map((p) => (
            <section
              key={p.num}
              data-kb-section={p.section}
              data-kb-highlights={(p.highlights ?? []).join(",")}
              className="relative py-20 md:min-h-screen flex items-center p-6 sm:p-10 md:p-14 overflow-hidden"
            >
              <span
                aria-hidden
                className={`watermark hidden md:block top-1/2 -translate-y-1/2 ${
                  p.align === "left" ? "right-[-2vw]" : "left-[-2vw]"
                }`}
              >
                {p.num}
              </span>

              <div
                className={
                  p.align === "left"
                    ? "max-w-xl relative"
                    : // Right-aligned cards get extra right padding on md+ so
                      // the action buttons ("Ver más") don't sit under the
                      // fixed SectionNav dots on the right edge. On mobile they
                      // collapse to a normal left-aligned full-width card.
                      "max-w-xl relative md:ml-auto md:text-right md:mr-16 lg:mr-24"
                }
              >
                <Reveal>
                  <p className="font-mono text-sm text-ice-400 mb-3">
                    {p.num} · {t("projects.kicker")}
                  </p>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-ice-50 leading-[1.05] mb-4">
                    {pick(p.name, lang)}
                  </h2>
                </Reveal>
                {p.badge ? (
                  <Reveal delay={140}>
                    <span className="inline-block text-[10px] uppercase tracking-widest text-ice-300 border border-ice-700 rounded-full px-2 py-0.5 mb-4">
                      {pick(p.badge, lang)}
                    </span>
                  </Reveal>
                ) : null}
                <Reveal delay={180}>
                  <p className="text-base sm:text-lg text-ice-200 leading-relaxed mb-6">
                    {pick(p.desc, lang)}
                  </p>
                </Reveal>
                <Reveal delay={260}>
                  <div
                    className={
                      p.align === "right"
                        ? "flex flex-wrap gap-1.5 md:justify-end pointer-events-auto mb-5"
                        : "flex flex-wrap gap-1.5 pointer-events-auto mb-5"
                    }
                  >
                    {p.stack.map((s) => {
                      const slug = STACK_TO_SLUG[s] || s.toLowerCase();
                      return (
                        <span
                          key={s}
                          data-cursor="hover"
                          className="frost-chip"
                          onMouseEnter={() => {
                            window.dispatchEvent(
                              new CustomEvent("kb-chip-hover", { detail: slug })
                            );
                          }}
                          onMouseLeave={() => {
                            window.dispatchEvent(
                              new CustomEvent("kb-chip-leave")
                            );
                          }}
                        >
                          {s}
                        </span>
                      );
                    })}
                  </div>
                </Reveal>
                <Reveal delay={320}>
                  <div
                    className={
                      p.align === "right"
                        ? "flex md:justify-end pointer-events-auto"
                        : "flex pointer-events-auto"
                    }
                  >
                    <button
                      type="button"
                      onClick={() => setActiveProject(p)}
                      data-cursor="hover"
                      data-magnetic
                      className="frost-btn"
                    >
                      {t("projects.viewMore")}
                      <svg
                        viewBox="0 0 24 24"
                        width="14"
                        height="14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </Reveal>
              </div>
            </section>
          ))}

          {/* Contact — copy pinned to the left so the (large, hero-posed)
              keyboard on the right has room to bob its random keys. */}
          <section
            data-kb-section="contact"
            className="relative py-24 md:min-h-screen flex flex-col justify-center p-6 sm:p-10 md:p-14 overflow-hidden"
          >
            <div className="max-w-xl relative">
              <Reveal>
                <p className="font-mono text-sm text-ice-400 mb-3">
                  {t("contact.kicker")}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight text-ice-50 mb-6">
                  {t("contact.title")}
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-ice-200 mb-10">{t("contact.body")}</p>
              </Reveal>
              <Reveal delay={240}>
                <div className="flex flex-wrap gap-3 pointer-events-auto">
                  <a
                    href="https://wa.me/6285695791713?text=Halo%2C%20Haidar.%20Saya%20tertarik%20berkolaborasi%20dengan%20anda%20setelah%20melihat%20portofolio%20anda!."
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn frost-btn--primary"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    {t("contact.copyEmail")}
                  </a>
                  <a
                    href={`mailto:${EMAIL}`}
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    {t("contact.openMail")}
                  </a>
                  <a
                    href="https://github.com/haidarlabib"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    {t("contact.github")}
                  </a>
                  <a
                    href="https://www.linkedin.com/in/haidar-labib-izzakif"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="frost-btn"
                  >
                    {t("contact.linkedin")}
                  </a>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </SmoothScroll>
  );
}

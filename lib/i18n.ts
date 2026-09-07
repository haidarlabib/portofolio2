// Minimal i18n layer: a single dictionary keyed by dot-path, with each leaf
// carrying both the ID and EN copy. Consumers read via `useLanguage().t()`
// which resolves the path for the active language. Keeping it flat and
// co-located (rather than adding a dependency like next-intl) keeps the
// project tiny and makes the strings easy to audit.
export type Lang = "id" | "en";

export const LANGUAGES: Lang[] = ["id", "en"];
export const DEFAULT_LANG: Lang = "id";

type Leaf = Record<Lang, string>;
type Node = Leaf | { [key: string]: Node };

function isLeaf(node: Node): node is Leaf {
  return typeof (node as Leaf).id === "string";
}

export const DICT = {
  picker: {
    season: { id: "Musim", en: "Season" },
    language: { id: "Bahasa", en: "Language" },
  },
  seasons: {
    spring: { id: "Musim Semi", en: "Spring" },
    summer: { id: "Musim Panas", en: "Summer" },
    autumn: { id: "Musim Gugur", en: "Autumn" },
    winter: { id: "Musim Dingin", en: "Winter" },
  },
  nav: {
    aria: { id: "Bagian", en: "Sections" },
    home: { id: "Beranda", en: "Home" },
    stack: { id: "Tech Stack", en: "Stack" },
    experience: { id: "Pengalaman", en: "Experience" },
    project: { id: "Projek", en: "Project" },
    contact: { id: "Kontak", en: "Contact" },
  },
  header: {
    availability: {
      id: "TERBUKA UNTUK BEKERJA",
      en: "Open to opportunities",
    },
  },
  hero: {
    greeting: { id: "Halo, saya", en: "Hi, I am" },
    roleLine: {
      id: "Data Analyst & Data Science Enthusiast.",
      en: "Data Analyst & Data Science Enthusiast.",
    },
    tagline: {
      id: "Mengubah data, proses bisnis, dan teknologi menjadi solusi yang bermanfaat.",
      en: "Turning data, business processes, and technology into useful solutions.",
    },
    cv: { id: "Unduh CV", en: "Download CV" },
    hire: { id: "Hubungi saya", en: "Contact me" },
    scroll: { id: "", en: "Scroll to explore" },
    keysHint: {
      id: "· arahkan kursor ke tombol",
      en: "· hover over the keys",
    },
  },
  stack: {
    title: { id: "Tech Skill", en: "Tech Stack" },
    hint: {
      id: "(petunjuk: arahkan kursor ke tombol)",
      en: "(hint: hover over a key)",
    },
    hintMobile: {
      id: "Tools yang saya gunakan.",
      en: "The tools I build with.",
    },
  },
  experience: {
    title: { id: "Pengalaman", en: "Experience" },
    subtitle: {
      id: "Pengalaman yang saya tempuh.",
      en: "My professional journey.",
    },
  },
  projects: {
    kicker: { id: "projek", en: "project" },
    viewMore: { id: "Lihat selengkapnya", en: "View more" },
    openSite: { id: "Kunjungi situs", en: "Visit site" },
    viewCode: { id: "Lihat kode", en: "View code" },
    close: { id: "Tutup", en: "Close" },
    stackLabel: { id: "Stack", en: "Stack" },
    overview: { id: "Ringkasan", en: "Overview" },
  },
  contact: {
    kicker: { id: "kontak", en: "contact" },
    title: { id: "Tertarik Berkolaborasi?", en: "Let's talk?" },
    body: {
      id: "Kirim pesan sekarang dan mari wujudkan ide menarik kamu bersama.",
      en: "If what you've seen interests you, the keyboard is ready for the first message.",
    },
    copyEmail: { id: "Kirim pesan", en: "Send message" },
    openMail: { id: "Email", en: "Open mailto" },
    github: { id: "GitHub", en: "GitHub" },
    linkedin: { id: "LinkedIn", en: "LinkedIn" },
    emailToast: { id: "Email disalin", en: "Email copied" },
  },
  keyboard: {
    taglines: {
      python: {
        id: "Mengolah data mentah menjadi wawasan yang berguna.",
        en: "Turns messy data into meaningful insights.",
      },
      sql: {
        id: "Menggali data untuk menemukan pola yang bermakna.",
        en: "Where raw data starts telling its story.",
      },
      excel: {
        id: "Membersihkan, mengolah, dan menganalisis data dengan efisien.",
        en: "Still one of the fastest ways to get things done.",
      },
      powerbi: {
        id: "Mengubah data menjadi dashboard yang mudah dipahami.",
        en: "Numbers look better when they make sense.",
      },
      pandas: {
        id: "Membersihkan dan menyiapkan data untuk analisis.",
        en: "Makes messy data easier to work with.",
      },
      numpy: {
        id: "Mengolah data numerik untuk kebutuhan analisis.",
        en: "The numbers behind the numbers.",
      },
      scikitlearn: {
        id: "Menemukan pola dan membangun model prediktif.",
        en: "Patterns in, predictions out.",
      },
      knime: {
        id: "Menyusun alur kerja data dari proses hingga hasil.",
        en: "Drag, connect, analyze, repeat.",
      },
      googlesheets: {
        id: "Mengelola data secara rapi, mudah diakses, dan kolaboratif.",
        en: "Simple, shared, and always within reach.",
      },
      googlecolab: {
        id: "Ruang praktis untuk analisis dan eksperimen data.",
        en: "A notebook built for data experiments.",
      },
      lookerstudio: {
        id: "Memvisualisasikan data agar insight bisnis lebih mudah dipahami.",
        en: "Turning data into something people can see.",
      },
      flask: {
        id: "Mengubah solusi analisis menjadi aplikasi yang dapat digunakan.",
        en: "Small backend, useful things.",
      },
      mysql: {
        id: "Menyimpan dan mengelola data terstruktur dengan rapi.",
        en: "Keeping structured data right where it belongs.",
      },
      android: {
        id: "Menghadirkan tools data yang praktis untuk kebutuhan operasional.",
        en: "Putting useful data tools in your pocket.",
      },
      github: {
        id: "Mengelola dan mengembangkan projek secara terstruktur.",
        en: "Where the work lives and keeps evolving.",
      },
    },
  },
} as const satisfies Record<string, Node>;

// Resolve a dotted path in the dictionary for a given language.
export function translate(path: string, lang: Lang): string {
  const parts = path.split(".");
  let ref: Node = DICT as unknown as Node;
  for (const p of parts) {
    if (isLeaf(ref)) return path;
    ref = (ref as { [key: string]: Node })[p];
    if (ref === undefined) return path;
  }
  if (isLeaf(ref)) return ref[lang] ?? ref.id ?? path;
  return path;
}

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
    project: { id: "Proyek", en: "Project" },
    contact: { id: "Kontak", en: "Contact" },
  },
  header: {
    availability: {
      id: "Terbuka untuk peluang",
      en: "Open to opportunities",
    },
  },
  hero: {
    greeting: { id: "Halo, saya", en: "Hi, I am" },
    roleLine: {
      id: "Software Engineer & Tech Lead.",
      en: "Software Engineer & Tech Lead.",
    },
    tagline: {
      id: "Spesialis ERP dan aplikasi full-stack untuk bisnis.",
      en: "Specialised in ERPs and full-stack apps for businesses.",
    },
    cv: { id: "Unduh CV", en: "Download CV" },
    hire: { id: "Hubungi saya", en: "Contact me" },
    scroll: { id: "Gulir untuk eksplorasi", en: "Scroll to explore" },
    keysHint: {
      id: "· arahkan kursor ke tombol",
      en: "· hover over the keys",
    },
  },
  stack: {
    title: { id: "Tech Stack", en: "Tech Stack" },
    hint: {
      id: "(petunjuk: arahkan kursor ke tombol)",
      en: "(hint: hover over a key)",
    },
    hintMobile: {
      id: "Alat yang saya gunakan untuk membangun.",
      en: "The tools I build with.",
    },
  },
  experience: {
    title: { id: "Pengalaman", en: "Experience" },
    subtitle: {
      id: "Perjalanan profesional saya.",
      en: "My professional journey.",
    },
  },
  projects: {
    kicker: { id: "proyek", en: "project" },
    viewMore: { id: "Lihat selengkapnya", en: "View more" },
    openSite: { id: "Kunjungi situs", en: "Visit site" },
    viewCode: { id: "Lihat kode", en: "View code" },
    close: { id: "Tutup", en: "Close" },
    stackLabel: { id: "Stack", en: "Stack" },
    overview: { id: "Ringkasan", en: "Overview" },
  },
  contact: {
    kicker: { id: "kontak", en: "contact" },
    title: { id: "Mari berdiskusi?", en: "Let's talk?" },
    body: {
      id: "Jika apa yang Anda lihat menarik bagi Anda, keyboard sudah siap menerima pesan pertama.",
      en: "If what you've seen interests you, the keyboard is ready for the first message.",
    },
    copyEmail: { id: "Salin email", en: "Copy email" },
    openMail: { id: "Buka mail", en: "Open mailto" },
    github: { id: "GitHub", en: "GitHub" },
    linkedin: { id: "LinkedIn", en: "LinkedIn" },
    emailToast: { id: "Email disalin", en: "Email copied" },
    footer: {
      id: "© 2026 Txema Albero. Hak cipta dilindungi undang-undang.",
      en: "© 2026 Txema Albero. All rights reserved.",
    },
  },
  keyboard: {
    taglines: {
      python: {
        id: "Mengubah data berantakan menjadi wawasan berharga.",
        en: "Turns messy data into meaningful insights.",
      },
      sql: {
        id: "Tempat data mentah mulai bercerita.",
        en: "Where raw data starts telling its story.",
      },
      excel: {
        id: "Masih salah satu cara tercepat untuk menyelesaikan pekerjaan.",
        en: "Still one of the fastest ways to get things done.",
      },
      powerbi: {
        id: "Angka terlihat lebih baik saat mudah dipahami.",
        en: "Numbers look better when they make sense.",
      },
      pandas: {
        id: "Membuat data yang rumit lebih mudah diolah.",
        en: "Makes messy data easier to work with.",
      },
      numpy: {
        id: "Angka di balik setiap perhitungan.",
        en: "The numbers behind the numbers.",
      },
      scikitlearn: {
        id: "Pola masuk, prediksi keluar.",
        en: "Patterns in, predictions out.",
      },
      knime: {
        id: "Tarik, hubungkan, analisis, ulangi.",
        en: "Drag, connect, analyze, repeat.",
      },
      googlesheets: {
        id: "Sederhana, kolaboratif, dan selalu dalam jangkauan.",
        en: "Simple, shared, and always within reach.",
      },
      googlecolab: {
        id: "Notebook yang dibangun untuk eksperimen data.",
        en: "A notebook built for data experiments.",
      },
      lookerstudio: {
        id: "Mengubah data menjadi visual yang bermakna.",
        en: "Turning data into something people can see.",
      },
      flask: {
        id: "Backend ringkas untuk hal-hal yang bermanfaat.",
        en: "Small backend, useful things.",
      },
      mysql: {
        id: "Menjaga data terstruktur tepat pada tempatnya.",
        en: "Keeping structured data right where it belongs.",
      },
      android: {
        id: "Membawa alat data yang berguna ke dalam genggaman.",
        en: "Putting useful data tools in your pocket.",
      },
      github: {
        id: "Tempat hasil karya tersimpan dan terus berkembang.",
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

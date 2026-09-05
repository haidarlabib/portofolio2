import {
  siAndroid,
  siFlask,
  siGithub,
  siGooglecolab,
  siGooglesheets,
  siKnime,
  siLooker,
  siMysql,
  siNumpy,
  siPandas,
  siPython,
  siScikitlearn,
} from "simple-icons";

export type SkillIcon = {
  title: string;
  slug: string;
  path: string;
  hex: string;
};

// SQL universal database cylinder icon
const sqlIcon: SkillIcon = {
  title: "SQL",
  slug: "sql",
  path: "M12 3C7.58 3 4 4.79 4 7c0 2.21 3.58 4 8 4s8-1.79 8-4c0-2.21-3.58-4-8-4zm-8 6v3c0 2.21 3.58 4 8 4s8-1.79 8-4V9c0 2.21-3.58 4-8 4s-8-1.79-8-4zm0 5v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4s-8-1.79-8-4z",
  hex: "336791",
};

// Microsoft Excel official workbook icon
const excelIcon: SkillIcon = {
  title: "Excel",
  slug: "excel",
  path: "M23 1.5q.41 0 .7.3.3.29.3.7v19q0 .41-.3.7-.29.3-.7.3H7q-.41 0-.7-.3-.3-.29-.3-.7V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h5V2.5q0-.41.3-.7.29-.3.7-.3zM6 13.28l1.42 2.66h2.14l-2.38-3.87 2.34-3.8H7.46l-1.3 2.4-.05.08-.04.09-.64-1.28-.66-1.29H2.59l2.27 3.82-2.48 3.85h2.16zM14.25 21v-3H7.5v3zm0-4.5v-3.75H12v3.75zm0-5.25V7.5H12v3.75zm0-5.25V3H7.5v3zm8.25 15v-3h-6.75v3zm0-4.5v-3.75h-6.75v3.75zm0-5.25V7.5h-6.75v3.75zm0-5.25V3h-6.75v3Z",
  hex: "217346",
};

// Microsoft Power BI official 3-column chart icon
const powerBiIcon: SkillIcon = {
  title: "Power BI",
  slug: "powerbi",
  path: "M3.5 13h2.2a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1 -1.5 1.5h-2.2a1.5 1.5 0 0 1 -1.5 -1.5v-6a1.5 1.5 0 0 1 1.5 -1.5zM10.9 7.5h2.2a1.5 1.5 0 0 1 1.5 1.5v11.5a1.5 1.5 0 0 1 -1.5 1.5h-2.2a1.5 1.5 0 0 1 -1.5 -1.5v-11.5a1.5 1.5 0 0 1 1.5 -1.5zM18.3 2h2.2a1.5 1.5 0 0 1 1.5 1.5v17a1.5 1.5 0 0 1 -1.5 1.5h-2.2a1.5 1.5 0 0 1 -1.5 -1.5v-17a1.5 1.5 0 0 1 1.5 -1.5z",
  hex: "F2C811",
};

// 3×5 grid — consumed by the 3D keyboard (one icon per keycap) and, on mobile,
// by the flat list below for the static skills grid that replaces the
// hover-driven keyboard interaction. Taglines live in the i18n dictionary
// under `keyboard.taglines.<slug>`.
export const SKILLS_GRID: readonly (readonly SkillIcon[])[] = [
  [
    { title: "Python", slug: "python", path: siPython.path, hex: siPython.hex },
    sqlIcon,
    excelIcon,
    powerBiIcon,
    { title: "Pandas", slug: "pandas", path: siPandas.path, hex: siPandas.hex },
  ],
  [
    { title: "NumPy", slug: "numpy", path: siNumpy.path, hex: siNumpy.hex },
    { title: "Scikit-learn", slug: "scikitlearn", path: siScikitlearn.path, hex: siScikitlearn.hex },
    { title: "KNIME", slug: "knime", path: siKnime.path, hex: siKnime.hex },
    { title: "Google Sheets", slug: "googlesheets", path: siGooglesheets.path, hex: siGooglesheets.hex },
    { title: "Google Colab", slug: "googlecolab", path: siGooglecolab.path, hex: siGooglecolab.hex },
  ],
  [
    { title: "Looker Studio", slug: "lookerstudio", path: siLooker.path, hex: siLooker.hex },
    { title: "Flask", slug: "flask", path: siFlask.path, hex: siFlask.hex },
    { title: "MySQL", slug: "mysql", path: siMysql.path, hex: siMysql.hex },
    { title: "Android", slug: "android", path: siAndroid.path, hex: siAndroid.hex },
    { title: "GitHub", slug: "github", path: siGithub.path, hex: siGithub.hex },
  ],
] as const;

export const SKILLS_FLAT: readonly SkillIcon[] = SKILLS_GRID.flat();

export const STACK_TO_SLUG: Record<string, string> = {
  Python: "python",
  Pandas: "pandas",
  NumPy: "numpy",
  Regression: "scikitlearn",
  Forecasting: "scikitlearn",
  Flask: "flask",
  PHP: "php",
  SQL: "sql",
  Excel: "excel",
  "Power BI": "powerbi",
  "Scikit-learn": "scikitlearn",
  KNIME: "knime",
  "Data Preprocessing": "knime",
  "Association Rule Mining": "knime",
  "Google Sheets": "googlesheets",
  Spreadsheet: "googlesheets",
  "Google Colab": "googlecolab",
  "Looker Studio": "lookerstudio",
  MySQL: "mysql",
  PostgreSQL: "sql",
  Supabase: "sql",
  PWA: "android",
  Android: "android",
  GitHub: "github",
};

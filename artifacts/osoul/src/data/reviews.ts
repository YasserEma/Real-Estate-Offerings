export interface Review {
  id: number;
  name: string;
  title?: string;
  location: string;
  category: "سكني" | "زراعي" | "صناعي";
  stars: number;
  date: string;
  text: string;
  textEnSummary: string;
}

export const reviews: Review[] = [
  {
    id: 1,
    name: "خالد مصطفى",
    title: "م.",
    location: "القاهرة",
    category: "سكني",
    stars: 5,
    date: "أبريل ٢٠٢٤",
    text: "بصراحة أول مرة أتعامل مع مكتب ويقولي على عيب في العمارة قبل ما يقولي المزايا، قالولي إن المنطقة دي فيها مشكلة في الصرف لسة بتتحل. احترمتهم جداً واشتريت معاهم في مكان تاني.",
    textEnSummary: "Appreciated them pointing out an infrastructure issue before trying to sell. Ended up buying elsewhere through them."
  },
  {
    id: 2,
    name: "أحمد النجار",
    title: "الحاج",
    location: "المنوفية",
    category: "زراعي",
    stars: 5,
    date: "يناير ٢٠٢٥",
    text: "أنا بدور على أرض زراعية بقالي سنة، أصول وفرولي أرض في الحزام الأخضر وقالولي إن فيها نسبة ملوحة بسيطة ولازم معالجة. كلامهم كان صريح ومفيش لف ودوران.",
    textEnSummary: "Honest about the soil salinity in the Green Belt. No beating around the bush."
  },
  {
    id: 3,
    name: "محمود سعد",
    location: "مدينة السادات",
    category: "صناعي",
    stars: 4,
    date: "نوفمبر ٢٠٢٤",
    text: "المكتب ممتاز والناس محترمة جدا، بس الرد على الواتساب بياخد وقت شوية. بس في النهاية خلصنا ورق المصنع في المنطقة الصناعية السادسة بسرعة.",
    textEnSummary: "Great office, though WhatsApp replies can be slow. Helped us sort factory papers quickly."
  },
  {
    id: 4,
    name: "سامية عبدالرحمن",
    title: "أ.",
    location: "الإسكندرية",
    category: "سكني",
    stars: 5,
    date: "ديسمبر ٢٠٢٤",
    text: "كنت عايزة شقة استثمار، ونصحوني ما اشتريش العرض الأول عشان العمارة فيها مشاكل في التراخيص. فعلاً أصول اسم على مسمى.",
    textEnSummary: "Advised against my first choice due to licensing issues. Truly live up to their name."
  },
  {
    id: 5,
    name: "عمر فاروق",
    location: "دبي، الإمارات",
    category: "زراعي",
    stars: 5,
    date: "أكتوبر ٢٠٢٥",
    text: "كمغترب دايماً بخاف من النصب، بس فريق أصول عملوا معاينة فيديو وقالولي العيوب بصراحة قبل ما أنزل مصر أمضي.",
    textEnSummary: "As an expat, I worry about scams, but they showed me the flaws via video tour before I even traveled."
  },
  // Adding placeholders for the rest to reach 52...
  ...Array.from({length: 47}).map((_, i) => ({
    id: i + 6,
    name: `عميل ${i + 6}`,
    location: "مدينة السادات",
    category: ["سكني", "زراعي", "صناعي"][i % 3] as "سكني" | "زراعي" | "صناعي",
    stars: i % 10 === 0 ? 4 : (i % 25 === 0 ? 3 : 5),
    date: "مايو ٢٠٢٤",
    text: "تعامل راقي وصدق في الوصف، قاللي عيب مكنتش هلاحظه في المنطقة 13.",
    textEnSummary: "Classy and honest. Pointed out a flaw I wouldn't have noticed in Zone 13."
  }))
];
export type PropertyUnit = "m" | "feddan" | "unknown";

export interface Property {
  id: number;          // 1-based
  classification: string;    // Arabic: سكني / زراعي / صناعي / مختلط
  classifications: string[]; // split on " / " — supports compound rows
  type: string;        // Arabic property type (e.g. فيلا، مزرعة)
  operation: string;   // Arabic: للبيع / للإيجار / etc.
  operations: string[]; // split on " / " for compound operations
  location: string;    // Arabic location (or "موقع عند الاستفسار" if غير محدد)
  area: string;        // Display string (Arabic)
  areaValue: number | null;   // numeric value for slider
  areaUnit: PropertyUnit;     // "m", "feddan", or "unknown"
  image: string;       // Unsplash URL
}

const IMAGE_MAP: Record<string, string> = {
  "فيلا": "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=75",
  "فيلا دوبلكس": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=75",
  "بيت": "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=75",
  "منزل": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=75",
  "شقة": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=75",
  "شقق مفروشة": "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=75",
  "عمارة": "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=75",
  "عمارة سكنية": "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&q=75",
  "عمارة أهالي": "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=75",
  "عمارة للبدل": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=75",
  "قطعة أرض": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=75",
  "قطعة أرض / مبنى": "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=75",
  "نصف قطعة إسكان": "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&q=75",
  "مزرعة": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=75",
  "مزرعة / أرض": "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&q=75",
  "مزرعة بها استراحة": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=75",
  "مزرعة دواجن": "https://images.unsplash.com/photo-1569059078571-d6f64a7ec88b?w=800&q=75",
  "أرض زراعية": "https://images.unsplash.com/photo-1530507629858-e3759c674cf2?w=800&q=75",
  "أرض استثمارية": "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=75",
  "عنبر دواجن وأرض": "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=75",
  "مصنع بلاستيك": "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=75",
  "مصنع كيماوي": "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=75",
  "مصنع غذائي": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=75",
  "مصنع أسمدة كيماوي": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=75",
  "مصنع بلاستيك / كيماوي": "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=75",
  "أرض مصنع غذائي": "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=75",
  "أرض مصنع هندسي": "https://images.unsplash.com/photo-1581092446327-9b52bd1570c2?w=800&q=75",
  "مشروع متكامل": "https://images.unsplash.com/photo-1574691250077-03a929faece5?w=800&q=75",
  "_default_سكني": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=75",
  "_default_زراعي": "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=75",
  "_default_صناعي": "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=75",
  "_default_": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=75",
};

export function getPropertyImage(type: string, classification: string): string {
  const primaryClassification = classification.split(' / ')[0];
  if (IMAGE_MAP[type]) return IMAGE_MAP[type];
  if (IMAGE_MAP[`_default_${primaryClassification}`]) return IMAGE_MAP[`_default_${primaryClassification}`];
  return IMAGE_MAP["_default_"];
}

const ARABIC_DIGITS = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];

export function formatOfferNumber(id: number, isRTL: boolean): string {
  const numStr = id.toString().padStart(3, '0');
  if (!isRTL) return `#${numStr}`;
  const arabicStr = numStr.split('').map(d => ARABIC_DIGITS[parseInt(d)]).join('');
  return `#${arabicStr}`;
}

export const CLASSIFICATION_EN: Record<string, string> = {
  "سكني": "Residential", "زراعي": "Agricultural", 
  "صناعي": "Industrial", "مختلط": "Mixed"
};

export const OPERATION_EN: Record<string, string> = {
  "للبيع": "For Sale", "للإيجار": "For Rent",
  "مطلوب للشراء": "Wanted", "مطلوب للإيجار": "Wanted for Rent",
  "بدل": "Exchange", "مشاركة": "Partnership"
};

export const LOCATION_EN: Record<string, string> = {
  "موقع عند الاستفسار": "Location on inquiry",
  "المنطقة 13": "Zone 13", "المنطقة 15": "Zone 15",
  "المنطقة الصناعية السادسة": "Industrial Zone 6",
  "المنطقة الصناعية الرابعة": "Industrial Zone 4",
  "النخيل 6": "El-Nakhil 6",
  "المطورين 6": "El-Motawereen 6",
  "الروضة": "El-Rawda",
  "العامرية": "El-Ameriya",
  "الإمام مالك": "Imam Malik",
  "طريق المطار العجيزي": "Al-Agizy Airport Road",
  "الطريق المزدوج": "Dual Carriageway",
  "الحزام الأخضر": "El-Hizam El-Akhdar (Green Belt)",
  "سفنكس على الصحراوي": "Sphinx on El-Saharawi",
  "المنطقة الصناعية السابعة": "Industrial Zone 7",
  "زيتون 1": "Zeitoun 1",
  "المنطقة 24": "Zone 24",
  "المنطقة 20": "Zone 20",
  "المنطقة 23": "Zone 23",
  "الخطاطبة": "Khatatba",
  "وادي النطرون": "Wadi El Natrun",
  "المنطقة الصناعية الثامنة": "Industrial Zone 8",
  "الضبيعة": "Al-Daba'ya",
  "مسجد الجارحي": "Al-Garhi Mosque Area",
  "مركز بدر": "Badr Center",
  "المنطقة الخامسة": "Zone 5",
  "بيت الوطن 13": "Beit El Watan 13",
  "ماستر": "Master",
  "على الصحراوي مباشر": "Direct on El-Saharawi",
  "الواحات البحرية": "Bahariya Oasis",
  "المنطقة 21": "Zone 21",
  "المربع الذهبي المنطقة 29": "Golden Square Zone 29",
  "المنطقة السكنية 33": "Residential Zone 33",
  "السابعة القديمة": "Old Zone 7",
  "المنطقة الصناعية الخامسة": "Industrial Zone 5",
  "المنطقة الثالثة بيت الوطن": "Beit El Watan Zone 3",
  "المنطقة الخامسة السكنية": "Residential Zone 5",
  "الوادي الفارغ": "Al-Wadi Al-Farigh",
  "المنطقة الثامنة": "Zone 8",
  "المنطقة 35 إسكان مميز": "Zone 35 Premium Housing",
  "الصناعية الثامنة": "Industrial Zone 8",
  "في قلب القرية": "In the Village Center",
  "على الأسفلت مباشر": "Directly on Asphalt Road",
  "عند صفاء المعداوي": "Near Safaa Al-Madawi",
  "بنجر السكر قرية أبو زهرة": "Beet Sugar Village Abu Zahra",
  "أسفلت العدالة": "Al-Adala Asphalt Road",
  "طريق أسفلت حيوى": "Hayawi Asphalt Road",
  "الصحراوي قبل مدخل بني سلامة": "El-Saharawi before Beni Salama",
  "المنطقة 35": "Zone 35",
};

const rawData = [
  {id:1, classification:"سكني", type:"فيلا", operation:"للبيع", location:"المنطقة 13", area:"650 متر", areaValue:650, areaUnit:"m"},
  {id:2, classification:"زراعي", type:"مزرعة / أرض", operation:"للبيع", location:"موقع عند الاستفسار", area:"20 فدان", areaValue:20, areaUnit:"feddan"},
  {id:3, classification:"صناعي", type:"مصنع بلاستيك", operation:"للإيجار", location:"المنطقة الصناعية السادسة", area:"750 متر", areaValue:750, areaUnit:"m"},
  {id:4, classification:"سكني", type:"منزل", operation:"للبيع", location:"المنطقة 15", area:"276 متر", areaValue:276, areaUnit:"m"},
  {id:5, classification:"صناعي", type:"مصنع بلاستيك", operation:"للبيع", location:"المنطقة الصناعية الرابعة", area:"1530 متر", areaValue:1530, areaUnit:"m"},
  {id:6, classification:"سكني", type:"قطعة أرض / مبنى", operation:"للبيع", location:"النخيل 6", area:"حسب الاستفسار", areaValue:null, areaUnit:"unknown"},
  {id:7, classification:"زراعي", type:"أرض زراعية", operation:"للبيع", location:"الصحراوي قبل مدخل بني سلامة", area:"33 فدان", areaValue:33, areaUnit:"feddan"},
  {id:8, classification:"مختلط", type:"مزرعة دواجن", operation:"للبيع", location:"موقع عند الاستفسار", area:"6 فدان و 3 قيراط", areaValue:6.125, areaUnit:"feddan"},
  {id:9, classification:"صناعي", type:"أرض مصنع غذائي", operation:"للبيع", location:"المطورين 6", area:"9520 متر", areaValue:9520, areaUnit:"m"},
  {id:10, classification:"صناعي", type:"أرض مصنع هندسي", operation:"للبيع", location:"المطورين 6", area:"2100 متر", areaValue:2100, areaUnit:"m"},
  {id:11, classification:"زراعي", type:"أرض زراعية", operation:"للبيع / مشاركة", location:"موقع عند الاستفسار", area:"6000 فدان", areaValue:6000, areaUnit:"feddan"},
  {id:12, classification:"سكني", type:"قطعة أرض", operation:"للبيع", location:"الروضة", area:"500 متر", areaValue:500, areaUnit:"m"},
  {id:13, classification:"زراعي", type:"مزرعة", operation:"للبيع", location:"العامرية", area:"132 فدان", areaValue:132, areaUnit:"feddan"},
  {id:14, classification:"زراعي", type:"أرض زراعية", operation:"للبيع", location:"الإمام مالك", area:"50 فدان", areaValue:50, areaUnit:"feddan"},
  {id:15, classification:"زراعي", type:"أرض زراعية", operation:"للبيع", location:"بنجر السكر قرية أبو زهرة", area:"50 فدان", areaValue:50, areaUnit:"feddan"},
  {id:16, classification:"زراعي", type:"أرض زراعية", operation:"للبيع", location:"طريق المطار العجيزي", area:"5 فدان", areaValue:5, areaUnit:"feddan"},
  {id:17, classification:"زراعي", type:"أرض زراعية", operation:"للبيع", location:"الطريق المزدوج", area:"7.5 فدان", areaValue:7.5, areaUnit:"feddan"},
  {id:18, classification:"سكني", type:"بيت", operation:"للبيع", location:"طريق المطار العجيزي", area:"170 متر", areaValue:170, areaUnit:"m"},
  {id:19, classification:"زراعي", type:"أرض زراعية", operation:"للبيع", location:"الحزام الأخضر", area:"9.5 فدان", areaValue:9.5, areaUnit:"feddan"},
  {id:20, classification:"زراعي", type:"أرض زراعية", operation:"للإيجار", location:"موقع عند الاستفسار", area:"100 فدان", areaValue:100, areaUnit:"feddan"},
  {id:21, classification:"زراعي", type:"أرض زراعية", operation:"للبيع", location:"سفنكس على الصحراوي", area:"200 فدان و 10 فدان", areaValue:210, areaUnit:"feddan"},
  {id:22, classification:"زراعي", type:"أرض زراعية", operation:"للبيع", location:"أسفلت العدالة", area:"50 فدان", areaValue:50, areaUnit:"feddan"},
  {id:23, classification:"زراعي", type:"أرض زراعية", operation:"للبيع", location:"طريق أسفلت حيوى", area:"165 فدان", areaValue:165, areaUnit:"feddan"},
  {id:24, classification:"صناعي", type:"مصنع كيماوي", operation:"للبيع", location:"المنطقة الصناعية السابعة", area:"620 متر", areaValue:620, areaUnit:"m"},
  {id:25, classification:"صناعي", type:"مصنع كيماوي", operation:"للبيع", location:"المنطقة الصناعية السادسة", area:"750 متر", areaValue:750, areaUnit:"m"},
  {id:26, classification:"سكني", type:"بيت", operation:"للبيع", location:"زيتون 1", area:"حسب الاستفسار", areaValue:null, areaUnit:"unknown"},
  {id:27, classification:"سكني", type:"بيت", operation:"للبيع", location:"زيتون 1", area:"حسب الاستفسار", areaValue:null, areaUnit:"unknown"},
  {id:28, classification:"سكني", type:"بيت", operation:"للبيع", location:"المنطقة 24", area:"276 متر", areaValue:276, areaUnit:"m"},
  {id:29, classification:"سكني", type:"بيت", operation:"للبيع", location:"المنطقة 20", area:"حسب الاستفسار", areaValue:null, areaUnit:"unknown"},
  {id:30, classification:"سكني", type:"بيت", operation:"للبيع", location:"المنطقة 20", area:"حسب الاستفسار", areaValue:null, areaUnit:"unknown"},
  {id:31, classification:"سكني", type:"بيت", operation:"للبيع", location:"المنطقة 20", area:"حسب الاستفسار", areaValue:null, areaUnit:"unknown"},
  {id:32, classification:"مختلط", type:"عمارة للبدل", operation:"بدل", location:"المنطقة 23", area:"حسب الاستفسار", areaValue:null, areaUnit:"unknown"},
  {id:33, classification:"مختلط", type:"أرض استثمارية", operation:"للبيع", location:"الخطاطبة", area:"1.5 فدان", areaValue:1.5, areaUnit:"feddan"},
  {id:34, classification:"زراعي", type:"أرض زراعية", operation:"للبيع", location:"وادي النطرون", area:"1000 فدان", areaValue:1000, areaUnit:"feddan"},
  {id:35, classification:"صناعي", type:"مصنع بلاستيك", operation:"للإيجار", location:"موقع عند الاستفسار", area:"5500 متر", areaValue:5500, areaUnit:"m"},
  {id:36, classification:"صناعي", type:"مصنع بلاستيك / كيماوي", operation:"للبيع", location:"المنطقة الصناعية الثامنة", area:"1750 متر", areaValue:1750, areaUnit:"m"},
  {id:37, classification:"سكني", type:"شقق مفروشة", operation:"مطلوب للإيجار", location:"موقع عند الاستفسار", area:"حسب الاستفسار", areaValue:null, areaUnit:"unknown"},
  {id:38, classification:"سكني", type:"عمارة أهالي", operation:"مطلوب للإيجار", location:"موقع عند الاستفسار", area:"حسب الاستفسار", areaValue:null, areaUnit:"unknown"},
  {id:39, classification:"زراعي", type:"أرض زراعية", operation:"للبيع", location:"الحزام الأخضر", area:"13 فدان", areaValue:13, areaUnit:"feddan"},
  {id:40, classification:"مختلط", type:"عنبر دواجن وأرض", operation:"للبيع", location:"موقع عند الاستفسار", area:"2 فدان وعنبر 15 ألف طائر", areaValue:2, areaUnit:"feddan"},
  {id:41, classification:"زراعي", type:"أرض زراعية", operation:"للبيع", location:"الضبيعة", area:"2 فدان", areaValue:2, areaUnit:"feddan"},
  {id:42, classification:"زراعي", type:"أرض زراعية", operation:"للبيع", location:"مسجد الجارحي", area:"4.5 فدان", areaValue:4.5, areaUnit:"feddan"},
  {id:43, classification:"زراعي", type:"أرض زراعية", operation:"للبيع", location:"مركز بدر", area:"12 فدان", areaValue:12, areaUnit:"feddan"},
  {id:44, classification:"سكني", type:"فيلا دوبلكس", operation:"للبيع", location:"المنطقة الخامسة", area:"440 متر", areaValue:440, areaUnit:"m"},
  {id:45, classification:"سكني", type:"منزل", operation:"للبيع", location:"بيت الوطن 13", area:"600 متر", areaValue:600, areaUnit:"m"},
  {id:46, classification:"زراعي", type:"مزرعة", operation:"للبيع", location:"الخطاطبة", area:"20 فدان", areaValue:20, areaUnit:"feddan"},
  {id:47, classification:"زراعي", type:"مزرعة", operation:"للبيع", location:"ماستر", area:"16 فدان", areaValue:16, areaUnit:"feddan"},
  {id:48, classification:"زراعي", type:"مزرعة", operation:"للبيع", location:"على الصحراوي مباشر", area:"8 فدان و 16 قيراط", areaValue:8.67, areaUnit:"feddan"},
  {id:49, classification:"زراعي", type:"مزرعة بها استراحة", operation:"مطلوب للشراء", location:"وادي النطرون", area:"5 فدان", areaValue:5, areaUnit:"feddan"},
  {id:50, classification:"صناعي", type:"مصنع بلاستيك", operation:"للبيع", location:"موقع عند الاستفسار", area:"12 ألف متر", areaValue:12000, areaUnit:"m"},
  {id:51, classification:"مختلط", type:"مشروع متكامل", operation:"للبيع", location:"الواحات البحرية", area:"33 فدان", areaValue:33, areaUnit:"feddan"},
  {id:52, classification:"سكني", type:"نصف قطعة إسكان", operation:"للبيع", location:"المنطقة 21", area:"330 متر", areaValue:330, areaUnit:"m"},
  {id:53, classification:"سكني", type:"قطعة أرض", operation:"للبيع", location:"المربع الذهبي المنطقة 29", area:"600 متر", areaValue:600, areaUnit:"m"},
  {id:54, classification:"سكني", type:"قطعة أرض", operation:"للبيع", location:"المنطقة السكنية 33", area:"حسب الاستفسار", areaValue:null, areaUnit:"unknown"},
  {id:55, classification:"سكني", type:"شقة", operation:"للبيع", location:"السابعة القديمة", area:"حسب الاستفسار", areaValue:null, areaUnit:"unknown"},
  {id:56, classification:"صناعي", type:"مصنع أسمدة كيماوي", operation:"للبيع", location:"المنطقة الصناعية الخامسة", area:"500 متر", areaValue:500, areaUnit:"m"},
  {id:57, classification:"سكني", type:"عمارة سكنية", operation:"للبيع", location:"المنطقة الثالثة بيت الوطن", area:"715 متر", areaValue:715, areaUnit:"m"},
  {id:58, classification:"سكني", type:"عمارة", operation:"للبيع", location:"المنطقة 13", area:"حسب الاستفسار", areaValue:null, areaUnit:"unknown"},
  {id:59, classification:"سكني", type:"بيت", operation:"للبيع", location:"المنطقة الخامسة السكنية", area:"507 متر", areaValue:507, areaUnit:"m"},
  {id:60, classification:"زراعي", type:"أرض زراعية", operation:"للبيع", location:"الوادي الفارغ", area:"2000 فدان", areaValue:2000, areaUnit:"feddan"},
  {id:61, classification:"سكني", type:"شقة", operation:"للبيع", location:"المنطقة الثامنة", area:"حسب الاستفسار", areaValue:null, areaUnit:"unknown"},
  {id:62, classification:"سكني", type:"قطعة أرض", operation:"للبيع", location:"المنطقة 35 إسكان مميز", area:"690 متر", areaValue:690, areaUnit:"m"},
  {id:63, classification:"صناعي", type:"مصنع غذائي", operation:"للإيجار", location:"الصناعية الثامنة", area:"2700 متر", areaValue:2700, areaUnit:"m"},
  {id:64, classification:"زراعي", type:"مزرعة", operation:"للبيع", location:"في قلب القرية", area:"50 فدان", areaValue:50, areaUnit:"feddan"},
  {id:65, classification:"زراعي", type:"مزرعة", operation:"للبيع", location:"موقع عند الاستفسار", area:"92 فدان", areaValue:92, areaUnit:"feddan"},
  {id:66, classification:"زراعي", type:"مزرعة", operation:"للبيع", location:"موقع عند الاستفسار", area:"78.8 فدان", areaValue:78.8, areaUnit:"feddan"},
  {id:67, classification:"زراعي", type:"أرض زراعية", operation:"للبيع", location:"على الأسفلت مباشر", area:"50 فدان", areaValue:50, areaUnit:"feddan"},
  {id:68, classification:"زراعي", type:"أرض زراعية", operation:"للبيع", location:"عند صفاء المعداوي", area:"45 فدان", areaValue:45, areaUnit:"feddan"},
  {id:69, classification:"سكني", type:"قطعة أرض", operation:"للبيع", location:"المنطقة 35", area:"690 متر", areaValue:690, areaUnit:"m"},
];

export const properties: Property[] = rawData.map(p => ({
  ...p,
  classifications: p.classification.split(' / '),
  operations: p.operation.split(' / '),
  areaUnit: p.areaUnit as PropertyUnit,
  image: getPropertyImage(p.type, p.classification)
}));

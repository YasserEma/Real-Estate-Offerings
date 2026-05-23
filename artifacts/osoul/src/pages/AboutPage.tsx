import { FC } from "react";
import { useLocale } from "@/hooks/useLocale";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactBand } from "@/components/ContactBand";
import { motion } from "framer-motion";
import { Building2, Trees, Factory } from "lucide-react";

export const AboutPage: FC = () => {
  const { t, isRTL } = useLocale();

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />
      
      {/* Hero Band */}
      <section className="pt-32 pb-16 px-6 md:px-12 bg-primary text-primary-foreground border-b border-accent/30 relative overflow-hidden">
        <div className="absolute top-0 end-0 p-12 opacity-5 pointer-events-none">
          <Building2 className="w-64 h-64" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold mb-6"
          >
            {t("about.hero_title")}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-accent italic font-serif"
          >
            {t("about.hero_sub")}
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-6 md:px-12 bg-background">
        <div className="max-w-3xl mx-auto space-y-6 text-lg text-foreground/80 leading-relaxed">
          {isRTL ? (
            <>
              <p>
                بدأت القصة في مدينة السادات سنة ٢٠١٠. مدينة بتكبر، أراضي بتستصلح، ومصانع بتتبني. ومع النمو السريع ده، ظهرت فوضى في سوق العقارات — مبالغات في الأسعار، وعود وهمية، وعيوب بتتلغي من الصور وتكتشفها بعد ما تدفع.
              </p>
              <p>
                تأسست <b>أصول</b> عشان تكون النقيض تماماً. قررنا نبني شغلنا على قاعدة واحدة بس، قد تبدو للبعض بتخسرنا صفقات، بس على المدى الطويل كسبتنا أهم حاجة: الثقة. القاعدة هي <strong>"بنقولك العيوب قبل المزايا"</strong>.
              </p>
              <p>
                على مدار ١٥ سنة، كبرنا مع المدينة. اتعاملنا مع مئات العملاء، من مستثمرين خليجيين بيشتروا مزارع، لمغتربين بيأمنوا مستقبل ولادهم بشقة، لشباب بيبدأوا مشاريعهم في المناطق الصناعية. العميل اللي بيتعامل معانا مرة، بيرجعلنا تاني وتالت، وبيبعتلنا قرايبه وأصحابه، لأنه عارف إن الفلوس اللي بتدفع في عقار مع أصول، محطوطة في أمان.
              </p>
            </>
          ) : (
            <>
              <p>
                The story began in Sadat City in 2010. A growing city, lands being reclaimed, and factories being built. With this rapid growth came chaos in the real estate market — inflated prices, empty promises, and flaws erased from photos only to be discovered after payment.
              </p>
              <p>
                <b>Osoul</b> was founded to be the exact opposite. We decided to build our business on a single rule. It might seem like a rule that loses deals in the short term, but in the long run, it earned us the most important asset: Trust. The rule is <strong>"The flaws before the features"</strong>.
              </p>
              <p>
                Over 15 years, we've grown with the city. We've worked with hundreds of clients, from Gulf investors buying farms, to expats securing their children's future with an apartment, to young people starting projects in industrial zones. A client who works with us once returns again and again, and sends their family and friends, because they know money invested through Osoul is money placed in safe hands.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Coverage Zones */}
      <section className="py-24 px-6 md:px-12 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">
              {isRTL ? "مناطق تغطيتنا في مدينة السادات ومحيطها" : "Our Coverage Areas in & Around Sadat City"}
            </h2>
            <div className="h-px w-24 bg-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Residential */}
            <div className="bg-background p-8 rounded-xl border border-border shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center text-primary mb-6">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-serif mb-4">{isRTL ? "المناطق السكنية" : "Residential Zones"}</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {(isRTL 
                  ? ["المنطقة 13", "المنطقة 15", "المنطقة 20", "المنطقة 21", "المنطقة 24", "المنطقة 35", "بيت الوطن", "المربع الذهبي"]
                  : ["Zone 13", "Zone 15", "Zone 20", "Zone 21", "Zone 24", "Zone 35", "Beit El Watan", "Golden Square"]
                ).map((z,i) => <span key={i} className="bg-muted px-3 py-1 rounded-full text-sm font-medium text-foreground/80">{z}</span>)}
              </div>
            </div>

            {/* Agricultural */}
            <div className="bg-background p-8 rounded-xl border border-border shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#8B6F47]/10 rounded-full flex items-center justify-center text-[#8B6F47] mb-6">
                <Trees className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-serif mb-4">{isRTL ? "الحزام الزراعي" : "Agricultural Belts"}</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {(isRTL 
                  ? ["الحزام الأخضر", "الخطاطبة", "وادي النطرون", "الصحراوي", "مركز بدر", "الوادي الفارغ"]
                  : ["Green Belt", "Khatatba", "Wadi El Natrun", "El-Saharawi", "Badr Center", "Al-Wadi Al-Farigh"]
                ).map((z,i) => <span key={i} className="bg-muted px-3 py-1 rounded-full text-sm font-medium text-foreground/80">{z}</span>)}
              </div>
            </div>

            {/* Industrial */}
            <div className="bg-background p-8 rounded-xl border border-border shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#4A5C7C]/10 rounded-full flex items-center justify-center text-[#4A5C7C] mb-6">
                <Factory className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-serif mb-4">{isRTL ? "المناطق الصناعية" : "Industrial Zones"}</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {(isRTL 
                  ? ["المنطقة الرابعة", "المنطقة الخامسة", "المنطقة السادسة", "المنطقة السابعة", "المنطقة الثامنة", "المطورين"]
                  : ["Zone 4", "Zone 5", "Zone 6", "Zone 7", "Zone 8", "El-Motawereen"]
                ).map((z,i) => <span key={i} className="bg-muted px-3 py-1 rounded-full text-sm font-medium text-foreground/80">{z}</span>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactBand />
      <Footer />
    </div>
  );
};

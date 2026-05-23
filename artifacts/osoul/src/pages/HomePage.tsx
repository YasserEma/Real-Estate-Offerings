import { FC, useEffect, useState } from "react";
import { Link } from "wouter";
import { useLocale } from "@/hooks/useLocale";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactBand } from "@/components/ContactBand";
import { PropertyCard } from "@/components/PropertyCard";
import { properties } from "@/data/properties";
import { reviews } from "@/data/reviews";
import { motion, useAnimation, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone, Check, ArrowLeft, ArrowRight, ShieldCheck, Search, FileText, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const Counter: FC<{ value: number; label: string; suffix?: string; prefix?: string }> = ({ value, label, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };
    requestAnimationFrame(animate);
  }, [inView, value]);

  const { isRTL } = useLocale();
  const ARABIC_DIGITS = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  
  const displayCount = isRTL 
    ? count.toString().split('').map(d => ARABIC_DIGITS[parseInt(d)]).join('') 
    : count;
    
  const displaySuffix = isRTL && suffix === "+" ? " +" : suffix;
  const displayPrefix = isRTL && prefix === "+" ? "+ " : prefix;

  return (
    <div ref={ref} className="flex flex-col items-center justify-center text-center space-y-2">
      <div className="text-4xl md:text-5xl font-bold font-sans text-accent flex items-center" dir="ltr">
        {displayPrefix}
        {displayCount}
        {displaySuffix}
      </div>
      <div className="text-sm md:text-base text-primary-foreground/80 font-medium">
        {label}
      </div>
    </div>
  );
};

export const HomePage: FC = () => {
  const { t, isRTL, locale } = useLocale();

  const featuredOffers = properties.slice(0, 6);
  const topReviews = reviews.filter(r => r.stars === 5).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=2400&q=85")' }}
        />
        <div 
          className="absolute inset-0 z-10"
          style={{ background: 'linear-gradient(135deg, rgba(11,30,63,0.92), rgba(11,30,63,0.55))' }}
        />
        <div 
          className="absolute inset-0 z-10 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20L20 0ZM20 10L30 20L20 30L10 20L20 10Z' fill='%23F8F4EA' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}
        />
        
        <div className="relative z-20 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-12 bg-accent/60" />
            <span className="text-accent text-sm md:text-base font-bold tracking-[0.2em] font-serif">
              ◆ أصول / OSOUL ◆
            </span>
            <div className="h-px w-12 bg-accent/60" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className={cn(
              "text-primary-foreground font-serif leading-[1.1] mb-6",
              isRTL ? "text-4xl sm:text-5xl md:text-[72px] font-black" : "text-4xl sm:text-5xl md:text-[72px] italic font-semibold"
            )}
          >
            {t("hero.promise")}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-primary-foreground/85 text-xl md:text-2xl mb-12 max-w-2xl"
          >
            {t("hero.sub")}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-16"
          >
            <a 
              href={t("phone.tel")}
              className="w-full sm:w-auto px-8 py-4 bg-accent text-primary rounded-full font-bold text-lg hover:bg-osoul-gold-2 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 relative group"
            >
              <span className="absolute inset-0 rounded-full animate-phone-pulse pointer-events-none group-hover:opacity-0 transition-opacity" />
              <Phone className="w-5 h-5" />
              <bdi dir="ltr">{t("phone.display")}</bdi>
            </a>
            <Link 
              href={`/${locale}/offers`}
              className="w-full sm:w-auto px-8 py-4 bg-transparent border border-primary-foreground/30 text-primary-foreground rounded-full font-bold text-lg hover:bg-primary-foreground/10 hover:-translate-y-1 transition-all"
            >
              {t("cta.browse_offers")}
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="w-full border-t border-primary-foreground/20 pt-6 flex flex-col md:flex-row items-center justify-center gap-x-8 gap-y-4 text-sm text-primary-foreground/90 font-medium"
          >
            <div className="flex items-center gap-2">
              <span className="text-accent font-black">✓</span>
              <span>{t("hero.trust1")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent font-black">✓</span>
              <span>{t("hero.trust2")}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-accent font-black">✓</span>
              <span>{t("hero.trust3")}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="bg-primary py-12 relative border-b border-accent/40">
        <div className="absolute top-0 inset-x-0 h-px bg-accent/40" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-wrap justify-center items-center gap-y-8">
            <div className="w-1/2 sm:w-auto sm:flex-1 flex justify-center">
              <Counter value={15} label={t("stats.years")} prefix="+" />
            </div>
            <div className="hidden sm:flex items-center justify-center text-accent/30 text-xs px-4">◆</div>
            <div className="w-1/2 sm:w-auto sm:flex-1 flex justify-center">
              <Counter value={500} label={t("stats.clients")} prefix="+" />
            </div>
            <div className="hidden sm:flex items-center justify-center text-accent/30 text-xs px-4">◆</div>
            <div className="w-1/2 sm:w-auto sm:flex-1 flex justify-center">
              <Counter value={69} label={t("stats.offers")} prefix="+" />
            </div>
            <div className="hidden sm:flex items-center justify-center text-accent/30 text-xs px-4">◆</div>
            <div className="w-1/2 sm:w-auto sm:flex-1 flex justify-center">
              <Counter value={3} label={t("stats.sectors")} />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-accent/40" />
      </section>

      {/* Signature Promise */}
      <section className="bg-card py-24 px-6 md:px-12 relative overflow-hidden">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <span className="text-accent text-sm font-bold tracking-widest uppercase mb-6 font-serif">
            {t("promise.label")}
          </span>
          <h2 className={cn(
            "text-primary font-serif mb-12",
            isRTL ? "text-4xl md:text-6xl font-black" : "text-4xl md:text-6xl italic font-semibold"
          )}>
            "{t("promise.heading")}"
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-start max-w-4xl text-foreground/80 text-lg leading-relaxed font-sans">
            {isRTL ? (
              <>
                <p>
                  في سوق العقارات، أسهل حاجة إن الوسيط يفرش لك البحر رمل ويزوق لك العرض عشان يخلص الصفقة وياخد عمولته. بس في أصول، إحنا شغالين في مدينة السادات بقالنا أكتر من 15 سنة، واسمنا أهم من أي عمولة مؤقتة.
                </p>
                <p>
                  وعدنا ليك بسيط: هنقولك العيب اللي في العقار قبل ما نقولك الميزة. لو الأرض فيها ملوحة، لو العمارة ورقها لسة بيخلص، لو المصنع محتاج صيانة.. هتعرف ده مننا قبل ما تدفع جنيه. لأننا بنبني علاقات بتدوم سنين، مش صفقات بتخلص في يوم.
                </p>
              </>
            ) : (
              <>
                <p>
                  In the real estate market, the easiest thing for a broker to do is paint a perfect picture and hide the flaws just to close the deal and take their commission. At Osoul, we've been operating in Sadat City for over 15 years, and our reputation is worth more than any temporary commission.
                </p>
                <p>
                  Our promise to you is simple: we will tell you the property's flaw before its feature. If the land has salinity issues, if the building's papers are still processing, if the factory needs maintenance... you'll hear it from us before you pay a dime. Because we build relationships that last years, not deals that close in a day.
                </p>
              </>
            )}
          </div>
        </div>
        
        {/* Decorative thin line with diamond */}
        <div className="absolute bottom-0 inset-x-0 flex items-center justify-center opacity-30">
          <div className="h-px w-full max-w-[40%] bg-accent" />
          <div className="text-accent text-[8px] mx-2">◆</div>
          <div className="h-px w-full max-w-[40%] bg-accent" />
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-24 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {[
              { id: 'residential', title: t("category.residential"), img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=75", count: 22 },
              { id: 'agricultural', title: t("category.agricultural"), img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=75", count: 28 },
              { id: 'industrial', title: t("category.industrial"), img: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=75", count: 14 }
            ].map((cat) => (
              <Link key={cat.id} href={`/${locale}/offers/${cat.id}`} className="group relative h-96 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <img 
                  src={cat.img} 
                  alt={cat.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-3xl font-serif font-bold text-white mb-2">{cat.title}</h3>
                  <div className="flex items-center justify-between text-white/80">
                    <span className="font-sans">{isRTL ? cat.count.toString().split('').map(d => ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'][parseInt(d)]).join('') : cat.count} {t("offers_count")}</span>
                    <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center bg-white/0 group-hover:bg-white/10 group-hover:border-white transition-all">
                      {isRTL ? <ArrowLeft className="w-5 h-5 text-white" /> : <ArrowRight className="w-5 h-5 text-white" />}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            
          </div>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-24 px-6 md:px-12 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                {t("nav.offers")}
              </h2>
              <p className="text-foreground/70 max-w-xl">
                {isRTL ? "مجموعة مختارة من أحدث العروض العقارية المتاحة حالياً." : "A selection of the latest available real estate offers."}
              </p>
            </div>
            <Link 
              href={`/${locale}/offers`}
              className="inline-flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors shrink-0"
            >
              {t("cta.view_all_offers")}
              {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredOffers.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href={`/${locale}/offers`}
              className="inline-flex items-center justify-center h-12 px-8 rounded-md bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-bold"
            >
              {t("cta.view_all_offers")}
            </Link>
          </div>
        </div>
      </section>

      {/* Why Osoul */}
      <section className="py-24 px-6 md:px-12 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <Search className="w-8 h-8" />, title: t("hero.trust1"), desc: isRTL ? "بنعاين العقار على الطبيعة قبل ما نعرضه للبيع أو الإيجار عشان نضمن مصداقية الوصف." : "We personally inspect every property before listing it to guarantee description accuracy." },
              { icon: <ShieldCheck className="w-8 h-8" />, title: t("hero.trust2"), desc: isRTL ? "عمولتنا واضحة من البداية ومفيش أي مصاريف أو رسوم خفية هتتفاجئ بيها وقت العقد." : "Our commission is clear from the start. No hidden fees or surprise costs at signing." },
              { icon: <FileText className="w-8 h-8" />, title: t("hero.trust3"), desc: isRTL ? "الصور والوصف بيعكسوا الواقع 100٪. بنوفر عليك وقت المشاوير الفاضية." : "Photos and descriptions reflect reality 100%. We save you from wasted trips." }
            ].map((pillar, i) => (
              <div key={i} className="flex flex-col items-start text-start group">
                <div className="w-16 h-16 rounded-2xl border-2 border-accent flex items-center justify-center text-primary mb-6 bg-accent/5 group-hover:bg-accent group-hover:text-primary-foreground transition-colors">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-primary mb-3">
                  {pillar.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Preview */}
      <section className="py-24 px-6 md:px-12 bg-card relative overflow-hidden border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
              {t("reviews.title")}
            </h2>
            <div className="flex items-center gap-2 text-lg text-foreground/80 mb-2">
              <span className="font-bold text-primary" dir="ltr">4.8</span>
              <div className="flex text-accent">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
            </div>
            <p className="text-sm text-foreground/60">{t("reviews.rating_label")}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {topReviews.map(review => (
              <div key={review.id} className="bg-background border border-border p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow relative">
                <div className="flex text-accent mb-4">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-foreground/80 leading-relaxed mb-6 font-medium">
                  "{review.text}"
                </blockquote>
                {!isRTL && (
                  <p className="text-sm italic text-foreground/50 mb-6">
                    {review.textEnSummary}
                  </p>
                )}
                <div className="h-px w-full bg-border mb-6" />
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/40 to-accent/10 flex items-center justify-center text-primary font-bold shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-primary text-sm">
                      {review.title ? `${review.title} ` : ''}{review.name}
                    </div>
                    <div className="text-xs text-foreground/60">
                      {review.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              href={`/${locale}/reviews`}
              className="inline-flex items-center justify-center h-12 px-8 rounded-md bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-bold"
            >
              قراءة كل التقييمات / Read All
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <ContactBand />
      
      <Footer />
    </div>
  );
};

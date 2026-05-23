import { FC, useState, useMemo } from "react";
import { useLocale } from "@/hooks/useLocale";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactBand } from "@/components/ContactBand";
import { reviews } from "@/data/reviews";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ReviewsPage: FC = () => {
  const { t, isRTL } = useLocale();
  const [filter, setFilter] = useState<string>("all");

  const filteredReviews = useMemo(() => {
    let res = reviews;
    if (filter === "5stars") res = res.filter(r => r.stars === 5);
    else if (filter === "4stars") res = res.filter(r => r.stars === 4);
    else if (filter !== "all") res = res.filter(r => r.category === filter);
    return res;
  }, [filter]);

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />
      
      {/* Title & Overall Rating */}
      <section className="pt-32 pb-12 px-6 md:px-12 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
              {t("reviews.title")}
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl">
              {t("reviews.sub")}
            </p>
          </div>
          
          <div className="bg-primary text-primary-foreground p-6 rounded-xl flex flex-col items-center justify-center min-w-[200px] shrink-0 shadow-md border border-accent/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-4xl font-bold font-sans" dir="ltr">4.8</span>
              <span className="text-accent text-xl">/5</span>
            </div>
            <div className="flex text-accent mb-2">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current opacity-50" />
            </div>
            <span className="text-sm text-primary-foreground/70">{t("reviews.rating_label")}</span>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-6 md:px-12 border-b border-border bg-background sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3">
          {[
            { id: "all", label: t("filter.all") },
            { id: "سكني", label: isRTL ? "سكني" : "Residential" },
            { id: "زراعي", label: isRTL ? "زراعي" : "Agricultural" },
            { id: "صناعي", label: isRTL ? "صناعي" : "Industrial" },
            { id: "5stars", label: isRTL ? "٥ نجوم" : "5 Stars" },
            { id: "4stars", label: isRTL ? "٤ نجوم" : "4 Stars" }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-bold border transition-colors",
                filter === f.id 
                  ? "bg-primary border-primary text-primary-foreground" 
                  : "bg-transparent border-border text-foreground hover:border-primary"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-16 px-6 md:px-12 bg-background flex-grow">
        <div className="max-w-7xl mx-auto">
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredReviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.1 }}
                className="break-inside-avoid bg-card border border-border p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-accent">
                    {Array.from({ length: review.stars }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-foreground/50 font-sans" dir={isRTL ? "rtl" : "ltr"}>
                    {review.date}
                  </span>
                </div>
                
                <blockquote className="text-foreground/85 leading-relaxed mb-4 font-medium text-lg font-sans">
                  "{review.text}"
                </blockquote>
                
                {!isRTL && (
                  <p className="text-sm italic text-foreground/60 mb-6 border-s-2 border-border ps-3">
                    {review.textEnSummary}
                  </p>
                )}
                
                <div className="h-px w-12 bg-accent/30 mb-6" />
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center text-primary font-bold text-lg shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-primary font-serif">
                      {review.title ? `${review.title} ` : ''}{review.name}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-foreground/60">
                        {review.location}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="text-[10px] bg-muted px-2 py-0.5 rounded-sm text-foreground/70 font-sans">
                        {isRTL ? review.category : (review.category === "سكني" ? "Residential" : review.category === "زراعي" ? "Agricultural" : "Industrial")}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center text-sm text-foreground/50 italic">
            {t("reviews.note")}
          </div>
        </div>
      </section>

      <ContactBand />
      <Footer />
    </div>
  );
};

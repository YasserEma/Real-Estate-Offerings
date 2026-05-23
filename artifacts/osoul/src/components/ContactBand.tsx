import { FC } from "react";
import { Link } from "wouter";
import { Phone, MessageCircle } from "lucide-react";
import { useLocale } from "@/hooks/useLocale";

export const ContactBand: FC = () => {
  const { t, isRTL } = useLocale();

  return (
    <section className="w-full bg-primary relative overflow-hidden py-24 px-6 md:px-12 text-primary-foreground border-y border-accent/40">
      {/* Subtle Geometric Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20L20 0ZM20 10L30 20L20 30L10 20L20 10Z' fill='%23B8893E' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center space-y-8">
        <div className="space-y-4 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold font-serif leading-tight">
            {isRTL ? t("contact.band.title_ar") : t("contact.band.title_en")}
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 font-sans max-w-2xl mx-auto">
            {isRTL ? t("contact.band.body_ar") : t("contact.band.body_en")}
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <a 
            href={t("phone.tel")} 
            className="group flex flex-col items-center space-y-2 hover:scale-105 transition-transform duration-300"
          >
            <span className="flex items-center justify-center w-16 h-16 rounded-full bg-accent text-primary animate-phone-pulse">
              <Phone className="w-8 h-8" />
            </span>
            <span dir="ltr" className="text-4xl md:text-6xl font-bold font-sans text-accent tracking-tight">
              {t("phone.display")}
            </span>
          </a>

          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={t("whatsapp.url")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-8 rounded-md bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-primary transition-colors font-semibold font-sans gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t("cta.whatsapp")}</span>
            </a>
          </div>
          
          <div className="mt-8 text-sm md:text-base text-primary-foreground/60 font-sans">
            {t("contact.hours")}
          </div>
        </div>
      </div>
    </section>
  );
};

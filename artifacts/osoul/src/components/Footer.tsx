import { FC } from "react";
import { Link } from "wouter";
import { useLocale } from "@/hooks/useLocale";
import { Logo } from "./Logo";
import { Facebook, Instagram, MapPin, Phone, MessageCircle } from "lucide-react";

export const Footer: FC = () => {
  const { t, isRTL, locale } = useLocale();

  return (
    <footer className="w-full bg-primary text-primary-foreground border-t border-accent/40 pt-16 pb-8 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand */}
        <div className="space-y-6 flex flex-col items-start md:items-start items-center text-center md:text-start">
          <Logo variant="ivory" size="lg" />
          <p className="font-serif italic text-lg text-primary-foreground/90">
            {t("footer.tagline")}
          </p>
        </div>

        {/* Links */}
        <div className="space-y-6">
          <h4 className="text-accent font-bold tracking-wider uppercase text-sm">
            {t("footer.links")}
          </h4>
          <nav className="flex flex-col space-y-3">
            <Link href={`/${locale}`} className="text-primary-foreground/80 hover:text-accent transition-colors">
              {t("nav.home")}
            </Link>
            <Link href={`/${locale}/offers`} className="text-primary-foreground/80 hover:text-accent transition-colors">
              {t("nav.offers")}
            </Link>
            <Link href={`/${locale}/about`} className="text-primary-foreground/80 hover:text-accent transition-colors">
              {t("nav.about")}
            </Link>
            <Link href={`/${locale}/reviews`} className="text-primary-foreground/80 hover:text-accent transition-colors">
              {t("nav.reviews")}
            </Link>
            <Link href={`/${locale}/contact`} className="text-primary-foreground/80 hover:text-accent transition-colors">
              {t("nav.contact")}
            </Link>
          </nav>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h4 className="text-accent font-bold tracking-wider uppercase text-sm">
            {t("footer.contact_us")}
          </h4>
          <div className="flex flex-col space-y-4 text-primary-foreground/80 text-sm">
            <a href={t("phone.tel")} className="flex items-center gap-3 hover:text-accent transition-colors">
              <Phone className="w-4 h-4 shrink-0 text-accent" />
              <bdi dir="ltr" className="font-sans font-medium">{t("phone.display")}</bdi>
            </a>
            <a href={t("whatsapp.url")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-accent transition-colors">
              <MessageCircle className="w-4 h-4 shrink-0 text-accent" />
              <span>{t("cta.whatsapp")}</span>
            </a>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 shrink-0 text-accent mt-1" />
              <span>{t("contact.address_placeholder")}</span>
            </div>
            <div className="text-primary-foreground/60 pt-2 border-t border-primary-foreground/10">
              {t("contact.hours")}
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="space-y-6">
          <h4 className="text-accent font-bold tracking-wider uppercase text-sm">
            {t("footer.follow")}
          </h4>
          <div className="flex gap-4">
            <a href={t("footer.facebook")} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href={t("footer.instagram")} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-accent/20 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/50">
        <p>{isRTL ? t("footer.copyright_ar") : t("footer.copyright_en")}</p>
        <p className="tracking-widest font-sans">{t("footer.established")}</p>
      </div>
    </footer>
  );
};

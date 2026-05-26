import { FC } from "react";
import { Link } from "wouter";
import { useLocale } from "@/hooks/useLocale";
import { Logo } from "./Logo";
import { Facebook, Instagram, MapPin, Phone, MessageCircle } from "lucide-react";

export const Footer: FC = () => {
  const { t, isRTL, locale } = useLocale();

  return (
    <footer className="w-full bg-primary text-primary-foreground border-t border-accent/40 font-sans">

      {/* Mobile-only CTA strip */}
      <div className="md:hidden flex items-center justify-between gap-3 px-5 py-4 border-b border-accent/20">
        <div>
          <p className="text-xs text-primary-foreground/60 mb-0.5">{isRTL ? "تواصل معنا الآن" : "Call us now"}</p>
          <bdi dir="ltr" className="font-bold text-accent text-lg">{t("phone.display")}</bdi>
        </div>
        <a
          href={t("phone.tel")}
          className="flex items-center gap-2 bg-accent text-primary px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#D4A95C] transition-colors shrink-0"
        >
          <Phone className="w-4 h-4" />
          {isRTL ? "اتصل" : "Call"}
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 pt-12 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 mb-10">

          {/* Brand — full-width on mobile, 3 cols on desktop */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-start space-y-4">
            <Logo variant="ivory" size="md" showWordmark={false} />
            <p className="font-serif italic text-base text-primary-foreground/85 max-w-xs">
              {t("footer.tagline")}
            </p>
            {/* Social icons here on mobile too */}
            <div className="flex gap-3 pt-1">
              <a
                href={t("footer.facebook")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={t("footer.instagram")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Divider (mobile) */}
          <div className="md:hidden h-px bg-accent/20" />

          {/* Links + Contact — 2-col on mobile, rest of desktop grid */}
          <div className="md:col-span-9 grid grid-cols-2 md:grid-cols-3 gap-8">

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-accent font-bold tracking-wider uppercase text-xs">
                {t("footer.links")}
              </h4>
              <nav className="flex flex-col space-y-2.5">
                {[
                  { label: t("nav.home"), path: `/${locale}` },
                  { label: t("nav.offers"), path: `/${locale}/offers` },
                  { label: t("nav.about"), path: `/${locale}/about` },
                  { label: t("nav.reviews"), path: `/${locale}/reviews` },
                  { label: t("nav.contact"), path: `/${locale}/contact` },
                ].map(link => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="text-sm text-primary-foreground/75 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="text-accent font-bold tracking-wider uppercase text-xs">
                {t("footer.contact_us")}
              </h4>
              <div className="flex flex-col space-y-3 text-sm text-primary-foreground/75">
                <a href={t("phone.tel")} className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Phone className="w-4 h-4 shrink-0 text-accent" />
                  <bdi dir="ltr" className="font-medium">{t("phone.display")}</bdi>
                </a>
                <a
                  href={t("whatsapp.url")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0 text-accent" />
                  <span>{t("cta.whatsapp")}</span>
                </a>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 shrink-0 text-accent mt-0.5" />
                  <span className="leading-snug">{t("contact.address_placeholder")}</span>
                </div>
              </div>
            </div>

            {/* Working hours — hidden on mobile (already in contact page), visible md+ */}
            <div className="hidden md:block space-y-4">
              <h4 className="text-accent font-bold tracking-wider uppercase text-xs">
                {isRTL ? "مواعيد العمل" : "Working Hours"}
              </h4>
              <p className="text-sm text-primary-foreground/75 leading-relaxed">
                {t("contact.hours")}
              </p>
              <div className="pt-4">
                <h4 className="text-accent font-bold tracking-wider uppercase text-xs mb-3">
                  {t("footer.follow")}
                </h4>
                <div className="flex gap-3">
                  <a
                    href={t("footer.facebook")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={t("footer.instagram")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-accent/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/40">
          <p>{isRTL ? t("footer.copyright_ar") : t("footer.copyright_en")}</p>
          <p className="tracking-widest font-sans">{t("footer.established")}</p>
        </div>
      </div>
    </footer>
  );
};

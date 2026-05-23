import { FC, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useLocale } from "@/hooks/useLocale";
import { Logo } from "./Logo";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export const Header: FC = () => {
  const { t, isRTL, locale } = useLocale();
  const [location, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHomePage = location === `/${locale}` || location === `/${locale}/`;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    const pathWithoutLocale = location.replace(/^\/(ar|en)/, "") || "";
    setLocation(`/${newLocale}${pathWithoutLocale}`);
  };

  const navLinks = [
    { label: t("nav.home"), path: `/${locale}` },
    { 
      label: t("nav.offers"), 
      path: `/${locale}/offers`,
      dropdown: [
        { label: t("nav.offers.all"), path: `/${locale}/offers` },
        { label: t("nav.offers.residential"), path: `/${locale}/offers/residential` },
        { label: t("nav.offers.agricultural"), path: `/${locale}/offers/agricultural` },
        { label: t("nav.offers.industrial"), path: `/${locale}/offers/industrial` },
      ]
    },
    { label: t("nav.about"), path: `/${locale}/about` },
    { label: t("nav.reviews"), path: `/${locale}/reviews` },
    { label: t("nav.contact"), path: `/${locale}/contact` },
  ];

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 font-sans",
          scrolled 
            ? "backdrop-blur-md bg-background/90 border-b border-accent/30 py-3 shadow-sm" 
            : "bg-background/0 py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          <Link href={`/${locale}`} className="shrink-0 flex items-center">
            <Logo variant={!scrolled && isHomePage ? "ivory" : "navy"} size="md" showWordmark={!scrolled} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <div key={i} className="relative group">
                <Link 
                  href={link.path}
                  className={cn(
                    "flex items-center gap-1 font-semibold transition-colors",
                    !scrolled && isHomePage ? "text-white/90 hover:text-accent" : "text-foreground/80 hover:text-accent"
                  )}
                >
                  {link.label}
                  {link.dropdown && <ChevronDown className="w-4 h-4 opacity-50" />}
                </Link>
                
                {link.dropdown && (
                  <div className="absolute top-full start-0 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                    <div className="bg-card border border-border rounded-md shadow-md py-2 min-w-48 flex flex-col">
                      {link.dropdown.map((drop, j) => (
                        <Link 
                          key={j} 
                          href={drop.path}
                          className="px-4 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-primary transition-colors"
                        >
                          {drop.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            {/* Lang Switcher */}
            <button 
              onClick={switchLocale}
              className="flex items-center border border-accent/50 rounded-full overflow-hidden text-sm font-semibold transition-colors h-8"
            >
              <span className={cn("px-3 py-1 transition-colors", locale === "ar" ? "bg-accent text-primary" : "text-foreground hover:bg-muted")}>
                العربية
              </span>
              <span className={cn("px-3 py-1 transition-colors", locale === "en" ? "bg-accent text-primary" : "text-foreground hover:bg-muted")}>
                EN
              </span>
            </button>

            {/* Phone Pill */}
            <a 
              href={t("phone.tel")}
              className="flex items-center gap-2 bg-accent text-primary h-10 px-5 rounded-full font-bold hover:bg-[#D4A95C] transition-colors relative"
            >
              <span className="absolute inset-0 rounded-full animate-phone-pulse pointer-events-none" />
              <Phone className="w-4 h-4" />
              <bdi dir="ltr">{t("phone.display")}</bdi>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={cn("lg:hidden p-2 transition-colors", !scrolled && isHomePage ? "text-white" : "text-foreground")}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div 
            className="absolute inset-0 bg-primary/40 backdrop-blur-sm" 
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-background h-full shadow-2xl flex flex-col p-6 animate-in slide-in-from-end-full duration-300">
            <div className="flex items-center justify-between mb-8">
              <Logo variant="navy" size="sm" showWordmark={false} />
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-foreground/60 hover:text-foreground">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-4 font-sans font-semibold text-lg">
              {navLinks.map((link, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <Link href={link.path} onClick={() => setMobileMenuOpen(false)} className="py-2 text-foreground hover:text-accent">
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <div className="flex flex-col ps-4 border-s-2 border-border gap-2">
                      {link.dropdown.slice(1).map((drop, j) => (
                        <Link key={j} href={drop.path} onClick={() => setMobileMenuOpen(false)} className="py-1 text-base text-foreground/70 hover:text-accent">
                          {drop.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="mt-auto space-y-6">
              <button 
                onClick={() => { switchLocale(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center border border-accent/50 rounded-full overflow-hidden text-sm font-semibold transition-colors h-10"
              >
                <span className={cn("w-1/2 h-full flex items-center justify-center", locale === "ar" ? "bg-accent text-primary" : "text-foreground")}>
                  العربية
                </span>
                <span className={cn("w-1/2 h-full flex items-center justify-center", locale === "en" ? "bg-accent text-primary" : "text-foreground")}>
                  EN
                </span>
              </button>
              
              <a 
                href={t("phone.tel")}
                className="w-full flex items-center justify-center gap-2 bg-accent text-primary h-12 rounded-full font-bold"
              >
                <Phone className="w-5 h-5" />
                <bdi dir="ltr">{t("phone.display")}</bdi>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

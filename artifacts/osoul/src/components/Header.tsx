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
  const isTransparent = !scrolled && isHomePage;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
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
      ],
    },
    { label: t("nav.about"), path: `/${locale}/about` },
    { label: t("nav.reviews"), path: `/${locale}/reviews` },
    { label: t("nav.contact"), path: `/${locale}/contact` },
  ];

  const linkColor = isTransparent
    ? "text-white/90 hover:text-accent"
    : "text-foreground/80 hover:text-accent";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 font-sans",
          scrolled
            ? "backdrop-blur-md bg-background/95 border-b border-accent/30 py-2 shadow-sm"
            : "bg-background/0 py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center gap-3">

          {/* ── START: hamburger (mobile) / logo (desktop) ── */}
          <div className="flex items-center shrink-0">
            {/* Desktop logo */}
            <Link href={`/${locale}`} className="hidden lg:flex items-center shrink-0">
              <Logo
                variant={isTransparent ? "ivory" : "navy"}
                size="md"
                showWordmark={!scrolled}
              />
            </Link>

            {/* Mobile hamburger */}
            <button
              className={cn(
                "lg:hidden p-2 -ms-1 transition-colors rounded-md",
                isTransparent ? "text-white" : "text-foreground"
              )}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="فتح القائمة"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* ── CENTER: logo (mobile, centred) / nav (desktop) ── */}
          <div className="flex-1 flex items-center justify-center lg:justify-start">
            {/* Mobile centred logo */}
            <Link href={`/${locale}`} className="lg:hidden flex items-center">
              <Logo
                variant={isTransparent ? "ivory" : "navy"}
                size="sm"
                showWordmark={false}
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, i) => (
                <div key={i} className="relative group">
                  <Link
                    href={link.path}
                    className={cn(
                      "flex items-center gap-1 font-semibold transition-colors",
                      linkColor
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
          </div>

          {/* ── END: phone icon (mobile) / lang + phone pill (desktop) ── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Desktop controls */}
            <div className="hidden lg:flex items-center gap-4">
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

              <a
                href={t("phone.tel")}
                className="flex items-center gap-2 bg-accent text-primary h-10 px-5 rounded-full font-bold hover:bg-[#D4A95C] transition-colors relative"
              >
                <span className="absolute inset-0 rounded-full animate-phone-pulse pointer-events-none" />
                <Phone className="w-4 h-4" />
                <bdi dir="ltr">{t("phone.display")}</bdi>
              </a>
            </div>

            {/* Mobile phone icon button */}
            <a
              href={t("phone.tel")}
              className={cn(
                "lg:hidden w-9 h-9 rounded-full flex items-center justify-center transition-colors shrink-0",
                "bg-accent text-primary hover:bg-[#D4A95C]"
              )}
              aria-label={t("phone.display")}
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div
            className="absolute inset-0 bg-primary/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer slides in from the end (right in LTR, left in RTL) */}
          <div
            className={cn(
              "relative w-[85vw] max-w-xs bg-background h-full shadow-2xl flex flex-col",
              isRTL ? "me-auto" : "ms-auto"
            )}
            style={{ animation: "slideInDrawer 0.28s cubic-bezier(.4,0,.2,1)" }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <Logo variant="navy" size="sm" showWordmark={false} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-foreground/50 hover:text-foreground rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-col px-3 py-4 gap-1 flex-1 overflow-y-auto font-sans">
              {navLinks.map((link, i) => (
                <div key={i}>
                  <Link
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center px-3 py-3 rounded-lg font-semibold text-foreground hover:bg-muted hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                  {link.dropdown && (
                    <div className="flex flex-col ps-6 pb-1 gap-0.5">
                      {link.dropdown.slice(1).map((drop, j) => (
                        <Link
                          key={j}
                          href={drop.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="px-3 py-2 text-sm text-foreground/65 hover:text-accent rounded-md transition-colors"
                        >
                          {drop.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Drawer footer */}
            <div className="px-5 py-5 border-t border-border space-y-3">
              <button
                onClick={() => { switchLocale(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center border border-accent/50 rounded-full overflow-hidden text-sm font-semibold h-10"
              >
                <span className={cn("w-1/2 h-full flex items-center justify-center transition-colors", locale === "ar" ? "bg-accent text-primary" : "text-foreground")}>
                  العربية
                </span>
                <span className={cn("w-1/2 h-full flex items-center justify-center transition-colors", locale === "en" ? "bg-accent text-primary" : "text-foreground")}>
                  EN
                </span>
              </button>

              <a
                href={t("phone.tel")}
                className="w-full flex items-center justify-center gap-2 bg-accent text-primary h-12 rounded-full font-bold hover:bg-[#D4A95C] transition-colors"
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

import { useLocation } from "wouter";
import { UI_STRINGS } from "@/data/i18n";
import { useEffect } from "react";

export type Locale = "ar" | "en";

export function useLocale(): { locale: Locale; isRTL: boolean; t: (key: string) => string } {
  const [location] = useLocation();
  const locale: Locale = location.startsWith("/en") ? "en" : "ar";
  const isRTL = locale === "ar";
  
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
      document.documentElement.lang = locale;
    }
  }, [isRTL, locale]);
  
  const t = (key: string) => UI_STRINGS[locale][key] ?? UI_STRINGS["ar"][key] ?? key;
  return { locale, isRTL, t };
}

import { FC } from "react";
import { useLocale } from "@/hooks/useLocale";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import { Logo } from "@/components/Logo";

export const ContactPage: FC = () => {
  const { t, isRTL } = useLocale();

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />
      
      <main className="flex-grow pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-16 items-start">
        
        {/* Left Col - Content */}
        <div className="w-full lg:w-1/2 space-y-12">
          
          <div>
            <div className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-bold tracking-widest uppercase font-serif mb-4">
              {t("contact.title")}
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
              {isRTL ? "جاهزين نسمعك. بصراحة ووضوح." : "Ready to listen. Honestly and clearly."}
            </h1>
            <p className="text-lg text-foreground/70">
              {isRTL 
                ? "مفيش أرقام فرعية كتير، ولا بوت بيرد عليك. تليفون مباشر بيرد عليه أحد أفراد فريقنا، جاهز يفيدك باللي يرضي ربنا."
                : "No complex extensions, no chat bots. A direct line answered by a team member, ready to advise you honestly."
              }
            </p>
          </div>

          <div className="bg-card border border-border p-8 rounded-2xl shadow-sm space-y-8">
            <a 
              href={t("phone.tel")}
              className="flex flex-col group block w-max"
            >
              <span className="text-sm font-bold text-foreground/50 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-accent" />
                {t("cta.call")}
              </span>
              <span dir="ltr" className="text-4xl md:text-[56px] font-black font-sans text-primary group-hover:text-accent transition-colors tracking-tighter">
                {t("phone.display")}
              </span>
            </a>

            <div className="h-px w-full bg-border" />

            <a 
              href={t("whatsapp.url")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-lg font-bold text-primary hover:text-accent transition-colors w-max"
            >
              <div className="w-12 h-12 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              {t("cta.whatsapp")}
            </a>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-accent shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-primary font-serif text-lg mb-1">{isRTL ? "مواعيد العمل" : "Working Hours"}</h3>
                <p className="text-foreground/70">{t("contact.hours")}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-accent shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-primary font-serif text-lg mb-1">{t("contact.office")}</h3>
                <p className="text-foreground/70 max-w-xs leading-relaxed">{t("contact.address_placeholder")}</p>
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Col - Map */}
        <div className="w-full lg:w-1/2 flex flex-col h-full min-h-[500px]">
          <div className="flex-grow w-full rounded-2xl overflow-hidden border-2 border-accent/20 shadow-md relative group">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none group-hover:bg-transparent transition-colors z-10" />
            <iframe 
              src="https://www.google.com/maps?q=Sadat+City,+Egypt&output=embed" 
              className="absolute inset-0 w-full h-full border-0" 
              loading="lazy" 
              allowFullScreen 
            />
            {/* Real address could replace Sadat+City,+Egypt in production */}
          </div>
          <p className="text-center mt-4 text-sm text-foreground/60 italic">
            {t("contact.map_caption")}
          </p>
        </div>

      </main>

      <Footer />
    </div>
  );
};

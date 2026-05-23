import { FC, useState } from "react";
import { Property, formatOfferNumber, CLASSIFICATION_EN, OPERATION_EN, LOCATION_EN } from "@/data/properties";
import { useLocale } from "@/hooks/useLocale";
import { MapPin, Maximize, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: FC<PropertyCardProps> = ({ property }) => {
  const { t, isRTL, locale } = useLocale();
  const [toastVisible, setToastVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const offerNum = formatOfferNumber(property.id, isRTL);
  
  const getTagColor = (op: string) => {
    if (op.includes("بيع")) return "bg-[#2E5C3E]";
    if (op.includes("إيجار")) return "bg-[#8B6F47]";
    if (op.includes("شراء")) return "bg-[#6B4226]";
    if (op.includes("بدل")) return "bg-[#4A5C7C]";
    if (op.includes("مشاركة")) return "bg-[#7C5C4A]";
    return "bg-primary";
  };

  const tagColor = getTagColor(property.operations[0]);

  // Translate fields if EN
  const displayType = isRTL ? property.type : (LOCATION_EN[property.type] || property.type); // basic fallback, could add TYPE_EN map
  const displayOperation = isRTL ? property.operation : property.operations.map(o => OPERATION_EN[o] || o).join(" / ");
  const displayClassification = isRTL ? property.classification : property.classifications.map(c => CLASSIFICATION_EN[c] || c).join(" / ");
  const displayLocation = isRTL ? property.location : (LOCATION_EN[property.location] || property.location);
  
  let displayArea = property.area;
  if (!isRTL) {
    if (property.area === "حسب الاستفسار") displayArea = "On inquiry";
    else displayArea = property.area.replace("متر", "m²").replace("فدان", "feddan").replace("قيراط", "qirat").replace("و", "and");
  }

  const handlePhoneClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 4000);
    setTimeout(() => {
      window.location.href = t("phone.tel");
    }, 800);
  };

  return (
    <div className="group flex flex-col bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-400">
      
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img 
          src={property.image} 
          alt={displayType}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={cn(
            "w-full h-full object-cover transition-all duration-700 group-hover:scale-105",
            "filter contrast-[1.05] saturate-[0.92] sepia-[0.05]",
            !imageLoaded && "blur-md scale-110"
          )}
        />
        
        {/* Top Badges */}
        <div className="absolute top-4 start-4 flex flex-col gap-2">
          <span className={cn("text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm", tagColor)}>
            {displayOperation}
          </span>
        </div>
        
        <div className="absolute top-4 end-4">
          <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-md shadow-sm font-sans" dir="ltr">
            {offerNum}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col p-5 flex-grow">
        
        {/* Title */}
        <h3 className="font-serif font-bold text-xl text-foreground mb-3 line-clamp-1" title={displayType}>
          {displayType}
        </h3>
        
        {/* Hairline */}
        <div className="h-px w-6 bg-accent/40 mb-4 rounded-full" />
        
        {/* Details */}
        <div className="space-y-3 mb-6 flex-grow">
          <div className="flex items-start gap-2 text-sm text-foreground/80 font-sans">
            <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
            <span className="line-clamp-2">{displayLocation}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-foreground/80 font-sans">
            <Maximize className="w-4 h-4 text-accent shrink-0" />
            <span dir={isRTL ? "rtl" : "ltr"}>{displayArea}</span>
          </div>
          
          <div className="pt-2">
            <span className="inline-block bg-muted/50 text-foreground/70 text-xs px-2.5 py-1 rounded-full font-sans border border-border/50">
              {displayClassification}
            </span>
          </div>
        </div>

        {/* Action Button & Toast */}
        <div className="mt-auto relative">
          {toastVisible && (
            <div className="absolute -top-10 start-0 end-0 bg-primary text-primary-foreground text-xs font-medium py-1.5 px-3 rounded text-center shadow-md animate-in fade-in slide-in-from-bottom-2 duration-300">
              {t("card.mention")} {offerNum}
            </div>
          )}
          
          <button 
            onClick={handlePhoneClick}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md border-2 border-accent text-primary font-bold font-sans bg-transparent group-hover:bg-accent group-hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>{t("card.inquiry")}</span>
            <span className="opacity-50 mx-1">/</span>
            <bdi dir="ltr" className="tracking-tight">{t("phone.display")}</bdi>
          </button>
        </div>

      </div>
    </div>
  );
};

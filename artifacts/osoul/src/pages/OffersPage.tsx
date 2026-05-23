import { FC, useState, useMemo, useEffect } from "react";
import { useParams } from "wouter";
import { useLocale } from "@/hooks/useLocale";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PropertyCard } from "@/components/PropertyCard";
import { properties, CLASSIFICATION_EN, OPERATION_EN, LOCATION_EN } from "@/data/properties";
import { Filter, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export const OffersPage: FC = () => {
  const { t, isRTL, locale } = useLocale();
  const params = useParams<{ category?: string }>();
  
  // State for filters
  const [activeClassifications, setActiveClassifications] = useState<string[]>([]);
  const [activeOperations, setActiveOperations] = useState<string[]>([]);
  const [activeType, setActiveType] = useState<string>("");
  const [activeLocation, setActiveLocation] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("newest");
  
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Initialize from URL params
  useEffect(() => {
    if (params.category === "residential") setActiveClassifications(["سكني"]);
    else if (params.category === "agricultural") setActiveClassifications(["زراعي"]);
    else if (params.category === "industrial") setActiveClassifications(["صناعي"]);
    else setActiveClassifications([]);
  }, [params.category]);

  // Derived options for dropdowns
  const allTypes = useMemo(() => Array.from(new Set(properties.map(p => p.type))).sort(), []);
  const allLocations = useMemo(() => Array.from(new Set(properties.map(p => p.location))).sort(), []);

  // Filter logic
  const filteredProperties = useMemo(() => {
    let result = properties;

    if (activeClassifications.length > 0) {
      result = result.filter(p => p.classifications.some(c => activeClassifications.includes(c)));
    }
    
    if (activeOperations.length > 0) {
      result = result.filter(p => p.operations.some(o => activeOperations.includes(o)));
    }
    
    if (activeType) {
      result = result.filter(p => p.type === activeType);
    }
    
    if (activeLocation) {
      result = result.filter(p => p.location === activeLocation);
    }

    // Sort
    return result.sort((a, b) => {
      if (sortOrder === "newest") return b.id - a.id;
      if (sortOrder === "largest") return (b.areaValue || 0) - (a.areaValue || 0);
      if (sortOrder === "smallest") return (a.areaValue || 9999999) - (b.areaValue || 9999999);
      if (sortOrder === "category") return a.classification.localeCompare(b.classification);
      return 0;
    });
  }, [activeClassifications, activeOperations, activeType, activeLocation, sortOrder]);

  const toggleClassification = (c: string) => {
    setActiveClassifications(prev => 
      prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]
    );
  };

  const toggleOperation = (o: string) => {
    setActiveOperations(prev => 
      prev.includes(o) ? prev.filter(x => x !== o) : [...prev, o]
    );
  };

  const clearFilters = () => {
    setActiveClassifications([]);
    setActiveOperations([]);
    setActiveType("");
    setActiveLocation("");
  };

  const hasFilters = activeClassifications.length > 0 || activeOperations.length > 0 || activeType || activeLocation;
  
  const ARABIC_DIGITS = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  const displayCount = isRTL 
    ? filteredProperties.length.toString().split('').map(d => ARABIC_DIGITS[parseInt(d)]).join('')
    : filteredProperties.length;
  const displayTotal = isRTL
    ? properties.length.toString().split('').map(d => ARABIC_DIGITS[parseInt(d)]).join('')
    : properties.length;

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />
      
      <main className="flex-grow pt-24 pb-24 px-6 md:px-12 max-w-[1600px] w-full mx-auto flex flex-col lg:flex-row gap-8 relative">
        
        {/* Mobile Filter Button */}
        <div className="lg:hidden sticky top-[72px] z-40 bg-background/90 backdrop-blur py-4 border-b border-border flex justify-between items-center -mx-6 px-6">
          <span className="font-bold text-primary">{t("showing")} {displayCount} {t("offers_label")}</span>
          <button 
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium text-sm"
          >
            <Filter className="w-4 h-4" />
            {t("filter.active")} {hasFilters && `(${activeClassifications.length + activeOperations.length + (activeType?1:0) + (activeLocation?1:0)})`}
          </button>
        </div>

        {/* Filter Sidebar */}
        <aside className={cn(
          "w-full lg:w-80 shrink-0 flex flex-col gap-8 transition-all duration-300",
          mobileFilterOpen ? "fixed inset-0 z-50 bg-background p-6 overflow-y-auto" : "hidden lg:flex"
        )}>
          
          <div className="flex items-center justify-between lg:hidden mb-4">
            <h2 className="text-xl font-bold font-serif">{t("filter.active")}</h2>
            <button onClick={() => setMobileFilterOpen(false)} className="p-2 bg-muted rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-primary font-serif">{t("filter.active")}</h2>
            {hasFilters && (
              <button onClick={clearFilters} className="text-sm text-accent hover:underline font-medium">
                {t("filter.clear")}
              </button>
            )}
          </div>

          {/* Classification */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-foreground/60 uppercase tracking-wider">{t("filter.classification")}</h3>
            <div className="flex flex-wrap gap-2">
              {["سكني", "زراعي", "صناعي", "مختلط"].map(c => {
                const isActive = activeClassifications.includes(c);
                const label = isRTL ? c : CLASSIFICATION_EN[c];
                return (
                  <button
                    key={c}
                    onClick={() => toggleClassification(c)}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-full border transition-all duration-200",
                      isActive 
                        ? "bg-primary border-primary text-primary-foreground" 
                        : "bg-transparent border-border text-foreground hover:border-primary"
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Operations */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-foreground/60 uppercase tracking-wider">{t("filter.operation")}</h3>
            <div className="flex flex-wrap gap-2">
              {["للبيع", "للإيجار", "مطلوب للشراء", "مطلوب للإيجار", "بدل", "مشاركة"].map(o => {
                const isActive = activeOperations.includes(o);
                const label = isRTL ? o : OPERATION_EN[o];
                return (
                  <button
                    key={o}
                    onClick={() => toggleOperation(o)}
                    className={cn(
                      "px-3 py-1.5 text-sm rounded-full border transition-all duration-200",
                      isActive 
                        ? "bg-accent border-accent text-primary font-medium shadow-sm" 
                        : "bg-transparent border-border text-foreground hover:border-accent"
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Type Dropdown */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-foreground/60 uppercase tracking-wider">{t("filter.type")}</h3>
            <select 
              value={activeType}
              onChange={(e) => setActiveType(e.target.value)}
              className="w-full h-10 px-3 bg-card border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="">{t("filter.all")}</option>
              {allTypes.map(t => (
                <option key={t} value={t}>{isRTL ? t : (LOCATION_EN[t] || t)}</option>
              ))}
            </select>
          </div>

          {/* Location Dropdown */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-foreground/60 uppercase tracking-wider">{t("filter.location")}</h3>
            <select 
              value={activeLocation}
              onChange={(e) => setActiveLocation(e.target.value)}
              className="w-full h-10 px-3 bg-card border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
            >
              <option value="">{t("filter.all")}</option>
              {allLocations.map(l => (
                <option key={l} value={l}>{isRTL ? l : (LOCATION_EN[l] || l)}</option>
              ))}
            </select>
          </div>

          {mobileFilterOpen && (
            <button 
              onClick={() => setMobileFilterOpen(false)}
              className="mt-8 w-full h-12 bg-primary text-primary-foreground rounded-md font-bold"
            >
              {t("showing")} {displayCount} {t("offers_label")}
            </button>
          )}
        </aside>

        {/* Results Grid */}
        <div className="flex-1 flex flex-col">
          
          <div className="hidden lg:flex items-center justify-between mb-6 pb-6 border-b border-border">
            <div className="text-foreground/80">
              {t("showing")} <span className="font-bold text-primary px-1">{displayCount}</span> {t("of")} <span className="font-bold px-1">{displayTotal}</span> {t("offers_label")}
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-foreground/60">{isRTL ? "ترتيب:" : "Sort:"}</span>
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="h-10 px-3 bg-transparent border-none text-sm font-bold focus:outline-none text-primary cursor-pointer"
              >
                <option value="newest">{t("sort.newest")}</option>
                <option value="largest">{t("sort.largest")}</option>
                <option value="smallest">{t("sort.smallest")}</option>
                <option value="category">{t("sort.by_category")}</option>
              </select>
            </div>
          </div>

          {/* Active Filters Pills */}
          {hasFilters && (
            <div className="hidden lg:flex flex-wrap gap-2 mb-6">
              {activeClassifications.map(c => (
                <span key={c} className="inline-flex items-center gap-1 bg-muted px-3 py-1 rounded-full text-xs font-medium border border-border/50">
                  {isRTL ? c : CLASSIFICATION_EN[c]}
                  <button onClick={() => toggleClassification(c)} className="hover:text-destructive shrink-0"><X className="w-3 h-3" /></button>
                </span>
              ))}
              {activeOperations.map(o => (
                <span key={o} className="inline-flex items-center gap-1 bg-muted px-3 py-1 rounded-full text-xs font-medium border border-border/50">
                  {isRTL ? o : OPERATION_EN[o]}
                  <button onClick={() => toggleOperation(o)} className="hover:text-destructive shrink-0"><X className="w-3 h-3" /></button>
                </span>
              ))}
              {activeType && (
                <span className="inline-flex items-center gap-1 bg-muted px-3 py-1 rounded-full text-xs font-medium border border-border/50">
                  {isRTL ? activeType : (LOCATION_EN[activeType] || activeType)}
                  <button onClick={() => setActiveType("")} className="hover:text-destructive shrink-0"><X className="w-3 h-3" /></button>
                </span>
              )}
              {activeLocation && (
                <span className="inline-flex items-center gap-1 bg-muted px-3 py-1 rounded-full text-xs font-medium border border-border/50">
                  {isRTL ? activeLocation : (LOCATION_EN[activeLocation] || activeLocation)}
                  <button onClick={() => setActiveLocation("")} className="hover:text-destructive shrink-0"><X className="w-3 h-3" /></button>
                </span>
              )}
            </div>
          )}

          {filteredProperties.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-card rounded-xl border border-border border-dashed">
              <Search className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-xl font-bold font-serif text-primary mb-2">{t("empty.title")}</h3>
              <p className="text-foreground/70 max-w-sm mb-6">{t("empty.body")}</p>
              <button 
                onClick={clearFilters}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium"
              >
                {t("filter.clear")}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

import { FC } from "react";

interface LogoProps {
  variant?: "gold" | "navy" | "ivory";
  size?: "sm" | "md" | "lg" | "xl";
  showWordmark?: boolean;
}

export const Logo: FC<LogoProps> = ({ variant = "gold", size = "md", showWordmark = true }) => {
  const width = size === "sm" ? 80 : size === "md" ? 120 : size === "lg" ? 160 : 200;
  const height = showWordmark ? width * 0.6 : width * 0.4;
  
  const colorMap = {
    gold: "url(#gold-gradient)",
    navy: "hsl(var(--primary))",
    ivory: "hsl(var(--background))"
  };
  
  const fill = colorMap[variant];

  return (
    <div className="flex flex-col items-center justify-center transition-all duration-300 hover:opacity-90">
      <svg
        width={width}
        height={height}
        viewBox="0 0 200 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block"
      >
        <defs>
          <linearGradient id="gold-gradient" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D4A95C" />
            <stop offset="0.5" stopColor="#B8893E" />
            <stop offset="1" stopColor="#D4A95C" />
          </linearGradient>
        </defs>
        
        {/* Calligraphy Approximation - "أصول" */}
        <text 
          x="100" 
          y={showWordmark ? "60" : "80"} 
          fontFamily="'Cairo', serif" 
          fontSize="64" 
          fontWeight="900" 
          fill={fill} 
          textAnchor="middle"
          dominantBaseline="middle"
        >
          أصول
        </text>
        
        {/* Horizon Line */}
        <line x1="40" y1={showWordmark ? "75" : "95"} x2="160" y2={showWordmark ? "75" : "95"} stroke={fill} strokeWidth="2" opacity="0.6" />

        {showWordmark && (
          <>
            {/* Wordmark */}
            <text
              x="100"
              y="95"
              fontFamily="'Cormorant Garamond', serif"
              fontSize="14"
              fontWeight="600"
              fill={fill}
              textAnchor="middle"
              letterSpacing="0.2em"
            >
              · OSOUL ·
            </text>
            
            {/* Tagline */}
            <text
              x="100"
              y="110"
              fontFamily="'Inter', sans-serif"
              fontSize="8"
              fontWeight="500"
              fill={fill}
              textAnchor="middle"
              letterSpacing="0.1em"
              opacity="0.8"
            >
              EST. 2010 · SADAT CITY
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

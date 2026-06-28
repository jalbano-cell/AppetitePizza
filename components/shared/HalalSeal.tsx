type HalalSealProps = {
  size?: number;
  className?: string;
};

export function HalalSeal({ size = 80, className }: HalalSealProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Halal Certified"
    >
      {/* Badge fill */}
      <circle cx="50" cy="50" r="48" fill="#071a0a" />

      {/* Outer ring */}
      <circle cx="50" cy="50" r="47" fill="none" stroke="#16a34a" strokeWidth="2" />

      {/* Inner dashed ring */}
      <circle
        cx="50"
        cy="50"
        r="41"
        fill="none"
        stroke="#16a34a"
        strokeWidth="0.8"
        strokeDasharray="2.5 2"
        opacity="0.5"
      />

      {/* Crescent moon — outer circle minus offset cutout */}
      <circle cx="41" cy="31" r="17" fill="#16a34a" />
      <circle cx="47" cy="31" r="13" fill="#071a0a" />

      {/* 5-pointed star */}
      <polygon
        points="63,19 64.8,24.5 70.5,24.5 65.9,27.9 67.6,33.4 63,30 58.4,33.4 60.1,27.9 55.5,24.5 61.2,24.5"
        fill="#16a34a"
      />

      {/* HALAL */}
      <text
        x="50"
        y="68"
        textAnchor="middle"
        fill="#16a34a"
        fontSize="14"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, Arial, sans-serif"
        letterSpacing="3"
      >
        HALAL
      </text>

      {/* CERTIFIED */}
      <text
        x="50"
        y="79"
        textAnchor="middle"
        fill="#16a34a"
        fontSize="6.5"
        fontWeight="500"
        fontFamily="system-ui, -apple-system, Arial, sans-serif"
        letterSpacing="2.5"
        opacity="0.75"
      >
        CERTIFIED
      </text>

      {/* حلال */}
      <text
        x="50"
        y="91"
        textAnchor="middle"
        fill="#16a34a"
        fontSize="8.5"
        fontFamily="system-ui, -apple-system, Arial, sans-serif"
        opacity="0.65"
      >
        حلال
      </text>
    </svg>
  );
}

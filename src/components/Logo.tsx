interface LogoProps {
  className?: string;
  light?: boolean;
}

const Logo = ({ className = "", light = true }: LogoProps) => {
  const fillColor = light ? "white" : "black";
  
  return (
    <svg 
      width="180" 
      height="60" 
      viewBox="0 0 400 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Icon: Abstract Isles / 'P' Shape */}
      <path 
        d="M40 80C40 57.9086 57.9086 40 80 40H90V80H40Z" 
        fill={fillColor}
      />
      <path 
        d="M60 90C60 78.9543 68.9543 70 80 70H110V90C110 101.046 101.046 110 90 110H60V90Z" 
        fill={fillColor} 
        opacity="0.8"
      />
      
      {/* Typography */}
      <text 
        x="130" 
        y="75" 
        fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif" 
        fontWeight="800" 
        fontSize="38" 
        fill={fillColor}
      >
        PRIME
      </text>
      <text 
        x="130" 
        y="105" 
        fontFamily="ui-sans-serif, system-ui, -apple-system, sans-serif" 
        fontWeight="300" 
        fontSize="28" 
        letterSpacing="0.15em" 
        fill={fillColor}
      >
        MALLS
      </text>
    </svg>
  );
};

export default Logo;

import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  highlightedWord: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, highlightedWord, description }: FeatureCardProps) => {
  return (
    <div className="glass rounded-xl p-6 flex flex-col items-center text-center group hover:bg-white/10 transition-all duration-300">
      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="h-8 w-8 text-primary-foreground" />
      </div>
      <h3 className="text-white font-bold text-lg mb-2">
        {title} <span className="italic">{highlightedWord}</span>
      </h3>
      <p className="text-white/70 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;

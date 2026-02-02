import { CheckCircle, Megaphone, Users, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import FeatureCard from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-mall.jpg";

const Index = () => {
  const features = [
    {
      icon: CheckCircle,
      title: "SMART",
      highlightedWord: "SOLUTIONS",
      description: "Providing Excellent Products & Services",
    },
    {
      icon: Megaphone,
      title: "BEST",
      highlightedWord: "OFFERS",
      description: "Starting Your Smart Shopping Journey",
    },
    {
      icon: Users,
      title: "Friendly",
      highlightedWord: "SUPPORT",
      description: "Experienced Customer Care Specialists",
    },
  ];

  return (
    <Layout withHeroBackground hideFooter>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 hero-overlay" />

        {/* Navigation Arrows */}
        <button 
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button 
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all"
          aria-label="Next"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-20">
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            PRIME MALL
          </h1>
          
          <div 
            className="inline-block animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <p className="bg-white text-foreground px-8 py-3 rounded-full text-lg md:text-xl font-medium">
              Imparts Positive Feelings About Sales
            </p>
          </div>

          {/* Enter Button */}
          <div 
            className="mt-8 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Button asChild size="lg" className="gap-2 text-lg px-8 py-6">
              <Link to="/shop">
                Enter Mall
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Feature Cards */}
          <div 
            className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                highlightedWord={feature.highlightedWord}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;

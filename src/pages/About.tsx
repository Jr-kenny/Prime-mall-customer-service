import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Building2, Users, Award, Heart, Loader2 } from "lucide-react";
import { getMallKnowledge, parseMallKnowledge } from "@/lib/genlayer";

const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [knowledgeSections, setKnowledgeSections] = useState<{ title: string; content: string }[]>([]);

  const stats = [
    { icon: Building2, value: "500+", label: "Partner Stores" },
    { icon: Users, value: "1M+", label: "Happy Customers" },
    { icon: Award, value: "50+", label: "Awards Won" },
    { icon: Heart, value: "99%", label: "Satisfaction Rate" },
  ];

  useEffect(() => {
    const fetchKnowledge = async () => {
      setIsLoading(true);
      try {
        const knowledge = await getMallKnowledge();
        const sections = parseMallKnowledge(knowledge);
        setKnowledgeSections(sections);
      } catch (error) {
        console.error("Error fetching mall knowledge:", error);
        // Fallback sections
        setKnowledgeSections([
          { title: "About Prime Mall", content: "Trusted marketplace with 500+ partner stores and 1M+ customers." },
          { title: "Mission", content: "To connect customers with quality products and unbeatable value." },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKnowledge();
  }, []);

  // Get the main about section
  const aboutSection = knowledgeSections.find(s => s.title === "About Prime Mall");
  const missionSection = knowledgeSections.find(s => s.title === "Mission");
  const otherSections = knowledgeSections.filter(s => 
    s.title !== "About Prime Mall" && s.title !== "Mission"
  );

  return (
    <Layout>
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Prime Mall</h1>
            <p className="text-lg md:text-xl opacity-90">
              Your premier destination for an unparalleled shopping experience
            </p>
            <p className="text-sm opacity-70 mt-2">Data sourced from GenLayer Intelligent Contract</p>
          </div>
        </section>

        {/* Loading State */}
        {isLoading ? (
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Fetching data from blockchain...</p>
            </div>
          </section>
        ) : (
          <>
            {/* Our Story */}
            <section className="py-16 px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-foreground mb-6 text-center">Our Story</h2>
                <div className="prose prose-lg mx-auto text-muted-foreground">
                  {aboutSection && (
                    <p className="mb-4 text-lg">{aboutSection.content}</p>
                  )}
                  {missionSection && (
                    <p className="mb-4">
                      <strong className="text-foreground">Our Mission:</strong> {missionSection.content}
                    </p>
                  )}
                  <p>
                    Today, Prime Mall serves millions of customers worldwide, and we continue to expand 
                    our offerings while maintaining the personal touch that our customers have come to 
                    love and expect.
                  </p>
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-secondary">
              <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
                        <stat.icon className="h-8 w-8 text-primary-foreground" />
                      </div>
                      <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        {stat.value}
                      </div>
                      <div className="text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Contract Info Sections */}
            {otherSections.length > 0 && (
              <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                  <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Key Information</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {otherSections.map((section, index) => (
                      <div key={index} className="bg-card p-6 rounded-xl shadow-sm border">
                        <h3 className="text-lg font-bold text-foreground mb-3">{section.title}</h3>
                        <p className="text-muted-foreground text-sm">{section.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Mission & Vision */}
            <section className="py-16 px-4 bg-secondary">
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                <div className="bg-card p-8 rounded-xl shadow-sm border">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                  <p className="text-muted-foreground">
                    {missionSection?.content || "To provide an exceptional online shopping experience by connecting customers with quality products from trusted vendors, all while delivering outstanding customer service and unbeatable value."}
                  </p>
                </div>
                <div className="bg-card p-8 rounded-xl shadow-sm border">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To become the world's most customer-centric marketplace, where people can discover, 
                    explore, and purchase anything they desire with confidence and convenience.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
};

export default About;

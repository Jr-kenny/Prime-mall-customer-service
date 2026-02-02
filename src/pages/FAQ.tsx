import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Loader2 } from "lucide-react";
import { getFaqAnswer, FAQ_KEYS } from "@/lib/genlayer";

interface FaqItem {
  question: string;
  key: string;
  answer: string | null;
  isLoading: boolean;
}

const initialFaqs: FaqItem[] = [
  { question: "How do I create an account?", key: "account_creation", answer: null, isLoading: false },
  { question: "What payment methods do you accept?", key: "payment_methods", answer: null, isLoading: false },
  { question: "How long does shipping take?", key: "shipping_time", answer: null, isLoading: false },
  { question: "What is your return policy?", key: "return_policy", answer: null, isLoading: false },
  { question: "How can I track my order?", key: "order_tracking", answer: null, isLoading: false },
  { question: "Do you offer international shipping?", key: "international_shipping", answer: null, isLoading: false },
  { question: "How do I contact customer support?", key: "contact_info", answer: null, isLoading: false },
  { question: "Are my payment details secure?", key: "security_check", answer: null, isLoading: false },
];

const FAQ = () => {
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);
  const [expandedItem, setExpandedItem] = useState<string | undefined>(undefined);

  const handleAccordionChange = async (value: string) => {
    setExpandedItem(value);
    
    if (!value) return;
    
    const index = parseInt(value.replace("item-", ""));
    const faq = faqs[index];
    
    // If answer is already loaded, don't fetch again
    if (faq.answer !== null) return;
    
    // Set loading state
    setFaqs(prev => prev.map((f, i) => 
      i === index ? { ...f, isLoading: true } : f
    ));
    
    try {
      // Fetch answer from GenLayer contract
      const answer = await getFaqAnswer(faq.key);
      
      setFaqs(prev => prev.map((f, i) => 
        i === index ? { ...f, answer, isLoading: false } : f
      ));
    } catch (error) {
      console.error("Error fetching FAQ answer:", error);
      setFaqs(prev => prev.map((f, i) => 
        i === index ? { 
          ...f, 
          answer: "Unable to fetch answer. Please try again later.", 
          isLoading: false 
        } : f
      ));
    }
  };

  return (
    <Layout>
      <div className="pt-24 pb-16">
        {/* Header */}
        <section className="bg-primary text-primary-foreground py-12">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-lg opacity-90">Find answers to common questions about Prime Mall</p>
            <p className="text-sm opacity-70 mt-2">Powered by GenLayer</p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <Accordion 
              type="single" 
              collapsible 
              className="w-full"
              value={expandedItem}
              onValueChange={handleAccordionChange}
            >
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.isLoading ? (
                      <div className="flex items-center gap-2 py-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Fetching from blockchain...</span>
                      </div>
                    ) : faq.answer ? (
                      <p>{faq.answer}</p>
                    ) : (
                      <p className="text-muted-foreground/50">Click to load answer from contract...</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-12 px-4 bg-secondary">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Chat with our AI-powered customer service.
            </p>
            <p className="text-sm text-muted-foreground">
              Click the chat button in the bottom right corner to start a conversation.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default FAQ;

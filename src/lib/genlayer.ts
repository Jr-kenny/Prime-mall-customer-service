import { createClient, createAccount } from "genlayer-js";
import { studionet } from "genlayer-js/chains";

export const CONTRACT_ADDRESS = "0x991F3d8Fa960f25c83E5Ca4ffe9184c9453d5A58";

// Initialize GenLayer client
export const initializeGenLayer = async () => {
  const privateKey = import.meta.env.VITE_GENLAYER_KEY || "";
  if (!privateKey) {
    console.error("❌ Missing VITE_GENLAYER_KEY in environment");
    return null;
  }

  const account = createAccount(privateKey);
  const client = createClient({ chain: studionet, account });

  try {
    await client.initializeConsensusSmartContract();
    console.log("✅ GenLayer consensus initialized");
  } catch (error) {
    console.error("❌ Failed to initialize consensus:", error);
    return null;
  }

  return client;
};

// FAQ key mapping
export const FAQ_KEYS: Record<string, string> = {
  "How do I create an account?": "account_creation",
  "What payment methods do you accept?": "payment_methods",
  "How long does shipping take?": "shipping_time",
  "What is your return policy?": "return_policy",
  "How can I track my order?": "order_tracking",
  "Do you offer international shipping?": "international_shipping",
  "How do I contact customer support?": "contact_info",
  "Are my payment details secure?": "security_check",
};

// Read FAQ answer from contract
export const getFaqAnswer = async (faqKey: string): Promise<string> => {
  try {
    const activeClient = await initializeGenLayer();
    if (!activeClient) {
      console.warn("⚠️ GenLayer not available, using fallback");
      return getFallbackAnswer(faqKey);
    }

    const result = await activeClient.readContract({
      address: CONTRACT_ADDRESS,
      functionName: "get_faq_answer",
      args: [faqKey],
    });

    if (!result) {
      console.warn(`⚠️ Empty result for FAQ key: ${faqKey}`);
      return getFallbackAnswer(faqKey);
    }

    console.log(`✅ FAQ answer fetched for key: ${faqKey}`);
    return result;
  } catch (error) {
    console.error(`❌ Error fetching FAQ answer for ${faqKey}:`, error);
    return getFallbackAnswer(faqKey);
  }
};

// Get mall knowledge from contract
export const getMallKnowledge = async (): Promise<string> => {
  try {
    const activeClient = await initializeGenLayer();
    if (!activeClient) {
      console.warn("⚠️ GenLayer not available, using fallback");
      return getFallbackKnowledge();
    }

    const result = await activeClient.readContract({
      address: CONTRACT_ADDRESS,
      functionName: "get_mall_knowledge",
      args: [],
    });

    if (!result) {
      console.warn("⚠️ Empty mall knowledge result");
      return getFallbackKnowledge();
    }

    console.log("✅ Mall knowledge fetched from contract");
    return result;
  } catch (error) {
    console.error("❌ Error fetching mall knowledge:", error);
    return getFallbackKnowledge();
  }
};

// Chat with customer service (write operation)
export const chatWithService = async (userMessage: string): Promise<{ response: string; intent: string } | null> => {
  try {
    const activeClient = await initializeGenLayer();
    if (!activeClient) {
      console.error("❌ GenLayer not initialized");
      return null;
    }

    console.log("📤 Sending message to customer service...");

    // Send the message
    const hash = await activeClient.writeContract({
      address: CONTRACT_ADDRESS,
      functionName: "chat_with_service",
      args: [userMessage],
    });

    console.log("⏳ Transaction sent! Hash:", hash);

    // Wait for transaction confirmation
    const receipt = await activeClient.waitForTransactionReceipt({
      hash,
      status: "ACCEPTED",
      retries: 120,
      interval: 5000,
    });

    console.log("✅ Transaction accepted");
    console.log("📋 Full receipt object:", JSON.stringify(receipt, null, 2));
    
    // Navigate the consensus data structure to get the readable result
    let resultString = null;

    // Try to get from consensus_data.leader_receipt (GenLayer consensus format)
    if (receipt?.consensus_data?.leader_receipt?.[0]?.result?.payload?.readable) {
      resultString = receipt.consensus_data.leader_receipt[0].result.payload.readable;
      console.log("📍 Found result in consensus_data.leader_receipt[0].result.payload.readable");
    }
    // Fallback: Try direct result path
    else if (receipt?.result) {
      resultString = receipt.result;
      console.log("📍 Found result in receipt.result");
    }

    if (!resultString) {
      console.warn("⚠️ No result found in receipt");
      return {
        response: "Your message has been received. Our team will respond shortly.",
        intent: "message_received"
      };
    }

    console.log("📦 Raw result string:", resultString);

    // If it's a JSON string (might be wrapped in quotes or markdown code blocks)
    let jsonString = resultString;

    // Remove surrounding quotes if present (from JSON string representation)
    if (jsonString.startsWith('"') && jsonString.endsWith('"')) {
      jsonString = jsonString.slice(1, -1);
      console.log("🔍 Removed surrounding quotes");
    }

    // Unescape quotes
    jsonString = jsonString.replace(/\\"/g, '"');
    jsonString = jsonString.replace(/\\\\/g, '\\');
    console.log("🔍 Unescaped quotes");

    // Remove markdown code blocks (```json ... ```)
    jsonString = jsonString.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    console.log("🔍 Removed markdown code blocks");

    console.log("🔄 Cleaned JSON string:", jsonString);

    try {
      const parsed = JSON.parse(jsonString);
      console.log("✅ Successfully parsed JSON:", parsed);

      return {
        response: parsed.response || "Thank you for your message. Our team will assist you shortly.",
        intent: parsed.intent || "general_inquiry"
      };
    } catch (parseError) {
      console.error("❌ Failed to parse JSON response:", parseError);
      console.log("📝 Attempted to parse:", jsonString);

      // Return the raw result as response
      return {
        response: jsonString,
        intent: "raw_response"
      };
    }
  } catch (error) {
    console.error("❌ Error chatting with service:", error);
    console.error("❌ Error details:", error);
    return null;
  }
};

// Update knowledge (admin-only write operation)
export const updateMallKnowledge = async (newKnowledge: string): Promise<boolean> => {
  try {
    const activeClient = await initializeGenLayer();
    if (!activeClient) {
      console.error("❌ GenLayer not initialized");
      return false;
    }

    console.log("📤 Updating mall knowledge...");

    const hash = await activeClient.writeContract({
      address: CONTRACT_ADDRESS,
      functionName: "update_knowledge",
      args: [newKnowledge],
    });

    console.log("⏳ Update transaction sent! Hash:", hash);

    const receipt = await activeClient.waitForTransactionReceipt({
      hash,
      status: "ACCEPTED",
      retries: 50,
      interval: 2000,
    });

    console.log("✅ Mall knowledge updated successfully");
    return true;
  } catch (error) {
    console.error("❌ Error updating mall knowledge:", error);
    return false;
  }
};

// Fallback answers when contract is unavailable
const getFallbackAnswer = (faqKey: string): string => {
  const fallbacks: Record<string, string> = {
    account_creation: "Creating an account is easy! Simply click on the 'Sign Up' button at the top of the page, enter your email address and create a password. You'll receive a confirmation email to verify your account.",
    payment_methods: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are secured with industry-standard encryption.",
    shipping_time: "Standard shipping typically takes 5-7 business days. Express shipping options are available at checkout for faster delivery (2-3 business days). International shipping times vary by location.",
    return_policy: "We offer a 30-day return policy for most items. Products must be unused and in their original packaging. Simply contact our customer support team to initiate a return.",
    order_tracking: "Once your order ships, you'll receive a confirmation email with a tracking number. You can also log into your account and view your order status in the 'My Orders' section.",
    international_shipping: "Yes! We ship to over 100 countries worldwide. Shipping costs and delivery times vary by location. You can see the available options at checkout after entering your address.",
    contact_info: "You can reach our customer support team via the Contact page, by email at support@primemall.com, or through our live chat feature available 24/7. We typically respond within 24 hours.",
    security_check: "Absolutely. We use SSL encryption and are PCI-DSS compliant to ensure your payment information is always protected. We never store your full credit card details on our servers.",
  };
  return fallbacks[faqKey] || "Please contact our support team at support@primemall.com for assistance.";
};

const getFallbackKnowledge = (): string => {
  return "About Prime Mall: Trusted marketplace with 500+ partner stores and 1M+ customers. Mission: To connect customers with quality products and unbeatable value. Terms: Users must be 18+. One account per individual. No bots allowed. Marketplace Role: We facilitate transactions; vendors are responsible for product quality. Privacy: We do not sell personal data. We use SSL encryption and are PCI-DSS compliant. Refunds: 30-day window (60 for members). No returns on perishables, cosmetics, or gift cards. Shipping: Standard (5-7 days), Express (2-3), International (10-21). Support: support@primemall.com, 1-800-PRIME-MALL, and 24/7 Live Chat. Membership: $99/year. Benefits include free shipping and priority support. Disputes: Escalate to Prime Mall if vendor doesn't resolve in 48 hours.";
};

// Parse mall knowledge into structured sections
export const parseMallKnowledge = (knowledge: string): { title: string; content: string }[] => {
  const sections: { title: string; content: string }[] = [];

  const parts = knowledge.split(/(?=About Prime Mall:|Mission:|Terms:|Marketplace Role:|Privacy:|Refunds:|Shipping:|Support:|Membership:|Disputes:)/);

  parts.forEach(part => {
    const trimmed = part.trim();
    if (!trimmed) return;

    const colonIndex = trimmed.indexOf(':');
    if (colonIndex > -1) {
      const title = trimmed.substring(0, colonIndex).trim();
      const content = trimmed.substring(colonIndex + 1).trim();
      if (title && content) {
        sections.push({ title, content });
      }
    }
  });

  return sections;
};

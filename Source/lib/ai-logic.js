import { products } from "@/data/products";

export async function generateAIResponse(userMessage) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const lowerMsg = userMessage.toLowerCase();

    // Keyword matching logic
    let matches = [];
    let responseText = "";

    if (lowerMsg.includes("cozy") || lowerMsg.includes("warm") || lowerMsg.includes("comfort")) {
        matches = [...matches, ...products.filter(p => p.tags.includes("cozy") || p.tags.includes("warm"))];
    }

    if (lowerMsg.includes("modern") || lowerMsg.includes("minimalist") || lowerMsg.includes("clean")) {
        matches = [...matches, ...products.filter(p => p.tags.includes("modern") || p.tags.includes("minimalist"))];
    }

    if (lowerMsg.includes("luxury") || lowerMsg.includes("gold") || lowerMsg.includes("elegant")) {
        matches = [...matches, ...products.filter(p => p.tags.includes("luxury") || p.tags.includes("artistic"))];
    }

    // Deduplicate matches
    matches = [...new Set(matches)];

    if (matches.length > 0) {
        responseText = `I found ${matches.length} items that match your style. How about these?`;
        return {
            text: responseText,
            products: matches.slice(0, 3) // Return top 3
        };
    }

    // Fallback
    return {
        text: "I'd love to help you design your space. Could you tell me more about the style you're looking for? (e.g., 'Modern living room', 'Cozy bedroom')",
        products: []
    };
}

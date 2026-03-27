import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Initialize Gemini with API Key
const apiKey = process.env.GEMINI_API_KEY || "AIzaSyCEbufrGwUdS-DhY-QkTjXVWQFVmiQtFgg";
const genAI = new GoogleGenerativeAI(apiKey);

// Specialized System Instruction for Gemini
const SYSTEM_INSTRUCTION = `
You are an expert dermatological AI assistant for AGYA Skincare.
Analyze the provided facial skin image for three specific concerns: Acne, Wrinkles, and Dark Spots.

Return a strictly JSON response with the following fields:
1. "acne": integer (0-100 score, where 100 is most severe)
2. "wrinkles": integer (0-100 score)
3. "dark_spots": integer (0-100 score)
4. "dietary_advice": A short, empathetic string (1-2 sentences) about foods to eat or avoid for these issues.
5. "recommended_actives": Array of 2-3 specific botanical or clinical ingredients (e.g. "Vitamin C", "Niacinamide", "Bakuchiol").

Focus on precision. If the image quality is too low for analysis, return 0 for all scores and a helpful message.
`;

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json(); // Base64 image
    
    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    if (!apiKey) {
       console.warn("GEMINI_API_KEY not set. Returning mock data.");
       return NextResponse.json(getMockResult());
    }

    // Initialize the model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        maxOutputTokens: 500,
        responseMimeType: "application/json",
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });

    const imageData = image.split(",")[1] || image; // Handle data:image/... prefix

    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageData,
        },
      },
      "Analyze this skin image and provide scores and advice in JSON format."
    ]);

    const response = await result.response;
    const textResult = response.text();

    if (!textResult) {
       throw new Error("No response from AI model");
    }

    const jsonResult = JSON.parse(textResult);
    return NextResponse.json(jsonResult);

  } catch (error: any) {
    console.error("Scan AI Error:", error);
    return NextResponse.json({ error: "Analysis failed", details: error.message }, { status: 500 });
  }
}

function getMockResult() {
  return {
    acne: 26,
    wrinkles: 12,
    dark_spots: 18,
    dietary_advice: "Focus on antioxidant-rich berries and omega-3 fatty acids like salmon to reduce micro-inflammation.",
    recommended_actives: ["Bakuchiol", "Stabilized Vitamin C", "Gotu Kola"],
    is_mock: true
  };
}

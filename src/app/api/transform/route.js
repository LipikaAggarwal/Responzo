import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const { code } = await req.json();

  if (!code) {
    return NextResponse.json(
      { responsive: "", explanation: "No code provided." },
      { status: 400 }
    );
  }

  const prompt = `
Convert this code into responsive HTML using Tailwind CSS.
Return only the HTML code (no explanations, no markdown, no extra text).
Make it mobile-first and optimized.

Code:
${code}
`;


  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent(prompt);

    let text = result.response.text();

    // remove markdown wrappers
    text = text.replace(/```html|```/g, "").trim();

    return NextResponse.json({
      responsive: text,
      explanation: "Generated using Gemini 1.5 Flash (free)."
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      {
        responsive: "",
        explanation: "An error occurred while generating the response.",
        error: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}

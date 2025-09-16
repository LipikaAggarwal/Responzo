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
Convert the following code to mobile-first responsive HTML using Tailwind CSS. 
Maintain the layout and structure as closely as possible.

\`\`\`html
${code}
\`\`\`
`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("Gemini output:", text);

    return NextResponse.json({
      responsive: text,
      explanation: "Generated using Gemini Pro via Google Generative AI.",
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

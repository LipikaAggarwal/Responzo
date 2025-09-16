"use client";
import React, { useState } from "react";
import ChatBubble from "@/components/Chatbubble";
import PreviewCanvas from "@/components/Previewcanvas";
import { ArrowUpCircle } from "lucide-react"; // Import this at the top

export default function ChatPreview() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const [responsiveCode, setResponsiveCode] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/transform", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: input }),
    });

    const data = await res.json();

console.log("AI Response:", data);

const aiResponse = data.responsive || data.error || "Something went wrong.";
const explanation = data.explanation || "No explanation provided.";


setCode(input);
setResponsiveCode(aiResponse);

setMessages([
  ...newMessages,
  { sender: "ai", text: "Here's your responsive component:" },
  { sender: "ai", text: `\`\`\`html\n${aiResponse}\n\`\`\`` }, // display as code block
  { sender: "ai", text: `💡 ${explanation}` },
]);

    setLoading(false);
  };

  return (
    <>
      <div className="w-full md:w-1/2 p-6 overflow-y-auto h-screen flex flex-col gap-4 bg-gray-900 border-r border-gray-700">
        {messages.map((msg, i) => (
          <ChatBubble key={i} sender={msg.sender} text={msg.text} />
        ))}

    <div className="mt-auto relative">
  <textarea
    rows={3}
    className="w-full p-3 pr-12 rounded-2xl bg-gray-800 text-white font-mono"
    placeholder="Paste code or write instructions..."
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    }}
  />
  <button
    onClick={sendMessage}
    disabled={loading || !input.trim()}
    className="absolute bottom-4 right-3 text-gray-200"
  >
    <ArrowUpCircle size={28} className={`${loading ? "animate-spin" : ""}`} />
  </button>
</div>
      </div>

      {/* Canvas right panel */}
      <PreviewCanvas input={code} responsive={responsiveCode} />
    </>
  );
}

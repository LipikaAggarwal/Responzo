"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Code2,
  Eye,
  Smartphone,
  FileDown,
  BookOpenCheck,
  ArrowRight,
} from "lucide-react";

export default function Main() {
  return (
    <main className="w-full ">
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 py-24">
        {/* Heading */}
        <div className="text-center space-y-6 mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400 drop-shadow-lg">
            <span className="inline-flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
              Responzo
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Transform raw HTML/JSX into clean, responsive Tailwind CSS code with real-time preview and AI insights.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Feature
            icon={<Code2 className="text-blue-400" />}
            text="Paste your raw component code (HTML or JSX)."
          />
          <Feature
            icon={<Eye className="text-green-400" />}
            text="Live preview of both the original and responsive versions."
          />
          <Feature
            icon={<Smartphone className="text-purple-400" />}
            text="Resize preview window for desktop, tablet, or mobile."
          />
          <Feature
            icon={<FileDown className="text-teal-400" />}
            text="Copy or export responsive code easily."
          />
          <Feature
            icon={<BookOpenCheck className="text-pink-400" />}
            text="AI-generated layout explanation to help you learn."
          />
        </div>

        {/* CTA */}
        <div className="text-center mt-24">
          <Link href="/responzo">
          <button className="group inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105">
            Get Started
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          </Link>
        </div>
      </div>
    </main>
  );
}

function Feature({ icon, text }) {
  return (
    <div className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur border border-white/10 rounded-xl shadow hover:shadow-lg transition-all">
      <div className="p-2 bg-white/10 rounded-lg">{icon}</div>
      <p className="text-gray-300 text-base leading-relaxed">{text}</p>
    </div>
  );
}

"use client";
import React, { useState, useRef, useEffect } from "react";

const devices = [
  { name: "Desktop", key: "desktop", size: "1920 x 1080", width: 1200 },
  { name: "Tablet", key: "tablet", size: "768 x 1024", width: 768 },
  { name: "Phone", key: "phone", size: "375 x 812", width: 375 },
];

const deviceMinMax = {
  desktop: { min: 800, max: 1920 },
  tablet: { min: 600, max: 1024 },
  phone: { min: 320, max: 812 },
};

export default function Responsive() {
  const [input, setInput] = useState(""); // Start with empty input
  const [responsive, setResponsive] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewSize, setPreviewSize] = useState(devices[0].key);
  const [copied, setCopied] = useState(false);
  const [boxWidth, setBoxWidth] = useState(devices[0].width);

  const boxRef = useRef(null);
  const isDragging = useRef(false);

  const handleTransform = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResponsive(""); // Clear previous result
    setExplanation("");
    const res = await fetch("/api/transform", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: input }),
    });
    const data = await res.json();
    setResponsive(data.responsive || "");
    setExplanation(data.explanation || "");
    setLoading(false);
  };

  const handleDeviceChange = (e) => {
    const key = e.target.value;
    setPreviewSize(key);
    setBoxWidth(devices.find((d) => d.key === key).width);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
    document.body.style.cursor = "ew-resize";
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.body.style.cursor = "";
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const min = deviceMinMax[previewSize].min;
    const max = deviceMinMax[previewSize].max;
    const boxLeft = boxRef.current.getBoundingClientRect().left;
    let newWidth = e.clientX - boxLeft;
    newWidth = Math.max(min, Math.min(max, newWidth));
    setBoxWidth(newWidth);
  };

  useEffect(() => {
    const move = (e) => handleMouseMove(e);
    const up = () => handleMouseUp();
    if (isDragging.current) {
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    }
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  });

  const handleCopy = () => {
    if (!responsive) return;
    navigator.clipboard.writeText(responsive);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="w-full mt-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Code Input Panel */}
          <div className="w-full md:w-1/2 bg-gray-800 border border-gray-700 rounded-xl p-4 space-y-4">
            <label className="block text-gray-300 font-medium text-sm">Paste your HTML/JSX Code</label>
            <textarea
              className="w-full h-64 p-3 border border-gray-700 bg-gray-900 text-white rounded-lg font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste or write your HTML/JSX code here..."
            />
            <button
              className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              onClick={handleTransform}
              disabled={loading || !input.trim()}
            >
              {loading ? "Transforming..." : "Generate Responsive Version"}
            </button>
          </div>

          {/* Right: Canvas Preview Panel */}
          <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 border border-gray-700 rounded-xl shadow-md p-4 flex flex-col relative">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-sm font-semibold text-gray-800 dark:text-white">Live Preview (Responsive)</h2>
              <button
                onClick={handleCopy}
                className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                disabled={!responsive}
              >
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
            {/* Device Selector */}
            <div className="mb-2 flex items-center gap-2">
              <label htmlFor="device" className="font-medium text-gray-700 dark:text-gray-200">Preview as:</label>
              <select
                id="device"
                className="border rounded px-2 py-1"
                value={previewSize}
                onChange={handleDeviceChange}
              >
                {devices.map(device => (
                  <option key={device.key} value={device.key}>
                    {device.name}
                  </option>
                ))}
              </select>
              <span className="text-xs text-gray-500 ml-2">
                {devices.find(d => d.key === previewSize).size}
              </span>
            </div>
            {/* Draggable Preview Box */}
                       <div
              ref={boxRef}
              className="border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-950 p-4 min-h-[200px] overflow-auto shadow-inner relative ml-0"
              style={{
                width: `${boxWidth}px`,
                transition: isDragging.current ? "none" : "width 0.3s",
                userSelect: isDragging.current ? "none" : "auto",
              }}
            >
              {/* Show responsive code if available, else input */}
              <div dangerouslySetInnerHTML={{ __html: input }} />
              {/* ...drag handle etc... */}
            </div>
              {/* Drag Handle (right edge only) */}
              <div
                onMouseDown={handleMouseDown}
                className="absolute top-0 right-0 h-full w-4 flex items-center justify-center cursor-ew-resize select-none"
                style={{
                  zIndex: 10,
                  background: "linear-gradient(to left, #e0e0e0 60%, transparent 100%)",
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: "8px",
                }}
                title="Drag to resize"
              >
                <svg width="12" height="32" viewBox="0 0 12 32" fill="none">
                  <path d="M3 16L9 10M3 16L9 22" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
      
            {/* Responsive Code Output */}
            {responsive && (
              <div className="mt-6">
                <label className="block text-gray-700 dark:text-gray-200 font-medium text-sm mb-1">Responsive Code</label>
                <pre className="bg-gray-100 dark:bg-gray-800 text-xs rounded p-3 overflow-x-auto border border-gray-200 dark:border-gray-700">
                  {responsive}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Explanation Section */}
        {explanation && (
          <div className="mt-8 p-4 bg-yellow-200 text-gray-900 border-l-4 border-yellow-500 rounded">
            <h3 className="font-semibold mb-2">AI Explanation</h3>
            <p className="text-sm">{explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
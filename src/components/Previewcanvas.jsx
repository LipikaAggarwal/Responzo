import React, { useState } from "react";
import {
  LayoutDashboard,
  MonitorSmartphone,
  Code2,
  Copy,
  Eye,
} from "lucide-react";

export default function PreviewCanvas({ input, responsive }) {
  const [show, setShow] = useState(true);
  const [showResponsive, setShowResponsive] = useState(true);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const previewHTML = showResponsive ? responsive : input;
  const codeToCopy = showResponsive ? responsive : input;

  const handleCopy = () => {
    if (!codeToCopy) return;
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  if (!show) {
    return (
      <div className="w-full text-center p-4 bg-gray-800">
        <button
          onClick={() => setShow(true)}
          className="inline-flex items-center gap-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition"
          title="Open Canvas"
        >
          <LayoutDashboard className="w-4 h-4" />
          Show Canvas
        </button>
      </div>
    );
  }

  return (
    <div className="w-full md:w-1/2 h-screen overflow-auto bg-gray-800 text-white p-4 relative border-l border-gray-700">
      {/* Top Controls */}
      <div className="flex justify-end items-center mb-3">
        {/* Toggle Responsive/Original */}
        <button
          onClick={() => setShowResponsive(!showResponsive)}
          className="hover:bg-gray-700 p-1 rounded"
          title={showResponsive ? "Show Original" : "Show Responsive"}
        >
          {showResponsive ? <MonitorSmartphone size={18} /> : <Eye size={18} />}
        </button>

        {/* Show Code */}
        <button
          onClick={() => setShowCode(!showCode)}
          className="hover:bg-gray-700 p-1 rounded"
          title="Show Code"
        >
          <Code2 size={18} />
        </button>

        {/* Copy */}
        <button
          onClick={handleCopy}
          className="hover:bg-gray-700 p-1 rounded"
          title={copied ? "Copied!" : "Copy Code"}
        >
          <Copy size={18} />
        </button>

        {/* Canvas Icon (acts as close) */}
        <button
          onClick={() => setShow(false)}
          className="hover:bg-gray-700 p-1 rounded ml-2"
          title="Close Canvas"
        >
          <LayoutDashboard size={18} />
        </button>
      </div>

      {/* Show only code if showCode is true */}
      {showCode ? (
        <div className="mt-4">
          <label className="text-sm font-semibold mb-1 block">
            {showResponsive ? (
              <>
                <MonitorSmartphone className="inline mr-1" size={14} />
                Responsive Code
              </>
            ) : (
              <>
                <Eye className="inline mr-1" size={14} />
                Original Code
              </>
            )}
          </label>
          <pre className="bg-gray-900 text-green-300 p-3 rounded-lg text-xs overflow-auto border border-gray-600 min-h-[300px]">
            {codeToCopy}
          </pre>
        </div>
      ) : (
        // Preview
        <div
          className="bg-white text-black p-4 rounded shadow-inner min-h-[300px]"
          dangerouslySetInnerHTML={{ __html: previewHTML }}
        />
      )}
    </div>
  );
}
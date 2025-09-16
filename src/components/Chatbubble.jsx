export default function ChatBubble({ sender, text }) {
  const isUser = sender === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs p-3 rounded-full text-sm ${
          isUser
            ? "bg-gray-700 text-gray-100"
            : " text-gray-100"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

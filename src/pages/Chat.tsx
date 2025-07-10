import { useState, useEffect } from "react";
import StepNavigation from "../components/StepNavigation";
import { useApp } from "../context/AppContext";
import { summarizeData } from "../utils/openai";


export default function Chat() {
  const { csvPreview, summary, setSummary } = useApp();
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([
    { role: "assistant", text: "Hi! How can I help you with your analysis?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(m => [...m, { role: "user", text: userMsg }]);
    setInput("");

    if (csvPreview && !summary) {
      setLoading(true);
      try {
        const sum = await summarizeData(csvPreview);
        setSummary(sum);
        setMessages(m => [...m, { role: "assistant", text: sum }]);
      } catch {
        setMessages(m => [
          ...m,
          { role: "assistant", text: "Failed to summarise data." },
        ]);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    if (!summary) return;
    setMessages(m => {
      return m.some(msg => msg.text === summary) ? m : [...m, { role: "assistant", text: summary }];
    });
  }, [summary]);

  return (
    <div className="rounded-2xl shadow-lg bg-white p-6 max-w-xl mx-auto flex flex-col h-[60vh]">
      <h2 className="text-xl font-bold mb-4">Assistant Chat</h2>
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded ${msg.role === "user" ? "bg-blue-100 text-right ml-auto" : "bg-gray-100"}`}
          >
            <span className="block text-xs font-semibold mb-1">{msg.role}</span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 rounded border p-2"
          placeholder="Type your message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="rounded px-4 bg-blue-600 text-white font-semibold disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Summarizing…" : "Send"}
        </button>
      </div>
      <StepNavigation prev={{ to: "/plan" }} next={{ to: "/report" }} />
    </div>
  );
}

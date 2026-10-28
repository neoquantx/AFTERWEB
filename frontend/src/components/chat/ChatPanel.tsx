import React, { useState } from "react";
import styles from "./ChatPanel.module.css";
import { useAppStore } from "../../stores/useAppStore";
import { sendChatMessage } from "../../lib/api";
import { ChatMessageData } from "../../types/chat";
import { CitationChip } from "./CitationChip";

const STARTERS = [
  "What is this page linking to?",
  "Which destinations are missing?",
  "What can we prove about this missing link?",
  "What is still unknown?"
];

export const ChatPanel: React.FC = () => {
  const { isChatOpen, setChatOpen, selectedNode } = useAppStore();
  const [messages, setMessages] = useState<ChatMessageData[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "Greetings. I am the local archive curator. Ask me about historical pages, observed hyperlink paths, or what is provable about missing destinations. I never invent lost history."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isChatOpen) return null;

  const handleSubmit = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessageData = {
      id: `usr_${Date.now()}`,
      sender: "user",
      text: textToSend
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendChatMessage(textToSend, selectedNode?.id);
      const assistantMsg: ChatMessageData = {
        id: `ast_${Date.now()}`,
        sender: "assistant",
        text: res.answer,
        citations: res.citations,
        abstained: res.abstained,
        latency_ms: res.latency_ms
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: "assistant",
          text: "Local inference failed or timed out. Please check that Ollama is running.",
          abstained: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className={styles.chatPanel}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <span className={styles.title}>Local Curator</span>
          <span className={styles.subtitle}>Open-weight Qwen3 • Loopback</span>
        </div>
        <button className={styles.closeBtn} onClick={() => setChatOpen(false)}>
          ✕
        </button>
      </div>

      <div className={styles.messages}>
        {messages.map((m) => (
          <div
            key={m.id}
            className={`${styles.message} ${
              m.sender === "user" ? styles.userMessage : styles.assistantMessage
            } ${m.abstained ? styles.abstained : ""}`}
          >
            <div>{m.text}</div>

            {m.citations && m.citations.length > 0 && (
              <div className={styles.citationRow}>
                <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Supporting Evidence:</span>
                {m.citations.map((c) => (
                  <CitationChip key={c.id} citation={c} />
                ))}
              </div>
            )}

            {m.latency_ms && (
              <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", alignSelf: "flex-end" }}>
                {m.latency_ms}ms
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className={`${styles.message} ${styles.assistantMessage}`}>
            <span style={{ fontStyle: "italic", color: "var(--text-muted)" }}>
              Retrieving evidence and consulting local model...
            </span>
          </div>
        )}
      </div>

      <div className={styles.starters}>
        <span className={styles.startersLabel}>Suggested Queries</span>
        <div className={styles.starterList}>
          {STARTERS.map((s, idx) => (
            <button
              key={idx}
              className={styles.starterBtn}
              onClick={() => handleSubmit(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <form
        className={styles.inputForm}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(input);
        }}
      >
        <input
          className={styles.inputField}
          placeholder={selectedNode ? `Ask about ${selectedNode.label}...` : "Ask about early web history..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className={styles.sendBtn} type="submit" disabled={loading || !input.trim()}>
          Ask
        </button>
      </form>
    </aside>
  );
};

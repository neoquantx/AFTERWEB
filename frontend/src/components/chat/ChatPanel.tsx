import React, { useState } from "react";
import styles from "./ChatPanel.module.css";
import { useAppStore } from "../../stores/useAppStore";
import { useHealth } from "../../hooks/useHealth";
import { sendChatMessage } from "../../lib/api";
import { ChatMessageData } from "../../types/chat";
import { CitationChip } from "./CitationChip";

const STARTERS = [
  "What is this page linking to?",
  "Which destinations are missing?",
  "What can we prove about this missing link?",
  "What remains unverified in this sector?"
];

export const ChatPanel: React.FC = () => {
  const { isChatOpen, setChatOpen, selectedNode } = useAppStore();
  const { health } = useHealth();
  const [messages, setMessages] = useState<ChatMessageData[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "Hello explorer! I am the Ghost Archivist. I explore exclusively from our indexed historical web snapshots, trace real hyperlink trails, and keep digital archaeology honest. If a destination is missing or unverified, I will tell you openly."
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
          text: "Local inference failed or timed out. Please verify Ollama is running locally on port 11434.",
          abstained: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const activeModelDisplay = health?.model || "qwen3:4b";

  return (
    <aside className={styles.chatPanel}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <div className={styles.title}>
            <span>🔮</span>
            <span>Ghost Archivist</span>
          </div>
          <div className={styles.subtitle}>
            <span className={styles.statusPip} />
            <span>MODEL: {activeModelDisplay} • 127.0.0.1</span>
          </div>
        </div>
        <button
          className={styles.closeBtn}
          onClick={() => setChatOpen(false)}
          title="Close Ghost Archivist"
          aria-label="Close Ghost Archivist"
        >
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
            {m.abstained && (
              <div className={styles.abstainedNotice}>
                <span>👻</span>
                <span>Evidentiary Gap (Honest Abstention)</span>
              </div>
            )}

            <div className={styles.messageText}>{m.text}</div>

            {m.citations && m.citations.length > 0 && (
              <div className={styles.citationRow}>
                <span className={styles.citationLabel}>
                  CITED EXCERPTS:
                </span>
                {m.citations.map((c) => (
                  <CitationChip key={c.id} citation={c} />
                ))}
              </div>
            )}

            {m.latency_ms && (
              <div className={styles.metaRow}>
                <span>Local Inference</span>
                <span>•</span>
                <span>{m.latency_ms}ms</span>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className={`${styles.message} ${styles.assistantMessage}`}>
            <span className={styles.thinkingText}>
              Consulting local FTS5 archive &amp; {activeModelDisplay}...
            </span>
          </div>
        )}
      </div>

      <div className={styles.starters}>
        <span className={styles.startersLabel}>Field Journal Prompts</span>
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
          placeholder={selectedNode ? `Ask about ${selectedNode.label}...` : "Ask about early-web links and archives..."}
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

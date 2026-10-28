import React from "react";
import styles from "./ReadinessBanner.module.css";
import { useHealth } from "../../hooks/useHealth";

export const ReadinessBanner: React.FC = () => {
  const { health, loading, error } = useHealth();

  if (loading) {
    return (
      <div className={styles.banner}>
        <span className={styles.loadingText}>Connecting to local archive engine...</span>
        <span className={styles.privacyTag}>🔒 Local-First Digital Archive</span>
      </div>
    );
  }

  if (error || !health) {
    return (
      <div className={styles.banner}>
        <div className={styles.statuses}>
          <div className={styles.item}>
            <span className={`${styles.dot} ${styles.dotRed}`} />
            <span>Archive Server: Offline (127.0.0.1:8000)</span>
          </div>
        </div>
        <span className={styles.privacyTag}>Offline Mode</span>
      </div>
    );
  }

  const modelStatusClass = health.model_available ? styles.dotGreen : styles.dotYellow;

  return (
    <div className={styles.banner}>
      <div className={styles.statuses}>
        <div className={styles.item}>
          <span className={`${styles.dot} ${health.api === "ok" ? styles.dotGreen : styles.dotRed}`} />
          <span>Local Engine (127.0.0.1:8000)</span>
        </div>
        <div className={styles.item}>
          <span className={`${styles.dot} ${health.database === "ready" ? styles.dotGreen : styles.dotYellow}`} />
          <span>FTS5 Archive Pack: {health.archive_pack || "surviving_web_v1"}</span>
        </div>
        <div className={styles.item}>
          <span className={`${styles.dot} ${modelStatusClass}`} />
          <span>Model: {health.model} ({health.ollama})</span>
        </div>
      </div>
      <div className={styles.privacyTag}>
        <span>🔒</span>
        <span>100% Private • Local-Only Intelligence</span>
      </div>
    </div>
  );
};

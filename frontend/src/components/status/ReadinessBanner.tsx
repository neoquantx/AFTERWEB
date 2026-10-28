import React from "react";
import styles from "./ReadinessBanner.module.css";
import { useHealth } from "../../hooks/useHealth";

export const ReadinessBanner: React.FC = () => {
  const { health, loading, error } = useHealth();

  if (loading) {
    return (
      <div className={styles.banner}>
        <span>Checking local subsystem status...</span>
      </div>
    );
  }

  if (error || !health) {
    return (
      <div className={styles.banner}>
        <div className={styles.statuses}>
          <div className={styles.item}>
            <span className={`${styles.dot} ${styles.red}`} />
            <span>FastAPI Backend: Unreachable</span>
          </div>
        </div>
        <span className={styles.privacyBadge}>Offline Safe</span>
      </div>
    );
  }

  return (
    <div className={styles.banner}>
      <div className={styles.statuses}>
        <div className={styles.item}>
          <span className={`${styles.dot} ${health.api === "ok" ? styles.green : styles.red}`} />
          <span>API: 127.0.0.1:8000</span>
        </div>
        <div className={styles.item}>
          <span className={`${styles.dot} ${health.database === "ready" ? styles.green : styles.yellow}`} />
          <span>DB: SQLite FTS5 ({health.archive_pack})</span>
        </div>
        <div className={styles.item}>
          <span className={`${styles.dot} ${health.model_available ? styles.green : styles.yellow}`} />
          <span>Model: {health.model} ({health.ollama})</span>
        </div>
      </div>
      <div className={styles.privacyBadge}>
        🔒 100% Local Inference & Storage
      </div>
    </div>
  );
};

import React from "react";
import styles from "./PageCard.module.css";
import { CityNodeData } from "../../types/city";
import { useAppStore } from "../../stores/useAppStore";

interface PageCardProps {
  node: CityNodeData;
}

export const PageCard: React.FC<PageCardProps> = ({ node }) => {
  const { setChatOpen } = useAppStore();

  return (
    <div className={styles.card}>
      <div className={styles.statusPill}>
        <span>🏡</span>
        <span>PRESERVED WEBPAGE SNAPSHOT</span>
      </div>

      <h3 className={styles.title}>{node.title}</h3>

      <div className={styles.section}>
        <span className={styles.metaLabel}>Original Web URI</span>
        <span className={styles.metaValue}>{node.original_url}</span>
      </div>

      {node.timestamp && (
        <div className={styles.section}>
          <span className={styles.metaLabel}>Archive Timestamp (Wayback CDX)</span>
          <span className={styles.metaValue}>
            {node.timestamp.slice(0, 4)}-{node.timestamp.slice(4, 6)}-{node.timestamp.slice(6, 8)} at {node.timestamp.slice(8, 10)}:{node.timestamp.slice(10, 12)} UTC
          </span>
        </div>
      )}

      {node.archive_url && (
        <a
          href={node.archive_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.actionBtn}
          title="Open raw capture on web.archive.org"
        >
          <span>Inspect Historical Snapshot</span>
          <span>↗</span>
        </a>
      )}

      <button
        className={styles.askBtn}
        onClick={() => setChatOpen(true)}
      >
        <span>🔮 Ask Ghost Archivist About This Page</span>
        <span>→</span>
      </button>
    </div>
  );
};

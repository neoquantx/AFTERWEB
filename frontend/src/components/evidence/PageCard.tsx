import React from "react";
import styles from "./PageCard.module.css";
import { CityNodeData } from "../../types/city";

interface PageCardProps {
  node: CityNodeData;
}

export const PageCard: React.FC<PageCardProps> = ({ node }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{node.title}</h3>
      <span className={styles.statusPill}>Status: {node.lookup_state}</span>

      <div className={styles.metaRow}>
        <span className={styles.metaLabel}>Original URL</span>
        <span className={styles.metaValue}>{node.original_url}</span>
      </div>

      {node.timestamp && (
        <div className={styles.metaRow}>
          <span className={styles.metaLabel}>Capture Timestamp</span>
          <span className={styles.metaValue}>{node.timestamp}</span>
        </div>
      )}

      {node.archive_url && (
        <a
          href={node.archive_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.actionBtn}
        >
          Inspect on Internet Archive ↗
        </a>
      )}
    </div>
  );
};

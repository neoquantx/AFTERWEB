import React from "react";
import styles from "./GhostPlotCard.module.css";
import { CityNodeData } from "../../types/city";
import { useAppStore } from "../../stores/useAppStore";

interface GhostPlotCardProps {
  node: CityNodeData;
}

export const GhostPlotCard: React.FC<GhostPlotCardProps> = ({ node }) => {
  const { setChatOpen } = useAppStore();

  return (
    <div className={styles.ghostCard}>
      <div className={styles.ghostBadge}>
        <span>👻</span>
        <span>FRIENDLY GHOST LOT • UNCAPTURED IN QUERY</span>
      </div>

      <h3 className={styles.heading}>
        <span>"{node.label}"</span>
      </h3>

      <div className={styles.notice}>
        <div className={styles.noticeTitle}>
          <span>✨</span>
          <strong>Honest Digital Archaeology</strong>
        </div>
        <p>
          A friendly ghost marks this lost destination! The checked archive index did not return a verified snapshot for this URL. This absence is <strong>not proof that the site never existed</strong>—it denotes an uncaptured lot in the historical web record.
        </p>
      </div>

      <div className={styles.section}>
        <span className={styles.metaLabel}>Observed Target Destination URL</span>
        <span className={styles.metaValue}>{node.original_url}</span>
      </div>

      <div className={styles.section}>
        <span className={styles.metaLabel}>Extracted Hyperlink Anchor Text</span>
        <span className={styles.metaValue}>"{node.label}"</span>
      </div>

      <div className={styles.section}>
        <span className={styles.metaLabel}>Archival Query Scope</span>
        <span className={styles.metaValue}>Wayback Machine CDX Index (Offline Pack)</span>
      </div>

      <button
        className={styles.askBtn}
        onClick={() => setChatOpen(true)}
      >
        <span>🔮 Ask Ghost Archivist What Can Be Proved</span>
        <span>→</span>
      </button>
    </div>
  );
};

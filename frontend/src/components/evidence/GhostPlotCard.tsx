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
      <h3 className={styles.heading}>
        <span>∅ Ghost Plot: {node.label}</span>
      </h3>

      <div className={styles.notice}>
        <strong>Archaeological Absence:</strong> No capture was found in the checked archive query.
        Absence in the checked index is not proof that the site never existed.
      </div>

      <div className={styles.metaRow}>
        <span className={styles.metaLabel}>Extracted Anchor Text</span>
        <span className={styles.metaValue}>"{node.label}"</span>
      </div>

      <div className={styles.metaRow}>
        <span className={styles.metaLabel}>Observed Target URL</span>
        <span className={styles.metaValue}>{node.original_url}</span>
      </div>

      <div className={styles.metaRow}>
        <span className={styles.metaLabel}>Lookup Status</span>
        <span className={styles.metaValue}>{node.lookup_state}</span>
      </div>

      <button
        className={styles.askBtn}
        onClick={() => setChatOpen(true)}
      >
        Ask Curator About This Missing Route ↗
      </button>
    </div>
  );
};

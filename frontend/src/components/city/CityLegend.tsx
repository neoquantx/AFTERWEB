import React, { useState } from "react";
import styles from "./CityLegend.module.css";

export const CityLegend: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`${styles.legend} ${collapsed ? styles.collapsed : ""}`}>
      <div className={styles.header} onClick={() => setCollapsed(!collapsed)}>
        <div className={styles.titleGroup}>
          <span className={styles.bookIcon}>📖</span>
          <span className={styles.title}>Village Field Guide</span>
        </div>
        <button
          className={styles.toggleBtn}
          aria-label={collapsed ? "Expand guide" : "Collapse guide"}
        >
          {collapsed ? "▲" : "▼"}
        </button>
      </div>

      {!collapsed && (
        <div className={styles.content}>
          <div className={styles.item}>
            <span className={styles.itemIcon}>🏡</span>
            <div>
              <strong className={styles.labelCaptured}>Preserved Cottage</strong>
              <div className={styles.subtext}>Verified historical web snapshot exists</div>
            </div>
          </div>

          <div className={styles.item}>
            <span className={styles.itemIcon}>👻</span>
            <div>
              <strong className={styles.labelGhost}>Friendly Ghost Plot</strong>
              <div className={styles.subtext}>Uncaptured link target; missing from query</div>
            </div>
          </div>

          <div className={styles.item}>
            <span className={styles.itemIcon}>🏮</span>
            <div>
              <strong className={styles.labelPath}>Lantern Trail</strong>
              <div className={styles.subtext}>Real HTML &lt;a&gt; hyperlink route preserved</div>
            </div>
          </div>

          <div className={styles.item}>
            <span className={styles.itemIcon}>┈┈</span>
            <div>
              <strong className={styles.labelGhostTrail}>Ghost Path</strong>
              <div className={styles.subtext}>Hyperlink leading to an uncaptured lot</div>
            </div>
          </div>

          <div className={styles.note}>
            <span>✨</span>
            <span>
              Absence is never fabricated. Lost destinations are marked by friendly ghosts, keeping history true.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from "react";
import styles from "./CityLegend.module.css";

export const CityLegend: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`${styles.legend} ${collapsed ? styles.collapsed : ""}`}>
      <div className={styles.header} onClick={() => setCollapsed(!collapsed)}>
        <div className={styles.titleGroup}>
          <span className={styles.bookIcon}>🧭</span>
          <span className={styles.title}>Village Field Guide</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.overlayTag}>Map Overlay</span>
          <button
            className={styles.toggleBtn}
            aria-label={collapsed ? "Expand guide" : "Collapse guide"}
          >
            {collapsed ? "▲" : "▼"}
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className={styles.content}>
          <div className={styles.item}>
            <span className={styles.swatchMint} />
            <div className={styles.itemInfo}>
              <strong className={styles.labelCaptured}>🏡 Preserved Cottage</strong>
              <span className={styles.subtext}>Living 1990s Web Archive</span>
            </div>
          </div>

          <div className={styles.item}>
            <span className={styles.swatchLilac} />
            <div className={styles.itemInfo}>
              <strong className={styles.labelGhost}>👻 Friendly Ghost Plot</strong>
              <span className={styles.subtext}>Uncaptured Hyperlink Lot</span>
            </div>
          </div>

          <div className={styles.item}>
            <span className={styles.swatchAmber} />
            <div className={styles.itemInfo}>
              <strong className={styles.labelPath}>🏮 Lantern Trail</strong>
              <span className={styles.subtext}>Extracted Pathway</span>
            </div>
          </div>

          <div className={styles.hintRow}>
            <span>✨</span>
            <span>Mouse Drag / Scroll to Orbit &amp; Zoom</span>
          </div>
        </div>
      )}
    </div>
  );
};

import React from "react";
import styles from "./Header.module.css";
import { useAppStore } from "../../stores/useAppStore";

export const Header: React.FC = () => {
  const { viewMode, setViewMode, isChatOpen, setChatOpen, reducedMotion, toggleReducedMotion } = useAppStore();

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.ghostIcon}>👻</div>
        <div className={styles.titleStack}>
          <span className={styles.logo}>AFTERWEB</span>
          <span className={styles.subtitle}>A Cozy Haunted Archive</span>
        </div>
      </div>

      <div className={styles.controls}>
        {/* View Switcher: 3D Village vs 2D Scrapbook */}
        <div className={styles.toggleGroup}>
          <button
            className={`${styles.toggleBtn} ${viewMode === "3d" ? styles.active : ""}`}
            onClick={() => setViewMode("3d")}
            title="Explore 3D Haunted Village"
          >
            <span>🏡</span>
            <span>3D Village</span>
          </button>
          <button
            className={`${styles.toggleBtn} ${viewMode === "2d" ? styles.active : ""}`}
            onClick={() => setViewMode("2d")}
            title="View 2D Field Dossier"
          >
            <span>📜</span>
            <span>2D Dossier</span>
          </button>
        </div>

        {/* Ambient Motion Toggle */}
        <button
          className={`${styles.actionBtn} ${reducedMotion ? styles.activeMotion : ""}`}
          onClick={toggleReducedMotion}
          title="Toggle Ambient Scene Motion"
        >
          <span>{reducedMotion ? "⏸️" : "✨"}</span>
          <span>{reducedMotion ? "Motion: Static" : "Motion: Gentle"}</span>
        </button>

        {/* Curator Assistant Trigger */}
        <button
          className={`${styles.actionBtn} ${styles.curatorBtn} ${isChatOpen ? styles.activeCurator : ""}`}
          onClick={() => setChatOpen(!isChatOpen)}
          title="Toggle Local Ghost Archivist"
        >
          <span>🔮</span>
          <span>Ghost Archivist</span>
          <span className={styles.statusPip} />
        </button>
      </div>
    </header>
  );
};

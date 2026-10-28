import React from "react";
import styles from "./Header.module.css";
import { useAppStore } from "../../stores/useAppStore";

export const Header: React.FC = () => {
  const { viewMode, setViewMode, isChatOpen, setChatOpen, reducedMotion, toggleReducedMotion } = useAppStore();

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <span className={styles.logo}>AFTERWEB</span>
        <span className={styles.badge}>Archaeology v1.0</span>
      </div>

      <div className={styles.controls}>
        <button
          className={`${styles.toggleBtn} ${viewMode === "3d" ? styles.active : ""}`}
          onClick={() => setViewMode("3d")}
          title="Switch to 3D Explorable City"
        >
          3D City
        </button>
        <button
          className={`${styles.toggleBtn} ${viewMode === "2d" ? styles.active : ""}`}
          onClick={() => setViewMode("2d")}
          title="Switch to 2D Graph & List View"
        >
          2D Map / List
        </button>

        <button
          className={`${styles.toggleBtn} ${reducedMotion ? styles.active : ""}`}
          onClick={toggleReducedMotion}
          title="Toggle Reduced Motion"
        >
          {reducedMotion ? "Motion: Off" : "Motion: On"}
        </button>

        <button
          className={`${styles.toggleBtn} ${isChatOpen ? styles.active : ""}`}
          onClick={() => setChatOpen(!isChatOpen)}
          title="Toggle Local Curator Assistant"
        >
          Curator AI
        </button>
      </div>
    </header>
  );
};

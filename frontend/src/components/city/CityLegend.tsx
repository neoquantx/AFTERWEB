import React from "react";
import styles from "./CityLegend.module.css";

export const CityLegend: React.FC = () => {
  return (
    <div className={styles.legend}>
      <span className={styles.title}>Archaeological Legend</span>
      <div className={styles.item}>
        <div className={styles.swatch} style={{ background: "var(--captured)" }} />
        <span>Captured Page (Archive verified)</span>
      </div>
      <div className={styles.item}>
        <div className={styles.swatch} style={{ border: "2px dashed var(--missing)", background: "transparent" }} />
        <span>Ghost Plot (Target uncaptured)</span>
      </div>
      <div className={styles.item}>
        <div className={styles.lineSwatch} />
        <span>Observed Hyperlink Route</span>
      </div>
    </div>
  );
};

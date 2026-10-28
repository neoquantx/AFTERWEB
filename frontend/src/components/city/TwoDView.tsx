import React from "react";
import styles from "./TwoDView.module.css";
import { useCityData } from "../../hooks/useCityData";
import { useAppStore } from "../../stores/useAppStore";
import { CityNodeData } from "../../types/city";

export const TwoDView: React.FC = () => {
  const { data, loading, error } = useCityData();
  const { setSelectedNode, selectedNode } = useAppStore();

  if (loading) return <div className={styles.container}>Loading historical registry...</div>;
  if (error || !data) return <div className={styles.container}>Failed to load registry: {error}</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Historical Registry (2D Fallback)</h2>

      {data.districts.map((district) => {
        const districtNodes = data.nodes.filter((n) => n.site_id === district.id);

        return (
          <section key={district.id} className={styles.districtSection}>
            <h3 className={styles.districtTitle}>{district.title} ({district.era_label})</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
              District ID: {district.slug} | Observed Nodes: {districtNodes.length}
            </p>

            <div className={styles.grid}>
              {districtNodes.map((node: CityNodeData) => {
                const isSelected = selectedNode?.id === node.id;
                const isGhost = node.node_type === "ghost_plot";

                return (
                  <button
                    key={node.id}
                    className={`${styles.card} ${isGhost ? styles.ghost : ""} ${isSelected ? styles.selected : ""}`}
                    onClick={() => setSelectedNode(node)}
                  >
                    <div className={styles.cardTitle}>{node.title || node.label}</div>
                    <div className={styles.url}>{node.original_url}</div>
                    <span className={`${styles.badge} ${isGhost ? styles.badge.ghost : styles.badge.captured}`}>
                      {node.lookup_state}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};

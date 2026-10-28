import React from "react";
import styles from "./TwoDView.module.css";
import { useCityData } from "../../hooks/useCityData";
import { useAppStore } from "../../stores/useAppStore";
import { CityNodeData } from "../../types/city";

export const TwoDView: React.FC = () => {
  const { data, loading, error } = useCityData();
  const { setSelectedNode, selectedNode } = useAppStore();

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <span>✨</span>
          <span>Opening the Archaeological Village Scrapbook...</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <span>Failed to open village records: {error}</span>
        </div>
      </div>
    );
  }

  const getDistrictIcon = (id: string) => {
    if (id.includes("spacejam")) return "🍿";
    if (id.includes("geocities")) return "🏠";
    return "🏛️";
  };

  return (
    <div className={styles.container}>
      <div className={styles.introBanner}>
        <h2 className={styles.heading}>
          <span>📜</span>
          <span>Village Field Scrapbook &amp; Dossier</span>
        </h2>
        <p className={styles.subheading}>
          An accessible, illustrated catalogue of surviving early-web digital cottages, observed hyperlink paths, and friendly ghost plots. Select any card to inspect its full archival provenance in the field journal drawer.
        </p>
      </div>

      {data.districts.map((district) => {
        const districtNodes = data.nodes.filter((n) => n.site_id === district.id);
        const capturedCount = districtNodes.filter((n) => n.node_type !== "ghost_plot").length;
        const ghostCount = districtNodes.filter((n) => n.node_type === "ghost_plot").length;

        return (
          <section key={district.id} className={styles.districtSection}>
            <div className={styles.districtHeader}>
              <div className={styles.districtTitle}>
                <span className={styles.districtIcon}>{getDistrictIcon(district.id)}</span>
                <span>{district.title}</span>
              </div>
              <div className={styles.districtMeta}>
                <span className={styles.counts}>
                  {capturedCount} Cottages • {ghostCount} Ghost Lots
                </span>
                <span className={styles.districtEra}>{district.era_label}</span>
              </div>
            </div>

            <div className={styles.grid}>
              {districtNodes.map((node: CityNodeData) => {
                const isSelected = selectedNode?.id === node.id;
                const isGhost = node.node_type === "ghost_plot";

                // Count outbound routes from this node
                const outboundRoutes = data.routes.filter((r) => r.source_node_id === node.id);

                return (
                  <button
                    key={node.id}
                    className={`${styles.card} ${isGhost ? styles.ghostCard : styles.cottageCard} ${isSelected ? styles.selected : ""}`}
                    onClick={() => setSelectedNode(node)}
                  >
                    <div className={styles.badgeRow}>
                      <span className={`${styles.badge} ${isGhost ? styles.ghostBadge : styles.capturedBadge}`}>
                        {isGhost ? "👻 GHOST LOT" : "🏡 PRESERVED SITE"}
                      </span>
                      {node.timestamp && (
                        <span className={styles.timestampBadge}>
                          {node.timestamp.slice(0, 4)} Snapshot
                        </span>
                      )}
                    </div>

                    <div className={styles.cardTitle}>
                      {isGhost ? `"${node.label}"` : (node.title || node.label)}
                    </div>

                    <div className={styles.url} title={node.original_url}>
                      {node.original_url}
                    </div>

                    {outboundRoutes.length > 0 && (
                      <div className={styles.routesPreview}>
                        <span className={styles.routesLabel}>🏮 Preserved Hyperlink Trails:</span>
                        <span className={styles.routesCount}>
                          {outboundRoutes.length} outgoing paths →
                        </span>
                      </div>
                    )}
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

import React from "react";
import styles from "./PageCard.module.css";
import { CityNodeData } from "../../types/city";
import { useAppStore } from "../../stores/useAppStore";
import { useCityData } from "../../hooks/useCityData";

interface PageCardProps {
  node: CityNodeData;
}

export const PageCard: React.FC<PageCardProps> = ({ node }) => {
  const { setChatOpen, setSelectedRoute } = useAppStore();
  const { data } = useCityData();

  // Find outbound routes from this node
  const outboundRoutes = data?.routes.filter((r) => r.source_node_id === node.id) || [];

  return (
    <div className={styles.card}>
      <div className={styles.statusPill}>
        <span>🏡</span>
        <span>PRESERVED WEBPAGE SNAPSHOT</span>
      </div>

      <h3 className={styles.title}>{node.title}</h3>

      <div className={styles.section}>
        <span className={styles.metaLabel}>Original Web URI</span>
        <span className={styles.metaValue}>{node.original_url}</span>
      </div>

      {node.timestamp && (
        <div className={styles.section}>
          <span className={styles.metaLabel}>Archive Timestamp (Wayback CDX)</span>
          <span className={styles.metaValue}>
            {node.timestamp.slice(0, 4)}-{node.timestamp.slice(4, 6)}-{node.timestamp.slice(6, 8)} at {node.timestamp.slice(8, 10)}:{node.timestamp.slice(10, 12)} UTC
          </span>
        </div>
      )}

      {/* Provenance Box from Stitch Screen 2 */}
      <div className={styles.provenanceBox}>
        <span className={styles.provenanceTitle}>🏛️ Local Archival Provenance</span>
        <p className={styles.provenanceText}>
          Snapshot indexed in local SQLite FTS5 database. Deterministic provenance extracted from authentic historical web crawls.
        </p>
      </div>

      <div className={styles.btnRow}>
        {node.archive_url && (
          <a
            href={node.archive_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionBtn}
            title="Open raw capture on web.archive.org"
          >
            <span>Inspect Historical Snapshot</span>
            <span>↗</span>
          </a>
        )}

        <button
          className={styles.askBtn}
          onClick={() => setChatOpen(true)}
        >
          <span>🔮 Ask Ghost Archivist About This Page</span>
          <span>→</span>
        </button>
      </div>

      {/* Outbound Hyperlink Trails from Stitch Screen 2 */}
      {outboundRoutes.length > 0 && (
        <div className={styles.trailsSection}>
          <div className={styles.trailsHeader}>
            <span className={styles.metaLabel}>Observed Hyperlink Trails ({outboundRoutes.length} Conduits)</span>
          </div>
          <div className={styles.trailsList}>
            {outboundRoutes.map((route) => {
              const isMissing = route.lookup_state === "not_found_in_query";
              return (
                <button
                  key={route.id}
                  className={styles.trailItem}
                  onClick={() => setSelectedRoute(route)}
                >
                  <span className={styles.trailAnchor}>"{route.anchor_text}"</span>
                  <span className={isMissing ? styles.trailBadgeMissing : styles.trailBadgeCaptured}>
                    {isMissing ? "👻 404 Spirit" : "● Verified"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

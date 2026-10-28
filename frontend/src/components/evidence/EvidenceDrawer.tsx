import React from "react";
import styles from "./EvidenceDrawer.module.css";
import { useAppStore } from "../../stores/useAppStore";
import { useCityData } from "../../hooks/useCityData";
import { PageCard } from "./PageCard";
import { GhostPlotCard } from "./GhostPlotCard";

export const EvidenceDrawer: React.FC = () => {
  const { selectedNode, setSelectedNode, selectedRoute, setSelectedRoute, activeCitation } = useAppStore();
  const { data } = useCityData();

  const handleClear = () => {
    setSelectedNode(null);
    setSelectedRoute(null);
  };

  const getDistrictIcon = (siteId: string) => {
    if (siteId.includes("spacejam")) return "🍿";
    if (siteId.includes("geocities")) return "🏠";
    return "🏛️";
  };

  if (!selectedNode && !selectedRoute && !activeCitation) {
    return (
      <aside className={styles.drawer}>
        <div className={styles.scannerEmptyState}>
          <div className={styles.journalBadge}>
            <span>📖</span>
            <span>Explorer's Field Journal</span>
          </div>

          <h3 className={styles.scannerTitle}>Explore the Haunted Internet Village</h3>
          <p className={styles.scannerDesc}>
            Select any digital cottage to read its preserved 1990s web text, follow real historical hyperlink trails, or visit friendly ghost plots marking lost destinations.
          </p>

          <div className={styles.quickJumpSection}>
            <span className={styles.quickJumpLabel}>Curated Village Sites</span>
            {data?.nodes.map((node) => {
              const isGhost = node.node_type === "ghost_plot";
              return (
                <button
                  key={node.id}
                  className={`${styles.quickJumpBtn} ${isGhost ? styles.ghostJumpBtn : styles.cottageJumpBtn}`}
                  onClick={() => setSelectedNode(node)}
                >
                  <div className={styles.jumpHeader}>
                    <span className={styles.jumpIcon}>{isGhost ? "👻" : getDistrictIcon(node.site_id)}</span>
                    <span className={styles.quickJumpTitle}>
                      {isGhost ? node.label : node.title}
                    </span>
                  </div>
                  <span className={styles.quickJumpSub}>
                    {isGhost ? "Ghost Plot • Uncaptured Destination" : `Preserved Cottage • ${node.timestamp ? node.timestamp.slice(0, 4) : "1996"}`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={styles.drawer}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <span>📖</span>
          <span>Archival Evidence Dossier</span>
        </div>
        <button
          className={styles.closeBtn}
          onClick={handleClear}
          title="Clear Selection"
          aria-label="Clear Selection"
        >
          ✕
        </button>
      </div>

      {selectedNode && (
        selectedNode.node_type === "ghost_plot" ? (
          <GhostPlotCard node={selectedNode} />
        ) : (
          <PageCard node={selectedNode} />
        )
      )}

      {selectedRoute && !selectedNode && (
        <div className={styles.routeDossier}>
          <div className={styles.routeBadge}>
            <span>🏮</span>
            <span>Observed Hyperlink Trail</span>
          </div>
          <h3 className={styles.routeAnchor}>
            "{selectedRoute.anchor_text}"
          </h3>
          <div className={styles.routeField}>
            <span className={styles.metaLabel}>Target URL</span>
            <span className={styles.metaValue}>{selectedRoute.target_url}</span>
          </div>
          <div className={styles.routeField}>
            <span className={styles.metaLabel}>Destination Status</span>
            <span className={selectedRoute.lookup_state === "not_found_in_query" ? styles.statusMissing : styles.statusCaptured}>
              {selectedRoute.lookup_state === "not_found_in_query"
                ? "👻 Ghost Plot • Not captured in checked archive"
                : "🏡 Preserved Cottage • Historical capture exists"}
            </span>
          </div>
        </div>
      )}

      {activeCitation && (
        <div className={styles.citationHighlight}>
          <div className={styles.citationLabel}>
            <span>📌</span>
            <span>Cited Evidence Excerpt [E{activeCitation.chunk_id}]</span>
          </div>
          <p className={styles.citationExcerpt}>"{activeCitation.excerpt}"</p>
        </div>
      )}
    </aside>
  );
};

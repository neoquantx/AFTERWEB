import React from "react";
import styles from "./EvidenceDrawer.module.css";
import { useAppStore } from "../../stores/useAppStore";
import { PageCard } from "./PageCard";
import { GhostPlotCard } from "./GhostPlotCard";

export const EvidenceDrawer: React.FC = () => {
  const { selectedNode, setSelectedNode, activeCitation } = useAppStore();

  if (!selectedNode && !activeCitation) {
    return (
      <aside className={styles.drawer}>
        <div className={styles.emptyState}>
          <div style={{ fontSize: "2rem" }}>🏛️</div>
          <p>Select any building, route, or ghost plot in the city to inspect its archival provenance.</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className={styles.drawer}>
      <div className={styles.header}>
        <span className={styles.headerTitle}>Archival Provenance</span>
        <button
          className={styles.closeBtn}
          onClick={() => setSelectedNode(null)}
          title="Clear Selection"
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

      {activeCitation && (
        <div className={styles.citationHighlight}>
          <div className={styles.citationLabel}>Cited Evidence: [{activeCitation.id}]</div>
          <div className={styles.citationExcerpt}>"{activeCitation.excerpt}"</div>
          <div style={{ marginTop: "0.5rem", fontSize: "0.75rem", color: "var(--text-muted)" }}>
            Source: {activeCitation.page_title} ({activeCitation.capture_timestamp})
          </div>
        </div>
      )}
    </aside>
  );
};

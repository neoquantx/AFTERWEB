import React from "react";
import styles from "./CitationChip.module.css";
import { CitationData } from "../../types/evidence";
import { useAppStore } from "../../stores/useAppStore";

interface CitationChipProps {
  citation: CitationData;
}

export const CitationChip: React.FC<CitationChipProps> = ({ citation }) => {
  const { setActiveCitation } = useAppStore();

  return (
    <button
      className={styles.chip}
      onClick={() => setActiveCitation(citation)}
      title={`Open verified archival excerpt from: ${citation.page_title}`}
    >
      <span>[{citation.id}]</span>
    </button>
  );
};

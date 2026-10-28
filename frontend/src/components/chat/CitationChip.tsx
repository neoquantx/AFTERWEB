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
      title={`Open supporting evidence: ${citation.page_title}`}
    >
      [{citation.id}]
    </button>
  );
};

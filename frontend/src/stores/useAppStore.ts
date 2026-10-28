import { create } from "zustand";
import { CityNodeData, CityRouteData } from "../types/city";
import { CitationData } from "../types/evidence";

interface AppState {
  viewMode: "3d" | "2d";
  selectedNode: CityNodeData | null;
  selectedRoute: CityRouteData | null;
  activeCitation: CitationData | null;
  isChatOpen: boolean;
  reducedMotion: boolean;

  setViewMode: (mode: "3d" | "2d") => void;
  setSelectedNode: (node: CityNodeData | null) => void;
  setSelectedRoute: (route: CityRouteData | null) => void;
  setActiveCitation: (citation: CitationData | null) => void;
  setChatOpen: (open: boolean) => void;
  toggleReducedMotion: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  viewMode: "3d",
  selectedNode: null,
  selectedRoute: null,
  activeCitation: null,
  isChatOpen: true,
  reducedMotion: false,

  setViewMode: (mode) => set({ viewMode: mode }),
  setSelectedNode: (node) => set({ selectedNode: node, activeCitation: null }),
  setSelectedRoute: (route) => set({ selectedRoute: route }),
  setActiveCitation: (citation) => set({ activeCitation: citation }),
  setChatOpen: (open) => set({ isChatOpen: open }),
  toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
}));

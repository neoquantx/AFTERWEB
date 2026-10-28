import React from "react";
import styles from "./App.module.css";
import { Header } from "./components/layout/Header";
import { ReadinessBanner } from "./components/status/ReadinessBanner";
import { CityCanvas } from "./components/city/CityCanvas";
import { TwoDView } from "./components/city/TwoDView";
import { EvidenceDrawer } from "./components/evidence/EvidenceDrawer";
import { ChatPanel } from "./components/chat/ChatPanel";
import { useAppStore } from "./stores/useAppStore";

export const App: React.FC = () => {
  const { viewMode } = useAppStore();

  return (
    <div className={styles.appLayout}>
      <Header />
      <ReadinessBanner />
      <main className={styles.mainContent}>
        {viewMode === "3d" ? <CityCanvas /> : <TwoDView />}
        <EvidenceDrawer />
        <ChatPanel />
      </main>
    </div>
  );
};

export default App;

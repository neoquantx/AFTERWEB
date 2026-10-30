import React from "react";
import { Canvas } from "@react-three/fiber";
import styles from "./CityCanvas.module.css";
import { useCityData } from "../../hooks/useCityData";
import { useAppStore } from "../../stores/useAppStore";
import { Building } from "../../scene/Building";
import { GhostPlot } from "../../scene/GhostPlot";
import { RouteLine } from "../../scene/RouteLine";
import { Ground } from "../../scene/Ground";
import { DataMotes } from "../../scene/DataMotes";
import { CameraController } from "../../scene/CameraController";
import { CityLegend } from "./CityLegend";
import { CityNodeData } from "../../types/city";

export const CityCanvas: React.FC = () => {
  const { data, loading, error } = useCityData();
  const { setSelectedNode } = useAppStore();

  if (loading) {
    return (
      <div className={styles.canvasContainer}>
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner} />
          <span>✨ Awakening the Haunted Village...</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.canvasContainer}>
        <div className={styles.loadingOverlay}>
          <span style={{ color: "var(--danger)" }}>Could not reach the village archive: {error}</span>
        </div>
      </div>
    );
  }

  const nodeMap = new Map<string, CityNodeData>();
  data.nodes.forEach((n) => nodeMap.set(n.id, n));

  const handleJumpToSector = (districtId: string) => {
    const targetNode = data.nodes.find((n) => n.site_id === districtId && n.node_type !== "ghost_plot");
    if (targetNode) {
      setSelectedNode(targetNode);
    }
  };

  const getDistrictIcon = (id: string) => {
    if (id.includes("spacejam")) return "🍿";
    if (id.includes("geocities")) return "🏠";
    return "🏛️";
  };

  return (
    <div className={styles.canvasContainer}>
      {/* Floating Sector Quick-Jump HUD (Stitch Top-Left Village Sectors // Active Grid) */}
      <div className={styles.sectorHud}>
        <div className={styles.sectorHudHeader}>
          <span className={styles.sectorLabel}>VILLAGE SECTORS // ACTIVE GRID</span>
          <span className={styles.syncBadge}>
            <span className={styles.syncDot} />
            <span>Beacon Synced</span>
          </span>
        </div>
        <div className={styles.sectorBtnGroup}>
          {data.districts.map((d) => (
            <button
              key={d.id}
              className={styles.sectorBtn}
              onClick={() => handleJumpToSector(d.id)}
              title={`Visit ${d.title}`}
            >
              <span className={styles.sectorIcon}>{getDistrictIcon(d.id)}</span>
              <div className={styles.sectorTextGroup}>
                <span className={styles.sectorTitle}>{d.title.split("(")[0].trim()}</span>
                <span className={styles.sectorTag}>
                  {d.id.includes("spacejam") ? "Cinema Cottage" : d.id.includes("geocities") ? "Personal Web" : "Foundational Root"}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Canvas
        camera={{ position: [0, 18, 38], fov: 45, near: 0.1, far: 1000 }}
        dpr={[1, 1.5]}
        style={{ background: "#191c2b" }}
      >
        {/* Dreamy Twilight Sky & Fog (Stitch Spec: 0x191c2b, 0.015) */}
        <color attach="background" args={["#191c2b"]} />
        <fogExp2 attach="fog" args={["#191c2b", 0.015]} />

        {/* Ambient Moon & Twilight Lighting (Stitch Spec) */}
        <ambientLight color="#d5c9f5" intensity={0.85} />

        {/* Directional Moon Light */}
        <directionalLight
          position={[15, 30, 20]}
          intensity={1.2}
          color="#e4d8ff"
          castShadow
        />

        {/* Warm Point Lights from Stitch Lighting Spec */}
        <pointLight position={[-10, 4, 2]} color="#f5db91" intensity={1.8} distance={18} />
        <pointLight position={[8, 4, 3]} color="#f2ae78" intensity={1.8} distance={18} />
        <pointLight position={[0, 5, -8]} color="#b9e5d1" intensity={1.5} distance={16} />

        {/* Village Meadow Islands and Plinths */}
        <Ground />

        {/* Floating Fairy Fireflies */}
        <DataMotes />

        {/* Cottages and Friendly Ghost Plots */}
        <group>
          {data.nodes.map((node) => {
            if (node.node_type === "ghost_plot") {
              return <GhostPlot key={node.id} node={node} />;
            }
            return <Building key={node.id} node={node} />;
          })}
        </group>

        {/* Curved Hyperlink Pathways and Mid-air Lanterns */}
        <group>
          {data.routes.map((route) => {
            const src = nodeMap.get(route.source_node_id);
            const tgt = nodeMap.get(route.target_node_id);
            if (!src || !tgt) return null;
            return (
              <RouteLine
                key={route.id}
                route={route}
                sourceNode={src}
                targetNode={tgt}
              />
            );
          })}
        </group>

        {/* Smooth Orbit Camera Controller */}
        <CameraController />
      </Canvas>

      {/* Illustrated Field Guide Legend */}
      <CityLegend />
    </div>
  );
};

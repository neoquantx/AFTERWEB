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
    // Find the main captured node in this district
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
      {/* Floating Sector Quick-Jump HUD */}
      <div className={styles.sectorHud}>
        <span className={styles.sectorLabel}>VILLAGE QUARTERS:</span>
        {data.districts.map((d) => (
          <button
            key={d.id}
            className={styles.sectorBtn}
            onClick={() => handleJumpToSector(d.id)}
            title={`Visit ${d.title}`}
          >
            <span>{getDistrictIcon(d.id)}</span>
            <span>{d.title.split("(")[0].trim()}</span>
          </button>
        ))}
      </div>

      <Canvas
        camera={{ position: [0, 22, 36], fov: 46, near: 0.5, far: 250 }}
        dpr={[1, 1.5]}
        style={{ background: "#191c2b" }}
      >
        {/* Dreamy Twilight Sky & Distance Fog */}
        <color attach="background" args={["#191c2b"]} />
        <fog attach="fog" args={["#191c2b", 22, 120]} />

        {/* Cinematic Atmospheric Lighting */}
        {/* Soft dreamy ambient light */}
        <ambientLight color="#383556" intensity={0.9} />

        {/* Warm Golden Moonlight / Twilight Sun */}
        <directionalLight
          position={[25, 40, 22]}
          intensity={1.3}
          color="#fff1d6"
          castShadow
        />

        {/* Soft Lavender / Mint Fill Light */}
        <directionalLight
          position={[-30, 20, -15]}
          intensity={0.5}
          color="#b9e5d1"
        />

        {/* Cozy Warm Lantern point lights near the three village islands */}
        <pointLight position={[-35, 8, 0]} color="#fde8a0" intensity={0.8} distance={28} />
        <pointLight position={[0, 8, 0]} color="#fde8a0" intensity={0.8} distance={28} />
        <pointLight position={[35, 8, 0]} color="#fde8a0" intensity={0.8} distance={28} />

        {/* Village Meadow Islands and Plinths */}
        <Ground />

        {/* Floating Fairy Fireflies and Twilight Sparkles */}
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

        {/* Curved Hyperlink Pathways and Lantern Arcs */}
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

import React from "react";
import { Canvas } from "@react-three/fiber";
import styles from "./CityCanvas.module.css";
import { useCityData } from "../../hooks/useCityData";
import { Building } from "../../scene/Building";
import { GhostPlot } from "../../scene/GhostPlot";
import { RouteLine } from "../../scene/RouteLine";
import { Ground } from "../../scene/Ground";
import { CameraController } from "../../scene/CameraController";
import { CityLegend } from "./CityLegend";
import { CityNodeData } from "../../types/city";

export const CityCanvas: React.FC = () => {
  const { data, loading, error } = useCityData();

  if (loading) {
    return (
      <div className={styles.canvasContainer} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span>Reconstructing 3D Archive City...</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.canvasContainer} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span>Failed to load city layout: {error}</span>
      </div>
    );
  }

  const nodeMap = new Map<string, CityNodeData>();
  data.nodes.forEach((n) => nodeMap.set(n.id, n));

  return (
    <div className={styles.canvasContainer}>
      <Canvas
        camera={{ position: [0, 25, 45], fov: 45 }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[20, 40, 20]} intensity={0.8} />
        <pointLight position={[0, 20, 0]} intensity={0.5} />

        <Ground />

        {/* Buildings and Ghost Plots */}
        {data.nodes.map((node) =>
          node.node_type === "ghost_plot" ? (
            <GhostPlot key={node.id} node={node} />
          ) : (
            <Building key={node.id} node={node} />
          )
        )}

        {/* Observed Routes */}
        {data.routes.map((route) => {
          const source = nodeMap.get(route.source_node_id);
          const target = nodeMap.get(route.target_node_id);
          if (!source || !target) return null;
          return (
            <RouteLine
              key={route.id}
              route={route}
              sourceNode={source}
              targetNode={target}
            />
          );
        })}

        <CameraController />
      </Canvas>

      <CityLegend />
    </div>
  );
};

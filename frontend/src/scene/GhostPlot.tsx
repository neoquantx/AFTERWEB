import React, { useState } from "react";
import { CityNodeData } from "../types/city";
import { useAppStore } from "../stores/useAppStore";
import { Text } from "@react-three/drei";

interface GhostPlotProps {
  node: CityNodeData;
}

export const GhostPlot: React.FC<GhostPlotProps> = ({ node }) => {
  const { setSelectedNode, selectedNode } = useAppStore();
  const [hovered, setHovered] = useState(false);
  const isSelected = selectedNode?.id === node.id;

  return (
    <group position={[node.position[0], node.position[1], node.position[2]]}>
      {/* Wireframe Outline */}
      <mesh
        position={[0, 0.4, 0]}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedNode(node);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[3, 0.8, 3]} />
        <meshBasicMaterial
          color={isSelected ? "#FF817D" : hovered ? "#E5AE55" : "#9AA2B1"}
          wireframe
        />
      </mesh>

      {/* Floating Ghost Label */}
      <Text
        position={[0, 1.8, 0]}
        fontSize={0.55}
        color="#9AA2B1"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#080B12"
      >
        ∅ {node.label}
      </Text>
    </group>
  );
};

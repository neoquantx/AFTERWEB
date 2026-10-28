import React, { useState } from "react";
import { CityNodeData } from "../types/city";
import { useAppStore } from "../stores/useAppStore";
import { Text } from "@react-three/drei";

interface BuildingProps {
  node: CityNodeData;
}

export const Building: React.FC<BuildingProps> = ({ node }) => {
  const { setSelectedNode, selectedNode } = useAppStore();
  const [hovered, setHovered] = useState(false);
  const isSelected = selectedNode?.id === node.id;

  const height = 4.0;
  const color = isSelected ? "#F4F0E7" : hovered ? "#E5AE55" : node.district_color || "#73C8AD";

  return (
    <group position={[node.position[0], node.position[1], node.position[2]]}>
      {/* 3D Structure */}
      <mesh
        position={[0, height / 2, 0]}
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
        <boxGeometry args={[3, height, 3]} />
        <meshStandardMaterial
          color={color}
          roughness={0.4}
          metalness={0.2}
          emissive={isSelected ? "#E5AE55" : "#000000"}
          emissiveIntensity={isSelected ? 0.3 : 0}
        />
      </mesh>

      {/* Floating 3D Text Label */}
      <Text
        position={[0, height + 1.2, 0]}
        fontSize={0.65}
        color="#F4F0E7"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#080B12"
      >
        {node.label}
      </Text>
    </group>
  );
};

import React, { useState, useRef } from "react";
import { CityNodeData } from "../types/city";
import { useAppStore } from "../stores/useAppStore";
import { Billboard, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GhostPlotProps {
  node: CityNodeData;
}

export const GhostPlot: React.FC<GhostPlotProps> = ({ node }) => {
  const { setSelectedNode, selectedNode, reducedMotion } = useAppStore();
  const [hovered, setHovered] = useState(false);
  const isSelected = selectedNode?.id === node.id;
  const ghostGroupRef = useRef<THREE.Group>(null);

  // Bobbing floating animation for the friendly little ghost (Stitch diorama logic)
  useFrame((state) => {
    if (ghostGroupRef.current && !reducedMotion) {
      ghostGroupRef.current.position.y = 1.7 + Math.sin(state.clock.elapsedTime * 2.2 + node.position[0]) * 0.25;
      ghostGroupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.2;
    }
  });

  return (
    <group
      position={[node.position[0], node.position[1], node.position[2]]}
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
      {/* ============================================================== */}
      {/* 1. VACANT GARDEN LOT BASE (Tilled Soil Patch)                  */}
      {/* ============================================================== */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[2.0, 2.2, 0.16, 16]} />
        <meshLambertMaterial color="#5a3f37" />
      </mesh>

      {/* Decorative Fairy Border Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.18, 0]}>
        <ringGeometry args={[1.9, 2.1, 24]} />
        <meshBasicMaterial
          color={isSelected ? "#b6a5e8" : hovered ? "#e9e2ff" : "#8a7ba8"}
          side={THREE.DoubleSide}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Little Garden Mushroom on Corner */}
      <group position={[1.3, 0.16, 1.1]}>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.05, 0.08, 0.4, 8]} />
          <meshStandardMaterial color="#fff9f0" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.2, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#b6a5e8" roughness={0.4} />
        </mesh>
      </group>

      {/* Weathered Wooden Signpost on Plot */}
      <group position={[-1.1, 0, 0.7]}>
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.06, 0.07, 1.2, 8]} />
          <meshLambertMaterial color="#7c5a43" />
        </mesh>
        <mesh position={[0, 1.1, 0]} rotation={[0, -0.3, 0]}>
          <boxGeometry args={[0.55, 0.42, 0.08]} />
          <meshLambertMaterial color="#8a674e" />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 2. ADORABLE FRIENDLY 3D GHOST (Exact Stitch Spec)              */}
      {/* ============================================================== */}
      <group ref={ghostGroupRef} position={[0, 1.7, 0]}>
        {/* Head */}
        <mesh position={[0, 0.75, 0]}>
          <sphereGeometry args={[0.58, 20, 20]} />
          <meshPhongMaterial
            color="#ffffff"
            emissive="#d8d0f8"
            emissiveIntensity={isSelected ? 0.65 : hovered ? 0.45 : 0.3}
            transparent
            opacity={0.9}
            shininess={80}
          />
        </mesh>

        {/* Skirt */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.55, 0.38, 0.85, 16, 1, true]} />
          <meshPhongMaterial
            color="#ffffff"
            emissive="#d8d0f8"
            emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.25}
            transparent
            opacity={0.85}
            shininess={80}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Floating Ghost Arms */}
        <mesh position={[-0.52, 0.52, 0.16]}>
          <sphereGeometry args={[0.18, 10, 10]} />
          <meshPhongMaterial color="#ffffff" emissive="#d8d0f8" emissiveIntensity={0.3} transparent opacity={0.85} />
        </mesh>
        <mesh position={[0.52, 0.52, 0.16]}>
          <sphereGeometry args={[0.18, 10, 10]} />
          <meshPhongMaterial color="#ffffff" emissive="#d8d0f8" emissiveIntensity={0.3} transparent opacity={0.85} />
        </mesh>

        {/* Cute Dot Eyes */}
        <mesh position={[-0.19, 0.78, 0.52]}>
          <sphereGeometry args={[0.075, 10, 10]} />
          <meshBasicMaterial color="#2c2538" />
        </mesh>
        <mesh position={[0.19, 0.78, 0.52]}>
          <sphereGeometry args={[0.075, 10, 10]} />
          <meshBasicMaterial color="#2c2538" />
        </mesh>

        {/* Pink Blush Marks */}
        <mesh position={[-0.32, 0.64, 0.48]} scale={[1.2, 0.6, 0.4]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshBasicMaterial color="#ffa5bb" />
        </mesh>
        <mesh position={[0.32, 0.64, 0.48]} scale={[1.2, 0.6, 0.4]}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshBasicMaterial color="#ffa5bb" />
        </mesh>

        {/* Candlelit Point Light */}
        <pointLight
          color="#b6a5e8"
          intensity={isSelected ? 1.4 : 0.6}
          distance={5}
        />
      </group>

      {/* ============================================================== */}
      {/* 3. BILLBOARDED GHOST PLOT FIELD GUIDE SIGNPOST                 */}
      {/* ============================================================== */}
      <Billboard
        position={[0, 3.6, 0]}
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[Math.max(node.label.length * 0.38 + 1.2, 5.2), 1.4]} />
          <meshStandardMaterial color="#fff9f0" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0, -0.03]}>
          <planeGeometry args={[Math.max(node.label.length * 0.38 + 1.2, 5.2) + 0.15, 1.55]} />
          <meshStandardMaterial
            color={isSelected ? "#645592" : hovered ? "#b6a5e8" : "#cac4d0"}
            roughness={0.8}
          />
        </mesh>

        <Text
          position={[0, 0.36, 0.02]}
          fontSize={0.28}
          color="#645592"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
          font={undefined}
        >
          👻 GHOST LOT • UNCAPTURED IN QUERY
        </Text>

        <Text
          position={[0, -0.16, 0.02]}
          fontSize={0.46}
          color="#1d192b"
          anchorX="center"
          anchorY="middle"
          maxWidth={8.0}
          font={undefined}
        >
          {node.label}
        </Text>
      </Billboard>
    </group>
  );
};

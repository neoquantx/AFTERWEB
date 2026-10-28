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

  // Bobbing floating animation for the friendly little ghost
  useFrame((state) => {
    if (ghostGroupRef.current && !reducedMotion) {
      ghostGroupRef.current.position.y = 1.6 + Math.sin(state.clock.elapsedTime * 2.2 + node.position[0]) * 0.22;
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
      {/* 1. VACANT GARDEN LOT BASE & FAIRY RING                         */}
      {/* ============================================================== */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[2.2, 2.4, 0.16, 16]} />
        <meshStandardMaterial
          color={isSelected ? "#3d3654" : "#2a2d42"}
          roughness={0.9}
        />
      </mesh>

      {/* Decorative Pebble & Mushroom Border */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.18, 0]}>
        <ringGeometry args={[2.1, 2.3, 24]} />
        <meshBasicMaterial
          color={isSelected ? "#b6a5e8" : hovered ? "#e9e2ff" : "#5d5478"}
          side={THREE.DoubleSide}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Little Pastel Garden Mushroom on Plot Corner */}
      <group position={[1.4, 0.16, 1.2]}>
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.05, 0.08, 0.4, 8]} />
          <meshStandardMaterial color="#fff9f0" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.2, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#b6a5e8" roughness={0.4} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 2. ADORABLE FRIENDLY 3D GHOST ("GHOST IN THE MACHINE")         */}
      {/* ============================================================== */}
      <group ref={ghostGroupRef} position={[0, 1.6, 0]}>
        {/* Ghost Head (Smooth rounded sphere) */}
        <mesh position={[0, 0.65, 0]}>
          <sphereGeometry args={[0.55, 24, 24]} />
          <meshStandardMaterial
            color="#f1edfd"
            roughness={0.2}
            transparent
            opacity={0.85}
            emissive="#b6a5e8"
            emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.2}
          />
        </mesh>

        {/* Ghost Flowing Body & Skirt */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.52, 0.68, 0.85, 20]} />
          <meshStandardMaterial
            color="#f1edfd"
            roughness={0.2}
            transparent
            opacity={0.82}
            emissive="#b6a5e8"
            emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.2}
          />
        </mesh>

        {/* Ghost Wavy Skirt Ruffles (Hem) */}
        {[-0.4, -0.15, 0.15, 0.4].map((offset, idx) => (
          <mesh key={idx} position={[offset * 0.9, -0.36, 0.25]}>
            <sphereGeometry args={[0.16, 12, 8]} />
            <meshStandardMaterial
              color="#f1edfd"
              transparent
              opacity={0.8}
              roughness={0.3}
            />
          </mesh>
        ))}

        {/* Cute Dark Dot Eyes */}
        <mesh position={[-0.18, 0.72, 0.48]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color="#2c2738" roughness={0.4} />
        </mesh>
        <mesh position={[0.18, 0.72, 0.48]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshStandardMaterial color="#2c2738" roughness={0.4} />
        </mesh>

        {/* Tiny Sweet Pink Blush Marks */}
        <mesh position={[-0.26, 0.58, 0.46]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#f7b7cb" roughness={0.6} />
        </mesh>
        <mesh position={[0.26, 0.58, 0.46]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#f7b7cb" roughness={0.6} />
        </mesh>

        {/* Soft Lavender Halo Light */}
        <pointLight
          color="#b6a5e8"
          intensity={isSelected ? 1.0 : 0.4}
          distance={4}
        />
      </group>

      {/* ============================================================== */}
      {/* 3. WEATHERED WOODEN SIGNPOST ON THE PLOT                       */}
      {/* ============================================================== */}
      <group position={[-1.2, 0, 0.8]}>
        {/* Post */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.05, 0.06, 1.0, 8]} />
          <meshStandardMaterial color="#554438" roughness={0.9} />
        </mesh>
        {/* Little Question Mark Sign */}
        <mesh position={[0, 0.9, 0]}>
          <boxGeometry args={[0.38, 0.38, 0.06]} />
          <meshStandardMaterial color="#fffdf9" roughness={0.7} />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 4. BILLBOARDED GHOST PLOT FIELD GUIDE SIGNPOST                 */}
      {/* ============================================================== */}
      <Billboard
        position={[0, 3.4, 0]}
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false}
      >
        {/* Background Card */}
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[Math.max(node.label.length * 0.38 + 1.2, 5.2), 1.4]} />
          <meshStandardMaterial
            color="#fffdf9"
            roughness={0.7}
          />
        </mesh>
        {/* Decorative Lilac Border */}
        <mesh position={[0, 0, -0.03]}>
          <planeGeometry args={[Math.max(node.label.length * 0.38 + 1.2, 5.2) + 0.15, 1.55]} />
          <meshStandardMaterial
            color={isSelected ? "#9d87d9" : hovered ? "#b6a5e8" : "#d9d0e8"}
            roughness={0.8}
          />
        </mesh>

        {/* Status Tag */}
        <Text
          position={[0, 0.36, 0.02]}
          fontSize={0.28}
          color="#9d87d9"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
          font={undefined}
        >
          👻 FRIENDLY GHOST • UNCAPTURED LOT
        </Text>

        {/* Title / Anchor Text */}
        <Text
          position={[0, -0.16, 0.02]}
          fontSize={0.46}
          color="#2c2738"
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

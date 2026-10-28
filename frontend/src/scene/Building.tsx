import React, { useState, useRef } from "react";
import { CityNodeData } from "../types/city";
import { useAppStore } from "../stores/useAppStore";
import { Billboard, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BuildingProps {
  node: CityNodeData;
}

export const Building: React.FC<BuildingProps> = ({ node }) => {
  const { setSelectedNode, selectedNode, reducedMotion } = useAppStore();
  const [hovered, setHovered] = useState(false);
  const isSelected = selectedNode?.id === node.id;
  const floatingStarRef = useRef<THREE.Group>(null);

  const isSpaceJam = node.site_id.includes("spacejam");
  const isGeoCities = node.site_id.includes("geocities");

  useFrame((state) => {
    if (floatingStarRef.current && !reducedMotion) {
      floatingStarRef.current.position.y = 4.8 + Math.sin(state.clock.elapsedTime * 2.5) * 0.2;
      floatingStarRef.current.rotation.y = state.clock.elapsedTime * 1.2;
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
      {/* 1. GARDEN COBBLESTONE BASE & SELECTION AURA                    */}
      {/* ============================================================== */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[2.5, 2.7, 0.2, 16]} />
        <meshStandardMaterial
          color={isSelected ? "#f7e3b5" : "#30354c"}
          roughness={0.8}
        />
      </mesh>

      {/* Warm Golden Fairy Ring on Selection / Hover */}
      {(isSelected || hovered) && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.22, 0]}>
          <ringGeometry args={[2.6, 2.9, 32]} />
          <meshBasicMaterial
            color={isSelected ? "#f5db91" : "#ffd6c2"}
            side={THREE.DoubleSide}
            transparent
            opacity={0.8}
          />
        </mesh>
      )}

      {/* ============================================================== */}
      {/* 2. COTTAGE ARCHITECTURE BY SECTOR                              */}
      {/* ============================================================== */}
      {isSpaceJam ? (
        // -------------------------------------------------------------
        // SECTOR 1: RETRO 1996 CINEMA COTTAGE
        // -------------------------------------------------------------
        <group position={[0, 0.2, 0]}>
          {/* Main Cottage Walls */}
          <mesh position={[0, 1.2, 0]}>
            <boxGeometry args={[3.2, 2.2, 2.6]} />
            <meshStandardMaterial color="#fff6e8" roughness={0.6} />
          </mesh>

          {/* Pitched Pumpkin Cinema Roof */}
          <mesh position={[0, 2.8, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[2.5, 1.4, 4]} />
            <meshStandardMaterial color="#f2ae78" roughness={0.5} />
          </mesh>

          {/* Retro TV Antenna on Roof */}
          <group position={[0.7, 3.6, 0]}>
            <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.03, 0.03, 0.8, 6]} />
              <meshStandardMaterial color="#555" metalness={0.7} />
            </mesh>
            <mesh position={[-0.2, 0.8, 0]} rotation={[0, 0, Math.PI / 6]}>
              <cylinderGeometry args={[0.02, 0.02, 0.5, 6]} />
              <meshStandardMaterial color="#555" metalness={0.7} />
            </mesh>
            <mesh position={[0.2, 0.8, 0]} rotation={[0, 0, -Math.PI / 6]}>
              <cylinderGeometry args={[0.02, 0.02, 0.5, 6]} />
              <meshStandardMaterial color="#555" metalness={0.7} />
            </mesh>
          </group>

          {/* Warm Glowing Cinema Doorway */}
          <mesh position={[0, 0.7, 1.31]}>
            <planeGeometry args={[0.9, 1.4]} />
            <meshStandardMaterial
              color="#fde8a0"
              emissive="#fde8a0"
              emissiveIntensity={0.8}
            />
          </mesh>

          {/* Glowing Front Windows */}
          <mesh position={[-1.0, 1.4, 1.31]}>
            <planeGeometry args={[0.65, 0.65]} />
            <meshStandardMaterial
              color="#fde8a0"
              emissive="#fde8a0"
              emissiveIntensity={0.9}
            />
          </mesh>
          <mesh position={[1.0, 1.4, 1.31]}>
            <planeGeometry args={[0.65, 0.65]} />
            <meshStandardMaterial
              color="#fde8a0"
              emissive="#fde8a0"
              emissiveIntensity={0.9}
            />
          </mesh>

          {/* Miniature Basketball Hoop Detail on Side */}
          <group position={[1.61, 1.6, 0]} rotation={[0, Math.PI / 2, 0]}>
            {/* Backboard */}
            <mesh position={[0, 0, 0]}>
              <planeGeometry args={[0.7, 0.5]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            {/* Orange Rim */}
            <mesh position={[0, -0.15, 0.15]} rotation={[-Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.14, 0.02, 6, 16]} />
              <meshStandardMaterial color="#e86e30" />
            </mesh>
          </group>
        </group>
      ) : isGeoCities ? (
        // -------------------------------------------------------------
        // SECTOR 2: COZY GEOCITIES HOMESTEAD COTTAGE
        // -------------------------------------------------------------
        <group position={[0, 0.2, 0]}>
          {/* Main Mint Walls */}
          <mesh position={[0, 1.1, 0]}>
            <boxGeometry args={[3.0, 2.0, 2.6]} />
            <meshStandardMaterial color="#b9e5d1" roughness={0.6} />
          </mesh>

          {/* Lavender Gabled Roof */}
          <mesh position={[0, 2.6, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[2.4, 1.3, 4]} />
            <meshStandardMaterial color="#b6a5e8" roughness={0.5} />
          </mesh>

          {/* Cozy Brick Chimney */}
          <mesh position={[0.8, 2.8, -0.4]}>
            <boxGeometry args={[0.45, 1.2, 0.45]} />
            <meshStandardMaterial color="#d98980" roughness={0.7} />
          </mesh>

          {/* Warm Glowing Front Door */}
          <mesh position={[-0.6, 0.65, 1.31]}>
            <planeGeometry args={[0.8, 1.3]} />
            <meshStandardMaterial
              color="#fde8a0"
              emissive="#fde8a0"
              emissiveIntensity={0.8}
            />
          </mesh>

          {/* CRT Monitor-shaped Window Pane */}
          <group position={[0.65, 1.3, 1.31]}>
            {/* Monitor Bezel */}
            <mesh position={[0, 0, 0]}>
              <planeGeometry args={[0.9, 0.75]} />
              <meshStandardMaterial color="#4a4458" />
            </mesh>
            {/* Glowing Screen */}
            <mesh position={[0, 0, 0.01]}>
              <planeGeometry args={[0.75, 0.6]} />
              <meshStandardMaterial
                color="#fde8a0"
                emissive="#fde8a0"
                emissiveIntensity={0.9}
              />
            </mesh>
            {/* Flowerbox below window */}
            <mesh position={[0, -0.45, 0.05]}>
              <boxGeometry args={[0.85, 0.15, 0.15]} />
              <meshStandardMaterial color="#7a5c48" />
            </mesh>
          </group>
        </group>
      ) : (
        // -------------------------------------------------------------
        // SECTOR 3: HISTORIC ARCHIVE PAVILION & LIBRARY
        // -------------------------------------------------------------
        <group position={[0, 0.2, 0]}>
          {/* Main Stone Library Body */}
          <mesh position={[0, 1.2, 0]}>
            <boxGeometry args={[3.2, 2.2, 2.8]} />
            <meshStandardMaterial color="#fff9f0" roughness={0.5} />
          </mesh>

          {/* Arched Portico Entry Columns */}
          <mesh position={[-0.8, 0.8, 1.45]}>
            <cylinderGeometry args={[0.1, 0.12, 1.6, 12]} />
            <meshStandardMaterial color="#e6dfd3" />
          </mesh>
          <mesh position={[0.8, 0.8, 1.45]}>
            <cylinderGeometry args={[0.1, 0.12, 1.6, 12]} />
            <meshStandardMaterial color="#e6dfd3" />
          </mesh>

          {/* Soft Lilac Dome Roof */}
          <mesh position={[0, 2.7, 0]}>
            <sphereGeometry args={[1.7, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#9d87d9" roughness={0.4} />
          </mesh>

          {/* Golden Spire Tip */}
          <mesh position={[0, 3.8, 0]}>
            <coneGeometry args={[0.2, 0.6, 8]} />
            <meshStandardMaterial color="#f5db91" roughness={0.2} metalness={0.6} />
          </mesh>

          {/* Warm Archway Interior Glow */}
          <mesh position={[0, 0.8, 1.41]}>
            <planeGeometry args={[1.1, 1.6]} />
            <meshStandardMaterial
              color="#fde8a0"
              emissive="#fde8a0"
              emissiveIntensity={0.85}
            />
          </mesh>
        </group>
      )}

      {/* ============================================================== */}
      {/* 3. FLOATING COMPANION STAR OR LANTERN WHEN SELECTED            */}
      {/* ============================================================== */}
      {isSelected && (
        <group ref={floatingStarRef} position={[0, 4.8, 0]}>
          {/* Floating Warm Golden Star */}
          <mesh>
            <octahedronGeometry args={[0.42, 0]} />
            <meshStandardMaterial
              color="#f5db91"
              emissive="#f5db91"
              emissiveIntensity={1.0}
              roughness={0.2}
            />
          </mesh>
          <pointLight color="#fde8a0" intensity={1.2} distance={6} />
        </group>
      )}

      {/* ============================================================== */}
      {/* 4. BILLBOARDED FIELD GUIDE SIGNPOST                            */}
      {/* ============================================================== */}
      <Billboard
        position={[0, 4.4, 0]}
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
        {/* Decorative Border */}
        <mesh position={[0, 0, -0.03]}>
          <planeGeometry args={[Math.max(node.label.length * 0.38 + 1.2, 5.2) + 0.15, 1.55]} />
          <meshStandardMaterial
            color={isSelected ? "#e8984e" : hovered ? "#f2ae78" : "#d9d0c1"}
            roughness={0.8}
          />
        </mesh>

        {/* Status Tag */}
        <Text
          position={[0, 0.36, 0.02]}
          fontSize={0.28}
          color="#48b88f"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
          font={undefined}
        >
          🏡 PRESERVED WEBSITE • {node.timestamp ? node.timestamp.slice(0, 4) : "1996"}
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

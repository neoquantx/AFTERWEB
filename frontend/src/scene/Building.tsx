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
      floatingStarRef.current.position.y = 5.2 + Math.sin(state.clock.elapsedTime * 2.5) * 0.22;
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
      {/* Garden Cobblestone Base */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[2.8, 3.1, 0.2, 16]} />
        <meshLambertMaterial color={isSelected ? "#f5db91" : "#30354c"} />
      </mesh>

      {/* Warm Golden Fairy Ring on Selection / Hover */}
      {(isSelected || hovered) && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.24, 0]}>
          <ringGeometry args={[2.9, 3.3, 32]} />
          <meshBasicMaterial
            color={isSelected ? "#f5db91" : "#ffdcc3"}
            side={THREE.DoubleSide}
            transparent
            opacity={0.85}
          />
        </mesh>
      )}

      {/* ============================================================== */}
      {/* 2. COTTAGE ARCHITECTURE (Exact Stitch Spec)                    */}
      {/* ============================================================== */}
      {isSpaceJam ? (
        // -------------------------------------------------------------
        // SECTOR 1: RETRO 1996 CINEMA COTTAGE
        // -------------------------------------------------------------
        <group position={[0, 0.2, 0]}>
          {/* Walls */}
          <mesh position={[0, 1.6, 0]}>
            <boxGeometry args={[4.2, 3.2, 3.8]} />
            <meshLambertMaterial color="#ded2c0" />
          </mesh>

          {/* Pitched Pumpkin Roof */}
          <mesh position={[0, 4.2, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[3.5, 2.6, 4]} />
            <meshLambertMaterial color="#f2ae78" />
          </mesh>

          {/* Glowing Marquee / TV Window */}
          <mesh position={[0, 1.8, 1.92]}>
            <planeGeometry args={[1.5, 1.3]} />
            <meshBasicMaterial color="#ffea9f" />
          </mesh>

          {/* TV V-Antenna on Roof */}
          <group position={[0, 5.5, 0]}>
            <mesh position={[0.4, 0, 0]} rotation={[0, 0, -0.3]}>
              <cylinderGeometry args={[0.04, 0.04, 1.2, 6]} />
              <meshBasicMaterial color="#ffea9f" />
            </mesh>
            <mesh position={[-0.4, 0, 0]} rotation={[0, 0, 0.3]}>
              <cylinderGeometry args={[0.04, 0.04, 1.2, 6]} />
              <meshBasicMaterial color="#ffea9f" />
            </mesh>
          </group>

          {/* Miniature Basketball Hoop Detail on Side */}
          <group position={[2.12, 2.0, 0]} rotation={[0, Math.PI / 2, 0]}>
            <mesh position={[0, 0, 0]}>
              <planeGeometry args={[0.8, 0.6]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0, -0.18, 0.18]} rotation={[-Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.18, 0.025, 6, 16]} />
              <meshBasicMaterial color="#e86e30" />
            </mesh>
          </group>
        </group>
      ) : isGeoCities ? (
        // -------------------------------------------------------------
        // SECTOR 2: COZY GEOCITIES HOMESTEAD COTTAGE
        // -------------------------------------------------------------
        <group position={[0, 0.2, 0]}>
          {/* Mint Walls */}
          <mesh position={[0, 1.7, 0]}>
            <boxGeometry args={[4.0, 3.4, 4.0]} />
            <meshLambertMaterial color="#b9e5d1" />
          </mesh>

          {/* Lavender Pitched Roof */}
          <mesh position={[0, 4.2, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[3.4, 2.2, 4]} />
            <meshLambertMaterial color="#b6a5e8" />
          </mesh>

          {/* Brick Chimney */}
          <mesh position={[1.1, 4.2, -0.6]}>
            <boxGeometry args={[0.6, 1.6, 0.6]} />
            <meshLambertMaterial color="#d98980" />
          </mesh>

          {/* CRT Monitor Window with Glowing Screen */}
          <group position={[0, 2.0, 2.05]}>
            <mesh>
              <boxGeometry args={[1.6, 1.2, 0.4]} />
              <meshLambertMaterial color="#4d3f66" />
            </mesh>
            <mesh position={[0, 0, 0.22]}>
              <planeGeometry args={[1.2, 0.8]} />
              <meshBasicMaterial color="#ffea9f" />
            </mesh>
          </group>

          {/* Flowerbox below window */}
          <mesh position={[0, 1.0, 2.1]}>
            <boxGeometry args={[2.2, 0.4, 0.5]} />
            <meshLambertMaterial color="#f2ae78" />
          </mesh>
        </group>
      ) : (
        // -------------------------------------------------------------
        // SECTOR 3: HISTORIC ARCHIVE LIBRARY & PAVILION
        // -------------------------------------------------------------
        <group position={[0, 0.2, 0]}>
          {/* Ivory Stone Walls */}
          <mesh position={[0, 1.9, 0]}>
            <boxGeometry args={[5.2, 3.8, 4.6]} />
            <meshLambertMaterial color="#fff9f0" />
          </mesh>

          {/* Lilac Dome */}
          <mesh position={[0, 3.8, 0]}>
            <sphereGeometry args={[2.2, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshLambertMaterial color="#b6a5e8" />
          </mesh>

          {/* Classical Portico Columns */}
          {[-1.6, -0.55, 0.55, 1.6].map((x, idx) => (
            <mesh key={idx} position={[x, 1.3, 2.5]}>
              <cylinderGeometry args={[0.18, 0.22, 2.6, 8]} />
              <meshLambertMaterial color="#fff9f0" />
            </mesh>
          ))}
          <mesh position={[0, 2.7, 2.5]}>
            <boxGeometry args={[4.2, 0.4, 1.2]} />
            <meshLambertMaterial color="#b6a5e8" />
          </mesh>

          {/* Interior Arch Glow */}
          <mesh position={[0, 1.2, 2.32]}>
            <planeGeometry args={[1.4, 2.0]} />
            <meshBasicMaterial color="#ffea9f" />
          </mesh>
        </group>
      )}

      {/* Floating Companion Star / Lantern on Selection */}
      {isSelected && (
        <group ref={floatingStarRef} position={[0, 5.2, 0]}>
          <mesh>
            <octahedronGeometry args={[0.48, 0]} />
            <meshBasicMaterial color="#f5db91" />
          </mesh>
          <pointLight color="#f5db91" intensity={1.8} distance={16} />
        </group>
      )}

      {/* Billboarded Field Guide Signboard */}
      <Billboard
        position={[0, 4.8, 0]}
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
            color={isSelected ? "#865224" : hovered ? "#f2ae78" : "#cac4d0"}
            roughness={0.8}
          />
        </mesh>

        <Text
          position={[0, 0.36, 0.02]}
          fontSize={0.28}
          color="#3e6656"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.06}
          font={undefined}
        >
          🏡 PRESERVED WEBSITE • {node.timestamp ? node.timestamp.slice(0, 4) : "1996"}
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

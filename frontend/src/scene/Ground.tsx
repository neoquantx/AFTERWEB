import React from "react";
import * as THREE from "three";
import { Billboard, Text } from "@react-three/drei";

export const Ground: React.FC = () => {
  return (
    <group position={[0, 0, 0]}>
      {/* Twilight Meadow Ground Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.25, 0]} receiveShadow>
        <planeGeometry args={[300, 220]} />
        <meshStandardMaterial
          color="#181a28"
          roughness={0.95}
          metalness={0.05}
        />
      </mesh>

      {/* Subtle Warm Pathway Ring connecting the 3 village sectors */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.22, 0]}>
        <ringGeometry args={[28, 42, 64]} />
        <meshBasicMaterial
          color="#2e2b45"
          side={THREE.DoubleSide}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* ============================================================== */}
      {/* SECTOR 1 VILLAGE ISLAND: Space Jam (X = -35)                  */}
      {/* ============================================================== */}
      <group position={[-35, 0, 0]}>
        {/* Island Foundation Plinth */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[14.5, 15.5, 0.35, 36]} />
          <meshStandardMaterial
            color="#272a3d"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
        {/* Soft Cobblestone / Meadow Top Crust */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[14.0, 14.3, 0.08, 36]} />
          <meshStandardMaterial
            color="#32374e"
            roughness={0.85}
          />
        </mesh>
        {/* Warm Pumpkin Glow Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.13, 0]}>
          <ringGeometry args={[13.7, 13.9, 36]} />
          <meshBasicMaterial color="#f2ae78" transparent opacity={0.4} />
        </mesh>

        {/* Decorative Little Mushrooms & Garden Pebbles */}
        <group position={[-8, 0.1, 7]}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 0.6, 8]} />
            <meshStandardMaterial color="#fff9f0" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <sphereGeometry args={[0.32, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#f2ae78" roughness={0.4} />
          </mesh>
        </group>
        <group position={[-7.2, 0.1, 7.8]}>
          <mesh position={[0, 0.2, 0]}>
            <cylinderGeometry args={[0.06, 0.09, 0.4, 8]} />
            <meshStandardMaterial color="#fff9f0" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.4, 0]}>
            <sphereGeometry args={[0.22, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#ffd6c2" roughness={0.4} />
          </mesh>
        </group>
        <group position={[8, 0.1, -6]}>
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.07, 0.1, 0.5, 8]} />
            <meshStandardMaterial color="#fff9f0" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.28, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#f2ae78" roughness={0.4} />
          </mesh>
        </group>

        {/* Sector Wooden Signpost */}
        <group position={[0, 0, 11.5]}>
          {/* Post */}
          <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 1.4, 8]} />
            <meshStandardMaterial color="#533c2a" roughness={0.9} />
          </mesh>
          {/* Signboard */}
          <Billboard position={[0, 1.5, 0]}>
            <mesh position={[0, 0, -0.02]}>
              <planeGeometry args={[9.5, 1.3]} />
              <meshStandardMaterial color="#fffdf9" roughness={0.6} />
            </mesh>
            <mesh position={[0, 0, -0.03]}>
              <planeGeometry args={[9.7, 1.5]} />
              <meshStandardMaterial color="#d4b48c" roughness={0.8} />
            </mesh>
            <Text
              position={[0, 0.2, 0.02]}
              fontSize={0.34}
              color="#e8984e"
              anchorX="center"
              anchorY="middle"
              font={undefined}
            >
              SECTOR 01 • 1996 CINEMA LOT
            </Text>
            <Text
              position={[0, -0.22, 0.02]}
              fontSize={0.42}
              color="#2c2738"
              anchorX="center"
              anchorY="middle"
              font={undefined}
            >
              Space Jam Official Movie Site
            </Text>
          </Billboard>
        </group>
      </group>

      {/* ============================================================== */}
      {/* SECTOR 2 VILLAGE ISLAND: GeoCities (X = 0)                     */}
      {/* ============================================================== */}
      <group position={[0, 0, 0]}>
        {/* Island Foundation Plinth */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[14.5, 15.5, 0.35, 36]} />
          <meshStandardMaterial
            color="#272a3d"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
        {/* Soft Cobblestone / Meadow Top Crust */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[14.0, 14.3, 0.08, 36]} />
          <meshStandardMaterial
            color="#32374e"
            roughness={0.85}
          />
        </mesh>
        {/* Garden Mint Glow Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.13, 0]}>
          <ringGeometry args={[13.7, 13.9, 36]} />
          <meshBasicMaterial color="#b9e5d1" transparent opacity={0.45} />
        </mesh>

        {/* Decorative Little Mushrooms & Shrub Elements */}
        <group position={[-9, 0.1, 6]}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 0.6, 8]} />
            <meshStandardMaterial color="#fff9f0" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <sphereGeometry args={[0.3, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#b9e5d1" roughness={0.4} />
          </mesh>
        </group>
        <group position={[8.5, 0.1, 6.5]}>
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.07, 0.1, 0.5, 8]} />
            <meshStandardMaterial color="#fff9f0" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.26, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#9ee2c7" roughness={0.4} />
          </mesh>
        </group>

        {/* Sector Wooden Signpost */}
        <group position={[0, 0, 11.5]}>
          <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 1.4, 8]} />
            <meshStandardMaterial color="#533c2a" roughness={0.9} />
          </mesh>
          <Billboard position={[0, 1.5, 0]}>
            <mesh position={[0, 0, -0.02]}>
              <planeGeometry args={[9.5, 1.3]} />
              <meshStandardMaterial color="#fffdf9" roughness={0.6} />
            </mesh>
            <mesh position={[0, 0, -0.03]}>
              <planeGeometry args={[9.7, 1.5]} />
              <meshStandardMaterial color="#d4b48c" roughness={0.8} />
            </mesh>
            <Text
              position={[0, 0.2, 0.02]}
              fontSize={0.34}
              color="#48b88f"
              anchorX="center"
              anchorY="middle"
              font={undefined}
            >
              SECTOR 02 • HOMESTEAD MEADOW
            </Text>
            <Text
              position={[0, -0.22, 0.02]}
              fontSize={0.42}
              color="#2c2738"
              anchorX="center"
              anchorY="middle"
              font={undefined}
            >
              GeoCities SiliconValley Neighborhood
            </Text>
          </Billboard>
        </group>
      </group>

      {/* ============================================================== */}
      {/* SECTOR 3 VILLAGE ISLAND: NCSA Mosaic (X = 35)                  */}
      {/* ============================================================== */}
      <group position={[35, 0, 0]}>
        {/* Island Foundation Plinth */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[14.5, 15.5, 0.35, 36]} />
          <meshStandardMaterial
            color="#272a3d"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
        {/* Soft Cobblestone / Meadow Top Crust */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[14.0, 14.3, 0.08, 36]} />
          <meshStandardMaterial
            color="#32374e"
            roughness={0.85}
          />
        </mesh>
        {/* Dusty Lilac Glow Ring */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.13, 0]}>
          <ringGeometry args={[13.7, 13.9, 36]} />
          <meshBasicMaterial color="#b6a5e8" transparent opacity={0.45} />
        </mesh>

        {/* Decorative Little Mushrooms & Shrub Elements */}
        <group position={[-7.5, 0.1, -6]}>
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.08, 0.12, 0.6, 8]} />
            <meshStandardMaterial color="#fff9f0" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <sphereGeometry args={[0.3, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#b6a5e8" roughness={0.4} />
          </mesh>
        </group>
        <group position={[8, 0.1, 7]}>
          <mesh position={[0, 0.22, 0]}>
            <cylinderGeometry args={[0.07, 0.1, 0.45, 8]} />
            <meshStandardMaterial color="#fff9f0" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.45, 0]}>
            <sphereGeometry args={[0.25, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#e9e2ff" roughness={0.4} />
          </mesh>
        </group>

        {/* Sector Wooden Signpost */}
        <group position={[0, 0, 11.5]}>
          <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 1.4, 8]} />
            <meshStandardMaterial color="#533c2a" roughness={0.9} />
          </mesh>
          <Billboard position={[0, 1.5, 0]}>
            <mesh position={[0, 0, -0.02]}>
              <planeGeometry args={[9.5, 1.3]} />
              <meshStandardMaterial color="#fffdf9" roughness={0.6} />
            </mesh>
            <mesh position={[0, 0, -0.03]}>
              <planeGeometry args={[9.7, 1.5]} />
              <meshStandardMaterial color="#d4b48c" roughness={0.8} />
            </mesh>
            <Text
              position={[0, 0.2, 0.02]}
              fontSize={0.34}
              color="#9d87d9"
              anchorX="center"
              anchorY="middle"
              font={undefined}
            >
              SECTOR 03 • ARCHIVAL LIBRARY
            </Text>
            <Text
              position={[0, -0.22, 0.02]}
              fontSize={0.42}
              color="#2c2738"
              anchorX="center"
              anchorY="middle"
              font={undefined}
            >
              NCSA Mosaic Early Hypertext Directory
            </Text>
          </Billboard>
        </group>
      </group>
    </group>
  );
};

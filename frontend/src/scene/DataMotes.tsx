import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAppStore } from "../stores/useAppStore";

export const DataMotes: React.FC = () => {
  const { reducedMotion } = useAppStore();
  const count = 140;
  const meshRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    // Whimsical fairy firefly palette:
    // Warm butter yellow (#f5db91), soft peach (#ffd6c2), dreamy lavender (#e9e2ff)
    const butter = new THREE.Color("#f5db91");
    const peach = new THREE.Color("#ffd6c2");
    const lavender = new THREE.Color("#e9e2ff");

    for (let i = 0; i < count; i++) {
      // Scatter fireflies across the village sky volume
      pos[i * 3] = (Math.random() - 0.5) * 120;
      pos[i * 3 + 1] = Math.random() * 20 + 0.8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const r = Math.random();
      const c = r < 0.6 ? butter : r < 0.85 ? peach : lavender;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (reducedMotion || !meshRef.current) return;
    const positionsAttr = meshRef.current.geometry.attributes.position;
    const arr = positionsAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Gently drift with a slight firefly wobble
      arr[i * 3 + 1] += delta * 0.35;
      arr[i * 3] += Math.sin(state.clock.elapsedTime * 0.8 + i) * 0.015;

      // Wrap if drifted too high
      if (arr[i * 3 + 1] > 22) {
        arr[i * 3 + 1] = 0.8;
      }
    }
    positionsAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.4}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

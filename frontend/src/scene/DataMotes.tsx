import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAppStore } from "../stores/useAppStore";

export const DataMotes: React.FC = () => {
  const { reducedMotion } = useAppStore();
  const count = 90;
  const meshRef = useRef<THREE.Points>(null);

  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd: { vx: number; vy: number; vz: number; phase: number }[] = [];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 110;
      pos[i * 3 + 1] = 1 + Math.random() * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 55;

      spd.push({
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.03,
        vz: (Math.random() - 0.5) * 0.02,
        phase: Math.random() * Math.PI * 2
      });
    }

    return [pos, spd];
  }, [count]);

  useFrame((state, delta) => {
    if (reducedMotion || !meshRef.current) return;
    const posArr = meshRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      // Gentle firefly float motion from Stitch
      posArr[i * 3 + 1] += delta * 0.35 + Math.sin(state.clock.elapsedTime * 2.0 + speeds[i].phase) * 0.012;
      posArr[i * 3] += Math.cos(state.clock.elapsedTime * 1.5 + speeds[i].phase) * 0.01;

      // Wrap if drifted too high
      if (posArr[i * 3 + 1] > 22) {
        posArr[i * 3 + 1] = 1.0;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#f5db91"
        size={0.45}
        transparent
        opacity={0.88}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
};

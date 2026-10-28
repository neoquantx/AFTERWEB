import React, { useEffect, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { OrbitControls } from "@react-three/drei";
import { useAppStore } from "../stores/useAppStore";
import * as THREE from "three";

export const CameraController: React.FC = () => {
  const { selectedNode, reducedMotion } = useAppStore();
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const targetLookAt = useRef(new THREE.Vector3(0, 2, 0));
  const targetCamPos = useRef(new THREE.Vector3(0, 24, 38));
  const isTransitioning = useRef(false);

  useEffect(() => {
    if (selectedNode) {
      targetCamPos.current.set(
        selectedNode.position[0],
        selectedNode.position[1] + 10,
        selectedNode.position[2] + 18
      );
      targetLookAt.current.set(
        selectedNode.position[0],
        selectedNode.position[1] + 2,
        selectedNode.position[2]
      );
      isTransitioning.current = true;

      if (reducedMotion) {
        camera.position.copy(targetCamPos.current);
        if (controlsRef.current) {
          controlsRef.current.target.copy(targetLookAt.current);
          controlsRef.current.update();
        }
        isTransitioning.current = false;
      }
    }
  }, [selectedNode, reducedMotion, camera]);

  useFrame((_, delta) => {
    if (isTransitioning.current && !reducedMotion) {
      const factor = Math.min(delta * 3.5, 0.15);
      camera.position.lerp(targetCamPos.current, factor);
      if (controlsRef.current) {
        controlsRef.current.target.lerp(targetLookAt.current, factor);
        controlsRef.current.update();
      }

      if (camera.position.distanceTo(targetCamPos.current) < 0.2) {
        isTransitioning.current = false;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      maxPolarAngle={Math.PI / 2.05}
      minDistance={6}
      maxDistance={95}
    />
  );
};

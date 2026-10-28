import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useAppStore } from "../stores/useAppStore";
import * as THREE from "three";

export const CameraController: React.FC = () => {
  const { selectedNode, reducedMotion } = useAppStore();
  const { camera } = useThree();

  useEffect(() => {
    if (selectedNode) {
      const targetPos = new THREE.Vector3(
        selectedNode.position[0],
        selectedNode.position[1] + 8,
        selectedNode.position[2] + 16
      );

      if (reducedMotion) {
        camera.position.copy(targetPos);
        camera.lookAt(selectedNode.position[0], 0, selectedNode.position[2]);
      } else {
        camera.position.lerp(targetPos, 0.8);
      }
    }
  }, [selectedNode, reducedMotion, camera]);

  return <OrbitControls maxPolarAngle={Math.PI / 2.1} minDistance={5} maxDistance={120} />;
};

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CityRouteData, CityNodeData } from "../types/city";
import { useAppStore } from "../stores/useAppStore";

interface RouteLineProps {
  route: CityRouteData;
  sourceNode: CityNodeData;
  targetNode: CityNodeData;
}

export const RouteLine: React.FC<RouteLineProps> = ({ route, sourceNode, targetNode }) => {
  const { setSelectedRoute, selectedRoute, reducedMotion } = useAppStore();
  const isSelected = selectedRoute?.id === route.id;
  const isMissing = route.lookup_state === "not_found_in_query";
  const lanternRef = useRef<THREE.Group>(null);

  // Create an elevated 3D parabolic catenary arc between source and target
  const { points, midPoint } = useMemo(() => {
    const start = new THREE.Vector3(sourceNode.position[0], 0.8, sourceNode.position[2]);
    const end = new THREE.Vector3(targetNode.position[0], isMissing ? 0.6 : 0.8, targetNode.position[2]);

    const distance = start.distanceTo(end);
    const arcHeight = Math.min(Math.max(distance * 0.22, 1.8), 4.8);

    const mid = new THREE.Vector3(
      (start.x + end.x) / 2,
      (start.y + end.y) / 2 + arcHeight,
      (start.z + end.z) / 2
    );

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const pts = curve.getPoints(24).map((p) => [p.x, p.y, p.z] as [number, number, number]);
    return { points: pts, midPoint: mid };
  }, [sourceNode.position, targetNode.position, isMissing]);

  // Gentle lantern sway animation from Stitch
  useFrame((state) => {
    if (lanternRef.current && !reducedMotion) {
      lanternRef.current.position.y = midPoint.y + Math.sin(state.clock.elapsedTime * 1.5 + midPoint.x) * 0.12;
      lanternRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 1.8 + midPoint.z) * 0.08;
    }
  });

  // Stitch Color Palette for Hyperlink Trails:
  // Captured: butter-yellow #f5db91
  // Missing (Ghost Plot): whimsical soft lilac #b6a5e8 dashed
  // Selected: luminous warm ivory #fff9f0
  const lineColor = isSelected
    ? "#fff9f0"
    : isMissing
    ? "#b6a5e8"
    : "#f5db91";

  return (
    <group
      onClick={(e) => {
        e.stopPropagation();
        setSelectedRoute(route);
      }}
    >
      <Line
        points={points}
        color={lineColor}
        lineWidth={isSelected ? 4.8 : isMissing ? 2.4 : 3.4}
        dashed={isMissing}
        dashScale={2.0}
        dashSize={0.8}
        gapSize={0.5}
      />

      {/* Mid-air Floating Lantern (Stitch createLantern spec) */}
      <group ref={lanternRef} position={[midPoint.x, midPoint.y, midPoint.z]}>
        {/* Wooden cage */}
        <mesh>
          <cylinderGeometry args={[0.22, 0.18, 0.44, 6]} />
          <meshLambertMaterial color="#7c5a43" />
        </mesh>
        {/* Glowing lantern bulb */}
        <mesh>
          <sphereGeometry args={[0.16, 8, 8]} />
          <meshBasicMaterial color={isSelected ? "#ffffff" : isMissing ? "#b6a5e8" : "#ffea9f"} />
        </mesh>
        <pointLight
          color={isMissing ? "#b6a5e8" : "#f5db91"}
          intensity={isSelected ? 1.4 : 0.8}
          distance={4}
        />
      </group>
    </group>
  );
};

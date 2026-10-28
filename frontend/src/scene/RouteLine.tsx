import React from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import { CityRouteData, CityNodeData } from "../types/city";

interface RouteLineProps {
  route: CityRouteData;
  sourceNode: CityNodeData;
  targetNode: CityNodeData;
}

export const RouteLine: React.FC<RouteLineProps> = ({ route, sourceNode, targetNode }) => {
  const points: [number, number, number][] = [
    [sourceNode.position[0], 0.2, sourceNode.position[2]],
    [targetNode.position[0], 0.2, targetNode.position[2]]
  ];

  const isMissing = route.lookup_state === "not_found_in_query";
  const lineColor = isMissing ? "#9AA2B1" : "#E5AE55";

  return (
    <Line
      points={points}
      color={lineColor}
      lineWidth={isMissing ? 1.5 : 2.5}
      dashed={isMissing}
      dashScale={2}
      dashSize={0.8}
      gapSize={0.4}
    />
  );
};

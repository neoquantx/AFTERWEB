import React from "react";

export const Ground: React.FC = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
      <planeGeometry args={[250, 250]} />
      <meshStandardMaterial color="#0A0E17" roughness={0.9} metalness={0.1} />
    </mesh>
  );
};

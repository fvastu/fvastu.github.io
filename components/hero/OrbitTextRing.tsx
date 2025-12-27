"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export default function OrbitTextRing({
  text = "I EVOLVE, AS IDEAS",
  radius = 1.15,
  y = 0.0,
  fontSize = 0.085,
  opacity = 0.55,
  rotationSpeed = 0.035,
}: {
  text?: string;
  radius?: number;
  y?: number;
  fontSize?: number;
  opacity?: number;
  rotationSpeed?: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  const chars = useMemo(() => {
    const base = `${text} • `;
    const repeated = base.repeat(10);
    return repeated.split("");
  }, [text]);

  useFrame((_, dt) => {
    groupRef.current.rotation.y += dt * rotationSpeed;
  });

  return (
    <group ref={groupRef} position={[0, y, 0]}>
      {chars.map((ch, i) => {
        const a = (i / chars.length) * Math.PI * 2;

        const x = Math.cos(a) * radius;
        const z = Math.sin(a) * radius;

        const outward = new THREE.Vector3(x, 0, z).normalize();
        const rotY = Math.atan2(outward.x, outward.z);

        const isBackHalf = Math.cos(a) < 0;
        const finalRotY = rotY + (isBackHalf ? Math.PI : 0);

        return (
          <Text
            key={i}
            position={[x, 0, z]}
            rotation={[0, finalRotY, 0]}
            fontSize={fontSize}
            letterSpacing={0.08}
            color={"#F5F5F0"}
            fillOpacity={opacity}
            raycast={() => null}
            anchorX="center"
            anchorY="middle"
          >
            {ch}
          </Text>
        );
      })}
    </group>
  );
}

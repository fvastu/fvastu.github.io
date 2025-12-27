"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import ThrowBounceMorphItem from "./ThrowBounceMorphItem";

export default function Hero3D({
  scrollRef,
}: {
  scrollRef: React.MutableRefObject<number>;
}) {
  return (
    <div className="absolute inset-0">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 4.6], fov: 42, near: 0.1, far: 40 }}
      >
        <color attach="background" args={["#0A0A0A"]} />

        <ambientLight intensity={0.14} />
        <directionalLight position={[4.2, 5.4, 3.6]} intensity={0.52} />
        <pointLight
          position={[-3.2, -1.0, 3.2]}
          intensity={0.26}
          color={"#C9A86C"}
        />
        <pointLight
          position={[2.2, -2.8, 2.6]}
          intensity={0.12}
          color={"#ffffff"}
        />

        <ThrowBounceMorphItem scrollRef={scrollRef} />

        <Environment preset="city" environmentIntensity={0.24} />
      </Canvas>
    </div>
  );
}

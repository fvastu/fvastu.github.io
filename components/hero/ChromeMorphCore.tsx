"use client";

import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function ChromeMorphCore({
  morphRef,
  pressRef,
  transformRef,
}: {
  morphRef: React.MutableRefObject<number>;
  pressRef: React.MutableRefObject<number>;
  transformRef: React.MutableRefObject<number>;
}) {
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null!);
  const geom = useMemo(() => new THREE.SphereGeometry(1, 220, 220), []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uPress: { value: 0 },
      uTransform: { value: 0 },
      uAccent: { value: new THREE.Color("#E0E0E0") },
    }),
    []
  );

  useEffect(() => {
    const mat = matRef.current;
    if (!mat) return;

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = uniforms.uTime;
      shader.uniforms.uMorph = uniforms.uMorph;
      shader.uniforms.uPress = uniforms.uPress;
      shader.uniforms.uTransform = uniforms.uTransform;
      shader.uniforms.uAccent = uniforms.uAccent;

      shader.vertexShader =
        `
uniform float uTime;
uniform float uMorph;
uniform float uPress;
uniform float uTransform;

float superScale(vec3 d, float e) {
  vec3 ad = abs(d);
  float k = pow(pow(ad.x, e) + pow(ad.y, e) + pow(ad.z, e), 1.0 / e);
  return 1.0 / max(k, 1e-5);
}
mat2 rot(float a){
  float s = sin(a), c = cos(a);
  return mat2(c, -s, s, c);
}
float hash31(vec3 p){
  p = fract(p * 0.1031);
  p += dot(p, p.yzx + 33.33);
  return fract((p.x + p.y) * p.z);
}
` + shader.vertexShader;

      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `
#include <begin_vertex>

vec3 d0 = normalize(position);
float r0 = length(position);

float m = clamp(uMorph, 0.0, 1.0);
float refine = clamp(uTransform, 0.0, 1.0);

float e = mix(2.0, 14.0, m);
float sc = superScale(d0, e);
vec3 p = d0 * (sc * r0);

float token = smoothstep(0.55, 1.0, m);
p.z *= mix(1.0, 0.50, token);
p.y *= mix(1.0, 1.06, token);
p.x *= mix(1.0, 1.02, token);

float n = hash31(d0 * 29.0 + vec3(uTime * 0.02));
float ridge = (n - 0.5);
float ridgeAmp = mix(0.004, 0.012, m) * (1.0 - 0.55 * refine);
p += normalize(p) * ridge * ridgeAmp;

float press = clamp(uPress, 0.0, 1.0);
float squash = mix(1.0, 0.86, press);
float widen  = mix(1.0, 1.12, press);
p.y *= squash;
p.x *= widen;
p.z *= widen;

float twist = (1.0 - refine) * 0.07 * sin(uTime * 0.28) * d0.y;
p.xz = rot(twist) * p.xz;

transformed = p;
objectNormal = normalize(p);
`
      );

      shader.fragmentShader =
        `
uniform float uTime;
uniform float uMorph;
uniform vec3 uAccent;
` + shader.fragmentShader;

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <color_fragment>",
        `
#include <color_fragment>

float ndv = clamp(dot(normalize(vNormal), normalize(vViewPosition)), 0.0, 1.0);
float rim = pow(1.0 - ndv, 2.7);
float m = clamp(uMorph, 0.0, 1.0);

vec3 N = normalize(vNormal);
vec2 uv = vec2(atan(N.z, N.x) / 6.28318 + 0.5, N.y * 0.5 + 0.5);
float lines = abs(fract(uv.y * 18.0 + sin(uTime * 0.10) * 0.20) - 0.5);
float etched = 1.0 - smoothstep(0.08, 0.18, lines);
float etchAmt = etched * smoothstep(0.35, 1.0, m) * 0.45;

diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 0.80, etchAmt);
diffuseColor.rgb += uAccent * (0.08 * rim);
diffuseColor.rgb = pow(diffuseColor.rgb, vec3(0.98));
`
      );

      (mat as any).userData.shader = shader;
    };

    mat.needsUpdate = true;
  }, [uniforms]);

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    uniforms.uMorph.value = morphRef.current;
    uniforms.uPress.value = pressRef.current;
    uniforms.uTransform.value = transformRef.current;
  });

  return (
    <group>
      <mesh>
        <primitive object={geom} attach="geometry" />
        <meshPhysicalMaterial
          ref={matRef}
          color={"#D9D9D9"}
          roughness={0.12}
          metalness={1.0}
          clearcoat={1.0}
          clearcoatRoughness={0.06}
          envMapIntensity={1.3}
          specularIntensity={1.0}
        />
      </mesh>

      <mesh scale={1.015} raycast={() => null}>
        <torusGeometry args={[0.86, 0.055, 64, 240]} />
        <meshPhysicalMaterial
          color={"#FFFFFF"}
          metalness={1}
          roughness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.2}
          transparent
          opacity={0.18}
        />
      </mesh>
    </group>
  );
}

"use client";

import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Text } from "@react-three/drei";

/* ----------------------------- helpers ----------------------------- */

function damp(current: number, target: number, lambda: number, dt: number) {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));
}
function damp3(
  v: THREE.Vector3,
  target: THREE.Vector3,
  lambda: number,
  dt: number
) {
  v.x = damp(v.x, target.x, lambda, dt);
  v.y = damp(v.y, target.y, lambda, dt);
  v.z = damp(v.z, target.z, lambda, dt);
}

/* ----------------------------- background ----------------------------- */
/** Thin shaded grid + soft scanline noise via CSS (cheap + premium). */
function BackgroundGrid() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(245,245,240,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,245,240,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          backgroundPosition: "0 0",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.35) 52%, rgba(0,0,0,0) 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.35) 52%, rgba(0,0,0,0) 78%)",
        }}
      />
      {/* scanlines */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(245,245,240,0.08), rgba(245,245,240,0.02) 1px, transparent 2px)",
          backgroundSize: "100% 10px",
          mixBlendMode: "soft-light",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 75%)",
        }}
      />
      {/* subtle top-left glow */}
      <div className="absolute -left-24 -top-24 h-[520px] w-[520px] rounded-full bg-[#C9A86C]/[0.05] blur-3xl" />
    </div>
  );
}

/* ----------------------------- orbit text ----------------------------- */

function OrbitTextRing({
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

/* ----------------------------- premium morph core ----------------------------- */

function PremiumMorphCore({
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
      uAccent: { value: new THREE.Color("#C9A86C") },
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

// sphere -> rounded cube (superquadric)
float e = mix(2.0, 14.0, m);
float sc = superScale(d0, e);
vec3 p = d0 * (sc * r0);

// premium shaping: "token-ish" at B
float token = smoothstep(0.55, 1.0, m);
p.z *= mix(1.0, 0.52, token);
p.y *= mix(1.0, 1.05, token);
p.x *= mix(1.0, 1.02, token);

// micro faceting (controlled)
float n = hash31(d0 * 29.0 + vec3(uTime * 0.02));
float ridge = (n - 0.5);
float ridgeAmp = mix(0.004, 0.012, m);
ridgeAmp *= (1.0 - 0.55 * refine);
p += normalize(p) * ridge * ridgeAmp;

// press deformation
float press = clamp(uPress, 0.0, 1.0);
float squash = mix(1.0, 0.84, press);
float widen  = mix(1.0, 1.10, press);
p.y *= squash;
p.x *= widen;
p.z *= widen;

// minimal twist near "idea"
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
float lines = abs(fract(uv.y * 20.0 + sin(uTime * 0.10) * 0.30) - 0.5);
float etched = 1.0 - smoothstep(0.08, 0.18, lines);
float etchAmt = etched * smoothstep(0.35, 1.0, m) * 0.55;

diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 0.86, etchAmt);
diffuseColor.rgb += uAccent * (0.10 * rim);
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
          color={"#C9A86C"}
          roughness={0.22}
          metalness={1.0}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          envMapIntensity={0.85}
          specularIntensity={0.95}
        />
      </mesh>

      <mesh scale={1.01} raycast={() => null}>
        <torusGeometry args={[0.86, 0.05, 64, 240]} />
        <meshPhysicalMaterial
          color={"#FFD28A"}
          metalness={1}
          roughness={0.16}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={0.9}
          transparent
          opacity={0.14}
        />
      </mesh>
    </group>
  );
}

/* ------------------ behavior: throw + bounce + slower morph loop ------------------ */

function ThrowBounceMorphItem({
  scrollRef,
}: {
  scrollRef: React.MutableRefObject<number>;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const { camera, viewport } = useThree();

  const morphRef = useRef(0.0);
  const transformRef = useRef(0.0);

  const pressRef = useRef(0);
  const pressTargetRef = useRef(0);

  const dragging = useRef(false);
  const plane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
    []
  );
  const hit = useMemo(() => new THREE.Vector3(), []);
  const dragOffset = useRef(new THREE.Vector3());

  const pos = useRef(new THREE.Vector3(1.55, -0.35, 0));
  const vel = useRef(new THREE.Vector3(0, 0, 0));

  const lastPointerWorld = useRef(new THREE.Vector3(0, 0, 0));
  const lastPointerT = useRef(0);

  const rot = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const restitution = 0.8;
  const linearDrag = 0.32;
  const wallFriction = 0.88;
  const maxSpeed = 10.0;

  const baseScale = 0.66;
  const radius = 1.0 * baseScale * 1.02;

  const intersectPointerPlane = (e: any) => {
    plane.constant = 0;
    e.ray.intersectPlane(plane, hit);
    return hit.clone();
  };

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;

    // parallax camera (kept subtle, fades after hero)
    const s = scrollRef.current;
    const fade = 1.0 - Math.min(s / 0.35, 1.0);
    const strength = 0.15 * fade;
    const px = state.pointer.x * strength;
    const py = state.pointer.y * strength * 0.62;
    const camTarget = new THREE.Vector3(px, py, 4.6);
    damp3(camera.position, camTarget, 3.8, dt);
    camera.lookAt(0, 0, 0);

    // slower morph loop: ~ 2π/0.45 ≈ 14s
    const target = Math.sin(t * 0.45) * 0.5 + 0.5;
    morphRef.current = damp(morphRef.current, target, 5.0, dt);
    transformRef.current = damp(transformRef.current, target, 4.0, dt);

    pressRef.current = damp(pressRef.current, pressTargetRef.current, 18.0, dt);

    const stabilize = transformRef.current;
    rot.current.tx =
      Math.sin(t * 0.11) * (0.14 * (1 - stabilize) + 0.05 * stabilize);
    rot.current.ty =
      Math.cos(t * 0.09) * (0.18 * (1 - stabilize) + 0.06 * stabilize);
    rot.current.x = damp(rot.current.x, rot.current.tx, 3.0, dt);
    rot.current.y = damp(rot.current.y, rot.current.ty, 2.6, dt);

    const refinedScale = baseScale * (1 - 0.04 * stabilize);
    const pressedScale = 1 - pressRef.current * 0.06;

    const vp = viewport.getCurrentViewport(camera, new THREE.Vector3(0, 0, 0));
    const halfW = vp.width * 0.5;
    const halfH = vp.height * 0.5;
    const minX = -halfW + radius;
    const maxX = halfW - radius;
    const minY = -halfH + radius;
    const maxY = halfH - radius;

    if (!dragging.current) {
      pos.current.x += vel.current.x * dt;
      pos.current.y += vel.current.y * dt;

      const drag = Math.exp(-linearDrag * dt);
      vel.current.x *= drag;
      vel.current.y *= drag;

      if (pos.current.x < minX) {
        pos.current.x = minX;
        vel.current.x = Math.abs(vel.current.x) * restitution;
        vel.current.y *= wallFriction;
      } else if (pos.current.x > maxX) {
        pos.current.x = maxX;
        vel.current.x = -Math.abs(vel.current.x) * restitution;
        vel.current.y *= wallFriction;
      }

      if (pos.current.y < minY) {
        pos.current.y = minY;
        vel.current.y = Math.abs(vel.current.y) * restitution;
        vel.current.x *= wallFriction;
      } else if (pos.current.y > maxY) {
        pos.current.y = maxY;
        vel.current.y = -Math.abs(vel.current.y) * restitution;
        vel.current.x *= wallFriction;
      }

      const speed = Math.hypot(vel.current.x, vel.current.y);
      if (speed < 0.25) {
        const anchor = new THREE.Vector3(
          halfW - radius - 0.6,
          -halfH + radius + 0.55,
          0
        );
        pos.current.x = damp(pos.current.x, anchor.x, 1.6, dt);
        pos.current.y = damp(pos.current.y, anchor.y, 1.6, dt);
      }
    }

    groupRef.current.position.set(pos.current.x, pos.current.y, 0);
    groupRef.current.rotation.set(rot.current.x, rot.current.y, 0);
    groupRef.current.scale.setScalar(refinedScale * pressedScale);
  });

  return (
    <group
      ref={groupRef}
      position={[1.55, -0.35, 0]}
      onPointerDown={(e) => {
        e.stopPropagation();
        (e.target as any).setPointerCapture?.(e.pointerId);

        dragging.current = true;
        pressTargetRef.current = 1;
        vel.current.set(0, 0, 0);

        const p = intersectPointerPlane(e);
        dragOffset.current.copy(pos.current).sub(p);

        lastPointerWorld.current.copy(p);
        lastPointerT.current = performance.now();
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        e.stopPropagation();

        const p = intersectPointerPlane(e);
        pos.current.copy(p).add(dragOffset.current);

        const vp = viewport.getCurrentViewport(
          camera,
          new THREE.Vector3(0, 0, 0)
        );
        const halfW = vp.width * 0.5;
        const halfH = vp.height * 0.5;

        pos.current.x = THREE.MathUtils.clamp(
          pos.current.x,
          -halfW + radius,
          halfW - radius
        );
        pos.current.y = THREE.MathUtils.clamp(
          pos.current.y,
          -halfH + radius,
          halfH - radius
        );

        const now = performance.now();
        const dtMs = Math.max(8, now - lastPointerT.current);
        const dtS = dtMs / 1000;

        const prev = lastPointerWorld.current.clone();
        lastPointerWorld.current.copy(p);
        lastPointerT.current = now;

        const v = p.clone().sub(prev).divideScalar(dtS);
        vel.current.lerp(new THREE.Vector3(v.x, v.y, 0), 0.35);
      }}
      onPointerUp={(e) => {
        e.stopPropagation();
        (e.target as any).releasePointerCapture?.(e.pointerId);

        dragging.current = false;
        pressTargetRef.current = 0;

        const sp = Math.hypot(vel.current.x, vel.current.y);
        if (sp > maxSpeed) {
          const k = maxSpeed / sp;
          vel.current.x *= k;
          vel.current.y *= k;
        }
      }}
      onPointerCancel={() => {
        dragging.current = false;
        pressTargetRef.current = 0;
      }}
      onClick={(e) => {
        e.stopPropagation();
        pressTargetRef.current = 1;
        setTimeout(() => (pressTargetRef.current = 0), 120);
      }}
    >
      <PremiumMorphCore
        morphRef={morphRef}
        pressRef={pressRef}
        transformRef={transformRef}
      />
      <OrbitTextRing
        text="I EVOLVE, AS IDEAS"
        radius={1.12}
        y={0.0}
        fontSize={0.082}
        opacity={0.42}
        rotationSpeed={0.03}
      />
    </group>
  );
}

/* --------------------------------- HERO -------------------------------- */

export default function AgencyHeroMorphThrowWithWrapText_Grid() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.14], [1, 0.97]);

  const scrollRef = useRef(0);
  useEffect(
    () => scrollYProgress.on("change", (v) => (scrollRef.current = v)),
    [scrollYProgress]
  );

  return (
    <motion.section
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="relative h-[100svh] w-full overflow-hidden bg-[#0A0A0A]"
    >
      <BackgroundGrid />

      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="mx-auto grid h-full max-w-[1370px] grid-cols-1 items-center px-8 md:px-16 lg:grid-cols-12 lg:px-24">
          <div className="lg:col-span-7 pt-16 lg:pt-0">
            <div className="text-xs tracking-[0.22em] uppercase text-[#8A8A85]">
              Product UI • Systems • Shipping
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight leading-[0.95] tracking-[-0.03em]">
              I craft digital
              <br />
              experiences that
              <br />
              <span className="text-[#C9A86C] italic font-light">matter</span>
            </h1>
          </div>
        </div>
      </div>

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

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(0,0,0,0.62)_100%)]" />
      </div>

      <div className="pointer-events-none absolute bottom-12 left-8 md:left-16 lg:left-24 flex items-center gap-3">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#333] to-transparent" />
        <span className="text-xs tracking-widest uppercase text-[#555]">
          Scroll
        </span>
      </div>
    </motion.section>
  );
}

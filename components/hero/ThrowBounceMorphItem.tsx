"use client";

import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import PremiumMorphCore from "./PremiumMorphCore";
import GlassMorphCore from "./GlassMorphCore";
import ChromeMorphCore from "./ChromeMorphCore";
import MatteStoneMorphCore from "./MatteStoneMorphCore";
import AuroraMorphCore from "./AuroraMorphCore";

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

export default function ThrowBounceMorphItem({
  scrollRef,
  variant = "premium",
}: {
  scrollRef: React.MutableRefObject<number>;
  variant?: "premium" | "glass" | "chrome" | "stone" | "aurora";
}) {
  // Mobile detection
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(max-width: 767px)").matches;
  const groupRef = useRef<THREE.Group>(null!);
  const { camera, viewport, size } = useThree();

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

  // BOUNCE & SOFTNESS TUNING
  const restitution = 0.92; // more bounce
  const linearDrag = 0.22; // less drag, more glide
  const wallFriction = 0.93; // less friction, more bounce
  const maxSpeed = 10.0;

  // Make the object 30% smaller on mobile screens
  const baseScale = size.width < 768 ? 0.66 * 0.7 : 0.66;
  const radius = 1.0 * baseScale * 1.02;

  const Core = () => {
    switch (variant) {
      case "glass":
        return (
          <GlassMorphCore
            morphRef={morphRef}
            pressRef={pressRef}
            transformRef={transformRef}
          />
        );
      case "chrome":
        return (
          <ChromeMorphCore
            morphRef={morphRef}
            pressRef={pressRef}
            transformRef={transformRef}
          />
        );
      case "stone":
        return (
          <MatteStoneMorphCore
            morphRef={morphRef}
            pressRef={pressRef}
            transformRef={transformRef}
          />
        );
      case "aurora":
        return (
          <AuroraMorphCore
            morphRef={morphRef}
            pressRef={pressRef}
            transformRef={transformRef}
          />
        );
      default:
        return (
          <PremiumMorphCore
            morphRef={morphRef}
            pressRef={pressRef}
            transformRef={transformRef}
          />
        );
    }
  };

  const intersectPointerPlane = (e: any) => {
    plane.constant = 0;
    e.ray.intersectPlane(plane, hit);
    return hit.clone();
  };

  // For mobile: smooth random movement
  const mobileTargetDir = useRef(new THREE.Vector2(1, 0));
  const mobileTargetSpeed = useRef(1.5);
  const mobileChangeTimer = useRef(0);
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
      if (isMobile) {
        // Change direction and speed smoothly every 1.2-2.2s
        mobileChangeTimer.current -= dt;
        if (mobileChangeTimer.current <= 0) {
          const angle = Math.random() * Math.PI * 2;
          mobileTargetDir.current.set(Math.cos(angle), Math.sin(angle));
          mobileTargetSpeed.current = 0.7 + Math.random() * 1.7;
          mobileChangeTimer.current = 1.2 + Math.random() * 1.0;
        }
        // Smoothly interpolate velocity toward target direction and speed
        const targetVel = mobileTargetDir.current
          .clone()
          .multiplyScalar(mobileTargetSpeed.current);
        // Softer, more organic interpolation
        vel.current.x = damp(vel.current.x, targetVel.x, 0.7, dt);
        vel.current.y = damp(vel.current.y, targetVel.y, 0.7, dt);
      }
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
      if (speed < 0.25 && !isMobile) {
        // Only anchor to corner if not mobile (mobile: always move)
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
      <Core />
    </group>
  );
}

"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const COUNT = 150;
const LINK_DIST = 1.35;
const MAX_LINKS = COUNT * 6;

function Network({ still }) {
  const group = useRef();
  const pointsGeo = useRef();
  const linesGeo = useRef();
  const { pointer } = useThree();

  const { positions, velocities, linePositions, lineColors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      // distribuição num elipsoide achatado, como uma "nuvem" de sinapses
      const r = Math.cbrt(Math.random()) * 4.2;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(p) * Math.cos(t) * 1.5;
      positions[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * 0.75;
      positions[i * 3 + 2] = r * Math.cos(p);
      velocities[i * 3] = (Math.random() - 0.5) * 0.004;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
    }
    return {
      positions,
      velocities,
      linePositions: new Float32Array(MAX_LINKS * 6),
      lineColors: new Float32Array(MAX_LINKS * 6),
    };
  }, []);

  const amber = useMemo(() => new THREE.Color("#ffb547"), []);
  const tide = useMemo(() => new THREE.Color("#7fe3d4"), []);

  const update = (time) => {
    if (!still) {
      for (let i = 0; i < COUNT * 3; i++) {
        positions[i] += velocities[i];
        if (Math.abs(positions[i]) > 6) velocities[i] *= -1;
      }
    }
    let n = 0;
    const pulse = (Math.sin(time * 0.8) + 1) / 2;
    for (let i = 0; i < COUNT && n < MAX_LINKS; i++) {
      const ax = positions[i * 3], ay = positions[i * 3 + 1], az = positions[i * 3 + 2];
      for (let j = i + 1; j < COUNT && n < MAX_LINKS; j++) {
        const dx = ax - positions[j * 3];
        const dy = ay - positions[j * 3 + 1];
        const dz = az - positions[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < LINK_DIST) {
          const a = 1 - d / LINK_DIST;
          const c = (i + j) % 11 === 0 ? tide : amber;
          const k = n * 6;
          linePositions[k] = ax; linePositions[k + 1] = ay; linePositions[k + 2] = az;
          linePositions[k + 3] = positions[j * 3];
          linePositions[k + 4] = positions[j * 3 + 1];
          linePositions[k + 5] = positions[j * 3 + 2];
          const s = a * (0.35 + 0.25 * pulse);
          lineColors[k] = c.r * s; lineColors[k + 1] = c.g * s; lineColors[k + 2] = c.b * s;
          lineColors[k + 3] = c.r * s; lineColors[k + 4] = c.g * s; lineColors[k + 5] = c.b * s;
          n++;
        }
      }
    }
    linesGeo.current.setDrawRange(0, n * 2);
    linesGeo.current.attributes.position.needsUpdate = true;
    linesGeo.current.attributes.color.needsUpdate = true;
    pointsGeo.current.attributes.position.needsUpdate = true;
  };

  useFrame((state) => {
    update(state.clock.elapsedTime);
    if (group.current && !still) {
      group.current.rotation.y += 0.0009;
      group.current.rotation.x += (pointer.y * 0.25 - group.current.rotation.x) * 0.03;
      group.current.position.x += (pointer.x * 0.4 - group.current.position.x) * 0.03;
    }
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry ref={pointsGeo}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.055} color="#ffb547" sizeAttenuation transparent opacity={0.9} />
      </points>
      <lineSegments>
        <bufferGeometry ref={linesGeo}>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[lineColors, 3]} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

export default function NeuralField({ still = false }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7.5], fov: 55 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      frameloop={still ? "demand" : "always"}
      aria-hidden="true"
    >
      <fog attach="fog" args={["#07121b", 5, 13]} />
      <Network still={still} />
    </Canvas>
  );
}

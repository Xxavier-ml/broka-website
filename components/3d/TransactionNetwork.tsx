"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

type NodeSpec = {
  label: string;
  sub: string;
  radius: number; // orbit radius
  angle: number; // starting angle, radians
  speed: number; // radians / second
  size: number;
  color: string;
  yOffset?: number;
};

const NODES: NodeSpec[] = [
  { label: "BUYER", sub: "intent", radius: 3.3, angle: 0, speed: 0.05, size: 0.22, color: "#9B8AFF" },
  { label: "SELLER", sub: "supply", radius: 3.3, angle: Math.PI, speed: 0.05, size: 0.22, color: "#E5C55A", yOffset: 0 },
  { label: "PRODUCT", sub: "listing", radius: 2.3, angle: Math.PI * 0.5, speed: -0.08, size: 0.15, color: "#C4BAFF", yOffset: 0.7 },
  { label: "CONTEXT", sub: "price · place · condition", radius: 2.3, angle: Math.PI * 1.5, speed: -0.08, size: 0.15, color: "#716888", yOffset: -0.7 },
  { label: "NEGOTIATION", sub: "back and forth", radius: 4.1, angle: Math.PI * 0.25, speed: 0.035, size: 0.17, color: "#9B8AFF", yOffset: -0.45 },
  { label: "TRUST", sub: "verification", radius: 4.1, angle: Math.PI * 1.25, speed: 0.035, size: 0.17, color: "#C8A23E", yOffset: 0.45 },
];

/** A single orbiting node: glowing sphere + screen-projected label. */
function OrbitNode({ node }: { node: NodeSpec }) {
  const group = useRef<THREE.Group>(null);
  const angle = useRef(node.angle);

  useFrame((_, delta) => {
    angle.current += node.speed * delta;
    group.current?.position.set(
      Math.cos(angle.current) * node.radius,
      node.yOffset ?? 0,
      Math.sin(angle.current) * node.radius
    );
  });

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[node.size, 24, 24]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={0.9}
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>
      <pointLight color={node.color} intensity={2} distance={3.2} decay={2} />
      <Html center distanceFactor={9} style={{ pointerEvents: "none" }}>
        <div
          style={{
            fontFamily: "var(--f-body, Inter, sans-serif)",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.09em",
            color: node.color,
            whiteSpace: "nowrap",
            textShadow: "0 0 10px rgba(5,5,7,0.9), 0 0 2px rgba(5,5,7,0.9)",
          }}
        >
          {node.label}
        </div>
      </Html>
    </group>
  );
}

/** The line connecting a node back to the central BROKA/Zeno core. */
function ConnectionLine({ node }: { node: NodeSpec }) {
  const geomRef = useRef<THREE.BufferGeometry>(null);
  const angle = useRef(node.angle);
  const positions = useMemo(() => new Float32Array([0, 0, 0, 0, 0, 0]), []);

  useFrame((_, delta) => {
    angle.current += node.speed * delta;
    const x = Math.cos(angle.current) * node.radius;
    const y = node.yOffset ?? 0;
    const z = Math.sin(angle.current) * node.radius;
    const attr = geomRef.current?.attributes.position as
      | THREE.BufferAttribute
      | undefined;
    if (attr) {
      attr.setXYZ(1, x, y, z);
      attr.needsUpdate = true;
    }
  });

  return (
    <line>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color={node.color} transparent opacity={0.32} />
    </line>
  );
}

/** The central BROKA / Zeno core — the "intelligence layer" coordinating the network. */
function CenterCore() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const s = 1 + Math.sin(clock.getElapsedTime() * 1.15) * 0.05;
    mesh.current?.scale.setScalar(s);
  });

  return (
    <group>
      <mesh ref={mesh}>
        <sphereGeometry args={[0.52, 32, 32]} />
        <meshStandardMaterial
          color="#6B56FF"
          emissive="#6B56FF"
          emissiveIntensity={1.15}
          roughness={0.25}
          metalness={0.2}
        />
      </mesh>
      <pointLight color="#9B8AFF" intensity={4.5} distance={7} decay={2} />
      <Html center distanceFactor={9} style={{ pointerEvents: "none" }}>
        <div
          style={{
            fontFamily: "var(--f-display, Syne, sans-serif)",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.06em",
            color: "#EDE8FF",
            textShadow: "0 0 10px rgba(5,5,7,0.9)",
          }}
        >
          ZENO
        </div>
      </Html>
    </group>
  );
}

/** Subtle pointer-driven parallax — restrained, not a full orbit-drag control. */
function PointerParallaxRig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.x * 1.1 - camera.position.x) * 0.03;
    camera.position.y += (pointer.y * 0.7 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function TransactionNetwork() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.22} />
      <hemisphereLight args={["#6B56FF", "#050507", 0.3]} />
      <CenterCore />
      {NODES.map((n) => (
        <group key={n.label}>
          <ConnectionLine node={n} />
          <OrbitNode node={n} />
        </group>
      ))}
      <PointerParallaxRig />
    </Canvas>
  );
}

export default TransactionNetwork;

"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function HeartParticles() {
    const ref = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const count = 3000;
        const array = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const t = Math.random() * Math.PI * 2;
            const u = Math.random() + Math.random();
            const r = u > 1 ? 2 - u : u;

            // Heart shape formula
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            const z = (Math.random() - 0.5) * 5; // Thickness

            // Scale down
            const scale = 0.15;

            // Add some randomness inside the volume
            const spread = 0.5;

            array[i * 3] = x * scale + (Math.random() - 0.5) * spread;
            array[i * 3 + 1] = y * scale + (Math.random() - 0.5) * spread;
            array[i * 3 + 2] = z * scale + (Math.random() - 0.5) * spread;
        }
        return array;
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            // ref.current.rotation.x -= delta / 10; // Stopped rotation
            // ref.current.rotation.y -= delta / 15; // Stopped rotation

            // Enhanced Pulse effect
            // Heartbeat pattern: beat-beat-pause
            const time = state.clock.elapsedTime * 3;
            const scale = 1 + Math.sin(time) * 0.1 + Math.sin(time * 2) * 0.05; // Complex beat

            ref.current.scale.set(scale, scale, scale);

            // Optional: Subtle floating instead of rotation
            ref.current.rotation.y = Math.sin(time * 0.2) * 0.1;
        }
    });

    return (
        <group rotation={[0, 0, 0]}> {/* Removed Math.PI rotation */}
            <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#ff4d6d"
                    size={0.06} // Sligtly bigger particles
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </Points>
        </group>
    );
}

export function ThreeHeart() {
    return (
        <div className="w-full h-full absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                <ambientLight intensity={0.5} />
                <HeartParticles />
            </Canvas>
        </div>
    );
}

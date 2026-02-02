"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

export function FloatingHeartsBackground() {
    const [particles, setParticles] = useState<Array<{ left: string, top: string, fontSize: string, duration: number, delay: number, initialX: string, initialY: string }>>([]);

    useEffect(() => {
        // Determine count based on screen size ideally, but static is fine for now
        const newParticles = Array.from({ length: 40 }).map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${Math.random() * 2 + 1}rem`,
            duration: Math.random() * 10 + 10, // Slower, more ambient
            delay: Math.random() * 5,
            initialX: `${Math.random() * 50 - 25}%`,
            initialY: `${Math.random() * 50 - 25}%`,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute text-[#ff4d6d]" // Vivid Love Pink Color
                    initial={{
                        x: 0,
                        y: 0,
                        opacity: 0,
                        scale: 0.5,
                    }}
                    animate={{
                        y: -150,
                        opacity: [0, 0.7, 0], // Higher opacity
                        scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear",
                    }}
                    style={{
                        left: p.left,
                        top: p.top,
                        fontSize: p.fontSize,
                    }}
                >
                    <Heart fill="currentColor" />
                </motion.div>
            ))}
        </div>
    );
}

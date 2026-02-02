"use client";

import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import dynamic from 'next/dynamic';

const ThreeHeart = dynamic(() => import('./ThreeHeart').then(mod => mod.ThreeHeart), { ssr: false });

export function SuccessSection() {
    useEffect(() => {
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
        };

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-transparent text-white overflow-hidden text-center relative">
            <div className="absolute inset-0 bg-gradient-to-b from-love-red/20 to-love-pink/10 pointer-events-none z-0" />

            {/* 3D Heart Background */}
            <Suspense fallback={null}>
                <ThreeHeart />
            </Suspense>

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="z-10 bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20 shadow-xl"
            >
                <h1 className="text-4xl md:text-6xl font-serif mb-4 text-love-text drop-shadow-lg">
                    You just made me the<br />happiest person alive! 💞
                </h1>
                <p className="text-2xl text-love-text font-serif">I love you! 💖</p>
            </motion.div>
        </div>
    );
}

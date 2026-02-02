"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart, Mail, Stars } from "lucide-react";
import { useEffect, useState } from "react";

interface LandingProps {
    onNext: () => void;
}

export function Landing({ onNext }: LandingProps) {
    const [particles, setParticles] = useState<Array<{ left: string, top: string, fontSize: string, duration: number, delay: number, initialX: string, initialY: string }>>([]);

    return (
        <div className="relative h-screen w-full flex flex-col items-center justify-center text-center p-4 overflow-hidden bg-transparent perspective-1000">
            {/* Background elements moved to global layout */}

            {/* Clouds / Decoration */}
            <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-pink-300/30 rounded-full blur-[100px] animate-pulse delay-0" />
            <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-rose-300/20 rounded-full blur-[100px] animate-pulse delay-1000" />

            {/* Floating Sparkles */}
            <div className="absolute top-20 right-20 text-white/50 animate-bounce delay-700"><Stars size={40} /></div>
            <div className="absolute bottom-20 left-20 text-white/50 animate-bounce delay-300"><Sparkles size={30} /></div>

            {/* Main Content */}

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="z-10 bg-white/40 backdrop-blur-xl p-12 rounded-[2rem] shadow-2xl border border-white/60 max-w-lg w-full relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent pointer-events-none" />

                {/* Decorative Icon Behind Text */}
                <div className="absolute -right-10 -top-10 text-love-pink/10 rotate-12">
                    <Mail size={200} />
                </div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="relative z-10"
                >
                    <h1 className="text-5xl md:text-7xl font-serif text-love-text mb-6 drop-shadow-sm">
                        Hey love... 🌹
                    </h1>
                    <p className="text-xl md:text-2xl text-love-text/80 font-sans mb-10 leading-relaxed font-light">
                        I made something special just for you.
                    </p>
                </motion.div>

                <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(255 77 109 / 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNext}
                    className="group relative px-10 py-4 bg-gradient-to-r from-love-red to-love-pink text-white rounded-full text-xl font-bold shadow-xl shadow-love-red/30 transition-all overflow-hidden"
                >
                    <span className="flex items-center gap-3 relative z-10">
                        Open Your Card
                        <Sparkles className="w-6 h-6 animate-spin-slow" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </motion.button>
            </motion.div>
        </div>
    );
}

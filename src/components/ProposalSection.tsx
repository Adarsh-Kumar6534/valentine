"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface ProposalSectionProps {
    onSuccess: () => void;
}

export function ProposalSection({ onSuccess }: ProposalSectionProps) {
    const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
    const [hoverCount, setHoverCount] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const moveNoButton = () => {
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const maxDistX = containerRect.width / 2 - 100;
        const maxDistY = containerRect.height / 2 - 50;

        const newX = Math.random() * (maxDistX * 2) - maxDistX;
        const newY = Math.random() * (maxDistY * 2) - maxDistY;

        setNoBtnPosition({ x: newX, y: newY });
        setHoverCount((prev) => prev + 1);
    };

    const getNoButtonText = () => {
        const texts = ["No", "Are you sure?", "Really?", "Think again!", "Last chance!", "You can't say no! 😈"];
        return texts[Math.min(hoverCount, texts.length - 1)];
    };

    return (
        <div ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="text-center z-10"
            >
                <h1 className="text-5xl md:text-7xl font-serif text-love-text mb-12 drop-shadow-sm">
                    Will you be my Valentine? 🌹
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onSuccess}
                        className="px-12 py-4 bg-love-red text-white text-2xl font-bold rounded-full shadow-xl shadow-love-red/40 transition-shadow hover:shadow-love-red/60"
                    >
                        YES! 💖
                    </motion.button>

                    <motion.button
                        animate={{ x: noBtnPosition.x, y: noBtnPosition.y }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        onMouseEnter={moveNoButton}
                        onClick={moveNoButton} // Just in case touch users try to tap
                        className="px-12 py-4 bg-white text-love-text border-2 border-love-text/10 text-xl font-bold rounded-full shadow-sm hover:bg-gray-50 absolute md:static"
                        style={{ position: hoverCount > 0 ? "absolute" : "relative" }}
                    >
                        {getNoButtonText()}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}

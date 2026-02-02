"use client";

import { motion } from "framer-motion";

interface MemoryLaneProps {
    onNext: () => void;
}

const memories = [
    {
        id: 1,
        title: "Your Beautiful Soul",
        text: "Your heart is pure gold. The way you care for others, your gentleness, and your kindness make me fall in love with you deeper every single second.",
        emoji: "✨"
    },
    {
        id: 2,
        title: "Your Smile",
        text: "When you smile, the whole world freezes. It's the most beautiful sight I've ever seen, and it warms my heart in ways I can't explain.",
        emoji: "💖"
    },
    {
        id: 3,
        title: "Us Together",
        text: "Being with you is effortless. Whether we're laughing at silly jokes or sitting in silence, every moment feels like home because I'm with you.",
        emoji: "🏡"
    }
];

import { Star } from "lucide-react";
import { useState } from "react";

export function MemoryLane({ onNext }: MemoryLaneProps) {
    const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

    const handleCardClick = (index: number) => {
        setFlippedIndex(flippedIndex === index ? null : index);
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-8 space-y-12 relative">
            {/* Remove opaque background so global hearts show */}

            {/* Add some local decorative elements */}
            <div className="absolute top-10 left-10 text-love-pink/30 animate-pulse delay-700">
                <Star size={40} fill="currentColor" />
            </div>
            <div className="absolute bottom-10 right-10 text-love-pink/30 animate-pulse delay-1000">
                <Star size={60} fill="currentColor" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center relative z-10"
            >
                <span className="text-sm font-sans tracking-[0.3em] text-love-red/60 uppercase mb-2 block">My Favorite Things</span>
                <h2 className="text-5xl md:text-6xl font-serif text-love-text drop-shadow-sm decoration-wavy underline decoration-love-pink/30 underline-offset-8">
                    Reasons I Love You
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl z-10">
                {memories.map((memory, index) => (
                    <div key={memory.id} className="h-96 w-full perspective-1000 cursor-pointer" onClick={() => handleCardClick(index)}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                rotateY: flippedIndex === index ? 180 : 0
                            }}
                            transition={{ duration: 0.6 }}
                            className="relative h-full w-full transform-style-3d"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Front */}
                            <div
                                className="absolute inset-0 backface-hidden bg-white/40 backdrop-blur-md rounded-[2rem] border-2 border-white/60 shadow-xl flex flex-col items-center justify-center p-8 transition-all hover:shadow-[0_0_30px_rgba(255,77,109,0.3)]"
                                style={{ backfaceVisibility: "hidden" }}
                            >
                                <div className="absolute inset-4 border border-white/40 rounded-[1.5rem]" />

                                <div className="w-24 h-24 bg-gradient-to-br from-white to-love-pink/10 rounded-full flex items-center justify-center mb-6 shadow-inner ring-4 ring-white/50">
                                    <div className="text-6xl filter drop-shadow-sm animate-pulse">{memory.emoji}</div>
                                </div>

                                <h3 className="text-3xl font-bold text-love-text font-serif">{memory.title}</h3>
                                <div className="mt-6 px-4 py-1 bg-white/50 rounded-full text-xs font-bold text-love-red tracking-widest uppercase animate-bounce">
                                    Tap to Read
                                </div>
                            </div>

                            {/* Back */}
                            <div
                                className="absolute inset-0 backface-hidden bg-gradient-to-br from-love-red to-love-pink rounded-[2rem] shadow-2xl flex flex-col items-center justify-center p-8 text-white rotate-y-180 text-center border-4 border-white/20"
                                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                            >
                                <div className="mb-4 text-white/40">
                                    <Star size={32} fill="currentColor" />
                                </div>
                                <p className="text-xl font-medium font-serif leading-relaxed relative z-10 italic">
                                    "{memory.text}"
                                </p>
                                <div className="mt-6 w-12 h-1 bg-white/40 rounded-full" />
                            </div>
                        </motion.div>
                    </div>
                ))}
            </div>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                onClick={onNext}
                className="px-10 py-4 bg-white text-love-red hover:bg-love-red hover:text-white border-2 border-love-red rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all z-10 relative overflow-hidden group"
            >
                <span className="relative z-10">One Last Question... ➜</span>
            </motion.button>
        </div>
    );
}

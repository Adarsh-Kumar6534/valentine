"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface GreetingCardProps {
    onNext: () => void;
}

export function GreetingCard({ onNext }: GreetingCardProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 perspective-1000">
            <motion.div
                className="relative w-[300px] h-[450px] md:w-[400px] md:h-[600px] cursor-pointer preserve-3d transition-transform duration-1000"
                onClick={() => setIsOpen(!isOpen)}
                animate={{ rotateY: isOpen ? -180 : 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* FRONT COVER */}
                <div
                    className="absolute inset-0 backface-hidden bg-gradient-to-br from-love-red to-love-pink rounded-xl shadow-2xl flex flex-col items-center justify-center text-white p-8 border-[6px] border-love-red/30 overflow-hidden"
                    style={{ backfaceVisibility: "hidden", zIndex: 2 }}
                >
                    {/* Decorative pattern overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat" />

                    <div className="relative z-10 border-2 border-white/50 p-6 rounded-lg w-full h-full flex flex-col items-center justify-center backdrop-blur-sm">
                        <Heart className="w-24 h-24 mb-6 fill-white drop-shadow-xl animate-heartbeat" />
                        <h2 className="text-5xl font-serif text-center drop-shadow-md tracking-wider">
                            For You
                        </h2>
                        <div className="w-12 h-1 bg-white/50 rounded-full my-4" />
                        <p className="text-white/90 text-sm font-semibold uppercase tracking-[0.2em] animate-pulse">
                            Tap to Open
                        </p>
                    </div>
                </div>

                {/* INSIDE LEFT (Back of Cover) - Visible when open */}
                <div
                    className="absolute inset-0 bg-[#fffdf7] rounded-xl shadow-xl flex flex-col items-center justify-center p-10 rotate-y-180 border border-gray-100" // Paper color
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        zIndex: 1
                    }}
                >
                    {/* Paper Texture */}
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none" />

                    <div className="relative z-10 text-center space-y-6">
                        <div className="text-love-red/20 mb-4 animate-float">
                            <Heart className="w-12 h-12 mx-auto fill-current" />
                        </div>
                        <p className="text-love-text font-serif italic text-xl leading-relaxed">
                            "Every moment with you is like a dream I never want to wake up from. You are my everything."
                        </p>
                        <div className="w-full h-px bg-love-red/20 mx-auto w-1/2" />
                        <p className="text-sm text-gray-400 font-sans tracking-widest">
                            FOREVER YOURS
                        </p>
                    </div>
                </div>

            </motion.div>

            {/* Right side/Base of card - Positioned to look like the base when opened, or hidden behind? 
            Actually, for a simple fold, we often need two halves. 
            Let's keep it simple: The card flips open to reveal the message. 
            But the user wants a "Greeting Card" typically with two pages side by side.
            For mobile/web simplicity, a single flipping card is often cleaner.
            Let's stick to the single flip for now, but if open, show the content.
        */}

            {/* 
        Alternative: A standard book-fold card.
        Let's try a better approach: A fixed container for the "Inside Right" and the flipping "Cover" is the Left/Top.
        But simpler is often better. Let's start with the Flip Card.
        BUT wait, the prompt asks for "Foldable Greeting Card".
      */}

            {/* REVISED: Book Style Card */}
            {/* If isOpen, we show a layout with two pages side-by-side on desktop? 
          Or just the flipped card reveals the message. The current code does a flip.
          Let's add the "Next" button on the revealed side.
      */}

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-10 md:static md:mt-8 z-50"
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onNext();
                        }}
                        className="px-8 py-3 bg-white text-love-red rounded-full font-bold shadow-lg hover:bg-gray-50 transition-colors"
                    >
                        Read More ➜
                    </button>
                </motion.div>
            )}
        </div>
    );
}

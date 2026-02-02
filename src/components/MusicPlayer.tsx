"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Create audio instance
        const audio = new Audio("/music.mp3");
        audio.loop = true;
        audio.volume = 0.5; // Start at 50% volume
        audioRef.current = audio;

        // Auto-play attempt on first interaction
        const handleInteraction = () => {
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                }).catch((err) => console.error("Auto-play failed:", err));
            }
            // Once interaction happens, remove listeners to avoid re-triggering logic unnecessarily
            // (Standard behavior: once played, we rely on the button)
            document.removeEventListener("click", handleInteraction);
            document.removeEventListener("keydown", handleInteraction);
        };

        document.addEventListener("click", handleInteraction);
        document.addEventListener("keydown", handleInteraction);

        // Cleanup
        return () => {
            document.removeEventListener("click", handleInteraction);
            document.removeEventListener("keydown", handleInteraction);
            audio.pause();
            audioRef.current = null;
        };
    }, []);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent this click from triggering the document listener twice if it wasn't removed yet
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((err) => {
                console.error("Audio playback failed:", err);
            });
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <button
            onClick={togglePlay}
            className="fixed bottom-4 right-4 z-50 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg text-love-red hover:scale-110 transition-transform border border-love-pink/30 group"
            title="Play Music"
        >
            {isPlaying ? (
                <div className="relative">
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-love-red opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-love-red"></span>
                    </span>
                    <Volume2 className="w-6 h-6" />
                </div>
            ) : (
                <VolumeX className="w-6 h-6 opacity-60" />
            )}
        </button>
    );
}

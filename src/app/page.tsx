"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Landing } from "@/components/Landing";
import { GreetingCard } from "@/components/GreetingCard";
import { MemoryLane } from "@/components/MemoryLane";
import { ProposalSection } from "@/components/ProposalSection";
import { SuccessSection } from "@/components/SuccessSection";

import { FloatingHeartsBackground } from "@/components/FloatingHeartsBackground";

// Setup Types for Stages
type Stage = "LANDING" | "CARD" | "MEMORY_LANE" | "PROPOSAL" | "SUCCESS";

export default function Home() {
  const [stage, setStage] = useState<Stage>("LANDING");

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-warm-white via-love-pink/10 to-warm-white font-sans text-love-text">
      {/* Global Background Elements */}
      <FloatingHeartsBackground />

      <AnimatePresence mode="wait">
        {stage === "LANDING" && (
          <motion.div key="landing" exit={{ opacity: 0, y: -50 }} className="absolute inset-0 z-10">
            <Landing onNext={() => setStage("CARD")} />
          </motion.div>
        )}

        {stage === "CARD" && (
          <motion.div key="card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10">
            <GreetingCard onNext={() => setStage("MEMORY_LANE")} />
          </motion.div>
        )}

        {stage === "MEMORY_LANE" && (
          <motion.div key="memory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10">
            <MemoryLane onNext={() => setStage("PROPOSAL")} />
          </motion.div>
        )}

        {stage === "PROPOSAL" && (
          <motion.div key="proposal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-10">
            <ProposalSection onSuccess={() => setStage("SUCCESS")} />
          </motion.div>
        )}

        {stage === "SUCCESS" && (
          <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-10">
            <SuccessSection />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

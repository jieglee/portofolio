"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface LoadingScreenProps {
    onFinish?: () => void;
}

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
    const [gifLoaded, setGifLoaded] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const playSound = useCallback(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio("/sounds/click.mp3");
            audioRef.current.volume = 0.5;
        }
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
    }, []);

    const handleStart = useCallback(() => {
        playSound();
        setDismissed(true);
        setTimeout(() => onFinish?.(), 600);
    }, [playSound, onFinish]);

    useEffect(() => {
        return () => {
            audioRef.current?.pause();
        };
    }, []);

    return (
        <AnimatePresence>
            {!dismissed && (
                <motion.div
                    className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#1B120D]"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    <img
                        src="/images/ekaterina-moiseeva-start-ezgif.com-remove-background.gif"
                        alt="Loading"
                        className="w-[320px] h-[320px] object-contain"
                        onLoad={() => setGifLoaded(true)}
                    />

                    <AnimatePresence>
                        {gifLoaded && (
                            <motion.button
                                onClick={handleStart}
                                className="mt-6 rounded-[3px] bg-[#E3341C] px-10 py-3.5 font-black text-[15px] tracking-[0.08em] text-[#FFE9C7] shadow-[0_3px_0_#8f2011] hover:bg-[#f13f24] active:translate-y-[3px] active:shadow-none"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4 }}
                            >
                                mulai
                            </motion.button>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

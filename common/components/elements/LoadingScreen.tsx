"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface LoadingScreenProps {
    onFinish?: () => void;
}

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
    const [showStart, setShowStart] = useState(false);
    const [dismissed, setDismissed] = useState(false);
    const [hovered, setHovered] = useState(false);
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
        document.body.style.overflow = "hidden";
        const timer = setTimeout(() => setShowStart(true), 3000);
        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "";
        };
    }, []);

    useEffect(() => {
        if (dismissed) {
            document.body.style.overflow = "";
        }
    }, [dismissed]);

    useEffect(() => {
        return () => {
            document.body.style.overflow = "";
            audioRef.current?.pause();
        };
    }, []);

    return (
        <AnimatePresence mode="wait">
            {!dismissed && (
                <motion.div
                    key="loading"
                    className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                    <AnimatePresence mode="wait">
                        {!showStart ? (
                            <motion.img
                                key="gif"
                                src="/images/ekaterina-moiseeva-start-ezgif.com-remove-background.gif"
                                alt="Loading"
                                className="w-[420px] h-[420px] object-contain"
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                            />
                        ) : (
                            <motion.div
                                key="start"
                                className="flex flex-col items-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.button
                                    onClick={handleStart}
                                    onMouseEnter={() => setHovered(true)}
                                    onMouseLeave={() => setHovered(false)}
                                    className="mt-4 bg-transparent border-none cursor-pointer transition-colors duration-300"
                                    style={{
                                        fontFamily: "'Amatic SC', cursive",
                                        fontSize: "96px",
                                        color: hovered ? "#E3341C" : "white",
                                        letterSpacing: "6px",
                                        fontWeight: 400,
                                    }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.3 }}
                                >
                                    start
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

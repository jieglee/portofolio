"use client";
import React, { useRef, useState } from 'react';

interface SpotlightButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const SpotlightButton: React.FC<SpotlightButtonProps> = ({ children, className = '', ...props }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(0.6)}
            onMouseLeave={() => setOpacity(0)}
            className={`relative overflow-hidden ${className}`}
            {...props}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
                style={{
                    opacity,
                    background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.15), transparent 80%)`
                }}
            />
            {children}
        </button>
    );
};

export default SpotlightButton;

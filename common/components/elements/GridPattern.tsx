"use client";

import React, { useId } from "react";

interface GridPatternProps extends React.ComponentPropsWithoutRef<"svg"> {
    size: number;
    offsetX?: number;
    offsetY?: number;
}

function GridPattern({ size, offsetX = 0, offsetY = 0, className, children, ...props }: GridPatternProps) {
    const id = useId();

    return (
        <svg
            {...props}
            className={className}
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <pattern
                    id={id}
                    width={size}
                    height={size}
                    patternUnits="userSpaceOnUse"
                    patternTransform={`translate(${offsetX} ${offsetY})`}
                >
                    <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${id})`} />
            {children}
        </svg>
    );
}

function Block({ row, column, className }: { row: number; column: number; className?: string }) {
    return <rect x={column * 64} y={row * 64} width={64} height={64} className={className} />;
}

GridPattern.Block = Block;

export default GridPattern;

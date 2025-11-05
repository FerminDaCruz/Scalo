"use client";

import { useState } from "react";
import { Lock, Unlock } from "lucide-react";

type Props = {
    type: "primary" | "secondary" | "neutral";
    color: string;
    scale: string[];
    locked: boolean;
    onToggle: () => void;
};

export function ColorItem({ type, color, scale, locked, onToggle }: Props) {
    return (
        <div className="flex flex-col items-center gap-2 relative">
            <div
                className="w-72 h-36 rounded-xl border p-4 group"
                style={{ backgroundColor: color }}
            >
                <div className="flex justify-between items-center">
                    <h2 className="text-md font-mono font-bold">{color}</h2>
                    <button
                        onClick={onToggle}
                        className="text-transparent group-hover:text-white h-6 w-6 "
                    >
                        {locked ? <Lock size={16} /> : <Unlock size={16} />}
                    </button>
                </div>
            </div>

            <div className="flex w-full">
                {scale.map((sc) => (
                    <span
                        key={sc}
                        style={{ backgroundColor: sc }}
                        className="flex-1 aspect-square"
                    />
                ))}
            </div>
        </div>
    );
}

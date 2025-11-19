"use client";

import { useState } from "react";
import { Contrast, Copy, Lock, Slash, Unlock, X } from "lucide-react";
import { WCAGMatrix } from "@/src/types/color";

type Props = {
    type: "primary" | "secondary" | "neutral";
    color: string;
    scale: string[];
    locked: boolean;
    onToggle: () => void;
    wcagMatrix: WCAGMatrix;
};

export function ColorItem({
    type,
    color,
    scale,
    locked,
    onToggle,
    wcagMatrix,
}: Props) {
    const [colorDisplayed, setColorDisplayed] = useState(scale[4]);
    const [showWCAG, setShowWCAG] = useState(false);

    const row = wcagMatrix[colorDisplayed]; // objeto
    const firstReadable = scale.find((sc) => {
        const x = row?.[sc];
        return x === "AAA" || x === "AA" || x === "A";
    });

    let translatedType;
    if (type === "primary") {
        translatedType = "Primario";
    } else if (type === "secondary") {
        translatedType = "Secundario";
    } else if (type === "neutral") {
        translatedType = "Neutral";
    }

    return (
        <div className="flex flex-col items-center relative w-full max-w-100">
            <div
                className="w-full  md:h-36 p-4 group"
                style={{ backgroundColor: colorDisplayed }}
            >
                <div className="flex justify-between items-center">
                    <div
                        className="flex justify-center items-center gap-3"
                        style={{ color: firstReadable || "#000000" }}
                    >
                        <h2 className="text-lg font-mono font-bold">
                            {colorDisplayed}
                        </h2>
                        <button className="md:text-transparent group-hover:text-current">
                            <Copy
                                size={14}
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        colorDisplayed
                                    )
                                }
                            />
                        </button>
                    </div>

                    <div
                        className="flex justify-center items-center gap-3"
                        style={{ color: firstReadable || "#000000" }}
                    >
                        <button
                            onClick={onToggle}
                            className={`${
                                locked ? "" : "md:text-transparent"
                            } group-hover:text-current`}
                        >
                            {locked ? <Lock size={14} /> : <Unlock size={14} />}
                        </button>
                        <button
                            onClick={() => setShowWCAG(!showWCAG)}
                            className={`${
                                showWCAG ? "" : "md:text-transparent"
                            } group-hover:text-current`}
                        >
                            {showWCAG ? (
                                <Contrast size={14} />
                            ) : (
                                <span className="relative inline-block">
                                    <Contrast
                                        size={14}
                                        className="opacity-50 "
                                    />
                                    <Slash
                                        size={14}
                                        className="absolute inset-0"
                                    />
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex w-full">
                {scale.map((sc, index) => {
                    let wcagResult = null;

                    const wcagTextColor = index >= 6 ? scale[0] : scale[8];

                    if (showWCAG) {
                        const row = wcagMatrix[colorDisplayed];
                        const value = row?.[sc];

                        wcagResult =
                            colorDisplayed === sc ? (
                                ""
                            ) : value ? (
                                value
                            ) : (
                                <X size={14} />
                            );
                    }

                    return (
                        <span
                            key={sc}
                            style={{
                                backgroundColor: sc,
                                color: wcagTextColor,
                            }}
                            className="flex-1 aspect-square flex items-center justify-center text-xs"
                            onClick={() => setColorDisplayed(sc)}
                        >
                            {wcagResult}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

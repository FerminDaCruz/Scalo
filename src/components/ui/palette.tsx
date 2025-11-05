"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockedColor } from "@/src/types/color";
import {
    getGrayColor,
    getRandomColor,
} from "@/src/services/color/randomColorService";
import { getComplementaryColor } from "@/src/services/color/accentColorService";
import { ColorItem } from "./colorItem";
import { generateScale } from "@/src/services/color/chromaScaleService";

type Props = {
    initialLocked: LockedColor[];
};

export function Palette({ initialLocked }: Props) {
    const [locked, setLocked] = useState(initialLocked);
    const router = useRouter();

    // togglear un item
    function toggle(type: "primary" | "secondary" | "neutral") {
        setLocked((prev) =>
            prev.map((x) => (x.type === type ? { ...x, locked: !x.locked } : x))
        );
    }

    function newPalette() {
        // generate new colors respetando locks
        const primary = locked.find((l) => l.type === "primary")!.locked
            ? locked.find((l) => l.type === "primary")!.color
            : getRandomColor();

        const secondary = locked.find((l) => l.type === "secondary")!.locked
            ? locked.find((l) => l.type === "secondary")!.color
            : getComplementaryColor(primary);

        const neutral = locked.find((l) => l.type === "neutral")!.locked
            ? locked.find((l) => l.type === "neutral")!.color
            : getGrayColor(primary);

        const slug = [primary, secondary, neutral]
            .map((c) => c.replace("#", "").toLowerCase())
            .join("-");

        router.push(
            `/${slug}?locks=${locked
                .map((l) => (l.locked ? "1" : "0"))
                .join("")}`
        );
    }

    return (
        <div className="flex flex-col gap-10 items-center">
            <div className="flex gap-6">
                {locked.map((x) => {
                    const normalized = `#${x.color}`;
                    return (
                        <ColorItem
                            key={x.type}
                            type={x.type}
                            color={normalized}
                            scale={generateScale(normalized)}
                            locked={x.locked}
                            onToggle={() => toggle(x.type)}
                        />
                    );
                })}
            </div>

            <button onClick={newPalette} className="px-4 py-2 border rounded">
                Generar otra paleta
            </button>
        </div>
    );
}

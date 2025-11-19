"use client";

import { useState } from "react";
import { computeWCAGMatrix } from "@/src/services/wcagService";
import { ColorItem } from "./colorItem";
import { generateScale } from "@/src/services/color/chromaScaleService";
import { Input } from "@/components/ui/input";
import FamilySelect from "./familySelect";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { Family, LockedColor, TypeColor } from "@/src/types/color";

import CopyPaletteButton, { PaletteFormat } from "./copyPaletteButton";

type Props = {
    locked: LockedColor[];
    toggle: (type: TypeColor) => void;
    generalColor: Family;
    setGeneralColor: (family: Family) => void;
    setSpecificColor: (color: string) => void;
    newPalette: () => void;
    primary: string[];
    secondary: string[];
    neutral: string[];
};

export default function PaletteBuilder({
    locked,
    toggle,
    generalColor,
    setGeneralColor,
    setSpecificColor,
    newPalette,
    primary,
    secondary,
    neutral,
}: Props) {
    const getScaleForType = (type: string, baseColor: string) => {
        // Usa la escala prop si existe; si no, genera una a partir del color base
        if (type === "primary" && Array.isArray(primary) && primary.length)
            return primary;
        if (
            type === "secondary" &&
            Array.isArray(secondary) &&
            secondary.length
        )
            return secondary;
        if (type === "neutral" && Array.isArray(neutral) && neutral.length)
            return neutral;

        return generateScale(baseColor);
    };
    return (
        <div className="flex flex-col items-center w-full">
            {/* Colores */}
            <div className="flex flex-col justify-center items-center md:flex-row md:gap-6 w-full">
                {locked.map((x) => {
                    const normalized = x.color.startsWith("#")
                        ? x.color
                        : `#${x.color}`;

                    const scale = getScaleForType(x.type, normalized);

                    return (
                        <ColorItem
                            key={x.type}
                            type={x.type}
                            color={normalized}
                            scale={scale}
                            locked={x.locked}
                            onToggle={() => toggle(x.type)}
                            wcagMatrix={computeWCAGMatrix(scale)}
                        />
                    );
                })}
            </div>

            {/* Inputs */}
            <div className="flex gap-2 place-items-center mt-5 relative">
                <Input
                    type="text"
                    placeholder="#123456"
                    className="w-30 border px-4 py-1 rounded-full bg-white! "
                    onChange={(e) =>
                        setSpecificColor(
                            e.target.value.startsWith("#")
                                ? e.target.value
                                : `#${e.target.value}`
                        )
                    }
                />
                <FamilySelect
                    generalColor={generalColor}
                    setGeneralColor={setGeneralColor}
                />
            </div>

            {/* Generar */}
            <Button
                onClick={newPalette}
                className="px-4 py-2 w-[248px] flex border rounded-full my-3 relative"
            >
                <RefreshCcw />
                Generar
            </Button>

            {/* Copiar paleta */}
            <CopyPaletteButton
                primary={primary}
                accent={secondary}
                neutral={neutral}
            />
        </div>
    );
}

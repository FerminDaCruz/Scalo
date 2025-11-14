"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Family, LockedColor, TypeColor } from "@/src/types/color";
import {
    getGrayColor,
    getRandomColor,
    getRandomColorByFamily,
} from "@/src/services/color/randomColorService";
import { getComplementaryColor } from "@/src/services/color/accentColorService";
import {
    generateGrayScale,
    generateGrayScale2,
    generateScale,
} from "@/src/services/color/chromaScaleService";
import ExamplePage from "../pages/exampleLandingResponsive";
import PaletteBuilder from "./paletteBuilder";
import Carrousel from "../pages/carrousel";

type Props = {
    primary: string;
    secondary: string;
    neutral: string;
};

export function Palette({ primary, secondary, neutral }: Props) {
    const router = useRouter();

    const [locks, setLocks] = useState<LockedColor[] | null>(null);

    const [specificColor, setSpecificColor] = useState("");
    const [generalColor, setGeneralColor] = useState<Family>(() => {
        if (typeof window === "undefined") return "";
        return (localStorage.getItem("generalColor") as Family) || "";
    });

    // Leer localStorage después de montar
    useEffect(() => {
        const data = localStorage.getItem("locks");
        if (data) {
            setLocks(JSON.parse(data));
        } else {
            setLocks(initialLocked); // primera vez
        }
    }, []);

    // Guardar cuando cambien
    useEffect(() => {
        if (locks) {
            localStorage.setItem("locks", JSON.stringify(locks));
        }
    }, [locks]);

    useEffect(() => {
        localStorage.setItem("generalColor", generalColor);
    }, [generalColor]);

    function toggle(type: TypeColor) {
        setLocked((prev) =>
            prev.map((x) => (x.type === type ? { ...x, locked: !x.locked } : x))
        );
    }

    function newPalette() {
        const primaryLock = locked.find((l) => l.type === "primary")!;
        const secondaryLock = locked.find((l) => l.type === "secondary")!;
        const neutralLock = locked.find((l) => l.type === "neutral")!;

        let newPrimary: string;

        if (primaryLock.locked) {
            newPrimary = primaryLock.color;
        } else if (specificColor.startsWith("#") && specificColor.length >= 4) {
            newPrimary = specificColor;
        } else if (generalColor.trim().length > 0) {
            newPrimary = getRandomColorByFamily(generalColor);
        } else {
            newPrimary = getRandomColor();
        }

        const newSecondary = secondaryLock.locked
            ? secondaryLock.color
            : getComplementaryColor(newPrimary);

        const newNeutral = neutralLock.locked
            ? neutralLock.color
            : getGrayColor(newPrimary);

        setLocked((prev) =>
            prev.map((l) => {
                if (l.type === "primary") return { ...l, color: newPrimary };
                if (l.type === "secondary")
                    return { ...l, color: newSecondary };
                if (l.type === "neutral") return { ...l, color: newNeutral };
                return l;
            })
        );
    }

    const primaryColorScale = generateScale(
        locked.find((l) => l.type === "primary")!.color
    );
    const secondaryColorScale = generateScale(
        locked.find((l) => l.type === "secondary")!.color
    );
    const neutralColorScale = generateGrayScale2(
        locked.find((l) => l.type === "neutral")!.color
    );
    return (
        <div className="h-full w-full flex flex-col justify-center items-center ">
            <PaletteBuilder
                locked={locked}
                toggle={toggle}
                generalColor={generalColor}
                setGeneralColor={setGeneralColor}
                setSpecificColor={setSpecificColor}
                newPalette={newPalette}
            />
            <Carrousel
                primary={primaryColorScale}
                secondary={secondaryColorScale}
                neutral={neutralColorScale}
            />
        </div>
    );
}

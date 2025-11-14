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
    initialLocked: LockedColor[];
};

export function Palette({ initialLocked }: Props) {
    const [locked, setLocked] = useState(initialLocked);
    const [specificColor, setSpecificColor] = useState("");
    const [generalColor, setGeneralColor] = useState<Family>("");
    const router = useRouter();

    useEffect(() => {
        queueMicrotask(() => {
            const saved = localStorage.getItem("generalColor") as Family;
            if (saved) setGeneralColor(saved);
        });
    }, []);

    // Función para generar un color en base a rojo, azul, amarrillo, etc: getRandomColorByFamily()

    function toggle(type: TypeColor) {
        setLocked((prev) =>
            prev.map((x) => (x.type === type ? { ...x, locked: !x.locked } : x))
        );
    }

    function newPalette() {
        let primary;

        if ((primary = locked.find((l) => l.type === "primary")!.locked)) {
            primary = locked.find((l) => l.type === "primary")!.color;
        } else if (specificColor.startsWith("#") && specificColor.length >= 4) {
            primary = specificColor;
        } else if (generalColor.trim().length > 0) {
            primary = getRandomColorByFamily(generalColor);
        } else {
            primary = getRandomColor();
        }

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

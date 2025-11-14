import { Family } from "@/src/types/color";
import chroma from "chroma-js";

export const COLOR_RANGES = {
    rojo: [0, 10],
    naranja: [20, 40],
    amarillo: [45, 65],
    verde: [100, 140],
    azul: [200, 240],
    violeta: [260, 300],
    "": [0, 360],
} as const;

export function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    const color = `#${r.toString(16).padStart(2, "0")}${g
        .toString(16)
        .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

    return color;
}

export function getRandomColorByHue(hueRange: readonly [number, number]) {
    const hue = hueRange[0] + Math.random() * (hueRange[1] - hueRange[0]);
    const saturation = 0.7 + Math.random() * 0.3;
    const lightness = 0.4 + Math.random() * 0.3;
    const color = chroma.hsl(hue, saturation, lightness).hex();
    return color;
}

export function getRandomColorByFamily(family: Family) {
    const hueRange = COLOR_RANGES[family];
    const color = getRandomColorByHue(hueRange);
    return color;
}

export function getGrayColor(baseColor: string) {
    const [h, , l] = chroma(baseColor).hsl();

    const baseL = (l + 0.4) / 2;

    const varianceL = (Math.random() - 0.5) * 0.2;
    const newL = Math.max(0.35, Math.min(0.75, baseL + varianceL));

    const tinyS = 0.02 + Math.random() * 0.04;
    const tinyHueShift = (Math.random() - 0.5) * 8;

    const newH = h + tinyHueShift;

    return chroma.hsl(newH, tinyS, newL).hex();
}

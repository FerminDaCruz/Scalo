import chroma from "chroma-js";
import { WCAGLevel, WCAGMatrix } from "../types/color";

export function computeWCAGMatrix(scale: string[]): WCAGMatrix {
    /**
     * Recibe un array de hex strings (9 colores).
     * Devuelve un objeto matriz con los niveles de contraste
     * entre TODOS con TODOS.
     *
     * Ej:
     * input = ["#fafafa","#f0f0f0", ... "#111111"]
     * output = {
     *   "#fafafa": {
     *      "#fafafa": "AA",
     *      "#f0f0f0": "A",
     *      ...
     *   },
     *   "#f0f0f0": {...}
     * }
     */

    // ---------- internal helpers ----------
    function hexToLuminance(hex: string) {
        const c = chroma(hex)
            .rgb()
            .map((v) => v / 255)
            .map((v) =>
                v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
            );
        return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    }

    function contrastRatio(hexA: string, hexB: string) {
        const L1 = hexToLuminance(hexA);
        const L2 = hexToLuminance(hexB);
        const lighter = Math.max(L1, L2);
        const darker = Math.min(L1, L2);
        return +((lighter + 0.05) / (darker + 0.05)).toFixed(2);
    }

    function wcagLevelForRatio(r: number): WCAGLevel {
        if (r >= 7) return "AAA";
        if (r >= 4.5) return "AA";
        if (r >= 3) return "A";
        return null; // falla el contraste -> X
    }

    // ---------- matrix build ----------
    const matrix: WCAGMatrix = {};

    // por cada color del scale
    for (const a of scale) {
        matrix[a] = {};
        // comparar contra todos los otros
        for (const b of scale) {
            const ratio = contrastRatio(a, b);
            const level = wcagLevelForRatio(ratio);
            matrix[a][b] = level; // "AAA" | "AA" | "A" | null
        }
    }

    return matrix;
    /* Como usar:

const wcagMatrix = computeWCAGMatrix(primaryScale);

scale.map(a => scale.map(b => {
    const level = wcagMatrix[a][b]
    if(level === null) dibujar una X
    else mostrar level ("A","AA","AAA")
})) */
}

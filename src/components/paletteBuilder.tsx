"use client";

import React, { useMemo, useRef, useState } from "react";
import chroma from "chroma-js";
import {
    getRandomColor,
    getRandomColorByFamily,
} from "../services/color/randomColorService";
import {
    generateColorScale,
    generateGrayScale,
} from "../services/color/chromaScaleService";
import {
    getAnalogousColor,
    getComplementaryColor,
} from "../services/color/accentColorService";

/* -----------------------------
   Types
   ----------------------------- */
type Family = "rojo" | "naranja" | "amarillo" | "verde" | "azul" | "violeta";

type GroupName = "primary" | "secondary" | "neutral";

export type WCAGLevel = "AAA" | "AA" | "A" | null;

export type WCAGMatrix = Record<string, Record<string, WCAGLevel>>;

type ColorGroup = {
    name: GroupName;
    baseColor: string; // #hex original, color base usada para generar la escala
    scale: string[]; // escala de 9 colores donde [4] es el 500
    displayColor: string; // color actual que se está mostrando
    locked: boolean; // bloqueado si/no
    wcagMatrix: WCAGMatrix;
};

function computeWCAGMatrix(scale: string[]): WCAGMatrix {
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

function makePrimaryGroup(seed: string): ColorGroup {
    const scale = generateColorScale(seed); // returns 9 colors
    const wcagMatrix = computeWCAGMatrix(scale);
    return {
        name: "primary",
        baseColor: seed,
        scale,
        displayColor: scale[4],
        locked: false,
        wcagMatrix,
    };
}

function makeSecondaryGroup(seed: string): ColorGroup {
    const scale = generateColorScale(seed);
    const wcagMatrix = computeWCAGMatrix(scale);
    return {
        name: "secondary",
        baseColor: seed,
        scale,
        displayColor: scale[4],
        locked: false,
        wcagMatrix,
    };
}

function makeNeutralGroup(seed: string): ColorGroup {
    // neutral uses generateGrayScale
    const scale = generateGrayScale(seed);
    const wcagMatrix = computeWCAGMatrix(scale);
    return {
        name: "neutral",
        baseColor: seed,
        scale,
        displayColor: scale[4],
        locked: false,
        wcagMatrix,
    };
}

function usePalette() {
    // SEED PRINCIPAL FIJA
    const [primary, setPrimary] = useState(getRandomColor());

    // REROLL GLOBAL
    // si aprietas “reroll” vas a:
    // - regenerar secundarios y neutrales (si no están locked)
    const [roll, setRoll] = useState(0);
    const reroll = () => setRoll((r) => r + 1);

    // LOCKS
    const [locked, setLocked] = useState({
        primary: false,
        secondary: false,
        neutral: false,
    });

    // REFS para guardar grupos previos
    const [primaryCache, setPrimaryCache] = useState<ColorGroup | null>(null);
    const [secondaryCache, setSecondaryCache] = useState<ColorGroup | null>(
        null
    );
    const [neutralCache, setNeutralCache] = useState<ColorGroup | null>(null);

    // PRIMARY GROUP
    const primaryGroup = useMemo(() => {
        if (locked.primary && primaryCache) return primaryCache;

        // guard para no recalcular al pedo si el cache coincide con la seed actual
        if (!locked.primary && primaryCache?.baseColor === primary)
            return primaryCache;

        const g = makePrimaryGroup(primary);
        setPrimaryCache(g);
        return g;
    }, [primary, locked.primary, primaryCache]);

    // SECONDARY GROUP
    const secondaryGroup = useMemo(() => {
        if (locked.secondary && secondaryCache) return secondaryCache;
        const comp = getComplementaryColor(primary);
        const g = makeSecondaryGroup(comp);
        setSecondaryCache(g);
        return g;
    }, [primary, locked.secondary, secondaryCache]);

    // NEUTRAL GROUP
    const neutralGroup = useMemo(() => {
        if (locked.neutral && neutralCache) return neutralCache;
        const g = makeNeutralGroup(primary);
        setNeutralCache(g);
        return g;
    }, [primary, locked.neutral, neutralCache]);

    return {
        primaryGroup,
        secondaryGroup,
        neutralGroup,
        primary,
        setPrimary, // si desbloqueás primary y la cambias → todo se regen
        locked,
        setLocked,
        reroll,
    };
}

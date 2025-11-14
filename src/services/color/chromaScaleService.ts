import chroma from "chroma-js";

export function generateScale(baseColor: string) {
    if (!chroma.valid(baseColor)) return [];
    const scale = chroma
        .scale(["white", baseColor, "black"])
        .mode("lab")
        .colors(11);
    return scale.slice(1, -1);
}

export function generateGrayScale(baseColor: string) {
    if (!chroma.valid(baseColor)) return [];
    const scale = chroma
        .scale(["white", baseColor, "black"])
        .mode("lab")
        .colors(11);
    return scale.slice(1, -1);
}

export function generateGrayScale2(baseColor: string) {
    if (!chroma.valid(baseColor)) return [];

    // meto un color intermedio MUY blanco (95% blanco + 5% base)
    const superLight = chroma.mix("white", baseColor, 0.2, "lab").hex();

    const lightPart = chroma
        .scale(["white", superLight, baseColor])
        .mode("lab")
        .colors(6); // más pasos en el tramo blanco → base

    const darkPart = chroma.scale([baseColor, "black"]).mode("lab").colors(6);

    // saco blanco puro y el base repetido
    return [...lightPart.slice(1), ...darkPart.slice(1)];
}

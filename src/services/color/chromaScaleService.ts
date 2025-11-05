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
    const desaturated = chroma(baseColor).desaturate(3).set("hsl.l", 0.5);
    const scale = chroma
        .scale(["white", desaturated, "black"])
        .mode("lab")
        .colors(11);
    return scale.slice(1, -1);
}

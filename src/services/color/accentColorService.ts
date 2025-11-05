import chroma from "chroma-js";

export function getComplementaryColor(baseColor: string) {
    const [h, s, l] = chroma(baseColor).hsl();

    // complementario exacto
    const comp = (h + 180) % 360;

    // candidatos que pueden combinen pero que no sean iguales
    const candidates = [
        comp,
        comp + 150,
        comp + 210,
        comp + 120,
        comp + 240,
    ].map((x) => (x + 360) % 360);

    let chosenH = candidates[Math.floor(Math.random() * candidates.length)];

    // variacion de +- 8 grados
    chosenH += (Math.random() - 0.5) * 16;

    const finalS = Math.min(1, Math.max(0, s + (Math.random() - 0.5) * 0.2));
    const finalL = Math.min(1, Math.max(0, l + (Math.random() - 0.5) * 0.1));

    return chroma.hsl(chosenH, finalS, finalL).hex();
}

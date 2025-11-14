import { COLOR_RANGES } from "../services/color/randomColorService";

export type TypeColor = "primary" | "secondary" | "neutral";

export type LockedColor = {
    type: TypeColor;
    locked: boolean;
    color: string;
};

export type LockedColorProps = {
    colorsLocked: LockedColor[];
};

export type Family = keyof typeof COLOR_RANGES;

export type WCAGLevel = "AAA" | "AA" | "A" | null;

export type WCAGMatrix = Record<string, Record<string, WCAGLevel>>;

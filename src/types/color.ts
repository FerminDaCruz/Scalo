export type LockedColor = {
    type: "primary" | "secondary" | "neutral";
    locked: boolean;
    color: string;
};

export type LockedColorProps = {
    colorsLocked: LockedColor[];
};

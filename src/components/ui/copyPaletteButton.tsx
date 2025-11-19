import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy } from "lucide-react";

export type PaletteFormat = "css-variables" | "tailwind" | "json" | "scss";

type ColorScale = string[]; // [100,200,...,900]

type Props = {
    primary: ColorScale;
    accent: ColorScale;
    neutral: ColorScale;
};

function buildCSSVariables(
    primary: ColorScale,
    accent: ColorScale,
    neutral: ColorScale
) {
    const build = (name: string, scale: ColorScale) =>
        scale
            .map((c, i) => {
                const step = (i + 1) * 100;
                return `  --color-${name}-${step}: ${c};`;
            })
            .join("\n");

    const primaryBuild = build("primary", primary);
    const accentBuild = build("accent", accent);
    const neutralBuild = build("neutral", neutral);

    return `:root {\n${primaryBuild}\n${accentBuild}\n${neutralBuild}\n}`;
}

function buildSCSS(
    primary: ColorScale,
    accent: ColorScale,
    neutral: ColorScale
) {
    const build = (name: string, scale: ColorScale) =>
        scale
            .map((c, i) => {
                const step = (i + 1) * 100;
                return `$${name}-${step}: #${c}`;
            })
            .join("\n");

    const primaryBuild = build("primary", primary);
    const accentBuild = build("accent", accent);
    const neutralBuild = build("neutral", neutral);
    return `${primaryBuild}\n\n${accentBuild}\n\n${neutralBuild}`;
}

function buildTailwind(
    primary: ColorScale,
    accent: ColorScale,
    neutral: ColorScale
) {
    const build = (name: string, scale: ColorScale) =>
        scale
            .map((c, i) => {
                const step = (i + 1) * 100;
                return `  --color-${name}-${step}: ${c};`;
            })
            .join("\n");

    const primaryBuild = build("primary", primary);
    const accentBuild = build("accent", accent);
    const neutralBuild = build("neutral", neutral);

    return `@theme inline {\n${primaryBuild}\n${accentBuild}\n${neutralBuild}\n}`;
}

function buildJSON(
    primary: ColorScale,
    accent: ColorScale,
    neutral: ColorScale
) {
    const obj = {
        primary,
        accent,
        neutral,
    };
    return JSON.stringify(obj, null, 2);
}

function buildFigma(
    primary: ColorScale,
    accent: ColorScale,
    neutral: ColorScale
) {
    const block = (name: string, scale: ColorScale) =>
        scale.map((c, i) => `${name} ${100 * (i + 1)}: ${c}`).join("\n");

    return `${block("Primary", primary)}\n\n${block(
        "Accent",
        accent
    )}\n\n${block("Neutral", neutral)}`;
}

export default function CopyPaletteButton({ primary, accent, neutral }: Props) {
    const [format, setFormat] = useState<PaletteFormat>("css-variables");

    const generateCopyText = () => {
        switch (format) {
            case "css-variables":
                return buildCSSVariables(primary, accent, neutral);

            case "tailwind":
                return buildTailwind(primary, accent, neutral);

            case "json":
                return buildJSON(primary, accent, neutral);

            case "scss":
                return buildSCSS(primary, accent, neutral);
        }
    };

    const onCopy = async (output: string | undefined) => {
        await navigator.clipboard.writeText(output ? output : "");
    };

    const handleCopy = () => {
        const output = generateCopyText();
        onCopy(output);
    };

    return (
        <div className="flex items-center z-10">
            <Button
                variant="default"
                className="rounded-l-full px-4 py-2 flex items-center gap-2 w-35"
                onClick={handleCopy}
            >
                <Copy className="w-4 h-4" />
                Copiar
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="rounded-r-full px-4 py-2 bg-white! w-25"
                    >
                        {format}
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="rounded-xl p-1 ">
                    <DropdownMenuItem
                        onClick={() => setFormat("css-variables")}
                    >
                        CSS Variables
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFormat("scss")}>
                        SCSS
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFormat("tailwind")}>
                        Tailwind
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setFormat("json")}>
                        JSON
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

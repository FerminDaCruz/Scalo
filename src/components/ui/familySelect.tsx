"use client";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { COLOR_RANGES } from "@/src/services/color/randomColorService";
import { Family } from "@/src/types/color";

const displayOptions = [
    { label: "random", value: "__any" },
    ...Object.entries(COLOR_RANGES)
        .filter(([k]) => k !== "")
        .map(([k]) => ({ label: k, value: k })),
];

export default function FamilySelect({
    generalColor,
    setGeneralColor,
}: {
    generalColor: Family;
    setGeneralColor: (f: Family) => void;
}) {
    return (
        <Select
            value={generalColor === "" ? "__any" : generalColor}
            onValueChange={(val) => {
                const real = val === "__any" ? "" : val;
                setGeneralColor(real as Family);
                localStorage.setItem("generalColor", real);
            }}
        >
            <SelectTrigger className="w-30 pl-4 bg-neutral-900 text-white border-neutral-700 capitaliz text-center rounded-full">
                <SelectValue placeholder="Elige un color" />
            </SelectTrigger>
            <SelectContent>
                {displayOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                        {o.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

import { computeWCAGMatrix } from "@/src/services/wcagService";
import { ColorItem } from "./colorItem";
import { generateScale } from "@/src/services/color/chromaScaleService";
import { Input } from "@/components/ui/input";
import FamilySelect from "./familySelect";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { Family, LockedColor, TypeColor } from "@/src/types/color";

type Props = {
    locked: LockedColor[];
    toggle: (type: TypeColor) => void;
    generalColor: Family;
    setGeneralColor: (family: Family) => void;
    setSpecificColor: (color: string) => void;
    newPalette: () => void;
};

export default function PaletteBuilder({
    locked,
    toggle,
    generalColor,
    setGeneralColor,
    setSpecificColor,
    newPalette,
}: Props) {
    return (
        <div className="flex flex-col items-center w-full">
            <div className="flex flex-col justify-center items-center md:flex-row md:gap-6 w-full">
                {locked.map((x) => {
                    const normalized = `#${x.color}`;
                    const scale = generateScale(normalized);
                    return (
                        <ColorItem
                            key={x.type}
                            type={x.type}
                            color={normalized}
                            scale={scale}
                            locked={x.locked}
                            onToggle={() => toggle(x.type)}
                            wcagMatrix={computeWCAGMatrix(scale)}
                        />
                    );
                })}
            </div>
            <div className="flex gap-2 place-items-center mt-5 relative">
                <Input
                    type="text"
                    placeholder="#123456"
                    className="w-30 border px-4 py-1 rounded-full bg-white"
                    onChange={(e) =>
                        setSpecificColor(
                            e.target.value.startsWith("#")
                                ? e.target.value
                                : `#${e.target.value}`
                        )
                    }
                />
                <FamilySelect
                    generalColor={generalColor}
                    setGeneralColor={setGeneralColor}
                />
            </div>
            <Button
                onClick={newPalette}
                className="px-4 py-2 w-[248px] flex border rounded-full mt-3 mb-5 relative"
            >
                GENERAR
                <RefreshCcw />
            </Button>
        </div>
    );
}

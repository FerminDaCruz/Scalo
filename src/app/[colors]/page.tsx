import { Palette } from "@/src/components/ui/palette";
import { LockedColor } from "@/src/types/color";
import { notFound } from "next/navigation";

interface ColorsPageProps {
    params: Promise<{ colors: string }>;
}

export default async function ColorsPage({ params }: ColorsPageProps) {
    const { colors } = await params;

    const [primary, secondary, neutral] = colors.split("-");

    return (
        <div className="h-[92vh] flex flex-col items-center justify-center relative overflow-hidden">
            <div className=" absolute inset-0 bg-[#fcfcfc]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle, rgba(225, 225, 225, 0.9) 1px, transparent 1px)`,
                        backgroundSize: "20px 20px",
                    }}
                />
            </div>
            <Palette
                primary={primary}
                secondary={secondary}
                neutral={neutral}
            />
        </div>
    );
}

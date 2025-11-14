import { Palette } from "@/src/components/ui/palette";
import { LockedColor } from "@/src/types/color";
import { notFound } from "next/navigation";

interface ColorsPageProps {
    searchParams: Promise<{
        [key: string]: string;
    }>;
    params: Promise<{ colors: string }>;
}

export default async function ColorsPage({
    params,
    searchParams,
}: ColorsPageProps) {
    const { colors } = await params;
    const sp = await searchParams;

    const locksRaw = Array.isArray(sp?.locks)
        ? sp?.locks[0]
        : sp?.locks ?? "000";

    if (locksRaw.length !== 3) notFound();

    const [l1, l2, l3] = locksRaw.split("").map((c: string) => c === "1");

    const [primary, secondary, neutral] = colors.split("-");

    const colorsLocked: LockedColor[] = [
        { type: "primary", locked: l1, color: primary },
        { type: "secondary", locked: l2, color: secondary },
        { type: "neutral", locked: l3, color: neutral },
    ];

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
            <Palette initialLocked={colorsLocked} />
        </div>
    );
}

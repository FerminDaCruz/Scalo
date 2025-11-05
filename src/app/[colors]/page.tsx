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

    // normalizar locks
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
        <div className="min-h-screen flex flex-col items-center justify-center gap-10 p-10">
            <div className="flex items-center justify-center gap-6">
                <Palette initialLocked={colorsLocked} />
            </div>
        </div>
    );
}

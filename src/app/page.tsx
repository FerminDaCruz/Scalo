// app/page.tsx (server component)
import { redirect } from "next/navigation";
import {
    getGrayColor,
    getRandomColor,
} from "../services/color/randomColorService";
import { getComplementaryColor } from "../services/color/accentColorService";

export default function Page() {
    const primary = getRandomColor();
    const secondary = getComplementaryColor(primary);
    const neutral = getGrayColor(primary);

    const slug = [primary, secondary, neutral]
        .map((c) => c.replace("#", "").toLowerCase())
        .join("-");

    redirect(`/${slug}`);
}

"use server";

import { cookies } from "next/headers";
import { LockedColor } from "../types/color";

export async function setLocksCookie(locks: LockedColor[]): Promise<void> {
    (await cookies()).set("locks", JSON.stringify(locks), {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
    });
}

// /src/components/ui/ColorScale.tsx
"use client";

export default function ColorScale({
    label,
    group,
}: {
    label: string;
    group: string[];
}) {
    return (
        <div className="flex flex-col gap-2 items-center">
            <div className="text-sm font-medium">{label}</div>
            <div className="flex gap-1">
                {group.map((c) => (
                    <div
                        key={c}
                        className="w-8 h-8 rounded"
                        style={{ background: c }}
                    />
                ))}
            </div>
        </div>
    );
}

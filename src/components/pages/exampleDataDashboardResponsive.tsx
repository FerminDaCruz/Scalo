import { Fragment } from "react";

import { Activity, BarChart3, PieChart, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props = {
    primary: string[];
    secondary: string[];
    neutral: string[];
};

export default function ExampleDataDashboardResponsive({
    primary,
    secondary,
    neutral,
}: Props) {
    return (
        <div className="flex justify-center">
            <section
                className="relative w-80 aspect-video lg:scale-200 xl:scale-250 rounded-xs mx-auto overflow-hidden shadow-xl border border-black/50"
                style={{ backgroundColor: neutral[0] }}
            >
                <section
                    className="flex flex-col gap-2 px-1 py-1 text-[6px] "
                    style={{
                        background: `linear-gradient(220deg,${primary[3]},${primary[4]},${primary[5]})`,
                    }}
                >
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-[1.75fr_1fr]">
                        <article
                            className="rounded-md border px-3 pb-3 pt-2 flex flex-col gap-2"
                            style={{
                                borderColor: neutral[1],
                                backgroundColor: neutral[0],
                                boxShadow: `0 6px 16px ${neutral[2]}55`,
                            }}
                        >
                            <header className="flex flex-col gap-[2px]">
                                <div className="flex justify-between items-center">
                                    <span
                                        className="text-[6px] uppercase tracking-widest font-semibold"
                                        style={{ color: neutral[5] }}
                                    >
                                        rendimiento mensual
                                    </span>
                                    <span
                                        className="flex items-center gap-[2px]"
                                        style={{ color: primary[6] }}
                                    >
                                        <Sparkles size={7} />
                                        +4.2%
                                    </span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <h4
                                            className="text-xs font-bold leading-none"
                                            style={{ color: primary[7] }}
                                        >
                                            180,934
                                        </h4>
                                    </div>
                                    <div className="flex gap-1 text-[5px] font-semibold">
                                        {["H", "D", "S", "M", "A"].map(
                                            (tag, idx) => (
                                                <span
                                                    key={tag}
                                                    className="px-1 py-px rounded-full border"
                                                    style={{
                                                        borderColor:
                                                            idx === 3
                                                                ? primary[4]
                                                                : neutral[1],
                                                        backgroundColor:
                                                            idx === 3
                                                                ? primary[2]
                                                                : neutral[0],
                                                        color:
                                                            idx === 3
                                                                ? primary[7]
                                                                : neutral[5],
                                                    }}
                                                >
                                                    {tag}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </div>
                            </header>
                            <div className="relative h-24 md:h-13">
                                <svg viewBox="0 0 240 96" className="w-full">
                                    <defs>
                                        <linearGradient
                                            id="mainArea"
                                            x1="0%"
                                            y1="0%"
                                            x2="0%"
                                            y2="100%"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor={primary[3]}
                                                stopOpacity={0.4}
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor={primary[1]}
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        d="M0,60 C30,42 60,46 90,36 C120,28 150,52 180,44 C204,38 222,46 240,40 L240,96 L0,96 Z"
                                        fill="url(#mainArea)"
                                    />
                                    <path
                                        d="M0,60 C30,42 60,46 90,36 C120,28 150,52 180,44 C204,38 222,46 240,40"
                                        stroke={primary[6]}
                                        strokeWidth={2}
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div
                                    className="absolute inset-x-0 bottom-0 flex justify-between text-[5px] uppercase tracking-wide opacity-70"
                                    style={{ color: neutral[5] }}
                                >
                                    {[
                                        "Ene",
                                        "Feb",
                                        "Mar",
                                        "Abr",
                                        "May",
                                        "Jun",
                                        "Jul",
                                        "Ago",
                                    ].map((month) => (
                                        <span key={month}>{month}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    {
                                        label: "Vistas",
                                        value: "20,132",
                                        chart: "M0,12 C8,10 16,2 24,6 C32,10 40,0 48,4",
                                    },
                                    {
                                        label: "Clicks",
                                        value: "2,981",
                                        chart: "M0,6 C8,12 16,2 24,8 C32,14 40,6 48,10",
                                    },
                                    {
                                        label: "Únicos",
                                        value: "13,702",
                                        chart: "M0,10 C8,4 16,12 24,6 C32,0 40,8 48,2",
                                    },
                                ].map((card, idx) => (
                                    <div
                                        key={card.label}
                                        className="rounded-sm border p-1 flex flex-col gap-[2px]"
                                        style={{
                                            borderColor: neutral[1],
                                            background:
                                                idx === 0
                                                    ? primary[1]
                                                    : neutral[0],
                                        }}
                                    >
                                        <span
                                            className="text-[5px] uppercase tracking-wide font-semibold"
                                            style={{
                                                color:
                                                    idx === 0
                                                        ? primary[6]
                                                        : neutral[5],
                                            }}
                                        >
                                            {card.label}
                                        </span>
                                        <span
                                            className="text-[10px] font-bold leading-none"
                                            style={{ color: primary[7] }}
                                        >
                                            {card.value}
                                        </span>
                                        <svg
                                            viewBox="0 0 48 16"
                                            className="w-full"
                                        >
                                            <path
                                                d={card.chart}
                                                stroke={primary[5]}
                                                strokeWidth={1.5}
                                                fill="none"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                ))}
                            </div>
                            <div
                                className="rounded-sm border px-2 py-1 flex flex-col gap-1"
                                style={{
                                    borderColor: neutral[1],
                                    backgroundColor: neutral[0],
                                }}
                            >
                                <div
                                    className="flex justify-between text-[5px] font-semibold uppercase tracking-wide"
                                    style={{ color: neutral[5] }}
                                >
                                    <span>Actividad reciente</span>
                                    <span>Por fecha</span>
                                </div>
                                <div
                                    className="grid grid-cols-[1.2fr_1fr_.8fr] gap-1 text-[5px] font-medium"
                                    style={{ color: neutral[6] }}
                                >
                                    {[
                                        {
                                            name: "Juan Pablo Puerto",
                                            data: "243,674",
                                            date: "12 Abr 2024",
                                        },
                                        {
                                            name: "Juan Pablo Puerto",
                                            data: "112,023",
                                            date: "11 Abr 2024",
                                        },
                                        {
                                            name: "Juan Pablo Puerto",
                                            data: "45,690",
                                            date: "10 Abr 2024",
                                        },
                                        {
                                            name: "Juan Pablo Puerto",
                                            data: "74,374",
                                            date: "09 Abr 2024",
                                        },
                                    ].map((row) => (
                                        <Fragment key={row.date}>
                                            <span>{row.name}</span>
                                            <span style={{ color: primary[6] }}>
                                                {row.data}
                                            </span>
                                            <span style={{ color: neutral[4] }}>
                                                {row.date}
                                            </span>
                                        </Fragment>
                                    ))}
                                </div>
                            </div>
                        </article>
                        <aside className="flex flex-col gap-1">
                            <div
                                className="rounded-md border p-2 flex flex-col gap-1"
                                style={{
                                    borderColor: neutral[1],
                                    backgroundColor: neutral[0],
                                }}
                            >
                                <div className="flex justify-between items-center">
                                    <span
                                        className="text-[6px] uppercase tracking-wide font-semibold"
                                        style={{ color: neutral[5] }}
                                    >
                                        Actividad por día
                                    </span>
                                </div>
                                <div className="flex h-16 items-end gap-1">
                                    {[
                                        { label: "L", value: 34 },
                                        { label: "M", value: 18 },
                                        { label: "X", value: 22 },
                                        { label: "J", value: 42 },
                                        { label: "V", value: 28 },
                                        { label: "S", value: 20 },
                                        { label: "D", value: 28 },
                                    ].map((bar, index) => (
                                        <div
                                            key={bar.label}
                                            className="flex flex-col items-center gap-[2px]"
                                        >
                                            <div
                                                className="w-3 rounded-sm"
                                                style={{
                                                    height: `${bar.value}px`,
                                                    backgroundColor:
                                                        index === 3
                                                            ? primary[5]
                                                            : neutral[2],
                                                }}
                                            />
                                            <span style={{ color: neutral[5] }}>
                                                {bar.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div
                                className="rounded-md border p-2 flex flex-col"
                                style={{
                                    borderColor: neutral[1],
                                    backgroundColor: neutral[0],
                                }}
                            >
                                <div className="flex justify-between items-center">
                                    <span
                                        className="text-[6px] uppercase tracking-wide font-semibold"
                                        style={{ color: neutral[5] }}
                                    >
                                        Clientes
                                    </span>
                                    <span
                                        className="size-4 rounded-full flex items-center justify-center"
                                        style={{
                                            backgroundColor: primary[2],
                                            color: primary[7],
                                        }}
                                    >
                                        <PieChart size={8} />
                                    </span>
                                </div>
                                <div className="flex items-baseline gap-1">
                                    <span
                                        className="text-xs font-bold leading-none"
                                        style={{ color: primary[7] }}
                                    >
                                        103,579
                                    </span>
                                    <span
                                        className="text-[5px] font-semibold"
                                        style={{ color: primary[5] }}
                                    >
                                        +1.8%
                                    </span>
                                </div>
                                <p
                                    className="text-[5px] py-1"
                                    style={{ color: neutral[5] }}
                                >
                                    Promedio de satisfacción semanal.
                                </p>
                                <div className="flex gap-1">
                                    {[
                                        primary[4],
                                        primary[3],
                                        primary[2],
                                        neutral[2],
                                    ].map((tone, idx) => (
                                        <div
                                            key={tone}
                                            className="flex-1 h-2 rounded-full"
                                            style={{
                                                backgroundColor: tone,
                                                opacity: idx === 3 ? 0.6 : 1,
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div
                                className="rounded-md border p-2 flex flex-col gap-1"
                                style={{
                                    borderColor: neutral[1],
                                    backgroundColor: neutral[0],
                                }}
                            >
                                <div className="flex justify-between items-center">
                                    <span
                                        className="text-[6px] uppercase tracking-wide font-semibold"
                                        style={{ color: neutral[5] }}
                                    >
                                        Segmentos
                                    </span>
                                    <BarChart3
                                        size={10}
                                        style={{ color: primary[5] }}
                                    />
                                </div>
                                <div className="flex flex-col gap-1">
                                    {[
                                        {
                                            label: "Premium",
                                            score: "40%",
                                            bg: primary[6],
                                        },
                                        {
                                            label: "Estandar",
                                            score: "35%",
                                            bg: primary[4],
                                        },
                                        {
                                            label: "Trial",
                                            score: "25%",
                                            bg: primary[3],
                                        },
                                    ].map((item) => (
                                        <div
                                            key={item.label}
                                            className="flex items-center justify-between rounded-sm px-1 py-[3px]"
                                            style={{
                                                backgroundColor: neutral[0],
                                                border: `1px solid ${neutral[2]}`,
                                            }}
                                        >
                                            <div className="flex items-center gap-1">
                                                <span
                                                    className="size-2 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            item.bg,
                                                    }}
                                                />
                                                <span
                                                    className="font-semibold"
                                                    style={{
                                                        color: neutral[6],
                                                    }}
                                                >
                                                    {item.label}
                                                </span>
                                            </div>
                                            <span
                                                className="font-semibold"
                                                style={{ color: primary[7] }}
                                            >
                                                {item.score}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>
            </section>
        </div>
    );
}

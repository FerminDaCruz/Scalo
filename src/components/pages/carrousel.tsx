"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ExampleLandingResponsive from "./exampleLandingResponsive";
import ExampleDataDashboardResponsive from "./exampleDataDashboardResponsive";
import ExampleChatResponsive from "./exampleChatResponsive";

type Props = {
    primary: string[];
    secondary: string[];
    neutral: string[];
};

const slides = [0, 1, 2];

export default function Carrousel({ primary, secondary, neutral }: Props) {
    const [index, setIndex] = useState(0);

    const prev = () =>
        setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    const next = () =>
        setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

    return (
        <div className="relative h-full w-full flex items-center justify-center mt-10mb-10">
            {/* contenedor central */}
            <div className="w-full  transition-all duration-500">
                {index === 0 && (
                    <ExampleLandingResponsive
                        {...{ primary, secondary, neutral }}
                    />
                )}
                {index === 1 && (
                    <ExampleDataDashboardResponsive
                        {...{ primary, secondary, neutral }}
                    />
                )}
                {index === 2 && (
                    <ExampleChatResponsive
                        {...{ primary, secondary, neutral }}
                    />
                )}
            </div>

            {/* flechas */}
            <button
                className="absolute left-5 top-1/2 -translate-y-1/2 p-2 bg-white hover:bg-white/80 text-black rounded-full z-10 shadow-black shadow-2xl border"
                onClick={prev}
            >
                <ChevronLeft size={22} />
            </button>
            <button
                className="absolute right-5 top-1/2 -translate-y-1/2 p-2 bg-white hover:bg-white/80 text-black rounded-full z-10 shadow-black shadow-2xl border border-black/10r"
                onClick={next}
            >
                <ChevronRight size={22} />
            </button>
        </div>
    );
}

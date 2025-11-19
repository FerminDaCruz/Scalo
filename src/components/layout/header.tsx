import { CircleQuestionMark } from "lucide-react";
import Image from "next/image";

export default function Header() {
    return (
        <header className="h-[8vh] flex justify-between items-center px-3 max-w-[1250px] mx-auto">
            <div className="flex items-center gap-2">
                <Image
                    src="/Logo.svg"
                    alt="Logo"
                    width={100}
                    height={100}
                    className="w-auto h-14"
                />
                <div className="flex items-baseline gap-4">
                    <h1 className="font-plus-jakarta font-bold text-4xl text-dark-gray">
                        Scalo
                    </h1>
                    <p className="text-gray hidden md:inline">
                        Color palettes & scales.
                    </p>
                </div>
            </div>

            <div className="hidden items-center justify-center gap-2 ">
                <CircleQuestionMark size={20} />
                <p>Como usar</p>
            </div>
        </header>
    );
}

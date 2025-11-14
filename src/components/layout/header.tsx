import { CircleQuestionMark, FileQuestion } from "lucide-react";
import Image from "next/image";

export default function Header() {
    return (
        <header className="h-[8vh] flex justify-between items-center px-3 max-w-[1250px] mx-auto">
            <Image src="/Logo2.svg" alt="Logo" width={50} height={50} />
            <div className="flex items-center justify-center gap-2">
                <CircleQuestionMark size={20} />
                <p>Como usar</p>
            </div>
        </header>
    );
}

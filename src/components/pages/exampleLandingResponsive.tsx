import { Contrast, FolderUp, Icon, Palette, TvIcon } from "lucide-react";

type Props = {
    primary: string[]; // escala primaria 0..n
    secondary: string[]; // escala secundaria 0..n
    neutral: string[]; // escala neutral 0..n
};
export default function ExampleLandingResponsive({
    primary,
    secondary,
    neutral,
}: Props) {
    return (
        <div className="flex justify-center ">
            <section
                className="relative w-80 aspect-video lg:scale-200 xl:scale-250 rounded-xs mx-auto overflow-hidden shadow-xl border border-black/50 "
                style={{ backgroundColor: neutral[0] }}
            >
                <div
                    className="pointer-events-none absolute bottom-0 left-0 size-50 rounded-full transform translate-x-[-50%] translate-y-[50%]"
                    style={{
                        background: `linear-gradient(45deg, ${primary[5]} 0%, ${primary[5]}00 100%)`,
                        opacity: 0.5,
                        filter: "blur(50px)",
                    }}
                />
                <header className="flex justify-between items-center px-2 h-7 ">
                    <div className="flex items-center gap-1 text-[8px] font-bold">
                        <span
                            className="rounded-full p-1.5 "
                            style={{ background: primary[5] }}
                        />
                        Tu Logo
                    </div>
                    <nav
                        className="flex gap-1 items-center font-semibold text-[6px]"
                        style={{ color: primary[7] }}
                    >
                        <p>Inicio</p>
                        <p>Servicios</p>
                        <p className="relative">
                            Actualizaciones
                            <span
                                className="absolute top-0 -right-1 rounded-full p-[2px]"
                                style={{ background: secondary[5] }}
                            />
                        </p>
                    </nav>
                    <button
                        className="px-1 py-1 rounded-full text-[6px] font-semibold flex justify-center items-center"
                        style={{
                            backgroundColor: primary[2],
                            color: primary[7],
                        }}
                    >
                        Probar ahora
                    </button>
                </header>

                <section className="flex flex-col justify-center items-center ">
                    <div className="px-10 text-center flex flex-col ">
                        <h3
                            className="font-bold text-sm uppercase  bg-no-repeat bg-center "
                            style={{
                                background: `linear-gradient(90deg, ${primary[7]}, ${primary[4]})`,
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                            }}
                        >
                            Generá paletas de colores profesionales
                        </h3>
                        <p style={{ color: neutral[4] }} className="text-[8px]">
                            Eleji un color y dale a &quot;generar&quot; las
                            veces que quieras, tendras una paleta lista con sus
                            escalas
                        </p>
                        <div>
                            <button
                                className="px-2 py-1 rounded-full text-[6px] font-semibold"
                                style={{
                                    backgroundColor: primary[6],
                                    color: primary[1],
                                }}
                            >
                                Probar gratis ahora
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-1 mt-4">
                        <div
                            className="rounded-lg relative h-10 aspect-video flex flex-col justify-center items-center text-center"
                            style={{
                                border: `1px, solid, ${neutral[1]}`,
                                backgroundColor: neutral[0],
                            }}
                        >
                            <div
                                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full p-1"
                                style={{ backgroundColor: primary[2] }}
                            >
                                <Contrast
                                    style={{ color: primary[6] }}
                                    size={10}
                                />
                            </div>
                            <h5
                                className="font-semibold text-[6px]"
                                style={{ color: primary[7] }}
                            >
                                Contraste
                            </h5>
                            <p
                                style={{ color: neutral[4] }}
                                className="text-[4px] px-1"
                            >
                                Activa el contraste para validar los niveles de
                                accesibilidad WCAG
                            </p>
                        </div>
                        <div
                            className="rounded-lg relative h-10 aspect-video flex flex-col justify-center items-center text-center"
                            style={{
                                border: `1px, solid, ${neutral[1]}`,
                                backgroundColor: neutral[0],
                            }}
                        >
                            <div
                                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full p-1"
                                style={{ backgroundColor: primary[2] }}
                            >
                                <Palette
                                    style={{ color: primary[6] }}
                                    size={10}
                                />
                            </div>
                            <h5
                                className="font-semibold text-[6px]"
                                style={{ color: primary[7] }}
                            >
                                Paletas infinitas
                            </h5>
                            <p
                                style={{ color: neutral[4] }}
                                className="text-[4px] px-1"
                            >
                                Podés generar la cantidad de paletas que vos
                                quieras
                            </p>
                        </div>
                        <div
                            className="rounded-lg relative h-10 aspect-video flex flex-col justify-center items-center text-center"
                            style={{
                                border: `1px, solid, ${neutral[1]}`,
                                backgroundColor: neutral[0],
                            }}
                        >
                            <div
                                className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full p-1"
                                style={{ backgroundColor: primary[2] }}
                            >
                                <FolderUp
                                    style={{ color: primary[6] }}
                                    size={10}
                                />
                            </div>
                            <h5
                                className="font-semibold text-[6px]"
                                style={{ color: primary[7] }}
                            >
                                Exportar
                            </h5>
                            <p
                                style={{ color: neutral[4] }}
                                className="text-[4px] px-1"
                            >
                                Exportá la paleta en el formato que quieras!
                            </p>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
}

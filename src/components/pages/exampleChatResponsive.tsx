import { AtSign, Circle, Hash, Plus, Send } from "lucide-react";

type Props = {
    primary: string[];
    secondary: string[];
    neutral: string[];
};

export default function ExampleChatResponsive({
    primary,
    secondary,
    neutral,
}: Props) {
    const channels = [
        { name: "design", badge: 3, active: false },
        { name: "dev", badge: 0, active: false },
        { name: "marketing", badge: 1, active: false },
        { name: "general", badge: 0, active: true },
        { name: "random", badge: 0, active: false },
    ];

    const directMessages = [
        { name: "Juan", status: "Disponible" },
        { name: "Leo", status: "En reunión" },
        { name: "Homero", status: "Disponible" },
    ];

    const messages = [
        {
            author: "Juan Pablo Puerto",
            time: "12:42 PM",
            text: "Hola equipo! ¿Podrían compartir los sketches que mencionaron ayer? Quisiera revisarlos nuevamente.",
            mention: "@Leo",
        },
        {
            author: "Leo Messi",
            time: "12:50 PM",
            text: "Listo, recién subí las imágenes a la carpeta compartida. Si necesitan ajustes me avisan 🙂",
        },
        {
            author: "Juan Pablo Puerto",
            time: "12:56 PM",
            text: "Gracias! Se ven muy bien. Voy a preparar el pase al cliente.",
        },
        {
            author: "Homero simpson",
            time: "12:59 PM",
            text: "Excelente trabajo. Esta mañana agregué algunas ideas nuevas. @Sarah ¿podés darle un vistazo?",
            mention: "@Sarah",
        },
    ];

    return (
        <div className="flex justify-center">
            <section
                className="relative w-80 aspect-video lg:scale-200 xl:scale-250 rounded-xs mx-auto overflow-hidden shadow-xl border border-black/50"
                style={{ backgroundColor: neutral[0] }}
            >
                <div className="relative flex h-full items-center">
                    <div
                        className="grid h-48 w-full grid-cols-[1fr_3fr] overflow-hidden shadow-lg"
                        style={{
                            borderColor: neutral[2],
                            backgroundColor: neutral[0],
                        }}
                    >
                        <aside
                            className="flex flex-col justify-between px-2 pt-3"
                            style={{
                                background: `linear-gradient(120deg, ${primary[4]}, ${primary[3]} 60%, ${primary[2]})`,
                                color: primary[0],
                            }}
                        >
                            <div className="flex flex-col gap-2">
                                <header className="flex items-center justify-between">
                                    <div className="flex justify-between items-center w-full">
                                        <span
                                            className="size-3 rounded-full text-[6px] font-semibold flex items-center justify-center"
                                            style={{
                                                backgroundColor: primary[6],
                                                color: primary[1],
                                            }}
                                        >
                                            F
                                        </span>
                                        <span className="flex items-center gap-[2px] text-[3px] font-semibold uppercase tracking-[0.2em]">
                                            <Circle
                                                size={6}
                                                style={{ color: secondary[5] }}
                                                className="fill-current"
                                            />
                                            En linea
                                        </span>
                                    </div>
                                </header>

                                <div className="flex flex-col gap-[6px]">
                                    <span
                                        className="text-[4px] uppercase tracking-[0.3em] font-semibold opacity-70 border-b"
                                        style={{ borderColor: neutral[1] }}
                                    >
                                        Canales
                                    </span>
                                    <ul className="flex flex-col gap-[4px] text-[5px] font-semibold">
                                        {channels.map((channel) => (
                                            <li key={channel.name}>
                                                <button
                                                    className="flex items-center justify-between rounded-md px-2 py-1 w-full"
                                                    style={{
                                                        backgroundColor:
                                                            channel.active
                                                                ? primary[6]
                                                                : `${primary[2]}15`,
                                                        color: channel.active
                                                            ? primary[1]
                                                            : primary[0],
                                                        boxShadow:
                                                            channel.active
                                                                ? `0 10px 20px ${primary[6]}44`
                                                                : undefined,
                                                    }}
                                                >
                                                    <span className="flex items-center gap-1">
                                                        <Hash size={7} />
                                                        {channel.name}
                                                    </span>
                                                    {channel.badge > 0 && (
                                                        <span
                                                            className="rounded-full px-1 py-px text-[4px] font-semibold"
                                                            style={{
                                                                backgroundColor:
                                                                    primary[1],
                                                                color: primary[6],
                                                            }}
                                                        >
                                                            {channel.badge}
                                                        </span>
                                                    )}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-[6px]">
                                    <span
                                        className="text-[4px] uppercase tracking-[0.3em] font-semibold opacity-70 border-b"
                                        style={{ borderColor: neutral[2] }}
                                    >
                                        Direct Messages
                                    </span>
                                    <ul className="flex flex-col gap-[4px] text-[5px] font-semibold">
                                        {directMessages.map((user) => (
                                            <li
                                                key={user.name}
                                                className="flex items-center justify-between rounded-md px-2 py-1"
                                                style={{
                                                    backgroundColor: `${primary[2]}10`,
                                                }}
                                            >
                                                <span>{user.name}</span>
                                                <span
                                                    className="rounded-full px-2 py-px text-[4px] uppercase tracking-widest"
                                                    style={{
                                                        backgroundColor: `${primary[1]}33`,
                                                        color: primary[0],
                                                    }}
                                                >
                                                    {user.status}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <button
                                className="flex items-center justify-center gap-1 rounded-md px-2 py-1 text-[5px] font-semibold uppercase tracking-widest"
                                style={{
                                    backgroundColor: primary[6],
                                    color: primary[1],
                                    boxShadow: `0 8px 18px ${primary[6]}44`,
                                }}
                            >
                                <Plus size={7} />
                                Añadir canal
                            </button>
                        </aside>
                        <section
                            className="flex flex-col justify-between px-3 pt-3"
                            style={{ borderColor: neutral[2] }}
                        >
                            <header
                                className="flex items-center justify-between border-b pb-1"
                                style={{ borderColor: neutral[1] }}
                            >
                                <div className="flex flex-col gap-[2px]">
                                    <h2
                                        className="text-[7px] font-bold uppercase tracking-widest"
                                        style={{ color: neutral[7] }}
                                    >
                                        # general
                                    </h2>
                                    <span
                                        className="text-[5px] font-medium"
                                        style={{ color: neutral[4] }}
                                    >
                                        Espacio para coordinar entregas y
                                        feedback del sprint
                                    </span>
                                </div>
                            </header>
                            <div className="flex flex-1 flex-col gap-1 overflow-hidden py-1 text-[5px]">
                                <div className="flex flex-col gap-1 overflow-auto pr-1">
                                    {messages.map((msg) => (
                                        <article
                                            key={msg.author + msg.time}
                                            className="rounded-md border px-2 py-1"
                                            style={{
                                                borderColor: neutral[2],
                                                backgroundColor: neutral[0],
                                                boxShadow: `0 8px 18px ${neutral[2]}22`,
                                            }}
                                        >
                                            <header className="mb-[3px] flex items-center justify-between gap-1">
                                                <div className="flex items-center justify-center gap-1">
                                                    <span
                                                        className="size-3 rounded-full flex items-center justify-center text-[6px] font-bold uppercase text-center"
                                                        style={{
                                                            backgroundColor:
                                                                primary[4],
                                                            color: primary[1],
                                                        }}
                                                    >
                                                        {msg.author.slice(0, 1)}
                                                    </span>
                                                    <span
                                                        className="text-[5px] font-semibold"
                                                        style={{
                                                            color: neutral[7],
                                                        }}
                                                    >
                                                        {msg.author}
                                                    </span>
                                                </div>

                                                <span
                                                    className="text-[4px] uppercase tracking-widest font-semibold"
                                                    style={{
                                                        color: neutral[4],
                                                    }}
                                                >
                                                    {msg.time}
                                                </span>
                                            </header>
                                            <p
                                                className="leading-snug"
                                                style={{ color: neutral[6] }}
                                            >
                                                {msg.text}{" "}
                                                {msg.mention && (
                                                    <span
                                                        style={{
                                                            color: primary[6],
                                                            backgroundColor: `${primary[2]}30`,
                                                            borderRadius:
                                                                "9999px",
                                                            padding: "0 4px",
                                                        }}
                                                    >
                                                        {msg.mention}
                                                    </span>
                                                )}
                                            </p>
                                        </article>
                                    ))}
                                </div>
                            </div>
                            <form
                                className="flex items-center gap-1 rounded-md border px-2 py-1"
                                style={{
                                    borderColor: neutral[2],
                                    backgroundColor: neutral[0],
                                }}
                            >
                                <input
                                    className="flex-1 bg-transparent text-[5px] outline-none placeholder:opacity-60"
                                    style={{ color: neutral[5] }}
                                    placeholder="Mensaje #general"
                                />
                                <button
                                    className="flex items-center gap-[2px] rounded-full px-2 py-1 text-[5px] font-semibold uppercase tracking-widest"
                                    style={{
                                        backgroundColor: primary[6],
                                        color: primary[1],
                                    }}
                                >
                                    <Send size={7} />
                                    Enviar
                                </button>
                            </form>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
}

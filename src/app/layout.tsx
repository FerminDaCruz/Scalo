import type { Metadata } from "next";
import { Roboto, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/layout/header";

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"], // 600 = semi bold
});

const plusJakartaSans = Plus_Jakarta_Sans({
    variable: "--font-plus-jakarta",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"], // 600 = semi bold
    display: "swap",
});

export const metadata: Metadata = {
    title: "Scalo — Generador de paletas y escalas de color",
    description:
        "Scalo es una herramienta rápida y visual para crear paletas de colores, escalas armonizadas y sistemas cromáticos listos para usar en diseño, UI y desarrollo web.",
    icons: {
        icon: "/Logo.png",
        shortcut: "/Logo.png",
        apple: "/Logo.png",
    },
    openGraph: {
        title: "Scalo — Generador de paletas y escalas de color",
        description:
            "Generá paletas de colores limpias, armónicas y consistentes en segundos. Exportá en HEX, RGB o como variables CSS listas para tu proyecto.",
        url: "https://scalooo.vercel.app", // cámbialo cuando tengas dominio
        siteName: "Scalo",
        images: [
            {
                url: "Logo.png",
                width: 1200,
                height: 630,
                alt: "Scalo — Generador de paletas de colores",
            },
        ],
        locale: "es_AR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Scalo — Generador de paletas y escalas de color",
        description:
            "Crea paletas y escalas de color con armonía profesional. Exportá tus colores listos para desarrollo.",
        images: ["/Logo.png"],
    },
    keywords: [
        "generador de colores",
        "paletas de color",
        "color palette generator",
        "color scale generator",
        "escalas de color",
        "UI colors",
        "diseño UI",
        "diseño web",
        "herramienta de color",
        "CSS colors",
        "HEX RGB HSL",
    ],
    metadataBase: new URL("https://scalooo.vercel.app"), // editar
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className=" bg-white text-black">
                <Header />
                {children}
            </body>
        </html>
    );
}

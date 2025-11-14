import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/layout/header";
import Footer from "@/src/components/layout/footer";

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"], // 600 = semi bold
});

export const metadata: Metadata = {};

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

import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/ThemeProvider";
import {ModeToggle} from "@/components/ModeToggle";
import React from "react";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Dachwetter",
    description: "Wann kann man wieder aufs Dach?",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="de">
        <body className={inter.className}>
        <ThemeProvider attribute="class"
                       defaultTheme="system" enableSystem>
            <ModeToggle/>
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}

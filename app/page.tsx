import {Suspense} from "react";
import Weather from "@/app/Weather";

export default function HomeScreen() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-black text-blue-600 underline decoration-amber-300">Dachwetter</h1>
            <Suspense fallback={null}>
                <Weather city="Stuttgart" />
            </Suspense>
        </main>
    );
}

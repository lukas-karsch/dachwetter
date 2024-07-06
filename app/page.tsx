import {Suspense} from "react";
import Weather from "@/app/Weather";

export default function HomeScreen() {
    return (
        <main className="min-h-screen p-24 flex justify-center items-center">
            <div className="w-[700px]">
                <h1 className="text-4xl font-black underline text-primary">Dachwetter</h1>
                <Suspense fallback="Loading weather">
                    <Weather city="Stuttgart" />
                </Suspense>
            </div>
        </main>
    );
}

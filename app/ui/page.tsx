import React from "react";
import {WeatherCard} from "@/components/WeatherCard";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";

export default function Page() {
    return (
        <main className="min-h-screen p-24 flex justify-center">
            <div className="container">
                <h1 className="text-4xl font-semibold">
                    Heute ist <br/>
                    <span className="font-black text-primary">Dachwetter!</span>
                </h1>
                <div className="mt-4 rounded-2xl p-8 bg-accent space-y-8">
                    <div className="flex gap-32">
                        <p>Sonnenuntergang: 21:07</p>
                        <p>Wenig Wind</p>
                        <p>Kein Niederschlag</p>
                    </div>
                    <ScrollArea>
                        <div className="flex gap-8">
                            <WeatherCard dachwetter date={new Date()} temperature={26} icon={"CLOUDS"}/>
                            <WeatherCard dachwetter date={new Date(new Date().getTime() + 24 * 3600 * 1000)} temperature={27} icon={"CLOUDS"}/>
                            <WeatherCard dachwetter date={new Date(new Date().getTime() + 24 * 3600 * 1000)} temperature={27} icon={"CLOUDS"}/>
                            <WeatherCard dachwetter date={new Date(new Date().getTime() + 24 * 3600 * 1000)} temperature={27} icon={"CLOUDS"}/>
                            <WeatherCard dachwetter date={new Date(new Date().getTime() + 24 * 3600 * 1000)} temperature={27} icon={"CLOUDS"}/>
                        </div>
                        <ScrollBar orientation="horizontal" className="text-zinc-500"/>
                    </ScrollArea>
                </div>
            </div>
        </main>
    );
}

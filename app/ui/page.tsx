import React from "react";
import {WeatherCard} from "@/components/WeatherCard";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import ShareButton from "@/components/ShareButton";

export default function Page() {
    return (
        <main className="min-h-screen p-24 flex justify-center">
            <div className="container">
                <div className="flex justify-between items-end">
                    <h1 className="text-4xl font-semibold">
                        Heute ist <br/>
                        <span className="font-black text-primary">Dachwetter!</span>
                    </h1>
                    <ShareButton degreesToday={27} />
                </div>
                <div className="mt-4 rounded-2xl p-8 bg-accent space-y-8">
                    <div className="flex gap-4 lg:gap-32 flex-wrap">
                        <p className="text-lg">Sonnenuntergang: 21:07</p>
                        <p className="text-lg">Wenig Wind</p>
                        <p className="text-lg">Kein Niederschlag</p>
                    </div>
                    <ScrollArea>
                        <div className="flex gap-8 mb-4">
                            <WeatherCard dachwetter date={new Date()} temperature={26} icon={"SUN"}/>
                            <WeatherCard dachwetter date={new Date(new Date().getTime() + 24 * 3600 * 1000)} temperature={27} icon={"SUN"}/>
                            <WeatherCard dachwetter date={new Date(new Date().getTime() + 2 * 24 * 3600 * 1000)} temperature={27} icon={"SUN"}/>
                            <WeatherCard dachwetter date={new Date(new Date().getTime() + 3 * 24 * 3600 * 1000)} temperature={27} icon={"SUN"}/>
                            <WeatherCard dachwetter date={new Date(new Date().getTime() + 4 * 24 * 3600 * 1000)} temperature={27} icon={"SUN_AND_CLOUDS"}/>
                        </div>
                        <ScrollBar orientation="horizontal"/>
                    </ScrollArea>
                </div>
            </div>
        </main>
    );
}

import {getWeather} from "@/app/getWeather";
import ShareButton from "@/components/ShareButton";
import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
import {WeatherCard} from "@/components/WeatherCard";
import React from "react";
import {extractDachwetter} from "@/lib/helper/extractDachwetter";
import {timeFormatter} from "@/lib/format/dates";
import DachwetterHeading from "@/components/DachwetterHeading";

export default async function HomeScreen() {
    const weather = await getWeather("Stuttgart");
    const dachwetter = extractDachwetter(weather);

    const nextDachwetter = dachwetter.findIndex(dachwetter => dachwetter.isDachwetter);

    return (
        <main className="min-h-screen p-24 flex justify-center">
            <div className="container">
                <div className="flex justify-between items-end">
                    <DachwetterHeading nextDachwetter={nextDachwetter} />
                    {nextDachwetter > 0 &&
                        <ShareButton degrees={27} nextDachwetter={nextDachwetter} />
                    }
                </div>
                <div className="mt-4 rounded-2xl p-8 bg-accent space-y-8">
                    <div className="flex gap-4 lg:gap-32 flex-wrap">
                        <p className="text-lg">Sonnenuntergang um {timeFormatter.format(weather.city.sunset)}</p>
                        <p className="text-lg">Wenig Wind (TODO)</p>
                        <p className="text-lg">Kein Niederschlag (TODO)</p>
                    </div>
                    <ScrollArea>
                        <div className="flex gap-8 mb-4">
                            {dachwetter.map(wetter => {
                                return <WeatherCard key={wetter.plusDays}
                                                    dachwetter={wetter.isDachwetter}
                                                    temperature={wetter.degrees}
                                                    icon={wetter.icon}
                                                    plusDays={wetter.plusDays}
                                />
                            })}
                        </div>
                        <ScrollBar orientation="horizontal"/>
                    </ScrollArea>
                </div>
            </div>
        </main>
    );
}

import React from "react";
import {getRelativeDayString} from "@/lib/format/dates";
import {cn} from "@/lib/utils";
import {Cloud, CloudRain, CloudSun, Sun} from "lucide-react";

type WeatherCardProps = {
    dachwetter: boolean,
    temperature: number,
    icon: WeatherIcon,
    date: Date,
}

type WeatherIcon = "SUN" | "RAIN" | "CLOUDS" | "SUN_AND_CLOUDS";

export function WeatherCard({dachwetter, temperature, date, icon} : WeatherCardProps) {
    const dayString = getRelativeDayString(date);

    return (
        <div className={cn(`w-[250px] h-[320px] rounded-lg flex justify-around flex-col p-8`,
            dachwetter ? "bg-primary" : "bg-zinc-500")}>
            <div className="flex justify-center items-center">
                <WeatherIcon icon={icon}/>
            </div>
            <div>
                <p className="text-4xl font-bold">{Math.round(temperature)}°C</p>
                <p className="text-lg text-secondary-foreground">{dayString}</p>
            </div>
        </div>
    );
}

function WeatherIcon({icon}: { icon: WeatherIcon }) {
    const size = 120;

    if(icon === "SUN") {
        return <Sun size={size} className="drop-shadow-lg"/>
    } else if (icon === "RAIN") {
        return <CloudRain size={size} className="drop-shadow-lg"/>
    } else if (icon === "SUN_AND_CLOUDS") {
        return <CloudSun size={size} className="drop-shadow-lg"/>
    }
    return <Cloud size={size} className="drop-shadow-lg"/>
}

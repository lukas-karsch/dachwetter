import React from "react";
import {cn} from "@/lib/utils";
import {Cloud, CloudLightning, CloudRain, CloudSun, Sun} from "lucide-react";
import {type WeatherIcon} from "@/lib/schema/weather";
import {getRelativeDayString} from "@/lib/format/dates";

type WeatherCardProps = {
    dachwetter: boolean,
    feelsLike: number,
    icon: WeatherIcon,
    plusDays: number,
}

export function WeatherCard({dachwetter, feelsLike, plusDays, icon}: WeatherCardProps) {
    const dayString = getRelativeDayString(plusDays);

    return (
        <div className={
            cn(`w-[250px] h-[320px] rounded-lg flex justify-around flex-col p-8 shadow-lg`,
                dachwetter ? "bg-primary" : "bg-zinc-400 dark:bg-zinc-500")}
        >
            <div className="flex justify-center items-center">
                <WeatherIcon icon={icon}/>
            </div>
            <div>
                <p className="text-sm">{"Gefühlt"}</p>
                <p className="text-4xl font-bold">{Math.round(feelsLike)}°C</p>
                <p className="text-lg text-secondary-foreground mt-1">{dayString}</p>
            </div>
        </div>
    );
}

function WeatherIcon({icon}: { icon: WeatherIcon }) {
    const size = 120;

    if (icon === "SUN") {
        return <Sun size={size} className="drop-shadow-lg"/>
    } else if (icon === "RAIN") {
        return <CloudRain size={size} className="drop-shadow-lg"/>
    } else if (icon === "SUN_AND_CLOUDS") {
        return <CloudSun size={size} className="drop-shadow-lg"/>
    } else if (icon === "THUNDERSTORM") {
        return <CloudLightning size={size} className="drop-shadow-lg"/>
    }
    return <Cloud size={size} className="drop-shadow-lg"/>
}

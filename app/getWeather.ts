"use server";

import env from "@/lib/env/env";
import {WeatherResponse, weatherResponseSchema} from "@/lib/schema/weather";

const URL = "https://api.openweathermap.org/data/2.5/forecast?"

export async function getWeather(city: string): Promise<WeatherResponse> {
    const params = new URLSearchParams({
        q: city,
        appid: env.API_TOKEN,
        units: "metric"
    });
    const result = await fetch(URL + params);
    const json = await result.json();
    const parsed = weatherResponseSchema.parse(json);
    console.dir(parsed, {depth: 4});
    return parsed;
}

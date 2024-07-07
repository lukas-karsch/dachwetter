"use server";

import env from "@/lib/env/env";
import {WeatherResponse, weatherResponseSchema} from "@/lib/schema/weather";
import {unstable_cache} from "next/cache";

const URL = "https://api.openweathermap.org/data/2.5/forecast?"

export async function getWeather(city: string): Promise<WeatherResponse | undefined> {
    // TODO handle connection errors -> return default weather if in dev, otherwise display error message
    try {
        const f = fetchWeather(city);
        const json = await f();
        return weatherResponseSchema.parse(json);
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

const fetchWeather = (city: string) => {
    // TODO: unstable_cache probably unnecessary, export const revalidate = 60 * 30 should be enough
    return unstable_cache(
        async (): Promise<JSON> => {
            const params = new URLSearchParams({
                q: city,
                appid: env.API_TOKEN,
                units: "metric"
            });
            const response = await fetch(URL + params);
            return await response.json();
        },
        [city],
        {revalidate: 60 * 30} // 30 minutes
    );
}

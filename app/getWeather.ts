"use server";

import env from "@/lib/env/env";
import {WeatherResponse, weatherResponseSchema} from "@/lib/schema/weather";
import {unstable_cache} from "next/cache";

const URL = "https://api.openweathermap.org/data/2.5/forecast?"

export async function getWeather(city: string): Promise<WeatherResponse> {
    const f = fetchWeather(city);
    const json = await f();
    return weatherResponseSchema.parse(json);
}

const fetchWeather = (city: string) => {
    return unstable_cache(
        async (): Promise<WeatherResponse> => {
            const params = new URLSearchParams({
                q: city,
                appid: env.API_TOKEN,
                units: "metric"
            });
            const response = await fetch(URL + params);
            return await response.json();
        },
        ["weather", city],
        {revalidate: 60 * 10}
    );
}

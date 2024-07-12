"use server";

import env from "@/lib/env/env";
import {WeatherResponse, weatherResponseSchema} from "@/lib/schema/weather";

const URL = "https://api.openweathermap.org/data/2.5/forecast?"

export async function getWeather(city: string): Promise<WeatherResponse | undefined> {
    // TODO handle connection errors -> return default weather if in dev, otherwise display error message
    try {
        const params = new URLSearchParams({
            q: city,
            appid: env.API_TOKEN,
            units: "metric"
        });
        const response = await fetch(URL + params);
        if(response.status !== 200) {
            console.error("Could not load weather!!");
            console.error(response.statusText);
            console.error(await response.text());
            return undefined;
        }
        const json = await response.json();
        return weatherResponseSchema.parse(json);
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

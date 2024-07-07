import {ThreeHourForecast, WeatherIcon, WeatherResponse} from "@/lib/schema/weather";
import {getPlusDays} from "@/lib/format/dates";

export type Dachwetter = {
    degrees: number,
    isDachwetter: boolean,
    rain: string,
    wind: string,
    plusDays: number,
    icon: WeatherIcon
}

const groupedByDay = (weatherResponse: WeatherResponse): { [key: string]: ThreeHourForecast[] } => {
    // TODO get evening weather
    return weatherResponse.forecasts.reduce((acc, forecast: ThreeHourForecast) => {
        const day = forecast.date.toISOString().split('T')[0]; // Get the date part in YYYY-MM-DD format

        if (!acc[day]) {
            acc[day] = [];
        }

        acc[day].push(forecast);
        return acc;
    }, {} as { [key: string]: ThreeHourForecast[] });
}

export function extractDachwetter(weather: WeatherResponse): Array<Dachwetter> {
    const grouped = groupedByDay(weather);

    return Object.entries(grouped).map(([day, forecasts]) => {
        const date = new Date(day);

        const degrees = forecasts.reduce((sum, forecast) => sum + forecast.main.temp, 0) / forecasts.length;

        const totalRain = forecasts.reduce((sum, forecast) => sum + (forecast.rain?.['3h'] || 0), 0);
        const averageWind = forecasts.reduce((sum, forecast) => sum + (forecast.wind?.speed || 0), 0) / forecasts.length;

        const counts: Record<WeatherIcon, number> = {
            "SUN": 0,
            "CLOUDS": 0,
            "SUN_AND_CLOUDS": 0,
            "RAIN": 0
        };

        forecasts.forEach(forecast => counts[forecast.weather[0].icon]++);

        return {
            degrees,
            isDachwetter: degrees > 20 && totalRain < 5 && averageWind < 10,
            rain: `${totalRain.toFixed(2)} mm`,
            wind: `${averageWind.toFixed(2)} m/s`,
            plusDays: getPlusDays(date),
            icon: Object.entries(counts).reduce(
                (max, entry) =>
                    entry[1] > max[1] ? entry : max, ["", -Infinity])[0] as WeatherIcon
        };
    });
}

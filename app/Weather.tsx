import {getWeather} from "@/app/getWeather";
import {dateFormatter, timeFormatter} from "@/lib/format/dates";

export default async function Weather({city}: {city: string}) {
    const weather = await getWeather(city);

    return (
        <div>
            <h2 className="text-2xl">Dachwetter für {weather.city.name}</h2>
            <div className="text-lg text-muted-foreground">Die Sonne geht um {timeFormatter.format(weather.city.sunset)} Uhr unter.</div>
            <div>
                {weather.forecasts.map(forecast => {
                    return <div key={forecast.date.getDate()}>{forecast.main.temp}°C</div>;
                })}
            </div>
        </div>
    );
}

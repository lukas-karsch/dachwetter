import {getWeather} from "@/app/getWeather";
import {dateFormatter} from "@/lib/format/dates";

export default async function Weather({city}: {city: string}) {
    const weather = await getWeather(city);

    return (
        <div>
            <h2 className="text-2xl">Weather for {weather.city.name}</h2>
            <div className="text-lg text-slate-800">Sunset at {dateFormatter.format(weather.city.sunset)}</div>
            <div>
                {weather.forecasts.map(forecast => {
                    return <div key={forecast.date.getDate()}>{forecast.main.temp}°</div>;
                })}
            </div>
        </div>
    );
}

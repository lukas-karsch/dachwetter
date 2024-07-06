import {timeFormatter} from "@/lib/format/dates";
import {getWeather} from "@/app/getWeather";

export default async function HomeScreen() {
    const weather = await getWeather("Stuttgart");

    return (
        <main className="min-h-screen p-24 flex justify-center items-center">
            <div className="container">
                <h1 className="text-4xl font-black underline text-primary">Dachwetter</h1>
                <div>
                    <h2 className="text-2xl">Dachwetter für {weather.city.name}</h2>
                    <div className="text-lg text-muted-foreground">Die Sonne geht
                        um {timeFormatter.format(weather.city.sunset)} Uhr unter.
                    </div>
                    <div>
                        {weather.forecasts.map(forecast => {
                            return <div key={forecast.date.getDate()}>{forecast.main.temp}°C</div>;
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
}

import {z} from "zod";

const dateFromNumber = z.number().transform(num => new Date(num * 1000));

function getIcon(iconResponse: string): WeatherIcon {
    if(iconResponse.startsWith("01")) return "SUN";
    else if(iconResponse.startsWith("02")) return "SUN_AND_CLOUDS";
    else if(iconResponse.startsWith("09") || iconResponse.startsWith("10")) return "RAIN";
    else if(iconResponse.startsWith("11")) return "THUNDERSTORM";
    return "CLOUDS";
}

const weatherSchema = z.object({
    id: z.number(),
    main: z.string(),
    description: z.string(),
    icon: z.string().transform(original => getIcon(original)),
});

const windSchema = z.object({
    speed: z.number(),
});

const rainSchema = z.object({
    "3h": z.number(),
});

const forecastSchema = z.object({
    dt: dateFromNumber,
    main: z.object({
        temp: z.number(),
        feels_like: z.number(),
    }).transform(main => {
        const {temp, feels_like} = main;
        // rename feels_like field
        return {feelsLike: feels_like, temp: temp};
    }),
    weather: z.array(weatherSchema),
    wind: windSchema.optional(),
    rain: rainSchema.optional(),
}).transform(original => {
    const {dt, ...rest} = original;
    // rename date field
    return {...rest, date: dt};
})

export const weatherResponseSchema = z.object({
    list: z.array(forecastSchema),
    city: z.object({
        name: z.string(),
        country: z.string(),
        sunrise: dateFromNumber,
        sunset: dateFromNumber,
    })
}).transform(original => {
    return {
        forecasts: original.list,
        city: original.city,
    }
});

export type WeatherResponse = z.infer<typeof weatherResponseSchema>;
export type ThreeHourForecast = z.infer<typeof forecastSchema>;
export type WeatherIcon = "SUN" | "RAIN" | "CLOUDS" | "SUN_AND_CLOUDS" | "THUNDERSTORM";

import {z} from "zod";

const dateFromNumber = z.number().transform(num => new Date(num * 1000));

const weatherSchema = z.object({
    id: z.number(),
    main: z.string(),
    description: z.string(),
    icon: z.string(),
});

const windSchema = z.object({
    speed: z.number(),
});

const forecastSchema = z.object({
    dt: dateFromNumber,
    main: z.object({
        temp: z.number(),
        feels_like: z.number(),
    }),
    weather: z.array(weatherSchema),
    wind: windSchema
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

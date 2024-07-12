"use server";

import {z} from 'zod';

const envSchema = z.object({
    API_TOKEN: z.string(),
    ENV: z
        .union([
            z.literal('development'),
            z.literal('testing'),
            z.literal('production'),
        ])
        .default('development'),
});

const env = envSchema.parse(process.env);

export default env;

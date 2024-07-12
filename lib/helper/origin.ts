import env from "@/lib/env/env";

export function getOwnUrl(): string {
    if (env.ENV === "production") {
        return "https://dachwetter.vercel.app";
    }
    return "http://localhost:3000";
}

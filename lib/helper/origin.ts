import env from "@/lib/env/env";

export function getOwnUrl(): string {
    if (env.NODE_ENV === "production") {
        return "https://dachwetter.vercel.app";
    }
    return "http://localhost:3000";
}

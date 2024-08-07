"use client";

import {SendHorizonal} from "lucide-react";

type ShareButtonProps = {
    degrees: number,
    nextDachwetter: number,
    url: string
};

export default function ShareButton({degrees, nextDachwetter, url}: ShareButtonProps) {
    const handleShare = async () => {
        if (window !== undefined) {
            if(nextDachwetter === 0) {
                await navigator.share({
                    title: 'Es ist Dachwetter!',
                    text: `Heute hat es ${degrees}°C, es ist Zeit fürs Dach!.`,
                    url: url
                });
            } else {
                await navigator.share({
                    title: 'Bald ist Dachwetter!',
                    text: `In ${nextDachwetter} Tagen ist es Zeit fürs Dach. Es wird ${degrees}°C haben!`,
                    url: url
                });
            }
        }
    }

    return (
        <button
            className="border-border border-2 rounded-xl px-4 py-2 font-semibold flex gap-4 bg-foreground text-background shrink-0"
            onClick={handleShare}>
            {"Sag's Deinen Freunden!"}
            <SendHorizonal className="text-primary"/>
        </button>
    );
}

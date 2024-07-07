"use client";

import {SendHorizonal} from "lucide-react";

export default function ShareButton({degreesToday} : {degreesToday: number}) {
    const handleShare = async() => {
        if(window !== undefined) {
            await navigator.share({
                title: 'Es ist Dachwetter!',
                text: `Heute hat es ${degreesToday}°C, es ist Zeit fürs Dach!.`
            });
        }
    }

    return (
        <button
            className="border-border border-2 rounded-xl px-4 py-2 font-semibold flex gap-4 bg-foreground text-background"
            onClick={handleShare}>
                {"Sag's Deinen Freunden!"}
                <SendHorizonal className="text-primary"/>
        </button>
    );
}

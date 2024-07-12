"use client";

export default function Time({time} : {time: Date}) {
    const timeFormatter = new Intl.DateTimeFormat('de-DE', {
        hour: "numeric",
        minute: "numeric",
    });

    return timeFormatter.format(time);
}

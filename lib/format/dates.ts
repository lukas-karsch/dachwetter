export const dateFormatter = new Intl.DateTimeFormat('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

export const timeFormatter = new Intl.DateTimeFormat('de-DE', {
    hour: "numeric",
    minute: "numeric",
})

export function getRelativeDayString(date: Date) {
    const currentDate = new Date();
    const givenDate = new Date(date);

    const timeDifference = givenDate.getTime() - currentDate.getTime();
    const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (dayDifference === 0) {
        return "Heute";
    } else if (dayDifference === 1) {
        return "Morgen";
    } else if (dayDifference === 2) {
        return "Übermorgen";
    } else if (dayDifference === -1) {
        return "Gestern";
    } else if (dayDifference > 1) {
        return `In ${dayDifference} days`;
    } else {
        return `${Math.abs(dayDifference)} days ago`;
    }
}

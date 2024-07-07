export const dateFormatter = new Intl.DateTimeFormat('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});

export const timeFormatter = new Intl.DateTimeFormat('de-DE', {
    hour: "numeric",
    minute: "numeric",
});

export const getPlusDays = (date: Date) => {
    const today = new Date();
    const timeDiff = date.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

export function getRelativeDayStringFromDate(date: Date) {
    const dayDifference = getPlusDays(date);
    return getRelativeDayString(dayDifference);
}

export function getRelativeDayString(plusDays: number) {
    if (plusDays === 0) {
        return "Heute";
    } else if (plusDays === 1) {
        return "Morgen";
    } else if (plusDays === 2) {
        return "Übermorgen";
    } else if (plusDays === -1) {
        return "Gestern";
    } else if (plusDays > 1) {
        return `In ${plusDays} Tagen`;
    } else {
        return `Vor ${Math.abs(plusDays)} Tagen`;
    }
}

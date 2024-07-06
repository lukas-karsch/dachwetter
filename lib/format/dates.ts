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

const dmy = new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC' });

export const shortDate = (date) => dmy.format(date).replaceAll('/', '-');
export const isoDate = (date) => date.toISOString().slice(0, 10);

const dmy = new Intl.DateTimeFormat('en-GB', { timeZone: 'UTC' });

export const shortDate = (date) => dmy.format(date).replaceAll('/', '-');
export const isoDate = (date) => date.toISOString().slice(0, 10);
export const now = new Date();
export const timezone = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', timeZoneName: 'short' })
  .formatToParts(now)
  .find((part) => part.type === 'timeZoneName')?.value;

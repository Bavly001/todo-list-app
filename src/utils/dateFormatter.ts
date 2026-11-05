export const shortMonthFormat = (date: Date | string | number): string => {
  const d = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(d);
};

export const longDateFormatAndTime = (date: Date | string | number): string => {
  const d = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
    timeZone: 'Africa/Cairo',
  }).format(d);
};

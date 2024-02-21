export const shortMonthFormat = (date) => {
      const newDate = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
      }).format(date)
      return newDate
}

export const longDateFormatAndTime = (date) => {
      const newDate = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
            timeZone: "Egypt",
      }).format(date)
      return newDate
}
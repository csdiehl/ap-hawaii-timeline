export function dateToUTC(dateString) {
  const date = new Date(dateString)

  console.log(date)

  const utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  )

  return utc
}

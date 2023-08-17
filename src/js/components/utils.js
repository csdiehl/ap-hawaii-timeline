export function dateToUTC(dateString) {
  const date = new Date(dateString)

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

export async function getData(url) {
  const res = await fetch(url)
  const json = await res.json()
  return json
}

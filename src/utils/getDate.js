export const getFormattedDate = () => {
  const currentDate = new Date()
  const timeZoneOffset = 7 * 60 // GMT+7 in minutes
  const localDate = new Date(currentDate.getTime() + timeZoneOffset * 60000)

  return localDate.toISOString().split('T')[0]
}

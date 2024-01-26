import dayjs from 'dayjs'

const currentDate = new Date()
const year = currentDate.getFullYear()
const month = currentDate.getMonth()

export const getFirstDayOfMonth = () => {
  return dayjs(new Date(year, month, 1)).format('YYYY-MM-DD')
}

export const getLastDayOfMonth = () => {
  return dayjs(new Date(year, month + 1, 0)).format('YYYY-MM-DD')
}

export const getFirstDayByMonth = (monthIndex) => {
  return dayjs(new Date(year, monthIndex, 1)).format('YYYY-MM-DD')
}

export const getLastDayByMonth = (monthIndex) => {
  return dayjs(new Date(year, monthIndex + 1, 0)).format('YYYY-MM-DD')
}

export function getMonthName(dateString) {
  const dates = new Date(dateString)
  return dates.toLocaleString('es-ES', { month: 'long' })
}

export const formatToDayMonth = (date) => {
  return dayjs(date).format('DD-MM')
}

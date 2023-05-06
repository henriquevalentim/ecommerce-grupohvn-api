const { addDays, format } = require('date-fns')

const addDaysInDate = (date, days) => {
  const data = new Date(date)
  const dataAdd = addDays(data, days)
  const dataFormatada = format(dataAdd, 'yyyy-MM-dd')

  return dataFormatada
}

module.exports = {
  addDaysInDate
}

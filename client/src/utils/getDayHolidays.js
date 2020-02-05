const getDayHolidays = (holidays, day) => {
  const holidaysOnThisDay = [];
  if (holidays && holidays.length > 0 && day.date !== -1) {
    for (let i = 0; i < holidays.length; i++) {
      if (
        holidays[i].date.datetime.year === day.year &&
        holidays[i].date.datetime.month === day.month + 1 &&
        holidays[i].date.datetime.day === day.date
      ) {
        holidaysOnThisDay.push(holidays[i]);
      }
    }
  }
  return holidaysOnThisDay.map(holiday => holiday.name);
};

export default getDayHolidays;

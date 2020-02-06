const getHolidayNames = (holidays, day, device) => {
  let holidayNames = [];
  if (holidays && holidays.length > 0 && day.date !== -1) {
    for (let i = 0; i < holidays.length; i++) {
      if (
        holidays[i].date.datetime.year === day.year &&
        holidays[i].date.datetime.month === day.month + 1 &&
        holidays[i].date.datetime.day === day.date
      ) {
        if (device === "mobile") {
          let abbreviatedHoliday = holidays[i];
          abbreviatedHoliday.name = abbreviatedHoliday.name.substr(0, 5);
          holidayNames.push(abbreviatedHoliday);
        } else {
          holidayNames.push(holidays[i]);
        }
      }
    }
  }
  return holidayNames.map(holiday => holiday.name);
};

export default getHolidayNames;

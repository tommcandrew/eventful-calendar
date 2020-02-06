const getClassNames = ({ index, day, holidayNames, eventsOnThisDay }) => {
  let classNames = "cell ";
  const d = new Date();

  const currentMonth = d.getMonth();
  const currentDate = d.getDate();
  const currentYear = d.getFullYear();

  if (day.date === -1) {
    classNames = classNames.concat(" cell--blank");
  } else {
    classNames = classNames.concat(" cell--day");
  }

  if (
    day.month === currentMonth &&
    day.date === currentDate &&
    day.year === currentYear
  ) {
    classNames = classNames.concat(" cell--today");
  }

  if (index === 35 && day.date === -1) {
    classNames = classNames.concat(" hideRow");
  }

  if ([5, 6, 12, 13, 19, 20, 26, 27, 33, 34].includes(index)) {
    classNames = classNames.concat(" cell--weekend");
  }

  if (holidayNames.length > 0) {
    classNames = classNames.concat(" cell--with-holiday");
  }

  if (eventsOnThisDay.length > 0) {
    classNames = classNames.concat(" cell--with-event");
  }

  return classNames;
};

export default getClassNames;

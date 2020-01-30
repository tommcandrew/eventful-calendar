const createMonthArray = (currentYear, month) => {
  const monthArray = [];
  const startOfMonth = new Date(currentYear, month);
  let firstDayOfMonth = startOfMonth.getDay();
  //if first day is Sunday, count as 7 instead of 0 to get 6 blanks before it
  if (firstDayOfMonth === 0) {
    firstDayOfMonth = 7;
  }
  //generate blanks for start of month
  for (let i = 0; i < firstDayOfMonth - 1; i++) {
    debugger;

    //giving blanks value of -1 to avoid CSS issues later (so content size in all cells is equal)
    monthArray.push({ date: -1, month: month, year: currentYear });
  }
  //passing in 0 gives you last day of previous month
  const endOfMonth = new Date(currentYear, month + 1, 0);
  const lastDayOfMonth = endOfMonth.getDate();

  for (let i = 0; i < lastDayOfMonth; i++) {
    //JS dates start from 1, not 0
    monthArray.push({
      date: i + 1,
      month: month,
      year: currentYear
    });
  }

  //generate blanks for end of month
  let blanksRequired = 42 - monthArray.length;
  for (let i = 0; i < blanksRequired; i++) {
    monthArray.push({ date: -1, month: month, year: currentYear });
  }

  return monthArray;
};

export default createMonthArray;

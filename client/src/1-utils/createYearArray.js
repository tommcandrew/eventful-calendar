import createMonthArray from "./createMonthArray";

const createYearArray = year => {
  const yearArray = [];

  for (let i = 0; i < 12; i++) {
    const monthArray = createMonthArray(year, i);
    yearArray.push(monthArray);
  }
  return yearArray;
};

export default createYearArray;

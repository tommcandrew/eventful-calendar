const getDayEvents = (events, day) => {
  const eventsOnThisDay = [];

  if (events && events.length > 0) {
    if (day.date !== -1) {
      for (let i = 0; i < events.length; i++) {
        if (
          events[i].month === day.month &&
          events[i].date === day.date &&
          events[i].year === day.year
        ) {
          const objCopy = { ...events[i] };
          eventsOnThisDay.push(objCopy);
        }
      }
    }
  }
  return eventsOnThisDay;
};

export default getDayEvents;

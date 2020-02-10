const getEventNames = (eventsOnThisDay, device) => {
  let eventLimit;
  if (device !== "desktop") {
    eventLimit = 2;
  } else {
    eventLimit = 4;
  }
  let eventNames = [];
  if (eventsOnThisDay.length > 0) {
    for (let i = 0; i < eventsOnThisDay.length; i++) {
      eventNames.push(eventsOnThisDay[i]);
    }
    //only space for 5 events in cell so, if more, just tell user how many there are (they can click to see list)
    if (eventNames.length > eventLimit) {
      eventNames = [{ title: `${eventNames.length} events...` }];
    }
  }
  return eventNames;
};

export default getEventNames;

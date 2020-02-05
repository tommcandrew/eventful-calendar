const getEventNames = (eventsOnThisDay, device) => {
  let charLimit;
  if (device === "mobile") {
    charLimit = 5;
  } else {
    charLimit = 17;
  }

  let eventLimit;
  if (device === "mobile") {
    eventLimit = 2;
  } else {
    eventLimit = 4;
  }
  let eventNames = [];
  if (eventsOnThisDay.length > 0) {
    for (let i = 0; i < eventsOnThisDay.length; i++) {
      if (eventsOnThisDay[i].length > charLimit) {
        let updatedEvent = eventsOnThisDay[i];
        updatedEvent.title = eventsOnThisDay[i].title.substr(0, charLimit);
        eventNames.push(updatedEvent);
      } else {
        eventNames.push(eventsOnThisDay[i]);
      }
    }
    //only space for 5 events in cell so, if more, just tell user how many there are (they can click to see list)
    if (eventNames.length > eventLimit) {
      eventNames = [{ title: `${eventNames.length} events...` }];
    }
  }
  return eventNames;
};

export default getEventNames;

const getEventNames = eventsOnThisDay => {
  let eventNames;
  if (eventsOnThisDay.length > 0) {
    eventNames = eventsOnThisDay.map(event => {
      if (event.title > 17) {
        event.title = event.title.substr(0, 14) + "...";
        return event;
      } else {
        return event;
      }
    });
    //only space for 5 events in cell so, if more, just tell user how many there are (they can click to see list)
    if (eventNames.length > 4) {
      eventNames = [{ title: `${eventNames.length} events...` }];
    }
  }
  return eventNames;
};

export default getEventNames;

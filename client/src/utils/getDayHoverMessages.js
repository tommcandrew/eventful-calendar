const getDayHoverMessages = (
  holidayNames,
  eventsOnThisDay,
  yearView,
  classNames
) => {
  let hoverMessages = [];
  if (yearView) {
    if (classNames.includes("cell--today")) {
      hoverMessages.push("Today");
    }

    if (holidayNames && holidayNames.length > 0) {
      holidayNames.forEach((holiday, index) => {
        hoverMessages.push(holiday);
      });
    }

    if (eventsOnThisDay && eventsOnThisDay.length > 0) {
      hoverMessages.push(
        `You have ${eventsOnThisDay.length} event
          ${eventsOnThisDay.length > 1 ? "s" : ""} on this day.`
      );
    }
  }
  return hoverMessages;
};

export default getDayHoverMessages;

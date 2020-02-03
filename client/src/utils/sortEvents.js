const sortEvents = array => {
  //eslint-disable-next-line
  const sortedArray = array.sort((event1, event2) => {
    const leftYear = parseInt(event1.year);
    const rightYear = parseInt(event2.year);
    const leftMonth = parseInt(event1.month);
    const rightMonth = parseInt(event2.month);
    const leftDate = parseInt(event1.date);
    const rightDate = parseInt(event2.date);
    const leftHour = parseInt(event1.time.substr(0, 2));
    const rightHour = parseInt(event2.time.substr(0, 2));
    const leftMins = parseInt(event1.time.substr(3));
    const rightMins = parseInt(event2.time.substr(3));

    if (leftYear > rightYear) {
      return 1;
    } else if (leftYear < rightYear) {
      return -1;
    } else if (leftYear === rightYear) {
      //compare months
      if (leftMonth > rightMonth) {
        return 1;
      } else if (leftMonth < rightMonth) {
        return -1;
      } else if (leftMonth === rightMonth) {
        //compare dates
        if (leftDate > rightDate) {
          return 1;
        } else if (leftDate < rightDate) {
          return -1;
        } else if (leftDate === rightDate) {
          //compare hours
          if (leftHour > rightHour) {
            return 1;
          } else if (leftHour < rightHour) {
            return -1;
          } else if (leftHour === rightHour) {
            //compare mins
            if (leftMins > rightMins) {
              return 1;
            } else if (leftMins < rightMins) {
              return -1;
            } else {
              //leave in same order if exactly the same time
              return null;
            }
          }
        }
      }
    }
  });
  return sortedArray;
};

export default sortEvents;

import React, { useContext } from "react";

const Day = ({ day, yearView, handleShowModalContainer, index, holidays }) => {
  const d = new Date();
  const currentMonth = d.getMonth();
  const currentDate = d.getDate();
  const currentYear = d.getFullYear();
  const dayDateString = day.date.toString();
  const dayMonthString = day.month.toString();
  const dayYearString = day.year.toString();
  const fullDayDateString =
    dayDateString + "-" + dayMonthString + "-" + dayYearString;

  const holidaysOnThisDay = [];
  if (holidays && holidays.length > 0 && day.date !== -1) {
    for (let i = 0; i < holidays.length; i++) {
      if (
        holidays[i].date.datetime.year === day.year &&
        holidays[i].date.datetime.month === day.month + 1 &&
        holidays[i].date.datetime.day === day.date
      ) {
        holidaysOnThisDay.push(holidays[i]);
      }
    }
  }

  let classNames = "cell ";

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
    classNames = classNames.concat(" weekend");
  }

  let holidayNames;
  if (holidaysOnThisDay.length > 0) {
    classNames = classNames.concat(" cell--with-holiday");
    holidayNames = holidaysOnThisDay.map(holiday => holiday.name);
  }

  let hoverMessages = [];

  if (yearView) {
    if (classNames.includes("cell--today")) {
      hoverMessages.push("Today");
    }

    if (holidayNames && holidayNames.length > 0) {
      holidayNames.forEach((holidayName, index) => {
        hoverMessages.push(holidayName);
      });
    }

    return (
      <div
        className={classNames}
        onClick={e =>
          !yearView &&
          e.currentTarget.classList.contains("cell--day") &&
          handleShowModalContainer(e)
        }
      >
        {hoverMessages && hoverMessages.length > 0 && (
          <div className="cell__hover-messages">
            {hoverMessages.map(message => (
              <div>{message}</div>
            ))}
          </div>
        )}

        {day.date === -1 && (
          <div className="cell__content">
            <span className="cell--blank">{day.date}</span>
          </div>
        )}
        {day.date !== -1 && (
          <>
            <div className="cell__content">
              <div className="cell__date">{day.date}</div>

              {!yearView && holidayNames && (
                <div className="cell__holiday-names">
                  {holidayNames.map((holidayName, index) => (
                    <div
                      key={index + "holiday-title"}
                      className="cell__holiday-name"
                    >
                      {holidayName}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    );
  }
};

export default Day;

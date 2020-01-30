import React from "react";

const Day = ({ day }) => {
  let classNames = "cell ";

  if (day.date === -1) {
    classNames = classNames.concat(" cell--blank");
  } else {
    classNames = classNames.concat(" cell--day");
  }

  return (
    <div className={classNames}>
      {day.date === -1 && (
        <div className="cell__content">
          <span className="cell--blank">{day.date}</span>
        </div>
      )}
      {day.date !== -1 && (
        <>
          <div className="cell__content">
            <div className="cell__date">{day.date}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Day;

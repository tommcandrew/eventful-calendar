import React from "react";

//date will be -1 for blank cells
const BlankCellContent = ({ date }) => {
  return (
    <div className="cell__content">
      <span className="cell--blank">{date}</span>
    </div>
  );
};

export default BlankCellContent;

import React from "react";

const BlankCellContent = ({ date }) => {
  return (
    <div className="cell__content">
      <span className="cell--blank">{date}</span>
    </div>
  );
};

export default BlankCellContent;

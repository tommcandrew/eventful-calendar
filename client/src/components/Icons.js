import React from "react";

const Icons = ({ handleSelectIcon }) => {
  return (
    <div className="icons" onClick={handleSelectIcon}>
      <div className="row">
        <span className="icon">&#127874;</span>
        <span className="icon">&#128214;</span>
        <span className="icon">&#127865;</span>
        <span className="icon">&#128187;</span>
        <span className="icon">&#x1F576;</span>
      </div>
      <div className="row">
        <span className="icon">&#127860;</span>
        <span className="icon">&#x1f6d2;</span>
        <span className="icon">&#x2615;</span>
        <span className="icon">&#9917;</span>
        <span className="icon">&#127947;</span>
      </div>
      <div className="row">
        <span className="icon">&#128690;</span>
        <span className="icon">&#128644;</span>
        <span className="icon">&#128652;</span>
        <span className="icon">&#9992;</span>
        <span className="icon">&#127973;</span>
      </div>
    </div>
  );
};

export default Icons;

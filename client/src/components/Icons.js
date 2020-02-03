import React from "react";

const Icons = ({ handleSelectIcon }) => {
  return (
    <div className="icons" onClick={handleSelectIcon}>
      <div className="row">
        <span role="img" aria-label="blank" className="icon"></span>
        <span role="img" aria-label="blank" className="icon">
          &#127874;
        </span>
        <span role="img" aria-label="cake" className="icon">
          &#128214;
        </span>
        <span role="img" aria-label="book" className="icon">
          &#127863;
        </span>
        <span role="img" aria-label="wine" className="icon">
          &#128187;
        </span>
      </div>
      <div className="row">
        <span role="img" aria-label="laptop" className="icon">
          &#127860;
        </span>
        <span role="img" aria-label="knife and fork" className="icon">
          &#x1f6d2;
        </span>
        <span role="img" aria-label="shopping trolley" className="icon">
          &#x2615;
        </span>
        <span role="img" aria-label="mug of coffee" className="icon">
          &#9917;
        </span>
        <span role="img" aria-label="football" className="icon">
          &#127947;
        </span>
      </div>
      <div className="row">
        <span role="img" aria-label="gym" className="icon">
          &#128690;
        </span>
        <span role="img" aria-label="bike" className="icon">
          &#128644;
        </span>
        <span role="img" aria-label="train" className="icon">
          &#128652;
        </span>
        <span role="img" aria-label="bus" className="icon">
          &#9992;
        </span>
        <span role="img" aria-label="aeroplane" className="icon">
          &#x1F576;
        </span>
      </div>
    </div>
  );
};

export default Icons;

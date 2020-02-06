import React from "react";

const Icons = ({ handleSelectIcon, closeIcons }) => {
  return (
    <div className="icons" onClick={handleSelectIcon}>
      <span className="icons__close-button" onClick={closeIcons}>
        &times;
      </span>
      <div className="icons__content">
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
        <span
          role="img"
          aria-label="heart"
          className="icon"
          style={{ color: "red" }}
        >
          &#x2764;
        </span>
        <span role="img" aria-label="dancer" className="icon">
          &#128131;
        </span>
        <span role="img" aria-label="golfer" className="icon">
          &#127948;
        </span>
        <span role="img" aria-label="snowman" className="icon">
          &#9924;
        </span>
        <span role="img" aria-label="beach" className="icon">
          &#127958;
        </span>
        <span role="img" aria-label="monkey" className="icon">
          &#128053;
        </span>
        <span role="img" aria-label="dog" className="icon">
          &#128054;
        </span>
        <span role="img" aria-label="fish" className="icon">
          &#128031;
        </span>
        <span role="img" aria-label="bouquet" className="icon">
          &#128144;
        </span>
        <span role="img" aria-label="auberjine" className="icon">
          &#127814;
        </span>
        <span role="img" aria-label="mushroom" className="icon">
          &#127812;
        </span>
        <span role="img" aria-label="croissant" className="icon">
          &#129360;
        </span>
        <span role="img" aria-label="ice-cream" className="icon">
          &#127846;
        </span>
        <span role="img" aria-label="beer mugs" className="icon">
          &#127867;
        </span>
        <span role="img" aria-label="house" className="icon">
          &#127969;
        </span>
        <span role="img" aria-label="mosque" className="icon">
          &#128332;
        </span>
        <span role="img" aria-label="bouquet" className="icon">
          &#9962;
        </span>
        <span role="img" aria-label="sun" className="icon">
          &#127774;
        </span>
        <span role="img" aria-label="jack o'lantern" className="icon">
          &#127875;
        </span>
        <span role="img" aria-label="christmas tree" className="icon">
          &#127876;
        </span>
        <span role="img" aria-label="ice-cream" className="icon">
          &#127881;
        </span>
        <span role="img" aria-label="graduation cap" className="icon">
          &#127891;
        </span>
        <span role="img" aria-label="money bag" className="icon">
          &#128176;
        </span>
        <span role="img" aria-label="hammer" className="icon">
          &#128296;
        </span>
        <span role="img" aria-label="nail polish" className="icon">
          &#128133;
        </span>
      </div>
    </div>
  );
};

export default Icons;

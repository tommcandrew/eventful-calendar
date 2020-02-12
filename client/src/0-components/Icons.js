import React from "react";

const Icons = ({ handleSelectIcon, setShowIcons }) => {
  return (
    <div className="icons" onClick={handleSelectIcon}>
      <span className="icons__close-button" onClick={() => setShowIcons(false)}>
        &times;
      </span>
      <div className="icons__content">
        <span role="img" aria-label="blank" className="icons__icon"></span>
        <span role="img" aria-label="blank" className="icons__icon">
          &#127874;
        </span>
        <span role="img" aria-label="cake" className="icons__icon">
          &#128214;
        </span>
        <span role="img" aria-label="book" className="icons__icon">
          &#127863;
        </span>
        <span role="img" aria-label="wine" className="icons__icon">
          &#128187;
        </span>
        <span role="img" aria-label="laptop" className="icons__icon">
          &#127860;
        </span>
        <span role="img" aria-label="knife and fork" className="icons__icon">
          &#x1f6d2;
        </span>
        <span role="img" aria-label="shopping trolley" className="icons__icon">
          &#x2615;
        </span>
        <span role="img" aria-label="mug of coffee" className="icons__icon">
          &#9917;
        </span>
        <span role="img" aria-label="football" className="icons__icon">
          &#127947;
        </span>
        <span role="img" aria-label="gym" className="icons__icon">
          &#128690;
        </span>
        <span role="img" aria-label="bike" className="icons__icon">
          &#128644;
        </span>
        <span role="img" aria-label="train" className="icons__icon">
          &#128652;
        </span>
        <span role="img" aria-label="bus" className="icons__icon">
          &#9992;
        </span>
        <span role="img" aria-label="aeroplane" className="icons__icon">
          &#x1F576;
        </span>
        <span
          role="img"
          aria-label="heart"
          className="icons__icon"
          style={{ color: "red" }}
        >
          &#x2764;
        </span>
        <span role="img" aria-label="dancer" className="icons__icon">
          &#128131;
        </span>
        <span role="img" aria-label="golfer" className="icons__icon">
          &#127948;
        </span>
        <span role="img" aria-label="snowman" className="icons__icon">
          &#9924;
        </span>
        <span role="img" aria-label="beach" className="icons__icon">
          &#127958;
        </span>
        <span role="img" aria-label="monkey" className="icons__icon">
          &#128053;
        </span>
        <span role="img" aria-label="dog" className="icons__icon">
          &#128054;
        </span>
        <span role="img" aria-label="fish" className="icons__icon">
          &#128031;
        </span>
        <span role="img" aria-label="bouquet" className="icons__icon">
          &#128144;
        </span>
        <span role="img" aria-label="auberjine" className="icons__icon">
          &#127814;
        </span>
        <span role="img" aria-label="mushroom" className="icons__icon">
          &#127812;
        </span>
        <span role="img" aria-label="croissant" className="icons__icon">
          &#129360;
        </span>
        <span role="img" aria-label="ice-cream" className="icons__icon">
          &#127846;
        </span>
        <span role="img" aria-label="beer mugs" className="icons__icon">
          &#127867;
        </span>
        <span role="img" aria-label="house" className="icons__icon">
          &#127969;
        </span>
        <span role="img" aria-label="mosque" className="icons__icon">
          &#128332;
        </span>
        <span role="img" aria-label="bouquet" className="icons__icon">
          &#9962;
        </span>
        <span role="img" aria-label="sun" className="icons__icon">
          &#127774;
        </span>
        <span role="img" aria-label="jack o'lantern" className="icons__icon">
          &#127875;
        </span>
        <span role="img" aria-label="christmas tree" className="icons__icon">
          &#127876;
        </span>
        <span role="img" aria-label="ice-cream" className="icons__icon">
          &#127881;
        </span>
        <span role="img" aria-label="graduation cap" className="icons__icon">
          &#127891;
        </span>
        <span role="img" aria-label="money bag" className="icons__icon">
          &#128176;
        </span>
        <span role="img" aria-label="hammer" className="icons__icon">
          &#128296;
        </span>
        <span role="img" aria-label="nail polish" className="icons__icon">
          &#128133;
        </span>
      </div>
    </div>
  );
};

export default Icons;

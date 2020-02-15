import React, { useState } from "react";

const AutoComplete = ({ options, inputValue, setInputValue }) => {
  const [activeOption, setActiveOption] = useState(0);
  const [filtered, setFiltered] = useState();

  const handleChange = e => {
    const userInput = e.target.value;
    setInputValue(userInput);
    //eslint-disable-next-line
    const filteredOptions = options.filter(option => {
      if (option.toLowerCase().indexOf(userInput.toLowerCase()) !== -1) {
        return option;
      }
    });
    setFiltered(filteredOptions);
  };

  const handleClick = e => {
    setInputValue(e.target.innerText);
    setFiltered([]);
  };

  const handleKeyDown = e => {
    if (e.keyCode !== 13 && e.keyCode !== 38 && e.keyCode !== 40) {
      return;
    }
    let list = document.getElementsByClassName("auto-complete__list")[0];
    let listItems = list.childNodes;
    let activeItemIndex;
    let activeItem;
    //enter key
    if (e.keyCode === 13) {
      setInputValue(filtered[activeOption]);
      setActiveOption(0);
      setFiltered([]);
      return;
      //up arrow
    } else if (e.keyCode === 38) {
      //if already at top of list, return
      if (activeOption === 0) {
        return;
      }
      activeItemIndex = activeOption - 1;

      //down arrow
    } else if (e.keyCode === 40) {
      //if already at bottom of list, return
      if (activeOption === filtered.length - 1) {
        return;
      }
      activeItemIndex = activeOption + 1;
    }
    activeItem = listItems[activeItemIndex];
    activeItem.scrollIntoView({ block: "center" });
    setActiveOption(activeItemIndex);
  };

  return (
    <div className="auto-complete">
      <input
        className="auto-complete__input"
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={inputValue}
      />
      <ul className="auto-complete__list">
        {inputValue &&
          filtered &&
          filtered.length > 0 &&
          filtered.map((option, index) => {
            let activeClass;
            if (activeOption === index) {
              activeClass = "auto-complete__list-item--active";
            } else {
              activeClass = "";
            }
            return (
              <li
                key={"option" + index}
                className={`auto-complete__list-item ${activeClass}`}
                onClick={handleClick}
              >
                {option}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default AutoComplete;

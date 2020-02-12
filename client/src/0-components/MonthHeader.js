import React, { useContext, useState } from "react";
import months from "../3-data/months";
import DateContext from "../2-context/DateContext";
import LanguageContext from "../2-context/LanguageContext";
import DeviceContext from "../2-context/DeviceContext";
import { wholeYearTextOptions } from "../3-data/otherText";
import HeaderLinks from "./HeaderLinks";
import MobileMenu from "./MobileMenu";
import DateSelect from "./DateSelect";

const MonthHeader = ({
  handleShowMyEvents,
  handleShowSettings,
  monthIndex,
  setMonth,
  setShowDateSelect,
  setShowMyAccount,
  setShowWholeYear,
  setYear,
  showDateSelect,
  showMyAccount,
  yearView
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const { dateObj } = useContext(DateContext);
  const { language } = useContext(LanguageContext);
  const { device } = useContext(DeviceContext);
  const monthsArray = months[language];

  if (yearView) {
    return (
      <div className="month-header">
        <div className="month-header__content">
          <button className="month-header__month-name">
            {monthsArray[monthIndex]}
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="month-header">
        {device !== "desktop" && (
          //HeaderLinks inside expandable menu on smaller screens
          <div
            className="month-header__hamburger"
            onClick={() => setShowMenu(true)}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        {showMenu && (
          <MobileMenu
            setShowMenu={setShowMenu}
            handleShowSettings={handleShowSettings}
            handleShowMyEvents={handleShowMyEvents}
            setShowMyAccount={setShowMyAccount}
          />
        )}
        {device === "desktop" && (
          //only allow whole year view on larger screen
          <button
            className="month-header__whole-year-button"
            onClick={() => setShowWholeYear(true)}
          >
            &#11207;{wholeYearTextOptions[language]}
          </button>
        )}
        <div className="month-header__content">
          <button
            className="month-header__arrow month-header__arrow--left"
            onClick={() => setMonth(monthIndex - 1)}
          ></button>
          <div
            className="month-header__date-info"
            onClick={() => setShowDateSelect(!showDateSelect)}
          >
            <button className="month-header__month-name">
              {monthsArray[monthIndex]}
            </button>
            <button className="month-header__year-name">{dateObj.year}</button>
          </div>
          <button
            className="month-header__arrow month-header__arrow--right"
            onClick={() => setMonth(monthIndex + 1)}
          ></button>
        </div>
        {showDateSelect && <DateSelect setYear={setYear} setMonth={setMonth} />}
        {device === "desktop" && (
          <HeaderLinks
            handleShowMyEvents={handleShowMyEvents}
            handleShowSettings={handleShowSettings}
            setShowMyAccount={setShowMyAccount}
            showMyAccount={showMyAccount}
          />
        )}
      </div>
    );
  }
};

export default MonthHeader;

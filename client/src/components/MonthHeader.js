import React, { useContext, useState } from "react";
import months from "../data/months";
import DateContext from "../context/DateContext";
import LanguageContext from "../context/LanguageContext";
import DeviceContext from "../context/DeviceContext";
import { wholeYearTextOptions } from "../data/otherText";
import HeaderLinks from "./HeaderLinks";
import MobileMenu from "./MobileMenu";

const MonthHeader = ({
  monthIndex,
  yearView,
  setMonth,
  setShowWholeYear,
  handleShowSettings,
  handleShowMyEvents,
  showMyAccount,
  setShowMyAccount,
  setShowDateSelect,
  showDateSelect,
  handleShowPrint
}) => {
  const { dateObj } = useContext(DateContext);
  const { language } = useContext(LanguageContext);
  const { device } = useContext(DeviceContext);
  const monthsArray = months[language];
  const [showMenu, setShowMenu] = useState(false);

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
          <div
            className="month-header__hamburger"
            onClick={() => setShowMenu(true)}
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        {device === "desktop" && (
          <button
            className="month-header__whole-year-button"
            onClick={() => setShowWholeYear(true)}
          >
            &#11207;{wholeYearTextOptions[language]}
          </button>
        )}
        {showMenu && (
          <MobileMenu
            setShowMenu={setShowMenu}
            handleShowSettings={handleShowSettings}
            handleShowMyEvents={handleShowMyEvents}
            setShowMyAccount={setShowMyAccount}
          />
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

        {device === "desktop" && (
          <HeaderLinks
            handleShowSettings={handleShowSettings}
            handleShowMyEvents={handleShowMyEvents}
            showMyAccount={showMyAccount}
            setShowMyAccount={setShowMyAccount}
            handleShowPrint={handleShowPrint}
          />
        )}
      </div>
    );
  }
};

export default MonthHeader;

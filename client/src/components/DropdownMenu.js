import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "../components/styles/DropdownMenu.css";
import { faAngleDown, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import onClickOutside from "react-onclickoutside";

const DropdownMenu = function (props) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(undefined);
  const [selectedView, setSelectedView] = useState("categories");

  useEffect(() => {
    if (!value) return;
    props.onSelect(
      value == "Recent" ? "date" : value == "Most Popular" ? "likes" : "song"
    );
  }, [value]);

  const handleClick = (value) => {
    setSelectedView(value);
    props.onCardViewChange(value);
  };

  DropdownMenu.handleClickOutside = () => setShow(false);

  return (
    <React.Fragment>
      <div className="dropdown-menu-container">
        <div className="dropdown">
          <button
            className="actual"
            onClick={() => {
              setShow(!show);
            }}
          >
            {value ? (
              <React.Fragment>
                {show ? (
                  <React.Fragment>
                    Sort by &#160;
                    <FontAwesomeIcon icon={faAngleDown} />
                  </React.Fragment>
                ) : (
                  value
                )}
              </React.Fragment>
            ) : (
              <React.Fragment>
                Sort by &#160;
                <FontAwesomeIcon icon={faAngleDown} />
              </React.Fragment>
            )}
          </button>
          <div
            className={`dropdown-content shadow ${
              show ? "dropdown-show" : "dropdown-hide"
            }`}
          >
            <div
              className="dropdown-item"
              onClick={() => {
                setShow(!show);
                setValue("Recent");
              }}
            >
              <h1>Date</h1>
            </div>
            <hr className="divisor dropdown-divisor" />
            <div
              className="dropdown-item"
              onClick={() => {
                setShow(!show);
                setValue("Most Popular");
              }}
            >
              <h1>Popularity</h1>
            </div>
            <hr className="divisor dropdown-divisor" />
            <div
              className="dropdown-item"
              onClick={() => {
                setShow(!show);
                setValue("Name");
              }}
            >
              <h1>Alphabetical</h1>
            </div>
          </div>
        </div>
        <div className="select-type">
          <button
            className={`option-select-type mr-4 ${
              selectedView == "categories" ? "selected-type" : ""
            }`}
            onClick={() => {
              handleClick("categories");
            }}
          >
            <div className="cat-dot-list"></div>
            <div className="cat-dot-list"></div>
            <div className="cat-dot-list"></div>
          </button>
          <button
            className={`option-select-type ${
              selectedView == "all" ? "selected-type" : ""
            }`}
            onClick={() => {
              handleClick("all");
            }}
          >
            <div className="cat-dot"></div>
            <div className="cat-dot"></div>
            <div className="cat-dot"></div>
            <div className="cat-dot"></div>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => DropdownMenu.handleClickOutside,
};

export default onClickOutside(DropdownMenu, clickOutsideConfig);

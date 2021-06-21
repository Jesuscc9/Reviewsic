import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import {
  faAngleDown,
  faFilter,
  faList,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import onClickOutside from "react-onclickoutside";
import { DropdownMainContainer } from "./styles/DropdownMenu.style";

const DropdownMenu = function (props) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(undefined);
  const [selectedView, setSelectedView] = useState("all");

  useEffect(() => {
    if (!value) return;
    props.onSelect(value == "name" ? "song" : value);
  }, [value]);

  const handleClick = (value) => {
    // setSelectedView(value);
    // props.onCardViewChange(value);
  };

  const values = ["date", "likes", "name", "rating"];

  DropdownMenu.handleClickOutside = () => setShow(false);

  return (
    <React.Fragment>
      <DropdownMainContainer>
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
              {values.map((value) => {
                return (
                  <div>
                    <div
                      className="dropdown-item"
                      onClick={() => {
                        setShow(!show);
                        setValue(value);
                      }}
                    >
                      <h1>{value}</h1>
                    </div>
                    <hr className="divisor dropdown-divisor" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="search-container">
            <input
              type="text"
              className="search"
              placeholder="Search by song, artist or user..."
              onChange={(e) => {
                props.onSearch(e.target.value);
              }}
            />
            <FontAwesomeIcon icon={faSearch} className="icon" />
          </div>
          <div className="select-type">
            <button
              className={`option-select-type  ${
                selectedView == "categories" ? "selected-type" : ""
              }`}
              onClick={() => {
                handleClick("categories");
              }}
            >
              <FontAwesomeIcon icon={faFilter} className="filter-icon" />
            </button>
          </div>
        </div>
      </DropdownMainContainer>
    </React.Fragment>
  );
};

const clickOutsideConfig = {
  handleClickOutside: () => DropdownMenu.handleClickOutside,
};

export default onClickOutside(DropdownMenu, clickOutsideConfig);

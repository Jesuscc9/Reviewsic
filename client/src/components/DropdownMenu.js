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
import { AnimatePresence, motion } from "framer-motion";

const DropdownMenu = function (props) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("date");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  useEffect(() => {
    if (!value) return;
    props.onSelect(value == "name" ? "song" : value);
  }, [value]);

  const values = ["date", "likes", "name", "rating"];

  const filters = [...new Set(props.genres)].sort((a, b) => a.localeCompare(b));

  useEffect(() => {
    props.onUpdateFilters(selectedFilters);
  }, [selectedFilters]);

  DropdownMenu.handleClickOutside = () => {
    setShow(false);
    setShowFilter(false);
  };
  

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
              placeholder="Search..."
              onChange={(e) => {
                props.onSearch(e.target.value);
              }}
            />
            <FontAwesomeIcon icon={faSearch} className="icon" />
          </div>
          <div className="filter-button-container">
            <button
              className={`filter-button ${showFilter && "showingFilter"}`}
              onClick={() => {
                setShowFilter(!showFilter);
              }}
            >
              <FontAwesomeIcon icon={faFilter} className="filter-icon" />
            </button>
            <AnimatePresence>
              {showFilter && (
                <motion.div
                  className="filter-container"
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="filters">
                    <h1>Genres</h1>
                    <hr />
                    {filters.map((e) => {
                      return (
                        <div
                          className="filter"
                          onClick={() => {
                            if (!selectedFilters.includes(e)) {
                              setSelectedFilters((prevState) => [
                                ...prevState,
                                e,
                              ]);
                            } else {
                              setSelectedFilters(
                                selectedFilters.filter((genre) => genre != e)
                              );
                            }
                          }}
                        >
                          <p>{e}</p>
                          <input
                            type="checkbox"
                            value={e}
                            checked={selectedFilters.includes(e)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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

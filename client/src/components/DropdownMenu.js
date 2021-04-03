import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import "../components/styles/DropdownMenu.css";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DropdownMenu = () => {


  const [show, setShow] = useState(false)
  const [value, setValue] = useState(undefined)
  

  return (
    <React.Fragment>
      <div className="dropdown-menu-container">
        <div className="dropdown">
          <button className="actual" onClick={() => {setShow(!show)}}>
              {value ? (
                <React.Fragment>
                  {show ? (
                    <React.Fragment>
                      Sort by &#160;
                      <FontAwesomeIcon icon={faAngleDown}/>
                    </React.Fragment>
                  ) : value}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  Sort by &#160;
                  <FontAwesomeIcon icon={faAngleDown}/>
                </React.Fragment>
              )}
          </button>
          <div className={`dropdown-content shadow ${show ? 'dropdown-show' : 'dropdown-hide'}`}>
            <div className="dropdown-item" onClick={() => {setShow(!show); setValue('Recent')}}>
              <h1>Date</h1>
            </div>
            <hr className="divisor dropdown-divisor"/>
            <div className="dropdown-item" onClick={() => {setShow(!show); setValue('Most Popular')}}>
              <h1>Popularity</h1>
            </div>
         </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DropdownMenu;

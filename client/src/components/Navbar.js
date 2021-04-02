import React from "react";
import "tailwindcss/tailwind.css";
import Logo from "../assets/img/music.png";
import "../components/styles/Navbar.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const navbar = (props) => {
  return (
    <React.Fragment>
      <nav className="bg-gray-800 fixed w-full mb-5">
        <div className=" px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16 w-100">
            <div className="flex sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center">
                <img
                  className="lg:block h-8 w-auto"
                  src={Logo}
                  alt="Workflow"
                />
                <h2 className="logo-title">Reviewsic</h2>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </a>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 profile">
              <div className="ml-3 relative">
                <div className="options-container">
                  {props.token ? (
                    <React.Fragment>
                      <button onClick={props.onAddClick} className="add-button">
                        <FontAwesomeIcon icon={faPlus} />
                        <p className="add-text">ADD</p>
                      </button>
                      <img
                        className="profile-image"
                        src={props.profileImage}
                        alt=""
                      />
                    </React.Fragment>
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Registro
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Contactos
            </a>
          </div>
        </div>
      </nav>
      <br/><br/>
    </React.Fragment>
  );
};

export default navbar;

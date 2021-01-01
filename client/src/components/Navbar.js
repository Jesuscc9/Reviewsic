import React from "react";
import "tailwindcss/tailwind.css";
import Logo from '../assets/img/music.png';
import '../components/styles/Navbar.css';

const navbar = () => {
  return (
    <React.Fragment>
      <nav class="bg-gray-800">
        <div class=" px-2 sm:px-6 lg:px-8">
          <div class="relative flex items-center justify-between h-16 w-100">
            <div class="flex sm:items-stretch sm:justify-start">
              <div class="flex-shrink-0 flex items-center">
                <img
                  class="lg:block h-8 w-auto"
                  src={Logo}
                  alt="Workflow"
                />
                <h2 class="logo-title">Reviewsic</h2>
              </div>
              <div class="hidden sm:block sm:ml-6">
                <div class="flex space-x-4">
                  <a
                    href="#"
                    class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </a>
                </div>
              </div>
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 profile">
              <div class="ml-3 relative">
                <div>

                  <div className="profile-letter" style={{backgroundColor : 'white'}}>
                    <p className="letter">J</p>
                  </div>

                </div>
              
              </div>
            </div>
          </div>
        </div>

        <div class="hidden sm:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              class="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Registro
            </a>
            <a
              href="#"
              class="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Contactos
            </a>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default navbar;

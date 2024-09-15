import React, { useState } from "react";
import title from "../assets/Title.png";
import hat from "../assets/Gegree Hat.jpg";
import { Bars3Icon } from "@heroicons/react/16/solid";

const Navbar = () => {
  const navList: string[] = ["Home", "About", "Info", "Contact"];

  const [dropMenu, setDropMenu] = useState<boolean>(false);

  const handleDropMenu = (): void => {
    let currentDropMenu = dropMenu;
    setDropMenu(!currentDropMenu);
  };

  return (
    <div>
      <nav className="bg-white py-4 px-8">
        <div className="mx-10 flex justify-between items-center">
          <div className="flex space-x-2">
            <img
              className="w-[75px] h-[45px] [@media(max-width:270px)]:hidden"
              src={hat}
            />
            <img
              className=" hidden text-blue-500 font-bold text-lg w-[75px] h-[45px] [@media(min-width:400px)]:block"
              src={title}
            />
          </div>
          <div>

            {/* MobileNav Starts Here */}
            <div className="block md:hidden ">
              <Bars3Icon
                className="w-[1.5rem]  text-gray-500 cursor-pointer "
                onClick={handleDropMenu}
              ></Bars3Icon>
              {dropMenu && (
                <div
                  className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none "
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                >
                  <div className="py-1" role="none">
                    {navList.map((ele) => (
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        id="menu-item-0"
                      >
                        {ele}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* MobileNav Ends Here */}


            {/* NavBar Starts Here */}
            <ul className="hidden md:flex md:space-x-8">
              {navList.map((ele) => (
                <li>
                  <a href="#" className="hover:text-blue-500">
                    {ele}
                  </a>
                </li>
              ))}
            </ul>
            {/* NavBar Ends Here */}
            
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

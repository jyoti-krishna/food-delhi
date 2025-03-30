import React from "react";
import assets from "../assets/assets";

const Navbar = () => {
  return (
    <div className="flex flex-row justify-between p-10 h-40 border-gray-800 border-b-4">
      <div>
        <img className="h-12" src={assets.logo} />
        <span className="pl-2 font-semibold text-[22px]">Admin panel</span>
      </div>
      <img className="h-24" src={assets.profile} />
    </div>
  );
};

export default Navbar;

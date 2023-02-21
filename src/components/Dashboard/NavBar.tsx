import React from "react";
import NavBarOptions from "../NavBarOptions";

export default function NavBar() {
  return (
    <nav className="flex flex-row bg-Secondary_background_color p-2 rounded-[10px]">
      <img alt="text img" />
      <NavBarOptions />
      <NavBarOptions />
      <NavBarOptions />
      <NavBarOptions />
      <NavBarOptions />
    </nav>
  );
}

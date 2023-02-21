import React from "react";
import NavBar from "./NavBar";

export default function Dashboard() {
  return (
    <div className="bg-background_color h-[100vh]">
      <header className="p-2 flex flex-wrap">
        <NavBar />
      </header>
    </div>
  );
}

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CreateData from "./CreateData";

export default function SideBarScreen() {
  const sideBarList: Type_SidebarState[] = useSelector(
    (state: RootState) => state.sidebar.sideBarData
  );

  return (
    <div className="h-screen w-screen  flex flex-row-reverse  z-20 font-dm_sans  text-white overflow-x-scroll">
      {sideBarList.map((sidebar: Type_SidebarState, index: number) => {
        if (sidebar.sidebarType === "addOption") {
          return <div key={index}>addOptionsToDropDown</div>;
        } else if (
          sidebar.sidebarType === "editMode" ||
          sidebar.sidebarType === "createMode"
        ) {
          return (
            <div key={index} className="w-[400px]">
              <CreateData sidebar={sidebar} index={index} />
            </div>
          );
        } else if (sidebar.sidebarType === "linkMode") {
          return <div key={index}>linkMode</div>;
        }
      })}
    </div>
  );
}

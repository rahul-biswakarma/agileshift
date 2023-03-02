import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CreateData from "./CreateData";
import { LinkageSidebar } from "./LinkageSidebar";

export default function SideBarScreen() {
  const sideBarList: Type_SidebarState[] = useSelector(
    (state: RootState) => state.sidebar.sideBarData
  );

  console.log(sideBarList,'***')

  return (
    <div className="h-screen w-max  flex flex-row-reverse  z-20 font-dm_sans  text-white overflow-x-scroll">
      {sideBarList.map((sidebar: Type_SidebarState, index: number) => {
        if (sidebar.sidebarType === "addOption") {
          return <div key={index}>addOptionsToDropDown</div>;
        } else if (
          sidebar.sidebarType === "editMode" ||
          sidebar.sidebarType === "createMode"
        ) {
          console.log("sidebar", sidebar);
          return (
            <div key={index} className="w-[400px]">
              <CreateData sidebar={sidebar} index={index} />
            </div>
          );
        } else if (sidebar.sidebarType === "linkMode") {
          return <div className="w-[400px]" key={index}><LinkageSidebar sidebar={sidebar} index={index}/></div>;
        }
        else if(sidebar.sidebarType === "createNewsLink"){
          return(
            <div key={index} className="w-[400px]">
            <CreateData sidebar={sidebar} index={index} />
          </div>
          )
        }
        return(<div></div>)
      })}
    </div>
  );
}

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AddOptions from "./AddOptions";
import ConversationsTab from "./Conversations/ConversationsTab";
import CreateData from "./CreateData";
import { LinkageSidebar } from "./LinkageSidebar";

export default function SideBarScreen() {
  const sideBarList: Type_SidebarState[] = useSelector(
    (state: RootState) => state.sidebar.sideBarData
  );

  const [colapsTabBar, setColapsTabBar] = React.useState<number>(
    sideBarList.length - 1
  );
  React.useEffect(() => {
    setColapsTabBar(sideBarList.length - 1);
  }, [sideBarList]);

  return (
    <div className="min-h-screen w-max  flex flex-row-reverse  z-20 font-dm_sans  text-white ">
      {sideBarList.map((sidebar: Type_SidebarState, index: number) => {
        if (sidebar.sidebarType === "conversationTab") {
          return (
            <div key={index}>
              <ConversationsTab
                tabColaps={
                  sideBarList.length <= 3
                    ? false
                    : index === colapsTabBar
                    ? false
                    : true
                }
                setColapsTabBar={setColapsTabBar}
                sidebar={sidebar}
                index={index}
              />
            </div>
          );
        } else if (sidebar.sidebarType === "addOption") {
          return (
            <div key={index}>
              <AddOptions
                tabColaps={
                  sideBarList.length <= 3
                    ? false
                    : index === colapsTabBar
                    ? false
                    : true
                }
                setColapsTabBar={setColapsTabBar}
                sidebar={sidebar}
                index={index}
              />
            </div>
          );
        } else if (
          sidebar.sidebarType === "editMode" ||
          sidebar.sidebarType === "createMode"
        ) {
          return (
            <div key={index}>
              <CreateData
                tabColaps={
                  sideBarList.length <= 3
                    ? false
                    : index === colapsTabBar
                    ? false
                    : true
                }
                setColapsTabBar={setColapsTabBar}
                sidebar={sidebar}
                index={index}
              />
            </div>
          );
        } else if (sidebar.sidebarType === "linkMode") {
          return (
            <div key={index}>
              <LinkageSidebar
                tabColaps={
                  sideBarList.length <= 3
                    ? false
                    : index === colapsTabBar
                    ? false
                    : true
                }
                setColapsTabBar={setColapsTabBar}
                sidebar={sidebar}
                index={index}
              />
            </div>
          );
        } else if (sidebar.sidebarType === "createNewsLink") {
          return (
            <div key={index}>
              <CreateData
                tabColaps={
                  sideBarList.length <= 3
                    ? false
                    : index === colapsTabBar
                    ? false
                    : true
                }
                setColapsTabBar={setColapsTabBar}
                sidebar={sidebar}
                index={index}
              />
            </div>
          );
        }
        return <div></div>;
      })}
    </div>
  );
}

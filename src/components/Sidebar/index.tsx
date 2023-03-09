import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/hooks";
import { setNewSidBar } from "../../redux/reducers/SideBarSlice";
import { RootState } from "../../redux/store";
import CustomButton from "../common/Button";
import AddOptions from "./AddOptions";
import ConversationsTab from "./Conversations/ConversationsTab";
import FieldInfo from "./FieldInfo";
import { AddLinks } from "./AddLinks";

export default function SideBarScreen() {
  const dispatch = useAppDispatch();
  const sideBarList: Type_SIDEBARSTATE[] = useSelector(
    (state: RootState) => state.sidebar.sideBarData
  );
  const [colapsTabBar, setColapsTabBar] = React.useState<number>(
    sideBarList.length - 1
  );
  React.useEffect(() => {
    setColapsTabBar(sideBarList.length - 1);
  }, [sideBarList]);
  const handleSideBarColaps = (setColapsTabBar: Function, index: number) => {
    return () => {
      setColapsTabBar(index);
    };
  };

  const handleClose = (
    sideBarList: Type_SIDEBARSTATE[],
    currentTabIndex: number
  ) => {
    return () => {
      dispatch(
        setNewSidBar(
          sideBarList.filter(
            (sideBar: Type_SIDEBARSTATE, index: number) =>
              index !== currentTabIndex
          )
        )
      );
    };
  };

  console.log("index::: ", sideBarList);
  return (
    <div
      id="Tab Container"
      className="min-h-screen w-max   flex flex-row-reverse  z-20 font-dm_sans  text-white "
    >
      {sideBarList.map((sidebar: Type_SIDEBARSTATE, index: number) => {
        console.log(sidebar, "editMode");

        let tabBarColaps =
          sideBarList.length <= 2
            ? false
            : index === colapsTabBar
            ? false
            : true;

        return (
          <section
            key={index}
            id="Tab"
            className="flex flex-col justify-start h-screen bg-sidebar_bg backdrop-filter backdrop-blur-md bg-opacity-10 shadow-lg border-l border-[#444444]"
          >
            <header>
              <CustomButton
                icon={"close"}
                onClick={() => handleClose(sideBarList, index)()}
                className="absolute right-3 top-3 flex items-center justify-center p-1 text-white hover:text-red-400"
              />
            </header>

            <main className="h-full">
              {sidebar.type === "createMode" && (
                <FieldInfo
                  sidebar={sidebar}
                  handleClose={handleClose(sideBarList, index)}
                  tabBarColaps={tabBarColaps}
                  handleSideBarColaps={handleSideBarColaps(
                    setColapsTabBar,
                    index
                  )}
                />
              )}
              {sidebar.type === "editMode" && (
                <FieldInfo
                  sidebar={sidebar}
                  handleClose={handleClose(sideBarList, index)}
                  tabBarColaps={tabBarColaps}
                  handleSideBarColaps={handleSideBarColaps(
                    setColapsTabBar,
                    index
                  )}
                />
              )}
              {sidebar.type === "addOption" && (
                <AddOptions
                  sidebar={sidebar}
                  handleClose={handleClose(sideBarList, index)}
                  tabBarColaps={tabBarColaps}
                  handleSideBarColaps={handleSideBarColaps(
                    setColapsTabBar,
                    index
                  )}
                />
              )}
              {sidebar.type === "AddLinks" && (
                <AddLinks
                  sidebar={sidebar}
                  handleClose={handleClose(sideBarList, index)}
                  tabBarColaps={tabBarColaps}
                  handleSideBarColaps={handleSideBarColaps(
                    setColapsTabBar,
                    index
                  )}
                />
              )}
              {sidebar.type === "conversations" && (
                <ConversationsTab
                  sidebar={sidebar}
                  tabBarColaps={tabBarColaps}
                  handleSideBarColaps={handleSideBarColaps(
                    setColapsTabBar,
                    index
                  )}
                />
              )}
            </main>
          </section>
        );
      })}
    </div>
  );
}

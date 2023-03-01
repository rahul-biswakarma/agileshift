import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import AddOptions from "./AddOptions";
import { Sidebar } from "./Sidebar";

type Type_SidebarState = {
  field: string;
  data: any;
  color: string;
  schema?: any;
  sidebarType?: string;
};

const SidebarWrapper = () => {
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
    <div className="h-screen w-screen flex flex-row-reverse  z-20 font-dm_sans text-white overflow-x-scroll">
      {sideBarList.map((sidebar: Type_SidebarState, index: number) => {
        if (sidebar.sidebarType === "addOptions") {
          return (
            <>
              <AddOptions
              />
            </>
          );
        } else {
          return (
            <>
              <Sidebar
                tabColaps={
                  sideBarList.length <= 3
                    ? false
                    : index === colapsTabBar
                    ? false
                    : true
                }
                key={index}
                index={index}
                setColapsTabBar={setColapsTabBar}
                field={sidebar.field}
                color={sidebar.color}
                data={sidebar.data}
                schema={sidebar.schema}
              />
            </>
          );
        }
      })}
    </div>
  );
};

export { SidebarWrapper };

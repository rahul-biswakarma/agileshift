import React, { useState } from "react";
import { Details } from "./Details";
import { Header } from "./Header";

type Type_SidebarState = {
  field: string;
  data?: TYPE_SCHEMA;
  color: string;
  tabColaps: boolean;
  setColapsTabBar: React.Dispatch<React.SetStateAction<number>>;
  index: number;
};

const Sidebar = (props: Type_SidebarState) => {
  const [state, setState] = useState<Type_SidebarState>({
    field: props.field,
    data: props.data,
    color: props.color,
    tabColaps: props.tabColaps,
    setColapsTabBar: props.setColapsTabBar,
    index: props.index,
  });

  const [formData, setFormData] = useState<TYPE_SCHEMA[]>([])

  return (
    <div
      className={`${
        props.tabColaps ? "w-[50px] flex items-center" : "w-1/3"
      } h-screen  bg-sidebar_bg backdrop-filter backdrop-blur-lg bg-opacity-60 border border-primary_font_color p-3`}
    >
      {/* bg-gradient-to-b from-[#badde8] to-[#bdddcc] */}
      {props.tabColaps ? (
        <div
          className="[writing-mode:vertical-rl]   text-xl cursor-pointer hover:bg-background_color rounded-lg py-4"
          onClick={() => {
            props.setColapsTabBar(props.index);
          }}
        >
          {state.field}
        </div>
      ) : (
        <>
          <Header state={state} setState={setState} formData={formData} setFormData={setFormData}/>
          <Details state={state} setState={setState} formData={formData} setFormData={setFormData} />
        </>
      )}
    </div>
  );
};

export { Sidebar };

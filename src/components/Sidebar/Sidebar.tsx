import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Details } from "./Details";
import { Header } from "./Header";
import SideBarInputs from "./SideBarInputs";

type Type_SidebarProps = {
  field: string;
  color: string;
  tabColaps: boolean;
  setColapsTabBar: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  data: any;
};

type Type_SidebarDataProps = {
  field: string;
  color: string;
  data: any;
  index: number;
};

const Sidebar = (props: Type_SidebarProps) => {
  const [state, setState] = useState<Type_SidebarDataProps>({
    field: props.field,
    color: props.color,
    data: props.data,
    index: props.index,
  });

  let organizationId = useAppSelector((state) => state.auth.organisationId);
  console.log(organizationId);

  const [formData, setFormData] = useState<TYPE_SCHEMA[]>([]);

  return (
    <div
      className={`${
        props.tabColaps ? "w-[50px] flex items-center" : "w-1/3"
      } h-screen  bg-sidebar_bg backdrop-filter backdrop-blur-lg bg-opacity-60 border border-primary_font_color p-3`}
    >
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
          <Header
            state={state}
            setState={setState}
            formData={formData}
            setFormData={setFormData}
          />
          <Details
            state={state}
            setState={setState}
            formData={formData}
            setFormData={setFormData}
          />
          <SideBarInputs
            type={"tab"}
            defaultValue={["p2", "p4"]}
            label={"test"}
            setFunction={() => {}}
          />
        </>
      )}
    </div>
  );
};

export { Sidebar };

import React, { useEffect, useState } from "react";
import { Actions } from "./Actions";
import { DataForm } from "./DataForm";
import { Details } from "./Details";
import { Header } from "./Header";
import { LinkageSidebar } from "./LinkageSidebar";

type Type_SidebarProps = {
  field: string;
  color: string;
  tabColaps: boolean;
  setColapsTabBar: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  data: any;
  schema?: any;
};

type Type_SidebarDataProps = {
  field: string;
  color: string;
  data: any;
  schema: any;
  index: number;
};

type Type_ColumnSchema = {
  columnName: string;
  columnType: string;
};

function isArray(myArray: Object) {
  return myArray.constructor === Array;
}

const Sidebar = (props: Type_SidebarProps) => {
  const [state, setState] = useState<Type_SidebarDataProps>({
    field: props.field,
    color: props.color,
    data: props.data,
    schema: props.schema,
    index: props.index,
  });

  const [formData, setFormData] = useState<any>([]);
  const [updateFormData, setUpdateFormData] = useState<boolean>(true);

  useEffect(() => {
    setUpdateFormData(true);
  }, [state.schema]);

  if (isArray(state.schema)) {
    // console.log( state.schema, "**");
    let modifiedSchemaObject: TYPE_SCHEMA = {};
    state.schema.forEach((item: Type_ColumnSchema) => {
      modifiedSchemaObject[item.columnName] = item.columnType;
    });
    console.log(modifiedSchemaObject, "**");

    setState({ ...state, schema: modifiedSchemaObject });
  }

  if (updateFormData && !isArray(state.schema)) {
    console.log("In update", "**");

    const propsSchema = state.schema;
    // console.log(propsSchema, "**");
    let tempFormData: TYPE_SCHEMA = {};
    Object.keys(propsSchema).forEach((value: any) => {
      if (state.data[value]) {
        const columnValue = state.data[value];
        tempFormData[value] = columnValue;
      } else {
        tempFormData[value] = "";
      }
    });
    console.log(tempFormData, "**");

    setFormData(tempFormData);
    setUpdateFormData(false);
    // console.log(tempFormData);
  }

  return (
    <div
      className={`${
        props.tabColaps ? "w-[50px] flex items-center" : "w-1/3"
      } h-screen  bg-sidebar_bg backdrop-filter backdrop-blur-lg bg-opacity-60 border border-primary_font_color`}>
      {props.tabColaps ? (
        <div
          className="[writing-mode:vertical-rl] h-full w-full flex justify-center items-center text-xl cursor-pointer hover:bg-background_color rounded-lg py-4"
          onClick={() => {
            props.setColapsTabBar(props.index);
          }}>
          {state.field}
        </div>
      ) : state.field === "Linkage" ? (
        <LinkageSidebar />
      ) : (
        <div className="h-full w-full p-3 flex flex-col">
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
          <DataForm
            state={state}
            setState={setState}
            formData={formData}
            setFormData={setFormData}
          />
          <Actions
            state={state}
            setState={setState}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      )}
    </div>
  );
};

export { Sidebar };

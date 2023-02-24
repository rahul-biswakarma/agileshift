import React, { useState } from "react";
import { Actions } from "./Actions";
import { DataForm } from "./DataForm";
import { Details } from "./Details";
import { Header } from "./Header";

type Type_SidebarProps = {
  field: string;
  color: string;
  tabColaps: boolean;
  setColapsTabBar: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  data: any;
  schema?:any
};

type Type_SidebarDataProps = {
  field: string;
  color: string;
  data:any;
  schema?:any;
}

const Sidebar = (props: Type_SidebarProps) => {
  const [state, setState] = useState<Type_SidebarDataProps>({
    field: props.field,
    color: props.color,
    data:props.data,
    schema:props.schema
  });
  
  const [formData, setFormData] = useState<any>([])
  const [updateFormData, setUpdateFormData] = useState<boolean>(true)

  if(updateFormData){
    const propsSchema = props.schema
    console.log(propsSchema);
    let tempFormData = formData;
    Object.keys(propsSchema).forEach((value:any)=>{
      if(state.data[value]){
        const columnValue =state.data[value]
        tempFormData[value] = columnValue
      }else{
        tempFormData[value] = "";
      }
    })
    setFormData(tempFormData)
    setUpdateFormData(false)
    console.log(tempFormData);
  }
  

  return (
    <div
      className={`${
        props.tabColaps ? "w-[50px] flex items-center" : "w-1/3"
      } h-screen  bg-sidebar_bg backdrop-filter backdrop-blur-lg bg-opacity-60 border border-primary_font_color`}
    >
      {/* bg-gradient-to-b from-[#badde8] to-[#bdddcc] */}
      {props.tabColaps ? (
        <div
          className="[writing-mode:vertical-rl] h-full w-full flex justify-center items-center text-xl cursor-pointer hover:bg-background_color rounded-lg py-4"
          onClick={() => {
            props.setColapsTabBar(props.index);
          }}
        >
          {state.field}
        </div>
      ) : (
        <div className="h-full w-full p-3">
          <Header state={state} setState={setState} formData={formData} setFormData={setFormData}/>
          <Details state={state} setState={setState} formData={formData} setFormData={setFormData} />
          <DataForm state={state} setState={setState} formData={formData} setFormData={setFormData} />
          <Actions state={state} setState={setState} formData={formData} setFormData={setFormData} /> 
        </div>
      )}
    </div>
  );
};

export { Sidebar };

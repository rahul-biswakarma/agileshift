import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { get_data_byID } from "../../Utils/Backend";
import { Details } from "./Details";
import { Header } from "./Header";

type Type_SidebarProps = {
  field: string;
  color: string;
  tabColaps: boolean;
  setColapsTabBar: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  dataId: string;
};

type Type_SidebarDataProps = {
  field: string;
  color: string;
  data:TYPE_SCHEMA[]
  dataId: string;
}

type Type_SidebarState = {
  field: string;
  color: string;
  tabColaps: boolean;
  setColapsTabBar: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  data:TYPE_SCHEMA[]
};

const Sidebar = (props: Type_SidebarProps) => {
  const [state, setState] = useState<Type_SidebarDataProps>({
    field: props.field,
    color: props.color,
    data:[],
    dataId:props.dataId
  });

  const [tab,setTab] = useState<Type_SidebarState>({
    field: props.field,
    color: props.color,
    tabColaps: props.tabColaps,
    setColapsTabBar: props.setColapsTabBar,
    index: props.index,
    data:[]
  })

  let organizationId  = useAppSelector((state) => state.auth.organisationId);
  organizationId = "0boTY0ZwWFdRkDwbNsVw"; 

  const [formData, setFormData] = useState<TYPE_SCHEMA[]>([])

  useEffect(()=>{
    getDataByID(props.dataId)
  },[props.dataId])

  const getDataByID = async (dataId:string)=>{
    if(dataId && dataId.length>0){
      const fieldData:TYPE_SCHEMA[] = await get_data_byID(organizationId,dataId)
      console.log(fieldData);
      
      setState({...state, data:fieldData})
    }
  }
  
  return (
    <div
      className={`${
        tab.tabColaps ? "w-[50px] flex items-center" : "w-1/3"
      } h-screen  bg-sidebar_bg backdrop-filter backdrop-blur-lg bg-opacity-60 border border-primary_font_color p-3`}

      // onClick ={()=>getDataByID("4564864")}
    >
      {/* bg-gradient-to-b from-[#badde8] to-[#bdddcc] */}
      {props.tabColaps ? (
        <div
          className="[writing-mode:vertical-rl]   text-xl cursor-pointer hover:bg-background_color rounded-lg py-4"
          onClick={() => {
            tab.setColapsTabBar(tab.index);
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

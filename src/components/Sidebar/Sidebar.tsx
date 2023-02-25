import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
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
};

type Type_SidebarDataProps = {
  field: string;
  color: string;
  data: any;
};

// type Type_SidebarState = {
//   field: string;
//   color: string;
//   tabColaps: boolean;
//   setColapsTabBar: React.Dispatch<React.SetStateAction<number>>;
//   index: number;
//   data:any
// };

const Sidebar = (props: Type_SidebarProps) => {
  const [state, setState] = useState<Type_SidebarDataProps>({
    field: props.field,
    color: props.color,
    data: props.data,
  });

  // const [tab,setTab] = useState<Type_SidebarState>({
  //   field: props.field,
  //   color: props.color,
  //   tabColaps: props.tabColaps,
  //   setColapsTabBar: props.setColapsTabBar,
  //   index: props.index,
  //   data:[]
  // })

  let organizationId = useAppSelector((state) => state.auth.organisationId);
  // organizationId = "0boTY0ZwWFdRkDwbNsVw";
  console.log(organizationId);

  const [formData, setFormData] = useState<TYPE_SCHEMA[]>([]);

  // useEffect(()=>{
  //   const dataId = props.dataId;
  //   if(dataId && dataId.length>0){
  //     let fieldData:TYPE_SCHEMA[]
  //     get_data_byID(organizationId,dataId).then((result)=>{
  //       fieldData = result
  //       console.log(fieldData);
  //       setState({...state, data:fieldData})
  //     })
  //   }
  // },[props.dataId, organizationId])

  return (
    <div
      className={`${
        props.tabColaps ? "w-[50px] flex items-center" : "w-1/3"
      } h-screen  bg-sidebar_bg backdrop-filter backdrop-blur-lg bg-opacity-60 border border-primary_font_color p-3`}

      // onClick ={()=>getDataByID("4564864")}
    >
      {/* bg-gradient-to-b from-[#badde8] to-[#bdddcc] */}
      {props.tabColaps ? (
        <div
          className="[writing-mode:vertical-rl]   text-xl cursor-pointer hover:bg-background_color rounded-lg py-4"
          onClick={() => {
            props.setColapsTabBar(props.index);
          }}>
          {state.field}
        </div>
      ) : state.field === "Linkage" ? (
        <LinkageSidebar />
      ) : (
        <React.Fragment>
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
        </React.Fragment>
      )}
    </div>
  );
};

export { Sidebar };

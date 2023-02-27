import React from "react";
import close_icon from "../../assets/icons/close_icon.svg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSideBar } from "../../redux/reducers/SideBarSlice";
import { HeaderIdComponent } from "./HeaderIdComponent";
import { RootState } from "../../redux/store";

type Type_SidebarState = {
  field: string;
  data: any;
  color: string;
  schema:any;
  index: number;
};

type Type_HeaderProps = {
  state: Type_SidebarState;
  setState: React.Dispatch<React.SetStateAction<Type_SidebarState>>;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const Header = (props: Type_HeaderProps) => {
  const sideBarLists = useAppSelector((state:RootState) => state.sidebar.sideBarData);

  const dispatch = useAppDispatch();
  const handleClose = () => {
    console.log("Close");
    dispatch(
      setSideBar(
        sideBarLists.filter((sideBar, index) => index !== props.state.index)
      )
    );
  };

  return (
    <header className="flex justify-between p-2">
      {/* Field Id */}
      <HeaderIdComponent state={props.state} setState={props.setState} />
      <button
        className="rounded-full p-1 hover:bg-primary_font_color cursor-pointer"
        onClick={() => handleClose()}
      >
        <img src={close_icon} alt="close Icon" className="w-4 h-4 text-white" />
      </button>
    </header>
  );
};

export { Header };

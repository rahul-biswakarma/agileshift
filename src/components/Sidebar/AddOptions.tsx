import React, { useState } from "react";

import { TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  get_dropdown_options,
  set_dropdown_options,
} from "../../Utils/Backend";
import { setNewSidBar } from "../../redux/reducers/SideBarSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CustomButton from "../common/Button";
import { toast } from "react-toastify";

type Props = {
  tabColaps: Boolean;
  setColapsTabBar: Function;
  sidebar: Type_SidebarState;
  index: number;
};

export default function AddOptions(props: Props) {
  const [sideBarList] = React.useState(
    useSelector((state: RootState) => state.sidebar.sideBarData)
  );
  const dispatch = useAppDispatch();

  const organizationId = useAppSelector((state) => state.auth.organisationId);

  const [list, setList] = useState<any>([]);

  React.useEffect(() => {
    const fetchOptions = async () => {
      let data = await get_dropdown_options(
        organizationId,
        props.sidebar.columnName!,
        props.sidebar.fieldName!
      );
      setList(data.map((item: any) => item));
    };
    fetchOptions();
  }, [organizationId, props.sidebar.columnName, props.sidebar.fieldName]);

  const changeList = (id: number, item: string) => {
    let tempList: any = [...list];
    tempList[id]["filterOptionName"] = item;
    setList(tempList);
  };
  const removeItem = (id: number) => {
    let tempList: any = [...list];
    tempList = tempList.slice(0, id).concat(tempList.slice(id + 1));
    setList(tempList);
  };
  const addItem = (e: any) => {
    e.preventDefault();
    setList([...list, { filterOptionName: "", active: false }]);
  };

  const handleSubmit = async () => {
    try {
      let tempList = list.filter((item: any) => item.filterOptionName !== "");
      console.log("add options", tempList);
      await set_dropdown_options(
        organizationId,
        props.sidebar.columnName!,
        props.sidebar.fieldName!,
        tempList
      );
      toast.success(`Options Updated in ${props.sidebar.columnName}`);
      handleClose();
    } catch (err) {
      toast.error("Unable to update options");
    }
  };

  const handleClose = () => {
    dispatch(
      setNewSidBar(
        sideBarList.filter((sideBar, index) => index !== props.index)
      )
    );
  };

  if (props.tabColaps) {
    return (
      <div
        className="[writing-mode:vertical-rl] border-r-2 border-brown-500 h-full w-[50px] flex justify-center items-center text-xl  cursor-pointer bg-background_color py-4"
        onClick={() => {
          props.setColapsTabBar(props.index);
        }}
      >
        Add Options {props.sidebar.columnName}
      </div>
    );
  } else {
    return (
      <form
        onSubmit={(e) => addItem(e)}
        className="flex flex-col justify-start items-center w-[400px] h-screen bg-sidebar_bg backdrop-filter backdrop-blur-lg bg-opacity-60 border border-primary_font_color
    p-4
    "
      >
        <CustomButton
          icon={"close"}
          onClick={handleClose}
          className="absolute right-3 top-3 flex items-center justify-center p-1 text-white hover:text-red-400"
        />
        <p className="w-full text-2xl flex items-center justify-center mb-4 text-white">
          {props.sidebar.columnName}
        </p>
        <div className="w-full max-h-[90%] flex flex-col items-center gap-6 overflow-auto">
          {list.map((item: any, id: number) => (
            <div className="w-full flex items-center justify-center">
              <TextField
                required
                sx={{
                  m: 1,
                  width: "70%",
                  "& label": {
                    color: "#fff",
                    fontFamily: "DM Sans",
                  },
                  "& .MuiFormControl-root": {
                    borderColor: "white",
                  },
                }}
                size="small"
                id={`dropdown-${item}-input`}
                variant="outlined"
                value={item.filterOptionName!}
                onChange={(e) => changeList(id, e.target.value)}
              />
              <button
                onClick={(e) => removeItem(id)}
                className="material-symbols-outlined text-white ml-4"
              >
                delete
              </button>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-around">
          <button
            type="submit"
            className="flex w-32 justify-center items-center p-[0.5rem_1rem] bg-background_color rounded-md shadow-md text-sm text-highlight_font_color border-[2px] border-dark_gray hover:bg-purple-400 hover:border-purple-400 hover:text-purple-800 transition-all duration-200 ease-in-out
          mt-4"
          >
            Add {props.sidebar.columnName}
          </button>
          <button
            type="button"
            onClick={() => handleSubmit()}
            className="flex w-32 justify-center items-center p-[0.5rem_1rem] bg-background_color rounded-md shadow-md text-sm text-highlight_font_color border-[2px] border-dark_gray hover:bg-purple-400 hover:border-purple-400 hover:text-purple-800 transition-all duration-200 ease-in-out
          mt-4"
          >
            Save {props.sidebar.columnName}
          </button>
        </div>
      </form>
    );
  }
}

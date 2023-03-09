import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import {
  get_dropdown_options,
  set_dropdown_options,
} from "../../Utils/Backend";

import { toast } from "react-toastify";
type Props = {
  sidebar: Type_SIDEBARSTATE;
  handleClose: Function;
};
export default function AddOptions(props: Props) {
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
  const changeDisplayColor = (id: number, color: any) => {
    let tempList: any = [...list];
    tempList[id]["color"] = color;
    setList(tempList);
  };
  const handleSubmit = async () => {
    try {
      let tempList = list.filter((item: any) => item.filterOptionName !== "");

      await set_dropdown_options(
        organizationId,
        props.sidebar.columnName!,
        props.sidebar.fieldName!,
        tempList
      );
      toast.success(`Options Updated in ${props.sidebar.columnName}`);
    } catch (err) {
      toast.error("Unable to update options");
    }
    props.handleClose();
  };

  return (
    <form
      onSubmit={(e) => addItem(e)}
      className="flex flex-col justify-start items-center w-full h-full"
    >
      <header className="flex justify-between items-center w-full mt-6 mb-3 px-2">
        <p className="grow text-xl flex items-center justify-start mb-4 text-white">
          {props.sidebar.columnName}
        </p>
        <button
          type="submit"
          className="flex gap-2 w-max justify-center items-center p-[0.5rem_1rem] rounded-md shadow-md text-sm text-highlight_font_color  hover:bg-dark_gray hover:text-white transition-all duration-200 ease-in-out"
        >
          <span className="material-symbols-outlined text-base">
            voting_chip
          </span>
          <p>Add {props.sidebar.columnName}</p>
        </button>
      </header>
      <div className="w-full grow  max-h-[90%] flex flex-col items-center gap-2 overflow-y-auto rounded-lg bg-black/60 p-3 text-sm">
        {list.map((item: any, id: number) => (
          <div
            key={id}
            className="w-full flex items-center justify-center bg-Secondary_background_color rounded-md"
          >
            {props.sidebar.columnType === "tag" && (
              <label className="inline-block relative w-4 h-4 ml-4">
                <input
                  type="color"
                  className="absolute w-full h-full rounded-full opacity-0 cursor-pointer"
                  value={item.color}
                  onChange={(e) => changeDisplayColor(id, e.target.value)}
                />
                <span
                  className="inline-block w-full h-full rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: item.color }}
                ></span>
              </label>
            )}
            <input
              required
              className="grow p-5 py-3 rounded-md bg-Secondary_background_color text-white"
              id={`dropdown-${item}-input`}
              value={item.filterOptionName!}
              onChange={(e) => changeList(id, e.target.value)}
            />
            <button
              onClick={(e) => removeItem(id)}
              className="material-symbols-outlined text-white px-3 text-base hover:text-red-400"
            >
              delete
            </button>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-end pb-5">
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

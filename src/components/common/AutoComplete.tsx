import React from "react";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";
import Select from "react-select";
import { useAppDispatch } from "../../redux/hooks";
import { setNewSidBar, setSideBar } from "../../redux/reducers/SideBarSlice";
import { RootState } from "../../redux/store";
// import { RootState } from "../../redux/store";
const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "#161616", // Set the background color here,
    flexGrow: 1,
    display: "flex",
    border: "0px solid ",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#3B82F6" : "#1F1F1F", // Set the option background color here
    color: state.isSelected ? "#FFFFFF" : "#CCCCCC", // Set the option text color here
    cursor: "pointer", // Set the cursor
  }),
  input: (provided: any) => ({
    ...provided,
    color: "#FFFFFF", // Set the input text color here
  }),
  menuList: (provided: any) => ({
    ...provided,
    padding: 0, // remove padding
    marginTop: 0, // remove margin top
    marginBottom: 0, // remove margin bottom
    backgroundColor: "#1F1F1F",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#FFFFFF", // Set the selected option text color here
  }),
};
type Type_SidebarState = {
  field: string;
  data: any;
  color: string;
  schema?: any;
  sidebarType?: string;
};

type type_props = {
  defaultValue: any;
  setFunction: any;
  label: string;
  fieldData: any;
  sidebarIndex: number;
};
const formatOptions = (value: Array<string>) => {
  let data: {
    value: string;
    label: string;
  }[] = [];

  console.log("value*", value);

  if (value) {
    value.forEach((item) => {
      data.push({
        value: item,
        label: item,
      });
    });
  }
  return data;
};
const formatOutputVlue = (value: any) => {
  return value.map((item: any) => item["value"]);
};
const AutoComplete = (props: type_props) => {
  // const [options, setOption] = React.useState<any>(
  // );
  const dispatch = useAppDispatch();
  let sideBarList: Type_SidebarState[] = useSelector(
    (state: RootState) => state.sidebar.sideBarData
  );

  const handleAddOptions = () => {
    let element: any = {
      sidebarType: "addOptions",
      columnName: "",
      field: "",
      color: "",
      schema: {},
    };
    // let newSidebarList: any = sideBarList.splice(1, 0, element);
    let newSidebarList: any = [element, ...sideBarList];

    console.log(newSidebarList, "888");
    dispatch(setNewSidBar(newSidebarList));
  };
  return (
    <div>
      <div className="flex mt-[0.3rem] bg-background_color">
        <span className="min-w-fit pl-2 h-[2.5rem] flex justify-center items-center   rounded-l font-dm_sans">
          {props.label}
        </span>
        <span className=" w-[100%]">
          <Select
            styles={customStyles}
            options={formatOptions(props.defaultValue)}
            onChange={(value) =>
              props.setFunction({
                ...props.fieldData,
                [props.label]: formatOutputVlue(value),
              })
            }
          />
        </span>
        <button
          onClick={() => handleAddOptions()}
          type="button"
          className="font-bold text-2xl pr-2 flex justify-center active:text-blue-900 cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
};
export default AutoComplete;

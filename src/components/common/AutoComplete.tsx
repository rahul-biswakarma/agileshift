import React from "react";
import Select from "react-select";
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
type type_props = {
  defaultValue: any;
  setFunction: any;
  label: string;
  fieldData: any;
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
  return (
    <div>
      <div className="flex mt-[0.3rem] bg-background_color">
        <span className="w-[3rem] h-[2.5rem] flex justify-center items-center   rounded-l font-dm_sans">
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
      </div>
    </div>
  );
};
export default AutoComplete;

import React from "react";
import Select from "react-select";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "#161616", // Set the background color here
    border: "0px",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#3B82F6" : "#1F1F1F", // Set the option background color here
    color: state.isSelected ? "#FFFFFF" : "#CCCCCC", // Set the option text color here
    cursor: "pointer", // Set the cursor
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "#3B82F6", // Set the background color of the selected option here
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "#FFFFFF", // Set the text color of the selected option here
  }),
  menuList: (provided: any) => ({
    ...provided,
    padding: 0, // remove padding
    marginTop: 0, // remove margin top
    marginBottom: 0, // remove margin bottom
    backgroundColor: "#1F1F1F",
  }),
  input: (provided: any) => ({
    ...provided,
    color: "#FFFFFF", // Set the input text color here
  }),
};
const formatOptions = (value: Array<string>) => {
  let data: {
    value: string;
    label: string;
  }[] = [];

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
type type_props = {
  defaultValue: any;
  setFunction: any;
  label: string;
  fieldData: any;
};
const MultiSelect = (props: type_props) => {
  // const [options, setOption] = React.useState<any>(
  //   formatOptions(props.defaultValue)
  // );
  const formatOutputVlue = (value: any) => {
    return value.map((item: any) => item["value"]);
  };
  return (
    <div>
      <div className="flex mt-[0.3rem] bg-background_color">
        <span className="w-[3rem] h-[2.5rem] flex justify-center items-center   rounded-l font-dm_sans">
          {"test"}
        </span>
        <span className=" w-[100%]">
          <Select
            closeMenuOnSelect={false}
            defaultValue={[options[0], options[1]]}
            isMulti
            placeholder={"hii"}
            options={formatOptions(props.defaultValue)}
            styles={customStyles}
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
export default MultiSelect;

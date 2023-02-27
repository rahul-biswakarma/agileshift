import React from "react";
import Select from "react-select";
import { get_user_suggestions } from "../../Utils/Backend";

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

type type_props = {
  defaultValue: any;
  setFunction: any;
  label: string;
  fieldData: any;
};
const MultiSelect = (props: type_props) => {
  const [options, setOption] = React.useState<any>([{ value: "", label: "" }]);

  React.useEffect(() => {
    let optionsData: any;
    const get_suggestions = async () => {
      const res = await get_user_suggestions("gjzRfX39RmV7A3HxK41W");
      optionsData = res;
      console.log(optionsData, "hellow");
      if (optionsData) {
        optionsData.forEach((item: any) => {
          item.value = item.id;
          item.label = item.name;
        });
      }
      console.log(optionsData, "hellow after change");
      setOption(optionsData);
    };
    get_suggestions();
    // let optionsData: any;
    // get_user_suggestions("gjzRfX39RmV7A3HxK41W").then((res) => {
    //   console.log(res);
    // });
    // console.log(optionsData, "hellow");
    // if (optionsData) {
    //   optionsData.forEach((item: any) => {
    //     item.value = item.id;
    //     item.label = item.name;
    //   });
    // }

    // console.log("hellow", optionsData);
  }, []);

  //TODO:
  //both users and tags getting manipulated at the same time
  //Only one user in every org, no way to add user.
  //adding multiple users in select, makes it look weird

  const formatOutputVlue = (value: any) => {
    return value.map((item: any) => item["value"]);
  };
  return (
    <div>
      <div className="flex mt-[0.3rem] bg-background_color">
        <span className="min-w-fit p h-[2.5rem] flex justify-center items-center rounded-l font-dm_sans">
          {props.label}
        </span>
        <span className=" w-[100%]">
          <Select
            closeMenuOnSelect={false}
            isMulti
            placeholder={props.label}
            options={options}
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
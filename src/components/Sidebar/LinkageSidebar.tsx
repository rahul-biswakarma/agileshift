import Select from "react-select";
import { useEffect, useState } from "react";
import { ShowItem } from "./ShowItem";
import { get_data_by_column_name } from "../../Utils/Backend";
export const LinkageSidebar = () => {
  const [fetchData, setFetchData] = useState(true);

  // interface MyObject {
  //   type: string;
  //   data: {};
  //   // add any additional properties here if needed
  // }

  // const objects: MyObject[] = [
  //   /* your array of objects */
  // ];
  // const result: MyObject[] = [];

  // const types = [...new Set(objects.map((obj) => obj.type))] as string[]; // get all unique types

  // types.forEach((type) => {
  //   const filteredObjects = objects.filter((obj) => obj.type === type); // get all objects of this type
  //   result.push(...filteredObjects.slice(0, 3)); // add the first three objects to the result array
  // });

  // console.log(result);

  // const ITEM_HEIGHT = 48;
  // const ITEM_PADDING_TOP = 8;
  // const MenuProps = {
  //   PaperProps: {
  //     style: {
  //       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  //       width: 250,
  //     },
  //   },
  // };
  // const names = [
  //   "Oliver Hansen",
  //   "Van Henry",
  //   "April Tucker",
  //   "Ralph Hubbard",
  //   "Omar Alexander",
  //   "Carlos Abbott",
  //   "Miriam Wagner",
  //   "Bradley Wilkerson",
  //   "Virginia Andrews",
  //   "Kelly Snyder",
  // ];

  // const [personName, setPersonName] = useState<string[]>([]);

  // const handleChange = (event:SelectChangeEvent<typeof personName>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };
  // let options = [
  //   { value: "apple", label: "Apple" },
  //   { value: "banana", label: "Banana" },
  //   { value: "orange", label: "Orange" },
  //   { value: "watermelon", label: "Watermelon" },
  // ];

  const [options, setOptions] = useState<any>([]);

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
  // const formatOptions = (value: Array<string>) => {
  //   let data: {
  //     value: string;
  //     label: string;
  //   }[] = [];
  //   if (value) {
  //     value.forEach((item) => {
  //       data.push({
  //         value: item,
  //         label: item,
  //       });
  //     });
  //   }
  //   return data;
  // };
  // const formatOutputVlue = (value: any) => {
  //   return value.map((item: any) => item["value"]);
  // };
  const [selectedOptions, setSelectedOptions] = useState<typeof options>([]);

  const handleSelectChange = (selected: any) => {
    setSelectedOptions(selected);
  };
  useEffect(() => {
    const getAllData = async () => {
      console.log("fetching data");
      const allData = await get_data_by_column_name(
        "BvglwNksA7aAMQGEsn0a",
        "all"
      );
      console.log(allData);
      let formattedData = [];
      for (let data of allData) {
        formattedData.push({
          value: data["id"],
          label: data["id"],
          id: data["id"],
          color: data["color"],
          title: "hello",
        });
      }
      setOptions(formattedData);
      console.log(formattedData);
    };
    if (fetchData) {
      getAllData();
      setFetchData(false);
    }
  }, [fetchData]);
  return (
    <div className="w-1/3 h-fullbg-sidebar_bg backdrop-filter backdrop-blur-lg bg-opacity-60 border border-primary_font_color">
      <Select
        closeMenuOnSelect={false}
        isMulti
        options={options}
        styles={customStyles}
        components={{ Option: ShowItem }}
        onChange={(value) => {
          handleSelectChange(value);
        }}
      />

      {selectedOptions.map((item: any) => (
        <div className="text-white">{item.label}</div>
      ))}
    </div>
  );
};

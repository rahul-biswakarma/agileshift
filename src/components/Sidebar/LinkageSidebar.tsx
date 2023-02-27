import Select from "react-select";
import { useCallback, useState } from "react";
import { ShowItem } from "./ShowItem";
import { get_data_by_column_name, get_schema_data } from "../../Utils/Backend";
import { IdComponent } from "../DataTable/idComponent";

type LinkageSidebarPropType = {
  field: TYPE_FIELD;
};

export const LinkageSidebar = (props: LinkageSidebarPropType) => {
  const [fetchData, setFetchData] = useState(true);

  const organisationId = "SYaaoVaHDndguU9d9lsy";
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
    console.log("clicked");
    console.log(selected);
    setSelectedOptions(selected);
  };

  const formatSchemaDataToTypeField = (data: any) => {
    let formattedData: TYPE_FIELD[] = [];
    for (let item of data) {
      formattedData.push({
        name: item["name"],
        list: item["list"],
        icon: item["icon"],
        linkage: item["linkage"],
        color: item["color"],
      });
    }
    return formattedData;
  };

  const getTitleFromSchemaData = useCallback(
    (schemaData: TYPE_FIELD[], name: string) => {
      let title = "";
      schemaData.forEach((data) => {
        if (data["name"] === name) {
          for (let column of data.list) {
            if (column.columnType === "title") {
              title = column.columnName;
            }
          }
        }
      });
      return title;
    },
    []
  );

  const getColorFromSchemaData = (schemaData: TYPE_FIELD[], name: string) => {
    let color = "";
    schemaData.forEach((data) => {
      if (data["name"] === name) {
        color = data["color"];
      }
    });
    return color;
  };

  const getAllData = async () => {
    console.log("fetching data");
    let allData = await get_data_by_column_name(organisationId, "all");
    allData = allData.filter((data: any) =>
      props.field.linkage.includes(data["field"])
    );
    console.log(allData);

    console.log(props.field, "field");

    const schemaData = await get_schema_data(organisationId);
    console.log(schemaData, "schemaData");
    let title = "",
      color = "";
    if (schemaData) {
      title = getTitleFromSchemaData(
        formatSchemaDataToTypeField(schemaData["schemaData"]),
        "Tickets"
      );
      color = getColorFromSchemaData(
        formatSchemaDataToTypeField(schemaData["schemaData"]),
        props.field.name
      );
    }
    console.log(title, "title");
    console.log(color, "color");
    let formattedData = [];
    for (let data of allData) {
      let color = getColorFromSchemaData(
        formatSchemaDataToTypeField(schemaData!["schemaData"]),
        data["field"]
      );
      let title = getTitleFromSchemaData(
        formatSchemaDataToTypeField(schemaData!["schemaData"]),
        data["field"]
      );
      formattedData.push({
        value: data["id"],
        label: data[title],
        id: data["id"],
        color: color,
        title: data[title],
      });
      console.log(data.field);
    }
    setOptions(formattedData);
    console.log(formattedData);
  };
  if (fetchData) {
    getAllData();
    setFetchData(false);
  }
  return (
    <div className="flex flex-col justify-between w-1/3 h-screen bg-sidebar_bg backdrop-filter backdrop-blur-lg bg-opacity-60 border border-primary_font_color">
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

      <div className="">
        {selectedOptions.map((item: any) => (
          <div className="text-white my-4">
            <IdComponent itemId={item.value} color={item.color} />
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

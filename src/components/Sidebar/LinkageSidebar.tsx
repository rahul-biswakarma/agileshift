import Select from "react-select";
import { useCallback, useState } from "react";
import { ShowItem } from "./ShowItem";
import { get_data_by_column_name, get_schema_data, get_schema_data_field } from "../../Utils/Backend";
import { IdComponent } from "../DataTable/idComponent";
import { setNewSidBar } from "../../redux/reducers/SideBarSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import close_icon from "../../assets/icons/close_icon.svg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";


type LinkageSidebarPropType = {
  sidebar: Type_SidebarState;
  index:number;
};

export const LinkageSidebar = (props: LinkageSidebarPropType) => {

  const sideBarList: Type_SidebarState[] = useSelector(
    (state: RootState) => state.sidebar.sideBarData
  );
  const dispatch = useAppDispatch();

  const organisationId = useAppSelector((state:RootState)=>state.auth.organisationId);

  

  const [fetchData, setFetchData] = useState(true);



  type optionsType = {
    value: string;
    label: string;
    id: string;
    color: string;
    title: string;
  };

  const [options, setOptions] = useState<optionsType[]>([]);

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "#161616", // Set the background color here
      border: "1px solid rgba(255, 255, 255, 0.30)",
      borderRadius: "0.375rem",
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
      border: "1px solid rgba(255, 255, 255, 0.20)",
      borderRadius: "0.375rem",
    }),
    input: (provided: any) => ({
      ...provided,
      color: "#FFFFFF", // Set the input text color here
    }),
  };

  const [selectedOptions, setSelectedOptions] = useState<typeof options>([]);

  const handleSelectChange = (selected: any) => {
    setSelectedOptions(selected);
  };

  const formatSchemaDataToTypeField = (data: any) => {
    let formattedData: TYPE_FIELD[] = [];
    for (let item of data) {
      formattedData.push(formatDataToTypeField(item));
    }
    return formattedData;
  };

  const formatDataToTypeField=(data:any)=>{
    let formattedData:TYPE_FIELD={
      name: data["name"],
        list: data["list"],
        icon: data["icon"],
        linkage: data["linkage"],
        color: data["color"],
    };
return formattedData;
  }

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

  const handleClose = () => {
    dispatch(
      setNewSidBar(
        sideBarList.filter((sideBar, index) => index !== props.index)
      )
    );
  };

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

    let field=formatDataToTypeField(await get_schema_data_field(organisationId,props.sidebar.fieldName!));

    let allData = await get_data_by_column_name(organisationId, "all");
    allData = allData.filter((data: any) =>
      field.linkage.includes(data["field"])
    );

    const schemaData = await get_schema_data(organisationId);
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
    }
    setOptions(formattedData);
    
  };
  if (fetchData) {
    getAllData();
    setFetchData(false);
  }
  return (
    <div
      className="flex flex-col justify-between h-screen bg-sidebar_bg backdrop-filter backdrop-blur-lg bg-opacity-60 border border-primary_font_color
    p-4
    pt-12
    ">
      <button
            onClick={handleClose}
            className="absolute right-3 top-3 rounded-full w-8 h-8 hover:border-2 active:bg-slate-800 flex items-center justify-center p-1 hover:bg-primary_font_color cursor-pointer"
          >
            <img
              src={close_icon}
              alt="close Icon"
              className="w-4 h-4 text-white"
            />
          </button>
      <Select
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        controlShouldRenderValue={false}
        placeholder="Search for item"
        isMulti
        options={options}
        styles={customStyles}
        getOptionLabel={(option) => option.label}
        isOptionSelected={(option) =>
          selectedOptions.some(
            (selectedOption: optionsType) =>
              selectedOption.value === option.value
          )
        }
        components={{ Option: ShowItem }}
        onChange={(value) => {
          handleSelectChange(value);
        }}
      />

      <div className=" border border-white/20 flex flex-col gap-2 p-4 text-white max-h-[90%] rounded-md mt-4">
        <p className="font-bold text-2xl">Linked Items</p>
        <div className="max-h-1/5 overflow-auto">
          {selectedOptions.length === 0 && (
            <p className="text-white/50">No items linked</p>
          )}
          {selectedOptions.length > 0 &&
            selectedOptions.map((item: optionsType, id: number) => (
              <div
                className="text-white bg-background_color p-3 rounded-md border border-white/10"
                key={id}>
                <IdComponent itemId={item.value} color={item.color} />
                {item.title}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};


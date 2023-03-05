import Select from "react-select";
import { useCallback, useState } from "react";
import { ShowItem } from "./ShowItem";
import {
  get_data_by_column_name,
  get_schema_data,
  get_schema_data_field,
} from "../../Utils/Backend";
import { IdComponent } from "../DataTable/idComponent";
import { setNewSidBar, setSideBar } from "../../redux/reducers/SideBarSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  formatDataToTypeField,
  formatSchemaDataToTypeField,
  generateRandomId,
  getLinkedData,
  setLinkedData,
} from "../../Utils/HelperFunctions";
import CustomButton from "../common/Button";

// type LinkageSidebarPropType = {
//   sidebar: Type_SidebarState;
//   index: number;
//   setIndex:React.Dispatch<React.SetStateAction<number>>;
//   colapasable: boolean;
//   isColaps: boolean;
// };

export const LinkageSidebar = (props: any) => {
  const sideBarList: Type_SidebarState[] = useSelector(
    (state: RootState) => state.sidebar.sideBarData
  );

  const dispatch = useAppDispatch();
  const linkedCalledByID = props.sidebar.linkedCalledByID;
  const organisationId = useAppSelector(
    (state: RootState) => state.auth.organisationId
  );

  const getIdArray = (selectedOptions: optionsType[]) => {
    let Ids: string[] = [];
    for (let option of selectedOptions) {
      Ids.push(option.id);
    }
    return Ids;
  };

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
      backgroundColor: "#1F1F1F", // Set the background color here
      border: "1px solid rgba(255, 255, 255, 0.30)",
      borderRadius: "0.375rem",
      boxShadow:"0 0 0 0px rgba(255, 255, 255, 0.30)",

      "&:hover": {
        borderColor: "rgba(255, 255, 255, 0.30)",
      },
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
      backgroundColor: "#161616",
      border: "1px solid rgba(255, 255, 255, 0.30)",
      borderRadius: "0.25rem",
    }),
    input: (provided: any) => ({
      ...provided,
      color: "#FFFFFF", // Set the input text color here
    }),
  };

  const [selectedOptions, setSelectedOptions] = useState<typeof options>([]);
  // stop create button from being clicked multiple times
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);

  const handleSelectChange = (selected: any) => {
    setSelectedOptions(selected);
    setLinkedData(
      sideBarList,
      dispatch,
      linkedCalledByID!,
      getIdArray(selected)
    );
  };

  const formatOptions = (allData: any, schemaData: any) => {
    let formattedData: optionsType[] = [];
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
    let field = formatDataToTypeField(
      await get_schema_data_field(organisationId, props.sidebar.fieldName!)
    );

    let allData = await get_data_by_column_name(organisationId, "all");

    let selectedData = allData.filter((data: any) =>
      getLinkedData(sideBarList, linkedCalledByID!)?.includes(data.id)
    );

    allData = allData.filter((data: any) =>
      field.linkage.includes(data["field"])
    );

    const schemaData = await get_schema_data(organisationId);
    setOptions(formatOptions(allData, schemaData));
    setSelectedOptions(formatOptions(selectedData, schemaData));
  };
  if (fetchData) {
    getAllData();
    setFetchData(false);
  }

  const handleIdClick = (id: string) => {
    dispatch(
      setSideBar({
        sidebarType: "editMode",
        createModeCalledByField: "",
        fieldId: id,
        linkedData: [],
        id: id,
      })
    );
  };

  const createNewsLink = (parentId: string) => {
    dispatch(
      setSideBar({
        sidebarType: "createNewsLink",
        parentId: parentId,
        id: generateRandomId(),
        linkedData: [],
        createModeCalledByField: "all",
      })
    );
    setIsButtonClicked(true);
  };

  if (props.tabColaps) {
    return (
      <div
        className="[writing-mode:vertical-rl] h-full w-[50px] flex  justify-center items-center text-xl  cursor-pointer bg-background_color border-r-2  py-4"
        onClick={() => {
          props.setColapsTabBar(props.index);
        }}>
        {"Link Sidebar"}
      </div>
    );
  } else {
    return (
      <div
        className="flex w-[400px] flex-col justify-between h-screen bg-sidebar_bg backdrop-filter backdrop-blur-md bg-opacity-10  border-l border-[#444444]
    p-4 pb-8 pt-12
    ">
        <CustomButton
          icon={"close"}
          onClick={handleClose}
          className="absolute right-3 top-3 flex items-center justify-center p-1 text-white hover:text-red-400"
        />

        <Select
          className="text-sm"
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          controlShouldRenderValue={false}
          placeholder="Search for item"
          isMulti
          options={options}
          styles={customStyles}
          getOptionLabel={(option) => option.label}
          value={selectedOptions}
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
        <section className="grow overflow-y-auto flex flex-col justify-end">
          <div className="bg-black/60 flex flex-col gap-2 p-4 text-white max-h-[90%] rounded-md mt-4 mb-2">
            <p className="font-bold text-xl">Linked Items</p>
            <div className="max-h-1/5 overflow-auto flex flex-col justify-center items-center gap-2">
              {selectedOptions.length === 0 && (
                <p className="text-white/50">No items linked</p>
              )}
              {selectedOptions.length > 0 &&
                selectedOptions.map((item: optionsType, id: number) => (
                  <button
                    type="button"
                    className="w-full text-white bg-background_color p-3 rounded-md flex items-center gap-2 text-sm"
                    key={id}
                    onClick={() => handleIdClick(item.value)}>
                    <IdComponent itemId={item.value} color={item.color} />
                    <p className="grow truncate text-left">{item.title}</p>
                  </button>
                ))}
            </div>
          </div>
          <CustomButton
            disabled={isButtonClicked}
            onClick={() => createNewsLink(linkedCalledByID!)}
            label={"Create New Link"}
            icon="add_link"
            className="flex justify-center items-center gap-2 p-[0.5rem_1rem] bg-background_color rounded-md shadow-md text-sm 
            text-highlight_font_color border-[2px] border-dark_gray hover:bg-purple-400 hover:border-purple-400 
            hover:text-purple-800 transition-all duration-200 ease-in-out"
          />
        </section>
      </div>
    );
  }
};

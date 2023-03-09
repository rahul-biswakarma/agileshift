import { doc, onSnapshot } from "firebase/firestore";
import React from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { db } from "../../firebaseConfig";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSideBar } from "../../redux/reducers/SideBarSlice";
import { RootState } from "../../redux/store";

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    backgroundColor: "#1F1F1F", // Set the background color here,
    flexGrow: 1,
    display: "flex",
    border: "0px solid ",
    outline: "none",
    boxShadow: "none",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#262626" : "#1F1F1F", // Set the option background color here
    color: state.isSelected ? "#FFFFFF" : "#CCCCCC", // Set the option text color here
    cursor: "pointer", // Set the cursor

    "&:hover": {
      backgroundColor: "#1F1F1F",
    },
    "&:active": {
      backgroundColor: "#321f11", // Set the option background color here
    },
  }),
  input: (provided: any) => ({
    ...provided,
    color: "#FFFFFF", // Set the input text color here
    "&:focus": {
      outline: "none", // Remove blue focus
    },
  }),
  menuList: (provided: any) => ({
    ...provided,
    padding: 0, // remove padding
    marginTop: 0, // remove margin top
    marginBottom: 0, // remove margin bottom
    backgroundColor: "#1F1F1G",
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#FFFFFF", // Set the selected option text color here
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,
    position: "absolute",
    top: state.hasValue || state.selectProps.inputValue ? -15 : "50%",
    transition: "top 0.1s, font-size 0.1s",
    fontSize: (state.hasValue || state.selectProps.inputValue) && 13,
  }),
};

type type_props = {
  columnDetails: any;
  formData: any;
  setFormData: any;
  defaultValue: any;
  selectedField: string;
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

const AutoComplete = (props: type_props) => {
  const [options, setOptions] = React.useState<any>([]);
  const organizationId = useAppSelector((state) => state.auth.organisationId);
  const dispatch = useAppDispatch();
  const sidebarList: Type_SIDEBARSTATE[] = useSelector(
    (state: RootState) => state.sidebar.sideBarData
  );
  const [isButtonClicked, setIsButtonClicked] = React.useState<boolean>(false);

  React.useEffect(() => {
    let flag: boolean = false;
    sidebarList.forEach((item: any) => {
      if (
        item.type === "addOption" &&
        item.fieldName === props.selectedField &&
        item.columnName === props.columnDetails.columnName
      ) {
        setIsButtonClicked(true);
        console.log("item**,true");
        flag = true;
      }
    });

    if (!flag) {
      setIsButtonClicked(false);
    }
  }, [sidebarList, props.selectedField, props.columnDetails.columnName]);

  React.useEffect(() => {
    onSnapshot(doc(db, "filterSchema", organizationId), (doc) => {
      let filterSchemaDetails: any = doc.data();
      filterSchemaDetails = filterSchemaDetails["data"];
      let selectedColumn = filterSchemaDetails[props.selectedField].filter(
        (item: any) => item.columnName === props.columnDetails.columnName
      );
      setOptions(selectedColumn.length > 0 ? selectedColumn[0]["data"] : []);
    });
  }, [props.selectedField, organizationId, props.columnDetails.columnName]);

  const handleIdClick = () => {
    dispatch(
      setSideBar({
        type: "addOption",
        columnName: props.columnDetails.columnName,
        columnType: props.columnDetails.columnType,
        fieldName: props.selectedField,
      })
    );
  };

  return (
    <div>
      <div className="flex my-[0.3rem] bg-background_color text-sm rounded-lg ">
        <span className="w-[7em] p-3 h-[2.5rem] text-center rounded-l font-dm_sans text-primary_font_color font-bold truncate flex items-center justify-center">
          {props.columnDetails.columnName}
        </span>
        <span className="grow bg-Secondary_background_color focus:outline-none rounded-r pl-4 code-font font-dm_sans border-2 border-background_color flex">
          <Select
            className="grow"
            placeholder="test place holder"
            styles={customStyles}
            options={formatOptions(
              options.map((item: any) => item.filterOptionName)
            )}
            value={{
              label: props.formData[props.columnDetails.columnName],
              value: props.formData[props.columnDetails.columnName],
            }}
            onChange={(item) =>
              props.setFormData({
                ...props.formData,
                [props.columnDetails.columnName]: item!.value,
              })
            }
          />
        </span>
        <button
          onClick={() => handleIdClick()}
          type="button"
          disabled={isButtonClicked}
          className="text-2xl px-2 flex justify-center items-center text-primary_font_color active:text-blue-900 hover:text-highlight_icon_color cursor-pointer"
        >
          +
        </button>
      </div>
    </div>
  );
};
export default AutoComplete;

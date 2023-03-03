import {  MenuItem, Select } from "@mui/material";
import React, { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  get_all_tabs_name,
  get_background_color_from_name,
  get_data_byID,
  get_schema_data_field,
  link_data_to_parent_data,
  update_data_to_database,
} from "../../Utils/Backend";
import SideBarInputs from "./SideBarInputs";
import { setNewSidBar, setSideBar } from "../../redux/reducers/SideBarSlice";
import { setLinkedData } from "../../Utils/HelperFunctions";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CustomButton from "../common/Button";
import { toast } from "react-toastify";
import { IdComponent } from "../DataTable/idComponent";

export default function CreateData(props: any) {
  const [selectedField, setSelectedField] = React.useState<string>("");
  const [filedList, setFieldList] = React.useState<any>([]);
  const [formData, setFormData] = React.useState<any>();
  const [formSchema, setFormSchema] = React.useState<any>();
  const organizationId = useAppSelector((state) => state.auth.organisationId);
  const creatorOfData = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();
  const [isFetching, setIsFetching] = React.useState<boolean>(true);

  const [sideBarList] = React.useState(
    useSelector((state: RootState) => state.sidebar.sideBarData)
  );

  console.log(props.sidebar, "sidebar");
  const fetchDataCallback = useCallback(() => {
    const fetchData = async () => {
      let schemaData: any = await get_schema_data_field(
        organizationId,
        selectedField
      );

      let tempFormData: any = {};

      schemaData.list.forEach((item: any) => {
        if (["string", "title", "currency"].includes(item.columnType))
          tempFormData[item.columnName] = "";
        else {
          tempFormData[item.columnName] = [];
        }
      });

      // only works when the sidebar is in edit mode, not in create mode
      if (props.sidebar.fieldId !== "" && props.sidebar.fieldId !== undefined) {
        let currentState: any = await get_data_byID(
          organizationId,
          props.sidebar.fieldId
        );
        Object.keys(currentState).forEach((key) => {
          tempFormData[key] = currentState[key];
        });

        setLinkedData(
          sideBarList,
          dispatch,
          tempFormData.id,
          tempFormData.linkedData
        );
      }

      setFormData(tempFormData);
      setFormSchema(schemaData);
    };

    fetchData();
  }, [
    selectedField,
    organizationId,
    props.sidebar.fieldId,
    dispatch,
    sideBarList,
  ]);

  React.useEffect(() => {
    fetchDataCallback();
  }, [fetchDataCallback]);

  const handleAddLink = () => {

    dispatch(
      setSideBar({
        sidebarType: "linkMode",
        fieldName: selectedField,
        linkedCalledByID: props.sidebar.id,
      })
    );
  };

  //   getting dropdown data fields
  const fetchSchemaDataCallback = useCallback(() => {
    const fetchData = async () => {
      let fieldList: string[] = await get_all_tabs_name(organizationId);
      setFieldList(fieldList);
      if (props.sidebar.sidebarType === "createMode" || props.sidebar.sidebarType === "createNewsLink")
        setSelectedField(
          props.sidebar.createModeCalledByField.toLowerCase() !== "all"
            ? props.sidebar.createModeCalledByField
            : fieldList[0]
        );
      else {
        let currentState: any = await get_data_byID(
          organizationId,
          props.sidebar.fieldId
        );

        setSelectedField(currentState.field);
      }
    };
    fetchData();
  }, [
    organizationId,
    props.sidebar.createModeCalledByField,
    props.sidebar.fieldId,
    props.sidebar.sidebarType,
  ]);

  React.useEffect(() => {
    fetchSchemaDataCallback();
  }, [fetchSchemaDataCallback]);

  const sideBarLists = useAppSelector((state) => state.sidebar.sideBarData);

  const handleClose = () => {
    dispatch(
      setNewSidBar(
        sideBarLists.filter((sideBar, index) => index !== props.index)
      )
    );
  };

  const handleSubmit = async () => {
    let tempFormData: any = {};
    try {
      if (props.sidebar.sidebarType === "createMode" || props.sidebar.sidebarType === "createNewsLink") {
        setFormData({
          ...formData,
          field: selectedField,
          createdBy: creatorOfData,
          linkedData: props.sidebar.linkedData,
          id: props.sidebar.id,
        });
        tempFormData = {
          ...formData,
          field: selectedField,
          createdBy: creatorOfData,
          linkedData: props.sidebar.linkedData,
          id: props.sidebar.id,
        }; // for immediate update
      } else {
        setFormData({
          ...formData,
          createdBy: creatorOfData,
          linkedData: props.sidebar.linkedData,
        });
        tempFormData = {
          ...formData,
          createdBy: creatorOfData,
          linkedData: props.sidebar.linkedData,
        };
      }

      await update_data_to_database(
        organizationId,
        tempFormData,
        props.sidebar.sidebarType
      );

      toast.success("Data Updated Successfully");
    } catch (err) {
      console.log(err);
      toast.error("Error in updating data");
    }

    // add the new created data to the parent data
    if(props.sidebar.sidebarType === "createNewsLink"){
      link_data_to_parent_data(organizationId, props.sidebar.id, props.sidebar.parentId)
    }
    handleClose();
  };


  if (isFetching) {
    const fetchData = async () => {
      let schemaData: any = await get_schema_data_field(
        organizationId,
        selectedField
      );
      setFormSchema(schemaData);
      setIsFetching(false);
    };
    fetchData();
  }

  

  return (
    <div className=" p-4 flex flex-col justify-between h-screen relative bg-sidebar_bg backdrop-filter backdrop-blur-lg bg-opacity-60 border border-primary_font_color">
      <div>
        <header className="flex justify-between items-center mb-8">
          {(props.sidebar.sidebarType === "createMode"|| props.sidebar.sidebarType ==="createNewsLink"  )&& (
            <Select
              style={{
                borderColor: formSchema ? formSchema.color : "",
                color: formSchema ? formSchema.color : "" + 20,
                backgroundColor: "",
              }}
              value={selectedField}
              onChange={(e) => setSelectedField(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              className={`border-2 border-[${get_background_color_from_name(
                ""
              )}] h-10`}
            >
              {filedList.map((field: string, index: number) => (
                <MenuItem key={index} value={field}>
                  {field}
                </MenuItem>
              ))}
            </Select>
          )}
          {props.sidebar.sidebarType === "editMode" && (
            // <div className="border-2 p-2 rounded font-bold text-sm" >{props.sidebar.fieldId}</div>
            <IdComponent
              itemId={props.sidebar.fieldId}
              color={formData ? formData.color : ""}
            />
            // <div>{props.sideBar}</div>
          )}

          <CustomButton
            icon={"close"}
            onClick={handleClose}
            className="absolute right-3 top-3 flex items-center justify-center p-1 text-white hover:text-red-400"
          />
        </header>
        <section>
          {formSchema && formSchema.list && (
            <div>
              {formSchema.list.map((item: any, index: number) => {
                return (
                  <SideBarInputs
                    columnDetails={item}
                    formData={formData}
                    setFormData={setFormData}
                    defaultValue={formData[item.columnName]}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>
      {/* <section>
        {props.sidebar.linkedData &&
          props.sidebar.linkedData.map((item: any, index: number) => (
            <span key={index}>{item}</span>
          ))}
      </section> */}
      <footer className=" right-0 mb-4   flex flex-row gap-2">
        <CustomButton onClick={handleAddLink} label={"Link"} />
        <CustomButton
          onClick={handleSubmit}
          label={
            (props.sidebar.sidebarType === "createMode"|| props.sidebar.sidebarType ==="createNewsLink"  ) ? "Create" : "Update"
          }
        />
      </footer>
    </div>
  );
}

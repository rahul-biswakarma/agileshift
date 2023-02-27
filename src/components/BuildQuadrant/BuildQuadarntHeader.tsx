import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setNewSidBar } from "../../redux/reducers/SideBarSlice";
import { get_schema_data_field } from "../../Utils/Backend";
import { OrganisationForm } from "../ManageOrganization/OrganisationForm";

type Type_BuildQuadrantHeaderProp = {
  itemName: string;
};

const BuildQuadarntHeader = (props: Type_BuildQuadrantHeaderProp) => {
  const sidebarList = useAppSelector((state) => state.sidebar.sideBarData);
  const organizationId = useAppSelector((state) => state.auth.organisationId);

  const dispatch = useAppDispatch();

  const formatData = (data: TYPE_SCHEMA[]) => {
    let formattedData: any = {};
    console.log(data, "8");
    data.forEach((item) => {
      formattedData[item.columnName] = item.columnType;
    });
    return formattedData;
  };

  const handleClick = async () => {
    console.log("clicked");
    const schemaFromBackend: any = await get_schema_data_field(
      organizationId,
      props.itemName
    );
    let createField = {
      field: schemaFromBackend.name,
      color: schemaFromBackend.color,
      data: {},
      schema: formatData(schemaFromBackend.list),
    };

    dispatch(setNewSidBar([createField]));
  };
  return (
    <div className="bg-Secondary_background_color p-[1rem_2rem] flex justify-between">
      <p className="font-fira_code text-[0.9rem] font-[600] text-white">
        <span className="text-white/50">BUILD /</span> {props.itemName}
      </p>
      <button
        className="w-8 h-8 bg-Secondary_background_color text-white text-3xl active:text-dark_gray"
        onClick={handleClick}
      >
        +
      </button>
    </div>
  );
};

export default BuildQuadarntHeader;

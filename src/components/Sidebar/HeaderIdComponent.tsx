import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import {
  get_background_color_from_name,
  get_schema_data_field,
  get_tabs_name,
  get_text_color_from_name,
} from "../../Utils/Backend";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";

type Type_SidebarState = {
  field: string;
  data: any;
  color: string;
  schema: any;
  index: number;
};

type Type_HeaderIdComponentProps = {
  state: Type_SidebarState;
  setState: React.Dispatch<React.SetStateAction<Type_SidebarState>>;
};

const HeaderIdComponent = (props: Type_HeaderIdComponentProps) => {
  const [fieldList, setFieldList] = useState<string[]>([]);
  const [isFieldUpdated, setIsFieldUpdated] = useState<boolean>(false);
  const [selectedField, setSelectedField] = useState<string>(props.state.field);
  let organizationId = useAppSelector((state) => state.auth.organisationId);

  const getFields = async () => {
    console.log(organizationId);
    const fields = await get_tabs_name(organizationId);
    setFieldList(fields);
    setIsFieldUpdated(true);
  };

  useEffect(() => {
    if (fieldList.length > 0) {
      setSelectedField(fieldList[0]);
      // props.setState({ ...props.state, field: fieldList[0] }); do not delete this line
    }
    console.log("check loop");
  }, [fieldList]);

  const handleFieldChange = async (e: SelectChangeEvent) => {
    setSelectedField(e.target.value);
    const schemaFromBackend: any = await get_schema_data_field(
      organizationId,
      e.target.value
    );
    console.log(schemaFromBackend, "**");

    props.setState({
      ...props.state,
      field: e.target.value,
      schema: schemaFromBackend.list,
      data: {},
      color: schemaFromBackend.color,
    });
  };

  if (!isFieldUpdated) {
    getFields();
    console.log(fieldList, "**");
  }

  return Object.keys(props.state.data).length > 0 ? (
    <span
      style={{
        borderColor: `${get_background_color_from_name(props.state.color)}`,
        color: get_text_color_from_name(props.state.color),
      }}
      className={`border-2 px-1 rounded-md text-sm flex items-center`}
    >
      {props.state.data.id}
    </span>
  ) : (
    // <span
    //   style={{
    //     borderColor: props.state.color,
    //     color: props.state.color,
    //     backgroundColor: props.state.color + 20,
    //   }}
    //   className={`border-2 px-1 rounded-md text-sm flex items-center`}
    // >
    <Select
      style={{
        borderColor: props.state.color,
        color: props.state.color,
        backgroundColor: props.state.color + 20,
      }}
      value={selectedField}
      onChange={(e) => handleFieldChange(e)}
      displayEmpty
      inputProps={{ "aria-label": "Without label" }}
      className={`border-2 border-[${get_background_color_from_name(
        props.state.color
      )}] h-10`}
    >
      {fieldList?.map((field) => (
        <MenuItem value={field}>{field}</MenuItem>
      ))}
    </Select>
  );
};

export { HeaderIdComponent };

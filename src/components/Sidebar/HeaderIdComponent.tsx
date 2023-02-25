import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { get_schema_data_field, get_tabs_name } from "../../Utils/Backend";
import { 
  Select,
  MenuItem,
  SelectChangeEvent
} from "@mui/material"

type Type_SidebarState = {
  field: string;
  data: any;
  color: string;
  schema:any;
  index: number;
};

type Type_HeaderIdComponentProps = {
  state: Type_SidebarState;
  setState: React.Dispatch<React.SetStateAction<Type_SidebarState>>;
};

const HeaderIdComponent = (props: Type_HeaderIdComponentProps) => {

  const [fieldList, setFieldList] = useState<string[]>([])
  const [isFieldUpdated, setIsFieldUpdated] = useState<boolean>(false)
  const [selectedField, setSelectedField] = useState<string>(props.state.field);
  let organizationId = useAppSelector((state)=>state.auth.organisationId)

  const getFields = async () =>{
    organizationId = "zB2drPSZDjsAec5hG7wA";
    console.log(organizationId);
    const fields = await get_tabs_name(organizationId)
    setFieldList(fields)
    setIsFieldUpdated(true)
  }
  
  const handleFieldChange = async (e:SelectChangeEvent) =>{
    organizationId = "zB2drPSZDjsAec5hG7wA";
    setSelectedField(e.target.value)
    const schemaFromBackend:any = await get_schema_data_field(organizationId, e.target.value)
    console.log(schemaFromBackend, "**");
    
    props.setState({...props.state, field:e.target.value, schema:schemaFromBackend.list, data:{}, color:schemaFromBackend.color})
  }
  
  if(!isFieldUpdated) {
    getFields();
    console.log(fieldList, "**");
  }

  return Object.keys(props.state.data).length>0 ? (
    <span
      style={{
        borderColor: props.state.color,
        color: props.state.color,
        backgroundColor: props.state.color + 20,
      }}
      className={`border-2 px-1 rounded-md text-sm flex items-center`}
    >
      {props.state.data.id}
    </span>
  ) : (
    <span
      style={{
        borderColor: props.state.color,
        color: props.state.color,
        backgroundColor: props.state.color + 20,
      }}
      className={`border-2 px-1 rounded-md text-sm flex items-center`}
    >
      New 
      <Select
        value={selectedField}
        onChange={(e) => handleFieldChange(e)}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
      >
          {fieldList?.map((field)=>(
            <MenuItem value={field}>{field}</MenuItem>
          ))}
      </Select>
      {/* <FormControl sx={{ m: 1, minWidth: 120, p:0 }}>
      </FormControl> */}
    </span>
  );
};

export { HeaderIdComponent };

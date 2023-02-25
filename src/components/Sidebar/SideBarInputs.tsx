import React from "react";
import AutoComplete from "../common/AutoComplete";
import Input from "../common/Input";
import MultiSelect from "../common/MultiSelect";

type type_props = {
  type: string;
  defaultValue: string | Array<string>;
  setFunction: any;
  fieldData:any;
  label: string;
};
export default function SideBarInputs(props: type_props) {
  
  if (["dropdown"].includes(props.type)) {
    return (
      <div>
        <AutoComplete
          defaultValue={props.defaultValue}
          label={props.label}
          setFunction={props.setFunction}
          fieldData = {props.fieldData}
        />
      </div>
    );
  }
  if (["tag", "user"].includes(props.type)) {
    return (
      <MultiSelect
        defaultValue={props.defaultValue}
        label={props.label}
        setFunction={props.setFunction}
        fieldData = {props.fieldData}
      />
    );
  }
  if (["string", "title"].includes(props.type)) {
    return (
      <Input
        type={"string"}
        defaultValue={props.defaultValue}
        label={props.label}
        setFunction={props.setFunction}
        fieldData = {props.fieldData}
      />
    );
  }
  return <div> Type is Not valid</div>;
}

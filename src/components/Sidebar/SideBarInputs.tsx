import React from "react";
import { useAppSelector } from "../../redux/hooks";
import AutoComplete from "../common/AutoComplete";
import DatePicker from "../common/DatePicker";
import Input from "../common/Input";
import MultiSelect from "../common/MultiSelect";

type type_props = {
  type: string;
  defaultValue: string | Array<string>;
  setFunction: any;
  fieldData: any;
  label: string;
  sidebarIndex: number;
  selectedTab?: string;
};
export default function SideBarInputs(props: type_props) {
  console.log(props, "**");

  if (["dropdown"].includes(props.type)) {
    return (
      <div>
        <AutoComplete
          defaultValue={props.defaultValue}
          label={props.label}
          setFunction={props.setFunction}
          fieldData={props.fieldData}
          sidebarIndex={props.sidebarIndex}
          selectedTab={props.selectedTab === undefined ? "" : props.selectedTab}
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
        fieldData={props.fieldData}
        selectedTab={props.selectedTab === undefined ? "" : props.selectedTab}
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
        fieldData={props.fieldData}
      />
    );
  }
  if (["date"].includes(props.type)) {
    return (
      <DatePicker
        type={"date"}
        defaultValue={props.defaultValue}
        label={props.label}
        setFunction={props.setFunction}
        fieldData={props.fieldData}
      />
    );
  }
  return <div> Type is Not valid</div>;
}

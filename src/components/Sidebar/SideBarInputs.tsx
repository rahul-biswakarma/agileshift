import React from "react";
import AutoComplete from "../common/AutoComplete";
import Input from "../common/Input";
import MultiSelect from "../common/MultiSelect";

type type_props = {
  type: string;
  defaultValue: string | Array<string>;
  setFunction: any;
  label: string;
};
export default function SideBarInputs(props: type_props) {
  if (["progress"].includes(props.type)) {
    return (
      <div>
        <AutoComplete
          defaultValue={props.defaultValue}
          label={props.label}
          setFunction={() => {}}
        />
      </div>
    );
  }
  if (["tab"].includes(props.type)) {
    return (
      <MultiSelect
        defaultValue={props.defaultValue}
        label={props.label}
        setFunction={() => {}}
      />
    );
  }
  if (["string"].includes(props.type)) {
    return (
      <Input
        type={"string"}
        defaultValue={"test"}
        label={"test"}
        setFunction={() => {}}
      />
    );
  }
  return <div> Type is Not valid</div>;
}

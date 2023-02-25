import React, { useEffect, useState } from "react";
import SideBarInputs from "./SideBarInputs";

type Type_SidebarState = {
  field: string;
  color: string;
  data: any;
  schema: any;
  index: number;
};

type Type_DetailsProps = {
  state: Type_SidebarState;
  setState: React.Dispatch<React.SetStateAction<Type_SidebarState>>;
  formData: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const Details = (props: Type_DetailsProps) => {
  const [titleField, setTitleField] = useState<string>("");

  useEffect(() => {
    const schemaFromProps = props.state.schema;
    if (titleField === "" || !(titleField in schemaFromProps)) {
      let newTitle = "";
      console.log("Change Title", "**");

      Object.keys(schemaFromProps).forEach((key: any) => {
        if (schemaFromProps[key] === "title") {
          console.log(key, "**");
          newTitle = key;
        }
      });
      setTitleField(newTitle);
    }
  }, [props.state.schema, titleField]);

  return (
    <div className="p-2">
      {/* Title */}
      {titleField.length > 0 && (
        <SideBarInputs
          key={titleField}
          type={props.state.schema[titleField]}
          defaultValue={props.formData[titleField]}
          label={titleField}
          fieldData={props.formData}
          setFunction={props.setFormData}
          sidebarIndex={0}
        />
      )}
    </div>
  );
};

export { Details };

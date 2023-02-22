import { useState } from "react";
import { OrganisationForm } from "../ManageOrganization/OrganisationForm";
import { NewSchema } from "./NewSchema";
import { SchemaGenerator } from "./SchemaGenerator";

export const GeneratorFormsContainer = () => {
  //   const [defaultColumnList, setDefaultColumnList] = useState<TYPE_SCHEMA[]>([
  //     { columnName: "Ticket Name", columnType: "string" },
  //     { columnName: "Created By", columnType: "user" },
  //     { columnName: "Tag", columnType: "tags" },
  //   ]);
  const defaultColumnList: TYPE_SCHEMA[] = [
    { columnName: "Ticket Name", columnType: "string" },
    { columnName: "Created By", columnType: "user" },
    { columnName: "Tag", columnType: "tags" },
  ];

  const makeActualCopy = (columnList: TYPE_SCHEMA[]): TYPE_SCHEMA[] => {
    let newColumnList: TYPE_SCHEMA[] = [];
    for (let column of columnList) {
      newColumnList.push({ ...column });
    }
    return newColumnList;
  };

  const [activeTab, setActiveTab] = useState("Organisation");

  type field = {
    name: string;
    list: TYPE_SCHEMA[];
    color: string;
    icon: string;
  };

  const [fields, setFields] = useState<field[]>([
    {
      list: makeActualCopy(defaultColumnList),
      name: "Tickets",
      color: "",
      icon: "",
    },
    {
      list: makeActualCopy(defaultColumnList),
      name: "Issues",
      color: "",
      icon: "",
    },
  ]);

  function changeList(this: any, list: TYPE_SCHEMA[]) {
    console.log("called", this.id);
    let tempFields = [...fields];
    tempFields[this.id].list = list;
    setFields(tempFields);
  }

  const addSchema = () => {
    let tempFields = [...fields];
    let lastField = tempFields[tempFields.length - 1];
    if (lastField.name === "") {
      alert("First fill the name idiot");
      return;
    }
    let newSchema: field = {
      list: makeActualCopy(defaultColumnList),
      name: "",
      color: "",
      icon: "",
    };
    tempFields.push(newSchema);
    setFields(tempFields);
    setActiveTab("");
  };

  return (
    <div className="w-screen h-screen flex divide-x divide-dark_gray">
      <OrganisationForm activeTab={activeTab} setActiveTab={setActiveTab} />
      {fields.map((field, id) => (
        <SchemaGenerator
          type={field.name}
          list={field.list}
          setList={changeList.bind({ id: id })}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          key={id}
        />
      ))}
      <NewSchema addSchema={addSchema} />
    </div>
  );
};

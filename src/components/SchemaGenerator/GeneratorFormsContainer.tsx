import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { create_schema } from "../../Utils/Backend";
import { OrganisationForm } from "../ManageOrganization/OrganisationForm";
import { NewSchema } from "./NewSchema";
import { SchemaGenerator } from "./SchemaGenerator";

export const GeneratorFormsContainer = () => {
  const defaultColumnList: TYPE_SCHEMA[] = [
    { columnName: "Title", columnType: "string" },
    { columnName: "Created By", columnType: "user" },
    { columnName: "Tag", columnType: "tag" },
  ];

  const makeActualCopy = (columnList: TYPE_SCHEMA[]): TYPE_SCHEMA[] => {
    let newColumnList: TYPE_SCHEMA[] = [];
    for (let column of columnList) {
      newColumnList.push({ ...column });
    }
    return newColumnList;
  };

  const [activeTab, setActiveTab] = useState("Organisation");

  const [fields, setFields] = useState<TYPE_FIELD[]>([
    {
      list: makeActualCopy(defaultColumnList),
      name: "Tickets",
      color: "purple",
      icon: "home",
      linkage: [],
    },
    {
      list: makeActualCopy(defaultColumnList),
      name: "Issues",
      color: "cyan",
      icon: "home",
      linkage: [],
    },
  ]);

  const organisationId = useAppSelector(
    (state: RootState) => state.auth.organisationId
  );

  const getAllFieldsName = () => {
    let names = [];
    for (let field of fields) {
      names.push(field.name);
    }
    return names;
  };

  function changeList(this: any, list: TYPE_SCHEMA[]) {
    let tempFields = [...fields];
    tempFields[this.id].list = list;
    setFields(tempFields);
  }

  function changeName(this: any, name: string) {
    let tempFields = [...fields];
    tempFields[this.id].name = name;
    setActiveTab(name);
    setFields(tempFields);
  }

  function changeColor(this: any, color: string) {
    let tempFields = [...fields];
    tempFields[this.id].color = color;
    setFields(tempFields);
  }

  function addLinkage(this: any, link: string) {
    let tempFields = [...fields];
    tempFields[this.id].linkage.push(link);
    setFields(tempFields);
  }

  function removeLinkage(this: any, link: string) {
    let tempFields = [...fields];
    let tempLinkage = tempFields[this.id].linkage;
    const index = tempLinkage.indexOf(link);
    if (index > -1) {
      tempLinkage.splice(index, 1);
    }
    tempFields[this.id].linkage = tempLinkage;
    setFields(tempFields);
  }

  const submitSchema = () => {
    create_schema(organisationId, fields);
    console.log(organisationId, fields);
  };

  const addSchema = () => {
    let tempFields = [...fields];
    for (let field of tempFields) {
      if (field.name === "") {
        alert("First fill the name of all the work items");
        return;
      }
    }
    let newSchema: TYPE_FIELD = {
      list: makeActualCopy(defaultColumnList),
      name: "",
      color: "purple",
      icon: "home",
      linkage: [],
    };
    tempFields.push(newSchema);
    setFields(tempFields);
    setActiveTab("");
  };

  function duplicateSchema(this: any) {
    let currentField = fields[this.id];
    if (currentField.name === "") return;
    let newField: TYPE_FIELD = {
      name: "",
      list: makeActualCopy(currentField.list),
      color: currentField.color,
      icon: currentField.icon,
      linkage: currentField.linkage,
    };
    const duplicatedArray = fields
      .slice(0, this.id + 1)
      .concat(newField, fields.slice(this.id + 1));
    setFields(duplicatedArray);
    setActiveTab("");
  }

  return (
    <div className="w-screen h-screen flex divide-x divide-dark_gray">
      <OrganisationForm activeTab={activeTab} setActiveTab={setActiveTab} />
      {fields.map((field, id) => (
        <SchemaGenerator
          name={field.name}
          setName={changeName.bind({ id: id })}
          list={field.list}
          setList={changeList.bind({ id: id })}
          linkage={field.linkage}
          addLinkage={addLinkage.bind({ id: id })}
          removeLinkage={removeLinkage.bind({ id: id })}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          getAllFieldsName={getAllFieldsName}
          key={id}
          submitSchema={submitSchema}
          duplicateSchema={duplicateSchema.bind({ id: id })}
          color={field.color}
          changeColor={changeColor.bind({ id: id })}
        />
      ))}
      <NewSchema addSchema={addSchema} />
    </div>
  );
};

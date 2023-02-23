import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { create_schema } from "../../Utils/Backend";
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
      color: "",
      icon: "",
      linkage: [],
    },
    {
      list: makeActualCopy(defaultColumnList),
      name: "Issues",
      color: "",
      icon: "",
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
    let lastField = tempFields[tempFields.length - 1];
    if (lastField.name === "") {
      alert("First fill the name idiot");
      return;
    }
    let newSchema: TYPE_FIELD = {
      list: makeActualCopy(defaultColumnList),
      name: "",
      color: "",
      icon: "",
      linkage: [],
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
        />
      ))}
      <NewSchema addSchema={addSchema} />
    </div>
  );
};

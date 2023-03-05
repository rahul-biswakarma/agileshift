import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { create_schema, get_schema_data } from "../../Utils/Backend";
import { OrganisationForm } from "../ManageOrganization/OrganisationForm";
import { SchemaGenerator } from "./SchemaGenerator";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setActiveTab } from "../../redux/reducers/SchemaSlice";
import SchemaGeneratorFormHeader from "./Header";
import { toast } from "react-toastify";
import TabsContainer from "./TabsContainer";
import { LinkableForms } from "./LinkableForms";
import { useSelector } from "react-redux";

type GeneratorContainerPropTypes = {
  mode: string;
};

export const GeneratorFormsContainer = ({
  mode,
}: GeneratorContainerPropTypes) => {
  const navigate = useNavigate();
  const dispatch: any = useAppDispatch();
  const userId = useAppSelector((state: RootState) => state.auth.userId);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [navigate, userId]);

  const orgId = useAppSelector((state) => state.auth.organisationId);

  useEffect(() => {
    if (orgId && mode === "edit") {
      get_schema_data(orgId).then((data) => {
        if (data) {
          console.log(data.schemaData);
          setFields(data.schemaData);
        }
      });
    }
  }, [orgId, mode]);

  let activeTab = useAppSelector((state: RootState) => state.schema.activeTab);

  if (mode === "edit" && activeTab === -1) {
    dispatch(setActiveTab(0));
  }

  const makeActualCopy = (columnList: TYPE_SCHEMA[]): TYPE_SCHEMA[] => {
    let newColumnList: TYPE_SCHEMA[] = [];
    for (let column of columnList) {
      newColumnList.push({ ...column });
    }
    return newColumnList;
  };
  const defaultColumnList = useMemo<TYPE_SCHEMA[]>(
    () => [
      { columnName: "Name", columnType: "title" },
      { columnName: "Tag", columnType: "tag" },
      { columnName: "Owner", columnType: "user" },
      { columnName: "Deadline", columnType: "date" },
    ],
    []
  );

  const defaultFields = useMemo<TYPE_FIELD[]>(
    () => [
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
    ],
    [defaultColumnList]
  );

  // const [activeTab, dispatch(setActiveTab(] = useState(-1));

  const [fields, setFields] = useState<TYPE_FIELD[]>(defaultFields);

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
    setFields(tempFields);
  }

  // function addLinkage(this: any, link: string) {
  // 	let tempFields = [...fields];
  // 	tempFields[this.id].linkage.push(link);
  // 	setFields(tempFields);
  // }

  function changeLinkage(this: any, link: string[]) {
    console.log("link", link);
    let tempFields = [...fields];
    tempFields[this.id].linkage = link;
    console.log("tempFields", tempFields);
    setFields(tempFields);
  }

  // function removeLinkage(this: any, link: string) {
  // 	let tempFields = [...fields];
  // 	let tempLinkage = tempFields[this.id].linkage;
  // 	const index = tempLinkage.indexOf(link);
  // 	if (index > -1) {
  // 		tempLinkage.splice(index, 1);
  // 	}
  // 	tempFields[this.id].linkage = tempLinkage;
  // 	setFields(tempFields);
  // }

  const isEdit: boolean = useSelector(
    (state: RootState) => state.schema.isEdit
  );

  const submitSchema = () => {
    create_schema(organisationId, fields, isEdit);
    toast("Creating Schema");
    setTimeout(() => {
      toast("Schema Created Successfully");
      navigate(`/organization/${organisationId}`);
    }, 1000);
  };

  const addSchema = () => {
    let tempFields = [...fields];
    let lastField = tempFields[tempFields.length - 1];
    if (lastField.name === "") {
      toast.warning("Please fill the name first", {
        className: "toast-message",
      });
      return;
    }
    let newSchema: TYPE_FIELD = {
      list: makeActualCopy(defaultColumnList),
      name: "",
      color: "cyan",
      icon: "home",
      linkage: [],
    };
    tempFields.push(newSchema);
    setFields(tempFields);
    dispatch(setActiveTab(tempFields.length - 1));
  };

  function duplicateSchema(this: any) {
    let currentField = fields[this.id];
    if (currentField.name === "") {
      toast.error("Cannot duplicate a schema with no name!");
      return;
    }
    let newField: TYPE_FIELD = {
      name: `${currentField.name} Duplicate`,
      list: makeActualCopy(currentField.list),
      color: currentField.color,
      icon: currentField.icon,
      linkage: currentField.linkage,
    };
    const duplicatedArray = fields
      .slice(0, this.id + 1)
      .concat(newField, fields.slice(this.id + 1));
    setFields(duplicatedArray);
    dispatch(setActiveTab(activeTab + 1));
    toast.success("Schema duplicated successfulyy");
  }

  function deleteSchema(this: any) {
    let tempFields = [...fields];
    tempFields.splice(this.id, 1);
    setFields(tempFields);
    dispatch(setActiveTab(activeTab - 1));
  }

  function changeColor(this: any, color: string) {
    let tempFields = [...fields];
    tempFields[this.id].color = color;
    setFields(tempFields);
  }

  function changeIcon(this: any, icon: string) {
    let tempFields = [...fields];
    tempFields[this.id].icon = icon;
    setFields(tempFields);
  }
  const checkSchema = () => {
    const fieldName = getAllFieldsName();
    console.log(fieldName);

    for (let i = 0; i < fieldName.length; i++) {
      if (fieldName[i].length === 0) {
        toast.error(`Field name cannot be empty`);
        return;
      }
      for (let j = i + 1; j < fieldName.length; j++) {
        if (fieldName[i].toLowerCase() === fieldName[j].toLowerCase()) {
          toast.error(`Duplicate field name detected: ${fieldName[i]}`);
          return;
        }
      }
    }

    submitSchema();
  };

  useEffect(() => {
    if (mode === "create") {
      setFields(defaultFields);
      dispatch(setActiveTab(-1));
    }
  }, [defaultFields, mode, dispatch]);

  return (
    <div className="flex flex-col max-h-screen">
      <SchemaGeneratorFormHeader />
      <div className="relative w-screen h-[calc(100vh-40px)] flex">
        <TabsContainer fields={fields} addSchema={addSchema} mode={mode} />
        {mode === "create" && <OrganisationForm mode={mode} />}
        {fields.map((field: TYPE_FIELD, id: number) => (
          <SchemaGenerator
            id={id}
            name={field.name}
            setName={changeName.bind({ id: id })}
            list={field.list}
            setList={changeList.bind({ id: id })}
            getAllFieldsName={getAllFieldsName}
            key={id}
            duplicateSchema={duplicateSchema.bind({ id: id })}
            deleteSchema={deleteSchema.bind({ id: id })}
            color={field.color}
            changeColor={changeColor.bind({ id: id })}
            icon={field.icon}
            changeIcon={changeIcon.bind({ id: id })}
            linkage={field.linkage}
            changeLinkage={changeLinkage.bind({ id: id })}
            mode={mode}
          />
        ))}
        <LinkableForms
          fields={fields}
          changeLinkage={changeLinkage}
          checkSchema={checkSchema}
        />
      </div>
    </div>
  );
};

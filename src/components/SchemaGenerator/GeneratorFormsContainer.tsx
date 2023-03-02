import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { create_schema } from "../../Utils/Backend";
import { OrganisationForm } from "../ManageOrganization/OrganisationForm";
import { NewSchema } from "./NewSchema";
import { SchemaGenerator } from "./SchemaGenerator";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { setActiveTab } from "../../redux/reducers/SchemaSlice";
import SchemaGeneratorFormHeader from "./Header";
import { toast } from "react-toastify";



export const GeneratorFormsContainer = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const userId = useAppSelector((state:RootState) => state.auth.userId);

  

 

	

	useEffect(() => {
		if(!userId){
			navigate('/login')
		}
	}, [navigate, userId]);	


  let activeTab = useAppSelector((state: RootState) => state.schema.activeTab);

  const defaultColumnList: TYPE_SCHEMA[] = [
    { columnName: "Name", columnType: "title" },
    { columnName: "Created By", columnType: "user" },
    { columnName: "Tag", columnType: "tag" },
    { columnName: "Owner", columnType: "user" },
    { columnName: "Deadline", columnType: "date" },
  ];

  const makeActualCopy = (columnList: TYPE_SCHEMA[]): TYPE_SCHEMA[] => {
    let newColumnList: TYPE_SCHEMA[] = [];
    for (let column of columnList) {
      newColumnList.push({ ...column });
    }
    return newColumnList;
  };

  // const [activeTab, dispatch(setActiveTab(] = useState(-1));

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
    setFields(tempFields);
  }

  // function addLinkage(this: any, link: string) {
  // 	let tempFields = [...fields];
  // 	tempFields[this.id].linkage.push(link);
  // 	setFields(tempFields);
  // }

  // function changeLinkage(this: any, link: string[]) {
  // 	let tempFields = [...fields];
  // 	tempFields[this.id].linkage = link;
  // 	setFields(tempFields);
  // }

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

  const submitSchema = () => {
    create_schema(organisationId, fields, false);
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
      toast("Please fill the name first");
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
    dispatch(setActiveTab(activeTab + 1));
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
    dispatch(setActiveTab(activeTab + 1));
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

  return (
    <div className="flex flex-col max-h-screen">
      <SchemaGeneratorFormHeader />
      <div className="relative w-screen h-[calc(100vh-40px)] flex divide-x divide-dark_gray">
        <OrganisationForm />
        {fields.map((field, id) => (
          <SchemaGenerator
            id={id}
            name={field.name}
            setName={changeName.bind({ id: id })}
            list={field.list}
            setList={changeList.bind({ id: id })}
            getAllFieldsName={getAllFieldsName}
            key={id}
            submitSchema={submitSchema}
            duplicateSchema={duplicateSchema.bind({ id: id })}
            deleteSchema={deleteSchema.bind({ id: id })}
            color={field.color}
            changeColor={changeColor.bind({ id: id })}
            icon={field.icon}
            changeIcon={changeIcon.bind({ id: id })}
          />
        ))}
        <NewSchema addSchema={addSchema} />
      </div>
    </div>
  );
};

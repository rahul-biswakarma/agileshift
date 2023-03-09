import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import {
  get_all_tabs_name,
  get_data_byID,
  get_schema_data_field,
  update_data_to_database,
} from "../../Utils/Backend";

export const fetchData = async (
  setFormSchema: React.Dispatch<React.SetStateAction<TYPE_FIELD>>,
  setFieldList: React.Dispatch<React.SetStateAction<string[]>>,
  setSelectedField: React.Dispatch<React.SetStateAction<string>>,
  setFormData: React.Dispatch<React.SetStateAction<any>>,
  organizationId: string,
  selectedField: string,
  type: string,
  fieldId: string,
  dispatch: any,
  setFetchedLinks: Function
) => {
  let schemaData: any = { list: [] };
  let currentState: any;
  if (fieldId !== "" && fieldId !== undefined && type === "editMode") {
    currentState = await get_data_byID(organizationId, fieldId);
  }
  if (type === "createMode") {
    // fieldList is used to populate the dropdown in the sidebar
    let fieldList: string[] = await get_all_tabs_name(organizationId);
    schemaData = await get_schema_data_field(
      organizationId,
      selectedField === "all" ? fieldList[0] : selectedField
    );
    setFieldList(fieldList);
    setFormSchema(schemaData);
    setSelectedField(
      selectedField.toLocaleLowerCase() === "all" ? fieldList[0] : selectedField
    );
  } else {
    schemaData = await get_schema_data_field(
      organizationId,
      currentState["field"]
    );
    setSelectedField(currentState["field"]);
  }

  let tempFormData: any = {};
  tempFormData["linkedData"] = [];
  schemaData.list &&
    schemaData.list.forEach((item: any) => {
      if (
        ["string", "title", "currency", "dropdown", "user"].includes(
          item.columnType
        )
      )
        tempFormData[item.columnName] = "";
      else {
        tempFormData[item.columnName] = [];
      }
    });
  tempFormData["field"] = selectedField;

  // only works when the sidebar is in edit mode, not in create mode
  if (fieldId !== "" && fieldId !== undefined && type === "editMode") {
    Object.keys(currentState).forEach((key) => {
      tempFormData[key] = currentState[key];
    });
  }

  dispatch(setFetchedLinks({ [fieldId]: tempFormData["linkedData"] }));

  setFormSchema(schemaData);
  setFormData(tempFormData);
};

export const handleConversations = (
  id: string,
  dispatch: any,
  setSideBar: ActionCreatorWithPayload<any, "sidebar/setSideBar">
) => {
  dispatch(
    setSideBar({
      type: "conversations",
      fieldId: id,
    })
  );
};

export const handleSubmit = async (
  organizationId: string,
  formData: any,
  selectedField: string,
  type: string,
  creatorOfData: string,
  linkedData: any,
  id: string
) => {
  let tempFormData: any = {};
  if (type === "createMode") {
    tempFormData = {
      ...formData,
      field: selectedField,
      createdBy: creatorOfData,
      linkedData: linkedData,
      id: id,
      events: [],
    };
  } else {
    tempFormData = {
      ...formData,
      field: selectedField,
      linkedData: linkedData,
      events: [],
    };
  }

  await update_data_to_database(organizationId, tempFormData, type);
};

// const fetchDataCallback = useCallback(() => {
//     const fetchData = async () => {
//       let schemaData: any = await get_schema_data_field(
//         organizationId,
//         selectedField
//       );

//       let tempFormData: any = {};

//       schemaData.list &&
//         schemaData.list.forEach((item: any) => {
//           if (
//             ["string", "title", "currency", "dropdown"].includes(
//               item.columnType
//             )
//           )
//             tempFormData[item.columnName] = "";
//           else {
//             tempFormData[item.columnName] = [];
//           }
//         });
//       tempFormData["field"] = selectedField;

//       // only works when the sidebar is in edit mode, not in create mode
//       if (props.sidebar.fieldId !== "" && props.sidebar.fieldId !== undefined) {
//         let currentState: any = await get_data_byID(
//           organizationId,
//           props.sidebar.fieldId
//         );
//         Object.keys(currentState).forEach((key) => {
//           tempFormData[key] = currentState[key];
//         });
//       }

//       setFormData(tempFormData);
//       setFormSchema(schemaData);
//     };

//     fetchData();
//   }, [organizationId, props.sidebar.fieldId, selectedField]);

//   React.useEffect(() => {
//     fetchDataCallback();
//   }, [fetchDataCallback]);

//   const handleAddLink = () => {
//     dispatch(
//       setSideBar({
//         sidebarType: "linkMode",
//         fieldName: selectedField,
//         linkedCalledByID: props.sidebar.id,
//       })
//     );
//   };

//   //   getting dropdown data fields
//   const fetchSchemaDataCallback = useCallback(() => {
//     const fetchData = async () => {
//       let fieldList: string[] = await get_all_tabs_name(organizationId);
//       setFieldList(fieldList);
//       if (
//         props.sidebar.sidebarType === "createMode" ||
//         props.sidebar.sidebarType === "createNewsLink"
//       )
//         setSelectedField(
//           props.sidebar.createModeCalledByField!.toLowerCase() !== "all"
//             ? props.sidebar.createModeCalledByField!
//             : fieldList[0]
//         );
//       else {
//         let currentState: any = await get_data_byID(
//           organizationId,
//           props.sidebar.fieldId!
//         );

//         setSelectedField(currentState.field);
//       }
//     };
//     fetchData();
//   }, [
//     organizationId,
//     props.sidebar.createModeCalledByField,
//     props.sidebar.fieldId,
//     props.sidebar.sidebarType,
//   ]);

//   React.useEffect(() => {
//     fetchSchemaDataCallback();
//   }, [fetchSchemaDataCallback]);

//   const handleClose = () => {
//     dispatch(
//       setNewSidBar(
//         sideBarList.filter((sideBar, index) => index !== props.index)
//       )
//     );
//   };

//   const handleSubmit = async () => {
//     let tempFormData: any = {};
//     let userNotification: string[] = [];
//     let notificationMessages: string[] = [];
//     let userValue: any = await get_user_by_id(userId);
//     Object.keys(formData).forEach((item) => {
//       if (trackUserType.includes(item)) {
//         userNotification.push(formData[item]);
//         notificationMessages.push(
//           `You are assigned as ${item} by ${userValue.name}`
//         );
//       }
//     });
//     console.log(formData, "at the time of submit", userNotification);

//     try {
//       if (
//         props.sidebar.sidebarType === "createMode" ||
//         props.sidebar.sidebarType === "createNewsLink"
//       ) {
//         setFormData({
//           ...formData,
//           field: selectedField,
//           createdBy: creatorOfData,
//           linkedData: props.sidebar.linkedData,
//           id: props.sidebar.id,
//         });
//         tempFormData = {
//           ...formData,
//           field: selectedField,
//           createdBy: creatorOfData,
//           linkedData: props.sidebar.linkedData,
//           id: props.sidebar.id,
//         }; // for immediate update
//       } else {
//         setFormData({
//           ...formData,
//           createdBy: creatorOfData,
//           linkedData: props.sidebar.linkedData,
//         });
//         tempFormData = {
//           ...formData,
//           createdBy: creatorOfData,
//           linkedData: props.sidebar.linkedData,
//         };
//       }

//       const newDataId = await update_data_to_database(
//         organizationId,
//         tempFormData,
//         props.sidebar.sidebarType
//       );

//       await set_notification(
//         organizationId,
//         userNotification,
//         notificationMessages,
//         newDataId
//       );
//       console.log(newDataId);

//       toast.success("Data Updated Successfully");
//     } catch (err) {
//       toast.error("Error in updating data");
//     }

//     // add the new created data to the parent data
//     if (props.sidebar.sidebarType === "createNewsLink") {
//       link_data_to_parent_data(
//         organizationId,
//         props.sidebar.id!,
//         props.sidebar.parentId!
//       );
//     }
//     handleClose();
//     if (tabName.toLowerCase() === "all")
//       get_data_by_column_name(orgId, tabName.toLowerCase()).then((data) => {
//         dispatch(setDatas(data));
//       });
//     else
//       get_data_by_column_name(orgId, tabName).then((data) => {
//         dispatch(setDatas(data));
//       });
//   };

//   //   if (isFetching) {
//   //     const fetchData = async () => {
//   //       let schemaData: any = await get_schema_data_field(
//   //         organizationId,
//   //         selectedField
//   //       );
//   //       setFormSchema(schemaData);
//   //       setIsFetching(false);
//   //     };
//   //     fetchData();
//   //   }

//   const handleLinkedIdClick = (id: string) => {
//     dispatch(
//       setSideBar({
//         sidebarType: "editMode",
//         createModeCalledByField: "",
//         fieldId: id,
//         linkedData: [],
//         id: id,
//       })
//     );
//   };
//   const handleConversations = (id: string) => {
//     dispatch(
//       setSideBar({
//         sidebarType: "conversationTab",
//         fieldId: id,
//       })
//     );
//   };

//   React.useEffect(() => {
//     let flag: boolean = false;
//     sideBarList.forEach((item: any) => {
//       if (
//         item.sidebarType === "linkMode" &&
//         item.linkedCalledByID === props.sidebar.id
//       ) {
//         setIsButtonClicked(true);
//         console.log("item**,true");
//         flag = true;
//       }
//     });

//     if (!flag) {
//       setIsButtonClicked(false);
//     }
//   }, [sideBarList, props.sidebar.id]);

//   console.log(formData, "*****");
export {};

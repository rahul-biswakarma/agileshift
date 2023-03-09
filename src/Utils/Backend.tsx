import { db } from "../firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  arrayRemove,
} from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { isValidEmail } from "email-js";
import {
  generateRandomId,
  removeDuplicates,
  get_current_time,
  get_current_date,
} from "./HelperFunctions";

// funcitons list
/*
1.check_users_database
2.get_users_organization
3.create_user
4.create_organization
5.update_organization
6.create_ticket
7.create_issue
8.update_ticket
9.update_issue
10.create_tags
11.sendEmail
12 get all types list
13 get organization details
14 create  schema
15 get  schema
16 get tabs 	name
17 get color from name
19 get_title
20 get schema using field id
21 get data by ID
22 get list by columun type
23 add organization to user
24 get user by id
25 get user by email
26 add && edit data (from sidebar)
27 get data by coloumn name
29 st dropdoewn options
30 edit table data in organization
31 get all columns name
32 get user suggestions
33 set notification
34 update notification
35 mark notification seen
36 user active time
37 send invite (updates database)
38 send invitation mail
39 get invitations list
40 main search function
41 will_include
42 get organization name by id
43 get all tabs name
44 get filter schema
45 reject invitation
46 Add vista
47 Add Vista to user Object
48 get vistas from Id
49 link data to parent data
50 get dark background color from name
51 check if user is present in organizations
52  get user Ids in organizations
53 get previous filter data
54 start conversations
55 get field display id
56 get vistas details
57 send vista invitation
58 send vista invitation on mail
59 get invitations list
60 get users vista's list
61 accept vista invitation
62 reject vista invitation
*/
// 1
export const check_users_database = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
};

// 2
export const get_users_organization = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data()["organisation"];
  } else {
    // doc.data() will be undefined in this case
    console.log("No such userFound document!");
  }
};

// 3
export const create_user = async (userDetails: TYPE_USER) => {
  await setDoc(doc(db, "users", userDetails.id), userDetails);
};

export const get_organizations = async (organizationIds: string[]) => {
  const orgList: any = [];
  organizationIds.map(async (orgId) => {
    const docRef = doc(db, "organizations", orgId);
    const docSnap = await getDoc(docRef);
    orgList.push(docSnap.data());
  });

  return orgList;
};

// 4
export const create_organization = async (userId: string, name: string) => {
  const organizationsRef = collection(db, "organizations");

  const initializeOrganization: any = {
    id: "string",
    name: name,
    dateOfCreation: get_current_time(),
    users: [userId],

    tags: [],
    notifications: {},
    tasks: {},
    data: {},
    dropdownsOptions: {},
  };
  const res = await addDoc(organizationsRef, initializeOrganization);
  const orgRef = doc(db, "organizations", res.id);
  await updateDoc(orgRef, {
    id: res.id,
  });
  return res.id;
};

// 5
export const update_organization = () => {};

// 6
export const create_ticket = () => {};

// 7
export const create_issue = () => {};

// 8
export const update_ticket = () => {};

// 9
export const update_issue = () => {};

// 10
export const create_tags = () => {};

// 11
export const sendEmail = async (
  type: "vista" | "otp" | "organisation",
  emailId: string,
  vistaName?: string,
  orgName?: string,
  sender_name?: string
) => {
  //   e.preventDefault(); // prevents the page from reloading when you hit “Send”

  let otpParams: {
    to_name: string;
    to_email: string;
    otp: number;
  } = {
    to_name: "",
    to_email: emailId,
    otp: Math.floor(Math.random() * 900000) + 100000,
  };

  let invitationParams: {
    from_name: string;
    to_name: string;
    to_email: string;
    content: string;
  } = {
    from_name: sender_name ? sender_name : "",
    to_name: "",
    to_email: emailId,
    content: "",
  };

  if (!isValidEmail(emailId)) {
    console.log("invalid mail");
    return;
  }
  const user: any | undefined = await get_user_by_email(emailId).then(
    (user) => {
      return user;
    }
  );
  let userDetails: TYPE_USER;
  if (!user) {
    console.log("user not found");
    return;
  }
  userDetails = {
    avatar: user.avatar,
    email: user.email,
    id: user.id,
    organisation: user.organisation,
    name: user.name,
  };

  otpParams.to_name = userDetails.name;
  invitationParams.to_name = userDetails.name;

  if (type === "otp") {
    emailjs
      .send(
        "service_gjc539l",
        "template_6vt5v8y",
        otpParams,
        "AJvkEjt5pK4Tr_3jV"
      )
      .then(
        (res) => {
          // show the user a success message
        },
        (error: string) => {
          // show the user an error
          console.error("error in sending otp");
        }
      );
  } else if (type === "vista") {
    invitationParams.content = `You have been invited for the vista named ${vistaName}, by ${sender_name}!`;
    emailjs
      .send(
        "service_gjc539l",
        "template_sqxrej9",
        invitationParams,
        "AJvkEjt5pK4Tr_3jV"
      )
      .then(
        (res) => {
          // show the user a success message
        },
        (error: string) => {
          // show the user an error
          console.error("error in sending invitation");
        }
      );
  } else if (type === "organisation") {
    invitationParams.content = `you are invited to the organisation named ${orgName}, by ${sender_name}`;
    emailjs
      .send(
        "service_gjc539l",
        "template_sqxrej9",
        invitationParams,
        "AJvkEjt5pK4Tr_3jV"
      )
      .then(
        (res) => {
          // show the user a success message
        },
        (error: string) => {
          // show the user an error
          console.error("error in sending invitation");
        }
      );
  }
  return otpParams["otp"];
};

// 12 fetch all supported types. returns array of stings
export const get_all_Supported_types = async () => {
  const typesRef = doc(db, "types", "mBJyeNn4YjJgItin5AOj");
  const typeSnap = await getDoc(typesRef);
  if (typeSnap.exists()) {
    return typeSnap.data()["types"];
  } else {
    // doc.data() will be undefined in this case
    console.log("No such userFound document!");
  }
};
// 13
export const get_organizations_details = async (organisationId: string) => {
  const docRef = doc(db, "organizations", organisationId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

// 14 create a new schema
export const create_schema = async (
  organisationId: string,
  schemas: TYPE_FIELD[],
  isEdit: boolean
) => {
  const previousFilterSchema = await get_filter_schema(organisationId);
  if (isEdit) {
    const schemaDetails = {
      schemaData: schemas,
    };
    await updateDoc(doc(db, "schemas", organisationId), schemaDetails);
    let filterData: any = {};
    schemas.forEach((schema) => {
      filterData[schema.name] = [];
      schema.list.forEach((item) => {
        if (
          item.columnType !== "string" &&
          item.columnType !== "title" &&
          item.columnType !== "id" &&
          item.columnType !== "currency"
        ) {
          filterData[schema.name].push({
            active: true,
            data: get_previous_filter_data(
              previousFilterSchema,
              schema.name,
              item.columnName,
              item.columnType
            ),
            type: item.columnType,
            columnName: item.columnName,
          });
        }
      });
    });
    const filterDetails = {
      data: filterData,
    };
    await updateDoc(doc(db, "filterSchema", organisationId), filterDetails);
  } else {
    let filterData: any = {};
    schemas.forEach((schema) => {
      filterData[schema.name] = [];
      schema.list.forEach((item) => {
        if (
          item.columnType !== "string" &&
          item.columnType !== "title" &&
          item.columnType !== "id" &&
          item.columnType !== "currency"
        ) {
          filterData[schema.name].push({
            active: true,
            data: [],
            type: item.columnType,
            columnName: item.columnName,
          });
        }
      });
    });
    const filterDetails = {
      data: filterData,
    };
    await setDoc(doc(db, "filterSchema", organisationId), filterDetails);
    const schemaDetails = {
      schemaData: schemas,
    };

    await setDoc(doc(db, "schemas", organisationId), schemaDetails);
  }
};

// 15 get schema
export const get_schema_data = async (organisationId: string) => {
  const docRef = doc(db, "schemas", organisationId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

//16 get tabs name
export const get_tabs_name = async (organisationId: string) => {
  const docRef = doc(db, "schemas", organisationId);
  const docSnap = await getDoc(docRef);
  let fieldList = [];
  if (docSnap.exists()) {
    fieldList = docSnap.data()["schemaData"].map((item: any) => {
      return item.name;
    });
  } else {
    console.log("No such document!");
  }
  return fieldList;
};

// 17 get background color from name
export const get_background_color_from_name = (name: string) => {
  if (name === "purple") return "#6b21a8";
  else if (name === "slate") return "#1e293b";
  else if (name === "red") return "#dc2626";
  else if (name === "amber") return "#b45309";
  else if (name === "lime") return "#65a30d";
  else if (name === "cyan") return "#0891b2";
  else if (name === "indigo") return "#4f46e5";
  else if (name === "pink") return "#a21caf";
  else return "#1d4ed8";
};

// 18 get text color from name
export const get_text_color_from_name = (name: string) => {
  if (name === "purple") return "#d8b4fe";
  else if (name === "slate") return "#d1d5db";
  else if (name === "red") return "#fca5a5";
  else if (name === "amber") return "#fde68a";
  else if (name === "lime") return "#bef264";
  else if (name === "cyan") return "#a5f3fc";
  else if (name === "indigo") return "#fde68a";
  else if (name === "pink") return "#f0abfc";
  else return "#93c5fd";
};
// 19
export const get_title = async (organisationId: string, field: string) => {
  const docRef = doc(db, "schemas", organisationId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    docSnap.data()["schemaData"].map((item: any) => {
      if (item.name === field) {
        return item.list.map((listData: any) => {
          if (listData.type === "title") return listData.colummn;
          return {};
        });
      }
      return {};
    });
  } else {
    console.log("No such document!");
  }
  return "";
};

// 20 get schema using field name
export const get_schema_data_field = async (
  organisationId: string,
  field: string
): Promise<TYPE_FIELD> => {
  const docRef = doc(db, "schemas", organisationId);
  const docSnap = await getDoc(docRef);
  let schemaFromField: TYPE_FIELD = {
    color: "",
    icon: "",
    linkage: [],
    list: [],
    name: "",
  };
  if (docSnap.exists()) {
    docSnap.data()["schemaData"].forEach((item: any) => {
      if (item.name === field) {
        schemaFromField = item;
      }
    });
  } else {
    console.log("No such document!");
  }
  return schemaFromField;
};
// 21 get data by ID
export const get_data_byID = async (organisationId: string, dataId: string) => {
  const docRef = doc(db, "organizations", organisationId);
  const docSnap = await getDoc(docRef);

  let dataDetails: any = {};

  if (docSnap.exists()) {
    docSnap.data()["data"].forEach((item: any) => {
      if (item.id === dataId) {
        dataDetails = item;
      }
    });
  } else {
    console.log("No such document!");
  }
  return dataDetails;
};
// 22 get list by columun typee
export const get_list_by_column_type = async (
  organisationId: string,
  typeName: string
) => {
  return [];
};
// 23 add organization to user
export const add_organisation_to_user = async (
  userId: string,
  organisationId: string,
  email: string,
  page: string
) => {
  console.log("function called");
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    organisation: arrayUnion(organisationId),
  });
  const organisationRef = doc(db, "organizations", organisationId);
  await updateDoc(organisationRef, {
    users: arrayUnion(userId),
  });

  if (page === "invitations") {
    const docRef = doc(db, "invitations", email);
    const docSnap = await getDoc(docRef);
    let dataDetails: any = [];

    if (docSnap.exists()) {
      dataDetails = docSnap.data();
      dataDetails = dataDetails["pendingList"].filter(
        (item: any) => item !== organisationId
      );
      console.log(dataDetails);
      await updateDoc(docRef, {
        pendingList: dataDetails,
      });
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
};

// // 24 get user by id
export const get_user_by_id = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return false;
};

// // 25 get user by email
export const get_user_by_email = async (email: string) => {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  let userData; // create a variable to store the user data
  querySnapshot.forEach((doc) => {
    userData = doc.data(); // assign the user data to the variable
  });
  return userData; // return the variable after the loop has finished
};

// 26 add && edit table data
export const update_data_to_database = async (
  organisationId: string,
  data: any,
  mode: string
) => {
  console.log("data", data);
  // condition for create data
  const organizationRef = doc(db, "organizations", organisationId);
  if (mode === "createMode") {
    data["created_at"] = get_current_time();
    data["displayId"] = await get_field_display_id(
      organisationId,
      data["field"]
    );
    await updateDoc(organizationRef, {
      data: arrayUnion(data),
    });
    return data["displayId"];
  } else {
    //  condition for update data
    let docSnap: any = await getDoc(organizationRef);
    let orgDetails: any = docSnap.data();
    let orgDataList = orgDetails["data"];
    let index: number = -1;
    orgDataList.forEach((item: any, ind: number) => {
      if (item.id === data.id) {
        index = ind;
      }
    });
    if (index !== -1) {
      orgDataList[index] = data;
    }
    await updateDoc(organizationRef, {
      data: orgDataList,
    });
    return data.displayId;
  }
};
// 27 get data by coloumn name

export const get_data_by_column_name = async (
  organisationId: string,
  field: string
) => {
  const orgData: any = await get_organizations_details(organisationId);
  let data: any = [];
  if (orgData.data && orgData.data.length > 0) {
    orgData.data.forEach((item: any) => {
      if (item["field"] === field || field === "all") {
        data.push(item);
      }
    });
  }
  return data;
};

// 28 get dropdown options
export const get_dropdown_options = async (
  organisationId: string,
  columnName: string,
  field: string
) => {
  const docRef = doc(db, "filterSchema", organisationId);
  const docSnap = await getDoc(docRef);

  let dataDetails: any = [];

  if (docSnap.exists()) {
    dataDetails = docSnap.data();
    dataDetails = dataDetails?.data;
    dataDetails = dataDetails[field]?.filter(
      (item: any) => item.columnName === columnName
    );
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return [];
  }
  return dataDetails.length > 0 ? dataDetails[0]["data"] : [];
};

// 29 set dropdown options
export const set_dropdown_options = async (
  organisationId: string,
  columnName: string,
  field: string,
  options: string[]
) => {
  const filterSchemaRef = doc(db, "filterSchema", organisationId);

  const docSnap = await getDoc(filterSchemaRef);

  let dataDetails: any = [];

  if (docSnap.exists()) {
    dataDetails = docSnap.data();
    dataDetails = dataDetails["data"];
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    dataDetails[field].forEach((item: any) => {
      if (item.columnName === columnName) {
        item.data = options;
      }
    });
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }

  await updateDoc(filterSchemaRef, {
    data: dataDetails,
  });
};

// 30 edit table data in organization
export const edit_table_data_in_organization = async (
  organizationId: string,
  dataId: string,
  updatedData: any
) => {
  const organizationRef = doc(db, "organizations", organizationId);
  let docSnap: any = await getDoc(organizationRef);
  let updatedDataArray: any = docSnap
    .data()
    ["data"].filter((item: any) => item.id !== dataId);
  updatedDataArray.push(updatedData);
  await updateDoc(organizationRef, {
    data: updatedDataArray,
  });
};

// 31 get all columns name return [{name: "name", type: "text"}}]
export const get_all_columns_name = async (organisationId: string) => {
  const docRef = doc(db, "schemas", organisationId);
  const docSnap = await getDoc(docRef);
  let columns: any = [];

  if (docSnap.exists()) {
    docSnap.data()["schemaData"].forEach((item: any) => {
      item.list.forEach((listItem: any) => {
        columns.push(listItem);
      });
    });
  } else {
    console.log("No such document!");
  }
  return removeDuplicates(columns);
};

//32  get user suggestions
export const get_user_suggestions = async (organisationId: string) => {
  let userIsList: any = await get_organizations_details(organisationId);
  userIsList = userIsList["users"];
  const q = query(collection(db, "users"), where("id", "in", userIsList));
  const querySnapshot = await getDocs(q);
  let userDetails: any = [];
  if (querySnapshot.empty) return [];
  querySnapshot.forEach((doc) => {
    userDetails.push(doc.data());
  });

  return userDetails;
};

//33 set notification
export const set_notification = async (
  organisationId: string,
  userId: string[],
  notificationData: string[],
  data?: {
    field: string;
    color: string;
    displayId: string;
    dataId: string;
  }
) => {
  let orgData: any = await get_organizations_details(organisationId);
  userId &&
    userId.length > 0 &&
    userId.forEach(async (user, index) => {
      const notification: TYPE_NOTIFICATION = {
        notificationData: notificationData[index],
        notificationId: generateRandomId(),
        dateOfCreation: get_current_time(),
        isSeen: false,
      };
      if (data) {
        notification["data"] = {
          field: data.field,
          color: data.color,
          displayId: data.displayId,
          dataId: data.dataId,
        };
      }
      if (orgData["notifications"][user] === undefined) {
        orgData["notifications"][user] = [];
      }
      orgData["notifications"][user].push(notification);
    });
  const organizationRef = doc(db, "organizations", organisationId);
  if (!orgData["notifications"]) orgData["notifications"] = {};
  await updateDoc(organizationRef, {
    notifications: orgData?.notifications,
  });
};

// 34 update notification
export const update_notification = async (
  organisationId: string,
  userId: string,
  notification: TYPE_NOTIFICATION
) => {
  const organizationRef = doc(db, "organizations", organisationId);
  let docSnap: any = await getDoc(organizationRef);
  let updatedNotification: any = docSnap.data()["notifications"];
  if (
    updatedNotification &&
    updatedNotification[userId] &&
    updatedNotification[userId].length > 0
  ) {
    let filteredNotification = updatedNotification[userId].filter(
      (item: any) => item.notificationId !== notification.notificationId
    );
    filteredNotification.push(notification);
    updatedNotification[userId] = filteredNotification;
    await updateDoc(organizationRef, {
      notifications: updatedNotification,
    });
  }
};

// 35 mark notification seen
export const mark_notification_seen = async (
  organisationId: string,
  userId: string,
  notificationList: TYPE_NOTIFICATION[]
) => {
  const organizationRef = doc(db, "organizations", organisationId);
  let docSnap: any = await getDoc(organizationRef);
  let updatedNotification: any = docSnap.data()["notifications"];
  if (updatedNotification) {
    updatedNotification[userId] = notificationList;
    await updateDoc(organizationRef, {
      notifications: updatedNotification,
    });
  }
};

// 36 user active time
export const user_active_time = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  const currentData = get_current_time();
  await updateDoc(userRef, {
    active: arrayUnion(currentData),
  });
};

//37  send invite
export const send_invite = async (
  senderId: string,
  receiverEmail: string,
  organisationId: string
) => {
  const invitatonRef = doc(db, "invitations", receiverEmail);

  const docSnap = await getDoc(invitatonRef);

  if (docSnap.exists()) {
    const data = docSnap.data();
    if (data["pendingList"].includes(organisationId)) {
      return;
    } else {
      await updateDoc(invitatonRef, {
        pendingList: arrayUnion(organisationId),
      });
    }
  } else {
    await setDoc(invitatonRef, {
      pendingList: [organisationId],
    });
  }

  const senderDetails: any = await get_user_by_id(senderId);
  const organizationDetails: any = await get_organizations_details(
    organisationId
  );

  sendEmail(
    "organisation",
    receiverEmail,
    "",
    organizationDetails["name"],
    senderDetails["name"]
  );
};
// 38 send invitation mail
export const send_invitation_mail = async (
  email: string,
  sender_name: string,
  org_name: string
) => {
  //   e.preventDefault(); // prevents the page from reloading when you hit “Send”

  let params: {
    email: string;
    org_name: string;
    sender_name: string;
  } = {
    email: email,
    org_name: org_name,
    sender_name: sender_name,
  };

  if (!isValidEmail(email)) {
    console.log("invalid mail");
    return;
  }
  emailjs
    .send("service_0dpd4z6", "template_5ye9w1m", params, "sb5MCkizR-ZuN4LVw")
    .then(
      (res) => {
        console.log("emailjs", res);
        // show the user a success message
      },
      (error: string) => {
        // show the user an error
        console.error("error in sending otp");
      }
    );
};

// 39 get invitations list
export const get_invitations_list = async (userID: string) => {
  const userDetails: any = await get_user_by_id(userID);
  const userRef = doc(db, "invitations", userDetails["email"]);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data()["pendingList"];
  } else {
    return [];
  }
};

// 40 main search function
export const main_search_function = async (
  organizationId: string,
  searchText: string
) => {
  let results: any = [];
  let organizationTableData: any = await get_organizations_details(
    organizationId
  );
  organizationTableData = organizationTableData["data"];
  try {
    organizationTableData.forEach((item: any) => {
      if (wil_include(item, searchText)) {
        results.push(item);
      }
    });
  } catch {
    console.log("error");
    return [];
  }
  return results;
};

// 41 will_include
export const wil_include = (item: any, searchText: string) => {
  let flag = false;
  Object.keys(item).forEach((field: any) => {
    if (!flag) {
      try {
        flag = item[field].toLowerCase().includes(searchText.toLowerCase());
      } catch {
        flag = false;
      }
    }
  });
  return flag;
};

// 42 get organization name by id
export const get_organization_name_by_id = async (organizationId: string) => {
  const organizationRef = doc(db, "organizations", organizationId);
  const docSnap = await getDoc(organizationRef);
  if (docSnap.exists()) {
    return docSnap.data()["name"];
  } else {
    return "";
  }
};

// 43 get all tabs name
export const get_all_tabs_name = async (organisationId: string) => {
  const docRef = doc(db, "schemas", organisationId);
  const docSnap = await getDoc(docRef);
  let tabs: any = [];

  if (docSnap.exists()) {
    docSnap.data()["schemaData"].forEach((item: any) => {
      tabs.push(item.name);
    });
  } else {
    console.log("No such document!");
  }
  return tabs;
};
// 44 get filter schema
export const get_filter_schema = async (organizationId: string) => {
  const filterRef = doc(db, "filterSchema", organizationId);
  const filterSnap = await getDoc(filterRef);
  if (filterSnap.exists()) {
    return filterSnap.data();
  } else {
    console.log("No such document!");
    return;
  }
};

//45 reject invitation
export const reject_invitation = async (
  organisationId: string,
  emailId: string
) => {
  const docRef = doc(db, "invitations", emailId);
  const docSnap = await getDoc(docRef);
  let dataDetails: any = [];

  if (docSnap.exists()) {
    dataDetails = docSnap.data();
    dataDetails = dataDetails["pendingList"].filter(
      (item: any) => item !== organisationId
    );
    await updateDoc(docRef, {
      pendingList: dataDetails,
    });
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

//46 Add vista
export const add_vista = (
  organizationId: string,
  userId: string,
  filterSchema: any,
  tabName: string,
  vistaName: string
) => {
  addDoc(collection(db, "vistas"), {
    name: vistaName,
    field: tabName,
    vistaSchema: filterSchema,
  }).then((data) => {
    console.log(data.id);
    add_vista_to_user(organizationId, userId, data.id);
  });
};

// 47 Add Vista to user Object
export const add_vista_to_user = async (
  organizationId: string,
  userId: string,
  vistaId: string
) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);
  let userData: any = {};
  if (userSnap.exists()) {
    userData = userSnap.data();
    if (!userData.vistas) {
      userData["vistas"] = {};
    }
    if (userData.vistas[organizationId]) {
      userData.vistas[organizationId].push(vistaId);
    } else {
      userData.vistas[organizationId] = [vistaId];
    }
    await setDoc(doc(db, "users", userId), userData);
  } else {
    console.log("No such document!");
  }
};

// 48 get vistas from Id
export const get_vista_from_id = async (vistaId: string) => {
  const vistaRef = doc(db, "vistas", vistaId);
  const vistaSnap = await getDoc(vistaRef);
  if (vistaSnap.exists()) {
    return vistaSnap.data();
  } else {
    console.log("No such data!");
  }
  return {};
};

// 49 link data to parent data
export const link_data_to_parent_data = async (
  organizationId: string,
  childId: string,
  parentId: string
) => {
  console.log(organizationId, childId, parentId, "##");
  let parentData: any = await get_data_byID(organizationId, parentId);
  parentData["linkedData"] = [...parentData["linkedData"], childId];
  await update_data_to_database(organizationId, parentData, "");
};
// 50 get dark background color from name
export const get_dark_background_color_from_name = (name: string) => {
  if (name === "purple") return "#242230";
  else if (name === "slate") return "#1e293b";
  else if (name === "red") return "#302225";
  else if (name === "amber") return "#302b22";
  else if (name === "lime") return "#283022";
  else if (name === "cyan") return "#223030";
  else if (name === "indigo") return "#222830";
  else if (name === "pink") return "#2f2230";
  else return "#282230";
};

//51 check if user is present in organizations
export const check_user_in_organizations = async (
  email: string,
  organisationId: string
) => {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  let isUserExit = false;
  let userData: any = {};
  querySnapshot.forEach((doc) => {
    userData = doc.data();
    if (userData["organisation"].includes(organisationId)) isUserExit = true;
    userData = doc.id;
  });
  // try{
  // 	isUserExit=userData["organisation"].includes(organisationId)
  // }
  // catch{
  // 	// isUserExit=false
  // 	console.log("No Document found");

  // }
  console.log(isUserExit);

  return {
    isUser: isUserExit,
    userId: userData,
  };
};

//52  get user Ids in organizations
export const get_userIds_in_organizations = async (organisationId: string) => {
  let userIsList: any = [];
  userIsList = await get_organizations_details(organisationId);
  return userIsList["users"];
};

// 53 get previous filter data
export const get_previous_filter_data = (
  filterSchema: any,
  field: string,
  columnName: string,
  columnType: string
) => {
  let value: any = [];

  let filterSchemaData = filterSchema["data"];
  Object.keys(filterSchemaData).forEach((item: any) => {
    if (item === field) {
      filterSchemaData[item].forEach((item: any) => {
        if (item["columnName"] === columnName && item["type"] === columnType) {
          value = item["data"];
        }
      });
    }
  });
  return value;
};

// 54 start conversations
export const send_message_in_fields = async (
  fieldId: string,
  senderId: string,
  message: string
) => {
  // check if conversation is present

  console.log(fieldId, senderId, message, "##");
  let conversationRef = doc(db, "conversations", fieldId);
  const conversationSnap = await getDoc(conversationRef);
  const userDetails: any = await get_user_by_id(senderId);
  let messageData: {
    message: string;
    senderId: string;
    timeStamp: string;
    senderImg: string;
    name: string;
    email: string;
  } = {
    message: message,
    senderId: senderId,
    timeStamp: get_current_time(),
    senderImg: userDetails["avatar"],
    name: userDetails["name"],
    email: userDetails["email"],
  };
  console.log(userDetails);

  if (conversationSnap.exists()) {
    // conversation is present
    await updateDoc(conversationRef, {
      [get_current_date()]: arrayUnion(messageData),
    });
  } else {
    // conversation is not present
    let x = get_current_date();
    await setDoc(conversationRef, { [x]: [messageData] });
  }
};

// 55 get field display id
export const get_field_display_id = async (
  organisationId: string,
  fieldName: string
) => {
  const fieldsCountRef = doc(db, "fieldsCount", organisationId);
  const fieldsCountSnap = await getDoc(fieldsCountRef);

  // check if fields data is present
  if (fieldsCountSnap.exists()) {
    let fieldsCountData = fieldsCountSnap.data();
    // check if field is present
    if (Object.keys(fieldsCountData).includes(fieldName)) {
      fieldsCountData[fieldName] = fieldsCountData[fieldName] + 1;
      await updateDoc(fieldsCountRef, fieldsCountData);
      return fieldsCountData[fieldName];
    } else {
      fieldsCountData[fieldName] = 1;
      await updateDoc(fieldsCountRef, fieldsCountData);
      return 1;
    }
  } else {
    await setDoc(fieldsCountRef, { [fieldName]: 1 });
    return 1;
  }
};

// 56 get vistas details
export const get_vistas_details = async (vistasId: string) => {
  const vistasRef = doc(db, "vistas", vistasId);
  const vistasSnap = await getDoc(vistasRef);
  return vistasSnap.data();
};

//57  send vista invitation
export const send_vista_invitations = async (
  senderId: string,
  receiverEmail: string,
  vistasId: string,
  orgId: string
) => {
  const invitatonRef = doc(db, "vistaInvitations", receiverEmail);
  const docSnap = await getDoc(invitatonRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    if (data.pendingList[orgId] && data.pendingList[orgId].includes(vistasId)) {
      return;
    } else {
      await updateDoc(invitatonRef, {
        pendingList: {
          [orgId]: arrayUnion(vistasId),
        },
      });
    }
  } else {
    await setDoc(invitatonRef, {
      pendingList: {
        [orgId]: [vistasId],
      },
    });
  }
  const senderDetails: any = await get_user_by_id(senderId);
  const vistasDetail: any = await get_vistas_details(vistasId);
  sendEmail(
    "vista",
    receiverEmail,
    vistasDetail["name"],
    "",
    senderDetails["name"]
  );
};
// 58 send vista invitation on mail -- not needed anymore
export const send_vista_invitation_mail = async (
  email: string,
  sender_name: string,
  vista_name: string
) => {
  //   e.preventDefault(); // prevents the page from reloading when you hit “Send”

  console.log("sending mail", email);

  let params: {
    email: string;
    org_name: string;
    sender_name: string;
  } = {
    email: email,
    org_name: vista_name,
    sender_name: sender_name,
  };

  if (!isValidEmail(email)) {
    console.log("invalid mail");
    return;
  }
  console.log(params);
  emailjs
    .send("service_0dpd4z6", "template_5ye9w1m", params, "sb5MCkizR-ZuN4LVw")
    .then(
      (res) => {
        console.log("emailjs", res);
        // show the user a success message
      },
      (error: string) => {
        // show the user an error
        console.error("error in sending otp");
      }
    );
};

// 59 get invitations list
export const get_vista_invitations_list = async (userID: string) => {
  const userDetails: any = await get_user_by_id(userID);
  const userRef = doc(db, "vistaInvitations", userDetails["email"]);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    return docSnap.data()["pendingList"];
  } else {
    return {};
  }
};

// 60 get users vista's list
export const get_users_vistas_list = async (userID: string) => {
  const userDetails: any = await get_user_by_id(userID);
  try {
    return userDetails["vistasList"];
  } catch {
    return [];
  }
};

// 61 accept vista invitation
//  accept vista invitation
export const accept_vista_invitation = async (
  userId: string,
  vistaId: string,
  orgId: string
) => {
  const userDetails: any = await get_user_by_id(userId);
  const userRef = doc(db, "users", userId);
  const vistasInvitationsRef = doc(
    db,
    "vistaInvitations",
    userDetails["email"]
  );
  await updateDoc(vistasInvitationsRef, {
    [`pendingList.${orgId}`]: arrayRemove(vistaId),
  });
  if (Object.keys(userDetails).includes("vistas")) {
    await updateDoc(userRef, {
      [`vistas.${orgId}`]: arrayUnion(vistaId),
    });
  } else {
    await updateDoc(userRef, {
      [`vistas.${orgId}`]: [vistaId],
    });
  }
};

// 62 reject vista invitation
export const reject_vista_invitation = async (
  userId: string,
  vistaId: string,
  orgId: string
) => {
  const userDetails: any = await get_user_by_id(userId);
  const vistasInvitationsRef = doc(
    db,
    "vistaInvitations",
    userDetails["email"]
  );
  await updateDoc(vistasInvitationsRef, {
    [`pendingList.${orgId}`]: arrayRemove(vistaId),
  });
};

// 63 count data in organisation
export const count_data_in_organisation = async (organisationId: string) => {
  const organisationDetails = await get_organizations_details(organisationId);
  let fieldItemsCount: any = {};
  let totolCount = 0;
  if (organisationDetails) {
    let organisationsData: any = organisationDetails["data"];
    organisationsData.forEach((data: any) => {
      let field = data["field"];
      if (fieldItemsCount[field]) {
        fieldItemsCount[field] = fieldItemsCount[field] + 1;
      } else {
        fieldItemsCount[field] = 1;
      }
      totolCount = totolCount + 1;
    });
  }
  fieldItemsCount["total"] = totolCount;
  return fieldItemsCount;
};
// 64 add link to fields

export const add_links_to_fields = async (
  organisationId: string,
  fieldId: string,
  links: any
) => {
  console.log(links, "Links**", fieldId, organisationId);
  const organizationRef = doc(db, "organizations", organisationId);
  let tempLinks = links.map((link: any) => {
    return {
      id: link.id,
      color: link.color,
      displayId: link.displayId,
      fieldName: link.fieldName,
    };
  });

  let docSnap: any = await getDoc(organizationRef);
  let orgDetails: any = docSnap.data();
  let orgDataList = orgDetails["data"];
  let index: number = -1;
  orgDataList.forEach((item: any, ind: number) => {
    if (item.id === fieldId) {
      index = ind;
    }
  });
  if (index !== -1) {
    orgDataList[index]["linkedData"] = tempLinks;
  }
  await updateDoc(organizationRef, {
    data: orgDataList,
  });
};

// 65 update organizations name
export const update_organizations_name = async (
  organizationId: string,
  updatedName: string
) => {
  const organizationRef = doc(db, "organizations", organizationId);
  await updateDoc(organizationRef, {
    name: updatedName,
  });
};

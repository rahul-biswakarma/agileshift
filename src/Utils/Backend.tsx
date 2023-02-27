import { db } from "../firebaseConfig";
// import {
// 	doc,
// 	updateDoc,
// 	arrayUnion,
// 	addDoc,
// 	collection,
// 	query,
// 	where,
// 	getDocs,
// 	getDoc,
// 	setDoc,
// 	onSnapshot,
// } from "firebase/firestore";
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
} from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { isValidEmail } from "email-js";

function generateRandomId() {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charactersLength = characters.length;
  for (let i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
const get_current_time = () => {
  let date = new Date();
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
    .getHours()
    .toString()
    .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
    .getSeconds()
    .toString()
    .padStart(2, "0")}.${date.getMilliseconds().toString().padStart(3, "0")}`;
};

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
 16 get tabs name
 17 get color from name
19 get_title
20 get schema using field id
21
22
23 add organization to user
24 get user by id

25 get user by email
26 add && edit data (from sidebar)
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
export const create_organization = async (
  userId: string,
  name: string,
  imgUrl: string
) => {
  const organizationsRef = collection(db, "organizations");

  const initializeOrganization: any = {
    id: "string",
    name: name,
    dateOfCreation: get_current_time(),
    users: [userId],
    imageUrl: imgUrl,
    tags: [],
    notifications: [],
    tasks: {},
    data: {},
  };
  //  initialling channel in channel Table
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
export const sendEmail = async (emailId: string) => {
  //   e.preventDefault(); // prevents the page from reloading when you hit “Send”

  let params: {
    to_name: string;
    to_email: string;
    otp: number;
  } = {
    to_name: "",
    to_email: emailId,
    otp: Math.floor(Math.random() * 900000) + 100000,
  };

  if (!isValidEmail(emailId)) {
    console.log("invalid mail");
    return;
  }
  const userDetails: TYPE_USER | string = await get_user_by_email(emailId).then(
    (user) => {
      return user;
    }
  );
  if (userDetails === "") {
    console.log("user not found");
    return;
  }

  emailjs
    .send("service_0dpd4z6", "template_weagkql", params, "sb5MCkizR-ZuN4LVw")
    .then(
      (res) => {
        // show the user a success message
        console.log("sent");
      },
      (error: string) => {
        // show the user an error
        console.error("error in sending otp");
      }
    );
  return params["otp"];
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
  schemas: TYPE_FIELD[]
) => {
  const schemaDetails = {
    schemaData: schemas,
  };
  await setDoc(doc(db, "schemas", organisationId), schemaDetails);
};

// 15 get schema
export const get_schema_data = async (
  organisationId: string,
  schema: string
) => {
  let organizationDetails: any = await get_organizations_details(
    organisationId
  );
  organizationDetails["fields"].forEach((item: any) => {
    if (item.title === schema) {
      return {
        schema: item["schema"],
        data: item["data"],
      };
    }
  });
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
    console.log(fieldList);
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
) => {
  console.log(organisationId);

  const docRef = doc(db, "schemas", organisationId);
  const docSnap = await getDoc(docRef);
  let schemaFromField = {};
  if (docSnap.exists()) {
    docSnap.data()["schemaData"].forEach((item: any) => {
      if (item.name === field) {
        schemaFromField = item;
      }
    });

    console.log(schemaFromField, "**");
  } else {
    console.log("No such document!");
  }
  return schemaFromField;
};
// 21
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
  organisationId: string
) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    organisation: arrayUnion(organisationId),
  });
};
// // 24 get user by id

export const get_user_by_id = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return false;
  }
};
// // 25 get user by email

export const get_user_by_email = async (email: string) => {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    return doc.data();
  });
  return "";
};
// 26 addd && edit table data
export const update_data_to_database = async (
  organisationId: string,
  data: any
) => {
  // condition for create data
  const organizationRef = doc(db, "organizations", organisationId);
  if (data.id === undefined || data.id === "") {
    data["id"] = generateRandomId();
    await updateDoc(organizationRef, {
      data: arrayUnion(data),
    });
  } else {
    //  condition for update data
    let docSnap: any = await getDoc(organizationRef);
    let updatedData: any = docSnap
      .data()
      ["data"].filter((item: any) => item.id !== data.id);
    updatedData.push(data);
    await updateDoc(organizationRef, {
      data: updatedData,
    });
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

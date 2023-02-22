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
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { isValidEmail } from "email-js";

// const get_current_time = () => {
// 	let date = new Date();
// 	return `${date.getFullYear()}-${(date.getMonth() + 1)
// 		.toString()
// 		.padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date
// 		.getHours()
// 		.toString()
// 		.padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date
// 		.getSeconds()
// 		.toString()
// 		.padStart(2, "0")}.${date.getMilliseconds().toString().padStart(3, "0")}`;
// };

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
// export const create_organization = async (
//   userId: string,
//   name: string,
//   profileImageUrl: string
// ) => {
//   const organizationsRef = collection(db, "organizations");

//   const initializeOrganization: TYPE_ORGANISATION = {
//     id: "string",
//     name: name,
//     dateOfCreation: get_current_time(),
//     users: [userId],
//     profileImageUrl: profileImageUrl,
//     vista: {},
//     issues: [],
//     ticket: [],
//     tags: [],
//     parts: [],
//     notifications: [],
//     tasks: {},
//   };
//   //  initialling channel in channel Table
//   const res = await addDoc(organizationsRef, initializeOrganization);
//   return res.id;
// };

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
export const sendEmail = (emailId: string) => {
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

// 14 create a new  schema
export const create_schema = async (
  organisationId: string,
  schemas: TYPE_SCHEMA[]
) => {
  const organisationRef = doc(db, "organizations", organisationId);
  schemas.forEach(async (schema) => {
    await updateDoc(organisationRef, {
      fields: arrayUnion({ ...schema, data: [] }),
    });
  });
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
  let organizationDetails: any = await get_organizations_details(
    organisationId
  );
  let titles: { color: string; icon: string; title: string }[] = [];
  organizationDetails["fields"].forEach((item: any) => {
    titles.push({ title: item.title, icon: item.icon, color: item.color });
  });
  return titles;
};

// 17 get background color from name
export const get_background_color_from_name = (name: string) => {
  return "#161616";
};

// 18 get text color from name
export const get_text_color_from_name = (name: string) => {
  return "#668cff";
};

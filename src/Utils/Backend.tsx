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
import { removeDuplicates } from "./HelperFunctions";

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
27 get data by coloumn name
29 st dropdoewn options
30 edit table data in organization
31 get all columns name
32 user suggestions
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
		notifications: {},
		tasks: {},
		data: {},
		dropdownsOptions: {},
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
	const userDetails: TYPE_USER | string | undefined = await get_user_by_email(
		emailId
	).then((user) => {
		return user;
	});
	if (userDetails === "") {
		console.log("user not found");
		return;
	}

	emailjs
		.send("service_0dpd4z6", "template_weagkql", params, "sb5MCkizR-ZuN4LVw")
		.then(
			(res) => {
				// show the user a success message
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
  if (isEdit) {
    const schemaDetails = {
      schemaData: schemas,
    };
    await updateDoc(doc(db, "schemas", organisationId), schemaDetails);
    let filterData: any = {};
    schemas.forEach((schema) => {
      filterData[schema.name] = [];
      schema.list.forEach((item) => {
        if (item.columnType !== "string" && item.columnType !== "title" && item.columnType !== "id" && item.columnType !== "currency") {
          filterData[schema.name].push({
            active: true,
            data: [],
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
        if (item.columnType !== "string" && item.columnType !== "title" && item.columnType !== "id" && item.columnType !== "currency") {
          filterData[schema.name].push({
            active: true,
            data: [],
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
) => {
	const docRef = doc(db, "schemas", organisationId);
	const docSnap = await getDoc(docRef);
	let schemaFromField = {};
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
	organisationId: string,
	email:string
) => {
	const userRef = doc(db, "users", userId);
	await updateDoc(userRef, {
		organisation: arrayUnion(organisationId),
	});
	// const organisationRef = doc(db, "organizations", organisationId);
	await updateDoc(userRef, {
		users: arrayUnion(organisationId),
	}); 

	
	const docRef = doc(db, "invitations", email);
		const docSnap = await getDoc(docRef);
		let dataDetails: any =[] 

	if (docSnap.exists()) {
		dataDetails = docSnap.data()
		dataDetails = dataDetails.filter((item: any) => item !== organisationId)
		await updateDoc(docRef, {
			pendingList: dataDetails,
		});
	} else {
	// doc.data() will be undefined in this case
	console.log("No such document!");
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
// 28 get dropdown options
export const get_dropdown_options = async (
	organisationId: string,
	columnName: string,
	field: string
) => {
	let orgData: any = await get_organizations_details(organisationId);
	try {
		return orgData["dropdowns-options"][`${columnName}_${field}`];
	} catch {
		return [];
	}
};
// 29 set dropdown options
export const set_dropdown_options = async (
	organisationId: string,
	columnName: string,
	field: string,
	options: string[]
) => {
	let orgData: any = await get_organizations_details(organisationId);

	orgData["dropdowns-options"][`${columnName}_${field}`] = options;

	const orgRef = doc(db, "organizations", organisationId);
	await updateDoc(orgRef, {
		"dropdowns-options": orgData["dropdowns-options"],
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

//  get user suggestions
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

//30 set notification
export const set_notification = async (
  organisationId: string,
  userId: string[],
  notificationData: string[],
  dataId?: string,
) => {
  let orgData: any = await get_organizations_details(organisationId);
  
  userId.forEach(async (user, index) => {
    const notification = {
      dataId: dataId,
      notificationData: notificationData[index],
      notificationId: generateRandomId(),
      dateOfCreation: get_current_time(),
      isSeen: false,
    };
    if (orgData["notifications"][user] === undefined) {
      orgData["notifications"][user] = [];
    }
    orgData["notifications"][user].push(notification);
  })
  const organizationRef = doc(db, "organizations", organisationId);
  await updateDoc(organizationRef, {
    notifications: orgData["notifications"],
  });
};

// 31 update notification
export const update_notification = async (
	organisationId: string,
	userId: string,
	notification: any
) => {
	const organizationRef = doc(db, "organizations", organisationId);
	let docSnap: any = await getDoc(organizationRef);
	let updatedNotification: any = docSnap.data()["notifications"];
	let filteredNotification = updatedNotification[userId].filter(
		(item: any) => item.notificationId !== notification.notificationId
	);

	filteredNotification.push(notification);
	updatedNotification[userId] = filteredNotification;
	await updateDoc(organizationRef, {
		notifications: updatedNotification,
	});
};

export const mark_notification_seen = async (
  organisationId: string,
  userId: string,
  notificationList: TYPE_NOTIFICATION[]
) => {
  const organizationRef = doc(db, "organizations", organisationId);
  let docSnap: any = await getDoc(organizationRef);
  let updatedNotification: any = docSnap.data()["notifications"];
  updatedNotification[userId] = notificationList;
  await updateDoc(organizationRef, {
    notifications: updatedNotification,
  });
};

// 33 user active time
export const user_active_time = async (userId: string) => {
	const userRef = doc(db, "users", userId);
	const currentData = get_current_time();
	await updateDoc(userRef, {
		active: arrayUnion(currentData),
	});
};

//  send invite
export const send_invite = async (
	senderId: string,
	receiverEmail: string,
	organisationId: string
) => {
	const invitatonRef = doc(db, "invitations", receiverEmail);

	console.log("senderId", receiverEmail);

	await setDoc(invitatonRef, {
		pendingList: [organisationId],
	});
	const senderDetails: any = await get_user_by_id(senderId);
	const organizationDetails: any = await get_organizations_details(
		organisationId
	);

	send_invitation_mail(
		receiverEmail,
		senderDetails["name"],
		organizationDetails["name"]
	);
};

export const send_invitation_mail = async (
	email: string,
	sender_name: string,
	org_name: string
) => {
	//   e.preventDefault(); // prevents the page from reloading when you hit “Send”

	console.log("sending mail", email);

	let params: {
		email: string;
		org_name: string;
		sender_name: string;
	} = {
		email: "",
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

export const get_invitations_list = async (userID: string) => { 

	const userDetails:any = await get_user_by_id(userID);
	const userRef = doc(db, "invitations", userDetails['email']);
	const docSnap = await getDoc(userRef);
	if (docSnap.exists()) {
		return docSnap.data()["pendingList"];
	} else {
		return [];
	}
	
}

// 34 main search function
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

export const get_filter_schema = async (organizationId: string) => {
  const filterRef = doc(db, "filterSchema", organizationId);
  const filterSnap = await getDoc(filterRef);
  if (filterSnap.exists()) {
    return filterSnap.data();
  } else {
    console.log("No such document!");
    return;
  }
}

import { db } from "../firebaseConfig";
import {
  doc,
  updateDoc,
  arrayUnion,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
// funcitons list

export const check_users_database = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
};
export const create_user = () => {};
export const create_organization = () => {};
export const update_organization = () => {};
export const create_ticket = () => {};
export const create_issue = () => {};
export const update_ticket = () => {};
export const update_issue = () => {};
export const create_tags = () => {};

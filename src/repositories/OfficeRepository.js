import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

const officeCollection = collection(db, "office"); 

export const getOffices = async () => { 

  try {
    const result = await getDocs(officeCollection);

    return result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    throw new Error(error);
  }
};

export const getOfficeByUser = async (user) => {  
  try {
    const offices = query(officeCollection, where("users", "array-contains", user));     
    const result = await getDocs(offices);
    return result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    throw new Error(error);
  }
};





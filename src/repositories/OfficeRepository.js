import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getOffices = async () => {
  const data = collection(db, "office"); 

  try {
    const result = await getDocs(data);

    return result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    throw new Error(error);
  }
};



import { db } from "../config/firebase";
import {
  collection,
  // collectionGroup,
  getDocs,
  addDoc,
  // updateDoc,
  // deleteDoc,
} from "firebase/firestore";

export const getShippingAddress = async (idClient) => {
  const data = collection(db, `/client/${idClient}/shippingAddress`);
  try {
    const result = await getDocs(data);
    return result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    throw new Error(error);
  }
};

export const saveShippingAddress = async (idClient, address) => {
  const addressCollection = collection(
    db,
    `/client/${idClient}/shippingAddress`
  );

  try {
    await addDoc(addressCollection, address).then((docRef) => {
      address.id = docRef.id;
    });
  } catch (error) {
    throw new Error(error);
  }

  return address;
};

export const getProvinces = async () => {
  const data = collection(db, "province");
  try {
    const result = await getDocs(data);
    return result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    throw new Error(error);
  }
};

export const getCities = async (idProvince) => {
  const data = collection(db, `/province/${idProvince}/town`);
  try {
    const result = await getDocs(data);
    return result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    throw new Error(error);
  }
};

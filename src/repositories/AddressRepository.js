import { db } from "../config/firebase";
import {
  collection,
  // collectionGroup,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
  // updateDoc,
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
    if(!address.id) {
      await addDoc(addressCollection, address).then((docRef) => {
      address.id = docRef.id;
      });
    } else {
        const updateAddress = doc(db, addressCollection, address.id);
        await updateDoc(updateAddress, address);
    }
  } catch (error) {
    throw new Error(error);
  }

  return address;
};

export const deleteAddress = async (idClient, idAddress) => {  
  try {
    const removeAddress = doc(db, `/client/${idClient}/shippingAddress/${idAddress}`);
    await deleteDoc(removeAddress);
  } catch (error) {
    throw new Error(error);
  }  
};

export const getProvinces = async () => {
  const data = collection(db, "province");
  try {
    const orderedData = query(data, orderBy("name"));
    const result = await getDocs(orderedData);
    return result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    throw new Error(error);
  }
};

export const getCities = async (idProvince) => {
  const data = collection(db, `/province/${idProvince}/town`);
  try {
    const orderedData = query(data, orderBy("name"));
    const result = await getDocs(orderedData);
    return result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    throw new Error(error);
  }
};

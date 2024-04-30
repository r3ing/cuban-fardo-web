import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";

const shipmentCollection = collection(db, "shipping");

export const addOrEditShipment = async (idClient, shipment) => {
  const data = collection(db, `/client/${idClient}/shipments`); 

  try {
    // if (!client.id) {
    await addDoc(data, shipment).then((docRef) => {
      shipment.id = docRef.id;
    });
    // } else {
    //   const updateClient = doc(db, "client", client.id);
    //   await updateDoc(updateClient, client);
    // }
    return shipment;
  } catch (error) {
    throw new Error(error);
  }
};

export const addShipment = async (shipment) => {
  try {
    await addDoc(shipmentCollection, shipment).then((docRef) => {
      shipment.id = docRef.id;
    });
  } catch (error) {
    throw new Error(error);
  }

  return shipment;
};

export const getShipments = async () => {
  try {
    const data = await getDocs(shipmentCollection);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
     throw new Error(error);
  }
};

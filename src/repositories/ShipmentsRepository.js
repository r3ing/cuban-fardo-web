import { db } from "../config/firebase";
import {
  collection,
  addDoc,
} from "firebase/firestore";

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
  const shipmentColletcion = collection(db, "shipping");

  try {
    await addDoc(shipmentColletcion, shipment).then((docRef) => {
      shipment.id = docRef.id;
    });
  } catch (error) {
    throw new Error(error);
  }

  return shipment;
};

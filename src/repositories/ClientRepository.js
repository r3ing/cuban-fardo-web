import { db } from "../config/firebase";
import {
  collection,
  //collectionGroup,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";

const clientCollection = collection(db, "client");

export const getClients = async () => {

  try { 
    const orderedData = query(clientCollection, orderBy("name"));
    const result = await getDocs(orderedData);
    return result.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
     throw new Error(error);
  }
};

export const addOrEditClient = async (client) => {
    if (!client.id) {
      const qry = query(clientCollection, where("phone", "==", client.phone));
      const clients = await getDocs(qry);

      if (!clients.empty) {
        throw new Error("Up, customer registered, please verify the information!!!");
      }

      await addDoc(clientCollection, client).then((docRef) => {
        client.id = docRef.id;
      });

    } else {
      const updateClient = doc(db, "client", client.id);
      await updateDoc(updateClient, client);
    }

    return client;
};

export const deleteClient = async (id) => {
  const removeClient = doc(db, "client", id);
  await deleteDoc(removeClient);
  console.log("cliente " + removeClient.name + " removed");
};

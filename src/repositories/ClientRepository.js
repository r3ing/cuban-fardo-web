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
  where,
} from "firebase/firestore";

const clientColletcion = collection(db, "client");

export const getClients = async () => {

  // const colletcion = collection(db, "/client");

  // // const coll = await getDocs(colletcion);
  // // coll.docs.forEach((d) => console.log("shipments: ", d.data()));

  try {
    const data = await getDocs(clientColletcion);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
     throw new Error(error);
  }
};

export const addOrEditClient = async (client) => {
    if (!client.id) {
      const qry = query(clientColletcion, where("phone", "==", client.phone));
      const clients = await getDocs(qry);

      if (!clients.empty) {
        throw new Error("Up, customer registered, please verify the information!!!");
      }

      await addDoc(clientColletcion, client).then((docRef) => {
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

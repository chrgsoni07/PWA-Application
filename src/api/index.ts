import { CustomerType } from "component/Customers/types";
import firebase from "firebase";
import { CollectionNameType } from "./types";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBliuj3l49dWcJ0Bb0jCGFLA8oSbMi9AFs",
  authDomain: "billing-soft-rk.firebaseapp.com",
  databaseURL: "https://billing-soft-rk-default-rtdb.firebaseio.com",
  projectId: "billing-soft-rk",
  storageBucket: "billing-soft-rk.appspot.com",
  messagingSenderId: "574963225464",
  appId: "1:574963225464:web:dfdbee1894ca584ce42e8d",
  measurementId: "G-4JNVSZCV88",
});

const db = firebaseApp.firestore();

export { db };

export const save = async <T>(
  collectionName: CollectionNameType,
  data: any
): Promise<T> => {
  delete data["id"];
  const { id } = await db.collection(collectionName).add(data);
  return { ...data, id };
};

export const getCustomers = async (): Promise<CustomerType[]> => {
  const collection = db.collection("customers");

  return collection.get().then((querySnapshot) => {
    const allCustomers: CustomerType[] = [];
    querySnapshot.forEach((customer) => {
      console.log(customer.id);
      const customerData = customer.data();

      allCustomers.push({
        name: customerData.name,
        mobile: customerData.mobile,
        place: customerData.place,
        address: customerData.address,
        id: customer.id,
      });
    });

    return allCustomers;
  });
};

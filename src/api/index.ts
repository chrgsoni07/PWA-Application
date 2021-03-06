import { Bill } from "component/Bills/types";
import { CustomerType } from "component/Customers/types";
import { ItemType } from "component/Items/types";
import { RateType } from "component/Rates/types";
import firebase from "firebase";
import { CollectionNameType, ItemCategoryType } from "./types";

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
const increment = firebase.firestore.FieldValue.increment(1);

export { db };

export const save = async <T>(
  collectionName: CollectionNameType,
  data: T & { id?: string }
): Promise<T> => {
  delete data["id"];
  const { id } = await db.collection(collectionName).add(data);
  return { ...data, id };
};

export const edit = async <T>(
  collectionName: CollectionNameType,
  data: T & { id?: string }
): Promise<void> => {
  const id = data.id;
  const newData = { ...data };
  delete newData["id"];
  return db.collection(collectionName).doc(id).set(newData);
};

export const deleteFromDB = async (
  collectionName: CollectionNameType,
  id: string
): Promise<void> => {
  return db.collection(collectionName).doc(id).delete();
};

export const saveBill = async (bill: Bill): Promise<Bill> => {
  const billNo = await getCounterValue();
  const savedBill: Bill = await save("bills", { ...bill, billNo });
  await increaseCounterValue();
  await addBillToCustomer(savedBill.customerId, savedBill.id);
  return savedBill;
};

export const addBillToCustomer = async (customerId: string, billId: string) => {
  var customerdocument = db.collection("customers").doc(customerId);

  await customerdocument.update({
    billsId: firebase.firestore.FieldValue.arrayUnion(billId),
  });
};

export const getBillsByCustomerId = async (
  customerId: String
): Promise<Bill[]> => {
  const allItems: Bill[] = [];
  const collection = db
    .collection("bills")
    .where("customerId", "==", customerId);
  const querySnapshot = await collection.get();
  querySnapshot.forEach((item) => {
    const itemData = item.data();
    allItems.push({ ...itemData, id: item.id } as any);
  });
  return allItems;
};

export const get = async <T>(
  collectionName: CollectionNameType
): Promise<T[]> => {
  const collection = db.collection(collectionName);

  const querySnapshot = await collection.get();
  const allItems: T[] = [];
  querySnapshot.forEach((item) => {
    const itemData = item.data();
    allItems.push({ ...itemData, id: item.id } as any);
  });
  return allItems;
};

export const getCustomers = async (): Promise<CustomerType[]> => {
  return get("customers");
};

export const getBills = async (): Promise<Bill[]> => {
  const bills = await get<Bill>("bills");
  return bills.map((b) => ({
    ...b,
    invoiceDate: (b.invoiceDate as any).toDate(),
  }));
};

export const getRates = async (): Promise<RateType[]> => {
  const rates = await get<RateType>("goldSilverRates");
  return rates.map((r) => ({
    ...r,
    date: (r.date as any).toDate(),
  }));
};

export const getItems = async (
  category: ItemCategoryType
): Promise<ItemType[]> => {
  return get<ItemType>(category);
};

const increaseCounterValue = async () => {
  const counterRef = db.collection("counters").doc("invoice-counter");
  counterRef.update({ count: increment });
};

const getCounterValue = async (): Promise<number> => {
  const counterRef = db.collection("counters").doc("invoice-counter");
  const doc = await counterRef.get();
  const counterData = doc.data();
  return counterData?.count;
};

export const deleteBill = async (id: string): Promise<void> => {
  return deleteFromDB("bills", id);
};

export const editBill = async (bill: Bill): Promise<void> => {
  return edit("bills", bill);
};

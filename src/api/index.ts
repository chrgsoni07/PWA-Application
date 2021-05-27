import { Bill } from "component/Bills/types";
import { CustomerType } from "component/Customers/types";
import { RateType } from "component/Rates/types";
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
const increment = firebase.firestore.FieldValue.increment(1);

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
      // console.log(customer.id);
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

export const getBills = async (): Promise<Bill[]> => {
  const collection = db.collection("bills");

  return collection.get().then((querySnapshot) => {
    const allBills: Bill[] = [];
    querySnapshot.forEach((bill) => {
      const billData = bill.data();
      allBills.push({
        id: bill.id,
        billNo: billData.billNo,
        invoiceDate: billData.invoiceDate,
        newItems: billData.newItems,
        customer: billData.customer,
        oldItems: billData.oldItems,
        billDetail: billData.billDetail,
      });
    });
    return allBills;
  });
};

export const getRates = async (): Promise<RateType[]> => {
  const collection = db.collection("goldSilverRates");

  return collection.get().then((querySnapshot) => {
    const allRates: RateType[] = [];
    querySnapshot.forEach((rate) => {
      const rateData = rate.data();
      allRates.push({
        silverRate: rateData.silverRate,
        goldRate: rateData.goldRate,
        date: rateData.date,
        id: rate.id,
      });
    });
    return allRates;
  });
};

export const increaseCounterValue = async () => {
  const counterRef = db.collection("counters").doc("invoice-counter");
  counterRef.update({ count: increment });
};

export const getCounterValue = async (): Promise<number> => {
  const counterRef = db.collection("counters").doc("invoice-counter");
  const doc = await counterRef.get();
  const counterData = doc.data();
  return counterData?.count;
};

import { CollectionNameType, ItemCategoryType } from "api/types";
import { Bill } from "component/Bills/types";
import { CustomerType } from "component/Customers/types";
import { ItemType } from "component/Items/types";
import { RateType } from "component/Rates/types";
import { bills } from "./billdata";

export const getBills = async (): Promise<Bill[]> => {
  return bills;
};

export const getCustomers = async (): Promise<CustomerType[]> => {
  return [
    {
      id: "1",
      name: "Ramadhir",
      mobile: "9009009000",
      place: "Keer kheda",
      billsId: ["bill01"],
    },
  ];
};

export const getRates = async (): Promise<RateType[]> => {
  return [{ date: new Date(), goldRate: 45000, id: "test", silverRate: 75000 }];
};
export const getItems = async (
  category: ItemCategoryType
): Promise<ItemType[]> => {
  return [{ id: "", name: "testname" }];
};
export const save = async <T>(
  collectionName: CollectionNameType,
  data: T
): Promise<T> => {
  return { ...data, id: "newSavedId" };
};
export const get = async <T>(
  collectionName: CollectionNameType
): Promise<T[]> => {
  return [];
};
export const edit = async <T>(
  collectionName: CollectionNameType,
  data: T & { id?: string }
): Promise<void> => {};
export const deleteFromDB = async (
  collectionName: CollectionNameType,
  id: string
): Promise<void> => {};
export const saveBill = jest.fn();

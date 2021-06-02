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
      address: "kuda ke pache",
      mobile: "9009009000",
      place: "Keer kheda",
    },
  ];
};

export const getRates = async (): Promise<RateType[]> => {
  return [
    { date: "20/10/2010", goldRate: "45000", id: "test", silverRate: "75000" },
  ];
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
  return {} as T;
};
export const get = async <T>(
  collectionName: CollectionNameType
): Promise<T[]> => {
  return [];
};
export const edit = jest.fn();
export const deleteFromDB = jest.fn();
export const saveBill = jest.fn();

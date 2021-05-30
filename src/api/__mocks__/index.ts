import { Bill } from "component/Bills/types";
import { CustomerType } from "component/Customers/types";
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
  return [];
};

export const save = async <T>(collection: any, data: any): Promise<T> => {
  return {} as T;
};

export const saveBill = jest.fn();

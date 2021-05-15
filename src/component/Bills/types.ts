import { CustomerType } from "component/Customers/types";

export type OldItem = {
  item: string;
  grossWeight: number;
  purity: number;
  netWeight: number;
  rate: number;
  amount: number;
  type: string;
};
export type NewItem = {
  item: string;
  type: string;
  weight: number;
  rate: number;
  makingCharges: number;
  amount: number;
  otherCharges: number;
};
export type BillDetails = {
  newTotal: number;
  oldTotal: number;
  oldNewDifference: number;
  amountPayable: number;
  discount: number;
  paid: number;
  due: number;
};
export type Bill = {
  billNo: number;
  invoiceDate: string;
  customer: CustomerType | undefined;
  newItems: NewItem[];
  oldItems: OldItem[];
  billDetail: BillDetails;
};

import { CustomerType } from "component/Customers/types";

type CommonItemType = {
  item: string;
  type: "gold" | "silver" | "fixed";
  rate: number;
  amount: number;
};
export type OldItem = CommonItemType & {
  grossWeight: number;
  purity: number;
  netWeight: number;
};
export type NewItem = CommonItemType & {
  weight: number;
  makingCharges: number;
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
  id: string;
  billNo: number;
  invoiceDate: Date;
  customer: CustomerType;
  newItems: NewItem[];
  oldItems: OldItem[];
  billDetail: BillDetails;
};

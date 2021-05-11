import { CustomerType } from "component/Customers/types";
import { BillDetails } from "./BillDetails";
import { NewItem } from "./NetItem";
import { OldItem } from "./OldItem";

export type Bill = {
  billNo: number;
  invoiceDate: string;
  customer: CustomerType;
  newItems: NewItem[];
  oldItems: OldItem[];
  billDetail: BillDetails;
};

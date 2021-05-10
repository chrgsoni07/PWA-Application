export type BillDetails = {
  customerId: number;
  newTotal: number;
  oldTotal: number;
  oldNewDifference: number;
  amountPayable: number;
  discount: number;
  paid: number;
  due: number;
};

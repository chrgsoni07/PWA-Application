import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sum } from "utils/number.utils";
import { BillDetails, NewItem, OldItem } from "../types";

const calculateNewItemAmount = ({
  type,
  weight,
  makingCharges,
  rate,
  otherCharges,
}: NewItem) => {
  let amount = 0;
  if (type === "gold") {
    amount = weight * (rate / 10) + weight * makingCharges + otherCharges;
  } else if (type === "silver") {
    amount = weight * (rate / 1000) + otherCharges;
  } else if (type === "silverPerPiece") {
    amount = otherCharges;
  }

  return Math.round(amount);
};
const calculateOldItemAmount = ({
  type,
  grossWeight,
  purity,
  rate,
}: OldItem) => {
  let amount = 0;
  if (type === "gold") {
    amount = grossWeight * (purity / 100) * (rate / 10);
  } else if (type === "silver") {
    amount = grossWeight * (rate / 1000);
  }

  return Math.round(amount);
};

type State = {
  newItems: NewItem[];
  oldItems: OldItem[];
  billDetails: BillDetails;
};
const slice = createSlice({
  name: "newBill",
  initialState: {} as State,
  reducers: {
    addNewItem: (state) => {
      state.newItems.push({ type: "gold" } as NewItem);
    },
    deleteNewItem: ({ newItems }, { payload }: PayloadAction<number>) => {
      newItems.splice(payload, 1);
    },
    updateNewItemField: (
      { newItems },
      {
        payload: { field, value, index },
      }: PayloadAction<{ index: number; value: string; field: string }>
    ) => {
      (newItems[index] as any)[field] = value;
      (newItems[index] as any)["amount"] = calculateNewItemAmount(
        newItems[index]
      );
    },
    addOldItem: (state) => {
      state.oldItems.push({ type: "gold" } as OldItem);
    },
    deleteOldItem: ({ oldItems }, { payload }: PayloadAction<number>) => {
      oldItems.splice(payload, 1);
    },
    updateOldItemField: (
      { oldItems },
      {
        payload: { field, value, index },
      }: PayloadAction<{ index: number; value: string; field: string }>
    ) => {
      const oldItem = oldItems[index];
      (oldItem as any)[field] = value;

      const { grossWeight, purity } = oldItem;

      (oldItem as any)["netWeight"] = (grossWeight * purity) / 100;
      (oldItem as any)["amount"] = calculateOldItemAmount(oldItem);
    },
    amountPaidChanged: (
      { billDetails },
      { payload }: PayloadAction<number>
    ) => {
      billDetails.paid = payload;
      billDetails.due = billDetails.amountPayable - billDetails.paid;
    },
    discountChanged: ({ billDetails }, { payload }: PayloadAction<number>) => {
      billDetails.discount = payload;
      billDetails.amountPayable =
        billDetails.oldNewDifference - billDetails.discount;
    },
    updateTotalAmount: ({ newItems, oldItems, billDetails }) => {
      const newTotal = sum(newItems);
      const oldTotal = sum(oldItems);
      const oldNewDifference = newTotal - oldTotal;
      billDetails.oldNewDifference = oldNewDifference;
      billDetails.newTotal = newTotal;
      billDetails.oldTotal = oldTotal;
      billDetails.amountPayable = oldNewDifference > 0 ? oldNewDifference : 0;
    },
  },
});

export const {
  addNewItem,
  deleteNewItem,
  updateNewItemField,
  addOldItem,
  deleteOldItem,
  updateOldItemField,
  amountPaidChanged,
  discountChanged,
  updateTotalAmount,
} = slice.actions;
export default slice.reducer;
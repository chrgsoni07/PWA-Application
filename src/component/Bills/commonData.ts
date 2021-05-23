export const itemType = [
  { label: "Gold", value: "gold" },
  { label: "Silver", value: "silver" },
  { label: "Silver per piece", value: "silverPerPiece" },
];

export const defaultBill = () => ({
  id: "",
  billNo: 101,
  invoiceDate: new Date(),
  customer: undefined,
  newItems: [],
  oldItems: [],
});

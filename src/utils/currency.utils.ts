export const amountBodyTemplate = (rowData: any) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rowData.amount);
};

export const formatCurrency = (value: any) => {
  return value.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
};

export const amountBodyTemplate = (rowData: any) => {
  return formatCurrencyNoFraction(rowData.amount);
};

export const formatCurrency = (value: any) => {
  return value.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
};

export const formatCurrencyNoFraction = (value: number | undefined) => {
  if (!value) {
    return value;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(value);
};

export const netWeightTemplate = (rowData: any) => {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 3,
  }).format(rowData.netWeight);
};

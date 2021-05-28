export const amountBodyTemplate = (rowData: any) => {
  return formatCurrencyNoFraction(rowData.amount);
};

export const formatCurrency = (value: any) => {
  if (!value || isNaN(value)) {
    return "";
  }
  return value?.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
};

export const formatCurrencyNoFraction = (value: number | undefined) => {
  if (!value || isNaN(value)) {
    return "";
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(value);
};

export const netWeightTemplate = ({ netWeight }: any) => {
  if (!netWeight || isNaN(netWeight)) {
    return "";
  }
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 3,
  }).format(netWeight);
};

export const weightTemplate = ({ weight }: any) => {
  return isValidValue(weight) ? "" : `${weight} gram`;
};

export const grossWeightTemplate = ({ grossWeight }: any) => {
  return isValidValue(grossWeight) ? "" : `${grossWeight} gram`;
};

export const viewNetWeightTemplate = ({ netWeight }: any) => {
  return isValidValue(netWeight) ? "" : `${netWeight} gram`;
};

export const makingChargeTemplate = ({ makingCharges }: any) => {
  return isValidValue(makingCharges) ? "" : `${makingCharges}/gram`;
};

export const purityTemplate = ({ purity }: any) => {
  return isValidValue(purity) ? "" : `${purity}%`;
};

const isValidValue = (value: any) => {
  if (value === undefined || value === null || !value || isNaN(value)) {
    return true;
  } else {
    return false;
  }
};

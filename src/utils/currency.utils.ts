export const amountBodyTemplate = (rowData: any) =>
  formatCurrencyNoFraction(rowData.amount);

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

export const weightTemplate = ({ weight }: any) =>
  isInvalid(weight) ? "-" : `${weight} ग्राम `;

export const grossWeightTemplate = ({ grossWeight }: any) =>
  isInvalid(grossWeight) ? "-" : `${grossWeight} ग्राम `;

export const viewNetWeightTemplate = ({ netWeight }: any) =>
  isInvalid(netWeight) ? "-" : `${netWeight} ग्राम `;

export const makingChargeTemplate = ({ makingCharges }: any) =>
  isInvalid(makingCharges) ? "-" : `${makingCharges}/ग्राम `;

export const purityTemplate = ({ purity }: any) =>
  isInvalid(purity) ? "-" : `${purity}%`;

const isInvalid = (value: any) => value === null || !value || isNaN(value);

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
  return isInvalid(weight) ? "-" : `${weight} ग्राम `;
};

export const grossWeightTemplate = ({ grossWeight }: any) => {
  return isInvalid(grossWeight) ? "-" : `${grossWeight} ग्राम `;
};

export const viewNetWeightTemplate = ({ netWeight }: any) => {
  return isInvalid(netWeight) ? "-" : `${netWeight} ग्राम `;
};

export const makingChargeTemplate = ({ makingCharges }: any) => {
  return isInvalid(makingCharges) ? "-" : `${makingCharges}/ग्राम `;
};

export const purityTemplate = ({ purity }: any) => {
  return isInvalid(purity) ? "-" : `${purity}%`;
};

const isInvalid = (value: any) => {
  return value === null || !value || isNaN(value);
};

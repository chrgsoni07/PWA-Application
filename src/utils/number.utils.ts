export const sum = (items: { amount: number }[]): number =>
  Math.round(items.reduce((acc, item) => acc + item.amount, 0));

export const defaultNum = (num: number): number | undefined =>
  !num || num === 0 ? undefined : num;

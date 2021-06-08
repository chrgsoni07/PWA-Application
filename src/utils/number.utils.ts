export const sum = (items: { amount: number }[] = []): number =>
  Math.round(
    items
      .filter((item) => !isNaN(item.amount))
      .reduce((acc, item) => acc + item.amount, 0)
  );

export const defaultNum = (num: number): number | undefined => num || undefined;

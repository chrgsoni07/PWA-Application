export const updateList = <T extends { id: string }>(items: T[], item: T) => {
  const newItems = [...items];
  const idx = newItems.findIndex((i) => i.id === item?.id);
  newItems[idx] = item;
  return newItems;
};

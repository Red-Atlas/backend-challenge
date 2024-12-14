export type TSortingType = {
  sortBy: string;
  sortOrder: string;
}

export function applySorting(
  { sortBy, sortOrder }: TSortingType
) {
  const by = String(sortBy) || "createdAt";
  const order = sortOrder === "ASC" ? "ASC" : "DESC";
  return `property.${by}, ${order}`
}

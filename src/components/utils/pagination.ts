export function getPaginationParams(perPage: number, perPageLimit: number) {
  const page = Number(perPage) || 1;
  const limit = Number(perPageLimit) || 10;
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}

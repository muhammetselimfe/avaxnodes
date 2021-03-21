export const prepareNewSorting = (sorting, field) => {
  const newSorting = sorting.includes(field)
    ? (sorting[0] === '-'
      ? `+${field}`
      : `-${field}`)
    : `-${field}`
  return newSorting
}

export const prepareNewSorting = (sorting, field) => {
  const newSorting = sorting.includes(field)
    ? (sorting.includes(`-${field}`)
      ? sorting.replace(`-${field}`, `+${field}`)
      : sorting.replace(`+${field}`, `-${field}`))
    : `${sorting},-${field}`
  return newSorting
}

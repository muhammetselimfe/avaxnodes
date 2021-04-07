module.exports = {
  defaultRouteParams: {
    common: {
      page: 1,
      perPage: 25,
    },
    home: {
      filter: '',
      sorting: '-fee',
      freeSpace: 0,
    },
    node: {
      sorting: '-sorted-on',
    }
  }
}

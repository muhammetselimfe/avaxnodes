import { getSortMethod } from '../../../../lib/getSortMethod'
import { getPreparedValidators } from '../../../../lib/preparedValidators'

const sortingMap = {
  fee: 'delegationFee',
  delegators: 'delegators.pagination.count',
  ['max-yield']: 'maxYield',
  ['total-stake']: 'totalStacked',
  ['free-space']: 'leftToStack',
  ['started-on']: 'startTime',
  ['time-left']: 'endTime',
  ['node-id']: 'nodeID',
  ['country']: 'country_code',
}

export default async (parent, args, context, info) => {
  try {
    const page = Math.abs(args.filter.page) || 1
    const perPage = Math.min(Math.max(Math.abs(args.filter.perPage), 1), 100)

    const preparedValidators = await getPreparedValidators()

    let currentValidators = preparedValidators
    if (args.filter.filter) {
      currentValidators = currentValidators.filter(item => item.nodeID.includes(args.filter.filter))
    }
    if (args.filter.freeSpace) {
      currentValidators = currentValidators
        .filter(item => {
          return item.leftToStackPercent > parseFloat(args.filter.freeSpace)
        })
    }

    const count = currentValidators.length
    const sorting = !args.filter.sorting || !sortingMap[`${args.filter.sorting}`.substring(1)]
      ? '-fee'
      : args.filter.sorting

    const sortedCurrentValidators = currentValidators.slice().sort(getSortMethod(sortingMap)(...sorting.split(',')))

    const currentValidatorsPageItems = sortedCurrentValidators.slice((page - 1) * perPage, page * perPage)

    return {
      items: currentValidatorsPageItems,
      pagination: {
        page,
        perPage,
        count,
      },
    }
  } catch (error) {
    console.log('!!!!!!!!!!!', error)
    throw error;
  }
}

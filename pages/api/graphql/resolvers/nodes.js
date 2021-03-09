import get from 'lodash/get'
import isNaN from 'lodash/isNaN'

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

function getSortMethod(){
  var _args = Array.prototype.slice.call(arguments);
  return function(a, b) {
    for (var x in _args) {
      const field = get(sortingMap, _args[x].substring(1))
      if (!field) {
        continue
      }
      var ax = get(a, field);
      var bx = get(b, field);
      var cx;

      ax = typeof ax === "string"
        ? (isNaN(new Number(ax))
          ? ax.toLowerCase()
          : ax / 1)
        : ax / 1;
      bx = typeof bx === "string"
        ? (isNaN(new Number(bx))
          ? bx.toLowerCase()
          : bx / 1)
        : bx / 1;

      if (_args[x].substring(0,1) === "-") {
        cx = ax;
        ax = bx;
        bx = cx;
      }
      if (ax != bx) {
        return ax < bx ? -1 : 1;
      }
    }
  }
}

export default async (parent, args, context, info) => {
  try {
    const page = Math.abs(args.filter.page) || 1
    const perPage = Math.min(Math.max(Math.abs(args.filter.perPage), 1), 100)

    const preparedValidators = await getPreparedValidators()

    let currentValidators = preparedValidators
    if (args.filter.filter) {
      currentValidators = validators.filter(item => item.nodeID.includes(args.filter.filter))
    }
    if (args.filter.freeSpace) {
      currentValidators = currentValidators
        .filter(item => {
          return item.leftToStackPercent > parseFloat(args.filter.freeSpace)
        })
    }

    const count = currentValidators.length
    const sorting = args.filter.sorting || '-fee'

    const sortedCurrentValidators = currentValidators.slice().sort(getSortMethod(...sorting.split(',')))

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

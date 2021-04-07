import get from 'lodash/get'
import { defaultRouteParams } from '../../../../constants'
import { getSortMethod } from '../../../../lib/getSortMethod'
import { getPreparedValidators } from '../../../../lib/preparedValidators'

const sortingMap = {
  address: 'rewardOwner.addresses[0]',
  delegated: 'stakeAmount',
  reward: 'potentialReward',
  ['started-on']: 'startTime',
  ['time-left']: 'endTime',
}

export default async (parent, args, context, info) => {
  try {
    const validators = await getPreparedValidators()

    const node = validators
      .find(item => item.nodeID === args.filter.nodeID)

    const delegators = get(node, 'delegators.itemsAll') || []

    const sorting = !args.filter.sorting || !sortingMap[`${args.filter.sorting}`.substring(1)]
      ? defaultRouteParams.node.sorting
      : args.filter.sorting

    const sortedCurrentValidators = delegators.slice().sort(getSortMethod(sortingMap)(...sorting.split(',')))

    const page = Math.abs(args.filter.page) || defaultRouteParams.common.page
    const perPage = Math.min(Math.max(Math.abs(args.filter.perPage), 1), 100) || defaultRouteParams.common.perPage

    return {
      ...node,
      delegators: {
        ...node.delegators,
        items: sortedCurrentValidators.slice((page - 1) * perPage, page * perPage),
        pagination: {
          ...node.delegators.pagination,
          page,
          perPage,
        },
      },
    };
  } catch (error) {
    throw error;
  }
}

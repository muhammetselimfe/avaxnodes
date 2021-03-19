import get from 'lodash/get'
import { getPreparedValidators } from '../../../../lib/preparedValidators'

export default async (parent, args, context, info) => {
  try {
    const validators = await getPreparedValidators()

    const node = validators
      .find(item => item.nodeID === args.filter.nodeID)

    const delegators = get(node, 'delegators.itemsAll') || []

    const page = Math.abs(args.filter.page) || 1
    const perPage = Math.min(Math.max(Math.abs(args.filter.perPage), 1), 100)

    return {
      ...node,
      delegators: {
        ...node.delegators,
        items: delegators.slice((page - 1) * perPage, page * perPage),
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

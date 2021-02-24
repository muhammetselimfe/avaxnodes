import Peer from '../../../../models/peer'
import { getAllValidators } from "../../../../lib/api"

export default async (parent, args, context, info) => {
  try {
    const validators = await getAllValidators()

    const node = validators
      .find(item => item.nodeID === args.filter.nodeID)

    const peer = await Peer.findOne({ nodeID: node.nodeID })

    const delegators = node.delegators || []

    const page = Math.abs(args.filter.page) || 1
    const perPage = Math.min(Math.max(Math.abs(args.filter.perPage), 1), 100)
    const count = delegators.length

    return {
      ...node,
      delegators: {
        items: delegators.slice((page - 1) * perPage, page * perPage),
        pagination: {
          page,
          perPage,
          count,
        },
        totalStaked: delegators
          .map(delegator => delegator.stakeAmount / 1000000000)
          .reduce((result, current) => result + current, 0)
      },
      country_code: peer.country_code,
      country_flag: peer.country_flag,
      latitude: peer.latitude,
      longitude: peer.longitude,
    };
  } catch (error) {
    throw error;
  }
}

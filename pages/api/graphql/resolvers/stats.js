import {
  getAllValidators,
  getCurrentSupply,
  getLastBlockHeight,
  getTotalStake,
} from "../../../../lib/api"

export default async (parent, args, context, info) => {
  try {
    const validators = await getAllValidators()
    const totalDelegations = validators
      .map(item => (item.delegators || []).length)
      .reduce((result, current) => result + current, 0)
    const totalBlocks = await getLastBlockHeight()
    const currentSupply = await getCurrentSupply()
    const totalStake = await getTotalStake()
    const totalParticipation = ((totalStake / 1000000000) / (currentSupply / 1000000000)) * 100

    return {
      totalNodes: validators.length,
      totalTransactions: 0,
      totalProviders: 0,
      totalDelegations,
      totalBlocks,
      totalParticipation,
    }
  } catch (error) {
    console.log('!!!!!!!!!!!', error)
    throw error;
  }
}

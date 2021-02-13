import { getAllValidators } from "../../../../lib/api"

export default async (parent, args, context, info) => {
  try {
    const validators = await getAllValidators()

    let currentValidators = validators
    if (args.filter.filter) {
      currentValidators = validators.filter(item => item.nodeID.includes(args.filter.filter))
    }

    const page = Math.abs(args.filter.page) || 1
    const perPage = Math.min(Math.max(Math.abs(args.filter.perPage), 1), 100)
    const count = currentValidators.length

    return {
      items: currentValidators.slice((page - 1) * perPage, page * perPage).map((item, index) => {
        let isPartner = false
        let isSponsored = false
        if (index === 0) {
          isPartner = true
          isSponsored = true

        }
        if (index === 1) {
          isPartner = true
        }
        const delegators = item.delegators || []
        return {
          ...item,
          isPartner,
          isSponsored,
          delegators: {
            items: delegators.slice((page - 1) * perPage, page * perPage),
            pagination: {
              page,
              perPage,
              count: delegators.length
            },
            totalStaked: delegators
              .map(delegator => delegator.stakeAmount / 1000000000)
              .reduce((result, current) => result + current, 0)
          }
        }
      }),
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

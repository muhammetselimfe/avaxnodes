import axios from "axios";
import { setupCache, serializeQuery } from 'axios-cache-adapter'

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: 60 * 60 * 1000,
  invalidate: async (config, request) => {
    const method = request.method.toLowerCase()

    if (method !== 'get' && method !== 'post') {
      await config.store.removeItem(config.uuid)
    }
  },
})

// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
  adapter: cache.adapter
})

const getAllValidators = async () => {
  const payload = {
    "jsonrpc": "2.0",
    "method": "platform.getCurrentValidators",
    "params": {
      "subnetID": "11111111111111111111111111111111LpoYY"
    },
    "id": 1
  }

  const validators = await api.post(`https://api.avax.network/ext/P?method=platform.getCurrentValidators`, payload, {
    cache: {
      key: "platform.getCurrentValidators"
    }
  })

  const allItems = validators.data.result.validators

  return allItems
}

const getLastBlockHeight = async () => {
  const payload = {
    "jsonrpc": "2.0",
    "method": "platform.getHeight",
    "params": {},
    "id": 1
  }

  const result = await api.post(`https://api.avax.network/ext/P?method=platform.getHeight`, payload, {
    cache: {
      key: "platform.getHeight"
    }
  })

  const blockHeight = result.data.result.height

  return blockHeight
}

const getCurrentSupply = async () => {
  const payload = {
    "jsonrpc": "2.0",
    "method": "platform.getCurrentSupply",
    "params": {},
    "id": 1
  }

  const result = await api.post(`https://api.avax.network/ext/P?method=platform.getCurrentSupply`, payload, {
    cache: {
      key: "platform.getCurrentSupply"
    }
  })

  const supply = result.data.result.supply

  return supply
}

const getTotalStake = async () => {
  const payload = {
    "jsonrpc": "2.0",
    "method": "platform.getTotalStake",
    "params": {},
    "id": 1
  }

  const result = await api.post(`https://api.avax.network/ext/P?method=platform.getTotalStake`, payload, {
    cache: {
      key: "platform.getTotalStake"
    }
  })

  const stake = result.data.result.stake

  return stake
}

// const getTransactionsCount = async () => {
//   const payload = {
//     "jsonrpc": "2.0",
//     "method": "platform.getHeight",
//     "params": {},
//     "id": 1
//   }

//   const result = await api.post(`https://api.avax.network/ext/P?method=platform.getHeight`, payload, {
//     cache: {
//       key: "platform.getHeight"
//     }
//   })

//   console.log('getLastBlockHeight', result)
//   const blockHeight = result.data.result.height

//   return blockHeight
// }

export const resolvers = {
  Query: {
    stats: async (parent, args, context, info) => {
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
    },
    nodes: async (parent, args, context, info) => {
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
        throw error;
      }
    },
    node: async (parent, args, context, info) => {
      try {
        const validators = await getAllValidators()

        const node = validators
          .find(item => item.nodeID === args.filter.nodeID)

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
          }
        };
      } catch (error) {
        throw error;
      }
    }
  }
};

import axios from "axios";
import { setupCache } from 'axios-cache-adapter'

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

  const validators = await api.post(`https://api.avax.network/ext/P`, payload)

  const allItems = validators.data.result.validators

  return allItems
}

export const resolvers = {
  Query: {
    stats: async (parent, args, context, info) => {
      const validators = await getAllValidators()
      return {
        totalNodes: validators.length,
        totalTransactions: 0,
        totalProviders: 0,
        totalDelegations: 0,
        totalBlocks: 0,
        totalParticipation: 0,
      }
    },
    nodes: async (parent, args, context, info) => {
      try {
        console.log({args})

        const validators = await getAllValidators()

        const page = Math.abs(args.filter.page) || 1
        const perPage = Math.min(Math.max(Math.abs(args.filter.perPage), 1), 100)
        const count = validators.length

        console.log((page - 1) * perPage, page * perPage)

        return {
          items: validators.slice((page - 1) * perPage, page * perPage).map((item, index) => {
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
      console.log({args})
      try {
        const validators = await getAllValidators()

        const node = validators
          .find(item => item.nodeID === args.filter.nodeID)

        const delegators = node.delegators || []

        const page = Math.abs(args.filter.page) || 1
        const perPage = Math.min(Math.max(Math.abs(args.filter.perPage), 1), 100)
        const count = delegators.length

        console.log((page - 1) * perPage, page * perPage)

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

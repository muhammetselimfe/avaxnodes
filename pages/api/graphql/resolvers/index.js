import axios from "axios";
import { setupCache } from 'axios-cache-adapter'

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: 60 * 60 * 1000
})

// Create `axios` instance passing the newly created `cache.adapter`
const api = axios.create({
  adapter: cache.adapter
})

export const resolvers = {
  Query: {
    nodes: async (parent, args, context, info) => {
      try {
        console.log({args})

        const payload = {
          "jsonrpc": "2.0",
          "method": "platform.getCurrentValidators",
          "params": {
            "subnetID": "11111111111111111111111111111111LpoYY"
          },
          "id": 1
        }

        const validators = await api.post(`https://api.avax.network/ext/P`, payload)

        // page: Int
        // perPage: Int
        // totalCount: Int

        const allItems = validators.data.result.validators

        const page = Math.abs(args.filter.page) || 1
        const perPage = Math.min(Math.max(Math.abs(args.filter.perPage), 1), 100)
        const count = validators.data.result.validators.length

        console.log((page - 1) * perPage, page * perPage)

        return {
          items: allItems.slice((page - 1) * perPage, page * perPage).map((item, index) => {
            if (index === 0) {
              return {
                ...item,
                isPartner: true,
                isSponsored: true
              }
            }
            if (index === 1) {
              return {
                ...item,
                isPartner: true,
                isSponsored: false
              }
            }
            return {
              ...item,
              isPartner: false,
              isSponsored: false
            }
          }),
          pagination: {
            page,
            perPage,
            count,
          },
        }
        // .map((item) => {
        //   return item
        // });
      } catch (error) {
        throw error;
      }
    },
    node: async (parent, args, context, info) => {
      console.log({args})
      try {

        const payload = {
          "jsonrpc":"2.0",
          "method":"platform.getCurrentValidators",
          "params": {
            "subnetID":"11111111111111111111111111111111LpoYY"
          },
          "id":1
        }

        const validators = await api.post(`https://api.avax.network/ext/P`, payload)

        console.log(
          validators.data.result.validators.length,
          validators.data.result.validators[0]
        )
        const node = validators.data.result.validators
          // .map((item) => {
          //   return item
          // })
          .find(item => item.nodeID === args.nodeID)

        return node;
      } catch (error) {
        throw error;
      }
    }
  }
};

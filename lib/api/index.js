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

export const getAllValidators = async () => {
  const payload = {
    "jsonrpc": "2.0",
    "method": "platform.getCurrentValidators",
    "params": {
      "subnetID": "11111111111111111111111111111111LpoYY"
    },
    "id": 1
  }

  let validators
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA) {
    const fixture = require('./fixtures/platform.getCurrentValidators.json')
    validators = {
      data: fixture,
    }
  } else {
    validators = await api.post(`https://api.avax.network/ext/P?method=platform.getCurrentValidators`, payload, {
      cache: {
        key: "platform.getCurrentValidators"
      }
    })
  }



  const allItems = validators.data.result.validators

  return allItems
}

export const getLastBlockHeight = async () => {
  const payload = {
    "jsonrpc": "2.0",
    "method": "platform.getHeight",
    "params": {},
    "id": 1
  }

  let result
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA) {
    const fixture = require('./fixtures/platform.getHeight.json')
    result = {
      data: fixture,
    }
  } else {
    result = await api.post(`https://api.avax.network/ext/P?method=platform.getHeight`, payload, {
      cache: {
        key: "platform.getHeight"
      }
    })
  }

  const blockHeight = result.data.result.height

  return blockHeight
}

export const getCurrentSupply = async () => {
  const payload = {
    "jsonrpc": "2.0",
    "method": "platform.getCurrentSupply",
    "params": {},
    "id": 1
  }

  let result
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA) {
    const fixture = require('./fixtures/platform.getCurrentSupply.json')
    result = {
      data: fixture,
    }
  } else {
    result = await api.post(`https://api.avax.network/ext/P?method=platform.getCurrentSupply`, payload, {
      cache: {
        key: "platform.getCurrentSupply"
      }
    })
  }

  const supply = result.data.result.supply

  return supply
}

export const getTotalStake = async () => {
  const payload = {
    "jsonrpc": "2.0",
    "method": "platform.getTotalStake",
    "params": {},
    "id": 1
  }

  let result
  if (process.env.NEXT_PUBLIC_USE_MOCK_DATA) {
    const fixture = require('./fixtures/platform.getTotalStake.json')
    result = {
      data: fixture,
    }
  } else {
    result = await api.post(`https://api.avax.network/ext/P?method=platform.getTotalStake`, payload, {
      cache: {
        key: "platform.getTotalStake"
      }
    })
  }

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

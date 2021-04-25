const Stats = require('../models/stats')

const {
  getAllValidators,
  getCurrentSupply,
  getLastBlockHeight,
  getTotalStake,
  getTransactionsCount,
} = require('../lib/api')

const debug = require('debug')('app:jobs:check-stats')

const handler = agenda => async job => {
  debug()

  let validators = []
  try {
    validators = await getAllValidators()
  } catch (e) {
    debug(e)
  }

  const totalDelegations = validators
    .map(item => (item.delegators || []).length)
    .reduce((result, current) => result + current, 0)

  let totalBlocks = 0
  try {
    totalBlocks = await getLastBlockHeight()
  } catch (e) {
    debug(e)
  }

  let currentSupply = 0
  try {
    currentSupply = await getCurrentSupply()
  } catch (e) {
    debug(e)
  }

  let totalStake = 0
  try {
    totalStake = await getTotalStake()
  } catch (e) {
    debug(e)
  }

  let transactionsCount = 0
  try {
    transactionsCount = await getTransactionsCount()
  } catch (e) {
    debug(e)
  }

  const totalParticipation = ((totalStake / 1000000000) / (currentSupply / 1000000000)) * 100

  try {
    await Stats.findOneAndUpdate(
      { key: 'stats' },
      {
        totalNodes: validators.length,
        totalTransactions: transactionsCount,
        totalProviders: 0,
        totalDelegations: totalDelegations,
        totalBlocks: totalBlocks,
        totalParticipation: totalParticipation,
      },
      { upsert: true }
    )
  } catch (e) {
    debug(e)
  }
}

module.exports = {
  handler: agenda => handler(agenda),
  job: agenda => agenda.define('check stats', handler(agenda))
}

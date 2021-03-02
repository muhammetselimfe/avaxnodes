import Peer from '../../../../models/peer'
import { getAllValidators } from "../../../../lib/api"
import get from 'lodash/get'
import toNumber from 'lodash/toNumber'
import isNaN from 'lodash/isNaN'

import NodeCache from 'node-cache'
const myCache = new NodeCache({ stdTTL: 300 });

const sortingMap = {
  fee: 'delegationFee',
  delegators: 'delegators.pagination.count',
  ['max-yield']: 'maxYield',
  ['total-stake']: 'totalStacked',
  ['free-space']: 'leftToStack',
  ['started-on']: 'startTime',
  ['time-left']: 'endTime',
  ['node-id']: 'nodeID',
  ['country']: 'country_code',
}

function getSortMethod(){
  var _args = Array.prototype.slice.call(arguments);
  return function(a, b) {
    for (var x in _args) {
      const field = get(sortingMap, _args[x].substring(1))
      if (!field) {
        continue
      }
      var ax = get(a, field);
      var bx = get(b, field);
      var cx;

      ax = typeof ax === "string"
        ? (isNaN(new Number(ax))
          ? ax.toLowerCase()
          : ax / 1)
        : ax / 1;
      bx = typeof bx === "string"
        ? (isNaN(new Number(bx))
          ? bx.toLowerCase()
          : bx / 1)
        : bx / 1;

      if (_args[x].substring(0,1) === "-") {
        cx = ax;
        ax = bx;
        bx = cx;
      }
      if (ax != bx) {
        return ax < bx ? -1 : 1;
      }
    }
  }
}

export default async (parent, args, context, info) => {
  try {
    const page = Math.abs(args.filter.page) || 1
    const perPage = Math.min(Math.max(Math.abs(args.filter.perPage), 1), 100)

    const validators = await getAllValidators()

    let preparedValidators = myCache.get('preparedValidators');
    if (preparedValidators == undefined ) {
      const peers = await Peer
        .find()
        .lean()
        .exec()

      const peersHash = peers
        .reduce((result, current) => ({
          ...result,
          [current.nodeID]: current,
        }), {})
        preparedValidators = validators
        .map((item, index) => {
          let isPartner = false
          let isSponsored = false
          // if (index === 0) {
          //   isPartner = true
          //   isSponsored = true

          // }
          // if (index === 1) {
          //   isPartner = true
          // }
          const delegators = item.delegators || []
          const peer = peersHash[item.nodeID] || {}

          const delegatorsStaked =  delegators
            .map(delegator => delegator.stakeAmount / 1000000000)
            .reduce((result, current) => result + current, 0)
          const delegatorsTotalStaked = parseFloat(delegatorsStaked)
          const totalStacked = item.stakeAmount / 1000000000 + delegatorsTotalStaked
          const maxStaked = Math.min(3000000, (item.stakeAmount / 1000000000) * 5)
          const leftToStack = maxStaked - totalStacked
          const leftToStackPercent = 100 - (totalStacked * 100 / maxStaked)
          const stackedPercent = totalStacked * 100 / maxStaked

          const timeLeftRate = (item.endTime - Date.now() / 1000) / (item.endTime - item.startTime)
          // const timeLeftRatePercent = 100 - timeLeftRate * 100
          const delegationFeeRate = 1 - item.delegationFee / 100
          const potentialRewardPercent = (item.potentialReward * 100 / (item.stakeAmount)) * timeLeftRate * delegationFeeRate

          // const daysLeft = moment(item.endTime * 1000).diff(moment(), 'days')
          // const hoursLeft = moment(item.endTime * 1000).diff(moment(), 'hours')
          // const minutesLeft = moment(item.endTime * 1000).diff(moment(), 'minutes')

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
              totalStaked: delegatorsTotalStaked
            },
            country_code: peer.country_code,
            country_flag: peer.country_flag,
            latitude: peer.latitude,
            longitude: peer.longitude,
            maxYield: potentialRewardPercent,
            totalStacked,
            leftToStack,
            stackedPercent,
            leftToStackPercent,
          }
        })
      myCache.set('preparedValidators', preparedValidators)
    }

    let currentValidators = preparedValidators
    if (args.filter.filter) {
      currentValidators = validators.filter(item => item.nodeID.includes(args.filter.filter))
    }
    if (args.filter.freeSpace) {
      currentValidators = currentValidators
        .filter(item => {
          return item.leftToStackPercent > parseFloat(args.filter.freeSpace)
        })
    }

    const count = currentValidators.length
    const sorting = args.filter.sorting || '-fee'

    const sortedCurrentValidators = currentValidators.slice().sort(getSortMethod(...sorting.split(',')))

    const currentValidatorsPageItems = sortedCurrentValidators.slice((page - 1) * perPage, page * perPage)

    return {
      items: currentValidatorsPageItems,
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

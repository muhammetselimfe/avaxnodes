import Peer from '../../../../models/peer'
import { getAllValidators } from "../../../../lib/api"
import get from 'lodash/get'
import toNumber from 'lodash/toNumber'
import isNaN from 'lodash/isNaN'

function getSortMethod(){
  var _args = Array.prototype.slice.call(arguments);
  return function(a, b){
      for(var x in _args){
          var ax = a[_args[x].substring(1)];
          var bx = b[_args[x].substring(1)];
          var cx;

          ax = typeof ax == "string" ? (isNaN(new Number(ax)) ? ax.toLowerCase() : ax / 1) : ax / 1;
          bx = typeof bx == "string" ? (isNaN(new Number(bx)) ? bx.toLowerCase() : bx / 1) : bx / 1;

          if(_args[x].substring(0,1) == "-"){cx = ax; ax = bx; bx = cx;}
          if(ax != bx){return ax < bx ? -1 : 1;}
      }
  }
}

export default async (parent, args, context, info) => {
  try {
    const validators = await getAllValidators()

    let currentValidators = validators
    if (args.filter.filter) {
      currentValidators = validators.filter(item => item.nodeID.includes(args.filter.filter))
    }
    if (args.filter.freeSpace) {
      currentValidators = currentValidators
        .filter(item => {
          const delegatorsStaked = parseFloat(item.delegators.totalStaked)
          const totalStacked = item.stakeAmount / 1000000000 + delegatorsStaked
          const maxStaked = Math.min(3000000, (item.stakeAmount / 1000000000) * 5)
          const leftToStackPercent = 100 - (totalStacked * 100 / maxStaked)
          return leftToStackPercent > parseFloat(args.filter.freeSpace)
        })
    }

    const page = Math.abs(args.filter.page) || 1
    const perPage = Math.min(Math.max(Math.abs(args.filter.perPage), 1), 100)
    const count = currentValidators.length
    const sorting = args.filter.sorting || '-delegationFee'

    const sortedCurrentValidators = currentValidators.slice().sort(getSortMethod(...sorting.split(',')))

    const currentValidatorsPageItems = sortedCurrentValidators.slice((page - 1) * perPage, page * perPage)

    const peers = await Peer
      .find({
        nodeID: {
          $in: currentValidatorsPageItems.map(item => item.nodeID)
        }
      })
      .lean()
      .exec()

    const peersHash = peers
      .reduce((result, current) => ({
        ...result,
        [current.nodeID]: current,
      }), {})

    return {
      items: currentValidatorsPageItems.map((item, index) => {
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
          },
          country_code: peer.country_code,
          country_flag: peer.country_flag,
          latitude: peer.latitude,
          longitude: peer.longitude,
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

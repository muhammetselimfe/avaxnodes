import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { FaCircle } from "react-icons/fa";
import moment from 'moment'

import dynamic from "next/dynamic";


import shortNodeId from '../../utils/shortNodeId';
import numberFormat from '../../utils/numberFormat';

import { defaultLocale, locales } from '../../locales';
import { Link } from '../../routes'
import TableControls from '../TableControls'


export const GET_NODE = gql`
  query GetNode ($filter: NodeFilter!) {
    node(filter: $filter) {
      nodeID
      stakeAmount
      potentialReward
      rewardOwner {
        addresses
      }
      isPartner
      isSponsored
      delegationFee
      connected
      startTime
      endTime
      delegators {
        items {
          rewardOwner {
            addresses
          }
          stakeAmount
          potentialReward
          startTime
          endTime
        }
        totalStaked
        pagination {
          page
          perPage
          count
        }
      }
    }
  }
`;

export const Node = ({
  router,
  currentLocale,
}) => {
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);

  console.log({ router })

  const filter = {
    nodeID: router.query.id,
    page,
    perPage,
  }
  const { loading, error, data } = useQuery(GET_NODE, {
    variables: {
      filter: filter
    },
  });

  console.log(data)

  const position = [51.505, -0.09]

  const MapWithNoSSR = dynamic(() => import("../Map"), {
    ssr: false
  });

  const item = (data && data.node) || {delegators: {}}

  const locale = currentLocale === defaultLocale ? undefined : currentLocale

  const delegatorsStaked = parseFloat(item.delegators.totalStaked || 0)
  const stakeAmount = item.stakeAmount / 1000000000
  const totalStacked = stakeAmount + delegatorsStaked
  const maxStaked = Math.min(3000000, (item.stakeAmount / 1000000000) * 5)
  const leftToStack = maxStaked - totalStacked
  const stackedPercent = totalStacked * 100 / maxStaked

  const ownRewards = item.potentialReward / 1000000000
  const delegatorsRewards = (item.delegators.items || [])
    .map(delegator => delegator.potentialReward / 1000000000)
    .reduce((result, current) => result + current, 0)
  const totalRewards = ownRewards + delegatorsRewards
  const ownRewardsPercent = ownRewards * 100 / totalRewards

  const timeLeftRate = (item.endTime - Date.now() / 1000) / (item.endTime - item.startTime)
  const timeLeftRatePercent = 100 - timeLeftRate * 100
  const delegationFeeRate = 1 - item.delegationFee / 100
  const potentialRewardPercent = (item.potentialReward * 100 / (item.stakeAmount)) * timeLeftRate * delegationFeeRate

  const daysTotal = moment(item.endTime * 1000).diff(moment(item.startTime * 1000), 'days')
  const daysLeft = moment(item.endTime * 1000).diff(moment(), 'days')
  const daysLeftPercent = daysLeft * 100 / daysTotal

  return (
    <>
      <div className="contact-wrapper">
        <div className="container">
          <div className="row content-inner">
            <div className="col-md-4 col-sm-6 col-lg-3">
              <div className="nodebredcrum">
                <Link route={`${currentLocale}-home`} params={{ locale }}>
                  <a>
                    <img src="/static/images/home.svg" className="home-image" />
                  </a>
                </Link>
                <span style={{ color: '#fff' }}> / </span>
                <Link route={`${currentLocale}-home`} params={{ locale }}>
                  <a className="nodes">
                    Nodes
                  </a>
                </Link>
                <span style={{ color: '#fff' }}> / </span>
                <Link route={`${currentLocale}-node`} params={{ locale, id: router.query.id }}>
                  <a className="nodes">
                    Node details
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="progress-content">
        <div className="TitleNodeID">
          <div className="container">
            <div className="row content-inner align-items-center">
              <div className=" col-9 col-md-8 col-sm-8">
                <div className="Title">
                  <span id="copycode">{shortNodeId(router.query.id)}</span>  <img data-clipboard-action="copy" data-clipboard-target="#copycode" src="/static/images/pdficon.svg" className="pdf-image" />
                </div>

              </div>
              <div className=" col-3 col-md-4 col-sm-4 ">
                {item && item.connected && (
                  <div className="PagesubTitle d-flex justify-content-end align-items-center">
                    <FaCircle fill={item.connected ? '#5DA574' : undefined} fontSize={10} />
                    <span className="ml-2">{'ACTIVE'}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="main-progress-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-md-6 left-side">
                <p className="progress-title">Available space</p>
                <div className="progress-bar-wrap relative">
                  <div className="label-wrap">
                    <label className="available-label"><strong>{numberFormat(maxStaked, 0)}</strong> AVAX total</label>
                    <label className="total-label"><strong>{numberFormat(leftToStack, 0)}</strong> AVAX free</label>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${numberFormat(stackedPercent, 0)}%` }}
                      aria-valuenow={numberFormat(stackedPercent, 0)}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 right-side">
                <p className="progress-title">Time remaining</p>
                <div className="progress-bar-wrap relative">
                  <div className="label-wrap">
                    <label className="available-label"><strong>{daysTotal}</strong> days total</label>
                    <label className="total-label"><strong>{daysLeft}</strong> days remaining</label>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${numberFormat(daysLeftPercent, 0)}%` }}
                      aria-valuenow={numberFormat(daysLeftPercent, 0)}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="map-content" style={{ position: 'relative', overflow: 'hidden' }}>
        <MapWithNoSSR position={position} />
      </div>
      <div className="box-wrapper">
        <div className="container">
          <div className="row content-inner">
            <div className="col-md-6 left">
              <div className="card-wrapper first">
                <p className="title">BENEFICIARY</p>
                <div className="card-content">
                  <span>Address</span>
                  <p className="subtext">
                    {item && item.rewardOwner && item.rewardOwner.addresses && item.rewardOwner.addresses[0]}
                  </p>
                </div>
              </div>
              <div className="card-wrapper">
                <p className="title">Stake</p>
                <div className="box-row d-flex">
                  <div className="card-content smallbox">
                    <span>Owned</span>
                    <p className="subtext">{numberFormat(stakeAmount, 0)} AVAX</p>
                  </div>
                  <div className="card-content smallbox">
                    <span>Total</span>
                    <p className="subtext">{numberFormat(totalStacked, 0)} AVAX</p>
                  </div>
                  <div className="card-content smallbox">
                    <span>Network share</span>
                    <p className="subtext">0.9384762%</p>
                  </div>
                </div>
              </div>
              <div className="card-wrapper">
                <p className="title">Delegations</p>
                <div className="box-row d-flex">
                  <div className="card-content smallbox">
                    <span>Max yield</span>
                    <p className="subtext">{numberFormat(potentialRewardPercent, 3)} %</p>
                  </div>
                  <div className="card-content smallbox">
                    <span>Delegation fees</span>
                    <p className="subtext">0 AVAX</p>
                  </div>
                  <div className="card-content smallbox">
                    <span>Gross rewards</span>
                    <p className="subtext">0 AVAX</p>
                  </div>
                </div>
                <div className="box-row row-2 d-flex">
                  <div className="card-content smallbox">
                    <span>Net rewards</span>
                    <p className="subtext">0 AVAX</p>
                  </div>
                  <div className="card-content smallbox">
                    <span>Delegated</span>
                    <p className="subtext">{numberFormat(delegatorsStaked, 0)} AVAX</p>
                  </div>
                  <div className="card-content smallbox">
                    <span>Free space</span>
                    <p className="subtext">{numberFormat(leftToStack, 0)} AVAX</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 right">
              <div className="card-wrapper first-box-card">
                <p className="title">Performance</p>
                <div className="box-row d-flex">
                  <div className="card-content smallbox">
                    <span>Average responses</span>
                    <p className="subtext">100%</p>
                  </div>
                  <div className="card-content smallbox">
                    <span>Sampled responses</span>
                    <p className="subtext">100%</p>
                  </div>
                </div>
                <span className="note-text">Response data from a sample of Avalanche nodes. Node uptime can't be known before end time</span>
              </div>
              <div className="card-wrapper last-box-card">
                <p className="title">Potential rewards</p>
                <div className="card-content">
                  <span>From owned state</span>
                  <p className="subtext">{numberFormat(ownRewards, 0)} AVAX</p>
                </div>
                <div className="card-content">
                  <span>From delegations</span>
                  <p className="subtext">{numberFormat(delegatorsRewards, 0)} AVAX</p>
                </div>
                <div className="card-content">
                  <span>Total rewards</span>
                  <p className="subtext">{numberFormat(totalRewards, 0)} AVAX</p>
                </div>
                <div className="progress-bar-wrap relative">
                  <div className="label-wrap">
                    <label className="available-label">From owned state</label>
                    <label className="total-label">From delegations</label>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${numberFormat(100 - ownRewardsPercent, 0)}%` }}
                      aria-valuenow={`${numberFormat(100 - ownRewardsPercent, 0)}`}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="PagetableTitle">
          <div className="container">
            <div className="">
              <div className="table-title">
                AVAX delegations
               </div>

            </div>
          </div>
        </div>
        <div className="contact-table node-details-wrapper">
          <div className="container">
            <div id="datatable_wrapper" className="dataTables_wrapper no-footer">
              <TableControls
                page={page}
                setPage={setPage}
                perPage={perPage}
                setPerPage={setPerPage}
                pagination={data && data.node && data.node.delegators && data.node.delegators.pagination}
              />
              <div className="row mb-3">
                <div className="col-sm-12">
                  <table id="datatable" className="display responsive nowrap dataTable table-hover" style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>BENEFICIARY</th>
                        <th>DELEGATED</th>
                        <th>POTENTIAL REWARDS</th>
                        <th>STARTED ON</th>
                        <th>TIME LEFT</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>

                      {item && item.delegators && item.delegators.items && item.delegators.items.map((item, index) => {
                        const daysLeft = moment(item.endTime * 1000).diff(moment(), 'days')
                        const hoursLeft = moment(item.endTime * 1000).diff(moment(), 'hours')
                        const minutesLeft = moment(item.endTime * 1000).diff(moment(), 'minutes')
                        return (
                          <tr key={item.rewardOwner.addresses[0]}>
                            <td><span id="code1">{shortNodeId(item.rewardOwner.addresses[0])}</span> <img data-clipboard-action="copy" data-clipboard-target="#code1" src="/static/images/pdficon.svg" className="pdf-image" /></td>
                            <td>{numberFormat(item.stakeAmount / 1000000000)} AVAX</td>
                            <td>{numberFormat(item.potentialReward / 1000000000)} AVAX</td>
                            <td>{moment(item.startTime * 1000).format('MMM D, YYYY')}</td>
                            <td>
                              {!!daysLeft && (<span>{daysLeft} days left</span>)}
                              {!daysLeft && !!hoursLeft && (<span>{hoursLeft} hours left</span>)}
                              {!daysLeft && !hoursLeft && !!minutesLeft && (<span>{minutesLeft} minutes left</span>)}
                            </td>
                            <td><i className="fas fa-circle"></i></td>
                          </tr>
                        )
                      })}

                    </tbody>
                  </table>
                </div>
              </div>
              <TableControls
                page={page}
                setPage={setPage}
                perPage={perPage}
                setPerPage={setPerPage}
                pagination={item && item.delegators && item.delegators.pagination}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Node

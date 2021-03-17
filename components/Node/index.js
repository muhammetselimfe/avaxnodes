import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { FaCircle } from "react-icons/fa";
import moment from 'moment'
import { useIntl } from "react-intl"
import ReactClipboard from 'react-clipboardjs-copy'

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
      latitude
      longitude
      networkShare
      grossRewards
      netRewards
    }
  }
`;

const MapWithNoSSR = dynamic(() => import("../Map"), {
  ssr: false
});

export const Node = ({
  router,
  currentLocale,
}) => {
  const [page, setPage] = React.useState(+router.query.page || 1);
  const [perPage, setPerPage] = React.useState(+router.query.perPage || 10);

  const [nodeIdCopiedToClipboard, setNodeIdCopiedToClipboard] = React.useState(false);

  React.useEffect(() => {
    if (nodeIdCopiedToClipboard) {
      setTimeout(() => {
        setNodeIdCopiedToClipboard(false)
      }, 1000)
    }
  }, [nodeIdCopiedToClipboard])

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

  const item = (data && data.node) || {delegators: {}}

  const position = React.useMemo(()=> ([
    item.latitude,
    item.longitude
  ]), [item.latitude, item.longitude, loading])

  console.log('Node', position)

  const locale = currentLocale === defaultLocale ? undefined : currentLocale

  const delegatorsStaked = parseFloat(item.delegators.totalStaked || 0)
  const stakeAmount = item.stakeAmount / 1000000000
  const totalStacked = stakeAmount + delegatorsStaked
  const maxStaked = Math.min(3000000, (item.stakeAmount / 1000000000) * 5)
  const leftToStack = (maxStaked - totalStacked) > 0 ? (maxStaked - totalStacked) :  0
  const stackedPercent = totalStacked * 100 / maxStaked

  const ownRewards = item.potentialReward / 1000000000
  const delegatorsRewards = (item.delegators.items || [])
    .map(delegator => delegator.potentialReward / 1000000000)
    .reduce((result, current) => result + current, 0)
  const totalRewards = ownRewards + delegatorsRewards
  const ownRewardsPercent = ownRewards * 100 / totalRewards

  const timeLeftRate = (item.endTime - Date.now() / 1000) / (item.endTime - item.startTime)
  const delegationFeeRate = 1 - item.delegationFee / 100
  const potentialRewardPercent = (item.potentialReward * 100 / (item.stakeAmount)) * timeLeftRate * delegationFeeRate

  const daysTotal = moment(item.endTime * 1000).diff(moment(item.startTime * 1000), 'days')
  const daysLeft = moment(item.endTime * 1000).diff(moment(), 'days')
  const daysLeftPercent = daysLeft * 100 / daysTotal

  const { formatMessage } = useIntl()
  const f = id => formatMessage({ id })

  return (
    <>
      <div className="contact-wrapper">
        <div className="container">
          <div className="row content-inner">
            <div className="col-md-4 col-sm-6 col-lg-3">
              <div className="nodebredcrum">
                <Link href={`home`} locale={locale} params={{ page: 1, perPage: 10, sorting: '-fee' }}>
                  <a>
                    <img src="/static/images/home.svg" className="home-image" />
                  </a>
                </Link>
                <span style={{ color: '#fff' }}> / </span>
                <Link href={`home`} locale={locale} params={{ page: 1, perPage: 10, sorting: '-fee' }}>
                  <a className="nodes">
                    {f('page.nodes.header')}
                  </a>
                </Link>
                <span style={{ color: '#fff' }}> / </span>
                <Link href={`node`} locale={locale} params={{ id: router.params.id }}>
                  <a className="nodes">
                    {f('page.node.header')}
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
                  <span id="copycode" title={router.query.id} className="mr-3">{shortNodeId(router.query.id)}</span>
                  <ReactClipboard
                    text={router.query.id}
                    onSuccess={(e) => {
                      setNodeIdCopiedToClipboard(true)
                    }}
                  >
                    <img
                      data-clipboard-action="copy"
                      data-clipboard-target="#copycode"
                      src="/static/images/pdficon.svg"
                      className="pdf-image"
                    />
                  </ReactClipboard>
                  {nodeIdCopiedToClipboard && (
                    <div className="copiedtext d-block">Copied to clipboard</div>
                  )}
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
                <p className="progress-title">{f('page.node.space.available')}</p>
                <div className="progress-bar-wrap relative">
                  <div className="label-wrap">
                    <label className="available-label"><strong>{numberFormat(maxStaked || 0, 0)}</strong> AVAX {f('page.node.total')}</label>
                    <label className="total-label"><strong>{numberFormat(leftToStack || 0, 0)}</strong> AVAX {f('page.node.free')}</label>
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
                <p className="progress-title">{f('page.node.time.remaining')}</p>
                <div className="progress-bar-wrap relative">
                  <div className="label-wrap">
                    <label className="available-label"><strong>{daysTotal | 0}</strong> {f('page.node.days.total')}</label>
                    <label className="total-label"><strong>{daysLeft || 0}</strong> {f('page.node.days.remaining')}</label>
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
      {position[0] !== null && position[1] !== null && typeof position[0] !== 'undefined' && typeof position[1] !== 'undefined' && (
        <div className="map-content" style={{ position: 'relative', overflow: 'hidden' }}>
          <MapWithNoSSR position={position} loading={loading} />
        </div>
      )}
      <div className="box-wrapper">
        <div className="container">
          <div className="row content-inner">
            <div className="col-md-6 left">
              <div className="card-wrapper first">
                <p className="title">{f('page.node.info.title.beneficiary')}</p>
                <div className="card-content">
                  <span>{f('page.node.info.subtitle.address')}</span>
                  <p className="subtext">
                    {item && item.rewardOwner && item.rewardOwner.addresses && item.rewardOwner.addresses[0]}
                  </p>
                </div>
              </div>
              <div className="card-wrapper">
                <p className="title">{f('page.node.info.title.stake')}</p>
                <div className="box-row d-flex">
                  <div className="card-content smallbox">
                    <span>{f('page.node.info.subtitle.owned')}</span>
                    <p className="subtext">{numberFormat(stakeAmount, 0)} AVAX</p>
                  </div>
                  <div className="card-content smallbox">
                    <span>{f('page.node.info.subtitle.total')}</span>
                    <p className="subtext">{numberFormat(totalStacked, 0)} AVAX</p>
                  </div>
                  <div className="card-content smallbox">
                    <span>{f('page.node.info.subtitle.networkShare')}</span>
                    <p className="subtext">{numberFormat(item.networkShare || 0, 6)}%</p>
                  </div>
                </div>
              </div>
              <div className="card-wrapper">
                <p className="title">{f('page.node.info.title.delegations')}</p>
                <div className="box-row d-flex">
                  <div className="card-content smallbox">
                    <span>{f('page.node.info.subtitle.maxYield')}</span>
                    <p className="subtext">{numberFormat(potentialRewardPercent, 3)} %</p>
                  </div>
                  <div className="card-content smallbox">
                    <span>{f('page.node.info.subtitle.delegationsFees')}</span>
                    <p className="subtext">{numberFormat(item.delegationFee || 0, 0)}%</p>
                  </div>
                  <div className="card-content smallbox">
                    <span>{f('page.node.info.subtitle.grossRewards')}</span>
                    <p className="subtext">{numberFormat(item.grossRewards || 0, 0)} AVAX</p>
                  </div>
                </div>
                <div className="box-row row-2 d-flex">
                  <div className="card-content smallbox">
                    <span>{f('page.node.info.subtitle.netRewards')}</span>
                    <p className="subtext">{numberFormat(item.netRewards || 0, 0)} AVAX</p>
                  </div>
                  <div className="card-content smallbox">
                    <span>{f('page.node.info.subtitle.delegated')}</span>
                    <p className="subtext">{numberFormat(delegatorsStaked, 0)} AVAX</p>
                  </div>
                  <div className="card-content smallbox">
                    <span>{f('page.node.info.subtitle.freeSpace')}</span>
                    <p className="subtext">{numberFormat(leftToStack, 0)} AVAX</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 right">
              <div className="card-wrapper first-box-card">
                <p className="title">{f('page.node.info.title.perfomance')}</p>
                <div className="box-row d-flex">
                  <div className="card-content smallbox">
                    <span>{f('page.node.info.subtitle.responses.average')}</span>
                    <p className="subtext">100%</p>
                  </div>
                  <div className="card-content smallbox">
                    <span>{f('page.node.info.subtitle.responses.sampled')}</span>
                    <p className="subtext">100%</p>
                  </div>
                </div>
                <span className="note-text">{f('page.node.info.description.perfomance')}</span>
              </div>
              <div className="card-wrapper last-box-card">
                <p className="title">{f('page.node.info.title.potentialRewards')}</p>
                <div className="card-content">
                  <span>{f('page.node.info.subtitle.fromOwnedStake')}</span>
                  <p className="subtext">{numberFormat(ownRewards, 0)} AVAX</p>
                </div>
                <div className="card-content">
                  <span>{f('page.node.info.subtitle.fromDelegations')}</span>
                  <p className="subtext">{numberFormat(delegatorsRewards, 0)} AVAX</p>
                </div>
                <div className="card-content">
                  <span>{f('page.node.info.subtitle.totalRewards')}</span>
                  <p className="subtext">{numberFormat(totalRewards, 0)} AVAX</p>
                </div>
                <div className="progress-bar-wrap relative">
                  <div className="label-wrap">
                    <label className="available-label">{f('page.node.info.subtitle.fromOwnedStake')}</label>
                    <label className="total-label">{f('page.node.info.subtitle.fromDelegations')}</label>
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
                {f('page.node.table.header')}
              </div>
            </div>
          </div>
        </div>
        <div className="contact-table node-details-wrapper">
          <div className="container">
            <div id="datatable_wrapper" className="dataTables_wrapper no-footer">
              <TableControls
                locale={locale}
                page={page}
                setPage={setPage}
                perPage={perPage}
                setPerPage={setPerPage}
                pagination={data && data.node && data.node.delegators && data.node.delegators.pagination}
              />
              <div className="row mb-3 dataTables_scroll">
                <div className="col-sm-12 dataTables_scrollHead">
                  <table
                    className="display responsive nowrap dataTable table table-hover table-responsive"
                    style={{ width: '100%' }}
                  >
                    <thead>
                      <tr>
                        <th>{f('page.node.table.header.beneficiary.title')}</th>
                        <th>{f('page.node.table.header.delegated.title')}</th>
                        <th>{f('page.node.table.header.potentialRewards.title')}</th>
                        <th>{f('page.node.table.header.startedon.title')}</th>
                        <th>{f('page.node.table.header.timeleft.title')}</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>

                      {item && item.delegators && item.delegators.items && item.delegators.items.map((item, index) => {
                        const daysLeft = moment(item.endTime * 1000).diff(moment(), 'days')
                        const hoursLeft = moment(item.endTime * 1000).diff(moment(), 'hours')
                        const minutesLeft = moment(item.endTime * 1000).diff(moment(), 'minutes')
                        return (
                          <tr key={`${item.rewardOwner.addresses[0]}-${index}`}>
                            <td><span id="code1">{shortNodeId(item.rewardOwner.addresses[0])}</span> <img data-clipboard-action="copy" data-clipboard-target="#code1" src="/static/images/pdficon.svg" className="pdf-image" /></td>
                            <td>{numberFormat(item.stakeAmount / 1000000000)} AVAX</td>
                            <td>{numberFormat(item.potentialReward / 1000000000)} AVAX</td>
                            <td>{moment(item.startTime * 1000).format('MMM D, YYYY')}</td>
                            <td>
                              {!!daysLeft && (<span>{daysLeft} {f('common.left.days')}</span>)}
                              {!daysLeft && !!hoursLeft && (<span>{hoursLeft} {f('common.left.hours')}</span>)}
                              {!daysLeft && !hoursLeft && !!minutesLeft && (<span>{minutesLeft} {f('common.left.minutes')}</span>)}
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
                locale={locale}
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

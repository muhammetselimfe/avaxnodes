import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { FaCircle } from "react-icons/fa";
import moment from 'moment'
import { useDarkMode } from 'next-dark-mode'
import { useIntl } from "react-intl"

import shortNodeId from '../../utils/shortNodeId';
import numberFormat from '../../utils/numberFormat';

import { defaultLocale, locales } from '../../locales';
import { Link, Router } from '../../routes'
import TableControls from '../TableControls'
import pickParams from '../../utils/pickParams';

export const GET_NODES = gql`
  query GetNodes ($filter: NodesFilter!) {
    stats {
      totalNodes
      totalTransactions
      totalProviders
      totalDelegations
      totalBlocks
      totalParticipation
    }
    nodes(filter: $filter) {
      items {
        nodeID
        stakeAmount
        potentialReward
        isPartner
        isSponsored
        delegationFee
        connected
        startTime
        endTime
        delegators {
          totalStaked
          pagination {
            count
          }
        }
      }
      pagination {
        page
        perPage
        count
      }
    }
  }
`;

const Stats = ({ data = {} }) => {
  const { formatMessage } = useIntl()
  const f = id => formatMessage({ id })
  return (
    <div className="col-md-9 col-sm-9 rectangleSmall">
      <div className="row total-node-wrapper">
        <div className="col-6 col-md-3 col-sm-3">
          <div className="TitleText">
            {f('stats.total.nodes.title')}
          </div>
          <div className="FigurText">
            {numberFormat(data.totalNodes || 0, 0)}
          </div>
        </div>
        <div className="col-6 col-md-3 col-sm-3">
          <div className="TitleText">
            {f('stats.total.providers.title')}
          </div>
          <div className="FigurText">
            {numberFormat(data.totalProviders || 0, 0)}
          </div>
        </div>
        <div className="col-6 col-md-3 col-sm-3">
          <div className="TitleText">
            {f('stats.total.delegations.title')}
          </div>
          <div className="FigurText">
            {numberFormat(data.totalDelegations || 0, 0)}
          </div>
        </div>
        <div className="col-6 col-md-3 col-sm-3">
          <div className="TitleText">
            {f('stats.total.blocks.title')}
          </div>
          <div className="FigurText">
            {numberFormat(data.totalBlocks || 0, 0)}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6 col-md-3 col-sm-3">
          <div className="TitleText">
            {f('stats.total.transactions.title')}
          </div>
          <div className="FigurText">
            {numberFormat(data.totalTransactions || 0, 0)}
          </div>
        </div>
        <div className="col-6 col-md-3 col-sm-3">
          <div className="TitleText">
            {f('stats.total.participation.title')}
          </div>
          <div className="FigurText">
            {numberFormat(data.totalParticipation || 0, 1)}
          </div>
        </div>
      </div>
    </div>
  )
}

const Filters = ({
  locale,
  router,
  filter,
  setFilter,
  setPage,
}) => {
  const [selectFilterOpen, setSelectFilterOpen] = React.useState(false);
  const [selectFilterOptionsOpen, setSelectFilterOptionsOpen] = React.useState(false);
  const { darkModeActive } = useDarkMode()
  const { formatMessage } = useIntl()
  const f = id => formatMessage({ id })

  const route = router.query.nextRoute

  return (
    <div className="filter-wrapper">
      <div className="search-container">
        <div className="input-icons">
          <input
            id="text1"
            type="text"
            className="form-control search-field"
            placeholder={f('filter.search.placeolder')}
            value={filter}
            onChange={(event) => {
              Router.pushRoute(
                route,
                { ...pickParams(router.params || {}), page: 1, filter: event.target.value },
                locale
              )
              setFilter(event.target.value)
              setPage(1)
            }}
          />
          <img src="/static/images/search.svg" alt="search" className="search" />
          {darkModeActive ? (
            <img src="/static/images/right-arrow.svg" className="right-arrow" />
          ): (
            <img src="/static/images/search2.svg" className="right-arrow" />
          )}
        </div>
      </div>
      <div className="freespace-wrap">
        <div className="dropdown bootstrap-select">
          <select className="selectpicker" tabIndex="-98">
            <option>Free Space</option>
            <option>Free Space1</option>
            <option>Free Space2</option>
          </select>
          <button
            type="button"
            className="btn dropdown-toggle btn-light"
            data-toggle="dropdown"
            role="combobox"
            aria-owns="bs-select-1"
            aria-haspopup="listbox"
            aria-expanded="false"
            title="Free Space"
            onClick={() => setSelectFilterOpen(!selectFilterOpen)}
          >
            <div className="filter-option">
              <div className="filter-option-inner">
                <div className="filter-option-inner-inner">Free Space</div>
              </div>
            </div>
          </button>
          <div
            className={`dropdown-menu ${selectFilterOpen ? 'd-block' : ''}`}
            style={{ maxHeight: '588.422px', overflow: 'hidden', minHeight: '0px', willChange: 'transform' }}
          >
            <div className="inner show" role="listbox" id="bs-select-1" tabIndex="-1" aria-activedescendant="bs-select-1-0"
              style={{ maxHeight: '570.422px', overflowY: 'auto', minHeight: '0px' }}
            >
              <ul className="dropdown-menu inner show" role="presentation" style={{ marginTop: '0px', marginBottom: '0px' }}>
                <li className="selected active">
                  <a role="option" className="dropdown-item active selected" id="bs-select-1-0" tabIndex="0" aria-setsize="3" aria-posinset="1" aria-selected="true">
                    <span className="text">Free Space</span>
                  </a>
                </li>
                <li>
                  <a role="option" className="dropdown-item" id="bs-select-1-1" tabIndex="0">
                    <span className="text">Free Space1</span>
                  </a>
                </li>
                <li>
                  <a role="option" className="dropdown-item" id="bs-select-1-2" tabIndex="0">
                    <span className="text">Free Space2</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="freespace-wrap">
        <div className="dropdown bootstrap-select">
          <select className="selectpicker" tabIndex="-98">
            <option>More than 5%</option>
            <option>More than 10%</option>
            <option>More than 15%2</option>
          </select>
          <button
            type="button"
            className="btn dropdown-toggle btn-light"
            data-toggle="dropdown"
            role="combobox"
            aria-owns="bs-select-2"
            aria-haspopup="listbox"
            aria-expanded="false"
            title="More than 5%"
            onClick={() => setSelectFilterOptionsOpen(!selectFilterOptionsOpen)}
          >
            <div className="filter-option">
              <div className="filter-option-inner">
                <div className="filter-option-inner-inner">More than 5%</div>
              </div>
            </div>
          </button>
          <div
            className={`dropdown-menu ${selectFilterOptionsOpen ? 'd-block' : ''}`}
            style={{ maxHeight: '588.422px', overflow: 'hidden', minHeight: '0px', willChange: 'transform' }}
          >
            <div className="inner show" role="listbox" id="bs-select-2" tabIndex="-1" aria-activedescendant="bs-select-2-0"
              style={{ maxHeight: '570.422px', overflowY: 'auto', minHeight: '0px' }}
            >
              <ul className="dropdown-menu inner show" role="presentation" style={{ marginTop: '0px', marginBottom: '0px' }}>
                <li className="selected active">
                  <a role="option" className="dropdown-item active selected" id="bs-select-2-0" tabIndex="0" aria-setsize="3" aria-posinset="1" aria-selected="true">
                    <span className="text">More than 5%</span>
                  </a>
                </li>
                <li>
                  <a role="option" className="dropdown-item" id="bs-select-2-1" tabIndex="0">
                    <span className="text">More than 10%</span>
                  </a>
                </li>
                <li>
                  <a role="option" className="dropdown-item" id="bs-select-2-2" tabIndex="0">
                    <span className="text">More than 15%2</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Nodes = ({ currentLocale, router }) => {
  const [filter, setFilter] = React.useState(
    (!router.query.filter || router.query.filter === 'undefined')
      ? ''
      : router.query.filter
  );
  const [page, setPage] = React.useState(+router.query.page || 1);
  const [perPage, setPerPage] = React.useState(+router.query.perPage || 10);

  const { loading, error, data } = useQuery(GET_NODES, {
    variables: {
      filter: {
        filter,
        page,
        perPage,
      }
    },
  });

  const locale = currentLocale

  const { formatMessage } = useIntl()
  const f = id => formatMessage({ id })

  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;

  return (
    <>
      <div className="content-wrapper">
        <div className="container">
          <div className="row content-inner">
            <div className="col-md-3 col-sm-3">
              <div className="bredcrum">
                <Link href={`home`} locale={locale} params={{ }}>
                  <a>
                    <img src="/static/images/home.svg" className="home-image" />
                  </a>
                </Link>
                <span style={{ color: '#fff' }}> / </span>
                <Link href={`home`} locale={locale} params={{ }}>
                  <a className="nodes">
                    {f('page.nodes.header')}
                  </a>
                </Link>
              </div>
            </div>
            <Stats data={data && data.stats ? data.stats : {}} />
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="container">
          <Filters
            locale={locale}
            router={router}
            filter={filter}
            setFilter={setFilter}
            setPage={setPage}
          />
        </div>
        <div className="PageTitle">
          <div className="container">
            <div className="">
              <div className="PageTitleFont">
                {f('page.nodes.header')}
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="container">
            <div id="datatable_wrapper" className="dataTables_wrapper no-footer">
              <TableControls
                locale={locale}
                page={page}
                setPage={setPage}
                perPage={perPage}
                setPerPage={setPerPage}
                pagination={data && data.nodes && data.nodes.pagination}
              />
              <div className="row mb-3">
                <div className="col-sm-12">
                  <table id="datatable" className="display responsive nowrap dataTable table-hover" style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>{f('page.nodes.table.header.nodeid.title')}</th>
                        <th>{f('page.nodes.table.header.delegators.title')}</th>
                        <th>{f('page.nodes.table.header.totalstake.title')}</th>
                        <th className="free-space">{f('page.nodes.table.header.freespace.title')}</th>
                        <th>{f('page.nodes.table.header.startedon.title')}</th>
                        <th>{f('page.nodes.table.header.timeleft.title')}</th>
                        <th>{f('page.nodes.table.header.fee.title')}</th>
                        <th>{f('page.nodes.table.header.maxyield.title')}</th>
                        <th>{f('page.nodes.table.header.country.title')}</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data && data.nodes && data.nodes.items && data.nodes.items.map((item, index) => {
                        const delegatorsStaked = parseFloat(item.delegators.totalStaked)
                        const totalStacked = item.stakeAmount / 1000000000 + delegatorsStaked
                        const maxStaked = Math.min(3000000, (item.stakeAmount / 1000000000) * 5)
                        const leftToStack = maxStaked - totalStacked
                        const stackedPercent = totalStacked * 100 / maxStaked

                        const timeLeftRate = (item.endTime - Date.now() / 1000) / (item.endTime - item.startTime)
                        const timeLeftRatePercent = 100 - timeLeftRate * 100
                        const delegationFeeRate = 1 - item.delegationFee / 100
                        const potentialRewardPercent = (item.potentialReward * 100 / (item.stakeAmount)) * timeLeftRate * delegationFeeRate

                        const daysLeft = moment(item.endTime * 1000).diff(moment(), 'days')
                        const hoursLeft = moment(item.endTime * 1000).diff(moment(), 'hours')
                        const minutesLeft = moment(item.endTime * 1000).diff(moment(), 'minutes')

                        return (
                          <tr key={index}>
                            <td scope="row" style={{ position: 'relative' }}>
                              <Link href={`node`} locale={locale} params={{ id: item.nodeID }}>
                                <a className="stretched-link">

                                  <span id="code">{shortNodeId(item.nodeID)}</span>
                                  <img
                                    data-clipboard-action="copy"
                                    data-clipboard-target="#code"
                                    src="/static/images/pdficon.svg"
                                    className="pdf-image"
                                  />
                                  <div className="table-tab-wrapper">
                                    {item.isSponsored && (<span className="sponsertag mr-1">{f('common.sponsored')}</span>)}
                                    {item.isPartner && (<span className="providertag">{f('common.provider')}</span>)}
                                  </div>
                                </a>
                              </Link>

                            </td>
                            <td>{numberFormat(item.delegators.pagination.count, 0)}</td>
                            <td colSpan="2">
                              <div className="progress-bar-wrap relative">
                                <div className="label-wrap">
                                  <label className="available-label"><strong>{numberFormat(totalStacked)}</strong>AVAX</label>
                                  <label className="total-label"><strong>{numberFormat(leftToStack)}</strong>AVAX</label>
                                </div>
                                <div className="progress">
                                  <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${stackedPercent}%` }}
                                    aria-valuenow={stackedPercent}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  />
                                </div>
                              </div>
                            </td>
                            <td style={{ display: 'none' }}></td>
                            <td>{moment(item.startTime * 1000).format('MMM D, YYYY')}</td>
                            <td>
                              {!!daysLeft && (<span>{daysLeft} {f('common.left.days')}</span>)}
                              {!daysLeft && !!hoursLeft && (<span>{hoursLeft} {f('common.left.hours')}</span>)}
                              {!daysLeft && !hoursLeft && !!minutesLeft && (<span>{minutesLeft} {f('common.left.minutes')}</span>)}
                            </td>
                            <td>{numberFormat(item.delegationFee, 0)}%</td>
                            <td>{numberFormat(potentialRewardPercent, 3)}%</td>
                            <td><img src="/static/images/india-flag.svg" className="flag-image" /> IN</td>
                            <td><FaCircle fill={item.connected ? '#5DA574' : undefined} /></td>
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
                pagination={data && data.nodes && data.nodes.pagination}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Nodes

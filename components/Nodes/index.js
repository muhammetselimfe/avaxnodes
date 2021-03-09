import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { FaCircle, FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
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
        country_code
        country_flag
        maxYield
        totalStacked
        leftToStack
        stackedPercent
        leftToStackPercent
      }
      pagination {
        page
        perPage
        count
      }
    }
  }
`;

const prepareNewSorting = (sorting, field) => {
  const newSorting = sorting.includes(field)
    ? (sorting[0] === '-'
      ? `+${field}`
      : `-${field}`)
    : `-${field}`
  return newSorting
}

const sortingIcon = (sorting, field) => {
  return sorting.includes(field) ? (
    sorting.includes(`-${field}`)
      ? <FaSortDown />
      : <FaSortUp />
  ) : (
    <FaSort />
  )
}

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

const nodesFilters = {
  freeSpace: {
    value: 'freeSpace',
    label: 'page.nodes.filters.freeSpace.label',
    values: [
      {
        value: 0,
        label: 'page.nodes.filters.freeSpace.option.value',
      },
      {
        value: 20,
        label: 'page.nodes.filters.freeSpace.option.value',
      },
      {
        value: 40,
        label: 'page.nodes.filters.freeSpace.option.value',
      },
      {
        value: 60,
        label: 'page.nodes.filters.freeSpace.option.value',
      },
      {
        value: 80,
        label: 'page.nodes.filters.freeSpace.option.value',
      },
    ],
  },
}

const Filters = ({
  locale,
  router,
  filter,
  page,
  perPage,
  sorting,
  freeSpace,
  setFilter,
  setPage,
  setFreeSpace,
}) => {
  const [selectFilterOpen, setSelectFilterOpen] = React.useState(false);
  const [selectFilterOptionsOpen, setSelectFilterOptionsOpen] = React.useState(false);
  const { darkModeActive } = useDarkMode()
  const { formatMessage } = useIntl()
  const f = (id, values = {}) => formatMessage({ id }, values)

  const route = router.query.nextRoute

  const filterType = typeof freeSpace !== 'undefined' ? 'freeSpace' : ''

  const currentNodesFilterKey = Object.keys(nodesFilters)
    .find(key => key === filterType)

  const currentNodesFilter = nodesFilters[currentNodesFilterKey]

  const preparedCurrentNodesFilter = currentNodesFilter ? {
    ...currentNodesFilter,
    label: f(currentNodesFilter.label),
    values: currentNodesFilter.values.map(i => {
      return {
        ...i,
        label: f(i.label, { percent: i.value, }),
        active: i.value == freeSpace
      }
    })
  } : {values: []}

  const activeOption = preparedCurrentNodesFilter.values.find(i => i.active) || {}

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
          <button
            type="button"
            className="btn dropdown-toggle btn-light"
            data-toggle="dropdown"
            role="combobox"
            aria-owns="bs-select-1"
            aria-haspopup="listbox"
            aria-expanded="false"
            title={preparedCurrentNodesFilter.label}
            onClick={() => setSelectFilterOpen(!selectFilterOpen)}
          >
            <div className="filter-option">
              <div className="filter-option-inner">
                <div className="filter-option-inner-inner">{preparedCurrentNodesFilter.label}</div>
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
                  <a
                    role="option"
                    className="dropdown-item active selected"
                    id="bs-select-1-0"
                    tabIndex="0"
                    aria-setsize="3"
                    aria-posinset="1"
                    aria-selected="true"
                    onClick={() => {
                      setSelectFilterOpen(!selectFilterOpen)
                    }}
                  >
                    <span className="text">{preparedCurrentNodesFilter.label}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="freespace-wrap">
        <div className="dropdown bootstrap-select">
          <button
            type="button"
            className="btn dropdown-toggle btn-light"
            data-toggle="dropdown"
            role="combobox"
            aria-owns="bs-select-2"
            aria-haspopup="listbox"
            aria-expanded="false"
            title={activeOption.label}
            onClick={() => setSelectFilterOptionsOpen(!selectFilterOptionsOpen)}
          >
            <div className="filter-option">
              <div className="filter-option-inner">
                <div className="filter-option-inner-inner">{activeOption.label}</div>
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
                {preparedCurrentNodesFilter.values.map(option => {
                  return (
                    <li className={option.active ? `selected active` : ''} key={option.value}>
                      <Link
                        href={`home`}
                        locale={locale}
                        params={pickParams({
                          ...router.params,
                          freeSpace: option.value,
                        })}
                      >
                        <a
                          role="option"
                          className={`dropdown-item ${option.active ?  'active selected' : ''}`}
                          id="bs-select-2-0"
                          tabIndex="0"
                          aria-setsize="3"
                          aria-posinset="1"
                          aria-selected="true"
                          onClick={() => {
                            setFreeSpace(option.value)
                            setPage(1)
                            setSelectFilterOptionsOpen(!selectFilterOptionsOpen)
                          }}
                        >
                          <span className="text">{option.label}</span>
                        </a>
                      </Link>
                    </li>
                  )
                })}
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
  const [sorting, setSorting] = React.useState(router.query.sorting || '-fee');
  const [freeSpace, setFreeSpace] = React.useState((
    !router.query.freeSpace || router.query.freeSpace === 'undefined')
      ? 0
      : isNaN(new Number(router.query.freeSpace))
        ? 0
        : +router.query.freeSpace
  );

  const { loading, error, data } = useQuery(GET_NODES, {
    variables: {
      filter: {
        filter,
        page,
        perPage,
        sorting,
        freeSpace,
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
                <Link href={`home`} locale={locale} params={{ page: 1, perPage: 10 }}>
                  <a>
                    <img src="/static/images/home.svg" className="home-image" />
                  </a>
                </Link>
                <span style={{ color: '#fff' }}> / </span>
                <Link href={`home`} locale={locale} params={{ page: 1, perPage: 10 }}>
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
            page={page}
            perPage={perPage}
            sorting={sorting}
            freeSpace={freeSpace}
            locale={locale}
            router={router}
            filter={filter}
            setFilter={setFilter}
            setPage={setPage}
            setFreeSpace={setFreeSpace}
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
              <div className="row mb-3 dataTables_scroll">
                <div className="col-sm-12 dataTables_scrollHead">
                  <table
                    id="datatable"
                    className="display responsive nowrap dataTable table table-hover table-responsive"
                    style={{ width: '100%' }}
                  >
                    <thead>
                      <tr>
                        <th className="sorting">
                          <Link
                            href={`home`}
                            locale={locale}
                            params={pickParams({
                              ...router.params,
                              sorting: prepareNewSorting(sorting, 'node-id')
                            })}
                          >
                            <a
                              onClick={() => {
                                setSorting(prepareNewSorting(sorting, 'node-id'))
                              }}
                            >
                              <span>{f('page.nodes.table.header.nodeid.title')}</span>
                              {' '}
                              {sortingIcon(sorting, 'node-id')}
                            </a>
                          </Link>
                        </th>
                        <th className="sorting">
                          <Link
                            href={`home`}
                            locale={locale}
                            params={pickParams({
                              ...router.params,
                              sorting: prepareNewSorting(sorting, 'delegators')
                            })}
                          >
                            <a
                              onClick={() => {
                                setSorting(prepareNewSorting(sorting, 'delegators'))
                              }}
                            >
                              <span>{f('page.nodes.table.header.delegators.title')}</span>
                              {' '}
                              {sortingIcon(sorting, 'delegators')}
                            </a>
                          </Link>
                        </th>
                        <th className="sorting">
                          <Link
                            href={`home`}
                            locale={locale}
                            params={pickParams({
                              ...router.params,
                              sorting: prepareNewSorting(sorting, 'total-stake')
                            })}
                          >
                            <a
                              onClick={() => {
                                setSorting(prepareNewSorting(sorting, 'total-stake'))
                              }}
                            >
                              <span>{f('page.nodes.table.header.totalstake.title')}</span>
                              {' '}
                              {sortingIcon(sorting, 'total-stake')}
                            </a>
                          </Link>
                        </th>
                        <th className="free-space sorting">
                          <Link
                            href={`home`}
                            locale={locale}
                            params={pickParams({
                              ...router.params,
                              sorting: prepareNewSorting(sorting, 'free-space')
                            })}
                          >
                            <a
                              onClick={() => {
                                setSorting(prepareNewSorting(sorting, 'free-space'))
                              }}
                            >
                              <span>{f('page.nodes.table.header.freespace.title')}</span>
                              {' '}
                              {sortingIcon(sorting, 'free-space')}
                            </a>
                          </Link>
                        </th>
                        <th className="sorting">
                          <Link
                            href={`home`}
                            locale={locale}
                            params={pickParams({
                              ...router.params,
                              sorting: prepareNewSorting(sorting, 'started-on')
                            })}
                          >
                            <a
                              onClick={() => {
                                setSorting(prepareNewSorting(sorting, 'started-on'))
                              }}
                            >
                              <span>{f('page.nodes.table.header.startedon.title')}</span>
                              {' '}
                              {sortingIcon(sorting, 'started-on')}
                            </a>
                          </Link>
                        </th>
                        <th className="sorting">
                          <Link
                            href={`home`}
                            locale={locale}
                            params={pickParams({
                              ...router.params,
                              sorting: prepareNewSorting(sorting, 'time-left')
                            })}
                          >
                            <a
                              onClick={() => {
                                setSorting(prepareNewSorting(sorting, 'time-left'))
                              }}
                            >
                              <span>{f('page.nodes.table.header.timeleft.title')}</span>
                              {' '}
                              {sortingIcon(sorting, 'time-left')}
                            </a>
                          </Link>
                        </th>
                        <th className="sorting">
                          <Link
                            href={`home`}
                            locale={locale}
                            params={pickParams({
                              ...router.params,
                              sorting: prepareNewSorting(sorting, 'fee')
                            })}
                          >
                            <a
                              onClick={() => {
                                setSorting(prepareNewSorting(sorting, 'fee'))
                              }}
                            >
                              <span>{f('page.nodes.table.header.fee.title')}</span>
                              {' '}
                              {sortingIcon(sorting, 'fee')}
                            </a>
                          </Link>
                        </th>
                        <th className="sorting">
                         <Link
                            href={`home`}
                            locale={locale}
                            params={pickParams({
                              ...router.params,
                              sorting: prepareNewSorting(sorting, 'max-yield')
                            })}
                          >
                            <a
                              onClick={() => {
                                setSorting(prepareNewSorting(sorting, 'max-yield'))
                              }}
                            >
                              <span>{f('page.nodes.table.header.maxyield.title')}</span>
                              {' '}
                              {sortingIcon(sorting, 'max-yield')}
                            </a>
                          </Link>
                        </th>
                        <th className="sorting">
                          <Link
                            href={`home`}
                            locale={locale}
                            params={pickParams({
                              ...router.params,
                              sorting: prepareNewSorting(sorting, 'country')
                            })}
                          >
                            <a
                              onClick={() => {
                                setSorting(prepareNewSorting(sorting, 'country'))
                              }}
                            >
                              <span>{f('page.nodes.table.header.country.title')}</span>
                              {' '}
                              {sortingIcon(sorting, 'country')}
                            </a>
                          </Link>
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data && data.nodes && data.nodes.items && data.nodes.items.map((item, index) => {
                        const daysLeft = moment(item.endTime * 1000).diff(moment(), 'days')
                        const hoursLeft = moment(item.endTime * 1000).diff(moment(), 'hours')
                        const minutesLeft = moment(item.endTime * 1000).diff(moment(), 'minutes')

                        return (
                          <tr key={index}>
                            <td scope="row" style={{ position: 'relative' }}>
                              <Link href={`node`} locale={locale} params={{
                                id: item.nodeID,
                                page: 1,
                                perPage: 10,
                              }}>
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
                                  <label className="available-label"><strong>{numberFormat(item.totalStacked || 0, 0)}</strong>AVAX</label>
                                  <label className="total-label"><strong>{numberFormat(item.leftToStack || 0, 0)}</strong>AVAX</label>
                                </div>
                                <div className="progress">
                                  <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: `${item.leftToStackPercent}%` }}
                                    aria-valuenow={item.leftToStackPercent}
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
                            <td>{numberFormat(item.maxYield, 2)}%</td>
                            <td>
                              {item && item.country_flag && item.country_code && (
                                <div className="d-flex">
                                  <img src={item.country_flag} className="flag-image" /> <span>{item.country_code}</span>
                                </div>
                              )}
                            </td>
                            <td><FaCircle fill={item.connected ? '#5DA574' : undefined} size={10} /></td>
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

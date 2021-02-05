import { gql, useQuery } from '@apollo/client';
import { FaCircle } from "react-icons/fa";
import moment from 'moment'

import shortNodeId from '../../utils/shortNodeId';
import numberFormat from '../../utils/numberFormat';

import { defaultLocale, locales } from '../../locales';
import { Link } from '../../routes'

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

const TableControls = () => {

  return (
    <div className="row">
      <div className="col-sm-3">
        <div className="dataTables_length bs-select" id="datatable_length">
          <label>
            Show
            {' '}
            <select name="datatable_length" aria-controls="datatable" className="">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="-1">All</option>
            </select>
            {' '}
            entries
          </label>
        </div>
      </div>
      <div className="col-sm-3"></div>
      <div className="col-sm-6">
        <div className="dataTables_paginate paging_simple_numbers" id="datatable_paginate">
          <a className="paginate_button previous disabled" aria-controls="datatable" data-dt-idx="0" tabIndex="-1" id="datatable_previous">
            <div>
              <img src="/static/images/prev.svg" className="dark-angle" />
              <img src="/static/images/left-angle.svg" className="light-angle" style={{ display: 'none' }} />
            </div>
          </a>
          <span>
            <a className="paginate_button current" aria-controls="datatable" data-dt-idx="1" tabIndex="0">1</a>
            <a className="paginate_button " aria-controls="datatable" data-dt-idx="2" tabIndex="0">2</a>
          </span>
          <a className="paginate_button next" aria-controls="datatable" data-dt-idx="3" tabIndex="0" id="datatable_next">
            <div>
              <img src="/static/images/next.svg" className="dark-angle" />
              <img src="/static/images/right-angle.svg" className="light-angle" style={{ display: 'none' }} />
            </div>
          </a>
        </div>
        <div id="jump-to-page">
          <span>Jump to page:</span>
          <div className="dropdown bootstrap-select selectpage">
            <select className="selectpage" tabIndex="-98">
              <option>20</option>
              <option>30</option>
              <option>40</option>
            </select>
            <button
              type="button"
              className="btn dropdown-toggle btn-light"
              data-toggle="dropdown"
              role="combobox"
              aria-owns="bs-select-3"
              aria-haspopup="listbox"
              aria-expanded="false"
              title="20"
            >
              <div className="filter-option">
                <div className="filter-option-inner">
                  <div className="filter-option-inner-inner">20</div>
                </div>
              </div>
            </button>
            <div className="dropdown-menu ">
              <div className="inner show" role="listbox" id="bs-select-3" tabIndex="-1">
                <ul className="dropdown-menu inner show" role="presentation" style={{marginTop: '0px', marginBottom: '0px'}}>
                  <li className="selected active">
                    <a role="option" className="dropdown-item active selected" id="bs-select-5-0" tabIndex="0" aria-setsize="3" aria-posinset="1" aria-selected="true">
                      <span className="text">20</span>
                    </a>
                  </li>
                  <li>
                    <a role="option" className="dropdown-item" id="bs-select-5-1" tabIndex="0">
                      <span className="text">30</span>
                    </a>
                  </li>
                  <li>
                    <a role="option" className="dropdown-item" id="bs-select-5-2" tabIndex="0">
                      <span className="text">40</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Stats = ({ data = {} }) => {
  return (
    <div className="col-md-9 col-sm-9 rectangleSmall">
      <div className="row total-node-wrapper">
        <div className="col-6 col-md-3 col-sm-3">
          <div className="TitleText">
            TOTAL NODES
          </div>
          <div className="FigurText">
            {data.totalNodes}
          </div>
        </div>
        <div className="col-6 col-md-3 col-sm-3">
          <div className="TitleText">
            TOTAL PROVIDERS
          </div>
          <div className="FigurText">
            {data.totalProviders}
          </div>
        </div>
        <div className="col-6 col-md-3 col-sm-3">
          <div className="TitleText">
            TOTAL DELIGATIONS
          </div>
          <div className="FigurText">
            {data.totalDelegations}
          </div>
        </div>
        <div className="col-6 col-md-3 col-sm-3">
          <div className="TitleText">
            TOTAL BLOCKS
          </div>
          <div className="FigurText">
            {data.totalBlocks}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6 col-md-3 col-sm-3">
          <div className="TitleText">
            TOTAL TRANSACTIONS
          </div>
          <div className="FigurText">
            {data.totalTransactions}
          </div>
        </div>
        <div className="col-6 col-md-3 col-sm-3">
          <div className="TitleText">
            TOTAL PARTICIPATION
          </div>
          <div className="FigurText">
            {data.totalParticipation}
          </div>
        </div>
      </div>
    </div>
  )
}

const Filters = () => {
  return (
    <div className="filter-wrapper">
      <div className="search-container">
        <div className="input-icons">
          <input id="text1" type="text" className="form-control search-field" placeholder="Search Address / TX / Asset / Blockchain / Subnet" />
          <img src="/static/images/search.svg" alt="search" className="search" />
          <img src="/static/images/right-arrow.svg" className="right-arrow dark" />
          <img src="/static/images/search2.svg" className="right-arrow light" />
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
          >
            <div className="filter-option">
              <div className="filter-option-inner">
                <div className="filter-option-inner-inner">Free Space</div>
              </div>
            </div>
          </button>
          <div className="dropdown-menu" style={{ maxHeight: '588.422px', overflow: 'hidden', minHeight: '0px', willChange: 'transform' }}>
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
          <button type="button" className="btn dropdown-toggle btn-light" data-toggle="dropdown"
            role="combobox" aria-owns="bs-select-2" aria-haspopup="listbox" aria-expanded="false" title="More than 5%"
          >
            <div className="filter-option">
              <div className="filter-option-inner">
                <div className="filter-option-inner-inner">More than 5%</div>
              </div>
            </div>
          </button>
          <div className="dropdown-menu"
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

export const Nodes = ({ currentLocale }) => {
  const filter = {
    page: 1,
    perPage: 10,
  }
  const { loading, error, data } = useQuery(GET_NODES, {
    variables: {
      filter: filter
    },
  });

  console.log(data)

  const locale = currentLocale === defaultLocale ? undefined : currentLocale

  // if (loading) return 'Loading...';
  // if (error) return `Error! ${error.message}`;

  return (
    <>
      <div className="content-wrapper">
        <div className="container">
          <div className="row content-inner">
            <div className="col-md-3 col-sm-3">
              <div className="bredcrum">
                <a href="#">
                  <img src="/static/images/home.svg" className="home-image" />
                </a><span style={{ color: '#fff' }}> /</span>
                <a href="#" className="nodes">
                  Nodes
                </a>
              </div>
            </div>
            <Stats data={data && data.stats ? data.stats : {}} />
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="container">
          <Filters />
        </div>
        <div className="PageTitle">
          <div className="container">
            <div className="">
              <div className="PageTitleFont">
                Nodes
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="container">
            <div id="datatable_wrapper" className="dataTables_wrapper no-footer">
              <TableControls />
              <div className="row mb-3">
                <div className="col-sm-12">
                  <table id="datatable" className="display responsive nowrap dataTable table-hover" style={{ width: '100%' }}>
                    <thead>
                      <tr>
                        <th>Node ID</th>
                        <th>Delegators</th>
                        <th>Total stake</th>
                        <th className="free-space">Free space</th>
                        <th>Started on</th>
                        <th>Time left</th>
                        <th>Fee</th>
                        <th>Max yield</th>
                        <th>Country</th>
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
                        const felegationFeeRate = 1 - item.delegationFee / 100
                        const potentialRewardPercent = (item.potentialReward * 100 / (item.stakeAmount)) * timeLeftRate * felegationFeeRate

                        const daysLeft = moment(item.endTime * 1000).diff(moment(), 'days')
                        const hoursLeft = moment(item.endTime * 1000).diff(moment(), 'hours')
                        const minutesLeft = moment(item.endTime * 1000).diff(moment(), 'minutes')

                        return (

                              <tr key={index}>
                                <td scope="row" style={{ position: 'relative' }}>
                                  <Link route={`${currentLocale}-node`} params={{ locale, id: item.nodeID }}>
                            <a className="stretched-link text-white">

                                  <span id="code">{shortNodeId(item.nodeID)}</span>
                                  <img
                                    data-clipboard-action="copy"
                                    data-clipboard-target="#code"
                                    src="/static/images/pdficon.svg"
                                    className="pdf-image"
                                  />
                                  <div className="table-tab-wrapper">
                                    {item.isSponsored && (<span className="sponsertag mr-1">Sponsored</span>)}
                                    {item.isPartner && (<span className="providertag">Provider</span>)}
                                  </div>
                                  </a>
                          </Link>

                                </td>
                                <td>{item.delegators.pagination.count}</td>
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
                                  {!!daysLeft && (<span>{daysLeft} days left</span>)}
                                  {!daysLeft && !!hoursLeft && (<span>{hoursLeft} hours left</span>)}
                                  {!daysLeft && !hoursLeft && !!minutesLeft && (<span>{minutesLeft} minutes left</span>)}
                                </td>
                                <td>{parseInt(item.delegationFee)}%</td>
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
              <TableControls />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Nodes

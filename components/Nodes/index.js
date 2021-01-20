import { gql, useQuery } from '@apollo/client';

const GET_NODES = gql`
  query GetNodes ($filter: NodeFilter!) {
    nodes(filter: $filter) {
      items {
        nodeID
        delegators {
          nodeID
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

export const Nodes = () => {
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
            <div className="col-md-9 col-sm-9 rectangleSmall">
              <div className="row total-node-wrapper">
                <div className="col-6 col-md-3 col-sm-3">
                  <div className="TitleText">
                    TOTAL NODES
                  </div>
                  <div className="FigurText">
                    836
                  </div>
                </div>
                <div className="col-6 col-md-3 col-sm-3">
                  <div className="TitleText">
                    TOTAL PROVIDERS
                  </div>
                  <div className="FigurText">
                    55
                  </div>
                </div>
                <div className="col-6 col-md-3 col-sm-3">
                  <div className="TitleText">
                    TOTAL DELIGATIONS
                  </div>
                  <div className="FigurText">
                    2613
                  </div>
                </div>
                <div className="col-6 col-md-3 col-sm-3">
                  <div className="TitleText">
                    TOTAL BLOCKS
                  </div>
                  <div className="FigurText">
                    636
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-6 col-md-3 col-sm-3">
                  <div className="TitleText">
                    TOTAL TRANSACTIONS
                  </div>
                  <div className="FigurText">
                    410, 316
                  </div>
                </div>
                <div className="col-6 col-md-3 col-sm-3">
                  <div className="TitleText">
                    TOTAL PARTICIPATION
                  </div>
                  <div className="FigurText">
                    74.3%
                  </div>
                </div>
                <div className="col-6 col-md-3 col-sm-3">
                  <div className="TitleText">
                    TOTAL DELIGATIONS
                  </div>
                  <div className="FigurText">
                    2613
                  </div>
                </div>
                <div className="col-6 col-md-3 col-sm-3">
                  <div className="TitleText">
                    TOTAL BLOCKS
                  </div>
                  <div className="FigurText">
                    636
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="container">
          <div className="filter-wrapper">
            <div className="search-container">
              <div className="input-icons">
                <input
                  id="text1"
                  type="text"
                  className="form-control search-field"
                  placeholder="Search Address / TX / Asset / Blockchain / Subnet"
                />
                <img src="/static/images/search.svg" alt="search" className="search" />
                <img src="/static/images/right-arrow.svg" className="right-arrow dark" />
                <img src="/static/images/search2.svg" className="right-arrow light" />
              </div>
            </div>
            <div className="freespace-wrap">
              <select className="selectpicker">
                <option>Free Space</option>
                <option>Free Space1</option>
                <option>Free Space2</option>
              </select>

            </div>
            <div className="freespace-wrap">
              <select className="selectpicker">
                <option>More than 5%</option>
                <option>More than 10%</option>
                <option>More than 15%2</option>
              </select>
            </div>
          </div>
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
            <table id="datatable" className="display responsive nowrap" style={{ width: '100%' }}>
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
                  return (
                    <tr key={index}>
                      <td style={{ position: 'relative' }}>
                        {/* <span id="code">NodeID-76Kc .... VyY2</span> */}
                        <span id="code">{item.nodeID}</span>
                        <img
                          data-clipboard-action="copy"
                          data-clipboard-target="#code"
                          src="/static/images/pdficon.svg"
                          className="pdf-image"
                        />
                        <div className="table-tab-wrapper">
                          <span className="sponsertag">Sponsored</span>
                          <span className="providertag">Provider</span>
                        </div>

                      </td>
                      <td>234235</td>
                      <td colSpan="2">
                        <div className="progress-bar-wrap relative">
                          <div className="label-wrap">
                            <label className="available-label"><strong>8,377.19</strong>AVAX</label>
                            <label className="total-label"><strong>42.65</strong>AVAX</label>
                          </div>
                          <div className="progress">
                            <div
                              className="progress-bar"
                              role="progressbar"
                              style={{ width: '86.5%' }}
                              aria-valuenow="36"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            />
                          </div>
                        </div>
                      </td>
                      <td style={{ display: 'none' }}></td>
                      <td>Nov 23, 2020</td>
                      <td>364 days</td>
                      <td>1%</td>
                      <td>10.07%</td>
                      <td><img src="/static/images/india-flag.svg" className="flag-image" /> IN</td>
                      <td><i className="fas fa-circle"></i></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div id="jump-to-page">
        <span>Jump to page:</span>
        <select className="selectpage">
          <option>20</option>
          <option>30</option>
          <option>40</option>
        </select>
      </div>
    </>
  )
}

export default Nodes

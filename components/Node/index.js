export const Node = () => {
  return (
    <>
      <div className="contact-wrapper">
        <div className="container">
          <div className="row content-inner">
            <div className="col-md-4 col-sm-6 col-lg-3">
              <div className="nodebredcrum">
                <a href="#">
                  <img src="/static/images/home.svg" className="home-image" />
                </a><span style={{ color: '#fff' }}> /</span>
                <a href="#" className="nodes">
                  Nodes</a><span style={{ color: '#fff' }}> /</span><a href="#" className="nodes"> Node details</a>
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
                  <span id="copycode">NodeID-76KcjHN&MYN&YNVyY2</span>  <img data-clipboard-action="copy" data-clipboard-target="#copycode" src="/static/images/pdficon.svg" className="pdf-image" />
                </div>

              </div>
              <div className=" col-3 col-md-4 col-sm-4 ">
                <div className="PagesubTitle"><i className="fas fa-circle"></i>
                        ACTIVE
                    </div>
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
                    <label className="available-label"><strong>8,377.19</strong> AVAX total</label>
                    <label className="total-label"><strong>2,031.50</strong> AVAX free</label>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: '70%' }} aria-valuenow="36" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 right-side">
                <p className="progress-title">Time remaining</p>
                <div className="progress-bar-wrap relative">
                  <div className="label-wrap">
                    <label className="available-label"><strong>45</strong> days total</label>
                    <label className="total-label"><strong>3</strong> days remaining</label>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: '70%' }} aria-valuenow="36" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="map-content">
        <div id="map"></div>
      </div>
      <div className="box-wrapper">
        <div className="container">
          <div className="row content-inner">
            <div className="col-md-6 left">
              <div className="card-wrapper first">
                <p className="title">BENEFICIARY</p>
                <div className="card-content">
                  <span>Address</span>
                  <p className="subtext">P-avax18ylhx0ym0vgm2a06ahd3qr87t9a8kssrx2rjg0</p>
                </div>
              </div>
              <div className="card-wrapper">
                <p className="title">Stake</p>
                <div className="box-row d-flex">
                  <div className="card-content smallbox">
                    <span>Owned</span>
                    <p className="subtext">1,800,000 AVAX</p>
                  </div>
                  <div className="card-content smallbox">
                    <span>Total</span>
                    <p className="subtext">1,800,000 AVAX</p>
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
                    <p className="subtext">0.329 492 915 %</p>
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
                    <p className="subtext">0 AVAX</p>
                  </div>
                  <div className="card-content smallbox">
                    <span>Free space</span>
                    <p className="subtext">1,200,000 AVAX</p>
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
                  <p className="subtext">10,547.375 713 219 AVAX</p>
                </div>
                <div className="card-content">
                  <span>From delegations</span>
                  <p className="subtext">0 AVAX</p>
                </div>
                <div className="card-content">
                  <span>Total rewards</span>
                  <p className="subtext">10,547.375 713 219 AVAX</p>
                </div>
                <div className="progress-bar-wrap relative">
                  <div className="label-wrap">
                    <label className="available-label">From owned state</label>
                    <label className="total-label">From delegations</label>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: '86.5%' }} aria-valuenow="36" aria-valuemin="0" aria-valuemax="100"></div>
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
            <table id="datatable" className="display responsive nowrap" style={{ width: '100%' }}>
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
                <tr>
                  <td><span id="code1">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#code1" src="/static/images/pdficon.svg" className="pdf-image" /></td>
                  <td>200.74 AVAX</td>
                  <td>42.65AVAX</td>
                  <td>Nov 23, 2020</td>
                  <td>364 days</td>
                  <td><i className="fas fa-circle"></i></td>
                </tr>
                <tr>
                  <td><span id="code2">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#code2" src="/static/images/pdficon.svg" className="pdf-image" /></td>
                  <td>200.74 AVAX</td>
                  <td>42.65AVAX</td>
                  <td>Nov 23, 2020</td>
                  <td>364 days</td>
                  <td><i className="fas fa-circle"></i></td>
                </tr>
                <tr>
                  <td><span id="code3">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#code3" src="/static/images/pdficon.svg" className="pdf-image" /></td>
                  <td>200.74 AVAX</td>
                  <td>42.65AVAX</td>
                  <td>Nov 23, 2020</td>
                  <td>364 days</td>
                  <td><i className="fas fa-circle"></i></td>
                </tr>
                <tr>
                  <td><span id="code4">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#code4" src="/static/images/pdficon.svg" className="pdf-image" /></td>
                  <td>200.74 AVAX</td>
                  <td>42.65AVAX</td>
                  <td>Nov 23, 2020</td>
                  <td>364 days</td>
                  <td><i className="fas fa-circle"></i></td>
                </tr>
                <tr>
                  <td><span id="code5">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#code5" src="/static/images/pdficon.svg" className="pdf-image" /></td>
                  <td>200.74 AVAX</td>
                  <td>42.65AVAX</td>
                  <td>Nov 23, 2020</td>
                  <td>364 days</td>
                  <td><i className="fas fa-circle"></i></td>
                </tr>
                <tr>
                  <td><span id="code6">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#code6" src="/static/images/pdficon.svg" className="pdf-image" /></td>
                  <td>200.74 AVAX</td>
                  <td>42.65AVAX</td>
                  <td>Nov 23, 2020</td>
                  <td>364 days</td>
                  <td><i className="fas fa-circle"></i></td>
                </tr>
                <tr>
                  <td><span id="code7">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#code7" src="/static/images/pdficon.svg" className="pdf-image" /></td>
                  <td>200.74 AVAX</td>
                  <td>42.65AVAX</td>
                  <td>Nov 23, 2020</td>
                  <td>364 days</td>
                  <td><i className="fas fa-circle"></i></td>
                </tr>
                <tr>
                  <td><span id="code8">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#code8" src="/static/images/pdficon.svg" className="pdf-image" /></td>
                  <td>200.74 AVAX</td>
                  <td>42.65AVAX</td>
                  <td>Nov 23, 2020</td>
                  <td>364 days</td>
                  <td><i className="fas fa-circle"></i></td>
                </tr>
                <tr>
                  <td><span id="code9">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#code9" src="/static/images/pdficon.svg" className="pdf-image" /></td>
                  <td>200.74 AVAX</td>
                  <td>42.65AVAX</td>
                  <td>Nov 23, 2020</td>
                  <td>364 days</td>
                  <td><i className="fas fa-circle"></i></td>
                </tr>
                <tr>
                  <td><span id="code10">P-avax18ylhx…rjg0</span> <img data-clipboard-action="copy" data-clipboard-target="#code10" src="/static/images/pdficon.svg" className="pdf-image" /></td>
                  <td>200.74 AVAX</td>
                  <td>42.65AVAX</td>
                  <td>Nov 23, 2020</td>
                  <td>364 days</td>
                  <td><i className="fas fa-circle"></i></td>
                </tr>
                <tr>
                  <td>P-avax18ylhx…rjg0 <img src="/static/images/pdficon.svg" className="pdf-image" /></td>
                  <td>200.74 AVAX</td>
                  <td>42.65AVAX</td>
                  <td>Nov 23, 2020</td>
                  <td>364 days</td>
                  <td><i className="fas fa-circle"></i></td>
                </tr>
                <tr>
                  <td>P-avax18ylhx…rjg0 <img src="/static/images/pdficon.svg" className="pdf-image" /></td>
                  <td>200.74 AVAX</td>
                  <td>42.65AVAX</td>
                  <td>Nov 23, 2020</td>
                  <td>364 days</td>
                  <td><i className="fas fa-circle"></i></td>
                </tr>
                <tr>
                  <td>P-avax18ylhx…rjg0 <img src="/static/images/pdficon.svg" className="pdf-image" /></td>
                  <td>200.74 AVAX</td>
                  <td>42.65AVAX</td>
                  <td>Nov 23, 2020</td>
                  <td>364 days</td>
                  <td><i className="fas fa-circle"></i></td>
                </tr>

              </tbody>

            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Node

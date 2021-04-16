import { useIntl } from "react-intl"

import { Link } from '../../routes'

export const Notifier = ({ currentLocale }) => {
  const { formatMessage } = useIntl()
  const f = (id, values = {}) => formatMessage({ id }, values)

  const locale = currentLocale

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
                <span style={{ color: '#292932' }}> </span>

                <Link href={`notifier`} locale={locale} params={{ }}>
                  <a className="nodes">/ {f('header.pages.notifier.title')}</a>
                </Link>
              </div>
            </div>

            <div className="col-sm-6">
              <button className="right-text1 btn">
                <img src="/static/images/bell2.svg" alt="" style={{ width: '26px' }} />
                <div className="text_wrap text_wrap1">
                  <h5>Start AVAX notifier bot</h5>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className="users_wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-3 user_wrap">
              <div className="user-text-wrap">
                <h6>Trusted by</h6>
              </div>
              <div className="user-inner-wrap">
                <h3>2 Million</h3>
              </div>
              <div className="user-bottom-wrap">
                <h6>Registered Users</h6>
              </div>

            </div>
            <div className="col-md-3  user_wrap">
              <div className="user-text-wrap">
                <h6>Tracking</h6>
              </div>
              <div className="user-inner-wrap">
                <h3>$421,393</h3>
              </div>
              <div className="user-bottom-wrap">
                <h6>Worth of AVAX</h6>
              </div>
            </div>
            {/* <div className="col-md-3  user_wrap">
              <div className="user-text-wrap">
                <h6>Trusted by</h6>
              </div>
              <div className="user-inner-wrap">
                <h3>2 Million</h3>
              </div>
              <div className="user-bottom-wrap">
                <h6>Registered Users</h6>
              </div>
            </div>
            <div className="col-md-3 user_wrap">
              <div className="user-text-wrap">
                <h6>Tracking</h6>
              </div>
              <div className="user-inner-wrap">
                <h3>$421,393</h3>
              </div>
              <div className="user-bottom-wrap">
                <h6>Worth of AVAX</h6>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="telegram_wrapper">
        <div className="container">
          <div className="row tel-inner-wrap">
            <div className="col-sm-12 col-md-8">
              <div className="avax-flex-wrap">

                <div id="avax-inner-flex1" className="rotate">
                  <h6>AVAX NOTIFIER</h6>
                </div>
                <div id="avax-inner-flex2" className="rotate"></div>
                <div id="avax-inner-flex3" className="rotate"></div>
                <div id="avax-inner-flex4" className="rotate"></div>
              </div>


              <div className="tel-text-wrap ">
                <h6>Telegram Bot for Avalanche Blockchain</h6>
              </div>
              <div className="ul-list-wrap">
                <ul>
                  <li>Unlimited number of addresses and notifications</li>
                  <li>Balance in AVAX, BTC and USD</li>
                  <li>Transactions notifications withthreshold settings</li>
                  <li>Node rewards and cycle performance notifications</li>
                  <li>New origination and delegation notifications</li>
                  <li>Notifications about missing baking and endorsing blocks</li>
                  <li>Whale transactions notifications</li>
                  <li>Automatic public known addresses recognition</li>
                </ul>
                <h6>... and many other</h6>
              </div>
              <div className="avax-col-notify">
                <img src="/static/images/bell4.svg" alt="" style={{ width: '26px' }} />
                <div className="text_wrap">
                  <h5>Start AVAX notifier bot</h5>
                </div>
              </div>
            </div>


            <div className="col-sm-12 col-md-4">
              <div className="mobaile-wrap ">
                <img src="/static/images/mobile-data.png" alt="" />
                {/* <ul>
                      <li id="first-li">
                        <h6>Reward of cycle 190 delivered to the delegate!</h6>
                        <span>#reward</span><span>#delegate</span>
                      </li>
                      <li>
                        <h6>Outgoing transaction of 1,232 from delegate to non-delegate is successful!</h6>
                        <h3> Current balance: 34,324,32</h3>
                        <span>#reward</span><span>#delegate</span><span>#transaction</span>
                      </li>
                      <li>
                        <h6>Reward of cycle 190 delivered to the delegate!</h6>
                        <span>#reward</span><span>#delegate</span>
                      </li>
                      <li>
                        <h6>Outgoing transaction of 1,232 from delegate to non-delegate is successful!</h6>
                        <h3> Current balance: 34,324,32</h3>
                        <span>#reward</span><span>#delegate</span><span>#transaction</span>
                      </li>
                      <li>
                        <h6>Reward of cycle 190 delivered to the delegate!</h6>
                        <span>#reward</span><span>#delegate</span>
                      </li>
                      <li id="last-li">
                        <h6>Outgoing transaction of 1,232 from delegate to non-delegate is successful!</h6>
                        <h3> Current balance: 34,324,32</h3>
                        <span>#reward</span><span>#delegate</span><span>#transaction</span>
                      </li>
                    </ul> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="users_wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-3 user_wrap">
              <div className="user-text-wrap">
                <h6>Trusted by</h6>
              </div>
              <div className="user-inner-wrap">
                <h3>2 Million</h3>
              </div>
              <div className="user-bottom-wrap">
                <h6>Registered Users</h6>
              </div>

            </div>
            <div className="col-md-3  user_wrap">
              <div className="user-text-wrap">
                <h6>Tracking</h6>
              </div>
              <div className="user-inner-wrap">
                <h3>$421,393</h3>
              </div>
              <div className="user-bottom-wrap">
                <h6>Worth of AVAX</h6>
              </div>
            </div>
            {/* <div className="col-md-3 user_wrap">
              <div className="user-text-wrap">
                <h6>Trusted by</h6>
              </div>
              <div className="user-inner-wrap">
                <h3>2 Million</h3>
              </div>
              <div className="user-bottom-wrap">
                <h6>Registered Users</h6>
              </div>
            </div>
            <div className="col-md-3  user_wrap">
              <div className="user-text-wrap">
                <h6>Tracking</h6>
              </div>
              <div className="user-inner-wrap">
                <h3>$421,393</h3>
              </div>
              <div className="user-bottom-wrap">
                <h6>Worth of AVAX</h6>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="bot_wrapper">
        <div className="container ">
          <div className="row row_bot_wrap">
            <div className="col-md-6">
              <div className="bot-inner-wrap">
                <h2>What does this bot do?</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut eiusmod tempor incididunt ut labore et
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="avax-inner-wrap">
                <h2>Where can I read more about AVAX?</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut eiusmod tempor incididunt ut labore et
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="feature_wrapper">
        <div className="container">
          <div className="feature-inner">
            <h2>Cool features!</h2>
          </div>
          <div className="feature-card">
            <div className="row row-cols-md-3 flex-col ">
              <div className="col card-col">
                <div className="card card-feature">
                  <img src="/static/images/feature1.svg" className="card-img-top" alt="" style={{ width: '40px' }} />
                  <div className="card-body">
                    <h5 className="card-title">Awesome feature 1</h5>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore
                      magna aliqua.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col card-col">
                <div className="card card-feature">
                  <img src="/static/images/Feature2.svg" className="card-img-top" alt="" style={{ width: '40px' }} />
                  <div className="card-body">
                    <h5 className="card-title">Awesome feature 2</h5>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore
                      magna aliqua.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col card-col">
                <div className="card card-feature">
                  <img src="/static/images/feature3.svg" className="card-img-top" alt="" style={{ width: '40px' }} />
                  <div className="card-body">
                    <h5 className="card-title">Awesome feature 3</h5>
                    <p className="card-text">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore
                      magna aliqua.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="button_wrapper">
        <div className="container">
          <div className="button-text">
            <img src="/static/images/bell1.svg" alt="" style={{ width: '26px' }} />
            <div className="text_wrap button-text_wrap">
              <h5>Start AVAX notifier bot</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Notifier

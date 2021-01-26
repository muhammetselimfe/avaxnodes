import React from 'react'
import { NavDropdown, Form } from 'react-bootstrap'

import { defaultLocale, locales } from '../../locales';
import { Link } from '../../routes'

export const Header = ({ children, currentLocale, currentRoute, route }) => {
  const dropdownLocales = locales.filter(item => item !== currentLocale)
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        {/* <Link route={route} params={{ locale: currentLocale === defaultLocale ? undefined : currentLocale }}>
          <a className="navbar-brand logo" >
            <img src="/static/images/aclogo.svg" alt="Avalanche Capital" />
          </a>
        </Link> */}
        <Link route={route} params={{ locale: currentLocale === defaultLocale ? undefined : currentLocale }}>
          <a className="navbar-brand">
            <img src="/static/images/logo.svg" className="img-fluid logoTop dark" alt="" />
            <img src="/static/images/mainlogo.svg" className="img-fluid logoTop light" alt="" />
          </a>
        </Link>

        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> */}

        <div className="collapse navbar-collapse" id="navbarResponsive">

          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Nodes
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/providers">Providers</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/delegations">Delegations</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/x-chain">X-Chain</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/c-chain">C-Chain</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/notifier">Notifier</a>
            </li>
          </ul>

          {/* <div id="toggel_btn" className="toggle-wrap">
            <input type="checkbox" id="toggle_checkbox" />
            <label htmlFor="toggle_checkbox">
              <img src="/static/images/switch1.svg" className="night" /><img src="/static/images/light-moon.svg" className="night-light" style={{ display: 'none' }} />
              <img src="/static/images/day.svg" className="day" />
            </label>
          </div> */}

          <ul className="navbar-nav">
            <li className="nav-item toggle-wrap" id="toggel_btn">
              <input type="checkbox" id="toggle_checkbox" />
              <label htmlFor="toggle_checkbox">
                <img src="/static/images/switch1.svg" className="night" /><img src="/static/images/light-moon.svg" className="night-light" style={{ display: 'none' }} />
                <img src="/static/images/day.svg" className="day" />
              </label>
            </li>
          </ul>

          {/* <Form inline id="toggel_btn" className="toggle-wrap">
            <input type="checkbox" id="toggle_checkbox" />
            <label htmlFor="toggle_checkbox">
              <img src="/static/images/switch1.svg" className="night" /><img src="/static/images/light-moon.svg" className="night-light" style={{ display: 'none' }} />
              <img src="/static/images/day.svg" className="day" />
            </label>
          </Form> */}

          {/* <div className="collapse navbar-collapse" id="headerMenu">
            <span className="navbar-text">
              <div className="ddOutOfVision" id="countries_msddHolder" style={{ height: '0px', overflow: 'hidden', position: 'absolute' }}>
                <select name="countries" id="countries">
                  <option value="us" data-image="/static/images/icons/blank.gif" data-imagecss="flag us" data-title="Netherlands Antilles">EN</option>
                  <option value="ca" data-image="/static/images/icons/blank.gif" data-imagecss="flag ca" data-title="Netherlands Antilles">CA</option>
                </select>
              </div>
              <div className="dd ddcommon borderRadiusTp" id="countries_msdd" style={{ width: '43px' }}>
                <div className="ddTitle borderRadiusTp">
                  <span className="undefined"></span>
                  <span className="arrow fas fa-chevron-down" aria-hidden="true"></span>
                  <span className="ddTitleText " id="countries_title">
                    <img src="/static/images/icons/blank.gif" className="flag us fnone" />
                    <span className="ddlabel">EN</span>
                  </span>
                </div>
                <input id="countries_titleText" type="text" autoComplete="off" className="text shadow borderRadius" style={{ display: 'none' }} />
                <div
                  className="ddChild ddchild_ border shadow"
                  id="countries_child"
                  style={{ zIndex: '9999', position: 'absolute', top: '30px', display: 'block' }}
                >
                  <ul>
                    <li className="enabled _msddli_ selected" title="Netherlands Antilles">
                      <img src="/static/images/icons/blank.gif" className="flag us fnone" />
                      <span className="ddlabel">EN</span>
                      <div className="clear"></div>
                    </li>
                    <li className="enabled _msddli_" title="Netherlands Antilles">
                      <img src="/static/images/icons/blank.gif" className="flag ca fnone" />
                      <span className="ddlabel">CA</span>
                      <div className="clear"></div>
                    </li>
                  </ul>
                </div>
              </div>
            </span>
          </div> */}

          <NavDropdown
            as="button"
            disabled={!dropdownLocales.length}
            className="d-flex align-items-center"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '3px',
              boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.03)',
              border: 'none',
            }}
            title={(
              <span className="mr-2 d-flex align-items-center">
                <img
                  src={`/static/images/icons/flag-${currentLocale}.svg`}
                  width={25}
                  height={25}
                  className="mr-2"
                  style={{
                    width: 'initial'
                  }}
                />
                <span className="text-uppercase">{currentLocale}</span>
              </span>
            )}
            id="nav-dropdown"
          >
            {dropdownLocales.map(locale => (
              <NavDropdown.Item eventKey={locale} as="button">
                <Link route={`${locale}-${currentRoute}`} params={{ locale: locale === defaultLocale ? undefined : locale }}>
                  <a>
                    <span>
                      <img
                        src={`/static/images/icons/flag-${locale}.svg`}
                        width={25}
                        height={25}
                        className="mr-2"
                        style={{ width: 'initial' }}
                      />
                      <span className="text-uppercase">{locale}</span>
                    </span>
                  </a>
                </Link>
              </NavDropdown.Item>
            ))}
          </NavDropdown>

          <ul className="navbar-nav ml-auto myaccount">
            <li className="dropdown nav-item">
              <a href="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                My Account
              </a>
              <ul className="dropdown-menu dropdown-navbar">
                <li className="nav-link">
                  <a href="/profile" className="nav-item dropdown-item">
                    Profile
                  </a>
                </li>
                <li className="nav-link">
                  <a href="/settings" className="nav-item dropdown-item">Settings</a>
                </li>
              </ul>
            </li>
          </ul>

        </div>

      </div>
    </nav>
  )
}

export default Header

import React from 'react'
import { NavDropdown, Navbar } from 'react-bootstrap'
import { useRouter } from 'next/router'
import { useDarkMode } from 'next-dark-mode'

import { defaultLocale, locales } from '../../locales';
import { Link } from '../../routes'

export const Header = ({ children, currentLocale, currentRoute, route }) => {
  const router = useRouter()
  const { darkModeActive, switchToDarkMode, switchToLightMode } = useDarkMode()

  const dropdownLocales = locales.filter(item => item !== currentLocale)
  const locale = currentLocale === defaultLocale ? undefined : currentLocale
  return (
    <Navbar collapseOnSelect expand="lg" bg={darkModeActive ? 'dark' : 'light'} variant={darkModeActive ? 'dark' : 'light'} fixed="top">
    {/* <nav className={`navbar navbar-expand-lg navbar-dark fixed-top ${darkModeActive ? 'bg-dark' : 'bg-light'}`}> */}
      <div className="container">
        <Link route={route} params={{ locale }}>
          <a className="navbar-brand">
            {darkModeActive ? (
              <img src="/static/images/logo.svg" className="img-fluid logoTop dark" alt="" />
            ) : (
              <img src="/static/images/mainlogo.svg" className="img-fluid logoTop light d-inline" alt="" />
            )}
          </a>
        </Link>

        <Navbar.Toggle aria-controls="navbarResponsive" />
        <Navbar.Collapse id="navbarResponsive">

          <ul className="navbar-nav">
            <li className={`nav-item ${currentRoute === 'home' ? 'active' : ''}`}>
              <Link route={`${currentLocale}-home`} params={{ locale }}>
                <a className="nav-link">
                  Nodes
                  <span className="sr-only">(current)</span>
                </a>
              </Link>
            </li>
            <li className={`nav-item ${currentRoute === 'notifier' ? 'active' : ''}`}>
              <Link route={`${currentLocale}-notifier`} params={{ locale }}>
                <a className="nav-link">
                  Notifier
                </a>
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item toggle-wrap" id="toggel_btn" onClick={() => {
              if (darkModeActive) {
                switchToLightMode()
              } else {
                switchToDarkMode()
              }
            }}>
              {/* <input type="checkbox" id="toggle_checkbox" /> */}
              <label htmlFor="toggle_checkbox">
                {darkModeActive ? (
                  <img src="/static/images/switch1.svg" className="night" />
                ) : (
                  <img src="/static/images/light-moon.svg" className="night-light" />
                )}
                <img src="/static/images/day.svg" className="day" />
              </label>
            </li>
          </ul>

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
              <NavDropdown.Item eventKey={locale} as="button" key={locale}>
                <Link
                  route={`${locale}-${currentRoute}`}
                  params={{
                    ...(router && router.query ? router.query : {}),
                    locale: locale === defaultLocale ? undefined : locale,
                  }}
                >
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

        </Navbar.Collapse>

      </div>
    </Navbar>
  )
}

export default Header

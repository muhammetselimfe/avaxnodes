import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import { useRouter } from 'next/router'

import { defaultLocale, locales } from '../../locales';
import { Link } from '../../routes'

export const Header = ({ children, currentLocale, currentRoute, route }) => {
  const router = useRouter()

  const dropdownLocales = locales.filter(item => item !== currentLocale)
  console.log(currentRoute, `${currentLocale}-home`)
  const locale = currentLocale === defaultLocale ? undefined : currentLocale
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link route={route} params={{ locale }}>
          <a className="navbar-brand">
            <img src="/static/images/logo.svg" className="img-fluid logoTop dark" alt="" />
            <img src="/static/images/mainlogo.svg" className="img-fluid logoTop light" alt="" />
          </a>
        </Link>

        <div className="collapse navbar-collapse" id="navbarResponsive">

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
            <li className="nav-item toggle-wrap" id="toggel_btn">
              <input type="checkbox" id="toggle_checkbox" />
              <label htmlFor="toggle_checkbox">
                <img src="/static/images/switch1.svg" className="night" /><img src="/static/images/light-moon.svg" className="night-light" style={{ display: 'none' }} />
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
              <span className="mr-2 d-flex align-items-center text-white">
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

        </div>

      </div>
    </nav>
  )
}

export default Header

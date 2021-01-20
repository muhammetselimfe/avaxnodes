import React from 'react'

export const Header = ({ children }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand" href="/">
          <img src="/static/images/logo.svg" className="img-fluid logoTop dark" alt="" />
          <img src="/static/images/mainlogo.svg" className="img-fluid logoTop light" alt="" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
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
          <div id="toggel_btn" className="toggle-wrap">
            <input type="checkbox" id="toggle_checkbox" />
            <label htmlFor="toggle_checkbox">
              <img src="/static/images/switch1.svg" className="night" /><img src="/static/images/light-moon.svg" className="night-light" style={{ display: 'none' }} />
              <img src="/static/images/day.svg" className="day" />
            </label>
          </div>
          <div className="collapse navbar-collapse" id="headerMenu">
            <span className="navbar-text">
              <select name="countries" id="countries">
                <option value='us' data-image="/static/images/icons/blank.gif" data-imagecss="flag us" data-title="Netherlands Antilles">EN</option>
                <option value='ca' data-image="/static/images/icons/blank.gif" data-imagecss="flag ca" data-title="Netherlands Antilles">CA</option>
              </select>
            </span>
          </div>

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

import React from 'react';
import Routes from '../routes';
// import App from 'next/app'
import withDarkMode from 'next-dark-mode'
import { useDarkMode } from 'next-dark-mode'

import { ApolloProvider } from "@apollo/react-hooks";
// import ApolloClient from "apollo-boost";

import { useApollo } from '../lib/apolloClient'

import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/main.css'
import '../styles/dd.css'
import '../styles/flags.css'
import '../styles/jquery.dataTables.min.css'
import 'bootstrap-select/dist/css/bootstrap-select.min.css'

function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)

  const { darkModeActive } = useDarkMode()

  React.useEffect(() => {
    document.querySelector("body").classList.toggle('mode-light', !darkModeActive)
  }, [darkModeActive]);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

App.getInitialProps = async (props) => {
  const { Component, ctx } = props
  let pageProps = {};


  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
    pageProps._url = Routes.match(ctx.asPath);
  }

  return { pageProps }
}

export default withDarkMode(App)

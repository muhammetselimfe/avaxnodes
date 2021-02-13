import React from 'react';
import Routes from '../routes';
import App from 'next/app'
import withDarkMode from 'next-dark-mode'
import { useDarkMode } from 'next-dark-mode'
// import appWithI18n from 'next-translate/appWithI18n'
import { useRouter } from "next/router"

// import i18nConfig from '../i18n'
import { ApolloProvider } from "@apollo/react-hooks";
// import ApolloClient from "apollo-boost";
// import { appWithTranslation } from '../i18n'
import { IntlProvider } from "react-intl"

import { useApollo } from '../lib/apolloClient'

import allMessages from '../i18nLocales'
import { defaultLocale } from '../locales'

import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/main.css'
import '../styles/dd.css'
import '../styles/flags.css'
import '../styles/jquery.dataTables.min.css'
import 'bootstrap-select/dist/css/bootstrap-select.min.css'

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)

  const { darkModeActive } = useDarkMode()

  const router = useRouter()

  const locale = ((router || {}).query || {}).locale || defaultLocale

  const messages = allMessages[locale]

  React.useEffect(() => {
    document.querySelector("body").classList.toggle('mode-light', !darkModeActive)
  }, [darkModeActive]);

  return (
    <ApolloProvider client={apolloClient}>
      <IntlProvider
        locale={locale}
        defaultLocale={defaultLocale}
        messages={messages}
      >
        <Component {...pageProps} />
      </IntlProvider>
    </ApolloProvider>
  )
}

MyApp.getInitialProps = async (props) => {
  const { Component, ctx } = props
  let pageProps = {};


  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
    pageProps._url = Routes.match(ctx.asPath);
  }

  return { pageProps }
}

// MyApp.getInitialProps = async (appContext) => ({ ...await App.getInitialProps(appContext) })

export default withDarkMode(MyApp)
